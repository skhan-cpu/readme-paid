---
title: Step 8 — Verify Phone OTP
api:
  file: openapi-business-v1.yaml
  operationId: boVerifyPhoneOTP
hidden: false
---

Verifies the OTP sent to the Business Owner's phone number in Step 7. A successful response confirms phone ownership and allows progression to the KYB submission step.

**Requires session headers:** `X-Session-Id` + `X-Client-Id`.
