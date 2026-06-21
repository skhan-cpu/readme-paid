---
title: Preview Auto-Payment
api:
  file: openapi-business-v1.yaml
  operationId: boPreviewAutoPayment
hidden: false
---

Returns a fee preview for a scheduled auto-payment before committing.

> This endpoint is shared across Business Owner and Operator user types at the same URL:
> `POST /accounts/private/v1/auto-payment/preview`

## Role-Based Access

| Role | Access |
|------|--------|
| **Business Owner** | Own accounts only |
| **Operator** | Own accounts only |
| **Advisor** | Accounts for clients in their assigned portfolio |
| **Root Advisor** | Any client account organization-wide |
| **Branch Manager** | Any client account within their branch |
| **Head Branch Manager** | Any client account across branches under their management |
| **Super Advisor** | Any client account organization-wide |

Admin roles require the `initiate_execute_user_transfers` permission.
