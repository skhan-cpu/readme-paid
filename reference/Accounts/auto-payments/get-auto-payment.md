---
title: Get Auto-Payment
api:
  file: openapi-business-v1.yaml
  operationId: boGetAutoPayment
privacy:
  view: public
---

Returns details for a specific scheduled auto-payment.

> **Business Owner only** — Operator users do not have a Get Auto-Payment endpoint.

## Role-Based Access

| Role | Access |
|------|--------|
| **Business Owner** | Own auto-payments only |
| **Advisor** | Auto-payments for clients in their assigned portfolio |
| **Root Advisor** | Any auto-payment organization-wide |
| **Branch Manager** | Any auto-payment within their branch |
| **Head Branch Manager** | Any auto-payment across branches under their management |
| **Super Advisor** | Any auto-payment organization-wide |
