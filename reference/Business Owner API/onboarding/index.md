---
title: Onboarding
privacy:
  view: public
---

These endpoints handle the onboarding flow for Business Owner clients.

> For a full walkthrough with code examples, see the guides:
> - [Individual Registration](doc:individual-registration)
> - [Business Owner Registration & KYB](doc:business-registration)

## Flow at a Glance

| # | Step | Endpoint | Auth |
|---|------|----------|------|
| 1 | Validate invite token | `GET /branches/public/v1/common/invites/check` | None |
| 2 | Fetch platform agreements | `GET /branches/public/v1/common/agreements` | None |
| — | **Create scoped session** | `POST /entrypoint/org/v1/sessions` | Client credentials |
| 3 | Accept invitation | `POST /branches/public/v1/businessowner/invites/accept` | Session headers |
| 4 | Review W9 terms | `GET /branches/private/v1/limited/w9/terms` | Session headers |
| 5 | List security questions | `GET /users/private/v1/limited/security-questions` | Session headers |
| 6 | Submit security answers | `POST /users/private/v1/limited/security-questions/answers` | Session headers |
| 7 | Send phone OTP | `POST /users/private/v1/limited/generate-new-phone-code` | Session headers |
| 8 | Verify phone OTP | `PUT /users/private/v1/limited/check-phone-code` | Session headers |
| 9 | Submit KYC/KYB | `POST /branches/private/v1/limited/businessowner/signup` | Session headers |

---

## Session Setup (between Steps 1 and 3)

**Step 1** returns a `customerUid` in the response. Before calling Step 3, use it to open a session scoped to that Business Owner:

```
POST /entrypoint/org/v1/sessions
Content-Type: application/json

{
  "clientId":     "<your-client-id>",
  "clientSecret": "<your-client-secret>",
  "customerUid":  "<customerUid from Step 1>"
}
```

```json
{
  "data": {
    "sessionId": "4bdfca21-461e-45a2-9d26-64f4176267c7",
    "expiresAt": "2026-06-24T12:00:00Z"
  }
}
```

Include these two headers on **every request from Step 3 onward**:

```
X-Session-Id: <sessionId>
X-Client-Id:  <clientId>
```

---

## Step 3 Response Codes

`POST /branches/public/v1/businessowner/invites/accept?token=<invite_token>`

| HTTP | Meaning |
|------|---------|
| `200` | Account is immediately active — onboarding complete. |
| `403` | Account created; additional steps (W9, security questions, phone OTP, KYB) required. Continue with Steps 4–10. |

The request body is managed internally — no body is required.

---

## KYB Review (Steps 9–10)

After Step 9 the account enters `pending` status while compliance reviews the submitted business information. Poll **Get KYB Verification Status** to track the outcome:

| Status | Meaning |
|--------|---------|
| `pending` | KYB submitted, review in progress |
| `active` | KYB approved — accounts are usable |
| `rejected` | KYB rejected — contact support |

The session used during onboarding remains valid throughout the KYB review period.
