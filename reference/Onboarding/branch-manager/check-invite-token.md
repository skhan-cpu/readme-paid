---
title: Check Invitation Token
api:
  file: openapi-branchmanager-v1.yaml
  operationId: branchManagerCheckInviteToken
hidden: false
---

The `token` is sent via **email** when an admin creates a Branch Manager. Pass it here to validate before starting onboarding.

A successful response returns a `customerUid` — use this to create a user-scoped session before calling Step 2.
