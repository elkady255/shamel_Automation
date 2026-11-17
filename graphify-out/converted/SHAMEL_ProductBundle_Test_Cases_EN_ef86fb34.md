<!-- converted from SHAMEL_ProductBundle_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Product Bundle |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Product Bundle) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Product Bundle List Screen | TC-PBL-001 | Display the Product Bundle list | Access via Inventory > Product Bundle | 1. Click Inventory from the side menu
2. Click Product Bundle | - | A table listing all Product Bundles in the system is displayed | High | Positive | - |
| 2 | 1. Product Bundle List Screen | TC-PBL-002 | Add Product Bundle button is displayed | Access via Inventory > Product Bundle | Verify that the Add Product Bundle button is displayed on the list screen | - | The Add Product Bundle button is visible and clickable | Medium | UI | - |
| 3 | 1. Product Bundle List Screen | TC-PBL-003 | Navigate to the Add Product Bundle screen | Access via Inventory > Product Bundle | Click the Add Product Bundle button | - | The user is redirected to the Add Product Bundle screen | High | Positive | - |
| 4 | 1. Product Bundle List Screen | TC-PBL-004 | Display checkbox column for row selection | Access via Inventory > Product Bundle | Open the Product Bundle list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Product Bundle List Screen | TC-PBL-005 | Display Product Bundle ID column | Access via Inventory > Product Bundle | Open the Product Bundle list | - | The Product Bundle ID column is displayed for each row | Medium | UI | - |
| 6 | 1. Product Bundle List Screen | TC-PBL-006 | Open the Product Bundle popup by clicking the ID | Access via Inventory > Product Bundle | Click a Product Bundle ID in the table | Bundle ID: Gift Box Bundle | A popup is displayed containing the fields defined in the creation form to view or edit the Product Bundle details | High | Positive | - |
| 7 | 1. Product Bundle List Screen | TC-PBL-007 | Display Status column with a valid value | Access via Inventory > Product Bundle | Open the Product Bundle list and review the Status column | Active and Disabled bundles | Each row shows exactly one of: Active, Disabled | High | Positive | - |
| 8 | 1. Product Bundle List Screen | TC-PBL-008 | Status of a newly saved Product Bundle is Active | Access via Inventory > Product Bundle | 1. Add and save a new Product Bundle
2. Return to the Product Bundle list | Parent Item: Gift Box Bundle | The new Product Bundle appears in the list with the status Active | High | Positive | - |
| 9 | 1. Product Bundle List Screen | TC-PBL-009 | Status changes to Disabled after the bundle is disabled | Access via Inventory > Product Bundle | 1. Open an Active Product Bundle
2. Enable the Disabled checkbox and save
3. Return to the list | Bundle: Gift Box Bundle | The Product Bundle is displayed with the status Disabled | High | Positive | - |
| 10 | 1. Product Bundle List Screen | TC-PBL-010 | Display Parent Item column | Access via Inventory > Product Bundle | Open the Product Bundle list and review the Parent Item column | Parent Item: Gift Box Bundle | The Parent Item Name is displayed for each Product Bundle | Medium | UI | - |
| 11 | 1. Product Bundle List Screen | TC-PBL-011 | Display Description column | Access via Inventory > Product Bundle | Open the Product Bundle list and review the Description column | Description: Holiday gift set | The Product Bundle Description is displayed for each row | Medium | UI | - |
| 12 | 1. Product Bundle List Screen | TC-PBL-012 | Action bar appears when one row is selected | Access via Inventory > Product Bundle | Select the checkbox of one Product Bundle | - | An action bar appears showing the available actions | High | Positive | - |
| 13 | 1. Product Bundle List Screen | TC-PBL-013 | Action bar appears when multiple rows are selected | Access via Inventory > Product Bundle | Select the checkboxes of three Product Bundles | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 14 | 1. Product Bundle List Screen | TC-PBL-014 | Action bar disappears when all rows are deselected | Access via Inventory > Product Bundle | 1. Select one Product Bundle
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 15 | 1. Product Bundle List Screen | TC-PBL-015 | Action bar contains all required actions | Access via Inventory > Product Bundle | Select a Product Bundle and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete | Medium | UI | - |
| 16 | 1. Product Bundle List Screen | TC-PBL-016 | Open the Edit popup | Access via Inventory > Product Bundle | 1. Select a Product Bundle
2. Click Edit | - | A popup is displayed containing the Field dropdown, the Value field and the Update button | High | Positive | - |
| 17 | 1. Product Bundle List Screen | TC-PBL-017 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Product Bundle | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Product Bundle and allows selecting only one option | Medium | Positive | - |
| 18 | 1. Product Bundle List Screen | TC-PBL-018 | Click Update without selecting a Field | Access via Inventory > Product Bundle | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because Field is mandatory | Medium | Negative | - |
| 19 | 1. Product Bundle List Screen | TC-PBL-019 | Value input type changes dynamically based on the selected Field | Access via Inventory > Product Bundle | 1. Open the Edit popup
2. Select Field = Parent Item and note the Value input type
3. Select Field = Description and note the Value input type | Parent Item, Description | The Value field changes its input type (searchable dropdown for Parent Item, text input for Description) according to the selected field | High | Positive | - |
| 20 | 1. Product Bundle List Screen | TC-PBL-020 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Product Bundle | 1. Open the Edit popup
2. Select Field = Parent Item
3. Leave Value empty and click Update | Field: Parent Item | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 21 | 1. Product Bundle List Screen | TC-PBL-021 | Value field applies the validation rules of the selected Field | Access via Inventory > Product Bundle | 1. Open the Edit popup
2. Select Field = Description
3. Enter 1 character and click Update | Value: a | A validation error message is displayed (minimum length is 2 characters) and the bundle is not changed | Medium | Negative | - |
| 22 | 1. Product Bundle List Screen | TC-PBL-022 | Update a Product Bundle successfully | Access via Inventory > Product Bundle | 1. Select an Active Product Bundle
2. Click Edit
3. Select Field = Description
4. Enter a new Value
5. Click Update | Value: Updated holiday gift set | The Product Bundle is updated successfully and the new Description is displayed in the list | High | Positive | - |
| 23 | 1. Product Bundle List Screen | TC-PBL-023 | Edit a Disabled Product Bundle | Access via Inventory > Product Bundle | 1. Select a Disabled Product Bundle
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Disabled | To be confirmed with the BA (allowed or blocked) | Medium | Positive | Needs Clarification: SRS does not say whether a Disabled bundle can be edited. |
| 24 | 1. Product Bundle List Screen | TC-PBL-024 | Edit with multiple Product Bundles selected | Access via Inventory > Product Bundle | 1. Select two Product Bundles
2. Click Edit
3. Select Field = Description and a Value
4. Click Update | Two bundles | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection. |
| 25 | 1. Product Bundle List Screen | TC-PBL-025 | Edit popup: Update with invalid or incomplete data | Access via Inventory > Product Bundle | 1. Open the Edit popup
2. Select a Field
3. Enter invalid data
4. Click Update | Description: <script>x</script> | A validation error message is displayed and the bundle is not updated | Medium | Negative | Needs Clarification: SRS describes only the success case of Update. Error behavior is assumed. |
| 26 | 1. Product Bundle List Screen | TC-PBL-026 | Export selected Product Bundles | Access via Inventory > Product Bundle | 1. Select one or more Product Bundles
2. Click Export | - | The selected Product Bundles are exported | Medium | Positive | Needs Clarification: SRS lists Export without details (file format, exported fields). |
| 27 | 1. Product Bundle List Screen | TC-PBL-027 | Assign selected Product Bundles to a user | Access via Inventory > Product Bundle | 1. Select a Product Bundle
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The Product Bundle is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 28 | 1. Product Bundle List Screen | TC-PBL-028 | Clear assignment of a Product Bundle | Access via Inventory > Product Bundle | 1. Select an assigned Product Bundle
2. Click Clear assignment | Assigned bundle | The assignment is cleared from the Product Bundle | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 29 | 1. Product Bundle List Screen | TC-PBL-029 | Add tags to a Product Bundle | Access via Inventory > Product Bundle | 1. Select a Product Bundle
2. Click Add tags
3. Enter a tag and confirm | Tag: Seasonal | The tag is added to the Product Bundle | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 30 | 1. Product Bundle List Screen | TC-PBL-030 | Print selected Product Bundles | Access via Inventory > Product Bundle | 1. Select a Product Bundle
2. Click Print | - | The print view of the Product Bundle is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 31 | 1. Product Bundle List Screen | TC-PBL-031 | Confirmation message is displayed when clicking Delete | Access via Inventory > Product Bundle | 1. Select a Product Bundle
2. Click Delete | - | A confirmation message asks the user whether they want to delete this Product Bundle | High | Positive | - |
| 32 | 1. Product Bundle List Screen | TC-PBL-032 | Cancel the delete confirmation | Access via Inventory > Product Bundle | 1. Select a Product Bundle
2. Click Delete
3. Click No (or close the message) | - | The Product Bundle is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. Confirm the No/close behavior. |
| 33 | 1. Product Bundle List Screen | TC-PBL-033 | Delete a Product Bundle that has no links | Access via Inventory > Product Bundle | 1. Select an unlinked Product Bundle
2. Click Delete
3. Click Yes | Unlinked bundle | The Product Bundle is deleted successfully and removed from the list | High | Positive | - |
| 34 | 1. Product Bundle List Screen | TC-PBL-034 | Delete a Product Bundle linked to other transactions | Access via Inventory > Product Bundle | 1. Select a Product Bundle used in other transactions
2. Click Delete
3. Click Yes | Bundle used in a Sales Invoice | A message informs the user that the linked transactions must be deleted before the Product Bundle can be deleted. The bundle is not deleted | High | Negative | - |
| 35 | 1. Product Bundle List Screen | TC-PBL-035 | Linked transactions in the delete message are hyperlinks | Access via Inventory > Product Bundle | 1. Trigger the delete message for a linked bundle
2. Click a linked doctype in the message | Bundle used in a Sales Invoice | Linked doctypes are shown as hyperlinks and the user is redirected to the corresponding doctype | Medium | Positive | - |
| 36 | 1. Product Bundle List Screen | TC-PBL-036 | Delete multiple Product Bundles at once | Access via Inventory > Product Bundle | 1. Select two unlinked bundles
2. Click Delete
3. Click Yes | Two unlinked bundles | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define behavior for a mix of linked and unlinked bundles. |
| 37 | 1. Product Bundle List Screen | TC-PBL-037 | Parent Item status after deleting a Product Bundle | Access via Inventory > Product Bundle | 1. Delete an unlinked Product Bundle
2. Open its Parent Item in the Item doctype | Parent Item: Gift Box Bundle | To be confirmed with the BA (Item status after the bundle is removed) | Medium | Positive | Needs Clarification: SRS says the Item status changes to Bundle on save but not what happens on delete. |
| 38 | 1. Product Bundle List Screen | TC-PBL-038 | Product Bundle list when there are no bundles | Access via Inventory > Product Bundle | Open the Product Bundle list in a system with no bundles | No bundles | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. Expected behavior is a standard assumption. |
| 39 | 1. Product Bundle List Screen | TC-PBL-039 | User without permission cannot access Product Bundle | Access via Inventory > Product Bundle | 1. Log in with a user that has no permission for Product Bundle
2. Open the sidebar | Restricted user | The Product Bundle menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 40 | 2. Add Product Bundle Screen | TC-APB-001 | Open the Add Product Bundle screen | Logged in with a user that has Product Bundle access | 1. Click Inventory from the side menu
2. Click Product Bundle
3. Click Add Product Bundle | - | The Add Product Bundle screen is displayed with an empty form | High | Positive | - |
| 41 | 2. Add Product Bundle Screen | TC-APB-002 | Parent Item is a searchable dropdown | Inventory > Product Bundle > Add Product Bundle | Click Parent Item and type part of an item name | Gift | The list is filtered while typing (autocomplete) and shows matching items | High | Positive | - |
| 42 | 2. Add Product Bundle Screen | TC-APB-003 | Parent Item lists only items with Is Bundle Item enabled | Inventory > Product Bundle > Add Product Bundle | Open the Parent Item dropdown | Item A: Is Bundle Item = Yes; Item B: Is Bundle Item = No | Item A is listed and Item B is not listed | High | Positive | - |
| 43 | 2. Add Product Bundle Screen | TC-APB-004 | Parent Item does not list items with Maintains Stock enabled | Inventory > Product Bundle > Add Product Bundle | Search for an item that has Is Bundle Item enabled and Maintains Stock enabled | Item: Stock Bundle Item | The item is not listed | High | Negative | - |
| 44 | 2. Add Product Bundle Screen | TC-APB-005 | Parent Item does not list fixed assets | Inventory > Product Bundle > Add Product Bundle | Search for an item that has Is Bundle Item enabled and Is Fixed Asset enabled | Item: Asset Bundle Item | The item is not listed | High | Negative | - |
| 45 | 2. Add Product Bundle Screen | TC-APB-006 | Select a Parent Item | Inventory > Product Bundle > Add Product Bundle | Search for and select a valid Parent Item | Gift Box Bundle | The value is accepted | High | Positive | - |
| 46 | 2. Add Product Bundle Screen | TC-APB-007 | Parent Item search with no matching result | Inventory > Product Bundle > Add Product Bundle | Type a non-existing item name in Parent Item | ZZZ Unknown | No results are displayed and no value can be selected | Low | Negative | - |
| 47 | 2. Add Product Bundle Screen | TC-APB-008 | Leave Parent Item empty | Inventory > Product Bundle > Add Product Bundle | 1. Leave Parent Item empty
2. Fill the other fields
3. Click Save | - | An error message is displayed because Parent Item is mandatory | High | Negative | - |
| 48 | 2. Add Product Bundle Screen | TC-APB-009 | Parent Item accepts a single selection only | Inventory > Product Bundle > Add Product Bundle | Select a Parent Item and then select a different one | Two items | Only one Parent Item can be selected | Low | Positive | - |
| 49 | 2. Add Product Bundle Screen | TC-APB-010 | Create a second bundle for a Parent Item that already has a bundle | Inventory > Product Bundle > Add Product Bundle | 1. Select a Parent Item that already has a Product Bundle
2. Add valid items
3. Click Save | Parent Item: Gift Box Bundle (already used) | To be confirmed with the BA (duplicate blocked or allowed) | High | Negative | Needs Clarification: SRS does not say whether one Parent Item can have more than one Product Bundle. |
| 50 | 2. Add Product Bundle Screen | TC-APB-011 | Disabled checkbox is hidden before saving | Inventory > Product Bundle > Add Product Bundle | Review the form of a new Product Bundle | - | The Disabled checkbox is not displayed | High | UI | - |
| 51 | 2. Add Product Bundle Screen | TC-APB-012 | Disabled checkbox is displayed after saving | Inventory > Product Bundle > Add Product Bundle | 1. Save a valid Product Bundle
2. Review the form | - | The Disabled checkbox is displayed and unchecked | High | Positive | - |
| 52 | 2. Add Product Bundle Screen | TC-APB-013 | Disable a saved Product Bundle | Inventory > Product Bundle > Add Product Bundle | 1. Save a valid bundle
2. Check Disabled
3. Save | - | The bundle is saved and its status in the list is Disabled | High | Positive | - |
| 53 | 2. Add Product Bundle Screen | TC-APB-014 | Disabled bundle cannot be used in transactions | Inventory > Product Bundle > Add Product Bundle | 1. Disable a Product Bundle
2. Create a transaction that uses the Parent Item (e.g., Sales Order) | Parent Item: Gift Box Bundle | The disabled bundle is not applied in the transaction | High | Negative | Needs Clarification: SRS does not list which transactions use bundles; confirm the transactions to be tested. |
| 54 | 2. Add Product Bundle Screen | TC-APB-015 | Disabled bundle still appears in reports and historical transactions | Inventory > Product Bundle > Add Product Bundle | 1. Disable a bundle that was used in an old transaction
2. Open the old transaction and the related report | - | The old transaction and report still show the disabled bundle | Medium | Positive | - |
| 55 | 2. Add Product Bundle Screen | TC-APB-016 | Description accepts valid text | Inventory > Product Bundle > Add Product Bundle | Enter valid text in Description | Holiday gift set | The value is accepted | Medium | Positive | - |
| 56 | 2. Add Product Bundle Screen | TC-APB-017 | Leave Description empty | Inventory > Product Bundle > Add Product Bundle | 1. Fill the mandatory fields
2. Leave Description empty
3. Click Save | - | The Product Bundle is saved (field is optional) | Medium | Positive | - |
| 57 | 2. Add Product Bundle Screen | TC-APB-018 | Description shorter than the minimum length (1 character) | Inventory > Product Bundle > Add Product Bundle | 1. Enter 1 character in Description
2. Click Save | a | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 58 | 2. Add Product Bundle Screen | TC-APB-019 | Description at the minimum length (2 characters) | Inventory > Product Bundle > Add Product Bundle | Enter 2 characters in Description | ab | The value is accepted | Medium | Positive | - |
| 59 | 2. Add Product Bundle Screen | TC-APB-020 | Description at the maximum length (100 characters) | Inventory > Product Bundle > Add Product Bundle | Enter exactly 100 characters in Description | 100-character text | The value is accepted | Medium | Positive | - |
| 60 | 2. Add Product Bundle Screen | TC-APB-021 | Description longer than 100 characters | Inventory > Product Bundle > Add Product Bundle | Try to enter or paste 101 characters in Description | 101-character text | Input stops at 100 characters; extra characters are prevented | Medium | Negative | - |
| 61 | 2. Add Product Bundle Screen | TC-APB-022 | Description accepts letters, numbers and special characters | Inventory > Product Bundle > Add Product Bundle | Enter a mix of letters, numbers and special characters in Description | Set #1 - 3 items (promo) @2026 | The value is accepted | Medium | Positive | - |
| 62 | 2. Add Product Bundle Screen | TC-APB-023 | Description rejects invalid data | Inventory > Product Bundle > Add Product Bundle | 1. Enter invalid content such as script tags
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 63 | 2. Add Product Bundle Screen | TC-APB-024 | Items table displays the default columns | Inventory > Product Bundle > Add Product Bundle | Open the Add screen and review the Items table | - | The table shows: Checkbox, No., Item, Qty, Description, UOM | Medium | UI | - |
| 64 | 2. Add Product Bundle Screen | TC-APB-025 | Add Row adds a new item row | Inventory > Product Bundle > Add Product Bundle | Click Add Row in the Items table | - | A new empty row is added to the table | High | Positive | - |
| 65 | 2. Add Product Bundle Screen | TC-APB-026 | Rows are numbered in order | Inventory > Product Bundle > Add Product Bundle | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 66 | 2. Add Product Bundle Screen | TC-APB-027 | Item is a searchable dropdown | Inventory > Product Bundle > Add Product Bundle | Click Item in a row and type part of an item name | Choco | The list is filtered while typing and shows matching items | High | Positive | - |
| 67 | 2. Add Product Bundle Screen | TC-APB-028 | Item lists only items with Has Variants disabled | Inventory > Product Bundle > Add Product Bundle | Open the Item dropdown | Template item (Has Variants = Yes); Chocolate Bar 100g (Has Variants = No) | The template item is not listed; Chocolate Bar 100g is listed | High | Negative | - |
| 68 | 2. Add Product Bundle Screen | TC-APB-029 | Select an Item | Inventory > Product Bundle > Add Product Bundle | Search for and select an Item | Chocolate Bar 100g | The value is accepted | High | Positive | - |
| 69 | 2. Add Product Bundle Screen | TC-APB-030 | UOM is filled automatically after selecting an Item | Inventory > Product Bundle > Add Product Bundle | Select an Item in a row | Item: Chocolate Bar 100g (UOM: Nos) | The UOM column shows the UOM of the selected item | High | Positive | - |
| 70 | 2. Add Product Bundle Screen | TC-APB-031 | UOM is a read-only label | Inventory > Product Bundle > Add Product Bundle | Select an Item and try to edit the UOM | - | UOM cannot be edited | Medium | UI | - |
| 71 | 2. Add Product Bundle Screen | TC-APB-032 | UOM updates when the Item changes | Inventory > Product Bundle > Add Product Bundle | 1. Select Item A
2. Change the row to Item B with a different UOM | Nos > Kg | UOM shows the UOM of Item B | Medium | Positive | - |
| 72 | 2. Add Product Bundle Screen | TC-APB-033 | Leave Item empty in a row | Inventory > Product Bundle > Add Product Bundle | 1. Add a row
2. Leave Item empty
3. Enter Qty
4. Click Save | Qty: 2 | An error message is displayed because Item is mandatory | High | Negative | - |
| 73 | 2. Add Product Bundle Screen | TC-APB-034 | Item search with no matching result | Inventory > Product Bundle > Add Product Bundle | Type a non-existing item name in Item | ZZZ Unknown | No results are displayed and no value can be selected | Low | Negative | - |
| 74 | 2. Add Product Bundle Screen | TC-APB-035 | Use the same item twice in the Items table | Inventory > Product Bundle > Add Product Bundle | 1. Add two rows with the same Item
2. Click Save | Item: Coffee Mug (x2 rows) | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define duplicate item rows. |
| 75 | 2. Add Product Bundle Screen | TC-APB-036 | Select the Parent Item as a child item | Inventory > Product Bundle > Add Product Bundle | 1. Select Parent Item = Gift Box Bundle
2. Add a row with Item = Gift Box Bundle
3. Click Save | Gift Box Bundle | To be confirmed with the BA (expected to be blocked) | Medium | Negative | Needs Clarification: SRS does not define this circular case. |
| 76 | 2. Add Product Bundle Screen | TC-APB-037 | Qty accepts a valid number | Inventory > Product Bundle > Add Product Bundle | Enter a valid number in Qty | 2 | The value is accepted | High | Positive | - |
| 77 | 2. Add Product Bundle Screen | TC-APB-038 | Leave Qty empty | Inventory > Product Bundle > Add Product Bundle | 1. Add a row with an Item
2. Leave Qty empty
3. Click Save | - | An error message is displayed because Qty is mandatory | High | Negative | - |
| 78 | 2. Add Product Bundle Screen | TC-APB-039 | Qty rejects letters and special characters | Inventory > Product Bundle > Add Product Bundle | Type letters and special characters in Qty | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 79 | 2. Add Product Bundle Screen | TC-APB-040 | Qty at the maximum length (100 digits) | Inventory > Product Bundle > Add Product Bundle | Enter exactly 100 digits in Qty | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | Needs Clarification: A 100-digit quantity is unrealistic. Confirm the real maximum value allowed. |
| 80 | 2. Add Product Bundle Screen | TC-APB-041 | Qty longer than 100 characters | Inventory > Product Bundle > Add Product Bundle | Try to enter 101 digits in Qty | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 81 | 2. Add Product Bundle Screen | TC-APB-042 | Qty equal to zero | Inventory > Product Bundle > Add Product Bundle | 1. Enter 0 in Qty
2. Click Save | 0 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value for Qty. |
| 82 | 2. Add Product Bundle Screen | TC-APB-043 | Qty with a negative number | Inventory > Product Bundle > Add Product Bundle | Try to enter a negative number in Qty | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS says numbers only; it is not clear whether '-' is allowed. |
| 83 | 2. Add Product Bundle Screen | TC-APB-044 | Qty with decimal values | Inventory > Product Bundle > Add Product Bundle | 1. Enter a decimal number in Qty
2. Click Save | 1.5 | To be confirmed with the BA (accepted or rejected) | Medium | Positive | Needs Clarification: SRS does not say whether decimals are allowed. |
| 84 | 2. Add Product Bundle Screen | TC-APB-045 | Row Description accepts valid text | Inventory > Product Bundle > Add Product Bundle | Enter valid text in Description of a row | Dark chocolate | The value is accepted | Medium | Positive | - |
| 85 | 2. Add Product Bundle Screen | TC-APB-046 | Leave row Description empty | Inventory > Product Bundle > Add Product Bundle | 1. Fill Item and Qty
2. Leave Description empty
3. Click Save | - | The row is saved (field is optional) | Medium | Positive | - |
| 86 | 2. Add Product Bundle Screen | TC-APB-047 | Row Description shorter than the minimum length (1 character) | Inventory > Product Bundle > Add Product Bundle | 1. Enter 1 character in the row Description
2. Click Save | a | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 87 | 2. Add Product Bundle Screen | TC-APB-048 | Row Description at the minimum length (2 characters) | Inventory > Product Bundle > Add Product Bundle | Enter 2 characters in the row Description | ab | The value is accepted | Low | Positive | - |
| 88 | 2. Add Product Bundle Screen | TC-APB-049 | Row Description at the maximum length (100 characters) | Inventory > Product Bundle > Add Product Bundle | Enter exactly 100 characters in the row Description | 100-character text | The value is accepted | Low | Positive | - |
| 89 | 2. Add Product Bundle Screen | TC-APB-050 | Row Description longer than 100 characters | Inventory > Product Bundle > Add Product Bundle | Try to enter 101 characters in the row Description | 101-character text | Input stops at 100 characters | Medium | Negative | - |
| 90 | 2. Add Product Bundle Screen | TC-APB-051 | Row Description rejects invalid data | Inventory > Product Bundle > Add Product Bundle | 1. Enter invalid content such as script tags
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 91 | 2. Add Product Bundle Screen | TC-APB-052 | Action bar appears when an item row is selected | Inventory > Product Bundle > Add Product Bundle | Select the checkbox of an item row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 92 | 2. Add Product Bundle Screen | TC-APB-053 | Delete a single item row | Inventory > Product Bundle > Add Product Bundle | 1. Select one row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 93 | 2. Add Product Bundle Screen | TC-APB-054 | Delete multiple item rows | Inventory > Product Bundle > Add Product Bundle | 1. Select two rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 94 | 2. Add Product Bundle Screen | TC-APB-055 | Open the Edit Row popup | Inventory > Product Bundle > Add Product Bundle | Click the Edit Row icon of an item row | - | A popup is displayed with the row fields | High | Positive | - |
| 95 | 2. Add Product Bundle Screen | TC-APB-056 | Edit Row popup displays the fields | Inventory > Product Bundle > Add Product Bundle | Open the Edit Row popup and review the fields | - | The popup shows: Item, Qty, Description, UOM. The Rate field is hidden | Medium | UI | - |
| 96 | 2. Add Product Bundle Screen | TC-APB-057 | Edit Row: Item is mandatory | Inventory > Product Bundle > Add Product Bundle | 1. Open Edit Row
2. Clear Item
3. Click Update | - | An error message is displayed because Item is mandatory | Medium | Negative | - |
| 97 | 2. Add Product Bundle Screen | TC-APB-058 | Edit Row: Item lists only items with Has Variants disabled | Inventory > Product Bundle > Add Product Bundle | Open Edit Row and open the Item dropdown | Template item (Has Variants = Yes) | Template items are not listed | Medium | Negative | - |
| 98 | 2. Add Product Bundle Screen | TC-APB-059 | Edit Row: Qty is mandatory and numeric | Inventory > Product Bundle > Add Product Bundle | 1. Open Edit Row
2. Clear Qty / type letters
3. Click Update | abc | An error message is displayed for the empty value; letters are rejected | Medium | Negative | - |
| 99 | 2. Add Product Bundle Screen | TC-APB-060 | Edit Row: Description is a text area with length limits | Inventory > Product Bundle > Add Product Bundle | 1. Open Edit Row
2. Enter 1 character, then 101 characters in Description | a / 101-character text | 1 character shows an error; input stops at 100 characters | Medium | Negative | - |
| 100 | 2. Add Product Bundle Screen | TC-APB-061 | Edit Row: Description accepts valid text | Inventory > Product Bundle > Add Product Bundle | Enter valid text in the Edit Row Description | Dark chocolate | The value is accepted | Low | Positive | - |
| 101 | 2. Add Product Bundle Screen | TC-APB-062 | Edit Row: UOM is a read-only label | Inventory > Product Bundle > Add Product Bundle | Open Edit Row and review UOM | - | UOM shows the UOM of the selected item and cannot be edited | Medium | UI | - |
| 102 | 2. Add Product Bundle Screen | TC-APB-063 | Edit Row: Rate is hidden | Inventory > Product Bundle > Add Product Bundle | Open Edit Row and look for Rate | - | The Rate field is not visible to the user | Medium | UI | Needs Clarification: SRS says Rate is hidden but based on a price list. Confirm which price list and where the value is used. |
| 103 | 2. Add Product Bundle Screen | TC-APB-064 | Edit Row: save changes with Update | Inventory > Product Bundle > Add Product Bundle | 1. Open Edit Row
2. Change Item and Qty
3. Click Update | Item: Coffee Mug; Qty: 4 | The popup closes and the changes are reflected in the row | High | Positive | - |
| 104 | 2. Add Product Bundle Screen | TC-APB-065 | Open the table Settings popup | Inventory > Product Bundle > Add Product Bundle | Click Setting on the Items table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 105 | 2. Add Product Bundle Screen | TC-APB-066 | Reorder columns using drag and drop | Inventory > Product Bundle > Add Product Bundle | 1. Open Setting
2. Drag the Qty column header and drop it before Item | - | The column order changes to the new position | Medium | Positive | - |
| 106 | 2. Add Product Bundle Screen | TC-APB-067 | Column width default value is 3 | Inventory > Product Bundle > Add Product Bundle | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 107 | 2. Add Product Bundle Screen | TC-APB-068 | Column width accepts numbers only | Inventory > Product Bundle > Add Product Bundle | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 108 | 2. Add Product Bundle Screen | TC-APB-069 | Column width left empty | Inventory > Product Bundle > Add Product Bundle | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 109 | 2. Add Product Bundle Screen | TC-APB-070 | Column width with 1 character | Inventory > Product Bundle > Add Product Bundle | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 110 | 2. Add Product Bundle Screen | TC-APB-071 | Column width longer than 3 characters | Inventory > Product Bundle > Add Product Bundle | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 111 | 2. Add Product Bundle Screen | TC-APB-072 | Add / Remove Columns popup lists all columns | Inventory > Product Bundle > Add Product Bundle | Click Add / Remove columns | - | A popup lists all columns with checkboxes: Item, Qty, Description, UOM | Medium | UI | - |
| 112 | 2. Add Product Bundle Screen | TC-APB-073 | Hide a column | Inventory > Product Bundle > Add Product Bundle | 1. Open Add / Remove columns
2. Clear the Description checkbox
3. Click Update | Column: Description | The Description column is hidden from the table | Medium | Positive | - |
| 113 | 2. Add Product Bundle Screen | TC-APB-074 | Show a hidden column | Inventory > Product Bundle > Add Product Bundle | 1. Hide the Description column
2. Open Add / Remove columns
3. Select the Description checkbox
4. Click Update | Column: Description | The Description column is displayed again | Medium | Positive | - |
| 114 | 2. Add Product Bundle Screen | TC-APB-075 | Save the Settings using Update | Inventory > Product Bundle > Add Product Bundle | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 115 | 2. Add Product Bundle Screen | TC-APB-076 | Reset Settings to default | Inventory > Product Bundle > Add Product Bundle | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 116 | 2. Add Product Bundle Screen | TC-APB-077 | Save a Product Bundle with valid data | Inventory > Product Bundle > Add Product Bundle | 1. Select a Parent Item
2. Add at least one item with Qty
3. Click Save | Parent Item: Gift Box Bundle; Description: Holiday gift set; Item: Chocolate Bar 100g, Qty: 2; Item: Coffee Mug, Qty: 1 | The Product Bundle is saved successfully and added to the Product Bundle List with status Active | High | Positive | - |
| 117 | 2. Add Product Bundle Screen | TC-APB-078 | Parent Item status changes to Bundle after Save | Inventory > Product Bundle > Add Product Bundle | 1. Save a valid Product Bundle
2. Open the Parent Item in the Item doctype | Parent Item: Gift Box Bundle | The status of the Parent Item in the Item doctype is Bundle | High | Positive | - |
| 118 | 2. Add Product Bundle Screen | TC-APB-079 | Save with all mandatory fields empty | Inventory > Product Bundle > Add Product Bundle | 1. Leave the form empty
2. Add an empty row
3. Click Save | - | A validation error message is displayed for each invalid field (Parent Item, Item, Qty) | High | Negative | - |
| 119 | 2. Add Product Bundle Screen | TC-APB-080 | Save a bundle with no item rows | Inventory > Product Bundle > Add Product Bundle | 1. Select a Parent Item
2. Do not add rows
3. Click Save | No rows | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one item row is required. |
| 120 | 2. Add Product Bundle Screen | TC-APB-081 | Save with a row that has Item but no Qty | Inventory > Product Bundle > Add Product Bundle | 1. Add a row with Item only
2. Click Save | Item: Coffee Mug | A validation error is displayed for Qty and the bundle is not saved | High | Negative | - |
| 121 | 2. Add Product Bundle Screen | TC-APB-082 | Save with a row that has Qty but no Item | Inventory > Product Bundle > Add Product Bundle | 1. Add a row with Qty only
2. Click Save | Qty: 2 | A validation error is displayed for Item and the bundle is not saved | High | Negative | - |
| 122 | 2. Add Product Bundle Screen | TC-APB-083 | Saved data is displayed correctly when reopened | Inventory > Product Bundle > Add Product Bundle | 1. Save a valid bundle
2. Open it from the list | Gift Box Bundle | All saved values (Parent Item, Description, Items, Qty, UOM) are displayed correctly | High | Positive | - |
| 123 | 2. Add Product Bundle Screen | TC-APB-084 | Parent Item status after disabling the bundle | Inventory > Product Bundle > Add Product Bundle | 1. Save a bundle
2. Disable it
3. Open the Parent Item in the Item doctype | Parent Item: Gift Box Bundle | To be confirmed with the BA (Item status after the bundle is disabled) | Medium | Positive | Needs Clarification: SRS does not define the Item status when the bundle is disabled. |
| 124 | 3. Product Bundle Details Popup | TC-PBD-001 | Popup displays the fields defined in the creation form | Inventory > Product Bundle > click a Product Bundle ID in the table | Click a Product Bundle ID | Bundle: Gift Box Bundle | The popup shows Parent Item, Disabled, Description and the Items table | High | Positive | - |
| 125 | 3. Product Bundle Details Popup | TC-PBD-002 | Popup displays the data entered during creation | Inventory > Product Bundle > click a Product Bundle ID in the table | Open a bundle created with known data and compare the fields | Parent Item: Gift Box Bundle; Description: Holiday gift set; Items: Chocolate Bar 100g x2, Coffee Mug x1 | All data entered during creation is displayed correctly | High | Positive | - |
| 126 | 3. Product Bundle Details Popup | TC-PBD-003 | Disabled checkbox is displayed for a saved bundle | Inventory > Product Bundle > click a Product Bundle ID in the table | Open a saved Product Bundle | - | The Disabled checkbox is displayed (it appears only after saving) | Medium | Positive | - |
| 127 | 3. Product Bundle Details Popup | TC-PBD-004 | Edit the Description from the popup | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open a Product Bundle
2. Change the Description
3. Save the changes | Description: Updated holiday gift set | The Description is updated and displayed in the list | High | Positive | Needs Clarification: SRS does not describe how the popup is saved (button name and behavior). |
| 128 | 3. Product Bundle Details Popup | TC-PBD-005 | Edit the Description with fewer than 2 characters in the popup | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open a Product Bundle
2. Enter 1 character in Description
3. Save | a | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 129 | 3. Product Bundle Details Popup | TC-PBD-006 | Clear the Parent Item in the popup | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open a Product Bundle
2. Clear Parent Item
3. Save | - | An error message is displayed because Parent Item is mandatory | Medium | Negative | - |
| 130 | 3. Product Bundle Details Popup | TC-PBD-007 | Add an item row from the popup | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open a Product Bundle
2. Click Add Row
3. Select Item and enter Qty
4. Save | Item: Ceramic Plate; Qty: 3 | The new item row is saved with the bundle | Medium | Positive | - |
| 131 | 3. Product Bundle Details Popup | TC-PBD-008 | Delete an item row from the popup | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open a Product Bundle with two item rows
2. Select one row
3. Click Delete row
4. Save | - | The row is removed from the bundle | Medium | Positive | - |
| 132 | 3. Product Bundle Details Popup | TC-PBD-009 | Change the Qty of an item from the popup | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open a Product Bundle
2. Change Qty of a row
3. Save | Qty: 2 > 5 | The new Qty is saved | Medium | Positive | - |
| 133 | 3. Product Bundle Details Popup | TC-PBD-010 | Disable a Product Bundle from the popup | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open an Active Product Bundle
2. Enable Disabled
3. Save | Bundle: Gift Box Bundle | The bundle is saved and its status in the list becomes Disabled | High | Positive | - |
| 134 | 3. Product Bundle Details Popup | TC-PBD-011 | Re-enable a Disabled Product Bundle | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open a Disabled Product Bundle
2. Clear Disabled
3. Save | Bundle: Gift Box Bundle | The bundle becomes Active again | Medium | Positive | Needs Clarification: SRS does not say whether a Disabled bundle can be re-activated. |
| 135 | 3. Product Bundle Details Popup | TC-PBD-012 | Popup of a Disabled bundle | Inventory > Product Bundle > click a Product Bundle ID in the table | Open a Disabled Product Bundle | Status: Disabled | To be confirmed with the BA (fields editable or read-only) | Medium | Positive | Needs Clarification: SRS does not define whether fields are editable when the bundle is Disabled. |
| 136 | 3. Product Bundle Details Popup | TC-PBD-013 | Close the popup without saving | Inventory > Product Bundle > click a Product Bundle ID in the table | 1. Open a Product Bundle
2. Change the Description
3. Close the popup | - | The changes are not saved and the list shows the old values | Medium | Negative | - |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Product Bundle List Screen |  |  |  |
| 2. Add Product Bundle Screen |  |  |  |
| 3. Product Bundle Details Popup |  |  |  |
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