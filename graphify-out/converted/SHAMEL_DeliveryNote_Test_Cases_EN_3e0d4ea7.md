<!-- converted from SHAMEL_DeliveryNote_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Delivery Note |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Delivery Note) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Delivery Note List Screen | TC-DNL-001 | Display the Delivery Note list | Access via Inventory > Delivery Note | 1. Click Inventory from the side menu
2. Click Delivery Note | - | A table listing all Delivery Notes in the system is displayed | High | Positive | - |
| 2 | 1. Delivery Note List Screen | TC-DNL-002 | Add Delivery Note button is displayed | Access via Inventory > Delivery Note | Verify that the Add Delivery Note button is displayed on the list screen | - | The Add Delivery Note button is visible and clickable | Medium | UI | - |
| 3 | 1. Delivery Note List Screen | TC-DNL-003 | Navigate to the Add Delivery Note screen | Access via Inventory > Delivery Note | Click the Add Delivery Note button | - | The user is redirected to the Add Delivery Note screen | High | Positive | - |
| 4 | 1. Delivery Note List Screen | TC-DNL-004 | Display checkbox column for row selection | Access via Inventory > Delivery Note | Open the Delivery Note list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Delivery Note List Screen | TC-DNL-005 | Display Delivery Note ID column | Access via Inventory > Delivery Note | Open the Delivery Note list | - | The Delivery Note ID column is displayed for each row | Medium | UI | - |
| 6 | 1. Delivery Note List Screen | TC-DNL-006 | Navigate to Delivery Note Details by clicking the ID | Access via Inventory > Delivery Note | Click a Delivery Note ID in the table | DN-0001 | The user is redirected to the Delivery Note Details screen of the selected note | High | Positive | - |
| 7 | 1. Delivery Note List Screen | TC-DNL-007 | Display Status column with a valid value | Access via Inventory > Delivery Note | Open the list and review the Status column | Notes in all statuses | Each row shows exactly one of: Draft, To Pick, Partially Picked, Picked, To Deliver, To Bill, Partially Billed, Completed, Return, Return Issued, Cancelled, Closed | High | Positive | Needs Clarification: SRS spells 'To bill', 'Partially Pilled' (Billed?) and in the More Info tab 'To Pill'. Assumed to be typos for To Bill / Partially Billed. |
| 8 | 1. Delivery Note List Screen | TC-DNL-008 | Status is Draft after the first Save | Access via Inventory > Delivery Note | 1. Add and save a new Delivery Note
2. Return to the list | Customer: Al Noor Stores | The new Delivery Note appears in the list with status Draft | High | Positive | - |
| 9 | 1. Delivery Note List Screen | TC-DNL-009 | Display Date column | Access via Inventory > Delivery Note | Open the list and review the Date column | Date: 2026-11-01 | The Delivery Note date is displayed for each row | Medium | UI | - |
| 10 | 1. Delivery Note List Screen | TC-DNL-010 | Display Grand Total column | Access via Inventory > Delivery Note | Open the list and review the Grand Total column | Grand Total: 342.00 | The Grand Total of each note is displayed | Medium | UI | - |
| 11 | 1. Delivery Note List Screen | TC-DNL-011 | Display Amount billed % progress bar | Access via Inventory > Delivery Note | Open the list and review the Amount billed % column | Billed: 50% | A progress bar shows the percentage of the amount billed | Medium | UI | - |
| 12 | 1. Delivery Note List Screen | TC-DNL-012 | Amount billed % is 100% for a fully invoiced note | Access via Inventory > Delivery Note | Open a Delivery Note that has been fully invoiced | Billed: 100% | The progress bar is full and the status is Completed | Medium | Positive | - |
| 13 | 1. Delivery Note List Screen | TC-DNL-013 | Display Returned % progress bar | Access via Inventory > Delivery Note | Open the list and review the Returned % column | Returned: 25% | A progress bar shows the percentage of returned items | Medium | UI | - |
| 14 | 1. Delivery Note List Screen | TC-DNL-014 | Returned % is updated after a Sales Return | Access via Inventory > Delivery Note | 1. Create a Sales Return for part of a Delivery Note
2. Return to the list | Return 2 of 6 | Returned % of the original note shows 33% | Medium | Positive | - |
| 15 | 1. Delivery Note List Screen | TC-DNL-015 | Action bar appears when one row is selected | Access via Inventory > Delivery Note | Select the checkbox of one Delivery Note | - | An action bar appears showing the available actions | High | Positive | - |
| 16 | 1. Delivery Note List Screen | TC-DNL-016 | Action bar appears when multiple rows are selected | Access via Inventory > Delivery Note | Select the checkboxes of three Delivery Notes | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 17 | 1. Delivery Note List Screen | TC-DNL-017 | Action bar disappears when all rows are deselected | Access via Inventory > Delivery Note | 1. Select one Delivery Note
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 18 | 1. Delivery Note List Screen | TC-DNL-018 | Action bar contains the required actions | Access via Inventory > Delivery Note | Select a Delivery Note and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print (Deliver, Cancel and Delete are shown only by status) | Medium | UI | - |
| 19 | 1. Delivery Note List Screen | TC-DNL-019 | Open the Edit popup | Access via Inventory > Delivery Note | 1. Select a Delivery Note
2. Click Edit | - | A popup is displayed containing the Field dropdown, the Value field and the Update button | High | Positive | - |
| 20 | 1. Delivery Note List Screen | TC-DNL-020 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Delivery Note | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Delivery Note and allows selecting only one option | Medium | Positive | - |
| 21 | 1. Delivery Note List Screen | TC-DNL-021 | Click Update without selecting a Field | Access via Inventory > Delivery Note | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because Field is mandatory | Medium | Negative | - |
| 22 | 1. Delivery Note List Screen | TC-DNL-022 | Value input type changes dynamically based on the selected Field | Access via Inventory > Delivery Note | 1. Open the Edit popup
2. Select Field = Customer and note the Value input type
3. Select Field = Posting Time and note the Value input type | Customer, Posting Time | The Value field changes its input type (searchable dropdown for Customer, time picker for Posting Time) | High | Positive | - |
| 23 | 1. Delivery Note List Screen | TC-DNL-023 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Delivery Note | 1. Open the Edit popup
2. Select Field = Customer
3. Leave Value empty and click Update | Field: Customer | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 24 | 1. Delivery Note List Screen | TC-DNL-024 | Value field applies the validation rules of the selected Field | Access via Inventory > Delivery Note | 1. Open the Edit popup
2. Select Field = Terms and Condition Content
3. Enter 2 characters and click Update | Value: ab | A validation error message is displayed (minimum length is 3 characters) and the note is not changed | Medium | Negative | - |
| 25 | 1. Delivery Note List Screen | TC-DNL-025 | Update a Draft Delivery Note successfully | Access via Inventory > Delivery Note | 1. Select a Draft Delivery Note
2. Click Edit
3. Select Field = Transporter Receipt No
4. Enter a Value
5. Click Update | Value: TR-1001 | The Delivery Note is updated successfully | High | Positive | Needs Clarification: SRS defines only the error case of Update (Submitted / Cancelled). The Draft success case is assumed. |
| 26 | 1. Delivery Note List Screen | TC-DNL-026 | Update a Submitted Delivery Note | Access via Inventory > Delivery Note | 1. Select a Submitted (To Bill) Delivery Note
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: To Bill | An error message is displayed informing the user that the Delivery Note cannot be modified | High | Negative | - |
| 27 | 1. Delivery Note List Screen | TC-DNL-027 | Update a Cancelled Delivery Note | Access via Inventory > Delivery Note | 1. Select a Cancelled Delivery Note
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Cancelled | An error message is displayed informing the user that the Delivery Note cannot be modified | High | Negative | - |
| 28 | 1. Delivery Note List Screen | TC-DNL-028 | Update a Delivery Note in the picking statuses | Access via Inventory > Delivery Note | 1. Select a Delivery Note in To Pick / Partially Picked / Picked
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: To Pick | To be confirmed with the BA (allowed or blocked) | Medium | Positive | Needs Clarification: SRS lists the error only for Submitted and Cancelled. Behavior for To Pick, Picked, To Deliver, Completed, Closed and Return is not defined. |
| 29 | 1. Delivery Note List Screen | TC-DNL-029 | Edit with multiple Delivery Notes selected | Access via Inventory > Delivery Note | 1. Select two Draft Delivery Notes
2. Click Edit
3. Select a Field and a Value
4. Click Update | Two Draft notes | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection. |
| 30 | 1. Delivery Note List Screen | TC-DNL-030 | Deliver action is displayed for a Picked Delivery Note | Access via Inventory > Delivery Note | Select a Picked Delivery Note and review the action bar | Status: Picked | The Deliver action is displayed | High | Positive | - |
| 31 | 1. Delivery Note List Screen | TC-DNL-031 | Deliver action is hidden for other statuses | Access via Inventory > Delivery Note | Select notes in Draft, To Pick, To Deliver, To Bill and Cancelled and review the action bar | 5 notes | The Deliver action is not displayed | Medium | Negative | Needs Clarification: In the workflow the Deliver button appears after Finish Picking (status To Deliver), but the List says it appears when the status is Picked. |
| 32 | 1. Delivery Note List Screen | TC-DNL-032 | Deliver a Picked Delivery Note from the list | Access via Inventory > Delivery Note | 1. Select a Picked Delivery Note
2. Click Deliver | Status: Picked | The Delivery Note is submitted (delivered) successfully and its status becomes To Bill (or Completed if invoiced) | High | Positive | Needs Clarification: Conflict between 'Picked' (List) and 'To Deliver' (Add workflow) as the status in which Deliver is available. |
| 33 | 1. Delivery Note List Screen | TC-DNL-033 | Cancel action is displayed for a Submitted (To Bill) Delivery Note | Access via Inventory > Delivery Note | Select a To Bill Delivery Note and review the action bar | Status: To Bill | The Cancel action is displayed | High | Positive | - |
| 34 | 1. Delivery Note List Screen | TC-DNL-034 | Cancel action for other submitted statuses | Access via Inventory > Delivery Note | Select notes in Completed, Partially Billed, Return and Return Issued and review the action bar | 4 notes | The Cancel action is displayed for each submitted status | High | Positive | Needs Clarification: List says Cancel appears only for 'Submitted (To Bill)', while the Add workflow lists To Bill / Completed / Partially Billed / Return / Return Issued. |
| 35 | 1. Delivery Note List Screen | TC-DNL-035 | Cancel action is hidden for non-submitted statuses | Access via Inventory > Delivery Note | Select a Draft, To Pick, Picked and Cancelled note and review the action bar | 4 notes | The Cancel action is not displayed (a Close action is available instead for non-submitted notes) | Medium | Negative | - |
| 36 | 1. Delivery Note List Screen | TC-DNL-036 | Cancel a Submitted Delivery Note | Access via Inventory > Delivery Note | 1. Select a To Bill Delivery Note
2. Click Cancel | Status: To Bill | The Delivery Note is cancelled successfully and its status changes to Cancelled | High | Positive | - |
| 37 | 1. Delivery Note List Screen | TC-DNL-037 | Cancelling a Delivery Note reverses the stock | Access via Inventory > Delivery Note | 1. Note the stock quantity of the item
2. Cancel a submitted Delivery Note for that item
3. Check the stock quantity | Coffee Mug: delivered 6 | The stock quantity is restored and a reversing Stock Ledger Entry is created | High | Positive | Needs Clarification: SRS says the 'stock quantity is decreased' on cancel, which looks inverted. Cancelling a delivery should increase stock. |
| 38 | 1. Delivery Note List Screen | TC-DNL-038 | Delete action is displayed for Draft and Cancelled Delivery Notes | Access via Inventory > Delivery Note | Select a Draft note and a Cancelled note and review the action bar | Draft / Cancelled | The Delete action is displayed | High | Positive | - |
| 39 | 1. Delivery Note List Screen | TC-DNL-039 | Delete action is hidden for other statuses | Access via Inventory > Delivery Note | Select notes in To Pick, Picked, To Bill and Completed and review the action bar | 4 notes | The Delete action is not displayed | Medium | Negative | - |
| 40 | 1. Delivery Note List Screen | TC-DNL-040 | Confirmation message is displayed when clicking Delete | Access via Inventory > Delivery Note | 1. Select a Draft Delivery Note
2. Click Delete | Status: Draft | A confirmation message asks the user whether they want to delete this delivery note | High | Positive | - |
| 41 | 1. Delivery Note List Screen | TC-DNL-041 | Cancel the delete confirmation | Access via Inventory > Delivery Note | 1. Select a Draft note
2. Click Delete
3. Click No (or close the message) | - | The note is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 42 | 1. Delivery Note List Screen | TC-DNL-042 | Delete a Draft Delivery Note that has no links | Access via Inventory > Delivery Note | 1. Select an unlinked Draft note
2. Click Delete
3. Click Yes | Unlinked Draft note | The Delivery Note is deleted successfully and removed from the list | High | Positive | - |
| 43 | 1. Delivery Note List Screen | TC-DNL-043 | Delete a Delivery Note that was amended from another note | Access via Inventory > Delivery Note | 1. Select a note that has Amended From populated
2. Click Delete
3. Click Yes | Amended note: DN-0001-1 | A warning message is displayed: the note cannot be deleted until all related doctypes are deleted. The note is not deleted | High | Negative | - |
| 44 | 1. Delivery Note List Screen | TC-DNL-044 | Delete a Delivery Note linked to other transactions | Access via Inventory > Delivery Note | 1. Select a Cancelled note linked to other transactions (e.g., Packing Slip)
2. Click Delete
3. Click Yes | Note linked to PS-2026-001 | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks. The note is not deleted | High | Negative | - |
| 45 | 1. Delivery Note List Screen | TC-DNL-045 | Linked doctypes in the delete messages are hyperlinks | Access via Inventory > Delivery Note | 1. Trigger the delete message for a linked note
2. Click a linked doctype | Linked note | The user is redirected to the corresponding doctype | Medium | Positive | - |
| 46 | 1. Delivery Note List Screen | TC-DNL-046 | Delete multiple Delivery Notes at once | Access via Inventory > Delivery Note | 1. Select two Draft notes
2. Click Delete
3. Click Yes | Two Draft notes | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define bulk delete. |
| 47 | 1. Delivery Note List Screen | TC-DNL-047 | Close action for a non-submitted Delivery Note | Access via Inventory > Delivery Note | 1. Select a Draft / To Pick Delivery Note
2. Click Close | Status: To Pick | The Delivery Note status changes to Closed | High | Positive | Needs Clarification: The Close button is described in the Add workflow only (not in the List action bar). Confirm where it appears and for which statuses. |
| 48 | 1. Delivery Note List Screen | TC-DNL-048 | Closed Delivery Note is not editable | Access via Inventory > Delivery Note | 1. Close a Delivery Note
2. Open it | Status: Closed | The note is read-only and cannot be delivered | Medium | Negative | - |
| 49 | 1. Delivery Note List Screen | TC-DNL-049 | Export selected Delivery Notes | Access via Inventory > Delivery Note | 1. Select one or more notes
2. Click Export | - | The selected Delivery Notes are exported | Medium | Positive | Needs Clarification: SRS lists Export without details. |
| 50 | 1. Delivery Note List Screen | TC-DNL-050 | Assign selected Delivery Notes to a user | Access via Inventory > Delivery Note | 1. Select a note
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The note is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 51 | 1. Delivery Note List Screen | TC-DNL-051 | Clear assignment of a Delivery Note | Access via Inventory > Delivery Note | 1. Select an assigned note
2. Click Clear assignment | Assigned note | The assignment is cleared | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 52 | 1. Delivery Note List Screen | TC-DNL-052 | Add tags to a Delivery Note | Access via Inventory > Delivery Note | 1. Select a note
2. Click Add tags
3. Enter a tag and confirm | Tag: Urgent | The tag is added to the note | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 53 | 1. Delivery Note List Screen | TC-DNL-053 | Print selected Delivery Notes | Access via Inventory > Delivery Note | 1. Select a note
2. Click Print | - | The print view of the Delivery Note is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 54 | 1. Delivery Note List Screen | TC-DNL-054 | Delivery Note list when there are no notes | Access via Inventory > Delivery Note | Open the list in a system with no Delivery Notes | No notes | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. Expected behavior is a standard assumption. |
| 55 | 1. Delivery Note List Screen | TC-DNL-055 | User without permission cannot access Delivery Note | Access via Inventory > Delivery Note | 1. Log in with a user that has no permission for Delivery Note
2. Open the sidebar | Restricted user | The Delivery Note menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 56 | 2. Add Delivery Note - Details Tab | TC-DNA-001 | Open the Add Delivery Note screen | Logged in with a user that has Delivery Note access | 1. Click Inventory from the side menu
2. Click Delivery Note
3. Click Add Delivery Note | - | The Add Delivery Note screen is displayed with an empty form on the Details tab | High | Positive | - |
| 57 | 2. Add Delivery Note - Details Tab | TC-DNA-002 | Add screen displays the three tabs | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the tabs of the Add screen | - | The tabs Details, General Info and More Info are displayed | Medium | UI | - |
| 58 | 2. Add Delivery Note - Details Tab | TC-DNA-003 | Picking fields are disabled on a new Delivery Note | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Add screen and review the picking fields | - | Pick Manually, Scan Barcode, Scan Mode, Prompt Quantity and Picked Qty (In Stock UOM) are disabled | High | Positive | - |
| 59 | 2. Add Delivery Note - Details Tab | TC-DNA-004 | Customer is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Customer and type part of a customer name | Al Noor | The list is filtered while typing and shows matching customers | High | Positive | - |
| 60 | 2. Add Delivery Note - Details Tab | TC-DNA-005 | Select a Customer | Inventory > Delivery Note > Add Delivery Note > Details tab | Search for and select a Customer | Al Noor Stores | The value is accepted | High | Positive | - |
| 61 | 2. Add Delivery Note - Details Tab | TC-DNA-006 | Leave Customer empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Customer empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Customer is mandatory | High | Negative | - |
| 62 | 2. Add Delivery Note - Details Tab | TC-DNA-007 | Customer search with no matching result | Inventory > Delivery Note > Add Delivery Note > Details tab | Type a non-existing name in Customer | ZZZ Unknown | No results are displayed | Low | Negative | - |
| 63 | 2. Add Delivery Note - Details Tab | TC-DNA-008 | Selecting a Customer fills the dependent fields | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a Customer that has a default currency, price list, address and contact | Al Noor Stores | Currency, Price List, Billing / Shipping addresses and contact are filled from the customer | High | Positive | Needs Clarification: SRS describes the defaults only for addresses and contacts (General Info tab). Confirm the others. |
| 64 | 2. Add Delivery Note - Details Tab | TC-DNA-009 | Series dropdown lists the configured naming series | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Series dropdown | - | All naming series configured or previously used in the system are listed | High | Positive | - |
| 65 | 2. Add Delivery Note - Details Tab | TC-DNA-010 | Select a Series | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a Series | MAT-DN-.YYYY.- | The value is accepted | High | Positive | - |
| 66 | 2. Add Delivery Note - Details Tab | TC-DNA-011 | Leave Series empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Series empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Series is mandatory | High | Negative | - |
| 67 | 2. Add Delivery Note - Details Tab | TC-DNA-012 | Date and Posting Time are read-only by default | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Add screen and review Date and Posting Time | - | Both fields are read-only while Edit Posting Date And Time is unchecked | High | Positive | - |
| 68 | 2. Add Delivery Note - Details Tab | TC-DNA-013 | Date defaults to the current date | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Add screen and review Date | - | Date shows the current date | Medium | Positive | Needs Clarification: SRS does not state the default Date and Posting Time values. |
| 69 | 2. Add Delivery Note - Details Tab | TC-DNA-014 | Enable Edit Posting Date And Time | Inventory > Delivery Note > Add Delivery Note > Details tab | Check Edit Posting Date And Time | - | Date and Posting Time become editable | High | Positive | - |
| 70 | 2. Add Delivery Note - Details Tab | TC-DNA-015 | Disable Edit Posting Date And Time | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Edit Posting Date And Time
2. Clear the checkbox | - | Date and Posting Time become read-only again | Medium | Positive | - |
| 71 | 2. Add Delivery Note - Details Tab | TC-DNA-016 | Select a Date using the calendar | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Edit Posting Date And Time
2. Select a date | 2026-11-01 | The selected date is accepted | High | Positive | - |
| 72 | 2. Add Delivery Note - Details Tab | TC-DNA-017 | Select a Posting Time using the time picker | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Edit Posting Date And Time
2. Select a time | 10:30 | The selected time is accepted | High | Positive | - |
| 73 | 2. Add Delivery Note - Details Tab | TC-DNA-018 | Date in the future | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Edit Posting Date And Time
2. Select a future date
3. Click Save | 2027-01-01 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define date validation. |
| 74 | 2. Add Delivery Note - Details Tab | TC-DNA-019 | Date in a closed accounting / stock period | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Edit Posting Date And Time
2. Select a date in a closed period
3. Click Save | Closed period date | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 75 | 2. Add Delivery Note - Details Tab | TC-DNA-020 | Amended From is hidden on a new note | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the form of a new Delivery Note | - | The Amended From field is not displayed | Medium | UI | - |
| 76 | 2. Add Delivery Note - Details Tab | TC-DNA-021 | Is Return is hidden on a normal note | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the form of a new Delivery Note | - | The Is Return checkbox is not displayed | Medium | UI | - |
| 77 | 2. Add Delivery Note - Details Tab | TC-DNA-022 | Issue Credit Note and Return Against fields are hidden on a normal note | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the form of a new Delivery Note | - | Issue Credit Note and Return Against Delivery Note are not displayed | Medium | UI | - |
| 78 | 2. Add Delivery Note - Details Tab | TC-DNA-023 | Currency is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Currency and type part of a currency code | EG | The list is filtered while typing | High | Positive | - |
| 79 | 2. Add Delivery Note - Details Tab | TC-DNA-024 | Currency is fetched from the Company default currency | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Add screen | Company default currency: EGP | Currency is filled with the default currency of the company | High | Positive | - |
| 80 | 2. Add Delivery Note - Details Tab | TC-DNA-025 | Select a different Currency | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a different currency | USD | The value is accepted and the Exchange Rate is refreshed | High | Positive | - |
| 81 | 2. Add Delivery Note - Details Tab | TC-DNA-026 | Leave Currency empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Clear Currency
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Currency is mandatory | High | Negative | - |
| 82 | 2. Add Delivery Note - Details Tab | TC-DNA-027 | Exchange Rate is 1 when the document currency equals the company currency | Inventory > Delivery Note > Add Delivery Note > Details tab | Select Currency = company currency | EGP | Exchange Rate shows 1 | Medium | Positive | - |
| 83 | 2. Add Delivery Note - Details Tab | TC-DNA-028 | Exchange Rate is fetched using the configured fetching rule | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Configure an Exchange Rate Fetching Rule in Accounts Settings
2. Select a foreign currency | USD | The Exchange Rate is filled automatically and is a read-only label | High | Positive | - |
| 84 | 2. Add Delivery Note - Details Tab | TC-DNA-029 | Authorized user can override the fetched Exchange Rate | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Log in with the role allowed to edit the Exchange Rate
2. Change the Exchange Rate manually
3. Click Save | Exchange Rate: 48.50 | The manual value overrides the fetched one and is used in the transaction | High | Positive | - |
| 85 | 2. Add Delivery Note - Details Tab | TC-DNA-030 | Unauthorized user cannot edit the Exchange Rate | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Log in with a user without the Exchange Rate role
2. Try to edit the Exchange Rate | - | The Exchange Rate cannot be modified | High | Negative | - |
| 86 | 2. Add Delivery Note - Details Tab | TC-DNA-031 | No exchange rate found - prompt the user to add one | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Set 'Action if No Exchange Rate Found' = Prompt User to Add Exchange Rate
2. Select a currency without an exchange rate | Currency: JPY | The system prompts the user to create a new Exchange Rate and fills the field after it is created (read-only) | High | Positive | - |
| 87 | 2. Add Delivery Note - Details Tab | TC-DNA-032 | No exchange rate found - use the API | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Set 'Action if No Exchange Rate Found' = Use API to Get Exchange Rate
2. Select a currency without an exchange rate | Currency: JPY | The system creates and retrieves the Exchange Rate from the API and fills the field (read-only) | High | Positive | - |
| 88 | 2. Add Delivery Note - Details Tab | TC-DNA-033 | Exchange rate API is not reachable | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Make the exchange rate API unavailable
2. Select a currency without an exchange rate | API down | A clear error message is displayed and the document cannot be saved without a rate | Medium | Negative | Needs Clarification: Error handling is not defined in the SRS. |
| 89 | 2. Add Delivery Note - Details Tab | TC-DNA-034 | Price List is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Price List and type part of a name | Standard | The list is filtered while typing | High | Positive | - |
| 90 | 2. Add Delivery Note - Details Tab | TC-DNA-035 | Price List default value is Standard Selling | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Add screen | - | Price List is filled with the default price list from Selling Settings | Medium | Positive | - |
| 91 | 2. Add Delivery Note - Details Tab | TC-DNA-036 | Select a Price List | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a Price List | Wholesale | The value is accepted and item rates are refreshed | High | Positive | - |
| 92 | 2. Add Delivery Note - Details Tab | TC-DNA-037 | Leave Price List empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Clear Price List
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Price List is mandatory | High | Negative | - |
| 93 | 2. Add Delivery Note - Details Tab | TC-DNA-038 | Price List: Price List Currency is a read-only label | Inventory > Delivery Note > Add Delivery Note > Details tab | Review Price List Currency and try to edit it | - | Shows the currency of the selected Price List and cannot be edited | Medium | UI | - |
| 94 | 2. Add Delivery Note - Details Tab | TC-DNA-039 | Price List Exchange Rate follows the Exchange Rate configuration | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a Price List with a currency different from the company currency | USD price list | Price List Exchange Rate is filled by the same rules as the document Exchange Rate (fetching rule, prompt or API, role-based edit) | High | Positive | - |
| 95 | 2. Add Delivery Note - Details Tab | TC-DNA-040 | Price List Exchange Rate manual override by an authorized user | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Change the Price List Exchange Rate manually as an authorized user | 48.50 | The manual value is used | Medium | Positive | - |
| 96 | 2. Add Delivery Note - Details Tab | TC-DNA-041 | Ignore Pricing Rule checkbox | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Ignore Pricing Rule
2. Add an item that has a pricing rule | Item with a 10% pricing rule | The pricing rule is not applied | High | Positive | - |
| 97 | 2. Add Delivery Note - Details Tab | TC-DNA-042 | Pricing rule is applied when Ignore Pricing Rule is unchecked | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Ignore Pricing Rule unchecked
2. Add an item that has a pricing rule | Item with a 10% pricing rule | The pricing rule is applied and the discount fields are displayed | High | Positive | - |
| 98 | 2. Add Delivery Note - Details Tab | TC-DNA-043 | Consider Rejected Warehouses | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Consider Rejected Warehouses
2. Open the Warehouse dropdown in an item row | - | Rejected warehouses are included in the system selection and in the Warehouse list | Medium | Positive | - |
| 99 | 2. Add Delivery Note - Details Tab | TC-DNA-044 | Rejected warehouses are excluded by default | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Warehouse dropdown with Consider Rejected Warehouses unchecked | - | Rejected warehouses are not listed | Medium | Positive | - |
| 100 | 2. Add Delivery Note - Details Tab | TC-DNA-045 | Scan Barcode is disabled before Submit For Picking | Inventory > Delivery Note > Add Delivery Note > Details tab | Review Scan Barcode on a Draft note | - | The field is disabled | High | Positive | - |
| 101 | 2. Add Delivery Note - Details Tab | TC-DNA-046 | Pick Manually is disabled before Submit For Picking | Inventory > Delivery Note > Add Delivery Note > Details tab | Review Pick Manually on a Draft note | - | The checkbox is disabled | High | Positive | - |
| 102 | 2. Add Delivery Note - Details Tab | TC-DNA-047 | Scan Mode and Prompt Quantity are disabled before Submit For Picking | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the two checkboxes on a Draft note | - | Both checkboxes are disabled | High | Positive | - |
| 103 | 2. Add Delivery Note - Details Tab | TC-DNA-048 | Scan Barcode accepts valid text | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Enter a barcode | 6221031260017 | The value is accepted | High | Positive | - |
| 104 | 2. Add Delivery Note - Details Tab | TC-DNA-049 | Scan Barcode shorter than the minimum length (1 character) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Enter 1 character in Scan Barcode | 6 | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 105 | 2. Add Delivery Note - Details Tab | TC-DNA-050 | Scan Barcode at the maximum length (100 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Enter exactly 100 characters | 100-character text | The value is accepted | Low | Positive | - |
| 106 | 2. Add Delivery Note - Details Tab | TC-DNA-051 | Scan Barcode longer than 100 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Try to enter 101 characters | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 107 | 2. Add Delivery Note - Details Tab | TC-DNA-052 | Scan Barcode accepts letters, numbers and special characters | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Enter a mix of letters, numbers and special characters | ABC-123/x | The value is accepted | Medium | Positive | - |
| 108 | 2. Add Delivery Note - Details Tab | TC-DNA-053 | Scan Barcode scans with the device camera | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Select the scan option
3. Scan a barcode with the camera | Item barcode | The camera opens and the field is filled with the scanned value | Medium | Positive | - |
| 109 | 2. Add Delivery Note - Details Tab | TC-DNA-054 | Scan Barcode typed slowly is cleared | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Type a barcode manually at a slow speed | 6221031260017 typed slowly | The entered value is cleared automatically | Medium | Negative | - |
| 110 | 2. Add Delivery Note - Details Tab | TC-DNA-055 | Scan a valid item barcode increases the Picked Qty by 1 | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Check Scan Mode
3. Scan a valid barcode of an item in the table | Barcode of Coffee Mug | Picked Qty (In Stock UOM) of the item increases by 1 | High | Positive | - |
| 111 | 2. Add Delivery Note - Details Tab | TC-DNA-056 | Scan the same barcode several times | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Scan Mode
2. Scan the same barcode 3 times | 3 scans | Picked Qty increases by 1 for each scan (total 3) | High | Positive | - |
| 112 | 2. Add Delivery Note - Details Tab | TC-DNA-057 | Scan a barcode that does not belong to any item in the note | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Scan Mode
2. Scan an unknown barcode | Unknown barcode | A clear error message is displayed and no Picked Qty changes | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 113 | 2. Add Delivery Note - Details Tab | TC-DNA-058 | Scan more than the required Qty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Scan Mode
2. Scan the barcode more times than Qty | Qty 2; 3 scans | The system prevents Picked Qty from exceeding Qty | High | Negative | - |
| 114 | 2. Add Delivery Note - Details Tab | TC-DNA-059 | Picked Qty cannot be typed manually when Scan Mode is checked | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Scan Mode
2. Try to type in Picked Qty | - | Picked Qty is read-only | High | Negative | - |
| 115 | 2. Add Delivery Note - Details Tab | TC-DNA-060 | Picked Qty can be typed manually when Scan Mode is unchecked | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Uncheck Scan Mode
2. Type in Picked Qty | 6 | The value is accepted | High | Positive | - |
| 116 | 2. Add Delivery Note - Details Tab | TC-DNA-061 | Save in Scan Mode without scanning | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Scan Mode
2. Do not scan any barcode
3. Click Save | - | An error message is displayed because Qty does not match Picked Qty (In Stock UOM) | High | Negative | - |
| 117 | 2. Add Delivery Note - Details Tab | TC-DNA-062 | Prompt Quantity displays a quantity popup after a scan | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Prompt Quantity
2. Scan a barcode | Barcode of Coffee Mug | A popup asks the user to enter the quantity of the scanned item | High | Positive | - |
| 118 | 2. Add Delivery Note - Details Tab | TC-DNA-063 | Prompt Quantity: enter a quantity in the popup | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Prompt Quantity
2. Scan a barcode
3. Enter a quantity in the popup
4. Confirm | Quantity: 3 | Picked Qty of the item increases by 3 | High | Positive | - |
| 119 | 2. Add Delivery Note - Details Tab | TC-DNA-064 | Prompt Quantity: invalid quantity in the popup | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Prompt Quantity
2. Scan a barcode
3. Enter letters / 0 in the popup | abc / 0 | A validation error is displayed | Medium | Negative | Needs Clarification: Popup rules are not defined in the SRS. |
| 120 | 2. Add Delivery Note - Details Tab | TC-DNA-065 | Save with Prompt Quantity checked and no Picked Qty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Prompt Quantity
2. Leave Picked Qty empty
3. Click Save | - | The note is saved without a validation error | Medium | Positive | - |
| 121 | 2. Add Delivery Note - Details Tab | TC-DNA-066 | Scan Mode and Prompt Quantity together | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check both checkboxes
2. Scan a barcode | Barcode of Coffee Mug | The quantity popup is displayed and Picked Qty is updated by the quantity entered | Medium | Positive | Needs Clarification: Interaction between the two modes (+1 per scan vs prompt) is not defined. |
| 122 | 2. Add Delivery Note - Details Tab | TC-DNA-067 | Delivery Note Items table displays the default columns | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the items table | - | The default columns are displayed (Checkbox, No., Item, Warehouse, Qty, Qty (In Stock UOM), Picked Qty (In Stock UOM)) | Medium | UI | - |
| 123 | 2. Add Delivery Note - Details Tab | TC-DNA-068 | Add Row adds a new item row | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Add Row in the items table | - | A new empty row is added to the table | High | Positive | - |
| 124 | 2. Add Delivery Note - Details Tab | TC-DNA-069 | Item rows are numbered in order | Inventory > Delivery Note > Add Delivery Note > Details tab | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 125 | 2. Add Delivery Note - Details Tab | TC-DNA-070 | Item is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Item in a row and type part of an item name | Coffee | The list is filtered while typing and shows matching items | High | Positive | - |
| 126 | 2. Add Delivery Note - Details Tab | TC-DNA-071 | Item lists only items with Maintain Stock enabled | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Item dropdown | Coffee Mug (stock item); Delivery Service (non-stock) | Only Coffee Mug is listed | High | Positive | - |
| 127 | 2. Add Delivery Note - Details Tab | TC-DNA-072 | Select an Item | Inventory > Delivery Note > Add Delivery Note > Details tab | Select an item in a row | Coffee Mug | The value is accepted and the rate, UOM and details are filled | High | Positive | - |
| 128 | 2. Add Delivery Note - Details Tab | TC-DNA-073 | Leave Item empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add a row
2. Leave Item empty
3. Click Save | - | An error message is displayed because Item is mandatory | High | Negative | - |
| 129 | 2. Add Delivery Note - Details Tab | TC-DNA-074 | Item search with no matching result | Inventory > Delivery Note > Add Delivery Note > Details tab | Type a non-existing item name | ZZZ Unknown | No results are displayed | Low | Negative | - |
| 130 | 2. Add Delivery Note - Details Tab | TC-DNA-075 | Same item in two rows | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add two rows with the same item
2. Click Save | Coffee Mug (x2) | To be confirmed with the BA (merged, blocked or allowed) | Medium | Negative | Needs Clarification: SRS does not define duplicate items. |
| 131 | 2. Add Delivery Note - Details Tab | TC-DNA-076 | Warehouse is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Warehouse in a row and type part of a name | Stores | The list is filtered while typing | High | Positive | - |
| 132 | 2. Add Delivery Note - Details Tab | TC-DNA-077 | Warehouse lists only child warehouses | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Warehouse dropdown | Group warehouse: All Warehouses; child: Stores - E | Only child (non-group) warehouses are listed | High | Positive | - |
| 133 | 2. Add Delivery Note - Details Tab | TC-DNA-078 | Warehouse is selected automatically when Pick Manually is unchecked | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add an item with stock in several warehouses | Item in 2 warehouses with different expiry | The system selects the warehouse based on the nearest expiry date | High | Positive | - |
| 134 | 2. Add Delivery Note - Details Tab | TC-DNA-079 | Warehouse cannot be selected manually when Pick Manually is unchecked | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Try to change the Warehouse | - | The Warehouse field cannot be changed | High | Negative | - |
| 135 | 2. Add Delivery Note - Details Tab | TC-DNA-080 | Warehouse can be selected manually when Pick Manually is checked | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Check Pick Manually
3. Change the Warehouse | Stores - E | The Warehouse can be changed | High | Positive | - |
| 136 | 2. Add Delivery Note - Details Tab | TC-DNA-081 | Leave Warehouse empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add a row with an item
2. Clear Warehouse
3. Click Save | - | An error message is displayed because Warehouse is mandatory | High | Negative | - |
| 137 | 2. Add Delivery Note - Details Tab | TC-DNA-082 | Pick Manually keeps the manual picked Qty / batch / serial / warehouse | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Pick Manually
2. Change the warehouse and picked quantity
3. Click Save | - | The system does not override the manual picks | High | Positive | - |
| 138 | 2. Add Delivery Note - Details Tab | TC-DNA-083 | Qty accepts a valid number | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter a valid number in Qty | 6 | The value is accepted | High | Positive | - |
| 139 | 2. Add Delivery Note - Details Tab | TC-DNA-084 | Leave Qty empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add a row with an item
2. Leave Qty empty
3. Click Save | - | An error message is displayed because Qty is mandatory | High | Negative | - |
| 140 | 2. Add Delivery Note - Details Tab | TC-DNA-085 | Qty rejects letters and special characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Type letters and special characters in Qty | abc, @# | Only numbers are accepted | Medium | Negative | - |
| 141 | 2. Add Delivery Note - Details Tab | TC-DNA-086 | Qty at the maximum length (100 digits) | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter exactly 100 digits in Qty | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 142 | 2. Add Delivery Note - Details Tab | TC-DNA-087 | Qty longer than 100 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to enter 101 digits in Qty | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 143 | 2. Add Delivery Note - Details Tab | TC-DNA-088 | Qty equal to zero | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter 0 in Qty
2. Click Save | 0 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 144 | 2. Add Delivery Note - Details Tab | TC-DNA-089 | Qty with decimal values | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter a decimal number in Qty
2. Click Save | 1.5 | To be confirmed with the BA (accepted or rejected) | Medium | Positive | Needs Clarification: SRS says 'numbers only' without saying whether decimals are allowed. |
| 145 | 2. Add Delivery Note - Details Tab | TC-DNA-090 | Qty greater than the available stock | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select an item with 4 units in stock
2. Enter Qty = 10
3. Click Save | Available: 4; Qty: 10 | A warning/validation message is displayed about insufficient stock | High | Negative | Needs Clarification: SRS states: Qty = Actual Qty - Reserved Qty, and a warning appears when the quantity is LESS than the available quantity. The wording looks inverted. Confirm the exact rule. |
| 146 | 2. Add Delivery Note - Details Tab | TC-DNA-091 | Qty less than the available quantity warning | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select an item with 10 units in stock
2. Enter Qty = 4 | Available: 10; Qty: 4 | A warning asks the user to Update the Item Location or enter an available quantity | Medium | Positive | Needs Clarification: As written in the SRS (see above). |
| 147 | 2. Add Delivery Note - Details Tab | TC-DNA-092 | Qty respects reserved stock | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Reserve part of an item's stock
2. Create a Delivery Note for the full stock | Actual: 10; Reserved: 4; Qty: 8 | Only 6 units (actual minus reserved) can be delivered | High | Negative | - |
| 148 | 2. Add Delivery Note - Details Tab | TC-DNA-093 | Qty (In Stock UOM) is a read-only label | Inventory > Delivery Note > Add Delivery Note > Details tab | Review Qty (In Stock UOM) | UOM: Box (12); Qty 2 | It shows the quantity in the stock UOM (24) and cannot be edited | High | UI | - |
| 149 | 2. Add Delivery Note - Details Tab | TC-DNA-094 | Picked Qty accepts a valid number after Submit For Picking | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Enter Picked Qty | 6 | The value is accepted | High | Positive | - |
| 150 | 2. Add Delivery Note - Details Tab | TC-DNA-095 | Picked Qty rejects letters | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Type letters in Picked Qty | abc | Only numbers are accepted | Medium | Negative | - |
| 151 | 2. Add Delivery Note - Details Tab | TC-DNA-096 | Picked Qty greater than Qty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Enter Picked Qty greater than Qty | Qty: 6; Picked: 8 | A validation error is displayed | High | Negative | - |
| 152 | 2. Add Delivery Note - Details Tab | TC-DNA-097 | Picked Qty smaller than Qty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Enter Picked Qty smaller than Qty
3. Click Save | Qty: 6; Picked: 3 | The note is saved and its status becomes Partially Picked | High | Positive | - |
| 153 | 2. Add Delivery Note - Details Tab | TC-DNA-098 | Picked Qty at the maximum length (100 digits) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Submit the note for picking
2. Enter exactly 100 digits | 100-digit number | Input stops at 100 characters | Low | Negative | - |
| 154 | 2. Add Delivery Note - Details Tab | TC-DNA-099 | Picked Qty is disabled before Submit For Picking | Inventory > Delivery Note > Add Delivery Note > Details tab | Review Picked Qty on a Draft note | - | Picked Qty is disabled | High | Positive | - |
| 155 | 2. Add Delivery Note - Details Tab | TC-DNA-100 | Action bar appears when an item row is selected | Inventory > Delivery Note > Add Delivery Note > Details tab | Select the checkbox of an item row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 156 | 2. Add Delivery Note - Details Tab | TC-DNA-101 | Delete a single item row | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select one row
2. Click Delete row | - | The selected row is deleted, the numbering is updated and the totals are recalculated | High | Positive | - |
| 157 | 2. Add Delivery Note - Details Tab | TC-DNA-102 | Delete multiple item rows | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select two rows
2. Click Delete row | - | Both rows are deleted and the totals are recalculated | Medium | Positive | - |
| 158 | 2. Add Delivery Note - Details Tab | TC-DNA-103 | Items: Open the table Settings popup | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Setting on the Items table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 159 | 2. Add Delivery Note - Details Tab | TC-DNA-104 | Items: Reorder columns using drag and drop | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Setting
2. Drag the Quantity column header and drop it before Item Code | - | The column order changes to the new position | Medium | Positive | - |
| 160 | 2. Add Delivery Note - Details Tab | TC-DNA-105 | Items: Column width default value is 3 | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 161 | 2. Add Delivery Note - Details Tab | TC-DNA-106 | Items: Column width accepts numbers only | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 162 | 2. Add Delivery Note - Details Tab | TC-DNA-107 | Items: Column width left empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 163 | 2. Add Delivery Note - Details Tab | TC-DNA-108 | Items: Column width with 1 character | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 164 | 2. Add Delivery Note - Details Tab | TC-DNA-109 | Items: Column width longer than 3 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 165 | 2. Add Delivery Note - Details Tab | TC-DNA-110 | Items: Add / Remove Columns popup lists all columns | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Item Code, Quantity, UOM, Rate, Amount, Warehouse) | Medium | UI | Needs Clarification: SRS lists about 60 optional columns for the items table. Confirm the default visible columns. |
| 166 | 2. Add Delivery Note - Details Tab | TC-DNA-111 | Items: Hide a column | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Add / Remove columns
2. Clear the Rate checkbox
3. Click Update | Column: Rate | The Rate column is hidden from the table | Medium | Positive | - |
| 167 | 2. Add Delivery Note - Details Tab | TC-DNA-112 | Items: Show a hidden column | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Hide the Rate column
2. Open Add / Remove columns
3. Select the Rate checkbox
4. Click Update | Column: Rate | The Rate column is displayed again | Medium | Positive | - |
| 168 | 2. Add Delivery Note - Details Tab | TC-DNA-113 | Items: Save the Settings using Update | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 169 | 2. Add Delivery Note - Details Tab | TC-DNA-114 | Items: Reset Settings to default | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 170 | 2. Add Delivery Note - Details Tab | TC-DNA-115 | Items: open the Edit Row popup | Inventory > Delivery Note > Add Delivery Note > Details tab | Click the Edit Row icon of an item row | - | A popup is displayed with the row fields | High | Positive | - |
| 171 | 2. Add Delivery Note - Details Tab | TC-DNA-116 | Items Edit Row: Item lists only items with Maintain Stock enabled | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and open the Item dropdown | Delivery Service (non-stock) | Non-stock items are not listed | Medium | Positive | - |
| 172 | 2. Add Delivery Note - Details Tab | TC-DNA-117 | Items Edit Row: Item Group is a read-only label | Inventory > Delivery Note > Add Delivery Note > Details tab | Select an item and review Item Group | Coffee Mug > Consumer Goods | Item Group shows the group of the item and cannot be edited | Medium | UI | - |
| 173 | 2. Add Delivery Note - Details Tab | TC-DNA-118 | Items Edit Row: Item Name is displayed only when an item is selected | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Edit Row of an empty row
2. Select an item | Coffee Mug | Item Name is hidden before and displayed after the selection | Medium | UI | - |
| 174 | 2. Add Delivery Note - Details Tab | TC-DNA-119 | Items Edit Row: Customer's Item Code is fetched from the Customer Items table | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a customer that has a Ref Code for the item
2. Open Edit Row | Ref Code: CUST-COF-01 | Customer's Item Code shows the ref code | Medium | Positive | - |
| 175 | 2. Add Delivery Note - Details Tab | TC-DNA-120 | Items Edit Row: Description is fetched from the item and editable | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and review Description | Item description | Description is filled from the item and can be edited | Medium | Positive | - |
| 176 | 2. Add Delivery Note - Details Tab | TC-DNA-121 | Items Edit Row: Description (Edit Row) accepts valid text | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter valid text in Description (Edit Row) | Deliver before noon | The value is accepted | Medium | Positive | - |
| 177 | 2. Add Delivery Note - Details Tab | TC-DNA-122 | Items Edit Row: Leave Description (Edit Row) empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Description (Edit Row) empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 178 | 2. Add Delivery Note - Details Tab | TC-DNA-123 | Items Edit Row: Description (Edit Row) shorter than the minimum length (2 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter 2 characters in Description (Edit Row)
2. Click Save | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 179 | 2. Add Delivery Note - Details Tab | TC-DNA-124 | Items Edit Row: Description (Edit Row) at the minimum length (3 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter 3 characters in Description (Edit Row) | abc | The value is accepted | Medium | Positive | - |
| 180 | 2. Add Delivery Note - Details Tab | TC-DNA-125 | Items Edit Row: Description (Edit Row) at the maximum length (500 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter exactly 500 characters in Description (Edit Row) | 500-character text | The value is accepted | Medium | Positive | - |
| 181 | 2. Add Delivery Note - Details Tab | TC-DNA-126 | Items Edit Row: Description (Edit Row) longer than 500 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to enter or paste 501 characters in Description (Edit Row) | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 182 | 2. Add Delivery Note - Details Tab | TC-DNA-127 | Items Edit Row: Description (Edit Row) accepts letters, numbers and special characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter a mix of letters, numbers and special characters in Description (Edit Row) | Gate #3 - floor 2 (A/B) | The value is accepted | Medium | Positive | - |
| 183 | 2. Add Delivery Note - Details Tab | TC-DNA-128 | Items Edit Row: Description (Edit Row) rejects invalid data | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter invalid content such as script tags in Description (Edit Row)
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 184 | 2. Add Delivery Note - Details Tab | TC-DNA-129 | Items Edit Row: Brand Name is a read-only label | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and review Brand Name | Brand: Nile Foods | Brand Name is fetched from the item and cannot be edited | Low | UI | - |
| 185 | 2. Add Delivery Note - Details Tab | TC-DNA-130 | Items Edit Row: Image is read-only | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and review Image | - | The item image is displayed and cannot be edited | Low | UI | - |
| 186 | 2. Add Delivery Note - Details Tab | TC-DNA-131 | Items Edit Row: Warehouse follows the Pick Manually rule | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Edit Row
2. Try to change Warehouse with Pick Manually unchecked | - | Warehouse cannot be changed | Medium | Negative | - |
| 187 | 2. Add Delivery Note - Details Tab | TC-DNA-132 | Items Edit Row: UOM is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and type part of a UOM | Box | The list is filtered while typing | Medium | Positive | - |
| 188 | 2. Add Delivery Note - Details Tab | TC-DNA-133 | Items Edit Row: change the UOM | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a different UOM | Box (12 Nos) | UOM Conversion Factor, Qty in Stock UOM and the rate are recalculated | High | Positive | - |
| 189 | 2. Add Delivery Note - Details Tab | TC-DNA-134 | Items Edit Row: leave UOM empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Clear UOM
2. Click Update | - | The row uses the stock UOM (field is optional) | Low | Positive | - |
| 190 | 2. Add Delivery Note - Details Tab | TC-DNA-135 | Items Edit Row: Stock UOM is a read-only label | Inventory > Delivery Note > Add Delivery Note > Details tab | Review Stock UOM | Nos | Stock UOM shows the default UOM of the item and cannot be edited | Medium | UI | - |
| 191 | 2. Add Delivery Note - Details Tab | TC-DNA-136 | Items Edit Row: UOM Conversion Factor is calculated | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a UOM different from the stock UOM | Box = 12 Nos | UOM Conversion Factor shows 12 | High | Positive | - |
| 192 | 2. Add Delivery Note - Details Tab | TC-DNA-137 | Items Edit Row: Returned Qty (In Stock UOM) is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a note that has a return | Returned: 2 | Returned Qty shows 2 | Medium | Positive | - |
| 193 | 2. Add Delivery Note - Details Tab | TC-DNA-138 | Items Edit Row: Stock Reserved Qty (In Stock UOM) is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a note picked from a Pick List | Reserved: 6 | Stock Reserved Qty shows the quantity reserved through the pick list | Low | Positive | - |
| 194 | 2. Add Delivery Note - Details Tab | TC-DNA-139 | Items Edit Row: Delivered Qty (In Stock UOM) is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a delivered note | Delivered: 6 | Delivered Qty shows the delivered quantity | Medium | Positive | - |
| 195 | 2. Add Delivery Note - Details Tab | TC-DNA-140 | Items Edit Row: Available Qty (Warehouse) is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row | Warehouse stock: 20 | Available Qty (Warehouse) shows the actual quantity in the selected warehouse | High | Positive | - |
| 196 | 2. Add Delivery Note - Details Tab | TC-DNA-141 | Items Edit Row: Available Qty (Company) is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row | Company stock: 35 | Available Qty (Company) shows the actual quantity in the company | Medium | Positive | - |
| 197 | 2. Add Delivery Note - Details Tab | TC-DNA-142 | Items Edit Row: Available Batch Qty at From Warehouse | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row for a batch item | BATCH-A: 6; BATCH-B: 4 | The total quantity across all batches in the warehouse (10) is displayed | Medium | Positive | - |
| 198 | 2. Add Delivery Note - Details Tab | TC-DNA-143 | Items Edit Row: Packed Qty is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a note that has a Packing Slip | Packed: 4 | Packed Qty shows the quantity packed in the linked Packing Slip | Medium | Positive | - |
| 199 | 2. Add Delivery Note - Details Tab | TC-DNA-144 | Items Edit Row: Price List Rate (Currency) is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row | Rate in Price List: 50 | Price List Rate shows the item's price before pricing rules | High | Positive | - |
| 200 | 2. Add Delivery Note - Details Tab | TC-DNA-145 | Items Edit Row: Price List Rate (Company Currency) uses the exchange rate | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a foreign currency
2. Open Edit Row | 50 USD x 48.5 | Price List Rate (Company Currency) shows 2425 | High | Positive | - |
| 201 | 2. Add Delivery Note - Details Tab | TC-DNA-146 | Items Edit Row: Margin Type dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Margin Type dropdown | - | The dropdown contains: Percentage, Amount | Medium | Positive | - |
| 202 | 2. Add Delivery Note - Details Tab | TC-DNA-147 | Items Edit Row: Leave Margin Type empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Margin Type empty
2. Click Update | - | The row is saved (field is optional) | Low | Positive | - |
| 203 | 2. Add Delivery Note - Details Tab | TC-DNA-148 | Items Edit Row: Margin Rate or Amount accepts numbers | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select Margin Type = Percentage
2. Enter a margin | 10 | The value is accepted | Medium | Positive | - |
| 204 | 2. Add Delivery Note - Details Tab | TC-DNA-149 | Items Edit Row: Margin Rate or Amount accepts special characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter numbers and special characters in Margin Rate or Amount | 10.5 | The value is accepted | Low | Positive | Needs Clarification: SRS says 'numbers and special characters only' without listing which special characters. |
| 205 | 2. Add Delivery Note - Details Tab | TC-DNA-150 | Items Edit Row: Margin Rate or Amount rejects letters | Inventory > Delivery Note > Add Delivery Note > Details tab | Type letters in Margin Rate or Amount | abc | Letters are not accepted | Medium | Negative | - |
| 206 | 2. Add Delivery Note - Details Tab | TC-DNA-151 | Items Edit Row: Rate With Margin = Price List Rate + Margin | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Price List Rate 100
2. Margin Type Amount; Margin 10 | 100 + 10 | Rate With Margin shows 110 | High | Positive | - |
| 207 | 2. Add Delivery Note - Details Tab | TC-DNA-152 | Items Edit Row: Rate With Margin with a percentage margin | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Price List Rate 100
2. Margin Type Percentage; Margin 10 | 100 + 10% | Rate With Margin shows 110 | High | Positive | Needs Clarification: SRS formula is 'Price List Rate + Margin Rate' for both types. |
| 208 | 2. Add Delivery Note - Details Tab | TC-DNA-153 | Items Edit Row: Discount (%) is displayed when Ignore Pricing Rule is 0 | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Ignore Pricing Rule unchecked
2. Add an item with a pricing rule
3. Open Edit Row | 10% pricing rule | Discount (%) on Price List Rate with Margin is displayed | Medium | Positive | - |
| 209 | 2. Add Delivery Note - Details Tab | TC-DNA-154 | Items Edit Row: Discount fields are hidden when Ignore Pricing Rule is checked | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Ignore Pricing Rule
2. Open Edit Row | - | Discount (%) and Discount Amount are not displayed | Medium | UI | - |
| 210 | 2. Add Delivery Note - Details Tab | TC-DNA-155 | Items Edit Row: Discount Amount is calculated | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Rate With Margin 100
2. Discount 10% | 100 x 10% | Discount Amount shows 10 | High | Positive | - |
| 211 | 2. Add Delivery Note - Details Tab | TC-DNA-156 | Items Edit Row: Distributed Discount Amount reflects the additional discount | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Apply an additional discount on the document
2. Open Edit Row of each item | Additional discount: 20 | Each item shows its share of the discount | Medium | Positive | - |
| 212 | 2. Add Delivery Note - Details Tab | TC-DNA-157 | Items Edit Row: Rate With Margin (Company Currency) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a foreign currency
2. Open Edit Row | 110 USD | Rate With Margin (Company Currency) shows the converted value | Medium | Positive | - |
| 213 | 2. Add Delivery Note - Details Tab | TC-DNA-158 | Items Edit Row: Rate = Rate With Margin after discount | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Rate With Margin 100
2. Discount 10% | - | Rate shows 90 | High | Positive | - |
| 214 | 2. Add Delivery Note - Details Tab | TC-DNA-159 | Items Edit Row: Amount = Rate x Qty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Rate 90
2. Qty 6 | 90 x 6 | Amount shows 540 | High | Positive | - |
| 215 | 2. Add Delivery Note - Details Tab | TC-DNA-160 | Items Edit Row: Rate (Company Currency) and Amount (Company Currency) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a foreign currency
2. Open Edit Row | Rate 90 USD; EGP 48.5 | Both values are converted with the exchange rate | Medium | Positive | - |
| 216 | 2. Add Delivery Note - Details Tab | TC-DNA-161 | Items Edit Row: Pricing Rules label lists the applied rules | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of an item with a pricing rule | PRLE-0001 | The names of the applied pricing rules are displayed | Medium | Positive | - |
| 217 | 2. Add Delivery Note - Details Tab | TC-DNA-162 | Items Edit Row: Rate of Stock UOM | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row for an item sold in a non-stock UOM | Box 120 = 10 per Nos | Rate of Stock UOM shows the price per stock UOM | Medium | Positive | - |
| 218 | 2. Add Delivery Note - Details Tab | TC-DNA-163 | Items Edit Row: Grant Commission is a read-only checkbox | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and try to change Grant Commission | - | The checkbox cannot be changed | Low | UI | - |
| 219 | 2. Add Delivery Note - Details Tab | TC-DNA-164 | Items Edit Row: Net Rate | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Apply a discount and a tax template | - | Net Rate shows the unit price after pricing rules, discounts and tax templates | Medium | Positive | - |
| 220 | 2. Add Delivery Note - Details Tab | TC-DNA-165 | Items Edit Row: Net Amount = Net Rate x Qty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Net Rate 90
2. Qty 6 | 90 x 6 | Net Amount shows 540 | High | Positive | - |
| 221 | 2. Add Delivery Note - Details Tab | TC-DNA-166 | Items Edit Row: Item Tax Template is a read-only label | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and review Item Tax Template | VAT 14% | The tax template applied to the item is displayed | Medium | UI | - |
| 222 | 2. Add Delivery Note - Details Tab | TC-DNA-167 | Items Edit Row: Net Rate / Net Amount (Company Currency) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a foreign currency
2. Open Edit Row | - | Both values are converted with the exchange rate | Medium | Positive | - |
| 223 | 2. Add Delivery Note - Details Tab | TC-DNA-168 | Items Edit Row: Billed Amount is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a partially invoiced note | Billed: 270 | Billed Amount shows the invoiced amount | Medium | Positive | - |
| 224 | 2. Add Delivery Note - Details Tab | TC-DNA-169 | Items Edit Row: Incoming Rate is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row | - | Incoming Rate shows the internal purchase price of the item | Low | Positive | - |
| 225 | 2. Add Delivery Note - Details Tab | TC-DNA-170 | Items Edit Row: Weight per unit, Weight UOM and Total weight | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of an item with Weight per unit 0.5 | Qty 6 | Weight per unit = 0.5, Weight UOM is displayed and Total weight = 3 | Medium | Positive | - |
| 226 | 2. Add Delivery Note - Details Tab | TC-DNA-171 | Items Edit Row: Quality Inspection is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of an item that has a Quality Inspection | QI-0001 | The linked Quality Inspection is displayed | Low | Positive | - |
| 227 | 2. Add Delivery Note - Details Tab | TC-DNA-172 | Items Edit Row: Allow Zero Valuation Rate | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Allow Zero Valuation Rate for an item with zero stock value
2. Save and deliver | - | The item can be delivered even if its stock value is zero | Medium | Positive | - |
| 228 | 2. Add Delivery Note - Details Tab | TC-DNA-173 | Items Edit Row: Delivery of a zero-valuation item without the checkbox | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Allow Zero Valuation Rate unchecked
2. Deliver an item with zero stock value | - | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS (standard ERPNext behavior). |
| 229 | 2. Add Delivery Note - Details Tab | TC-DNA-174 | Items Edit Row: Against Sales Order is displayed and clickable | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Create a note from a Sales Order
2. Open Edit Row
3. Click Against Sales Order | SO-0001 | The user is redirected to the related Sales Order | Medium | Positive | - |
| 230 | 2. Add Delivery Note - Details Tab | TC-DNA-175 | Items Edit Row: Against Sales Order Item is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a note created from a Sales Order | - | The matching item row of the Sales Order is displayed | Low | Positive | - |
| 231 | 2. Add Delivery Note - Details Tab | TC-DNA-176 | Items Edit Row: Against Sales Invoice is displayed and clickable | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Create a note from a Sales Invoice
2. Open Edit Row
3. Click Against Sales Invoice | SINV-0001 | The user is redirected to the related Sales Invoice | Medium | Positive | - |
| 232 | 2. Add Delivery Note - Details Tab | TC-DNA-177 | Items Edit Row: Against Sales Invoice Item is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a note created from a Sales Invoice | - | The matching item row of the Sales Invoice is displayed | Low | Positive | - |
| 233 | 2. Add Delivery Note - Details Tab | TC-DNA-178 | Items Edit Row: Against Delivery Note Item appears only for linked notes | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a Sales Return note | - | Against Delivery Note Item shows the row of the original note | Low | Positive | - |
| 234 | 2. Add Delivery Note - Details Tab | TC-DNA-179 | Items Edit Row: Expense Account is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and type part of an account name | Cost of Goods Sold | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 235 | 2. Add Delivery Note - Details Tab | TC-DNA-180 | Items Edit Row: Item Tax Rate accepts numbers and decimals | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter a tax rate | 14.5 | The value is accepted | Medium | Positive | - |
| 236 | 2. Add Delivery Note - Details Tab | TC-DNA-181 | Items Edit Row: Item Tax Rate rejects letters | Inventory > Delivery Note > Add Delivery Note > Details tab | Type letters in Item Tax Rate | abc | Letters are not accepted | Medium | Negative | - |
| 237 | 2. Add Delivery Note - Details Tab | TC-DNA-182 | Items Edit Row: Cost Center is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and type part of a cost center name | Main | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 238 | 2. Add Delivery Note - Details Tab | TC-DNA-183 | Items Edit Row: Project is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and type part of a project name | Warehouse | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 239 | 2. Add Delivery Note - Details Tab | TC-DNA-184 | Items Edit Row: save changes with Update | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Edit Row
2. Change Qty, UOM and Description
3. Click Update | Qty: 4 | The popup closes and the changes are reflected in the row and the totals | High | Positive | - |
| 240 | 2. Add Delivery Note - Details Tab | TC-DNA-185 | Pick Serial / Batch No button is hidden when the Inventory Settings option is off | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Disable 'Activate Serial / Batch No for item' in Inventory Settings
2. Open Edit Row | Setting: off | The Pick Serial / Batch No button is not displayed | High | Positive | - |
| 241 | 2. Add Delivery Note - Details Tab | TC-DNA-186 | Pick Serial / Batch No button is displayed when the option is on | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enable 'Activate Serial / Batch No for item' in Inventory Settings
2. Open Edit Row | Setting: on | The Pick Serial / Batch No button is displayed | High | Positive | - |
| 242 | 2. Add Delivery Note - Details Tab | TC-DNA-187 | Pick Serial / Batch No selects numbers using the picking method | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Set the picking method to FIFO
2. Click Pick Serial / Batch No for a serialized item | Item: Laptop X1; Qty 2; FIFO | The oldest 2 serial numbers are selected automatically | High | Positive | - |
| 243 | 2. Add Delivery Note - Details Tab | TC-DNA-188 | Pick Serial / Batch No with the Expiry picking method | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Set the picking method to Expiry
2. Click Pick Serial / Batch No for a batch item | Batches with different expiry dates | The batches with the nearest expiry are selected first | High | Positive | - |
| 244 | 2. Add Delivery Note - Details Tab | TC-DNA-189 | Pick Serial / Batch No with the LIFO picking method | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Set the picking method to LIFO
2. Click Pick Serial / Batch No | LIFO | The newest serial numbers / batches are selected first | Medium | Positive | - |
| 245 | 2. Add Delivery Note - Details Tab | TC-DNA-190 | Pick Serial / Batch No when the stock is not enough | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Click Pick Serial / Batch No for a quantity larger than the available serials | Available: 1; Qty: 2 | A clear message is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 246 | 2. Add Delivery Note - Details Tab | TC-DNA-191 | Serial and Batch Bundle is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Serial and Batch Bundle and type part of a name | SABB | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 247 | 2. Add Delivery Note - Details Tab | TC-DNA-192 | Use Serial No / Batch Fields hides the picker and bundle | Inventory > Delivery Note > Add Delivery Note > Details tab | Check Use Serial No / Batch Fields | - | The Pick Serial / Batch No button and the Serial and Batch Bundle field are hidden; Serial No and Batch No fields are displayed | High | Positive | - |
| 248 | 2. Add Delivery Note - Details Tab | TC-DNA-193 | Serial No / Batch No fields are hidden when the checkbox is unchecked | Inventory > Delivery Note > Add Delivery Note > Details tab | Leave Use Serial No / Batch Fields unchecked | - | The Serial No and Batch No fields are not displayed | Medium | UI | - |
| 249 | 2. Add Delivery Note - Details Tab | TC-DNA-194 | Serial No accepts a valid serial number | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Use Serial No / Batch Fields
2. Enter a serial number | SN-0001 | The value is accepted | High | Positive | - |
| 250 | 2. Add Delivery Note - Details Tab | TC-DNA-195 | Serial No: Enter key creates a new line | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter a serial number
2. Press Enter
3. Enter another serial number | SN-0001, SN-0002 | A new line is created for each serial number | High | Positive | - |
| 251 | 2. Add Delivery Note - Details Tab | TC-DNA-196 | Serial No shorter than the minimum length (2 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter 2 characters in Serial No | SN | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 252 | 2. Add Delivery Note - Details Tab | TC-DNA-197 | Serial No at the maximum length (500 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter exactly 500 characters in Serial No | 500-character text | The value is accepted | Low | Positive | - |
| 253 | 2. Add Delivery Note - Details Tab | TC-DNA-198 | Serial No longer than 500 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to enter 501 characters in Serial No | 501-character text | Input stops at 500 characters | Low | Negative | - |
| 254 | 2. Add Delivery Note - Details Tab | TC-DNA-199 | Serial No rejects invalid data | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter script tags in Serial No | <script>x</script> | An error message is displayed | Medium | Negative | - |
| 255 | 2. Add Delivery Note - Details Tab | TC-DNA-200 | Serial No that does not exist in the warehouse | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter a serial number that is not in the selected warehouse
2. Click Save | SN-9999 | A validation error is displayed | High | Negative | Needs Clarification: Not defined in the SRS. |
| 256 | 2. Add Delivery Note - Details Tab | TC-DNA-201 | Serial numbers count must match the Qty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Qty 3
2. Enter only 2 serial numbers
3. Click Save | Qty 3; 2 serials | A validation error is displayed | High | Negative | Needs Clarification: Not defined in the SRS. |
| 257 | 2. Add Delivery Note - Details Tab | TC-DNA-202 | Batch No is a searchable dropdown filtered by item and warehouse | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check Use Serial No / Batch Fields
2. Open Batch No | Item: Milk 1L; Warehouse: Stores - E | Only batches of the item in the selected warehouse are listed | High | Positive | - |
| 258 | 2. Add Delivery Note - Details Tab | TC-DNA-203 | Select a Batch No | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a batch | BATCH-A | The value is accepted | High | Positive | - |
| 259 | 2. Add Delivery Note - Details Tab | TC-DNA-204 | Leave Batch No empty for a batch item | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Batch No empty for a batch item
2. Click Save | Item: Milk 1L | A validation error is displayed because batch items need a batch | High | Negative | Needs Clarification: Batch No is optional in the SRS, but batch items require one at delivery. |
| 260 | 2. Add Delivery Note - Details Tab | TC-DNA-205 | Total Quantity is the sum of the item quantities | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add two rows: 6 and 4 | 6 + 4 | Total Quantity shows 10 | High | Positive | - |
| 261 | 2. Add Delivery Note - Details Tab | TC-DNA-206 | Total (Currency) is the sum of the item amounts | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add two rows with amounts 300 and 200 | 300 + 200 | Total (document currency) shows 500 | High | Positive | - |
| 262 | 2. Add Delivery Note - Details Tab | TC-DNA-207 | Total (Company base currency) uses the exchange rate | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a foreign currency
2. Add items | 500 USD x 48.5 | Total (Company base currency) shows 24,250 | High | Positive | - |
| 263 | 2. Add Delivery Note - Details Tab | TC-DNA-208 | Total Net Weight is the sum of the item weights | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add items with total weights 3 and 2 | 3 + 2 | Total Net Weight shows 5 | Medium | Positive | - |
| 264 | 2. Add Delivery Note - Details Tab | TC-DNA-209 | Net Total (Currency) and Net Total (Company base currency) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add items with discounts | - | Both net totals are calculated after discounts | Medium | Positive | - |
| 265 | 2. Add Delivery Note - Details Tab | TC-DNA-210 | Totals update when a row is deleted | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add two rows
2. Delete one row | - | All totals are recalculated | High | Positive | - |
| 266 | 2. Add Delivery Note - Details Tab | TC-DNA-211 | Totals update when Qty is changed | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Change Qty of a row | 6 > 4 | All totals are recalculated | High | Positive | - |
| 267 | 2. Add Delivery Note - Details Tab | TC-DNA-212 | Totals are read-only labels | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to edit Total Quantity and the totals | - | None of them can be edited | Medium | UI | - |
| 268 | 2. Add Delivery Note - Details Tab | TC-DNA-213 | Tax Category is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Tax Category and type part of a name | In-State | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 269 | 2. Add Delivery Note - Details Tab | TC-DNA-214 | Shipping Rule is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Shipping Rule and type part of a name | Standard | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 270 | 2. Add Delivery Note - Details Tab | TC-DNA-215 | Selecting a Shipping Rule adds the shipping charge to the taxes and totals | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a Shipping Rule with Net Total condition 10-100 = 50
2. Add items with net total 80 | Net total 80 | A shipping charge of 50 is added to the taxes and charges and to the Grand Total | High | Positive | Needs Clarification: SRS does not describe how the Shipping Rule affects totals. See the Shipping Rule module. |
| 271 | 2. Add Delivery Note - Details Tab | TC-DNA-216 | Disabled Shipping Rule is not available | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Shipping Rule dropdown | Disabled rule | Disabled shipping rules are not listed | Medium | Positive | - |
| 272 | 2. Add Delivery Note - Details Tab | TC-DNA-217 | Incoterm and Named Place are hidden | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the Taxes and Charges section | - | Incoterm and Named Place are not visible to the user | Low | UI | - |
| 273 | 2. Add Delivery Note - Details Tab | TC-DNA-218 | Sales Taxes and Charges table displays the default columns | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the Sales Taxes and Charges table | - | The table shows: Checkbox, No., Type, Account Head, Tax Rate, Net Amount, Amount, Total | Medium | UI | - |
| 274 | 2. Add Delivery Note - Details Tab | TC-DNA-219 | Add Row adds a new tax row | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Add Row in the Sales Taxes and Charges table | - | A new empty row is added | High | Positive | - |
| 275 | 2. Add Delivery Note - Details Tab | TC-DNA-220 | Type dropdown lists the allowed values | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the Type dropdown | - | The dropdown contains: Actual, On Net Total, On Previous Row Amount, On Previous Row Total, On Item Quantity | High | Positive | - |
| 276 | 2. Add Delivery Note - Details Tab | TC-DNA-221 | Leave Type empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add a tax row
2. Leave Type empty
3. Click Save | - | An error message is displayed because Type is mandatory | High | Negative | - |
| 277 | 2. Add Delivery Note - Details Tab | TC-DNA-222 | Account Head is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Account Head and type part of an account name | VAT | The list is filtered while typing and shows matching accounts | High | Positive | - |
| 278 | 2. Add Delivery Note - Details Tab | TC-DNA-223 | Leave Account Head empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add a tax row
2. Leave Account Head empty
3. Click Save | - | An error message is displayed because Account Head is mandatory | High | Negative | - |
| 279 | 2. Add Delivery Note - Details Tab | TC-DNA-224 | Tax Rate accepts a valid number | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter a tax rate | 14 | The value is accepted | High | Positive | - |
| 280 | 2. Add Delivery Note - Details Tab | TC-DNA-225 | Tax Rate rejects letters | Inventory > Delivery Note > Add Delivery Note > Details tab | Type letters in Tax Rate | abc | Only numbers are accepted | Medium | Negative | - |
| 281 | 2. Add Delivery Note - Details Tab | TC-DNA-226 | Tax Rate at the maximum length (100 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter exactly 100 digits in Tax Rate | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 282 | 2. Add Delivery Note - Details Tab | TC-DNA-227 | Tax Rate longer than 100 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to enter 101 digits | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 283 | 2. Add Delivery Note - Details Tab | TC-DNA-228 | Leave Tax Rate empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add a tax row with Type and Account Head only
2. Click Save | - | The row is saved (field is optional) | Medium | Positive | - |
| 284 | 2. Add Delivery Note - Details Tab | TC-DNA-229 | Tax On Net Total is calculated | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Net total 500
2. Tax Type On Net Total; Rate 14 | 500 x 14% | Tax Amount shows 70 and Total shows 570 | High | Positive | - |
| 285 | 2. Add Delivery Note - Details Tab | TC-DNA-230 | Tax Actual is a fixed amount | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Net total 500
2. Tax Type Actual; Amount 25 | Actual 25 | Tax Amount shows 25 and Total shows 525 | High | Positive | - |
| 286 | 2. Add Delivery Note - Details Tab | TC-DNA-231 | Tax On Item Quantity is calculated | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Total Qty 10
2. Tax Type On Item Quantity; Rate 2 | 10 x 2 | Tax Amount shows 20 | Medium | Positive | - |
| 287 | 2. Add Delivery Note - Details Tab | TC-DNA-232 | Tax On Previous Row Amount is calculated | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Row 1 tax 70
2. Row 2: On Previous Row Amount; Rate 10 | 70 x 10% | Row 2 Tax Amount shows 7 | Medium | Positive | - |
| 288 | 2. Add Delivery Note - Details Tab | TC-DNA-233 | Tax On Previous Row Total is calculated | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Row 1 total 570
2. Row 2: On Previous Row Total; Rate 10 | 570 x 10% | Row 2 Tax Amount shows 57 | Medium | Positive | - |
| 289 | 2. Add Delivery Note - Details Tab | TC-DNA-234 | Net Amount, Amount and Total (Currency) labels | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the tax row calculated columns | - | Net Amount, Amount and Total are displayed as labels and calculated automatically | Medium | UI | - |
| 290 | 2. Add Delivery Note - Details Tab | TC-DNA-235 | Tax amounts in the company base currency | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a foreign currency
2. Add a tax row | - | The EGP columns show the converted values | Medium | Positive | - |
| 291 | 2. Add Delivery Note - Details Tab | TC-DNA-236 | Taxes table: action bar appears when a row is selected | Inventory > Delivery Note > Add Delivery Note > Details tab | Select the checkbox of a tax row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 292 | 2. Add Delivery Note - Details Tab | TC-DNA-237 | Taxes table: delete a tax row | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a tax row
2. Click Delete row | - | The row is deleted and the totals are recalculated | High | Positive | - |
| 293 | 2. Add Delivery Note - Details Tab | TC-DNA-238 | Taxes table: open the Edit Row popup | Inventory > Delivery Note > Add Delivery Note > Details tab | Click the Edit Row icon of a tax row | - | A popup is displayed with the tax row fields | High | Positive | - |
| 294 | 2. Add Delivery Note - Details Tab | TC-DNA-239 | Taxes Edit Row: Reference Row is hidden for a single tax | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add one tax row with Type On Previous Row Amount | 1 row | Reference Row is not displayed | Medium | UI | - |
| 295 | 2. Add Delivery Note - Details Tab | TC-DNA-240 | Taxes Edit Row: Reference Row is displayed for the second tax | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add two tax rows
2. Set the second Type to On Previous Row Amount | 2 rows | Reference Row is displayed and filled with the previous row number | High | Positive | - |
| 296 | 2. Add Delivery Note - Details Tab | TC-DNA-241 | Taxes Edit Row: Reference Row for other types | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add two rows
2. Set the second Type to On Net Total | On Net Total | Reference Row is not displayed | Medium | UI | - |
| 297 | 2. Add Delivery Note - Details Tab | TC-DNA-242 | Taxes Edit Row: Type and Account Head are mandatory | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Edit Row
2. Clear Type and Account Head
3. Click Update | - | Error messages are displayed because both fields are mandatory | Medium | Negative | - |
| 298 | 2. Add Delivery Note - Details Tab | TC-DNA-243 | Taxes Edit Row: Description (Tax Edit Row) accepts valid text | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter valid text in Description (Tax Edit Row) | Deliver before noon | The value is accepted | Medium | Positive | - |
| 299 | 2. Add Delivery Note - Details Tab | TC-DNA-244 | Taxes Edit Row: Leave Description (Tax Edit Row) empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Leave Description (Tax Edit Row) empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 300 | 2. Add Delivery Note - Details Tab | TC-DNA-245 | Taxes Edit Row: Description (Tax Edit Row) shorter than the minimum length (2 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter 2 characters in Description (Tax Edit Row)
2. Click Save | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 301 | 2. Add Delivery Note - Details Tab | TC-DNA-246 | Taxes Edit Row: Description (Tax Edit Row) at the minimum length (3 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter 3 characters in Description (Tax Edit Row) | abc | The value is accepted | Medium | Positive | - |
| 302 | 2. Add Delivery Note - Details Tab | TC-DNA-247 | Taxes Edit Row: Description (Tax Edit Row) at the maximum length (500 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter exactly 500 characters in Description (Tax Edit Row) | 500-character text | The value is accepted | Medium | Positive | - |
| 303 | 2. Add Delivery Note - Details Tab | TC-DNA-248 | Taxes Edit Row: Description (Tax Edit Row) longer than 500 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to enter or paste 501 characters in Description (Tax Edit Row) | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 304 | 2. Add Delivery Note - Details Tab | TC-DNA-249 | Taxes Edit Row: Description (Tax Edit Row) accepts letters, numbers and special characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter a mix of letters, numbers and special characters in Description (Tax Edit Row) | Gate #3 - floor 2 (A/B) | The value is accepted | Medium | Positive | - |
| 305 | 2. Add Delivery Note - Details Tab | TC-DNA-250 | Taxes Edit Row: Description (Tax Edit Row) rejects invalid data | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter invalid content such as script tags in Description (Tax Edit Row)
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 306 | 2. Add Delivery Note - Details Tab | TC-DNA-251 | Taxes Edit Row: Is this Tax included in Basic Rate checkbox | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check the checkbox | - | The tax is treated as included in the Print Rate / Print Amount | Medium | Positive | - |
| 307 | 2. Add Delivery Note - Details Tab | TC-DNA-252 | Taxes Edit Row: Considered In Paid Amount checkbox | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Check the checkbox | - | The tax is treated as included in the paid amount | Low | Positive | - |
| 308 | 2. Add Delivery Note - Details Tab | TC-DNA-253 | Taxes Edit Row: Set by Item Tax Template is read-only | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a tax added by an item tax template | - | The checkbox is displayed checked and cannot be edited | Low | UI | - |
| 309 | 2. Add Delivery Note - Details Tab | TC-DNA-254 | Taxes Edit Row: Is Tax Withholding Account is read-only | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row of a withholding account tax | - | The checkbox is displayed checked and cannot be edited | Low | UI | - |
| 310 | 2. Add Delivery Note - Details Tab | TC-DNA-255 | Taxes Edit Row: Cost Center and Project | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a Cost Center and a Project | Main - STC; Warehouse Expansion | Both values are accepted (optional) | Medium | Positive | - |
| 311 | 2. Add Delivery Note - Details Tab | TC-DNA-256 | Taxes Edit Row: Tax Rate accepts numbers only | Inventory > Delivery Note > Add Delivery Note > Details tab | Type letters in Tax Rate | abc | Letters are not accepted | Medium | Negative | - |
| 312 | 2. Add Delivery Note - Details Tab | TC-DNA-257 | Taxes Edit Row: Account Currency and calculated labels | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row | - | Account Currency, Net Amount, Amount, Total, Tax Amount After Discount Amount (currency and company currency) are displayed as labels | Medium | UI | - |
| 313 | 2. Add Delivery Note - Details Tab | TC-DNA-258 | Taxes Edit Row: Don't Recompute Tax is read-only | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Edit Row and try to change Don't Recompute Tax | - | The checkbox cannot be changed | Low | UI | - |
| 314 | 2. Add Delivery Note - Details Tab | TC-DNA-259 | Taxes Edit Row: save changes with Update | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Edit Row
2. Change Account Head and Tax Rate
3. Click Update | VAT - STC; 14 | The popup closes and the totals are recalculated | High | Positive | - |
| 315 | 2. Add Delivery Note - Details Tab | TC-DNA-260 | Sales Taxes and Charges: Open the table Settings popup | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Setting on the Sales Taxes and Charges table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 316 | 2. Add Delivery Note - Details Tab | TC-DNA-261 | Sales Taxes and Charges: Reorder columns using drag and drop | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Setting
2. Drag the Account Head column header and drop it before Type | - | The column order changes to the new position | Medium | Positive | - |
| 317 | 2. Add Delivery Note - Details Tab | TC-DNA-262 | Sales Taxes and Charges: Column width default value is 3 | Inventory > Delivery Note > Add Delivery Note > Details tab | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 318 | 2. Add Delivery Note - Details Tab | TC-DNA-263 | Sales Taxes and Charges: Column width accepts numbers only | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 319 | 2. Add Delivery Note - Details Tab | TC-DNA-264 | Sales Taxes and Charges: Column width left empty | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 320 | 2. Add Delivery Note - Details Tab | TC-DNA-265 | Sales Taxes and Charges: Column width with 1 character | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 321 | 2. Add Delivery Note - Details Tab | TC-DNA-266 | Sales Taxes and Charges: Column width longer than 3 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 322 | 2. Add Delivery Note - Details Tab | TC-DNA-267 | Sales Taxes and Charges: Add / Remove Columns popup lists all columns | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Add / Remove columns | - | A popup lists all available columns with checkboxes (e.g., Type, Account Head, Tax Rate, Net Amount (USD), Amount (USD), Total (USD)) | Medium | UI | Needs Clarification: Column names in the SRS contain currency codes (USD / EGP). Confirm they follow the document currency. |
| 323 | 2. Add Delivery Note - Details Tab | TC-DNA-268 | Sales Taxes and Charges: Hide a column | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Open Add / Remove columns
2. Clear the Tax Rate checkbox
3. Click Update | Column: Tax Rate | The Tax Rate column is hidden from the table | Medium | Positive | - |
| 324 | 2. Add Delivery Note - Details Tab | TC-DNA-269 | Sales Taxes and Charges: Show a hidden column | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Hide the Tax Rate column
2. Open Add / Remove columns
3. Select the Tax Rate checkbox
4. Click Update | Column: Tax Rate | The Tax Rate column is displayed again | Medium | Positive | - |
| 325 | 2. Add Delivery Note - Details Tab | TC-DNA-270 | Sales Taxes and Charges: Save the Settings using Update | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 326 | 2. Add Delivery Note - Details Tab | TC-DNA-271 | Sales Taxes and Charges: Reset Settings to default | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 327 | 2. Add Delivery Note - Details Tab | TC-DNA-272 | Total Taxes and Charges (Company base currency) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add tax rows | - | The total taxes are calculated in the company base currency | Medium | Positive | - |
| 328 | 2. Add Delivery Note - Details Tab | TC-DNA-273 | Total Taxes and Charges (Currency) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Add tax rows | - | The total taxes are calculated in the document currency | Medium | Positive | - |
| 329 | 2. Add Delivery Note - Details Tab | TC-DNA-274 | Grand Total (Currency) = Net Total + Taxes | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Net total 500
2. Tax 70 | 500 + 70 | Grand Total shows 570 | High | Positive | - |
| 330 | 2. Add Delivery Note - Details Tab | TC-DNA-275 | Rounding Adjustment and Rounded Total (Currency) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Grand total 570.40 | 570.40 | Rounding Adjustment shows -0.40 and Rounded Total shows 570 | Medium | Positive | - |
| 331 | 2. Add Delivery Note - Details Tab | TC-DNA-276 | Grand Total, Rounding Adjustment and Rounded Total (Company base currency) | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a foreign currency
2. Add items | - | The three values are calculated in the company base currency | Medium | Positive | - |
| 332 | 2. Add Delivery Note - Details Tab | TC-DNA-277 | Rounding can be disabled | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Disable rounding in System Settings | - | Rounding Adjustment shows 0 and Rounded Total equals Grand Total | Low | Positive | Needs Clarification: Not covered in the SRS. |
| 333 | 2. Add Delivery Note - Details Tab | TC-DNA-278 | Apply Additional Discount On dropdown lists the allowed values | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the dropdown | - | The dropdown contains: Grand Total, Net Total | Medium | Positive | - |
| 334 | 2. Add Delivery Note - Details Tab | TC-DNA-279 | Additional Discount Percentage on Net Total | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select Apply On = Net Total
2. Enter Additional Discount Percentage 10 | Net total 500; 10% | Additional Discount Amount shows 50 and the totals are recalculated | High | Positive | - |
| 335 | 2. Add Delivery Note - Details Tab | TC-DNA-280 | Additional Discount Percentage on Grand Total | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select Apply On = Grand Total
2. Enter Additional Discount Percentage 10 | Grand total 570; 10% | Additional Discount Amount shows 57 and the totals are recalculated | High | Positive | - |
| 336 | 2. Add Delivery Note - Details Tab | TC-DNA-281 | Additional Discount Percentage rejects letters | Inventory > Delivery Note > Add Delivery Note > Details tab | Type letters in Additional Discount Percentage | abc | Letters are not accepted | Medium | Negative | - |
| 337 | 2. Add Delivery Note - Details Tab | TC-DNA-282 | Additional Discount Percentage greater than 100 | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter 150 in Additional Discount Percentage
2. Click Save | 150 | A validation error is displayed | Medium | Negative | Needs Clarification: SRS does not define the 0-100 range. |
| 338 | 2. Add Delivery Note - Details Tab | TC-DNA-283 | Additional Discount Percentage at the maximum length (100 characters) | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter exactly 100 digits | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 339 | 2. Add Delivery Note - Details Tab | TC-DNA-284 | Additional Discount Percentage longer than 100 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Try to enter 101 digits | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 340 | 2. Add Delivery Note - Details Tab | TC-DNA-285 | Additional Discount Amount (Currency) accepts a valid number | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter an amount | 50 | The value is accepted and the percentage is recalculated | High | Positive | - |
| 341 | 2. Add Delivery Note - Details Tab | TC-DNA-286 | Additional Discount Amount rejects letters | Inventory > Delivery Note > Add Delivery Note > Details tab | Type letters in Additional Discount Amount | abc | Letters are not accepted | Medium | Negative | - |
| 342 | 2. Add Delivery Note - Details Tab | TC-DNA-287 | Additional Discount Amount greater than the total | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter an amount greater than the net total
2. Click Save | Amount 1000; Net 500 | A validation error is displayed | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 343 | 2. Add Delivery Note - Details Tab | TC-DNA-288 | Additional Discount Amount (Company base currency) is a read-only label | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter an additional discount in a foreign currency | 50 USD | The company-currency amount is calculated and cannot be edited | Medium | UI | - |
| 344 | 2. Add Delivery Note - Details Tab | TC-DNA-289 | Additional Discount is distributed across the items | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Apply a 10% additional discount on a note with two items | - | Each item receives its share in Distributed Discount Amount | Medium | Positive | - |
| 345 | 2. Add Delivery Note - Details Tab | TC-DNA-290 | Additional Discount with percentage and amount both entered | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Enter both the percentage and the amount | 10% and 20 | The last edited field wins and the other one is recalculated | Medium | Positive | Needs Clarification: Not defined in the SRS. |
| 346 | 2. Add Delivery Note - Details Tab | TC-DNA-291 | Update Item Location is displayed only for Draft notes | Inventory > Delivery Note > Add Delivery Note > Details tab | Open a Draft note and a To Pick note | - | Update Item Location is displayed only on the Draft note | High | Positive | - |
| 347 | 2. Add Delivery Note - Details Tab | TC-DNA-292 | Update Item Location moves quantity to a warehouse with enough stock | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select an item whose warehouse lacks the quantity
2. Click Update Item Location | Stores - E: 2; Stores - W: 10; Qty 6 | The warehouse is changed to one that can fulfill the quantity based on the nearest expiry date | High | Positive | - |
| 348 | 2. Add Delivery Note - Details Tab | TC-DNA-293 | Update Item Location splits the quantity across warehouses | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select an item whose quantity is spread over two warehouses
2. Click Update Item Location | Qty 6; 4 + 2 | The row is split to fulfill the quantity | Medium | Positive | Needs Clarification: SRS does not say whether rows are split. |
| 349 | 2. Add Delivery Note - Details Tab | TC-DNA-294 | Update Item Location when no warehouse has enough stock | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Set a quantity higher than total stock
2. Click Update Item Location | Qty 100; stock 10 | A clear message is displayed | Medium | Negative | - |
| 350 | 2. Add Delivery Note - Details Tab | TC-DNA-295 | Get Items From Sales Order button is displayed | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the page actions | - | The Get Items From Sales Order button is displayed | High | UI | - |
| 351 | 2. Add Delivery Note - Details Tab | TC-DNA-296 | Open the Get Items From Sales Order popup | Inventory > Delivery Note > Add Delivery Note > Details tab | Click Get Items From Sales Order | - | A popup is displayed with Search (Name), Customer, Delivery Date, the Sales Order list and Get Items | High | Positive | - |
| 352 | 2. Add Delivery Note - Details Tab | TC-DNA-297 | Popup excludes Hold and Closed Sales Orders | Inventory > Delivery Note > Add Delivery Note > Details tab | Open the popup | SO-0001 (To Deliver); SO-0002 (Hold); SO-0003 (Closed) | Only SO-0001 is listed | High | Positive | - |
| 353 | 2. Add Delivery Note - Details Tab | TC-DNA-298 | Search Sales Orders by full name | Inventory > Delivery Note > Add Delivery Note > Details tab | Type a full Sales Order name in Search | SO-0001 | Only the matching Sales Order is displayed | Medium | Positive | - |
| 354 | 2. Add Delivery Note - Details Tab | TC-DNA-299 | Search Sales Orders by part of the name | Inventory > Delivery Note > Add Delivery Note > Details tab | Type part of a name in Search | 0001 | All Sales Orders containing the text are displayed | Medium | Positive | - |
| 355 | 2. Add Delivery Note - Details Tab | TC-DNA-300 | Search maximum length is 100 characters | Inventory > Delivery Note > Add Delivery Note > Details tab | Enter 101 characters in Search | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 356 | 2. Add Delivery Note - Details Tab | TC-DNA-301 | Search Sales Orders with no match | Inventory > Delivery Note > Add Delivery Note > Details tab | Type a non-existing name | ZZZ-9999 | No Sales Orders are displayed | Low | Negative | - |
| 357 | 2. Add Delivery Note - Details Tab | TC-DNA-302 | Filter Sales Orders by Customer | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a Customer in the popup | Al Noor Stores | Only Sales Orders of the selected Customer are displayed | Medium | Positive | - |
| 358 | 2. Add Delivery Note - Details Tab | TC-DNA-303 | Filter Sales Orders by Delivery Date | Inventory > Delivery Note > Add Delivery Note > Details tab | Select a Delivery Date in the popup | 2026-11-01 | Only Sales Orders with the selected Delivery Date are displayed | Medium | Positive | - |
| 359 | 2. Add Delivery Note - Details Tab | TC-DNA-304 | Sales Order list columns in the popup | Inventory > Delivery Note > Add Delivery Note > Details tab | Review the list in the popup | - | The list shows: Checkbox, No., Name, Customer, Delivery Date | Medium | UI | - |
| 360 | 2. Add Delivery Note - Details Tab | TC-DNA-305 | Sales Order name opens Sales Order Details | Inventory > Delivery Note > Add Delivery Note > Details tab | Click a Sales Order name in the popup | SO-0001 | The user is redirected to the Sales Order Details screen | Medium | Positive | - |
| 361 | 2. Add Delivery Note - Details Tab | TC-DNA-306 | Get Items adds the Sales Order items to the table | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select one Sales Order
2. Click Get Items | SO-0001 | The Sales Order items are added to the Delivery Note Items table | High | Positive | - |
| 362 | 2. Add Delivery Note - Details Tab | TC-DNA-307 | Get Items with multiple Sales Orders | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select two Sales Orders
2. Click Get Items | SO-0001, SO-0002 | The items of both Sales Orders are added to the table | Medium | Positive | - |
| 363 | 2. Add Delivery Note - Details Tab | TC-DNA-308 | Get Items from a Sales Order of a different Customer | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Select a Customer on the note
2. Get items from a Sales Order of another customer | Customer mismatch | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define customer mismatch handling. |
| 364 | 2. Add Delivery Note - Details Tab | TC-DNA-309 | Get Items without selecting a Sales Order | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Do not select any Sales Order
2. Click Get Items | - | A message is displayed asking the user to select a Sales Order; nothing is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 365 | 2. Add Delivery Note - Details Tab | TC-DNA-310 | Get Items already delivered quantities | Inventory > Delivery Note > Add Delivery Note > Details tab | 1. Deliver part of a Sales Order
2. Get its items again | SO-0001: delivered 4 of 6 | Only the remaining quantity (2) is fetched | High | Positive | Needs Clarification: Not defined in the SRS. |
| 366 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-001 | Save a Delivery Note with valid data | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Select a Customer and a Series
2. Add an item row with Warehouse and Qty
3. Click Save | Customer: Al Noor Stores; Series: MAT-DN-.YYYY.-; Item: Coffee Mug; Warehouse: Stores - E; Qty: 6 | The note is saved with status Draft and the Save button changes to Submit For Picking | High | Positive | - |
| 367 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-002 | Save with all mandatory fields empty | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Leave the form empty
2. Click Save | - | A validation error message is displayed for each mandatory field (Customer, Series, Item, Warehouse, Qty) | High | Negative | - |
| 368 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-003 | Picking fields stay disabled after the first Save | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Save a valid note
2. Review the picking fields | - | Pick Manually, Scan Barcode, Scan Mode, Prompt Quantity and Picked Qty remain disabled | High | Positive | - |
| 369 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-004 | Save a note with no item rows | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Fill the header
2. Do not add rows
3. Click Save | No rows | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one item is required. |
| 370 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-005 | Submit For Picking | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Save a valid note
2. Click Submit For Picking | Draft note | The status changes from Draft to To Pick and the button changes back to Save | High | Positive | - |
| 371 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-006 | Picking fields are enabled after Submit For Picking | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Submit the note for picking
2. Review the picking fields | - | Pick Manually, Scan Barcode, Scan Mode, Prompt Quantity and Picked Qty are enabled | High | Positive | - |
| 372 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-007 | Submit For Picking is not available before the first Save | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | Review the buttons on a new unsaved note | - | Only Save is displayed | Medium | Negative | - |
| 373 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-008 | Save with Picked Qty equal to Qty | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Submit for picking
2. Enter Picked Qty = Qty
3. Click Save | Qty 6; Picked 6 | The status changes to Picked and the Save button changes to Finish Picking | High | Positive | - |
| 374 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-009 | Save with Picked Qty smaller than Qty | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Submit for picking
2. Enter Picked Qty smaller than Qty
3. Click Save | Qty 6; Picked 3 | The status changes to Partially Picked and the Save button remains | High | Positive | Needs Clarification: SRS text says 'smaller than equal'. Assumed to mean smaller than. |
| 375 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-010 | Complete a Partially Picked note | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a Partially Picked note
2. Enter Picked Qty = Qty
3. Click Save | Qty 6; Picked 3 > 6 | The status changes to Picked | High | Positive | - |
| 376 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-011 | Save with no Picked Qty after Submit For Picking | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Submit for picking
2. Leave Picked Qty empty
3. Click Save | - | To be confirmed with the BA (stays To Pick or shows an error) | Medium | Negative | Needs Clarification: SRS describes the comparison only when a picked quantity exists. |
| 377 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-012 | Save with invalid data during picking | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Submit for picking
2. Enter invalid data in a field
3. Click Save | Picked Qty: abc | A validation error message is displayed for each invalid field | High | Negative | - |
| 378 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-013 | Field validation shows errors immediately | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Enter an invalid value in a field and leave it | Qty: abc | The error message is displayed immediately | Medium | Negative | - |
| 379 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-014 | Finish Picking button appears only for Picked notes | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | Open notes in To Pick, Partially Picked and Picked | 3 notes | Finish Picking is displayed only for the Picked note | High | Positive | - |
| 380 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-015 | Finish Picking | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a Picked note
2. Click Finish Picking | Status: Picked | The status changes to To Deliver and the button changes to Deliver | High | Positive | - |
| 381 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-016 | Deliver button appears only after Finish Picking | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | Open notes in Picked and To Deliver | 2 notes | Deliver is displayed only after Finish Picking (status To Deliver) | High | Positive | - |
| 382 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-017 | Deliver a note that is not linked to a Sales Invoice | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a To Deliver note without an invoice
2. Click Deliver | No invoice | The note is submitted, the status changes to To Bill and the delivery process starts | High | Positive | - |
| 383 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-018 | Deliver a note linked to a submitted Sales Invoice | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a To Deliver note linked to a submitted Sales Invoice
2. Click Deliver | Invoice SINV-0001 (submitted) | The status changes from To Deliver to Completed | High | Positive | - |
| 384 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-019 | Deliver a note linked to a Draft Sales Invoice | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a To Deliver note linked to a Draft Sales Invoice
2. Click Deliver | Invoice draft | The status changes to To Bill | Medium | Positive | Needs Clarification: SRS covers only 'submitted invoice' and 'not linked'. |
| 385 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-020 | Delivery creates a Stock Ledger Entry | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Deliver a note
2. Open the Stock Ledger | Coffee Mug x6 | A Stock Ledger Entry is created for each delivered item | High | Positive | - |
| 386 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-021 | Delivery decreases the stock quantity | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Note the stock before
2. Deliver a note
3. Check the stock after | Stock 20 > 14 | The stock quantity of the warehouse is decreased by the delivered quantity | High | Positive | - |
| 387 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-022 | Delivery updates the BIN | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Deliver a note
2. Open the Bin of the item | Coffee Mug | The BIN actual quantity is updated | Medium | Positive | - |
| 388 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-023 | Delivery with insufficient stock | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Set a quantity higher than the stock
2. Try to deliver | Stock 4; Qty 10 | A validation error is displayed and the note is not delivered | High | Negative | - |
| 389 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-024 | Delivery updates the Sales Order delivered quantity | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Deliver a note created from a Sales Order
2. Open the Sales Order | SO-0001 | The delivered quantity and delivery percentage of the Sales Order are updated | High | Positive | - |
| 390 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-025 | Delivery releases the Stock Reservation Entry | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Reserve stock for a Sales Order
2. Deliver the Delivery Note | Reserved 6 | The reservation Delivered Qty is updated and its status becomes Delivered | High | Positive | Needs Clarification: Link with the Stock Reservation Entry module is not described in the Delivery Note SRS. |
| 391 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-026 | Cancel button appears for submitted statuses | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | Open notes in To Bill, Completed, Partially Billed, Return and Return Issued | 5 notes | The Cancel button is displayed on each of them | High | Positive | - |
| 392 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-027 | Cancel a submitted Delivery Note | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a To Bill note
2. Click Cancel | Status: To Bill | The status changes to Cancelled | High | Positive | - |
| 393 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-028 | Cancel creates a reversing Stock Ledger Entry | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Cancel a submitted note
2. Open the Stock Ledger | - | A reversing Stock Ledger Entry is created automatically | High | Positive | - |
| 394 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-029 | Cancel updates the BIN | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Cancel a submitted note
2. Open the Bin | - | The BIN is updated | Medium | Positive | - |
| 395 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-030 | Cancel restores the stock quantity | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Note the stock
2. Cancel a submitted note
3. Check the stock | Stock 14 > 20 | The stock quantity is restored | High | Positive | Needs Clarification: SRS says the stock quantity is 'decreased' on cancel, which looks inverted. |
| 396 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-031 | Cancel a note that has a submitted Sales Invoice | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a Completed note linked to a submitted invoice
2. Click Cancel | Completed note | The cancellation is blocked until the invoice is cancelled, with a message | High | Negative | Needs Clarification: Not defined in the SRS. |
| 397 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-032 | Cancel button is hidden for non-submitted notes and Close is displayed | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | Open a Draft / To Pick note | Status: To Pick | The Cancel button is hidden and only the Close button is displayed | High | Positive | - |
| 398 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-033 | Close a non-submitted note | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a To Pick note
2. Click Close | Status: To Pick | The status changes to Closed | High | Positive | - |
| 399 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-034 | Close a Picked note | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a Picked note
2. Click Close | Status: Picked | The status changes to Closed | Medium | Positive | Needs Clarification: SRS says Close appears when the note is not submitted; it does not exclude the picking statuses. |
| 400 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-035 | Closed note cannot be delivered or edited | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Close a note
2. Try to deliver or edit it | Status: Closed | No Deliver / edit action is available | Medium | Negative | - |
| 401 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-036 | Reopen a Closed note | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a Closed note
2. Look for a reopen action | Status: Closed | To be confirmed with the BA (no reopen action is defined) | Low | Negative | Needs Clarification: SRS does not define re-opening. |
| 402 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-037 | Amend a Cancelled note | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open a Cancelled note
2. Click Amend | Status: Cancelled | A new Draft note is created with Amended From pointing to the cancelled note | High | Positive | Needs Clarification: The Amended From field exists but no Amend button is described in the SRS. |
| 403 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-038 | Amended From is displayed for an amended note | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | Open a note created through Amend | DN-0001-1 | The Amended From label shows the original note | Medium | Positive | - |
| 404 | 3. Add Delivery Note - Picking & Delivery Workflow | TC-DNW-039 | Amended From link opens the original note | Inventory > Delivery Note > Add Delivery Note; a Delivery Note with valid items | 1. Open an amended note
2. Click Amended From | - | The user is redirected to the original (cancelled) note | Medium | Positive | - |
| 405 | 4. Add Delivery Note - General Info Tab | TC-DNG-001 | Open the General Info tab | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Open the Add Delivery Note screen
2. Click the General Info tab | - | The General Info tab is displayed with the Billing Address, Shipping Address, Company Address and Terms sections | High | Positive | - |
| 406 | 4. Add Delivery Note - General Info Tab | TC-DNG-002 | Customer Address Name is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > General Info tab | Click Customer Address Name and type part of an address name | Al Noor | The list is filtered while typing and shows matching addresses | High | Positive | - |
| 407 | 4. Add Delivery Note - General Info Tab | TC-DNG-003 | Customer Address Name lists only the customer's addresses | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a Customer
2. Open Customer Address Name | Al Noor Stores | Only addresses linked to the selected customer are listed | High | Positive | - |
| 408 | 4. Add Delivery Note - General Info Tab | TC-DNG-004 | Billing address is fetched from the Preferred Billing Address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer that has a Preferred Billing Address, a Primary Address and other addresses | Preferred: Al Noor Stores-Billing | The Preferred Billing Address is filled automatically | High | Positive | - |
| 409 | 4. Add Delivery Note - General Info Tab | TC-DNG-005 | Billing address falls back to the Primary Address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with no Preferred Billing Address but a Primary Address | Primary: Al Noor Stores-Main | The Primary Address is filled | High | Positive | - |
| 410 | 4. Add Delivery Note - General Info Tab | TC-DNG-006 | Billing address falls back to the latest created address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with no Preferred and no Primary Address | Latest: Al Noor Stores-Branch | The latest created address is filled | High | Positive | - |
| 411 | 4. Add Delivery Note - General Info Tab | TC-DNG-007 | Billing address when the customer has no address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with no addresses | Customer: Nile Mart | The field stays empty without errors | Medium | Positive | - |
| 412 | 4. Add Delivery Note - General Info Tab | TC-DNG-008 | Overwrite the automatic billing address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer
2. Choose another address | Al Noor Stores-Branch | The chosen address replaces the automatic one | High | Positive | - |
| 413 | 4. Add Delivery Note - General Info Tab | TC-DNG-009 | Leave Customer Address Name empty | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Clear Customer Address Name
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 414 | 4. Add Delivery Note - General Info Tab | TC-DNG-010 | Address label shows description, city, state and country | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a billing address | Al Noor Stores-Billing | The read-only Address label shows Address Description, City / Town, State and Country | High | Positive | - |
| 415 | 4. Add Delivery Note - General Info Tab | TC-DNG-011 | Address label is read-only | Inventory > Delivery Note > Add Delivery Note > General Info tab | Try to edit the Address label | - | The label cannot be edited | Medium | UI | - |
| 416 | 4. Add Delivery Note - General Info Tab | TC-DNG-012 | Address label updates when the address changes | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select address A
2. Select address B | Two addresses | The label shows the details of address B | Medium | Positive | - |
| 417 | 4. Add Delivery Note - General Info Tab | TC-DNG-013 | Contact Person is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > General Info tab | Click Contact Person and type part of a name | Hala | The list is filtered while typing and shows matching contacts | High | Positive | - |
| 418 | 4. Add Delivery Note - General Info Tab | TC-DNG-014 | Contact Person lists only Customer or Lead contacts | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a Customer
2. Open Contact Person | Al Noor Stores | Only contacts that belong to the Customer (or Lead) are listed | High | Positive | - |
| 419 | 4. Add Delivery Note - General Info Tab | TC-DNG-015 | Contact Person is fetched from the Preferred Billing Contact | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with a Preferred Billing Contact | Preferred: Hala Mostafa | The Preferred Billing Contact is filled automatically | High | Positive | - |
| 420 | 4. Add Delivery Note - General Info Tab | TC-DNG-016 | Contact Person falls back to the Primary Contact | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with no Preferred Billing Contact but a Primary Contact | Primary: Omar Fathy | The Primary Contact is filled | High | Positive | - |
| 421 | 4. Add Delivery Note - General Info Tab | TC-DNG-017 | Contact Person falls back to the latest created contact | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with no Preferred and no Primary Contact | Latest contact | The latest created contact is filled | High | Positive | - |
| 422 | 4. Add Delivery Note - General Info Tab | TC-DNG-018 | Overwrite the automatic contact | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer
2. Choose another contact | Omar Fathy | The chosen contact replaces the automatic one | Medium | Positive | - |
| 423 | 4. Add Delivery Note - General Info Tab | TC-DNG-019 | Leave Contact Person empty | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Clear Contact Person
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 424 | 4. Add Delivery Note - General Info Tab | TC-DNG-020 | Contact Details label shows all numbers and emails | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a contact with 2 phones and 2 emails | Hala Mostafa | All phone numbers and email addresses of the contact are displayed | High | Positive | - |
| 425 | 4. Add Delivery Note - General Info Tab | TC-DNG-021 | Contact Details clearly mark the primary phone and primary email | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a contact with several phones and emails | Primary phone / primary email | The UI clearly shows which number is the primary phone and which email is the primary email | High | UI | - |
| 426 | 4. Add Delivery Note - General Info Tab | TC-DNG-022 | Contact Details is read-only | Inventory > Delivery Note > Add Delivery Note > General Info tab | Try to edit Contact Details | - | The label cannot be edited | Medium | UI | - |
| 427 | 4. Add Delivery Note - General Info Tab | TC-DNG-023 | Shipping Address is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > General Info tab | Click Shipping Address and type part of an address name | Al Noor | The list is filtered while typing and shows matching addresses | High | Positive | - |
| 428 | 4. Add Delivery Note - General Info Tab | TC-DNG-024 | Shipping Address lists only the customer's addresses | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a Customer
2. Open Shipping Address | Al Noor Stores | Only addresses linked to the selected customer are listed | High | Positive | - |
| 429 | 4. Add Delivery Note - General Info Tab | TC-DNG-025 | Shipping address is fetched from the Preferred Shipping Address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with a Preferred Shipping Address | Preferred: Al Noor Stores-Shipping | The Preferred Shipping Address is filled automatically | High | Positive | - |
| 430 | 4. Add Delivery Note - General Info Tab | TC-DNG-026 | Shipping address falls back to the Primary Address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with no Preferred Shipping Address but a Primary Address | Primary address | The Primary Address is filled | High | Positive | - |
| 431 | 4. Add Delivery Note - General Info Tab | TC-DNG-027 | Shipping address falls back to the latest created address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer with no Preferred and no Primary Address | Latest address | The latest created address is filled | Medium | Positive | - |
| 432 | 4. Add Delivery Note - General Info Tab | TC-DNG-028 | Overwrite the automatic shipping address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a customer
2. Choose another shipping address | Al Noor Stores-Branch | The chosen address replaces the automatic one | Medium | Positive | - |
| 433 | 4. Add Delivery Note - General Info Tab | TC-DNG-029 | Leave Shipping Address empty | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Clear Shipping Address
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 434 | 4. Add Delivery Note - General Info Tab | TC-DNG-030 | Shipping address label shows description, city, state and country | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a shipping address | Al Noor Stores-Shipping | The read-only label shows Address Description, City / Town, State and Country | High | Positive | - |
| 435 | 4. Add Delivery Note - General Info Tab | TC-DNG-031 | Shipping address label is read-only | Inventory > Delivery Note > Add Delivery Note > General Info tab | Try to edit the label | - | The label cannot be edited | Medium | UI | - |
| 436 | 4. Add Delivery Note - General Info Tab | TC-DNG-032 | Shipping address differs from the billing address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select different billing and shipping addresses
2. Click Save | Billing: Main; Shipping: Branch | Both addresses are saved independently | Medium | Positive | - |
| 437 | 4. Add Delivery Note - General Info Tab | TC-DNG-033 | Changing the Customer refreshes addresses and contacts | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select Customer A
2. Change to Customer B | Al Noor Stores > Nile Mart | Addresses and contacts are replaced with the defaults of Customer B | High | Positive | - |
| 438 | 4. Add Delivery Note - General Info Tab | TC-DNG-034 | Company Address Name is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > General Info tab | Click Company Address Name and type part of a name | Main | The list is filtered while typing and shows matching company addresses | High | Positive | - |
| 439 | 4. Add Delivery Note - General Info Tab | TC-DNG-035 | Company Address Name lists only the company addresses | Inventory > Delivery Note > Add Delivery Note > General Info tab | Open Company Address Name | - | Only addresses linked to the company are listed | High | Positive | - |
| 440 | 4. Add Delivery Note - General Info Tab | TC-DNG-036 | Company address is fetched from the primary address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Open the Add screen for a company with a primary address | Primary: Head Office | The company primary address is filled automatically | High | Positive | - |
| 441 | 4. Add Delivery Note - General Info Tab | TC-DNG-037 | Company address falls back to the latest created address | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Open the Add screen for a company without a primary address | Latest company address | The latest company address is filled | Medium | Positive | - |
| 442 | 4. Add Delivery Note - General Info Tab | TC-DNG-038 | Leave Company Address Name empty | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Clear Company Address Name
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 443 | 4. Add Delivery Note - General Info Tab | TC-DNG-039 | Company address label shows description, city, state and country | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a company address | Head Office | The read-only label shows Address Description, City / Town, State and Country | High | Positive | - |
| 444 | 4. Add Delivery Note - General Info Tab | TC-DNG-040 | Company Contact Person lists only company contacts marked 'Is Your Company Contact' | Inventory > Delivery Note > Add Delivery Note > General Info tab | Open Company Contact Person | Contact A (Is Your Company Contact); Contact B (not) | Only Contact A is listed | High | Positive | - |
| 445 | 4. Add Delivery Note - General Info Tab | TC-DNG-041 | Company Contact Person is fetched from the Preferred Billing Contact | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Open the Add screen for a company with a Preferred Billing Contact | Preferred contact | The Preferred Billing Contact is filled | Medium | Positive | - |
| 446 | 4. Add Delivery Note - General Info Tab | TC-DNG-042 | Company Contact Person falls back to the Primary Contact, then the latest contact | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Open the Add screen for a company with no preferred contact | Primary / latest | The Primary Contact is filled, otherwise the latest created contact | Medium | Positive | - |
| 447 | 4. Add Delivery Note - General Info Tab | TC-DNG-043 | Company Contact Details label | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a company contact | - | All numbers and emails are displayed, with the primary phone and email clearly marked | Medium | UI | - |
| 448 | 4. Add Delivery Note - General Info Tab | TC-DNG-044 | Terms is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > General Info tab | Click Terms and type part of a name | Standard | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 449 | 4. Add Delivery Note - General Info Tab | TC-DNG-045 | Selecting Terms fills the Terms and Condition Content | Inventory > Delivery Note > Add Delivery Note > General Info tab | Select a terms template | Standard Terms | Terms and Condition Content is filled with the template text | High | Positive | - |
| 450 | 4. Add Delivery Note - General Info Tab | TC-DNG-046 | Leave Terms empty | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Leave Terms empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 451 | 4. Add Delivery Note - General Info Tab | TC-DNG-047 | Terms section is hidden on Details when no terms are entered | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Save a note without terms
2. Open Delivery Note Details | No terms | The terms and conditions section is not displayed | Medium | UI | - |
| 452 | 4. Add Delivery Note - General Info Tab | TC-DNG-048 | Terms section is displayed on Details when terms are entered | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Save a note with terms
2. Open Delivery Note Details | Standard Terms | The terms and conditions section is displayed | Medium | Positive | - |
| 453 | 4. Add Delivery Note - General Info Tab | TC-DNG-049 | Terms and Condition Content accepts valid text | Inventory > Delivery Note > Add Delivery Note > General Info tab | Enter valid text | Payment within 30 days | The value is accepted | Medium | Positive | - |
| 454 | 4. Add Delivery Note - General Info Tab | TC-DNG-050 | Terms and Condition Content shorter than the minimum length (2 characters) | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Enter 2 characters
2. Click Save | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 455 | 4. Add Delivery Note - General Info Tab | TC-DNG-051 | Terms and Condition Content at the minimum length (3 characters) | Inventory > Delivery Note > Add Delivery Note > General Info tab | Enter 3 characters | abc | The value is accepted | Medium | Positive | - |
| 456 | 4. Add Delivery Note - General Info Tab | TC-DNG-052 | Terms and Condition Content at the maximum length (500 characters) | Inventory > Delivery Note > Add Delivery Note > General Info tab | Enter exactly 500 characters | 500-character text | The value is accepted | Medium | Positive | - |
| 457 | 4. Add Delivery Note - General Info Tab | TC-DNG-053 | Terms and Condition Content longer than 500 characters | Inventory > Delivery Note > Add Delivery Note > General Info tab | Try to enter 501 characters | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 458 | 4. Add Delivery Note - General Info Tab | TC-DNG-054 | Terms and Condition Content accepts letters, numbers and special characters | Inventory > Delivery Note > Add Delivery Note > General Info tab | Enter a mix of letters, numbers and special characters | Net 30 - 2% discount (A/B) | The value is accepted | Medium | Positive | - |
| 459 | 4. Add Delivery Note - General Info Tab | TC-DNG-055 | Terms and Condition Content rejects invalid data | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Enter script tags
2. Click Save | <script>x</script> | An error message is displayed | Medium | Negative | - |
| 460 | 4. Add Delivery Note - General Info Tab | TC-DNG-056 | Edit the content after selecting a Terms template | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Select a template
2. Edit the content | Standard Terms + edit | The edited text is accepted | Medium | Positive | - |
| 461 | 4. Add Delivery Note - General Info Tab | TC-DNG-057 | General Info data is saved with the note | Inventory > Delivery Note > Add Delivery Note > General Info tab | 1. Fill the General Info tab
2. Click Save
3. Reopen the note | - | All General Info values are saved and displayed correctly | High | Positive | - |
| 462 | 5. Add Delivery Note - More Info Tab | TC-DNM-001 | Open the More Info tab | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Open the Add Delivery Note screen
2. Click the More Info tab | - | The More Info tab is displayed with Status, Transporter Info, Customer PO Details, Print Settings and UTM Analytics | High | Positive | - |
| 463 | 5. Add Delivery Note - More Info Tab | TC-DNM-002 | Status is a read-only label | Inventory > Delivery Note > Add Delivery Note > More Info tab | Review Status on the More Info tab | - | Status shows the current status and cannot be edited | High | UI | - |
| 464 | 5. Add Delivery Note - More Info Tab | TC-DNM-003 | Status shows Draft for a new note | Inventory > Delivery Note > Add Delivery Note > More Info tab | Open a newly saved note | - | Status shows Draft | Medium | Positive | - |
| 465 | 5. Add Delivery Note - More Info Tab | TC-DNM-004 | Status updates through the workflow | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Move a note through To Pick, Picked, To Deliver and To Bill | - | Status shows each new value on the More Info tab | High | Positive | - |
| 466 | 5. Add Delivery Note - More Info Tab | TC-DNM-005 | Transporter is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > More Info tab | Click Transporter and type part of a supplier name | Aramex | The list is filtered while typing | High | Positive | - |
| 467 | 5. Add Delivery Note - More Info Tab | TC-DNM-006 | Transporter lists only suppliers marked as Transporter | Inventory > Delivery Note > Add Delivery Note > More Info tab | Open the Transporter dropdown | Aramex (Is Transporter); Delta Supplies (not) | Only Aramex is listed | High | Positive | - |
| 468 | 5. Add Delivery Note - More Info Tab | TC-DNM-007 | Select a Transporter | Inventory > Delivery Note > Add Delivery Note > More Info tab | Select a transporter | Aramex | The value is accepted | Medium | Positive | - |
| 469 | 5. Add Delivery Note - More Info Tab | TC-DNM-008 | Leave Transporter empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave Transporter empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 470 | 5. Add Delivery Note - More Info Tab | TC-DNM-009 | Transporter Receipt No accepts valid text | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter valid text in Transporter Receipt No | ABC-1234 | The value is accepted | Medium | Positive | - |
| 471 | 5. Add Delivery Note - More Info Tab | TC-DNM-010 | Leave Transporter Receipt No empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave Transporter Receipt No empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 472 | 5. Add Delivery Note - More Info Tab | TC-DNM-011 | Transporter Receipt No at the maximum length (100 characters) | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter exactly 100 characters in Transporter Receipt No | 100-character text | The value is accepted | Low | Positive | - |
| 473 | 5. Add Delivery Note - More Info Tab | TC-DNM-012 | Transporter Receipt No longer than 100 characters | Inventory > Delivery Note > Add Delivery Note > More Info tab | Try to enter 101 characters in Transporter Receipt No | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 474 | 5. Add Delivery Note - More Info Tab | TC-DNM-013 | Transporter Receipt No accepts letters, numbers and special characters | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter a mix in Transporter Receipt No | Ex-123/A (x) | The value is accepted | Medium | Positive | - |
| 475 | 5. Add Delivery Note - More Info Tab | TC-DNM-014 | Delivery Trip is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > More Info tab | Click Delivery Trip and type part of a name | DT-2026 | The list is filtered while typing | Medium | Positive | - |
| 476 | 5. Add Delivery Note - More Info Tab | TC-DNM-015 | Select a Delivery Trip | Inventory > Delivery Note > Add Delivery Note > More Info tab | Select a Delivery Trip | DT-2026-00001 | The value is accepted and the note is connected to the trip | Medium | Positive | - |
| 477 | 5. Add Delivery Note - More Info Tab | TC-DNM-016 | Leave Delivery Trip empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave Delivery Trip empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 478 | 5. Add Delivery Note - More Info Tab | TC-DNM-017 | Driver is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > More Info tab | Click Driver and type part of a name | Ahmed | The list is filtered while typing | Medium | Positive | - |
| 479 | 5. Add Delivery Note - More Info Tab | TC-DNM-018 | Select a Driver | Inventory > Delivery Note > Add Delivery Note > More Info tab | Select a driver | Ahmed Hassan | The value is accepted | Medium | Positive | - |
| 480 | 5. Add Delivery Note - More Info Tab | TC-DNM-019 | Leave Driver empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave Driver empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 481 | 5. Add Delivery Note - More Info Tab | TC-DNM-020 | Transporter Receipt Date default value is the current date | Inventory > Delivery Note > Add Delivery Note > More Info tab | Open the More Info tab of a new note | - | The date shows the current date | Medium | Positive | - |
| 482 | 5. Add Delivery Note - More Info Tab | TC-DNM-021 | Select a Transporter Receipt Date | Inventory > Delivery Note > Add Delivery Note > More Info tab | Select a date | 2026-11-02 | The value is accepted | Medium | Positive | - |
| 483 | 5. Add Delivery Note - More Info Tab | TC-DNM-022 | Clear the Transporter Receipt Date | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Clear the date
2. Click Save | - | The note is saved (field is optional) | Low | Positive | - |
| 484 | 5. Add Delivery Note - More Info Tab | TC-DNM-023 | Vehicle No accepts valid text | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter valid text in Vehicle No | ABC-1234 | The value is accepted | Medium | Positive | - |
| 485 | 5. Add Delivery Note - More Info Tab | TC-DNM-024 | Leave Vehicle No empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave Vehicle No empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 486 | 5. Add Delivery Note - More Info Tab | TC-DNM-025 | Vehicle No at the maximum length (100 characters) | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter exactly 100 characters in Vehicle No | 100-character text | The value is accepted | Low | Positive | - |
| 487 | 5. Add Delivery Note - More Info Tab | TC-DNM-026 | Vehicle No longer than 100 characters | Inventory > Delivery Note > Add Delivery Note > More Info tab | Try to enter 101 characters in Vehicle No | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 488 | 5. Add Delivery Note - More Info Tab | TC-DNM-027 | Vehicle No accepts letters, numbers and special characters | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter a mix in Vehicle No | Ex-123/A (x) | The value is accepted | Medium | Positive | - |
| 489 | 5. Add Delivery Note - More Info Tab | TC-DNM-028 | Driver Name accepts valid text | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter valid text in Driver Name | ABC-1234 | The value is accepted | Medium | Positive | - |
| 490 | 5. Add Delivery Note - More Info Tab | TC-DNM-029 | Leave Driver Name empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave Driver Name empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 491 | 5. Add Delivery Note - More Info Tab | TC-DNM-030 | Driver Name at the maximum length (100 characters) | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter exactly 100 characters in Driver Name | 100-character text | The value is accepted | Low | Positive | - |
| 492 | 5. Add Delivery Note - More Info Tab | TC-DNM-031 | Driver Name longer than 100 characters | Inventory > Delivery Note > Add Delivery Note > More Info tab | Try to enter 101 characters in Driver Name | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 493 | 5. Add Delivery Note - More Info Tab | TC-DNM-032 | Driver Name accepts letters, numbers and special characters | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter a mix in Driver Name | Ex-123/A (x) | The value is accepted | Medium | Positive | - |
| 494 | 5. Add Delivery Note - More Info Tab | TC-DNM-033 | Customer's Purchase Order No accepts valid text | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter valid text | PO-2026-15 | The value is accepted | Medium | Positive | - |
| 495 | 5. Add Delivery Note - More Info Tab | TC-DNM-034 | Leave Customer's Purchase Order No empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave it empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 496 | 5. Add Delivery Note - More Info Tab | TC-DNM-035 | Customer's Purchase Order No shorter than the minimum length (2 characters) | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Enter 2 characters
2. Click Save | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 497 | 5. Add Delivery Note - More Info Tab | TC-DNM-036 | Customer's Purchase Order No at the minimum length (3 characters) | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter 3 characters | abc | The value is accepted | Medium | Positive | - |
| 498 | 5. Add Delivery Note - More Info Tab | TC-DNM-037 | Customer's Purchase Order No at the maximum length (500 characters) | Inventory > Delivery Note > Add Delivery Note > More Info tab | Enter exactly 500 characters | 500-character text | The value is accepted | Medium | Positive | - |
| 499 | 5. Add Delivery Note - More Info Tab | TC-DNM-038 | Customer's Purchase Order No longer than 500 characters | Inventory > Delivery Note > Add Delivery Note > More Info tab | Try to enter 501 characters | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 500 | 5. Add Delivery Note - More Info Tab | TC-DNM-039 | Customer's Purchase Order No rejects invalid data | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Enter script tags
2. Click Save | <script>x</script> | An error message is displayed | Medium | Negative | - |
| 501 | 5. Add Delivery Note - More Info Tab | TC-DNM-040 | Customer Purchase Order Date: select a date | Inventory > Delivery Note > Add Delivery Note > More Info tab | Select a date | 2026-10-30 | The value is accepted | Medium | Positive | - |
| 502 | 5. Add Delivery Note - More Info Tab | TC-DNM-041 | Customer Purchase Order Date: leave empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave it empty
2. Click Save | - | The note is saved (field is optional) | Medium | Positive | - |
| 503 | 5. Add Delivery Note - More Info Tab | TC-DNM-042 | Customer Purchase Order Date later than the Delivery Note date | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Select a PO date later than the note date
2. Click Save | PO: 2026-12-01; DN: 2026-11-01 | To be confirmed with the BA (accepted or rejected) | Low | Negative | Needs Clarification: Not defined in the SRS. |
| 504 | 5. Add Delivery Note - More Info Tab | TC-DNM-043 | Letter Head is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > More Info tab | Click Letter Head and type part of a name | Shamel | The list is filtered while typing and the selection is accepted (optional) | Medium | Positive | - |
| 505 | 5. Add Delivery Note - More Info Tab | TC-DNM-044 | Letter Head is used when printing | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Select a Letter Head
2. Print the note | Shamel Standard | The print view uses the selected letter head | Medium | Positive | - |
| 506 | 5. Add Delivery Note - More Info Tab | TC-DNM-045 | Language is a read-only label | Inventory > Delivery Note > Add Delivery Note > More Info tab | Review Language | English | Language shows the language selected in the print settings and cannot be edited | Low | UI | - |
| 507 | 5. Add Delivery Note - More Info Tab | TC-DNM-046 | Print without Amount | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Check Print without Amount
2. Print the note | - | The printed note does not show rates and amounts | High | Positive | - |
| 508 | 5. Add Delivery Note - More Info Tab | TC-DNM-047 | Print with amounts when the checkbox is unchecked | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave Print without Amount unchecked
2. Print the note | - | The printed note shows rates and amounts | Medium | Positive | - |
| 509 | 5. Add Delivery Note - More Info Tab | TC-DNM-048 | Group same items | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Add two rows with the same item
2. Check Group same items
3. Print the note | Coffee Mug x2 rows | The printed note shows one grouped line for the item | Medium | Positive | - |
| 510 | 5. Add Delivery Note - More Info Tab | TC-DNM-049 | UTM Source is a searchable dropdown | Inventory > Delivery Note > Add Delivery Note > More Info tab | Click Source and type part of a name | Facebook | The list is filtered while typing and the selection is accepted (optional) | Low | Positive | - |
| 511 | 5. Add Delivery Note - More Info Tab | TC-DNM-050 | Leave UTM Source empty | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Leave Source empty
2. Click Save | - | The note is saved (field is optional) | Low | Positive | - |
| 512 | 5. Add Delivery Note - More Info Tab | TC-DNM-051 | More Info data is saved with the note | Inventory > Delivery Note > Add Delivery Note > More Info tab | 1. Fill the More Info tab
2. Click Save
3. Reopen the note | - | All More Info values are saved and displayed correctly | High | Positive | - |
| 513 | 6. Delivery Note Details Screen | TC-DND-001 | Open Delivery Note Details from the list | Logged in; at least one Delivery Note exists | 1. Click Inventory from the side menu
2. Click Delivery Note
3. Click a Delivery Note ID | DN-0001 | The Delivery Note Details screen of the selected note is displayed | High | Positive | - |
| 514 | 6. Delivery Note Details Screen | TC-DND-002 | Details display the data entered during creation | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a note created with known data and compare the fields | Customer: Al Noor Stores; Coffee Mug x6 | All data entered during creation is displayed correctly across the three tabs | High | Positive | - |
| 515 | 6. Delivery Note Details Screen | TC-DND-003 | Draft: fields are editable | Inventory > Delivery Note > click a Delivery Note ID in the table; a Draft note exists | Open a Draft note | Status: Draft | The fields are editable | High | Positive | - |
| 516 | 6. Delivery Note Details Screen | TC-DND-004 | Draft: modify and save a note | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a Draft note
2. Change Qty and the shipping address
3. Click Save | Qty: 6 > 4 | The changes are saved successfully | High | Positive | - |
| 517 | 6. Delivery Note Details Screen | TC-DND-005 | Submitted: fields are read-only | Inventory > Delivery Note > click a Delivery Note ID in the table; a To Bill note exists | Open a submitted (To Bill) note | Status: To Bill | Fields cannot be edited | High | Negative | Needs Clarification: Details says 'view or update' without stating which statuses are read-only. |
| 518 | 6. Delivery Note Details Screen | TC-DND-006 | Cancelled: fields are read-only | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a Cancelled note | Status: Cancelled | Fields cannot be edited | High | Negative | - |
| 519 | 6. Delivery Note Details Screen | TC-DND-007 | Picking statuses: field editability | Inventory > Delivery Note > click a Delivery Note ID in the table | Open notes in To Pick, Partially Picked, Picked and To Deliver | 4 notes | To be confirmed with the BA (which fields are editable) | Medium | Positive | Needs Clarification: Not defined in the SRS. |
| 520 | 6. Delivery Note Details Screen | TC-DND-008 | Fixed page actions are displayed at the top | Inventory > Delivery Note > click a Delivery Note ID in the table | Open any note and review the top of the page | - | The Create dropdown and the Assign, Attachment, Tags, Share and Print actions are displayed (other actions by status) | High | UI | - |
| 521 | 6. Delivery Note Details Screen | TC-DND-009 | Create dropdown lists the actions | Inventory > Delivery Note > click a Delivery Note ID in the table | Click the Create dropdown | - | The list contains: Shipment, Quality Inspection(s), Packing Slip, Sales Return, Delivery Trip, Sales Invoice (each according to its status rule) | High | UI | - |
| 522 | 6. Delivery Note Details Screen | TC-DND-010 | Create > Shipment is displayed when the note has Packing Slips | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a note that has a Packing Slip and open Create | DN-0001 with PS-2026-001 | The Shipment action is displayed | High | Positive | - |
| 523 | 6. Delivery Note Details Screen | TC-DND-011 | Create > Shipment is hidden when the note has no Packing Slips | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a note without Packing Slips and open Create | DN-0005 | The Shipment action is hidden | High | Negative | - |
| 524 | 6. Delivery Note Details Screen | TC-DND-012 | Create > Shipment opens Add Shipment with items fetched | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Create > Shipment | DN-0001 | The Add Shipment screen opens and the items / Packing Slips of the note are fetched into the Shipment | High | Positive | - |
| 525 | 6. Delivery Note Details Screen | TC-DND-013 | Create > Quality Inspection(s) is displayed for a Draft note | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a Draft note and open Create | Status: Draft | The Quality Inspection(s) action is displayed | High | Positive | - |
| 526 | 6. Delivery Note Details Screen | TC-DND-014 | Quality Inspection(s) for a Submitted note when the Inventory Settings option is on | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Enable 'Allow to make Quality Inspection after Purchase/Delivery'
2. Open a Submitted note and open Create | Setting: on | The Quality Inspection(s) action is displayed | High | Positive | - |
| 527 | 6. Delivery Note Details Screen | TC-DND-015 | Quality Inspection(s) for a Submitted note when the Inventory Settings option is off | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Disable 'Allow to make Quality Inspection after Purchase/Delivery'
2. Open a Submitted note and open Create | Setting: off | The Quality Inspection(s) action is hidden | High | Negative | - |
| 528 | 6. Delivery Note Details Screen | TC-DND-016 | Quality Inspection(s) for other statuses | Inventory > Delivery Note > click a Delivery Note ID in the table | Open notes in To Pick, Picked and Cancelled | 3 notes | To be confirmed with the BA (hidden as written) | Medium | Negative | Needs Clarification: SRS lists only Draft / Submitted. Confirm for To Pick, Picked, To Deliver and Cancelled. |
| 529 | 6. Delivery Note Details Screen | TC-DND-017 | Quality Inspection popup lists only items requiring inspection | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Create > Quality Inspection(s) | Item A (Inspection Required Before Delivery = on); Item B (off) | Only Item A is listed | High | Positive | - |
| 530 | 6. Delivery Note Details Screen | TC-DND-018 | Quality Inspection popup columns | Inventory > Delivery Note > click a Delivery Note ID in the table | Open the popup | - | The table shows: Checkbox, No., Item Code, Item Name, Accepted Quantity, Sample size | Medium | UI | - |
| 531 | 6. Delivery Note Details Screen | TC-DND-019 | Sample size accepts a valid number | Inventory > Delivery Note > click a Delivery Note ID in the table | Enter a Sample size | 2 | The value is accepted | High | Positive | - |
| 532 | 6. Delivery Note Details Screen | TC-DND-020 | Sample size greater than the Qty | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Enter a Sample size greater than the Qty
2. Click Create | Qty 6; Sample 10 | A validation error is displayed | High | Negative | - |
| 533 | 6. Delivery Note Details Screen | TC-DND-021 | Sample size equal to the Qty | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Enter a Sample size equal to the Qty
2. Click Create | Qty 6; Sample 6 | The Quality Inspection is created | Medium | Positive | - |
| 534 | 6. Delivery Note Details Screen | TC-DND-022 | Sample size rejects letters | Inventory > Delivery Note > click a Delivery Note ID in the table | Type letters in Sample size | abc | Letters are not accepted | Medium | Negative | - |
| 535 | 6. Delivery Note Details Screen | TC-DND-023 | Sample size left empty | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Select an item
2. Leave Sample size empty
3. Click Create | - | A validation error is displayed | Medium | Negative | - |
| 536 | 6. Delivery Note Details Screen | TC-DND-024 | Create a Quality Inspection successfully | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Select an item
2. Enter a Sample size
3. Click Create | Item A; Sample 2 | The Quality Inspection is created successfully | High | Positive | - |
| 537 | 6. Delivery Note Details Screen | TC-DND-025 | Create without selecting an item | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Do not select any item
2. Click Create | - | A message asks the user to select an item | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 538 | 6. Delivery Note Details Screen | TC-DND-026 | Quality Inspection requires 'Inspection Required Before Delivery' on the item | Inventory > Delivery Note > click a Delivery Note ID in the table | Add an item without 'Inspection Required Before Delivery' and open the popup | Item B | Item B is not listed | Medium | Negative | - |
| 539 | 6. Delivery Note Details Screen | TC-DND-027 | Create > Packing Slip is displayed only for Draft notes | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a Draft note and a To Bill note and open Create | 2 notes | The Packing Slip action is displayed only on the Draft note | High | Positive | - |
| 540 | 6. Delivery Note Details Screen | TC-DND-028 | Create > Packing Slip opens Add Packing Slip with items fetched | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a Draft note
2. Click Create > Packing Slip | DN-0001 | The Add Packing Slip screen opens and the note items are fetched | High | Positive | - |
| 541 | 6. Delivery Note Details Screen | TC-DND-029 | Create > Sales Return is displayed for Completed and To Bill notes | Inventory > Delivery Note > click a Delivery Note ID in the table | Open notes in Completed and To Bill and open Create | 2 notes | The Sales Return action is displayed on both | High | Positive | - |
| 542 | 6. Delivery Note Details Screen | TC-DND-030 | Create > Sales Return is hidden for other statuses | Inventory > Delivery Note > click a Delivery Note ID in the table | Open notes in Draft, To Pick, Cancelled and Closed and open Create | 4 notes | The Sales Return action is not displayed | Medium | Negative | - |
| 543 | 6. Delivery Note Details Screen | TC-DND-031 | Sales Return opens Add Delivery Note with negative values | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Create > Sales Return | DN-0001: Qty 6, Rate 50 | A new Add Delivery Note screen opens with the items fetched and Qty, Rate and Valuation Rate shown with negative values | High | Positive | - |
| 544 | 6. Delivery Note Details Screen | TC-DND-032 | Is Return checkbox is displayed and checked | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Create > Sales Return | - | Is Return is displayed, checked and read-only | High | Positive | - |
| 545 | 6. Delivery Note Details Screen | TC-DND-033 | Issue Credit Note checkbox is displayed | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Create > Sales Return | - | Issue Credit Note is displayed | High | Positive | - |
| 546 | 6. Delivery Note Details Screen | TC-DND-034 | Return Against Delivery Note shows the original note | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Create > Sales Return | DN-0001 | Return Against Delivery Note shows the original note as a read-only clickable label | High | Positive | - |
| 547 | 6. Delivery Note Details Screen | TC-DND-035 | Return Against Delivery Note link opens the original note | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a Sales Return
2. Click Return Against Delivery Note | DN-0001 | The user is redirected to the original Delivery Note | Medium | Positive | - |
| 548 | 6. Delivery Note Details Screen | TC-DND-036 | Sales Return statuses | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Create and submit a Sales Return
2. Open the return and the original note | - | The return note has status Return and the original note has status Return Issued | High | Positive | - |
| 549 | 6. Delivery Note Details Screen | TC-DND-037 | Issue Credit Note creates a Credit Note Sales Invoice | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Check Issue Credit Note
2. Submit the Sales Return | - | A Sales Invoice with status Credit Note is created | High | Positive | - |
| 550 | 6. Delivery Note Details Screen | TC-DND-038 | Sales Return without Issue Credit Note | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Leave Issue Credit Note unchecked
2. Submit the Sales Return | - | No Sales Invoice is created | Medium | Positive | - |
| 551 | 6. Delivery Note Details Screen | TC-DND-039 | Return quantity greater than the delivered quantity | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Change the return Qty to more than delivered
2. Click Save | Delivered 6; return 8 | A validation error is displayed | High | Negative | - |
| 552 | 6. Delivery Note Details Screen | TC-DND-040 | Partial return | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Change the return Qty to a smaller quantity
2. Submit | Return 2 of 6 | The return is created and Returned % of the original note is updated | High | Positive | - |
| 553 | 6. Delivery Note Details Screen | TC-DND-041 | Return increases the stock | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Submit a Sales Return
2. Check the stock | Return 2 | The returned quantity is added back to the warehouse stock | High | Positive | - |
| 554 | 6. Delivery Note Details Screen | TC-DND-042 | Cancelling a Sales Return | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a submitted Sales Return
2. Click Cancel | Status: Return | The return is cancelled and the stock is updated accordingly | Medium | Positive | Needs Clarification: SRS lists Return among the statuses that show Cancel. |
| 555 | 6. Delivery Note Details Screen | TC-DND-043 | Create > Delivery Trip is displayed only for To Bill notes | Inventory > Delivery Note > click a Delivery Note ID in the table | Open notes in To Bill and Completed and open Create | 2 notes | The Delivery Trip action is displayed only on the To Bill note | High | Positive | - |
| 556 | 6. Delivery Note Details Screen | TC-DND-044 | Create > Delivery Trip opens Add Delivery Trip | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Create > Delivery Trip | DN-0001 | The Add Delivery Trip screen opens and the user can create a trip for the note | High | Positive | - |
| 557 | 6. Delivery Note Details Screen | TC-DND-045 | Create > Sales Invoice is displayed only for To Bill notes | Inventory > Delivery Note > click a Delivery Note ID in the table | Open notes in To Bill and Completed and open Create | 2 notes | The Sales Invoice action is displayed only on the To Bill note | High | Positive | - |
| 558 | 6. Delivery Note Details Screen | TC-DND-046 | Create > Sales Invoice opens Add Sales Invoice with items fetched | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Create > Sales Invoice | DN-0001 | The Add Sales Invoice screen opens and the note items are fetched | High | Positive | - |
| 559 | 6. Delivery Note Details Screen | TC-DND-047 | Submitting the Sales Invoice completes the Delivery Note | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Create and submit a Sales Invoice from the note
2. Reopen the note | DN-0001 | The status changes to Completed and Amount billed % shows 100% | High | Positive | - |
| 560 | 6. Delivery Note Details Screen | TC-DND-048 | Partial invoice sets Partially Billed | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Invoice only part of the note
2. Reopen the note | Bill 3 of 6 | The status changes to Partially Billed | High | Positive | - |
| 561 | 6. Delivery Note Details Screen | TC-DND-049 | Deliver action is displayed for the allowed status | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a Picked / To Deliver note | Status: To Deliver | The Deliver action is displayed | High | Positive | Needs Clarification: SRS says Deliver appears when the status is Picked, while the workflow shows it after Finish Picking (To Deliver). |
| 562 | 6. Delivery Note Details Screen | TC-DND-050 | Deliver from Details | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a To Deliver note
2. Click Deliver | Status: To Deliver | The note is submitted (delivered) and the status becomes To Bill or Completed | High | Positive | - |
| 563 | 6. Delivery Note Details Screen | TC-DND-051 | Cancel action is displayed for a Submitted (To Bill) note | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a To Bill note | Status: To Bill | The Cancel action is displayed | High | Positive | - |
| 564 | 6. Delivery Note Details Screen | TC-DND-052 | Cancel from Details | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a To Bill note
2. Click Cancel | Status: To Bill | The note is cancelled successfully | High | Positive | - |
| 565 | 6. Delivery Note Details Screen | TC-DND-053 | Delete action is displayed for a Submitted (To Bill) note | Inventory > Delivery Note > click a Delivery Note ID in the table | Open notes in each status and review the actions | All statuses | Delete is displayed for Submitted (To Bill) as written in the SRS | High | Positive | Needs Clarification: CONTRADICTION: the List says Delete appears for Draft / Cancelled notes, Details says it appears for Submitted (To Bill). |
| 566 | 6. Delivery Note Details Screen | TC-DND-054 | Delete a Draft or Cancelled note from Details | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a Draft note
2. Look for the Delete action | Status: Draft | To be confirmed with the BA (Delete should be available as in the List) | High | Negative | Needs Clarification: See the contradiction above. |
| 567 | 6. Delivery Note Details Screen | TC-DND-055 | Delete confirmation message | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a note with a Delete action
2. Click Delete | - | A confirmation message asks the user whether they want to delete this delivery note | High | Positive | - |
| 568 | 6. Delivery Note Details Screen | TC-DND-056 | Cancel the delete confirmation | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Delete
2. Click No (or close the message) | - | The note is not deleted | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 569 | 6. Delivery Note Details Screen | TC-DND-057 | Delete a note that has no links | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open an unlinked note
2. Click Delete
3. Click Yes | Unlinked note | The Delivery Note is deleted successfully | High | Positive | - |
| 570 | 6. Delivery Note Details Screen | TC-DND-058 | Delete a note amended from another note | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open an amended note
2. Click Delete
3. Click Yes | Amended note | A warning message is displayed with the linked doctypes as hyperlinks; the note is not deleted | High | Negative | - |
| 571 | 6. Delivery Note Details Screen | TC-DND-059 | Delete a note linked to other transactions | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a linked note
2. Click Delete
3. Click Yes | Note linked to a Packing Slip | A message informs the user that the linked transactions must be deleted first, with hyperlinks | High | Negative | - |
| 572 | 6. Delivery Note Details Screen | TC-DND-060 | Linked doctype hyperlinks open the corresponding doctype | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Trigger the delete message
2. Click a linked doctype | - | The user is redirected to the corresponding doctype | Medium | Positive | - |
| 573 | 6. Delivery Note Details Screen | TC-DND-061 | Assign the note to a user | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Assign
2. Select a user
3. Confirm | User: Mona Samir | The note is assigned to the selected user and the assignment is displayed | Medium | Positive | Needs Clarification: SRS lists Assign without details. |
| 574 | 6. Delivery Note Details Screen | TC-DND-062 | Add an attachment | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Attachment
2. Upload a file | delivery-proof.pdf | The file is attached to the note and listed | Medium | Positive | Needs Clarification: Allowed file types and size limit are not defined. |
| 575 | 6. Delivery Note Details Screen | TC-DND-063 | Add a tag | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Tags
2. Add a tag | Tag: Urgent | The tag is added to the note | Low | Positive | - |
| 576 | 6. Delivery Note Details Screen | TC-DND-064 | Share the note with a user | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Share
2. Select a user and permission
3. Confirm | User: Mona Samir | The note is shared with the selected user | Medium | Positive | Needs Clarification: SRS lists Share without details. |
| 577 | 6. Delivery Note Details Screen | TC-DND-065 | Print the note | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Print | - | The print view of the note is displayed and can be printed | Medium | Positive | - |
| 578 | 6. Delivery Note Details Screen | TC-DND-066 | Print uses the Letter Head, Print without Amount and Group same items settings | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Set the print options in More Info
2. Click Print | Letter Head: Shamel Standard | The print view follows the selected options | Medium | Positive | - |
| 579 | 6. Delivery Note Details Screen | TC-DND-067 | Connections tab is displayed | Inventory > Delivery Note > click a Delivery Note ID in the table | Open a note and scroll to Connections | - | The Connections section is displayed | High | UI | - |
| 580 | 6. Delivery Note Details Screen | TC-DND-068 | Connections tab lists all linked doctypes | Inventory > Delivery Note > click a Delivery Note ID in the table | Review the Connections buttons | - | It contains: Sales Invoice, Packing Slip, Delivery Trip, Sales Order, Shipment, Quality Inspection, Material Request, Purchase Order, Purchase Receipt, Stock Entry | High | UI | - |
| 581 | 6. Delivery Note Details Screen | TC-DND-069 | Connections: open Sales Invoice | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open a note with an invoice
2. Click Sales Invoice | SINV-0001 | The Sales Invoice list filtered by this note opens | High | Positive | Needs Clarification: SRS says the button links to the doctype; confirm it is filtered by this note. |
| 582 | 6. Delivery Note Details Screen | TC-DND-070 | Connections: open Packing Slip | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Packing Slip | PS-2026-001 | The Packing Slip list filtered by this note opens | High | Positive | - |
| 583 | 6. Delivery Note Details Screen | TC-DND-071 | Connections: open Delivery Trip | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Delivery Trip | DT-2026-00001 | The Delivery Trip list filtered by this note opens | Medium | Positive | - |
| 584 | 6. Delivery Note Details Screen | TC-DND-072 | Connections: open Sales Order | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Sales Order | SO-0001 | The Sales Order linked to this note opens | Medium | Positive | - |
| 585 | 6. Delivery Note Details Screen | TC-DND-073 | Connections: open Shipment | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Shipment | SHIP-2026-0001 | The Shipment list filtered by this note opens | Medium | Positive | - |
| 586 | 6. Delivery Note Details Screen | TC-DND-074 | Connections: open Quality Inspection | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click Quality Inspection | QI-0001 | The Quality Inspection list filtered by this note opens | Medium | Positive | - |
| 587 | 6. Delivery Note Details Screen | TC-DND-075 | Connections: open Material Request, Purchase Order, Purchase Receipt and Stock Entry | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Click each of the four buttons | - | Each button opens its own doctype | Low | Positive | Needs Clarification: Why a Delivery Note links to purchase documents is not explained in the SRS (e.g., drop-ship / internal transfer). |
| 588 | 6. Delivery Note Details Screen | TC-DND-076 | Connections: note with no linked documents | Inventory > Delivery Note > click a Delivery Note ID in the table | 1. Open an unlinked note
2. Click a button in Connections | Unlinked note | The doctype opens with no related documents (or an empty state) | Low | Positive | - |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Delivery Note List Screen |  |  |  |
| 2. Add Delivery Note - Details Tab |  |  |  |
| 3. Add Delivery Note - Picking & Delivery Workflow |  |  |  |
| 4. Add Delivery Note - General Info Tab |  |  |  |
| 5. Add Delivery Note - More Info Tab |  |  |  |
| 6. Delivery Note Details Screen |  |  |  |
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