<!-- converted from SHAMEL_LandedCostVoucher_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Landed Cost Voucher |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Landed Cost Voucher) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Landed Cost Voucher List Screen | TC-LCL-001 | Display the Landed Cost Voucher list | Access via Inventory > Landed Cost Voucher | 1. Click Inventory from the side menu
2. Click Landed Cost Voucher | - | A table listing all Landed Cost Vouchers in the system is displayed | High | Positive | Needs Clarification: The SRS names the list table 'Stock Entries' (copy/paste). Assumed to be the Landed Cost Voucher list. |
| 2 | 1. Landed Cost Voucher List Screen | TC-LCL-002 | Add Landed Cost Voucher button is displayed | Access via Inventory > Landed Cost Voucher | Verify that the Add Landed Cost Voucher button is displayed on the list screen | - | The Add Landed Cost Voucher button is visible and clickable | Medium | UI | - |
| 3 | 1. Landed Cost Voucher List Screen | TC-LCL-003 | Navigate to the Add Landed Cost Voucher screen | Access via Inventory > Landed Cost Voucher | Click the Add Landed Cost Voucher button | - | The user is redirected to the Add Landed Cost Voucher screen | High | Positive | - |
| 4 | 1. Landed Cost Voucher List Screen | TC-LCL-004 | Display checkbox column for row selection | Access via Inventory > Landed Cost Voucher | Open the list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Landed Cost Voucher List Screen | TC-LCL-005 | Display Landed Cost Voucher ID column | Access via Inventory > Landed Cost Voucher | Open the list | - | The ID is displayed for each row | Medium | UI | - |
| 6 | 1. Landed Cost Voucher List Screen | TC-LCL-006 | Navigate to Details by clicking the ID | Access via Inventory > Landed Cost Voucher | Click a Landed Cost Voucher ID in the table | LCV-0001 | The user is redirected to the Landed Cost Voucher Details screen of the selected voucher | High | Positive | - |
| 7 | 1. Landed Cost Voucher List Screen | TC-LCL-007 | Display Status column with a valid value | Access via Inventory > Landed Cost Voucher | Open the list and review the Status column | Vouchers in each status | Each row shows exactly one of: Draft, Submitted, Cancelled | High | Positive | - |
| 8 | 1. Landed Cost Voucher List Screen | TC-LCL-008 | Status of a newly saved voucher is Draft | Access via Inventory > Landed Cost Voucher | 1. Add and save a new Landed Cost Voucher
2. Return to the list | - | The new voucher appears in the list with status Draft | High | Positive | - |
| 9 | 1. Landed Cost Voucher List Screen | TC-LCL-009 | Status changes to Submitted after submission | Access via Inventory > Landed Cost Voucher | 1. Submit a Draft voucher
2. Return to the list | LCV-0001 | The status is Submitted | High | Positive | - |
| 10 | 1. Landed Cost Voucher List Screen | TC-LCL-010 | Status changes to Cancelled after cancellation | Access via Inventory > Landed Cost Voucher | 1. Cancel a Submitted voucher
2. Return to the list | LCV-0001 | The status is Cancelled | High | Positive | - |
| 11 | 1. Landed Cost Voucher List Screen | TC-LCL-011 | Display Company column | Access via Inventory > Landed Cost Voucher | Open the list and review the Company column | Ahmed Ebrahim CO. | The company of each voucher is displayed | Medium | UI | - |
| 12 | 1. Landed Cost Voucher List Screen | TC-LCL-012 | List displays only the columns defined in the SRS | Access via Inventory > Landed Cost Voucher | Review the list header | - | The columns are: Checkbox, Landed Cost Voucher ID, Status, Company | Medium | UI | - |
| 13 | 1. Landed Cost Voucher List Screen | TC-LCL-013 | Action bar appears when one row is selected | Access via Inventory > Landed Cost Voucher | Select the checkbox of one voucher | - | An action bar appears showing the available actions | High | Positive | - |
| 14 | 1. Landed Cost Voucher List Screen | TC-LCL-014 | Action bar appears when multiple rows are selected | Access via Inventory > Landed Cost Voucher | Select the checkboxes of three vouchers | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 15 | 1. Landed Cost Voucher List Screen | TC-LCL-015 | Action bar disappears when all rows are deselected | Access via Inventory > Landed Cost Voucher | 1. Select one voucher
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 16 | 1. Landed Cost Voucher List Screen | TC-LCL-016 | Action bar contains the required actions | Access via Inventory > Landed Cost Voucher | Select a voucher and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete (Submit and Cancel are shown only by status) | Medium | UI | - |
| 17 | 1. Landed Cost Voucher List Screen | TC-LCL-017 | Open the Edit popup | Access via Inventory > Landed Cost Voucher | 1. Select a voucher
2. Click Edit | - | A popup is displayed containing the Field dropdown, the Value field and the Update button | High | Positive | - |
| 18 | 1. Landed Cost Voucher List Screen | TC-LCL-018 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Landed Cost Voucher | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the voucher and allows selecting only one option | Medium | Positive | - |
| 19 | 1. Landed Cost Voucher List Screen | TC-LCL-019 | Click Update without selecting a Field | Access via Inventory > Landed Cost Voucher | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because Field is mandatory | Medium | Negative | - |
| 20 | 1. Landed Cost Voucher List Screen | TC-LCL-020 | Value input type changes dynamically based on the selected Field | Access via Inventory > Landed Cost Voucher | 1. Open the Edit popup
2. Select Field = Company and note the Value input type
3. Select Field = Posting Date and note the Value input type | Company, Posting Date | The Value field changes its input type (searchable dropdown for Company, date picker for Posting Date) | High | Positive | - |
| 21 | 1. Landed Cost Voucher List Screen | TC-LCL-021 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Landed Cost Voucher | 1. Open the Edit popup
2. Select Field = Company
3. Leave Value empty and click Update | Field: Company | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 22 | 1. Landed Cost Voucher List Screen | TC-LCL-022 | Update a Draft voucher successfully | Access via Inventory > Landed Cost Voucher | 1. Select a Draft voucher
2. Click Edit
3. Select Field = Distribute Charges Based On
4. Select Amount
5. Click Update | Value: Amount | The voucher is updated successfully | High | Positive | Needs Clarification: SRS defines only the error case of Update (Submitted / Cancelled). The Draft success case is assumed. |
| 23 | 1. Landed Cost Voucher List Screen | TC-LCL-023 | Update a Submitted voucher | Access via Inventory > Landed Cost Voucher | 1. Select a Submitted voucher
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Submitted | An error message is displayed informing the user that the voucher cannot be modified | High | Negative | - |
| 24 | 1. Landed Cost Voucher List Screen | TC-LCL-024 | Update a Cancelled voucher | Access via Inventory > Landed Cost Voucher | 1. Select a Cancelled voucher
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Cancelled | An error message is displayed informing the user that the voucher cannot be modified | High | Negative | - |
| 25 | 1. Landed Cost Voucher List Screen | TC-LCL-025 | Edit with multiple vouchers selected | Access via Inventory > Landed Cost Voucher | 1. Select two Draft vouchers
2. Click Edit
3. Select a Field and a Value
4. Click Update | Two Draft vouchers | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection. |
| 26 | 1. Landed Cost Voucher List Screen | TC-LCL-026 | Submit action is displayed for a Draft voucher | Access via Inventory > Landed Cost Voucher | Select a Draft voucher and review the action bar | Status: Draft | The Submit action is displayed | High | Positive | - |
| 27 | 1. Landed Cost Voucher List Screen | TC-LCL-027 | Submit action is hidden for Submitted and Cancelled vouchers | Access via Inventory > Landed Cost Voucher | Select a Submitted and a Cancelled voucher and review the action bar | 2 vouchers | The Submit action is not displayed | Medium | Negative | - |
| 28 | 1. Landed Cost Voucher List Screen | TC-LCL-028 | Submit a complete Draft voucher from the list | Access via Inventory > Landed Cost Voucher | 1. Select a complete Draft voucher
2. Click Submit | Balanced voucher | The voucher is submitted successfully and its status changes to Submitted | High | Positive | - |
| 29 | 1. Landed Cost Voucher List Screen | TC-LCL-029 | Submit a Draft voucher whose charges are not balanced | Access via Inventory > Landed Cost Voucher | 1. Select a Draft voucher whose total applicable charges differ from the total landed cost
2. Click Submit | Charges 90; Landed cost 100 | An error message is displayed and the voucher stays Draft | High | Negative | - |
| 30 | 1. Landed Cost Voucher List Screen | TC-LCL-030 | Submit a Draft voucher with incomplete data | Access via Inventory > Landed Cost Voucher | 1. Select a Draft voucher with a missing mandatory value
2. Click Submit | Draft without Description | The voucher is not submitted and a validation error is displayed | High | Negative | Needs Clarification: SRS describes only the success case of Submit in the list. |
| 31 | 1. Landed Cost Voucher List Screen | TC-LCL-031 | Submit multiple Draft vouchers at once | Access via Inventory > Landed Cost Voucher | 1. Select two complete Draft vouchers
2. Click Submit | Two Draft vouchers | To be confirmed with the BA (bulk submit behavior) | Low | Positive | Needs Clarification: SRS does not define bulk submit. |
| 32 | 1. Landed Cost Voucher List Screen | TC-LCL-032 | Cancel action is displayed for a Submitted voucher | Access via Inventory > Landed Cost Voucher | Select a Submitted voucher and review the action bar | Status: Submitted | The Cancel action is displayed | High | Positive | - |
| 33 | 1. Landed Cost Voucher List Screen | TC-LCL-033 | Cancel action is hidden for Draft and Cancelled vouchers | Access via Inventory > Landed Cost Voucher | Select a Draft and a Cancelled voucher and review the action bar | 2 vouchers | The Cancel action is not displayed | Medium | Negative | - |
| 34 | 1. Landed Cost Voucher List Screen | TC-LCL-034 | Cancel a Submitted voucher | Access via Inventory > Landed Cost Voucher | 1. Select a Submitted voucher
2. Click Cancel | Status: Submitted | The voucher is cancelled successfully, its status changes to Cancelled and the Cancel button changes to Amend | High | Positive | Needs Clarification: SRS spells the status 'Cancelled' in the list and 'Canceled' in the Cancel action. |
| 35 | 1. Landed Cost Voucher List Screen | TC-LCL-035 | Cancel reverses the valuation change | Access via Inventory > Landed Cost Voucher | 1. Note the item valuation rate
2. Cancel a submitted voucher
3. Check the valuation rate | Rate 55 > 50 | The valuation rate of the affected items returns to the value before the voucher | High | Positive | Needs Clarification: SRS does not describe the effect of Cancel on valuation. |
| 36 | 1. Landed Cost Voucher List Screen | TC-LCL-036 | Cancel does not show a confirmation message | Access via Inventory > Landed Cost Voucher | 1. Select a Submitted voucher
2. Click Cancel | - | The voucher is cancelled directly (no confirmation is described) | Low | Positive | Needs Clarification: No confirmation message is described for Cancel. |
| 37 | 1. Landed Cost Voucher List Screen | TC-LCL-037 | Amend button after cancellation | Access via Inventory > Landed Cost Voucher | 1. Cancel a voucher
2. Review the action bar | - | The Amend button is displayed | High | Positive | - |
| 38 | 1. Landed Cost Voucher List Screen | TC-LCL-038 | Amend a Cancelled voucher | Access via Inventory > Landed Cost Voucher | 1. Select a Cancelled voucher
2. Click Amend | Status: Cancelled | A new Draft voucher is created with Amended From pointing to the cancelled one | High | Positive | Needs Clarification: SRS defines when Amend appears but not what happens after clicking it. |
| 39 | 1. Landed Cost Voucher List Screen | TC-LCL-039 | Delete: available statuses | Access via Inventory > Landed Cost Voucher | Select vouchers in every status and review the action bar | Draft, Submitted, Cancelled | To be confirmed with the BA (which statuses show Delete) | High | Positive | Needs Clarification: SRS does not restrict Delete by status, unlike the Delivery Note and Purchase Receipt. |
| 40 | 1. Landed Cost Voucher List Screen | TC-LCL-040 | Confirmation message is displayed when clicking Delete | Access via Inventory > Landed Cost Voucher | 1. Select a Draft voucher
2. Click Delete | Status: Draft | A confirmation message asks the user whether they want to delete this Landed Cost Voucher | High | Positive | - |
| 41 | 1. Landed Cost Voucher List Screen | TC-LCL-041 | Cancel the delete confirmation | Access via Inventory > Landed Cost Voucher | 1. Select a Draft voucher
2. Click Delete
3. Click No (or close the message) | - | The voucher is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 42 | 1. Landed Cost Voucher List Screen | TC-LCL-042 | Delete a Draft voucher that has no links | Access via Inventory > Landed Cost Voucher | 1. Select an unlinked Draft voucher
2. Click Delete
3. Click Yes | Unlinked Draft voucher | The voucher is deleted successfully and removed from the list | High | Positive | - |
| 43 | 1. Landed Cost Voucher List Screen | TC-LCL-043 | Delete a Submitted voucher | Access via Inventory > Landed Cost Voucher | 1. Select a Submitted voucher
2. Click Delete
3. Click Yes | Status: Submitted | The voucher is not deleted because it must be cancelled first | High | Negative | Needs Clarification: Not defined in the SRS (standard behavior assumed). |
| 44 | 1. Landed Cost Voucher List Screen | TC-LCL-044 | Delete a voucher that was amended from another voucher | Access via Inventory > Landed Cost Voucher | 1. Select a voucher that has Amended From populated
2. Click Delete
3. Click Yes | Amended voucher | A warning message is displayed: the voucher cannot be deleted until all related doctypes are deleted. The voucher is not deleted | High | Negative | - |
| 45 | 1. Landed Cost Voucher List Screen | TC-LCL-045 | Delete a voucher linked to other transactions | Access via Inventory > Landed Cost Voucher | 1. Select a Cancelled voucher linked to other transactions
2. Click Delete
3. Click Yes | Linked voucher | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks. The voucher is not deleted | High | Negative | - |
| 46 | 1. Landed Cost Voucher List Screen | TC-LCL-046 | Linked doctypes in the delete messages are hyperlinks | Access via Inventory > Landed Cost Voucher | 1. Trigger the delete message for a linked voucher
2. Click a linked doctype | Linked voucher | The user is redirected to the corresponding doctype | Medium | Positive | - |
| 47 | 1. Landed Cost Voucher List Screen | TC-LCL-047 | Delete multiple vouchers at once | Access via Inventory > Landed Cost Voucher | 1. Select two Draft vouchers
2. Click Delete
3. Click Yes | Two Draft vouchers | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define bulk delete. |
| 48 | 1. Landed Cost Voucher List Screen | TC-LCL-048 | Export selected vouchers | Access via Inventory > Landed Cost Voucher | 1. Select one or more vouchers
2. Click Export | - | The selected vouchers are exported | Medium | Positive | Needs Clarification: SRS lists Export without details. |
| 49 | 1. Landed Cost Voucher List Screen | TC-LCL-049 | Assign selected vouchers to a user | Access via Inventory > Landed Cost Voucher | 1. Select a voucher
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The voucher is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 50 | 1. Landed Cost Voucher List Screen | TC-LCL-050 | Clear assignment of a voucher | Access via Inventory > Landed Cost Voucher | 1. Select an assigned voucher
2. Click Clear assignment | Assigned voucher | The assignment is cleared | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 51 | 1. Landed Cost Voucher List Screen | TC-LCL-051 | Add tags to a voucher | Access via Inventory > Landed Cost Voucher | 1. Select a voucher
2. Click Add tags
3. Enter a tag and confirm | Tag: Freight | The tag is added to the voucher | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 52 | 1. Landed Cost Voucher List Screen | TC-LCL-052 | Print selected vouchers | Access via Inventory > Landed Cost Voucher | 1. Select a voucher
2. Click Print | - | The print view of the voucher is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 53 | 1. Landed Cost Voucher List Screen | TC-LCL-053 | List when there are no vouchers | Access via Inventory > Landed Cost Voucher | Open the list in a system with no vouchers | No vouchers | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. |
| 54 | 1. Landed Cost Voucher List Screen | TC-LCL-054 | User without permission cannot access Landed Cost Voucher | Access via Inventory > Landed Cost Voucher | 1. Log in with a user that has no permission for Landed Cost Voucher
2. Open the sidebar | Restricted user | The menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 55 | 2. Add Landed Cost Voucher Screen | TC-LCA-001 | Open the Add Landed Cost Voucher screen | Logged in with a user that has Landed Cost Voucher access | 1. Click Inventory from the side menu
2. Click Landed Cost Voucher
3. Click Add Landed Cost Voucher | - | The Add Landed Cost Voucher screen is displayed with an empty form | High | Positive | - |
| 56 | 2. Add Landed Cost Voucher Screen | TC-LCA-002 | Series dropdown lists the series of the Landed Cost Voucher doctype | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open the Series dropdown | - | All series added to the Landed Cost Voucher doctype are listed | High | Positive | - |
| 57 | 2. Add Landed Cost Voucher Screen | TC-LCA-003 | Select a Series | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select a Series | MAT-LCV-.YYYY.- | The value is accepted | High | Positive | - |
| 58 | 2. Add Landed Cost Voucher Screen | TC-LCA-004 | Leave Series empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Leave Series empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Series is mandatory | High | Negative | - |
| 59 | 2. Add Landed Cost Voucher Screen | TC-LCA-005 | Company is a searchable dropdown | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Company and type part of a company name | Ahmed | The list is filtered while typing | High | Positive | - |
| 60 | 2. Add Landed Cost Voucher Screen | TC-LCA-006 | Select a Company | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Search for and select a Company | Ahmed Ebrahim CO. | The value is accepted | High | Positive | - |
| 61 | 2. Add Landed Cost Voucher Screen | TC-LCA-007 | Leave Company empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Leave Company empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Company is mandatory | High | Negative | - |
| 62 | 2. Add Landed Cost Voucher Screen | TC-LCA-008 | Company search with no matching result | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Type a non-existing name in Company | ZZZ Unknown | No results are displayed | Low | Negative | - |
| 63 | 2. Add Landed Cost Voucher Screen | TC-LCA-009 | Company filters the receipt documents | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Company A
2. Open Receipt Document | Company A / B documents | Only receipt documents of the selected company are listed | High | Positive | Needs Clarification: SRS does not say whether the receipt documents are filtered by company. |
| 64 | 2. Add Landed Cost Voucher Screen | TC-LCA-010 | Posting Date default value is the current date | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open the Add screen | - | Posting Date shows the current date | High | Positive | - |
| 65 | 2. Add Landed Cost Voucher Screen | TC-LCA-011 | Select a Posting Date using the calendar | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select a date | 2026-11-01 | The selected date is accepted | High | Positive | - |
| 66 | 2. Add Landed Cost Voucher Screen | TC-LCA-012 | Leave Posting Date empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Clear Posting Date
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Posting Date is mandatory | High | Negative | - |
| 67 | 2. Add Landed Cost Voucher Screen | TC-LCA-013 | Posting Date earlier than the receipt document date | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select a date before the Purchase Receipt date
2. Click Save | Voucher 2026-09-01; receipt 2026-10-01 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define date validation. |
| 68 | 2. Add Landed Cost Voucher Screen | TC-LCA-014 | Posting Date in a closed period | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select a date in a closed period
2. Click Save | Closed period date | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 69 | 2. Add Landed Cost Voucher Screen | TC-LCA-015 | Amended From is hidden on a new voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review the form of a new voucher | - | The Amended From field is not displayed | Medium | UI | - |
| 70 | 2. Add Landed Cost Voucher Screen | TC-LCA-016 | Vouchers table displays the default columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review the Vouchers table | - | The table shows: Checkbox, No., Receipt Document Type, Receipt Document, Supplier, Grand Total | Medium | UI | - |
| 71 | 2. Add Landed Cost Voucher Screen | TC-LCA-017 | Add Row adds a new voucher row | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Add Row in the Vouchers table | - | A new empty row is added to the table | High | Positive | - |
| 72 | 2. Add Landed Cost Voucher Screen | TC-LCA-018 | Voucher rows are numbered in order | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 73 | 2. Add Landed Cost Voucher Screen | TC-LCA-019 | Receipt Document Type dropdown lists the allowed values | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open the Receipt Document Type dropdown | - | The dropdown contains: Purchase Invoice, Purchase Receipt, Stock Entry (and an empty option) | High | Positive | Needs Clarification: SRS lists 'Empty' as a value and also marks the field as mandatory. |
| 74 | 2. Add Landed Cost Voucher Screen | TC-LCA-020 | Select Receipt Document Type = Purchase Receipt | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select Purchase Receipt | Purchase Receipt | The value is accepted and Receipt Document lists Purchase Receipts | High | Positive | - |
| 75 | 2. Add Landed Cost Voucher Screen | TC-LCA-021 | Select Receipt Document Type = Purchase Invoice | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select Purchase Invoice | Purchase Invoice | The value is accepted and Receipt Document lists Purchase Invoices | High | Positive | - |
| 76 | 2. Add Landed Cost Voucher Screen | TC-LCA-022 | Select Receipt Document Type = Stock Entry | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select Stock Entry | Stock Entry | The value is accepted and Receipt Document lists Stock Entries | High | Positive | - |
| 77 | 2. Add Landed Cost Voucher Screen | TC-LCA-023 | Leave Receipt Document Type empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add a row
2. Leave Receipt Document Type empty
3. Click Save | - | An error message is displayed because Receipt Document Type is mandatory | High | Negative | - |
| 78 | 2. Add Landed Cost Voucher Screen | TC-LCA-024 | Receipt Document Type accepts a single selection only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select one type and then another | Purchase Receipt, Stock Entry | Only one value is selected; the second replaces the first | Low | Positive | - |
| 79 | 2. Add Landed Cost Voucher Screen | TC-LCA-025 | Changing the Receipt Document Type clears the Receipt Document | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Purchase Receipt and a document
2. Change the type to Stock Entry | PR > Stock Entry | The Receipt Document, Supplier and Grand Total are cleared | High | Negative | Needs Clarification: Not defined in the SRS. |
| 80 | 2. Add Landed Cost Voucher Screen | TC-LCA-026 | Receipt Document is a searchable dropdown | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select a Receipt Document Type
2. Click Receipt Document and type part of a name | MAT-PRE | The list is filtered while typing | High | Positive | - |
| 81 | 2. Add Landed Cost Voucher Screen | TC-LCA-027 | Receipt Document lists only Submitted Purchase Receipts | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Purchase Receipt
2. Open Receipt Document | PR-0001 (Submitted); PR-0002 (Draft); PR-0003 (Cancelled) | Only PR-0001 is listed | High | Positive | - |
| 82 | 2. Add Landed Cost Voucher Screen | TC-LCA-028 | Receipt Document lists only Submitted Purchase Invoices with Update Stock | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Purchase Invoice
2. Open Receipt Document | PINV-0001 (Update Stock = 1); PINV-0002 (Update Stock = 0); PINV-0003 (Draft) | Only PINV-0001 is listed | High | Positive | - |
| 83 | 2. Add Landed Cost Voucher Screen | TC-LCA-029 | Receipt Document lists only Submitted Repack Stock Entries | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Stock Entry
2. Open Receipt Document | STE-0001 (Repack, Submitted); STE-0002 (Receipt, Submitted); STE-0003 (Repack, Draft) | Only STE-0001 is listed | High | Positive | - |
| 84 | 2. Add Landed Cost Voucher Screen | TC-LCA-030 | Receipt Document before selecting a type | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Receipt Document without selecting a type | - | No documents are listed (or the user is asked to select a type first) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 85 | 2. Add Landed Cost Voucher Screen | TC-LCA-031 | Select a Receipt Document | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Search for and select a Receipt Document | MAT-PRE-2026-00001 | The value is accepted and Supplier and Grand Total are filled | High | Positive | - |
| 86 | 2. Add Landed Cost Voucher Screen | TC-LCA-032 | Leave Receipt Document empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add a row with a type
2. Leave Receipt Document empty
3. Click Save | - | An error message is displayed because Receipt Document is mandatory | High | Negative | - |
| 87 | 2. Add Landed Cost Voucher Screen | TC-LCA-033 | Receipt Document search with no matching result | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Type a non-existing document name | ZZZ-9999 | No results are displayed | Low | Negative | - |
| 88 | 2. Add Landed Cost Voucher Screen | TC-LCA-034 | Supplier is filled automatically from the Receipt Document | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select a Receipt Document | Supplier: Delta Supplies | Supplier shows the supplier of the document and is read-only | High | Positive | - |
| 89 | 2. Add Landed Cost Voucher Screen | TC-LCA-035 | Supplier is empty for a Stock Entry (Repack) | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select a Repack Stock Entry | STE-0001 | Supplier is empty without errors | Medium | Positive | Needs Clarification: A Stock Entry has no supplier. |
| 90 | 2. Add Landed Cost Voucher Screen | TC-LCA-036 | Grand Total is filled automatically from the Receipt Document | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select a Receipt Document | Grand Total: 1,140.00 | Grand Total shows the total amount of the document and is read-only | High | Positive | - |
| 91 | 2. Add Landed Cost Voucher Screen | TC-LCA-037 | Same Receipt Document in two rows | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add two rows with the same Receipt Document
2. Click Save | PR-0001 (x2) | To be confirmed with the BA (blocked, warned or allowed) | High | Negative | Needs Clarification: SRS does not define duplicates. |
| 92 | 2. Add Landed Cost Voucher Screen | TC-LCA-038 | Receipt Document already used in another submitted voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Submit a voucher for PR-0001
2. Create another voucher for the same document | PR-0001 | To be confirmed with the BA (allowed to add more costs or blocked) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 93 | 2. Add Landed Cost Voucher Screen | TC-LCA-039 | Several receipt documents of different types in one voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add a Purchase Receipt row and a Purchase Invoice row | PR + PINV | Both rows are accepted | Medium | Positive | - |
| 94 | 2. Add Landed Cost Voucher Screen | TC-LCA-040 | Action bar appears when a voucher row is selected | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select the checkbox of a voucher row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 95 | 2. Add Landed Cost Voucher Screen | TC-LCA-041 | Delete a single voucher row | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select one row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 96 | 2. Add Landed Cost Voucher Screen | TC-LCA-042 | Delete multiple voucher rows | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select two rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 97 | 2. Add Landed Cost Voucher Screen | TC-LCA-043 | Deleting a voucher row removes its items from Receipt Items | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Fetch the items of two receipt documents
2. Delete one voucher row | PR-0001, PR-0002 | To be confirmed with the BA (its items are removed or kept) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 98 | 2. Add Landed Cost Voucher Screen | TC-LCA-044 | Vouchers: open the Edit Row popup | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click the Edit Row icon of a voucher row | - | A popup is displayed with Receipt Document Type, Receipt Document, Supplier, Posting Date and Grand Total | High | Positive | - |
| 99 | 2. Add Landed Cost Voucher Screen | TC-LCA-045 | Vouchers Edit Row: Receipt Document Type is mandatory | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row
2. Clear Receipt Document Type
3. Click Update | - | An error message is displayed because it is mandatory | Medium | Negative | - |
| 100 | 2. Add Landed Cost Voucher Screen | TC-LCA-046 | Vouchers Edit Row: Receipt Document is mandatory | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row
2. Clear Receipt Document
3. Click Update | - | An error message is displayed because it is mandatory | Medium | Negative | - |
| 101 | 2. Add Landed Cost Voucher Screen | TC-LCA-047 | Vouchers Edit Row: Supplier, Posting Date and Grand Total are read-only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Edit Row and try to edit the three labels | - | None of them can be edited | Medium | UI | - |
| 102 | 2. Add Landed Cost Voucher Screen | TC-LCA-048 | Vouchers Edit Row: Posting Date is fetched from the Receipt Document | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Edit Row of a row | Receipt date: 2026-10-01 | Posting Date shows the date of the receipt document (not the voucher date) | Medium | Positive | Needs Clarification: SRS describes it as 'the Landed Cost Voucher date, fetched from the Receipt document'. |
| 103 | 2. Add Landed Cost Voucher Screen | TC-LCA-049 | Vouchers Edit Row: save changes with Update | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row
2. Change the Receipt Document
3. Click Update | PR-0001 > PR-0002 | The popup closes and the row shows the new document | High | Positive | - |
| 104 | 2. Add Landed Cost Voucher Screen | TC-LCA-050 | Vouchers: Open the table Settings popup | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Setting on the Vouchers table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 105 | 2. Add Landed Cost Voucher Screen | TC-LCA-051 | Vouchers: Reorder columns using drag and drop | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Drag the Receipt Document column header and drop it before Receipt Document Type | - | The column order changes to the new position | Medium | Positive | - |
| 106 | 2. Add Landed Cost Voucher Screen | TC-LCA-052 | Vouchers: Column width default value is 3 | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 107 | 2. Add Landed Cost Voucher Screen | TC-LCA-053 | Vouchers: Column width accepts numbers only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 108 | 2. Add Landed Cost Voucher Screen | TC-LCA-054 | Vouchers: Column width left empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 109 | 2. Add Landed Cost Voucher Screen | TC-LCA-055 | Vouchers: Column width with 1 character | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 110 | 2. Add Landed Cost Voucher Screen | TC-LCA-056 | Vouchers: Column width longer than 3 characters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 111 | 2. Add Landed Cost Voucher Screen | TC-LCA-057 | Vouchers: Add / Remove Columns popup lists all columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Receipt Document Type, Receipt Document, Supplier, Grand Total, Posting Date) | Medium | UI | - |
| 112 | 2. Add Landed Cost Voucher Screen | TC-LCA-058 | Vouchers: Hide a column | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Add / Remove columns
2. Clear the Supplier checkbox
3. Click Update | Column: Supplier | The Supplier column is hidden from the table | Medium | Positive | - |
| 113 | 2. Add Landed Cost Voucher Screen | TC-LCA-059 | Vouchers: Show a hidden column | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Hide the Supplier column
2. Open Add / Remove columns
3. Select the Supplier checkbox
4. Click Update | Column: Supplier | The Supplier column is displayed again | Medium | Positive | - |
| 114 | 2. Add Landed Cost Voucher Screen | TC-LCA-060 | Vouchers: Save the Settings using Update | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 115 | 2. Add Landed Cost Voucher Screen | TC-LCA-061 | Vouchers: Reset Settings to default | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 116 | 2. Add Landed Cost Voucher Screen | TC-LCA-062 | Get Items fetches the items of the receipt documents | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select a Receipt Document
2. Click Get Items | PR-0001: Coffee Mug x6, Chocolate Bar x4 | The items of the document are populated in the Receipt Items table | High | Positive | Needs Clarification: SRS describes the button as 'when checked'. Assumed to be clicked. |
| 117 | 2. Add Landed Cost Voucher Screen | TC-LCA-063 | Get Items with several receipt documents | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add two documents
2. Click Get Items | PR-0001, PR-0002 | The items of both documents are populated | High | Positive | - |
| 118 | 2. Add Landed Cost Voucher Screen | TC-LCA-064 | Get Items without a Receipt Document | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Leave the Vouchers table empty
2. Click Get Items | - | A message asks the user to select a receipt document; nothing is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 119 | 2. Add Landed Cost Voucher Screen | TC-LCA-065 | Get Items twice | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Click Get Items
2. Click Get Items again | PR-0001 | To be confirmed with the BA (items refreshed or duplicated) | High | Negative | Needs Clarification: Not defined in the SRS. |
| 120 | 2. Add Landed Cost Voucher Screen | TC-LCA-066 | Get Items after changing the vouchers | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Click Get Items
2. Add another voucher
3. Click Get Items | PR-0001 + PR-0002 | The table contains the items of both documents | Medium | Positive | - |
| 121 | 2. Add Landed Cost Voucher Screen | TC-LCA-067 | Receipt Items table displays the default columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review the Receipt Items table | - | The table shows: Checkbox, No., Item Code, Description, Qty, Amount, Applicable Charges | Medium | UI | - |
| 122 | 2. Add Landed Cost Voucher Screen | TC-LCA-068 | Item Code is a read-only label fetched from the document | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Get Items and review Item Code | Coffee Mug | Item Code is displayed and cannot be edited | High | UI | - |
| 123 | 2. Add Landed Cost Voucher Screen | TC-LCA-069 | Description is a read-only label | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review Description | Item description | Description shows the item description and cannot be edited | Medium | UI | - |
| 124 | 2. Add Landed Cost Voucher Screen | TC-LCA-070 | Qty is a read-only label | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review Qty | 6 | Qty shows the item quantity and cannot be edited | Medium | UI | - |
| 125 | 2. Add Landed Cost Voucher Screen | TC-LCA-071 | Amount is a read-only label | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review Amount | 300 | Amount shows the total amount of the item and cannot be edited | Medium | UI | - |
| 126 | 2. Add Landed Cost Voucher Screen | TC-LCA-072 | Applicable Charges is read-only when distributing by Qty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Distribute Charges Based On = Qty
2. Try to edit Applicable Charges | Qty | Applicable Charges is not editable | High | Negative | - |
| 127 | 2. Add Landed Cost Voucher Screen | TC-LCA-073 | Applicable Charges is read-only when distributing by Amount | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Distribute Charges Based On = Amount
2. Try to edit Applicable Charges | Amount | Applicable Charges is not editable | High | Negative | - |
| 128 | 2. Add Landed Cost Voucher Screen | TC-LCA-074 | Applicable Charges is editable when Distribute Manually | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Distribute Charges Based On = Distribute Manually
2. Edit Applicable Charges | Distribute Manually | Applicable Charges becomes editable | High | Positive | - |
| 129 | 2. Add Landed Cost Voucher Screen | TC-LCA-075 | Add Row is not available in Receipt Items | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review the Receipt Items table | - | To be confirmed with the BA (items come only from Get Items) | Low | UI | Needs Clarification: SRS defines no Add Row for this table. |
| 130 | 2. Add Landed Cost Voucher Screen | TC-LCA-076 | Action bar appears when an item row is selected | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select the checkbox of an item row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 131 | 2. Add Landed Cost Voucher Screen | TC-LCA-077 | Delete a single item row | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select one row
2. Click Delete row | - | The row is deleted and the distribution is recalculated | High | Positive | - |
| 132 | 2. Add Landed Cost Voucher Screen | TC-LCA-078 | Delete multiple item rows | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select two rows
2. Click Delete row | - | Both rows are deleted and the distribution is recalculated | Medium | Positive | - |
| 133 | 2. Add Landed Cost Voucher Screen | TC-LCA-079 | Fixed asset items in the Receipt Items | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Fetch the items of a document that contains a fixed asset item | Asset item | To be confirmed with the BA (fixed assets are included or excluded from the distribution) | Medium | Positive | Needs Clarification: SRS shows an 'Is Fixed Asset' checkbox but does not explain its effect. |
| 134 | 2. Add Landed Cost Voucher Screen | TC-LCA-080 | Receipt Items: open the Edit Row popup | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click the Edit Row icon of an item row | - | A popup is displayed with the row fields | High | Positive | - |
| 135 | 2. Add Landed Cost Voucher Screen | TC-LCA-081 | Receipt Items Edit Row: displayed fields | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Edit Row and review the fields | - | The popup shows: Item Code, Description, Receipt Document Type, Receipt Document, Qty, Rate, Amount, Is Fixed Asset, Applicable Charges, Purchase Receipt Item, Cost Center | Medium | UI | - |
| 136 | 2. Add Landed Cost Voucher Screen | TC-LCA-082 | Receipt Items Edit Row: read-only labels | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to edit Item Code, Description, Receipt Document Type, Receipt Document, Qty, Rate and Amount | - | None of them can be edited | Medium | UI | - |
| 137 | 2. Add Landed Cost Voucher Screen | TC-LCA-083 | Receipt Items Edit Row: Receipt Document is clickable | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Click Receipt Document in Edit Row | MAT-PRE-2026-00001 | The user is redirected to the receipt document | Medium | Positive | - |
| 138 | 2. Add Landed Cost Voucher Screen | TC-LCA-084 | Receipt Items Edit Row: Is Fixed Asset is a read-only checkbox | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Edit Row of a fixed asset item | - | The checkbox is checked and cannot be edited | Low | UI | - |
| 139 | 2. Add Landed Cost Voucher Screen | TC-LCA-085 | Receipt Items Edit Row: Applicable Charges follows the distribution mode | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row with Distribute Manually / Qty | - | Applicable Charges is editable only for Distribute Manually | Medium | Positive | - |
| 140 | 2. Add Landed Cost Voucher Screen | TC-LCA-086 | Receipt Items Edit Row: Purchase Receipt Item is displayed | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Edit Row of an item from a Purchase Receipt | - | The matching item row of the Purchase Receipt is displayed | Low | Positive | - |
| 141 | 2. Add Landed Cost Voucher Screen | TC-LCA-087 | Receipt Items Edit Row: Cost Center is a searchable dropdown | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Edit Row and type part of a cost center name | Main | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 142 | 2. Add Landed Cost Voucher Screen | TC-LCA-088 | Receipt Items Edit Row: save changes with Update | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row
2. Change Cost Center
3. Click Update | Main - STC | The popup closes and the change is saved | High | Positive | - |
| 143 | 2. Add Landed Cost Voucher Screen | TC-LCA-089 | Receipt Items: Open the table Settings popup | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Setting on the Receipt Items table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 144 | 2. Add Landed Cost Voucher Screen | TC-LCA-090 | Receipt Items: Reorder columns using drag and drop | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Drag the Description column header and drop it before Item Code | - | The column order changes to the new position | Medium | Positive | - |
| 145 | 2. Add Landed Cost Voucher Screen | TC-LCA-091 | Receipt Items: Column width default value is 3 | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 146 | 2. Add Landed Cost Voucher Screen | TC-LCA-092 | Receipt Items: Column width accepts numbers only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 147 | 2. Add Landed Cost Voucher Screen | TC-LCA-093 | Receipt Items: Column width left empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 148 | 2. Add Landed Cost Voucher Screen | TC-LCA-094 | Receipt Items: Column width with 1 character | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 149 | 2. Add Landed Cost Voucher Screen | TC-LCA-095 | Receipt Items: Column width longer than 3 characters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 150 | 2. Add Landed Cost Voucher Screen | TC-LCA-096 | Receipt Items: Add / Remove Columns popup lists all columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Item Code, Description, Qty, Amount, Applicable Charges, Receipt Document Type) | Medium | UI | Needs Clarification: SRS lists 10 optional columns (e.g., Rate, Stock Entry Item, Cost Center). Confirm the defaults. |
| 151 | 2. Add Landed Cost Voucher Screen | TC-LCA-097 | Receipt Items: Hide a column | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Add / Remove columns
2. Clear the Description checkbox
3. Click Update | Column: Description | The Description column is hidden from the table | Medium | Positive | - |
| 152 | 2. Add Landed Cost Voucher Screen | TC-LCA-098 | Receipt Items: Show a hidden column | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Hide the Description column
2. Open Add / Remove columns
3. Select the Description checkbox
4. Click Update | Column: Description | The Description column is displayed again | Medium | Positive | - |
| 153 | 2. Add Landed Cost Voucher Screen | TC-LCA-099 | Receipt Items: Save the Settings using Update | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 154 | 2. Add Landed Cost Voucher Screen | TC-LCA-100 | Receipt Items: Reset Settings to default | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 155 | 2. Add Landed Cost Voucher Screen | TC-LCA-101 | Vendor Invoices table displays the default columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review the Vendor Invoices table | - | The table shows: Checkbox, No., Vendor Invoice, Amount | Medium | UI | - |
| 156 | 2. Add Landed Cost Voucher Screen | TC-LCA-102 | Add Row adds a new vendor invoice row | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Add Row in the Vendor Invoices table | - | A new empty row is added | High | Positive | - |
| 157 | 2. Add Landed Cost Voucher Screen | TC-LCA-103 | Vendor Invoice is a searchable dropdown | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Vendor Invoice and type part of an invoice name | PINV | The list is filtered while typing | High | Positive | - |
| 158 | 2. Add Landed Cost Voucher Screen | TC-LCA-104 | Vendor Invoice lists only submitted, paid invoices of non-stock items | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open the Vendor Invoice dropdown | PINV-0005 (Submitted, non-stock, Outstanding 0); PINV-0006 (stock item); PINV-0007 (Outstanding 100) | Only PINV-0005 is listed | High | Positive | Needs Clarification: SRS says the invoice must have Outstanding Amount = 0 (paid) and non-stock items. |
| 159 | 2. Add Landed Cost Voucher Screen | TC-LCA-105 | Select a Vendor Invoice | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select an invoice | PINV-0005 (freight 500) | The value is accepted and Amount is filled | High | Positive | - |
| 160 | 2. Add Landed Cost Voucher Screen | TC-LCA-106 | Leave Vendor Invoice empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add a row
2. Leave Vendor Invoice empty
3. Click Save | - | The voucher is saved (field is optional) | Medium | Positive | Needs Clarification: An empty invoice row has no use; confirm whether it is accepted. |
| 161 | 2. Add Landed Cost Voucher Screen | TC-LCA-107 | Vendor Invoice Amount is a read-only label | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select an invoice and try to edit Amount | 500 | Amount shows the total of the invoice and cannot be edited | High | UI | - |
| 162 | 2. Add Landed Cost Voucher Screen | TC-LCA-108 | Vendor Invoice Amount is added to the landed cost | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select an invoice of 500 | 500 | Total Vendor Invoices Cost shows 500 and Total Landed Cost includes it | High | Positive | - |
| 163 | 2. Add Landed Cost Voucher Screen | TC-LCA-109 | Same Vendor Invoice in two rows | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add two rows with the same invoice
2. Click Save | PINV-0005 (x2) | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define duplicates. |
| 164 | 2. Add Landed Cost Voucher Screen | TC-LCA-110 | Vendor Invoice already used in another voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Use the same invoice in another submitted voucher | PINV-0005 | To be confirmed with the BA (blocked or allowed) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 165 | 2. Add Landed Cost Voucher Screen | TC-LCA-111 | Action bar appears when a vendor invoice row is selected | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select the checkbox of a row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 166 | 2. Add Landed Cost Voucher Screen | TC-LCA-112 | Delete a vendor invoice row | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select one row
2. Click Delete row | - | The row is deleted and the totals are recalculated | High | Positive | - |
| 167 | 2. Add Landed Cost Voucher Screen | TC-LCA-113 | Delete multiple vendor invoice rows | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select two rows
2. Click Delete row | - | Both rows are deleted and the totals are recalculated | Medium | Positive | - |
| 168 | 2. Add Landed Cost Voucher Screen | TC-LCA-114 | Vendor Invoices: open the Edit Row popup | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click the Edit Row icon of a row | - | A popup is displayed with Vendor Invoice and Amount | High | Positive | - |
| 169 | 2. Add Landed Cost Voucher Screen | TC-LCA-115 | Vendor Invoices Edit Row: Vendor Invoice lists only the allowed invoices | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open the dropdown in Edit Row | PINV-0005 / PINV-0006 | Only submitted, paid, non-stock invoices are listed | Medium | Positive | - |
| 170 | 2. Add Landed Cost Voucher Screen | TC-LCA-116 | Vendor Invoices Edit Row: Amount is read-only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to edit Amount | - | Amount cannot be edited | Medium | UI | - |
| 171 | 2. Add Landed Cost Voucher Screen | TC-LCA-117 | Vendor Invoices Edit Row: save changes with Update | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row
2. Change the invoice
3. Click Update | PINV-0005 > PINV-0008 | The popup closes and the row shows the new invoice and amount | High | Positive | - |
| 172 | 2. Add Landed Cost Voucher Screen | TC-LCA-118 | Vendor Invoices: Open the table Settings popup | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Setting on the Vendor Invoices table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 173 | 2. Add Landed Cost Voucher Screen | TC-LCA-119 | Vendor Invoices: Reorder columns using drag and drop | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Drag the Amount column header and drop it before Vendor Invoice | - | The column order changes to the new position | Medium | Positive | - |
| 174 | 2. Add Landed Cost Voucher Screen | TC-LCA-120 | Vendor Invoices: Column width default value is 3 | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 175 | 2. Add Landed Cost Voucher Screen | TC-LCA-121 | Vendor Invoices: Column width accepts numbers only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 176 | 2. Add Landed Cost Voucher Screen | TC-LCA-122 | Vendor Invoices: Column width left empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 177 | 2. Add Landed Cost Voucher Screen | TC-LCA-123 | Vendor Invoices: Column width with 1 character | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 178 | 2. Add Landed Cost Voucher Screen | TC-LCA-124 | Vendor Invoices: Column width longer than 3 characters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 179 | 2. Add Landed Cost Voucher Screen | TC-LCA-125 | Vendor Invoices: Add / Remove Columns popup lists all columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Vendor Invoice, Amount) | Medium | UI | - |
| 180 | 2. Add Landed Cost Voucher Screen | TC-LCA-126 | Vendor Invoices: Hide a column | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Add / Remove columns
2. Clear the Amount checkbox
3. Click Update | Column: Amount | The Amount column is hidden from the table | Medium | Positive | - |
| 181 | 2. Add Landed Cost Voucher Screen | TC-LCA-127 | Vendor Invoices: Show a hidden column | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Hide the Amount column
2. Open Add / Remove columns
3. Select the Amount checkbox
4. Click Update | Column: Amount | The Amount column is displayed again | Medium | Positive | - |
| 182 | 2. Add Landed Cost Voucher Screen | TC-LCA-128 | Vendor Invoices: Save the Settings using Update | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 183 | 2. Add Landed Cost Voucher Screen | TC-LCA-129 | Vendor Invoices: Reset Settings to default | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 184 | 2. Add Landed Cost Voucher Screen | TC-LCA-130 | Landed Cost table displays the default columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review the Landed Cost table | - | The table shows: Checkbox, No., Expense Account, Description, Landed Cost Amount | Medium | UI | - |
| 185 | 2. Add Landed Cost Voucher Screen | TC-LCA-131 | Add Row adds a new landed cost row | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Add Row in the Landed Cost table | - | A new empty row is added | High | Positive | - |
| 186 | 2. Add Landed Cost Voucher Screen | TC-LCA-132 | Landed cost rows are numbered in order | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 187 | 2. Add Landed Cost Voucher Screen | TC-LCA-133 | Expense Account is a searchable dropdown | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Expense Account and type part of an account name | Freight | The list is filtered while typing | High | Positive | - |
| 188 | 2. Add Landed Cost Voucher Screen | TC-LCA-134 | Select an Expense Account | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Search for and select an account | Freight and Forwarding Charges - STC | The value is accepted | High | Positive | - |
| 189 | 2. Add Landed Cost Voucher Screen | TC-LCA-135 | Leave Expense Account empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add a row with Description and Amount
2. Leave Expense Account empty
3. Click Save | - | The voucher is saved (field is optional) | Medium | Positive | Needs Clarification: Expense Account is optional here, but it is needed for the accounting entries. |
| 190 | 2. Add Landed Cost Voucher Screen | TC-LCA-136 | Expense Account search with no matching result | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Type a non-existing account | ZZZ | No results are displayed | Low | Negative | - |
| 191 | 2. Add Landed Cost Voucher Screen | TC-LCA-137 | Landed Cost: Description accepts valid text | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Enter valid text in Description | Deliver before noon | The value is accepted | Medium | Positive | - |
| 192 | 2. Add Landed Cost Voucher Screen | TC-LCA-138 | Landed Cost: Description shorter than the minimum length (2 characters) | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Enter 2 characters in Description
2. Click Save | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 193 | 2. Add Landed Cost Voucher Screen | TC-LCA-139 | Landed Cost: Description at the minimum length (3 characters) | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Enter 3 characters in Description | abc | The value is accepted | Medium | Positive | - |
| 194 | 2. Add Landed Cost Voucher Screen | TC-LCA-140 | Landed Cost: Description at the maximum length (500 characters) | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Enter exactly 500 characters in Description | 500-character text | The value is accepted | Medium | Positive | - |
| 195 | 2. Add Landed Cost Voucher Screen | TC-LCA-141 | Landed Cost: Description longer than 500 characters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to enter or paste 501 characters in Description | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 196 | 2. Add Landed Cost Voucher Screen | TC-LCA-142 | Landed Cost: Description accepts letters, numbers and special characters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Enter a mix of letters, numbers and special characters in Description | Gate #3 - floor 2 (A/B) | The value is accepted | Medium | Positive | - |
| 197 | 2. Add Landed Cost Voucher Screen | TC-LCA-143 | Landed Cost: Description rejects invalid data | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Enter invalid content such as script tags in Description
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 198 | 2. Add Landed Cost Voucher Screen | TC-LCA-144 | Landed Cost: Leave Description empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add a row with Expense Account and Amount only
2. Click Save | - | An error message is displayed because Description is mandatory | High | Negative | - |
| 199 | 2. Add Landed Cost Voucher Screen | TC-LCA-145 | Landed Cost: Landed Cost Amount accepts a valid number | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Enter a valid number in Landed Cost Amount | 500 | The value is accepted | High | Positive | - |
| 200 | 2. Add Landed Cost Voucher Screen | TC-LCA-146 | Landed Cost: Leave Landed Cost Amount empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Leave Landed Cost Amount empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Landed Cost Amount is mandatory | High | Negative | - |
| 201 | 2. Add Landed Cost Voucher Screen | TC-LCA-147 | Landed Cost: Landed Cost Amount with 1 digit | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Enter 1 digit in Landed Cost Amount | 5 | The value is accepted (minimum length is 1 character) | Medium | Positive | - |
| 202 | 2. Add Landed Cost Voucher Screen | TC-LCA-148 | Landed Cost: Landed Cost Amount rejects letters and special characters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Type letters and special characters in Landed Cost Amount | abc, @# | Only numbers are accepted | Medium | Negative | - |
| 203 | 2. Add Landed Cost Voucher Screen | TC-LCA-149 | Landed Cost: Landed Cost Amount at the maximum length (100 digits) | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Enter exactly 100 digits in Landed Cost Amount | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 204 | 2. Add Landed Cost Voucher Screen | TC-LCA-150 | Landed Cost: Landed Cost Amount longer than 100 characters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to enter 101 digits in Landed Cost Amount | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 205 | 2. Add Landed Cost Voucher Screen | TC-LCA-151 | Landed Cost: Landed Cost Amount equal to zero | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Enter 0 in Landed Cost Amount
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 206 | 2. Add Landed Cost Voucher Screen | TC-LCA-152 | Landed Cost: Landed Cost Amount with a negative number | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to type a negative number in Landed Cost Amount | -50 | To be confirmed with the BA (negative charges / discounts allowed?) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 207 | 2. Add Landed Cost Voucher Screen | TC-LCA-153 | Landed Cost: Landed Cost Amount with decimal values | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Enter a decimal number in Landed Cost Amount
2. Click Save | 250.75 | The value is accepted | High | Positive | Needs Clarification: SRS says 'numbers only'; costs normally need decimals. |
| 208 | 2. Add Landed Cost Voucher Screen | TC-LCA-154 | Account Currency and Exchange Rate columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select an Expense Account in a foreign currency | USD account | Account Currency and Exchange Rate are filled and read-only | Medium | Positive | - |
| 209 | 2. Add Landed Cost Voucher Screen | TC-LCA-155 | Amount (Company Currency) is a read-only label | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Enter 100 with exchange rate 48.5 | 100 USD | Amount (Company Currency) shows 4,850 and cannot be edited | High | UI | - |
| 210 | 2. Add Landed Cost Voucher Screen | TC-LCA-156 | Landed Cost: action bar appears when a row is selected | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select the checkbox of a row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 211 | 2. Add Landed Cost Voucher Screen | TC-LCA-157 | Landed Cost: delete a single row | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select one row
2. Click Delete row | - | The row is deleted and Total Landed Cost is recalculated | High | Positive | - |
| 212 | 2. Add Landed Cost Voucher Screen | TC-LCA-158 | Landed Cost: delete multiple rows | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select two rows
2. Click Delete row | - | Both rows are deleted and Total Landed Cost is recalculated | Medium | Positive | - |
| 213 | 2. Add Landed Cost Voucher Screen | TC-LCA-159 | Landed Cost: open the Edit Row popup | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click the Edit Row icon of a row | - | A popup is displayed with the row fields | High | Positive | - |
| 214 | 2. Add Landed Cost Voucher Screen | TC-LCA-160 | Landed Cost Edit Row: displayed fields | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Edit Row and review the fields | - | The popup shows: Expense Account, Account Currency, Exchange Rate, Description, Landed Cost Amount, Amount (Company Currency) | Medium | UI | - |
| 215 | 2. Add Landed Cost Voucher Screen | TC-LCA-161 | Landed Cost Edit Row: Description is mandatory | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row
2. Clear Description
3. Click Update | - | An error message is displayed because Description is mandatory | Medium | Negative | - |
| 216 | 2. Add Landed Cost Voucher Screen | TC-LCA-162 | Landed Cost Edit Row: Description shorter than the minimum length (2 characters) | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Enter 2 characters
2. Click Update | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 217 | 2. Add Landed Cost Voucher Screen | TC-LCA-163 | Landed Cost Edit Row: Landed Cost Amount is mandatory and numeric | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row
2. Clear the amount / type letters
3. Click Update | abc | An error message is displayed for the empty value; letters are rejected | Medium | Negative | - |
| 218 | 2. Add Landed Cost Voucher Screen | TC-LCA-164 | Landed Cost Edit Row: Account Currency and Exchange Rate are read-only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to edit both fields | - | Neither field can be edited | Medium | UI | - |
| 219 | 2. Add Landed Cost Voucher Screen | TC-LCA-165 | Landed Cost Edit Row: Exchange Rate between the receipt document and the account currency | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select an account in a currency different from the receipt document | Receipt EGP; account USD | Exchange Rate shows the rate between the two currencies | Medium | Positive | - |
| 220 | 2. Add Landed Cost Voucher Screen | TC-LCA-166 | Landed Cost Edit Row: save changes with Update | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Edit Row
2. Change the amount and description
3. Click Update | Amount 150 | The popup closes and the change is reflected in the row and in the totals | High | Positive | - |
| 221 | 2. Add Landed Cost Voucher Screen | TC-LCA-167 | Landed Cost: Open the table Settings popup | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Setting on the Landed Cost table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 222 | 2. Add Landed Cost Voucher Screen | TC-LCA-168 | Landed Cost: Reorder columns using drag and drop | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Drag the Description column header and drop it before Expense Account | - | The column order changes to the new position | Medium | Positive | - |
| 223 | 2. Add Landed Cost Voucher Screen | TC-LCA-169 | Landed Cost: Column width default value is 3 | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 224 | 2. Add Landed Cost Voucher Screen | TC-LCA-170 | Landed Cost: Column width accepts numbers only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 225 | 2. Add Landed Cost Voucher Screen | TC-LCA-171 | Landed Cost: Column width left empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 226 | 2. Add Landed Cost Voucher Screen | TC-LCA-172 | Landed Cost: Column width with 1 character | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 227 | 2. Add Landed Cost Voucher Screen | TC-LCA-173 | Landed Cost: Column width longer than 3 characters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 228 | 2. Add Landed Cost Voucher Screen | TC-LCA-174 | Landed Cost: Add / Remove Columns popup lists all columns | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Expense Account, Description, Amount, Account Currency, Exchange Rate, Amount (Company Currency)) | Medium | UI | - |
| 229 | 2. Add Landed Cost Voucher Screen | TC-LCA-175 | Landed Cost: Hide a column | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Open Add / Remove columns
2. Clear the Description checkbox
3. Click Update | Column: Description | The Description column is hidden from the table | Medium | Positive | - |
| 230 | 2. Add Landed Cost Voucher Screen | TC-LCA-176 | Landed Cost: Show a hidden column | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Hide the Description column
2. Open Add / Remove columns
3. Select the Description checkbox
4. Click Update | Column: Description | The Description column is displayed again | Medium | Positive | - |
| 231 | 2. Add Landed Cost Voucher Screen | TC-LCA-177 | Landed Cost: Save the Settings using Update | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 232 | 2. Add Landed Cost Voucher Screen | TC-LCA-178 | Landed Cost: Reset Settings to default | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 233 | 2. Add Landed Cost Voucher Screen | TC-LCA-179 | Total Vendor Invoices Cost is the sum of the vendor invoices | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add two vendor invoices of 500 and 300 | 500 + 300 | Total Vendor Invoices Cost (company currency) shows 800 | High | Positive | - |
| 234 | 2. Add Landed Cost Voucher Screen | TC-LCA-180 | Total Landed Cost is the sum of the landed cost rows and vendor invoices | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add vendor invoices of 800
2. Add landed cost rows of 200 | 800 + 200 | Total Landed Cost (company currency) shows 1,000 | High | Positive | Needs Clarification: SRS says the vendor invoice amount is added to the landed cost amount; confirm the total includes both. |
| 235 | 2. Add Landed Cost Voucher Screen | TC-LCA-181 | Totals are read-only labels | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Try to edit both totals | - | Neither total can be edited | Medium | UI | - |
| 236 | 2. Add Landed Cost Voucher Screen | TC-LCA-182 | Totals with no rows | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open the Add screen without rows | - | Both totals show 0 | Low | Positive | - |
| 237 | 2. Add Landed Cost Voucher Screen | TC-LCA-183 | Distribute Charges Based On lists the allowed values | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Open the dropdown | - | The dropdown contains: Qty, Amount, Distribute Manually | High | Positive | - |
| 238 | 2. Add Landed Cost Voucher Screen | TC-LCA-184 | Leave Distribute Charges Based On empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Leave it empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because it is mandatory | High | Negative | - |
| 239 | 2. Add Landed Cost Voucher Screen | TC-LCA-185 | Distribute Charges Based On accepts a single selection only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Select Qty and then Amount | Qty, Amount | Only one value is selected; the second replaces the first | Low | Positive | - |
| 240 | 2. Add Landed Cost Voucher Screen | TC-LCA-186 | Distribute by Qty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Items: A qty 6, B qty 4
2. Total landed cost 1,000
3. Select Qty | 6/10 and 4/10 | Applicable Charges: A = 600, B = 400 | High | Positive | - |
| 241 | 2. Add Landed Cost Voucher Screen | TC-LCA-187 | Distribute by Amount | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Items: A amount 300, B amount 700
2. Total landed cost 1,000
3. Select Amount | 30% and 70% | Applicable Charges: A = 300, B = 700 | High | Positive | - |
| 242 | 2. Add Landed Cost Voucher Screen | TC-LCA-188 | Distribute Manually: enter the charges | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Distribute Manually
2. Enter charges for each item | A 400; B 600 | The entered values are accepted and the total is checked against Total Landed Cost | High | Positive | - |
| 243 | 2. Add Landed Cost Voucher Screen | TC-LCA-189 | Distribution is recalculated when the landed cost changes | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Change a landed cost amount
2. Review Applicable Charges | 1,000 > 1,200 | Applicable Charges are recalculated (Qty / Amount modes) | High | Positive | - |
| 244 | 2. Add Landed Cost Voucher Screen | TC-LCA-190 | Distribution is recalculated when the mode changes | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Switch between Qty and Amount | Qty > Amount | Applicable Charges are recalculated | High | Positive | - |
| 245 | 2. Add Landed Cost Voucher Screen | TC-LCA-191 | Distribution rounding | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Distribute 100 over 3 items of equal qty | 100 / 3 | The charges add up exactly to 100 (rounding difference handled) | Medium | Positive | Needs Clarification: Not defined in the SRS. |
| 246 | 2. Add Landed Cost Voucher Screen | TC-LCA-192 | Distribute Manually: charge is empty or letters | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select Distribute Manually
2. Type letters in Applicable Charges | abc | Letters are not accepted | Medium | Negative | - |
| 247 | 2. Add Landed Cost Voucher Screen | TC-LCA-193 | Distribute Manually: negative charge | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Enter a negative charge for an item | -50 | To be confirmed with the BA (accepted or rejected) | Low | Negative | Needs Clarification: Not defined in the SRS. |
| 248 | 2. Add Landed Cost Voucher Screen | TC-LCA-194 | Save a Landed Cost Voucher with valid data | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Select a Series and a Company
2. Add a Purchase Receipt row and click Get Items
3. Add a landed cost row
4. Select Distribute Charges Based On
5. Click Save | Company: Ahmed Ebrahim CO.; PR-0001; Freight 500; Qty | The voucher is saved (not submitted), added to the list with status Draft | High | Positive | - |
| 249 | 2. Add Landed Cost Voucher Screen | TC-LCA-195 | Save with all mandatory fields empty | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Leave the form empty
2. Click Save | - | A validation error message is displayed for each mandatory field (Series, Company, Receipt Document Type / Document, Description, Landed Cost Amount, Distribute Charges Based On) | High | Negative | - |
| 250 | 2. Add Landed Cost Voucher Screen | TC-LCA-196 | Save a voucher with no receipt documents | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Fill the header
2. Do not add rows
3. Click Save | No vouchers | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one receipt document is required. |
| 251 | 2. Add Landed Cost Voucher Screen | TC-LCA-197 | Save a voucher with no landed cost rows and no vendor invoices | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add a receipt document
2. Leave both cost tables empty
3. Click Save | No costs | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: Not defined in the SRS. |
| 252 | 2. Add Landed Cost Voucher Screen | TC-LCA-198 | Save without clicking Get Items | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Add a receipt document
2. Do not click Get Items
3. Click Save | PR-0001 | To be confirmed with the BA (items fetched automatically on save or required) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 253 | 2. Add Landed Cost Voucher Screen | TC-LCA-199 | Saved data is displayed correctly when reopened | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Save a valid voucher
2. Open it from the list | LCV-0001 | All saved values are displayed correctly | High | Positive | - |
| 254 | 2. Add Landed Cost Voucher Screen | TC-LCA-200 | Submit button is displayed only after Save | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | 1. Click Save on a valid voucher
2. Review the buttons | - | The Submit button is displayed after saving | High | Positive | - |
| 255 | 2. Add Landed Cost Voucher Screen | TC-LCA-201 | Submit button is hidden before Save | Inventory > Landed Cost Voucher > Add Landed Cost Voucher | Review the buttons on a new unsaved voucher | - | The Submit button is not displayed | Medium | Negative | - |
| 256 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-001 | Submit a balanced voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Create a voucher with total applicable charges equal to the total landed cost
2. Click Submit | Charges 1,000 = landed cost 1,000 | The voucher is submitted and its status in the list is Submitted | High | Positive | - |
| 257 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-002 | Submit when total applicable charges differ from the total landed cost | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Distribute Manually: charges 900 vs landed cost 1,000
2. Click Submit | 900 vs 1,000 | An error message is displayed and the voucher is not submitted | High | Negative | - |
| 258 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-003 | Submit when charges exceed the landed cost | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Distribute Manually: charges 1,100 vs landed cost 1,000
2. Click Submit | 1,100 vs 1,000 | An error message is displayed and the voucher is not submitted | High | Negative | - |
| 259 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-004 | Submit with a missing mandatory value | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Remove the Description from a landed cost row
2. Click Submit | - | The voucher is not submitted and a validation error is displayed | High | Negative | - |
| 260 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-005 | Submit recalculates the valuation rate of the affected items | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Note the valuation rate of an item (50)
2. Submit a voucher adding 10 per unit | 50 + 10 | The valuation rate of the item includes the additional cost (60) | High | Positive | - |
| 261 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-006 | Submit updates the item row of the receipt document | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit the voucher
2. Open Edit Row of the item in the Purchase Receipt | Landed Cost Voucher Amount 100 | Landed Cost Voucher Amount shows the allocated charge on the receipt item | High | Positive | - |
| 262 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-007 | Submit creates Stock Ledger Entries | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit the voucher
2. Open the Stock Ledger Entry list | - | Stock Ledger Entries are created automatically for the affected items | High | Positive | - |
| 263 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-008 | Submit updates the BIN | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit the voucher
2. Open the Bin | Stock Value +100 | The Bin valuation rate and Stock Value are updated | High | Positive | - |
| 264 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-009 | Submit updates the Stock Ledger | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit the voucher
2. Open the ledger of the item | - | The ledger shows the updated valuation and balance values | High | Positive | - |
| 265 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-010 | Submit creates the accounting entries | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit the voucher
2. Open the Accounting Ledger of the receipt | - | Entries are created: expense account credited and stock account debited | Medium | Positive | Needs Clarification: Accounting entries are not described in the SRS. |
| 266 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-011 | Submit creates a Repost Item Valuation record | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit the voucher
2. Open Repost Item Valuation | LCV-0001 | A record with Via Landed Cost Voucher is created | Medium | Positive | Needs Clarification: Link with Repost Item Valuation is not described in the Landed Cost Voucher SRS. |
| 267 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-012 | Distribute by Qty updates each item correctly | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit a Qty-based voucher
2. Check each item's valuation rate | A 600 / 6 = +100 per unit; B 400 / 4 = +100 per unit | Each item's valuation rate includes its share per unit | High | Positive | - |
| 268 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-013 | Distribute by Amount updates each item correctly | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit an Amount-based voucher
2. Check each item's valuation rate | 30% / 70% | Each item's valuation rate includes its share | High | Positive | - |
| 269 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-014 | Voucher for a receipt whose stock was already consumed | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Deliver part of the received stock
2. Submit a voucher for the receipt | Received 6; delivered 4 | The cost is applied to the remaining stock and the consumed part is posted as difference | Medium | Positive | Needs Clarification: Not defined in the SRS. |
| 270 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-015 | Voucher for a Purchase Invoice with Update Stock | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Select a Purchase Invoice with Update Stock
2. Submit | PINV-0001 | The valuation of the invoice items is updated | Medium | Positive | - |
| 271 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-016 | Voucher for a Repack Stock Entry | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Select a Repack Stock Entry
2. Submit | STE-0001 | The valuation of the finished items is updated | Medium | Positive | - |
| 272 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-017 | Submitted voucher is read-only | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit a voucher
2. Try to edit any field | - | All fields are read-only | High | Negative | - |
| 273 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-018 | Cancel button appears only for Submitted vouchers | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | Open a Draft, a Submitted and a Cancelled voucher | 3 vouchers | Cancel is displayed only on the Submitted voucher | High | Positive | - |
| 274 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-019 | Cancel a Submitted voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Open a Submitted voucher
2. Click Cancel | - | The voucher is cancelled, its status changes to Cancelled and the Cancel button changes to Amend | High | Positive | - |
| 275 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-020 | Cancel restores the valuation rate | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Cancel a submitted voucher
2. Check the valuation rate of the item | 60 > 50 | The item valuation rate returns to its previous value | High | Positive | - |
| 276 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-021 | Cancel creates a reversing ledger entry | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Cancel a voucher
2. Open the Stock Ledger Entry list | - | Reversing entries are created and the original entries are marked as cancelled | Medium | Positive | - |
| 277 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-022 | Cancel updates the BIN | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Cancel a voucher
2. Open the Bin | Stock Value -100 | The Bin valuation rate and Stock Value are restored | Medium | Positive | - |
| 278 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-023 | Cancel the Purchase Receipt that has a Landed Cost Voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Try to cancel the receipt linked to a submitted voucher | PR-0001 | A message asks the user to cancel the Landed Cost Voucher first | High | Negative | Needs Clarification: Not defined in the SRS. |
| 279 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-024 | Amend button is displayed only for Cancelled vouchers | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | Open a Submitted and a Cancelled voucher | - | Amend is displayed only for the Cancelled voucher | High | Positive | - |
| 280 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-025 | Amend a Cancelled voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Open a Cancelled voucher
2. Click Amend | - | A new Draft voucher is created with Amended From pointing to the cancelled one | High | Positive | Needs Clarification: SRS does not define the result of clicking Amend. |
| 281 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-026 | Amended From link opens the original voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Open an amended voucher
2. Click Amended From | LCV-0001-1 | The user is redirected to the original (cancelled) voucher | Medium | Positive | - |
| 282 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-027 | Amended From is hidden for a non-amended voucher | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | Open a voucher that was not amended | - | The Amended From field is not displayed | Medium | UI | - |
| 283 | 3. Submit, Cancel & Valuation Workflow | TC-LCW-028 | Several vouchers on the same receipt | Inventory > Landed Cost Voucher > Add Landed Cost Voucher; a submitted Purchase Receipt with stock | 1. Submit a second voucher for the same Purchase Receipt | PR-0001: LCV-0001 + LCV-0002 | Both costs are accumulated in the item valuation | Medium | Positive | - |
| 284 | 4. Landed Cost Voucher Details Screen | TC-LCD-001 | Open Landed Cost Voucher Details from the list | Logged in; at least one Landed Cost Voucher exists | 1. Click Inventory from the side menu
2. Click Landed Cost Voucher
3. Click a Landed Cost Voucher ID | LCV-0001 | The Details screen of the selected voucher is displayed | High | Positive | - |
| 285 | 4. Landed Cost Voucher Details Screen | TC-LCD-002 | Details display the data entered during creation | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | Open a voucher created with known data and compare the fields | PR-0001; Freight 500; Qty | All data entered during creation is displayed correctly | High | Positive | - |
| 286 | 4. Landed Cost Voucher Details Screen | TC-LCD-003 | Draft: fields are displayed as input fields | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table; a Draft voucher exists | Open a Draft voucher | Status: Draft | Fields are displayed as editable input fields | High | Positive | - |
| 287 | 4. Landed Cost Voucher Details Screen | TC-LCD-004 | Draft: modify and save a voucher | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Draft voucher
2. Change a landed cost amount
3. Click Save | 500 > 600 | The changes are saved successfully and the totals are recalculated | High | Positive | - |
| 288 | 4. Landed Cost Voucher Details Screen | TC-LCD-005 | Draft: add a receipt document and fetch its items | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Draft voucher
2. Add a document row
3. Click Get Items
4. Click Save | PR-0002 | The items are added and saved | Medium | Positive | - |
| 289 | 4. Landed Cost Voucher Details Screen | TC-LCD-006 | Draft: delete a landed cost row | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Draft voucher
2. Delete a row
3. Click Save | - | The row is removed and the totals are recalculated | Medium | Positive | - |
| 290 | 4. Landed Cost Voucher Details Screen | TC-LCD-007 | Draft: change the distribution mode | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Draft voucher
2. Change Distribute Charges Based On
3. Click Save | Qty > Amount | The Applicable Charges are recalculated and saved | Medium | Positive | - |
| 291 | 4. Landed Cost Voucher Details Screen | TC-LCD-008 | Draft: clear a mandatory field and save | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Draft voucher
2. Clear Company
3. Click Save | - | An error message is displayed because Company is mandatory | High | Negative | - |
| 292 | 4. Landed Cost Voucher Details Screen | TC-LCD-009 | Draft: clear Description of a landed cost row and save | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Draft voucher
2. Clear a Description
3. Click Save | - | An error message is displayed because Description is mandatory | Medium | Negative | - |
| 293 | 4. Landed Cost Voucher Details Screen | TC-LCD-010 | Draft: submit from Details | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a saved Draft voucher
2. Click Submit | Balanced voucher | The voucher is submitted and its status becomes Submitted | High | Positive | - |
| 294 | 4. Landed Cost Voucher Details Screen | TC-LCD-011 | Submitted: fields are displayed as read-only labels | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table; a Submitted voucher exists | Open a Submitted voucher | Status: Submitted | All fields are displayed as read-only labels | High | Positive | - |
| 295 | 4. Landed Cost Voucher Details Screen | TC-LCD-012 | Submitted: fields cannot be edited | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Submitted voucher
2. Try to change any field | Status: Submitted | No field can be edited | High | Negative | - |
| 296 | 4. Landed Cost Voucher Details Screen | TC-LCD-013 | Submitted: tables are read-only | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Submitted voucher
2. Look for Add Row / Delete row | - | Rows cannot be added or deleted | High | Negative | - |
| 297 | 4. Landed Cost Voucher Details Screen | TC-LCD-014 | Submitted: Cancel action is available | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | Open a Submitted voucher and review the page actions | Status: Submitted | The Cancel action is available | High | Positive | Needs Clarification: SRS describes Cancel in the Add screen but not in the Details page actions. |
| 298 | 4. Landed Cost Voucher Details Screen | TC-LCD-015 | Cancel a Submitted voucher from Details | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Submitted voucher
2. Click Cancel | - | The voucher is cancelled and the Cancel button changes to Amend | High | Positive | - |
| 299 | 4. Landed Cost Voucher Details Screen | TC-LCD-016 | Cancelled: fields are displayed as read-only labels | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table; a Cancelled voucher exists | Open a Cancelled voucher | Status: Cancelled | All fields are displayed as read-only labels and cannot be edited | High | Positive | - |
| 300 | 4. Landed Cost Voucher Details Screen | TC-LCD-017 | Cancelled: Amend action is available | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | Open a Cancelled voucher | Status: Cancelled | The Amend button is displayed | High | Positive | - |
| 301 | 4. Landed Cost Voucher Details Screen | TC-LCD-018 | Fixed page actions are displayed at the top | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | Open any voucher and review the top of the page | - | The Assign, Attachment, Tags, Share, Print and Delete actions are displayed at the top | High | UI | - |
| 302 | 4. Landed Cost Voucher Details Screen | TC-LCD-019 | Fixed page actions remain visible for all statuses | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | Open vouchers in each status | 3 vouchers | The fixed page actions are displayed on all of them | Medium | UI | - |
| 303 | 4. Landed Cost Voucher Details Screen | TC-LCD-020 | Assign the voucher to a user | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Click Assign
2. Select a user
3. Confirm | User: Mona Samir | The voucher is assigned to the selected user and the assignment is displayed | Medium | Positive | Needs Clarification: SRS lists Assign without details. |
| 304 | 4. Landed Cost Voucher Details Screen | TC-LCD-021 | Add an attachment | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Click Attachment
2. Upload a file | freight-invoice.pdf | The file is attached to the voucher and listed | Medium | Positive | Needs Clarification: Allowed file types and size limit are not defined. |
| 305 | 4. Landed Cost Voucher Details Screen | TC-LCD-022 | Add a tag | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Click Tags
2. Add a tag | Tag: Freight | The tag is added to the voucher | Low | Positive | - |
| 306 | 4. Landed Cost Voucher Details Screen | TC-LCD-023 | Share the voucher with a user | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Click Share
2. Select a user and permission
3. Confirm | User: Mona Samir | The voucher is shared with the selected user | Medium | Positive | Needs Clarification: SRS lists Share without details. |
| 307 | 4. Landed Cost Voucher Details Screen | TC-LCD-024 | Print the voucher | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Click Print | - | The print view of the voucher is displayed and can be printed | Medium | Positive | - |
| 308 | 4. Landed Cost Voucher Details Screen | TC-LCD-025 | Delete confirmation message | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a voucher
2. Click Delete | - | A confirmation message asks the user whether they want to delete this Landed Cost Voucher | High | Positive | - |
| 309 | 4. Landed Cost Voucher Details Screen | TC-LCD-026 | Cancel the delete confirmation | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Click Delete
2. Click No (or close the message) | - | The voucher is not deleted | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 310 | 4. Landed Cost Voucher Details Screen | TC-LCD-027 | Delete a Draft voucher that has no links | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open an unlinked Draft voucher
2. Click Delete
3. Click Yes | Unlinked Draft voucher | The voucher is deleted successfully | High | Positive | - |
| 311 | 4. Landed Cost Voucher Details Screen | TC-LCD-028 | Delete a Submitted voucher | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a Submitted voucher
2. Click Delete
3. Click Yes | Status: Submitted | The voucher is not deleted because it must be cancelled first | High | Negative | Needs Clarification: SRS makes Delete a fixed page action for all statuses. |
| 312 | 4. Landed Cost Voucher Details Screen | TC-LCD-029 | Delete a voucher amended from another voucher | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open an amended voucher
2. Click Delete
3. Click Yes | Amended voucher | A warning message is displayed with the linked doctypes as hyperlinks; the voucher is not deleted | High | Negative | - |
| 313 | 4. Landed Cost Voucher Details Screen | TC-LCD-030 | Delete a voucher linked to other transactions | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Open a linked voucher
2. Click Delete
3. Click Yes | Linked voucher | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks | High | Negative | - |
| 314 | 4. Landed Cost Voucher Details Screen | TC-LCD-031 | Linked doctype hyperlinks open the corresponding doctype | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | 1. Trigger the delete message
2. Click a linked doctype | - | The user is redirected to the corresponding doctype | Medium | Positive | - |
| 315 | 4. Landed Cost Voucher Details Screen | TC-LCD-032 | Connections on the Details screen | Inventory > Landed Cost Voucher > click a Landed Cost Voucher ID in the table | Open a voucher and scroll to the bottom | - | To be confirmed with the BA (no Connections are defined) | Low | Positive | Needs Clarification: Not defined in the SRS. |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Landed Cost Voucher List Screen |  |  |  |
| 2. Add Landed Cost Voucher Screen |  |  |  |
| 3. Submit, Cancel & Valuation Workflow |  |  |  |
| 4. Landed Cost Voucher Details Screen |  |  |  |
| Total |  |  |  |
| By Type | Count |  |  |
| Positive |  |  |  |
| Negative |  |  |  |
| UI |  |  |  |
| By Priority | Count |  |  |
| High |  |  |  |
| Medium |  |  |  |
| Low |  |  |  |
| Clarification | Count |  |  |
| Needs Clarification (see Remarks) |  |  |  |