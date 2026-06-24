---
title: Get External Account
api:
  file: openapi-v0.yaml
  operationId: individualGetExternalAccount
privacy:
  view: public
---

Returns details for a specific linked external bank account.

> This endpoint is shared across Individual and Business Owner user types at the same URL:
> `GET /external-accounts/private/v1/account/{accountId}`

## Role-Based Access

| Role | Access |
|------|--------|
| **Individual** | Own external accounts only |
| **Business Owner** | Own external accounts only |
| **Advisor** | Any external account for a client in their portfolio |
| **Root Advisor** | Any external account organization-wide |
| **Branch Manager** | Any external account within their branch |
| **Head Branch Manager** | Any external account across branches under their management |
| **Super Advisor** | Any external account organization-wide |
