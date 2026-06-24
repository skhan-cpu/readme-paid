---
title: Complete Signup
api:
  file: openapi-business-v1.yaml
  operationId: submitKYB
privacy:
  view: public
---

Submits the Business Owner's Know Your Business (KYB) information including business details, beneficial owners, and supporting documentation. This triggers the compliance review process.

After submission the account status moves to `pending` while KYB is reviewed. Monitor status via **Get KYB verification status**. Once approved, the status becomes `active` and accounts are usable.

**Requires session headers:** `X-Session-Id` + `X-Client-Id`.
