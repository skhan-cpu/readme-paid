---
title: Accounts
hidden: false
---

All accounts are created automatically when onboarding completes and are immediately available after token exchange — view total balance, list all accounts, and get per-account details.

---

## Total Balance

`GET /accounts/private/v1/balance/total`

- **Auth**: Individual access token
- Returns the combined balance across all accounts, including pending amounts.

**Response:**

```json
{
  "data": {
    "totalAvailableBalance": "11250.00",
    "pendingIncoming": "500.00",
    "pendingOutgoing": "150.00",
    "currency": "USD"
  }
}
```

| Field | Description |
|-------|-------------|
| `totalAvailableBalance` | Sum of available balances across all accounts |
| `pendingIncoming` | Total funds incoming but not yet settled |
| `pendingOutgoing` | Total funds outgoing but not yet settled |

Pass `?accountIds=1001,1002` to filter to specific accounts.

---

## List All Accounts

`GET /accounts/private/v1/account`

- **Auth**: Individual access token
- Returns all accounts owned by the authenticated user.

**Response:**

```json
{
  "data": [
    {
      "id": 1001,
      "name": "Checking Account",
      "type": "checking",
      "status": "active",
      "currency": "USD",
      "availableBalance": "2450.00",
      "pendingBalance": "150.00"
    },
    {
      "id": 1002,
      "name": "Savings Account",
      "type": "savings",
      "status": "active",
      "currency": "USD",
      "availableBalance": "8800.00",
      "pendingBalance": "0.00"
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `id` | Account ID used in transfer requests |
| `name` | Display name shown to the user |
| `type` | Account type: `checking`, `savings` |
| `status` | `active`, `frozen`, or `closed` |
| `availableBalance` | Funds available for immediate use |
| `pendingBalance` | Funds held from pending transactions |

---

## Account Details

`GET /accounts/private/v1/account/{id}`

- **Auth**: Individual access token
- Returns the full account object including available balance, account type, interest configuration, and account number details.

