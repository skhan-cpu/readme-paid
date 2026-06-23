---
title: Complete Signup
api:
  file: openapi-v0.yaml
  operationId: individualSignup
hidden: false
---

Completes registration by submitting the user's profile and identity verification data. This is the final onboarding step before the account is activated.

> **Path and verification type differ per user type**:
> - **Individual** (KYC): `POST /branches/private/v1/limited/individual/signup`
> - **Business Owner** (KYB): `POST /branches/private/v1/limited/businessowner/signup`
> - **Operator** (KYC): `POST /branches/private/v1/limited/operator/signup`
>
> The Try It panel uses the Individual path. Business Owner and Operator callers should substitute their respective path.
