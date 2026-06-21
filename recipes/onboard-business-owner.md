---
title: Onboard a Business Owner
description: Advisor invites a Business Owner, KYB is submitted, then the Business Owner invites Operators with scoped permissions.
hidden: false
recipe:
  color: '#8B5CF6'
  icon: 🏢
---

```shell Step 1 — Advisor: Invite the Business Owner
curl -X POST https://api-test.stage2.tappbank.com/branches/private/v1/businessowner \
  -H "Authorization: Bearer <advisor_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Acme Corp",
    "firstName": "John",
    "lastName": "Smith",
    "phoneNumber": "+12025550102",
    "email": "john.smith@acmecorp.com",
    "advisorID": "<advisor-id>"
  }'
```

```json Response
{
  "data": {
    "id": "<business-owner-id>",
    "status": "invited"
  }
}
```

# Step 1 — Advisor: Invite the Business Owner

<!-- shell@ -->

An invitation email is sent immediately. The Business Owner clicks the link and begins the KYB onboarding flow.

# Step 2 — Validate Token & Accept Invitation

<!-- shell@ -->

Validate the invite link, fetch and display all platform agreements, then accept the invitation to receive a `temporaryAccessToken`.

```shell Step 2 — Validate Token & Accept Invitation
# Validate the token
curl "https://api-test.stage2.tappbank.com/branches/public/v1/common/invites/check?token=<invite_token>"

# Fetch agreements
curl https://api-test.stage2.tappbank.com/branches/public/v1/common/agreements

# Accept invitation and set password
curl -X POST https://api-test.stage2.tappbank.com/branches/public/v1/business-owner/invites/accept \
  -H "Content-Type: application/json" \
  -d '{
    "token": "<invite_token>",
    "password": "SecurePassword123!",
    "agreements": ["1", "2"]
  }'
```

```json Response
{
  "data": { "temporaryAccessToken": "eyJ..." }
}
```

> The response is HTTP **403** — intentional. Store the `temporaryAccessToken` for the KYB submission step.

# Step 3 — Submit KYB

<!-- shell@ -->

Submit the business entity details and beneficial owners. Include all individuals who own 25% or more of the business.

```shell Step 3 — Submit KYB
curl -X POST https://api-test.stage2.tappbank.com/branches/private/v1/business-owner/kyb \
  -H "Authorization: Bearer <temporaryAccessToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Acme Corp",
    "businessType": "LLC",
    "taxId": "12-3456789",
    "address": {
      "address": "123 Main St",
      "city": "Austin",
      "state": "TX",
      "zipCode": "78701",
      "country": "USA"
    },
    "beneficialOwners": [
      {
        "firstName": "Jane",
        "lastName": "Doe",
        "dateOfBirth": "06/15/1985",
        "ownershipPercentage": 51
      }
    ]
  }'
```

```json Response
{
  "data": { "status": "pending" }
}
```

# Step 4 — Exchange for Full Access Token

<!-- shell@ -->

Exchange the temporary token for a full `accessToken` and `refreshToken`. KYB review runs asynchronously — the Business Owner can sign in while pending, but full account access requires KYB approval.

```shell Step 4 — Exchange for Full Access Token
curl -X PUT https://api-test.stage2.tappbank.com/users/private/v1/limited/token-exchange \
  -H "Authorization: Bearer <temporaryAccessToken>"
```

```json Response
{
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "LUF..."
  }
}
```

# Step 5 — Invite an Operator

<!-- shell@ -->

With the Business Owner active, invite team members as Operators and set their permissions. Each Operator completes their own KYC before gaining access.

```shell Step 5 — Invite an Operator
curl -X POST https://api-test.stage2.tappbank.com/branches/private/v1/operator \
  -H "Authorization: Bearer <business_owner_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Sam",
    "lastName": "Lee",
    "email": "sam.lee@acmecorp.com",
    "phoneNumber": "+14155550123",
    "permissions": {
      "transferFunds": true,
      "autoPay": true
    }
  }'
```

```json Response
{
  "data": {
    "id": "<operator-id>",
    "status": "invited",
    "permissions": {
      "transferFunds": true,
      "autoPay": true
    }
  }
}
```

| Permission | What it allows |
|---|---|
| `transferFunds` | TBA internal transfers and ACH external transfers |
| `autoPay` | Create, update, and cancel recurring auto-payments |
