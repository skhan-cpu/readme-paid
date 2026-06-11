---
title: Glossary
excerpt: Definitions for key terms used throughout the TAPP Cash API documentation.
hidden: false
---

## A

**Access Token**
A short-lived JWT (30-minute lifetime) used to authenticate requests to private API endpoints. Issued by `POST /auth/signin` or `PUT /token-exchange`. Refresh it with `POST /auth/refresh`.

**Account Manager**
Also called an *Advisor*. A platform operator who manages a portfolio of individual users, sends invitations, and monitors onboarding status. Account managers authenticate with `"roles": ["advisor"]`.

**ACH (Automated Clearing House)**
A US electronic funds transfer network used to move money between TAPP Cash accounts and external bank accounts. TAPP Cash supports both ACH pull (inbound) and ACH push (outbound).

---

## B

**BaaS (Banking as a Service)**
The underlying financial infrastructure provider. TAPP Cash uses a BaaS partner (e.g., Plaid) to handle external account linking and ACH transfers.

**Bearer Token**
The authentication scheme used by TAPP Cash. Pass your `accessToken` in the `Authorization` header as `Authorization: Bearer <token>`.

**Branch**
The organizational unit an account manager belongs to. Individuals are invited and managed within a branch.

---

## I

**Individual User**
An end user who holds TAPP Cash accounts. Individuals complete an onboarding flow (steps 1–10) after receiving an invitation from an account manager.

**Invitation Token**
A short-lived token included in the invitation email sent to a new individual. Used in step 1 (validate token) and step 3 (accept invitation) of onboarding.

---

## K

**KYC (Know Your Customer)**
The identity verification process required for regulatory compliance. Individual users submit KYC information in step 9 of onboarding. Verification is processed asynchronously.

---

## P

**Pending**
A transaction or transfer status meaning the request has been submitted but not yet processed. Both TBA and ACH transfers start in `pending` before moving to `executed` or `rejected`.

---

## R

**Refresh Token**
A long-lived token (30-day lifetime) used to obtain a new `accessToken` without requiring the user to re-login. Pass it to `POST /auth/refresh`.

**Role**
Determines which endpoints a token can access. TAPP Cash has two roles: `advisor` (account manager) and `individual`. Specified during sign-in via the `roles` field.

---

## T

**TBA (Transfer Between Accounts)**
An internal transfer between two accounts belonging to the same individual user. Both accounts are TAPP Cash accounts. Always preview before submitting — the preview calculates fees.

**Temporary Access Token**
A restricted token issued at step 3 of individual user onboarding (`POST /invites/accept`). Valid only for the limited onboarding endpoints (steps 4–9) until exchanged for a full access token at step 10.

---

## W

**W9**
A US tax form (Request for Taxpayer Identification Number) that individual users must certify during onboarding. Users acknowledge the W9 terms in step 4 and submit the certification data in step 9.
