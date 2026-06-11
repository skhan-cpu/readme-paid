---
title: Onboarding
excerpt: How to request API access, sign in as an account manager, and invite your first individual user.
hidden: false
---

The TAPP Cash journey starts with the account manager. The manager requests credentials, signs in, and sends invitation emails that start each individual user's onboarding flow.

---

## Step 1 — Request an API Key

Account manager credentials are provisioned by the TAPP Cash platform team — they are not self-service.

Email **[support@tappcash.com](mailto:support@tappcash.com)** with the following details:

| Field | Description |
|-------|-------------|
| Full name | Your full name |
| Organization | Your company or institution name |
| Environment | Staging or Production |
| Use case | Brief description of what you are integrating |

The team will review your request, create your account, and reply with your `login` (email) and a temporary password. On first sign-in you will be prompted to change it.

> Credentials are environment-specific — staging credentials will not work against the production base URL.

---

## Step 2 — Sign In

`POST /users/public/v1/auth/signin`

```json
{
  "login": "manager@example.com",
  "password": "YourPassword123!",
  "roles": ["advisor"]
}
```

**Response:**

```json
{
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "LUF..."
  }
}
```

Store both tokens. The `accessToken` expires after **30 minutes**. The `refreshToken` is valid for **30 days**.

> Pass `"roles": ["advisor"]` only when signing in as an account manager. Do not include it for individual user sign-ins.

---

## Step 3 — Refresh an Expired Token

`POST /users/public/v1/auth/refresh`

Pass the `refreshToken` in the request body to obtain a new `accessToken` without requiring the manager to re-login. Call this automatically whenever you receive a `401` on a private endpoint.

---

## Step 4 — List Your Managed Individuals

`GET /branches/private/v1/individual`

- **Auth**: Account manager access token
- Returns a paginated list of all individuals under this manager's branch.

```
GET /branches/private/v1/individual?page[number]=1&page[size]=20
Authorization: Bearer <manager_token>
```

**Response (abbreviated):**

```json
{
  "data": [
    {
      "id": "cba69452-3767-47cc-9b54-1d82a3549741",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "status": "active"
    }
  ],
  "meta": {
    "totalRecord": 127,
    "totalPage": 7,
    "pageNumber": 1,
    "limit": 20
  }
}
```

---

## Step 5 — View an Individual's Profile

`GET /branches/private/v1/individual/{id}`

- **Auth**: Account manager access token
- `{id}` is the individual's UUID returned by the list endpoint.

---

## Step 6 — Invite a New Individual

`POST /branches/private/v1/individual`

- **Auth**: Account manager access token

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phoneNumber": "+12025550191"
}
```

On success (`200`) the individual record is created with `status: "invited"` and an invitation email is dispatched automatically. The user then follows the [Individual Account](./individual-account) onboarding steps 1–10.

---

## Authentication Errors

| Status | Cause | Fix |
|--------|-------|-----|
| `401` | Missing or expired `accessToken` | Call `POST /users/public/v1/auth/refresh` with your `refreshToken` |
| `401` | Invalid credentials | Verify `login` and `password`; contact support if locked out |
| `403` | Valid token but wrong role | Ensure you are signing in with `"roles": ["advisor"]` |
