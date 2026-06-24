---
title: Verify Phone OTP
api:
  file: openapi-v0.yaml
  operationId: individualVerifyPhoneOTP
privacy:
  view: public
---

> This endpoint is shared across Individual, Business Owner, and Operator user types.

## Sandbox: Finding the OTP Code

In the staging environment, SMS messages are not delivered to real phones. Retrieve the OTP code from the sandbox notification log:

**[https://api-test.stage2.tappbank.com/notifications/public/v1/debug](https://api-test.stage2.tappbank.com/notifications/public/v1/debug)**

All notifications sent in the staging environment appear here, including the phone verification code sent by [Send Phone OTP](/reference/send-phone-otp).
