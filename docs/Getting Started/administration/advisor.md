---
title: Advisor
hidden: false
---

Advisors are the front-line admin role. They invite Individual and Business Owner clients, manage their portfolios, and monitor all client account activity within their branch.

The Advisor is the role your integration will use most frequently for client-facing operations. Advisors invite clients (Individual or Business Owner), track their onboarding progress, and monitor their accounts, transfers, and reports. They also have access to the chat module.

---

## Capabilities

- Invite **Individual** clients — triggers an invitation email and starts the KYC onboarding flow
- Invite **Business Owner** clients — triggers an invitation email and starts the KYB onboarding flow
- View and manage their own portfolio of **Individual and Business Owner clients**
- View client **accounts and balances**
- View **transfer requests, transfers, and auto-payments** for all clients in their portfolio
- View **client and system reports**
- Access the **chat module**

---

## Daily Workflow

```mermaid
flowchart TD
    A["Sign in\nPOST /users/public/v1/auth/signin"]
    B{"Primary tasks"}
    B --> C["Invite new clients\n(Individual or Business Owner)"]
    B --> D["Monitor client onboarding\ntrack status: invited → active"]
    B --> E["View client accounts\nand balances"]
    B --> F["Review transfer requests\nand transfer history"]
    B --> G["View reports\nand chat with clients"]

    A --> B
```

---

## Step 1 — Sign In

`POST /users/public/v1/auth/signin`

```json
{
  "login": "advisor@yourorg.com",
  "password": "Password123!"
}
```

**Response:**

```json
{
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "LUF..."
  }
}
```

The `accessToken` expires after **30 minutes**. Refresh it with `POST /users/public/v1/auth/refresh`.

---

## Step 2 — Invite an Individual Client

`POST /branches/private/v1/individual`

- **Auth**: Advisor access token

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phoneNumber": "+12025550191"
}
```

On success, an invitation email is sent and the client record is created with `status: "invited"`. The client then follows the [Individual Account](../individual-user) onboarding steps.

---

## Step 3 — Invite a Business Owner Client

`POST /branches/private/v1/business-owner`

- **Auth**: Advisor access token

```json
{
  "firstName": "Alex",
  "lastName": "Rivera",
  "email": "alex.rivera@acmecorp.com",
  "phoneNumber": "+13105550177"
}
```

On success, an invitation email is sent and the Business Owner record is created with `status: "invited"`. The client then follows the [Business Owner](../business-owner) KYB onboarding steps.

---

## Step 4 — Monitor Your Client Portfolio

**List Individual clients:**

`GET /branches/private/v1/individual`

- **Auth**: Advisor access token
- Returns all Individual clients in this Advisor's branch, paginated.

```
GET /branches/private/v1/individual?page[number]=1&page[size]=20
Authorization: Bearer <advisor_token>
```

Filter by onboarding status to track who still needs to complete their registration:

```
GET /branches/private/v1/individual?filter[status]=eq:invited&page[number]=1&page[size]=20
```

**Get a single client's full profile:**

`GET /branches/private/v1/individual/{id}`

- **Auth**: Advisor access token

---

## Client Status Reference

| Status       | Meaning                                                      | Action                                         |
|--------------|--------------------------------------------------------------|------------------------------------------------|
| `invited`    | Invitation sent; client has not yet accepted                 | No action needed — wait for client to accept  |
| `onboarding` | Client is completing registration steps                      | Monitor progress                               |
| `pending`    | KYC or KYB submitted; awaiting review                        | No action needed — review is automated        |
| `active`     | Verified; accounts are live and fully operational            | Client ready for all banking features          |
| `dormant`    | Account inactive for an extended period                      | Contact client or support                      |
| `rejected`   | KYC or KYB failed                                            | Client must re-apply or contact support        |

---

## Access Summary

| Resource                  | Advisor access     |
|---------------------------|--------------------|
| Branches                  | Read               |
| Head Branch Managers      | —                  |
| Branch Managers           | —                  |
| Advisors                  | —                  |
| Individual clients        | Read / Write       |
| Business Owner clients    | Read / Write       |
| Transfer requests         | Read               |
| Transfers                 | Read               |
| Auto-payments             | Read               |
| Reports                   | Read               |
| Approval settings         | —                  |
| Chats                     | Read / Write       |
