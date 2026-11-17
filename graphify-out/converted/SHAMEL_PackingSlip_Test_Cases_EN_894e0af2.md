<!-- converted from SHAMEL_PackingSlip_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Packing Slip |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Packing Slip) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Packing Slip List Screen | TC-PSL-001 | Display the Packing Slip list | Access via Inventory > Packing Slip | 1. Click Inventory from the side menu
2. Click Packing Slip | - | A table listing all Packing Slips in the system is displayed | High | Positive | - |
| 2 | 1. Packing Slip List Screen | TC-PSL-002 | Add Packing Slip button is displayed | Access via Inventory > Packing Slip | Verify that the Add Packing Slip button is displayed on the list screen | - | The Add Packing Slip button is visible and clickable | Medium | UI | - |
| 3 | 1. Packing Slip List Screen | TC-PSL-003 | Navigate to the Add Packing Slip screen | Access via Inventory > Packing Slip | Click the Add Packing Slip button | - | The user is redirected to the Add Packing Slip screen | High | Positive | Needs Clarification: SRS says the button redirects to the 'Add Delivery Note' screen. Assumed to be a typo for Add Packing Slip. |
| 4 | 1. Packing Slip List Screen | TC-PSL-004 | Display checkbox column for row selection | Access via Inventory > Packing Slip | Open the Packing Slip list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Packing Slip List Screen | TC-PSL-005 | Display Packing Slip ID column | Access via Inventory > Packing Slip | Open the Packing Slip list | - | The Packing Slip ID column is displayed for each row | Medium | UI | - |
| 6 | 1. Packing Slip List Screen | TC-PSL-006 | Navigate to Packing Slip Details by clicking the ID | Access via Inventory > Packing Slip | Click a Packing Slip ID in the table | PS-2026-001 | The user is redirected to the Packing Slip Details screen of the selected slip | High | Positive | - |
| 7 | 1. Packing Slip List Screen | TC-PSL-007 | Display Status column with a valid value | Access via Inventory > Packing Slip | Open the list and review the Status column | Slips in each status | Each row shows exactly one of: Draft, Submitted, Cancelled | High | Positive | - |
| 8 | 1. Packing Slip List Screen | TC-PSL-008 | Status of a newly saved Packing Slip is Draft | Access via Inventory > Packing Slip | 1. Add and save a new Packing Slip
2. Return to the list | Delivery Note: DN-0001 | The new Packing Slip appears in the list with status Draft | High | Positive | - |
| 9 | 1. Packing Slip List Screen | TC-PSL-009 | Status changes to Submitted after submission | Access via Inventory > Packing Slip | 1. Submit a Draft Packing Slip
2. Return to the list | PS-2026-001 | The status is Submitted | High | Positive | - |
| 10 | 1. Packing Slip List Screen | TC-PSL-010 | Status changes to Cancelled after cancellation | Access via Inventory > Packing Slip | 1. Cancel a Submitted Packing Slip
2. Return to the list | PS-2026-001 | The status is Cancelled | High | Positive | - |
| 11 | 1. Packing Slip List Screen | TC-PSL-011 | Display Delivery Note column | Access via Inventory > Packing Slip | Open the list and review the Delivery Note column | Delivery Note: DN-0001 | The Delivery Note associated with each Packing Slip is displayed | Medium | UI | - |
| 12 | 1. Packing Slip List Screen | TC-PSL-012 | Action bar appears when one row is selected | Access via Inventory > Packing Slip | Select the checkbox of one Packing Slip | - | An action bar appears showing the available actions | High | Positive | - |
| 13 | 1. Packing Slip List Screen | TC-PSL-013 | Action bar appears when multiple rows are selected | Access via Inventory > Packing Slip | Select the checkboxes of three Packing Slips | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 14 | 1. Packing Slip List Screen | TC-PSL-014 | Action bar disappears when all rows are deselected | Access via Inventory > Packing Slip | 1. Select one Packing Slip
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 15 | 1. Packing Slip List Screen | TC-PSL-015 | Action bar contains the required actions | Access via Inventory > Packing Slip | Select a Packing Slip and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print (Submit, Cancel and Delete are shown only by status) | Medium | UI | - |
| 16 | 1. Packing Slip List Screen | TC-PSL-016 | Open the Edit popup | Access via Inventory > Packing Slip | 1. Select a Packing Slip
2. Click Edit | - | A popup is displayed containing the Field dropdown, the Value field and the Update button | High | Positive | - |
| 17 | 1. Packing Slip List Screen | TC-PSL-017 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Packing Slip | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Packing Slip and allows selecting only one option | Medium | Positive | - |
| 18 | 1. Packing Slip List Screen | TC-PSL-018 | Click Update without selecting a Field | Access via Inventory > Packing Slip | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because Field is mandatory | Medium | Negative | - |
| 19 | 1. Packing Slip List Screen | TC-PSL-019 | Value input type changes dynamically based on the selected Field | Access via Inventory > Packing Slip | 1. Open the Edit popup
2. Select Field = Letter Head and note the Value input type
3. Select Field = Gross Weight and note the Value input type | Letter Head, Gross Weight | The Value field changes its input type (searchable dropdown for Letter Head, numeric input for Gross Weight) | High | Positive | - |
| 20 | 1. Packing Slip List Screen | TC-PSL-020 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Packing Slip | 1. Open the Edit popup
2. Select a mandatory field (e.g., Series)
3. Leave Value empty and click Update | Field: Series | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 21 | 1. Packing Slip List Screen | TC-PSL-021 | Value field applies the validation rules of the selected Field | Access via Inventory > Packing Slip | 1. Open the Edit popup
2. Select Field = Gross Weight
3. Enter letters and click Update | Value: abc | A validation error message is displayed and the slip is not changed | Medium | Negative | - |
| 22 | 1. Packing Slip List Screen | TC-PSL-022 | Update a Draft Packing Slip successfully | Access via Inventory > Packing Slip | 1. Select a Draft Packing Slip
2. Click Edit
3. Select Field = Letter Head
4. Select a Value
5. Click Update | Letter Head: Shamel Standard | The Packing Slip is updated successfully | High | Positive | Needs Clarification: SRS defines only the error case of Update (Submitted / Cancelled). The Draft success case is assumed. |
| 23 | 1. Packing Slip List Screen | TC-PSL-023 | Update a Submitted Packing Slip | Access via Inventory > Packing Slip | 1. Select a Submitted Packing Slip
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Submitted | An error message is displayed informing the user that the Packing Slip cannot be modified | High | Negative | - |
| 24 | 1. Packing Slip List Screen | TC-PSL-024 | Update a Cancelled Packing Slip | Access via Inventory > Packing Slip | 1. Select a Cancelled Packing Slip
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Cancelled | An error message is displayed informing the user that the Packing Slip cannot be modified | High | Negative | - |
| 25 | 1. Packing Slip List Screen | TC-PSL-025 | Edit with multiple Packing Slips selected | Access via Inventory > Packing Slip | 1. Select two Draft Packing Slips
2. Click Edit
3. Select a Field and a Value
4. Click Update | Two Draft slips | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection. |
| 26 | 1. Packing Slip List Screen | TC-PSL-026 | Submit action is displayed for a Draft Packing Slip | Access via Inventory > Packing Slip | Select a Draft Packing Slip and review the action bar | Status: Draft | The Submit action is displayed | High | Positive | - |
| 27 | 1. Packing Slip List Screen | TC-PSL-027 | Submit action is hidden for Submitted and Cancelled slips | Access via Inventory > Packing Slip | Select a Submitted slip and a Cancelled slip and review the action bar | Status: Submitted / Cancelled | The Submit action is not displayed | Medium | Negative | - |
| 28 | 1. Packing Slip List Screen | TC-PSL-028 | Submit a Draft Packing Slip with complete and valid data | Access via Inventory > Packing Slip | 1. Select a complete Draft Packing Slip
2. Click Submit | Complete Draft slip | The Packing Slip is submitted successfully and its status changes to Submitted | High | Positive | - |
| 29 | 1. Packing Slip List Screen | TC-PSL-029 | Submit a Draft Packing Slip with incomplete data | Access via Inventory > Packing Slip | 1. Select a Draft slip with a missing mandatory value
2. Click Submit | Draft slip without Gross Weight UOM | The slip is not submitted, a validation error is displayed and the status stays Draft | High | Negative | Needs Clarification: SRS describes only the success case of Submit. |
| 30 | 1. Packing Slip List Screen | TC-PSL-030 | Submit multiple Draft Packing Slips at once | Access via Inventory > Packing Slip | 1. Select two complete Draft slips
2. Click Submit | Two Draft slips | To be confirmed with the BA (bulk submit behavior) | Low | Positive | Needs Clarification: SRS does not define bulk submit. |
| 31 | 1. Packing Slip List Screen | TC-PSL-031 | Cancel action is displayed for a Submitted Packing Slip | Access via Inventory > Packing Slip | Select a Submitted Packing Slip and review the action bar | Status: Submitted | The Cancel action is displayed | High | Positive | - |
| 32 | 1. Packing Slip List Screen | TC-PSL-032 | Cancel action is hidden for Draft and Cancelled slips | Access via Inventory > Packing Slip | Select a Draft slip and a Cancelled slip and review the action bar | Status: Draft / Cancelled | The Cancel action is not displayed | Medium | Negative | - |
| 33 | 1. Packing Slip List Screen | TC-PSL-033 | Cancel a Submitted Packing Slip | Access via Inventory > Packing Slip | 1. Select a Submitted Packing Slip
2. Click Cancel | Status: Submitted | The Packing Slip is cancelled successfully and its status changes to Cancelled | High | Positive | Needs Clarification: SRS spells the status 'Cancelled' in the list and 'Canceled' in the Add screen. Confirm the exact label. |
| 34 | 1. Packing Slip List Screen | TC-PSL-034 | Cancelling a Packing Slip affects the linked Delivery Note | Access via Inventory > Packing Slip | 1. Cancel a Submitted Packing Slip
2. Open its Delivery Note | DN-0001 | To be confirmed with the BA (Delivery Note packing information is updated) | Medium | Positive | Needs Clarification: SRS does not describe the effect of submit / cancel on the Delivery Note. |
| 35 | 1. Packing Slip List Screen | TC-PSL-035 | Delete action is displayed for a Submitted Packing Slip | Access via Inventory > Packing Slip | Select a Submitted Packing Slip and review the action bar | Status: Submitted | The Delete action is displayed | High | Positive | Needs Clarification: SRS says Delete appears only when the status is Submitted. |
| 36 | 1. Packing Slip List Screen | TC-PSL-036 | Delete action for Draft and Cancelled slips | Access via Inventory > Packing Slip | Select a Draft slip and a Cancelled slip and review the action bar | Status: Draft / Cancelled | To be confirmed with the BA (Delete is hidden as written in the SRS) | High | Negative | Needs Clarification: As written, Delete is available only for Submitted slips, so a Draft or Cancelled slip cannot be deleted. This looks inverted compared with other modules. |
| 37 | 1. Packing Slip List Screen | TC-PSL-037 | Confirmation message is displayed when clicking Delete | Access via Inventory > Packing Slip | 1. Select a Submitted Packing Slip
2. Click Delete | Status: Submitted | A confirmation message asks the user whether they want to delete this Packing Slip | High | Positive | - |
| 38 | 1. Packing Slip List Screen | TC-PSL-038 | Cancel the delete confirmation | Access via Inventory > Packing Slip | 1. Select a Submitted slip
2. Click Delete
3. Click No (or close the message) | - | The slip is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 39 | 1. Packing Slip List Screen | TC-PSL-039 | Delete a Packing Slip that has no links | Access via Inventory > Packing Slip | 1. Select an unlinked Submitted Packing Slip
2. Click Delete
3. Click Yes | Unlinked slip | The Packing Slip is deleted successfully and removed from the list | High | Positive | - |
| 40 | 1. Packing Slip List Screen | TC-PSL-040 | Delete a Packing Slip that was amended from another slip | Access via Inventory > Packing Slip | 1. Select a slip that has Amended From populated
2. Click Delete
3. Click Yes | Amended slip: PS-2026-001-1 | A warning message is displayed: the slip cannot be deleted until all related doctypes are deleted. The slip is not deleted | High | Negative | - |
| 41 | 1. Packing Slip List Screen | TC-PSL-041 | Linked doctypes in the amended-slip warning are hyperlinks | Access via Inventory > Packing Slip | 1. Trigger the delete warning for an amended slip
2. Click a linked doctype in the warning | Amended slip | Linked doctypes are shown as hyperlinks and the user is redirected to the corresponding doctype | Medium | Positive | - |
| 42 | 1. Packing Slip List Screen | TC-PSL-042 | Delete a Packing Slip linked to other transactions | Access via Inventory > Packing Slip | 1. Select a slip linked to other transactions (e.g., Shipment)
2. Click Delete
3. Click Yes | Slip linked to a Shipment | A message informs the user that the linked transactions must be deleted first. The slip is not deleted | High | Negative | - |
| 43 | 1. Packing Slip List Screen | TC-PSL-043 | Linked transactions in the delete message are hyperlinks | Access via Inventory > Packing Slip | 1. Trigger the delete message for a linked slip
2. Click a linked transaction in the message | Slip linked to a Shipment | Linked transactions are shown as hyperlinks and the user is redirected to the corresponding doctype | Medium | Positive | - |
| 44 | 1. Packing Slip List Screen | TC-PSL-044 | Delete multiple Packing Slips at once | Access via Inventory > Packing Slip | 1. Select two unlinked Submitted slips
2. Click Delete
3. Click Yes | Two unlinked slips | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define bulk delete. |
| 45 | 1. Packing Slip List Screen | TC-PSL-045 | Export selected Packing Slips | Access via Inventory > Packing Slip | 1. Select one or more slips
2. Click Export | - | The selected Packing Slips are exported | Medium | Positive | Needs Clarification: SRS lists Export without details. |
| 46 | 1. Packing Slip List Screen | TC-PSL-046 | Assign selected Packing Slips to a user | Access via Inventory > Packing Slip | 1. Select a slip
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The slip is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 47 | 1. Packing Slip List Screen | TC-PSL-047 | Clear assignment of a Packing Slip | Access via Inventory > Packing Slip | 1. Select an assigned slip
2. Click Clear assignment | Assigned slip | The assignment is cleared | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 48 | 1. Packing Slip List Screen | TC-PSL-048 | Add tags to a Packing Slip | Access via Inventory > Packing Slip | 1. Select a slip
2. Click Add tags
3. Enter a tag and confirm | Tag: Fragile | The tag is added to the slip | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 49 | 1. Packing Slip List Screen | TC-PSL-049 | Print selected Packing Slips | Access via Inventory > Packing Slip | 1. Select a slip
2. Click Print | - | The print view of the Packing Slip is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 50 | 1. Packing Slip List Screen | TC-PSL-050 | Packing Slip list when there are no slips | Access via Inventory > Packing Slip | Open the list in a system with no Packing Slips | No slips | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. Expected behavior is a standard assumption. |
| 51 | 1. Packing Slip List Screen | TC-PSL-051 | User without permission cannot access Packing Slip | Access via Inventory > Packing Slip | 1. Log in with a user that has no permission for Packing Slip
2. Open the sidebar | Restricted user | The Packing Slip menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 52 | 2. Add Packing Slip Screen | TC-APS-001 | Open the Add Packing Slip screen | Logged in with a user that has Packing Slip access | 1. Click Inventory from the side menu
2. Click Packing Slip
3. Click Add Packing Slip | - | The Add Packing Slip screen is displayed with an empty form | High | Positive | - |
| 53 | 2. Add Packing Slip Screen | TC-APS-002 | Delivery Note is a searchable dropdown | Inventory > Packing Slip > Add Packing Slip | Click Delivery Note and type part of a Delivery Note name | DN-00 | The list is filtered while typing (autocomplete) and shows matching Delivery Notes | High | Positive | - |
| 54 | 2. Add Packing Slip Screen | TC-APS-003 | Delivery Note lists only Draft Delivery Notes | Inventory > Packing Slip > Add Packing Slip | Open the Delivery Note dropdown | DN-0001 (Draft); DN-0002 (Submitted); DN-0003 (Cancelled) | Only DN-0001 (Draft) is listed | High | Positive | - |
| 55 | 2. Add Packing Slip Screen | TC-APS-004 | Select a Delivery Note | Inventory > Packing Slip > Add Packing Slip | Search for and select a Draft Delivery Note | DN-0001 | The value is accepted | High | Positive | - |
| 56 | 2. Add Packing Slip Screen | TC-APS-005 | Leave Delivery Note empty | Inventory > Packing Slip > Add Packing Slip | 1. Leave Delivery Note empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Delivery Note is mandatory | High | Negative | - |
| 57 | 2. Add Packing Slip Screen | TC-APS-006 | Delivery Note search with no matching result | Inventory > Packing Slip > Add Packing Slip | Type a non-existing name in Delivery Note | ZZZ-9999 | No results are displayed | Low | Negative | - |
| 58 | 2. Add Packing Slip Screen | TC-APS-007 | Delivery Note accepts a single selection only | Inventory > Packing Slip > Add Packing Slip | Select a Delivery Note and then select a different one | DN-0001, DN-0004 | Only one Delivery Note can be selected | Low | Positive | - |
| 59 | 2. Add Packing Slip Screen | TC-APS-008 | Changing the Delivery Note after adding items | Inventory > Packing Slip > Add Packing Slip | 1. Select DN-0001 and add item rows
2. Change the Delivery Note to DN-0004 | DN-0001 > DN-0004 | The items table is cleared or revalidated against the new Delivery Note | High | Negative | Needs Clarification: SRS does not say what happens to existing rows when the Delivery Note changes. |
| 60 | 2. Add Packing Slip Screen | TC-APS-009 | Selecting a Delivery Note populates the items | Inventory > Packing Slip > Add Packing Slip | Select a Draft Delivery Note that has items | DN-0001: Coffee Mug x6, Chocolate Bar 100g x4 | The items of the Delivery Note are available (or fetched) for the Packing Slip | High | Positive | Needs Clarification: SRS says Qty is fetched from the Delivery Note but does not say whether rows are added automatically or the user adds them with Add Row. |
| 61 | 2. Add Packing Slip Screen | TC-APS-010 | Series dropdown lists the configured naming series | Inventory > Packing Slip > Add Packing Slip | Open the Series dropdown | - | All naming series configured or previously used in the system are listed | High | Positive | - |
| 62 | 2. Add Packing Slip Screen | TC-APS-011 | Select a Series | Inventory > Packing Slip > Add Packing Slip | Select a Series from the dropdown | MAT-PAC-.YYYY.- | The value is accepted | High | Positive | - |
| 63 | 2. Add Packing Slip Screen | TC-APS-012 | Leave Series empty | Inventory > Packing Slip > Add Packing Slip | 1. Leave Series empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Series is mandatory | High | Negative | - |
| 64 | 2. Add Packing Slip Screen | TC-APS-013 | Series accepts a single selection only | Inventory > Packing Slip > Add Packing Slip | Select one Series and then another | Two series | Only one Series can be selected | Low | Positive | - |
| 65 | 2. Add Packing Slip Screen | TC-APS-014 | Packing Slip ID / Number is optional | Inventory > Packing Slip > Add Packing Slip | 1. Leave Packing Slip ID / Number empty
2. Fill the other mandatory fields
3. Click Save | - | The slip is saved and its ID is generated from the Series | High | Positive | - |
| 66 | 2. Add Packing Slip Screen | TC-APS-015 | Packing Slip ID / Number takes precedence over the Series | Inventory > Packing Slip > Add Packing Slip | 1. Enter a Packing Slip Number
2. Fill the other mandatory fields
3. Click Save
4. Review the ID shown in the list | PS-2026-001 | The entered number is used as the Packing Slip ID instead of the series-generated one | High | Positive | - |
| 67 | 2. Add Packing Slip Screen | TC-APS-016 | Packing Slip ID / Number accepts letters, numbers and special characters | Inventory > Packing Slip > Add Packing Slip | Enter a mix of letters, numbers and special characters | PS/2026-A#1 | The value is accepted | Medium | Positive | - |
| 68 | 2. Add Packing Slip Screen | TC-APS-017 | Packing Slip ID / Number at the maximum length (100 characters) | Inventory > Packing Slip > Add Packing Slip | Enter exactly 100 characters | 100-character text | The value is accepted | Medium | Positive | - |
| 69 | 2. Add Packing Slip Screen | TC-APS-018 | Packing Slip ID / Number longer than 100 characters | Inventory > Packing Slip > Add Packing Slip | Try to enter 101 characters | 101-character text | Input stops at 100 characters | Medium | Negative | - |
| 70 | 2. Add Packing Slip Screen | TC-APS-019 | Duplicate Packing Slip ID / Number | Inventory > Packing Slip > Add Packing Slip | 1. Enter a number that already exists
2. Fill the other mandatory fields
3. Click Save | PS-2026-001 (existing) | The slip is not saved and a duplicate error message is displayed | High | Negative | Needs Clarification: SRS does not define uniqueness, but IDs are normally unique. |
| 71 | 2. Add Packing Slip Screen | TC-APS-020 | Items table displays the default columns | Inventory > Packing Slip > Add Packing Slip | Review the Items table | - | The table shows: Checkbox, No., Item Code, Item Name, Qty, Net Weight | Medium | UI | - |
| 72 | 2. Add Packing Slip Screen | TC-APS-021 | Add Row adds a new item row | Inventory > Packing Slip > Add Packing Slip | Click Add Row in the Items table | - | A new empty row is added to the table | High | Positive | - |
| 73 | 2. Add Packing Slip Screen | TC-APS-022 | Rows are numbered in order | Inventory > Packing Slip > Add Packing Slip | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 74 | 2. Add Packing Slip Screen | TC-APS-023 | Item Code is a searchable dropdown | Inventory > Packing Slip > Add Packing Slip | 1. Select a Delivery Note
2. Click Item Code and type part of an item code | Coffee | The list is filtered while typing and shows matching items | High | Positive | - |
| 75 | 2. Add Packing Slip Screen | TC-APS-024 | Item Code lists only items from the selected Delivery Note | Inventory > Packing Slip > Add Packing Slip | 1. Select DN-0001 (Coffee Mug, Chocolate Bar 100g)
2. Open the Item Code dropdown | Other item: Ceramic Plate | Only Coffee Mug and Chocolate Bar 100g are listed | High | Positive | - |
| 76 | 2. Add Packing Slip Screen | TC-APS-025 | Item Code before selecting a Delivery Note | Inventory > Packing Slip > Add Packing Slip | Open Item Code without selecting a Delivery Note | - | No items are listed (or the user is asked to select a Delivery Note first) | Medium | Negative | Needs Clarification: SRS does not define the field state before a Delivery Note is selected. |
| 77 | 2. Add Packing Slip Screen | TC-APS-026 | Select an Item Code | Inventory > Packing Slip > Add Packing Slip | 1. Select a Delivery Note
2. Select an item in a row | Coffee Mug | The value is accepted | High | Positive | - |
| 78 | 2. Add Packing Slip Screen | TC-APS-027 | Leave Item Code empty | Inventory > Packing Slip > Add Packing Slip | 1. Add a row
2. Leave Item Code empty
3. Click Save | - | An error message is displayed because Item Code is mandatory | High | Negative | - |
| 79 | 2. Add Packing Slip Screen | TC-APS-028 | Item Name is filled automatically after selecting an Item Code | Inventory > Packing Slip > Add Packing Slip | Select an Item Code | Coffee Mug | Item Name shows the name of the selected item | High | Positive | - |
| 80 | 2. Add Packing Slip Screen | TC-APS-029 | Item Name is a read-only label | Inventory > Packing Slip > Add Packing Slip | Select an item and try to edit Item Name | - | Item Name cannot be edited | Medium | UI | - |
| 81 | 2. Add Packing Slip Screen | TC-APS-030 | Item Name updates when the Item Code changes | Inventory > Packing Slip > Add Packing Slip | 1. Select item A
2. Change the row to item B | Coffee Mug > Chocolate Bar 100g | Item Name shows the name of item B | Medium | Positive | - |
| 82 | 2. Add Packing Slip Screen | TC-APS-031 | Use the same item in two rows | Inventory > Packing Slip > Add Packing Slip | 1. Add two rows with the same Item Code
2. Click Save | Coffee Mug (x2) | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define duplicate items. |
| 83 | 2. Add Packing Slip Screen | TC-APS-032 | Qty is fetched from the selected Delivery Note | Inventory > Packing Slip > Add Packing Slip | 1. Select DN-0001 (Coffee Mug x6)
2. Select Coffee Mug in a row | Delivery Note Qty: 6 | Qty is filled with the quantity of the item in the Delivery Note | High | Positive | - |
| 84 | 2. Add Packing Slip Screen | TC-APS-033 | Qty accepts a valid number | Inventory > Packing Slip > Add Packing Slip | Change Qty to a valid number | 3 | The value is accepted | High | Positive | - |
| 85 | 2. Add Packing Slip Screen | TC-APS-034 | Leave Qty empty | Inventory > Packing Slip > Add Packing Slip | 1. Select an item
2. Clear Qty
3. Click Save | - | An error message is displayed because Qty is mandatory | High | Negative | - |
| 86 | 2. Add Packing Slip Screen | TC-APS-035 | Qty rejects letters and special characters | Inventory > Packing Slip > Add Packing Slip | Type letters and special characters in Qty | abc, @# | Only numbers are accepted | Medium | Negative | - |
| 87 | 2. Add Packing Slip Screen | TC-APS-036 | Qty greater than the Delivery Note quantity | Inventory > Packing Slip > Add Packing Slip | 1. Select Coffee Mug (Delivery Note Qty: 6)
2. Enter Qty greater than 6
3. Click Save | Qty: 10 | A validation error is displayed because the packed quantity exceeds the Delivery Note quantity | High | Negative | Needs Clarification: SRS does not define this validation, which is standard in packing slips. |
| 88 | 2. Add Packing Slip Screen | TC-APS-037 | Qty equal to the Delivery Note quantity | Inventory > Packing Slip > Add Packing Slip | 1. Select Coffee Mug
2. Keep Qty = Delivery Note Qty
3. Click Save | Qty: 6 | The slip is saved | Medium | Positive | - |
| 89 | 2. Add Packing Slip Screen | TC-APS-038 | Qty less than the Delivery Note quantity (partial packing) | Inventory > Packing Slip > Add Packing Slip | 1. Select Coffee Mug
2. Enter Qty less than the Delivery Note Qty
3. Click Save | Qty: 3 of 6 | The slip is saved with the partial quantity | High | Positive | - |
| 90 | 2. Add Packing Slip Screen | TC-APS-039 | Qty equal to zero | Inventory > Packing Slip > Add Packing Slip | 1. Enter 0 in Qty
2. Click Save | 0 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value for Qty. |
| 91 | 2. Add Packing Slip Screen | TC-APS-040 | Qty with decimal values | Inventory > Packing Slip > Add Packing Slip | 1. Enter a decimal number in Qty
2. Click Save | 1.5 | To be confirmed with the BA (accepted or rejected) | Medium | Positive | Needs Clarification: SRS does not say whether decimals are allowed. |
| 92 | 2. Add Packing Slip Screen | TC-APS-041 | Qty with a negative number | Inventory > Packing Slip > Add Packing Slip | Try to type a negative number in Qty | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 93 | 2. Add Packing Slip Screen | TC-APS-042 | Qty at the maximum length (100 digits) | Inventory > Packing Slip > Add Packing Slip | Enter exactly 100 digits in Qty | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 94 | 2. Add Packing Slip Screen | TC-APS-043 | Qty longer than 100 characters | Inventory > Packing Slip > Add Packing Slip | Try to enter 101 digits in Qty | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 95 | 2. Add Packing Slip Screen | TC-APS-044 | Pack an item that was already packed in another Packing Slip | Inventory > Packing Slip > Add Packing Slip | 1. Create a Submitted slip for Coffee Mug x6 from DN-0001
2. Create another slip for the same Delivery Note and item | DN-0001; Coffee Mug | The remaining quantity is limited to what is not packed yet, or an error is displayed | High | Negative | Needs Clarification: SRS does not define how already-packed quantities are handled. |
| 96 | 2. Add Packing Slip Screen | TC-APS-045 | Net Weight is fetched from the Item Weight Per Unit | Inventory > Packing Slip > Add Packing Slip | 1. Select an item whose Weight Per Unit is 0.5
2. Set Qty = 6 | Weight Per Unit: 0.5; Qty: 6 | Net Weight is filled with Item Weight Per Unit x Qty = 3 | High | Positive | - |
| 97 | 2. Add Packing Slip Screen | TC-APS-046 | Net Weight recalculates when Qty changes | Inventory > Packing Slip > Add Packing Slip | 1. Select an item with Weight Per Unit 0.5
2. Change Qty from 6 to 4 | Qty: 6 > 4 | Net Weight updates to 2 | High | Positive | - |
| 98 | 2. Add Packing Slip Screen | TC-APS-047 | Net Weight is empty for an item without a weight | Inventory > Packing Slip > Add Packing Slip | Select an item that has no Weight Per Unit | Item without weight | Net Weight is 0 or empty without errors | Medium | Positive | - |
| 99 | 2. Add Packing Slip Screen | TC-APS-048 | Net Weight can be entered manually | Inventory > Packing Slip > Add Packing Slip | 1. Overwrite Net Weight manually
2. Click Save | Net Weight: 5 | To be confirmed with the BA (manual override allowed or recalculated) | Medium | Positive | Needs Clarification: Net Weight is an input field but is also described as Weight Per Unit x Qty. |
| 100 | 2. Add Packing Slip Screen | TC-APS-049 | Items: Net Weight accepts a valid number | Inventory > Packing Slip > Add Packing Slip | Enter a valid number in Net Weight | 10 | The value is accepted | High | Positive | - |
| 101 | 2. Add Packing Slip Screen | TC-APS-050 | Items: Leave Net Weight empty | Inventory > Packing Slip > Add Packing Slip | 1. Leave Net Weight empty
2. Fill the other mandatory fields
3. Click Save | - | The Packing Slip is saved (field is optional) | Medium | Positive | - |
| 102 | 2. Add Packing Slip Screen | TC-APS-051 | Items: Net Weight rejects letters and special characters | Inventory > Packing Slip > Add Packing Slip | Type letters and special characters in Net Weight | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 103 | 2. Add Packing Slip Screen | TC-APS-052 | Items: Net Weight accepts decimal values | Inventory > Packing Slip > Add Packing Slip | Enter a decimal number in Net Weight | 2.5 | The value is accepted | Medium | Positive | Needs Clarification: SRS says 'numbers only'. Confirm that decimals are allowed (weights normally need them). |
| 104 | 2. Add Packing Slip Screen | TC-APS-053 | Items: Net Weight at the maximum length (100 characters) | Inventory > Packing Slip > Add Packing Slip | Enter exactly 100 digits in Net Weight | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 105 | 2. Add Packing Slip Screen | TC-APS-054 | Items: Net Weight longer than 100 characters | Inventory > Packing Slip > Add Packing Slip | Try to enter 101 digits in Net Weight | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 106 | 2. Add Packing Slip Screen | TC-APS-055 | Items: Net Weight with a negative number | Inventory > Packing Slip > Add Packing Slip | Try to type a negative number in Net Weight | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 107 | 2. Add Packing Slip Screen | TC-APS-056 | Action bar appears when an item row is selected | Inventory > Packing Slip > Add Packing Slip | Select the checkbox of an item row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 108 | 2. Add Packing Slip Screen | TC-APS-057 | Delete a single item row | Inventory > Packing Slip > Add Packing Slip | 1. Select one row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 109 | 2. Add Packing Slip Screen | TC-APS-058 | Delete multiple item rows | Inventory > Packing Slip > Add Packing Slip | 1. Select two rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 110 | 2. Add Packing Slip Screen | TC-APS-059 | Open the Edit Row popup | Inventory > Packing Slip > Add Packing Slip | Click the Edit Row icon of an item row | - | A popup is displayed with the row fields | High | Positive | - |
| 111 | 2. Add Packing Slip Screen | TC-APS-060 | Edit Row popup displays the fields | Inventory > Packing Slip > Add Packing Slip | Open Edit Row and review the fields | - | The popup shows: Item Code, Item Name, Batch No, Description, Qty, Item Default UOM, Packing Slip UOM, UOM Conversion Factor, Item Weight UOM, Net Weight, Delivery Note Item, Delivery Note Packed Item | Medium | UI | - |
| 112 | 2. Add Packing Slip Screen | TC-APS-061 | Edit Row: Item Code lists only items from the Delivery Note | Inventory > Packing Slip > Add Packing Slip | Open Edit Row and open the Item Code dropdown | Other item: Ceramic Plate | Only items from the selected Delivery Note are listed | Medium | Positive | - |
| 113 | 2. Add Packing Slip Screen | TC-APS-062 | Edit Row: Item Code is mandatory | Inventory > Packing Slip > Add Packing Slip | 1. Open Edit Row
2. Clear Item Code
3. Click Update | - | An error message is displayed because Item Code is mandatory | Medium | Negative | - |
| 114 | 2. Add Packing Slip Screen | TC-APS-063 | Edit Row: Item Name is a read-only label | Inventory > Packing Slip > Add Packing Slip | Open Edit Row and try to edit Item Name | - | Item Name cannot be edited | Medium | UI | - |
| 115 | 2. Add Packing Slip Screen | TC-APS-064 | Edit Row: Batch No displays the batch assigned in the Delivery Note | Inventory > Packing Slip > Add Packing Slip | 1. Select a batch item from a Delivery Note
2. Open Edit Row | Item: Milk 1L; Batch: BATCH-A | Batch No lists/shows the batch assigned to the item in the Delivery Note | High | Positive | - |
| 116 | 2. Add Packing Slip Screen | TC-APS-065 | Edit Row: Select a Batch No | Inventory > Packing Slip > Add Packing Slip | Open Edit Row and select a batch | BATCH-A | The value is accepted (searchable dropdown) | Medium | Positive | - |
| 117 | 2. Add Packing Slip Screen | TC-APS-066 | Edit Row: Leave Batch No empty | Inventory > Packing Slip > Add Packing Slip | 1. Open Edit Row
2. Leave Batch No empty
3. Click Update | - | The row is saved (field is optional) | Medium | Positive | - |
| 118 | 2. Add Packing Slip Screen | TC-APS-067 | Edit Row: Batch No for an item without batches | Inventory > Packing Slip > Add Packing Slip | Open Edit Row for a non-batch item | Item: Coffee Mug | No batches are listed and the field can stay empty | Low | Positive | - |
| 119 | 2. Add Packing Slip Screen | TC-APS-068 | Edit Row: Description accepts valid text | Inventory > Packing Slip > Add Packing Slip | Enter valid text in Description | Fragile - handle with care | The value is accepted | Medium | Positive | - |
| 120 | 2. Add Packing Slip Screen | TC-APS-069 | Edit Row: Leave Description empty | Inventory > Packing Slip > Add Packing Slip | 1. Open Edit Row
2. Leave Description empty
3. Click Update | - | The row is saved (field is optional) | Medium | Positive | - |
| 121 | 2. Add Packing Slip Screen | TC-APS-070 | Edit Row: Description shorter than the minimum length (2 characters) | Inventory > Packing Slip > Add Packing Slip | 1. Enter 2 characters in Description
2. Click Update | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 122 | 2. Add Packing Slip Screen | TC-APS-071 | Edit Row: Description at the minimum length (3 characters) | Inventory > Packing Slip > Add Packing Slip | Enter 3 characters in Description | abc | The value is accepted | Medium | Positive | - |
| 123 | 2. Add Packing Slip Screen | TC-APS-072 | Edit Row: Description at the maximum length (500 characters) | Inventory > Packing Slip > Add Packing Slip | Enter exactly 500 characters in Description | 500-character text | The value is accepted | Medium | Positive | - |
| 124 | 2. Add Packing Slip Screen | TC-APS-073 | Edit Row: Description longer than 500 characters | Inventory > Packing Slip > Add Packing Slip | Try to enter 501 characters in Description | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 125 | 2. Add Packing Slip Screen | TC-APS-074 | Edit Row: Description accepts letters, numbers and special characters | Inventory > Packing Slip > Add Packing Slip | Enter a mix of letters, numbers and special characters | Box 1/3 - fragile #A | The value is accepted | Medium | Positive | - |
| 126 | 2. Add Packing Slip Screen | TC-APS-075 | Edit Row: Description rejects invalid data | Inventory > Packing Slip > Add Packing Slip | 1. Enter invalid content such as script tags
2. Click Update | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 127 | 2. Add Packing Slip Screen | TC-APS-076 | Edit Row: Qty is mandatory and numeric | Inventory > Packing Slip > Add Packing Slip | 1. Open Edit Row
2. Clear Qty / type letters
3. Click Update | abc | An error message is displayed for the empty value; letters are rejected | Medium | Negative | - |
| 128 | 2. Add Packing Slip Screen | TC-APS-077 | Edit Row: Item Default UOM is a read-only label | Inventory > Packing Slip > Add Packing Slip | Open Edit Row and review Item Default UOM | Item Default UOM: Nos | The item's default UOM is displayed and cannot be edited | Medium | UI | - |
| 129 | 2. Add Packing Slip Screen | TC-APS-078 | Edit Row: Packing Slip UOM follows the Gross Weight UOM | Inventory > Packing Slip > Add Packing Slip | 1. Select Gross Weight UOM = Kg
2. Open Edit Row | Gross Weight UOM: Kg | Packing Slip UOM displays Kg and cannot be edited | High | Positive | - |
| 130 | 2. Add Packing Slip Screen | TC-APS-079 | Edit Row: UOM Conversion Factor between Item Default UOM and Packing Slip UOM | Inventory > Packing Slip > Add Packing Slip | 1. Select an item and a Gross Weight UOM
2. Open Edit Row | Item UOM: Nos; Packing UOM: Kg | The conversion factor between the two UOMs is displayed | Medium | Positive | Needs Clarification: SRS describes the conversion factor in two places with different wording (Packing Slip UOM vs UOM Conversion Factor). |
| 131 | 2. Add Packing Slip Screen | TC-APS-080 | Edit Row: Item Weight UOM is a read-only label | Inventory > Packing Slip > Add Packing Slip | Open Edit Row and review Item Weight UOM | Weight UOM: Kg | The item's weight UOM is displayed and cannot be edited | Medium | UI | - |
| 132 | 2. Add Packing Slip Screen | TC-APS-081 | Edit Row: Net Weight follows Weight Per Unit x Qty | Inventory > Packing Slip > Add Packing Slip | 1. Open Edit Row
2. Change Qty | Weight Per Unit: 0.5; Qty 4 | Net Weight shows 2 | Medium | Positive | - |
| 133 | 2. Add Packing Slip Screen | TC-APS-082 | Edit Row: Delivery Note Item is displayed | Inventory > Packing Slip > Add Packing Slip | Open Edit Row | - | Delivery Note Item shows the matching row of the Delivery Note | Medium | Positive | Needs Clarification: SRS describes these two fields in one line each. Confirm the exact value shown (row ID). |
| 134 | 2. Add Packing Slip Screen | TC-APS-083 | Edit Row: Delivery Note Packed Item is displayed | Inventory > Packing Slip > Add Packing Slip | Open Edit Row | - | Delivery Note Packed Item shows the matching packed-item row of the Delivery Note | Low | Positive | - |
| 135 | 2. Add Packing Slip Screen | TC-APS-084 | Edit Row: save changes with Update | Inventory > Packing Slip > Add Packing Slip | 1. Open Edit Row
2. Change Qty and Description
3. Click Update | Qty: 3; Description: Fragile | The popup closes and the changes are reflected in the row | High | Positive | - |
| 136 | 2. Add Packing Slip Screen | TC-APS-085 | Open the Items table Settings popup | Inventory > Packing Slip > Add Packing Slip | Click Setting on the Items table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 137 | 2. Add Packing Slip Screen | TC-APS-086 | Reorder Items columns using drag and drop | Inventory > Packing Slip > Add Packing Slip | 1. Open Setting
2. Drag the Qty column header and drop it before Item Code | - | The column order changes to the new position | Medium | Positive | - |
| 138 | 2. Add Packing Slip Screen | TC-APS-087 | Items: Column width default value is 3 | Inventory > Packing Slip > Add Packing Slip | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 139 | 2. Add Packing Slip Screen | TC-APS-088 | Items: Column width accepts numbers only | Inventory > Packing Slip > Add Packing Slip | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 140 | 2. Add Packing Slip Screen | TC-APS-089 | Items: Column width left empty | Inventory > Packing Slip > Add Packing Slip | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 141 | 2. Add Packing Slip Screen | TC-APS-090 | Items: Column width with 1 character | Inventory > Packing Slip > Add Packing Slip | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 142 | 2. Add Packing Slip Screen | TC-APS-091 | Items: Column width longer than 3 characters | Inventory > Packing Slip > Add Packing Slip | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 143 | 2. Add Packing Slip Screen | TC-APS-092 | Items: Add / Remove Columns popup lists all columns | Inventory > Packing Slip > Add Packing Slip | Click Add / Remove columns | - | A popup lists all columns with checkboxes: Item Code, Item Name, Quantity, Net Weight, Page Break, Batch No, Description, UOM, Weight UOM | Medium | UI | - |
| 144 | 2. Add Packing Slip Screen | TC-APS-093 | Items: Hide a column | Inventory > Packing Slip > Add Packing Slip | 1. Open Add / Remove columns
2. Clear the Net Weight checkbox
3. Click Update | Column: Net Weight | The Net Weight column is hidden from the table | Medium | Positive | - |
| 145 | 2. Add Packing Slip Screen | TC-APS-094 | Items: Show an additional column | Inventory > Packing Slip > Add Packing Slip | 1. Open Add / Remove columns
2. Select the Batch No checkbox
3. Click Update | Column: Batch No | The Batch No column is displayed in the table | Medium | Positive | - |
| 146 | 2. Add Packing Slip Screen | TC-APS-095 | Items: Show the Page Break column | Inventory > Packing Slip > Add Packing Slip | 1. Open Add / Remove columns
2. Select the Page Break checkbox
3. Click Update | Column: Page Break | The Page Break column is displayed | Low | Positive | Needs Clarification: Page Break is listed as a column but has no field description or Edit Row field in the SRS. Confirm its purpose (print page break). |
| 147 | 2. Add Packing Slip Screen | TC-APS-096 | Items: Save the Settings using Update | Inventory > Packing Slip > Add Packing Slip | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 148 | 2. Add Packing Slip Screen | TC-APS-097 | Items: Reset Settings to default | Inventory > Packing Slip > Add Packing Slip | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 149 | 2. Add Packing Slip Screen | TC-APS-098 | Packing Slip Net Weight is the sum of the item net weights | Inventory > Packing Slip > Add Packing Slip | 1. Add two rows: Coffee Mug x6 (3.0) and Chocolate Bar x4 (0.4) | Net Weights: 3.0 and 0.4 | Packing Slip Net Weight shows 3.4 | High | Positive | - |
| 150 | 2. Add Packing Slip Screen | TC-APS-099 | Packing Slip Net Weight updates when a row is deleted | Inventory > Packing Slip > Add Packing Slip | 1. Add two rows
2. Delete one row | 3.0 + 0.4 | Packing Slip Net Weight shows the remaining row only | High | Positive | - |
| 151 | 2. Add Packing Slip Screen | TC-APS-100 | Packing Slip Net Weight is a read-only label | Inventory > Packing Slip > Add Packing Slip | Try to edit Packing Slip Net Weight | - | The field cannot be edited | Medium | UI | - |
| 152 | 2. Add Packing Slip Screen | TC-APS-101 | Packing Slip Net Weight with no weight data | Inventory > Packing Slip > Add Packing Slip | Add rows for items without a weight | - | Packing Slip Net Weight shows 0 | Low | Positive | - |
| 153 | 2. Add Packing Slip Screen | TC-APS-102 | Header: Gross Weight accepts a valid number | Inventory > Packing Slip > Add Packing Slip | Enter a valid number in Gross Weight | 10 | The value is accepted | High | Positive | - |
| 154 | 2. Add Packing Slip Screen | TC-APS-103 | Header: Leave Gross Weight empty | Inventory > Packing Slip > Add Packing Slip | 1. Leave Gross Weight empty
2. Fill the other mandatory fields
3. Click Save | - | The Packing Slip is saved (field is optional) | Medium | Positive | - |
| 155 | 2. Add Packing Slip Screen | TC-APS-104 | Header: Gross Weight rejects letters and special characters | Inventory > Packing Slip > Add Packing Slip | Type letters and special characters in Gross Weight | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 156 | 2. Add Packing Slip Screen | TC-APS-105 | Header: Gross Weight accepts decimal values | Inventory > Packing Slip > Add Packing Slip | Enter a decimal number in Gross Weight | 2.5 | The value is accepted | Medium | Positive | Needs Clarification: SRS says 'numbers only'. Confirm that decimals are allowed (weights normally need them). |
| 157 | 2. Add Packing Slip Screen | TC-APS-106 | Header: Gross Weight at the maximum length (100 characters) | Inventory > Packing Slip > Add Packing Slip | Enter exactly 100 digits in Gross Weight | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 158 | 2. Add Packing Slip Screen | TC-APS-107 | Header: Gross Weight longer than 100 characters | Inventory > Packing Slip > Add Packing Slip | Try to enter 101 digits in Gross Weight | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 159 | 2. Add Packing Slip Screen | TC-APS-108 | Header: Gross Weight with a negative number | Inventory > Packing Slip > Add Packing Slip | Try to type a negative number in Gross Weight | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 160 | 2. Add Packing Slip Screen | TC-APS-109 | Gross Weight equal to the Packing Slip Net Weight | Inventory > Packing Slip > Add Packing Slip | 1. Set Net Weight total 3.4
2. Enter Gross Weight 3.4
3. Click Save | Gross: 3.4; Net: 3.4 | The slip is saved | Medium | Positive | - |
| 161 | 2. Add Packing Slip Screen | TC-APS-110 | Gross Weight greater than the Packing Slip Net Weight | Inventory > Packing Slip > Add Packing Slip | 1. Set Net Weight total 3.4
2. Enter Gross Weight 5
3. Click Save | Gross: 5; Net: 3.4 | The slip is saved | High | Positive | - |
| 162 | 2. Add Packing Slip Screen | TC-APS-111 | Gross Weight smaller than the Packing Slip Net Weight | Inventory > Packing Slip > Add Packing Slip | 1. Set Net Weight total 3.4
2. Enter Gross Weight 2
3. Click Save | Gross: 2; Net: 3.4 | A validation error is displayed because Gross Weight cannot be smaller than Packing Slip Net Weight | High | Negative | - |
| 163 | 2. Add Packing Slip Screen | TC-APS-112 | Gross Weight validation when Net Weight changes afterwards | Inventory > Packing Slip > Add Packing Slip | 1. Enter Gross Weight 5
2. Increase item Qty so the net weight becomes 6
3. Click Save | Gross: 5; Net: 6 | A validation error is displayed | Medium | Negative | - |
| 164 | 2. Add Packing Slip Screen | TC-APS-113 | Gross Weight UOM is a searchable dropdown | Inventory > Packing Slip > Add Packing Slip | Click Gross Weight UOM and type part of a UOM | Kg | The list is filtered while typing and shows matching UOMs | High | Positive | - |
| 165 | 2. Add Packing Slip Screen | TC-APS-114 | Select a Gross Weight UOM | Inventory > Packing Slip > Add Packing Slip | Search for and select a UOM | Kg | The value is accepted | High | Positive | - |
| 166 | 2. Add Packing Slip Screen | TC-APS-115 | Leave Gross Weight UOM empty | Inventory > Packing Slip > Add Packing Slip | 1. Leave Gross Weight UOM empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Gross Weight UOM is mandatory | High | Negative | Needs Clarification: The UOM is mandatory while Gross Weight itself is optional. Confirm the intended rule. |
| 167 | 2. Add Packing Slip Screen | TC-APS-116 | Gross Weight UOM accepts a single selection only | Inventory > Packing Slip > Add Packing Slip | Select a UOM and then another | Kg, Gram | Only one UOM can be selected | Low | Positive | - |
| 168 | 2. Add Packing Slip Screen | TC-APS-117 | Letter Head is a searchable dropdown | Inventory > Packing Slip > Add Packing Slip | Click Letter Head and type part of a name | Shamel | The list is filtered while typing and shows matching letter heads | Medium | Positive | - |
| 169 | 2. Add Packing Slip Screen | TC-APS-118 | Select a Letter Head | Inventory > Packing Slip > Add Packing Slip | Search for and select a Letter Head | Shamel Standard | The value is accepted | Medium | Positive | - |
| 170 | 2. Add Packing Slip Screen | TC-APS-119 | Leave Letter Head empty | Inventory > Packing Slip > Add Packing Slip | 1. Fill the mandatory fields
2. Leave Letter Head empty
3. Click Save | - | The slip is saved (field is optional) | Medium | Positive | - |
| 171 | 2. Add Packing Slip Screen | TC-APS-120 | Amended From is hidden on a new slip | Inventory > Packing Slip > Add Packing Slip | Review the form of a new Packing Slip | - | The Amended From field is not displayed | Medium | UI | - |
| 172 | 2. Add Packing Slip Screen | TC-APS-121 | Save a Packing Slip with valid data | Inventory > Packing Slip > Add Packing Slip | 1. Select a Draft Delivery Note
2. Select a Series
3. Add item rows
4. Select a Gross Weight UOM
5. Click Save | Delivery Note: DN-0001; Series: MAT-PAC-.YYYY.-; Items: Coffee Mug x6; Gross Weight: 4; UOM: Kg; Letter Head: Shamel Standard | The Packing Slip is saved (not submitted), added to the Packing Slip List with status Draft | High | Positive | - |
| 173 | 2. Add Packing Slip Screen | TC-APS-122 | Save with all mandatory fields empty | Inventory > Packing Slip > Add Packing Slip | 1. Leave the form empty
2. Click Save | - | A validation error message is displayed for each mandatory field (Delivery Note, Series, Item Code, Qty, Gross Weight UOM) | High | Negative | - |
| 174 | 2. Add Packing Slip Screen | TC-APS-123 | Save a slip with no item rows | Inventory > Packing Slip > Add Packing Slip | 1. Fill the mandatory header fields
2. Do not add rows
3. Click Save | No rows | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one item row is required. |
| 175 | 2. Add Packing Slip Screen | TC-APS-124 | Saved data is displayed correctly when reopened | Inventory > Packing Slip > Add Packing Slip | 1. Save a valid slip
2. Open it from the list | PS-2026-001 | All saved values (header, items, weights) are displayed correctly | High | Positive | - |
| 176 | 2. Add Packing Slip Screen | TC-APS-125 | Submit button is displayed only after Save | Inventory > Packing Slip > Add Packing Slip | 1. Click Save on a valid slip
2. Review the buttons | - | The Submit button is displayed after saving | High | Positive | - |
| 177 | 2. Add Packing Slip Screen | TC-APS-126 | Submit button is hidden before Save | Inventory > Packing Slip > Add Packing Slip | Review the buttons on a new unsaved slip | - | The Submit button is not displayed | Medium | Negative | - |
| 178 | 2. Add Packing Slip Screen | TC-APS-127 | Submit a saved Packing Slip | Inventory > Packing Slip > Add Packing Slip | 1. Save a valid slip
2. Click Submit | Valid saved slip | The Packing Slip is submitted and its status in the list is Submitted | High | Positive | - |
| 179 | 2. Add Packing Slip Screen | TC-APS-128 | Submitting a Packing Slip does not allow later editing | Inventory > Packing Slip > Add Packing Slip | 1. Submit a slip
2. Try to edit any field | - | All fields are read-only | High | Negative | - |
| 180 | 2. Add Packing Slip Screen | TC-APS-129 | Cancel button is displayed only for Submitted slips | Inventory > Packing Slip > Add Packing Slip | Open a Draft slip and a Submitted slip | - | Cancel is hidden for Draft and displayed for Submitted | High | Positive | - |
| 181 | 2. Add Packing Slip Screen | TC-APS-130 | Cancel a Submitted Packing Slip | Inventory > Packing Slip > Add Packing Slip | 1. Open a Submitted slip
2. Click Cancel | - | The slip is cancelled successfully and its status changes to Cancelled | High | Positive | - |
| 182 | 2. Add Packing Slip Screen | TC-APS-131 | Amend button is displayed only for Cancelled slips | Inventory > Packing Slip > Add Packing Slip | Open slips with status Submitted and Cancelled | - | Amend is displayed only for the Cancelled slip | High | Positive | - |
| 183 | 2. Add Packing Slip Screen | TC-APS-132 | Click Amend on a Cancelled Packing Slip | Inventory > Packing Slip > Add Packing Slip | 1. Open a Cancelled slip
2. Click Amend | - | A new Draft slip is created with the data of the cancelled slip and Amended From pointing to it | High | Positive | Needs Clarification: SRS defines when Amend appears but not what happens after clicking it. |
| 184 | 3. Packing Slip Details Screen | TC-PSD-001 | Open Packing Slip Details from the list | Logged in; at least one Packing Slip exists | 1. Click Inventory from the side menu
2. Click Packing Slip
3. Click a Packing Slip ID | PS-2026-001 | The Packing Slip Details screen of the selected slip is displayed | High | Positive | - |
| 185 | 3. Packing Slip Details Screen | TC-PSD-002 | Details display the data entered during creation | Inventory > Packing Slip > click a Packing Slip ID in the table | Open a slip created with known data and compare the fields | DN-0001; MAT-PAC-.YYYY.-; Coffee Mug x6; Gross 4 Kg | All data entered during creation is displayed correctly | High | Positive | - |
| 186 | 3. Packing Slip Details Screen | TC-PSD-003 | Draft: fields are displayed as input fields | Inventory > Packing Slip > click a Packing Slip ID in the table; a Draft slip exists | Open a Draft Packing Slip | Status: Draft | Fields are displayed as editable input fields | High | Positive | - |
| 187 | 3. Packing Slip Details Screen | TC-PSD-004 | Draft: modify and save a slip | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Change Gross Weight and Letter Head
3. Click Save | Gross Weight: 4 > 5 | The changes are saved successfully and displayed after reopening the slip | High | Positive | - |
| 188 | 3. Packing Slip Details Screen | TC-PSD-005 | Draft: clear the Delivery Note and save | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Clear Delivery Note
3. Click Save | - | An error message is displayed because Delivery Note is mandatory | High | Negative | - |
| 189 | 3. Packing Slip Details Screen | TC-PSD-006 | Draft: change the Delivery Note | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Change the Delivery Note
3. Click Save | DN-0001 > DN-0004 | The items are revalidated against the new Delivery Note | Medium | Negative | Needs Clarification: SRS does not say whether the Delivery Note can be changed on a saved slip. |
| 190 | 3. Packing Slip Details Screen | TC-PSD-007 | Draft: clear Series and save | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Clear Series
3. Click Save | - | An error message is displayed because Series is mandatory | Medium | Negative | Needs Clarification: Confirm whether Series stays editable after the document is saved. |
| 191 | 3. Packing Slip Details Screen | TC-PSD-008 | Draft: clear Gross Weight UOM and save | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Clear Gross Weight UOM
3. Click Save | - | An error message is displayed because Gross Weight UOM is mandatory | High | Negative | - |
| 192 | 3. Packing Slip Details Screen | TC-PSD-009 | Draft: Gross Weight smaller than Net Weight | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Enter a Gross Weight smaller than the Packing Slip Net Weight
3. Click Save | Gross: 1; Net: 3.4 | A validation error is displayed | High | Negative | - |
| 193 | 3. Packing Slip Details Screen | TC-PSD-010 | Draft: Qty greater than the Delivery Note quantity | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Increase Qty above the Delivery Note quantity
3. Click Save | Qty: 10 of 6 | A validation error is displayed | High | Negative | Needs Clarification: Validation not defined in the SRS. |
| 194 | 3. Packing Slip Details Screen | TC-PSD-011 | Draft: add an item row | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Click Add Row
3. Select an item and Qty
4. Click Save | Chocolate Bar 100g x4 | The new row is saved and Packing Slip Net Weight is updated | Medium | Positive | - |
| 195 | 3. Packing Slip Details Screen | TC-PSD-012 | Draft: delete an item row | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Select a row
3. Click Delete row
4. Click Save | - | The row is removed and Packing Slip Net Weight is updated | Medium | Positive | - |
| 196 | 3. Packing Slip Details Screen | TC-PSD-013 | Draft: edit a row in the Edit Row popup | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Draft slip
2. Click Edit Row
3. Change Qty and Description
4. Click Update
5. Click Save | Qty: 3 | The changes are saved with the slip | Medium | Positive | - |
| 197 | 3. Packing Slip Details Screen | TC-PSD-014 | Draft: Description validations in Edit Row | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open Edit Row
2. Enter 2 characters in Description
3. Click Update | ab | An error message is displayed (minimum length is 3 characters) | Medium | Negative | - |
| 198 | 3. Packing Slip Details Screen | TC-PSD-015 | Draft: submit from Details | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a saved Draft slip
2. Click Submit | Complete Draft slip | The slip is submitted and its status becomes Submitted | High | Positive | - |
| 199 | 3. Packing Slip Details Screen | TC-PSD-016 | Draft: Delete is not available | Inventory > Packing Slip > click a Packing Slip ID in the table | Open a Draft slip and review the fixed page actions | Status: Draft | The Delete action is not displayed | Medium | Negative | Needs Clarification: SRS says Delete appears only when the status is Submitted. |
| 200 | 3. Packing Slip Details Screen | TC-PSD-017 | Submitted: fields are displayed as read-only labels | Inventory > Packing Slip > click a Packing Slip ID in the table; a Submitted slip exists | Open a Submitted Packing Slip | Status: Submitted | All fields are displayed as read-only labels | High | Positive | - |
| 201 | 3. Packing Slip Details Screen | TC-PSD-018 | Submitted: fields cannot be edited | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Submitted slip
2. Try to change any field | Status: Submitted | No field can be edited | High | Negative | - |
| 202 | 3. Packing Slip Details Screen | TC-PSD-019 | Submitted: item table is read-only | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Submitted slip
2. Look for Add Row / Delete row | - | Rows cannot be added or deleted | High | Negative | Needs Clarification: SRS does not say whether Settings and Edit Row (view only) stay available. |
| 203 | 3. Packing Slip Details Screen | TC-PSD-020 | Submitted: Cancel action is available | Inventory > Packing Slip > click a Packing Slip ID in the table | Open a Submitted slip and review the page actions | Status: Submitted | The Cancel action is available | High | Positive | Needs Clarification: SRS describes Cancel in the Add screen but not in the Details page actions. |
| 204 | 3. Packing Slip Details Screen | TC-PSD-021 | Cancel a Submitted slip from Details | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Submitted slip
2. Click Cancel | - | The slip is cancelled and its status becomes Cancelled | High | Positive | - |
| 205 | 3. Packing Slip Details Screen | TC-PSD-022 | Cancelled: fields are displayed as read-only labels | Inventory > Packing Slip > click a Packing Slip ID in the table; a Cancelled slip exists | Open a Cancelled Packing Slip | Status: Cancelled | All fields are displayed as read-only labels and cannot be edited | High | Positive | - |
| 206 | 3. Packing Slip Details Screen | TC-PSD-023 | Cancelled: Amend action is available | Inventory > Packing Slip > click a Packing Slip ID in the table | Open a Cancelled slip | Status: Cancelled | The Amend button is displayed | High | Positive | - |
| 207 | 3. Packing Slip Details Screen | TC-PSD-024 | Amend a Cancelled slip from Details | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Cancelled slip
2. Click Amend | - | A new Draft slip is created with Amended From populated | High | Positive | Needs Clarification: SRS does not define the result of clicking Amend. |
| 208 | 3. Packing Slip Details Screen | TC-PSD-025 | Amended From is displayed for an amended slip | Inventory > Packing Slip > click a Packing Slip ID in the table; an amended slip exists | Open a slip created through Amend | PS-2026-001-1 | The Amended From label displays the original slip | Medium | Positive | - |
| 209 | 3. Packing Slip Details Screen | TC-PSD-026 | Amended From link opens the original slip | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open an amended slip
2. Click the Amended From link | - | The user is redirected to the original (cancelled) Packing Slip | Medium | Positive | - |
| 210 | 3. Packing Slip Details Screen | TC-PSD-027 | Amended From is hidden for a non-amended slip | Inventory > Packing Slip > click a Packing Slip ID in the table | Open a slip that was not amended from another slip | - | The Amended From field is not displayed | Medium | UI | - |
| 211 | 3. Packing Slip Details Screen | TC-PSD-028 | Fixed page actions are displayed at the top | Inventory > Packing Slip > click a Packing Slip ID in the table | Open any slip and review the top of the page | - | The Assign, Attachment, Tags, Share, Print actions are displayed (Delete is shown only for Submitted slips) | High | UI | - |
| 212 | 3. Packing Slip Details Screen | TC-PSD-029 | Fixed page actions remain visible for all statuses | Inventory > Packing Slip > click a Packing Slip ID in the table | Open slips in each status | Draft, Submitted, Cancelled | The Assign, Attachment, Tags, Share and Print actions are displayed on all of them | Medium | UI | - |
| 213 | 3. Packing Slip Details Screen | TC-PSD-030 | Assign the slip to a user | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Click Assign
2. Select a user
3. Confirm | User: Mona Samir | The slip is assigned to the selected user and the assignment is displayed | Medium | Positive | Needs Clarification: SRS lists Assign without details. |
| 214 | 3. Packing Slip Details Screen | TC-PSD-031 | Add an attachment | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Click Attachment
2. Upload a file | packing-list.pdf | The file is attached to the slip and listed | Medium | Positive | Needs Clarification: Allowed file types and size limit are not defined. |
| 215 | 3. Packing Slip Details Screen | TC-PSD-032 | Remove an attachment | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a slip with an attachment
2. Remove the attachment | packing-list.pdf | The attachment is removed from the slip | Low | Positive | - |
| 216 | 3. Packing Slip Details Screen | TC-PSD-033 | Add a tag | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Click Tags
2. Add a tag | Tag: Fragile | The tag is added to the slip | Low | Positive | - |
| 217 | 3. Packing Slip Details Screen | TC-PSD-034 | Share the slip with a user | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Click Share
2. Select a user and permission
3. Confirm | User: Mona Samir | The slip is shared with the selected user | Medium | Positive | Needs Clarification: SRS lists Share without details. |
| 218 | 3. Packing Slip Details Screen | TC-PSD-035 | Print the slip | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Click Print | - | The print view of the slip is displayed and can be printed | Medium | Positive | - |
| 219 | 3. Packing Slip Details Screen | TC-PSD-036 | Print uses the selected Letter Head | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Select a Letter Head on a slip
2. Click Print | Letter Head: Shamel Standard | The print view shows the selected letter head | Medium | Positive | Needs Clarification: SRS does not describe the print format. |
| 220 | 3. Packing Slip Details Screen | TC-PSD-037 | Delete action is displayed for a Submitted slip only | Inventory > Packing Slip > click a Packing Slip ID in the table | Open slips in each status and review the page actions | Draft, Submitted, Cancelled | Delete appears only for the Submitted slip | High | Positive | Needs Clarification: SRS says Delete appears only when the status is Submitted. Confirm that Cancelled slips cannot be deleted. |
| 221 | 3. Packing Slip Details Screen | TC-PSD-038 | Delete confirmation message | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Submitted slip
2. Click Delete | Status: Submitted | A confirmation message asks the user whether they want to delete this Packing Slip | High | Positive | - |
| 222 | 3. Packing Slip Details Screen | TC-PSD-039 | Cancel the delete confirmation | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a Submitted slip
2. Click Delete
3. Click No (or close the message) | - | The slip is not deleted | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 223 | 3. Packing Slip Details Screen | TC-PSD-040 | Delete a Packing Slip that has no links | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open an unlinked Submitted slip
2. Click Delete
3. Click Yes | Unlinked slip | The Packing Slip is deleted successfully | High | Positive | - |
| 224 | 3. Packing Slip Details Screen | TC-PSD-041 | Delete a Packing Slip that was amended from another slip | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open an amended Submitted slip
2. Click Delete
3. Click Yes | Amended slip | A warning message is displayed with the linked doctypes as hyperlinks; the slip is not deleted | High | Negative | - |
| 225 | 3. Packing Slip Details Screen | TC-PSD-042 | Delete a Packing Slip linked to other transactions | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Open a slip linked to a Shipment
2. Click Delete
3. Click Yes | Slip linked to a Shipment | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks | High | Negative | - |
| 226 | 3. Packing Slip Details Screen | TC-PSD-043 | Linked doctype hyperlinks open the corresponding doctype | Inventory > Packing Slip > click a Packing Slip ID in the table | 1. Trigger the delete message
2. Click a linked doctype | - | The user is redirected to the corresponding doctype | Medium | Positive | - |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Packing Slip List Screen |  |  |  |
| 2. Add Packing Slip Screen |  |  |  |
| 3. Packing Slip Details Screen |  |  |  |
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