---
api:
  file: openapi-v0.yaml
  operationId: individualCheckInviteToken
hidden: false
---

## How to Get an Invitation Token

The `token` query parameter is sent automatically to the individual via **email and SMS** when an Advisor invites them using the [Invite an Individual client](/reference/invite-individual) endpoint (`POST /branches/private/v1/individual`).

The individual receives a message containing a link with the token embedded. The mobile app or web client extracts that token from the link and passes it to this endpoint to verify the invitation before proceeding with onboarding.