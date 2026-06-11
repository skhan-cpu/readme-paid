---
title: Welcome to TAPP Cash
excerpt: TAPP Cash is a white-label financial platform for embedding accounts, transfers, and KYC into your product.
hidden: false
---

TAPP Cash is a modern banking platform that lets you embed financial accounts, transfers, and KYC into your product via API. These docs cover everything your engineering team needs to integrate — from inviting a user all the way through daily banking operations.

---

## Quickstart

**1. Get Credentials**

Contact **[support@tappcash.com](mailto:support@tappcash.com)** to request your account manager credentials. Include your name, organization, environment (staging or production), and a brief description of your integration. All API requests require a Bearer token.

**2. Sign In & Invite**

Authenticate as an advisor and send your first invitation in two API calls — sign in to get your `accessToken`, then invite an individual by email. See [Onboarding](./onboarding) for the full flow.

**3. Complete Onboarding**

The invited user follows a guided 10-step flow: validate invite token, accept agreements, set password, W9 certification, security questions, phone OTP, KYC submission, and token exchange. See [Individual Account](./individual-account).

**4. Explore the Reference**

Browse all endpoints with full request schemas, response shapes, and live try-it-out in the **[API Reference](https://developers.tappcash.com/reference)**.

---

## What can you build?

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0">

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Account Manager Workflows</strong><br/><br/>
Sign in as an advisor, manage your portfolio of individuals, send invitations, and track onboarding status across your branch.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Individual Onboarding</strong><br/><br/>
Guide users through invitation acceptance, W9 certification, security setup, phone verification, and KYC submission — all via API.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Money Movement</strong><br/><br/>
Internal transfers between a user's own accounts (TBA) and ACH pulls/pushes to linked external bank accounts.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Account Activity</strong><br/><br/>
Real-time balances, full transaction history with status filtering, and a notification system with unread-count badges.
</div>

</div>

---

## Recipes

Step-by-step guides for common integration patterns.

| Recipe | What it covers |
|--------|----------------|
| **Account Manager: Sign in & invite** | Authenticate as advisor, list managed individuals, send an invitation |
| **Individual onboarding** | Steps 1–10: validate token → accept invite → KYC → token exchange |
| **Sign in as returning user** | Standard login flow and token refresh for individual users |
| **Internal transfer (TBA)** | Preview fees and move funds between a user's own accounts |
| **External account linking (ACH)** | BaaS token → Plaid link → pull or push funds |
| **Notifications** | Unread count, list, mark read |
| **Account closure** | Two-step OTP-confirmed deletion |

> **Available Soon** — detailed recipe pages with full curl examples and step-by-step walkthroughs are coming shortly.

---

## Support

| Topic | Contact |
|-------|---------|
| Credentials & access | [support@tappcash.com](mailto:support@tappcash.com) |
| Developer docs | developers.tappcash.com |
| API reference | developers.tappcash.com/reference |
