---
title: Check Invitation Token
api:
  file: openapi-superadvisor-v1.yaml
  operationId: superAdvisorCheckInviteToken
hidden: false
---

The `token` is sent via **email** when an admin creates a Head Branch Manager. Pass it here to validate before starting onboarding.

A successful response returns a `customerUid` — use this to create a user-scoped session before calling Step 2.
