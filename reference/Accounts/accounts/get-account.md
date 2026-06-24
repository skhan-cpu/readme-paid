---
title: Get Account
api:
  file: openapi-v0.yaml
  operationId: individualGetAccount
privacy:
  view: public
---

Returns full details for a specific account including balance, available balance, and account settings.

## Role-Based Access

| Role | Access |
|------|--------|
| **Individual** | Own accounts only |
| **Business Owner** | Own accounts only |
| **Operator** | Own accounts only |
| **Advisor** | Any account belonging to a client in their portfolio |
| **Root Advisor** | Any account organization-wide |
| **Branch Manager** | Any account within their branch |
| **Head Branch Manager** | Any account across branches under their management |
| **Super Advisor** | Any account organization-wide |

Admin roles require one of the following permissions: `view_accounts`, `view_user_reports`, or `initiate_execute_user_transfers`.

A `404` is returned if the account does not exist or is outside the caller's scope.
