---
title: Move Money
excerpt: Internal transfers between a user's own accounts (TBA) and ACH pulls/pushes to linked external bank accounts.
hidden: false
---

TAPP Cash supports two transfer types for individual users: **TBA** (internal, between the user's own accounts) and **ACH** (external, to/from linked bank accounts).

---

## Internal Transfers (TBA)

Use TBA to move funds between two of the same user's internal TAPP Cash accounts. Both accounts must belong to the authenticated user.

### 1. Preview the transfer

Always show a preview screen before submitting — it calculates fees and shows the exact amount the recipient account will receive.

`POST /accounts/private/v1/tba-requests/preview`

```json
{
  "accountIdFrom": 1001,
  "accountIdTo": 1002,
  "outgoingAmount": "100.00"
}
```

**Response:**

```json
{
  "data": {
    "incomingAmount": "99.50",
    "outgoingAmount": "100.00",
    "details": [
      { "label": "Transfer fee", "amount": "0.50" }
    ]
  }
}
```

### 2. Submit the transfer

`POST /accounts/private/v1/tba-requests`

Same body as preview, plus an optional `description`. On success the request starts in `pending` status and is executed asynchronously.

```json
{
  "accountIdFrom": 1001,
  "accountIdTo": 1002,
  "outgoingAmount": "100.00",
  "description": "Savings top-up"
}
```

---

## External Account Linking (ACH)

ACH transfers allow users to pull funds from or push funds to their external bank accounts. The flow uses a BaaS provider (e.g., Plaid) to securely link the external account.

### 1. Get a BaaS authentication token

`POST /external-accounts/private/v1/baas/auth-token`

Returns a short-lived token to authenticate the user with the BaaS provider. Pass this token to the BaaS SDK to launch the account linking UI.

### 2. List linked external accounts

`GET /external-accounts/private/v1/account`

Returns all linked external bank accounts with masked account numbers, routing numbers, and current status.

### 3. Check transfer limits

`GET /external-accounts/private/v1/transfer-limits`

Returns the minimum and maximum transfer amounts for ACH operations.

### 4. Preview an ACH transfer

`POST /accounts/private/v1/ext-requests/preview`

```json
{
  "fromAccountId": "ext_acc_12345",
  "toAccountId": "1001",
  "amount": "250.00"
}
```

> **Pull funds in**: set `fromAccountId` to the external account, `toAccountId` to the internal account.
> **Push funds out**: reverse them — `fromAccountId` = internal, `toAccountId` = external.

### 5. Submit the ACH transfer

`POST /accounts/private/v1/ext-requests`

Same body as preview, plus optional `description`.

---

## Transfer Status

Both TBA and ACH transfers are processed asynchronously. Poll `GET /accounts/private/v1/transactions` or listen for notifications to track when a transfer moves from `pending` to `executed`.

| Status | Meaning |
|--------|---------|
| `pending` | Submitted, awaiting processing |
| `executed` | Completed successfully |
| `rejected` | Failed — see transaction details for reason |
