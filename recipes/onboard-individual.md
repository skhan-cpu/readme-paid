---
title: Onboard an Individual Client
description: Advisor sends invitation, client completes 10-step KYC, and accounts go live with a full access token.
hidden: false
recipe:
  color: '#3B82F6'
  icon: 👤
---

```shell Step 1 — Advisor: Invite the Client
curl -X POST https://api-test.stage2.tappbank.com/branches/private/v1/individual \
  -H "Authorization: Bearer <advisor_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "phoneNumber": "+12025550101",
    "email": "jane.doe@example.com"
  }'
```

```json Response
{
  "data": {
    "id": "<individual-id>",
    "status": "invited"
  }
}
```

# Step 1 — Advisor: Invite the Client

<!-- shell@ -->

An invitation email is sent immediately. The email contains a one-time `token` used in Step 2. The client's status is `invited` until they accept.

# Step 2 — Validate Invitation Token

<!-- shell@ -->

Before rendering any UI, verify the link is still valid. Show an error if it has expired and ask the client to contact their Advisor.

```shell Step 2 — Validate Invitation Token
curl "https://api-test.stage2.tappbank.com/branches/public/v1/common/invites/check?token=<invite_token>"
```

```json Response
{
  "data": {
    "valid": true,
    "email": "jane.doe@example.com"
  }
}
```

# Step 3 — Fetch and Accept Platform Agreements

<!-- shell@ -->

Retrieve the list of agreements, display each to the user, and require acknowledgement before continuing.

```shell Step 3 — Fetch and Accept Platform Agreements
# Fetch agreements
curl https://api-test.stage2.tappbank.com/branches/public/v1/common/agreements

# Accept invitation with agreed IDs and chosen password
curl -X POST https://api-test.stage2.tappbank.com/branches/public/v1/individual/invites/accept \
  -H "Content-Type: application/json" \
  -d '{
    "token": "<invite_token>",
    "password": "SecurePassword#2024",
    "confirmPassword": "SecurePassword#2024",
    "agreementIds": [1, 2, 3]
  }'
```

```json Response
{
  "data": { "temporaryAccessToken": "eyJ..." },
  "errors": [{ "code": "required additional actions", "meta": { "fields": ["phoneNumber", "kyc"] } }]
}
```

> The response is HTTP **403** — this is intentional. Extract `data.temporaryAccessToken` and store it. Use it for Steps 4–7. The `meta.fields` array lists remaining required actions.

# Step 4 — Security Setup

<!-- shell@ -->

Fetch the W9 terms for display, then retrieve security questions and submit the client's three answers.

```shell Step 4 — Security Setup
# Fetch W9 terms (display to user, record acceptance timestamp)
curl https://api-test.stage2.tappbank.com/branches/private/v1/limited/w9/terms \
  -H "Authorization: Bearer <temporaryAccessToken>"

# Fetch available security questions
curl https://api-test.stage2.tappbank.com/users/private/v1/limited/security-questions \
  -H "Authorization: Bearer <temporaryAccessToken>"

# Submit 3 answers
curl -X POST https://api-test.stage2.tappbank.com/users/private/v1/limited/security-questions/answers \
  -H "Authorization: Bearer <temporaryAccessToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": [
      { "questionId": 1, "answer": "Seattle" },
      { "questionId": 5, "answer": "Buddy" },
      { "questionId": 9, "answer": "Blue" }
    ]
  }'
```

```json Response
{
  "data": { "success": true }
}
```

# Step 5 — Verify Phone Number

<!-- shell@ -->

Send an OTP to the phone number registered during invitation, then submit the code to confirm ownership.

```shell Step 5 — Verify Phone Number
# Send OTP via SMS
curl -X POST https://api-test.stage2.tappbank.com/users/private/v1/limited/generate-new-phone-code \
  -H "Authorization: Bearer <temporaryAccessToken>"

# Verify the OTP code
curl -X PUT https://api-test.stage2.tappbank.com/users/private/v1/limited/check-phone-code \
  -H "Authorization: Bearer <temporaryAccessToken>" \
  -H "Content-Type: application/json" \
  -d '{ "code": "ABC12" }'
```

```json Response
{
  "data": { "success": true }
}
```

# Step 6 — Submit KYC

<!-- shell@ -->

Submit the client's identity and financial information. On success, KYC begins processing asynchronously. On `400`, check `errors` for field-level failures and let the client correct and resubmit.

```shell Step 6 — Submit KYC
curl -X POST https://api-test.stage2.tappbank.com/branches/private/v1/limited/individual/signup \
  -H "Authorization: Bearer <temporaryAccessToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "dateOfBirth": "03/20/1990",
    "socialSecurityNumber": "987-65-4321",
    "usCitizenshipStatus": "Citizen",
    "address": {
      "address": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "w9": {
      "isSubjectToBackupWithholding": false,
      "accepted": true,
      "timestamp": "2024-03-15T14:22:00Z"
    },
    "employment": {
      "status": "employed",
      "employer": "Acme Corp",
      "occupation": "Engineer"
    },
    "transferActivity": {
      "expectedMonthlyTransactions": 10,
      "expectedMonthlyVolume": "5000.00"
    }
  }'
```

```json Response
{
  "data": { "status": "pending" }
}
```

# Step 7 — Exchange for Full Access Token

<!-- shell@ -->

Exchange the temporary token for a full `accessToken` and `refreshToken`. Discard the temporary token — it is no longer valid. The client's accounts are now live.

```shell Step 7 — Exchange for Full Access Token
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
