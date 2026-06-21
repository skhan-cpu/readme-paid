---
title: Download Account Statement
api:
  file: openapi-business-v1.yaml
  operationId: boDownloadAccountStatement
hidden: false
---

Downloads the PDF statement file for a given statement. Retrieve valid statement identifiers from [List Account Statements](/reference/list-statements).

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
