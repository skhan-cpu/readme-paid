---
title: Branch Manager Onboarding
hidden: false
---

These endpoints handle the onboarding flow for Branch Manager users invited by an admin.

## Flow at a Glance

| # | Step | Endpoint | Auth |
|---|------|----------|------|
| 1 | Validate invite token | `GET /branches/public/v1/common/invites/check` | None |
| — | **Create scoped session** | `POST /entrypoint/org/v1/sessions` | Client credentials + `customerUid` |
| 2 | Accept invitation | `POST /org/branches/public/v1/branchmanager/invites/accept` | Session headers |

---

## Session Setup (between Steps 1 and 2)

**Step 1** returns a `customerUid`. Before calling Step 2, create a session scoped to that user:

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
