---
title: Account Manager
deprecated: false
hidden: false
metadata:
  robots: index
---
## Request an API Key

Account manager credentials are provisioned by the TAPP Cash platform team — they are not self-service. To request access:

1. Email **[support@tappcash.com](mailto:support@tappcash.com)** with the following details:

   | Field        | Description                                   |
   | ------------ | --------------------------------------------- |
   | Full name    | Your full name                                |
   | Organization | Your company or institution name              |
   | Environment  | Staging or Production                         |
   | Use case     | Brief description of what you are integrating |

2. The team will review your request, create your account, and reply with your `login` (email) and a temporary password.

3. On first sign-in, you will be prompted to change your password.

> Credentials are environment-specific — staging credentials will not work against the production base URL.

For key rotations or access issues, contact **[support@tappcash.com](mailto:support@tappcash.com)**.

***

## Sign in as an account manager

`POST /users/public/v1/auth/signin`

```json
{
  "login": "manager@example.com",
  "password": "YourPassword123!",
  "roles": ["advisor"]
}
```

Returns `accessToken` (30 min) and `refreshToken` (30 days). Use the `accessToken` in the `Authorization` header for all subsequent account manager calls.

```
Authorization: Bearer <accessToken>
```

> **Note:** Pass `"roles": ["advisor"]` only when signing in as an account manager. Do not include it for individual user sign-ins — the platform resolves the role from the account record.

### Refresh an expired token

`POST /users/public/v1/auth/refresh`

Pass the `refreshToken` to get a new `accessToken` without re-login. Do this automatically when you receive a `401` on any private endpoint.

***

## List managed individuals

`GET /branches/private/v1/individual`

- **Auth**: Account manager access token
- Returns a paginated list of all individuals under this manager's branch.
- **Pagination**: `page[size]` and `page[number]` (default: 20 per page).

```
GET /branches/private/v1/individual?page[number]=1&page[size]=20
Authorization: Bearer <manager_token>
```

Response shape (abbreviated):

```json
{
  "data": [
    {
      "id": "cba69452-3767-47cc-9b54-1d82a3549741",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@example.com",
      "phoneNumber": "+12025550191",
      "status": "active",
      "currentTier": { "id": 21, "name": "Entry", "level": 0 }
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

***

## View an individual's full profile

`GET /branches/private/v1/individual/{id}`

- **Auth**: Account manager access token
- `{id}` is the individual's UUID returned by the list endpoint.

***

## Send an invitation to a new individual

`POST /branches/private/v1/individual`

- **Auth**: Account manager access token
- Triggers the invitation email to the user. Once sent, the user follows the onboarding steps documented in the **Individual User** guide.

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phoneNumber": "+12025550191"
}
```

On success (`200`), the individual record is created with `status: "invited"` and the invitation email is dispatched automatically.

***

## Authentication errors

| Status | Cause                            | Fix                                                                |
| ------ | -------------------------------- | ------------------------------------------------------------------ |
| `401`  | Missing or expired `accessToken` | Call `POST /users/public/v1/auth/refresh` with your `refreshToken` |
| `401`  | Invalid credentials              | Verify `login` and `password`; contact support if locked out       |
| `403`  | Valid token but wrong role       | Ensure you are signing in with `"roles": ["advisor"]`              |

<br />
