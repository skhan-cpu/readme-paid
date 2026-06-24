---
title: Get Unread Notification Count
api:
  file: openapi-business-v1.yaml
  operationId: boGetUnreadNotificationCount
privacy:
  view: public
---

Returns the count of unread notifications. Use this to display the badge number on the notification bell icon.

> This endpoint is shared across Individual and Business Owner user types at the same URL:
> `GET /notifications/private/v1/notifications/unread-count`
