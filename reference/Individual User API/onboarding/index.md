---
title: Onboarding
hidden: false
---
These endpoints handle the onboarding flow for all client user types — Individual, Business Owner, and Operator.

Steps 1–3 are public (no auth required). Steps 4–9 require your org session headers on every request:

```
X-Session-Id: <sessionId>
X-Client-Id:  <clientId>
```
