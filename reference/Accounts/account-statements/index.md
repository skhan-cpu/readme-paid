---
title: Account Statements
privacy:
  view: public
---

Endpoints for accessing and downloading monthly account statements. Both endpoints are shared across Individual and Business Owner user types, with admin roles (Advisor, Branch Manager, etc.) able to access statements for their assigned clients.

## Endpoints

### List Account Statements
Returns the available monthly statement files for the authenticated user's accounts. Use this endpoint to discover which statement periods are available before downloading. The results include statement identifiers needed to call the download endpoint.

### Download Account Statement
Downloads the PDF statement file for a specific statement period. Requires a statement identifier retrieved from **List Account Statements**. Returns the statement as a binary PDF file.
