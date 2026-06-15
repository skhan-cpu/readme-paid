---
title: Welcome to TAPP Cash
hidden: false
---

TappCash is a financial platform API that lets organizations embed banking capabilities into their products. With TappCash, you can build and manage the full client lifecycle — from inviting users and verifying their identity through daily banking operations including transfers, account management, and reporting.

These docs are for engineering teams integrating the TappCash API on behalf of your organization.

---

## What can you build?

<Cards>
  <Card title="KYC & KYB Onboarding" href="./individual-user/registration" icon="fa-duotone fa-id-card">Compliance-grade identity verification for individuals and businesses. Guided 10-step flows — phone OTP, security questions, W9 certification, identity documents — gate account access until fully verified.</Card>
  <Card title="Business Accounts & Operator Delegation" href="./business-owner" icon="fa-duotone fa-users-gear">Business Owner accounts with granular Operator access. Invite team members as Operators and control exactly what they can do — move funds internally, initiate ACH transfers, or schedule recurring payments.</Card>
  <Card title="Internal & ACH Transfers" href="./individual-user/move-money" icon="fa-duotone fa-money-bill-transfer">Move funds between TappCash accounts (TBA) or connect external bank accounts via Plaid for ACH pulls and pushes. Preview fees before execution and track status through to final settlement.</Card>
  <Card title="Recurring Payment Automation" href="./operator/auto-payments" icon="fa-duotone fa-calendar-check">Schedule weekly, biweekly, or monthly recurring payments with flexible stop conditions — a fixed end date, a cumulative spend limit, or run indefinitely until cancelled.</Card>
  <Card title="Branch & Admin Hierarchy" href="./administration/branches" icon="fa-duotone fa-sitemap">Deploy a full admin structure across branches — Root Advisor, Head Branch Managers, Branch Managers, and Advisors — each scoped to their portfolio. Configure transfer approval thresholds per branch.</Card>
  <Card title="Portfolio Reporting & Balance Export" href="./administration/clients" icon="fa-duotone fa-chart-mixed">Transaction history with filtering, balance trend charts, downloadable PDF account statements, and XLSX balance exports across your entire client portfolio — all scoped by admin role.</Card>
</Cards>

---

## Quickstart

<Cards>
  <Card title="1. Request Credentials" href="mailto:support@tappcash.com" icon="fa-duotone fa-key">Email support@tappcash.com with your organization name and target environment. You'll receive Root Advisor credentials and your staging base URL.</Card>
  <Card title="2. Sign In & Build Your Admin Hierarchy" href="./onboarding" icon="fa-duotone fa-sitemap">Authenticate as Root Advisor, exchange your temporary password, then create branches and assign Head Branch Managers, Branch Managers, and Advisors.</Card>
  <Card title="3. Invite Your First Client" href="./individual-user/registration" icon="fa-duotone fa-paper-plane">With an Advisor in place, send your first invitation — Individual for KYC or Business Owner for KYB. The client receives an invitation link by email and begins their guided onboarding flow.</Card>
  <Card title="4. Execute Your First Transfer" href="./individual-user/move-money" icon="fa-duotone fa-money-bill-transfer">Once a client completes onboarding, preview and execute a TBA transfer between their accounts — or link an external bank via Plaid and initiate an ACH pull or push.</Card>
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
