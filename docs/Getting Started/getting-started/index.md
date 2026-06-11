---
title: TAPP Cash
excerpt: >-
  TAPP Cash is a modern banking platform that lets you embed financial accounts,
  transfers, and KYC into your product. These docs cover everything your
  engineering team needs to integrate the TAPP Cash API — from inviting a user
  all the way through daily banking operations.
hidden: false
---
TaPP (The App Platform) is a white-label financial platform for account managers and their individual users. The API gives you programmatic control over the full user lifecycle — from sending the first invitation and guiding KYC through daily banking, money movement, and account closure.

***

## What can you build?

<div class="CardsGrid" style="--CardsGrid-cardWidth: 200px; --CardsGrid-columns: auto-fit;">

<a class="Card Card_card" href="/docs/account-manager">
<i class="Card-icon fa-duotone fa-solid fa-user-tie"></i>
<div class="Card-content">
<div class="Card-title">Account Manager Workflows<i aria-hidden="true" class="Card-arrow fa-regular fa-arrow-right"></i></div>
<p>Sign in as an advisor, manage your portfolio of individuals, send invitations, and track onboarding status across your branch.</p>
</div>
</a>

<a class="Card Card_card" href="/docs/individual-user">
<i class="Card-icon fa-duotone fa-solid fa-id-card"></i>
<div class="Card-content">
<div class="Card-title">Individual Onboarding<i aria-hidden="true" class="Card-arrow fa-regular fa-arrow-right"></i></div>
<p>Guide users through invitation acceptance, W9 certification, security setup, phone verification, and KYC submission — all via API.</p>
</div>
</a>

<a class="Card Card_card" href="/docs/individual-user#money-movement">
<i class="Card-icon fa-duotone fa-solid fa-money-bill-transfer"></i>
<div class="Card-content">
<div class="Card-title">Money Movement<i aria-hidden="true" class="Card-arrow fa-regular fa-arrow-right"></i></div>
<p>Internal transfers between a user's own accounts (TBA) and ACH pulls/pushes to linked external bank accounts.</p>
</div>
</a>

<a class="Card Card_card" href="/docs/individual-user#account-activity">
<i class="Card-icon fa-duotone fa-solid fa-chart-line"></i>
<div class="Card-content">
<div class="Card-title">Account Activity<i aria-hidden="true" class="Card-arrow fa-regular fa-arrow-right"></i></div>
<p>Real-time balances, full transaction history with status filtering, and a notification system with unread-count badges.</p>
</div>
</a>

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
