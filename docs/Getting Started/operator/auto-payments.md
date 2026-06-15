---
title: Auto-Payments
hidden: false
---

Operators can schedule recurring payments on behalf of the Business Owner — all auto-payment operations require the `autoPay` permission, and any attempt without it returns `403 Forbidden`.

---

## Permission Check

Before rendering auto-payment UI, check whether the Operator has the `autoPay` permission:

`GET /branches/private/v1/limited/operator/details`

```json
{
  "data": {
    "permissions": {
      "autoPay": true
    }
  }
}
```

---

## Preview Auto-Payment

`POST /accounts/private/v1/auto-payment/preview`

- **Auth**: Operator access token
- **Requires**: `autoPay` permission

Always preview before creating — the preview confirms the fee that will be deducted each period.

```json
{
  "accountIdFrom": "42",
  "accountIdTo": "15",
  "amount": "250.00"
}
```

To send to an external bank account directly (without a linked Plaid account):

```json
{
  "accountIdFrom": "42",
  "amount": "250.00",
  "accountToACH": {
    "accountNumber": "123456789012",
    "routingNumber": "026009593",
    "accountOwnerName": "Acme Corp",
    "bankCountry": "US",
    "bankName": "JPMorgan Chase"
  }
}
```

**Response:**

```json
{
  "data": {
    "amount": "250.00",
    "fee": "1.25"
  }
}
```

---

## Create Auto-Payment

`POST /accounts/private/v1/auto-payment`

- **Auth**: Operator access token
- **Requires**: `autoPay` permission

```json
{
  "accountIdFrom": "42",
  "accountIdTo": "15",
  "amount": "250.00",
  "period": "monthly",
  "type": "until_cancel",
  "startDate": "02/01/2025",
  "description": "Monthly vendor retainer"
}
```

| Field | Type | Required | Notes |
|-------|------|:--------:|-------|
| `accountIdFrom` | string | ✓ | Source account ID |
| `accountIdTo` | string | | Destination TappCash account |
| `accountToACH` | object | | External bank account (instead of `accountIdTo`) |
| `amount` | string (decimal) | ✓ | Per-period payment amount, must be > 0 |
| `period` | string | ✓ | `weekly`, `biweekly`, `monthly`, or `one_time` |
| `type` | string | ✓ | Stop condition — see table below |
| `startDate` | string | ✓ | `MM/DD/YYYY` — must be at least the next calendar day |
| `endDate` | string | Required when `type=end_date` | `MM/DD/YYYY`, must be ≥ `startDate` |
| `limitAmount` | string (decimal) | Required when `type=limit_amount` | Total cap — payments stop once this is reached |
| `description` | string | | Up to 255 characters |

**Stop condition types:**

| `type` | Stops when |
|--------|------------|
| `end_date` | `endDate` is reached |
| `until_cancel` | Operator or admin manually cancels |
| `limit_amount` | Cumulative payments reach `limitAmount` |

---

## List Auto-Payments

`GET /accounts/private/v1/auto-payment`

- **Auth**: Operator access token
- **Requires**: `autoPay` permission

```
GET /accounts/private/v1/auto-payment?page[number]=1&page[size]=20
```

Returns all auto-payments for the Business Owner — including those created by the Operator and any created by the Business Owner directly.

**Response fields:**

| Field | Description |
|-------|-------------|
| `id` | Auto-payment identifier |
| `amount` | Per-period payment amount |
| `period` | Payment frequency |
| `type` | Stop condition |
| `startDate` | First payment date |
| `endDate` | End date (if `type=end_date`) |
| `limitAmount` | Total cap (if `type=limit_amount`) |
| `status` | Current status (`active`, `cancelled`, `completed`) |
| `description` | Optional label |

---

## Cancel Auto-Payment

`PUT /accounts/private/v1/auto-payment/:autoPaymentId/cancel`

- **Auth**: Operator access token
- **Requires**: `autoPay` permission

```
PUT /accounts/private/v1/auto-payment/88/cancel
Authorization: Bearer <operator_token>
V-Client-Device-Id: <device-uuid>
```

Cancellation is immediate — no further payments will be processed after this call.
