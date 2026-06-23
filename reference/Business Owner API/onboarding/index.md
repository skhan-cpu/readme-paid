---
title: Onboarding
hidden: false
---
These endpoints handle the onboarding flow for Business Owner clients.

Steps 1–3 are public (no auth required). Steps 4–9 require your org session headers on every request:

```
X-Session-Id: <sessionId>
X-Client-Id:  <clientId>
```

After Step 3 (Accept invitation), create a session scoped to the Business Owner using the `customerUid` returned from Step 1, then include those session headers for all subsequent steps.
