---
title: List Accounts
api:
  file: openapi-v0.yaml
  operationId: individualListAccounts
hidden: false
---

Returns a paginated list of accounts. The accounts returned depend on the role of the authenticated user.

## Role-Based Access

| Role | Accounts Returned |
|------|-------------------|
| **Individual** | Own accounts only |
| **Business Owner** | Own accounts only |
| **Operator** | Own accounts only |
| **Advisor** | Accounts belonging to clients in their assigned portfolio |
| **Root Advisor** | All accounts across the entire organization |
| **Branch Manager** | Accounts for all clients within their branch |
| **Head Branch Manager** | Accounts for all clients across branches under their management |
| **Super Advisor** | All accounts organization-wide |

## Filtering by User

Admin roles (Advisor, Root Advisor, Branch Manager, etc.) can filter results to a specific client using the `filter[userId]` query parameter.

**Example:** To list accounts for a specific client:
```
GET /accounts/private/v1/account?filter[userId]=<clientUserId>
```
