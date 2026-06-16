---
title: Auto-Payments
hidden: false
---

Auto-payments let users schedule recurring transfers on a fixed period — weekly, biweekly, monthly, or one-time — with a configurable stop condition. The feature is available to Individual users, Business Owners, and Operators, with access controlled by role and permissions.

---

## Who can use auto-payments?

| Role | Access | Permission required |
|------|--------|---------------------|
| **Individual** | Schedule recurring transfers between their own accounts or to external banks | None — available to all authenticated Individuals |
| **Business Owner** | Schedule recurring transfers between business accounts or to external banks | None — available to all authenticated Business Owners |
| **Operator** | Schedule recurring transfers on behalf of the Business Owner | `autoPay` permission must be granted by the Business Owner |

---

## Stop conditions

All three roles use the same stop condition model:

| `type` | Stops when |
|--------|------------|
| `end_date` | A specified end date is reached |
| `until_cancel` | Manually cancelled by the user or an admin |
| `limit_amount` | Cumulative payments reach a total cap |

---

## Payment periods

| `period` | Description |
|----------|-------------|
| `weekly` | Every 7 days from start date |
| `biweekly` | Every 14 days from start date |
| `monthly` | Same day each month |
| `one_time` | Single scheduled future payment |

---

## Role-specific guides

<Cards>
  <Card title="Individual" href="/docs/individual-auto-payments" icon="fa-duotone fa-user">Recurring payments from personal checking or savings accounts — internal or ACH to an external bank.</Card>
  <Card title="Business Owner" href="/docs/business-auto-payments" icon="fa-duotone fa-building">Recurring payments from business accounts — internal or ACH — managed directly by the Business Owner.</Card>
  <Card title="Operator" href="/docs/operator-auto-payments" icon="fa-duotone fa-user-lock">Recurring payments on behalf of the Business Owner — requires the `autoPay` permission.</Card>
</Cards>
