---
title: Accounts & Balances
excerpt: View the Business Owner's accounts, balances, and bank details as an Operator.
hidden: false
---

Operators can view all accounts belonging to the Business Owner who invited them. Account viewing is available to all active Operators regardless of their transfer permissions.

---

## List Accounts

`GET /accounts/private/v1/account`

- **Auth**: Operator access token

```
GET /accounts/private/v1/account
Authorization: Bearer <operator_token>
V-Client-Device-Id: <device-uuid>
```

Returns all accounts for the Business Owner. Each account includes:

| Field | Description |
|-------|-------------|
| `id` | Account identifier — use this for transfer requests |
| `number` | Account number |
| `typeId` | Account type identifier |
| `description` | Human-readable account name |
| `balance` | Current balance |
| `availableBalance` | Non-pending balance available for transfers |
| `isActive` | Whether the account is active |
| `allowWithdrawals` | Whether outgoing transfers are permitted |
| `allowDeposits` | Whether incoming transfers are permitted |

---

## Get Account Details

`GET /accounts/private/v1/account/:id`

- **Auth**: Operator access token

```
GET /accounts/private/v1/account/42
Authorization: Bearer <operator_token>
V-Client-Device-Id: <device-uuid>
```

Returns full details for a single account including balance breakdown.

---

## Get Account Bank Details

`GET /accounts/private/v1/account/:id/bank-details`

- **Auth**: Operator access token

Returns the routing number, IBAN, and SWIFT code for the account. Use this to display receiving account details to counterparties.

**Response:**

```json
{
  "data": {
    "accountNumber": "0001234567",
    "routingNumber": "026009593",
    "iban": "US12345678901234567890",
    "swiftCode": "CHASUS33"
  }
}
```

---

## Get Total Balance

`GET /accounts/private/v1/balance/total`

- **Auth**: Operator access token

Returns the aggregate balance across all of the Business Owner's accounts.

**Response:**

```json
{
  "data": {
    "total": "15250.00",
    "available": "14800.00",
    "pending": "450.00"
  }
}
```

| Field | Description |
|-------|-------------|
| `total` | Sum of all account balances |
| `available` | Total minus pending holds |
| `pending` | Amount in pending (not yet settled) transactions |
