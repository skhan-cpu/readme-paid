# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

This is the **public developer documentation** for the TAPP Cash third-party / Org API, authored in [ReadMe.com](https://readme.com)'s Git-sync format and published at developers.tappcash.com. It is **documentation, not application code** — there is no build step, no server, and no `package.json`. The actual API implementation lives in the sibling `tapp-*` Go services of the parent monorepo (see `../CLAUDE.md`).

Everything here is either an OpenAPI spec, a Markdown page with ReadMe frontmatter, or an ordering file that ReadMe consumes to render navigation.

## Layout

```
reference/          API Reference section
  openapi-*.yaml    7 OpenAPI 3 specs — the source of truth for endpoints
  <Category>/       Markdown pages that annotate spec operations (grouped, optionally nested)
docs/               "Guides" section — conceptual/how-to prose (Getting Started, TAPP Cash)
recipes/            ReadMe "Recipes" — runnable step-by-step tutorials (curl-based)
convert-to-postman.js   Node script → tapp-postman-collection.json
tapp-postman-collection.json   Generated Postman v2.1 collection (committed)
```

### The `_order.yaml` convention (critical)

Every directory that maps to a ReadMe section/category contains an `_order.yaml` — a plain list that dictates **sidebar ordering**. When you add a page or category, you must add its slug to the parent `_order.yaml` or it will not appear (or will appear last/unordered). Entries are slugs (filename without `.md`, or subdirectory name), not titles.

### Page frontmatter

- **Reference pages** link a Markdown body to an OpenAPI operation:
  ```yaml
  ---
  title: Create ACH Transfer
  api:
    file: openapi-v0.yaml          # which spec in reference/
    operationId: individualCreateACHTransfer   # must match an operationId in that spec
  privacy:
    view: public
  ---
  ```
  The Markdown body renders **above** the auto-generated request/response UI — use it for role-based access tables, prerequisites, and cross-links. An `index.md` in a category folder is that category's landing page.
- **Recipes** use a `recipe:` block (`color`, `icon`) plus `description`; body is fenced code blocks with per-step titles and `<!-- shell@ -->` step markers.
- `privacy.view` (`public` / `anyone_with_link`) and `hidden: true` control visibility.

## The OpenAPI Specs

Each spec is a separate ReadMe "API definition" and a top-level Postman folder. Keep `operationId`s stable — reference pages reference them by name.

| File | API | Base path |
|------|-----|-----------|
| `openapi-auth-v1.yaml` | Authentication | `/` |
| `openapi-org-api-v1.yaml` | Org API (server-to-server) | `/org` |
| `openapi-v0.yaml` | Individual User API | `/org` |
| `openapi-admin-v1.yaml` | Administration API | `/org` |
| `openapi-business-v1.yaml` | Business Owner API | `/org` |
| `openapi-branchmanager-v1.yaml` | Branch Manager API | `/` |
| `openapi-superadvisor-v1.yaml` | Head Branch Manager API | `/` |

Server URL pattern: `https://api-{tenant}.stage2.tappbank.com` (staging) → `https://api-{tenant}.tappcash.com` (production). `{tenant}` is the org subdomain.

**Auth model documented here:** server-to-server clients POST `clientId`+`clientSecret` to create a session (`sessionId`, 24h); user flows use JWT `Authorization: Bearer` tokens (ES512-signed). Add `customerUid` to a session to act on behalf of a user.

## Common Tasks

There are no test/lint/build commands. The workflow is edit → validate → sync to ReadMe (sync is done by ReadMe's Git integration / `rdme`, configured outside this repo).

```bash
# Validate a spec before committing (both work; either tool)
npx --yes @apidevtools/swagger-cli validate reference/openapi-v0.yaml
npx --yes js-yaml reference/openapi-v0.yaml >/dev/null   # YAML syntax only

# Regenerate the Postman collection after changing any spec
node convert-to-postman.js        # writes ./tapp-postman-collection.json
```

Notes on `convert-to-postman.js`: it hardcodes `require('/tmp/node_modules/js-yaml')`, so `js-yaml` must be installed there first (e.g. `npm i --prefix /tmp js-yaml`). Its `SPEC_FILES` list also references `openapi-operator-v1.yaml`, which is not present in `reference/` — add the spec or prune the entry if you touch that script.

## Conventions When Editing

- **Product name is "TAPP Cash"** (all caps + "Cash"), never "TaPP" or "TaPP Cash". Support email is `support@tappcash.com`. Past commits ran bulk `sed` to normalize these — keep new text consistent.
- Adding an endpoint page: create the operation in the correct `openapi-*.yaml`, add a Markdown page under the matching `reference/<Category>/` folder with `api.file`/`operationId` frontmatter, and register its slug in the folder's `_order.yaml`.
- Prefer many small focused pages grouped by domain (Accounts, Onboarding, Administration API, …) over large combined pages — mirror the existing structure.
- Keep role-based access tables (Individual / Business Owner / Operator / Advisor / Branch Manager / Head Branch Manager / Super Advisor) on endpoints that vary by role; this is a recurring pattern across reference pages.

## Security Note

`.claude/settings.local.json` and the git remote currently contain live-looking secrets (a GitHub PAT in the `origin` URL, real JWT bearer tokens, and test credentials captured in the permission allowlist). Do not copy these into committed files, and treat them as exposed — they should be rotated. Never hardcode credentials into specs, recipes, or the Postman collection; use `{{variables}}` / placeholders like the existing examples do.
