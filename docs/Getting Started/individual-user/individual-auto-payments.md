---
title: Auto-Payments
hidden: false
---

Individual users can schedule recurring payments between their own accounts or to an external bank — no special permission required beyond a valid access token.

---

## Preview Auto-Payment

`POST /accounts/private/v1/auto-payment/preview`

- **Auth**: Individual access token

Always preview before creating — the response confirms the fee deducted each period.

```json
{
  "accountIdFrom": "42",
  "accountIdTo": "15",
  "amount": "200.00"
}
```

To schedule a recurring payment to an external bank account:

```json
{
  "accountIdFrom": "42",
  "amount": "200.00",
  "accountToACH": {
    "accountNumber": "123456789012",
    "routingNumber": "026009593",
    "accountOwnerName": "Jane Doe",
    "bankCountry": "US",
    "bankName": "Chase"
  }
}
```

**Response:**

```json
{
  "data": {
    "amount": "200.00",
    "fee": "1.00"
  }
}
```

---

## Create Auto-Payment

`POST /accounts/private/v1/auto-payment`

- **Auth**: Individual access token

```json
{
  "accountIdFrom": "42",
  "accountIdTo": "15",
  "amount": "200.00",
  "period": "monthly",
  "type": "until_cancel",
  "startDate": "02/01/2025",
  "description": "Monthly savings transfer"
}
```

| Field | Type | Required | Notes |
|-------|------|:--------:|-------|
| `accountIdFrom` | string | ✓ | Source account ID |
| `accountIdTo` | string | | Destination TAPP Cash account |
| `accountToACH` | object | | External bank (instead of `accountIdTo`) |
| `amount` | string (decimal) | ✓ | Per-period amount, must be > 0 |
| `period` | string | ✓ | `weekly`, `biweekly`, `monthly`, or `one_time` |
| `type` | string | ✓ | Stop condition — see [Auto-Payments overview](/docs/auto-payments) |
| `startDate` | string | ✓ | `MM/DD/YYYY` — must be at least the next calendar day |
| `endDate` | string | Required when `type=end_date` | `MM/DD/YYYY`, must be ≥ `startDate` |
| `limitAmount` | string (decimal) | Required when `type=limit_amount` | Total cap |
| `description` | string | | Up to 255 characters |

---

## List Auto-Payments

`GET /accounts/private/v1/auto-payment`

- **Auth**: Individual access token

```
GET /accounts/private/v1/auto-payment?page[number]=1&page[size]=20
Authorization: Bearer <individual_token>
```

| Field | Description |
|-------|-------------|
| `id` | Auto-payment identifier |
| `amount` | Per-period payment amount |
| `period` | Payment frequency |
| `type` | Stop condition |
| `startDate` | First payment date |
| `status` | `active`, `cancelled`, or `completed` |

---

## Cancel Auto-Payment

`PUT /accounts/private/v1/auto-payment/:autoPaymentId/cancel`

- **Auth**: Individual access token

Cancellation is immediate — no further payments will be processed.

```
PUT /accounts/private/v1/auto-payment/88/cancel
Authorization: Bearer <individual_token>
V-Client-Device-Id: <device-uuid>
```
