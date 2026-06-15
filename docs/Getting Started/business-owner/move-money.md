---
title: Move Money
hidden: false
---

Business Owners and their Operators can initiate three types of money movement — internal TBA transfers, ACH transfers to/from linked external bank accounts, and scheduled auto-payments — all of which require KYB approval.

---

## Transfer Types

| Type              | Description                                                                   | Auth required      |
|-------------------|-------------------------------------------------------------------------------|--------------------|
| **TBA (Internal)**| Move funds between the business's own accounts (e.g. checking → savings)     | KYB approved       |
| **ACH**           | Pull from or push to an external bank account linked via Plaid                | KYB approved       |
| **Auto-Payment**  | Recurring scheduled transfer (TBA or ACH) on a defined frequency              | KYB approved       |

---

## Internal Transfer (TBA)

### Preview Transfer

`POST /accounts/private/v1/tba-requests/preview`

- **Auth**: Business Owner or Operator access token (requires `transferFunds` permission for Operators)

Preview the fee and details before executing.

```json
{
  "fromAccountId": "acc-uuid-1",
  "toAccountId": "acc-uuid-2",
  "amount": 1000.00
}
```

**Response:**

```json
{
  "data": {
    "fee": 0.00,
    "amount": 1000.00,
    "totalDeducted": 1000.00
  }
}
```

### Execute Transfer

`POST /accounts/private/v1/tba-requests`

- **Auth**: Business Owner or Operator access token (requires `transferFunds` permission for Operators)

```json
{
  "fromAccountId": "acc-uuid-1",
  "toAccountId": "acc-uuid-2",
  "amount": 1000.00
}
```

---

## ACH Transfer (External)

ACH transfers require a linked external bank account. Use the Plaid-based flow to link one first.

### Step 1 — Get BaaS Auth Token

`POST /external-accounts/private/v1/baas/auth-token`

- **Auth**: Business Owner or Operator access token

Returns a short-lived BaaS token to initialize the Plaid Link session.

### Step 2 — Link External Account

Use the BaaS token to open Plaid Link in your UI. On success, Plaid returns an `accountId` you can use for ACH transfers.

### Step 3 — List Linked External Accounts

`GET /external-accounts/private/v1/account`

Returns all external accounts linked to the user.

### Step 4 — Preview ACH Transfer

`POST /accounts/private/v1/ext-requests/preview`

```json
{
  "externalAccountId": "ext-acc-uuid",
  "internalAccountId": "acc-uuid-1",
  "amount": 500.00,
  "direction": "pull"
}
```

| Field        | Values           | Description                                        |
|--------------|------------------|----------------------------------------------------|
| `direction`  | `pull` / `push`  | `pull` = external → internal; `push` = internal → external |

### Step 5 — Execute ACH Transfer

`POST /accounts/private/v1/ext-requests`

Same body as the preview. Executes the transfer after confirmation.

---

## Auto-Payments

Auto-payments are recurring scheduled transfers. They can be set up by the Business Owner or by an Operator with `autoPay` permission.

Auto-payments run on the configured schedule (monthly, annually, etc.) and can be paused, updated, or deleted at any time.

> Auto-payment API reference is included in the full API reference section.

---

## Transfer Limits

`GET /external-accounts/private/v1/account/transfer-limits`

Returns the configured per-transaction and daily transfer limits for ACH transfers.

```json
{
  "data": {
    "dailyLimit": 10000.00,
    "perTransactionLimit": 5000.00,
    "currency": "USD"
  }
}
```

---

## Operator Permissions for Transfers

When an Operator initiates a transfer, the request is gated by the permissions the Business Owner assigned:

| Permission      | Allows                                         |
|-----------------|------------------------------------------------|
| `transferFunds` | TBA internal transfers and ACH transfers       |
| `autoPay`       | Create and manage auto-payment schedules       |

An Operator missing the required permission receives `403 Forbidden`.
