---
title: Token Refresh
description: Sign in, use the access token, silently refresh it on expiry, and re-authenticate when the refresh token expires.
hidden: false
recipe:
  color: '#6B7280'
  icon: 🔑
---

```shell Step 1 — Sign In
curl -X POST https://api-test.stage2.tappbank.com/users/public/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "login": "user@example.com",
    "password": "YourPassword123!"
  }'
```

```json Response
{
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "LUF..."
  }
}
```

# Step 1 — Sign In

<!-- shell@ -->

Store both tokens securely. Use `accessToken` on every private API call via the `Authorization` header. The `accessToken` expires after **30 minutes**; the `refreshToken` is valid for **30 days**.

```
Authorization: Bearer <accessToken>
V-Client-Device-Id: <device-uuid>
```

# Step 2 — Refresh on 401

<!-- shell@ -->

When any private endpoint returns `401 Unauthorized`, silently refresh the access token and retry the original request. Do not prompt the user to re-login unless the refresh itself fails.

```shell Step 2 — Refresh on 401
curl -X POST https://api-test.stage2.tappbank.com/users/public/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{ "refreshToken": "LUF..." }'
```

```json Response
{
  "data": {
    "accessToken": "eyJ..."
  }
}
```

# Step 3 — Re-Authenticate on Expired Refresh Token

<!-- shell@ -->

If `POST /auth/refresh` itself returns `401`, the refresh token has expired. Redirect the user to the sign-in screen and repeat from Step 1.

```shell Step 3 — Confirm Token Identity
curl https://api-test.stage2.tappbank.com/users/private/v1/auth/me \
  -H "Authorization: Bearer <accessToken>" \
  -H "V-Client-Device-Id: <device-uuid>"
```

```json Response
{
  "data": {
    "id": "<user-id>",
    "email": "user@example.com",
    "role": "individual"
  }
}
```

> Call `GET /users/private/v1/auth/me` on app launch to confirm token validity and load user context before making other requests.

| Token | Lifetime | Action on expiry |
|---|---|---|
| `accessToken` | 30 minutes | Call `POST /auth/refresh` |
| `refreshToken` | 30 days | Redirect user to sign-in |
