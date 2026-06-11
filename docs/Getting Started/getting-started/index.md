---
title: TAPP Cash
excerpt: >-
  TAPP Cash is a modern banking platform that lets you embed financial accounts,
  transfers, and KYC into your product. These docs cover everything your
  engineering team needs to integrate the TAPP Cash API — from inviting a user
  all the way through daily banking operations.
hidden: false
---
## What can you build?

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0">

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">

<strong>Account Manager Workflows</strong><br /><br />
Sign in as an advisor, manage your portfolio of individuals, send invitations, and track onboarding status across your branch.

</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">

<strong>Individual Onboarding</strong><br /><br />
Guide users through invitation acceptance, W9 certification, security setup, phone verification, and KYC submission — all via API.

</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">

<strong>Money Movement</strong><br /><br />
Internal transfers between a user's own accounts (TBA) and ACH pulls/pushes to linked external bank accounts.

</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">

<strong>Account Activity</strong><br /><br />
Real-time balances, full transaction history with status filtering, and a notification system with unread-count badges.

</div>

</div>

***

## Quickstart

**1. Get credentials**

Contact **[support@tappcash.com](mailto:support@tappcash.com)** to request your account manager credentials. Include your name, organization, environment (staging or production), and a brief description of your integration.

**2. Sign in**

```bash
curl -X POST "https://api-test.stage2.tappbank.com/users/public/v1/auth/signin" \
  -H "Content-Type: application/json" \
  -d '{ "login": "manager@example.com", "password": "YourPassword123!", "roles": ["advisor"] }'
```

Store the `accessToken` (30 min) and `refreshToken` (30 days) from the response.

**3. Invite an individual**

```bash
curl -X POST "https://api-test.stage2.tappbank.com/branches/private/v1/individual" \
  -H "Authorization: Bearer <accessToken>" \
  -H "Content-Type: application/json" \
  -d '{ "firstName": "Jane", "lastName": "Doe", "email": "jane@example.com", "phoneNumber": "+12025550191" }'
```

The user receives an invitation email. From here, follow the **Individual User** guide to walk them through onboarding Steps 1–10.

**4. Explore the reference**

Browse all endpoints with full request schemas, response shapes, and live try-it-out in the **API Reference**.

***

## Recipes

Step-by-step guides for common integration patterns.

| Recipe                                | What it covers                                                        |
| ------------------------------------- | --------------------------------------------------------------------- |
| **Account Manager: Sign in & invite** | Authenticate as advisor, list managed individuals, send an invitation |
| **Individual onboarding**             | Steps 1–10: validate token → accept invite → KYC → token exchange     |
| **Sign in as returning user**         | Standard login flow and token refresh for individual users            |
| **Internal transfer (TBA)**           | Preview fees and move funds between a user's own accounts             |
| **External account linking (ACH)**    | BaaS token → Plaid link → pull or push funds                          |
| **Notifications**                     | Unread count, list, mark read                                         |
| **Account closure**                   | Two-step OTP-confirmed deletion                                       |

***

## Base URL

| Environment | URL                                          |
| ----------- | -------------------------------------------- |
| Staging     | `https://api-test.stage2.tappbank.com`       |
| Production  | Contact support for your production base URL |

***

## Authentication

All requests to private endpoints require a Bearer token in the `Authorization` header.

```
Authorization: Bearer <your_token>
```

Tokens are issued by `POST /users/public/v1/auth/signin`. Access tokens expire after **30 minutes** — use `POST /users/public/v1/auth/refresh` with your refresh token to get a new one without re-login.

To obtain credentials, contact **[support@tappcash.com](mailto:support@tappcash.com)**.

***

## Standard response format

Every response follows the same envelope.

**Success**

```json
{
  "data": {},
  "meta": {}
}
```

**Error**

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

Common status codes:

| Code | Meaning                                                                           |
| ---- | --------------------------------------------------------------------------------- |
| 400  | Bad request — check the `errors` array for field-level details                    |
| 401  | Unauthorized — missing or expired Bearer token                                    |
| 403  | Forbidden — valid token but endpoint is outside your role, or token type mismatch |
| 404  | Resource not found                                                                |
| 409  | Conflict — e.g. pending transactions block account closure                        |
| 422  | Unprocessable — business logic rejection, see `code` field for reason             |
| 500  | Internal server error — contact support                                           |

***

## Role-based access

Your credentials are scoped to a role. Calling an endpoint outside your role returns `403 Forbidden`.

| Role                          | Access                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| **Advisor** (Account Manager) | Manage individuals, send invitations, view branch portfolio                           |
| **Individual**                | Banking features — accounts, balances, transfers, notifications, KYC, account closure |

***

## Support

| Topic                | Contact                                             |
| -------------------- | --------------------------------------------------- |
| Credentials & access | [support@tappcash.com](mailto:support@tappcash.com) |
| Developer docs       | developers.tappcash.com                             |
| API reference        | developers.tappcash.com/reference                   |

<br />
