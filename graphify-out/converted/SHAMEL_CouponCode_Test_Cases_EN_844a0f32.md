<!-- converted from SHAMEL_CouponCode_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Selling Module | Test Cases - Coupon Code |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Selling Module - Coupon Code)  |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Coupon Code List Screen | TC-CPL-001 | Display the Coupon Code list | Access via Selling > Coupon Code | 1. Click Selling from the side menu
2. Click Coupon Code | - | A table listing all Coupon Codes in the system is displayed | High | Positive | - |
| 2 | 1. Coupon Code List Screen | TC-CPL-002 | Add Coupon Code button is displayed | Access via Selling > Coupon Code | Verify the Add Coupon Code button on the list screen | - | The Add Coupon Code button is visible and clickable | Medium | UI | - |
| 3 | 1. Coupon Code List Screen | TC-CPL-003 | Navigate to the Add Coupon Code screen | Access via Selling > Coupon Code | Click the Add Coupon Code button | - | The user is redirected to the Add Coupon Code screen | High | Positive | - |
| 4 | 1. Coupon Code List Screen | TC-CPL-004 | Display checkbox column for row selection | Access via Selling > Coupon Code | Open the list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Coupon Code List Screen | TC-CPL-005 | Display Coupon Code ID column | Access via Selling > Coupon Code | Open the list | - | The Coupon Code ID is displayed for each row as a clickable link | Medium | UI | - |
| 6 | 1. Coupon Code List Screen | TC-CPL-006 | Navigate to Details by clicking the Coupon Code ID | Access via Selling > Coupon Code | Click a Coupon Code ID in the table | SUMMER25 | The user is redirected to the Coupon Code Details screen of the selected record | High | Positive | - |
| 7 | 1. Coupon Code List Screen | TC-CPL-007 | Display Coupon Code name column | Access via Selling > Coupon Code | Open the list | Summer Sale 2026 | The Coupon Code name is displayed for each row | Medium | UI | - |
| 8 | 1. Coupon Code List Screen | TC-CPL-008 | Display Coupon Type column | Access via Selling > Coupon Code | Open the list and review the Coupon Type column | Promotional, Gift Card | Each row shows exactly one Coupon Type value | High | Positive | Needs Clarification: SRS lists the values as 'Promotional' and 'Gift type' on the list, but 'Promotional' and 'Gift Card' on the Add screen. Confirm the correct label. |
| 9 | 1. Coupon Code List Screen | TC-CPL-009 | Display Valid From column | Access via Selling > Coupon Code | Open the list and review the Valid From column | 2026-12-01 | The date from which the coupon becomes valid is displayed | Medium | UI | - |
| 10 | 1. Coupon Code List Screen | TC-CPL-010 | Valid From is empty for a coupon without a start date | Access via Selling > Coupon Code | Review the row of a coupon saved without Valid From | Valid From: empty | The Valid From cell is displayed empty and no error occurs | Low | Positive | Needs Clarification: SRS marks Valid From optional but does not say how an empty value is displayed in the list. |
| 11 | 1. Coupon Code List Screen | TC-CPL-011 | List displays only the columns defined in the SRS | Access via Selling > Coupon Code | Review the list header | - | The columns are: Checkbox, Coupon code ID, Coupon Code name, Coupon Type, Valid from | Medium | UI | Needs Clarification: SRS does not list Valid To, Maximum Use or Used in the list. Confirm this is intended. |
| 12 | 1. Coupon Code List Screen | TC-CPL-012 | Newly added coupon appears in the list | Access via Selling > Coupon Code | 1. Add a new Coupon Code
2. Return to the list | Summer Sale 2026 / SUMMER25 | The new coupon is displayed in the list with the entered values | High | Positive | - |
| 13 | 1. Coupon Code List Screen | TC-CPL-013 | List displays an empty state when no coupons exist | Access via Selling > Coupon Code | Open the list in a system without Coupon Codes | - | An empty-state message / empty table is displayed with no error | Low | UI | Needs Clarification: SRS does not define the empty state. |
| 14 | 1. Coupon Code List Screen | TC-CPL-014 | Action bar appears when one row is selected | Access via Selling > Coupon Code | Select the checkbox of one coupon | - | An action bar appears showing the available actions | High | Positive | - |
| 15 | 1. Coupon Code List Screen | TC-CPL-015 | Action bar appears when multiple rows are selected | Access via Selling > Coupon Code | Select the checkboxes of three coupons | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 16 | 1. Coupon Code List Screen | TC-CPL-016 | Action bar disappears when all rows are deselected | Access via Selling > Coupon Code | 1. Select one coupon
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 17 | 1. Coupon Code List Screen | TC-CPL-017 | Action bar contains the required actions | Access via Selling > Coupon Code | Select a coupon and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete | Medium | UI | - |
| 18 | 1. Coupon Code List Screen | TC-CPL-018 | Open the Edit popup | Access via Selling > Coupon Code | 1. Select a coupon
2. Click Edit | - | A popup is displayed containing the Field dropdown and the Value field | High | Positive | - |
| 19 | 1. Coupon Code List Screen | TC-CPL-019 | Field dropdown is a single-selection list of Coupon Code fields | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Coupon Code doctype and allows selecting only one option | Medium | Positive | - |
| 20 | 1. Coupon Code List Screen | TC-CPL-020 | Click Update without selecting a Field | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Leave Field empty
3. Click the confirm button | - | An error message is displayed because Field is mandatory | Medium | Negative | Needs Clarification: SRS does not name the popup confirm button (Update / Save) nor its error text. |
| 21 | 1. Coupon Code List Screen | TC-CPL-021 | Value input changes type based on the selected Field (text) | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Select Field = Coupon Name | Field: Coupon Name | The Value field becomes a text input | Medium | Positive | - |
| 22 | 1. Coupon Code List Screen | TC-CPL-022 | Value input changes type based on the selected Field (date) | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Select Field = Valid To | Field: Valid To | The Value field becomes a date picker | Medium | Positive | - |
| 23 | 1. Coupon Code List Screen | TC-CPL-023 | Value input changes type based on the selected Field (dropdown) | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Select Field = Coupon Type | Field: Coupon Type | The Value field becomes a dropdown with Promotional and Gift Card | Medium | Positive | - |
| 24 | 1. Coupon Code List Screen | TC-CPL-024 | Value input changes type based on the selected Field (link) | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Select Field = Pricing Rule | Field: Pricing Rule | The Value field becomes a searchable dropdown listing only Coupon Code Based pricing rules | Medium | Positive | - |
| 25 | 1. Coupon Code List Screen | TC-CPL-025 | Value is mandatory for a mandatory Field | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Select Field = Coupon Type
3. Leave Value empty
4. Click the confirm button | Field: Coupon Type | An error message is displayed because the Value is mandatory for this field | Medium | Negative | - |
| 26 | 1. Coupon Code List Screen | TC-CPL-026 | Value is optional for an optional Field | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Select Field = Valid To
3. Leave Value empty
4. Click the confirm button | Field: Valid To | The Valid To value is cleared on the selected coupon without an error | Medium | Positive | - |
| 27 | 1. Coupon Code List Screen | TC-CPL-027 | Value validation rules follow the selected Field | Access via Selling > Coupon Code | 1. Open the Edit popup
2. Select Field = Coupon Name
3. Enter a single character
4. Click the confirm button | Coupon Name: A | A minimum length (2 characters) error message is displayed | High | Negative | - |
| 28 | 1. Coupon Code List Screen | TC-CPL-028 | Bulk edit updates all selected coupons | Access via Selling > Coupon Code | 1. Select two coupons
2. Click Edit
3. Select Field = Valid To
4. Pick a date
5. Confirm | Valid To: 2026-12-31 | Valid To is updated on both selected coupons | High | Positive | Needs Clarification: SRS does not define the success message or a partial-failure result for bulk edit. |
| 29 | 1. Coupon Code List Screen | TC-CPL-029 | Bulk edit with a value that is invalid for one of the coupons | Access via Selling > Coupon Code | 1. Select two coupons (one with Valid From 2026-12-15)
2. Click Edit
3. Select Field = Valid To
4. Pick 2026-12-01
5. Confirm | Valid To earlier than Valid From of one record | The invalid record is rejected with an error message and the valid record is handled according to the BA rule | Medium | Negative | Needs Clarification: SRS does not define partial failure behavior. |
| 30 | 1. Coupon Code List Screen | TC-CPL-030 | Edit the Coupon Code (unique) field in bulk to a duplicate value | Access via Selling > Coupon Code | 1. Select one coupon
2. Click Edit
3. Select Field = Coupon Code
4. Enter the code of another existing coupon
5. Confirm | SUMMER25 | An error message is displayed because the coupon code must be unique | High | Negative | - |
| 31 | 1. Coupon Code List Screen | TC-CPL-031 | Export the selected coupons | Access via Selling > Coupon Code | 1. Select a coupon
2. Click Export | - | The selected coupons are exported to a file | Medium | Positive | Needs Clarification: SRS only names the action; format and columns are not defined. |
| 32 | 1. Coupon Code List Screen | TC-CPL-032 | Assign the selected coupon to a user | Access via Selling > Coupon Code | 1. Select a coupon
2. Click Assign to
3. Select a user
4. Confirm | User: Test QA User | The coupon is assigned to the selected user | Low | Positive | - |
| 33 | 1. Coupon Code List Screen | TC-CPL-033 | Clear the assignment of the selected coupon | Access via Selling > Coupon Code | 1. Select an assigned coupon
2. Click Clear assignment | - | The assignment is removed from the coupon | Low | Positive | - |
| 34 | 1. Coupon Code List Screen | TC-CPL-034 | Add a tag to the selected coupon | Access via Selling > Coupon Code | 1. Select a coupon
2. Click Add tags
3. Enter a tag
4. Confirm | Tag: Summer | The tag is added to the coupon | Low | Positive | - |
| 35 | 1. Coupon Code List Screen | TC-CPL-035 | Print the selected coupon | Access via Selling > Coupon Code | 1. Select a coupon
2. Click Print | - | The print preview / print dialog of the coupon is displayed | Low | Positive | - |
| 36 | 1. Coupon Code List Screen | TC-CPL-036 | Delete confirmation message is displayed | Access via Selling > Coupon Code | 1. Select an unlinked coupon
2. Click Delete | - | A confirmation message is displayed asking whether the user wants to delete this Coupon Code | High | Positive | - |
| 37 | 1. Coupon Code List Screen | TC-CPL-037 | Cancel the delete confirmation | Access via Selling > Coupon Code | 1. Select a coupon
2. Click Delete
3. Choose to not confirm (No / close) | - | The coupon is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS defines only the 'Yes' button; the cancel option is assumed. |
| 38 | 1. Coupon Code List Screen | TC-CPL-038 | Delete an unlinked coupon | Access via Selling > Coupon Code | 1. Select a coupon not used in any transaction
2. Click Delete
3. Click Yes | Unused coupon | The coupon is deleted successfully and removed from the list | High | Positive | - |
| 39 | 1. Coupon Code List Screen | TC-CPL-039 | Delete a coupon linked to a Sales Order | Access via Selling > Coupon Code | 1. Select a coupon used in a Sales Order
2. Click Delete
3. Click Yes | Coupon used in SO-2026-00001 | A message is displayed that the linked transactions must be deleted first; the coupon is not deleted | High | Negative | - |
| 40 | 1. Coupon Code List Screen | TC-CPL-040 | Linked doctypes in the warning message are hyperlinks | Access via Selling > Coupon Code | 1. Trigger the linked-transactions warning
2. Click a linked doctype | Sales Order | The user is redirected to the corresponding doctype list | Medium | Positive | - |
| 41 | 1. Coupon Code List Screen | TC-CPL-041 | Delete multiple coupons including a linked one | Access via Selling > Coupon Code | 1. Select one unlinked and one linked coupon
2. Click Delete
3. Click Yes | 2 coupons | Behavior follows the BA rule (linked coupon blocked) | Medium | Negative | Needs Clarification: SRS does not define bulk delete when only some records are linked. |
| 42 | 1. Coupon Code List Screen | TC-CPL-042 | Delete is blocked when the coupon is only referenced by a Pricing Rule | Access via Selling > Coupon Code | 1. Select a coupon
2. Click Delete
3. Click Yes | Coupon linked to PRLE-0001 | Behavior follows the BA rule | Low | Negative | Needs Clarification: SRS lists 'other transactions' without naming them; confirm whether the Pricing Rule link blocks deletion. |
| 43 | 1. Coupon Code List Screen | TC-CPL-043 | Search the list by Coupon Code ID | Access via Selling > Coupon Code | 1. Enter a coupon code ID in the search field | SUMMER25 | Only matching coupons are displayed | Medium | Positive | Needs Clarification: SRS does not describe search, filters or sorting for this list. |
| 44 | 1. Coupon Code List Screen | TC-CPL-044 | Filter the list by Coupon Type | Access via Selling > Coupon Code | 1. Open filters
2. Select Coupon Type = Gift Card | Gift Card | Only Gift Card coupons are displayed | Medium | Positive | Needs Clarification: SRS does not describe search, filters or sorting for this list. |
| 45 | 1. Coupon Code List Screen | TC-CPL-045 | Sort the list by Valid From | Access via Selling > Coupon Code | 1. Click the Valid From column / sort control | - | The list is sorted by Valid From ascending then descending | Low | Positive | Needs Clarification: SRS does not describe search, filters or sorting for this list. |
| 46 | 1. Coupon Code List Screen | TC-CPL-046 | List pagination with many coupons | Access via Selling > Coupon Code | 1. Create more coupons than the page size
2. Scroll / go to the next page | > 20 coupons | All records are reachable through pagination | Low | Positive | Needs Clarification: Pagination is not described in the SRS. |
| 47 | 2. Add Coupon Code Screen | TC-CPA-001 | Display all fields of the Add Coupon Code screen | Access via Selling > Coupon Code > Add Coupon Code | Open the Add Coupon Code screen | - | The screen displays: Coupon Name, Coupon Code, Coupon Type, Pricing Rule, Valid From, Valid To, Maximum Use, Used, Coupon Description and the Save button | High | UI | - |
| 48 | 2. Add Coupon Code Screen | TC-CPA-002 | From External Ecomm platform field is hidden | Access via Selling > Coupon Code > Add Coupon Code | Open the Add Coupon Code screen and review the fields | - | The 'From External Ecomm platform' checkbox is not displayed | Medium | UI | Needs Clarification: SRS marks the field '(Hidden)' but also describes behavior when it is checked. Confirm when it is shown (role, integration, setting). |
| 49 | 2. Add Coupon Code Screen | TC-CPA-003 | Customer field is hidden for the default Coupon Type | Access via Selling > Coupon Code > Add Coupon Code | Open the Add Coupon Code screen | - | The Customer field is not displayed | Medium | UI | - |
| 50 | 2. Add Coupon Code Screen | TC-CPA-004 | Used field is read only | Access via Selling > Coupon Code > Add Coupon Code | Open the Add Coupon Code screen and try to type in Used | - | The Used field is a read-only label (no input), displaying 0 for a new coupon | Medium | UI | Needs Clarification: SRS does not state the default value (0) of Used on a new coupon. |
| 51 | 2. Add Coupon Code Screen | TC-CPA-005 | Mandatory fields are marked | Access via Selling > Coupon Code > Add Coupon Code | Open the Add Coupon Code screen | - | Coupon Name, Coupon Code, Coupon Type and Pricing Rule are marked as mandatory | Medium | UI | - |
| 52 | 2. Add Coupon Code Screen | TC-CPA-006 | Optional fields are not marked mandatory | Access via Selling > Coupon Code > Add Coupon Code | Open the Add Coupon Code screen | - | Customer, Valid From, Valid To, Maximum Use and Coupon Description are not marked mandatory | Low | UI | - |
| 53 | 2. Add Coupon Code Screen | TC-CPA-007 | Add a coupon with all valid fields | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a valid Coupon Name
2. Enter a unique Coupon Code
3. Select Coupon Type = Promotional
4. Select a Pricing Rule
5. Click Save | Name: Summer Sale 2026 / Code: SUMMER25 / Type: Promotional / Pricing Rule: PRLE-0001 | The coupon is added successfully | High | Positive | Needs Clarification: SRS does not say where the user is redirected after Save (Details screen or list) nor the success message. |
| 54 | 2. Add Coupon Code Screen | TC-CPA-008 | Add a coupon with only mandatory fields | Access via Selling > Coupon Code > Add Coupon Code | 1. Fill only the mandatory fields
2. Click Save | Name: Basic Coupon / Code: BASIC10 / Type: Promotional / Pricing Rule: PRLE-0001 | The coupon is added successfully with optional fields empty | High | Positive | - |
| 55 | 2. Add Coupon Code Screen | TC-CPA-009 | Add a coupon with all fields (including optional) | Access via Selling > Coupon Code > Add Coupon Code | 1. Fill all fields including Valid From, Valid To, Maximum Use and Description
2. Click Save | Valid From: 2026-12-01 / Valid To: 2026-12-31 / Max Use: 50 / Description: Winter campaign | The coupon is added successfully with all entered data | High | Positive | - |
| 56 | 2. Add Coupon Code Screen | TC-CPA-010 | Coupon Name - minimum length (2 characters) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a 2-character name
2. Fill all other mandatory fields with valid data
3. Click Save | Name: AB | The coupon is saved without an error | Medium | Positive | - |
| 57 | 2. Add Coupon Code Screen | TC-CPA-011 | Coupon Name - below minimum length (1 character) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a 1-character name
2. Fill all other mandatory fields with valid data
3. Click Save | Name: A | An error message appears because the name is shorter than 2 characters | High | Negative | - |
| 58 | 2. Add Coupon Code Screen | TC-CPA-012 | Coupon Name - maximum length (100 characters) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a 100-character name
2. Fill all other mandatory fields with valid data
3. Click Save | 100 characters | The name is accepted and the coupon is saved | Medium | Positive | - |
| 59 | 2. Add Coupon Code Screen | TC-CPA-013 | Coupon Name - input is blocked beyond 100 characters | Access via Selling > Coupon Code > Add Coupon Code | Type or paste 101 characters in Coupon Name | 101 characters | Only the first 100 characters are accepted; further input is prevented | High | Negative | - |
| 60 | 2. Add Coupon Code Screen | TC-CPA-014 | Coupon Name - empty | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Coupon Name empty
2. Fill all other mandatory fields with valid data
3. Click Save | - | An error message appears because the field is mandatory and the coupon is not saved | High | Negative | - |
| 61 | 2. Add Coupon Code Screen | TC-CPA-015 | Coupon Name - whitespace only | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter spaces only in Coupon Name
2. Fill all other mandatory fields with valid data
3. Click Save | Name: '   ' | An error message appears; the coupon is not saved | Medium | Negative | Needs Clarification: SRS does not define how spaces-only input is treated. |
| 62 | 2. Add Coupon Code Screen | TC-CPA-016 | Coupon Name - leading and trailing spaces | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter ' Summer ' in Coupon Name
2. Fill all other mandatory fields with valid data
3. Click Save | Name: ' Summer ' | The coupon is saved and the name is trimmed | Low | Positive | Needs Clarification: Trimming behavior is not defined in the SRS. |
| 63 | 2. Add Coupon Code Screen | TC-CPA-017 | Coupon Name - letters, numbers and special characters | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a name containing all three types
2. Fill all other mandatory fields with valid data
3. Click Save | Name: Eid #1 - 50% Off! | The name is accepted and the coupon is saved | Medium | Positive | - |
| 64 | 2. Add Coupon Code Screen | TC-CPA-018 | Coupon Name - Arabic characters | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter an Arabic name
2. Fill all other mandatory fields with valid data
3. Click Save | Name: عرض الصيف | The name is accepted and displayed correctly | Medium | Positive | - |
| 65 | 2. Add Coupon Code Screen | TC-CPA-019 | Coupon Name - duplicate name | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter the name of an existing coupon
2. Enter a different unique Coupon Code
3. Click Save | Name: Summer Sale 2026 (already exists) | Behavior follows the BA rule (allowed or rejected) | Medium | Negative | Needs Clarification: SRS requires uniqueness only for Coupon Code, not for Coupon Name. |
| 66 | 2. Add Coupon Code Screen | TC-CPA-020 | Coupon Name - invalid name error | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a name containing only special characters
2. Fill all other mandatory fields with valid data
3. Click Save | Name: @@@@ | To be confirmed: an 'invalid name' error message is displayed | Low | Negative | Needs Clarification: SRS says 'Accepts letters, numbers, and special characters' and also 'an error message will appear if an invalid item name is entered' ('item name' looks copied). The invalid pattern is undefined. |
| 67 | 2. Add Coupon Code Screen | TC-CPA-021 | Coupon Code - valid unique code | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a unique Coupon Code
2. Fill all other mandatory fields with valid data
3. Click Save | Code: SUMMER25 | The code is accepted and the coupon is saved | High | Positive | - |
| 68 | 2. Add Coupon Code Screen | TC-CPA-022 | Coupon Code - minimum length (2 characters) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a 2-character code
2. Fill all other mandatory fields with valid data
3. Click Save | Code: S1 | The code is accepted and the coupon is saved | Medium | Positive | - |
| 69 | 2. Add Coupon Code Screen | TC-CPA-023 | Coupon Code - below minimum length (1 character) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a 1-character code
2. Fill all other mandatory fields with valid data
3. Click Save | Code: S | An error message appears because the code is shorter than 2 characters | High | Negative | - |
| 70 | 2. Add Coupon Code Screen | TC-CPA-024 | Coupon Code - maximum length (100 characters) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a 100-character code
2. Fill all other mandatory fields with valid data
3. Click Save | 100 characters | The code is accepted and the coupon is saved | Medium | Positive | - |
| 71 | 2. Add Coupon Code Screen | TC-CPA-025 | Coupon Code - input is blocked beyond 100 characters | Access via Selling > Coupon Code > Add Coupon Code | Type or paste 101 characters in Coupon Code | 101 characters | Only the first 100 characters are accepted; further input is prevented | High | Negative | - |
| 72 | 2. Add Coupon Code Screen | TC-CPA-026 | Coupon Code - empty | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Coupon Code empty
2. Fill all other mandatory fields with valid data
3. Click Save | - | An error message appears because the field is mandatory and the coupon is not saved | High | Negative | - |
| 73 | 2. Add Coupon Code Screen | TC-CPA-027 | Coupon Code - duplicate code | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter the code of an existing coupon
2. Fill all other mandatory fields with valid data
3. Click Save | Code: SUMMER25 (already exists) | The coupon is not saved and an error message indicates that the code must be unique | High | Negative | Needs Clarification: SRS does not define the duplicate-code error message. |
| 74 | 2. Add Coupon Code Screen | TC-CPA-028 | Coupon Code - duplicate with different letter case | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter 'summer25' while 'SUMMER25' exists
2. Fill all other mandatory fields with valid data
3. Click Save | Code: summer25 | Behavior follows the BA rule (case-insensitive uniqueness expected) | Medium | Negative | Needs Clarification: SRS does not say whether uniqueness is case sensitive. |
| 75 | 2. Add Coupon Code Screen | TC-CPA-029 | Coupon Code - duplicate with leading or trailing space | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter ' SUMMER25' while 'SUMMER25' exists
2. Fill all other mandatory fields with valid data
3. Click Save | Code: ' SUMMER25' | The code is treated as a duplicate and rejected | Low | Negative | Needs Clarification: Trimming is not defined in the SRS. |
| 76 | 2. Add Coupon Code Screen | TC-CPA-030 | Coupon Code - special characters | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a code with special characters
2. Fill all other mandatory fields with valid data
3. Click Save | Code: SAVE-20%_VIP | The code is accepted and the coupon is saved | Medium | Positive | - |
| 77 | 2. Add Coupon Code Screen | TC-CPA-031 | Coupon Code - Arabic characters | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter an Arabic code
2. Fill all other mandatory fields with valid data
3. Click Save | Code: خصم٢٠ | The code is accepted and the coupon is saved | Low | Positive | Needs Clarification: Confirm that non-Latin codes can be redeemed. |
| 78 | 2. Add Coupon Code Screen | TC-CPA-032 | Coupon Code - spaces inside the code | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a code that contains a space
2. Fill all other mandatory fields with valid data
3. Click Save | Code: SUMMER 25 | Behavior follows the BA rule (accepted or rejected) | Low | Negative | Needs Clarification: SRS does not say whether spaces are allowed. |
| 79 | 2. Add Coupon Code Screen | TC-CPA-033 | Coupon Code - whitespace only | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter spaces only
2. Fill all other mandatory fields with valid data
3. Click Save | Code: '  ' | An error message appears; the coupon is not saved | Medium | Negative | - |
| 80 | 2. Add Coupon Code Screen | TC-CPA-034 | Coupon Code - duplicate error is shown without saving other data | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a duplicate code
2. Click Save
3. Review the form | SUMMER25 | The error is shown and the other entered values are kept in the form | Low | Negative | - |
| 81 | 2. Add Coupon Code Screen | TC-CPA-035 | From External Ecomm platform - Pricing Rule behavior when checked | Access via Selling > Coupon Code > Add Coupon Code | 1. Make the 'From External Ecomm platform' checkbox available
2. Check it | - | The Pricing Rule field is hidden | Medium | Positive | Needs Clarification: The checkbox is 'Hidden' in the SRS, so it cannot be checked from the UI. Also Pricing Rule is mandatory: if hidden, what is saved? |
| 82 | 2. Add Coupon Code Screen | TC-CPA-036 | Save with 'From External Ecomm platform' checked and no Pricing Rule | Access via Selling > Coupon Code > Add Coupon Code | 1. Check the checkbox (if available)
2. Fill Coupon Name, Coupon Code and Coupon Type
3. Click Save | Ecomm: checked | The coupon is saved without a Pricing Rule | Medium | Positive | Needs Clarification: Conflict between 'Pricing Rule mandatory' and 'Pricing Rule hidden when checked'. |
| 83 | 2. Add Coupon Code Screen | TC-CPA-037 | Coupon Type - dropdown values | Access via Selling > Coupon Code > Add Coupon Code | Open the Coupon Type dropdown | - | The values are: Promotional, Gift Card | High | Positive | - |
| 84 | 2. Add Coupon Code Screen | TC-CPA-038 | Coupon Type - single selection | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Promotional
2. Select Gift Card | - | Only the last selected value is kept | Low | Positive | - |
| 85 | 2. Add Coupon Code Screen | TC-CPA-039 | Coupon Type - empty | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Coupon Type empty
2. Fill all other mandatory fields with valid data
3. Click Save | - | An error message appears because the field is mandatory | High | Negative | - |
| 86 | 2. Add Coupon Code Screen | TC-CPA-040 | Coupon Type - Promotional | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Coupon Type = Promotional
2. Fill all other mandatory fields with valid data
3. Click Save | Promotional | The coupon is saved and the Customer field is not displayed | High | Positive | - |
| 87 | 2. Add Coupon Code Screen | TC-CPA-041 | Coupon Type - Gift Card | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Coupon Type = Gift Card
2. Fill all other mandatory fields with valid data
3. Click Save | Gift Card | The coupon is saved | High | Positive | - |
| 88 | 2. Add Coupon Code Screen | TC-CPA-042 | Customer field appears only for Gift Card | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Coupon Type = Gift Card | Gift Card | The Customer field is displayed | High | Positive | - |
| 89 | 2. Add Coupon Code Screen | TC-CPA-043 | Customer field is hidden for Promotional | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Coupon Type = Promotional | Promotional | The Customer field is not displayed | High | Negative | - |
| 90 | 2. Add Coupon Code Screen | TC-CPA-044 | Customer value is cleared when switching from Gift Card to Promotional | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Gift Card
2. Select a Customer
3. Switch Coupon Type to Promotional
4. Switch back to Gift Card | Customer: Test Customer 1 | The Customer field is hidden for Promotional; the previous value is cleared (or kept) according to the BA rule | Medium | Negative | Needs Clarification: SRS does not define what happens to a selected Customer when the type changes. |
| 91 | 2. Add Coupon Code Screen | TC-CPA-045 | Customer - optional for Gift Card | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Gift Card
2. Leave Customer empty
3. Fill all other mandatory fields with valid data
4. Click Save | Gift Card, Customer: empty | The coupon is saved without a customer | Medium | Positive | - |
| 92 | 2. Add Coupon Code Screen | TC-CPA-046 | Customer - select a customer for Gift Card | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Gift Card
2. Select a Customer
3. Fill all other mandatory fields with valid data
4. Click Save | Customer: Test Customer 1 | The coupon is saved and linked to the selected customer | High | Positive | - |
| 93 | 2. Add Coupon Code Screen | TC-CPA-047 | Customer - searchable dropdown | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Gift Card
2. Open the Customer field
3. Type part of a customer name | Test | The list is filtered by the typed text | Medium | Positive | - |
| 94 | 2. Add Coupon Code Screen | TC-CPA-048 | Customer - non-existing value is rejected | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Gift Card
2. Type a customer name that does not exist
3. Click outside | Customer: Unknown XYZ | No option is selectable and the value is not accepted | Medium | Negative | - |
| 95 | 2. Add Coupon Code Screen | TC-CPA-049 | Customer - disabled customer | Access via Selling > Coupon Code > Add Coupon Code | 1. Select Gift Card
2. Search for a disabled customer | Disabled customer | The disabled customer is not offered (or an error appears) | Low | Negative | Needs Clarification: SRS does not say whether disabled customers can be selected. |
| 96 | 2. Add Coupon Code Screen | TC-CPA-050 | Pricing Rule - searchable dropdown | Access via Selling > Coupon Code > Add Coupon Code | 1. Open the Pricing Rule field
2. Type part of a pricing rule name | PRLE | The list is filtered by the typed text | Medium | Positive | - |
| 97 | 2. Add Coupon Code Screen | TC-CPA-051 | Pricing Rule - only Coupon Code Based rules are listed | Access via Selling > Coupon Code > Add Coupon Code | Open the Pricing Rule dropdown | Rules with and without Coupon Code Based | Only pricing rules with the Coupon Code Based option enabled are displayed | High | Positive | - |
| 98 | 2. Add Coupon Code Screen | TC-CPA-052 | Pricing Rule - non Coupon Code Based rule is not selectable | Access via Selling > Coupon Code > Add Coupon Code | 1. Type the name of a rule that is not Coupon Code Based | PRLE-0002 (not coupon based) | The rule is not offered in the list | High | Negative | - |
| 99 | 2. Add Coupon Code Screen | TC-CPA-053 | Pricing Rule - empty | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Pricing Rule empty
2. Fill all other mandatory fields with valid data
3. Click Save | - | An error message appears because the field is mandatory | High | Negative | - |
| 100 | 2. Add Coupon Code Screen | TC-CPA-054 | Pricing Rule - single selection | Access via Selling > Coupon Code > Add Coupon Code | 1. Select a pricing rule
2. Select another one | - | Only the last selected rule is kept | Low | Positive | - |
| 101 | 2. Add Coupon Code Screen | TC-CPA-055 | Pricing Rule - disabled rule | Access via Selling > Coupon Code > Add Coupon Code | 1. Open the Pricing Rule dropdown and look for a disabled rule | Disabled rule | Behavior follows the BA rule (a disabled rule should not be selectable) | Medium | Negative | Needs Clarification: SRS does not say whether disabled or expired pricing rules are listed. |
| 102 | 2. Add Coupon Code Screen | TC-CPA-056 | Pricing Rule - already used by another coupon | Access via Selling > Coupon Code > Add Coupon Code | 1. Select a pricing rule that is used by another coupon
2. Fill all other mandatory fields with valid data
3. Click Save | PRLE-0001 (used by SUMMER25) | Behavior follows the BA rule (one rule to many coupons) | Medium | Positive | Needs Clarification: SRS does not say whether a pricing rule can be linked to more than one coupon. |
| 103 | 2. Add Coupon Code Screen | TC-CPA-057 | Pricing Rule - no Coupon Code Based rule exists | Access via Selling > Coupon Code > Add Coupon Code | Open the Pricing Rule dropdown in a system without coupon-based rules | - | An empty list / no-data message is displayed and the coupon cannot be saved | Medium | Negative | - |
| 104 | 2. Add Coupon Code Screen | TC-CPA-058 | Valid From - select a date from the calendar | Access via Selling > Coupon Code > Add Coupon Code | 1. Click Valid From
2. Pick a date | 2026-12-01 | The picked date is displayed in the field | Medium | Positive | - |
| 105 | 2. Add Coupon Code Screen | TC-CPA-059 | Valid From - optional | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Valid From empty
2. Fill all other mandatory fields with valid data
3. Click Save | - | The coupon is saved without an error | Medium | Positive | - |
| 106 | 2. Add Coupon Code Screen | TC-CPA-060 | Valid To - select a date from the calendar | Access via Selling > Coupon Code > Add Coupon Code | 1. Click Valid To
2. Pick a date | 2026-12-31 | The picked date is displayed in the field | Medium | Positive | - |
| 107 | 2. Add Coupon Code Screen | TC-CPA-061 | Valid To - optional | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Valid To empty
2. Fill all other mandatory fields with valid data
3. Click Save | - | The coupon is saved without an error | Medium | Positive | - |
| 108 | 2. Add Coupon Code Screen | TC-CPA-062 | Valid To greater than Valid From | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter Valid From
2. Enter a later Valid To
3. Fill all other mandatory fields with valid data
4. Click Save | From: 2026-12-01 / To: 2026-12-31 | The coupon is saved | High | Positive | - |
| 109 | 2. Add Coupon Code Screen | TC-CPA-063 | Valid To earlier than Valid From | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter Valid From = 2026-12-31
2. Enter Valid To = 2026-12-01
3. Fill all other mandatory fields with valid data
4. Click Save | From: 2026-12-31 / To: 2026-12-01 | An error message appears and the coupon is not saved | High | Negative | Needs Clarification: SRS defines the rule but not the error message text or which field shows it. |
| 110 | 2. Add Coupon Code Screen | TC-CPA-064 | Valid To equal to Valid From | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter the same date in Valid From and Valid To
2. Fill all other mandatory fields with valid data
3. Click Save | From = To = 2026-12-01 | Behavior follows the BA rule | High | Negative | Needs Clarification: SRS says 'Valid To must be greater than Valid From': an equal date (one-day coupon) is not clear. |
| 111 | 2. Add Coupon Code Screen | TC-CPA-065 | Only Valid To is entered | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Valid From empty
2. Enter Valid To
3. Fill all other mandatory fields with valid data
4. Click Save | To: 2026-12-31 | The coupon is saved (valid from creation until Valid To) | Medium | Positive | - |
| 112 | 2. Add Coupon Code Screen | TC-CPA-066 | Only Valid From is entered | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter Valid From
2. Leave Valid To empty
3. Fill all other mandatory fields with valid data
4. Click Save | From: 2026-12-01 | The coupon is saved (valid without an end date) | Medium | Positive | - |
| 113 | 2. Add Coupon Code Screen | TC-CPA-067 | Valid From in the past | Access via Selling > Coupon Code > Add Coupon Code | 1. Select a past date in Valid From
2. Fill all other mandatory fields with valid data
3. Click Save | From: 2025-01-01 | Behavior follows the BA rule (allowed or rejected) | Medium | Positive | Needs Clarification: SRS does not say whether past dates are allowed. |
| 114 | 2. Add Coupon Code Screen | TC-CPA-068 | Valid To in the past | Access via Selling > Coupon Code > Add Coupon Code | 1. Select a past date in Valid To
2. Fill all other mandatory fields with valid data
3. Click Save | To: 2025-12-31 | Behavior follows the BA rule (allowed or rejected) | Medium | Negative | Needs Clarification: SRS does not say whether an already expired coupon can be created. |
| 115 | 2. Add Coupon Code Screen | TC-CPA-069 | Valid To is re-validated when Valid From is changed afterwards | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter From 2026-12-01 and To 2026-12-31
2. Change From to 2027-01-01
3. Click Save | From: 2027-01-01 / To: 2026-12-31 | An error message appears and the coupon is not saved | Medium | Negative | - |
| 116 | 2. Add Coupon Code Screen | TC-CPA-070 | Valid From - manually typed invalid date | Access via Selling > Coupon Code > Add Coupon Code | 1. Type an invalid date in Valid From | 31/31/2026 | The value is rejected / an error message appears | Low | Negative | - |
| 117 | 2. Add Coupon Code Screen | TC-CPA-071 | Maximum Use - valid number | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a number in Maximum Use
2. Fill all other mandatory fields with valid data
3. Click Save | Max Use: 50 | The coupon is saved with Maximum Use 50 | High | Positive | - |
| 118 | 2. Add Coupon Code Screen | TC-CPA-072 | Maximum Use - optional | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Maximum Use empty
2. Fill all other mandatory fields with valid data
3. Click Save | - | The coupon is saved and has no usage limit | Medium | Positive | Needs Clarification: SRS does not say what an empty Maximum Use means (unlimited expected). |
| 119 | 2. Add Coupon Code Screen | TC-CPA-073 | Maximum Use - single digit | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a single digit in Maximum Use
2. Fill all other mandatory fields with valid data
3. Click Save | Max Use: 5 | The value 5 is accepted | High | Positive | Needs Clarification: SRS states a minimum length of 2 characters, which would block the valid limits 1 to 9. Likely a template error. |
| 120 | 2. Add Coupon Code Screen | TC-CPA-074 | Maximum Use - minimum length (2 digits) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter two digits
2. Fill all other mandatory fields with valid data
3. Click Save | Max Use: 10 | The value is accepted | Medium | Positive | - |
| 121 | 2. Add Coupon Code Screen | TC-CPA-075 | Maximum Use - letters are not accepted | Access via Selling > Coupon Code > Add Coupon Code | Type letters in Maximum Use | Max Use: abc | The letters are not entered (numbers only) | High | Negative | - |
| 122 | 2. Add Coupon Code Screen | TC-CPA-076 | Maximum Use - special characters are not accepted | Access via Selling > Coupon Code > Add Coupon Code | Type special characters in Maximum Use | Max Use: @#$ | The characters are not entered | Medium | Negative | - |
| 123 | 2. Add Coupon Code Screen | TC-CPA-077 | Maximum Use - negative number | Access via Selling > Coupon Code > Add Coupon Code | Type a negative number in Maximum Use | Max Use: -10 | The value is rejected (numbers only) | Medium | Negative | - |
| 124 | 2. Add Coupon Code Screen | TC-CPA-078 | Maximum Use - decimal number | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a decimal number in Maximum Use
2. Fill all other mandatory fields with valid data
3. Click Save | Max Use: 10.5 | The value is rejected or the dot is not accepted | Medium | Negative | Needs Clarification: SRS says numbers only; decimals are not addressed. |
| 125 | 2. Add Coupon Code Screen | TC-CPA-079 | Maximum Use - zero | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter 00 in Maximum Use
2. Fill all other mandatory fields with valid data
3. Click Save | Max Use: 00 | Behavior follows the BA rule (zero = unlimited or an error) | Medium | Negative | Needs Clarification: SRS does not define zero (in ERPNext 0 means unlimited). |
| 126 | 2. Add Coupon Code Screen | TC-CPA-080 | Maximum Use - spaces | Access via Selling > Coupon Code > Add Coupon Code | Type spaces in Maximum Use | Max Use: '  ' | The spaces are not accepted | Low | Negative | - |
| 127 | 2. Add Coupon Code Screen | TC-CPA-081 | Maximum Use - arabic-indic digits | Access via Selling > Coupon Code > Add Coupon Code | Type Arabic-indic digits in Maximum Use | Max Use: ٥٠ | Behavior follows the BA rule (accepted and converted, or rejected) | Low | Negative | Needs Clarification: SRS does not define digit set. |
| 128 | 2. Add Coupon Code Screen | TC-CPA-082 | Maximum Use - maximum length (100 digits) | Access via Selling > Coupon Code > Add Coupon Code | Enter 100 digits in Maximum Use | 100 digits | The value is accepted by the field | Low | Positive | Needs Clarification: 100 digits is not a realistic count; the SRS gives no numeric maximum (overflow risk). |
| 129 | 2. Add Coupon Code Screen | TC-CPA-083 | Maximum Use - input blocked beyond 100 characters | Access via Selling > Coupon Code > Add Coupon Code | Type 101 digits in Maximum Use | 101 digits | Only the first 100 digits are accepted; further input is prevented | Medium | Negative | - |
| 130 | 2. Add Coupon Code Screen | TC-CPA-084 | Maximum Use - very large value is saved | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a very large number (e.g. 20 digits)
2. Fill all other mandatory fields with valid data
3. Click Save | Max Use: 99999999999999999999 | The coupon is saved or a clear validation error is shown (no server error) | Medium | Negative | Needs Clarification: No numeric upper limit is defined. |
| 131 | 2. Add Coupon Code Screen | TC-CPA-085 | Maximum Use - leading zeros | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter 007
2. Fill all other mandatory fields with valid data
3. Click Save | Max Use: 007 | The value is saved as 7 | Low | Positive | - |
| 132 | 2. Add Coupon Code Screen | TC-CPA-086 | Used - displays zero on a new coupon | Access via Selling > Coupon Code > Add Coupon Code | 1. Add a new coupon
2. Open it | - | Used = 0 | Medium | Positive | - |
| 133 | 2. Add Coupon Code Screen | TC-CPA-087 | Used - cannot be edited | Access via Selling > Coupon Code > Add Coupon Code | Click the Used field | - | The field is read only and cannot be edited | Medium | Negative | - |
| 134 | 2. Add Coupon Code Screen | TC-CPA-088 | Coupon Description - valid text | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a description
2. Fill all other mandatory fields with valid data
3. Click Save | Description: Valid on all items in December | The coupon is saved with the description | Medium | Positive | - |
| 135 | 2. Add Coupon Code Screen | TC-CPA-089 | Coupon Description - optional | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave Coupon Description empty
2. Fill all other mandatory fields with valid data
3. Click Save | - | The coupon is saved without an error | Medium | Positive | - |
| 136 | 2. Add Coupon Code Screen | TC-CPA-090 | Coupon Description - minimum length (3 characters) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter 3 characters
2. Fill all other mandatory fields with valid data
3. Click Save | Description: ABC | The coupon is saved | Medium | Positive | - |
| 137 | 2. Add Coupon Code Screen | TC-CPA-091 | Coupon Description - below minimum length (2 characters) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter 2 characters
2. Fill all other mandatory fields with valid data
3. Click Save | Description: AB | An error message appears because the text is shorter than 3 characters | High | Negative | - |
| 138 | 2. Add Coupon Code Screen | TC-CPA-092 | Coupon Description - maximum length (500 characters) | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter 500 characters
2. Fill all other mandatory fields with valid data
3. Click Save | 500 characters | The description is accepted and saved | Medium | Positive | - |
| 139 | 2. Add Coupon Code Screen | TC-CPA-093 | Coupon Description - input blocked beyond 500 characters | Access via Selling > Coupon Code > Add Coupon Code | Type or paste 501 characters | 501 characters | Only the first 500 characters are accepted; further input is prevented | Medium | Negative | - |
| 140 | 2. Add Coupon Code Screen | TC-CPA-094 | Coupon Description - letters, numbers and special characters | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a description with all three types
2. Fill all other mandatory fields with valid data
3. Click Save | Use code SAVE-20 for 20% off (VIP only)! | The description is accepted | Low | Positive | - |
| 141 | 2. Add Coupon Code Screen | TC-CPA-095 | Coupon Description - multi-line text | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter a description with line breaks
2. Fill all other mandatory fields with valid data
3. Click Save | Line 1 / Line 2 | The description is saved with line breaks | Low | Positive | - |
| 142 | 2. Add Coupon Code Screen | TC-CPA-096 | Coupon Description - invalid data error | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter unsupported characters (e.g. only emojis)
2. Fill all other mandatory fields with valid data
3. Click Save | Description: 😀😀😀 | To be confirmed: an error message for invalid data | Low | Negative | Needs Clarification: SRS says an error appears 'if invalid data is entered' while all characters are accepted. The invalid pattern is undefined. |
| 143 | 2. Add Coupon Code Screen | TC-CPA-097 | Coupon Description - whitespace only | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter spaces only
2. Fill all other mandatory fields with valid data
3. Click Save | '     ' | An error message appears or the field is treated as empty | Low | Negative | - |
| 144 | 2. Add Coupon Code Screen | TC-CPA-098 | Save - multiple invalid fields show one error per field | Access via Selling > Coupon Code > Add Coupon Code | 1. Leave the form empty
2. Click Save | - | A validation error is displayed for each mandatory field (Coupon Name, Coupon Code, Coupon Type, Pricing Rule) | High | Negative | - |
| 145 | 2. Add Coupon Code Screen | TC-CPA-099 | Save - the coupon is not created when validation fails | Access via Selling > Coupon Code > Add Coupon Code | 1. Click Save with invalid data
2. Open the coupon list | - | No new coupon is added to the list | High | Negative | - |
| 146 | 2. Add Coupon Code Screen | TC-CPA-100 | Save - data is kept in the form after a validation error | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter valid and invalid data
2. Click Save | - | The valid values remain in the form after the error is displayed | Medium | Positive | - |
| 147 | 2. Add Coupon Code Screen | TC-CPA-101 | Save - double click does not create duplicates | Access via Selling > Coupon Code > Add Coupon Code | 1. Fill valid data
2. Double click Save | Code: SUMMER25 | Only one coupon is created | Medium | Negative | - |
| 148 | 2. Add Coupon Code Screen | TC-CPA-102 | Save - the saved data matches the entered data | Access via Selling > Coupon Code > Add Coupon Code | 1. Add a coupon with all fields
2. Open its Details screen | All fields | Every field shows the value that was entered | High | Positive | - |
| 149 | 2. Add Coupon Code Screen | TC-CPA-103 | Save - the new coupon is displayed in the list | Access via Selling > Coupon Code > Add Coupon Code | 1. Add a valid coupon
2. Open the list | - | The coupon appears in the list with the correct type and Valid From | High | Positive | - |
| 150 | 2. Add Coupon Code Screen | TC-CPA-104 | Leave the screen with unsaved data | Access via Selling > Coupon Code > Add Coupon Code | 1. Enter data in some fields
2. Navigate to another screen | - | A warning about unsaved changes is displayed (or the data is discarded) | Low | Negative | Needs Clarification: SRS does not define it. |
| 151 | 2. Add Coupon Code Screen | TC-CPA-105 | Add a coupon with Customer in Gift Card then check the Details | Access via Selling > Coupon Code > Add Coupon Code | 1. Add a Gift Card coupon with a customer
2. Open the Details | Customer: Test Customer 1 | Customer is displayed on the Details screen | Medium | Positive | - |
| 152 | 2. Add Coupon Code Screen | TC-CPA-106 | Mandatory field messages are localized | Access via Selling > Coupon Code > Add Coupon Code | 1. Switch the language to Arabic
2. Click Save on an empty form | - | Messages are displayed in Arabic and no English text appears | Low | UI | - |
| 153 | 2. Add Coupon Code Screen | TC-CPA-107 | Field labels are localized | Access via Selling > Coupon Code > Add Coupon Code | 1. Switch the language to Arabic
2. Open the Add Coupon Code screen | - | All labels are displayed in Arabic | Low | UI | - |
| 154 | 3. Coupon Code Details Screen | TC-CPD-001 | Open the Details screen | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Selling
2. Click Coupon Code
3. Click a Coupon Code ID | SUMMER25 | The Coupon Code Details screen is displayed | High | Positive | - |
| 155 | 3. Coupon Code Details Screen | TC-CPD-002 | Details display the data entered at creation | Access via Selling > Coupon Code > Coupon Code ID | Open the Details of a coupon added with all fields | - | All entered fields (name, code, type, customer, pricing rule, dates, maximum use, description) are displayed with the saved values | High | Positive | - |
| 156 | 3. Coupon Code Details Screen | TC-CPD-003 | Details display Used | Access via Selling > Coupon Code > Coupon Code ID | Open the Details of a coupon used in a Sales Order | Used: 2 | The Used field shows the number of times the coupon was redeemed | Medium | Positive | - |
| 157 | 3. Coupon Code Details Screen | TC-CPD-004 | Fixed page actions are displayed | Access via Selling > Coupon Code > Coupon Code ID | Review the top of the Details screen | - | The actions are displayed: Add / Edit Coupon Conditions, Assign, Attachment, Tags, Share, Print, Delete | Medium | UI | - |
| 158 | 3. Coupon Code Details Screen | TC-CPD-005 | Fixed page actions stay visible when scrolling | Access via Selling > Coupon Code > Coupon Code ID | 1. Scroll down the Details screen | - | The page actions remain fixed and visible at the top | Low | UI | - |
| 159 | 3. Coupon Code Details Screen | TC-CPD-006 | Edit Coupon Name | Access via Selling > Coupon Code > Coupon Code ID | 1. Change the Coupon Name
2. Click Save | Name: Summer Sale 2026 V2 | The coupon is updated and the new name is displayed | High | Positive | Needs Clarification: SRS does not name the Save button on the Details screen. |
| 160 | 3. Coupon Code Details Screen | TC-CPD-007 | Edit Coupon Name below minimum length | Access via Selling > Coupon Code > Coupon Code ID | 1. Enter one character
2. Click Save | Name: A | An error message appears and the coupon is not updated | High | Negative | - |
| 161 | 3. Coupon Code Details Screen | TC-CPD-008 | Edit Coupon Name - empty | Access via Selling > Coupon Code > Coupon Code ID | 1. Clear Coupon Name
2. Click Save | - | An error message appears because the field is mandatory | High | Negative | - |
| 162 | 3. Coupon Code Details Screen | TC-CPD-009 | Edit Coupon Code to a unique value | Access via Selling > Coupon Code > Coupon Code ID | 1. Change the Coupon Code
2. Click Save | Code: SUMMER26 | The coupon code is updated | Medium | Positive | Needs Clarification: SRS does not say whether Coupon Code can be edited after creation (it is the redemption key). |
| 163 | 3. Coupon Code Details Screen | TC-CPD-010 | Edit Coupon Code to a duplicate value | Access via Selling > Coupon Code > Coupon Code ID | 1. Enter the code of another coupon
2. Click Save | Code: BASIC10 | An error message appears because the code must be unique | High | Negative | - |
| 164 | 3. Coupon Code Details Screen | TC-CPD-011 | Edit Coupon Code - empty | Access via Selling > Coupon Code > Coupon Code ID | 1. Clear Coupon Code
2. Click Save | - | An error message appears because the field is mandatory | High | Negative | - |
| 165 | 3. Coupon Code Details Screen | TC-CPD-012 | Edit Coupon Type from Promotional to Gift Card | Access via Selling > Coupon Code > Coupon Code ID | 1. Change Coupon Type to Gift Card
2. Click Save | Gift Card | The Customer field appears and the coupon is updated | Medium | Positive | - |
| 166 | 3. Coupon Code Details Screen | TC-CPD-013 | Edit Coupon Type from Gift Card to Promotional | Access via Selling > Coupon Code > Coupon Code ID | 1. Change Coupon Type to Promotional
2. Click Save | Promotional | The Customer field is hidden and the coupon is updated | Medium | Positive | Needs Clarification: Impact on the existing Customer value is not defined. |
| 167 | 3. Coupon Code Details Screen | TC-CPD-014 | Edit Customer on a Gift Card | Access via Selling > Coupon Code > Coupon Code ID | 1. Select another customer
2. Click Save | Customer: Test Customer 2 | The customer is updated | Medium | Positive | - |
| 168 | 3. Coupon Code Details Screen | TC-CPD-015 | Edit Pricing Rule | Access via Selling > Coupon Code > Coupon Code ID | 1. Select another Coupon Code Based rule
2. Click Save | PRLE-0003 | The pricing rule is updated | High | Positive | - |
| 169 | 3. Coupon Code Details Screen | TC-CPD-016 | Edit Pricing Rule - empty | Access via Selling > Coupon Code > Coupon Code ID | 1. Clear Pricing Rule
2. Click Save | - | An error message appears because the field is mandatory | High | Negative | - |
| 170 | 3. Coupon Code Details Screen | TC-CPD-017 | Edit Valid From and Valid To | Access via Selling > Coupon Code > Coupon Code ID | 1. Change both dates
2. Click Save | From: 2026-12-05 / To: 2027-01-05 | The dates are updated | Medium | Positive | - |
| 171 | 3. Coupon Code Details Screen | TC-CPD-018 | Edit Valid To earlier than Valid From | Access via Selling > Coupon Code > Coupon Code ID | 1. Set Valid To before Valid From
2. Click Save | From: 2026-12-31 / To: 2026-12-01 | An error message appears and the coupon is not updated | High | Negative | - |
| 172 | 3. Coupon Code Details Screen | TC-CPD-019 | Clear Valid From and Valid To | Access via Selling > Coupon Code > Coupon Code ID | 1. Clear both dates
2. Click Save | - | The dates are removed and the coupon is updated | Low | Positive | - |
| 173 | 3. Coupon Code Details Screen | TC-CPD-020 | Edit Maximum Use to a valid number | Access via Selling > Coupon Code > Coupon Code ID | 1. Change Maximum Use
2. Click Save | Max Use: 100 | The value is updated | Medium | Positive | - |
| 174 | 3. Coupon Code Details Screen | TC-CPD-021 | Edit Maximum Use to less than Used | Access via Selling > Coupon Code > Coupon Code ID | 1. Open a coupon with Used = 5
2. Set Maximum Use to 02
3. Click Save | Used: 5 / Max Use: 02 | Behavior follows the BA rule (rejected or accepted) | Medium | Negative | Needs Clarification: SRS does not define Maximum Use lower than the already Used count. |
| 175 | 3. Coupon Code Details Screen | TC-CPD-022 | Edit Maximum Use - letters | Access via Selling > Coupon Code > Coupon Code ID | Type letters in Maximum Use | Max Use: abc | The letters are not accepted | Medium | Negative | - |
| 176 | 3. Coupon Code Details Screen | TC-CPD-023 | Edit Coupon Description | Access via Selling > Coupon Code > Coupon Code ID | 1. Change the description
2. Click Save | Description: Updated notes | The description is updated | Low | Positive | - |
| 177 | 3. Coupon Code Details Screen | TC-CPD-024 | Edit Coupon Description below minimum length | Access via Selling > Coupon Code > Coupon Code ID | 1. Enter two characters
2. Click Save | Description: AB | An error message appears | Medium | Negative | - |
| 178 | 3. Coupon Code Details Screen | TC-CPD-025 | Used field is read only on the Details screen | Access via Selling > Coupon Code > Coupon Code ID | Click the Used field | - | The field cannot be edited | Medium | Negative | - |
| 179 | 3. Coupon Code Details Screen | TC-CPD-026 | Edit an expired coupon | Access via Selling > Coupon Code > Coupon Code ID | 1. Open a coupon whose Valid To is in the past
2. Change the description
3. Click Save | Expired coupon | The coupon can be updated | Low | Positive | Needs Clarification: SRS does not restrict editing expired coupons. |
| 180 | 3. Coupon Code Details Screen | TC-CPD-027 | Edit a coupon that has been used in a Sales Order | Access via Selling > Coupon Code > Coupon Code ID | 1. Open a used coupon
2. Change Pricing Rule
3. Click Save | Used coupon | Behavior follows the BA rule (allowed or blocked) | Medium | Negative | Needs Clarification: SRS does not say whether a used coupon can be modified. |
| 181 | 3. Coupon Code Details Screen | TC-CPD-028 | Save without changes | Access via Selling > Coupon Code > Coupon Code ID | 1. Open a coupon
2. Click Save without editing | - | No error appears; the record is unchanged | Low | Positive | - |
| 182 | 3. Coupon Code Details Screen | TC-CPD-029 | Unsaved changes warning | Access via Selling > Coupon Code > Coupon Code ID | 1. Change a field
2. Navigate away without saving | - | A warning about unsaved changes is displayed (or the changes are discarded) | Low | Negative | Needs Clarification: SRS does not define it. |
| 183 | 3. Coupon Code Details Screen | TC-CPD-030 | Saved changes persist after reload | Access via Selling > Coupon Code > Coupon Code ID | 1. Edit and save a field
2. Reload the page | Name changed | The updated value is displayed | High | Positive | - |
| 184 | 3. Coupon Code Details Screen | TC-CPD-031 | Two users edit the same coupon | Access via Selling > Coupon Code > Coupon Code ID | 1. User A and User B open the same coupon
2. User A saves a change
3. User B saves another change | - | User B gets a message that the document was modified (or the last change wins per the BA rule) | Low | Negative | Needs Clarification: Concurrent edit behavior is not defined. |
| 185 | 3. Coupon Code Details Screen | TC-CPD-032 | Add / Edit Coupon Conditions navigates to the Pricing Rule | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Add / Edit Coupon Conditions | Pricing Rule: PRLE-0001 | The user is redirected to the Pricing Rule selected in the coupon | High | Positive | - |
| 186 | 3. Coupon Code Details Screen | TC-CPD-033 | Add / Edit Coupon Conditions after changing the Pricing Rule (unsaved) | Access via Selling > Coupon Code > Coupon Code ID | 1. Change the Pricing Rule without saving
2. Click Add / Edit Coupon Conditions | Unsaved PRLE-0003 | Behavior follows the BA rule (opens the saved or the newly selected rule) | Low | Negative | Needs Clarification: SRS does not define behavior with unsaved changes. |
| 187 | 3. Coupon Code Details Screen | TC-CPD-034 | Assign the coupon to a user | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Assign
2. Select a user
3. Confirm | User: Test QA User | The coupon is assigned to the selected user | Low | Positive | - |
| 188 | 3. Coupon Code Details Screen | TC-CPD-035 | Add an attachment | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Attachment
2. Upload a file | terms.pdf | The file is attached to the coupon | Low | Positive | - |
| 189 | 3. Coupon Code Details Screen | TC-CPD-036 | Add an attachment with an unsupported or large file | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Attachment
2. Upload a very large file | File > 25 MB | An error message is displayed | Low | Negative | Needs Clarification: SRS defines no attachment limits. |
| 190 | 3. Coupon Code Details Screen | TC-CPD-037 | Add a tag | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Tags
2. Enter a tag
3. Confirm | Tag: Summer | The tag is added | Low | Positive | - |
| 191 | 3. Coupon Code Details Screen | TC-CPD-038 | Share the coupon with a user | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Share
2. Select a user and permission
3. Confirm | User: Test QA User / Read | The coupon is shared with the user | Low | Positive | - |
| 192 | 3. Coupon Code Details Screen | TC-CPD-039 | Print the coupon | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Print | - | The print preview / print dialog is displayed | Low | Positive | - |
| 193 | 3. Coupon Code Details Screen | TC-CPD-040 | Delete confirmation message is displayed | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Delete | - | A confirmation message is displayed asking whether the user wants to delete this Coupon Code | High | Positive | - |
| 194 | 3. Coupon Code Details Screen | TC-CPD-041 | Cancel the delete confirmation | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Delete
2. Choose to not confirm | - | The coupon is not deleted and the Details screen stays open | Medium | Negative | - |
| 195 | 3. Coupon Code Details Screen | TC-CPD-042 | Delete an unlinked coupon | Access via Selling > Coupon Code > Coupon Code ID | 1. Click Delete
2. Click Yes | Unused coupon | The coupon is deleted successfully | High | Positive | Needs Clarification: SRS does not say where the user is redirected after deletion (list expected). |
| 196 | 3. Coupon Code Details Screen | TC-CPD-043 | Delete a coupon linked to other transactions | Access via Selling > Coupon Code > Coupon Code ID | 1. Open a coupon used in a Sales Order
2. Click Delete
3. Click Yes | Coupon used in SO-2026-00001 | A message states that the linked transactions must be deleted first and the coupon is not deleted | High | Negative | - |
| 197 | 3. Coupon Code Details Screen | TC-CPD-044 | Linked doctypes in the warning message are hyperlinks | Access via Selling > Coupon Code > Coupon Code ID | 1. Trigger the linked-transactions warning
2. Click a linked doctype link | Sales Order | The user is redirected to the corresponding doctype | Medium | Positive | - |
| 198 | 3. Coupon Code Details Screen | TC-CPD-045 | Deleted coupon cannot be opened again | Access via Selling > Coupon Code > Coupon Code ID | 1. Delete a coupon
2. Open its URL | - | A not-found / no-data message is displayed | Low | Negative | - |
| 199 | 3. Coupon Code Details Screen | TC-CPD-046 | Details screen with an invalid coupon ID in the URL | Access via Selling > Coupon Code > Coupon Code ID | 1. Open the Details URL with a random ID | COUPON-XXXX | A not-found message is displayed without a server error | Low | Negative | - |
| 200 | 3. Coupon Code Details Screen | TC-CPD-047 | Details screen layout and labels | Access via Selling > Coupon Code > Coupon Code ID | Review the Details screen | - | All fields and labels are displayed correctly with no overlap or truncation | Low | UI | - |
| 201 | 3. Coupon Code Details Screen | TC-CPD-048 | Details screen in Arabic (RTL) | Access via Selling > Coupon Code > Coupon Code ID | 1. Switch the language to Arabic
2. Open the Details | - | The layout is mirrored and all labels are translated | Low | UI | - |
| 202 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-001 | Coupon appears as selectable on a Sales Order | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Create a Sales Order
2. Enter the coupon code | Code: SUMMER25 | The coupon is accepted and the linked pricing rule discount is applied | High | Positive | Needs Clarification: SRS does not describe the redemption flow (where the code is entered, what is applied). |
| 203 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-002 | Used is incremented after a Sales Order uses the coupon | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Note Used on the coupon
2. Create and submit a Sales Order with the coupon
3. Open the coupon Details | Used: 0 -> 1 | Used is incremented by 1 | High | Positive | Needs Clarification: SRS says Used counts redemptions 'through Sales Order' but not at which point (Save or Submit). |
| 204 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-003 | Used is decremented when the Sales Order is cancelled | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Cancel the Sales Order that used the coupon
2. Open the coupon Details | Used: 1 -> 0 | Used is decremented by 1 | High | Positive | Needs Clarification: Cancellation behavior is not defined. |
| 205 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-004 | Used is not incremented by a Draft Sales Order | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Save a Sales Order with the coupon without submitting
2. Open the coupon Details | Draft SO | Used is unchanged | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 206 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-005 | Coupon cannot be used after reaching Maximum Use | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Set Maximum Use = 10 and Used = 10
2. Create a Sales Order with the coupon | Max Use: 10 / Used: 10 | The coupon is rejected with an error message | High | Negative | - |
| 207 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-006 | Coupon can be used until Maximum Use is reached | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Set Maximum Use = 10 and Used = 9
2. Submit a Sales Order with the coupon | Used: 9 -> 10 | The Sales Order is accepted and Used becomes 10 | High | Positive | - |
| 208 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-007 | Coupon without Maximum Use has no limit | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Use a coupon with empty Maximum Use in several Sales Orders | Max Use: empty | All Sales Orders are accepted | Medium | Positive | Needs Clarification: Meaning of empty Maximum Use is not defined. |
| 209 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-008 | Coupon cannot be used before Valid From | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Create a Sales Order before the coupon Valid From date | Valid From: tomorrow | The coupon is rejected with an error message | High | Negative | Needs Clarification: SRS defines the validity dates but not the redemption validation. |
| 210 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-009 | Coupon cannot be used after Valid To | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Create a Sales Order after the coupon Valid To date | Valid To: yesterday | The coupon is rejected with an error message | High | Negative | - |
| 211 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-010 | Coupon can be used on Valid From and Valid To dates | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Create a Sales Order on the Valid From date
2. Create a Sales Order on the Valid To date | Boundary dates | Both Sales Orders are accepted (boundary inclusive) | Medium | Positive | Needs Clarification: Boundary inclusiveness is not defined. |
| 212 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-011 | Gift Card coupon restricted to its customer | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Create a Sales Order for a different customer using a Gift Card coupon linked to Test Customer 1 | Customer mismatch | The coupon is rejected | High | Negative | Needs Clarification: SRS does not describe the effect of the optional Customer field. |
| 213 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-012 | Gift Card coupon with no customer can be used by any customer | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Create Sales Orders for different customers with a Gift Card coupon without a Customer | Customer: empty | The coupon is accepted | Medium | Positive | Needs Clarification: Not defined. |
| 214 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-013 | Promotional coupon can be used by any customer | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Create Sales Orders for different customers using a Promotional coupon | Promotional | The coupon is accepted for every customer | Medium | Positive | - |
| 215 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-014 | Invalid coupon code in a Sales Order | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Enter a coupon code that does not exist | Code: WRONG1 | An error message appears and no discount is applied | High | Negative | - |
| 216 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-015 | Pricing Rule discount is applied through the coupon | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Use the coupon in a Sales Order with an eligible item | Pricing Rule: 10% discount | The discount of the linked pricing rule is applied on eligible items | High | Positive | - |
| 217 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-016 | Coupon with a disabled Pricing Rule | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Disable the linked Pricing Rule
2. Use the coupon in a Sales Order | Disabled PRLE-0001 | The coupon is rejected or no discount is applied | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 218 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-017 | Pricing Rule no longer Coupon Code Based | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Disable the Coupon Code Based option on the linked Pricing Rule
2. Open the coupon Details | PRLE-0001 | The coupon behavior follows the BA rule (still displayed, warning or invalid) | Low | Negative | Needs Clarification: Not defined in the SRS. |
| 219 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-018 | Add / Edit Coupon Conditions opens the same Pricing Rule | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Open a coupon
2. Click Add / Edit Coupon Conditions | PRLE-0001 | The Pricing Rule opened matches the one selected in the coupon | Medium | Positive | - |
| 220 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-019 | Delete a Sales Order then delete the coupon | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Delete (or cancel and delete) the Sales Order linked to the coupon
2. Delete the coupon | SO-2026-00001 | The coupon is deleted successfully once no linked transactions remain | Medium | Positive | - |
| 221 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-020 | Coupon from the external ecommerce platform | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Create a coupon with 'From External Ecomm platform' = checked through the integration
2. Open it | Ecomm = checked | The coupon is displayed without a Pricing Rule | Low | Positive | Needs Clarification: Integration behavior is not described. |
| 222 | 4. Coupon Code Integration (Pricing Rule / Sales Order) | TC-CPI-021 | Used after multiple concurrent redemptions | A Coupon Code and a Coupon Code Based Pricing Rule exist | 1. Redeem the same coupon in two Sales Orders at the same time with Used = Maximum Use - 1 | Max Use: 10 / Used: 9 | Only one redemption is accepted | Low | Negative | Needs Clarification: Concurrency is not defined. |
## Sheet: Summary
| Test Cases Summary |  |
| --- | --- |
| Module / Screen | Number of Test Cases |
| 1. Coupon Code List Screen |  |
| 2. Add Coupon Code Screen |  |
| 3. Coupon Code Details Screen |  |
| 4. Coupon Code Integration (Pricing Rule / Sales Order) |  |
| Total |  |
| By Type | Count |
| Positive |  |
| Negative |  |
| UI |  |
| By Priority | Count |
| High |  |
| Medium |  |
| Low |  |
| Clarification | Count |
| Needs Clarification (see Remarks) |  |