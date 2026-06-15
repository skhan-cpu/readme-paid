---
title: Account Closure
excerpt: Two-step OTP-confirmed process for permanently closing an individual user's account.
hidden: false
---

Account closure is a two-step process to prevent accidental deletion. The user must request an OTP and then confirm with it. Accounts with blockers (positive balance, pending transactions, or insufficient funds for the closure fee) cannot be closed until those blockers are resolved.

---

## Step 1: Request an OTP

`POST /branches/private/v1/delete-profile-otp`

```json
{ "accountId": 1001 }
```

Pass `accountId` if a closure fee applies. The API validates eligibility and sends an OTP to the user's registered phone number.

**If blockers exist**, the API returns `422` with blocker codes:

```json
{
  "errors": [
    {
      "code": "POSITIVE_BALANCE",
      "title": "Account has a positive balance",
      "details": "Transfer or withdraw all funds before closing."
    }
  ]
}
```

| Blocker code | Meaning |
|---|---|
| `POSITIVE_BALANCE` | Funds remain in the account |
| `PENDING_TRANSACTIONS` | Transactions are still processing |
| `INSUFFICIENT_FUNDS_FOR_FEE` | Not enough balance to cover the closure fee |

---

## Step 2: Confirm deletion

`DELETE /branches/private/v1/delete-profile`

```json
{ "otp": "123456" }
```

Provide the OTP received in step 1. On success the user's profile and all associated accounts are **permanently closed**. This action cannot be undone.

---

> **Important:** Always display a clear confirmation dialog before calling step 2. Inform the user that closure is permanent and irreversible.
