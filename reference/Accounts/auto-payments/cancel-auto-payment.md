---
title: Cancel Auto-Payment
api:
  file: openapi-business-v1.yaml
  operationId: boCancelAutoPayment
privacy:
  view: public
---

Cancels a scheduled auto-payment.

> This endpoint is shared across Business Owner and Operator user types at the same URL.

## Role-Based Access

| Role | Access |
|------|--------|
| **Business Owner** | Own auto-payments only |
| **Operator** | Own auto-payments only |
| **Advisor** | Auto-payments for clients in their assigned portfolio |
| **Root Advisor** | Any auto-payment organization-wide |
| **Branch Manager** | Any auto-payment within their branch |
| **Head Branch Manager** | Any auto-payment across branches under their management |
| **Super Advisor** | Any auto-payment organization-wide |
