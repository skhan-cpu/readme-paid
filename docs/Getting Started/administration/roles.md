---
title: Roles & Permissions
excerpt: A detailed breakdown of each admin role — what they can access, create, and manage within your organization.
hidden: false
---

TappCash uses a four-tier admin hierarchy. Each role is scoped to a specific level of access. Tokens are role-bound — calling an endpoint outside your role returns `403 Forbidden`.

---

## Root Advisor

The highest admin tier. Created during organization onboarding by the TappCash team.

**Access:**
- Full visibility across the entire organization
- Create and manage branches
- Create and manage Head Branch Managers and Branch Managers
- Create and manage Advisors
- View all client portfolios (Individual and Business Owner) across all branches
- View all accounts, reports, and transaction data

**Token scope:** All admin endpoints including branch, user, and client management.

---

## Head Branch Manager

Manages one or more branches and the Advisors within them. Created by the Root Advisor.

**Access:**
- Create and manage Advisor accounts
- View all Individual and Business Owner client portfolios across branches
- View client accounts, transfer requests, transfers, and auto-payments
- View and download client and system reports
- Access the chat module

**Token scope:** Advisor management and full read access to all client data within managed branches.

---

## Branch Manager

Manages Advisors within a branch and controls transfer approval workflows. Created by the Root Advisor.

**Access:**
- Create and manage Advisor accounts
- View Individual and Business Owner client portfolios within the branch
- View client accounts and transfer requests
- Configure **approval settings** — enable or require Branch Manager approval for transfer requests before they execute
- View client and system reports

**Token scope:** Advisor management, client read access, and approval settings for the assigned branch.

**Approval settings** control whether transfer requests from clients in this branch require Branch Manager sign-off before processing. This is configured per branch via `PUT /branches/private/v1/approval-settings`.

---

## Advisor

The front-line admin role. Invites and manages client users. Created by a Root Advisor, Head Branch Manager, or Branch Manager.

**Access:**
- Invite Individual clients — triggers invitation email and kicks off the client onboarding flow
- Invite Business Owner clients — triggers invitation email and kicks off KYB verification
- View and manage their own portfolio of Individual and Business Owner clients
- View client accounts, transfer requests, transfers, and auto-payments
- View client and system reports
- Access the chat module

**Token scope:** Client invitation and management within the Advisor's assigned branch.

**List advisors** (accessible by Root Advisor and Head Branch Manager):

`GET /branches/private/v1/advisor`

```
GET /branches/private/v1/advisor?page[number]=1&page[size]=20
Authorization: Bearer <admin_token>
```

---

## Access Control Summary

Tokens are role-bound. The table below shows which resources each admin role can read or write.

| Resource                  | Root Advisor | Head Branch Mgr | Branch Manager | Advisor |
|---------------------------|:------------:|:---------------:|:--------------:|:-------:|
| Branches                  | R/W          | R               | R              | R       |
| Head Branch Managers      | R/W          | —               | —              | —       |
| Branch Managers           | R/W          | —               | —              | —       |
| Advisors                  | R/W          | R/W             | R/W            | —       |
| Individual clients        | R/W          | R/W             | R/W            | R/W     |
| Business Owner clients    | R/W          | R/W             | R/W            | R/W     |
| Transfer requests         | R            | R               | R              | R       |
| Transfers                 | R            | R               | —              | R       |
| Auto-payments             | R            | R               | —              | R       |
| Approval settings         | —            | —               | R/W            | —       |
| Reports                   | R            | R               | R              | R       |
| Chats                     | —            | R/W             | —              | R/W     |
