---
title: Transfers
privacy:
  view: public
---

Endpoints for initiating and previewing money transfers. **TBA (To Bank Account)** transfers move funds internally between accounts on the platform. **ACH** transfers move funds to or from external bank accounts linked via the External Accounts flow.

All transfer endpoints are available to Individual and Business Owner users for their own accounts. Admin roles (Advisor, Branch Manager, etc.) can initiate transfers on behalf of their assigned clients and require the `initiate_execute_user_transfers` permission.

## Endpoints

### Preview TBA Transfer
Calculates and returns the projected outcome of a TBA transfer before it is submitted — including any applicable fees and the resulting account balances. Use this before calling **Create TBA Transfer** to show the user a confirmation screen.

### Create TBA Transfer
Executes a TBA transfer between two accounts on the platform. Requires the source account ID, destination account ID, and the transfer amount. It is recommended to call **Preview TBA Transfer** first to confirm the details with the user.

### Preview ACH Transfer
Calculates and returns the projected outcome of an ACH transfer before it is submitted — including fees, estimated settlement time, and the resulting balance. Use this before calling **Create ACH Transfer** to show the user a confirmation screen.

### Create ACH Transfer
Executes an ACH transfer to or from an external bank account. Requires an external account ID (from the External Accounts section), the direction (debit/credit), and the transfer amount. It is recommended to call **Preview ACH Transfer** first to confirm the details with the user.
