---
title: KYC / KYB Status
privacy:
  view: public
---

Returns the latest identity verification request for the authenticated user. The same endpoint serves all three user types — the response content reflects the verification type relevant to that user:

- **Individual** → KYC (Know Your Customer) — personal identity verification
- **Business Owner** → KYB (Know Your Business) — business entity verification
- **Operator** → KYC — personal identity verification (same as Individual)
