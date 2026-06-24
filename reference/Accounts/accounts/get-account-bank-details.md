---
title: Get Account Bank Details
api:
  file: openapi-v0.yaml
  operationId: individualGetAccountDetails
privacy:
  view: public
---

Returns the routing number, account number, IBAN, and SWIFT code for a specific account. Use this to display incoming wire transfer details to the user.

> This endpoint is shared across Individual, Business Owner, and Operator user types at the same URL:
> `GET /accounts/private/v1/account/{accountId}/bank-details`

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
