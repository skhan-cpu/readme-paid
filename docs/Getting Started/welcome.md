---
title: Welcome to TAPP Cash
hidden: false
---

TappCash is a financial platform API that lets organizations embed banking capabilities into their products. With TappCash, you can build and manage the full client lifecycle — from inviting users and verifying their identity through daily banking operations including transfers, account management, and reporting.

These docs are for engineering teams integrating the TappCash API on behalf of your organization.

---

## What can you build?

<Cards>
  <Card title="Admin Operations" href="./platform-overview" icon="fa-duotone fa-sitemap">Manage your organization's admin hierarchy — branches, Head Branch Managers, Branch Managers, and Advisors — and oversee all client portfolios, transfers, and reports from a single API.</Card>
  <Card title="Individual Client Onboarding" href="./individual-user" icon="fa-duotone fa-user-check">Guide individual users through invitation acceptance, KYC verification, account setup, and full banking access.</Card>
  <Card title="Business Client Onboarding" href="./onboarding" icon="fa-duotone fa-building">Onboard Business Owner clients through KYB verification, manage their accounts, and enable Operator access for their team.</Card>
  <Card title="Money Movement" href="./individual-user/move-money" icon="fa-duotone fa-arrow-right-arrow-left">Internal transfers between accounts (TBA), ACH pulls and pushes to external bank accounts, and automated recurring payments.</Card>
  <Card title="Account Activity" href="./individual-user/accounts" icon="fa-duotone fa-chart-line">Real-time balances, full transaction history with filtering, account statements, and notifications with unread-count badges.</Card>
</Cards>

---

## Quickstart

<Cards>
  <Card title="Get Credentials" href="mailto:support@tappcash.com" icon="fa-duotone fa-key">Contact support@tappcash.com to request your organization's API credentials. Include your organization name, environment, and use case.</Card>
  <Card title="Sign In & Configure" href="./onboarding" icon="fa-duotone fa-right-to-bracket">Authenticate as the Root Advisor, change your temporary password, and begin setting up your admin hierarchy.</Card>
  <Card title="Invite Your First Client" href="./onboarding" icon="fa-duotone fa-envelope">Once an Advisor is set up, send your first client invitation — Individual or Business Owner — to kick off their onboarding flow.</Card>
  <Card title="Move Money" href="./individual-user/move-money" icon="fa-duotone fa-money-bill-transfer">Transfer funds between a user's own internal accounts (TBA) or pull/push to linked external bank accounts via ACH.</Card>
</Cards>

---

## Recipes

Step-by-step guides for common integration patterns.

<Cards>
  <Card title="Advisor: Sign In & Invite" href="./onboarding" icon="fa-duotone fa-user-tie">Authenticate as an Advisor and send your first invitation to an Individual or Business Owner client.</Card>
  <Card title="Individual Registration" href="./individual-user/registration" icon="fa-duotone fa-id-card">Steps 1–10: validate token → accept invite → KYC → token exchange.</Card>
  <Card title="Sign In as Returning User" href="./authentication" icon="fa-duotone fa-arrow-right-to-bracket">Standard login flow and token refresh for client users.</Card>
  <Card title="Internal Transfer (TBA)" href="./individual-user/move-money" icon="fa-duotone fa-shuffle">Preview fees and move funds between a user's own accounts.</Card>
  <Card title="External Account Linking (ACH)" href="./individual-user/move-money" icon="fa-duotone fa-building-columns">BaaS token → Plaid link → pull or push funds to external bank accounts.</Card>
  <Card title="Notifications" href="./individual-user/notifications" icon="fa-duotone fa-bell">Unread count, list notifications, mark as read.</Card>
  <Card title="Account Closure" href="./individual-user/account-closure" icon="fa-duotone fa-circle-xmark">Two-step OTP-confirmed deletion flow.</Card>
</Cards>

---

## Base URL

| Environment | Base URL                                                                                 |
|-------------|------------------------------------------------------------------------------------------|
| Staging     | `https://api-test.stage2.tappbank.com`                                                   |
| Production  | Contact [support@tappcash.com](mailto:support@tappcash.com) for your production base URL |

---

## Authentication

All requests to private endpoints require a Bearer token in the `Authorization` header.

```
Authorization: Bearer <your_token>
```

Tokens are issued by `POST /users/public/v1/auth/signin`. Access tokens expire after **30 minutes** — use
`POST /users/public/v1/auth/refresh` with your refresh token to get a new one without re-login.

To obtain credentials, contact **[support@tappcash.com](mailto:support@tappcash.com)**.

---

## Rate Limits

The API gateway enforces rate limits per client IP. Limits are configured per endpoint — every response includes headers
so you can track your current usage.

| Header                  | Description                                    |
|-------------------------|------------------------------------------------|
| `X-RateLimit-Limit`     | Maximum requests allowed in the current window |
| `X-RateLimit-Remaining` | Requests remaining in the current window       |
| `X-RateLimit-Reset`     | Unix timestamp when the window resets          |

When the limit is exceeded the API returns `429 Too Many Requests`. Back off and retry after the time indicated by
`X-RateLimit-Reset`. See [Error Handling](./error-handling) for the full retry strategy.

---

## Standard Response Format

Every response — success or error — follows the same envelope.

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

| Code | Meaning                                                        |
|------|----------------------------------------------------------------|
| 400  | Bad request — check the `errors` array for field-level details |
| 401  | Unauthorized — missing or expired Bearer token                 |
| 403  | Forbidden — valid token but endpoint is outside your role      |
| 404  | Resource not found                                             |
| 409  | Conflict — e.g. pending transactions block account closure     |
| 422  | Unprocessable — business logic rejection, see `code` field     |
| 500  | Internal server error — contact support                        |

---

## Role-Based Access

Your token is scoped to a role. Calling an endpoint outside your role returns `403 Forbidden`.

| Role                    | Access                                                                                                            |
|-------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Root Advisor**        | Full organizational management — branches, admin tiers, all client portfolios, and reports                        |
| **Head Branch Manager** | Manage Advisors, oversee all client activity — transfers, transfer requests, auto-payments, and reports           |
| **Branch Manager**      | Manage Advisors, review client portfolios, transfer requests, reports, and configure approval settings            |
| **Advisor**             | Invite and manage Individual and Business Owner clients — transfers, transfer requests, auto-payments, and reports |
| **Business Owner**      | Hold business accounts, complete KYB, invite and manage Operators, initiate transfers and auto-payments           |
| **Individual**          | Hold personal accounts, complete KYC, initiate transfers (TBA and ACH), and view account activity                 |
| **Operator**            | Manage a Business Owner's accounts with granted permissions — transfer funds and set up auto-payments             |

---

## Support

| Topic                | Contact                                             |
|----------------------|-----------------------------------------------------|
| Credentials & access | [support@tappcash.com](mailto:support@tappcash.com) |
| Developer docs       | developers.tappcash.com                             |
| API reference        | developers.tappcash.com/reference                   |
