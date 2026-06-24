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

**Step 1** returns a `customerUid`. Before calling Step 2, create a session scoped to that advisor:

```
POST /entrypoint/org/v1/sessions
Content-Type: application/json

{
  "clientId":     "<your-client-id>",
  "clientSecret": "<your-client-secret>",
  "customerUid":  "<customerUid from Step 1>"
}
```

Include these two headers on **every request from Step 2 onward**:

```
X-Session-Id: <sessionId>
X-Client-Id:  <clientId>
```

---

## Step 2 Response Codes

| HTTP | Meaning |
|------|---------|
| `200` | Account is immediately active — onboarding complete. |
| `403` | Account created; additional verifications required. Continue with Steps 3–5. |

No request body is needed. The password is managed internally.
