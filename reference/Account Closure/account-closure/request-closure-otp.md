---
title: Step 1 — Request Account Closure OTP
api:
  file: openapi-v0.yaml
  operationId: individualDeleteProfileOTP
hidden: false
---

Sends an OTP to the user's registered phone or email to verify the account closure request.

> This endpoint is shared across Individual and Business Owner user types at the same URL:
> `POST /branches/private/v1/delete-profile-otp`
