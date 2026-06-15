---
title: Welcome to TAPP Cash
excerpt: TAPP Cash is a white-label financial platform for embedding accounts, transfers, and KYC into your product.
hidden: false
---

TAPP Cash is a modern banking platform that lets you embed financial accounts, transfers, and KYC into your product via API. These docs cover everything your engineering team needs to integrate — from inviting a user all the way through daily banking operations.

---

## Quickstart

<Cards>
  <Card title="Get Credentials" href="mailto:support@tappcash.com" icon="fa-duotone fa-key">Contact support@tappcash.com to request your account manager credentials. Include your name, organization, environment, and use case.</Card>
  <Card title="Sign In & Invite" href="./onboarding" icon="fa-duotone fa-right-to-bracket">Authenticate as an advisor and send your first invitation — sign in to get your `accessToken`, then invite an individual by email.</Card>
  <Card title="Complete Onboarding" href="./individual-account" icon="fa-duotone fa-list-check">The invited user follows a guided 10-step flow — invite token, agreements, password, W9, security questions, phone OTP, KYC, and token exchange.</Card>
  <Card title="Move Money" href="./individual-account/move-money" icon="fa-duotone fa-money-bill-transfer">Transfer funds between a user's own internal accounts (TBA) or pull/push to linked external bank accounts via ACH.</Card>
</Cards>

---

## What can you build?

<Cards>
  <Card title="Account Manager Workflows" href="./onboarding" icon="fa-duotone fa-briefcase">Sign in as an advisor, manage your portfolio of individuals, send invitations, and track onboarding status across your branch.</Card>
  <Card title="Individual Onboarding" href="./individual-account" icon="fa-duotone fa-user-check">Guide users through invitation acceptance, W9 certification, security setup, phone verification, and KYC submission — all via API.</Card>
  <Card title="Money Movement" href="./individual-account/move-money" icon="fa-duotone fa-arrow-right-arrow-left">Internal transfers between a user's own accounts (TBA) and ACH pulls/pushes to linked external bank accounts.</Card>
  <Card title="Account Activity" href="./individual-account/accounts" icon="fa-duotone fa-chart-line">Real-time balances, full transaction history with status filtering, and a notification system with unread-count badges.</Card>
</Cards>

---

## Recipes

Step-by-step guides for common integration patterns.

<Cards>
  <Card title="Account Manager: Sign In & Invite" href="./onboarding" icon="fa-duotone fa-user-tie">Authenticate as advisor, list managed individuals, and send an invitation.</Card>
  <Card title="Individual Registration" href="./individual-account/registration" icon="fa-duotone fa-id-card">Steps 1–10: validate token → accept invite → KYC → token exchange.</Card>
  <Card title="Sign In as Returning User" href="./authentication" icon="fa-duotone fa-arrow-right-to-bracket">Standard login flow and token refresh for individual users.</Card>
  <Card title="Internal Transfer (TBA)" href="./individual-account/move-money" icon="fa-duotone fa-shuffle">Preview fees and move funds between a user's own accounts.</Card>
  <Card title="External Account Linking (ACH)" href="./individual-account/move-money" icon="fa-duotone fa-building-columns">BaaS token → Plaid link → pull or push funds.</Card>
  <Card title="Notifications" href="./individual-account/notifications" icon="fa-duotone fa-bell">Unread count, list notifications, mark as read.</Card>
  <Card title="Account Closure" href="./individual-account/account-closure" icon="fa-duotone fa-circle-xmark">Two-step OTP-confirmed deletion flow.</Card>
</Cards>

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
