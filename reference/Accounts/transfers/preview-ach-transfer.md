---
title: Preview ACH Transfer
api:
  file: openapi-v0.yaml
  operationId: individualCreateACHTransferPreview
privacy:
  view: public
---

> Available to Individual, Business Owner, and Operator users for their own accounts, and to admin roles (Advisor, Root Advisor, Branch Manager, etc.) to initiate transfers on behalf of their clients.

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
