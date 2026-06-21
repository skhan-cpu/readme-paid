---
title: Org API Session (Server-to-Server Auth)
description: Create a session with ClientId + ClientSecret, make API calls with the session headers, then revoke the session on logout or job completion.
hidden: false
recipe:
  color: '#8B5CF6'
  icon: 🔐
---

```shell Step 1 — Create Session (System)
curl -X POST https://api-test.stage2.tappbank.com/entrypoint/org/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "ci_test_3f7a9c2e-1234-5678-abcd-ef0123456789",
    "clientSecret": "cs_test_AbCdEf123..."
  }'
```

```json Response
{
  "data": {
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "expiresAt": "2026-06-22T10:00:00Z"
  }
}
```

# Step 1 — Create a Session

<!-- shell@ -->

POST your `clientId` and `clientSecret` in the request body. Sessions are valid for **24 hours**.

**Acting on behalf of a specific user?** Add `customerUid` to scope the session to that customer. This sets `deviceSessionType` to `User` in audit logs:

```shell Step 1b — Create Session (on behalf of a User)
curl -X POST https://api-test.stage2.tappbank.com/entrypoint/org/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "ci_test_3f7a9c2e-1234-5678-abcd-ef0123456789",
    "clientSecret": "cs_test_AbCdEf123...",
    "customerUid": "usr_7f3a9b12-0000-0000-0000-000000000000"
  }'
```

Store the `sessionId` securely in memory. Do not log it or persist it to disk.

# Step 2 — Call API Endpoints

<!-- shell@ -->

Include `X-Session-Id` and `X-Client-Id` on every request. The gateway validates that the session belongs to the supplied `clientId`.

```shell Step 2 — Call an Endpoint
curl https://api-test.stage2.tappbank.com/accounts/private/v1/accounts \
  -H "X-Session-Id: 550e8400-e29b-41d4-a716-446655440000" \
  -H "X-Client-Id: ci_test_3f7a9c2e-1234-5678-abcd-ef0123456789"
```

```json Response
{
  "data": [
    {
      "id": "acc_abc123",
      "balance": "1000.00",
      "currency": "USD"
    }
  ]
}
```

Both headers are required on every call. A missing header or a mismatch between the `clientId` and the session's issuing credential returns `401`.

# Step 3 — Handle Session Expiry

<!-- shell@ -->

Sessions expire after **24 hours**. When you receive `401` on any call, create a new session from Step 1 and retry.

```
401 Unauthorized  →  POST /entrypoint/org/v1/sessions  →  retry original request
```

**Do not reuse an expired `sessionId`.** It is permanently invalid. Each new session call generates a fresh `sessionId`.

# Step 4 — Revoke the Session

<!-- shell@ -->

Revoke explicitly when the job is complete or the user logs out of your integration.

```shell Step 4 — Revoke Session
curl -X DELETE https://api-test.stage2.tappbank.com/entrypoint/org/v1/sessions/550e8400-e29b-41d4-a716-446655440000 \
  -H "X-Session-Id: 550e8400-e29b-41d4-a716-446655440000" \
  -H "X-Client-Id: ci_test_3f7a9c2e-1234-5678-abcd-ef0123456789"
```

A successful revoke returns `204 No Content`. Any further use of the revoked `sessionId` returns `401`.

| Event | Action |
|-------|--------|
| Session expires (24h) | Create a new session |
| User logs out of your app | `DELETE /sessions/{id}` |
| Job completes | `DELETE /sessions/{id}` |
| Credential compromised | Revoke credential via Tech Admin, rotate secret |
