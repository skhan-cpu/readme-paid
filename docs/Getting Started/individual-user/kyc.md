---
title: KYC
hidden: false
---

KYC verification is submitted during onboarding (Step 9) and processed asynchronously — use these endpoints to check the current status and respond to any document verification prompts.

---

## Check the latest KYC request

`GET /kyc/private/v1/requests/last`

Returns the user's most recent KYC request.

**Response:**

```json
{
  "data": {
    "id": "kyc_abc123",
    "status": "pending",
    "isRequiredDocVer": false,
    "createdAt": "2024-03-15T14:22:00Z"
  }
}
```

---

## KYC Status Values

| Status | Meaning | What to do |
|--------|---------|------------|
| `pending` | Submitted, under review | Show "verification in progress" message |
| `approved` | Verified | User has full account access |
| `rejected` | Verification failed | Prompt user to contact support |
| `incomplete` | Missing information | Prompt user to complete the required fields |

---

## Document Verification

If `isRequiredDocVer` is `true`, the user must complete a document verification step (e.g., upload a government-issued ID). Prompt the user to start this process through your integration's document verification UI.
