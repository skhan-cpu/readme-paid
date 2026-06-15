---
title: Individual
hidden: false
---

Complete guide for individual users — onboarding, accounts, balances, transfers, notifications, KYC, and account closure.

This section covers everything an Individual user can do after receiving an Advisor's invitation — from completing onboarding through daily banking operations.

---

## What can you do?

<Cards>
  <Card title="Registration" href="./registration" icon="fa-duotone fa-list-check">Complete the 10-step flow: validate invite token, accept agreements, set password, W9, security questions, phone OTP, KYC, and token exchange.</Card>
  <Card title="Accounts & Balances" href="./accounts" icon="fa-duotone fa-wallet">View total balance, list all accounts, and get per-account details including available and pending balances.</Card>
  <Card title="Transactions" href="./transactions" icon="fa-duotone fa-receipt">Full paginated transaction history with status filtering and individual transaction details.</Card>
  <Card title="Account Statements" href="./account-statements" icon="fa-duotone fa-file-invoice">Download monthly PDF statements for any account by year and month.</Card>
  <Card title="Move Money" href="./move-money" icon="fa-duotone fa-money-bill-transfer">Internal transfers between the user's own accounts (TBA) and ACH pulls/pushes to linked external bank accounts via Plaid.</Card>
  <Card title="Notifications" href="./notifications" icon="fa-duotone fa-bell">Unread count badge, full notification list, mark all as read, and mark individual notifications as read.</Card>
  <Card title="KYC" href="./kyc" icon="fa-duotone fa-shield-check">Check KYC verification status and respond to document verification requests.</Card>
  <Card title="Account Closure" href="./account-closure" icon="fa-duotone fa-circle-xmark">Handle the two-step OTP-confirmed account deletion flow.</Card>
</Cards>

---

## Full Onboarding Journey

```mermaid
flowchart TD
    AM0[Advisor: Sign in]
    AM0 --> AM1[Advisor: Invite new individual]
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
