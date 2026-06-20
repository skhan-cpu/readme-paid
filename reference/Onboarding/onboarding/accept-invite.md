---
title: Accept Invitation
api:
  file: openapi-v0.yaml
  operationId: individualAcceptInvite
hidden: false
---

Accepts the invitation and links the user to their branch and advisor.

> **Path differs per user type** — use the correct URL for your user type:
> - **Individual**: `POST /branches/public/v1/individual/invites/accept`
> - **Business Owner**: `POST /branches/public/v1/businessowner/invites/accept`
> - **Operator**: `POST /branches/public/v1/operator/invites/accept`
>
> The request body and response schema are the same for all three.
