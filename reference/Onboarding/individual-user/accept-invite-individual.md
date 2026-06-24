---
title: Accept Invitation
api:
  file: openapi-v0.yaml
  operationId: individualAcceptInvite
privacy:
  view: public
---

Activates the invited user's account. No request body is required — the password is managed internally.

Before calling this endpoint, create a session scoped to the invited user using the `customerUid` returned from step 1 (Check Invitation Token), then pass `X-Session-Id` + `X-Client-Id` with this request.

A `200` means the account is immediately active. A `403` means the account is created but additional onboarding steps (phone verification, KYC) are required — continue with steps 4–9 using your session headers.

> **Path differs per user type** — use the correct URL for your user type:
> - **Individual**: `POST /branches/public/v1/individual/invites/accept`
> - **Business Owner**: `POST /branches/public/v1/businessowner/invites/accept`
> - **Operator**: `POST /branches/public/v1/operator/invites/accept`
>
> The headers and response schema are the same for all three.
