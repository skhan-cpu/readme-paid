---
title: Accounts & Balances
excerpt: View business accounts, check balances, and access account details after KYB approval.
hidden: false
---

Once KYB is approved, the Business Owner's business accounts become fully active. Both the Business Owner and any Operators they invite can view account information and balances.

---

## List Accounts

`GET /accounts/private/v1/account`

- **Auth**: Business Owner or Operator access token

Returns all accounts for the authenticated user.

```
GET /accounts/private/v1/account
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "data": [
    {
      "id": "acc-uuid-1",
      "type": "checking",
      "availableBalance": 12500.00,
      "pendingBalance": 200.00,
      "currency": "USD",
      "status": "active"
    },
    {
      "id": "acc-uuid-2",
      "type": "savings",
      "availableBalance": 45000.00,
      "pendingBalance": 0.00,
      "currency": "USD",
      "status": "active"
    }
  ]
}
```

---

## Get Account Details

`GET /accounts/private/v1/account/{id}`

- **Auth**: Business Owner or Operator access token

Returns detailed information for a single account, including account number and routing details.

---

## Get Bank Details

`GET /accounts/private/v1/account/{id}/bank-details`

- **Auth**: Business Owner or Operator access token

Returns the account's bank details — account number and routing number — needed for ACH setup.

---

## Total Available Balance

`GET /accounts/private/v1/balance/total`

- **Auth**: Business Owner or Operator access token

Returns the sum of available balances across all accounts.

```json
{
  "data": {
    "totalAvailableBalance": 57500.00,
    "currency": "USD"
  }
}
```

---

## Account Status

| Status     | Meaning                                       |
|------------|-----------------------------------------------|
| `active`   | Account is open and operational               |
| `dormant`  | Account is inactive — contact support         |
| `closed`   | Account has been closed                       |
| `frozen`   | Account temporarily restricted                |
