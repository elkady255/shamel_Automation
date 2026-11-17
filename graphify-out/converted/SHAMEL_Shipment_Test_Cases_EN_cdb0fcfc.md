<!-- converted from SHAMEL_Shipment_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Shipment |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Shipment) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Shipment List Screen | TC-SHL-001 | Display the Shipment list | Access via Inventory > Shipment | 1. Click Inventory from the side menu
2. Click Shipment | - | A table listing all Shipments in the system is displayed | High | Positive | - |
| 2 | 1. Shipment List Screen | TC-SHL-002 | Add Shipment button is displayed | Access via Inventory > Shipment | Verify that the Add Shipment button is displayed on the list screen | - | The Add Shipment button is visible and clickable | Medium | UI | - |
| 3 | 1. Shipment List Screen | TC-SHL-003 | Navigate to the Add Shipment screen | Access via Inventory > Shipment | Click the Add Shipment button | - | The user is redirected to the Add Shipment screen | High | Positive | - |
| 4 | 1. Shipment List Screen | TC-SHL-004 | Display checkbox column for row selection | Access via Inventory > Shipment | Open the Shipment list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Shipment List Screen | TC-SHL-005 | Display Shipment ID column | Access via Inventory > Shipment | Open the Shipment list | - | The Shipment ID column is displayed for each row | Medium | UI | - |
| 6 | 1. Shipment List Screen | TC-SHL-006 | Navigate to Shipment Details by clicking the ID | Access via Inventory > Shipment | Click a Shipment ID in the table | SHIP-2026-0001 | The user is redirected to the Shipment Details screen of the selected shipment | High | Positive | - |
| 7 | 1. Shipment List Screen | TC-SHL-007 | Display Status column with a valid value | Access via Inventory > Shipment | Open the Shipment list and review the Status column | Shipments in each status | Each row shows exactly one of: Draft, Submitted, Booked, Cancelled, Completed | High | Positive | - |
| 8 | 1. Shipment List Screen | TC-SHL-008 | Status of a newly saved Shipment is Draft | Access via Inventory > Shipment | 1. Add and save a new Shipment
2. Return to the list | - | The new Shipment appears in the list with status Draft | High | Positive | - |
| 9 | 1. Shipment List Screen | TC-SHL-009 | Status changes to Submitted after submission | Access via Inventory > Shipment | 1. Submit a Draft Shipment
2. Return to the list | SHIP-2026-0001 | The status is Submitted | High | Positive | - |
| 10 | 1. Shipment List Screen | TC-SHL-010 | Status changes to Cancelled after cancellation | Access via Inventory > Shipment | 1. Cancel a Submitted Shipment
2. Return to the list | SHIP-2026-0001 | The status is Cancelled | High | Positive | Needs Clarification: SRS spells the status 'Cancelled' in the list and 'Canceled' in the Add screen. |
| 11 | 1. Shipment List Screen | TC-SHL-011 | Booked status | Access via Inventory > Shipment | Find or create a Shipment in the Booked status | Status: Booked | To be confirmed with the BA (how a Shipment becomes Booked) | Medium | Positive | Needs Clarification: SRS lists Booked and Completed as statuses but does not define when or how a Shipment gets them. |
| 12 | 1. Shipment List Screen | TC-SHL-012 | Completed status | Access via Inventory > Shipment | Find or create a Shipment in the Completed status | Status: Completed | To be confirmed with the BA (how a Shipment becomes Completed, e.g., Tracking Status = Delivery) | Medium | Positive | Needs Clarification: Transition to Completed is not defined. |
| 13 | 1. Shipment List Screen | TC-SHL-013 | Display Pickup From column | Access via Inventory > Shipment | Open the list and review the Pickup From column | Pickup From: Shamel Trading Co. | The source party of each shipment is displayed | Medium | UI | Needs Clarification: Confirm whether the column shows the party type (Company / Customer / Supplier) or the party name. |
| 14 | 1. Shipment List Screen | TC-SHL-014 | Display Delivery To column | Access via Inventory > Shipment | Open the list and review the Delivery To column | Delivery To: Al Noor Stores | The destination party of each shipment is displayed | Medium | UI | - |
| 15 | 1. Shipment List Screen | TC-SHL-015 | Display Pickup Date column | Access via Inventory > Shipment | Open the list and review the Pickup Date column | Pickup Date: 2026-11-01 | The scheduled pickup date of each shipment is displayed | Medium | UI | - |
| 16 | 1. Shipment List Screen | TC-SHL-016 | Action bar appears when one row is selected | Access via Inventory > Shipment | Select the checkbox of one Shipment | - | An action bar appears showing the available actions | High | Positive | - |
| 17 | 1. Shipment List Screen | TC-SHL-017 | Action bar appears when multiple rows are selected | Access via Inventory > Shipment | Select the checkboxes of three Shipments | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 18 | 1. Shipment List Screen | TC-SHL-018 | Action bar disappears when all rows are deselected | Access via Inventory > Shipment | 1. Select one Shipment
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 19 | 1. Shipment List Screen | TC-SHL-019 | Action bar contains the required actions | Access via Inventory > Shipment | Select a Shipment and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete (Submit and Cancel are shown only by status) | Medium | UI | - |
| 20 | 1. Shipment List Screen | TC-SHL-020 | Open the Edit popup | Access via Inventory > Shipment | 1. Select a Shipment
2. Click Edit | - | A popup is displayed containing the Field dropdown, the Value field and the Update button | High | Positive | - |
| 21 | 1. Shipment List Screen | TC-SHL-021 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Shipment | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Shipment and allows selecting only one option | Medium | Positive | - |
| 22 | 1. Shipment List Screen | TC-SHL-022 | Click Update without selecting a Field | Access via Inventory > Shipment | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because Field is mandatory | Medium | Negative | - |
| 23 | 1. Shipment List Screen | TC-SHL-023 | Value input type changes dynamically based on the selected Field | Access via Inventory > Shipment | 1. Open the Edit popup
2. Select Field = Carrier and note the Value input type
3. Select Field = Tracking Status and note the Value input type | Carrier, Tracking Status | The Value field changes its input type (text input for Carrier, dropdown for Tracking Status) | High | Positive | - |
| 24 | 1. Shipment List Screen | TC-SHL-024 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Shipment | 1. Open the Edit popup
2. Select Field = Value of Goods
3. Leave Value empty and click Update | Field: Value of Goods | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 25 | 1. Shipment List Screen | TC-SHL-025 | Value field applies the validation rules of the selected Field | Access via Inventory > Shipment | 1. Open the Edit popup
2. Select Field = AWB Number
3. Enter letters and click Update | Value: abc | A validation error message is displayed (numbers only) and the shipment is not changed | Medium | Negative | - |
| 26 | 1. Shipment List Screen | TC-SHL-026 | Update a Draft Shipment successfully | Access via Inventory > Shipment | 1. Select a Draft Shipment
2. Click Edit
3. Select Field = Carrier
4. Enter a Value
5. Click Update | Carrier: Aramex Express | The Shipment is updated successfully | High | Positive | Needs Clarification: SRS defines only the error case of Update. The Draft success case is assumed. |
| 27 | 1. Shipment List Screen | TC-SHL-027 | Update a Submitted Shipment | Access via Inventory > Shipment | 1. Select a Submitted Shipment
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Submitted | An error message is displayed informing the user that the Shipment cannot be modified | High | Negative | Needs Clarification: Tracking Status and AWB Number are updated after submission in real use. Confirm they stay read-only. |
| 28 | 1. Shipment List Screen | TC-SHL-028 | Update a Cancelled Shipment | Access via Inventory > Shipment | 1. Select a Cancelled Shipment
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Cancelled | An error message is displayed informing the user that the Shipment cannot be modified | High | Negative | - |
| 29 | 1. Shipment List Screen | TC-SHL-029 | Update a Booked or Completed Shipment | Access via Inventory > Shipment | 1. Select a Booked shipment
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Booked / Completed | To be confirmed with the BA (allowed or blocked) | Medium | Negative | Needs Clarification: SRS lists the error only for Submitted and Cancelled. |
| 30 | 1. Shipment List Screen | TC-SHL-030 | Edit with multiple Shipments selected | Access via Inventory > Shipment | 1. Select two Draft Shipments
2. Click Edit
3. Select a Field and a Value
4. Click Update | Two Draft shipments | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection. |
| 31 | 1. Shipment List Screen | TC-SHL-031 | Submit action is displayed for a Draft Shipment | Access via Inventory > Shipment | Select a Draft Shipment and review the action bar | Status: Draft | The Submit action is displayed | High | Positive | - |
| 32 | 1. Shipment List Screen | TC-SHL-032 | Submit action is hidden for other statuses | Access via Inventory > Shipment | Select a Submitted, Cancelled, Booked and Completed Shipment and review the action bar | 4 shipments | The Submit action is not displayed | Medium | Negative | - |
| 33 | 1. Shipment List Screen | TC-SHL-033 | Submit a Draft Shipment with complete and valid data | Access via Inventory > Shipment | 1. Select a complete Draft Shipment
2. Click Submit | Complete Draft shipment | The Shipment is submitted successfully and its status changes to Submitted | High | Positive | - |
| 34 | 1. Shipment List Screen | TC-SHL-034 | Submit a Draft Shipment with incomplete data | Access via Inventory > Shipment | 1. Select a Draft shipment with a missing mandatory value
2. Click Submit | Draft without Value of Goods | The shipment is not submitted, a validation error is displayed and the status stays Draft | High | Negative | Needs Clarification: SRS describes only the success case of Submit. |
| 35 | 1. Shipment List Screen | TC-SHL-035 | Submit multiple Draft Shipments at once | Access via Inventory > Shipment | 1. Select two complete Draft shipments
2. Click Submit | Two Draft shipments | To be confirmed with the BA (bulk submit behavior) | Low | Positive | Needs Clarification: SRS does not define bulk submit. |
| 36 | 1. Shipment List Screen | TC-SHL-036 | Cancel action is displayed for a Submitted Shipment | Access via Inventory > Shipment | Select a Submitted Shipment and review the action bar | Status: Submitted | The Cancel action is displayed | High | Positive | - |
| 37 | 1. Shipment List Screen | TC-SHL-037 | Cancel action is hidden for other statuses | Access via Inventory > Shipment | Select a Draft, Cancelled, Booked and Completed Shipment and review the action bar | 4 shipments | The Cancel action is not displayed | Medium | Negative | Needs Clarification: Confirm that Booked shipments cannot be cancelled. |
| 38 | 1. Shipment List Screen | TC-SHL-038 | Cancel a Submitted Shipment | Access via Inventory > Shipment | 1. Select a Submitted Shipment
2. Click Cancel | Status: Submitted | The Shipment is cancelled successfully and its status changes to Cancelled | High | Positive | - |
| 39 | 1. Shipment List Screen | TC-SHL-039 | Amend a Cancelled Shipment from the list | Access via Inventory > Shipment | Select a Cancelled Shipment and review the action bar | Status: Cancelled | To be confirmed with the BA (no Amend action is defined for Shipment) | Low | Negative | Needs Clarification: Unlike other modules, the SRS does not define Amend for Shipment. |
| 40 | 1. Shipment List Screen | TC-SHL-040 | Confirmation message is displayed when clicking Delete | Access via Inventory > Shipment | 1. Select a Shipment
2. Click Delete | - | A confirmation message asks the user whether they want to delete this shipment | High | Positive | - |
| 41 | 1. Shipment List Screen | TC-SHL-041 | Cancel the delete confirmation | Access via Inventory > Shipment | 1. Select a Shipment
2. Click Delete
3. Click No (or close the message) | - | The shipment is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 42 | 1. Shipment List Screen | TC-SHL-042 | Delete a Draft Shipment that has no links | Access via Inventory > Shipment | 1. Select an unlinked Draft Shipment
2. Click Delete
3. Click Yes | Unlinked Draft shipment | The shipment is deleted successfully and removed from the list | High | Positive | - |
| 43 | 1. Shipment List Screen | TC-SHL-043 | Delete a Submitted Shipment | Access via Inventory > Shipment | 1. Select a Submitted Shipment
2. Click Delete
3. Click Yes | Status: Submitted | To be confirmed with the BA (deletion allowed or blocked for Submitted shipments) | High | Negative | Needs Clarification: SRS does not restrict Delete by status, unlike the Packing Slip module. |
| 44 | 1. Shipment List Screen | TC-SHL-044 | Delete a Shipment linked to other transactions | Access via Inventory > Shipment | 1. Select a Shipment linked to other transactions
2. Click Delete
3. Click Yes | Linked shipment | A message informs the user that the linked transactions must be deleted first. The shipment is not deleted | High | Negative | - |
| 45 | 1. Shipment List Screen | TC-SHL-045 | Linked transactions in the delete message are hyperlinks | Access via Inventory > Shipment | 1. Trigger the delete message for a linked shipment
2. Click a linked doctype in the message | Linked shipment | Linked doctypes are shown as hyperlinks and the user is redirected to the corresponding doctype | Medium | Positive | - |
| 46 | 1. Shipment List Screen | TC-SHL-046 | Delete multiple Shipments at once | Access via Inventory > Shipment | 1. Select two unlinked shipments
2. Click Delete
3. Click Yes | Two unlinked shipments | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define bulk delete. |
| 47 | 1. Shipment List Screen | TC-SHL-047 | Export selected Shipments | Access via Inventory > Shipment | 1. Select one or more shipments
2. Click Export | - | The selected Shipments are exported | Medium | Positive | Needs Clarification: SRS lists Export without details. |
| 48 | 1. Shipment List Screen | TC-SHL-048 | Assign selected Shipments to a user | Access via Inventory > Shipment | 1. Select a shipment
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The shipment is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 49 | 1. Shipment List Screen | TC-SHL-049 | Clear assignment of a Shipment | Access via Inventory > Shipment | 1. Select an assigned shipment
2. Click Clear assignment | Assigned shipment | The assignment is cleared | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 50 | 1. Shipment List Screen | TC-SHL-050 | Add tags to a Shipment | Access via Inventory > Shipment | 1. Select a shipment
2. Click Add tags
3. Enter a tag and confirm | Tag: Fragile | The tag is added to the shipment | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 51 | 1. Shipment List Screen | TC-SHL-051 | Print selected Shipments | Access via Inventory > Shipment | 1. Select a shipment
2. Click Print | - | The print view of the Shipment is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 52 | 1. Shipment List Screen | TC-SHL-052 | Shipment list when there are no shipments | Access via Inventory > Shipment | Open the list in a system with no shipments | No shipments | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. Expected behavior is a standard assumption. |
| 53 | 1. Shipment List Screen | TC-SHL-053 | User without permission cannot access Shipment | Access via Inventory > Shipment | 1. Log in with a user that has no permission for Shipment
2. Open the sidebar | Restricted user | The Shipment menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 54 | 2. Add Shipment Screen | TC-ASH-001 | Open the Add Shipment screen | Logged in with a user that has Shipment access | 1. Click Inventory from the side menu
2. Click Shipment
3. Click Add Shipment | - | The Add Shipment screen is displayed with an empty form | High | Positive | - |
| 55 | 2. Add Shipment Screen | TC-ASH-002 | Add screen displays the main sections | Inventory > Shipment > Add Shipment | Review the Add Shipment screen | - | The sections Pickup From, Delivery To, Parcels, Delivery Note & Packing Slips, Shipment Details and Shipment Information are displayed | Medium | UI | - |
| 56 | 2. Add Shipment Screen | TC-ASH-003 | Pickup From dropdown lists the allowed values | Inventory > Shipment > Add Shipment | Open the Pickup From dropdown | - | The dropdown contains: Company, Customer, Supplier | High | Positive | - |
| 57 | 2. Add Shipment Screen | TC-ASH-004 | Pickup From default value is Company | Inventory > Shipment > Add Shipment | Open the Add Shipment screen and review the dropdown | - | Pickup From is set to Company by default and the Company field is displayed | High | Positive | - |
| 58 | 2. Add Shipment Screen | TC-ASH-005 | Pickup From = Company shows only the Company field | Inventory > Shipment > Add Shipment | Select Pickup From = Company | Company | The Company field is displayed; the Customer and Supplier fields are hidden | High | Positive | - |
| 59 | 2. Add Shipment Screen | TC-ASH-006 | Pickup From = Customer shows only the Customer field | Inventory > Shipment > Add Shipment | Select Pickup From = Customer | Customer | The Customer field is displayed; the Company and Supplier fields are hidden | High | Positive | - |
| 60 | 2. Add Shipment Screen | TC-ASH-007 | Pickup From = Supplier shows only the Supplier field | Inventory > Shipment > Add Shipment | Select Pickup From = Supplier | Supplier | The Supplier field is displayed; the Company and Customer fields are hidden | High | Positive | - |
| 61 | 2. Add Shipment Screen | TC-ASH-008 | Pickup From accepts a single selection only | Inventory > Shipment > Add Shipment | Select Company and then Customer in Pickup From | Company, Customer | Only one value is selected; the second replaces the first | Low | Positive | - |
| 62 | 2. Add Shipment Screen | TC-ASH-009 | Pickup: Company is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company
2. Click Company and type part of a name | Sham | The list is filtered while typing and shows matching records | High | Positive | - |
| 63 | 2. Add Shipment Screen | TC-ASH-010 | Pickup: Select a Company | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company
2. Select a Company | Shamel Trading Co. | The value is accepted | High | Positive | - |
| 64 | 2. Add Shipment Screen | TC-ASH-011 | Pickup: Leave Company empty | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company
2. Leave Company empty
3. Fill the other mandatory fields
4. Click Save | - | An error message is displayed because Company is mandatory | High | Negative | - |
| 65 | 2. Add Shipment Screen | TC-ASH-012 | Pickup: Customer is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Customer
2. Click Customer and type part of a name | Al N | The list is filtered while typing and shows matching records | High | Positive | - |
| 66 | 2. Add Shipment Screen | TC-ASH-013 | Pickup: Select a Customer | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Customer
2. Select a Customer | Al Noor Stores | The value is accepted | High | Positive | - |
| 67 | 2. Add Shipment Screen | TC-ASH-014 | Pickup: Leave Customer empty | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Customer
2. Leave Customer empty
3. Fill the other mandatory fields
4. Click Save | - | An error message is displayed because Customer is mandatory | High | Negative | - |
| 68 | 2. Add Shipment Screen | TC-ASH-015 | Pickup: Supplier is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Supplier
2. Click Supplier and type part of a name | Delt | The list is filtered while typing and shows matching records | High | Positive | - |
| 69 | 2. Add Shipment Screen | TC-ASH-016 | Pickup: Select a Supplier | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Supplier
2. Select a Supplier | Delta Supplies | The value is accepted | High | Positive | - |
| 70 | 2. Add Shipment Screen | TC-ASH-017 | Pickup: Leave Supplier empty | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Supplier
2. Leave Supplier empty
3. Fill the other mandatory fields
4. Click Save | - | An error message is displayed because Supplier is mandatory | High | Negative | - |
| 71 | 2. Add Shipment Screen | TC-ASH-018 | Pickup: Changing the party type clears the previous party and address | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company and a Company and an Address
2. Change Pickup From to Customer | Company > Customer | The previously selected party, address and contact are cleared or revalidated | High | Negative | Needs Clarification: SRS does not say what happens to dependent fields when the party type changes. |
| 72 | 2. Add Shipment Screen | TC-ASH-019 | Pickup: Address is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select a party
2. Click Address and type part of an address name | Al Noor | The list is filtered while typing and shows matching addresses | High | Positive | - |
| 73 | 2. Add Shipment Screen | TC-ASH-020 | Pickup: Address lists the addresses of the selected Company | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company and a Company
2. Open Address | Shamel Trading Co. | Only addresses that belong to the selected Company are listed | High | Positive | - |
| 74 | 2. Add Shipment Screen | TC-ASH-021 | Pickup: Address lists the addresses of the selected Customer | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Customer and a Customer
2. Open Address | Al Noor Stores | Only addresses that belong to the selected Customer are listed | High | Positive | - |
| 75 | 2. Add Shipment Screen | TC-ASH-022 | Pickup: Address lists the addresses of the selected Supplier | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Supplier and a Supplier
2. Open Address | Delta Supplies | Only addresses that belong to the selected Supplier are listed | High | Positive | - |
| 76 | 2. Add Shipment Screen | TC-ASH-023 | Pickup: Select an Address | Inventory > Shipment > Add Shipment | 1. Select a party
2. Select an Address | Al Noor Stores-Billing | The value is accepted | High | Positive | - |
| 77 | 2. Add Shipment Screen | TC-ASH-024 | Pickup: Leave Address empty | Inventory > Shipment > Add Shipment | 1. Leave Address empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Address is mandatory | High | Negative | - |
| 78 | 2. Add Shipment Screen | TC-ASH-025 | Pickup: Address before selecting a party | Inventory > Shipment > Add Shipment | Open Address without selecting a party | - | No addresses are listed (or the user is asked to select a party first) | Medium | Negative | Needs Clarification: SRS does not define the field state before a party is selected. |
| 79 | 2. Add Shipment Screen | TC-ASH-026 | Pickup: Address preview displays the address details | Inventory > Shipment > Add Shipment | 1. Select a party
2. Select an Address | Al Noor Stores-Billing | The preview shows Address Line 1, City / Town and Country of the selected address | High | Positive | - |
| 80 | 2. Add Shipment Screen | TC-ASH-027 | Pickup: Address preview is read-only | Inventory > Shipment > Add Shipment | Try to edit the Address preview | - | The preview cannot be edited | Medium | UI | - |
| 81 | 2. Add Shipment Screen | TC-ASH-028 | Pickup: Address preview updates when the address changes | Inventory > Shipment > Add Shipment | 1. Select address A
2. Select address B | Two addresses | The preview shows the details of address B | Medium | Positive | - |
| 82 | 2. Add Shipment Screen | TC-ASH-029 | Pickup Contact Person is displayed only when Pickup From = Company | Inventory > Shipment > Add Shipment | Select Pickup From = Company | Company | The Pickup Contact Person field is displayed and the Contact field is hidden | High | Positive | - |
| 83 | 2. Add Shipment Screen | TC-ASH-030 | Pickup Contact Person is a searchable dropdown of employees | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company
2. Click Pickup Contact Person and type part of a name | Omar | The list is filtered while typing and shows matching employees | High | Positive | - |
| 84 | 2. Add Shipment Screen | TC-ASH-031 | Select a Pickup Contact Person | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company
2. Select an employee | Omar Khaled | The value is accepted | High | Positive | - |
| 85 | 2. Add Shipment Screen | TC-ASH-032 | Leave Pickup Contact Person empty | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company
2. Leave Pickup Contact Person empty
3. Fill the other mandatory fields
4. Click Save | - | An error message is displayed because Pickup Contact Person is mandatory | High | Negative | - |
| 86 | 2. Add Shipment Screen | TC-ASH-033 | Pickup Contact Person preview displays the employee details | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company
2. Select an employee | Omar Khaled | The preview shows Full Name, Email and Phone of the selected employee | High | Positive | - |
| 87 | 2. Add Shipment Screen | TC-ASH-034 | Pickup Contact Person preview is read-only | Inventory > Shipment > Add Shipment | Try to edit the Pickup Contact Person preview | - | The preview cannot be edited | Medium | UI | - |
| 88 | 2. Add Shipment Screen | TC-ASH-035 | Pickup Contact Person preview for an employee without email or phone | Inventory > Shipment > Add Shipment | 1. Select an employee with no email and no phone | Employee without contact data | The missing values are shown empty without errors | Low | Positive | - |
| 89 | 2. Add Shipment Screen | TC-ASH-036 | Pickup Contact Person is hidden when Pickup From = Customer | Inventory > Shipment > Add Shipment | Select Pickup From = Customer | Customer | The Pickup Contact Person field and preview are hidden | Medium | Positive | - |
| 90 | 2. Add Shipment Screen | TC-ASH-037 | Contact is displayed when Pickup From = Customer | Inventory > Shipment > Add Shipment | Select Pickup From = Customer | Customer | The Contact field is displayed | High | Positive | - |
| 91 | 2. Add Shipment Screen | TC-ASH-038 | Contact is displayed when Pickup From = Supplier | Inventory > Shipment > Add Shipment | Select Pickup From = Supplier | Supplier | The Contact field is displayed | High | Positive | - |
| 92 | 2. Add Shipment Screen | TC-ASH-039 | Contact lists the contacts of the selected Customer | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Customer and a Customer
2. Open Contact | Al Noor Stores | Only contacts that belong to the selected Customer are listed | High | Positive | - |
| 93 | 2. Add Shipment Screen | TC-ASH-040 | Contact lists the contacts of the selected Supplier | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Supplier and a Supplier
2. Open Contact | Delta Supplies | Only contacts that belong to the selected Supplier are listed | High | Positive | - |
| 94 | 2. Add Shipment Screen | TC-ASH-041 | Select a Contact | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Customer and a Customer
2. Select a Contact | Hala Mostafa | The value is accepted | High | Positive | - |
| 95 | 2. Add Shipment Screen | TC-ASH-042 | Leave Contact empty | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Customer
2. Leave Contact empty
3. Fill the other mandatory fields
4. Click Save | - | An error message is displayed because Contact is mandatory | High | Negative | - |
| 96 | 2. Add Shipment Screen | TC-ASH-043 | Contact preview displays Full Name and Email | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Customer
2. Select a Contact | Hala Mostafa | The preview shows Full Name and Email of the selected contact | High | Positive | - |
| 97 | 2. Add Shipment Screen | TC-ASH-044 | Contact preview is read-only | Inventory > Shipment > Add Shipment | Try to edit the Contact preview | - | The preview cannot be edited | Medium | UI | - |
| 98 | 2. Add Shipment Screen | TC-ASH-045 | Contact before selecting a Customer or Supplier | Inventory > Shipment > Add Shipment | Open Contact without selecting a party | - | No contacts are listed (or the user is asked to select a party first) | Medium | Negative | Needs Clarification: Field state before the party is selected is not defined. |
| 99 | 2. Add Shipment Screen | TC-ASH-046 | Changing the party clears the Contact | Inventory > Shipment > Add Shipment | 1. Select Customer A and its Contact
2. Change to Customer B | Al Noor Stores > Nile Mart | The previous Contact is cleared or revalidated | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 100 | 2. Add Shipment Screen | TC-ASH-047 | Delivery To dropdown lists the allowed values | Inventory > Shipment > Add Shipment | Open the Delivery To dropdown | - | The dropdown contains: Company, Customer, Supplier | High | Positive | - |
| 101 | 2. Add Shipment Screen | TC-ASH-048 | Delivery To default value is Company | Inventory > Shipment > Add Shipment | Open the Add Shipment screen and review the dropdown | - | Delivery To is set to Company by default and the Company field is displayed | High | Positive | - |
| 102 | 2. Add Shipment Screen | TC-ASH-049 | Delivery To = Company shows only the Company field | Inventory > Shipment > Add Shipment | Select Delivery To = Company | Company | The Company field is displayed; the Customer and Supplier fields are hidden | High | Positive | - |
| 103 | 2. Add Shipment Screen | TC-ASH-050 | Delivery To = Customer shows only the Customer field | Inventory > Shipment > Add Shipment | Select Delivery To = Customer | Customer | The Customer field is displayed; the Company and Supplier fields are hidden | High | Positive | - |
| 104 | 2. Add Shipment Screen | TC-ASH-051 | Delivery To = Supplier shows only the Supplier field | Inventory > Shipment > Add Shipment | Select Delivery To = Supplier | Supplier | The Supplier field is displayed; the Company and Customer fields are hidden | High | Positive | - |
| 105 | 2. Add Shipment Screen | TC-ASH-052 | Delivery To accepts a single selection only | Inventory > Shipment > Add Shipment | Select Company and then Customer in Delivery To | Company, Customer | Only one value is selected; the second replaces the first | Low | Positive | - |
| 106 | 2. Add Shipment Screen | TC-ASH-053 | Delivery: Company is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Company
2. Click Company and type part of a name | Sham | The list is filtered while typing and shows matching records | High | Positive | - |
| 107 | 2. Add Shipment Screen | TC-ASH-054 | Delivery: Select a Company | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Company
2. Select a Company | Shamel Trading Co. | The value is accepted | High | Positive | - |
| 108 | 2. Add Shipment Screen | TC-ASH-055 | Delivery: Leave Company empty | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Company
2. Leave Company empty
3. Fill the other mandatory fields
4. Click Save | - | An error message is displayed because Company is mandatory | High | Negative | - |
| 109 | 2. Add Shipment Screen | TC-ASH-056 | Delivery: Customer is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Customer
2. Click Customer and type part of a name | Al N | The list is filtered while typing and shows matching records | High | Positive | - |
| 110 | 2. Add Shipment Screen | TC-ASH-057 | Delivery: Select a Customer | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Customer
2. Select a Customer | Al Noor Stores | The value is accepted | High | Positive | - |
| 111 | 2. Add Shipment Screen | TC-ASH-058 | Delivery: Leave Customer empty | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Customer
2. Leave Customer empty
3. Fill the other mandatory fields
4. Click Save | - | An error message is displayed because Customer is mandatory | High | Negative | - |
| 112 | 2. Add Shipment Screen | TC-ASH-059 | Delivery: Supplier is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Supplier
2. Click Supplier and type part of a name | Delt | The list is filtered while typing and shows matching records | High | Positive | - |
| 113 | 2. Add Shipment Screen | TC-ASH-060 | Delivery: Select a Supplier | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Supplier
2. Select a Supplier | Delta Supplies | The value is accepted | High | Positive | - |
| 114 | 2. Add Shipment Screen | TC-ASH-061 | Delivery: Leave Supplier empty | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Supplier
2. Leave Supplier empty
3. Fill the other mandatory fields
4. Click Save | - | An error message is displayed because Supplier is mandatory | High | Negative | - |
| 115 | 2. Add Shipment Screen | TC-ASH-062 | Delivery: Changing the party type clears the previous party and address | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Company and a Company and an Address
2. Change Delivery To to Customer | Company > Customer | The previously selected party, address and contact are cleared or revalidated | High | Negative | Needs Clarification: SRS does not say what happens to dependent fields when the party type changes. |
| 116 | 2. Add Shipment Screen | TC-ASH-063 | Delivery: Delivery Address is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select a party
2. Click Delivery Address and type part of an address name | Al Noor | The list is filtered while typing and shows matching addresses | High | Positive | - |
| 117 | 2. Add Shipment Screen | TC-ASH-064 | Delivery: Delivery Address lists the addresses of the selected Company | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Company and a Company
2. Open Delivery Address | Shamel Trading Co. | Only addresses that belong to the selected Company are listed | High | Positive | - |
| 118 | 2. Add Shipment Screen | TC-ASH-065 | Delivery: Delivery Address lists the addresses of the selected Customer | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Customer and a Customer
2. Open Delivery Address | Al Noor Stores | Only addresses that belong to the selected Customer are listed | High | Positive | - |
| 119 | 2. Add Shipment Screen | TC-ASH-066 | Delivery: Delivery Address lists the addresses of the selected Supplier | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Supplier and a Supplier
2. Open Delivery Address | Delta Supplies | Only addresses that belong to the selected Supplier are listed | High | Positive | - |
| 120 | 2. Add Shipment Screen | TC-ASH-067 | Delivery: Select an Delivery Address | Inventory > Shipment > Add Shipment | 1. Select a party
2. Select an Delivery Address | Al Noor Stores-Billing | The value is accepted | High | Positive | - |
| 121 | 2. Add Shipment Screen | TC-ASH-068 | Delivery: Leave Delivery Address empty | Inventory > Shipment > Add Shipment | 1. Leave Delivery Address empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Delivery Address is mandatory | High | Negative | - |
| 122 | 2. Add Shipment Screen | TC-ASH-069 | Delivery: Delivery Address before selecting a party | Inventory > Shipment > Add Shipment | Open Delivery Address without selecting a party | - | No addresses are listed (or the user is asked to select a party first) | Medium | Negative | Needs Clarification: SRS does not define the field state before a party is selected. |
| 123 | 2. Add Shipment Screen | TC-ASH-070 | Delivery: Delivery Address preview displays the address details | Inventory > Shipment > Add Shipment | 1. Select a party
2. Select an Delivery Address | Al Noor Stores-Billing | The preview shows Address Line 1, City / Town and Country of the selected address | High | Positive | - |
| 124 | 2. Add Shipment Screen | TC-ASH-071 | Delivery: Delivery Address preview is read-only | Inventory > Shipment > Add Shipment | Try to edit the Delivery Address preview | - | The preview cannot be edited | Medium | UI | - |
| 125 | 2. Add Shipment Screen | TC-ASH-072 | Delivery: Delivery Address preview updates when the address changes | Inventory > Shipment > Add Shipment | 1. Select address A
2. Select address B | Two addresses | The preview shows the details of address B | Medium | Positive | - |
| 126 | 2. Add Shipment Screen | TC-ASH-073 | Delivery Contact is a searchable dropdown | Inventory > Shipment > Add Shipment | 1. Select a Delivery To party
2. Click Delivery Contact and type part of a name | Hala | The list is filtered while typing and shows matching contacts | High | Positive | - |
| 127 | 2. Add Shipment Screen | TC-ASH-074 | Delivery Contact lists the contacts of the selected Customer | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Customer and a Customer
2. Open Delivery Contact | Al Noor Stores | Only contacts that belong to the selected Customer are listed | High | Positive | - |
| 128 | 2. Add Shipment Screen | TC-ASH-075 | Delivery Contact lists the contacts of the selected Supplier | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Supplier and a Supplier
2. Open Delivery Contact | Delta Supplies | Only contacts that belong to the selected Supplier are listed | High | Positive | - |
| 129 | 2. Add Shipment Screen | TC-ASH-076 | Delivery Contact when Delivery To = Company | Inventory > Shipment > Add Shipment | 1. Select Delivery To = Company and a Company
2. Open Delivery Contact | Shamel Trading Co. | The Delivery Contact field is displayed and lists the company contacts | High | Positive | Needs Clarification: SRS says it is displayed for Company, Customer or Supplier (and mentions 'Pickup From' by mistake) but only describes contacts for Customer / Supplier. Confirm the source of contacts for a Company. |
| 130 | 2. Add Shipment Screen | TC-ASH-077 | Select a Delivery Contact | Inventory > Shipment > Add Shipment | 1. Select a Delivery To party
2. Select a Delivery Contact | Hala Mostafa | The value is accepted | High | Positive | - |
| 131 | 2. Add Shipment Screen | TC-ASH-078 | Leave Delivery Contact empty | Inventory > Shipment > Add Shipment | 1. Leave Delivery Contact empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Delivery Contact is mandatory | High | Negative | - |
| 132 | 2. Add Shipment Screen | TC-ASH-079 | Delivery Contact preview displays Full Name and Email | Inventory > Shipment > Add Shipment | 1. Select a Delivery Contact | Hala Mostafa | The preview shows Full Name and Email of the selected contact | High | Positive | - |
| 133 | 2. Add Shipment Screen | TC-ASH-080 | Delivery Contact preview is read-only | Inventory > Shipment > Add Shipment | Try to edit the Delivery Contact preview | - | The preview cannot be edited | Medium | UI | - |
| 134 | 2. Add Shipment Screen | TC-ASH-081 | Delivery Contact depends on the Delivery To party, not on Pickup From | Inventory > Shipment > Add Shipment | 1. Select Pickup From = Company
2. Select Delivery To = Customer and a Customer
3. Open Delivery Contact | Delivery To: Al Noor Stores | The contacts of the delivery customer are listed (not those of the pickup party) | High | Positive | Needs Clarification: SRS wording says the field depends on 'Pickup From', which is likely a typo for 'Delivery To'. |
| 135 | 2. Add Shipment Screen | TC-ASH-082 | Same party for pickup and delivery | Inventory > Shipment > Add Shipment | 1. Select the same Customer in Pickup From and Delivery To
2. Click Save | Al Noor Stores (both) | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define this case. |
| 136 | 2. Add Shipment Screen | TC-ASH-083 | Same address for pickup and delivery | Inventory > Shipment > Add Shipment | 1. Select the same address for pickup and delivery
2. Click Save | Same address | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define this case. |
| 137 | 2. Add Shipment Screen | TC-ASH-084 | Parcels table displays the default columns | Inventory > Shipment > Add Shipment | Review the Parcels table | - | The table shows: Checkbox, No., Parcel ID / Number, Length (cm), Width (cm), Height (cm), Weight (KG) | Medium | UI | - |
| 138 | 2. Add Shipment Screen | TC-ASH-085 | Add Row adds a new parcel row | Inventory > Shipment > Add Shipment | Click Add Row in the Parcels table | - | A new empty row is added to the table | High | Positive | - |
| 139 | 2. Add Shipment Screen | TC-ASH-086 | Parcel rows are numbered in order | Inventory > Shipment > Add Shipment | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 140 | 2. Add Shipment Screen | TC-ASH-087 | Parcels: Parcel ID / Number accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Parcel ID / Number | 12 | The value is accepted | High | Positive | - |
| 141 | 2. Add Shipment Screen | TC-ASH-088 | Parcels: Leave Parcel ID / Number empty | Inventory > Shipment > Add Shipment | 1. Leave Parcel ID / Number empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Parcel ID / Number is mandatory | High | Negative | - |
| 142 | 2. Add Shipment Screen | TC-ASH-089 | Parcels: Parcel ID / Number rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Parcel ID / Number | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 143 | 2. Add Shipment Screen | TC-ASH-090 | Parcels: Parcel ID / Number at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Parcel ID / Number | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 144 | 2. Add Shipment Screen | TC-ASH-091 | Parcels: Parcel ID / Number longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Parcel ID / Number | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 145 | 2. Add Shipment Screen | TC-ASH-092 | Parcels: Parcel ID / Number accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Parcel ID / Number | 12.5 | The value is accepted | Medium | Positive | - |
| 146 | 2. Add Shipment Screen | TC-ASH-093 | Parcels: Parcel ID / Number with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Parcel ID / Number | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. Parcel ID accepts only integers and decimals (no letters), which is unusual for an identifier. |
| 147 | 2. Add Shipment Screen | TC-ASH-094 | Parcels: Parcel ID / Number equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Parcel ID / Number
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 148 | 2. Add Shipment Screen | TC-ASH-095 | Parcels: duplicate Parcel ID / Number | Inventory > Shipment > Add Shipment | 1. Add two rows with the same Parcel ID / Number
2. Click Save | 1001 (x2) | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define uniqueness of parcel numbers. |
| 149 | 2. Add Shipment Screen | TC-ASH-096 | Parcels: Length (cm) accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Length (cm) | 12 | The value is accepted | High | Positive | - |
| 150 | 2. Add Shipment Screen | TC-ASH-097 | Parcels: Leave Length (cm) empty | Inventory > Shipment > Add Shipment | 1. Leave Length (cm) empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 151 | 2. Add Shipment Screen | TC-ASH-098 | Parcels: Length (cm) rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Length (cm) | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 152 | 2. Add Shipment Screen | TC-ASH-099 | Parcels: Length (cm) at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Length (cm) | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 153 | 2. Add Shipment Screen | TC-ASH-100 | Parcels: Length (cm) longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Length (cm) | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 154 | 2. Add Shipment Screen | TC-ASH-101 | Parcels: Length (cm) accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Length (cm) | 12.5 | The value is accepted | Medium | Positive | - |
| 155 | 2. Add Shipment Screen | TC-ASH-102 | Parcels: Length (cm) with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Length (cm) | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 156 | 2. Add Shipment Screen | TC-ASH-103 | Parcels: Length (cm) equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Length (cm)
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 157 | 2. Add Shipment Screen | TC-ASH-104 | Parcels: Width (cm) accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Width (cm) | 12 | The value is accepted | High | Positive | - |
| 158 | 2. Add Shipment Screen | TC-ASH-105 | Parcels: Leave Width (cm) empty | Inventory > Shipment > Add Shipment | 1. Leave Width (cm) empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 159 | 2. Add Shipment Screen | TC-ASH-106 | Parcels: Width (cm) rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Width (cm) | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 160 | 2. Add Shipment Screen | TC-ASH-107 | Parcels: Width (cm) at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Width (cm) | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 161 | 2. Add Shipment Screen | TC-ASH-108 | Parcels: Width (cm) longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Width (cm) | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 162 | 2. Add Shipment Screen | TC-ASH-109 | Parcels: Width (cm) accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Width (cm) | 12.5 | The value is accepted | Medium | Positive | - |
| 163 | 2. Add Shipment Screen | TC-ASH-110 | Parcels: Width (cm) with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Width (cm) | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 164 | 2. Add Shipment Screen | TC-ASH-111 | Parcels: Width (cm) equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Width (cm)
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 165 | 2. Add Shipment Screen | TC-ASH-112 | Parcels: Height (cm) accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Height (cm) | 12 | The value is accepted | High | Positive | - |
| 166 | 2. Add Shipment Screen | TC-ASH-113 | Parcels: Leave Height (cm) empty | Inventory > Shipment > Add Shipment | 1. Leave Height (cm) empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 167 | 2. Add Shipment Screen | TC-ASH-114 | Parcels: Height (cm) rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Height (cm) | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 168 | 2. Add Shipment Screen | TC-ASH-115 | Parcels: Height (cm) at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Height (cm) | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 169 | 2. Add Shipment Screen | TC-ASH-116 | Parcels: Height (cm) longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Height (cm) | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 170 | 2. Add Shipment Screen | TC-ASH-117 | Parcels: Height (cm) accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Height (cm) | 12.5 | The value is accepted | Medium | Positive | - |
| 171 | 2. Add Shipment Screen | TC-ASH-118 | Parcels: Height (cm) with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Height (cm) | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 172 | 2. Add Shipment Screen | TC-ASH-119 | Parcels: Height (cm) equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Height (cm)
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 173 | 2. Add Shipment Screen | TC-ASH-120 | Parcels: Weight (KG) accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Weight (KG) | 12 | The value is accepted | High | Positive | - |
| 174 | 2. Add Shipment Screen | TC-ASH-121 | Parcels: Leave Weight (KG) empty | Inventory > Shipment > Add Shipment | 1. Leave Weight (KG) empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Weight (KG) is mandatory | High | Negative | - |
| 175 | 2. Add Shipment Screen | TC-ASH-122 | Parcels: Weight (KG) rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Weight (KG) | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 176 | 2. Add Shipment Screen | TC-ASH-123 | Parcels: Weight (KG) at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Weight (KG) | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 177 | 2. Add Shipment Screen | TC-ASH-124 | Parcels: Weight (KG) longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Weight (KG) | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 178 | 2. Add Shipment Screen | TC-ASH-125 | Parcels: Weight (KG) accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Weight (KG) | 12.5 | The value is accepted | Medium | Positive | - |
| 179 | 2. Add Shipment Screen | TC-ASH-126 | Parcels: Weight (KG) with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Weight (KG) | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 180 | 2. Add Shipment Screen | TC-ASH-127 | Parcels: Weight (KG) equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Weight (KG)
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 181 | 2. Add Shipment Screen | TC-ASH-128 | Shipment Total Weight is the sum of the parcel weights | Inventory > Shipment > Add Shipment | 1. Add two parcels with weights 12.5 and 7.5 | 12.5 + 7.5 | Shipment Total Weight (Kg) shows 20 | High | Positive | - |
| 182 | 2. Add Shipment Screen | TC-ASH-129 | Shipment Total Weight updates when a parcel is deleted | Inventory > Shipment > Add Shipment | 1. Add two parcels
2. Delete one row | 12.5 + 7.5 | Shipment Total Weight shows the remaining parcel weight only | High | Positive | - |
| 183 | 2. Add Shipment Screen | TC-ASH-130 | Shipment Total Weight updates when a weight is edited | Inventory > Shipment > Add Shipment | 1. Add a parcel with weight 12.5
2. Change it to 10 | 12.5 > 10 | Shipment Total Weight shows 10 | High | Positive | - |
| 184 | 2. Add Shipment Screen | TC-ASH-131 | Shipment Total Weight is a read-only label | Inventory > Shipment > Add Shipment | Try to edit Shipment Total Weight (Kg) | - | The field cannot be edited | Medium | UI | - |
| 185 | 2. Add Shipment Screen | TC-ASH-132 | Shipment Total Weight with no parcels | Inventory > Shipment > Add Shipment | Open the Add screen without parcels | - | Shipment Total Weight shows 0 | Low | Positive | - |
| 186 | 2. Add Shipment Screen | TC-ASH-133 | Parcels: action bar appears when a row is selected | Inventory > Shipment > Add Shipment | Select the checkbox of a parcel row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 187 | 2. Add Shipment Screen | TC-ASH-134 | Parcels: delete a single row | Inventory > Shipment > Add Shipment | 1. Select one row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 188 | 2. Add Shipment Screen | TC-ASH-135 | Parcels: delete multiple rows | Inventory > Shipment > Add Shipment | 1. Select two rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 189 | 2. Add Shipment Screen | TC-ASH-136 | Parcels: open the Edit Row popup | Inventory > Shipment > Add Shipment | Click the Edit Row icon of a parcel row | - | A popup is displayed with Parcel ID / Number, Length (cm), Width (cm), Height (cm) and Weight (Kg) | High | Positive | - |
| 190 | 2. Add Shipment Screen | TC-ASH-137 | Parcels: Edit Row validates the mandatory fields | Inventory > Shipment > Add Shipment | 1. Open Edit Row
2. Clear Parcel ID / Number and Weight
3. Click Update | - | Error messages are displayed because both fields are mandatory | Medium | Negative | - |
| 191 | 2. Add Shipment Screen | TC-ASH-138 | Parcels: Edit Row rejects letters | Inventory > Shipment > Add Shipment | 1. Open Edit Row
2. Type letters in Length | abc | Letters are not accepted | Medium | Negative | - |
| 192 | 2. Add Shipment Screen | TC-ASH-139 | Parcels: Edit Row saves changes | Inventory > Shipment > Add Shipment | 1. Open Edit Row
2. Change the Weight and Length
3. Click Update | Weight: 15; Length: 40 | The popup closes and the changes are reflected in the row and in Shipment Total Weight | High | Positive | - |
| 193 | 2. Add Shipment Screen | TC-ASH-140 | Parcels: Open the table Settings popup | Inventory > Shipment > Add Shipment | Click Setting on the Parcels table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 194 | 2. Add Shipment Screen | TC-ASH-141 | Parcels: Reorder columns using drag and drop | Inventory > Shipment > Add Shipment | 1. Open Setting
2. Drag the Weight (Kg) column header and drop it before ID / Number | - | The column order changes to the new position | Medium | Positive | - |
| 195 | 2. Add Shipment Screen | TC-ASH-142 | Parcels: Column width default value is 3 | Inventory > Shipment > Add Shipment | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 196 | 2. Add Shipment Screen | TC-ASH-143 | Parcels: Column width accepts numbers only | Inventory > Shipment > Add Shipment | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 197 | 2. Add Shipment Screen | TC-ASH-144 | Parcels: Column width left empty | Inventory > Shipment > Add Shipment | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 198 | 2. Add Shipment Screen | TC-ASH-145 | Parcels: Column width with 1 character | Inventory > Shipment > Add Shipment | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 199 | 2. Add Shipment Screen | TC-ASH-146 | Parcels: Column width longer than 3 characters | Inventory > Shipment > Add Shipment | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 200 | 2. Add Shipment Screen | TC-ASH-147 | Parcels: Add / Remove Columns popup lists all columns | Inventory > Shipment > Add Shipment | Click Add / Remove columns | - | A popup lists all columns with checkboxes: ID / Number, Length (cm), Width (cm), Height (cm), Weight (Kg) | Medium | UI | - |
| 201 | 2. Add Shipment Screen | TC-ASH-148 | Parcels: Hide a column | Inventory > Shipment > Add Shipment | 1. Open Add / Remove columns
2. Clear the Width (cm) checkbox
3. Click Update | Column: Width (cm) | The Width (cm) column is hidden from the table | Medium | Positive | - |
| 202 | 2. Add Shipment Screen | TC-ASH-149 | Parcels: Show a hidden column | Inventory > Shipment > Add Shipment | 1. Hide the Width (cm) column
2. Open Add / Remove columns
3. Select the Width (cm) checkbox
4. Click Update | Column: Width (cm) | The Width (cm) column is displayed again | Medium | Positive | - |
| 203 | 2. Add Shipment Screen | TC-ASH-150 | Parcels: Save the Settings using Update | Inventory > Shipment > Add Shipment | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 204 | 2. Add Shipment Screen | TC-ASH-151 | Parcels: Reset Settings to default | Inventory > Shipment > Add Shipment | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 205 | 2. Add Shipment Screen | TC-ASH-152 | Delivery Note & Packing Slips table displays the default columns | Inventory > Shipment > Add Shipment | Review the Delivery Note & Packing Slips table | - | The table shows: Checkbox, No., Delivery Note, Packing Slip, Qty, Gross Weight, Parcel ID / Number | Medium | UI | - |
| 206 | 2. Add Shipment Screen | TC-ASH-153 | Add Row adds a new Delivery Note row | Inventory > Shipment > Add Shipment | Click Add Row in the Delivery Note & Packing Slips table | - | A new empty row is added to the table | High | Positive | - |
| 207 | 2. Add Shipment Screen | TC-ASH-154 | Delivery Note is a searchable dropdown | Inventory > Shipment > Add Shipment | Click Delivery Note in a row and type part of a name | DN-00 | The list is filtered while typing and shows matching Delivery Notes | High | Positive | - |
| 208 | 2. Add Shipment Screen | TC-ASH-155 | Delivery Note lists only notes that have Packing Slips | Inventory > Shipment > Add Shipment | Open the Delivery Note dropdown | DN-0001 (has Packing Slips); DN-0005 (no Packing Slips) | Only DN-0001 is listed | High | Positive | - |
| 209 | 2. Add Shipment Screen | TC-ASH-156 | Select a Delivery Note | Inventory > Shipment > Add Shipment | Select a Delivery Note | DN-0001 | The value is accepted | High | Positive | - |
| 210 | 2. Add Shipment Screen | TC-ASH-157 | Leave Delivery Note empty | Inventory > Shipment > Add Shipment | 1. Add a row
2. Leave Delivery Note empty
3. Click Save | - | An error message is displayed because Delivery Note is mandatory | High | Negative | - |
| 211 | 2. Add Shipment Screen | TC-ASH-158 | Packing Slip is filled automatically after selecting a Delivery Note | Inventory > Shipment > Add Shipment | Select a Delivery Note that has one Packing Slip | DN-0001 > PS-2026-001 | The Packing Slip column is populated with the Packing Slip of the Delivery Note | High | Positive | - |
| 212 | 2. Add Shipment Screen | TC-ASH-159 | An extra row is created for each additional Packing Slip | Inventory > Shipment > Add Shipment | Select a Delivery Note that has two Packing Slips | DN-0001 > PS-2026-001, PS-2026-002 | Two rows are shown with the same Delivery Note and one Packing Slip each | High | Positive | - |
| 213 | 2. Add Shipment Screen | TC-ASH-160 | Qty is filled automatically from the Packing Slip | Inventory > Shipment > Add Shipment | Select a Delivery Note | PS-2026-001: Qty 10 | The Qty (read-only) shows the quantity of the Packing Slip | High | Positive | - |
| 214 | 2. Add Shipment Screen | TC-ASH-161 | Qty is a read-only label | Inventory > Shipment > Add Shipment | Try to edit Qty in a row | - | Qty cannot be edited | Medium | UI | - |
| 215 | 2. Add Shipment Screen | TC-ASH-162 | Gross Weight is filled automatically from the Packing Slip | Inventory > Shipment > Add Shipment | Select a Delivery Note | PS-2026-001: Gross Weight 4 | Gross Weight shows the gross weight of the Packing Slip | High | Positive | - |
| 216 | 2. Add Shipment Screen | TC-ASH-163 | Gross Weight can be edited | Inventory > Shipment > Add Shipment | 1. Change the Gross Weight of a row
2. Click Save | Gross Weight: 4 > 5 | The new value is accepted | Medium | Positive | Needs Clarification: Gross Weight is an input field but is also fetched automatically. Confirm that overriding is allowed. |
| 217 | 2. Add Shipment Screen | TC-ASH-164 | Packing Slip is a searchable dropdown | Inventory > Shipment > Add Shipment | Click Packing Slip in a row and type part of a name | PS-2026 | The list is filtered while typing | Medium | Positive | - |
| 218 | 2. Add Shipment Screen | TC-ASH-165 | Packing Slip lists only slips of the selected Delivery Note | Inventory > Shipment > Add Shipment | 1. Select DN-0001
2. Open the Packing Slip dropdown | PS-2026-001, PS-2026-002 | Only Packing Slips that belong to the selected Delivery Note are listed | High | Positive | Needs Clarification: SRS does not say which statuses of Packing Slip are listed (Draft / Submitted / Cancelled). |
| 219 | 2. Add Shipment Screen | TC-ASH-166 | Leave Packing Slip empty | Inventory > Shipment > Add Shipment | 1. Add a row with a Delivery Note
2. Clear Packing Slip
3. Click Save | - | An error message is displayed because Packing Slip is mandatory | High | Negative | - |
| 220 | 2. Add Shipment Screen | TC-ASH-167 | Cancelled or Draft Packing Slip in a Shipment | Inventory > Shipment > Add Shipment | 1. Select a Delivery Note whose Packing Slip is Draft or Cancelled | Draft / Cancelled slip | To be confirmed with the BA (such slips should not be shipped) | High | Negative | Needs Clarification: SRS does not define which Packing Slip statuses are allowed. |
| 221 | 2. Add Shipment Screen | TC-ASH-168 | Same Packing Slip in two rows | Inventory > Shipment > Add Shipment | 1. Add the same Packing Slip in two rows
2. Click Save | PS-2026-001 (x2) | To be confirmed with the BA (blocked, warned or allowed) | Medium | Negative | Needs Clarification: SRS does not define duplicates. |
| 222 | 2. Add Shipment Screen | TC-ASH-169 | Packing Slip already used in another Shipment | Inventory > Shipment > Add Shipment | 1. Submit a Shipment with PS-2026-001
2. Create another Shipment with the same Packing Slip | PS-2026-001 | To be confirmed with the BA (blocked or allowed) | High | Negative | Needs Clarification: SRS does not define this case. |
| 223 | 2. Add Shipment Screen | TC-ASH-170 | Changing the Delivery Note replaces its Packing Slip rows | Inventory > Shipment > Add Shipment | 1. Select DN-0001 (2 slips)
2. Change the Delivery Note of one row to DN-0004 | DN-0001 > DN-0004 | The Packing Slip, Qty and Gross Weight of the row are replaced | Medium | Positive | Needs Clarification: Not defined in the SRS. |
| 224 | 2. Add Shipment Screen | TC-ASH-171 | Delivery Note table: Gross Weight accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Gross Weight | 12 | The value is accepted | High | Positive | - |
| 225 | 2. Add Shipment Screen | TC-ASH-172 | Delivery Note table: Leave Gross Weight empty | Inventory > Shipment > Add Shipment | 1. Leave Gross Weight empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Gross Weight is mandatory | High | Negative | - |
| 226 | 2. Add Shipment Screen | TC-ASH-173 | Delivery Note table: Gross Weight rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Gross Weight | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 227 | 2. Add Shipment Screen | TC-ASH-174 | Delivery Note table: Gross Weight at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Gross Weight | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 228 | 2. Add Shipment Screen | TC-ASH-175 | Delivery Note table: Gross Weight longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Gross Weight | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 229 | 2. Add Shipment Screen | TC-ASH-176 | Delivery Note table: Gross Weight accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Gross Weight | 12.5 | The value is accepted | Medium | Positive | - |
| 230 | 2. Add Shipment Screen | TC-ASH-177 | Delivery Note table: Gross Weight with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Gross Weight | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 231 | 2. Add Shipment Screen | TC-ASH-178 | Delivery Note table: Gross Weight equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Gross Weight
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 232 | 2. Add Shipment Screen | TC-ASH-179 | Delivery Note table: Parcel ID / Number accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Parcel ID / Number | 12 | The value is accepted | High | Positive | - |
| 233 | 2. Add Shipment Screen | TC-ASH-180 | Delivery Note table: Leave Parcel ID / Number empty | Inventory > Shipment > Add Shipment | 1. Leave Parcel ID / Number empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Parcel ID / Number is mandatory | High | Negative | - |
| 234 | 2. Add Shipment Screen | TC-ASH-181 | Delivery Note table: Parcel ID / Number rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Parcel ID / Number | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 235 | 2. Add Shipment Screen | TC-ASH-182 | Delivery Note table: Parcel ID / Number at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Parcel ID / Number | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 236 | 2. Add Shipment Screen | TC-ASH-183 | Delivery Note table: Parcel ID / Number longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Parcel ID / Number | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 237 | 2. Add Shipment Screen | TC-ASH-184 | Delivery Note table: Parcel ID / Number accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Parcel ID / Number | 12.5 | The value is accepted | Medium | Positive | - |
| 238 | 2. Add Shipment Screen | TC-ASH-185 | Delivery Note table: Parcel ID / Number with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Parcel ID / Number | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 239 | 2. Add Shipment Screen | TC-ASH-186 | Delivery Note table: Parcel ID / Number equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Parcel ID / Number
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 240 | 2. Add Shipment Screen | TC-ASH-187 | Delivery Note table: action bar appears when a row is selected | Inventory > Shipment > Add Shipment | Select the checkbox of a row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 241 | 2. Add Shipment Screen | TC-ASH-188 | Delivery Note table: delete a single row | Inventory > Shipment > Add Shipment | 1. Select one row
2. Click Delete row | - | The row is deleted and the numbering is updated | High | Positive | - |
| 242 | 2. Add Shipment Screen | TC-ASH-189 | Delivery Note table: delete multiple rows | Inventory > Shipment > Add Shipment | 1. Select two rows
2. Click Delete row | - | Both rows are deleted | Medium | Positive | - |
| 243 | 2. Add Shipment Screen | TC-ASH-190 | Delivery Note table: open the Edit Row popup | Inventory > Shipment > Add Shipment | Click the Edit Row icon of a row | - | A popup is displayed with the row fields | High | Positive | - |
| 244 | 2. Add Shipment Screen | TC-ASH-191 | Edit Row displays the fields | Inventory > Shipment > Add Shipment | Open Edit Row and review the fields | - | The popup shows: Delivery Note, Packing Slip, Qty, Packing Slip Gross Weight, Packing Slip Weight UOM, Shipment Weight UOM, UOM Conversion Factor, Packing Slip Weight (Shipment Weight UOM), Parcel ID / Number | Medium | UI | Needs Clarification: SRS says the Packing Slip field links to the 'Customer' doctype and the Parcel ID field is described as 'parcel height'. Assumed to be typos. |
| 245 | 2. Add Shipment Screen | TC-ASH-192 | Edit Row: Delivery Note lists only notes with Packing Slips | Inventory > Shipment > Add Shipment | Open Edit Row and open the Delivery Note dropdown | DN-0005 (no Packing Slips) | DN-0005 is not listed | Medium | Positive | - |
| 246 | 2. Add Shipment Screen | TC-ASH-193 | Edit Row: Packing Slip Weight UOM is a read-only label | Inventory > Shipment > Add Shipment | Open Edit Row and review Packing Slip Weight UOM | Gross Weight UOM: Gram | The UOM fetched from the Packing Slip is displayed and cannot be edited | Medium | UI | - |
| 247 | 2. Add Shipment Screen | TC-ASH-194 | Edit Row: Shipment Weight UOM is fixed to Kg | Inventory > Shipment > Add Shipment | Open Edit Row and try to edit Shipment Weight UOM | - | Shipment Weight UOM shows Kg and cannot be changed | High | Negative | - |
| 248 | 2. Add Shipment Screen | TC-ASH-195 | Edit Row: UOM Conversion Factor between Packing Slip UOM and Kg | Inventory > Shipment > Add Shipment | Open Edit Row for a slip whose weight UOM is Gram | Gram > Kg: 0.001 | UOM Conversion Factor shows the factor between the Packing Slip Weight UOM and Kg | High | Positive | - |
| 249 | 2. Add Shipment Screen | TC-ASH-196 | Edit Row: Conversion factor is 1 when the Packing Slip UOM is Kg | Inventory > Shipment > Add Shipment | Open Edit Row for a slip whose weight UOM is Kg | Kg > Kg: 1 | UOM Conversion Factor shows 1 | Medium | Positive | - |
| 250 | 2. Add Shipment Screen | TC-ASH-197 | Edit Row: Packing Slip Weight (Shipment Weight UOM) is calculated with the conversion | Inventory > Shipment > Add Shipment | Open Edit Row for a slip with Gross Weight 4000 Gram | 4000 x 0.001 | Packing Slip Weight (Shipment Weight UOM) shows 4 | High | Positive | - |
| 251 | 2. Add Shipment Screen | TC-ASH-198 | Edit Row: Packing Slip Weight (Shipment Weight UOM) is read-only | Inventory > Shipment > Add Shipment | Try to edit Packing Slip Weight (Shipment Weight UOM) | - | The field cannot be edited | Medium | UI | - |
| 252 | 2. Add Shipment Screen | TC-ASH-199 | Edit Row: Packing Slip Weight updates when the Gross Weight is changed | Inventory > Shipment > Add Shipment | 1. Open Edit Row
2. Change the Gross Weight
3. Click Update | Gross Weight: 4 > 5 | Packing Slip Weight (Shipment Weight UOM) is recalculated | High | Positive | - |
| 253 | 2. Add Shipment Screen | TC-ASH-200 | Edit Row: save changes with Update | Inventory > Shipment > Add Shipment | 1. Open Edit Row
2. Change the Gross Weight and Parcel ID
3. Click Update | Gross: 5; Parcel: 1001 | The popup closes and the changes are reflected in the row | High | Positive | - |
| 254 | 2. Add Shipment Screen | TC-ASH-201 | Delivery Note table: Open the table Settings popup | Inventory > Shipment > Add Shipment | Click Setting on the Delivery Note table table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 255 | 2. Add Shipment Screen | TC-ASH-202 | Delivery Note table: Reorder columns using drag and drop | Inventory > Shipment > Add Shipment | 1. Open Setting
2. Drag the Parcel ID / Number column header and drop it before Delivery Note | - | The column order changes to the new position | Medium | Positive | - |
| 256 | 2. Add Shipment Screen | TC-ASH-203 | Delivery Note table: Column width default value is 3 | Inventory > Shipment > Add Shipment | Open Setting and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 257 | 2. Add Shipment Screen | TC-ASH-204 | Delivery Note table: Column width accepts numbers only | Inventory > Shipment > Add Shipment | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 258 | 2. Add Shipment Screen | TC-ASH-205 | Delivery Note table: Column width left empty | Inventory > Shipment > Add Shipment | 1. Open Setting
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 259 | 2. Add Shipment Screen | TC-ASH-206 | Delivery Note table: Column width with 1 character | Inventory > Shipment > Add Shipment | 1. Open Setting
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 260 | 2. Add Shipment Screen | TC-ASH-207 | Delivery Note table: Column width longer than 3 characters | Inventory > Shipment > Add Shipment | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 261 | 2. Add Shipment Screen | TC-ASH-208 | Delivery Note table: Add / Remove Columns popup lists all columns | Inventory > Shipment > Add Shipment | Click Add / Remove columns | - | A popup lists all columns with checkboxes: Delivery Note, Packing Slip, Qty, Gross Weight, Parcel ID / Number | Medium | UI | - |
| 262 | 2. Add Shipment Screen | TC-ASH-209 | Delivery Note table: Hide a column | Inventory > Shipment > Add Shipment | 1. Open Add / Remove columns
2. Clear the Qty checkbox
3. Click Update | Column: Qty | The Qty column is hidden from the table | Medium | Positive | - |
| 263 | 2. Add Shipment Screen | TC-ASH-210 | Delivery Note table: Show a hidden column | Inventory > Shipment > Add Shipment | 1. Hide the Qty column
2. Open Add / Remove columns
3. Select the Qty checkbox
4. Click Update | Column: Qty | The Qty column is displayed again | Medium | Positive | - |
| 264 | 2. Add Shipment Screen | TC-ASH-211 | Delivery Note table: Save the Settings using Update | Inventory > Shipment > Add Shipment | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 265 | 2. Add Shipment Screen | TC-ASH-212 | Delivery Note table: Reset Settings to default | Inventory > Shipment > Add Shipment | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 266 | 2. Add Shipment Screen | TC-ASH-213 | Packing Slips Total Weight is the sum of the converted weights | Inventory > Shipment > Add Shipment | 1. Add two Packing Slips: 4 Kg and 2000 Gram | 4 + 2 | Packing Slips Total Weight (Kg) shows 6 | High | Positive | - |
| 267 | 2. Add Shipment Screen | TC-ASH-214 | Packing Slips Total Weight updates when a row is deleted | Inventory > Shipment > Add Shipment | 1. Add two rows
2. Delete one row | 4 + 2 | Packing Slips Total Weight shows the remaining row only | High | Positive | - |
| 268 | 2. Add Shipment Screen | TC-ASH-215 | Packing Slips Total Weight is a read-only label | Inventory > Shipment > Add Shipment | Try to edit Packing Slips Total Weight (Kg) | - | The field cannot be edited | Medium | UI | - |
| 269 | 2. Add Shipment Screen | TC-ASH-216 | Shipment Total Weight greater than Packing Slips Total Weight | Inventory > Shipment > Add Shipment | 1. Parcels total: 20 Kg
2. Packing Slips total: 6 Kg
3. Click Save | 20 >= 6 | The Shipment is saved | High | Positive | - |
| 270 | 2. Add Shipment Screen | TC-ASH-217 | Shipment Total Weight equal to Packing Slips Total Weight | Inventory > Shipment > Add Shipment | 1. Parcels total: 6 Kg
2. Packing Slips total: 6 Kg
3. Click Save | 6 = 6 | The Shipment is saved | High | Positive | - |
| 271 | 2. Add Shipment Screen | TC-ASH-218 | Shipment Total Weight smaller than Packing Slips Total Weight | Inventory > Shipment > Add Shipment | 1. Parcels total: 3 Kg
2. Packing Slips total: 6 Kg
3. Click Save | 3 < 6 | A validation error is displayed and the Shipment is not saved | High | Negative | Needs Clarification: SRS states the rule but not the error message or whether it is checked on Save or Submit. |
| 272 | 2. Add Shipment Screen | TC-ASH-219 | Weight rule is rechecked after editing a parcel weight | Inventory > Shipment > Add Shipment | 1. Save a valid Shipment
2. Reduce a parcel weight below the packing slips total
3. Click Save | Parcels: 20 > 3 | A validation error is displayed | Medium | Negative | - |
| 273 | 2. Add Shipment Screen | TC-ASH-220 | Pallets dropdown lists the allowed values | Inventory > Shipment > Add Shipment | Open the Pallets dropdown | - | The dropdown contains: Yes, No | Medium | Positive | - |
| 274 | 2. Add Shipment Screen | TC-ASH-221 | Select Pallets | Inventory > Shipment > Add Shipment | Select Yes | Yes | The value is accepted | Medium | Positive | - |
| 275 | 2. Add Shipment Screen | TC-ASH-222 | Leave Pallets empty | Inventory > Shipment > Add Shipment | 1. Fill the mandatory fields
2. Leave Pallets empty
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 276 | 2. Add Shipment Screen | TC-ASH-223 | Shipment Type dropdown lists the allowed values | Inventory > Shipment > Add Shipment | Open the Shipment Type dropdown | - | The dropdown contains: Goods, Documents | Medium | Positive | - |
| 277 | 2. Add Shipment Screen | TC-ASH-224 | Select Shipment Type | Inventory > Shipment > Add Shipment | Select Goods | Goods | The value is accepted | Medium | Positive | - |
| 278 | 2. Add Shipment Screen | TC-ASH-225 | Leave Shipment Type empty | Inventory > Shipment > Add Shipment | 1. Fill the mandatory fields
2. Leave Shipment Type empty
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 279 | 2. Add Shipment Screen | TC-ASH-226 | Shipment Type = Documents with Value of Goods | Inventory > Shipment > Add Shipment | 1. Select Shipment Type = Documents
2. Click Save | Documents | To be confirmed with the BA (Value of Goods still mandatory?) | Low | Positive | Needs Clarification: Value of Goods is mandatory in all cases per the SRS, even for documents. |
| 280 | 2. Add Shipment Screen | TC-ASH-227 | Shipment Details: Value of Goods accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Value of Goods | 12 | The value is accepted | High | Positive | - |
| 281 | 2. Add Shipment Screen | TC-ASH-228 | Shipment Details: Leave Value of Goods empty | Inventory > Shipment > Add Shipment | 1. Leave Value of Goods empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Value of Goods is mandatory | High | Negative | - |
| 282 | 2. Add Shipment Screen | TC-ASH-229 | Shipment Details: Value of Goods rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Value of Goods | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 283 | 2. Add Shipment Screen | TC-ASH-230 | Shipment Details: Value of Goods at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Value of Goods | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 284 | 2. Add Shipment Screen | TC-ASH-231 | Shipment Details: Value of Goods longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Value of Goods | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 285 | 2. Add Shipment Screen | TC-ASH-232 | Shipment Details: Value of Goods accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Value of Goods | 12.5 | The value is accepted | Medium | Positive | - |
| 286 | 2. Add Shipment Screen | TC-ASH-233 | Shipment Details: Value of Goods with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Value of Goods | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 287 | 2. Add Shipment Screen | TC-ASH-234 | Shipment Details: Value of Goods equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Value of Goods
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 288 | 2. Add Shipment Screen | TC-ASH-235 | Pickup Type dropdown lists the allowed values | Inventory > Shipment > Add Shipment | Open the Pickup Type dropdown | - | The dropdown contains: Pickup, Self Delivery | Medium | Positive | - |
| 289 | 2. Add Shipment Screen | TC-ASH-236 | Select Pickup Type | Inventory > Shipment > Add Shipment | Select Pickup | Pickup | The value is accepted | Medium | Positive | - |
| 290 | 2. Add Shipment Screen | TC-ASH-237 | Leave Pickup Type empty | Inventory > Shipment > Add Shipment | 1. Fill the mandatory fields
2. Leave Pickup Type empty
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 291 | 2. Add Shipment Screen | TC-ASH-238 | Pickup Date default value is the current date | Inventory > Shipment > Add Shipment | Open the Add screen and review Pickup Date | - | Pickup Date is filled with the current date | High | Positive | - |
| 292 | 2. Add Shipment Screen | TC-ASH-239 | Select a Pickup Date using the calendar | Inventory > Shipment > Add Shipment | Click Pickup Date and select a date | 2026-11-01 | The selected date is accepted | High | Positive | - |
| 293 | 2. Add Shipment Screen | TC-ASH-240 | Leave Pickup Date empty | Inventory > Shipment > Add Shipment | 1. Clear Pickup Date
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Pickup Date is mandatory | High | Negative | - |
| 294 | 2. Add Shipment Screen | TC-ASH-241 | Pickup Date in the past | Inventory > Shipment > Add Shipment | 1. Select a date earlier than today
2. Click Save | 2025-01-01 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define date validation. |
| 295 | 2. Add Shipment Screen | TC-ASH-242 | Incoterm is a searchable dropdown | Inventory > Shipment > Add Shipment | Click Incoterm and type part of a name | EX | The list is filtered while typing and shows matching incoterms | Medium | Positive | - |
| 296 | 2. Add Shipment Screen | TC-ASH-243 | Select an Incoterm | Inventory > Shipment > Add Shipment | Search for and select an Incoterm | EXW | The value is accepted | Medium | Positive | - |
| 297 | 2. Add Shipment Screen | TC-ASH-244 | Leave Incoterm empty | Inventory > Shipment > Add Shipment | 1. Fill the mandatory fields
2. Leave Incoterm empty
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 298 | 2. Add Shipment Screen | TC-ASH-245 | Pickup Time From: select a time | Inventory > Shipment > Add Shipment | Click Pickup From (time) and select a time | 09:00 | The selected time is accepted | High | Positive | Needs Clarification: The SRS reuses the label 'Pickup From' for this time field and for the party dropdown. Assumed to be the earliest pickup time. |
| 299 | 2. Add Shipment Screen | TC-ASH-246 | Pickup Time From: leave empty | Inventory > Shipment > Add Shipment | 1. Leave the Pickup From time empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because the time is mandatory | High | Negative | - |
| 300 | 2. Add Shipment Screen | TC-ASH-247 | Pickup Time To: select a time | Inventory > Shipment > Add Shipment | Click Pickup To and select a time | 17:00 | The selected time is accepted | High | Positive | - |
| 301 | 2. Add Shipment Screen | TC-ASH-248 | Pickup Time To: leave empty | Inventory > Shipment > Add Shipment | 1. Leave Pickup To empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Pickup To is mandatory | High | Negative | - |
| 302 | 2. Add Shipment Screen | TC-ASH-249 | Pickup To later than Pickup From | Inventory > Shipment > Add Shipment | 1. Pickup From 09:00
2. Pickup To 17:00
3. Click Save | 09:00 - 17:00 | The Shipment is saved | High | Positive | - |
| 303 | 2. Add Shipment Screen | TC-ASH-250 | Pickup To earlier than Pickup From | Inventory > Shipment > Add Shipment | 1. Pickup From 17:00
2. Pickup To 09:00
3. Click Save | 17:00 - 09:00 | A validation error is displayed because the end time is earlier than the start time | High | Negative | Needs Clarification: SRS does not define the time-range validation. |
| 304 | 2. Add Shipment Screen | TC-ASH-251 | Pickup To equal to Pickup From | Inventory > Shipment > Add Shipment | 1. Select the same time in both fields
2. Click Save | 09:00 - 09:00 | To be confirmed with the BA (accepted or rejected) | Low | Negative | Needs Clarification: Not defined in the SRS. |
| 305 | 2. Add Shipment Screen | TC-ASH-252 | Description of Content accepts valid text | Inventory > Shipment > Add Shipment | Enter valid text in Description of Content | 10 boxes of ceramic mugs | The value is accepted | High | Positive | - |
| 306 | 2. Add Shipment Screen | TC-ASH-253 | Leave Description of Content empty | Inventory > Shipment > Add Shipment | 1. Leave Description of Content empty
2. Fill the other mandatory fields
3. Click Save | - | An error message is displayed because Description of Content is mandatory | High | Negative | - |
| 307 | 2. Add Shipment Screen | TC-ASH-254 | Description of Content shorter than the minimum length (1 character) | Inventory > Shipment > Add Shipment | 1. Enter 1 character
2. Click Save | a | An error message is displayed because the minimum length is 2 characters | Medium | Negative | - |
| 308 | 2. Add Shipment Screen | TC-ASH-255 | Description of Content at the minimum length (2 characters) | Inventory > Shipment > Add Shipment | Enter 2 characters | ab | The value is accepted | Medium | Positive | - |
| 309 | 2. Add Shipment Screen | TC-ASH-256 | Description of Content at the maximum length (500 characters) | Inventory > Shipment > Add Shipment | Enter exactly 500 characters | 500-character text | The value is accepted | Medium | Positive | - |
| 310 | 2. Add Shipment Screen | TC-ASH-257 | Description of Content longer than 500 characters | Inventory > Shipment > Add Shipment | Try to enter or paste 501 characters | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 311 | 2. Add Shipment Screen | TC-ASH-258 | Description of Content accepts letters, numbers and special characters | Inventory > Shipment > Add Shipment | Enter a mix of letters, numbers and special characters | Box #1 - fragile (x10) @Cairo | The value is accepted | Medium | Positive | - |
| 312 | 2. Add Shipment Screen | TC-ASH-259 | Description of Content rejects invalid data | Inventory > Shipment > Add Shipment | 1. Enter invalid content such as script tags
2. Click Save | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | Needs Clarification: SRS lists an error for the minimum length only; invalid-data handling is assumed. |
| 313 | 2. Add Shipment Screen | TC-ASH-260 | Shipment Information: Service Provider accepts valid text | Inventory > Shipment > Add Shipment | Enter valid text in Service Provider | Aramex Express #1 | The value is accepted | Medium | Positive | - |
| 314 | 2. Add Shipment Screen | TC-ASH-261 | Shipment Information: Leave Service Provider empty | Inventory > Shipment > Add Shipment | 1. Leave Service Provider empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 315 | 2. Add Shipment Screen | TC-ASH-262 | Shipment Information: Service Provider at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 characters in Service Provider | 100-character text | The value is accepted | Low | Positive | - |
| 316 | 2. Add Shipment Screen | TC-ASH-263 | Shipment Information: Service Provider longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter or paste 101 characters in Service Provider | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 317 | 2. Add Shipment Screen | TC-ASH-264 | Shipment Information: Service Provider accepts letters, numbers and special characters | Inventory > Shipment > Add Shipment | Enter a mix of letters, numbers and special characters in Service Provider | Ex-Press 24/7 (v2) | The value is accepted | Medium | Positive | - |
| 318 | 2. Add Shipment Screen | TC-ASH-265 | Shipment Information: Carrier accepts valid text | Inventory > Shipment > Add Shipment | Enter valid text in Carrier | Aramex Express #1 | The value is accepted | Medium | Positive | - |
| 319 | 2. Add Shipment Screen | TC-ASH-266 | Shipment Information: Leave Carrier empty | Inventory > Shipment > Add Shipment | 1. Leave Carrier empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 320 | 2. Add Shipment Screen | TC-ASH-267 | Shipment Information: Carrier at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 characters in Carrier | 100-character text | The value is accepted | Low | Positive | - |
| 321 | 2. Add Shipment Screen | TC-ASH-268 | Shipment Information: Carrier longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter or paste 101 characters in Carrier | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 322 | 2. Add Shipment Screen | TC-ASH-269 | Shipment Information: Carrier accepts letters, numbers and special characters | Inventory > Shipment > Add Shipment | Enter a mix of letters, numbers and special characters in Carrier | Ex-Press 24/7 (v2) | The value is accepted | Medium | Positive | - |
| 323 | 2. Add Shipment Screen | TC-ASH-270 | Shipment Information: Shipment ID accepts valid text | Inventory > Shipment > Add Shipment | Enter valid text in Shipment ID | Aramex Express #1 | The value is accepted | Medium | Positive | - |
| 324 | 2. Add Shipment Screen | TC-ASH-271 | Shipment Information: Leave Shipment ID empty | Inventory > Shipment > Add Shipment | 1. Leave Shipment ID empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 325 | 2. Add Shipment Screen | TC-ASH-272 | Shipment Information: Shipment ID at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 characters in Shipment ID | 100-character text | The value is accepted | Low | Positive | - |
| 326 | 2. Add Shipment Screen | TC-ASH-273 | Shipment Information: Shipment ID longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter or paste 101 characters in Shipment ID | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 327 | 2. Add Shipment Screen | TC-ASH-274 | Shipment Information: Shipment ID accepts letters, numbers and special characters | Inventory > Shipment > Add Shipment | Enter a mix of letters, numbers and special characters in Shipment ID | Ex-Press 24/7 (v2) | The value is accepted | Medium | Positive | - |
| 328 | 2. Add Shipment Screen | TC-ASH-275 | Shipment Information: Carrier Service accepts valid text | Inventory > Shipment > Add Shipment | Enter valid text in Carrier Service | Aramex Express #1 | The value is accepted | Medium | Positive | - |
| 329 | 2. Add Shipment Screen | TC-ASH-276 | Shipment Information: Leave Carrier Service empty | Inventory > Shipment > Add Shipment | 1. Leave Carrier Service empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 330 | 2. Add Shipment Screen | TC-ASH-277 | Shipment Information: Carrier Service at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 characters in Carrier Service | 100-character text | The value is accepted | Low | Positive | - |
| 331 | 2. Add Shipment Screen | TC-ASH-278 | Shipment Information: Carrier Service longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter or paste 101 characters in Carrier Service | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 332 | 2. Add Shipment Screen | TC-ASH-279 | Shipment Information: Carrier Service accepts letters, numbers and special characters | Inventory > Shipment > Add Shipment | Enter a mix of letters, numbers and special characters in Carrier Service | Ex-Press 24/7 (v2) | The value is accepted | Medium | Positive | - |
| 333 | 2. Add Shipment Screen | TC-ASH-280 | Shipment Information: Shipment Amount accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in Shipment Amount | 12 | The value is accepted | High | Positive | - |
| 334 | 2. Add Shipment Screen | TC-ASH-281 | Shipment Information: Leave Shipment Amount empty | Inventory > Shipment > Add Shipment | 1. Leave Shipment Amount empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 335 | 2. Add Shipment Screen | TC-ASH-282 | Shipment Information: Shipment Amount rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in Shipment Amount | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 336 | 2. Add Shipment Screen | TC-ASH-283 | Shipment Information: Shipment Amount at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in Shipment Amount | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 337 | 2. Add Shipment Screen | TC-ASH-284 | Shipment Information: Shipment Amount longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in Shipment Amount | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 338 | 2. Add Shipment Screen | TC-ASH-285 | Shipment Information: Shipment Amount accepts decimal values | Inventory > Shipment > Add Shipment | Enter a decimal number in Shipment Amount | 12.5 | The value is accepted | Medium | Positive | - |
| 339 | 2. Add Shipment Screen | TC-ASH-286 | Shipment Information: Shipment Amount with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in Shipment Amount | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 340 | 2. Add Shipment Screen | TC-ASH-287 | Shipment Information: Shipment Amount equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in Shipment Amount
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 341 | 2. Add Shipment Screen | TC-ASH-288 | Shipment Information: AWB Number accepts a valid number | Inventory > Shipment > Add Shipment | Enter a valid number in AWB Number | 12 | The value is accepted | High | Positive | - |
| 342 | 2. Add Shipment Screen | TC-ASH-289 | Shipment Information: Leave AWB Number empty | Inventory > Shipment > Add Shipment | 1. Leave AWB Number empty
2. Fill the other mandatory fields
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 343 | 2. Add Shipment Screen | TC-ASH-290 | Shipment Information: AWB Number rejects letters and special characters | Inventory > Shipment > Add Shipment | Type letters and special characters in AWB Number | abc, @# | Only numbers are accepted; other characters are rejected | Medium | Negative | - |
| 344 | 2. Add Shipment Screen | TC-ASH-291 | Shipment Information: AWB Number at the maximum length (100 characters) | Inventory > Shipment > Add Shipment | Enter exactly 100 digits in AWB Number | 100-digit number | The value is accepted by the field (input limit) | Low | Positive | - |
| 345 | 2. Add Shipment Screen | TC-ASH-292 | Shipment Information: AWB Number longer than 100 characters | Inventory > Shipment > Add Shipment | Try to enter 101 digits in AWB Number | 101-digit number | Input stops at 100 characters | Low | Negative | - |
| 346 | 2. Add Shipment Screen | TC-ASH-293 | Shipment Information: AWB Number with a negative number | Inventory > Shipment > Add Shipment | Try to type a negative number in AWB Number | -5 | To be confirmed with the BA (expected to be rejected) | Medium | Negative | Needs Clarification: SRS does not define negative values. |
| 347 | 2. Add Shipment Screen | TC-ASH-294 | Shipment Information: AWB Number equal to zero | Inventory > Shipment > Add Shipment | 1. Enter 0 in AWB Number
2. Click Save | 0 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define a minimum value. |
| 348 | 2. Add Shipment Screen | TC-ASH-295 | AWB Number rejects decimal values | Inventory > Shipment > Add Shipment | Type a decimal number in AWB Number | 123.45 | Only whole numbers (digits) are accepted | Medium | Negative | Needs Clarification: SRS says 'numbers only' for AWB (not integers and decimals). |
| 349 | 2. Add Shipment Screen | TC-ASH-296 | Status is a read-only label | Inventory > Shipment > Add Shipment | Review Status on a new Shipment | - | Status is displayed as a label and cannot be edited | Medium | UI | - |
| 350 | 2. Add Shipment Screen | TC-ASH-297 | Tracking Status dropdown lists the allowed values | Inventory > Shipment > Add Shipment | Open the Tracking Status dropdown | - | The dropdown contains: In progress, Delivery, Returned, Lost | Medium | Positive | Needs Clarification: 'Delivery' is probably meant to be 'Delivered'. Confirm the label. |
| 351 | 2. Add Shipment Screen | TC-ASH-298 | Select a Tracking Status | Inventory > Shipment > Add Shipment | Select In progress | In progress | The value is accepted | Medium | Positive | - |
| 352 | 2. Add Shipment Screen | TC-ASH-299 | Leave Tracking Status empty | Inventory > Shipment > Add Shipment | 1. Fill the mandatory fields
2. Leave Tracking Status empty
3. Click Save | - | The Shipment is saved (field is optional) | Medium | Positive | - |
| 353 | 2. Add Shipment Screen | TC-ASH-300 | Tracking Status affects the document status | Inventory > Shipment > Add Shipment | 1. Submit a Shipment
2. Set Tracking Status = Delivery | Delivery | To be confirmed with the BA (document status changes to Completed) | High | Positive | Needs Clarification: SRS does not link Tracking Status to the Booked / Completed document statuses. |
| 354 | 2. Add Shipment Screen | TC-ASH-301 | Get Items From Delivery Note button is displayed | Inventory > Shipment > Add Shipment | Review the page actions | - | The Get Items From Delivery Note button is displayed | High | UI | - |
| 355 | 2. Add Shipment Screen | TC-ASH-302 | Open the Get Items From Delivery Note popup | Inventory > Shipment > Add Shipment | Click Get Items From Delivery Note | - | A popup is displayed with Search, Company, Customer, the Delivery Note list and the Get Items button | High | Positive | - |
| 356 | 2. Add Shipment Screen | TC-ASH-303 | Popup lists only Submitted Delivery Notes | Inventory > Shipment > Add Shipment | Open the popup | DN-0001 (Submitted); DN-0006 (Draft); DN-0007 (Cancelled) | Only DN-0001 is listed | High | Positive | - |
| 357 | 2. Add Shipment Screen | TC-ASH-304 | Popup lists the Delivery Note columns | Inventory > Shipment > Add Shipment | Review the Delivery Note list in the popup | - | The list shows: Checkbox, No., Name, Company, Customer | Medium | UI | - |
| 358 | 2. Add Shipment Screen | TC-ASH-305 | Search Delivery Notes by full name | Inventory > Shipment > Add Shipment | Type a full Delivery Note name in Search | DN-0001 | Only the matching Delivery Note is displayed | Medium | Positive | - |
| 359 | 2. Add Shipment Screen | TC-ASH-306 | Search Delivery Notes by part of the name | Inventory > Shipment > Add Shipment | Type part of a Delivery Note name in Search | 0001 | All Delivery Notes containing the text are displayed | Medium | Positive | - |
| 360 | 2. Add Shipment Screen | TC-ASH-307 | Search field maximum length is 100 characters | Inventory > Shipment > Add Shipment | Enter 101 characters in Search | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 361 | 2. Add Shipment Screen | TC-ASH-308 | Search Delivery Notes with no match | Inventory > Shipment > Add Shipment | Type a non-existing name in Search | ZZZ-9999 | No Delivery Notes are displayed | Low | Negative | - |
| 362 | 2. Add Shipment Screen | TC-ASH-309 | Filter Delivery Notes by Company | Inventory > Shipment > Add Shipment | Select a Company in the popup | Shamel Trading Co. | Only Delivery Notes of the selected Company are displayed | Medium | Positive | - |
| 363 | 2. Add Shipment Screen | TC-ASH-310 | Filter Delivery Notes by Customer | Inventory > Shipment > Add Shipment | Select a Customer in the popup | Al Noor Stores | Only Delivery Notes of the selected Customer are displayed | Medium | Positive | - |
| 364 | 2. Add Shipment Screen | TC-ASH-311 | Company and Customer filters are searchable dropdowns | Inventory > Shipment > Add Shipment | Type part of a name in each filter | Shamel / Al Noor | The lists are filtered while typing | Low | Positive | - |
| 365 | 2. Add Shipment Screen | TC-ASH-312 | Delivery Note name opens Delivery Note Details | Inventory > Shipment > Add Shipment | Click a Delivery Note name in the popup | DN-0001 | The user is redirected to the Delivery Note Details screen | Medium | Positive | - |
| 366 | 2. Add Shipment Screen | TC-ASH-313 | Get Items adds the selected Delivery Note to the table | Inventory > Shipment > Add Shipment | 1. Select one Delivery Note in the popup
2. Click Get Items | DN-0001 | The Delivery Note and its Packing Slips are added to the Delivery Note & Packing Slips table | High | Positive | - |
| 367 | 2. Add Shipment Screen | TC-ASH-314 | Get Items with multiple Delivery Notes | Inventory > Shipment > Add Shipment | 1. Select two Delivery Notes
2. Click Get Items | DN-0001, DN-0002 | Both Delivery Notes and their Packing Slips are added to the table | Medium | Positive | - |
| 368 | 2. Add Shipment Screen | TC-ASH-315 | Get Items for a Delivery Note without Packing Slips | Inventory > Shipment > Add Shipment | 1. Select a Submitted Delivery Note that has no Packing Slips
2. Click Get Items | DN-0005 | A message is displayed and nothing is added | High | Negative | Needs Clarification: The popup lists all Submitted notes, but the table accepts only notes with Packing Slips. Confirm the behavior. |
| 369 | 2. Add Shipment Screen | TC-ASH-316 | Click Get Items without selecting a Delivery Note | Inventory > Shipment > Add Shipment | 1. Do not select any Delivery Note
2. Click Get Items | - | A message is displayed asking the user to select a Delivery Note; nothing is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 370 | 2. Add Shipment Screen | TC-ASH-317 | Get Items for a Delivery Note already in the table | Inventory > Shipment > Add Shipment | 1. Add DN-0001 using Get Items
2. Add DN-0001 again | DN-0001 | The system prevents the duplicate or warns the user | Medium | Negative | Needs Clarification: SRS does not define duplicates. |
| 371 | 2. Add Shipment Screen | TC-ASH-318 | Get Items fills Qty, Gross Weight and weight totals | Inventory > Shipment > Add Shipment | 1. Get items from DN-0001 (slips with 4 Kg and 2 Kg) | DN-0001 | Qty and Gross Weight are filled for each row and Packing Slips Total Weight shows 6 | High | Positive | - |
| 372 | 2. Add Shipment Screen | TC-ASH-319 | Save a Shipment with valid data | Inventory > Shipment > Add Shipment | 1. Fill the Pickup From and Delivery To sections
2. Add a parcel
3. Add a Delivery Note row
4. Fill the Shipment Details
5. Click Save | Pickup From: Company Shamel Trading Co., Omar Khaled; Delivery To: Customer Al Noor Stores, Hala Mostafa; Parcel 1001 12.5 Kg; DN-0001; Value of Goods: 25000; Pickup Date: 2026-11-01; 09:00-17:00; Content: 10 boxes of mugs | The Shipment is saved (not submitted), added to the Shipment List with status Draft | High | Positive | - |
| 373 | 2. Add Shipment Screen | TC-ASH-320 | Save with only the mandatory fields | Inventory > Shipment > Add Shipment | 1. Fill only the mandatory fields
2. Click Save | Mandatory fields only | The Shipment is saved (all other fields are optional) | High | Positive | - |
| 374 | 2. Add Shipment Screen | TC-ASH-321 | Save with all mandatory fields empty | Inventory > Shipment > Add Shipment | 1. Clear the defaults where possible
2. Click Save | - | A validation error message is displayed for each mandatory field | High | Negative | - |
| 375 | 2. Add Shipment Screen | TC-ASH-322 | Save a Shipment with no parcels | Inventory > Shipment > Add Shipment | 1. Fill the other mandatory fields
2. Do not add parcels
3. Click Save | No parcels | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one parcel is required. |
| 376 | 2. Add Shipment Screen | TC-ASH-323 | Save a Shipment with no Delivery Note rows | Inventory > Shipment > Add Shipment | 1. Fill the other mandatory fields
2. Do not add Delivery Note rows
3. Click Save | No rows | To be confirmed with the BA (saved or blocked) | High | Negative | Needs Clarification: SRS does not say whether at least one Delivery Note is required. |
| 377 | 2. Add Shipment Screen | TC-ASH-324 | Saved data is displayed correctly when reopened | Inventory > Shipment > Add Shipment | 1. Save a valid Shipment
2. Open it from the list | SHIP-2026-0001 | All saved values (parties, parcels, Delivery Notes, details) are displayed correctly | High | Positive | - |
| 378 | 2. Add Shipment Screen | TC-ASH-325 | Submit button is displayed only after Save | Inventory > Shipment > Add Shipment | 1. Click Save on a valid Shipment
2. Review the buttons | - | The Submit button is displayed after saving | High | Positive | - |
| 379 | 2. Add Shipment Screen | TC-ASH-326 | Submit button is hidden before Save | Inventory > Shipment > Add Shipment | Review the buttons on a new unsaved Shipment | - | The Submit button is not displayed | Medium | Negative | - |
| 380 | 2. Add Shipment Screen | TC-ASH-327 | Submit a saved Shipment | Inventory > Shipment > Add Shipment | 1. Save a valid Shipment
2. Click Submit | Valid saved shipment | The Shipment is submitted and its status in the list is Submitted | High | Positive | - |
| 381 | 2. Add Shipment Screen | TC-ASH-328 | Submitted Shipment is read-only | Inventory > Shipment > Add Shipment | 1. Submit a Shipment
2. Try to edit any field | - | All fields are read-only | High | Negative | - |
| 382 | 2. Add Shipment Screen | TC-ASH-329 | Cancel button is displayed only for Submitted Shipments | Inventory > Shipment > Add Shipment | Open a Draft and a Submitted Shipment | - | Cancel is hidden for Draft and displayed for Submitted | High | Positive | - |
| 383 | 2. Add Shipment Screen | TC-ASH-330 | Cancel a Submitted Shipment | Inventory > Shipment > Add Shipment | 1. Open a Submitted Shipment
2. Click Cancel | - | The Shipment is cancelled successfully and its status changes to Cancelled | High | Positive | - |
| 384 | 2. Add Shipment Screen | TC-ASH-331 | Cancelled Shipment cannot be edited or re-submitted | Inventory > Shipment > Add Shipment | 1. Cancel a Shipment
2. Open it | - | Fields are read-only and no Submit action is available | Medium | Negative | - |
| 385 | 2. Add Shipment Screen | TC-ASH-332 | Submitting a Shipment links it to its Packing Slips and Delivery Notes | Inventory > Shipment > Add Shipment | 1. Submit a Shipment
2. Open the Delivery Note and Packing Slip | DN-0001; PS-2026-001 | The related documents show the link to the Shipment (e.g., in Connections) | Medium | Positive | Needs Clarification: SRS does not describe the effect on Delivery Note / Packing Slip. |
| 386 | 3. Shipment Details Screen | TC-SHD-001 | Open Shipment Details from the list | Logged in; at least one Shipment exists | 1. Click Inventory from the side menu
2. Click Shipment
3. Click a Shipment ID | SHIP-2026-0001 | The Shipment Details screen of the selected shipment is displayed | High | Positive | - |
| 387 | 3. Shipment Details Screen | TC-SHD-002 | Details display the data entered during creation | Inventory > Shipment > click a Shipment ID in the table | Open a shipment created with known data and compare the fields | Pickup: Shamel Trading Co.; Delivery: Al Noor Stores; Parcel 1001 12.5 Kg; DN-0001 | All data entered during creation is displayed correctly | High | Positive | - |
| 388 | 3. Shipment Details Screen | TC-SHD-003 | Draft: fields are displayed as input fields | Inventory > Shipment > click a Shipment ID in the table; a Draft shipment exists | Open a Draft Shipment | Status: Draft | Fields are displayed as editable input fields | High | Positive | - |
| 389 | 3. Shipment Details Screen | TC-SHD-004 | Draft: modify and save a Shipment | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Change Carrier and Value of Goods
3. Click Save | Carrier: Aramex Express | The changes are saved successfully and displayed after reopening the shipment | High | Positive | - |
| 390 | 3. Shipment Details Screen | TC-SHD-005 | Draft: change Pickup From party type | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Change Pickup From from Company to Customer
3. Select the Customer, Address and Contact
4. Click Save | Company > Customer | The Shipment is saved with the new party and the Company / Employee fields are cleared | High | Positive | - |
| 391 | 3. Shipment Details Screen | TC-SHD-006 | Draft: clear a mandatory field and save | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Clear Value of Goods
3. Click Save | - | An error message is displayed because Value of Goods is mandatory | High | Negative | - |
| 392 | 3. Shipment Details Screen | TC-SHD-007 | Draft: clear the Pickup Address and save | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Clear the pickup Address
3. Click Save | - | An error message is displayed because Address is mandatory | Medium | Negative | - |
| 393 | 3. Shipment Details Screen | TC-SHD-008 | Draft: clear the Delivery Contact and save | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Clear Delivery Contact
3. Click Save | - | An error message is displayed because Delivery Contact is mandatory | Medium | Negative | - |
| 394 | 3. Shipment Details Screen | TC-SHD-009 | Draft: clear Pickup Date and save | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Clear Pickup Date
3. Click Save | - | An error message is displayed because Pickup Date is mandatory | Medium | Negative | - |
| 395 | 3. Shipment Details Screen | TC-SHD-010 | Draft: clear Description of Content and save | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Clear Description of Content
3. Click Save | - | An error message is displayed because Description of Content is mandatory | Medium | Negative | - |
| 396 | 3. Shipment Details Screen | TC-SHD-011 | Draft: Description of Content with 1 character | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Enter 1 character in Description of Content
3. Click Save | a | An error message is displayed (minimum length is 2 characters) | Medium | Negative | - |
| 397 | 3. Shipment Details Screen | TC-SHD-012 | Draft: AWB Number rejects letters | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Type letters in AWB Number | abc | Letters are not accepted | Medium | Negative | - |
| 398 | 3. Shipment Details Screen | TC-SHD-013 | Draft: add a parcel | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Add a parcel row
3. Click Save | Parcel 1002; 7.5 Kg | The parcel is saved and Shipment Total Weight is updated | Medium | Positive | - |
| 399 | 3. Shipment Details Screen | TC-SHD-014 | Draft: delete a parcel | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Delete a parcel row
3. Click Save | - | The parcel is removed and Shipment Total Weight is updated | Medium | Positive | - |
| 400 | 3. Shipment Details Screen | TC-SHD-015 | Draft: add a Delivery Note using Get Items From Delivery Note | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Click Get Items From Delivery Note
3. Select a note and click Get Items | DN-0002 | The Delivery Note and its Packing Slips are added and Packing Slips Total Weight is updated | Medium | Positive | - |
| 401 | 3. Shipment Details Screen | TC-SHD-016 | Draft: delete a Delivery Note row | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Delete a Delivery Note row
3. Click Save | - | The row is removed and Packing Slips Total Weight is updated | Medium | Positive | - |
| 402 | 3. Shipment Details Screen | TC-SHD-017 | Draft: Shipment Total Weight smaller than Packing Slips Total Weight | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Draft shipment
2. Reduce a parcel weight below the packing slips total
3. Click Save | Parcels: 3; Slips: 6 | A validation error is displayed | High | Negative | - |
| 403 | 3. Shipment Details Screen | TC-SHD-018 | Draft: submit from Details | Inventory > Shipment > click a Shipment ID in the table | 1. Open a saved Draft shipment
2. Click Submit | Complete Draft shipment | The Shipment is submitted and its status becomes Submitted | High | Positive | - |
| 404 | 3. Shipment Details Screen | TC-SHD-019 | Submitted: fields are displayed as read-only labels | Inventory > Shipment > click a Shipment ID in the table; a Submitted shipment exists | Open a Submitted Shipment | Status: Submitted | All fields are displayed as read-only labels | High | Positive | - |
| 405 | 3. Shipment Details Screen | TC-SHD-020 | Submitted: fields cannot be edited | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Submitted shipment
2. Try to change any field | Status: Submitted | No field can be edited | High | Negative | - |
| 406 | 3. Shipment Details Screen | TC-SHD-021 | Submitted: tables are read-only | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Submitted shipment
2. Look for Add Row / Delete row | - | Rows cannot be added or deleted | High | Negative | - |
| 407 | 3. Shipment Details Screen | TC-SHD-022 | Submitted: Tracking Status and AWB Number can be updated | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Submitted shipment
2. Try to change Tracking Status and AWB Number | Tracking Status: Delivery | To be confirmed with the BA (read-only as written, or editable to follow the carrier) | High | Positive | Needs Clarification: SRS makes all fields read-only after submission, but Tracking Status is meant to receive carrier updates. |
| 408 | 3. Shipment Details Screen | TC-SHD-023 | Submitted: Cancel action is available | Inventory > Shipment > click a Shipment ID in the table | Open a Submitted shipment and review the page actions | Status: Submitted | The Cancel action is available | High | Positive | Needs Clarification: SRS describes Cancel in the Add screen but not in the Details page actions. |
| 409 | 3. Shipment Details Screen | TC-SHD-024 | Cancel a Submitted shipment from Details | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Submitted shipment
2. Click Cancel | - | The Shipment is cancelled and its status becomes Cancelled | High | Positive | - |
| 410 | 3. Shipment Details Screen | TC-SHD-025 | Cancelled: fields are displayed as read-only labels | Inventory > Shipment > click a Shipment ID in the table; a Cancelled shipment exists | Open a Cancelled Shipment | Status: Cancelled | All fields are displayed as read-only labels and cannot be edited | High | Positive | - |
| 411 | 3. Shipment Details Screen | TC-SHD-026 | Booked and Completed: field editability | Inventory > Shipment > click a Shipment ID in the table | Open a Booked and a Completed shipment | Status: Booked / Completed | To be confirmed with the BA (read-only or editable) | Medium | Positive | Needs Clarification: SRS defines editability only for Draft, Submitted and Cancelled. |
| 412 | 3. Shipment Details Screen | TC-SHD-027 | Status label matches the shipment state | Inventory > Shipment > click a Shipment ID in the table | Open shipments in each status and review the Status field | 5 shipments | The Status label shows the correct current status (read-only) | High | Positive | - |
| 413 | 3. Shipment Details Screen | TC-SHD-028 | Weight totals are displayed correctly | Inventory > Shipment > click a Shipment ID in the table | Open a shipment and compare Shipment Total Weight and Packing Slips Total Weight with the tables | 20 Kg / 6 Kg | Both totals match the sum of their table rows | High | Positive | - |
| 414 | 3. Shipment Details Screen | TC-SHD-029 | Previews are displayed for pickup, delivery and contacts | Inventory > Shipment > click a Shipment ID in the table | Open a shipment | - | The address and contact previews show the data of the selected records | Medium | Positive | - |
| 415 | 3. Shipment Details Screen | TC-SHD-030 | Fixed page actions are displayed at the top | Inventory > Shipment > click a Shipment ID in the table | Open any shipment and review the top of the page | - | The Assign, Attachment, Tags, Share, Print and Delete actions are displayed at the top | High | UI | - |
| 416 | 3. Shipment Details Screen | TC-SHD-031 | Fixed page actions remain visible for all statuses | Inventory > Shipment > click a Shipment ID in the table | Open shipments in each status | 5 shipments | The fixed page actions are displayed on all of them | Medium | UI | - |
| 417 | 3. Shipment Details Screen | TC-SHD-032 | Assign the shipment to a user | Inventory > Shipment > click a Shipment ID in the table | 1. Click Assign
2. Select a user
3. Confirm | User: Mona Samir | The shipment is assigned to the selected user and the assignment is displayed | Medium | Positive | Needs Clarification: SRS lists Assign without details. |
| 418 | 3. Shipment Details Screen | TC-SHD-033 | Add an attachment | Inventory > Shipment > click a Shipment ID in the table | 1. Click Attachment
2. Upload a file | airway-bill.pdf | The file is attached to the shipment and listed | Medium | Positive | Needs Clarification: Allowed file types and size limit are not defined. |
| 419 | 3. Shipment Details Screen | TC-SHD-034 | Remove an attachment | Inventory > Shipment > click a Shipment ID in the table | 1. Open a shipment with an attachment
2. Remove the attachment | airway-bill.pdf | The attachment is removed from the shipment | Low | Positive | - |
| 420 | 3. Shipment Details Screen | TC-SHD-035 | Add a tag | Inventory > Shipment > click a Shipment ID in the table | 1. Click Tags
2. Add a tag | Tag: Fragile | The tag is added to the shipment | Low | Positive | - |
| 421 | 3. Shipment Details Screen | TC-SHD-036 | Share the shipment with a user | Inventory > Shipment > click a Shipment ID in the table | 1. Click Share
2. Select a user and permission
3. Confirm | User: Mona Samir | The shipment is shared with the selected user | Medium | Positive | Needs Clarification: SRS lists Share without details. |
| 422 | 3. Shipment Details Screen | TC-SHD-037 | Print the shipment | Inventory > Shipment > click a Shipment ID in the table | 1. Click Print | - | The print view of the shipment is displayed and can be printed | Medium | Positive | - |
| 423 | 3. Shipment Details Screen | TC-SHD-038 | Delete confirmation message | Inventory > Shipment > click a Shipment ID in the table | 1. Open a shipment
2. Click Delete | - | A confirmation message asks the user whether they want to delete this shipment | High | Positive | - |
| 424 | 3. Shipment Details Screen | TC-SHD-039 | Cancel the delete confirmation | Inventory > Shipment > click a Shipment ID in the table | 1. Open a shipment
2. Click Delete
3. Click No (or close the message) | - | The shipment is not deleted | Medium | Negative | Needs Clarification: SRS describes only the Yes button. |
| 425 | 3. Shipment Details Screen | TC-SHD-040 | Delete a Draft shipment that has no links | Inventory > Shipment > click a Shipment ID in the table | 1. Open an unlinked Draft shipment
2. Click Delete
3. Click Yes | Unlinked Draft shipment | The shipment is deleted successfully | High | Positive | - |
| 426 | 3. Shipment Details Screen | TC-SHD-041 | Delete a Submitted shipment | Inventory > Shipment > click a Shipment ID in the table | 1. Open a Submitted shipment
2. Click Delete
3. Click Yes | Status: Submitted | To be confirmed with the BA (deletion allowed or blocked for Submitted shipments) | High | Negative | Needs Clarification: SRS does not restrict Delete by status. |
| 427 | 3. Shipment Details Screen | TC-SHD-042 | Delete a shipment linked to other transactions | Inventory > Shipment > click a Shipment ID in the table | 1. Open a linked shipment
2. Click Delete
3. Click Yes | Linked shipment | A message informs the user that the linked transactions must be deleted first, with the linked doctypes as hyperlinks | High | Negative | - |
| 428 | 3. Shipment Details Screen | TC-SHD-043 | Linked doctype hyperlinks open the corresponding doctype | Inventory > Shipment > click a Shipment ID in the table | 1. Trigger the delete message
2. Click a linked doctype | - | The user is redirected to the corresponding doctype | Medium | Positive | - |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Shipment List Screen |  |  |  |
| 2. Add Shipment Screen |  |  |  |
| 3. Shipment Details Screen |  |  |  |
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