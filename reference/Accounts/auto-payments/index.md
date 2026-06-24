---
title: Auto-Payments
privacy:
  view: public
---

Endpoints for managing scheduled automatic payments. Auto-payments allow Business Owner users to set up recurring transfers that execute automatically on a defined schedule.

## Endpoints

### Preview Auto-Payment
Returns a fee and amount preview for a proposed auto-payment before it is created. Use this to show the user an accurate cost breakdown — including any applicable fees — on a confirmation screen before calling **Create Auto-Payment**.

### Create Auto-Payment
Schedules a new recurring automatic payment. Requires the source account, destination account, amount, and recurrence schedule. It is recommended to call **Preview Auto-Payment** first to confirm the fee details with the user.

### List Auto-Payments
Returns a paginated list of all scheduled auto-payments for the authenticated user. Use this to display the user's active and past auto-payment schedules.

### Get Auto-Payment
Returns the full details of a single auto-payment by its ID — including the schedule, amount, status, and associated accounts.

### Cancel Auto-Payment
Cancels an active auto-payment schedule. Once cancelled, no further payments will be executed. Requires the auto-payment ID.
