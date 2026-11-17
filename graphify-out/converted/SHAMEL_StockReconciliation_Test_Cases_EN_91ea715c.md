<!-- converted from SHAMEL_StockReconciliation_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Stock Reconciliation |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Stock Reconciliation) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Stock Reconciliation List Screen | TC-RCL-001 | Display the Stock Reconciliation list | Access via Inventory > Stock Reconciliation | 1. Click Inventory from the side menu
2. Click Stock Reconciliation | - | A table listing all Stock Reconciliations in the system is displayed | High | Positive | - |
| 2 | 1. Stock Reconciliation List Screen | TC-RCL-002 | Add Stock Reconciliation button is displayed | Access via Inventory > Stock Reconciliation | Verify that the Add Stock Reconciliation button is displayed on the list screen | - | The Add Stock Reconciliation button is visible and clickable | Medium | UI | - |
| 3 | 1. Stock Reconciliation List Screen | TC-RCL-003 | Navigate to the Add Stock Reconciliation screen | Access via Inventory > Stock Reconciliation | Click the Add Stock Reconciliation button | - | The user is redirected to the Add Stock Reconciliation screen | High | Positive | - |
| 4 | 1. Stock Reconciliation List Screen | TC-RCL-004 | Display checkbox column for row selection | Access via Inventory > Stock Reconciliation | Open the list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Stock Reconciliation List Screen | TC-RCL-005 | Display Stock Reconciliation ID column | Access via Inventory > Stock Reconciliation | Open the list | - | The Stock Reconciliation ID is displayed for each row | Medium | UI | Needs Clarification: SRS says this column 'displays the Stock Entry ID'. Assumed to be a typo for Stock Reconciliation ID. |
| 6 | 1. Stock Reconciliation List Screen | TC-RCL-006 | Navigate to Details by clicking the ID | Access via Inventory > Stock Reconciliation | Click a Stock Reconciliation ID in the table | MAT-RECO-2026-00001 | The user is redirected to the Stock Reconciliation Details screen of the selected record | High | Positive | - |
| 7 | 1. Stock Reconciliation List Screen | TC-RCL-007 | Display Status column with a valid value | Access via Inventory > Stock Reconciliation | Open the list and review the Status column | Records in each status | Each row shows exactly one of: Draft, Submitted, Cancelled | High | Positive | - |
| 8 | 1. Stock Reconciliation List Screen | TC-RCL-008 | Status of a newly saved Stock Reconciliation is Draft | Access via Inventory > Stock Reconciliation | 1. Add and save a new Stock Reconciliation
2. Return to the list | Purpose: Stock Reconciliation | The new record appears in the list with status Draft | High | Positive | - |
| 9 | 1. Stock Reconciliation List Screen | TC-RCL-009 | Status changes to Submitted after submission | Access via Inventory > Stock Reconciliation | 1. Submit a Draft Stock Reconciliation
2. Return to the list | MAT-RECO-2026-00001 | The status is Submitted | High | Positive | - |
| 10 | 1. Stock Reconciliation List Screen | TC-RCL-010 | Status changes to Cancelled after cancellation | Access via Inventory > Stock Reconciliation | 1. Cancel a Submitted Stock Reconciliation
2. Return to the list | MAT-RECO-2026-00001 | The status is Cancelled | High | Positive | - |
| 11 | 1. Stock Reconciliation List Screen | TC-RCL-011 | Display Posting Date column | Access via Inventory > Stock Reconciliation | Open the list and review the Posting Date column | 2026-11-01 | The posting date of each record is displayed | Medium | UI | - |
| 12 | 1. Stock Reconciliation List Screen | TC-RCL-012 | Display Posting Time column | Access via Inventory > Stock Reconciliation | Open the list and review the Posting Time column | 10:30:00 | The posting time of each record is displayed | Medium | UI | - |
| 13 | 1. Stock Reconciliation List Screen | TC-RCL-013 | List displays only the columns defined in the SRS | Access via Inventory > Stock Reconciliation | Review the list header | - | The columns are: Checkbox, Stock Reconciliation ID, Status, Posting Date, Posting Time | Medium | UI | - |
| 14 | 1. Stock Reconciliation List Screen | TC-RCL-014 | Action bar appears when one row is selected | Access via Inventory > Stock Reconciliation | Select the checkbox of one record | - | An action bar appears showing the available actions | High | Positive | - |
| 15 | 1. Stock Reconciliation List Screen | TC-RCL-015 | Action bar appears when multiple rows are selected | Access via Inventory > Stock Reconciliation | Select the checkboxes of three records | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 16 | 1. Stock Reconciliation List Screen | TC-RCL-016 | Action bar disappears when all rows are deselected | Access via Inventory > Stock Reconciliation | 1. Select one record
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 17 | 1. Stock Reconciliation List Screen | TC-RCL-017 | Action bar contains the required actions | Access via Inventory > Stock Reconciliation | Select a record and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete (Submit and Cancel are shown only by status) | Medium | UI | - |
| 18 | 1. Stock Reconciliation List Screen | TC-RCL-018 | Open the Edit popup | Access via Inventory > Stock Reconciliation | 1. Select a record
2. Click Edit | - | A popup is displayed containing the Field dropdown, the Value field and the Update button | High | Positive | - |
| 19 | 1. Stock Reconciliation List Screen | TC-RCL-019 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Stock Reconciliation | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Stock Reconciliation and allows selecting only one option | Medium | Positive | - |
| 20 | 1. Stock Reconciliation List Screen | TC-RCL-020 | Click Update without selecting a Field | Access via Inventory > Stock Reconciliation | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because Field is mandatory | Medium | Negative | - |
| 21 | 1. Stock Reconciliation List Screen | TC-RCL-021 | Value input type changes dynamically based on the selected Field | Access via Inventory > Stock Reconciliation | 1. Open the Edit popup
2. Select Field = Company and note the Value input type
3. Select Field = Posting Time and note the Value input type | Company, Posting Time | The Value field changes its input type (searchable dropdown for Company, time picker for Posting Time) | High | Positive | - |
| 22 | 1. Stock Reconciliation List Screen | TC-RCL-022 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Stock Reconciliation | 1. Open the Edit popup
2. Select Field = Purpose
3. Leave Value empty and click Update | Field: Purpose | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 23 | 1. Stock Reconciliation List Screen | TC-RCL-023 | Update a Draft record successfully | Access via Inventory > Stock Reconciliation | 1. Select a Draft record
2. Click Edit
3. Select Field = Default Warehouse
4. Select a Value
5. Click Update | Value: Stores - E | The record is updated successfully | High | Positive | Needs Clarification: SRS defines only the error case of Update (Submitted / Cancelled). The Draft success case is assumed. |
| 24 | 1. Stock Reconciliation List Screen | TC-RCL-024 | Update a Submitted record | Access via Inventory > Stock Reconciliation | 1. Select a Submitted record
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Submitted | An error message is displayed informing the user that the Stock Reconciliation cannot be modified | High | Negative | Needs Clarification: SRS text says 'If the Stock Entry status is Submitted or Cancelled' (copy/paste). |
| 25 | 1. Stock Reconciliation List Screen | TC-RCL-025 | Update a Cancelled record | Access via Inventory > Stock Reconciliation | 1. Select a Cancelled record
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Cancelled | An error message is displayed informing the user that the Stock Reconciliation cannot be modified | High | Negative | - |
| 26 | 1. Stock Reconciliation List Screen | TC-RCL-026 | Edit with multiple records selected | Access via Inventory > Stock Reconciliation | 1. Select two Draft records
2. Click Edit
3. Select a Field and a Value
4. Click Update | Two Draft records | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection. |
| 27 | 1. Stock Reconciliation List Screen | TC-RCL-027 | Submit action is displayed for a Draft record | Access via Inventory > Stock Reconciliation | Select a Draft record and review the action bar | Status: Draft | The Submit action is displayed | High | Positive | - |
| 28 | 1. Stock Reconciliation List Screen | TC-RCL-028 | Submit action is hidden for Submitted and Cancelled records | Access via Inventory > Stock Reconciliation | Select a Submitted and a Cancelled record and review the action bar | 2 records | The Submit action is not displayed | Medium | Negative | - |
| 29 | 1. Stock Reconciliation List Screen | TC-RCL-029 | Submit a complete Draft record from the list | Access via Inventory > Stock Reconciliation | 1. Select a complete Draft record
2. Click Submit | Complete Draft record | The record is submitted successfully and its status changes to Submitted | High | Positive | - |
| 30 | 1. Stock Reconciliation List Screen | TC-RCL-030 | Submit a Draft record with incomplete data | Access via Inventory > Stock Reconciliation | 1. Select a Draft record with a missing mandatory value
2. Click Submit | Draft without Warehouse | The record is not submitted and a validation error is displayed | High | Negative | Needs Clarification: SRS describes only the success case of Submit in the list. |
| 31 | 1. Stock Reconciliation List Screen | TC-RCL-031 | Submit multiple Draft records at once | Access via Inventory > Stock Reconciliation | 1. Select two complete Draft records
2. Click Submit | Two Draft records | To be confirmed with the BA (bulk submit behavior) | Low | Positive | Needs Clarification: SRS does not define bulk submit. |
| 32 | 1. Stock Reconciliation List Screen | TC-RCL-032 | Cancel action is displayed for a Submitted record | Access via Inventory > Stock Reconciliation | Select a Submitted record and review the action bar | Status: Submitted | The Cancel action is displayed | High | Positive | - |
| 33 | 1. Stock Reconciliation List Screen | TC-RCL-033 | Cancel action is hidden for Draft and Cancelled records | Access via Inventory > Stock Reconciliation | Select a Draft and a Cancelled record and review the action bar | 2 records | The Cancel action is not displayed | Medium | Negative | - |
| 34 | 1. Stock Reconciliation List Screen | TC-RCL-034 | Cancel a Submitted record | Access via Inventory > Stock Reconciliation | 1. Select a Submitted record
2. Click Cancel | Status: Submitted | The record is cancelled successfully, its status changes to Cancelled and the Cancel button changes to Amend | High | Positive | Needs Clarification: SRS spells the status 'Cancelled' in the list and 'Canceled' in the Cancel action. |
| 35 | 1. Stock Reconciliation List Screen | TC-RCL-035 | Cancel reverses the stock adjustment | Access via Inventory > Stock Reconciliation | 1. Note the Bin quantity
2. Cancel a submitted reconciliation
3. Check the Bin | Qty 10 > 15 cancelled | The stock quantity returns to the value before the reconciliation | High | Positive | Needs Clarification: Not described in the SRS. |
| 36 | 1. Stock Reconciliation List Screen | TC-RCL-036 | Amend button after cancellation | Access via Inventory > Stock Reconciliation | 1. Cancel a record
2. Review the action bar | - | The Amend button is displayed | High | Positive | - |
| 37 | 1. Stock Reconciliation List Screen | TC-RCL-037 | Amend a Cancelled record | Access via Inventory > Stock Reconciliation | 1. Select a Cancelled record
2. Click Amend | Status: Cancelled | A new Draft record is created with Amended From pointing to the cancelled one | High | Positive | Needs Clarification: SRS defines when Amend appears but not what happens after clicking it. |
| 38 | 1. Stock Reconciliation List Screen | TC-RCL-038 | Delete: available statuses | Access via Inventory > Stock Reconciliation | Select records in every status and review the action bar | Draft, Submitted, Cancelled | To be confirmed with the BA (which statuses show Delete) | High | Positive | Needs Clarification: SRS does not restrict Delete by status. |
| 39 | 1. Stock Reconciliation List Screen | TC-RCL-039 | Confirmation message is displayed when clicking Delete | Access via Inventory > Stock Reconciliation | 1. Select a Draft record
2. Click Delete | Status: Draft | A confirmation message asks the user whether they want to delete this Stock Reconciliation | High | Positive | - |
| 40 | 1. Stock Reconciliation List Screen | TC-RCL-040 | Cancel the delete confirmation | Access via Inventory > Stock Reconciliation | 1. Select a Draft record
2. Click Delete
3. Click No (or close the message) | - | The record is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 41 | 1. Stock Reconciliation List Screen | TC-RCL-041 | Delete a Draft record that has no links | Access via Inventory > Stock Reconciliation | 1. Select an unlinked Draft record
2. Click Delete
3. Click Yes | Unlinked Draft record | The record is deleted successfully and removed from the list | High | Positive | - |
| 42 | 1. Stock Reconciliation List Screen | TC-RCL-042 | Delete a Submitted record | Access via Inventory > Stock Reconciliation | 1. Select a Submitted record
2. Click Delete
3. Click Yes | Status: Submitted | The record is not deleted because it must be cancelled first | High | Negative | Needs Clarification: Not defined in the SRS (standard behavior assumed). |
| 43 | 1. Stock Reconciliation List Screen | TC-RCL-043 | Delete a record that was amended from another record | Access via Inventory > Stock Reconciliation | 1. Select a record that has Amended From populated
2. Click Delete
3. Click Yes | Amended record | A warning message is displayed: the record cannot be deleted until all related doctypes are deleted. The record is not deleted | High | Negative | - |
| 44 | 1. Stock Reconciliation List Screen | TC-RCL-044 | Delete a record linked to other transactions | Access via Inventory > Stock Reconciliation | 1. Select a Cancelled record linked to other transactions
2. Click Delete
3. Click Yes | Linked record | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks. The record is not deleted | High | Negative | - |
| 45 | 1. Stock Reconciliation List Screen | TC-RCL-045 | Linked doctypes in the delete messages are hyperlinks | Access via Inventory > Stock Reconciliation | 1. Trigger the delete message for a linked record
2. Click a linked doctype | Linked record | The user is redirected to the corresponding doctype | Medium | Positive | - |
| 46 | 1. Stock Reconciliation List Screen | TC-RCL-046 | Delete multiple records at once | Access via Inventory > Stock Reconciliation | 1. Select two Draft records
2. Click Delete
3. Click Yes | Two Draft records | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define bulk delete. |
| 47 | 1. Stock Reconciliation List Screen | TC-RCL-047 | Export selected records | Access via Inventory > Stock Reconciliation | 1. Select one or more records
2. Click Export | - | The selected records are exported | Medium | Positive | Needs Clarification: SRS lists Export without details. |
| 48 | 1. Stock Reconciliation List Screen | TC-RCL-048 | Assign selected records to a user | Access via Inventory > Stock Reconciliation | 1. Select a record
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The record is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 49 | 1. Stock Reconciliation List Screen | TC-RCL-049 | Clear assignment of a record | Access via Inventory > Stock Reconciliation | 1. Select an assigned record
2. Click Clear assignment | Assigned record | The assignment is cleared | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 50 | 1. Stock Reconciliation List Screen | TC-RCL-050 | Add tags to a record | Access via Inventory > Stock Reconciliation | 1. Select a record
2. Click Add tags
3. Enter a tag and confirm | Tag: Stock count | The tag is added to the record | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 51 | 1. Stock Reconciliation List Screen | TC-RCL-051 | Print selected records | Access via Inventory > Stock Reconciliation | 1. Select a record
2. Click Print | - | The print view of the record is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 52 | 1. Stock Reconciliation List Screen | TC-RCL-052 | List when there are no records | Access via Inventory > Stock Reconciliation | Open the list in a system with no reconciliations | No records | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. |
| 53 | 1. Stock Reconciliation List Screen | TC-RCL-053 | User without permission cannot access Stock Reconciliation | Access via Inventory > Stock Reconciliation | 1. Log in with a user that has no permission for Stock Reconciliation
2. Open the sidebar | Restricted user | The menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 54 | 2. Add Stock Reconciliation Screen | TC-RCA-001 | Open the Add Stock Reconciliation screen | Logged in with a user that has Stock Reconciliation access | 1. Click Inventory from the side menu
2. Click Stock Reconciliation
3. Click Add Stock Reconciliation | - | The Add Stock Reconciliation screen is displayed with an empty form | High | Positive | - |
| 55 | 2. Add Stock Reconciliation Screen | TC-RCA-002 | Series dropdown lists the series of the Stock Reconciliation doctype | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Series dropdown | - | All series added to the Stock Reconciliation doctype are listed | High | Positive | - |
| 56 | 2. Add Stock Reconciliation Screen | TC-RCA-003 | Select a Series | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select a Series | MAT-RECO-.YYYY.- | The value is accepted | High | Positive | - |
| 57 | 2. Add Stock Reconciliation Screen | TC-RCA-004 | Leave Series empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave Series empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Series is mandatory | High | Negative | - |
| 58 | 2. Add Stock Reconciliation Screen | TC-RCA-005 | Company is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Company and type part of a company name | Ahmed | The list is filtered while typing | High | Positive | - |
| 59 | 2. Add Stock Reconciliation Screen | TC-RCA-006 | Select a Company | Inventory > Stock Reconciliation > Add Stock Reconciliation | Search for and select a Company | Ahmed Ebrahim CO. | The value is accepted | High | Positive | - |
| 60 | 2. Add Stock Reconciliation Screen | TC-RCA-007 | Leave Company empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave Company empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Company is mandatory | High | Negative | - |
| 61 | 2. Add Stock Reconciliation Screen | TC-RCA-008 | Company search with no matching result | Inventory > Stock Reconciliation > Add Stock Reconciliation | Type a non-existing name in Company | ZZZ Unknown | No results are displayed | Low | Negative | - |
| 62 | 2. Add Stock Reconciliation Screen | TC-RCA-009 | Purpose dropdown lists the allowed values | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Purpose dropdown | - | The dropdown contains: Opening Stock, Stock Reconciliation (and an empty option) | High | Positive | Needs Clarification: SRS lists an 'Empty value' option while the field is mandatory. |
| 63 | 2. Add Stock Reconciliation Screen | TC-RCA-010 | Select Purpose = Opening Stock | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select Opening Stock | Opening Stock | The value is accepted and the Difference Account is set to Temporary Opening - C | High | Positive | - |
| 64 | 2. Add Stock Reconciliation Screen | TC-RCA-011 | Select Purpose = Stock Reconciliation | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select Stock Reconciliation | Stock Reconciliation | The value is accepted and the Difference Account is set to Stock Adjustment - C | High | Positive | - |
| 65 | 2. Add Stock Reconciliation Screen | TC-RCA-012 | Leave Purpose empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave Purpose empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Purpose is mandatory | High | Negative | - |
| 66 | 2. Add Stock Reconciliation Screen | TC-RCA-013 | Purpose accepts a single selection only | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select Opening Stock and then Stock Reconciliation | Both values | Only one value is selected; the second replaces the first | Low | Positive | - |
| 67 | 2. Add Stock Reconciliation Screen | TC-RCA-014 | Changing the Purpose updates the Difference Account | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select Opening Stock
2. Change to Stock Reconciliation | Temporary Opening - C > Stock Adjustment - C | The Difference Account changes to the account of the new purpose | High | Positive | - |
| 68 | 2. Add Stock Reconciliation Screen | TC-RCA-015 | Difference Account when the Purpose was changed manually | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Choose a custom Difference Account
2. Change the Purpose | Custom account | To be confirmed with the BA (custom account kept or replaced) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 69 | 2. Add Stock Reconciliation Screen | TC-RCA-016 | Posting Date and Posting Time are read-only by default | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Add screen and review the two fields | - | Both fields are read-only while Edit Posting And Date Time is unchecked | High | Positive | - |
| 70 | 2. Add Stock Reconciliation Screen | TC-RCA-017 | Posting Date default value is the current date | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Add screen | - | Posting Date shows the current date | High | Positive | - |
| 71 | 2. Add Stock Reconciliation Screen | TC-RCA-018 | Posting Time default value is the current time | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Add screen | - | Posting Time shows the current time | High | Positive | - |
| 72 | 2. Add Stock Reconciliation Screen | TC-RCA-019 | Enable Edit Posting And Date Time | Inventory > Stock Reconciliation > Add Stock Reconciliation | Check Edit Posting And Date Time | - | Posting Date and Posting Time become editable | High | Positive | - |
| 73 | 2. Add Stock Reconciliation Screen | TC-RCA-020 | Disable Edit Posting And Date Time | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Edit Posting And Date Time
2. Clear the checkbox | - | The two fields become read-only again | Medium | Positive | - |
| 74 | 2. Add Stock Reconciliation Screen | TC-RCA-021 | Select a Posting Date using the calendar | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Edit Posting And Date Time
2. Select a date | 2026-11-01 | The selected date is accepted | High | Positive | - |
| 75 | 2. Add Stock Reconciliation Screen | TC-RCA-022 | Select a Posting Time using the time picker | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Edit Posting And Date Time
2. Select a time | 10:30 | The selected time is accepted | High | Positive | - |
| 76 | 2. Add Stock Reconciliation Screen | TC-RCA-023 | Posting Date in the future | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Edit Posting And Date Time
2. Select a future date
3. Click Save | 2027-01-01 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define date validation. |
| 77 | 2. Add Stock Reconciliation Screen | TC-RCA-024 | Posting Date in a closed period | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Edit Posting And Date Time
2. Select a date in a closed period
3. Click Save | Closed period date | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 78 | 2. Add Stock Reconciliation Screen | TC-RCA-025 | Backdated reconciliation recalculates the later ledger entries | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a past posting date
2. Submit | Past date | A repost is queued and the later entries are recalculated | Medium | Positive | Needs Clarification: Not described in this SRS; see Repost Item Valuation. |
| 79 | 2. Add Stock Reconciliation Screen | TC-RCA-026 | Default Warehouse is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Default Warehouse and type part of a name | Stores | The list is filtered while typing | High | Positive | - |
| 80 | 2. Add Stock Reconciliation Screen | TC-RCA-027 | Default Warehouse lists only child warehouses | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Default Warehouse dropdown | Group: All Warehouses; child: Stores - E | Only child (non-group) warehouses are listed | High | Positive | - |
| 81 | 2. Add Stock Reconciliation Screen | TC-RCA-028 | Default Warehouse fills empty item rows only | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Add a row with warehouse A
2. Add a row with an empty warehouse
3. Select Default Warehouse B | A and B | Row 1 keeps A; row 2 is filled with B | High | Positive | - |
| 82 | 2. Add Stock Reconciliation Screen | TC-RCA-029 | Default Warehouse does not overwrite existing values | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select Default Warehouse A
2. Change it to B | A > B | Rows already filled with A keep A | High | Positive | Needs Clarification: Confirm whether rows filled automatically are refreshed when the default changes. |
| 83 | 2. Add Stock Reconciliation Screen | TC-RCA-030 | Leave Default Warehouse empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave it empty
2. Fill the rows with warehouses
3. Click Save | - | The record is saved (field is optional) | Medium | Positive | - |
| 84 | 2. Add Stock Reconciliation Screen | TC-RCA-031 | Scan Barcode accepts valid text | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter a barcode | 6221031260017 | The value is accepted | High | Positive | - |
| 85 | 2. Add Stock Reconciliation Screen | TC-RCA-032 | Leave Scan Barcode empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave it empty
2. Click Save | - | The record is saved (field is optional) | Medium | Positive | - |
| 86 | 2. Add Stock Reconciliation Screen | TC-RCA-033 | Scan Barcode shorter than the minimum length (1 character) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter 1 character in Scan Barcode | 6 | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 87 | 2. Add Stock Reconciliation Screen | TC-RCA-034 | Scan Barcode at the minimum length (2 characters) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter 2 characters | 62 | The value is accepted | Low | Positive | - |
| 88 | 2. Add Stock Reconciliation Screen | TC-RCA-035 | Scan Barcode at the maximum length (100 characters) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter exactly 100 characters | 100-character text | The value is accepted | Low | Positive | - |
| 89 | 2. Add Stock Reconciliation Screen | TC-RCA-036 | Scan Barcode longer than 100 characters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to enter 101 characters | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 90 | 2. Add Stock Reconciliation Screen | TC-RCA-037 | Scan Barcode accepts letters, numbers and special characters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter a mix of letters, numbers and special characters | ABC-123/x | The value is accepted | Medium | Positive | - |
| 91 | 2. Add Stock Reconciliation Screen | TC-RCA-038 | Scan Barcode scans with the device camera | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select the scan option
2. Scan a barcode with the camera | Item barcode | The camera opens and the field is filled with the scanned value | Medium | Positive | - |
| 92 | 2. Add Stock Reconciliation Screen | TC-RCA-039 | Scan Barcode typed slowly is cleared | Inventory > Stock Reconciliation > Add Stock Reconciliation | Type a barcode manually at a slow speed | 6221031260017 typed slowly | The entered value is cleared automatically | Medium | Negative | - |
| 93 | 2. Add Stock Reconciliation Screen | TC-RCA-040 | Scan Mode: each successful scan increases the Quantity by 1 | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Scan Mode
2. Scan a valid barcode three times | Barcode of Coffee Mug x3 | The item row is added (or updated) with Quantity = 3 | High | Positive | - |
| 94 | 2. Add Stock Reconciliation Screen | TC-RCA-041 | Scan Mode: Quantity cannot be entered manually | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Scan Mode
2. Try to type in Quantity | - | Quantity is read-only | High | Negative | - |
| 95 | 2. Add Stock Reconciliation Screen | TC-RCA-042 | Scan Mode disables auto fetching of the existing quantity | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Scan Mode
2. Add an item row | Item with stock 20 | The Quantity is not filled with the existing quantity | High | Positive | - |
| 96 | 2. Add Stock Reconciliation Screen | TC-RCA-043 | Scan Mode checked without scanning any barcode | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Scan Mode
2. Do not scan
3. Click Save | - | An error message is displayed | High | Negative | - |
| 97 | 2. Add Stock Reconciliation Screen | TC-RCA-044 | Unchecking Scan Mode makes the Quantity editable again | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Scan Mode
2. Clear the checkbox | - | Quantity becomes editable | Medium | Positive | - |
| 98 | 2. Add Stock Reconciliation Screen | TC-RCA-045 | Scanning an unknown barcode | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Scan Mode
2. Scan an unknown barcode | Unknown barcode | A clear error message is displayed and no row is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 99 | 2. Add Stock Reconciliation Screen | TC-RCA-046 | Items table displays the default columns | Inventory > Stock Reconciliation > Add Stock Reconciliation | Review the items table | - | The default columns are displayed (Checkbox, No., Item Code, Warehouse, Current Qty, Quantity, Stock UOM, Valuation Rate) | Medium | UI | Needs Clarification: Batch No appears only for batch items. |
| 100 | 2. Add Stock Reconciliation Screen | TC-RCA-047 | Add Row adds a new item row | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Add Row in the items table | - | A new empty row is added to the table | High | Positive | - |
| 101 | 2. Add Stock Reconciliation Screen | TC-RCA-048 | Item rows are numbered in order | Inventory > Stock Reconciliation > Add Stock Reconciliation | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 102 | 2. Add Stock Reconciliation Screen | TC-RCA-049 | Item Code is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Item Code and type part of an item code | STO-ITEM | The list is filtered while typing | High | Positive | - |
| 103 | 2. Add Stock Reconciliation Screen | TC-RCA-050 | Select an Item Code | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select an item in a row | STO-ITEM-2026-00074 | The value is accepted and Stock UOM is filled | High | Positive | - |
| 104 | 2. Add Stock Reconciliation Screen | TC-RCA-051 | Leave Item Code empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Add a row
2. Leave Item Code empty
3. Click Save | - | An error message is displayed because Item Code is mandatory | High | Negative | - |
| 105 | 2. Add Stock Reconciliation Screen | TC-RCA-052 | Item search with no matching result | Inventory > Stock Reconciliation > Add Stock Reconciliation | Type a non-existing item | ZZZ Unknown | No results are displayed | Low | Negative | - |
| 106 | 2. Add Stock Reconciliation Screen | TC-RCA-053 | Non-stock items in a Stock Reconciliation | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Item Code dropdown | Delivery Service (Maintain Stock off) | To be confirmed with the BA (non-stock items hidden or rejected) | Medium | Negative | Needs Clarification: SRS does not filter the Item Code by Maintain Stock. |
| 107 | 2. Add Stock Reconciliation Screen | TC-RCA-054 | Same item and warehouse in two rows | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Add two rows with the same item and warehouse
2. Click Save | Item A / Stores - E (x2) | To be confirmed with the BA (blocked or allowed) | High | Negative | Needs Clarification: SRS does not define duplicates. |
| 108 | 2. Add Stock Reconciliation Screen | TC-RCA-055 | Warehouse (row) is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Warehouse in a row and type part of a name | Stores | The list is filtered while typing | High | Positive | - |
| 109 | 2. Add Stock Reconciliation Screen | TC-RCA-056 | Warehouse (row) lists only child warehouses | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the dropdown | Group warehouse; child warehouse | Only child warehouses are listed | High | Positive | - |
| 110 | 2. Add Stock Reconciliation Screen | TC-RCA-057 | Leave Warehouse (row) empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Add a row with an item
2. Clear Warehouse
3. Click Save | - | An error message is displayed because Warehouse is mandatory | High | Negative | - |
| 111 | 2. Add Stock Reconciliation Screen | TC-RCA-058 | Row Warehouse takes priority over the Default Warehouse | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a Default Warehouse
2. Select a different warehouse in the row | Default A; row B | The row keeps B | High | Positive | - |
| 112 | 2. Add Stock Reconciliation Screen | TC-RCA-059 | Current Qty is the actual quantity for a normal item | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select an item with 20 in Stores - E
2. Review Current Qty | Actual 20 | Current Qty shows 20 and cannot be edited | High | Positive | - |
| 113 | 2. Add Stock Reconciliation Screen | TC-RCA-060 | Current Qty updates when the warehouse changes | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select warehouse A
2. Change to warehouse B | 20 > 5 | Current Qty shows the quantity of warehouse B | Medium | Positive | - |
| 114 | 2. Add Stock Reconciliation Screen | TC-RCA-061 | Current Qty for an item with no stock in the warehouse | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select an item that has no stock in the warehouse | Actual 0 | Current Qty shows 0 | Medium | Positive | - |
| 115 | 2. Add Stock Reconciliation Screen | TC-RCA-062 | Batch No column appears for a batch item | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a batch item | Milk 1L | The Batch No column is displayed and Current Qty is 0 | High | Positive | - |
| 116 | 2. Add Stock Reconciliation Screen | TC-RCA-063 | Selecting a batch fetches the batch quantity | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a batch item
2. Select a batch | BATCH-A: 6 | Current Qty shows the quantity of the batch (6) | High | Positive | - |
| 117 | 2. Add Stock Reconciliation Screen | TC-RCA-064 | Batch No column is hidden for a normal item | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a normal item | Coffee Mug | The Batch No column is not displayed | Medium | UI | - |
| 118 | 2. Add Stock Reconciliation Screen | TC-RCA-065 | Quantity accepts a valid number | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter a valid number in Quantity | 25 | The value is accepted | High | Positive | - |
| 119 | 2. Add Stock Reconciliation Screen | TC-RCA-066 | Quantity default value is zero | Inventory > Stock Reconciliation > Add Stock Reconciliation | Add a row and review Quantity | - | Quantity shows the default value Zero | Medium | Positive | Needs Clarification: A default of 0 (1 character) conflicts with the 2-character minimum. |
| 120 | 2. Add Stock Reconciliation Screen | TC-RCA-067 | Leave Quantity empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Add a row with an item and a warehouse
2. Clear Quantity
3. Click Save | - | An error message is displayed because Quantity is mandatory | High | Negative | - |
| 121 | 2. Add Stock Reconciliation Screen | TC-RCA-068 | Quantity shorter than the minimum length (1 digit) | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter 1 digit in Quantity
2. Click Save | 5 | An error message is displayed because the minimum length is 2 characters | High | Negative | Needs Clarification: The 2-character minimum blocks valid single-digit quantities (1 to 9). Confirm if this is intended. |
| 122 | 2. Add Stock Reconciliation Screen | TC-RCA-069 | Quantity at the minimum length (2 digits) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter 2 digits in Quantity | 10 | The value is accepted | Medium | Positive | - |
| 123 | 2. Add Stock Reconciliation Screen | TC-RCA-070 | Quantity rejects letters and special characters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Type letters and special characters in Quantity | abc, @# | Only numbers are accepted | Medium | Negative | - |
| 124 | 2. Add Stock Reconciliation Screen | TC-RCA-071 | Quantity at the maximum length (100 digits) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter exactly 100 digits in Quantity | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 125 | 2. Add Stock Reconciliation Screen | TC-RCA-072 | Quantity longer than 100 characters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to enter 101 digits in Quantity | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 126 | 2. Add Stock Reconciliation Screen | TC-RCA-073 | Quantity equal to zero | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter 00 in Quantity
2. Click Save | 0 | The record is saved and the item stock is reduced to zero | High | Positive | Needs Clarification: SRS gives Quantity a default of Zero, so zero is valid. |
| 127 | 2. Add Stock Reconciliation Screen | TC-RCA-074 | Quantity with a negative number | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to type a negative number in Quantity | -10 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 128 | 2. Add Stock Reconciliation Screen | TC-RCA-075 | Quantity with decimal values | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter a decimal number in Quantity
2. Click Save | 10.5 | To be confirmed with the BA (accepted or rejected) | Medium | Positive | Needs Clarification: SRS says 'numbers only'. |
| 129 | 2. Add Stock Reconciliation Screen | TC-RCA-076 | Quantity equal to the Current Qty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter a Quantity equal to the Current Qty
2. Click Save | Current 20; Quantity 20 | The record is saved (no difference) | Medium | Positive | - |
| 130 | 2. Add Stock Reconciliation Screen | TC-RCA-077 | Stock UOM is a read-only label | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select an item and try to edit Stock UOM | Nos | Stock UOM shows the default UOM of the item and cannot be edited | Medium | UI | - |
| 131 | 2. Add Stock Reconciliation Screen | TC-RCA-078 | Valuation Rate accepts a valid number | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter a valid number in Valuation Rate | 55 | The value is accepted | High | Positive | - |
| 132 | 2. Add Stock Reconciliation Screen | TC-RCA-079 | Leave Valuation Rate empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave Valuation Rate empty
2. Click Save | - | The record is saved (field is optional); the current valuation rate is used | High | Positive | - |
| 133 | 2. Add Stock Reconciliation Screen | TC-RCA-080 | Valuation Rate shorter than the minimum length (1 digit) | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter 1 digit in Valuation Rate
2. Click Save | 5 | An error message is displayed because the minimum length is 2 characters | Medium | Negative | Needs Clarification: The 2-character minimum blocks single-digit rates. |
| 134 | 2. Add Stock Reconciliation Screen | TC-RCA-081 | Valuation Rate rejects letters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Type letters in Valuation Rate | abc | Only numbers are accepted | Medium | Negative | - |
| 135 | 2. Add Stock Reconciliation Screen | TC-RCA-082 | Valuation Rate at the maximum length (100 digits) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter exactly 100 digits | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 136 | 2. Add Stock Reconciliation Screen | TC-RCA-083 | Valuation Rate longer than 100 characters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to enter 101 digits | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 137 | 2. Add Stock Reconciliation Screen | TC-RCA-084 | Valuation Rate with decimals | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter a decimal rate
2. Click Save | 55.75 | To be confirmed with the BA (accepted or rejected) | High | Positive | Needs Clarification: SRS says 'numbers only'; rates normally need decimals. |
| 138 | 2. Add Stock Reconciliation Screen | TC-RCA-085 | Valuation Rate is required for a new item with no stock | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select an item with no stock
2. Enter Quantity 10
3. Leave Valuation Rate empty
4. Click Submit | No stock; no rate | A validation error is displayed because the valuation rate is missing | High | Negative | Needs Clarification: Valuation Rate is optional in the SRS; confirm the behavior for items without a rate (Allow Zero Valuation Rate). |
| 139 | 2. Add Stock Reconciliation Screen | TC-RCA-086 | Action bar appears when an item row is selected | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select the checkbox of an item row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 140 | 2. Add Stock Reconciliation Screen | TC-RCA-087 | Delete a single item row | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select one row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 141 | 2. Add Stock Reconciliation Screen | TC-RCA-088 | Delete multiple item rows | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select two rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 142 | 2. Add Stock Reconciliation Screen | TC-RCA-089 | Items: Open the table Settings popup | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Setting on the Items table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 143 | 2. Add Stock Reconciliation Screen | TC-RCA-090 | Items: Reorder columns using drag and drop | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Setting
2. Drag the Warehouse column header and drop it before Item Code | - | The column order changes to the new position | Medium | Positive | - |
| 144 | 2. Add Stock Reconciliation Screen | TC-RCA-091 | Items: Column width default value is 3 | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 145 | 2. Add Stock Reconciliation Screen | TC-RCA-092 | Items: Column width accepts numbers only | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 146 | 2. Add Stock Reconciliation Screen | TC-RCA-093 | Items: Column width left empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 147 | 2. Add Stock Reconciliation Screen | TC-RCA-094 | Items: Column width with 1 character | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 148 | 2. Add Stock Reconciliation Screen | TC-RCA-095 | Items: Column width longer than 3 characters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 149 | 2. Add Stock Reconciliation Screen | TC-RCA-096 | Items: Add / Remove Columns popup lists all columns | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Item Code, Warehouse, Current Qty, Quantity, Stock UOM, Valuation Rate) | Medium | UI | Needs Clarification: SRS lists about 30 optional columns. Confirm the default visible columns. |
| 150 | 2. Add Stock Reconciliation Screen | TC-RCA-097 | Items: Hide a column | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Add / Remove columns
2. Clear the Valuation Rate checkbox
3. Click Update | Column: Valuation Rate | The Valuation Rate column is hidden from the table | Medium | Positive | - |
| 151 | 2. Add Stock Reconciliation Screen | TC-RCA-098 | Items: Show a hidden column | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Hide the Valuation Rate column
2. Open Add / Remove columns
3. Select the Valuation Rate checkbox
4. Click Update | Column: Valuation Rate | The Valuation Rate column is displayed again | Medium | Positive | - |
| 152 | 2. Add Stock Reconciliation Screen | TC-RCA-099 | Items: Save the Settings using Update | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 153 | 2. Add Stock Reconciliation Screen | TC-RCA-100 | Items: Reset Settings to default | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 154 | 2. Add Stock Reconciliation Screen | TC-RCA-101 | Items: open the Edit Row popup | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click the Edit Row icon of an item row | - | A popup is displayed with the row fields | High | Positive | - |
| 155 | 2. Add Stock Reconciliation Screen | TC-RCA-102 | Items Edit Row: Barcode accepts valid text | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter a barcode | 6221031260017 | The value is accepted | Medium | Positive | - |
| 156 | 2. Add Stock Reconciliation Screen | TC-RCA-103 | Items Edit Row: Barcode shorter than the minimum length (1 character) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter 1 character | 6 | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 157 | 2. Add Stock Reconciliation Screen | TC-RCA-104 | Items Edit Row: Barcode longer than 100 characters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to enter 101 characters | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 158 | 2. Add Stock Reconciliation Screen | TC-RCA-105 | Items Edit Row: Has Item Scanned appears only for scanned items | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Scan an item barcode
2. Open Edit Row of the scanned row and of a manual row | - | Has Item Scanned (read-only) is displayed and checked only for the scanned row | Medium | Positive | - |
| 159 | 2. Add Stock Reconciliation Screen | TC-RCA-106 | Items Edit Row: Warehouse is mandatory | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Edit Row
2. Clear Warehouse
3. Click Update | - | An error message is displayed because Warehouse is mandatory | Medium | Negative | - |
| 160 | 2. Add Stock Reconciliation Screen | TC-RCA-107 | Items Edit Row: Item Code is mandatory | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Edit Row
2. Clear Item Code
3. Click Update | - | An error message is displayed because Item Code is mandatory | Medium | Negative | - |
| 161 | 2. Add Stock Reconciliation Screen | TC-RCA-108 | Items Edit Row: Quantity is mandatory and numeric | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Edit Row
2. Clear Quantity / type letters
3. Click Update | abc | An error message is displayed for the empty value; letters are rejected | Medium | Negative | - |
| 162 | 2. Add Stock Reconciliation Screen | TC-RCA-109 | Items Edit Row: Item Name and Item Group are read-only labels | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select an item and review the two labels | Coffee Mug; Consumer Goods | Both are displayed only after an item is selected and cannot be edited | Medium | UI | - |
| 163 | 2. Add Stock Reconciliation Screen | TC-RCA-110 | Items Edit Row: Valuation Rate is optional and numeric | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Edit Row
2. Leave Valuation Rate empty / type letters | abc | Empty is accepted; letters are rejected | Medium | Negative | - |
| 164 | 2. Add Stock Reconciliation Screen | TC-RCA-111 | Items Edit Row: Allow Zero Valuation Rate | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Allow Zero Valuation Rate
2. Set Valuation Rate to 00
3. Submit | Rate: 00 | The record is submitted with a zero valuation rate | Medium | Positive | - |
| 165 | 2. Add Stock Reconciliation Screen | TC-RCA-112 | Items Edit Row: Zero valuation rate without the checkbox | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave Allow Zero Valuation Rate unchecked
2. Set the rate to 00
3. Click Submit | Rate: 00 | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS (standard behavior). |
| 166 | 2. Add Stock Reconciliation Screen | TC-RCA-113 | Items Edit Row: Amount = Quantity x Valuation Rate | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Quantity 25
2. Valuation Rate 55 | 25 x 55 | Amount shows 1,375 | High | Positive | - |
| 167 | 2. Add Stock Reconciliation Screen | TC-RCA-114 | Items Edit Row: Amount is a read-only label | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to edit Amount | - | Amount cannot be edited | Medium | UI | - |
| 168 | 2. Add Stock Reconciliation Screen | TC-RCA-115 | Items Edit Row: Pick Serial / Batch No is hidden when the Inventory Settings option is off | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Disable 'Activate Serial / Batch No for item' in Inventory Settings
2. Open Edit Row | Setting: off | The Pick Serial / Batch No button is not displayed | High | Positive | - |
| 169 | 2. Add Stock Reconciliation Screen | TC-RCA-116 | Items Edit Row: Pick Serial / Batch No is displayed when the option is on | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enable 'Activate Serial / Batch No for item' in Inventory Settings
2. Open Edit Row | Setting: on | The Pick Serial / Batch No button is displayed | High | Positive | - |
| 170 | 2. Add Stock Reconciliation Screen | TC-RCA-117 | Items Edit Row: Pick Serial / Batch No selects numbers using the picking method | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Set the picking method to FIFO
2. Click Pick Serial / Batch No for a serialized item | Item: Laptop X1; Quantity 2; FIFO | The oldest 2 serial numbers are selected automatically | High | Positive | - |
| 171 | 2. Add Stock Reconciliation Screen | TC-RCA-118 | Items Edit Row: Pick Serial / Batch No with the Expiry method | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Set the picking method to Expiry
2. Click Pick Serial / Batch No for a batch item | Batches with different expiry dates | The batches with the nearest expiry are selected first | High | Positive | - |
| 172 | 2. Add Stock Reconciliation Screen | TC-RCA-119 | Items Edit Row: Serial and Batch Bundle is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Serial and Batch Bundle and type part of a name | SABB | The list is filtered and the selection is accepted (optional) | Medium | Positive | - |
| 173 | 2. Add Stock Reconciliation Screen | TC-RCA-120 | Items Edit Row: Current Serial / Batch Bundle appears only after saving | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Edit Row before and after saving | - | Current Serial / Batch Bundle (read-only) is displayed only after saving and shows the bundle of the transaction | Medium | Positive | - |
| 174 | 2. Add Stock Reconciliation Screen | TC-RCA-121 | Items Edit Row: Use Serial No / Batch Fields hides the picker and bundle | Inventory > Stock Reconciliation > Add Stock Reconciliation | Check Use Serial No / Batch Fields | - | The Pick button and the bundle field are hidden; Serial No and Batch No are displayed | High | Positive | - |
| 175 | 2. Add Stock Reconciliation Screen | TC-RCA-122 | Items Edit Row: Serial No / Batch No are hidden when the checkbox is unchecked | Inventory > Stock Reconciliation > Add Stock Reconciliation | Leave Use Serial No / Batch Fields unchecked | - | Serial No and Batch No are not displayed | Medium | UI | - |
| 176 | 2. Add Stock Reconciliation Screen | TC-RCA-123 | Items Edit Row: Reconcile All Serial Nos / Batches is hidden and checked by default | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open Edit Row of a serialized item | - | The checkbox is hidden and checked by default | Medium | Positive | Needs Clarification: SRS does not explain the effect of this hidden option. |
| 177 | 2. Add Stock Reconciliation Screen | TC-RCA-124 | Items Edit Row: Serial No accepts a valid serial number | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Use Serial No / Batch Fields
2. Enter a serial number | SN-0001 | The value is accepted | High | Positive | - |
| 178 | 2. Add Stock Reconciliation Screen | TC-RCA-125 | Items Edit Row: Serial No: Enter key creates a new line | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter a serial number
2. Press Enter
3. Enter another serial number | SN-0001, SN-0002 | A new line is created for each serial number | High | Positive | - |
| 179 | 2. Add Stock Reconciliation Screen | TC-RCA-126 | Items Edit Row: Serial No shorter than the minimum length (2 characters) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter 2 characters in Serial No | SN | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 180 | 2. Add Stock Reconciliation Screen | TC-RCA-127 | Items Edit Row: Serial No at the maximum length (500 characters) | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter exactly 500 characters | 500-character text | The value is accepted | Low | Positive | - |
| 181 | 2. Add Stock Reconciliation Screen | TC-RCA-128 | Items Edit Row: Serial No longer than 500 characters | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to enter 501 characters | 501-character text | Input stops at 500 characters | Low | Negative | - |
| 182 | 2. Add Stock Reconciliation Screen | TC-RCA-129 | Items Edit Row: Serial No rejects invalid data | Inventory > Stock Reconciliation > Add Stock Reconciliation | Enter script tags | <script>x</script> | An error message is displayed | Medium | Negative | - |
| 183 | 2. Add Stock Reconciliation Screen | TC-RCA-130 | Items Edit Row: Serial numbers count must match the Quantity | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Quantity 3
2. Enter only 2 serial numbers
3. Click Save | Quantity 3; 2 serials | A validation error is displayed | High | Negative | Needs Clarification: Not defined in the SRS. |
| 184 | 2. Add Stock Reconciliation Screen | TC-RCA-131 | Items Edit Row: Batch No is a searchable dropdown filtered by item and warehouse | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Check Use Serial No / Batch Fields
2. Open Batch No | Item: Milk 1L; Warehouse: Stores - E | Only batches of the item in the selected warehouse are listed | High | Positive | - |
| 185 | 2. Add Stock Reconciliation Screen | TC-RCA-132 | Items Edit Row: Select a Batch No | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select a batch | BATCH-A | The value is accepted | High | Positive | - |
| 186 | 2. Add Stock Reconciliation Screen | TC-RCA-133 | Items Edit Row: Selecting a batch does not fetch its serial numbers | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a batch of a serialized batch item | BATCH-A with SN-0001..3 | The Serial No field stays empty so the user enters the serial numbers manually | High | Positive | - |
| 187 | 2. Add Stock Reconciliation Screen | TC-RCA-134 | Items Edit Row: Current Qty is a read-only label | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open Edit Row | Current 20 | Current Qty shows the quantity (or batch quantity) and cannot be edited | Medium | UI | - |
| 188 | 2. Add Stock Reconciliation Screen | TC-RCA-135 | Items Edit Row: Current Amount, Current Valuation Rate and Current Serial No are read-only | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open Edit Row of a stocked item | Amount 1,000; Rate 50 | The three labels show the current values and cannot be edited | Medium | UI | - |
| 189 | 2. Add Stock Reconciliation Screen | TC-RCA-136 | Items Edit Row: Quantity Difference = Quantity - Current Quantity | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Current Qty 20
2. Quantity 25 | 25 - 20 | Quantity Difference shows 5 | High | Positive | - |
| 190 | 2. Add Stock Reconciliation Screen | TC-RCA-137 | Items Edit Row: Quantity Difference is negative when the quantity is lower | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Current Qty 20
2. Quantity 12 | 12 - 20 | Quantity Difference shows -8 | High | Positive | - |
| 191 | 2. Add Stock Reconciliation Screen | TC-RCA-138 | Items Edit Row: Amount Difference is displayed | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Quantity 25 at 55
2. Current amount 1,000 | 1,375 - 1,000 | Amount Difference shows 375 | High | Positive | - |
| 192 | 2. Add Stock Reconciliation Screen | TC-RCA-139 | Items Edit Row: Difference Account is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Type part of an account name | Stock Adjustment | The list is filtered and the selection is accepted (optional) | Medium | Positive | - |
| 193 | 2. Add Stock Reconciliation Screen | TC-RCA-140 | Items Edit Row: Cost Center and Project | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select a Cost Center and a Project | Main - STC; Warehouse Expansion | Both values are accepted (optional) | Medium | Positive | - |
| 194 | 2. Add Stock Reconciliation Screen | TC-RCA-141 | Items Edit Row: save changes with Update | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Open Edit Row
2. Change Quantity and Valuation Rate
3. Click Update | Quantity 25; Rate 55 | The popup closes and the changes are reflected in the row | High | Positive | - |
| 195 | 2. Add Stock Reconciliation Screen | TC-RCA-142 | Difference Account is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Difference Account and type part of an account name | Stock Adjustment | The list is filtered while typing | Medium | Positive | - |
| 196 | 2. Add Stock Reconciliation Screen | TC-RCA-143 | Difference Account for Opening Stock | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select Purpose = Opening Stock | Opening Stock | The Difference Account is set to Temporary Opening - C | High | Positive | - |
| 197 | 2. Add Stock Reconciliation Screen | TC-RCA-144 | Difference Account for Stock Reconciliation | Inventory > Stock Reconciliation > Add Stock Reconciliation | Select Purpose = Stock Reconciliation | Stock Reconciliation | The Difference Account is set to Stock Adjustment - C | High | Positive | - |
| 198 | 2. Add Stock Reconciliation Screen | TC-RCA-145 | Difference Account can be changed manually | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select another account | Cost of Goods Sold | The value is accepted (field is optional) | Medium | Positive | - |
| 199 | 2. Add Stock Reconciliation Screen | TC-RCA-146 | Clearing the Difference Account | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Clear the Difference Account
2. Click Submit | - | To be confirmed with the BA (the default account is used or a validation error is shown) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 200 | 2. Add Stock Reconciliation Screen | TC-RCA-147 | Difference Amount is the sum of the row differences | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Row 1 difference +375
2. Row 2 difference -100 | 375 - 100 | Difference Amount shows 275 | High | Positive | - |
| 201 | 2. Add Stock Reconciliation Screen | TC-RCA-148 | Difference Amount is a read-only label | Inventory > Stock Reconciliation > Add Stock Reconciliation | Try to edit Difference Amount | - | Difference Amount cannot be edited | Medium | UI | - |
| 202 | 2. Add Stock Reconciliation Screen | TC-RCA-149 | Difference Amount is zero with no rows | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Add screen without rows | - | Difference Amount shows 0 | Low | Positive | - |
| 203 | 2. Add Stock Reconciliation Screen | TC-RCA-150 | Cost Center (header) is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Cost Center and type part of a name | Main | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 204 | 2. Add Stock Reconciliation Screen | TC-RCA-151 | Amended From is hidden on a new record | Inventory > Stock Reconciliation > Add Stock Reconciliation | Review the form of a new record | - | The Amended From field is not displayed | Medium | UI | - |
| 205 | 2. Add Stock Reconciliation Screen | TC-RCA-152 | Fetch Items From Warehouse button is displayed | Inventory > Stock Reconciliation > Add Stock Reconciliation | Review the page actions | - | The Fetch Items From Warehouse button is displayed | High | UI | - |
| 206 | 2. Add Stock Reconciliation Screen | TC-RCA-153 | Open the Fetch Items From Warehouse popup | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Fetch Items From Warehouse | - | A popup is displayed with Warehouse, Item, Ignore Empty Stock and Update | High | Positive | - |
| 207 | 2. Add Stock Reconciliation Screen | TC-RCA-154 | Fetch popup: Warehouse is a searchable dropdown of child warehouses | Inventory > Stock Reconciliation > Add Stock Reconciliation | Open the Warehouse dropdown in the popup | Group warehouse; child warehouse | Only child warehouses are listed | High | Positive | - |
| 208 | 2. Add Stock Reconciliation Screen | TC-RCA-155 | Fetch popup: Leave Warehouse empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave Warehouse empty
2. Click Update | - | An error message is displayed because Warehouse is mandatory | High | Negative | - |
| 209 | 2. Add Stock Reconciliation Screen | TC-RCA-156 | Fetch popup: Item is a searchable dropdown | Inventory > Stock Reconciliation > Add Stock Reconciliation | Click Item and type part of an item code | STO-ITEM | The list is filtered while typing (optional) | Medium | Positive | - |
| 210 | 2. Add Stock Reconciliation Screen | TC-RCA-157 | Fetch popup: warehouse and item selected | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a Warehouse and an Item
2. Click Update | Stores - E; STO-ITEM-2026-00074 | Only the selected item and warehouse are added to the items table | High | Positive | - |
| 211 | 2. Add Stock Reconciliation Screen | TC-RCA-158 | Fetch popup: only a warehouse selected | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a Warehouse only
2. Click Update | Stores - E | All items available in the warehouse are added to the items table | High | Positive | - |
| 212 | 2. Add Stock Reconciliation Screen | TC-RCA-159 | Fetch popup: Ignore Empty Stock checked | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a Warehouse
2. Check Ignore Empty Stock
3. Click Update | Stores - E with an empty item | Items with zero stock are not fetched | High | Positive | - |
| 213 | 2. Add Stock Reconciliation Screen | TC-RCA-160 | Fetch popup: Ignore Empty Stock unchecked | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a Warehouse
2. Leave Ignore Empty Stock unchecked
3. Click Update | Stores - E with an empty item | Items with zero stock are fetched too | Medium | Positive | - |
| 214 | 2. Add Stock Reconciliation Screen | TC-RCA-161 | Fetch popup: warehouse with no items | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select an empty warehouse
2. Click Update | Empty warehouse | A message is displayed and no rows are added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 215 | 2. Add Stock Reconciliation Screen | TC-RCA-162 | Fetched rows show the Current Qty and Quantity | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Fetch the items of a warehouse | Item A current 20 | Each row shows Current Qty and the Quantity filled with the current value (when Scan Mode is off) | High | Positive | Needs Clarification: SRS says Scan Mode disables auto fetching of the existing quantity, implying it is filled otherwise. |
| 216 | 2. Add Stock Reconciliation Screen | TC-RCA-163 | Fetch twice for the same warehouse | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Fetch the items of a warehouse
2. Fetch them again | Stores - E | To be confirmed with the BA (items refreshed or duplicated) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 217 | 2. Add Stock Reconciliation Screen | TC-RCA-164 | Fetch batch items from a warehouse | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Fetch a warehouse that contains batch items | Milk 1L: BATCH-A 6, BATCH-B 4 | A row per batch is added with the batch quantity | Medium | Positive | Needs Clarification: SRS does not describe fetching of batch / serial items. |
| 218 | 2. Add Stock Reconciliation Screen | TC-RCA-165 | Serial numbers from different batches in the same row | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter serial numbers that belong to different batches in one row
2. Click Save | SN-0001 (BATCH-A), SN-0004 (BATCH-B) | The error 'You have entered serial numbers from multiple batches in the same row' is displayed | High | Negative | - |
| 219 | 2. Add Stock Reconciliation Screen | TC-RCA-166 | Reserved item without batch or serial: quantity equal to the reserved quantity | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Reserve 4 units of an item
2. Enter Quantity = 4
3. Click Save | Reserved 4; Quantity 4 | The record is saved | High | Positive | - |
| 220 | 2. Add Stock Reconciliation Screen | TC-RCA-167 | Reserved item without batch or serial: quantity greater than the reserved quantity | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Reserve 4 units
2. Enter Quantity = 10
3. Click Save | Reserved 4; Quantity 10 | The record is saved | High | Positive | - |
| 221 | 2. Add Stock Reconciliation Screen | TC-RCA-168 | Reserved item without batch or serial: quantity less than the reserved quantity | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Reserve 4 units
2. Enter Quantity = 2
3. Click Save | Reserved 4; Quantity 2 | The error 'The entered quantity doesn't cover the reserved quantity, please cancel the reservation first or increase the quantity to cover the reserved quantity' is displayed | High | Negative | - |
| 222 | 2. Add Stock Reconciliation Screen | TC-RCA-169 | Reserved serial item: all reserved serial numbers included | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Reserve serial numbers SN-0001, SN-0002
2. Enter serial numbers SN-0001, SN-0002, SN-0003
3. Click Save | Reserved SN-0001, SN-0002 | The record is saved | High | Positive | - |
| 223 | 2. Add Stock Reconciliation Screen | TC-RCA-170 | Reserved serial item: a reserved serial number is missing | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Reserve serial numbers SN-0001, SN-0002
2. Enter only SN-0001
3. Click Save | Reserved SN-0001, SN-0002 | The error 'The entered serial numbers do not include all reserved serial numbers. Please cancel the reservation first or update the entered serial numbers to include the reserved quantity' is displayed | High | Negative | - |
| 224 | 2. Add Stock Reconciliation Screen | TC-RCA-171 | Cancelling the reservation removes the validation error | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Cancel the Stock Reservation Entry
2. Save the same record again | Reservation cancelled | The record is saved | Medium | Positive | - |
| 225 | 2. Add Stock Reconciliation Screen | TC-RCA-172 | Item without a reservation is not validated against reservations | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Enter any quantity for an unreserved item
2. Click Save | No reservation | The record is saved | Medium | Positive | - |
| 226 | 2. Add Stock Reconciliation Screen | TC-RCA-173 | Save a Stock Reconciliation with valid data | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Select a Series, Company and Purpose
2. Add an item row with warehouse and quantity
3. Click Save | Series: MAT-RECO-.YYYY.-; Company: Ahmed Ebrahim CO.; Purpose: Stock Reconciliation; Item: STO-ITEM-2026-00074; Stores - E; Quantity 25 | The record is saved (not submitted), added to the list with status Draft | High | Positive | - |
| 227 | 2. Add Stock Reconciliation Screen | TC-RCA-174 | Save with all mandatory fields empty | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Leave the form empty
2. Click Save | - | A validation error message is displayed for each mandatory field (Series, Company, Purpose, Item Code, Warehouse, Quantity) | High | Negative | - |
| 228 | 2. Add Stock Reconciliation Screen | TC-RCA-175 | Save a record with no item rows | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Fill the header
2. Do not add rows
3. Click Save | No rows | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one item is required. |
| 229 | 2. Add Stock Reconciliation Screen | TC-RCA-176 | Saved data is displayed correctly when reopened | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Save a valid record
2. Open it from the list | MAT-RECO-2026-00001 | All saved values are displayed correctly | High | Positive | - |
| 230 | 2. Add Stock Reconciliation Screen | TC-RCA-177 | Submit button is displayed only after Save | Inventory > Stock Reconciliation > Add Stock Reconciliation | 1. Click Save on a valid record
2. Review the buttons | - | The Submit button is displayed after saving | High | Positive | - |
| 231 | 2. Add Stock Reconciliation Screen | TC-RCA-178 | Submit button is hidden before Save | Inventory > Stock Reconciliation > Add Stock Reconciliation | Review the buttons on a new unsaved record | - | The Submit button is not displayed | Medium | Negative | - |
| 232 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-001 | Submit a reconciliation that increases the stock | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Current Qty 20
2. Enter Quantity 25
3. Save and click Submit | 20 > 25 | The record is submitted (status Submitted) and the stock becomes 25 | High | Positive | - |
| 233 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-002 | Submit a reconciliation that decreases the stock | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Current Qty 20
2. Enter Quantity 12
3. Save and click Submit | 20 > 12 | The record is submitted and the stock becomes 12 | High | Positive | - |
| 234 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-003 | Submit a reconciliation that sets the stock to zero | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Current Qty 20
2. Enter Quantity 00
3. Save and click Submit | 20 > 0 | The record is submitted and the stock becomes 0 | High | Positive | - |
| 235 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-004 | Submit a reconciliation with an unchanged quantity and rate | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Enter the same Quantity and Valuation Rate
2. Click Submit | 20 = 20 | To be confirmed with the BA (accepted with no ledger entry, or an error) | Medium | Positive | Needs Clarification: Not defined in the SRS. |
| 236 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-005 | Submit changes only the valuation rate | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Keep the quantity
2. Change the Valuation Rate
3. Click Submit | Rate 50 > 60 | The record is submitted and the stock value is updated without a quantity change | High | Positive | - |
| 237 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-006 | Submit with Purpose = Opening Stock | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Select Opening Stock
2. Enter quantities
3. Submit | Temporary Opening - C | The record is submitted and the difference is posted to the Temporary Opening account | High | Positive | - |
| 238 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-007 | Submit with Purpose = Stock Reconciliation | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Select Stock Reconciliation
2. Enter quantities
3. Submit | Stock Adjustment - C | The record is submitted and the difference is posted to the Stock Adjustment account | High | Positive | - |
| 239 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-008 | Submit creates a Stock Ledger Entry for each changed row | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Submit a reconciliation with two changed rows
2. Open the Stock Ledger Entry list | 2 rows | A Stock Ledger Entry is created for each row with Qty Change = Quantity Difference | High | Positive | - |
| 240 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-009 | Submit updates the BIN | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Submit a reconciliation
2. Open the Bin | 20 > 25 | The Bin Actual Qty, Valuation Rate and Stock Value are updated | High | Positive | - |
| 241 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-010 | Submit updates the Stock Ledger | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Submit a reconciliation
2. Open View > Stock Ledger | - | The ledger shows the new quantity and valuation | High | Positive | - |
| 242 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-011 | Submit creates the accounting entries | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Submit a reconciliation
2. Open View > Accounting Ledger | - | General Ledger entries are created against the Difference Account | Medium | Positive | Needs Clarification: Accounting entries are not described in the SRS. |
| 243 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-012 | Submit with a missing mandatory value | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Remove the Warehouse from a row
2. Click Submit | - | The record is not submitted and a validation error is displayed | High | Negative | - |
| 244 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-013 | Submitted record is read-only | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Submit a record
2. Try to edit any field | - | All fields are read-only | High | Negative | - |
| 245 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-014 | Reconcile a batch item on the selected batch | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Select a batch item and a batch
2. Enter a new Quantity
3. Submit | BATCH-A: 6 > 8 | The reconciliation is performed on the selected batch and no new batch is created | High | Positive | - |
| 246 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-015 | Batch reconciliation creates one Serial and Batch Bundle | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Submit a batch / serial reconciliation
2. Open the bundles | BATCH-A + SN-0001..3 | Only one Serial and Batch Bundle is created using the selected batch and the entered serial numbers | High | Positive | - |
| 247 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-016 | Bundle type is Inward when the quantity increases | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Current batch quantity 6
2. Enter Quantity 8
3. Submit | 6 > 8 | The Serial and Batch Bundle type is Inward | High | Positive | - |
| 248 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-017 | Bundle type is Outward when the quantity decreases | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Current batch quantity 6
2. Enter Quantity 4
3. Submit | 6 > 4 | The Serial and Batch Bundle type is Outward | High | Positive | - |
| 249 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-018 | Batch item without a selected batch | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Select a batch item
2. Leave Batch No empty
3. Click Save | Milk 1L | An error message is displayed because Batch No is mandatory for batch items | High | Negative | - |
| 250 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-019 | Serialized item reconciliation | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Select a serialized item
2. Enter serial numbers for the new quantity
3. Submit | Laptop X1: SN-0001, SN-0002 | The serial numbers are created / updated and the stock matches the quantity | High | Positive | - |
| 251 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-020 | Serial numbers that already exist in another warehouse | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Enter a serial number that is in another warehouse
2. Click Submit | SN-0009 in Stores - W | To be confirmed with the BA (blocked or moved) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 252 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-021 | Cancel button appears only for Submitted records | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | Open a Draft, a Submitted and a Cancelled record | 3 records | Cancel is displayed only on the Submitted record | High | Positive | - |
| 253 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-022 | Cancel a Submitted record | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Open a Submitted record
2. Click Cancel | - | The record is cancelled, its status changes to Cancelled and the Cancel button changes to Amend | High | Positive | - |
| 254 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-023 | Cancel restores the stock quantity and valuation | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Cancel a submitted reconciliation
2. Check the Bin | 25 > 20 | The stock quantity and valuation return to their previous values | High | Positive | - |
| 255 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-024 | Cancel creates reversing ledger entries | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Cancel a record
2. Open the Stock Ledger Entry list | - | Reversing entries are created and the original entries are marked as cancelled | Medium | Positive | - |
| 256 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-025 | Cancel when later transactions depend on the reconciliation | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Issue stock after the reconciliation
2. Cancel the reconciliation | Reconciled to 25; then issued 20 | A validation error is displayed when the stock would become negative | High | Negative | Needs Clarification: Not defined in the SRS. |
| 257 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-026 | Amend button is displayed only for Cancelled records | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | Open a Submitted and a Cancelled record | - | Amend is displayed only for the Cancelled record | High | Positive | - |
| 258 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-027 | Amend a Cancelled record | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Open a Cancelled record
2. Click Amend | - | A new Draft record is created with Amended From pointing to the cancelled one | High | Positive | Needs Clarification: SRS does not define the result of clicking Amend. |
| 259 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-028 | Amended From link opens the original record | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Open an amended record
2. Click Amended From | MAT-RECO-2026-00001-1 | The user is redirected to the original (cancelled) record | Medium | Positive | - |
| 260 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-029 | Amended From is hidden for a non-amended record | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | Open a record that was not amended | - | The Amended From field is not displayed | Medium | UI | - |
| 261 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-030 | Reconciliation of an item with a Stock Reservation Entry after submit | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Submit a reconciliation with quantity >= reserved
2. Open the reservation | Reserved 4; Quantity 10 | The reservation stays valid | Medium | Positive | - |
| 262 | 3. Submit, Cancel & Stock Adjustment Workflow | TC-RCW-031 | Concurrent stock change between Save and Submit | Inventory > Stock Reconciliation > Add Stock Reconciliation; an item with known stock in a warehouse | 1. Save a record with Current Qty 20
2. Change the stock with another voucher to 15
3. Submit the reconciliation | Current 20 > 15 | To be confirmed with the BA (current quantity refreshed or validation error) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 263 | 4. Stock Reconciliation Details Screen | TC-RCD-001 | Open Stock Reconciliation Details from the list | Logged in; at least one Stock Reconciliation exists | 1. Click Inventory from the side menu
2. Click Stock Reconciliation
3. Click a Stock Reconciliation ID | MAT-RECO-2026-00001 | The Details screen of the selected record is displayed | High | Positive | - |
| 264 | 4. Stock Reconciliation Details Screen | TC-RCD-002 | Details display the data entered during creation | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | Open a record created with known data and compare the fields | Stores - E; item 25 | All data entered during creation is displayed correctly | High | Positive | - |
| 265 | 4. Stock Reconciliation Details Screen | TC-RCD-003 | Draft: fields are displayed as input fields | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table; a Draft record exists | Open a Draft record | Status: Draft | Fields are displayed as editable input fields | High | Positive | - |
| 266 | 4. Stock Reconciliation Details Screen | TC-RCD-004 | Draft: modify and save a record | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Draft record
2. Change a Quantity
3. Click Save | 25 > 30 | The changes are saved and the differences are recalculated | High | Positive | - |
| 267 | 4. Stock Reconciliation Details Screen | TC-RCD-005 | Draft: add an item using Fetch Items From Warehouse | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Draft record
2. Fetch items of a warehouse
3. Click Save | Stores - E | The items are added and saved | Medium | Positive | - |
| 268 | 4. Stock Reconciliation Details Screen | TC-RCD-006 | Draft: delete an item row | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Draft record
2. Delete a row
3. Click Save | - | The row is removed and the Difference Amount is recalculated | Medium | Positive | - |
| 269 | 4. Stock Reconciliation Details Screen | TC-RCD-007 | Draft: clear a mandatory field and save | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Draft record
2. Clear Company
3. Click Save | - | An error message is displayed because Company is mandatory | High | Negative | - |
| 270 | 4. Stock Reconciliation Details Screen | TC-RCD-008 | Draft: reservation validation on save | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Draft record
2. Set a quantity below the reserved quantity
3. Click Save | Reserved 4; Quantity 2 | The reservation error message is displayed | High | Negative | - |
| 271 | 4. Stock Reconciliation Details Screen | TC-RCD-009 | Draft: submit from Details | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a saved Draft record
2. Click Submit | Complete Draft record | The record is submitted and its status becomes Submitted | High | Positive | - |
| 272 | 4. Stock Reconciliation Details Screen | TC-RCD-010 | Submitted: fields are displayed as read-only labels | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table; a Submitted record exists | Open a Submitted record | Status: Submitted | All fields are displayed as read-only labels | High | Positive | - |
| 273 | 4. Stock Reconciliation Details Screen | TC-RCD-011 | Submitted: fields cannot be edited | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Submitted record
2. Try to change any field | Status: Submitted | No field can be edited | High | Negative | - |
| 274 | 4. Stock Reconciliation Details Screen | TC-RCD-012 | Submitted: tables are read-only | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Submitted record
2. Look for Add Row / Delete row | - | Rows cannot be added or deleted | High | Negative | - |
| 275 | 4. Stock Reconciliation Details Screen | TC-RCD-013 | Submitted: Cancel action is available | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | Open a Submitted record and review the page actions | Status: Submitted | The Cancel action is available | High | Positive | Needs Clarification: SRS describes Cancel in the Add screen but not in the Details page actions. |
| 276 | 4. Stock Reconciliation Details Screen | TC-RCD-014 | Cancel a Submitted record from Details | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Submitted record
2. Click Cancel | - | The record is cancelled and the Cancel button changes to Amend | High | Positive | - |
| 277 | 4. Stock Reconciliation Details Screen | TC-RCD-015 | Cancelled: fields are displayed as read-only labels | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table; a Cancelled record exists | Open a Cancelled record | Status: Cancelled | All fields are displayed as read-only labels and cannot be edited | High | Positive | - |
| 278 | 4. Stock Reconciliation Details Screen | TC-RCD-016 | Cancelled: Amend action is available | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | Open a Cancelled record | Status: Cancelled | The Amend button is displayed | High | Positive | - |
| 279 | 4. Stock Reconciliation Details Screen | TC-RCD-017 | Current Serial / Batch Bundle is displayed after saving | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | Open a saved record of a batch / serial item | SABB-0001 | Current Serial / Batch Bundle shows the bundle of the transaction | Medium | Positive | - |
| 280 | 4. Stock Reconciliation Details Screen | TC-RCD-018 | View dropdown appears only after submitting | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Draft record
2. Open a Submitted record | 2 records | The View dropdown is hidden on the Draft record and displayed on the Submitted record | High | Positive | - |
| 281 | 4. Stock Reconciliation Details Screen | TC-RCD-019 | View dropdown lists the reports | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | Click the View dropdown on a Submitted record | - | The list contains: Stock Ledger, Serial / Batch Nos, Accounting Ledger | High | UI | - |
| 282 | 4. Stock Reconciliation Details Screen | TC-RCD-020 | View > Stock Ledger opens the Stock Ledger screen | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click View > Stock Ledger | - | The Stock Ledger screen opens, filtered by this record | High | Positive | Needs Clarification: SRS does not say whether the report is filtered by this document. |
| 283 | 4. Stock Reconciliation Details Screen | TC-RCD-021 | View > Serial / Batch Nos opens the Serial and Batch Summary screen | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click View > Serial / Batch Nos | - | The Serial and Batch Summary screen opens | Medium | Positive | - |
| 284 | 4. Stock Reconciliation Details Screen | TC-RCD-022 | View > Accounting Ledger opens the General Ledger screen | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click View > Accounting Ledger | - | The General Ledger screen opens, filtered by this record | High | Positive | - |
| 285 | 4. Stock Reconciliation Details Screen | TC-RCD-023 | Fixed page actions are displayed at the top | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | Open any record and review the top of the page | - | The Assign, Attachment, Tags, Share, Print and Delete actions are displayed at the top (View after submitting) | High | UI | - |
| 286 | 4. Stock Reconciliation Details Screen | TC-RCD-024 | Fixed page actions remain visible for all statuses | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | Open records in each status | 3 records | The fixed page actions are displayed on all of them | Medium | UI | - |
| 287 | 4. Stock Reconciliation Details Screen | TC-RCD-025 | Assign the record to a user | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click Assign
2. Select a user
3. Confirm | User: Mona Samir | The record is assigned to the selected user and the assignment is displayed | Medium | Positive | Needs Clarification: SRS lists Assign without details. |
| 288 | 4. Stock Reconciliation Details Screen | TC-RCD-026 | Add an attachment | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click Attachment
2. Upload a file | stock-count-sheet.xlsx | The file is attached to the record and listed | Medium | Positive | Needs Clarification: Allowed file types and size limit are not defined. |
| 289 | 4. Stock Reconciliation Details Screen | TC-RCD-027 | Add a tag | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click Tags
2. Add a tag | Tag: Stock count | The tag is added to the record | Low | Positive | - |
| 290 | 4. Stock Reconciliation Details Screen | TC-RCD-028 | Share the record with a user | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click Share
2. Select a user and permission
3. Confirm | User: Mona Samir | The record is shared with the selected user | Medium | Positive | Needs Clarification: SRS lists Share without details. |
| 291 | 4. Stock Reconciliation Details Screen | TC-RCD-029 | Print the record | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click Print | - | The print view of the record is displayed and can be printed | Medium | Positive | - |
| 292 | 4. Stock Reconciliation Details Screen | TC-RCD-030 | Delete confirmation message | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a record
2. Click Delete | - | A confirmation message asks the user whether they want to delete this Stock Reconciliation | High | Positive | - |
| 293 | 4. Stock Reconciliation Details Screen | TC-RCD-031 | Cancel the delete confirmation | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Click Delete
2. Click No (or close the message) | - | The record is not deleted | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 294 | 4. Stock Reconciliation Details Screen | TC-RCD-032 | Delete a Draft record that has no links | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open an unlinked Draft record
2. Click Delete
3. Click Yes | Unlinked Draft record | The Stock Reconciliation is deleted successfully | High | Positive | - |
| 295 | 4. Stock Reconciliation Details Screen | TC-RCD-033 | Delete a Submitted record | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a Submitted record
2. Click Delete
3. Click Yes | Status: Submitted | The record is not deleted because it must be cancelled first | High | Negative | Needs Clarification: SRS makes Delete a fixed page action for all statuses. |
| 296 | 4. Stock Reconciliation Details Screen | TC-RCD-034 | Delete a record amended from another record | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open an amended record
2. Click Delete
3. Click Yes | Amended record | A warning message is displayed with the linked doctypes as hyperlinks; the record is not deleted | High | Negative | - |
| 297 | 4. Stock Reconciliation Details Screen | TC-RCD-035 | Delete a record linked to other transactions | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Open a linked record
2. Click Delete
3. Click Yes | Linked record | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks | High | Negative | - |
| 298 | 4. Stock Reconciliation Details Screen | TC-RCD-036 | Linked doctype hyperlinks open the corresponding doctype | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | 1. Trigger the delete message
2. Click a linked doctype | - | The user is redirected to the corresponding doctype | Medium | Positive | - |
| 299 | 4. Stock Reconciliation Details Screen | TC-RCD-037 | Connections on the Details screen | Inventory > Stock Reconciliation > click a Stock Reconciliation ID in the table | Open a record and scroll to the bottom | - | To be confirmed with the BA (no Connections are defined) | Low | Positive | Needs Clarification: Not defined in the SRS. |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Stock Reconciliation List Screen |  |  |  |
| 2. Add Stock Reconciliation Screen |  |  |  |
| 3. Submit, Cancel & Stock Adjustment Workflow |  |  |  |
| 4. Stock Reconciliation Details Screen |  |  |  |
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