#!/usr/bin/env node
/**
 * Converts all TAPP OpenAPI YAML specs in ./reference/ to a single
 * Postman Collection v2.1 JSON that can be imported directly.
 *
 * Usage:
 *   node convert-to-postman.js
 *
 * Output:
 *   ./tapp-postman-collection.json
 *
 * Variables injected into the collection (edit in Postman → Environments):
 *   baseUrl        - base URL without trailing slash
 *   tenant         - your org subdomain (e.g. wire-network)
 *   accessToken    - JWT access token (set after sign-in)
 *   refreshToken   - JWT refresh token (set after sign-in)
 *   deviceId       - UUID device identifier
 *   sessionId      - Org API session ID
 *   clientId       - Org API client ID
 *   clientSecret   - Org API client secret
 *   customerUid    - Customer UID for scoped org sessions
 */

const fs   = require('fs');
const path = require('path');
const yaml = require('/tmp/node_modules/js-yaml');

// ─── Config ─────────────────────────────────────────────────────────────────

const REFERENCE_DIR = path.join(__dirname, 'reference');
const OUTPUT_FILE   = path.join(__dirname, 'tapp-postman-collection.json');

// Files in the order they should appear as top-level folders
const SPEC_FILES = [
  { file: 'openapi-auth-v1.yaml',     folder: 'Authentication API' },
  { file: 'openapi-org-api-v1.yaml',  folder: 'Org API (Server-to-Server)' },
  { file: 'openapi-v0.yaml',          folder: 'Individual User API' },
  { file: 'openapi-admin-v1.yaml',    folder: 'Administration API' },
  { file: 'openapi-business-v1.yaml', folder: 'Business Owner API' },
  { file: 'openapi-operator-v1.yaml', folder: 'Business Operator API' },
];

// Collection-level variables (users override these in a Postman Environment)
const COLLECTION_VARIABLES = [
  { key: 'baseUrl',       value: 'https://api-{{tenant}}.stage2.tappbank.com', type: 'string', description: 'Base URL — switch to https://api-{{tenant}}.tappcash.com for production' },
  { key: 'tenant',        value: 'testing',    type: 'string', description: 'Your org subdomain, e.g. wire-network' },
  { key: 'accessToken',   value: '',           type: 'string', description: 'JWT access token — populated by the Sign In request (expires ~10 min)' },
  { key: 'refreshToken',  value: '',           type: 'string', description: 'JWT refresh token — populated by the Sign In request (expires ~35 min)' },
  { key: 'deviceId',      value: '550e8400-e29b-41d4-a716-446655440000', type: 'string', description: 'V-Client-Device-Id header value (UUIDv4)' },
  { key: 'sessionId',     value: '',           type: 'string', description: 'Org API session ID — set after POST /entrypoint/org/v1/sessions' },
  { key: 'clientId',      value: '',           type: 'string', description: 'Org API client ID (ci_test_… or ci_live_…)' },
  { key: 'clientSecret',  value: '',           type: 'string', description: 'Org API client secret (cs_test_… or cs_live_…)' },
  { key: 'customerUid',   value: '',           type: 'string', description: 'Customer UID — for user-scoped org sessions' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

/** Resolve a local $ref string like '#/components/schemas/Foo' */
function resolveRef(ref, spec) {
  if (!ref.startsWith('#/')) return null;
  const parts = ref.slice(2).split('/');
  let node = spec;
  for (const p of parts) {
    if (node == null) return null;
    node = node[p];
  }
  return node;
}

/** Deep-clone and inline all $ref references within a schema object */
function inlineRefs(obj, spec, depth = 0) {
  if (depth > 10 || obj == null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(i => inlineRefs(i, spec, depth + 1));

  if (obj.$ref) {
    const resolved = resolveRef(obj.$ref, spec);
    return resolved ? inlineRefs(resolved, spec, depth + 1) : obj;
  }

  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    result[k] = inlineRefs(v, spec, depth + 1);
  }
  return result;
}

/** Build a plausible example value from a JSON-Schema node */
function buildExample(schema, spec, depth = 0) {
  if (!schema || depth > 5) return null;

  // Resolve $ref
  if (schema.$ref) {
    const resolved = resolveRef(schema.$ref, spec);
    return resolved ? buildExample(resolved, spec, depth + 1) : null;
  }

  // Use inline example if present
  if (schema.example !== undefined) return schema.example;
  if (schema.default  !== undefined) return schema.default;

  // Enum → first value
  if (schema.enum) return schema.enum[0];

  // allOf / anyOf / oneOf → first branch
  if (schema.allOf) return buildExample(schema.allOf[0], spec, depth + 1);
  if (schema.anyOf) return buildExample(schema.anyOf[0], spec, depth + 1);
  if (schema.oneOf) return buildExample(schema.oneOf[0], spec, depth + 1);

  switch (schema.type) {
    case 'object': {
      if (!schema.properties) return {};
      const obj = {};
      for (const [k, v] of Object.entries(schema.properties)) {
        const val = buildExample(v, spec, depth + 1);
        if (val !== null && val !== undefined) obj[k] = val;
      }
      return obj;
    }
    case 'array': {
      const item = buildExample(schema.items, spec, depth + 1);
      return item != null ? [item] : [];
    }
    case 'string':
      if (schema.format === 'uuid')     return '550e8400-e29b-41d4-a716-446655440000';
      if (schema.format === 'date')     return '2025-01-01';
      if (schema.format === 'date-time') return '2025-01-01T00:00:00Z';
      if (schema.format === 'email')    return 'user@example.com';
      if (schema.format === 'password') return 'SecurePass123!';
      return 'string';
    case 'integer':
    case 'number':
      return 0;
    case 'boolean':
      return true;
    default:
      return null;
  }
}

/**
 * Detect which Postman variables should be used for a given header/param name.
 * Returns {{variableName}} string or null.
 */
function variableFor(name) {
  const map = {
    'authorization':        'Bearer {{accessToken}}',
    'x-refresh-token':      '{{refreshToken}}',
    'v-client-device-id':   '{{deviceId}}',
    'x-session-id':         '{{sessionId}}',
    'x-client-id':          '{{clientId}}',
  };
  return map[name.toLowerCase()] || null;
}

/** Build a Postman header object */
function makeHeader(name, value, description) {
  return { key: name, value, description: description || '', type: 'text' };
}

/** Build Postman URL object from a path string and spec servers */
function buildUrl(pathStr, spec) {
  // Convert OpenAPI path params {id} → :id ONLY in the path (not in the {{baseUrl}} prefix)
  const postmanPath = pathStr.replace(/\{([^}]+)\}/g, ':$1');
  const rawUrl      = '{{baseUrl}}' + postmanPath;
  const segments    = postmanPath.split('/').filter(Boolean);

  // Extract path variables (list for Postman variable table)
  const pathVars = [];
  const matches  = pathStr.match(/\{([^}]+)\}/g) || [];
  for (const m of matches) {
    const varName = m.slice(1, -1);
    pathVars.push({ key: varName, value: `{{${varName}}}`, description: '' });
  }

  return {
    raw:      rawUrl,
    host:     ['{{baseUrl}}'],
    path:     segments,
    variable: pathVars,
  };
}

/** Map an OpenAPI operation to a Postman request item */
function operationToItem(method, pathStr, operation, spec) {
  const name = operation.summary || `${method.toUpperCase()} ${pathStr}`;
  const headers = [];

  // ── Auth headers ──────────────────────────────────────────────────────────
  const security = operation.security || spec.security || [];
  for (const sec of security) {
    if (sec.BearerAuth !== undefined) {
      headers.push(makeHeader('Authorization', 'Bearer {{accessToken}}', 'JWT access token'));
      headers.push(makeHeader('V-Client-Device-Id', '{{deviceId}}', 'Device UUID'));
    }
    if (sec.OrgSessionAuth !== undefined) {
      headers.push(makeHeader('X-Session-Id', '{{sessionId}}', 'Org session ID'));
      headers.push(makeHeader('X-Client-Id', '{{clientId}}', 'Org client ID'));
    }
  }

  // ── Explicit header parameters ────────────────────────────────────────────
  const params = (operation.parameters || []).map(p => {
    if (p.$ref) return resolveRef(p.$ref, spec) || p;
    return p;
  });

  const queryItems = [];
  for (const param of params) {
    if (param.in === 'header') {
      // Avoid duplicates from security block
      const alreadyAdded = headers.some(h => h.key.toLowerCase() === param.name.toLowerCase());
      if (!alreadyAdded) {
        const knownVar = variableFor(param.name);
        headers.push(makeHeader(
          param.name,
          knownVar || (param.example != null ? String(param.example) : ''),
          param.description || '',
        ));
      }
    } else if (param.in === 'query') {
      queryItems.push({
        key:         param.name,
        value:       param.example != null ? String(param.example) : '',
        description: param.description || '',
        disabled:    !param.required,
      });
    }
  }

  // ── Request body ──────────────────────────────────────────────────────────
  let body = null;
  if (operation.requestBody) {
    const content = operation.requestBody.content || {};
    const jsonContent = content['application/json'];
    if (jsonContent) {
      let example = null;

      // 1. Use the first named example if present
      if (jsonContent.examples) {
        const firstEx = Object.values(jsonContent.examples)[0];
        example = firstEx && firstEx.value ? firstEx.value : null;
      }
      // 2. Fall back to schema example
      if (example == null && jsonContent.schema) {
        if (jsonContent.schema.example !== undefined) {
          example = jsonContent.schema.example;
        } else {
          example = buildExample(jsonContent.schema, spec);
        }
      }

      body = {
        mode: 'raw',
        raw:  JSON.stringify(example, null, 2),
        options: { raw: { language: 'json' } },
      };

      // Add Content-Type if not already in headers
      if (!headers.some(h => h.key.toLowerCase() === 'content-type')) {
        headers.push(makeHeader('Content-Type', 'application/json', ''));
      }
    }
  }

  // ── URL ───────────────────────────────────────────────────────────────────
  const url = buildUrl(pathStr, spec);
  if (queryItems.length > 0) url.query = queryItems;

  return {
    name,
    request: {
      method:      method.toUpperCase(),
      header:      headers,
      url,
      body:        body || undefined,
      description: operation.description || operation.summary || '',
    },
    response: [],
  };
}

/** Convert one OpenAPI spec into an array of tag-grouped Postman folder items */
function specToFolders(spec) {
  // Build tag → folder map
  const tagMeta = {};
  for (const tag of (spec.tags || [])) {
    tagMeta[tag.name] = tag.description || tag.name;
  }

  const folders = {}; // tag name → { name, description, item[] }

  for (const [pathStr, pathItem] of Object.entries(spec.paths || {})) {
    const HTTP_METHODS = ['get','post','put','patch','delete','head','options'];
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation) continue;

      const tags = (operation.tags && operation.tags.length > 0) ? operation.tags : ['General'];
      const item = operationToItem(method, pathStr, operation, spec);

      for (const tag of tags) {
        if (!folders[tag]) {
          folders[tag] = {
            name:  tag,
            description: tagMeta[tag] || '',
            item:  [],
          };
        }
        folders[tag].item.push(item);
      }
    }
  }

  return Object.values(folders);
}

// ─── Main ────────────────────────────────────────────────────────────────────

const topLevelFolders = [];

for (const { file, folder } of SPEC_FILES) {
  const filePath = path.join(REFERENCE_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠  Skipping missing file: ${file}`);
    continue;
  }

  console.log(`📄 Processing ${file}...`);
  const raw  = fs.readFileSync(filePath, 'utf8');
  const spec = yaml.load(raw);

  const subFolders = specToFolders(spec);
  const totalRequests = subFolders.reduce((n, f) => n + f.item.length, 0);
  console.log(`   → ${subFolders.length} tag folder(s), ${totalRequests} request(s)`);

  topLevelFolders.push({
    name:  folder,
    item:  subFolders,
  });
}

const collection = {
  info: {
    _postman_id: uuid(),
    name:   'TAPP Cash — All APIs',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    description:
      'Generated from OpenAPI specs in tapp-third-party-api-doc/reference/.\n\n' +
      'Set the collection variables (or use a Postman Environment) before making requests:\n' +
      '  • tenant       — your org subdomain\n' +
      '  • clientId / clientSecret — for Org API (server-to-server)\n' +
      '  • accessToken / refreshToken — filled automatically after Sign In\n' +
      '  • sessionId    — filled automatically after Create Session\n' +
      '  • deviceId     — any stable UUID for the client device\n',
  },
  item:     topLevelFolders,
  variable: COLLECTION_VARIABLES,
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(collection, null, 2));

const totalRequests = topLevelFolders.reduce(
  (sum, folder) => sum + folder.item.reduce((s, f) => s + (f.item ? f.item.length : 0), 0), 0
);

console.log(`\n✅ Done!`);
console.log(`   Output : ${OUTPUT_FILE}`);
console.log(`   APIs   : ${topLevelFolders.length} top-level folders`);
console.log(`   Total  : ${totalRequests} requests`);
console.log(`\nTo import:`);
console.log(`   1. Open Postman → Import → "Upload Files"`);
console.log(`   2. Select tapp-postman-collection.json`);
console.log(`   3. Edit collection variables (tenant, clientId, etc.) or create an Environment`);
