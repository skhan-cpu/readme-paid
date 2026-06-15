---
title: Recurring Auto-Payment
description: Preview, create, and manage a recurring scheduled payment with weekly, biweekly, or monthly cadence.
hidden: false
recipe:
  color: '#F59E0B'
  icon: 🔄
---

```shell Step 1 — Check Permission (Operators only)
curl https://api-test.stage2.tappbank.com/branches/private/v1/limited/operator/details \
  -H "Authorization: Bearer <operator_token>" \
  -H "V-Client-Device-Id: <device-uuid>"
```

```json Response
{
  "data": {
    "permissions": {
      "transferFunds": true,
      "transferACH": false,
      "autoPay": true
    }
  }
}
```

# Step 1 — Check Permission (Operators only)

<!-- shell@ -->

Skip this step for Individual users and Business Owners — they can always manage auto-payments.

For Operators, check `permissions.autoPay` before rendering any auto-payment UI. If `false`, do not show the feature — any call without this permission returns `403 Forbidden`.

# Step 2 — Preview Auto-Payment

<!-- shell@ -->

Always preview before creating — the response confirms the per-period fee that will be deducted alongside each payment.

```shell Step 2 — Preview Auto-Payment
curl -X POST https://api-test.stage2.tappbank.com/accounts/private/v1/auto-payment/preview \
  -H "Authorization: Bearer <user_token>" \
  -H "V-Client-Device-Id: <device-uuid>" \
  -H "Content-Type: application/json" \
  -d '{
    "accountIdFrom": "42",
    "accountIdTo": "15",
    "amount": "250.00"
  }'
```

```json Response
{
  "data": {
    "amount": "250.00",
    "fee": "1.25"
  }
}
```

# Step 3 — Create Auto-Payment

<!-- shell@ -->

Choose a stop condition: `end_date` stops on a fixed date, `limit_amount` stops when cumulative payments reach a cap, `until_cancel` runs indefinitely until manually cancelled.

```shell Step 3 — Create Auto-Payment
curl -X POST https://api-test.stage2.tappbank.com/accounts/private/v1/auto-payment \
  -H "Authorization: Bearer <user_token>" \
  -H "V-Client-Device-Id: <device-uuid>" \
  -H "Content-Type: application/json" \
  -d '{
    "accountIdFrom": "42",
    "accountIdTo": "15",
    "amount": "250.00",
    "period": "monthly",
    "type": "until_cancel",
    "startDate": "02/01/2025",
    "description": "Monthly vendor retainer"
  }'
```

```json Response
{
  "data": {
    "id": "ap-001",
    "status": "active",
    "amount": "250.00",
    "period": "monthly",
    "type": "until_cancel",
    "startDate": "2025-02-01"
  }
}
```

| `type` | Stops when |
|---|---|
| `end_date` | `endDate` is reached |
| `until_cancel` | Manually cancelled |
| `limit_amount` | Cumulative payments reach `limitAmount` |

# Step 4 — Cancel Auto-Payment

<!-- shell@ -->

Cancellation is immediate — no further payments will be processed after this call.

```shell Step 4 — Cancel Auto-Payment
curl -X PUT https://api-test.stage2.tappbank.com/accounts/private/v1/auto-payment/ap-001/cancel \
  -H "Authorization: Bearer <user_token>" \
  -H "V-Client-Device-Id: <device-uuid>"
```

```json Response
{
  "data": {
    "id": "ap-001",
    "status": "cancelled"
  }
}
```
