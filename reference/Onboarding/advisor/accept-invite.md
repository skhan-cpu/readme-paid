---
title: Accept Invitation
api:
  file: openapi-org-api-v1.yaml
  operationId: advisorAcceptInvite
hidden: false
---

Activates the invited advisor's account. No request body is required — the password is managed internally.

Before calling this endpoint, validate the invite token (Step 1) to get the advisor's `customerUid`, create a scoped session, then pass `X-Session-Id` + `X-Client-Id` with this request.

A `200` means the account is immediately active. A `403` means the account is created but additional onboarding steps (phone verification) are required — continue with the `/limited/` endpoints using the `temporaryAccessToken` from the response.
