---
title: List Auto-Payments
api:
  file: openapi-business-v1.yaml
  operationId: boListAutoPayments
hidden: false
---

Returns all scheduled auto-payments for the authenticated user.

> This endpoint is shared across Business Owner and Operator user types at the same URL:
> `GET /accounts/private/v1/auto-payment`

## Role-Based Access

| Role | Access |
|------|--------|
| **Business Owner** | Own auto-payments only |
| **Operator** | Own auto-payments only |
| **Advisor** | Auto-payments for clients in their assigned portfolio |
| **Root Advisor** | All auto-payments organization-wide |
| **Branch Manager** | All auto-payments within their branch |
| **Head Branch Manager** | Auto-payments across branches under their management |
| **Super Advisor** | All auto-payments organization-wide |
