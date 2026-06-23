---
title: List External Accounts
api:
  file: openapi-v0.yaml
  operationId: individualListExternalAccounts
hidden: false
---

Returns a paginated list of external bank accounts linked via Plaid.

> This endpoint is shared across Individual and Business Owner user types at the same URL:
> `GET /external-accounts/private/v1/account`

## Role-Based Access

| Role | Accounts Returned |
|------|------------------|
| **Individual** | Own linked external accounts only |
| **Business Owner** | Own linked external accounts only |
| **Advisor** | External accounts for clients in their assigned portfolio |
| **Root Advisor** | All external accounts organization-wide |
| **Branch Manager** | All external accounts within their branch |
| **Head Branch Manager** | External accounts across branches under their management |
| **Super Advisor** | All external accounts organization-wide |

Admin roles can use `filter[userId]` to scope results to a specific client.
