---
title: Root Advisor
hidden: false
---

The Root Advisor is the highest admin role in TAPP Cash — one per organization, created by the TAPP Cash team at onboarding — with full access to create and manage all other admin users, branches, client portfolios, and reports.

---

## Capabilities

- Create and manage **branches** that group advisors and their client portfolios
- Create and manage **Head Branch Managers** and **Branch Managers**
- Create and manage **Advisors** directly
- View **all client portfolios** — Individual and Business Owner — across every branch in the organization
- View **all accounts, balances, transfers, transfer requests, and auto-payments**
- View **all reports** — client-level and system-level — across the entire organization
- Full read/write access to all admin resources

---

## First-Time Setup Workflow

After receiving credentials from `support@tappcash.com`, the Root Advisor sets up the organization's structure before any clients can be invited.

```mermaid
flowchart TD
    A["Sign in with provided credentials\nPOST /users/public/v1/auth/signin"]
    B["Change temporary password\nPOST /users/private/v1/auth/change_password"]
    C["Create branches\n(one per operating region or team)"]
    D["Create Head Branch Managers\n(optional — for large organizations)"]
    E["Create Branch Managers\n(assign to branches)"]
    F["Create Advisors\n(assign to branches)"]
    G(["Organization is ready\nAdvisors can now invite clients"])

    A --> B --> C --> D --> E --> F --> G
```

Branches, Head Branch Managers, Branch Managers, and Advisors can be created in any order, but creating branches first makes it easier to assign admin users to them during creation.

---

## Step 1 — Sign In

`POST /users/public/v1/auth/signin`

```json
{
  "login": "rootadvisor@yourorg.com",
  "password": "TemporaryPassword123!"
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

On first sign-in, change the temporary password immediately:

`POST /users/private/v1/auth/change_password`

- **Auth**: Root Advisor access token

```json
{
  "currentPassword": "TemporaryPassword123!",
  "newPassword": "StrongNewPassword456!"
}
```

---

## Step 2 — Build Your Admin Hierarchy

Create your organization's admin structure. The depth of the hierarchy depends on your organization's size — a small integration may use only branches and Advisors; a large one may use the full four-tier hierarchy.

**Typical setup sequence:**

| Action | Who performs it |
|--------|-----------------|
| Create branches | Root Advisor |
| Create Head Branch Managers | Root Advisor |
| Create Branch Managers | Root Advisor |
| Create Advisors | Root Advisor, Head Branch Manager, or Branch Manager |
| Invite clients | Advisor |

> Detailed API calls for creating Head Branch Managers, Branch Managers, and Advisors are covered in the full API Reference section.

---

## Step 3 — Monitor the Organization

Once the hierarchy is set up and Advisors start inviting clients, the Root Advisor can monitor the entire organization:

**List all Advisors:**

`GET /branches/private/v1/advisor`

- **Auth**: Root Advisor access token

```
GET /branches/private/v1/advisor?page[number]=1&page[size]=20
Authorization: Bearer <root_advisor_token>
```

**List Individual clients across all branches:**

`GET /branches/private/v1/individual`

- **Auth**: Root Advisor access token
- Returns clients across all branches (not scoped to a single advisor)

---

## Token Handling

| Token          | Lifetime   | How to renew                                                                |
|----------------|------------|-----------------------------------------------------------------------------|
| `accessToken`  | 30 minutes | `POST /users/public/v1/auth/refresh` with `refreshToken`                   |
| `refreshToken` | 30 days    | Sign in again                                                               |

Refresh proactively — call refresh whenever you receive `401` on a private endpoint.

---

## Full Access Summary

| Resource                  | Root Advisor access |
|---------------------------|---------------------|
| Branches                  | Read / Write        |
| Head Branch Managers      | Read / Write        |
| Branch Managers           | Read / Write        |
| Advisors                  | Read / Write        |
| Individual clients        | Read / Write        |
| Business Owner clients    | Read / Write        |
| Transfer requests         | Read                |
| Transfers                 | Read                |
| Auto-payments             | Read                |
| Reports (all)             | Read                |
| Approval settings         | Read                |
