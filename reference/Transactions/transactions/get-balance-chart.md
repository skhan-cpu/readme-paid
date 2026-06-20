---
title: Get Balance Chart
api:
  file: openapi-v0.yaml
  operationId: individualGetBalanceChart
hidden: false
---

Returns time-series balance data for charting balance changes over time for one or more accounts.

> This endpoint is shared across Individual and Business Owner user types at the same URL:
> `GET /accounts/private/v1/transactions/balance-chart`

## Role-Based Access

| Role | Access |
|------|--------|
| **Individual** | Own accounts only |
| **Business Owner** | Own accounts only |
| **Advisor** | Accounts for clients in their portfolio |
| **Root Advisor** | Any account organization-wide |
| **Branch Manager** | Any account within their branch |
| **Head Branch Manager** | Any account across branches under their management |
| **Super Advisor** | Any account organization-wide |
