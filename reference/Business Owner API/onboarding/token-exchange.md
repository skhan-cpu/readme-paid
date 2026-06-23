---
title: Step 10 — Exchange for Full Access Token
api:
  file: openapi-business-v1.yaml
  operationId: boTokenExchange
hidden: false
---

Exchanges the limited onboarding session for a full-access token once onboarding steps are complete. Use the returned token for all subsequent Business Owner API calls.

**Requires session headers:** `X-Session-Id` + `X-Client-Id`.
