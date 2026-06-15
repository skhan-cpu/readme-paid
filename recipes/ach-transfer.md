---
title: ACH Transfer
description: Link an external bank account via Plaid and pull or push funds using ACH — full 5-step flow.
hidden: false
recipe:
  color: '#10B981'
  icon: 🏦
---

```shell Step 1 — Get BaaS Token
curl -X POST https://api-test.stage2.tappbank.com/external-accounts/private/v1/baas/auth-token \
  -H "Authorization: Bearer <user_token>" \
  -H "V-Client-Device-Id: <device-uuid>"
```

```json Response
{
  "data": {
    "token": "link-sandbox-abc123..."
  }
}
```

# Step 1 — Get BaaS Token

<!-- shell@ -->

Returns a short-lived BaaS token. Pass it to the Plaid Link SDK to open the bank account selection UI. The user selects or connects their external bank account through Plaid's interface.

> This step applies to Individual users, Business Owners, and Operators with the `transferACH` permission.

# Step 2 — List Linked External Accounts

<!-- shell@ -->

After the user completes Plaid Link, the linked account appears here. Use the account `id` as `fromAccountId` (pull funds in) or `toAccountId` (push funds out) in Step 3.

```shell Step 2 — List Linked External Accounts
curl https://api-test.stage2.tappbank.com/external-accounts/private/v1/account \
  -H "Authorization: Bearer <user_token>" \
  -H "V-Client-Device-Id: <device-uuid>"
```

```json Response
{
  "data": [
    {
      "id": "ext-acc-001",
      "accountNumber": "****1234",
      "routingNumber": "026009593",
      "accountOwnerName": "Jane Doe",
      "bankName": "Chase",
      "status": "active"
    }
  ]
}
```

# Step 3 — Check Transfer Limits

<!-- shell@ -->

Retrieve the minimum and maximum allowed ACH amounts before showing the transfer form. Validate the user's input against these limits before calling preview.

```shell Step 3 — Check Transfer Limits
curl https://api-test.stage2.tappbank.com/external-accounts/private/v1/transfer-limits \
  -H "Authorization: Bearer <user_token>" \
  -H "V-Client-Device-Id: <device-uuid>"
```

```json Response
{
  "data": {
    "minAmount": "10.00",
    "maxAmount": "10000.00"
  }
}
```

# Step 4 — Preview the Transfer

<!-- shell@ -->

Always preview before executing — the response shows the exact fee and total deducted. Show the breakdown to the user before confirmation.

Set `fromAccountId` to the external account to **pull funds in**. Reverse them to **push funds out**.

```shell Step 4 — Preview the Transfer
curl -X POST https://api-test.stage2.tappbank.com/accounts/private/v1/ext-requests/preview \
  -H "Authorization: Bearer <user_token>" \
  -H "V-Client-Device-Id: <device-uuid>" \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "ext-acc-001",
    "toAccountId": "1001",
    "amount": "500.00"
  }'
```

```json Response
{
  "data": {
    "amount": "500.00",
    "fee": "2.50",
    "totalDeducted": "502.50"
  }
}
```

# Step 5 — Execute the Transfer

<!-- shell@ -->

Submit the confirmed transfer. ACH transfers are processed asynchronously — the initial status is `pending`. Poll transactions or listen for the `TRANSACTION_EXECUTED` push notification to detect completion.

```shell Step 5 — Execute the Transfer
curl -X POST https://api-test.stage2.tappbank.com/accounts/private/v1/ext-requests \
  -H "Authorization: Bearer <user_token>" \
  -H "V-Client-Device-Id: <device-uuid>" \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "ext-acc-001",
    "toAccountId": "1001",
    "amount": "500.00",
    "description": "Payroll funding"
  }'
```

```json Response
{
  "data": {
    "id": "txn-789",
    "status": "pending"
  }
}
```

| Status | Meaning |
|---|---|
| `pending` | Submitted, awaiting processing |
| `executed` | Transfer completed successfully |
| `rejected` | Transfer failed — check transaction details |
