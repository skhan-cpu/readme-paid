---
title: Accept Invitation
api:
  file: openapi-business-v1.yaml
  operationId: boAcceptInvite
privacy:
  view: public
---

Activates the Business Owner's account. Pass the invitation `token` in the request body.

A `200` means the account is immediately active. A `403` means the account is created but additional onboarding steps (phone verification, KYB) are required — continue with Steps 4–9.

After this step, create a session using the `customerUid` from Step 1 and include `X-Session-Id` + `X-Client-Id` headers on all subsequent requests.
