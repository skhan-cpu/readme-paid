---
title: FAQ
excerpt: Frequently asked questions about integrating with the TAPP Cash API.
hidden: false
---

## Authentication

**How do I get an API key?**

Contact [support@tappcash.com](mailto:support@tappcash.com) with your name, organization, environment (staging or production), and a brief description of your use case. The team will provision your account manager credentials and reply with your login email and a temporary password.

**My access token expired. What do I do?**

Call `POST /users/public/v1/auth/refresh` with your `refreshToken` to get a new `accessToken` without re-login. Access tokens expire after 30 minutes. If your refresh token has also expired (30-day lifetime), the user must sign in again.

**Can I use the same credentials for staging and production?**

No. Credentials are environment-specific. Staging credentials will not work against the production base URL.

---

## Onboarding

**The invitation token I'm trying to validate is returning 400. What happened?**

The invite token has expired or was already used. The account manager must send a new invitation via `POST /branches/private/v1/individual`.

**Step 3 returns HTTP 403 — is that an error?**

No. `POST /branches/public/v1/individual/invites/accept` intentionally returns HTTP `403` on success. The response body contains `data.temporaryAccessToken` alongside an errors array describing remaining required steps. Extract and store the `temporaryAccessToken` — you need it for steps 4–9.

**How do I know which onboarding steps are still required?**

The `meta.fields` array in the step 3 response lists the outstanding steps: `"phoneNumber"` means steps 7–8 (phone OTP) are required, `"kyc"` means step 9 (KYC signup) is required.

---

## Transfers

**What is the difference between TBA and ACH?**

TBA (Transfer Between Accounts) moves funds between two accounts belonging to the same individual user — both accounts are internal to TAPP Cash. ACH moves funds between a TAPP Cash account and an external bank account linked via Plaid or another BaaS provider.

**Why should I always call the preview endpoint before submitting a transfer?**

The preview calculates fees and shows the exact amount the recipient account will receive. Always show this to the user before confirming to avoid surprises.

**Transfers are not completing. How do I track status?**

Transfers are processed asynchronously. Poll `GET /accounts/private/v1/transactions` and filter by status, or listen for notifications of type `TRANSACTION_EXECUTED` to detect when a transfer completes.

---

## KYC

**How long does KYC verification take?**

KYC processing is asynchronous. After step 9, poll `GET /kyc/private/v1/requests/last` to check when the status moves from `pending` to `approved` or `rejected`.

**What does `isRequiredDocVer: true` mean?**

The user needs to complete a document verification step (e.g., upload a government-issued ID). Prompt the user to start this process in your UI.

---

## Account Closure

**Account closure is returning 422. Why?**

The account has blockers preventing closure: a positive balance, pending transactions, or insufficient funds for the closure fee. Resolve those before retrying. The `code` field in the error response will identify the specific blocker.

---

## Support

For issues not covered here, contact [support@tappcash.com](mailto:support@tappcash.com).
