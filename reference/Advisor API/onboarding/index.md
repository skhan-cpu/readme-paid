---
title: Advisor Onboarding
hidden: false
---

These endpoints handle the onboarding flow for Advisor users invited by a branch super-advisor or admin.

## Flow at a Glance

| # | Step | Endpoint | Auth |
|---|------|----------|------|
| 1 | Validate invite token | `GET /branches/public/v1/common/invites/check` | None |
| — | **Create scoped session** | `POST /entrypoint/org/v1/sessions` | Client credentials + `customerUid` |
| 2 | Accept invitation | `POST /org/branches/public/v1/advisor/invites/accept` | Session headers |
| 3 | Verify phone OTP _(if required)_ | `POST /users/private/v1/limited/generate-new-phone-code` | Temporary token |
| 4 | Confirm phone OTP _(if required)_ | `PUT /users/private/v1/limited/check-phone-code` | Temporary token |
| 5 | Exchange token | `PUT /users/private/v1/limited/token-exchange` | Temporary token |

---

## Session Setup (between Steps 1 and 2)

**Step 1** returns a `customerUid` in the response. Before calling Step 2, use it to open a session scoped to that advisor:

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

Include these two headers on **every request from Step 2 onward**:

```
X-Session-Id: <sessionId>
X-Client-Id:  <clientId>
```

---

## Step 2 Response Codes

`POST /org/branches/public/v1/advisor/invites/accept?token=<invite_token>`

| HTTP | Meaning |
|------|---------|
| `200` | Account is immediately active — onboarding complete. |
| `403` | Account created; additional verifications required (phone, KYC). Continue with Steps 3–5. |

No request body is needed. The password is managed internally.

---

## After Step 5

Once all verifications are complete, the `token-exchange` endpoint returns a full `accessToken` + `refreshToken` pair. The advisor can immediately use the `accessToken` as a Bearer token for all private Advisor API calls.
