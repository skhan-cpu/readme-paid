---
title: Notifications
excerpt: Retrieve unread counts, list notifications, and mark them as read for individual users.
hidden: false
---

The notifications system lets you surface real-time activity alerts to individual users — transaction confirmations, KYC status changes, and platform messages.

---

## Get unread notification count

`GET /notifications/private/v1/notifications/unread-count`

Use this to drive an unread badge in your UI without fetching the full notification list.

```json
{
  "data": {
    "count": 5
  }
}
```

---

## List notifications

`GET /notifications/private/v1/notifications`

Returns the user's full notification list. Each notification includes:

| Field | Description |
|-------|-------------|
| `id` | Notification ID |
| `type` | Event type, e.g. `TRANSACTION_EXECUTED` |
| `isRead` | Whether the user has read this notification |
| `createdAt` | Timestamp |

---

## Mark all as read

`POST /notifications/private/v1/notifications/mark-all-read`

Call this after the user views the notification screen to clear the unread count badge.

---

## Mark a single notification as read

`DELETE /notifications/private/v1/notifications/{id}`

Marks one specific notification as read by its ID.
