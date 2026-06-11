---
title: Getting Started
excerpt: Everything you need to integrate the TAPP Cash API — from your first sign-in to daily banking operations.
hidden: false
---

TAPP Cash is a white-label financial platform for account managers and their individual users. This guide gives you programmatic control over the full user lifecycle — from sending the first invitation through KYC, banking, and account closure.

---

## Quickstart

**1. Request credentials**

Contact **[support@tappcash.com](mailto:support@tappcash.com)** to get your account manager credentials. See [Onboarding](./onboarding) for the full request process.

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

The user receives an invitation email and follows the onboarding flow documented in [Individual Account](./individual-account).

---

## What's in these docs

| Section | What it covers |
|---------|----------------|
| [Welcome to TAPP Cash](./welcome) | Platform overview and what you can build |
| [Platform Overview](./platform-overview) | Roles, base URLs, and key concepts |
| [Onboarding](./onboarding) | Request API access, sign in, and invite users |
| [Authentication](./authentication) | Bearer tokens, refresh flow, and token lifecycle |
| [Individual Account](./individual-account) | Accounts, transfers, notifications, KYC, and closure |
| [Error Handling](./error-handling) | HTTP status codes and how to handle errors |
| [API Response Format](./api-response) | Standard success and error envelope |
| [FAQ](./faq) | Common integration questions |
| [Glossary](./glossary) | Key terms and definitions |
