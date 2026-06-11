---
title: Welcome to TAPP Cash
excerpt: TAPP Cash is a white-label financial platform for embedding accounts, transfers, and KYC into your product.
hidden: false
---

TAPP Cash is a modern banking platform that lets you embed financial accounts, transfers, and KYC into your product via API. These docs cover everything your engineering team needs to integrate — from inviting a user all the way through daily banking operations.

---

## Quickstart

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0">

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Get Credentials</strong><br/><br/>
Contact <a href="mailto:support@tappcash.com">support@tappcash.com</a> to request your account manager credentials. Include your name, organization, environment, and use case. All API requests require a Bearer token.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Sign In &amp; Invite</strong><br/><br/>
Authenticate as an advisor and send your first invitation in two API calls — sign in to get your <code>accessToken</code>, then invite an individual by email. See <a href="./onboarding">Onboarding</a> for the full flow.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Complete Onboarding</strong><br/><br/>
The invited user follows a guided 10-step flow — invite token, agreements, password, W9, security questions, phone OTP, KYC, and token exchange. See <a href="./individual-account">Individual Account</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Move Money</strong><br/><br/>
Transfer funds between a user's own internal accounts (TBA) or pull/push to linked external bank accounts via ACH. See <a href="./individual-account/move-money">Move Money</a> for the full flow.
</div>

</div>

---

## What can you build?

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0">

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Account Manager Workflows</strong><br/><br/>
Sign in as an advisor, manage your portfolio of individuals, send invitations, and track onboarding status across your branch.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Individual Onboarding</strong><br/><br/>
Guide users through invitation acceptance, W9 certification, security setup, phone verification, and KYC submission — all via API.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Money Movement</strong><br/><br/>
Internal transfers between a user's own accounts (TBA) and ACH pulls/pushes to linked external bank accounts.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Account Activity</strong><br/><br/>
Real-time balances, full transaction history with status filtering, and a notification system with unread-count badges.
</div>

</div>

---

## Recipes

Step-by-step guides for common integration patterns.

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0">

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Account Manager: Sign in &amp; Invite</strong><br/><br/>
Authenticate as advisor, list managed individuals, and send an invitation.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Individual Onboarding</strong><br/><br/>
Steps 1–10: validate token → accept invite → KYC → token exchange.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Sign in as Returning User</strong><br/><br/>
Standard login flow and token refresh for individual users.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Internal Transfer (TBA)</strong><br/><br/>
Preview fees and move funds between a user's own accounts.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>External Account Linking (ACH)</strong><br/><br/>
BaaS token → Plaid link → pull or push funds.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Notifications</strong><br/><br/>
Unread count, list notifications, mark as read.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Account Closure</strong><br/><br/>
Two-step OTP-confirmed deletion flow.
</div>

</div>

> **Available Soon** — detailed recipe pages with full curl examples and step-by-step walkthroughs are coming shortly.

---

## Base URL

| Environment | Base URL |
|-------------|----------|
| Staging | `https://api-test.stage2.tappbank.com` |
| Production | Contact [support@tappcash.com](mailto:support@tappcash.com) for your production base URL |

---

## Authentication

All requests to private endpoints require a Bearer token in the `Authorization` header.

```
Authorization: Bearer <your_token>
```

Tokens are issued by `POST /users/public/v1/auth/signin`. Access tokens expire after **30 minutes** — use `POST /users/public/v1/auth/refresh` with your refresh token to get a new one without re-login.

To obtain credentials, contact **[support@tappcash.com](mailto:support@tappcash.com)**.

---

## Rate Limits

The API gateway enforces rate limits per client IP. Limits are configured per endpoint — every response includes headers so you can track your current usage.

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed in the current window |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |

When the limit is exceeded the API returns `429 Too Many Requests`. Back off and retry after the time indicated by `X-RateLimit-Reset`. See [Error Handling](./error-handling) for the full retry strategy.

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

| Code | Meaning |
|------|---------|
| 400 | Bad request — check the `errors` array for field-level details |
| 401 | Unauthorized — missing or expired Bearer token |
| 403 | Forbidden — valid token but endpoint is outside your role |
| 404 | Resource not found |
| 409 | Conflict — e.g. pending transactions block account closure |
| 422 | Unprocessable — business logic rejection, see `code` field |
| 500 | Internal server error — contact support |

---

## Role-Based Access

Your token is scoped to a role. Calling an endpoint outside your role returns `403 Forbidden`.

| Role | Access |
|------|--------|
| **Advisor** (Account Manager) | Manage individuals, send invitations, view branch portfolio |
| **Individual** | Banking features — accounts, balances, transfers, notifications, KYC, account closure |

---

## Support

| Topic | Contact |
|-------|---------|
| Credentials & access | [support@tappcash.com](mailto:support@tappcash.com) |
| Developer docs | developers.tappcash.com |
| API reference | developers.tappcash.com/reference |
