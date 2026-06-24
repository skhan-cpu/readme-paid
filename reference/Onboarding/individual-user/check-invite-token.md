---
title: Check Invitation Token
api:
  file: openapi-v0.yaml
  operationId: individualCheckInviteToken
privacy:
  view: public
---

## How to Get an Invitation Token

The `token` query parameter is sent automatically via **email and SMS** when an Advisor invites a client using the Administration API invite endpoints. The client extracts the token from the invitation link and passes it here to verify it before starting onboarding.

> This endpoint is shared across Individual, Business Owner, and Operator user types.
