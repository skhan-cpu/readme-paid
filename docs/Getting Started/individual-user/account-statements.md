---
title: Account Statements
hidden: false
---

Download monthly PDF statements for any account.

## Monthly Statement

`GET /accounts/private/v1/account/{id}/statement/{year}/{month}`

- **Auth**: Individual access token
- Generates and returns a downloadable monthly statement PDF for the specified account and month.

| Parameter | Description |
|-----------|-------------|
| `id` | Account ID from the [Accounts](/docs/individual-accounts) list |
| `year` | Four-digit year, e.g. `2024` |
| `month` | Two-digit month, e.g. `03` |

**Example:**

```
GET /accounts/private/v1/account/1001/statement/2024/03
Authorization: Bearer <access_token>
```

The response is a PDF file stream. Set `Accept: application/pdf` in your request header and handle the binary response accordingly.
