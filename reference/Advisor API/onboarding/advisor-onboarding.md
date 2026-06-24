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

## Step 1 — Check Invitation Token

`GET /branches/public/v1/common/invites/check?token=<invite_token>`

- **Auth**: None

The `token` is delivered via email when an admin creates the advisor through the Administration API. The advisor extracts it from the invitation link and passes it here to validate it before starting onboarding.

**Example response:**

```json
{
  "data": {
    "role": "advisor",
    "customerUid": "a1b2c3d4-0000-0000-0000-000000000001"
  }
}
```

Save the `customerUid` — you need it to create a scoped session before Step 2.

If this request returns an error, the token has expired or already been used. The advisor should contact their admin to resend the invitation.

---

## Session Setup (between Steps 1 and 2)

Use the `customerUid` from Step 1 to open a session scoped to that advisor:

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

## Step 2 — Accept Invitation

`POST /org/branches/public/v1/advisor/invites/accept?token=<invite_token>`

- **Auth**: Session headers (`X-Session-Id` + `X-Client-Id`)
- No request body required — the password is managed internally.

| HTTP | Meaning |
|------|---------|
| `200` | Account is immediately active — onboarding complete. |
| `403` | Account created; phone verification required. Continue with Steps 3–5 using the `temporaryAccessToken` from the response. |

---

## After Step 5

Once all verifications are complete, the `token-exchange` endpoint returns a full `accessToken` + `refreshToken` pair. The advisor can immediately use the `accessToken` as a Bearer token for all private Advisor API calls.
