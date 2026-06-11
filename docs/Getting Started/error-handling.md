---
title: Error Handling
excerpt: HTTP status codes, common error scenarios, and best practices for handling errors in your TAPP Cash integration.
hidden: false
---

Every TAPP Cash error response uses a consistent envelope. Parse the `errors` array to get actionable details.

---

## Error Response Format

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
| `code` | Machine-readable error code — use this for programmatic handling |
| `title` | Short human-readable summary |
| `details` | Additional context about the failure |
| `target` | `"field"` for field-level errors, `"common"` for general errors |
| `source` | The field name that caused the error (when `target` is `"field"`) |

---

## HTTP Status Codes

| Code | Meaning | What to do |
|------|---------|------------|
| `400` | Bad request — validation or business rule failure | Check the `errors` array for field-level details and fix the request |
| `401` | Unauthorized — missing or expired token | Refresh with `POST /auth/refresh`; re-login if refresh token is also expired |
| `403` | Forbidden — valid token but wrong role or endpoint | Verify you are using the correct token type for the endpoint |
| `404` | Resource not found | Check the ID or path in your request |
| `409` | Conflict — resource state prevents the operation | e.g., pending transactions block account closure |
| `422` | Unprocessable — business logic rejection | Inspect the `code` field for the specific reason |
| `429` | Too many requests — rate limit exceeded | Back off and retry with exponential backoff |
| `500` | Internal server error | Retry with exponential backoff; contact support if it persists |

---

## Common Errors

### 401 Unauthorized

```json
{ "errors": [{ "code": "UNAUTHORIZED", "title": "Token expired or missing" }] }
```

**Cause:** Access token expired (30-minute lifetime) or not included in the request.
**Fix:** Call `POST /users/public/v1/auth/refresh` with your `refreshToken` to get a new `accessToken`.

---

### 403 Forbidden

```json
{ "errors": [{ "code": "FORBIDDEN", "title": "Insufficient permissions" }] }
```

**Cause:** Using an individual token on an advisor endpoint, or a temporary token on a full-access endpoint.
**Fix:** Check the token type. Account manager endpoints require an advisor token; individual endpoints require an individual token.

---

### 409 Conflict — Pending Transactions Block Closure

```json
{ "errors": [{ "code": "PENDING_TRANSACTIONS", "title": "Cannot close account with pending transactions" }] }
```

**Fix:** Wait for all transactions to complete before retrying account closure.

---

### 422 Unprocessable

```json
{ "errors": [{ "code": "INVITE_TOKEN_EXPIRED", "title": "Invitation token has expired" }] }
```

**Fix:** The account manager must send a new invitation. The original invite link is no longer valid.

---

## Retry Strategy

For `500` and `429` errors use exponential backoff:

| Attempt | Wait before retry |
|---------|-------------------|
| 1st retry | 1 second |
| 2nd retry | 2 seconds |
| 3rd retry | 4 seconds |
| 4th retry | 8 seconds |

Do not retry `400`, `401`, `403`, `404`, or `422` — these require a code or request fix, not a retry.
