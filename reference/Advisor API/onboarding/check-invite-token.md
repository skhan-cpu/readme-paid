---
title: Check Invitation Token
api:
  file: openapi-org-api-v1.yaml
  operationId: advisorCheckInviteToken
hidden: false
---

The `token` query parameter is sent automatically via **email** when an admin creates an advisor using the Administration API. The advisor extracts the token from the invitation link and passes it here to validate it before starting onboarding.

A successful response returns a `customerUid` — save this to create a user-scoped session before calling Step 2 (Accept Invitation).
