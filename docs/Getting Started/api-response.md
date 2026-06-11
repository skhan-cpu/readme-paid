---
title: API Response Format
excerpt: The standard JSON envelope used by all TAPP Cash API responses — success, error, and paginated.
hidden: false
---

Every TAPP Cash API response follows the same envelope structure, whether it succeeds or fails.

---

## Success Response

```json
{
  "data": {},
  "meta": {}
}
```

| Field | Type | Description |
|-------|------|-------------|
| `data` | object \| array | The response payload. An object for single resources, an array for lists. |
| `meta` | object | Pagination and other metadata. Present on list endpoints. |

---

## Paginated Response

List endpoints include a `meta` object with pagination details.

```json
{
  "data": [
    { "id": "...", "firstName": "Jane", "lastName": "Doe" }
  ],
  "meta": {
    "totalRecord": 127,
    "totalPage": 7,
    "pageNumber": 1,
    "limit": 20
  }
}
```

| Meta field | Description |
|------------|-------------|
| `totalRecord` | Total number of records across all pages |
| `totalPage` | Total number of pages |
| `pageNumber` | Current page number |
| `limit` | Records per page |

**Pagination query params:**

```
?page[number]=1&page[size]=20
```

---

## Error Response

```json
{
  "errors": [
    {
      "code": "ERROR_CODE",
      "title": "Human-readable summary",
      "details": "Additional context",
      "target": "field | common",
      "source": "fieldName"
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `code` | Machine-readable identifier — use this for programmatic error handling |
| `title` | Short, human-readable summary |
| `details` | Additional context or instruction |
| `target` | `"field"` for field-level errors, `"common"` for request-level errors |
| `source` | The field name that caused the error (only present when `target` is `"field"`) |

---

## Multiple Errors

A single request can return multiple errors. Always iterate the full `errors` array.

```json
{
  "errors": [
    {
      "code": "REQUIRED_FIELD",
      "title": "Field is required",
      "target": "field",
      "source": "dateOfBirth"
    },
    {
      "code": "REQUIRED_FIELD",
      "title": "Field is required",
      "target": "field",
      "source": "socialSecurityNumber"
    }
  ]
}
```

---

## Special Case: Step 3 Onboarding (Intentional 403)

During individual user onboarding, `POST /branches/public/v1/individual/invites/accept` returns HTTP `403` on success. This is intentional — the response body contains the `temporaryAccessToken` alongside an errors array describing the remaining required steps.

```json
{
  "data": { "temporaryAccessToken": "eyJ..." },
  "errors": [
    {
      "code": "required additional actions",
      "meta": { "fields": ["phoneNumber", "kyc"] }
    }
  ]
}
```

Check for `data.temporaryAccessToken` in the response body even when the HTTP status is `403`.
