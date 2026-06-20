---
title: Get KYC / KYB Status
api:
  file: openapi-v0.yaml
  operationId: individualGetKYCStatus
hidden: false
---

Returns the most recent identity verification request for the authenticated user.

> This endpoint is shared across Individual, Business Owner, and Operator user types at the same URL: `GET /kyc/private/v1/requests/last`
>
> - **Individual / Operator** — returns KYC (personal identity) verification status
> - **Business Owner** — returns KYB (business entity) verification status

Call this endpoint after completing [Complete Signup](/reference/complete-signup) to poll until the verification status moves from `pending` to `approved` (or `rejected`).
