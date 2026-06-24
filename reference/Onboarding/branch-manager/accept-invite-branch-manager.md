---
title: Accept Invitation
api:
  file: openapi-branchmanager-v1.yaml
  operationId: branchManagerAcceptInvite
hidden: false
---

Activates the invited Branch Manager's account. No request body is required — the password is managed internally.

Before calling this endpoint, validate the invite token (Step 1) to get the `customerUid`, create a scoped session, then pass `X-Session-Id` + `X-Client-Id` with this request.

A `200` means the account is immediately active. A `403` means additional verifications are required — use the `temporaryAccessToken` from the response on the `/limited/` endpoints.
