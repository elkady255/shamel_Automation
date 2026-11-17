<!-- converted from SHAMEL_StockEntry_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Stock Entry |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Stock Entry) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Stock Entry List Screen | TC-STL-001 | Display the Stock Entry list | Access via Inventory > Stock Entry | 1. Click Inventory from the side menu
2. Click Stock Entry | - | A table listing all Stock Entries in the system is displayed | High | Positive | - |
| 2 | 1. Stock Entry List Screen | TC-STL-002 | Add Stock Entry button is displayed | Access via Inventory > Stock Entry | Verify that the Add Stock Entry button is displayed on the list screen | - | The Add Stock Entry button is visible and clickable | Medium | UI | - |
| 3 | 1. Stock Entry List Screen | TC-STL-003 | Navigate to the Add Stock Entry screen | Access via Inventory > Stock Entry | Click the Add Stock Entry button | - | The user is redirected to the Add Stock Entry screen | High | Positive | - |
| 4 | 1. Stock Entry List Screen | TC-STL-004 | Display checkbox column for row selection | Access via Inventory > Stock Entry | Open the Stock Entry list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Stock Entry List Screen | TC-STL-005 | Display Stock Entry ID column | Access via Inventory > Stock Entry | Open the list | - | The Stock Entry ID column is displayed for each row | Medium | UI | - |
| 6 | 1. Stock Entry List Screen | TC-STL-006 | Navigate to Stock Entry Details by clicking the ID | Access via Inventory > Stock Entry | Click a Stock Entry ID in the table | MAT-STE-2026-00001 | The user is redirected to the Stock Entry Details screen of the selected entry | High | Positive | - |
| 7 | 1. Stock Entry List Screen | TC-STL-007 | Display Status column with a valid value | Access via Inventory > Stock Entry | Open the list and review the Status column | Entries in all statuses | Each row shows exactly one of: Draft, Submitted, In Transit, Cancelled | High | Positive | - |
| 8 | 1. Stock Entry List Screen | TC-STL-008 | Status of a newly saved Stock Entry is Draft | Access via Inventory > Stock Entry | 1. Add and save a new Stock Entry
2. Return to the list | Type: Material Receipt | The new entry appears in the list with status Draft | High | Positive | - |
| 9 | 1. Stock Entry List Screen | TC-STL-009 | Status changes to Submitted after submission | Access via Inventory > Stock Entry | 1. Submit a Draft Stock Entry
2. Return to the list | Material Issue | The status is Submitted | High | Positive | - |
| 10 | 1. Stock Entry List Screen | TC-STL-010 | Status is In Transit after submitting an entry with Add To Transit | Access via Inventory > Stock Entry | 1. Submit a Material Transfer with Add To Transit checked
2. Return to the list | Add To Transit: checked | The status is In Transit | High | Positive | - |
| 11 | 1. Stock Entry List Screen | TC-STL-011 | Status changes to Cancelled after cancellation | Access via Inventory > Stock Entry | 1. Cancel a Submitted Stock Entry
2. Return to the list | - | The status is Cancelled | High | Positive | - |
| 12 | 1. Stock Entry List Screen | TC-STL-012 | Display Stock Entry Type column | Access via Inventory > Stock Entry | Open the list and review the Stock Entry Type column | Material Transfer | The type of each entry is displayed | Medium | UI | - |
| 13 | 1. Stock Entry List Screen | TC-STL-013 | Display Default Source Warehouse column | Access via Inventory > Stock Entry | Open the list and review the column | Stores - E | The default source warehouse is displayed (empty for Material Receipt) | Medium | UI | - |
| 14 | 1. Stock Entry List Screen | TC-STL-014 | Display Default Target Warehouse column | Access via Inventory > Stock Entry | Open the list and review the column | Finished Goods - E | The default target warehouse is displayed (empty for Material Issue) | Medium | UI | - |
| 15 | 1. Stock Entry List Screen | TC-STL-015 | Display Per Transferred progress bar | Access via Inventory > Stock Entry | Open the list and review the Per Transferred column | Transferred: 50% | A progress bar shows the percentage of transferred items | Medium | UI | - |
| 16 | 1. Stock Entry List Screen | TC-STL-016 | Per Transferred for an In Transit entry | Access via Inventory > Stock Entry | Open the list and find an In Transit entry | In Transit entry | To be confirmed with the BA (percentage received at the final warehouse) | Low | Positive | Needs Clarification: SRS does not explain what the percentage measures. |
| 17 | 1. Stock Entry List Screen | TC-STL-017 | Is Return checkbox is read-only and checked for return entries | Access via Inventory > Stock Entry | Open the list and review the Is Return column | - | The checkbox is checked only for return entries and cannot be edited | Low | UI | - |
| 18 | 1. Stock Entry List Screen | TC-STL-018 | Action bar appears when one row is selected | Access via Inventory > Stock Entry | Select the checkbox of one Stock Entry | - | An action bar appears showing the available actions | High | Positive | - |
| 19 | 1. Stock Entry List Screen | TC-STL-019 | Action bar appears when multiple rows are selected | Access via Inventory > Stock Entry | Select the checkboxes of three Stock Entries | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 20 | 1. Stock Entry List Screen | TC-STL-020 | Action bar disappears when all rows are deselected | Access via Inventory > Stock Entry | 1. Select one entry
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 21 | 1. Stock Entry List Screen | TC-STL-021 | Action bar contains the required actions | Access via Inventory > Stock Entry | Select a Stock Entry and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete (Submit and Cancel are shown only by status) | Medium | UI | - |
| 22 | 1. Stock Entry List Screen | TC-STL-022 | Open the Edit popup | Access via Inventory > Stock Entry | 1. Select a Stock Entry
2. Click Edit | - | A popup is displayed containing the Field dropdown, the Value field and the Update button | High | Positive | - |
| 23 | 1. Stock Entry List Screen | TC-STL-023 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Stock Entry | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Stock Entry and allows selecting only one option | Medium | Positive | - |
| 24 | 1. Stock Entry List Screen | TC-STL-024 | Click Update without selecting a Field | Access via Inventory > Stock Entry | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because Field is mandatory | Medium | Negative | - |
| 25 | 1. Stock Entry List Screen | TC-STL-025 | Value input type changes dynamically based on the selected Field | Access via Inventory > Stock Entry | 1. Open the Edit popup
2. Select Field = Stock Entry Type and note the Value input type
3. Select Field = Posting Time and note the Value input type | Stock Entry Type, Posting Time | The Value field changes its input type (searchable dropdown for the type, time picker for Posting Time) | High | Positive | - |
| 26 | 1. Stock Entry List Screen | TC-STL-026 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Stock Entry | 1. Open the Edit popup
2. Select Field = Series
3. Leave Value empty and click Update | Field: Series | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 27 | 1. Stock Entry List Screen | TC-STL-027 | Value field applies the validation rules of the selected Field | Access via Inventory > Stock Entry | 1. Open the Edit popup
2. Select Field = Remarks
3. Enter 2 characters and click Update | Value: ab | A validation error message is displayed (minimum length is 3 characters) and the entry is not changed | Medium | Negative | - |
| 28 | 1. Stock Entry List Screen | TC-STL-028 | Update a Draft Stock Entry successfully | Access via Inventory > Stock Entry | 1. Select a Draft Stock Entry
2. Click Edit
3. Select Field = Remarks
4. Enter a Value
5. Click Update | Value: Monthly stock adjustment | The Stock Entry is updated successfully | High | Positive | Needs Clarification: SRS defines only the error case of Update (Submitted / Cancelled). The Draft success case is assumed. |
| 29 | 1. Stock Entry List Screen | TC-STL-029 | Update a Submitted Stock Entry | Access via Inventory > Stock Entry | 1. Select a Submitted Stock Entry
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Submitted | An error message is displayed informing the user that the Stock Entry cannot be modified | High | Negative | - |
| 30 | 1. Stock Entry List Screen | TC-STL-030 | Update a Cancelled Stock Entry | Access via Inventory > Stock Entry | 1. Select a Cancelled Stock Entry
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Cancelled | An error message is displayed informing the user that the Stock Entry cannot be modified | High | Negative | - |
| 31 | 1. Stock Entry List Screen | TC-STL-031 | Update an In Transit Stock Entry | Access via Inventory > Stock Entry | 1. Select an In Transit Stock Entry
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: In Transit | To be confirmed with the BA (allowed or blocked) | Medium | Negative | Needs Clarification: SRS lists the error only for Submitted and Cancelled. |
| 32 | 1. Stock Entry List Screen | TC-STL-032 | Edit with multiple Stock Entries selected | Access via Inventory > Stock Entry | 1. Select two Draft entries
2. Click Edit
3. Select a Field and a Value
4. Click Update | Two Draft entries | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection. |
| 33 | 1. Stock Entry List Screen | TC-STL-033 | Submit action is displayed for a Draft Stock Entry | Access via Inventory > Stock Entry | Select a Draft entry and review the action bar | Status: Draft | The Submit action is displayed | High | Positive | - |
| 34 | 1. Stock Entry List Screen | TC-STL-034 | Submit action is displayed for an In Transit Stock Entry | Access via Inventory > Stock Entry | Select an In Transit entry and review the action bar | Status: In Transit | The Submit action is displayed | High | Positive | - |
| 35 | 1. Stock Entry List Screen | TC-STL-035 | Submit action is hidden for Submitted and Cancelled entries | Access via Inventory > Stock Entry | Select a Submitted and a Cancelled entry and review the action bar | 2 entries | The Submit action is not displayed | Medium | Negative | - |
| 36 | 1. Stock Entry List Screen | TC-STL-036 | Submit a Draft Stock Entry with complete and valid data | Access via Inventory > Stock Entry | 1. Select a complete Draft entry
2. Click Submit | Complete Draft entry | The Stock Entry is submitted successfully and its status changes to Submitted | High | Positive | - |
| 37 | 1. Stock Entry List Screen | TC-STL-037 | Submit a Draft Stock Entry with incomplete data | Access via Inventory > Stock Entry | 1. Select a Draft entry with a missing mandatory value
2. Click Submit | Draft without Source Warehouse | The entry is not submitted, a validation error is displayed and the status stays Draft | High | Negative | Needs Clarification: SRS describes only the success case of Submit. |
| 38 | 1. Stock Entry List Screen | TC-STL-038 | Submit an In Transit Stock Entry from the list | Access via Inventory > Stock Entry | 1. Select an In Transit entry
2. Click Submit | Status: In Transit | To be confirmed with the BA (completes the transit to the final warehouse) | Medium | Positive | Needs Clarification: SRS lets Submit appear for In Transit entries but describes the second submit only in the Details screen (End Transit). |
| 39 | 1. Stock Entry List Screen | TC-STL-039 | Submit multiple Draft Stock Entries at once | Access via Inventory > Stock Entry | 1. Select two complete Draft entries
2. Click Submit | Two Draft entries | To be confirmed with the BA (bulk submit behavior) | Low | Positive | Needs Clarification: SRS does not define bulk submit. |
| 40 | 1. Stock Entry List Screen | TC-STL-040 | Cancel action is displayed for a Submitted Stock Entry | Access via Inventory > Stock Entry | Select a Submitted entry and review the action bar | Status: Submitted | The Cancel action is displayed | High | Positive | - |
| 41 | 1. Stock Entry List Screen | TC-STL-041 | Cancel action is hidden for other statuses | Access via Inventory > Stock Entry | Select a Draft, In Transit and Cancelled entry and review the action bar | 3 entries | The Cancel action is not displayed | Medium | Negative | Needs Clarification: SRS shows Cancel only for Submitted. Confirm that an In Transit entry cannot be cancelled. |
| 42 | 1. Stock Entry List Screen | TC-STL-042 | Cancel a Submitted Stock Entry that is not linked | Access via Inventory > Stock Entry | 1. Select an unlinked Submitted entry
2. Click Cancel | Unlinked entry | The Stock Entry is cancelled successfully | High | Positive | - |
| 43 | 1. Stock Entry List Screen | TC-STL-043 | Cancel a Stock Entry linked to other transactions | Access via Inventory > Stock Entry | 1. Select a Submitted entry linked to other transactions
2. Click Cancel | Entry linked to an inbound transit entry | A message informs the user that the linked transactions must be cancelled first. The entry is not cancelled | High | Negative | - |
| 44 | 1. Stock Entry List Screen | TC-STL-044 | Cancel does not show a confirmation message | Access via Inventory > Stock Entry | 1. Select a Submitted entry
2. Click Cancel | - | The entry is cancelled directly (no confirmation is described) | Low | Positive | Needs Clarification: Unlike the Purchase Receipt, no confirmation message is described for Cancel. |
| 45 | 1. Stock Entry List Screen | TC-STL-045 | Cancel reverses the stock movement | Access via Inventory > Stock Entry | 1. Note the stock
2. Cancel a submitted entry
3. Check the stock | Receipt +6 cancelled | The stock quantities of the affected warehouses are restored and reversing ledger entries are created | High | Positive | Needs Clarification: Stock effects are not described in the SRS (standard behavior assumed). |
| 46 | 1. Stock Entry List Screen | TC-STL-046 | Cancel is blocked when it would make the stock negative | Access via Inventory > Stock Entry | 1. Consume the received stock
2. Cancel the Material Receipt | Stock 0 | A validation error is displayed | High | Negative | Needs Clarification: Not defined in the SRS. |
| 47 | 1. Stock Entry List Screen | TC-STL-047 | Delete a Stock Entry: available statuses | Access via Inventory > Stock Entry | Select entries in every status and review the action bar | Draft, Submitted, In Transit, Cancelled | To be confirmed with the BA (which statuses show Delete) | High | Positive | Needs Clarification: SRS does not restrict Delete by status, unlike the Delivery Note and Purchase Receipt (Draft / Cancelled only). |
| 48 | 1. Stock Entry List Screen | TC-STL-048 | Confirmation message is displayed when clicking Delete | Access via Inventory > Stock Entry | 1. Select a Draft entry
2. Click Delete | Status: Draft | A confirmation message asks the user whether they want to delete this Stock Entry | High | Positive | - |
| 49 | 1. Stock Entry List Screen | TC-STL-049 | Cancel the delete confirmation | Access via Inventory > Stock Entry | 1. Select a Draft entry
2. Click Delete
3. Click No (or close the message) | - | The entry is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 50 | 1. Stock Entry List Screen | TC-STL-050 | Delete a Draft Stock Entry that has no links | Access via Inventory > Stock Entry | 1. Select an unlinked Draft entry
2. Click Delete
3. Click Yes | Unlinked Draft entry | The Stock Entry is deleted successfully and removed from the list | High | Positive | - |
| 51 | 1. Stock Entry List Screen | TC-STL-051 | Delete a Submitted Stock Entry | Access via Inventory > Stock Entry | 1. Select a Submitted entry
2. Click Delete
3. Click Yes | Status: Submitted | The entry is not deleted because it must be cancelled first | High | Negative | Needs Clarification: Not defined in the SRS (standard behavior assumed). |
| 52 | 1. Stock Entry List Screen | TC-STL-052 | Delete a Stock Entry that was amended from another entry | Access via Inventory > Stock Entry | 1. Select an entry that has Amended From populated
2. Click Delete
3. Click Yes | Amended entry | A warning message is displayed: the entry cannot be deleted until all related doctypes are deleted. The entry is not deleted | High | Negative | - |
| 53 | 1. Stock Entry List Screen | TC-STL-053 | Delete a Stock Entry linked to other transactions | Access via Inventory > Stock Entry | 1. Select a Cancelled entry linked to other transactions
2. Click Delete
3. Click Yes | Entry linked to a Stock Reservation Entry | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks. The entry is not deleted | High | Negative | - |
| 54 | 1. Stock Entry List Screen | TC-STL-054 | Linked doctypes in the delete messages are hyperlinks | Access via Inventory > Stock Entry | 1. Trigger the delete message for a linked entry
2. Click a linked doctype | Linked entry | The user is redirected to the corresponding doctype | Medium | Positive | - |
| 55 | 1. Stock Entry List Screen | TC-STL-055 | Delete multiple Stock Entries at once | Access via Inventory > Stock Entry | 1. Select two Draft entries
2. Click Delete
3. Click Yes | Two Draft entries | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define bulk delete. |
| 56 | 1. Stock Entry List Screen | TC-STL-056 | Export selected Stock Entries | Access via Inventory > Stock Entry | 1. Select one or more entries
2. Click Export | - | The selected Stock Entries are exported | Medium | Positive | Needs Clarification: SRS lists Export without details. |
| 57 | 1. Stock Entry List Screen | TC-STL-057 | Assign selected Stock Entries to a user | Access via Inventory > Stock Entry | 1. Select an entry
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The entry is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 58 | 1. Stock Entry List Screen | TC-STL-058 | Clear assignment of a Stock Entry | Access via Inventory > Stock Entry | 1. Select an assigned entry
2. Click Clear assignment | Assigned entry | The assignment is cleared | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 59 | 1. Stock Entry List Screen | TC-STL-059 | Add tags to a Stock Entry | Access via Inventory > Stock Entry | 1. Select an entry
2. Click Add tags
3. Enter a tag and confirm | Tag: Monthly | The tag is added to the entry | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 60 | 1. Stock Entry List Screen | TC-STL-060 | Print selected Stock Entries | Access via Inventory > Stock Entry | 1. Select an entry
2. Click Print | - | The print view of the Stock Entry is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 61 | 1. Stock Entry List Screen | TC-STL-061 | Stock Entry list when there are no entries | Access via Inventory > Stock Entry | Open the list in a system with no entries | No entries | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. Expected behavior is a standard assumption. |
| 62 | 1. Stock Entry List Screen | TC-STL-062 | User without permission cannot access Stock Entry | Access via Inventory > Stock Entry | 1. Log in with a user that has no permission for Stock Entry
2. Open the sidebar | Restricted user | The Stock Entry menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 63 | 2. Add Stock Entry - Details Tab | TC-STA-001 | Open the Add Stock Entry screen | Logged in with a user that has Stock Entry access | 1. Click Inventory from the side menu
2. Click Stock Entry
3. Click Add Stock Entry | - | The Add Stock Entry screen is displayed with an empty form on the Details tab | High | Positive | - |
| 64 | 2. Add Stock Entry - Details Tab | TC-STA-002 | Add screen displays the tabs | Inventory > Stock Entry > Add Stock Entry > Details tab | Review the tabs of the Add screen | - | The tabs Details and Other Info are displayed; Additional Costs depends on the Stock Entry Type | Medium | UI | - |
| 65 | 2. Add Stock Entry - Details Tab | TC-STA-003 | Series dropdown lists the series of the Stock Entry doctype | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Series dropdown | - | All series added to the Stock Entry doctype are listed | High | Positive | - |
| 66 | 2. Add Stock Entry - Details Tab | TC-STA-004 | Select a Series | Inventory > Stock Entry > Add Stock Entry > Details tab | Select a Series | MAT-STE-.YYYY.- | The value is accepted | High | Positive | - |
| 67 | 2. Add Stock Entry - Details Tab | TC-STA-005 | Leave Series empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave Series empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Series is mandatory | High | Negative | - |
| 68 | 2. Add Stock Entry - Details Tab | TC-STA-006 | Stock Entry Type is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Stock Entry Type and type part of a name | Material | The list is filtered while typing | High | Positive | - |
| 69 | 2. Add Stock Entry - Details Tab | TC-STA-007 | Stock Entry Type lists the supported types | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Stock Entry Type dropdown | - | The list contains: Material Issue, Material Receipt, Material Transfer, Repack | High | Positive | Needs Clarification: SRS says the field links to the Stock Entry Type doctype but lists only these four values. Confirm whether other types (e.g., Manufacture, Send to Subcontractor) are hidden. |
| 70 | 2. Add Stock Entry - Details Tab | TC-STA-008 | Select each Stock Entry Type | Inventory > Stock Entry > Add Stock Entry > Details tab | Select each of the four types in turn | Issue, Receipt, Transfer, Repack | Each value is accepted | High | Positive | - |
| 71 | 2. Add Stock Entry - Details Tab | TC-STA-009 | Leave Stock Entry Type empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave Stock Entry Type empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Stock Entry Type is mandatory | High | Negative | - |
| 72 | 2. Add Stock Entry - Details Tab | TC-STA-010 | Stock Entry Type search with no matching result | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a non-existing type | ZZZ | No results are displayed | Low | Negative | - |
| 73 | 2. Add Stock Entry - Details Tab | TC-STA-011 | Additional Costs tab for Material Receipt | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Stock Entry Type = Material Receipt | Material Receipt | The Additional Costs tab is displayed | High | Positive | - |
| 74 | 2. Add Stock Entry - Details Tab | TC-STA-012 | Additional Costs tab for Material Transfer | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Stock Entry Type = Material Transfer | Material Transfer | The Additional Costs tab is displayed | High | Positive | - |
| 75 | 2. Add Stock Entry - Details Tab | TC-STA-013 | Additional Costs tab for Repack | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Stock Entry Type = Repack | Repack | The Additional Costs tab is displayed | High | Positive | - |
| 76 | 2. Add Stock Entry - Details Tab | TC-STA-014 | Additional Costs tab is hidden for Material Issue | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Stock Entry Type = Material Issue | Material Issue | The Additional Costs tab is not displayed | High | Positive | - |
| 77 | 2. Add Stock Entry - Details Tab | TC-STA-015 | Changing the type updates the visible fields and tabs | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Receipt
2. Change to Material Issue | Receipt > Issue | The warehouse fields and the Additional Costs tab are updated according to the new type | High | Positive | - |
| 78 | 2. Add Stock Entry - Details Tab | TC-STA-016 | Changing the type keeps or clears the item rows | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Add item rows with warehouses
2. Change the type | Receipt > Transfer | To be confirmed with the BA (rows kept and revalidated, or cleared) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 79 | 2. Add Stock Entry - Details Tab | TC-STA-017 | Posting Date and Posting Time are read-only by default | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Add screen and review the two fields | - | Both fields are read-only while Edit Posting And Date Time is unchecked | High | Positive | - |
| 80 | 2. Add Stock Entry - Details Tab | TC-STA-018 | Posting Date default value is the current date | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Add screen | - | Posting Date shows the current date | High | Positive | - |
| 81 | 2. Add Stock Entry - Details Tab | TC-STA-019 | Posting Time default value is the current time | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Add screen | - | Posting Time shows the current time | High | Positive | - |
| 82 | 2. Add Stock Entry - Details Tab | TC-STA-020 | Enable Edit Posting And Date Time | Inventory > Stock Entry > Add Stock Entry > Details tab | Check Edit Posting And Date Time | - | Posting Date and Posting Time become editable | High | Positive | - |
| 83 | 2. Add Stock Entry - Details Tab | TC-STA-021 | Disable Edit Posting And Date Time | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Edit Posting And Date Time
2. Clear the checkbox | - | The two fields become read-only again | Medium | Positive | - |
| 84 | 2. Add Stock Entry - Details Tab | TC-STA-022 | Select a Posting Date using the calendar | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Edit Posting And Date Time
2. Select a date | 2026-11-01 | The selected date is accepted | High | Positive | - |
| 85 | 2. Add Stock Entry - Details Tab | TC-STA-023 | Select a Posting Time using the time picker | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Edit Posting And Date Time
2. Select a time | 10:30 | The selected time is accepted | High | Positive | - |
| 86 | 2. Add Stock Entry - Details Tab | TC-STA-024 | Posting Date in the future | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Edit Posting And Date Time
2. Select a future date
3. Click Save | 2027-01-01 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define date validation. |
| 87 | 2. Add Stock Entry - Details Tab | TC-STA-025 | Posting Date in a closed stock / accounting period | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Edit Posting And Date Time
2. Select a date in a closed period
3. Click Save | Closed period date | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 88 | 2. Add Stock Entry - Details Tab | TC-STA-026 | Backdated entry that makes a later balance negative | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select a past posting date
2. Issue stock that was not available on that date
3. Click Submit | Past date | A validation error is displayed | High | Negative | Needs Clarification: Not defined in the SRS. |
| 89 | 2. Add Stock Entry - Details Tab | TC-STA-027 | Add To Transit is displayed only for Material Transfer | Inventory > Stock Entry > Add Stock Entry > Details tab | Select each Stock Entry Type in turn | - | Add To Transit is displayed only for Material Transfer | High | Positive | - |
| 90 | 2. Add Stock Entry - Details Tab | TC-STA-028 | Add To Transit filters the Target Warehouse to Transit Warehouses | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Transfer
2. Check Add To Transit
3. Open Default Target Warehouse | Transit - E; Stores - E | Only warehouses of type Transit Warehouse are listed | High | Positive | - |
| 91 | 2. Add Stock Entry - Details Tab | TC-STA-029 | Add To Transit filters the item Target Warehouse to Transit Warehouses | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Transfer
2. Check Add To Transit
3. Open the Target Warehouse in an item row | Transit - E; Stores - E | Only Transit Warehouses are listed | High | Positive | - |
| 92 | 2. Add Stock Entry - Details Tab | TC-STA-030 | Unchecking Add To Transit removes the Transit filter | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Add To Transit
2. Clear the checkbox
3. Open Default Target Warehouse | - | All child warehouses are listed again | Medium | Positive | - |
| 93 | 2. Add Stock Entry - Details Tab | TC-STA-031 | Checking Add To Transit with a normal target warehouse already selected | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select a normal target warehouse
2. Check Add To Transit | Stores - E | The target warehouse is cleared or revalidated | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 94 | 2. Add Stock Entry - Details Tab | TC-STA-032 | Inspection Required checkbox | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Inspection Required
2. Save and submit the entry | - | After submitting, the Create menu contains Create Quality Inspection | High | Positive | - |
| 95 | 2. Add Stock Entry - Details Tab | TC-STA-033 | Create Quality Inspection is hidden when Inspection Required is unchecked | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave Inspection Required unchecked
2. Save and submit the entry
3. Open the Create menu | - | Create Quality Inspection is not displayed | Medium | Negative | - |
| 96 | 2. Add Stock Entry - Details Tab | TC-STA-034 | Create Quality Inspection is hidden before submit | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Inspection Required
2. Save only
3. Open the Create menu | - | Create Quality Inspection is not displayed until the entry is submitted | Medium | Negative | Needs Clarification: SRS says the option appears 'after saving and submitting'. |
| 97 | 2. Add Stock Entry - Details Tab | TC-STA-035 | Create Quality Inspection opens Add Quality Inspection | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Click Create > Create Quality Inspection | - | The Add Quality Inspection screen opens for this Stock Entry | High | Positive | - |
| 98 | 2. Add Stock Entry - Details Tab | TC-STA-036 | Stock Entry (Outward GIT) is hidden on a normal entry | Inventory > Stock Entry > Add Stock Entry > Details tab | Review a normal Stock Entry | - | The Stock Entry (Outward GIT) field is not displayed | Medium | UI | - |
| 99 | 2. Add Stock Entry - Details Tab | TC-STA-037 | Stock Entry (Outward GIT) is displayed on an inbound transit entry | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Create an inbound entry from an outbound transit entry (Transit Entry)
2. Review the form | Outbound: MAT-STE-2026-00001 | The Stock Entry (Outward GIT) label shows the outbound entry as a read-only clickable link | High | Positive | - |
| 100 | 2. Add Stock Entry - Details Tab | TC-STA-038 | Stock Entry (Outward GIT) link opens the outbound entry | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open an inbound transit entry
2. Click Stock Entry (Outward GIT) | - | The user is redirected to the outbound Stock Entry | Medium | Positive | - |
| 101 | 2. Add Stock Entry - Details Tab | TC-STA-039 | Default Source Warehouse is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Default Source Warehouse and type part of a name | Stores | The list is filtered while typing | High | Positive | - |
| 102 | 2. Add Stock Entry - Details Tab | TC-STA-040 | Default Source Warehouse lists only child warehouses | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Default Source Warehouse dropdown | Group: All Warehouses; child: Stores - E | Only child (non-group) warehouses are listed | High | Positive | - |
| 103 | 2. Add Stock Entry - Details Tab | TC-STA-041 | Default Source Warehouse fills empty item rows only | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Add a row with Source Warehouse A
2. Add a row with an empty warehouse
3. Select Default Source Warehouse B | A and B | Row 1 keeps A; row 2 is filled with B | High | Positive | - |
| 104 | 2. Add Stock Entry - Details Tab | TC-STA-042 | Default Source Warehouse does not overwrite existing values | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Default Source Warehouse A
2. Change it to B | A > B | Rows already filled with A keep A | High | Positive | Needs Clarification: Confirm whether rows filled automatically by the default are refreshed when the default changes. |
| 105 | 2. Add Stock Entry - Details Tab | TC-STA-043 | Default Source Warehouse is hidden for Material Receipt | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Material Receipt | - | Default Source Warehouse is not displayed | High | Positive | - |
| 106 | 2. Add Stock Entry - Details Tab | TC-STA-044 | Default Source Warehouse is displayed for Issue, Transfer and Repack | Inventory > Stock Entry > Add Stock Entry > Details tab | Select each of the three types | - | Default Source Warehouse is displayed | Medium | Positive | - |
| 107 | 2. Add Stock Entry - Details Tab | TC-STA-045 | Leave Default Source Warehouse empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave it empty
2. Fill the rows with warehouses
3. Click Save | - | The entry is saved (field is optional) | Medium | Positive | - |
| 108 | 2. Add Stock Entry - Details Tab | TC-STA-046 | Source Warehouse Address Link is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Source Warehouse Address Link and type part of a name | Main | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 109 | 2. Add Stock Entry - Details Tab | TC-STA-047 | Source Warehouse Address Link: leave empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave it empty
2. Click Save | - | The entry is saved (field is optional) | Low | Positive | - |
| 110 | 2. Add Stock Entry - Details Tab | TC-STA-048 | Source Warehouse Address Link is hidden for Material Receipt | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Material Receipt | - | To be confirmed with the BA (hidden like the source warehouse) | Low | Positive | Needs Clarification: SRS hides only the Default Source Warehouse for Material Receipt; the address link rule is not stated. |
| 111 | 2. Add Stock Entry - Details Tab | TC-STA-049 | Default Target Warehouse is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Default Target Warehouse and type part of a name | Stores | The list is filtered while typing | High | Positive | - |
| 112 | 2. Add Stock Entry - Details Tab | TC-STA-050 | Default Target Warehouse lists only child warehouses | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Default Target Warehouse dropdown | Group: All Warehouses; child: Stores - E | Only child (non-group) warehouses are listed | High | Positive | - |
| 113 | 2. Add Stock Entry - Details Tab | TC-STA-051 | Default Target Warehouse fills empty item rows only | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Add a row with Target Warehouse A
2. Add a row with an empty warehouse
3. Select Default Target Warehouse B | A and B | Row 1 keeps A; row 2 is filled with B | High | Positive | - |
| 114 | 2. Add Stock Entry - Details Tab | TC-STA-052 | Default Target Warehouse is hidden for Material Issue | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Material Issue | - | Default Target Warehouse is not displayed | High | Positive | - |
| 115 | 2. Add Stock Entry - Details Tab | TC-STA-053 | Default Target Warehouse is displayed for Receipt, Transfer and Repack | Inventory > Stock Entry > Add Stock Entry > Details tab | Select each of the three types | - | Default Target Warehouse is displayed | Medium | Positive | - |
| 116 | 2. Add Stock Entry - Details Tab | TC-STA-054 | Leave Default Target Warehouse empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave it empty
2. Fill the rows with warehouses
3. Click Save | - | The entry is saved (field is optional) | Medium | Positive | - |
| 117 | 2. Add Stock Entry - Details Tab | TC-STA-055 | Target Warehouse Address Link is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Target Warehouse Address Link and type part of a name | Main | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 118 | 2. Add Stock Entry - Details Tab | TC-STA-056 | Source and target warehouses are the same in a Material Transfer | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select the same warehouse as source and target
2. Click Save | Stores - E to Stores - E | A validation error is displayed because source and target must differ | High | Negative | Needs Clarification: Not defined in the SRS. |
| 119 | 2. Add Stock Entry - Details Tab | TC-STA-057 | Scan Barcode accepts valid text | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter a barcode | 6221031260017 | The value is accepted | High | Positive | - |
| 120 | 2. Add Stock Entry - Details Tab | TC-STA-058 | Leave Scan Barcode empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave it empty
2. Click Save | - | The entry is saved (field is optional) | Medium | Positive | - |
| 121 | 2. Add Stock Entry - Details Tab | TC-STA-059 | Scan Barcode shorter than the minimum length (1 character) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 1 character in Scan Barcode | 6 | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 122 | 2. Add Stock Entry - Details Tab | TC-STA-060 | Scan Barcode at the minimum length (2 characters) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 2 characters | 62 | The value is accepted | Low | Positive | - |
| 123 | 2. Add Stock Entry - Details Tab | TC-STA-061 | Scan Barcode at the maximum length (100 characters) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter exactly 100 characters | 100-character text | The value is accepted | Low | Positive | - |
| 124 | 2. Add Stock Entry - Details Tab | TC-STA-062 | Scan Barcode longer than 100 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Try to enter 101 characters | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 125 | 2. Add Stock Entry - Details Tab | TC-STA-063 | Scan Barcode accepts letters, numbers and special characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter a mix of letters, numbers and special characters | ABC-123/x | The value is accepted | Medium | Positive | - |
| 126 | 2. Add Stock Entry - Details Tab | TC-STA-064 | Scan Barcode scans with the device camera | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select the scan option
2. Scan a barcode with the camera | Item barcode | The camera opens and the field is filled with the scanned value | Medium | Positive | - |
| 127 | 2. Add Stock Entry - Details Tab | TC-STA-065 | Scan Barcode typed slowly is cleared | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a barcode manually at a slow speed | 6221031260017 typed slowly | The entered value is cleared automatically | Medium | Negative | - |
| 128 | 2. Add Stock Entry - Details Tab | TC-STA-066 | Scanning a valid item barcode adds the item | Inventory > Stock Entry > Add Stock Entry > Details tab | Scan a barcode of an existing item | Barcode of Coffee Mug | The item is added to the items table (or its quantity increases) and Has Item Scanned is checked | High | Positive | Needs Clarification: SRS describes the field but not the effect of a successful scan. |
| 129 | 2. Add Stock Entry - Details Tab | TC-STA-067 | Scanning an unknown barcode | Inventory > Stock Entry > Add Stock Entry > Details tab | Scan a barcode that does not belong to any item | Unknown barcode | A clear error message is displayed and no row is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 130 | 2. Add Stock Entry - Details Tab | TC-STA-068 | Items table displays the default columns | Inventory > Stock Entry > Add Stock Entry > Details tab | Review the items table | - | The default columns are displayed (Checkbox, No., Source Warehouse, Target Warehouse, Item Code, Qty, Basic Rate) | Medium | UI | - |
| 131 | 2. Add Stock Entry - Details Tab | TC-STA-069 | Source Warehouse column is hidden for Material Receipt | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Material Receipt and review the items table | - | The Source Warehouse column is not displayed | High | Positive | - |
| 132 | 2. Add Stock Entry - Details Tab | TC-STA-070 | Target Warehouse column is hidden for Material Issue | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Material Issue and review the items table | - | The Target Warehouse column is not displayed | High | Positive | - |
| 133 | 2. Add Stock Entry - Details Tab | TC-STA-071 | Both warehouse columns are displayed for Transfer and Repack | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Material Transfer / Repack and review the items table | - | Source Warehouse and Target Warehouse are displayed | Medium | Positive | - |
| 134 | 2. Add Stock Entry - Details Tab | TC-STA-072 | Add Row adds a new item row | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Add Row in the items table | - | A new empty row is added to the table | High | Positive | - |
| 135 | 2. Add Stock Entry - Details Tab | TC-STA-073 | Item rows are numbered in order | Inventory > Stock Entry > Add Stock Entry > Details tab | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 136 | 2. Add Stock Entry - Details Tab | TC-STA-074 | Row Source Warehouse is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Source Warehouse in a row and type part of a name | Stores | The list is filtered while typing | High | Positive | - |
| 137 | 2. Add Stock Entry - Details Tab | TC-STA-075 | Row Source Warehouse lists only child warehouses | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the dropdown | Group warehouse; child warehouse | Only child warehouses are listed | High | Positive | - |
| 138 | 2. Add Stock Entry - Details Tab | TC-STA-076 | Leave row Source Warehouse empty (Issue / Transfer / Repack) | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Issue
2. Add a row with an item and no source warehouse
3. Click Save | - | An error message is displayed because Source Warehouse is mandatory | High | Negative | - |
| 139 | 2. Add Stock Entry - Details Tab | TC-STA-077 | Row Source Warehouse takes priority over the default | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select a default Source Warehouse
2. Select a different warehouse in the row | Default A; row B | The row keeps B | High | Positive | - |
| 140 | 2. Add Stock Entry - Details Tab | TC-STA-078 | Row Target Warehouse is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Target Warehouse in a row and type part of a name | Stores | The list is filtered while typing | High | Positive | - |
| 141 | 2. Add Stock Entry - Details Tab | TC-STA-079 | Row Target Warehouse lists only child warehouses | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the dropdown | Group warehouse; child warehouse | Only child warehouses are listed | High | Positive | - |
| 142 | 2. Add Stock Entry - Details Tab | TC-STA-080 | Leave row Target Warehouse empty (Receipt / Transfer / Repack) | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Receipt
2. Add a row with an item and no target warehouse
3. Click Save | - | An error message is displayed because the Target Warehouse is required | High | Negative | Needs Clarification: SRS marks Target Warehouse as Optional and, in the same field, says an error appears when it is left empty. Confirm the rule. |
| 143 | 2. Add Stock Entry - Details Tab | TC-STA-081 | Row Target Warehouse takes priority over the default | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select a default Target Warehouse
2. Select a different warehouse in the row | Default A; row B | The row keeps B | High | Positive | - |
| 144 | 2. Add Stock Entry - Details Tab | TC-STA-082 | Item Code is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Item Code and type part of an item code | Coffee | The list is filtered while typing and shows matching items | High | Positive | - |
| 145 | 2. Add Stock Entry - Details Tab | TC-STA-083 | Select an Item Code | Inventory > Stock Entry > Add Stock Entry > Details tab | Select an item in a row | Coffee Mug | The value is accepted and the UOM, rate and details are filled | High | Positive | - |
| 146 | 2. Add Stock Entry - Details Tab | TC-STA-084 | Leave Item Code empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Add a row
2. Leave Item Code empty
3. Click Save | - | An error message is displayed because Item Code is mandatory | High | Negative | - |
| 147 | 2. Add Stock Entry - Details Tab | TC-STA-085 | Item search with no matching result | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a non-existing item name | ZZZ Unknown | No results are displayed | Low | Negative | - |
| 148 | 2. Add Stock Entry - Details Tab | TC-STA-086 | Non-stock items in a Stock Entry | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Item Code dropdown | Delivery Service (Maintain Stock off) | To be confirmed with the BA (non-stock items hidden or rejected) | Medium | Negative | Needs Clarification: SRS does not filter the Item Code by Maintain Stock. |
| 149 | 2. Add Stock Entry - Details Tab | TC-STA-087 | Same item in two rows | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Add two rows with the same item
2. Click Save | Coffee Mug (x2) | To be confirmed with the BA (merged, blocked or allowed) | Medium | Negative | Needs Clarification: SRS does not define duplicate items. |
| 150 | 2. Add Stock Entry - Details Tab | TC-STA-088 | Qty accepts a valid number | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter a valid number in Qty | 12 | The value is accepted | High | Positive | - |
| 151 | 2. Add Stock Entry - Details Tab | TC-STA-089 | Leave Qty empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Add a row with an item
2. Leave Qty empty
3. Click Save | - | An error message is displayed because Qty is mandatory | High | Negative | - |
| 152 | 2. Add Stock Entry - Details Tab | TC-STA-090 | Qty shorter than the minimum length (1 digit) | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Enter 1 digit in Qty
2. Click Save | 5 | An error message is displayed because the minimum length is 2 characters | High | Negative | Needs Clarification: The 2-character minimum blocks valid single-digit quantities (1 to 9). Confirm if this is intended. |
| 153 | 2. Add Stock Entry - Details Tab | TC-STA-091 | Qty at the minimum length (2 digits) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 2 digits in Qty | 10 | The value is accepted | Medium | Positive | - |
| 154 | 2. Add Stock Entry - Details Tab | TC-STA-092 | Qty rejects letters and special characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Type letters and special characters in Qty | abc, @# | Only numbers are accepted | Medium | Negative | - |
| 155 | 2. Add Stock Entry - Details Tab | TC-STA-093 | Qty at the maximum length (100 digits) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter exactly 100 digits in Qty | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 156 | 2. Add Stock Entry - Details Tab | TC-STA-094 | Qty longer than 100 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Try to enter 101 digits in Qty | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 157 | 2. Add Stock Entry - Details Tab | TC-STA-095 | Qty equal to zero | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Enter 0 in Qty
2. Click Save | 00 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 158 | 2. Add Stock Entry - Details Tab | TC-STA-096 | Qty with decimal values | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Enter a decimal number in Qty
2. Click Save | 1.5 | To be confirmed with the BA (accepted or rejected) | Medium | Positive | Needs Clarification: SRS says 'numbers only'. |
| 159 | 2. Add Stock Entry - Details Tab | TC-STA-097 | Qty greater than the available stock (Issue / Transfer) | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Issue
2. Choose an item with 10 in stock
3. Enter Qty = 50
4. Click Submit | Available: 10; Qty: 50 | A validation error is displayed because the stock is insufficient | High | Negative | - |
| 160 | 2. Add Stock Entry - Details Tab | TC-STA-098 | Basic Rate (as per stock UOM) is a read-only label | Inventory > Stock Entry > Add Stock Entry > Details tab | Select an item and try to edit Basic Rate | Valuation Rate: 50 | Basic Rate shows the item valuation rate and cannot be edited | High | UI | - |
| 161 | 2. Add Stock Entry - Details Tab | TC-STA-099 | Basic Rate is fetched from the source warehouse valuation | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Transfer
2. Select an item and a source warehouse | Valuation Rate: 50 | Basic Rate shows the valuation rate of the item in the source warehouse | High | Positive | - |
| 162 | 2. Add Stock Entry - Details Tab | TC-STA-100 | Basic Rate for a Material Receipt | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Receipt
2. Select an item | Item with a standard rate | Basic Rate shows the item's rate | Medium | Positive | Needs Clarification: For a Material Receipt the rate is normally entered by the user (Set Basic Rate Manually column), but Basic Rate is read-only in the table. |
| 163 | 2. Add Stock Entry - Details Tab | TC-STA-101 | Action bar appears when an item row is selected | Inventory > Stock Entry > Add Stock Entry > Details tab | Select the checkbox of an item row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 164 | 2. Add Stock Entry - Details Tab | TC-STA-102 | Delete a single item row | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select one row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 165 | 2. Add Stock Entry - Details Tab | TC-STA-103 | Delete multiple item rows | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select two rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 166 | 2. Add Stock Entry - Details Tab | TC-STA-104 | Items: Open the table Settings popup | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Setting on the Items table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 167 | 2. Add Stock Entry - Details Tab | TC-STA-105 | Items: Reorder columns using drag and drop | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Setting
2. Drag the Target Warehouse column header and drop it before Source Warehouse | - | The column order changes to the new position | Medium | Positive | - |
| 168 | 2. Add Stock Entry - Details Tab | TC-STA-106 | Items: Column width default value is 3 | Inventory > Stock Entry > Add Stock Entry > Details tab | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 169 | 2. Add Stock Entry - Details Tab | TC-STA-107 | Items: Column width accepts numbers only | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 170 | 2. Add Stock Entry - Details Tab | TC-STA-108 | Items: Column width left empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 171 | 2. Add Stock Entry - Details Tab | TC-STA-109 | Items: Column width with 1 character | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 172 | 2. Add Stock Entry - Details Tab | TC-STA-110 | Items: Column width longer than 3 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 173 | 2. Add Stock Entry - Details Tab | TC-STA-111 | Items: Add / Remove Columns popup lists all columns | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Source Warehouse, Target Warehouse, Item Code, Qty, Basic Rate (as per Stock UOM), Item Name) | Medium | UI | Needs Clarification: SRS lists about 40 optional columns. Confirm the default visible columns. |
| 174 | 2. Add Stock Entry - Details Tab | TC-STA-112 | Items: Hide a column | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Add / Remove columns
2. Clear the Basic Rate (as per Stock UOM) checkbox
3. Click Update | Column: Basic Rate (as per Stock UOM) | The Basic Rate (as per Stock UOM) column is hidden from the table | Medium | Positive | - |
| 175 | 2. Add Stock Entry - Details Tab | TC-STA-113 | Items: Show a hidden column | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Hide the Basic Rate (as per Stock UOM) column
2. Open Add / Remove columns
3. Select the Basic Rate (as per Stock UOM) checkbox
4. Click Update | Column: Basic Rate (as per Stock UOM) | The Basic Rate (as per Stock UOM) column is displayed again | Medium | Positive | - |
| 176 | 2. Add Stock Entry - Details Tab | TC-STA-114 | Items: Save the Settings using Update | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 177 | 2. Add Stock Entry - Details Tab | TC-STA-115 | Items: Reset Settings to default | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 178 | 2. Add Stock Entry - Details Tab | TC-STA-116 | Items: open the Edit Row popup | Inventory > Stock Entry > Add Stock Entry > Details tab | Click the Edit Row icon of an item row | - | A popup is displayed with the row fields | High | Positive | - |
| 179 | 2. Add Stock Entry - Details Tab | TC-STA-117 | Items Edit Row: Barcode accepts valid text | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter a barcode | 6221031260017 | The value is accepted | Medium | Positive | - |
| 180 | 2. Add Stock Entry - Details Tab | TC-STA-118 | Items Edit Row: Barcode shorter than the minimum length (1 character) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 1 character | 6 | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 181 | 2. Add Stock Entry - Details Tab | TC-STA-119 | Items Edit Row: Barcode longer than 100 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Try to enter 101 characters | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 182 | 2. Add Stock Entry - Details Tab | TC-STA-120 | Items Edit Row: Barcode typed slowly is cleared | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a barcode at a slow speed | 6221031260017 | The entered value is cleared automatically | Low | Negative | - |
| 183 | 2. Add Stock Entry - Details Tab | TC-STA-121 | Items Edit Row: Has Item Scanned appears only for scanned items | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Scan an item barcode
2. Open Edit Row of the scanned row and of a manual row | - | Has Item Scanned (read-only) is displayed and checked only for the scanned row | Medium | Positive | - |
| 184 | 2. Add Stock Entry - Details Tab | TC-STA-122 | Items Edit Row: Source Warehouse is hidden for Material Receipt | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Receipt
2. Open Edit Row | - | Source Warehouse is not displayed | High | Positive | - |
| 185 | 2. Add Stock Entry - Details Tab | TC-STA-123 | Items Edit Row: Target Warehouse is hidden for Material Issue | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Issue
2. Open Edit Row | - | Target Warehouse is not displayed | High | Positive | - |
| 186 | 2. Add Stock Entry - Details Tab | TC-STA-124 | Items Edit Row: Source Warehouse is mandatory | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Edit Row
2. Clear Source Warehouse
3. Click Update | - | An error message is displayed because Source Warehouse is mandatory | Medium | Negative | - |
| 187 | 2. Add Stock Entry - Details Tab | TC-STA-125 | Items Edit Row: Item Code is mandatory | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Edit Row
2. Clear Item Code
3. Click Update | - | An error message is displayed because Item Code is mandatory | Medium | Negative | - |
| 188 | 2. Add Stock Entry - Details Tab | TC-STA-126 | Items Edit Row: Item Name is a read-only label | Inventory > Stock Entry > Add Stock Entry > Details tab | Select an item and review Item Name | Coffee Mug | Item Name is displayed only when an item is selected and cannot be edited | Medium | UI | - |
| 189 | 2. Add Stock Entry - Details Tab | TC-STA-127 | Items Edit Row: Quality Inspection label appears only when linked | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Create a Quality Inspection for the entry
2. Open Edit Row | QI-0001 | The Quality Inspection label is displayed; it is hidden when there is none | Low | Positive | - |
| 190 | 2. Add Stock Entry - Details Tab | TC-STA-128 | Items Edit Row: Description (Edit Row) accepts valid text | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter valid text in Description (Edit Row) | Deliver before noon | The value is accepted | Medium | Positive | - |
| 191 | 2. Add Stock Entry - Details Tab | TC-STA-129 | Items Edit Row: Leave Description (Edit Row) empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave Description (Edit Row) empty
2. Click Save | - | The document is saved (field is optional) | Medium | Positive | - |
| 192 | 2. Add Stock Entry - Details Tab | TC-STA-130 | Items Edit Row: Description (Edit Row) shorter than the minimum length (2 characters) | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Enter 2 characters in Description (Edit Row)
2. Click Save | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 193 | 2. Add Stock Entry - Details Tab | TC-STA-131 | Items Edit Row: Description (Edit Row) at the minimum length (3 characters) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 3 characters in Description (Edit Row) | abc | The value is accepted | Medium | Positive | - |
| 194 | 2. Add Stock Entry - Details Tab | TC-STA-132 | Items Edit Row: Description (Edit Row) at the maximum length (500 characters) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter exactly 500 characters in Description (Edit Row) | 500-character text | The value is accepted | Medium | Positive | - |
| 195 | 2. Add Stock Entry - Details Tab | TC-STA-133 | Items Edit Row: Description (Edit Row) longer than 500 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Try to enter or paste 501 characters in Description (Edit Row) | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 196 | 2. Add Stock Entry - Details Tab | TC-STA-134 | Items Edit Row: Description (Edit Row) accepts letters, numbers and special characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter a mix of letters, numbers and special characters in Description (Edit Row) | Gate #3 - floor 2 (A/B) | The value is accepted | Medium | Positive | - |
| 197 | 2. Add Stock Entry - Details Tab | TC-STA-135 | Items Edit Row: Description (Edit Row) rejects invalid data | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Enter invalid content such as script tags in Description (Edit Row)
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 198 | 2. Add Stock Entry - Details Tab | TC-STA-136 | Items Edit Row: Item Group is a read-only label | Inventory > Stock Entry > Add Stock Entry > Details tab | Select an item | Consumer Goods | Item Group is displayed and cannot be edited | Low | UI | - |
| 199 | 2. Add Stock Entry - Details Tab | TC-STA-137 | Items Edit Row: Item Image is read-only | Inventory > Stock Entry > Add Stock Entry > Details tab | Open Edit Row | - | The item image is displayed and cannot be changed | Low | UI | - |
| 200 | 2. Add Stock Entry - Details Tab | TC-STA-138 | Items Edit Row: Qty is mandatory and numeric | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Edit Row
2. Clear Qty / type letters
3. Click Update | abc | An error message is displayed for the empty value; letters are rejected | Medium | Negative | - |
| 201 | 2. Add Stock Entry - Details Tab | TC-STA-139 | Items Edit Row: UOM is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Open Edit Row and type part of a UOM | Box | The list is filtered while typing | Medium | Positive | - |
| 202 | 2. Add Stock Entry - Details Tab | TC-STA-140 | Items Edit Row: Leave UOM empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Clear UOM
2. Click Update | - | An error message is displayed because UOM is mandatory | Medium | Negative | - |
| 203 | 2. Add Stock Entry - Details Tab | TC-STA-141 | Items Edit Row: change the UOM | Inventory > Stock Entry > Add Stock Entry > Details tab | Select a different UOM | Box (12 Nos) | Conversion Factor, Qty as per Stock UOM and the rate are recalculated | High | Positive | - |
| 204 | 2. Add Stock Entry - Details Tab | TC-STA-142 | Items Edit Row: Qty as per Stock UOM is calculated | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Qty 2 Box (12) | 2 x 12 | Qty as per Stock UOM shows 24 | High | Positive | - |
| 205 | 2. Add Stock Entry - Details Tab | TC-STA-143 | Items Edit Row: Stock UOM is a read-only label | Inventory > Stock Entry > Add Stock Entry > Details tab | Review Stock UOM | Nos | Stock UOM shows the default UOM of the item | Medium | UI | - |
| 206 | 2. Add Stock Entry - Details Tab | TC-STA-144 | Items Edit Row: Conversion Factor accepts a valid number | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter a conversion factor | 12 | The value is accepted and Qty as per Stock UOM is recalculated | High | Positive | - |
| 207 | 2. Add Stock Entry - Details Tab | TC-STA-145 | Items Edit Row: Leave Conversion Factor empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Clear Conversion Factor
2. Click Update | - | An error message is displayed because Conversion Factor is mandatory | Medium | Negative | - |
| 208 | 2. Add Stock Entry - Details Tab | TC-STA-146 | Items Edit Row: Conversion Factor rejects letters | Inventory > Stock Entry > Add Stock Entry > Details tab | Type letters in Conversion Factor | abc | Letters are not accepted | Medium | Negative | - |
| 209 | 2. Add Stock Entry - Details Tab | TC-STA-147 | Items Edit Row: Conversion Factor equal to zero or negative | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Enter 0 / -1 in Conversion Factor
2. Click Update | 0, -1 | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 210 | 2. Add Stock Entry - Details Tab | TC-STA-148 | Items Edit Row: Conversion Factor with decimals | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter a decimal factor | 0.001 | The value is accepted | Medium | Positive | Needs Clarification: SRS says 'numbers only' without saying whether decimals are allowed. |
| 211 | 2. Add Stock Entry - Details Tab | TC-STA-149 | Items Edit Row: Basic Rate, Additional Cost, Landed Cost Voucher Amount, Valuation Rate are read-only | Inventory > Stock Entry > Add Stock Entry > Details tab | Open Edit Row of a submitted entry | - | The four labels are displayed and cannot be edited | Medium | UI | - |
| 212 | 2. Add Stock Entry - Details Tab | TC-STA-150 | Items Edit Row: Additional Cost is allocated from the Additional Costs tab | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Add an additional cost of 100 to a Material Receipt with two items
2. Open Edit Row of each item | Cost 100 | Each item shows its share of the additional cost | High | Positive | Needs Clarification: SRS does not say how the cost is distributed (by value, quantity or equally). |
| 213 | 2. Add Stock Entry - Details Tab | TC-STA-151 | Items Edit Row: Valuation Rate includes the additional cost | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Basic Rate 50
2. Additional cost per unit 5 | 50 + 5 | Valuation Rate shows 55 | High | Positive | - |
| 214 | 2. Add Stock Entry - Details Tab | TC-STA-152 | Items Edit Row: Allow Zero Valuation Rate | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Allow Zero Valuation Rate
2. Receive an item with a zero rate
3. Click Submit | Rate: 0 | The entry is submitted with a zero valuation rate | Medium | Positive | - |
| 215 | 2. Add Stock Entry - Details Tab | TC-STA-153 | Items Edit Row: Zero valuation rate without the checkbox | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave Allow Zero Valuation Rate unchecked
2. Receive an item with a zero rate
3. Click Submit | Rate: 0 | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS (standard behavior). |
| 216 | 2. Add Stock Entry - Details Tab | TC-STA-154 | Items Edit Row: Basic Amount = Basic Rate x Qty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Basic Rate 50
2. Qty 12 | 50 x 12 | Basic Amount shows 600 | High | Positive | - |
| 217 | 2. Add Stock Entry - Details Tab | TC-STA-155 | Items Edit Row: Amount includes the additional cost | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Basic Amount 600
2. Additional cost 60 | 600 + 60 | Amount shows 660 | Medium | Positive | - |
| 218 | 2. Add Stock Entry - Details Tab | TC-STA-156 | Items Edit Row: Basic Amount and Amount are read-only | Inventory > Stock Entry > Add Stock Entry > Details tab | Try to edit both fields | - | Neither field can be edited | Medium | UI | - |
| 219 | 2. Add Stock Entry - Details Tab | TC-STA-157 | Items Edit Row: Set Basic Rate Manually | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Add / Remove columns list and look for Set Basic Rate Manually | - | To be confirmed with the BA (column is listed but no field is described) | Medium | Positive | Needs Clarification: 'Set Basic Rate Manually' is in the column list but has no field description or Edit Row field. |
| 220 | 2. Add Stock Entry - Details Tab | TC-STA-158 | Items Edit Row: Pick Serial / Batch No is hidden when the Inventory Settings option is off | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Disable 'Activate Serial / Batch No for item' in Inventory Settings
2. Open Edit Row | Setting: off | The Pick Serial / Batch No button is not displayed | High | Positive | - |
| 221 | 2. Add Stock Entry - Details Tab | TC-STA-159 | Items Edit Row: Pick Serial / Batch No is displayed when the option is on | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Enable 'Activate Serial / Batch No for item' in Inventory Settings
2. Open Edit Row | Setting: on | The Pick Serial / Batch No button is displayed | High | Positive | - |
| 222 | 2. Add Stock Entry - Details Tab | TC-STA-160 | Items Edit Row: Pick Serial / Batch No selects numbers using the picking method | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Set the picking method to FIFO
2. Click Pick Serial / Batch No for a serialized item in a Material Issue | Item: Laptop X1; Qty 2; FIFO | The oldest 2 serial numbers are selected automatically | High | Positive | - |
| 223 | 2. Add Stock Entry - Details Tab | TC-STA-161 | Items Edit Row: Pick Serial / Batch No with the Expiry method | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Set the picking method to Expiry
2. Click Pick Serial / Batch No for a batch item | Batches with different expiry dates | The batches with the nearest expiry are selected first | High | Positive | - |
| 224 | 2. Add Stock Entry - Details Tab | TC-STA-162 | Items Edit Row: Pick Serial / Batch No for a Material Receipt | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Receipt
2. Click Pick Serial / Batch No | Receipt | To be confirmed with the BA (for incoming stock the numbers are created, not picked) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 225 | 2. Add Stock Entry - Details Tab | TC-STA-163 | Items Edit Row: Serial and Batch Bundle is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Serial and Batch Bundle and type part of a name | SABB | The list is filtered and the selection is accepted (optional) | Medium | Positive | - |
| 226 | 2. Add Stock Entry - Details Tab | TC-STA-164 | Items Edit Row: Use Serial No / Batch Fields hides the picker and bundle | Inventory > Stock Entry > Add Stock Entry > Details tab | Check Use Serial No / Batch Fields | - | The Pick button and the bundle field are hidden; Serial No and Batch No are displayed | High | Positive | - |
| 227 | 2. Add Stock Entry - Details Tab | TC-STA-165 | Items Edit Row: Serial No / Batch No are hidden when the checkbox is unchecked | Inventory > Stock Entry > Add Stock Entry > Details tab | Leave Use Serial No / Batch Fields unchecked | - | Serial No and Batch No are not displayed | Medium | UI | - |
| 228 | 2. Add Stock Entry - Details Tab | TC-STA-166 | Items Edit Row: Serial No accepts a valid serial number | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Use Serial No / Batch Fields
2. Enter a serial number | SN-0001 | The value is accepted | High | Positive | - |
| 229 | 2. Add Stock Entry - Details Tab | TC-STA-167 | Items Edit Row: Serial No: Enter key creates a new line | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Enter a serial number
2. Press Enter
3. Enter another serial number | SN-0001, SN-0002 | A new line is created for each serial number | High | Positive | - |
| 230 | 2. Add Stock Entry - Details Tab | TC-STA-168 | Items Edit Row: Serial No shorter than the minimum length (2 characters) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 2 characters in Serial No | SN | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 231 | 2. Add Stock Entry - Details Tab | TC-STA-169 | Items Edit Row: Serial No at the maximum length (500 characters) | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter exactly 500 characters | 500-character text | The value is accepted | Low | Positive | - |
| 232 | 2. Add Stock Entry - Details Tab | TC-STA-170 | Items Edit Row: Serial No longer than 500 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Try to enter 501 characters | 501-character text | Input stops at 500 characters | Low | Negative | - |
| 233 | 2. Add Stock Entry - Details Tab | TC-STA-171 | Items Edit Row: Serial No rejects invalid data | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter script tags | <script>x</script> | An error message is displayed | Medium | Negative | - |
| 234 | 2. Add Stock Entry - Details Tab | TC-STA-172 | Items Edit Row: Serial numbers count must match the Qty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Qty 3
2. Enter only 2 serial numbers
3. Click Save | Qty 3; 2 serials | A validation error is displayed | High | Negative | Needs Clarification: Not defined in the SRS. |
| 235 | 2. Add Stock Entry - Details Tab | TC-STA-173 | Items Edit Row: Serial No that is not in the source warehouse | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Issue
2. Enter a serial number that is not in the source warehouse
3. Click Save | SN-9999 | A validation error is displayed | High | Negative | Needs Clarification: Not defined in the SRS. |
| 236 | 2. Add Stock Entry - Details Tab | TC-STA-174 | Items Edit Row: Batch No is a searchable dropdown filtered by item and warehouse | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Use Serial No / Batch Fields
2. Open Batch No | Item: Milk 1L; Warehouse: Stores - E | Only batches of the item in the selected warehouse are listed | High | Positive | - |
| 237 | 2. Add Stock Entry - Details Tab | TC-STA-175 | Items Edit Row: Select a Batch No | Inventory > Stock Entry > Add Stock Entry > Details tab | Select a batch | BATCH-A | The value is accepted | High | Positive | - |
| 238 | 2. Add Stock Entry - Details Tab | TC-STA-176 | Items Edit Row: Difference Account is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Details tab | Type part of an account name | Stock Adjustment | The list is filtered and the selection is accepted (optional) | Medium | Positive | - |
| 239 | 2. Add Stock Entry - Details Tab | TC-STA-177 | Items Edit Row: Difference Account for an opening entry | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Set Is Opening = Yes
2. Review Difference Account | Temporary Opening | To be confirmed with the BA (account expected to be an Asset / Liability type) | Low | Positive | Needs Clarification: Not defined in the SRS. |
| 240 | 2. Add Stock Entry - Details Tab | TC-STA-178 | Items Edit Row: Cost Center and Project | Inventory > Stock Entry > Add Stock Entry > Details tab | Select a Cost Center and a Project | Main - STC; Warehouse Expansion | Both values are accepted (optional) | Medium | Positive | - |
| 241 | 2. Add Stock Entry - Details Tab | TC-STA-179 | Items Edit Row: Actual Qty (at source / target) is displayed | Inventory > Stock Entry > Add Stock Entry > Details tab | Select an item and a warehouse | Warehouse stock: 20 | Actual Qty shows 20 and cannot be edited | High | Positive | - |
| 242 | 2. Add Stock Entry - Details Tab | TC-STA-180 | Items Edit Row: Actual Qty updates when the warehouse changes | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select warehouse A
2. Change to warehouse B | 20 > 5 | Actual Qty shows the quantity of warehouse B | Medium | Positive | - |
| 243 | 2. Add Stock Entry - Details Tab | TC-STA-181 | Items Edit Row: Transferred Qty is displayed | Inventory > Stock Entry > Add Stock Entry > Details tab | Open Edit Row of an entry created from a Material Request | Transferred: 6 | Transferred Qty (read-only) shows the transferred quantity | Medium | Positive | - |
| 244 | 2. Add Stock Entry - Details Tab | TC-STA-182 | Items Edit Row: Allow alternative item checkbox | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Check Allow alternative item
2. Click Update | - | The value is accepted | Low | Positive | Needs Clarification: SRS gives no behavior for this checkbox. |
| 245 | 2. Add Stock Entry - Details Tab | TC-STA-183 | Items Edit Row: Material Request and Material Request Item appear only for linked entries | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Create an entry from a Material Request
2. Open Edit Row | MR-0001 | Both labels are displayed; they are hidden for entries not created from a Material Request | Medium | Positive | - |
| 246 | 2. Add Stock Entry - Details Tab | TC-STA-184 | Items Edit Row: Against Stock Entry and Stock Entry Child are read-only | Inventory > Stock Entry > Add Stock Entry > Details tab | Open Edit Row of an inbound transit entry | - | Both labels are displayed and cannot be edited | Low | UI | - |
| 247 | 2. Add Stock Entry - Details Tab | TC-STA-185 | Items Edit Row: Reference Purchase Receipt is a clickable link | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Edit Row of an entry generated from a Purchase Receipt
2. Click Reference Purchase Receipt | PR-0001 | The user is redirected to the Purchase Receipt Details screen | Medium | Positive | - |
| 248 | 2. Add Stock Entry - Details Tab | TC-STA-186 | Items Edit Row: save changes with Update | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Open Edit Row
2. Change Qty and Description
3. Click Update | Qty: 12 > 20 | The popup closes and the changes are reflected in the row | High | Positive | - |
| 249 | 2. Add Stock Entry - Details Tab | TC-STA-187 | Get Items From dropdown lists the sources | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Get Items From | - | The dropdown contains: Purchase Invoice, Material Request, Expired Batches, Transit Entry | High | UI | - |
| 250 | 2. Add Stock Entry - Details Tab | TC-STA-188 | Open the Get Items From Purchase Invoice popup | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Click Get Items From
2. Click Purchase Invoice | - | A popup is displayed with Search (Name), Supplier, the Purchase Invoices list and Get Items | High | Positive | - |
| 251 | 2. Add Stock Entry - Details Tab | TC-STA-189 | Purchase Invoices popup columns | Inventory > Stock Entry > Add Stock Entry > Details tab | Review the list in the popup | - | The list shows: Checkbox, No., Name, Supplier | Medium | UI | - |
| 252 | 2. Add Stock Entry - Details Tab | TC-STA-190 | Search Purchase Invoices by full and partial name | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a name / part of a name in Search | PINV-0001 / 0001 | Matching invoices are displayed | Medium | Positive | - |
| 253 | 2. Add Stock Entry - Details Tab | TC-STA-191 | Purchase Invoice search maximum length is 100 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 101 characters in Search | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 254 | 2. Add Stock Entry - Details Tab | TC-STA-192 | Search Purchase Invoices with no match | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a non-existing name | ZZZ-9999 | No invoices are displayed | Low | Negative | - |
| 255 | 2. Add Stock Entry - Details Tab | TC-STA-193 | Filter Purchase Invoices by Supplier | Inventory > Stock Entry > Add Stock Entry > Details tab | Select a Supplier in the popup | Delta Supplies | Only invoices of the selected Supplier are displayed | Medium | Positive | - |
| 256 | 2. Add Stock Entry - Details Tab | TC-STA-194 | Purchase Invoice name opens Purchase Invoice Details | Inventory > Stock Entry > Add Stock Entry > Details tab | Click an invoice name in the popup | PINV-0001 | The user is redirected to the Purchase Invoice Details screen | Medium | Positive | - |
| 257 | 2. Add Stock Entry - Details Tab | TC-STA-195 | Get Items adds the Purchase Invoice items to the table | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select one Purchase Invoice
2. Click Get Items | PINV-0001 | The invoice items are added to the items table | High | Positive | - |
| 258 | 2. Add Stock Entry - Details Tab | TC-STA-196 | Get Items from a Purchase Invoice for a Material Issue | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Issue
2. Get items from a Purchase Invoice | Material Issue | To be confirmed with the BA (items fetched or blocked for non-receipt types) | Medium | Negative | Needs Clarification: SRS does not link Purchase Invoice items to the Stock Entry Type. |
| 259 | 2. Add Stock Entry - Details Tab | TC-STA-197 | Get Items without selecting a Purchase Invoice | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Do not select any invoice
2. Click Get Items | - | A message asks the user to select an invoice; nothing is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 260 | 2. Add Stock Entry - Details Tab | TC-STA-198 | Open the Get Items From Material Request popup | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Click Get Items From
2. Click Material Request | - | A popup is displayed with Search (Name), Purpose, the Material Requests list and Get Items | High | Positive | - |
| 261 | 2. Add Stock Entry - Details Tab | TC-STA-199 | Purpose dropdown lists the allowed values | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the Purpose dropdown | - | The dropdown contains: Material Transfer, Material Issue, Purchase | Medium | Positive | - |
| 262 | 2. Add Stock Entry - Details Tab | TC-STA-200 | Material Requests popup lists only Pending requests | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the popup | MR-0001 (Pending); MR-0002 (Received); MR-0003 (Stopped) | Only MR-0001 is listed | High | Positive | - |
| 263 | 2. Add Stock Entry - Details Tab | TC-STA-201 | Filter Material Requests by Purpose = Material Transfer | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Purpose = Material Transfer | Material Transfer | Only Pending Material Transfer requests are displayed | Medium | Positive | - |
| 264 | 2. Add Stock Entry - Details Tab | TC-STA-202 | Filter Material Requests by Purpose = Material Issue | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Purpose = Material Issue | Material Issue | Only Pending Material Issue requests are displayed | Medium | Positive | - |
| 265 | 2. Add Stock Entry - Details Tab | TC-STA-203 | Filter by Purpose = Purchase excludes Ordered, RFQ and Supplier Quotation requests | Inventory > Stock Entry > Add Stock Entry > Details tab | Select Purpose = Purchase | MR-0004 (Ordered); MR-0005 (Request for Quotation); MR-0006 (Pending) | Only MR-0006 is listed | High | Positive | Needs Clarification: Why a Stock Entry can fetch a Purchase request is not explained in the SRS. |
| 266 | 2. Add Stock Entry - Details Tab | TC-STA-204 | Material Requests popup columns | Inventory > Stock Entry > Add Stock Entry > Details tab | Review the list in the popup | - | The list shows: Checkbox, No., Name, Material Request Type, Customer | Medium | UI | - |
| 267 | 2. Add Stock Entry - Details Tab | TC-STA-205 | Search Material Requests by full and partial name | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a name / part of a name in Search | MR-0001 / 0001 | Matching requests are displayed | Medium | Positive | - |
| 268 | 2. Add Stock Entry - Details Tab | TC-STA-206 | Material Request search maximum length is 100 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 101 characters in Search | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 269 | 2. Add Stock Entry - Details Tab | TC-STA-207 | Search Material Requests with no match | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a non-existing name | ZZZ-9999 | No requests are displayed | Low | Negative | - |
| 270 | 2. Add Stock Entry - Details Tab | TC-STA-208 | Material Request name opens Material Request Details | Inventory > Stock Entry > Add Stock Entry > Details tab | Click a request name in the popup | MR-0001 | The user is redirected to the Material Request Details screen | Medium | Positive | - |
| 271 | 2. Add Stock Entry - Details Tab | TC-STA-209 | Get Items adds the Material Request items to the table | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select one Material Request
2. Click Get Items | MR-0001 | The request items are added with their quantities and warehouses | High | Positive | - |
| 272 | 2. Add Stock Entry - Details Tab | TC-STA-210 | Get Items with multiple Material Requests | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select two Material Requests
2. Click Get Items | MR-0001, MR-0002 | The items of both requests are added | Medium | Positive | - |
| 273 | 2. Add Stock Entry - Details Tab | TC-STA-211 | Get Items from a request whose purpose differs from the Stock Entry Type | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Receipt
2. Get items from a Material Transfer request | Receipt vs Transfer | To be confirmed with the BA (type changes, blocked, or allowed) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 274 | 2. Add Stock Entry - Details Tab | TC-STA-212 | Get Items without selecting a Material Request | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Do not select any request
2. Click Get Items | - | A message asks the user to select a request; nothing is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 275 | 2. Add Stock Entry - Details Tab | TC-STA-213 | Expired Batches fetches items with expired batches | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Click Get Items From
2. Click Expired Batches | Batch BATCH-OLD expired 2026-09-30; qty 5 | The items with expired batches and their available quantities are added to the table and Batch No is filled | High | Positive | - |
| 276 | 2. Add Stock Entry - Details Tab | TC-STA-214 | Expired Batches when no batch is expired | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Make sure no batch is expired
2. Click Expired Batches | No expired batches | A message is displayed and no rows are added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 277 | 2. Add Stock Entry - Details Tab | TC-STA-215 | Expired Batches is typically used with Material Issue | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select Material Receipt
2. Click Expired Batches | Receipt | To be confirmed with the BA (blocked or allowed for other types) | Low | Negative | Needs Clarification: Not defined in the SRS. |
| 278 | 2. Add Stock Entry - Details Tab | TC-STA-216 | Open the Transit Entry popup | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Click Get Items From
2. Click Transit Entry | - | A popup is displayed with Search (Name), Stock Entry Type, the Stock Entry list and Get Items | High | Positive | - |
| 279 | 2. Add Stock Entry - Details Tab | TC-STA-217 | Stock Entry Type in the Transit Entry popup is fixed | Inventory > Stock Entry > Add Stock Entry > Details tab | Review the Stock Entry Type field | - | It shows Material Transfer and cannot be changed | Medium | UI | - |
| 280 | 2. Add Stock Entry - Details Tab | TC-STA-218 | Transit Entry list shows only transit transfers | Inventory > Stock Entry > Add Stock Entry > Details tab | Open the popup | MAT-STE-0001 (Add To Transit); MAT-STE-0002 (normal transfer) | Only transit entries are listed | High | Positive | Needs Clarification: SRS does not state which statuses are listed (In Transit only?). |
| 281 | 2. Add Stock Entry - Details Tab | TC-STA-219 | Transit Entry list columns | Inventory > Stock Entry > Add Stock Entry > Details tab | Review the list in the popup | - | The list shows: Checkbox, No., Name, Stock Entry Type, Add To Transit (read-only, always checked) | Medium | UI | - |
| 282 | 2. Add Stock Entry - Details Tab | TC-STA-220 | Add To Transit checkbox in the popup is always checked and read-only | Inventory > Stock Entry > Add Stock Entry > Details tab | Try to change the Add To Transit checkbox | - | It stays checked and cannot be changed | Medium | UI | - |
| 283 | 2. Add Stock Entry - Details Tab | TC-STA-221 | Search Transit Entries by full and partial name | Inventory > Stock Entry > Add Stock Entry > Details tab | Type a name / part of a name in Search | MAT-STE-0001 / 0001 | Matching entries are displayed | Medium | Positive | - |
| 284 | 2. Add Stock Entry - Details Tab | TC-STA-222 | Transit Entry search maximum length is 100 characters | Inventory > Stock Entry > Add Stock Entry > Details tab | Enter 101 characters in Search | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 285 | 2. Add Stock Entry - Details Tab | TC-STA-223 | Transit Entry name opens the entry | Inventory > Stock Entry > Add Stock Entry > Details tab | Click a name in the popup | MAT-STE-0001 | The user is redirected to the selected entry | Medium | Positive | Needs Clarification: SRS says it navigates to 'Material Request details' (copy/paste). |
| 286 | 2. Add Stock Entry - Details Tab | TC-STA-224 | Get Items fetches the transit entry items | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select one transit entry
2. Click Get Items | MAT-STE-0001 | The items are added to the table | High | Positive | - |
| 287 | 2. Add Stock Entry - Details Tab | TC-STA-225 | Get Items sets the Stock Entry Type to Material Transfer and locks it | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select one transit entry
2. Click Get Items
3. Try to change the Stock Entry Type | - | The type is Material Transfer and cannot be changed | High | Positive | - |
| 288 | 2. Add Stock Entry - Details Tab | TC-STA-226 | Inbound entry shows Stock Entry (Outward GIT) | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Get items from a transit entry
2. Save the new entry | MAT-STE-0001 | The Stock Entry (Outward GIT) label shows the outbound entry | High | Positive | - |
| 289 | 2. Add Stock Entry - Details Tab | TC-STA-227 | Get Items without selecting a transit entry | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Do not select any entry
2. Click Get Items | - | A message asks the user to select an entry; nothing is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 290 | 2. Add Stock Entry - Details Tab | TC-STA-228 | Receive more than the in-transit quantity | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Get items from a transit entry
2. Increase the Qty above the transit quantity
3. Click Save | Transit 6; Qty 10 | A validation error is displayed | High | Negative | Needs Clarification: Not defined in the SRS. |
| 291 | 2. Add Stock Entry - Details Tab | TC-STA-229 | Create Material Request dropdown lists the actions | Inventory > Stock Entry > Add Stock Entry > Details tab | Click Create Material Request | - | The dropdown contains: Create Transfer Material Request, Create Issue Material Request | Medium | UI | - |
| 292 | 2. Add Stock Entry - Details Tab | TC-STA-230 | Create Transfer Material Request | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Click Create Material Request > Create Transfer Material Request | - | The Add Material Request screen opens with Purpose = Material Transfer, which cannot be changed | High | Positive | - |
| 293 | 2. Add Stock Entry - Details Tab | TC-STA-231 | Create Issue Material Request | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Click Create Material Request > Create Issue Material Request | - | The Add Material Request screen opens with Purpose = Material Issue, which cannot be changed | High | Positive | - |
| 294 | 2. Add Stock Entry - Details Tab | TC-STA-232 | Create Material Request fetches the Stock Entry items | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Add items to the Stock Entry
2. Click Create Material Request | Coffee Mug x12 | The Material Request is pre-filled with the Stock Entry items | Medium | Positive | Needs Clarification: SRS does not say whether the items are fetched. |
| 295 | 2. Add Stock Entry - Details Tab | TC-STA-233 | Save a Stock Entry with valid data | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Select a Series and a Stock Entry Type
2. Add an item row with warehouse and Qty
3. Click Save | Series: MAT-STE-.YYYY.-; Type: Material Receipt; Item: Coffee Mug; Target: Stores - E; Qty: 12 | The entry is saved (not submitted), added to the Stock Entry list with status Draft | High | Positive | - |
| 296 | 2. Add Stock Entry - Details Tab | TC-STA-234 | Save with all mandatory fields empty | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Leave the form empty
2. Click Save | - | A validation error message is displayed for each mandatory field (Series, Stock Entry Type, Item Code, Qty, Source Warehouse) | High | Negative | - |
| 297 | 2. Add Stock Entry - Details Tab | TC-STA-235 | Save an entry with no item rows | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Fill the header
2. Do not add rows
3. Click Save | No rows | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one item is required. |
| 298 | 2. Add Stock Entry - Details Tab | TC-STA-236 | Saved data is displayed correctly when reopened | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Save a valid entry
2. Open it from the list | MAT-STE-2026-00001 | All saved values are displayed correctly | High | Positive | - |
| 299 | 2. Add Stock Entry - Details Tab | TC-STA-237 | Submit button is displayed only after Save | Inventory > Stock Entry > Add Stock Entry > Details tab | 1. Click Save on a valid entry
2. Review the buttons | - | The Submit button is displayed after saving | High | Positive | - |
| 300 | 2. Add Stock Entry - Details Tab | TC-STA-238 | Submit button is hidden before Save | Inventory > Stock Entry > Add Stock Entry > Details tab | Review the buttons on a new unsaved entry | - | The Submit button is not displayed | Medium | Negative | - |
| 301 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-001 | Submit a Material Receipt | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Create a Material Receipt with a target warehouse
2. Click Submit | Coffee Mug +12 to Stores - E | The entry is submitted with status Submitted and the target warehouse stock increases by 12 | High | Positive | - |
| 302 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-002 | Submit a Material Issue | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Create a Material Issue with a source warehouse
2. Click Submit | Coffee Mug -6 from Stores - E | The entry is submitted and the source warehouse stock decreases by 6 | High | Positive | - |
| 303 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-003 | Submit a Material Transfer (no transit) | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Create a Material Transfer between two warehouses
2. Click Submit | Stores - E to Finished Goods - E, 6 | The entry is submitted, the source stock decreases and the target stock increases by 6 | High | Positive | - |
| 304 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-004 | Submit a Repack | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Create a Repack with source and target items
2. Click Submit | Source 6 Nos; target 1 Box | The entry is submitted and the stock of the source and target items is updated | High | Positive | Needs Clarification: SRS gives no field for the finished item or the repack conversion. |
| 305 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-005 | Submit with a missing mandatory value | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Remove the Source Warehouse from a row
2. Click Submit | - | The entry is not submitted and a validation error is displayed | High | Negative | - |
| 306 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-006 | Submit creates Stock Ledger Entries | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Submit an entry
2. Open View > Stock Ledger | - | A ledger entry exists for each item and warehouse movement | High | Positive | - |
| 307 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-007 | Submit creates the accounting entries | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Submit an entry with valuation
2. Open View > Accounting Ledger | - | General Ledger entries are created (stock account / difference account) | Medium | Positive | Needs Clarification: Accounting entries are not described in the SRS. |
| 308 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-008 | Submitted entry is read-only | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Submit an entry
2. Try to edit any field | - | All fields are read-only | High | Negative | - |
| 309 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-009 | Submit a Material Issue with insufficient stock | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Enter Qty greater than the stock
2. Click Submit | Stock 4; Qty 10 | A validation error is displayed and the entry is not submitted | High | Negative | - |
| 310 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-010 | Submit a Material Transfer from a warehouse with a negative balance rule | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Transfer more than the actual quantity
2. Click Submit | Stock 4; Qty 10 | A validation error is displayed | Medium | Negative | - |
| 311 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-011 | Submit with Allow Negative Stock enabled | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Enable Allow Negative Stock in Stock Settings
2. Issue more than the stock
3. Click Submit | Stock 4; Qty 10 | The entry is submitted and the balance becomes negative | Low | Positive | Needs Clarification: Not covered in the SRS. |
| 312 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-012 | Submit from a Material Request (full quantity) | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Get items from a Pending Material Request
2. Keep the full quantity
3. Save and submit | MR-0001: 12 of 12 | The Material Request status becomes Received | High | Positive | - |
| 313 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-013 | Submit from a Material Request (partial quantity) | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Get items from a Pending Material Request
2. Reduce the quantity
3. Save and submit | MR-0001: 6 of 12 | The Material Request status becomes Partially Received | High | Positive | - |
| 314 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-014 | Second Stock Entry completes a Partially Received request | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Create another entry for the remaining quantity
2. Submit | MR-0001: 6 + 6 | The Material Request status becomes Received | High | Positive | - |
| 315 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-015 | Transferred Qty and Per Transferred are updated | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Submit an entry created from a Material Request
2. Open the entry and the list | 6 of 12 | Transferred Qty shows 6 and Per Transferred shows 50% | Medium | Positive | - |
| 316 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-016 | Submit with Add To Transit checked | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Create a Material Transfer with Add To Transit and a Transit warehouse as target
2. Click Submit | Stores - E to Transit - E | The entry status is In Transit and the stock moves to the transit warehouse | High | Positive | - |
| 317 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-017 | Cancel button appears only for Submitted entries | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | Open Draft, Submitted and In Transit entries | 3 entries | Cancel is displayed only on the Submitted entry | High | Positive | - |
| 318 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-018 | Cancel a Submitted entry that is not linked | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Open an unlinked Submitted entry
2. Click Cancel | Unlinked entry | The Stock Entry is cancelled successfully | High | Positive | - |
| 319 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-019 | Cancel a Submitted entry that is linked to other transactions | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Open an entry linked to an inbound transit entry
2. Click Cancel | Linked entry | A message informs the user that the linked transactions must be cancelled first | High | Negative | - |
| 320 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-020 | Cancelling an entry created from a Material Request reverts the request status | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Cancel a submitted entry created from a Material Request
2. Open the request | MR-0001 | The Material Request returns to Pending (or Partially Received) | High | Positive | Needs Clarification: Not defined in the SRS. |
| 321 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-021 | Amend a Cancelled entry | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Open a Cancelled entry
2. Look for Amend | Status: Cancelled | To be confirmed with the BA (Amended From exists but no Amend action is described) | Medium | Positive | Needs Clarification: SRS defines the Amended From field but no Amend button. |
| 322 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-022 | End Transit button appears for a submitted entry with Add To Transit | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | Open an In Transit entry | Status: In Transit | The End Transit button is displayed | High | Positive | - |
| 323 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-023 | End Transit is hidden when Add To Transit is not checked | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | Open a normal Submitted Material Transfer | Add To Transit: unchecked | The End Transit button is not displayed | High | Negative | - |
| 324 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-024 | End Transit is hidden for a Draft entry | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | Open a Draft transit entry | Status: Draft | The End Transit button is not displayed | Medium | Negative | - |
| 325 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-025 | End Transit moves the target warehouse to the source | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Open an In Transit entry
2. Click End Transit | Source: Stores - E; Target: Transit - E | The previous Target Warehouse (Transit - E) becomes the Source Warehouse | High | Positive | - |
| 326 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-026 | End Transit clears the target warehouse | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click End Transit | - | The Target Warehouse is cleared and becomes editable | High | Positive | - |
| 327 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-027 | End Transit target warehouse is no longer limited to Transit warehouses | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click End Transit
2. Open the Target Warehouse dropdown | - | All child warehouses are listed so the final destination can be selected | High | Positive | - |
| 328 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-028 | End Transit replaces Submit with Save | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click End Transit | - | The Submit button is replaced by the Save button | High | Positive | - |
| 329 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-029 | Save after End Transit changes Save to Submit | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click End Transit
2. Select the final target warehouse
3. Click Save | Final: Finished Goods - E | The data is saved and the Save button changes to Submit | High | Positive | - |
| 330 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-030 | Submit after End Transit completes the transfer | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click End Transit
2. Select the final warehouse
3. Save
4. Submit | Transit - E to Finished Goods - E | The End Transit button disappears, the status changes from In Transit to Submitted, all fields become read-only and the stock moves to the final warehouse | High | Positive | - |
| 331 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-031 | Stock after End Transit | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Complete the End Transit flow
2. Check the stock of the transit and final warehouses | 6 units | The transit warehouse stock decreases and the final warehouse stock increases by the transferred quantity | High | Positive | - |
| 332 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-032 | End Transit without selecting a final warehouse | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click End Transit
2. Leave Target Warehouse empty
3. Click Save | - | A validation error is displayed because the target warehouse is required | High | Negative | - |
| 333 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-033 | End Transit to the same transit warehouse | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click End Transit
2. Select the same transit warehouse as the target | Transit - E to Transit - E | A validation error is displayed (source and target must differ) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 334 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-034 | Add Transit button appears for an entry with Add To Transit | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | Open an In Transit entry | Status: In Transit | The Add Transit button is displayed | High | Positive | - |
| 335 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-035 | Add Transit is hidden when Add To Transit is not checked | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | Open a normal Submitted Material Transfer | Add To Transit: unchecked | The Add Transit button is not displayed | Medium | Negative | - |
| 336 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-036 | Add Transit moves the target warehouse to the source | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Open an In Transit entry
2. Click Add Transit | Transit - E | The previous Target Warehouse becomes the new Source Warehouse and the Target Warehouse is cleared | High | Positive | - |
| 337 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-037 | Add Transit filters the target to Transit Warehouses | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click Add Transit
2. Open the Target Warehouse dropdown | Transit - W; Stores - E | Only warehouses of type Transit Warehouse are listed | High | Positive | - |
| 338 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-038 | Add Transit replaces Submit with Save | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click Add Transit | - | The Submit button is replaced by the Save button | High | Positive | - |
| 339 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-039 | Save after Add Transit changes Save to Submit | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click Add Transit
2. Select another transit warehouse
3. Click Save | Transit - W | The data is saved and the Save button changes to Submit | High | Positive | - |
| 340 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-040 | Submit after Add Transit keeps the entry In Transit | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Click Add Transit
2. Select another transit warehouse
3. Save
4. Submit | Transit - E to Transit - W | The End Transit button is still visible and the status stays In Transit | High | Positive | - |
| 341 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-041 | Chain several transit hops then end transit | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Add Transit to a second transit warehouse
2. Add Transit to a third
3. End Transit to the final warehouse | Transit 1 > 2 > 3 > Final | The stock moves hop by hop and the status finishes as Submitted | Medium | Positive | - |
| 342 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-042 | Inbound entry from a transit entry (Transit Entry) | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Create a new Stock Entry using Get Items From > Transit Entry
2. Save and submit | MAT-STE-0001 | The goods are received into the target warehouse and the Stock Entry (Outward GIT) link is shown | High | Positive | Needs Clarification: SRS describes two ways to finish a transit (End Transit on the same entry, and Transit Entry as a new entry). Confirm how they relate. |
| 343 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-043 | In Transit entry after the inbound entry is created | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Create and submit an inbound entry for the full quantity
2. Open the outbound entry | 6 of 6 | To be confirmed with the BA (status and Per Transferred update) | Medium | Positive | Needs Clarification: Not defined in the SRS. |
| 344 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-044 | Cancel an In Transit entry | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Open an In Transit entry
2. Look for the Cancel action | Status: In Transit | To be confirmed with the BA (no Cancel is described for In Transit) | High | Negative | Needs Clarification: Cancel appears only for Submitted, so an In Transit entry cannot be cancelled. |
| 345 | 3. Add Stock Entry - Submit, Cancel & Transit Workflow | TC-STT-045 | Delete a transit entry | Inventory > Stock Entry > Add Stock Entry; an entry with valid items and stock | 1. Open an In Transit entry
2. Click Delete | Status: In Transit | The entry is not deleted because it is submitted | Medium | Negative | - |
| 346 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-001 | Open the Additional Costs tab | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Select Stock Entry Type = Material Receipt
2. Click the Additional Costs tab | Material Receipt | The Additional Costs tab is displayed with the costs table | High | Positive | - |
| 347 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-002 | Additional Costs table displays the default columns | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Review the Additional Costs table | - | The table shows: Checkbox, No., Expense Account, Description, Amount | Medium | UI | - |
| 348 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-003 | Add Row adds a new cost row | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Click Add Row | - | A new empty row is added | High | Positive | - |
| 349 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-004 | Cost rows are numbered in order | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 350 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-005 | Expense Account is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Click Expense Account and type part of an account name | Freight | The list is filtered while typing | High | Positive | - |
| 351 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-006 | Select an Expense Account | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Search for and select an account | Freight and Forwarding Charges - STC | The value is accepted | High | Positive | - |
| 352 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-007 | Leave Expense Account empty | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Add a row
2. Leave Expense Account empty
3. Click Save | - | An error message is displayed because Expense Account is mandatory | High | Negative | - |
| 353 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-008 | Expense Account search with no matching result | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Type a non-existing account | ZZZ | No results are displayed | Low | Negative | - |
| 354 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-009 | Expense Account lists only accounts of the Stock Entry company | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Open the dropdown | Company A account; Company B account | Only accounts of the entry's company are listed | Medium | Positive | Needs Clarification: Stock Entry has no Company field in the SRS. |
| 355 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-010 | Additional Costs: Description accepts valid text | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter valid text in Description | Deliver before noon | The value is accepted | Medium | Positive | - |
| 356 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-011 | Additional Costs: Description shorter than the minimum length (2 characters) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Enter 2 characters in Description
2. Click Save | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 357 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-012 | Additional Costs: Description at the minimum length (3 characters) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter 3 characters in Description | abc | The value is accepted | Medium | Positive | - |
| 358 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-013 | Additional Costs: Description at the maximum length (500 characters) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter exactly 500 characters in Description | 500-character text | The value is accepted | Medium | Positive | - |
| 359 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-014 | Additional Costs: Description longer than 500 characters | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Try to enter or paste 501 characters in Description | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 360 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-015 | Additional Costs: Description accepts letters, numbers and special characters | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter a mix of letters, numbers and special characters in Description | Gate #3 - floor 2 (A/B) | The value is accepted | Medium | Positive | - |
| 361 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-016 | Additional Costs: Description rejects invalid data | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Enter invalid content such as script tags in Description
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 362 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-017 | Leave Description empty | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Add a row with Expense Account and Amount only
2. Click Save | - | An error message is displayed because Description is mandatory | High | Negative | Needs Clarification: The generic optional-field case above does not apply: Description is mandatory in this table. |
| 363 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-018 | Amount accepts a valid number | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter a valid number in Amount | 100 | The value is accepted | High | Positive | - |
| 364 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-019 | Leave Amount empty | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Add a row
2. Leave Amount empty
3. Click Save | - | An error message is displayed because Amount is mandatory | High | Negative | - |
| 365 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-020 | Amount shorter than the minimum length (1 digit) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Enter 1 digit in Amount
2. Click Save | 5 | An error message is displayed because the minimum length is 2 characters | High | Negative | Needs Clarification: The 2-character minimum blocks valid single-digit amounts. Confirm if this is intended. |
| 366 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-021 | Amount at the minimum length (2 digits) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter 2 digits | 10 | The value is accepted | Medium | Positive | - |
| 367 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-022 | Amount rejects letters and special characters | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Type letters and special characters in Amount | abc, @# | Only numbers are accepted | Medium | Negative | - |
| 368 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-023 | Amount at the maximum length (100 digits) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter exactly 100 digits | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 369 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-024 | Amount longer than 100 characters | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Try to enter 101 digits | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 370 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-025 | Amount with decimals | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Enter a decimal amount
2. Click Save | 100.50 | To be confirmed with the BA (accepted or rejected) | High | Positive | Needs Clarification: SRS says 'numbers only'; costs normally need decimals. |
| 371 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-026 | Amount equal to zero or negative | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Enter 0 / -10 in Amount
2. Click Save | 00, -10 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 372 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-027 | Additional cost is added to the item valuation | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Material Receipt: item Basic Amount 600
2. Additional cost 60
3. Submit | 600 + 60 | The item valuation rate is increased by the allocated cost | High | Positive | - |
| 373 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-028 | Additional cost with multiple items is distributed | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Add two items
2. Add a cost of 100
3. Open Edit Row of each item | Cost 100 | The cost is distributed across the items | High | Positive | Needs Clarification: Distribution rule is not defined in the SRS. |
| 374 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-029 | Additional cost creates accounting entries | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Submit an entry with a cost
2. Open the Accounting Ledger | - | The Expense Account is credited and the stock account is debited | Medium | Positive | Needs Clarification: Not described in the SRS. |
| 375 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-030 | Action bar appears when a cost row is selected | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Select the checkbox of a cost row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 376 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-031 | Delete a single cost row | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Select one row
2. Click Delete row | - | The row is deleted and the item valuation is recalculated | High | Positive | - |
| 377 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-032 | Delete multiple cost rows | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Select two rows
2. Click Delete row | - | Both rows are deleted | Medium | Positive | - |
| 378 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-033 | Open the Edit Row popup | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Click the Edit Row icon of a cost row | - | A popup is displayed with the cost row fields | High | Positive | - |
| 379 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-034 | Edit Row displays the fields | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Open Edit Row and review the fields | - | The popup shows: Expense Account, Amount, Amount (Company's base currency), Has Corrective Costs, Account Currency, Exchange Rate, Description | Medium | UI | - |
| 380 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-035 | Edit Row: Expense Account is mandatory | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Edit Row
2. Clear Expense Account
3. Click Update | - | An error message is displayed because Expense Account is mandatory | Medium | Negative | - |
| 381 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-036 | Edit Row: Amount is mandatory and numeric | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Edit Row
2. Clear Amount / type letters
3. Click Update | abc | An error message is displayed for the empty value; letters are rejected | Medium | Negative | - |
| 382 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-037 | Edit Row: Amount (Company's base currency) is a read-only label | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Review the label after entering an Amount | 100 x 1 | It shows the amount in the company currency and cannot be edited | Medium | UI | - |
| 383 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-038 | Edit Row: Has Corrective Costs is a read-only checkbox | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Open Edit Row | - | The checkbox is read-only and checked only when corrective costs apply | Low | UI | - |
| 384 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-039 | Edit Row: Account Currency is a read-only label | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Select an Expense Account in a foreign currency | USD account | Account Currency shows USD and cannot be edited | Medium | UI | - |
| 385 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-040 | Edit Row: Exchange Rate accepts a valid number | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter an exchange rate | 48.50 | The value is accepted and Amount (Company's base currency) is recalculated | High | Positive | - |
| 386 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-041 | Edit Row: Leave Exchange Rate empty | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Leave it empty
2. Click Update | - | The row is saved (field is optional) | Medium | Positive | - |
| 387 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-042 | Edit Row: Exchange Rate shorter than the minimum length (1 digit) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Enter 1 digit
2. Click Update | 5 | An error message is displayed because the minimum length is 2 characters | Medium | Negative | Needs Clarification: A rate such as 5 cannot be entered because of the 2-character minimum. |
| 388 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-043 | Edit Row: Exchange Rate rejects letters | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Type letters in Exchange Rate | abc | Letters are not accepted | Medium | Negative | - |
| 389 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-044 | Edit Row: Exchange Rate at the maximum length (100 digits) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Enter exactly 100 digits | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 390 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-045 | Edit Row: Exchange Rate longer than 100 characters | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Try to enter 101 digits | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 391 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-046 | Edit Row: Description is mandatory | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Edit Row
2. Clear Description
3. Click Update | - | An error message is displayed because Description is mandatory | Medium | Negative | - |
| 392 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-047 | Edit Row: Description shorter than the minimum length (2 characters) | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Enter 2 characters
2. Click Update | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 393 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-048 | Edit Row: Description longer than 500 characters | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Try to enter 501 characters | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 394 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-049 | Edit Row: save changes with Update | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Edit Row
2. Change Amount and Description
3. Click Update | Amount 150 | The popup closes and the changes are reflected in the row | High | Positive | - |
| 395 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-050 | Additional Costs: Open the table Settings popup | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Click Setting on the Additional Costs table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 396 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-051 | Additional Costs: Reorder columns using drag and drop | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Setting
2. Drag the Description column header and drop it before Expense Account | - | The column order changes to the new position | Medium | Positive | - |
| 397 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-052 | Additional Costs: Column width default value is 3 | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 398 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-053 | Additional Costs: Column width accepts numbers only | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 399 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-054 | Additional Costs: Column width left empty | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 400 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-055 | Additional Costs: Column width with 1 character | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 401 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-056 | Additional Costs: Column width longer than 3 characters | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 402 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-057 | Additional Costs: Add / Remove Columns popup lists all columns | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Expense Account, Description, Amount, Account Currency, Exchange Rate, Amount (Company Currency)) | Medium | UI | - |
| 403 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-058 | Additional Costs: Hide a column | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Open Add / Remove columns
2. Clear the Description checkbox
3. Click Update | Column: Description | The Description column is hidden from the table | Medium | Positive | - |
| 404 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-059 | Additional Costs: Show a hidden column | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Hide the Description column
2. Open Add / Remove columns
3. Select the Description checkbox
4. Click Update | Column: Description | The Description column is displayed again | Medium | Positive | - |
| 405 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-060 | Additional Costs: Save the Settings using Update | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 406 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-061 | Additional Costs: Reset Settings to default | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 407 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-062 | Save a Stock Entry with an Additional Cost | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Fill the Details tab
2. Add a cost row
3. Click Save | Expense: Freight; Description: Customs; Amount: 100 | The entry is saved (Draft) with the cost row | High | Positive | - |
| 408 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-063 | Save with an incomplete cost row | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Add a cost row with only Description
2. Click Save | Description only | A validation error is displayed for Expense Account and Amount | High | Negative | - |
| 409 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-064 | Submit with an Additional Cost | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Save an entry with a cost row
2. Click Submit | - | The entry is submitted and the cost is applied to the valuation | High | Positive | - |
| 410 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-065 | Additional Costs tab is hidden after switching to Material Issue | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Select Material Receipt and add a cost row
2. Change the type to Material Issue | Receipt > Issue | The tab is hidden and the cost rows are ignored or cleared | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 411 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-066 | Additional Costs on a Material Transfer | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Select Material Transfer
2. Add a cost
3. Submit | Cost 50 | The cost is added to the valuation of the transferred items in the target warehouse | Medium | Positive | - |
| 412 | 4. Add Stock Entry - Additional Costs Tab | TC-STC-067 | Additional Costs on a Repack | Inventory > Stock Entry > Add Stock Entry > Additional Costs tab (Material Receipt / Transfer / Repack) | 1. Select Repack
2. Add a cost
3. Submit | Cost 50 | The cost is added to the valuation of the finished item | Medium | Positive | - |
| 413 | 5. Add Stock Entry - Other Info Tab | TC-STO-001 | Open the Other Info tab | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Open the Add Stock Entry screen
2. Click the Other Info tab | - | The Other Info tab is displayed with Print Settings, Reference and More Information | High | Positive | - |
| 414 | 5. Add Stock Entry - Other Info Tab | TC-STO-002 | Letter Head is a searchable dropdown | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Click Letter Head and type part of a name | Shamel | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 415 | 5. Add Stock Entry - Other Info Tab | TC-STO-003 | Leave Letter Head empty | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Leave it empty
2. Click Save | - | The entry is saved (field is optional) | Medium | Positive | - |
| 416 | 5. Add Stock Entry - Other Info Tab | TC-STO-004 | Letter Head is used when printing | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Select a Letter Head
2. Print the entry | Shamel Standard | The print view uses the selected letter head | Medium | Positive | - |
| 417 | 5. Add Stock Entry - Other Info Tab | TC-STO-005 | Asset Repair label appears for entries generated from an Asset Repair | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Open an entry generated from an Asset Repair | ASSET-REP-0001 | Asset Repair shows the source document as a read-only clickable label | Medium | Positive | - |
| 418 | 5. Add Stock Entry - Other Info Tab | TC-STO-006 | Asset Repair link opens Asset Repair Details | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Open an entry generated from an Asset Repair
2. Click Asset Repair | - | The user is redirected to the Asset Repair Details screen | Medium | Positive | - |
| 419 | 5. Add Stock Entry - Other Info Tab | TC-STO-007 | Asset Repair is empty for a normal entry | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Open a normal entry | - | Asset Repair is empty or hidden | Low | UI | - |
| 420 | 5. Add Stock Entry - Other Info Tab | TC-STO-008 | Is Opening dropdown lists the allowed values | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Open the Is Opening dropdown | - | The dropdown contains: Yes, No | Medium | Positive | - |
| 421 | 5. Add Stock Entry - Other Info Tab | TC-STO-009 | Select Is Opening = Yes | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Select Yes | Yes | The value is accepted | Medium | Positive | - |
| 422 | 5. Add Stock Entry - Other Info Tab | TC-STO-010 | Leave Is Opening empty | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Leave it empty
2. Click Save | - | The entry is saved (field is optional) | Medium | Positive | - |
| 423 | 5. Add Stock Entry - Other Info Tab | TC-STO-011 | Is Opening = Yes records opening balances | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Create a Material Receipt with Is Opening = Yes
2. Submit
3. Check the Accounting Ledger | - | The entry is posted against the opening / difference account | High | Positive | Needs Clarification: The effect of Is Opening is not described beyond its purpose. |
| 424 | 5. Add Stock Entry - Other Info Tab | TC-STO-012 | Is Opening for a Material Issue or Transfer | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Select Material Issue
2. Set Is Opening = Yes | Issue | To be confirmed with the BA (allowed only for Material Receipt?) | Low | Negative | Needs Clarification: Not defined in the SRS. |
| 425 | 5. Add Stock Entry - Other Info Tab | TC-STO-013 | Other Info: Remarks accepts valid text | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Enter valid text in Remarks | Deliver before noon | The value is accepted | Medium | Positive | - |
| 426 | 5. Add Stock Entry - Other Info Tab | TC-STO-014 | Other Info: Leave Remarks empty | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Leave Remarks empty
2. Click Save | - | The document is saved (field is optional) | Medium | Positive | - |
| 427 | 5. Add Stock Entry - Other Info Tab | TC-STO-015 | Other Info: Remarks shorter than the minimum length (2 characters) | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Enter 2 characters in Remarks
2. Click Save | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 428 | 5. Add Stock Entry - Other Info Tab | TC-STO-016 | Other Info: Remarks at the minimum length (3 characters) | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Enter 3 characters in Remarks | abc | The value is accepted | Medium | Positive | - |
| 429 | 5. Add Stock Entry - Other Info Tab | TC-STO-017 | Other Info: Remarks at the maximum length (500 characters) | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Enter exactly 500 characters in Remarks | 500-character text | The value is accepted | Medium | Positive | - |
| 430 | 5. Add Stock Entry - Other Info Tab | TC-STO-018 | Other Info: Remarks longer than 500 characters | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Try to enter or paste 501 characters in Remarks | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 431 | 5. Add Stock Entry - Other Info Tab | TC-STO-019 | Other Info: Remarks accepts letters, numbers and special characters | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Enter a mix of letters, numbers and special characters in Remarks | Gate #3 - floor 2 (A/B) | The value is accepted | Medium | Positive | - |
| 432 | 5. Add Stock Entry - Other Info Tab | TC-STO-020 | Other Info: Remarks rejects invalid data | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Enter invalid content such as script tags in Remarks
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 433 | 5. Add Stock Entry - Other Info Tab | TC-STO-021 | Per Transferred is a read-only label | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Review Per Transferred | - | It shows the percentage of material transferred relative to the required quantity and cannot be edited | Medium | UI | - |
| 434 | 5. Add Stock Entry - Other Info Tab | TC-STO-022 | Per Transferred for an entry created from a Material Request | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Submit an entry for part of a Material Request
2. Open the Other Info tab | 6 of 12 | Per Transferred shows 50% | Medium | Positive | - |
| 435 | 5. Add Stock Entry - Other Info Tab | TC-STO-023 | Total Amount is a read-only label | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Review Total Amount | - | Total Amount shows the total monetary value based on the items and their valuation rates and cannot be edited | Medium | UI | - |
| 436 | 5. Add Stock Entry - Other Info Tab | TC-STO-024 | Total Amount is the sum of the item amounts | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Add two items with amounts 600 and 300 | 600 + 300 | Total Amount shows 900 | High | Positive | Needs Clarification: SRS does not say whether additional costs are included. |
| 437 | 5. Add Stock Entry - Other Info Tab | TC-STO-025 | Total Amount updates when rows change | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Delete a row or change Qty | - | Total Amount is recalculated | High | Positive | - |
| 438 | 5. Add Stock Entry - Other Info Tab | TC-STO-026 | Amended From is hidden for a non-amended entry | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Open a normal entry | - | Amended From is not displayed | Medium | UI | - |
| 439 | 5. Add Stock Entry - Other Info Tab | TC-STO-027 | Amended From is displayed for an amended entry | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Open an entry created through amendment | MAT-STE-2026-00001-1 | Amended From shows the original entry (read-only) | Medium | Positive | - |
| 440 | 5. Add Stock Entry - Other Info Tab | TC-STO-028 | Credit Note label references the related Credit Note | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Open an entry related to a Credit Note | CN-0001 | Credit Note shows the reference and cannot be edited | Low | Positive | Needs Clarification: SRS does not explain when a Stock Entry is related to a Credit Note. |
| 441 | 5. Add Stock Entry - Other Info Tab | TC-STO-029 | Is Return is a read-only checkbox | Inventory > Stock Entry > Add Stock Entry > Other Info tab | Open a return entry and a normal entry | - | Is Return is checked only for return entries and cannot be edited | Medium | UI | - |
| 442 | 5. Add Stock Entry - Other Info Tab | TC-STO-030 | Return entry creation | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Look for a Create > Return action on a Submitted entry | - | To be confirmed with the BA (Is Return exists but no return action is described) | Medium | Positive | Needs Clarification: SRS has no Stock Entry return action. |
| 443 | 5. Add Stock Entry - Other Info Tab | TC-STO-031 | Other Info data is saved with the entry | Inventory > Stock Entry > Add Stock Entry > Other Info tab | 1. Fill the Other Info tab
2. Click Save
3. Reopen the entry | - | All Other Info values are saved and displayed correctly | High | Positive | - |
| 444 | 6. Stock Entry Details Screen | TC-STD-001 | Open Stock Entry Details from the list | Logged in; at least one Stock Entry exists | 1. Click Inventory from the side menu
2. Click Stock Entry
3. Click a Stock Entry ID | MAT-STE-2026-00001 | The Stock Entry Details screen of the selected entry is displayed | High | Positive | - |
| 445 | 6. Stock Entry Details Screen | TC-STD-002 | Details display the data entered during creation | Inventory > Stock Entry > click a Stock Entry ID in the table | Open an entry created with known data and compare the fields | Material Transfer; Coffee Mug x12 | All data entered during creation is displayed correctly across the tabs | High | Positive | - |
| 446 | 6. Stock Entry Details Screen | TC-STD-003 | Details fields are displayed as labels | Inventory > Stock Entry > click a Stock Entry ID in the table | Open a Submitted entry | Status: Submitted | The fields are displayed as read-only labels | High | Positive | Needs Clarification: Use case 5 is titled 'Delivery Note Details' and says 'view / edit', while the components are 'Label fields' for viewing only. |
| 447 | 6. Stock Entry Details Screen | TC-STD-004 | Draft: fields are editable | Inventory > Stock Entry > click a Stock Entry ID in the table; a Draft entry exists | Open a Draft entry | Status: Draft | To be confirmed with the BA (Draft entries should be editable as in other modules) | High | Positive | Needs Clarification: See above. |
| 448 | 6. Stock Entry Details Screen | TC-STD-005 | Draft: modify and save an entry | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open a Draft entry
2. Change Qty
3. Click Save | Qty: 12 > 20 | The changes are saved successfully | High | Positive | Needs Clarification: See above. |
| 449 | 6. Stock Entry Details Screen | TC-STD-006 | Submitted: fields are read-only | Inventory > Stock Entry > click a Stock Entry ID in the table | Open a Submitted entry | Status: Submitted | Fields cannot be edited | High | Negative | - |
| 450 | 6. Stock Entry Details Screen | TC-STD-007 | Cancelled: fields are read-only | Inventory > Stock Entry > click a Stock Entry ID in the table | Open a Cancelled entry | Status: Cancelled | Fields cannot be edited | High | Negative | - |
| 451 | 6. Stock Entry Details Screen | TC-STD-008 | Fixed page actions are displayed at the top | Inventory > Stock Entry > click a Stock Entry ID in the table | Open any entry and review the top of the page | - | The View dropdown (after saving) and the Assign, Attachment, Tags, Share, Print and Delete actions are displayed | High | UI | - |
| 452 | 6. Stock Entry Details Screen | TC-STD-009 | View dropdown appears only after saving | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open the Add screen
2. Review the page
3. Save the entry | - | The View dropdown is hidden on the unsaved form and displayed after saving | High | Positive | - |
| 453 | 6. Stock Entry Details Screen | TC-STD-010 | View dropdown lists the reports | Inventory > Stock Entry > click a Stock Entry ID in the table | Click the View dropdown | - | The list contains: Stock Ledger, Serial / Batch Nos, Accounting Ledger | High | UI | - |
| 454 | 6. Stock Entry Details Screen | TC-STD-011 | View > Stock Ledger opens the Stock Ledger screen | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click View > Stock Ledger | - | The Stock Ledger screen opens, filtered by this entry | High | Positive | Needs Clarification: SRS does not say whether the report is filtered by this document. |
| 455 | 6. Stock Entry Details Screen | TC-STD-012 | View > Serial / Batch Nos opens the Serial and Batch Summary screen | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click View > Serial / Batch Nos | - | The Serial and Batch Summary screen opens | Medium | Positive | - |
| 456 | 6. Stock Entry Details Screen | TC-STD-013 | View > Accounting Ledger opens the General Ledger screen | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click View > Accounting Ledger | - | The General Ledger screen opens, filtered by this entry | High | Positive | - |
| 457 | 6. Stock Entry Details Screen | TC-STD-014 | View reports for a Draft entry | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open a Draft entry
2. Click View > Stock Ledger | Status: Draft | The report is empty because a Draft entry has no ledger entries | Medium | Negative | - |
| 458 | 6. Stock Entry Details Screen | TC-STD-015 | End Transit button on Details | Inventory > Stock Entry > click a Stock Entry ID in the table | Open an In Transit entry | Status: In Transit | End Transit is displayed (only for submitted entries with Add To Transit) | High | Positive | - |
| 459 | 6. Stock Entry Details Screen | TC-STD-016 | End Transit button is hidden on a normal Submitted entry | Inventory > Stock Entry > click a Stock Entry ID in the table | Open a Submitted entry without Add To Transit | - | End Transit is not displayed | High | Negative | - |
| 460 | 6. Stock Entry Details Screen | TC-STD-017 | Add Transit button on Details | Inventory > Stock Entry > click a Stock Entry ID in the table | Open an In Transit entry | Status: In Transit | Add Transit is displayed (only when Add To Transit is checked) | High | Positive | - |
| 461 | 6. Stock Entry Details Screen | TC-STD-018 | Add Transit button is hidden on a normal Submitted entry | Inventory > Stock Entry > click a Stock Entry ID in the table | Open a Submitted entry without Add To Transit | - | Add Transit is not displayed | High | Negative | - |
| 462 | 6. Stock Entry Details Screen | TC-STD-019 | Create menu: Create Quality Inspection when Inspection Required is checked | Inventory > Stock Entry > click a Stock Entry ID in the table | Open a Submitted entry with Inspection Required | - | The Create menu contains Create Quality Inspection | High | Positive | - |
| 463 | 6. Stock Entry Details Screen | TC-STD-020 | Connections tab is displayed | Inventory > Stock Entry > click a Stock Entry ID in the table | Open an entry and scroll to Connections | - | The Connections section is displayed with the Stock Reservation group | Medium | UI | - |
| 464 | 6. Stock Entry Details Screen | TC-STD-021 | Connections: open Stock Reservation Entry | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click Stock Reservation Entry | - | The Stock Reservation Entry list filtered by this entry opens | Medium | Positive | - |
| 465 | 6. Stock Entry Details Screen | TC-STD-022 | Connections: entry with no reservation | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open an entry without reservations
2. Click Stock Reservation Entry | - | The list opens with no related documents (or an empty state) | Low | Positive | - |
| 466 | 6. Stock Entry Details Screen | TC-STD-023 | Connections: other linked documents | Inventory > Stock Entry > click a Stock Entry ID in the table | Open an entry created from a Material Request or a Purchase Receipt | MR-0001 | To be confirmed with the BA (only Stock Reservation Entry is listed in Connections) | Low | Positive | Needs Clarification: Connections lists only Stock Reservation Entry, although entries link to Material Request, Purchase Receipt, Quality Inspection and other Stock Entries. |
| 467 | 6. Stock Entry Details Screen | TC-STD-024 | Assign the entry to a user | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click Assign
2. Select a user
3. Confirm | User: Mona Samir | The entry is assigned to the selected user and the assignment is displayed | Medium | Positive | Needs Clarification: SRS lists Assign without details. |
| 468 | 6. Stock Entry Details Screen | TC-STD-025 | Add an attachment | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click Attachment
2. Upload a file | stock-count-sheet.pdf | The file is attached to the entry and listed | Medium | Positive | Needs Clarification: Allowed file types and size limit are not defined. |
| 469 | 6. Stock Entry Details Screen | TC-STD-026 | Add a tag | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click Tags
2. Add a tag | Tag: Monthly | The tag is added to the entry | Low | Positive | - |
| 470 | 6. Stock Entry Details Screen | TC-STD-027 | Share the entry with a user | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click Share
2. Select a user and permission
3. Confirm | User: Mona Samir | The entry is shared with the selected user | Medium | Positive | Needs Clarification: SRS lists Share without details. |
| 471 | 6. Stock Entry Details Screen | TC-STD-028 | Print the entry | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click Print | - | The print view of the entry is displayed and can be printed | Medium | Positive | - |
| 472 | 6. Stock Entry Details Screen | TC-STD-029 | Print uses the selected Letter Head | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Select a Letter Head in Other Info
2. Click Print | Shamel Standard | The print view uses the selected letter head | Medium | Positive | - |
| 473 | 6. Stock Entry Details Screen | TC-STD-030 | Delete confirmation message | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open an entry
2. Click Delete | - | A confirmation message asks the user whether they want to delete this Stock Entry | High | Positive | - |
| 474 | 6. Stock Entry Details Screen | TC-STD-031 | Cancel the delete confirmation | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Click Delete
2. Click No (or close the message) | - | The entry is not deleted | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 475 | 6. Stock Entry Details Screen | TC-STD-032 | Delete a Draft entry that has no links | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open an unlinked Draft entry
2. Click Delete
3. Click Yes | Unlinked Draft entry | The Stock Entry is deleted successfully | High | Positive | - |
| 476 | 6. Stock Entry Details Screen | TC-STD-033 | Delete a Submitted entry | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open a Submitted entry
2. Click Delete
3. Click Yes | Status: Submitted | The entry is not deleted because it must be cancelled first | High | Negative | Needs Clarification: SRS makes Delete a fixed page action for all statuses. |
| 477 | 6. Stock Entry Details Screen | TC-STD-034 | Delete an entry amended from another entry | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open an amended entry
2. Click Delete
3. Click Yes | Amended entry | A warning message is displayed with the linked doctypes as hyperlinks; the entry is not deleted | High | Negative | - |
| 478 | 6. Stock Entry Details Screen | TC-STD-035 | Delete an entry linked to other transactions | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Open a linked entry
2. Click Delete
3. Click Yes | Entry linked to a Stock Reservation Entry | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks | High | Negative | - |
| 479 | 6. Stock Entry Details Screen | TC-STD-036 | Linked doctype hyperlinks open the corresponding doctype | Inventory > Stock Entry > click a Stock Entry ID in the table | 1. Trigger the delete message
2. Click a linked doctype | - | The user is redirected to the corresponding doctype | Medium | Positive | - |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Stock Entry List Screen |  |  |  |
| 2. Add Stock Entry - Details Tab |  |  |  |
| 3. Add Stock Entry - Submit, Cancel & Transit Workflow |  |  |  |
| 4. Add Stock Entry - Additional Costs Tab |  |  |  |
| 5. Add Stock Entry - Other Info Tab |  |  |  |
| 6. Stock Entry Details Screen |  |  |  |
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