---
title: Glossary
hidden: false
---

Definitions for key terms used throughout the TAPP Cash API documentation.

## A

**Access Token**
A short-lived JWT (30-minute lifetime) used to authenticate requests to private API endpoints. Issued by `POST /users/public/v1/auth/signin` or `POST /users/private/v1/limited/token-exchange`. Refresh it with `POST /users/public/v1/auth/refresh`.

**ACH (Automated Clearing House)**
A US electronic funds transfer network used to move money between TAPP Cash accounts and external bank accounts. TAPP Cash supports both ACH pull (inbound) and ACH push (outbound).

**Advisor**
The front-line admin role. An Advisor invites and manages a portfolio of Individual and Business Owner clients, monitors their accounts and transfers, and has access to client reports.

**Auto-Payment**
A recurring scheduled transfer set up by a client or Operator. Runs automatically on the configured frequency (e.g. monthly). Requires the `autoPay` permission for Operators.

---

## B

**BaaS (Banking as a Service)**
The underlying financial infrastructure provider. TAPP Cash uses a BaaS partner to handle external account linking and ACH transfers. The BaaS auth token is required to initialize the Plaid Link session.

**Bearer Token**
The authentication scheme used by TAPP Cash. Pass your `accessToken` in the `Authorization` header as `Authorization: Bearer <token>`.

**Branch**
The organizational unit that groups Advisors and their client portfolios. Every Advisor belongs to exactly one branch. Branch Managers configure approval settings per branch.

**Branch Manager**
An admin role that manages Advisors within a branch and configures transfer approval settings. Can require their sign-off on client transfer requests before they execute.

**Business Owner**
A client-facing role for business entities. Business Owners complete KYB verification, hold business accounts, initiate transfers, and can invite Operators to manage their accounts on their behalf.

---

## H

**Head Branch Manager**
An admin role that manages Advisors across branches and has full oversight of all client portfolios, transfers, and reports. Also called *Super Advisor* in internal systems.

---

## I

**Individual**
A client-facing role for personal account holders. Individuals complete KYC verification, hold checking and savings accounts, and can initiate TBA and ACH transfers.

**Invitation Token**
A short-lived token included in the invitation email sent to a new client (Individual, Business Owner, or Operator). Used in step 1 (validate token) and step 3 (accept invitation) of onboarding.

---

## K

**KYB (Know Your Business)**
The business identity verification process required for Business Owner accounts. Business Owners submit entity details and beneficial ownership information. Verified asynchronously by the TAPP Cash compliance team.

**KYC (Know Your Customer)**
The personal identity verification process required for Individual accounts and Operators. Submitted during onboarding and verified asynchronously.

---

## O

**Operator**
A team member invited by a Business Owner to manage business accounts on their behalf. Operators complete KYC verification and are granted specific permissions (`transferFunds`, `autoPay`) by the Business Owner.

---

## P

**Pending**
A transaction or transfer status meaning the request has been submitted but not yet processed. Both TBA and ACH transfers start in `pending` before moving to `executed` or `rejected`.

---

## R

**Refresh Token**
A long-lived token (30-day lifetime) used to obtain a new `accessToken` without requiring the user to re-login. Pass it to `POST /users/public/v1/auth/refresh`.

**Role**
Determines which endpoints a token can access. TAPP Cash has seven roles: `root` (Root Advisor), `superadvisor` (Head Branch Manager), `branchmanager` (Branch Manager), `advisor` (Advisor), `businessowner` (Business Owner), `individual` (Individual), and `businessoperator` (Operator). Calling an endpoint outside your role returns `403 Forbidden`.

**Root Advisor**
The highest admin tier. Created during organization onboarding. Manages the organization's entire structure — branches, all admin tiers, and has full visibility across all client portfolios and reports.

---

## T

**TBA (Transfer Between Accounts)**
An internal transfer between two accounts belonging to the same user. Both accounts are TAPP Cash accounts. Always preview before submitting — the preview calculates fees and confirms available balance.

**Temporary Access Token**
A restricted token issued at step 3 of client onboarding (`POST /invites/accept`). Valid only for the limited onboarding endpoints until exchanged for a full access token via `POST /users/private/v1/limited/token-exchange`.

**Transfer Request**
A pending money movement initiated by a client. Depending on branch approval settings, a transfer request may require Branch Manager sign-off before executing.

---

## W

**W9**
A US tax form (Request for Taxpayer Identification Number) that Individual users must certify during onboarding. Users acknowledge the W9 terms and submit the certification data during the registration flow.
