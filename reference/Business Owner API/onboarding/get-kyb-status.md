---
title: Get KYB Verification Status
api:
  file: openapi-business-v1.yaml
  operationId: boGetKYBStatus
hidden: false
---

Returns the latest KYB (Know Your Business) verification request status for the Business Owner. Poll this endpoint after submitting KYB information (Step 9) to track the review outcome.

| Status | Meaning |
|--------|---------|
| `pending` | KYB submitted, review in progress |
| `active` | KYB approved — accounts are usable |
| `rejected` | KYB rejected — contact support |

**Requires session headers:** `X-Session-Id` + `X-Client-Id`.
