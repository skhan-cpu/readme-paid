---
title: Welcome to TAPP Cash
hidden: false
---

TAPP Cash is a financial platform API that lets organizations embed banking capabilities into their products. With TAPP Cash, you can build and manage the full client lifecycle — from inviting users and verifying their identity through daily banking operations including transfers, account management, and reporting.

These docs are for engineering teams integrating the TAPP Cash API on behalf of your organization.

---

## What can you build?

<Cards>
  <Card title="Identity Verification" href="/docs/individual-registration" icon="fa-duotone fa-id-card">Compliant KYC and KYB onboarding with phone OTP, security questions, W9 certification, and identity documents.</Card>
  <Card title="Operator Delegation" href="/docs/business-owner" icon="fa-duotone fa-users-gear">Business Owners invite team members as Operators with scoped permissions — transfer funds, run ACH, or schedule payments.</Card>
  <Card title="Money Movement" href="/docs/individual-move-money" icon="fa-duotone fa-money-bill-transfer">Internal transfers between accounts (TBA) and external ACH via Plaid — with fee preview before every execution.</Card>
  <Card title="Auto-Payments" href="/docs/auto-payments" icon="fa-duotone fa-calendar-check">Recurring scheduled payments — weekly, biweekly, or monthly — with a fixed end date, spend cap, or until cancelled.</Card>
  <Card title="Admin Hierarchy" href="/docs/branches" icon="fa-duotone fa-sitemap">Create branches, assign admin roles at every tier, and configure transfer approval rules per branch.</Card>
  <Card title="Reporting & Exports" href="/docs/clients" icon="fa-duotone fa-chart-mixed">Balance charts, transaction history, PDF statements, and XLSX portfolio exports — all scoped by admin role.</Card>
</Cards>

---

## Quickstart

<Cards>
  <Card title="1. Get Credentials" icon="fa-duotone fa-key">Email `support@tappcash.com` with your org name and environment to receive Root Advisor credentials and your staging base URL.</Card>
  <Card title="2. Admin Hierarchy" href="/docs/onboarding" icon="fa-duotone fa-sitemap">Sign in as Root Advisor, change your temporary password, create branches, and assign admin roles.</Card>
  <Card title="3. Invite a Client" href="/docs/individual-registration" icon="fa-duotone fa-paper-plane">Send your first invitation — Individual for KYC or Business Owner for KYB — and the client begins onboarding.</Card>
  <Card title="4. Move Money" href="/docs/individual-move-money" icon="fa-duotone fa-money-bill-transfer">Preview and execute a TBA transfer between accounts, or link an external bank via Plaid for ACH.</Card>
</Cards>

---

## Recipes

End-to-end integration patterns with every API call in sequence.

<Cards>
  <Card title="Onboard an Individual" href="/recipes/onboard-individual" icon="fa-duotone fa-id-card">Advisor invite → 10-step KYC (W9, security questions, phone OTP, identity) → full access token and live accounts.</Card>
  <Card title="Business Onboarding" href="/recipes/onboard-business-owner" icon="fa-duotone fa-users-gear">5-step KYB → invite Operators with scoped permissions (`transferFunds`, `autoPay`) → Operator KYC.</Card>
  <Card title="ACH Transfer" href="/recipes/ach-transfer" icon="fa-duotone fa-building-columns">BaaS token → Plaid Link → list external accounts → preview fees → execute pull or push.</Card>
  <Card title="Auto-Payment" href="/recipes/auto-payment" icon="fa-duotone fa-calendar-check">Preview fee → create with stop condition (end date, spend cap, or until cancelled) → cancel when needed.</Card>
  <Card title="Transfer Approval" href="/recipes/transfer-approval" icon="fa-duotone fa-shield-check">Enable branch approval → client submits → `pending_approval` → Branch Manager approves or rejects.</Card>
  <Card title="Token Refresh" href="/recipes/token-refresh" icon="fa-duotone fa-rotate">Sign in → use access token → auto-refresh on 401 → re-auth when refresh token expires.</Card>
</Cards>

---

## Base URL

| Environment | Base URL                                                                                 |
|-------------|------------------------------------------------------------------------------------------|
| Staging     | `https://api-test.stage2.tappbank.com`                                                   |
| Production  | Contact `support@tappcash.com` for your production base URL |

---

## Authentication

All requests to private endpoints require a Bearer token in the `Authorization` header.

```
Authorization: Bearer <your_token>
```

Tokens are issued by `POST /users/public/v1/auth/signin`. Access tokens expire after **30 minutes** — use
`POST /users/public/v1/auth/refresh` with your refresh token to get a new one without re-login.

To obtain credentials, contact `support@tappcash.com`.

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
`X-RateLimit-Reset`. See [Error Handling](/docs/error-handling) for the full retry strategy.

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
| Credentials & access | `support@tappcash.com` |
| Developer docs       | developers.tappcash.com                             |
| API reference        | developers.tappcash.com/reference                   |
