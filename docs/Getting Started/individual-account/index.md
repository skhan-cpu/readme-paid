---
title: Individual Account
excerpt: Complete guide for individual users — onboarding, accounts, balances, transfers, notifications, KYC, and account closure.
hidden: false
---

This section covers everything an individual user can do after receiving an account manager's invitation — from completing onboarding through daily banking operations.

---

## What can you do?

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0">

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Onboarding</strong><br/><br/>
Complete the 10-step flow: validate invite token, accept agreements, set password, W9, security questions, phone OTP, KYC, and token exchange. See <a href="./registration">Registration</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Accounts &amp; Balances</strong><br/><br/>
View total balance, list all accounts, and get per-account details including available and pending balances. See <a href="./accounts">Accounts</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Transactions</strong><br/><br/>
Full paginated transaction history with status filtering. See <a href="./transactions">Transactions</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Account Statements</strong><br/><br/>
Download monthly PDF statements for any account by year and month. See <a href="./account-statements">Account Statements</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Move Money</strong><br/><br/>
Internal transfers between the user's own accounts (TBA) and ACH pulls/pushes to linked external bank accounts via Plaid. See <a href="./move-money">Move Money</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Notifications</strong><br/><br/>
Unread count badge, full notification list, mark all as read, and mark individual notifications as read. See <a href="./notifications">Notifications</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>KYC</strong><br/><br/>
Check KYC verification status and respond to document verification requests. See <a href="./kyc">KYC</a>.
</div>

<div style="border:1px solid #e5e7eb;border-radius:8px;padding:20px">
<strong>Account Closure</strong><br/><br/>
Handle the two-step OTP-confirmed account deletion flow. See <a href="./account-closure">Account Closure</a>.
</div>

</div>

---

## Full Onboarding Journey

```mermaid
flowchart TD
    AM0[Account Manager: Sign in]
    AM0 --> AM1[Account Manager: Invite new individual]
    AM1 --> A([User receives invitation email])

    A --> B[User clicks invite link]

    B --> C[Step 1 — Validate token]
    C -->|invalid / expired| ERR1([Show error — ask manager to re-send])
    C -->|valid| D[Step 2 — Fetch platform agreements]

    D --> E[User reads and accepts each agreement]
    E --> F[Step 3 — Accept invitation and set password]

    F -->|HTTP 403 + temporaryAccessToken| G{{Store temporaryAccessToken}}

    G --> H[Step 4 — Review W9 terms]
    H --> I[User acknowledges W9 certification]

    I --> J[Step 5 — List security questions]
    J --> K[Step 6 — Submit security answers]

    K --> L[Step 7 — Send phone OTP]
    L --> M[Step 8 — Verify phone OTP]

    M --> N[Step 9 — Submit KYC information]
    N -->|400 – field errors| ERR2[Show validation errors and let user correct]
    ERR2 --> N

    N -->|200 – KYC pending| O[Step 10 — Exchange for full access token]
    O --> P{{Store accessToken and refreshToken}}
    P --> Q([Onboarding complete — accounts are live])
```
