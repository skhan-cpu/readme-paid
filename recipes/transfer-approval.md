---
title: Transfer with Branch Approval
description: Enable Branch Manager approval on a branch, then walk through the full approval lifecycle from submission to execution.
hidden: false
recipe:
  color: '#EF4444'
  icon: ✅
---

```shell Step 1 — Enable Branch Approval
curl -X PUT https://api-test.stage2.tappbank.com/accounts/private/v1/branches/approval-requirement \
  -H "Authorization: Bearer <branch_manager_token>" \
  -H "Content-Type: application/json" \
  -d '{ "isBmApprovalRequired": true }'
```

```json Response
{
  "data": {
    "isBmApprovalRequired": true
  }
}
```

# Step 1 — Enable Branch Approval

<!-- shell@ -->

Once enabled, all new transfer requests from clients in this branch enter `pending_approval` instead of executing immediately. In-progress requests are not affected.

# Step 2 — Client Submits a Transfer

<!-- shell@ -->

The client initiates a standard TBA transfer. Because approval is required, the response status is `pending_approval` instead of `pending`.

```shell Step 2 — Client Submits a Transfer
curl -X POST https://api-test.stage2.tappbank.com/accounts/private/v1/tba-requests \
  -H "Authorization: Bearer <client_token>" \
  -H "V-Client-Device-Id: <device-uuid>" \
  -H "Content-Type: application/json" \
  -d '{
    "accountIdFrom": 1001,
    "accountIdTo": 1002,
    "outgoingAmount": "500.00",
    "incomingAmount": "497.50",
    "description": "Savings top-up"
  }'
```

```json Response
{
  "data": {
    "id": "req-456",
    "status": "pending_approval",
    "outgoingAmount": "500.00"
  }
}
```

# Step 3 — Branch Manager: List Pending Requests

<!-- shell@ -->

The Branch Manager retrieves all requests awaiting their review. Filter by `pending_approval` to focus the queue.

```shell Step 3 — Branch Manager: List Pending Requests
curl "https://api-test.stage2.tappbank.com/accounts/private/v1/requests?filter[status]=pending_approval&page[number]=1&page[size]=20" \
  -H "Authorization: Bearer <branch_manager_token>"
```

```json Response
{
  "data": [
    {
      "id": "req-456",
      "status": "pending_approval",
      "outgoingAmount": "500.00",
      "description": "Savings top-up",
      "createdAt": "2025-02-01T10:30:00Z"
    }
  ]
}
```

# Step 4 — Approve or Reject

<!-- shell@ -->

Approving executes the transfer immediately. Rejecting cancels it — include a `reason` so the client understands the decision.

```shell Step 4 — Approve or Reject
# Approve — transfer executes immediately
curl -X PUT https://api-test.stage2.tappbank.com/accounts/private/v1/requests/req-456/approve \
  -H "Authorization: Bearer <branch_manager_token>"

# Reject — transfer is cancelled
curl -X PUT https://api-test.stage2.tappbank.com/accounts/private/v1/requests/req-456/reject \
  -H "Authorization: Bearer <branch_manager_token>" \
  -H "Content-Type: application/json" \
  -d '{ "reason": "Insufficient supporting documentation" }'
```

```json Response
{
  "data": {
    "id": "req-456",
    "status": "executed"
  }
}
```

| Status | Meaning |
|---|---|
| `pending_approval` | Awaiting Branch Manager review |
| `executed` | Approved and completed |
| `rejected` | Declined by Branch Manager |
