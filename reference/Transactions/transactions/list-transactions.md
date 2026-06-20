---
title: List Transactions
api:
  file: openapi-v0.yaml
  operationId: individualListTransactions
hidden: false
---

Returns a paginated transaction history for the authenticated user's accounts.

> This endpoint is shared across Individual and Business Owner user types at the same URL:
> `GET /accounts/private/v1/transactions`

## Role-Based Access

| Role | Transactions Returned |
|------|----------------------|
| **Individual** | Own account transactions only |
| **Business Owner** | Own account transactions only |
| **Advisor** | Transactions for clients in their assigned portfolio |
| **Root Advisor** | All transactions organization-wide |
| **Branch Manager** | Transactions for all clients within their branch |
| **Head Branch Manager** | Transactions across branches under their management |
| **Super Advisor** | All transactions organization-wide |

Use `filter[accountId]` to scope results to a specific account.
