---
title: Accounts
privacy:
  view: public
---

These endpoints provide access to account data. All endpoints require session authentication via `X-Session-Id` and `X-Client-Id` headers and are shared across Individual and Business Owner user types.

## Endpoints

### List Accounts
Returns a paginated list of accounts accessible to the authenticated user. The accounts returned depend on the user's role — for example, an Individual or Business Owner sees their own accounts, while admin roles (Advisor, Branch Manager, etc.) can see accounts belonging to their assigned clients.

### Get Account
Returns the full details of a single account by its ID, including balance, account number, status, and associated profile information.

### Get Account Bank Details
Returns the banking details for a specific account — including the routing number, account number, and bank name — needed for initiating transfers or sharing deposit instructions.

### Get Total Balance
Returns the aggregated balance across one or more accounts. Accepts an optional list of account IDs to narrow the calculation to a specific set of accounts.

### Get Account Statement
Returns a downloadable monthly statement for a specific account. Requires the account ID and the month/year for the desired statement period.
