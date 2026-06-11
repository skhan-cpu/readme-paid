---
title: TAPP Cash
excerpt: >-
  TAPP Cash is a modern banking platform that lets you embed financial accounts,
  transfers, and KYC into your product. These docs cover everything your
  engineering team needs to integrate the TAPP Cash API — from inviting a user
  all the way through daily banking operations.
hidden: false
---
## What you can build

- **Onboard individuals** — Invite users via email, guide them through KYC, and issue them live financial accounts automatically
- **Move money** — Internal transfers between accounts (TBA) and ACH pulls/pushes to external bank accounts
- **Show account activity** — Real-time balances, transaction history, and notifications
- **Manage your portfolio** — As an account manager, view and invite all individuals under your branch

## How to use these docs

| Section             | What it covers                                                         |
| ------------------- | ---------------------------------------------------------------------- |
| **Getting Started** | Overview, base URL, and authentication basics                          |
| **Account Manager** | Request credentials, sign in, manage individuals, send invitations     |
| **Individual User** | Full onboarding flow, banking features, transfers, and account closure |
| **Recipes**         | Copy-paste curl commands for every common task                         |
| **API Reference**   | Full endpoint specs — parameters, request bodies, and responses        |

## Base URL

| Environment | URL                                          |
| ----------- | -------------------------------------------- |
| Staging     | `https://api-test.stage2.tappbank.com`       |
| Production  | Contact support for your production base URL |

> All requests must include `Content-Type: application/json`. Authenticated endpoints require `Authorization: Bearer <token>` in the header.

## Where to start

1. Follow the **Account Manager** guide to request your credentials and sign in.
2. Use the **Individual User** guide to invite users and walk them through onboarding.
3. Refer to **Recipes** for ready-to-run curl commands and **API Reference** for full parameter details.

<br />