---
title: Transactions
hidden: false
---

Paginated transaction history with status filtering and individual transaction details.

## Transaction History

`GET /accounts/private/v1/transactions`

- **Auth**: Individual access token
- Returns a paginated list of transactions with status, amount, and counterparty.

**Response:**

```json
{
  "data": [
    {
      "id": "txn_abc123",
      "type": "tba",
      "status": "executed",
      "amount": "100.00",
      "currency": "USD",
      "description": "Savings top-up",
      "createdAt": "2024-03-15T14:22:00Z"
    }
  ],
  "meta": {
    "totalRecord": 45,
    "totalPage": 3,
    "pageNumber": 1,
    "limit": 20
  }
}
```

**Filter by status:**

```
?filter[status:eq]=executed
?filter[status:in]=pending,executed
```

| Status | Meaning |
|--------|---------|
| `pending` | Submitted, awaiting processing |
| `executed` | Completed successfully |
| `rejected` | Failed — see transaction details |
