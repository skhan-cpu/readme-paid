---
title: Welcome to TAPP Cash
excerpt: TAPP Cash is a white-label financial platform for embedding accounts, transfers, and KYC into your product.
hidden: false
---

TAPP Cash is a modern banking platform that lets you embed financial accounts, transfers, and KYC into your product via API. These docs cover everything your engineering team needs to integrate — from inviting a user all the way through daily banking operations.

---

## Quickstart

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0">

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:24px">
<span style="display:inline-block;background:#2563eb;color:white;width:32px;height:32px;border-radius:50%;text-align:center;line-height:32px;font-weight:700;font-size:14px;margin-bottom:16px">1</span>
<br/>
<strong style="font-size:15px">Get Credentials</strong><br/><br/>
Contact <a href="mailto:support@tappcash.com">support@tappcash.com</a> to request your account manager credentials. Include your name, organization, environment, and use case. All API requests require a Bearer token.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:24px">
<span style="display:inline-block;background:#2563eb;color:white;width:32px;height:32px;border-radius:50%;text-align:center;line-height:32px;font-weight:700;font-size:14px;margin-bottom:16px">2</span>
<br/>
<strong style="font-size:15px">Sign In &amp; Invite</strong><br/><br/>
Authenticate as an advisor and send your first invitation in two API calls — sign in to get your <code>accessToken</code>, then invite an individual by email. See <a href="./onboarding">Onboarding</a> for the full flow.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:24px">
<span style="display:inline-block;background:#2563eb;color:white;width:32px;height:32px;border-radius:50%;text-align:center;line-height:32px;font-weight:700;font-size:14px;margin-bottom:16px">3</span>
<br/>
<strong style="font-size:15px">Complete Onboarding</strong><br/><br/>
The invited user follows a guided 10-step flow — invite token, agreements, password, W9, security questions, phone OTP, KYC, and token exchange. See <a href="./individual-account">Individual Account</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:24px">
<span style="display:inline-block;background:#2563eb;color:white;width:32px;height:32px;border-radius:50%;text-align:center;line-height:32px;font-weight:700;font-size:14px;margin-bottom:16px">4</span>
<br/>
<strong style="font-size:15px">Explore the Reference</strong><br/><br/>
Browse all endpoints with full request schemas, response shapes, and live try-it-out in the <a href="https://developers.tappcash.com/reference">API Reference</a>.
</div>

</div>

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
