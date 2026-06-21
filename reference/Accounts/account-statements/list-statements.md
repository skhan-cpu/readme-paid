---
title: List Account Statements
api:
  file: openapi-business-v1.yaml
  operationId: boListAccountStatements
hidden: false
---

Returns available monthly statement files for the authenticated user's accounts.

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
