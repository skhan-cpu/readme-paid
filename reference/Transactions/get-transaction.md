---
title: Get Transaction
api:
  file: openapi-v0.yaml
  operationId: individualGetTransaction
privacy:
  view: public
---

Returns full details for a specific transaction.

> This endpoint is shared across Individual and Business Owner user types at the same URL:
> `GET /accounts/private/v1/transactions/{id}`

## Role-Based Access

| Role | Access |
|------|--------|
| **Individual** | Own transactions only |
| **Business Owner** | Own transactions only |
| **Advisor** | Any transaction for a client in their portfolio |
| **Root Advisor** | Any transaction organization-wide |
| **Branch Manager** | Any transaction within their branch |
| **Head Branch Manager** | Any transaction across branches under their management |
| **Super Advisor** | Any transaction organization-wide |
