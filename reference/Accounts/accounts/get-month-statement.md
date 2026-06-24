---
title: Get Account Statement
api:
  file: openapi-v0.yaml
  operationId: individualGetMonthStatement
privacy:
  view: public
---

Returns the account statement for a specified month.

## Role-Based Access

| Role | Access |
|------|--------|
| **Individual** | Own accounts only |
| **Business Owner** | Own accounts only |
| **Advisor** | Accounts for clients in their assigned portfolio |
| **Root Advisor** | Any account organization-wide |
| **Branch Manager** | Any account within their branch |
| **Head Branch Manager** | Any account across branches under their management |
| **Super Advisor** | Any account organization-wide |
