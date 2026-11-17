<!-- converted from SHAMEL_ShippingRule_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Shipping Rule |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Shipping Rule) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Shipping Rule List Screen | TC-SRL-001 | Display the Shipping Rule list | Access via Inventory > Shipping Rule | 1. Click Inventory from the side menu
2. Click Shipping Rule | - | A table listing all Shipping Rules in the system is displayed | High | Positive | - |
| 2 | 1. Shipping Rule List Screen | TC-SRL-002 | Add Shipping Rule button is displayed | Access via Inventory > Shipping Rule | Verify that the Add Shipping Rule button is displayed on the list screen | - | The Add Shipping Rule button is visible and clickable | Medium | UI | - |
| 3 | 1. Shipping Rule List Screen | TC-SRL-003 | Navigate to the Add Shipping Rule screen | Access via Inventory > Shipping Rule | Click the Add Shipping Rule button | - | The user is redirected to the Add Shipping Rule screen | High | Positive | - |
| 4 | 1. Shipping Rule List Screen | TC-SRL-004 | Display checkbox column for row selection | Access via Inventory > Shipping Rule | Open the Shipping Rule list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Shipping Rule List Screen | TC-SRL-005 | Display Shipping Rule ID column | Access via Inventory > Shipping Rule | Open the Shipping Rule list | - | The Shipping Rule ID column is displayed for each row | Medium | UI | - |
| 6 | 1. Shipping Rule List Screen | TC-SRL-006 | Navigate to Shipping Rule Details by clicking the ID | Access via Inventory > Shipping Rule | Click a Shipping Rule ID in the table | Rule: Standard Delivery Egypt | The user is redirected to the Shipping Rule Details screen of the selected rule | High | Positive | - |
| 7 | 1. Shipping Rule List Screen | TC-SRL-007 | Display Status column with a valid value | Access via Inventory > Shipping Rule | Open the Shipping Rule list and review the Status column | Enabled and Disabled rules | Each row shows exactly one of: Enabled, Disabled | High | Positive | - |
| 8 | 1. Shipping Rule List Screen | TC-SRL-008 | Status of a newly saved Shipping Rule is Enabled | Access via Inventory > Shipping Rule | 1. Add and save a new Shipping Rule
2. Return to the Shipping Rule list | Rule: Standard Delivery Egypt | The new Shipping Rule appears in the list with the status Enabled | High | Positive | - |
| 9 | 1. Shipping Rule List Screen | TC-SRL-009 | Status changes to Disabled after the rule is disabled | Access via Inventory > Shipping Rule | 1. Open an Enabled Shipping Rule
2. Enable the Disabled checkbox and save
3. Return to the list | Rule: Standard Delivery Egypt | The Shipping Rule is displayed with the status Disabled | High | Positive | - |
| 10 | 1. Shipping Rule List Screen | TC-SRL-010 | Display Calculate Based On column with a valid value | Access via Inventory > Shipping Rule | Open the Shipping Rule list and review the Calculate Based On column | Rules using Fixed, Net Total and Net Weight | Each row shows one of: Fixed, Net Total, Net Weight | High | Positive | - |
| 11 | 1. Shipping Rule List Screen | TC-SRL-011 | Calculate Based On for a rule saved without a value | Access via Inventory > Shipping Rule | Open a rule that was saved with Calculate Based On empty | Calculate Based On: empty | The column is empty (or shows a default) without errors | Medium | UI | Needs Clarification: Calculate Based On is optional. The SRS does not say what the list shows when it is empty. |
| 12 | 1. Shipping Rule List Screen | TC-SRL-012 | Action bar appears when one row is selected | Access via Inventory > Shipping Rule | Select the checkbox of one Shipping Rule | - | An action bar appears showing the available actions | High | Positive | - |
| 13 | 1. Shipping Rule List Screen | TC-SRL-013 | Action bar appears when multiple rows are selected | Access via Inventory > Shipping Rule | Select the checkboxes of three Shipping Rules | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 14 | 1. Shipping Rule List Screen | TC-SRL-014 | Action bar disappears when all rows are deselected | Access via Inventory > Shipping Rule | 1. Select one Shipping Rule
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 15 | 1. Shipping Rule List Screen | TC-SRL-015 | Action bar contains all required actions | Access via Inventory > Shipping Rule | Select a Shipping Rule and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete | Medium | UI | - |
| 16 | 1. Shipping Rule List Screen | TC-SRL-016 | Open the Edit popup | Access via Inventory > Shipping Rule | 1. Select a Shipping Rule
2. Click Edit | - | A popup is displayed containing the Field dropdown, the Value field and the Update button | High | Positive | - |
| 17 | 1. Shipping Rule List Screen | TC-SRL-017 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Shipping Rule | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Shipping Rule and allows selecting only one option | Medium | Positive | - |
| 18 | 1. Shipping Rule List Screen | TC-SRL-018 | Click Update without selecting a Field | Access via Inventory > Shipping Rule | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because Field is mandatory | Medium | Negative | - |
| 19 | 1. Shipping Rule List Screen | TC-SRL-019 | Value input type changes dynamically based on the selected Field | Access via Inventory > Shipping Rule | 1. Open the Edit popup
2. Select Field = Company and note the Value input type
3. Select Field = Shipping Rule Label and note the Value input type | Company, Shipping Rule Label | The Value field changes its input type (searchable dropdown for Company, text input for the label) according to the selected field | High | Positive | - |
| 20 | 1. Shipping Rule List Screen | TC-SRL-020 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Shipping Rule | 1. Open the Edit popup
2. Select Field = Company
3. Leave Value empty and click Update | Field: Company | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 21 | 1. Shipping Rule List Screen | TC-SRL-021 | Value field applies the validation rules of the selected Field | Access via Inventory > Shipping Rule | 1. Open the Edit popup
2. Select Field = Shipping Rule Label
3. Enter 1 character and click Update | Value: a | A validation error message is displayed (minimum length is 2 characters) and the rule is not changed | Medium | Negative | - |
| 22 | 1. Shipping Rule List Screen | TC-SRL-022 | Update a Shipping Rule successfully | Access via Inventory > Shipping Rule | 1. Select an Enabled Shipping Rule
2. Click Edit
3. Select Field = Shipping Rule Label
4. Enter a new Value
5. Click Update | Value: Express Delivery Egypt | The Shipping Rule is updated successfully and the new label is displayed in the list | High | Positive | - |
| 23 | 1. Shipping Rule List Screen | TC-SRL-023 | Update the Calculate Based On field from the Edit popup | Access via Inventory > Shipping Rule | 1. Select a Shipping Rule
2. Click Edit
3. Select Field = Calculate Based On
4. Select Net Weight
5. Click Update | Net Weight | The value is updated and shown in the Calculate Based On column | Medium | Positive | Needs Clarification: SRS does not say what happens to the existing Shipping Rule Condition rows when Calculate Based On changes (e.g., to Fixed). |
| 24 | 1. Shipping Rule List Screen | TC-SRL-024 | Edit a Disabled Shipping Rule | Access via Inventory > Shipping Rule | 1. Select a Disabled Shipping Rule
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Disabled | To be confirmed with the BA (allowed or blocked) | Medium | Positive | Needs Clarification: SRS does not say whether a Disabled rule can be edited. |
| 25 | 1. Shipping Rule List Screen | TC-SRL-025 | Edit with multiple Shipping Rules selected | Access via Inventory > Shipping Rule | 1. Select two Shipping Rules
2. Click Edit
3. Select a Field and a Value
4. Click Update | Two rules | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection. |
| 26 | 1. Shipping Rule List Screen | TC-SRL-026 | Edit popup: Update with invalid data | Access via Inventory > Shipping Rule | 1. Open the Edit popup
2. Select Shipping Rule Label
3. Enter invalid data
4. Click Update | <script>x</script> | A validation error message is displayed and the rule is not updated | Medium | Negative | Needs Clarification: SRS describes only the success case of Update. Error behavior is assumed. |
| 27 | 1. Shipping Rule List Screen | TC-SRL-027 | Export selected Shipping Rules | Access via Inventory > Shipping Rule | 1. Select one or more Shipping Rules
2. Click Export | - | The selected Shipping Rules are exported | Medium | Positive | Needs Clarification: SRS lists Export without details (file format, exported fields). |
| 28 | 1. Shipping Rule List Screen | TC-SRL-028 | Assign selected Shipping Rules to a user | Access via Inventory > Shipping Rule | 1. Select a Shipping Rule
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The Shipping Rule is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 29 | 1. Shipping Rule List Screen | TC-SRL-029 | Clear assignment of a Shipping Rule | Access via Inventory > Shipping Rule | 1. Select an assigned Shipping Rule
2. Click Clear assignment | Assigned rule | The assignment is cleared from the Shipping Rule | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 30 | 1. Shipping Rule List Screen | TC-SRL-030 | Add tags to a Shipping Rule | Access via Inventory > Shipping Rule | 1. Select a Shipping Rule
2. Click Add tags
3. Enter a tag and confirm | Tag: Domestic | The tag is added to the Shipping Rule | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 31 | 1. Shipping Rule List Screen | TC-SRL-031 | Print selected Shipping Rules | Access via Inventory > Shipping Rule | 1. Select a Shipping Rule
2. Click Print | - | The print view of the Shipping Rule is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 32 | 1. Shipping Rule List Screen | TC-SRL-032 | Confirmation message is displayed when clicking Delete | Access via Inventory > Shipping Rule | 1. Select a Shipping Rule
2. Click Delete | - | A confirmation message asks the user whether they want to delete this Shipping Rule | High | Positive | - |
| 33 | 1. Shipping Rule List Screen | TC-SRL-033 | Cancel the delete confirmation | Access via Inventory > Shipping Rule | 1. Select a Shipping Rule
2. Click Delete
3. Click No (or close the message) | - | The Shipping Rule is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. Confirm the No/close behavior. |
| 34 | 1. Shipping Rule List Screen | TC-SRL-034 | Delete a Shipping Rule that has no links | Access via Inventory > Shipping Rule | 1. Select an unlinked Shipping Rule
2. Click Delete
3. Click Yes | Unlinked rule | The Shipping Rule is deleted successfully and removed from the list | High | Positive | - |
| 35 | 1. Shipping Rule List Screen | TC-SRL-035 | Delete a Shipping Rule linked to other transactions | Access via Inventory > Shipping Rule | 1. Select a Shipping Rule used in a Sales Order
2. Click Delete
3. Click Yes | Rule used in SO-0001 | A message informs the user that the linked transactions must be deleted before the Shipping Rule can be deleted. The rule is not deleted | High | Negative | - |
| 36 | 1. Shipping Rule List Screen | TC-SRL-036 | Linked transactions in the delete message are hyperlinks | Access via Inventory > Shipping Rule | 1. Trigger the delete message for a linked rule
2. Click a linked doctype in the message | Rule used in SO-0001 | Linked doctypes are shown as hyperlinks and the user is redirected to the corresponding doctype | Medium | Positive | - |
| 37 | 1. Shipping Rule List Screen | TC-SRL-037 | Delete multiple Shipping Rules at once | Access via Inventory > Shipping Rule | 1. Select two unlinked rules
2. Click Delete
3. Click Yes | Two unlinked rules | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define behavior for a mix of linked and unlinked rules. |
| 38 | 1. Shipping Rule List Screen | TC-SRL-038 | Shipping Rule list when there are no rules | Access via Inventory > Shipping Rule | Open the Shipping Rule list in a system with no rules | No rules | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. Expected behavior is a standard assumption. |
| 39 | 1. Shipping Rule List Screen | TC-SRL-039 | User without permission cannot access Shipping Rule | Access via Inventory > Shipping Rule | 1. Log in with a user that has no permission for Shipping Rule
2. Open the sidebar | Restricted user | The Shipping Rule menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 40 | 2. Add Shipping Rule Screen | TC-ASR-001 | Open the Add Shipping Rule screen | Logged in with a user that has Shipping Rule access | 1. Click Inventory from the side menu
2. Click Shipping Rule
3. Click Add Shipping Rule | - | The Add Shipping Rule screen is displayed with an empty form | High | Positive | - |
| 41 | 2. Add Shipping Rule Screen | TC-ASR-002 | Shipping Rule Label accepts valid text | Inventory > Shipping Rule > Add Shipping Rule | Enter valid text in Shipping Rule Label | Standard Delivery Egypt | The value is accepted | High | Positive | - |
| 42 | 2. Add Shipping Rule Screen | TC-ASR-003 | Leave Shipping Rule Label empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave Shipping Rule Label empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because the label is mandatory | High | Negative | - |
| 43 | 2. Add Shipping Rule Screen | TC-ASR-004 | Label shorter than the minimum length (1 character) | Inventory > Shipping Rule > Add Shipping Rule | 1. Enter 1 character in Shipping Rule Label
2. Click Save | a | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 44 | 2. Add Shipping Rule Screen | TC-ASR-005 | Label at the minimum length (2 characters) | Inventory > Shipping Rule > Add Shipping Rule | Enter 2 characters in Shipping Rule Label | ab | The value is accepted | Medium | Positive | - |
| 45 | 2. Add Shipping Rule Screen | TC-ASR-006 | Label at the maximum length (100 characters) | Inventory > Shipping Rule > Add Shipping Rule | Enter exactly 100 characters in Shipping Rule Label | 100-character text | The value is accepted | Medium | Positive | - |
| 46 | 2. Add Shipping Rule Screen | TC-ASR-007 | Label longer than 100 characters | Inventory > Shipping Rule > Add Shipping Rule | Try to enter or paste 101 characters in Shipping Rule Label | 101-character text | Input stops at 100 characters; extra characters are prevented | Medium | Negative | - |
| 47 | 2. Add Shipping Rule Screen | TC-ASR-008 | Label accepts letters, numbers and special characters | Inventory > Shipping Rule > Add Shipping Rule | Enter a mix of letters, numbers and special characters | Express #1 - Cairo (2026) @home | The value is accepted | Medium | Positive | - |
| 48 | 2. Add Shipping Rule Screen | TC-ASR-009 | Label rejects invalid data | Inventory > Shipping Rule > Add Shipping Rule | 1. Enter invalid content such as script tags
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 49 | 2. Add Shipping Rule Screen | TC-ASR-010 | Save a Shipping Rule with a duplicate label | Inventory > Shipping Rule > Add Shipping Rule | 1. Enter a label that already exists
2. Fill the other mandatory fields
3. Click Save | Standard Delivery Egypt (existing) | To be confirmed with the BA (duplicate blocked or allowed) | High | Negative | Needs Clarification: SRS does not say whether the label must be unique. |
| 50 | 2. Add Shipping Rule Screen | TC-ASR-011 | Disabled checkbox is hidden before saving | Inventory > Shipping Rule > Add Shipping Rule | Review the form of a new Shipping Rule | - | The Disabled checkbox is not displayed | High | UI | - |
| 51 | 2. Add Shipping Rule Screen | TC-ASR-012 | Disabled checkbox is displayed after saving | Inventory > Shipping Rule > Add Shipping Rule | 1. Save a valid Shipping Rule
2. Review the form | - | The Disabled checkbox is displayed and unchecked | High | Positive | - |
| 52 | 2. Add Shipping Rule Screen | TC-ASR-013 | Disable a saved Shipping Rule | Inventory > Shipping Rule > Add Shipping Rule | 1. Save a valid rule
2. Check Disabled
3. Save | - | The rule is saved and its status in the list is Disabled | High | Positive | - |
| 53 | 2. Add Shipping Rule Screen | TC-ASR-014 | Disabled Shipping Rule cannot be used in transactions | Inventory > Shipping Rule > Add Shipping Rule | 1. Disable a Shipping Rule
2. Create a transaction that uses a shipping rule (e.g., Sales Order)
3. Open the Shipping Rule dropdown | Disabled rule: Standard Delivery Egypt | The disabled rule is not available in the transaction | High | Negative | Needs Clarification: The SRS does not state in which transactions the Shipping Rule field exists. The Connections tab lists Quotation, Supplier Quotation, Sales Order, Delivery Note, Sales Invoice, Purchase Invoice, Purchase Order and Purchase Receipt. |
| 54 | 2. Add Shipping Rule Screen | TC-ASR-015 | Disabled Shipping Rule still appears in reports and historical transactions | Inventory > Shipping Rule > Add Shipping Rule | 1. Disable a rule used in an old transaction
2. Open the old transaction | - | The old transaction still shows the disabled rule | Medium | Positive | - |
| 55 | 2. Add Shipping Rule Screen | TC-ASR-016 | Shipping Rule Type dropdown lists the allowed values | Inventory > Shipping Rule > Add Shipping Rule | Open the Shipping Rule Type dropdown | - | The dropdown contains: Selling, Buying | High | Positive | - |
| 56 | 2. Add Shipping Rule Screen | TC-ASR-017 | Select Shipping Rule Type = Selling | Inventory > Shipping Rule > Add Shipping Rule | Select Selling | Selling | The value is accepted | Medium | Positive | - |
| 57 | 2. Add Shipping Rule Screen | TC-ASR-018 | Select Shipping Rule Type = Buying | Inventory > Shipping Rule > Add Shipping Rule | Select Buying | Buying | The value is accepted | Medium | Positive | - |
| 58 | 2. Add Shipping Rule Screen | TC-ASR-019 | Leave Shipping Rule Type empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave Shipping Rule Type empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipping Rule is saved (field is optional) | Medium | Positive | Needs Clarification: Confirm how a rule without a type behaves in sales and purchase transactions. |
| 59 | 2. Add Shipping Rule Screen | TC-ASR-020 | Shipping Rule Type accepts a single selection only | Inventory > Shipping Rule > Add Shipping Rule | Select Selling and then select Buying | Selling, Buying | Only one value is selected; the second replaces the first | Low | Positive | - |
| 60 | 2. Add Shipping Rule Screen | TC-ASR-021 | Shipping Rule Type limits where the rule can be used | Inventory > Shipping Rule > Add Shipping Rule | 1. Save a rule with Type = Buying
2. Open a sales transaction and open the Shipping Rule dropdown | Type: Buying | The Buying rule is not offered in sales transactions | Medium | Negative | Needs Clarification: SRS does not describe the effect of the type on transactions. |
| 61 | 2. Add Shipping Rule Screen | TC-ASR-022 | Company is a searchable dropdown | Inventory > Shipping Rule > Add Shipping Rule | Click Company and type part of a company name | Shamel | The list is filtered while typing (autocomplete) and shows matching companies | High | Positive | - |
| 62 | 2. Add Shipping Rule Screen | TC-ASR-023 | Select a Company | Inventory > Shipping Rule > Add Shipping Rule | Search for and select a Company | Shamel Trading Co. | The value is accepted | High | Positive | - |
| 63 | 2. Add Shipping Rule Screen | TC-ASR-024 | Company search with no matching result | Inventory > Shipping Rule > Add Shipping Rule | Type a non-existing name in Company | ZZZ Unknown Co | No results are displayed and no value can be selected | Low | Negative | - |
| 64 | 2. Add Shipping Rule Screen | TC-ASR-025 | Leave Company empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave Company empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Company is mandatory | High | Negative | - |
| 65 | 2. Add Shipping Rule Screen | TC-ASR-026 | Company accepts a single selection only | Inventory > Shipping Rule > Add Shipping Rule | Select a Company and then select a different one | Two companies | Only one Company can be selected | Low | Positive | - |
| 66 | 2. Add Shipping Rule Screen | TC-ASR-027 | Shipping Account is a searchable dropdown | Inventory > Shipping Rule > Add Shipping Rule | 1. Select a Company
2. Click Shipping Account and type part of an account name | Freight | The list is filtered while typing and shows matching accounts | High | Positive | - |
| 67 | 2. Add Shipping Rule Screen | TC-ASR-028 | Shipping Account lists only accounts of the selected Company | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Company A
2. Open the Shipping Account dropdown | Company: Shamel Trading Co. | Only accounts that belong to the selected Company are listed | High | Positive | - |
| 68 | 2. Add Shipping Rule Screen | TC-ASR-029 | Select a Shipping Account | Inventory > Shipping Rule > Add Shipping Rule | 1. Select a Company
2. Select a Shipping Account | Freight and Forwarding Charges - STC | The value is accepted | High | Positive | - |
| 69 | 2. Add Shipping Rule Screen | TC-ASR-030 | Leave Shipping Account empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave Shipping Account empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Shipping Account is mandatory | High | Negative | - |
| 70 | 2. Add Shipping Rule Screen | TC-ASR-031 | Shipping Account before selecting a Company | Inventory > Shipping Rule > Add Shipping Rule | Open Shipping Account without selecting a Company | - | No accounts are listed (or the user is asked to select a Company first) | Medium | Negative | Needs Clarification: SRS does not define the field state before a Company is selected. |
| 71 | 2. Add Shipping Rule Screen | TC-ASR-032 | Changing the Company resets Shipping Account and Cost Center | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Company A, a Shipping Account and a Cost Center
2. Change the Company to Company B | Company A > Company B | The previously selected Shipping Account and Cost Center (which belong to Company A) are cleared or revalidated | High | Negative | Needs Clarification: SRS does not say what happens to dependent fields when the Company changes. |
| 72 | 2. Add Shipping Rule Screen | TC-ASR-033 | Cost Center is a searchable dropdown | Inventory > Shipping Rule > Add Shipping Rule | 1. Select a Company
2. Click Cost Center and type part of a name | Main | The list is filtered while typing and shows matching cost centers | High | Positive | - |
| 73 | 2. Add Shipping Rule Screen | TC-ASR-034 | Cost Center lists only cost centers of the selected Company | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Company A
2. Open the Cost Center dropdown | Company: Shamel Trading Co. | Only cost centers that belong to the selected Company are listed | High | Positive | - |
| 74 | 2. Add Shipping Rule Screen | TC-ASR-035 | Select a Cost Center | Inventory > Shipping Rule > Add Shipping Rule | 1. Select a Company
2. Select a Cost Center | Main - STC | The value is accepted | High | Positive | - |
| 75 | 2. Add Shipping Rule Screen | TC-ASR-036 | Leave Cost Center empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave Cost Center empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Cost Center is mandatory | High | Negative | - |
| 76 | 2. Add Shipping Rule Screen | TC-ASR-037 | Cost Center search with no matching result | Inventory > Shipping Rule > Add Shipping Rule | Type a non-existing name in Cost Center | ZZZ | No results are displayed | Low | Negative | - |
| 77 | 2. Add Shipping Rule Screen | TC-ASR-038 | Project is a searchable dropdown | Inventory > Shipping Rule > Add Shipping Rule | Click Project and type part of a project name | Warehouse | The list is filtered while typing and shows matching projects | Medium | Positive | - |
| 78 | 2. Add Shipping Rule Screen | TC-ASR-039 | Select a Project | Inventory > Shipping Rule > Add Shipping Rule | Search for and select a Project | Warehouse Expansion | The value is accepted | Medium | Positive | - |
| 79 | 2. Add Shipping Rule Screen | TC-ASR-040 | Leave Project empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Fill the mandatory fields
2. Leave Project empty
3. Click Save | - | The Shipping Rule is saved (field is optional) | Medium | Positive | - |
| 80 | 2. Add Shipping Rule Screen | TC-ASR-041 | Calculate Based On dropdown lists the allowed values | Inventory > Shipping Rule > Add Shipping Rule | Open the Calculate Based On dropdown | - | The dropdown contains: Fixed, Net Total, Net Weight | High | Positive | - |
| 81 | 2. Add Shipping Rule Screen | TC-ASR-042 | Leave Calculate Based On empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Fill the mandatory fields
2. Leave Calculate Based On empty
3. Click Save | - | The Shipping Rule is saved (field is optional) | Medium | Positive | Needs Clarification: Confirm the default behavior and whether the conditions table is hidden. |
| 82 | 2. Add Shipping Rule Screen | TC-ASR-043 | Calculate Based On accepts a single selection only | Inventory > Shipping Rule > Add Shipping Rule | Select Fixed and then Net Total | Fixed, Net Total | Only one value is selected; the second replaces the first | Low | Positive | - |
| 83 | 2. Add Shipping Rule Screen | TC-ASR-044 | Shipping Rule Condition table is hidden for Fixed | Inventory > Shipping Rule > Add Shipping Rule | Select Calculate Based On = Fixed | Fixed | The Shipping Rule Condition table is not displayed | High | Positive | - |
| 84 | 2. Add Shipping Rule Screen | TC-ASR-045 | Shipping Rule Condition table is displayed for Net Total | Inventory > Shipping Rule > Add Shipping Rule | Select Calculate Based On = Net Total | Net Total | The Shipping Rule Condition table is displayed | High | Positive | - |
| 85 | 2. Add Shipping Rule Screen | TC-ASR-046 | Shipping Rule Condition table is displayed for Net Weight | Inventory > Shipping Rule > Add Shipping Rule | Select Calculate Based On = Net Weight | Net Weight | The Shipping Rule Condition table is displayed | High | Positive | - |
| 86 | 2. Add Shipping Rule Screen | TC-ASR-047 | Switch Calculate Based On from Net Total to Fixed | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total and add a condition row
2. Change Calculate Based On to Fixed
3. Click Save | Net Total > Fixed | The Conditions table is hidden and the rule is saved without validating the hidden rows | Medium | Negative | Needs Clarification: SRS does not say whether existing rows are kept or deleted. |
| 87 | 2. Add Shipping Rule Screen | TC-ASR-048 | Save a Fixed Shipping Rule | Inventory > Shipping Rule > Add Shipping Rule | 1. Fill the mandatory fields
2. Select Calculate Based On = Fixed
3. Click Save | Fixed | The Shipping Rule is saved with status Enabled | High | Positive | Needs Clarification: For Fixed there is no Shipping Amount field in the SRS (the amount exists only in the conditions table). Confirm how the fixed amount is defined. |
| 88 | 2. Add Shipping Rule Screen | TC-ASR-049 | Shipping Rule Condition table displays the default columns | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Calculate Based On = Net Total
2. Review the table | Net Total | The table shows: Checkbox, No., From Value, To Value, Shipping Amount | Medium | UI | - |
| 89 | 2. Add Shipping Rule Screen | TC-ASR-050 | Add Row adds a new condition row | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Click Add Row in the conditions table | - | A new empty row is added to the table | High | Positive | - |
| 90 | 2. Add Shipping Rule Screen | TC-ASR-051 | Condition rows are numbered in order | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 91 | 2. Add Shipping Rule Screen | TC-ASR-052 | Conditions: From Value accepts a valid number | Inventory > Shipping Rule > Add Shipping Rule | Enter a valid number in From Value | 100 | The value is accepted | High | Positive | - |
| 92 | 2. Add Shipping Rule Screen | TC-ASR-053 | Conditions: Leave From Value empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave From Value empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because From Value is mandatory | High | Negative | - |
| 93 | 2. Add Shipping Rule Screen | TC-ASR-054 | Conditions: From Value rejects letters and special characters | Inventory > Shipping Rule > Add Shipping Rule | Type letters and special characters in From Value | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 94 | 2. Add Shipping Rule Screen | TC-ASR-055 | Conditions: From Value shorter than the minimum length (1 character) | Inventory > Shipping Rule > Add Shipping Rule | 1. Enter 1 digit in From Value
2. Click Save | 5 | An error message is displayed because the minimum length is 2 characters | High | Negative | Needs Clarification: The 2-character minimum blocks valid single-digit values (e.g., 5 or 0). Confirm if this is intended. |
| 95 | 2. Add Shipping Rule Screen | TC-ASR-056 | Conditions: From Value at the minimum length (2 characters) | Inventory > Shipping Rule > Add Shipping Rule | Enter 2 digits in From Value | 10 | The value is accepted | Medium | Positive | - |
| 96 | 2. Add Shipping Rule Screen | TC-ASR-057 | Conditions: From Value at the maximum length (100 characters) | Inventory > Shipping Rule > Add Shipping Rule | Enter exactly 100 digits in From Value | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | Needs Clarification: A 100-digit value is unrealistic. Confirm the real maximum value allowed. |
| 97 | 2. Add Shipping Rule Screen | TC-ASR-058 | Conditions: From Value longer than 100 characters | Inventory > Shipping Rule > Add Shipping Rule | Try to enter 101 digits in From Value | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 98 | 2. Add Shipping Rule Screen | TC-ASR-059 | Conditions: To Value accepts a valid number | Inventory > Shipping Rule > Add Shipping Rule | Enter a valid number in To Value | 100 | The value is accepted | High | Positive | - |
| 99 | 2. Add Shipping Rule Screen | TC-ASR-060 | Conditions: Leave To Value empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave To Value empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipping Rule is saved (field is optional) | Medium | Positive | - |
| 100 | 2. Add Shipping Rule Screen | TC-ASR-061 | Conditions: To Value rejects letters and special characters | Inventory > Shipping Rule > Add Shipping Rule | Type letters and special characters in To Value | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 101 | 2. Add Shipping Rule Screen | TC-ASR-062 | Conditions: To Value shorter than the minimum length (1 character) | Inventory > Shipping Rule > Add Shipping Rule | 1. Enter 1 digit in To Value
2. Click Save | 5 | An error message is displayed because the minimum length is 2 characters | High | Negative | Needs Clarification: The 2-character minimum blocks valid single-digit values (e.g., 5 or 0). Confirm if this is intended. |
| 102 | 2. Add Shipping Rule Screen | TC-ASR-063 | Conditions: To Value at the minimum length (2 characters) | Inventory > Shipping Rule > Add Shipping Rule | Enter 2 digits in To Value | 10 | The value is accepted | Medium | Positive | - |
| 103 | 2. Add Shipping Rule Screen | TC-ASR-064 | Conditions: To Value at the maximum length (100 characters) | Inventory > Shipping Rule > Add Shipping Rule | Enter exactly 100 digits in To Value | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | Needs Clarification: A 100-digit value is unrealistic. Confirm the real maximum value allowed. |
| 104 | 2. Add Shipping Rule Screen | TC-ASR-065 | Conditions: To Value longer than 100 characters | Inventory > Shipping Rule > Add Shipping Rule | Try to enter 101 digits in To Value | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 105 | 2. Add Shipping Rule Screen | TC-ASR-066 | Conditions: Shipping Amount accepts a valid number | Inventory > Shipping Rule > Add Shipping Rule | Enter a valid number in Shipping Amount | 100 | The value is accepted | High | Positive | - |
| 106 | 2. Add Shipping Rule Screen | TC-ASR-067 | Conditions: Leave Shipping Amount empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave Shipping Amount empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Shipping Amount is mandatory | High | Negative | - |
| 107 | 2. Add Shipping Rule Screen | TC-ASR-068 | Conditions: Shipping Amount rejects letters and special characters | Inventory > Shipping Rule > Add Shipping Rule | Type letters and special characters in Shipping Amount | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 108 | 2. Add Shipping Rule Screen | TC-ASR-069 | Conditions: Shipping Amount shorter than the minimum length (1 character) | Inventory > Shipping Rule > Add Shipping Rule | 1. Enter 1 digit in Shipping Amount
2. Click Save | 5 | An error message is displayed because the minimum length is 2 characters | High | Negative | Needs Clarification: The 2-character minimum blocks valid single-digit values (e.g., 5 or 0). Confirm if this is intended. |
| 109 | 2. Add Shipping Rule Screen | TC-ASR-070 | Conditions: Shipping Amount at the minimum length (2 characters) | Inventory > Shipping Rule > Add Shipping Rule | Enter 2 digits in Shipping Amount | 10 | The value is accepted | Medium | Positive | - |
| 110 | 2. Add Shipping Rule Screen | TC-ASR-071 | Conditions: Shipping Amount at the maximum length (100 characters) | Inventory > Shipping Rule > Add Shipping Rule | Enter exactly 100 digits in Shipping Amount | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | Needs Clarification: A 100-digit value is unrealistic. Confirm the real maximum value allowed. |
| 111 | 2. Add Shipping Rule Screen | TC-ASR-072 | Conditions: Shipping Amount longer than 100 characters | Inventory > Shipping Rule > Add Shipping Rule | Try to enter 101 digits in Shipping Amount | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 112 | 2. Add Shipping Rule Screen | TC-ASR-073 | Conditions: From Value greater than To Value | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Enter From Value greater than To Value
3. Click Save | From: 100; To: 50 | A validation error is displayed because the range is invalid | High | Negative | Needs Clarification: SRS does not define the range validation. |
| 113 | 2. Add Shipping Rule Screen | TC-ASR-074 | Conditions: From Value equal to To Value | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Enter the same From and To Value
3. Click Save | From: 100; To: 100 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define the range validation. |
| 114 | 2. Add Shipping Rule Screen | TC-ASR-075 | Conditions: overlapping ranges | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Add row 1: 10 to 100
3. Add row 2: 50 to 200
4. Click Save | 10-100 and 50-200 | To be confirmed with the BA (overlap blocked or allowed) | High | Negative | Needs Clarification: SRS does not define overlap handling. |
| 115 | 2. Add Shipping Rule Screen | TC-ASR-076 | Conditions: gap between ranges | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Add row 1: 10 to 100
3. Add row 2: 150 to 200
4. Click Save | 10-100 and 150-200 | To be confirmed with the BA (accepted or warning) | Low | Positive | Needs Clarification: SRS does not define behavior for gaps. |
| 116 | 2. Add Shipping Rule Screen | TC-ASR-077 | Conditions: negative value | Inventory > Shipping Rule > Add Shipping Rule | Try to type a negative number in From Value | -10 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS says numbers only; it is not clear whether '-' is allowed. |
| 117 | 2. Add Shipping Rule Screen | TC-ASR-078 | Conditions: decimal value | Inventory > Shipping Rule > Add Shipping Rule | 1. Enter a decimal number in Shipping Amount
2. Click Save | 50.75 | To be confirmed with the BA (accepted or rejected) | High | Positive | Needs Clarification: SRS says numbers only; amounts normally need decimals. |
| 118 | 2. Add Shipping Rule Screen | TC-ASR-079 | Conditions: row with To Value empty (open-ended range) | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Enter From Value and Shipping Amount only
3. Click Save | From: 100; Amount: 20 | The rule is saved (To Value is optional) | Medium | Positive | - |
| 119 | 2. Add Shipping Rule Screen | TC-ASR-080 | Conditions: Save with no condition rows | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Do not add rows
3. Click Save | No rows | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one row is required for Net Total / Net Weight. |
| 120 | 2. Add Shipping Rule Screen | TC-ASR-081 | Action bar appears when a condition row is selected | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Select the checkbox of a row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 121 | 2. Add Shipping Rule Screen | TC-ASR-082 | Delete a single condition row | Inventory > Shipping Rule > Add Shipping Rule | 1. Select one row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 122 | 2. Add Shipping Rule Screen | TC-ASR-083 | Delete multiple condition rows | Inventory > Shipping Rule > Add Shipping Rule | 1. Select two rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 123 | 2. Add Shipping Rule Screen | TC-ASR-084 | Conditions: open the Edit Row popup | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Click the Edit Row icon of a row | - | A popup is displayed with From Value, To Value and Shipping Amount | High | Positive | - |
| 124 | 2. Add Shipping Rule Screen | TC-ASR-085 | Conditions: Edit Row validates mandatory fields | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Edit Row
2. Clear From Value and Shipping Amount
3. Click Update | - | Error messages are displayed because From Value and Shipping Amount are mandatory | Medium | Negative | - |
| 125 | 2. Add Shipping Rule Screen | TC-ASR-086 | Conditions: Edit Row validates the minimum length | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Edit Row
2. Enter 1 digit in each field
3. Click Update | 5 | Error messages are displayed for the minimum length of 2 characters | Medium | Negative | - |
| 126 | 2. Add Shipping Rule Screen | TC-ASR-087 | Conditions: Edit Row saves changes | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Edit Row
2. Change From Value, To Value and Shipping Amount
3. Click Update | From: 20; To: 200; Amount: 60 | The popup closes and the changes are reflected in the row | High | Positive | - |
| 127 | 2. Add Shipping Rule Screen | TC-ASR-088 | Open the Conditions table Settings popup | Inventory > Shipping Rule > Add Shipping Rule | Click Setting on the Conditions table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 128 | 2. Add Shipping Rule Screen | TC-ASR-089 | Reorder Conditions columns using drag and drop | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Setting
2. Drag the Shipping Amount column header and drop it before From Value | - | The column order changes to the new position | Medium | Positive | - |
| 129 | 2. Add Shipping Rule Screen | TC-ASR-090 | Conditions: Column width default value is 3 | Inventory > Shipping Rule > Add Shipping Rule | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 130 | 2. Add Shipping Rule Screen | TC-ASR-091 | Conditions: Column width accepts numbers only | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 131 | 2. Add Shipping Rule Screen | TC-ASR-092 | Conditions: Column width left empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 132 | 2. Add Shipping Rule Screen | TC-ASR-093 | Conditions: Column width with 1 character | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 133 | 2. Add Shipping Rule Screen | TC-ASR-094 | Conditions: Column width longer than 3 characters | Inventory > Shipping Rule > Add Shipping Rule | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 134 | 2. Add Shipping Rule Screen | TC-ASR-095 | Conditions: Add / Remove Columns popup lists all columns | Inventory > Shipping Rule > Add Shipping Rule | Click Add / Remove columns | - | A popup lists all columns with checkboxes: From Value, To Value, Shipping Amount | Medium | UI | - |
| 135 | 2. Add Shipping Rule Screen | TC-ASR-096 | Conditions: Hide a column | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Add / Remove columns
2. Clear the To Value checkbox
3. Click Update | Column: To Value | The To Value column is hidden from the table | Medium | Positive | - |
| 136 | 2. Add Shipping Rule Screen | TC-ASR-097 | Conditions: Show a hidden column | Inventory > Shipping Rule > Add Shipping Rule | 1. Hide the To Value column
2. Open Add / Remove columns
3. Select the To Value checkbox
4. Click Update | Column: To Value | The To Value column is displayed again | Medium | Positive | - |
| 137 | 2. Add Shipping Rule Screen | TC-ASR-098 | Conditions: Save the Settings using Update | Inventory > Shipping Rule > Add Shipping Rule | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 138 | 2. Add Shipping Rule Screen | TC-ASR-099 | Conditions: Reset Settings to default | Inventory > Shipping Rule > Add Shipping Rule | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 139 | 2. Add Shipping Rule Screen | TC-ASR-100 | Valid For Countries table displays the default columns | Inventory > Shipping Rule > Add Shipping Rule | Review the Valid For Countries table | - | The table shows: Checkbox, No., Country | Medium | UI | - |
| 140 | 2. Add Shipping Rule Screen | TC-ASR-101 | Add Row adds a new country row | Inventory > Shipping Rule > Add Shipping Rule | Click Add Row in the Valid For Countries table | - | A new empty row is added to the table | High | Positive | - |
| 141 | 2. Add Shipping Rule Screen | TC-ASR-102 | Country rows are numbered in order | Inventory > Shipping Rule > Add Shipping Rule | Add three country rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 142 | 2. Add Shipping Rule Screen | TC-ASR-103 | Country is a searchable dropdown | Inventory > Shipping Rule > Add Shipping Rule | Click Country in a row and type part of a country name | Egy | The list is filtered while typing and shows matching countries | High | Positive | - |
| 143 | 2. Add Shipping Rule Screen | TC-ASR-104 | Select a Country | Inventory > Shipping Rule > Add Shipping Rule | Search for and select a Country | Egypt | The value is accepted | High | Positive | - |
| 144 | 2. Add Shipping Rule Screen | TC-ASR-105 | Leave Country empty in a row | Inventory > Shipping Rule > Add Shipping Rule | 1. Add a country row
2. Leave Country empty
3. Click Save | - | An error message is displayed because Country is mandatory | High | Negative | - |
| 145 | 2. Add Shipping Rule Screen | TC-ASR-106 | Country search with no matching result | Inventory > Shipping Rule > Add Shipping Rule | Type a non-existing country | Atlantis | No results are displayed | Low | Negative | - |
| 146 | 2. Add Shipping Rule Screen | TC-ASR-107 | Add the same country twice | Inventory > Shipping Rule > Add Shipping Rule | 1. Add two rows with the same Country
2. Click Save | Egypt (x2) | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define duplicate countries. |
| 147 | 2. Add Shipping Rule Screen | TC-ASR-108 | Add several different countries | Inventory > Shipping Rule > Add Shipping Rule | 1. Add three rows
2. Select three different countries | Egypt, Saudi Arabia, United Arab Emirates | All three rows are accepted | Medium | Positive | - |
| 148 | 2. Add Shipping Rule Screen | TC-ASR-109 | Save a rule with no countries | Inventory > Shipping Rule > Add Shipping Rule | 1. Fill the mandatory fields
2. Do not add country rows
3. Click Save | No rows | To be confirmed with the BA (saved - valid for all countries, or blocked) | High | Negative | Needs Clarification: SRS does not say whether the Valid For Countries table is required or what an empty table means. |
| 149 | 2. Add Shipping Rule Screen | TC-ASR-110 | Action bar appears when a country row is selected | Inventory > Shipping Rule > Add Shipping Rule | Select the checkbox of a country row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 150 | 2. Add Shipping Rule Screen | TC-ASR-111 | Delete a single country row | Inventory > Shipping Rule > Add Shipping Rule | 1. Select one row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 151 | 2. Add Shipping Rule Screen | TC-ASR-112 | Delete multiple country rows | Inventory > Shipping Rule > Add Shipping Rule | 1. Select two rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 152 | 2. Add Shipping Rule Screen | TC-ASR-113 | Countries: open the Edit Row popup | Inventory > Shipping Rule > Add Shipping Rule | Click the Edit Row icon of a country row | - | A popup is displayed with the Country field | High | Positive | - |
| 153 | 2. Add Shipping Rule Screen | TC-ASR-114 | Countries: Edit Row validates the mandatory Country | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Edit Row
2. Clear Country
3. Click Update | - | An error message is displayed because Country is mandatory | Medium | Negative | - |
| 154 | 2. Add Shipping Rule Screen | TC-ASR-115 | Countries: Edit Row saves changes | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Edit Row
2. Change the Country
3. Click Update | Egypt > Saudi Arabia | The popup closes and the row shows the new Country | High | Positive | - |
| 155 | 2. Add Shipping Rule Screen | TC-ASR-116 | Open the Countries table Settings popup | Inventory > Shipping Rule > Add Shipping Rule | Click Setting on the Countries table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 156 | 2. Add Shipping Rule Screen | TC-ASR-117 | Reorder Countries columns using drag and drop | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Setting
2. Drag the Country column header and drop it to a new position | - | The column can be moved without errors (only one column exists) | Low | Positive | - |
| 157 | 2. Add Shipping Rule Screen | TC-ASR-118 | Countries: Column width default value is 3 | Inventory > Shipping Rule > Add Shipping Rule | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 158 | 2. Add Shipping Rule Screen | TC-ASR-119 | Countries: Column width accepts numbers only | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 159 | 2. Add Shipping Rule Screen | TC-ASR-120 | Countries: Column width left empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 160 | 2. Add Shipping Rule Screen | TC-ASR-121 | Countries: Column width with 1 character | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 161 | 2. Add Shipping Rule Screen | TC-ASR-122 | Countries: Column width longer than 3 characters | Inventory > Shipping Rule > Add Shipping Rule | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 162 | 2. Add Shipping Rule Screen | TC-ASR-123 | Countries: Add / Remove Columns popup lists all columns | Inventory > Shipping Rule > Add Shipping Rule | Click Add / Remove columns | - | A popup lists all columns with checkboxes: Country | Medium | UI | - |
| 163 | 2. Add Shipping Rule Screen | TC-ASR-124 | Countries: Hide a column | Inventory > Shipping Rule > Add Shipping Rule | 1. Open Add / Remove columns
2. Clear the Country checkbox
3. Click Update | Column: Country | The Country column is hidden from the table | Medium | Positive | - |
| 164 | 2. Add Shipping Rule Screen | TC-ASR-125 | Countries: Show a hidden column | Inventory > Shipping Rule > Add Shipping Rule | 1. Hide the Country column
2. Open Add / Remove columns
3. Select the Country checkbox
4. Click Update | Column: Country | The Country column is displayed again | Medium | Positive | - |
| 165 | 2. Add Shipping Rule Screen | TC-ASR-126 | Countries: Save the Settings using Update | Inventory > Shipping Rule > Add Shipping Rule | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 166 | 2. Add Shipping Rule Screen | TC-ASR-127 | Countries: Reset Settings to default | Inventory > Shipping Rule > Add Shipping Rule | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 167 | 2. Add Shipping Rule Screen | TC-ASR-128 | Save a Net Total Shipping Rule with valid data | Inventory > Shipping Rule > Add Shipping Rule | 1. Fill all mandatory fields
2. Select Calculate Based On = Net Total
3. Add a condition row
4. Add a country row
5. Click Save | Label: Standard Delivery Egypt; Type: Selling; Company: Shamel Trading Co.; Account: Freight and Forwarding Charges - STC; Cost Center: Main - STC; Project: Warehouse Expansion; Based On: Net Total; Condition: 10 to 100, Amount 50; Country: Egypt | The Shipping Rule is saved successfully and added to the Shipping Rule List with status Enabled | High | Positive | - |
| 168 | 2. Add Shipping Rule Screen | TC-ASR-129 | Save a Net Weight Shipping Rule with valid data | Inventory > Shipping Rule > Add Shipping Rule | 1. Fill all mandatory fields
2. Select Calculate Based On = Net Weight
3. Add a condition row
4. Add a country row
5. Click Save | Based On: Net Weight; Condition: 10 to 100, Amount 75 | The Shipping Rule is saved successfully with status Enabled | High | Positive | - |
| 169 | 2. Add Shipping Rule Screen | TC-ASR-130 | Save with only the mandatory fields | Inventory > Shipping Rule > Add Shipping Rule | 1. Fill Label, Company, Shipping Account and Cost Center only
2. Click Save | Label, Company, Account, Cost Center | The Shipping Rule is saved (all other fields are optional) | High | Positive | Needs Clarification: Confirm whether the Valid For Countries table is also required. |
| 170 | 2. Add Shipping Rule Screen | TC-ASR-131 | Save with all mandatory fields empty | Inventory > Shipping Rule > Add Shipping Rule | 1. Leave the form empty
2. Click Save | - | A validation error message is displayed for each mandatory field (Label, Company, Shipping Account, Cost Center) | High | Negative | - |
| 171 | 2. Add Shipping Rule Screen | TC-ASR-132 | Saved data is displayed correctly when reopened | Inventory > Shipping Rule > Add Shipping Rule | 1. Save a valid rule
2. Open it from the list | Standard Delivery Egypt | All saved values (fields, conditions and countries) are displayed correctly | High | Positive | - |
| 172 | 2. Add Shipping Rule Screen | TC-ASR-133 | Save with an invalid row in the Conditions table | Inventory > Shipping Rule > Add Shipping Rule | 1. Select Net Total
2. Add a row with only To Value
3. Click Save | To Value: 100 | A validation error is displayed for From Value and Shipping Amount and the rule is not saved | High | Negative | - |
| 173 | 2. Add Shipping Rule Screen | TC-ASR-134 | Save with an empty row in the Countries table | Inventory > Shipping Rule > Add Shipping Rule | 1. Add an empty country row
2. Click Save | - | A validation error is displayed for Country and the rule is not saved | High | Negative | - |
| 174 | 3. Shipping Rule Details Screen | TC-SRD-001 | Open Shipping Rule Details from the list | Logged in; at least one Shipping Rule exists | 1. Click Inventory from the side menu
2. Click Shipping Rule
3. Click a Shipping Rule ID | Rule: Standard Delivery Egypt | The Shipping Rule Details screen of the selected rule is displayed | High | Positive | - |
| 175 | 3. Shipping Rule Details Screen | TC-SRD-002 | Details display the data entered during creation | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Open a rule created with known data and compare the fields | Standard Delivery Egypt; Selling; Shamel Trading Co.; Net Total; 10-100 = 50; Egypt | All data entered during creation is displayed correctly | High | Positive | - |
| 176 | 3. Shipping Rule Details Screen | TC-SRD-003 | Fields are displayed as input fields | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Open a Shipping Rule | - | Fields are displayed as editable inputs so the user can update them | High | Positive | - |
| 177 | 3. Shipping Rule Details Screen | TC-SRD-004 | Disabled checkbox is displayed for a saved rule | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Open a saved Shipping Rule | - | The Disabled checkbox is displayed | Medium | Positive | - |
| 178 | 3. Shipping Rule Details Screen | TC-SRD-005 | Modify the label and save | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a Shipping Rule
2. Change the Shipping Rule Label
3. Save | Label: Express Delivery Egypt | The change is saved successfully and displayed after reopening the rule | High | Positive | Needs Clarification: SRS does not define a Save button on the Details screen. |
| 179 | 3. Shipping Rule Details Screen | TC-SRD-006 | Clear the label and save | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a Shipping Rule
2. Clear the label
3. Save | - | An error message is displayed because the label is mandatory | High | Negative | - |
| 180 | 3. Shipping Rule Details Screen | TC-SRD-007 | Label shorter than 2 characters in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule
2. Enter 1 character in the label
3. Save | a | An error message is displayed (minimum length is 2 characters) | Medium | Negative | - |
| 181 | 3. Shipping Rule Details Screen | TC-SRD-008 | Change the Company in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule
2. Change the Company
3. Save | Company A > Company B | The Shipping Account and Cost Center are revalidated against the new Company | High | Negative | Needs Clarification: SRS does not say what happens to dependent fields when the Company changes. |
| 182 | 3. Shipping Rule Details Screen | TC-SRD-009 | Clear Shipping Account in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule
2. Clear Shipping Account
3. Save | - | An error message is displayed because Shipping Account is mandatory | High | Negative | - |
| 183 | 3. Shipping Rule Details Screen | TC-SRD-010 | Clear Cost Center in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule
2. Clear Cost Center
3. Save | - | An error message is displayed because Cost Center is mandatory | High | Negative | - |
| 184 | 3. Shipping Rule Details Screen | TC-SRD-011 | Change Shipping Rule Type | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule
2. Change the Type from Selling to Buying
3. Save | Selling > Buying | The change is saved | Medium | Positive | - |
| 185 | 3. Shipping Rule Details Screen | TC-SRD-012 | Change Calculate Based On from Net Total to Fixed | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a Net Total rule
2. Change Calculate Based On to Fixed
3. Save | Net Total > Fixed | The Conditions table is hidden and the rule is saved | Medium | Positive | Needs Clarification: SRS does not say whether existing condition rows are kept or deleted. |
| 186 | 3. Shipping Rule Details Screen | TC-SRD-013 | Change Calculate Based On from Fixed to Net Weight | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a Fixed rule
2. Change Calculate Based On to Net Weight | Fixed > Net Weight | The Shipping Rule Condition table is displayed | Medium | Positive | - |
| 187 | 3. Shipping Rule Details Screen | TC-SRD-014 | Edit a condition row in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule
2. Change From Value, To Value and Shipping Amount of a row
3. Save | From: 20; To: 200; Amount: 60 | The changes are saved | High | Positive | - |
| 188 | 3. Shipping Rule Details Screen | TC-SRD-015 | Add a condition row in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a Net Total rule
2. Click Add Row
3. Enter valid values
4. Save | From: 200; To: 500; Amount: 90 | The new row is saved with the rule | Medium | Positive | - |
| 189 | 3. Shipping Rule Details Screen | TC-SRD-016 | Delete a condition row in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule with two rows
2. Select one row
3. Click Delete row
4. Save | - | The row is removed from the rule | Medium | Positive | - |
| 190 | 3. Shipping Rule Details Screen | TC-SRD-017 | Add a country in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule
2. Click Add Row in Valid For Countries
3. Select a Country
4. Save | Saudi Arabia | The country is saved with the rule | Medium | Positive | - |
| 191 | 3. Shipping Rule Details Screen | TC-SRD-018 | Delete a country in Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule with two countries
2. Select one row
3. Click Delete row
4. Save | - | The country is removed from the rule | Medium | Positive | - |
| 192 | 3. Shipping Rule Details Screen | TC-SRD-019 | Disable a Shipping Rule from Details | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open an Enabled rule
2. Check Disabled
3. Save | Rule: Standard Delivery Egypt | The rule is saved and its status in the list becomes Disabled | High | Positive | - |
| 193 | 3. Shipping Rule Details Screen | TC-SRD-020 | Re-enable a Disabled Shipping Rule | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a Disabled rule
2. Clear Disabled
3. Save | Rule: Standard Delivery Egypt | The rule becomes Enabled again | Medium | Positive | Needs Clarification: SRS does not say whether a Disabled rule can be re-enabled. |
| 194 | 3. Shipping Rule Details Screen | TC-SRD-021 | Editing a rule that is used in existing transactions | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule used in a Sales Order
2. Change a condition amount
3. Save | Rule used in SO-0001 | To be confirmed with the BA (existing transactions keep the old values) | Medium | Positive | Needs Clarification: SRS does not define the impact on historical transactions. |
| 195 | 3. Shipping Rule Details Screen | TC-SRD-022 | Connections section is displayed | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Open a Shipping Rule and scroll to Connections | - | The Connections section is displayed with the groups Pre Sales, Sales and Purchase | High | UI | - |
| 196 | 3. Shipping Rule Details Screen | TC-SRD-023 | Connections: Pre Sales group | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Review the Pre Sales group | - | It contains the buttons: Quotation, Supplier Quotation | Medium | UI | - |
| 197 | 3. Shipping Rule Details Screen | TC-SRD-024 | Connections: Sales group | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Review the Sales group | - | It contains the buttons: Sales Order, Delivery Note, Sales Invoice | Medium | UI | - |
| 198 | 3. Shipping Rule Details Screen | TC-SRD-025 | Connections: Purchase group | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Review the Purchase group | - | It contains the buttons: Purchase Invoice, Purchase Order, Purchase Receipt | Medium | UI | - |
| 199 | 3. Shipping Rule Details Screen | TC-SRD-026 | Connections: open a linked doctype | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule used in a Sales Order
2. Click Sales Order in Connections | Rule used in SO-0001 | The user is redirected to the Sales Order list showing the documents that use this Shipping Rule | High | Positive | Needs Clarification: SRS says the button links to the doctype; confirm that the list is filtered by this rule. |
| 200 | 3. Shipping Rule Details Screen | TC-SRD-027 | Connections: rule with no linked documents | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open an unused rule
2. Click a button in Connections | Unused rule | The linked doctype opens with no related documents (or an empty state) | Low | Positive | - |
| 201 | 3. Shipping Rule Details Screen | TC-SRD-028 | Connections: all buttons navigate to the right doctype | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Click each of the 8 buttons in Connections | Quotation, Supplier Quotation, Sales Order, Delivery Note, Sales Invoice, Purchase Invoice, Purchase Order, Purchase Receipt | Each button opens its own doctype | Medium | Positive | - |
| 202 | 3. Shipping Rule Details Screen | TC-SRD-029 | Fixed page actions are displayed at the top | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Open any rule and review the top of the page | - | The Assign, Attachment, Tags, Share and Print actions are displayed at the top | High | UI | - |
| 203 | 3. Shipping Rule Details Screen | TC-SRD-030 | Fixed page actions remain visible for Enabled and Disabled rules | Inventory > Shipping Rule > click a Shipping Rule ID in the table | Open an Enabled rule and a Disabled rule | 2 rules | The fixed page actions are displayed on both | Medium | UI | - |
| 204 | 3. Shipping Rule Details Screen | TC-SRD-031 | Assign the rule to a user | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Click Assign
2. Select a user
3. Confirm | User: Mona Samir | The rule is assigned to the selected user and the assignment is displayed | Medium | Positive | Needs Clarification: SRS lists Assign without details. |
| 205 | 3. Shipping Rule Details Screen | TC-SRD-032 | Add an attachment | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Click Attachment
2. Upload a file | rate-card.pdf | The file is attached to the rule and listed | Medium | Positive | Needs Clarification: Allowed file types and size limit are not defined. |
| 206 | 3. Shipping Rule Details Screen | TC-SRD-033 | Remove an attachment | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Open a rule with an attachment
2. Remove the attachment | rate-card.pdf | The attachment is removed from the rule | Low | Positive | - |
| 207 | 3. Shipping Rule Details Screen | TC-SRD-034 | Add a tag | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Click Tags
2. Add a tag | Tag: Domestic | The tag is added to the rule | Low | Positive | - |
| 208 | 3. Shipping Rule Details Screen | TC-SRD-035 | Share the rule with a user | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Click Share
2. Select a user and permission
3. Confirm | User: Mona Samir | The rule is shared with the selected user | Medium | Positive | Needs Clarification: SRS lists Share without details. |
| 209 | 3. Shipping Rule Details Screen | TC-SRD-036 | Print the rule | Inventory > Shipping Rule > click a Shipping Rule ID in the table | 1. Click Print | - | The print view of the rule is displayed and can be printed | Medium | Positive | - |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Shipping Rule List Screen |  |  |  |
| 2. Add Shipping Rule Screen |  |  |  |
| 3. Shipping Rule Details Screen |  |  |  |
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