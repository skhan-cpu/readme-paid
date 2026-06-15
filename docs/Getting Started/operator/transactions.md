---
title: Transactions
hidden: false
---

Operators can view the full transaction history and balance charts for all of the Business Owner's accounts — transaction access is available to all active Operators regardless of their transfer permissions.

---

## List Transactions

`GET /accounts/private/v1/transactions`

- **Auth**: Operator access token

```
GET /accounts/private/v1/transactions?page[number]=1&page[size]=20&sort=-createdAt
Authorization: Bearer <operator_token>
V-Client-Device-Id: <device-uuid>
```

Returns a paginated transaction history across all of the Business Owner's accounts.

**Query parameters:**

| Parameter | Description |
|-----------|-------------|
| `page[number]` | Page number (default: 1) |
| `page[size]` | Results per page (default: 20) |
| `filter[accountId]` | Scope to a specific account |
| `filter[status]` | Filter by status (`pending`, `executed`, `cancelled`, `rejected`) |
| `sort` | Sort field — prefix `-` for descending (default: `-createdAt`) |

**Response fields per transaction:**

| Field | Description |
|-------|-------------|
| `id` | Transaction identifier |
| `type` | Transaction type (e.g. TBA, EXT, fee) |
| `amount` | Transaction amount |
| `status` | `pending`, `executed`, `cancelled`, or `rejected` |
| `description` | Optional label |
| `createdAt` | Transaction timestamp |

---

## Get Transaction Details

`GET /accounts/private/v1/transactions/:id`

- **Auth**: Operator access token

```
GET /accounts/private/v1/transactions/12345?include=sender,recipient
Authorization: Bearer <operator_token>
V-Client-Device-Id: <device-uuid>
```

Returns full details for a specific transaction, including sender and recipient account information.

**Query parameters:**

| Parameter | Description |
|-----------|-------------|
| `include` | Comma-separated list of related objects to include: `sender`, `recipient`, `requestData` |

**Response:**

```json
{
  "data": {
    "id": "12345",
    "type": "TBA",
    "amount": "500.00",
    "status": "executed",
    "description": "Office supplies",
    "sender": {
      "accountId": "1",
      "userId": "<user-id>"
    },
    "recipient": {
      "accountId": "2",
      "userId": "<user-id>"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Balance Chart

`GET /accounts/private/v1/transactions/balance-chart`

- **Auth**: Operator access token

Returns time-series balance data for a selected period — use to display account balance trends.

```
GET /accounts/private/v1/transactions/balance-chart?period=30days
Authorization: Bearer <operator_token>
V-Client-Device-Id: <device-uuid>
```

**Query parameters:**

| Parameter | Required | Options |
|-----------|:--------:|---------|
| `period` | ✓ | `24hours`, `7days`, `30days`, `12months` |
| `accountIds` | | Comma-separated account IDs — omit for all accounts |

---

## Transfer Status Tracking

Transfers initiated via the Operator API are processed asynchronously. Use the transactions endpoint to track completion:

| Status | Meaning |
|--------|---------|
| `pending` | Transfer submitted, awaiting processing |
| `executed` | Transfer completed successfully |
| `cancelled` | Transfer was cancelled before processing |
| `rejected` | Transfer failed (insufficient funds, limit exceeded, etc.) |

Poll `GET /accounts/private/v1/transactions` and filter by status, or listen for `TRANSACTION_EXECUTED` push notifications to detect completion without polling.
