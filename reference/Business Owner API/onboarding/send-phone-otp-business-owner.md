---
title: Send Phone OTP
api:
  file: openapi-business-v1.yaml
  operationId: boSendPhoneOTP
privacy:
  view: public
---

Sends a one-time passcode (OTP) to the Business Owner's registered phone number for verification. Call this before Step 8 (Verify Phone OTP).

**Requires session headers:** `X-Session-Id` + `X-Client-Id`.
