---
title: Getting Started
hidden: true
content:
  excerpt: Set up the welcome page for your API to help users make their first call.
privacy:
  view: anyone_with_link
---

The **API Reference** is the complete, endpoint-by-endpoint specification for the TAPP Cash API. Every page includes request and response schemas plus a **Try It** panel for making live calls straight from the docs.

New to the platform? Start with the [Guides](/docs/welcome) for concepts and walkthroughs, then come back here for endpoint details.

---

## The APIs

TAPP Cash is split into several API definitions. Pick the one that matches your integration:

| API | Use it for |
|-----|-----------|
| **Authentication** | Signing users in and refreshing their JWT access tokens. |
| **Org API (Server-to-Server)** | Creating a session from your `clientId` + `clientSecret` to act on behalf of your organization. |
| **Individual User API** | Accounts, transfers, transactions, and statements for an individual user. |
| **Administration API** | Branches, the admin hierarchy, and Individual / Business Owner client management. |
| **Business Owner API** | Business accounts and delegating access to Operators with scoped permissions. |
| **Branch Manager / Head Branch Manager** | Reviewing and approving client transfer requests across a branch. |

---

## Quickstart

<Cards>
  <Card title="1. Get Credentials" icon="fa-duotone fa-key">Email [support@tappcash.com](mailto:support@tappcash.com) to request account access — you'll receive your `clientId` + `clientSecret`.</Card>
  <Card title="2. Create a Session" href="/reference/create-session" icon="fa-duotone fa-server">POST your credentials to `/entrypoint/org/v1/sessions` — receive a `sessionId` valid for 24 hours.</Card>
  <Card title="3. Call Endpoints" href="/docs/authentication" icon="fa-duotone fa-plug">Send `X-Session-Id` and `X-Client-Id` headers (or a user `Authorization: Bearer` token) on every request.</Card>
  <Card title="4. Revoke Session" href="/reference/revoke-session" icon="fa-duotone fa-right-from-bracket">Call `DELETE /entrypoint/org/v1/sessions/{id}` on logout or job completion.</Card>
</Cards>

---

## Set Your Tenant Before Using "Try It"

Every endpoint has a **Try It** panel on the right for making live requests. For it to work, set your tenant first:

1. Open any endpoint (for example, [Create Session](/reference/create-session)).
2. In the **Try It** panel, open the server URL dropdown at the top.
3. Replace the **`tenant`** variable (`test`) with your organization's subdomain (e.g. `wire-network`).

Your requests then go to `https://api-{your-tenant}.stage2.tappbank.com`. The setting persists across endpoints in the same section.

> If you leave the tenant as `test`, requests will fail or return a CORS error — `api-test` is a placeholder and may not resolve to your environment.

| Environment | Base URL pattern |
|-------------|------------------|
| Staging     | `https://api-{tenant}.stage2.tappbank.com` |
| Production  | `https://api-{tenant}.tappcash.com` |

Contact `support@tappcash.com` to get your tenant name and credentials.

---

## Authentication

- **Server-to-server** clients create a session from their `clientId` + `clientSecret` and send it on every request:

  ```
  X-Session-Id: <sessionId>
  X-Client-Id:  <clientId>
  ```

  Sessions are valid for **24 hours**. Add a `customerUid` when creating the session to act on behalf of a specific user.

- **User-facing** flows use a JWT `Authorization: Bearer <token>` obtained at sign-in.

See the [Authentication guide](/docs/authentication) and the [API Session recipe](/recipes/authentication) for the full flow.

---

## Standard Response Format

Every response — success or error — uses the same envelope.

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

See [Error Handling](/docs/error-handling) for status codes and the retry strategy.

---

## End-to-End Recipes

Full integration patterns with every API call in sequence:

<Cards>
  <Card title="API Session" href="/recipes/authentication" icon="fa-duotone fa-server">ClientId + ClientSecret → sessionId → call endpoints → revoke on logout.</Card>
  <Card title="Onboard an Individual" href="/recipes/onboard-individual" icon="fa-duotone fa-id-card">Advisor invite → KYC → full access token and live accounts.</Card>
  <Card title="Business Onboarding" href="/recipes/onboard-business-owner" icon="fa-duotone fa-users-gear">KYB → invite Operators with scoped permissions → Operator KYC.</Card>
  <Card title="ACH Transfer" href="/recipes/ach-transfer" icon="fa-duotone fa-building-columns">BaaS token → Plaid Link → preview fees → execute pull or push.</Card>
  <Card title="Auto-Payment" href="/recipes/auto-payment" icon="fa-duotone fa-calendar-check">Preview fee → create with a stop condition → cancel when needed.</Card>
  <Card title="Transfer Approval" href="/recipes/transfer-approval" icon="fa-duotone fa-shield-check">Enable branch approval → submit → approve or reject.</Card>
</Cards>
