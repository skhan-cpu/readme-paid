---
title: Create ACH Transfer
api:
  file: openapi-v0.yaml
  operationId: individualCreateACHTransfer
hidden: false
---

> This endpoint is shared across Individual, Business Owner, and Operator user types.

## Role-Based Access

| Role | Access |
|------|--------|
| **Individual** | Own accounts only |
| **Business Owner** | Own accounts only |
| **Operator** | Own accounts only |
| **Advisor** | Accounts for clients in their assigned portfolio |
| **Root Advisor** | Any client account organization-wide |
| **Branch Manager** | Any client account within their branch |
| **Head Branch Manager** | Any client account across branches under their management |
| **Super Advisor** | Any client account organization-wide |

Admin roles require the `initiate_execute_user_transfers` permission.
