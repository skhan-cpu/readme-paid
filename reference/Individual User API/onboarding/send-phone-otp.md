---
title: Send Phone OTP
api:
  file: openapi-v0.yaml
  operationId: individualSendPhoneOTP
privacy:
  view: public
---

> This endpoint is shared across Individual, Business Owner, and Operator user types.

## Sandbox: Finding the OTP Code

In the staging environment, SMS messages are not delivered to real phones. Instead, all notifications (including the OTP code) are visible in the sandbox notification log:

**[https://api-test.stage2.tappbank.com/notifications/public/v1/debug](https://api-test.stage2.tappbank.com/notifications/public/v1/debug)**

Open that URL after calling this endpoint to retrieve the OTP code, then pass it to the [Verify Phone OTP](/reference/verify-phone-otp) endpoint.
