---
title: Step 4 — Get W9 Terms
api:
  file: openapi-business-v1.yaml
  operationId: boGetW9Terms
hidden: false
---

Returns the W9 tax form terms that the Business Owner must review and agree to. Display the terms to the user and record acceptance before submitting KYB information.

**Requires session headers:** `X-Session-Id` + `X-Client-Id`.
