---
title: Check Invitation Token
api:
  file: openapi-business-v1.yaml
  operationId: boCheckInviteToken
privacy:
  view: public
---

The `token` query parameter is delivered automatically via **email and SMS** when an Advisor invites a Business Owner client using the Administration API. The client extracts the token from the invitation link and passes it here to verify it before starting onboarding.

A successful response returns a `customerUid` — save this to create a scoped session before continuing to Step 4.
