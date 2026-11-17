<!-- converted from SHAMEL_DeliveryTrip_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Delivery Trip |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Delivery Trip) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Delivery Trip List Screen | TC-DTL-001 | Display the Delivery Trip list | Access via Inventory > Delivery Trip | 1. Click Inventory from the side menu
2. Click Delivery Trip | - | A table listing all Delivery Trips in the system is displayed | High | Positive | - |
| 2 | 1. Delivery Trip List Screen | TC-DTL-002 | Add Delivery Trip button is displayed | Access via Inventory > Delivery Trip | Verify that the Add Delivery Trip button is displayed on the list screen | - | The Add Delivery Trip button is visible and clickable | Medium | UI | - |
| 3 | 1. Delivery Trip List Screen | TC-DTL-003 | Navigate to the Add Delivery Trip screen | Access via Inventory > Delivery Trip | Click the Add Delivery Trip button | - | The user is redirected to the Add Delivery Trip screen | High | Positive | - |
| 4 | 1. Delivery Trip List Screen | TC-DTL-004 | Display checkbox column for row selection | Access via Inventory > Delivery Trip | Open the Delivery Trip list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Delivery Trip List Screen | TC-DTL-005 | Display Delivery Trip ID column | Access via Inventory > Delivery Trip | Open the Delivery Trip list | - | The Delivery Trip ID column is displayed for each row | Medium | UI | - |
| 6 | 1. Delivery Trip List Screen | TC-DTL-006 | Navigate to Delivery Trip Details by clicking the ID | Access via Inventory > Delivery Trip | Click a Delivery Trip ID in the table | Trip ID: DT-2026-00001 | The user is redirected to the Delivery Trip Details screen of the selected trip | High | Positive | - |
| 7 | 1. Delivery Trip List Screen | TC-DTL-007 | Display Status column with a valid status value | Access via Inventory > Delivery Trip | Open the Delivery Trip list and review the Status column | Trips in each status | Each row shows exactly one of: Draft, Scheduled, In Transit, Completed, Cancelled | High | Positive | - |
| 8 | 1. Delivery Trip List Screen | TC-DTL-008 | Display Driver Name column | Access via Inventory > Delivery Trip | Open the Delivery Trip list and review the Driver Name column | Driver: Ahmed Hassan | The name of the driver assigned to each trip is displayed | Medium | UI | - |
| 9 | 1. Delivery Trip List Screen | TC-DTL-009 | Display Departure Time column with date and time | Access via Inventory > Delivery Trip | Open the Delivery Trip list and review the Departure Time column | Departure: 2026-11-01 09:00 | Both the date and the time of departure are displayed for each trip | Medium | UI | - |
| 10 | 1. Delivery Trip List Screen | TC-DTL-010 | Action bar appears when one row is selected | Access via Inventory > Delivery Trip | Select the checkbox of one Delivery Trip | - | An action bar appears showing the available actions | High | Positive | - |
| 11 | 1. Delivery Trip List Screen | TC-DTL-011 | Action bar appears when multiple rows are selected | Access via Inventory > Delivery Trip | Select the checkboxes of three Delivery Trips | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 12 | 1. Delivery Trip List Screen | TC-DTL-012 | Action bar disappears when all rows are deselected | Access via Inventory > Delivery Trip | 1. Select one Delivery Trip
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 13 | 1. Delivery Trip List Screen | TC-DTL-013 | Action bar contains all required actions | Access via Inventory > Delivery Trip | Select a Delivery Trip and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete (Submit and Cancel are shown only by status) | Medium | UI | - |
| 14 | 1. Delivery Trip List Screen | TC-DTL-014 | Open the Edit popup | Access via Inventory > Delivery Trip | 1. Select a Delivery Trip
2. Click Edit | - | A popup is displayed containing the Field dropdown and the Value field | High | Positive | - |
| 15 | 1. Delivery Trip List Screen | TC-DTL-015 | Field dropdown is a single-selection list of editable fields | Access via Inventory > Delivery Trip | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the editable fields of the Delivery Trip and allows selecting only one option | Medium | Positive | - |
| 16 | 1. Delivery Trip List Screen | TC-DTL-016 | Click Update without selecting a Field | Access via Inventory > Delivery Trip | 1. Open the Edit popup
2. Leave Field empty
3. Click Update | - | An error message is displayed because the Field is mandatory | Medium | Negative | - |
| 17 | 1. Delivery Trip List Screen | TC-DTL-017 | Value input type changes dynamically based on the selected Field | Access via Inventory > Delivery Trip | 1. Open the Edit popup
2. Select Field = Driver and note the Value input type
3. Select Field = Departure Time and note the Value input type | Driver, Departure Time | The Value field changes its input type (link/dropdown for Driver, date-time picker for Departure Time) according to the selected field | High | Positive | - |
| 18 | 1. Delivery Trip List Screen | TC-DTL-018 | Value field is marked mandatory or optional according to the selected Field | Access via Inventory > Delivery Trip | 1. Open the Edit popup
2. Select a mandatory field (e.g., Vehicle)
3. Leave Value empty and click Update | Field: Vehicle | The Value field is flagged as mandatory and an error message is displayed | Medium | Negative | - |
| 19 | 1. Delivery Trip List Screen | TC-DTL-019 | Value field applies the validation rules of the selected Field | Access via Inventory > Delivery Trip | 1. Open the Edit popup
2. Select a Field that has validation rules
3. Enter an invalid value and click Update | Invalid value for the chosen field | A validation error message is displayed and the trip is not changed | Medium | Negative | - |
| 20 | 1. Delivery Trip List Screen | TC-DTL-020 | Update a Draft Delivery Trip successfully | Access via Inventory > Delivery Trip; a Draft trip exists | 1. Select a Draft Delivery Trip
2. Click Edit
3. Select Field = Vehicle
4. Select a new Vehicle as Value
5. Click Update | Status: Draft; Vehicle: ABC-1234 | The Delivery Trip is updated successfully and the new value is shown | High | Positive | - |
| 21 | 1. Delivery Trip List Screen | TC-DTL-021 | Update a Scheduled Delivery Trip | Access via Inventory > Delivery Trip; a Scheduled trip exists | 1. Select a Scheduled Delivery Trip
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Scheduled | An error message is displayed informing the user that the Delivery Trip cannot be modified | High | Negative | - |
| 22 | 1. Delivery Trip List Screen | TC-DTL-022 | Update a Completed Delivery Trip | Access via Inventory > Delivery Trip; a Completed trip exists | 1. Select a Completed Delivery Trip
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Completed | An error message is displayed informing the user that the Delivery Trip cannot be modified | High | Negative | - |
| 23 | 1. Delivery Trip List Screen | TC-DTL-023 | Update a Cancelled Delivery Trip | Access via Inventory > Delivery Trip; a Cancelled trip exists | 1. Select a Cancelled Delivery Trip
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: Cancelled | An error message is displayed informing the user that the Delivery Trip cannot be modified | High | Negative | - |
| 24 | 1. Delivery Trip List Screen | TC-DTL-024 | Update an In Transit Delivery Trip | Access via Inventory > Delivery Trip; an In Transit trip exists | 1. Select an In Transit Delivery Trip
2. Click Edit
3. Select a Field and a Value
4. Click Update | Status: In Transit | To be confirmed with the BA (SRS does not state the behavior for In Transit) | Medium | Negative | Needs Clarification: SRS lists only Scheduled, Completed and Cancelled as non-editable. Is In Transit editable? |
| 25 | 1. Delivery Trip List Screen | TC-DTL-025 | Edit with multiple Delivery Trips selected | Access via Inventory > Delivery Trip | 1. Select two Draft Delivery Trips
2. Click Edit
3. Select Field = Vehicle and a Value
4. Click Update | Two Draft trips | To be confirmed with the BA (bulk edit behavior) | Low | Positive | Needs Clarification: SRS does not say whether Edit supports multi-selection or how mixed statuses are handled. |
| 26 | 1. Delivery Trip List Screen | TC-DTL-026 | Submit action is displayed for a Draft Delivery Trip | Access via Inventory > Delivery Trip; a Draft trip exists | Select a Draft Delivery Trip and review the action bar | Status: Draft | The Submit action is displayed | High | Positive | - |
| 27 | 1. Delivery Trip List Screen | TC-DTL-027 | Submit action is hidden for a Scheduled Delivery Trip | Access via Inventory > Delivery Trip; a Scheduled trip exists | Select a Scheduled Delivery Trip and review the action bar | Status: Scheduled | The Submit action is not displayed | Medium | Negative | - |
| 28 | 1. Delivery Trip List Screen | TC-DTL-028 | Submit action is hidden for In Transit, Completed and Cancelled trips | Access via Inventory > Delivery Trip | Select one trip of each status (In Transit, Completed, Cancelled) and review the action bar | Status: In Transit / Completed / Cancelled | The Submit action is not displayed for any of them | Medium | Negative | - |
| 29 | 1. Delivery Trip List Screen | TC-DTL-029 | Submit a Draft Delivery Trip with complete and valid data | Access via Inventory > Delivery Trip; a complete Draft trip exists | 1. Select a Draft Delivery Trip with all required data
2. Click Submit | Complete Draft trip | The Delivery Trip is submitted successfully and its Status changes to Scheduled | High | Positive | - |
| 30 | 1. Delivery Trip List Screen | TC-DTL-030 | Submit a Draft Delivery Trip with incomplete data | Access via Inventory > Delivery Trip | 1. Select a Draft Delivery Trip with a missing mandatory value
2. Click Submit | Draft trip without Vehicle | The trip is not submitted, a validation error is displayed and the Status stays Draft | High | Negative | Needs Clarification: SRS describes only the success case. The error message text and behavior are not defined. |
| 31 | 1. Delivery Trip List Screen | TC-DTL-031 | Submit multiple Draft Delivery Trips at once | Access via Inventory > Delivery Trip | 1. Select two complete Draft trips
2. Click Submit | Two Draft trips | To be confirmed with the BA (bulk submit behavior) | Low | Positive | Needs Clarification: SRS does not define bulk submit. |
| 32 | 1. Delivery Trip List Screen | TC-DTL-032 | Cancel action is displayed for a Scheduled Delivery Trip | Access via Inventory > Delivery Trip; a Scheduled trip exists | Select a Scheduled Delivery Trip and review the action bar | Status: Scheduled | The Cancel action is displayed | High | Positive | - |
| 33 | 1. Delivery Trip List Screen | TC-DTL-033 | Cancel action is hidden for a Draft Delivery Trip | Access via Inventory > Delivery Trip | Select a Draft Delivery Trip and review the action bar | Status: Draft | The Cancel action is not displayed | Medium | Negative | - |
| 34 | 1. Delivery Trip List Screen | TC-DTL-034 | Cancel action is hidden for In Transit and Completed trips | Access via Inventory > Delivery Trip | Select an In Transit trip and a Completed trip and review the action bar | Status: In Transit / Completed | The Cancel action is not displayed | Medium | Negative | Needs Clarification: SRS says Cancel appears only for Scheduled; confirm that In Transit trips cannot be cancelled. |
| 35 | 1. Delivery Trip List Screen | TC-DTL-035 | Cancel a Scheduled Delivery Trip | Access via Inventory > Delivery Trip; a Scheduled trip exists | 1. Select a Scheduled Delivery Trip
2. Click Cancel | Status: Scheduled | The Delivery Trip is cancelled successfully and its Status changes to Cancelled | High | Positive | - |
| 36 | 1. Delivery Trip List Screen | TC-DTL-036 | Cancel button changes to Amend after cancellation | Access via Inventory > Delivery Trip | 1. Select a Scheduled Delivery Trip
2. Click Cancel
3. Review the action bar | Status: Scheduled | The Cancel button is replaced by the Amend button | High | Positive | - |
| 37 | 1. Delivery Trip List Screen | TC-DTL-037 | Confirmation message is displayed when clicking Delete | Access via Inventory > Delivery Trip | 1. Select a Delivery Trip
2. Click Delete | - | A confirmation message asks the user whether they want to delete this Delivery Trip | High | Positive | - |
| 38 | 1. Delivery Trip List Screen | TC-DTL-038 | Cancel the delete confirmation | Access via Inventory > Delivery Trip | 1. Select a Delivery Trip
2. Click Delete
3. Click No (or close the message) | - | The Delivery Trip is not deleted and remains in the list | Medium | Negative | Needs Clarification: SRS describes only the Yes button. Confirm the No/close behavior. |
| 39 | 1. Delivery Trip List Screen | TC-DTL-039 | Delete a Delivery Trip that has no links | Access via Inventory > Delivery Trip | 1. Select an unlinked Delivery Trip
2. Click Delete
3. Click Yes | Unlinked trip | The Delivery Trip is deleted successfully and removed from the list | High | Positive | - |
| 40 | 1. Delivery Trip List Screen | TC-DTL-040 | Delete a Delivery Trip that was amended from another trip | Access via Inventory > Delivery Trip | 1. Select a trip that has Amended From populated
2. Click Delete
3. Click Yes | Amended trip: DT-2026-00005-1 | A warning message is displayed: the trip cannot be deleted until all related doctypes are deleted. The trip is not deleted | High | Negative | - |
| 41 | 1. Delivery Trip List Screen | TC-DTL-041 | Linked doctypes in the amended-trip warning are hyperlinks | Access via Inventory > Delivery Trip | 1. Trigger the delete warning for an amended trip
2. Click a linked doctype in the warning message | Amended trip | Linked doctypes are shown as hyperlinks and the user is redirected to the corresponding doctype | Medium | Positive | - |
| 42 | 1. Delivery Trip List Screen | TC-DTL-042 | Delete a Delivery Trip linked to other transactions | Access via Inventory > Delivery Trip | 1. Select a trip linked to other transactions (e.g., Delivery Note)
2. Click Delete
3. Click Yes | Trip linked to DN-0001 | A message informs the user that the linked transactions must be deleted first. The trip is not deleted | High | Negative | - |
| 43 | 1. Delivery Trip List Screen | TC-DTL-043 | Linked transactions in the delete message are hyperlinks | Access via Inventory > Delivery Trip | 1. Trigger the delete message for a linked trip
2. Click a linked transaction in the message | Trip linked to DN-0001 | Linked transactions are shown as hyperlinks and the user is redirected to the corresponding doctype | Medium | Positive | - |
| 44 | 1. Delivery Trip List Screen | TC-DTL-044 | Delete multiple Delivery Trips at once | Access via Inventory > Delivery Trip | 1. Select two unlinked trips
2. Click Delete
3. Click Yes | Two unlinked trips | To be confirmed with the BA (bulk delete behavior) | Low | Positive | Needs Clarification: SRS does not define behavior when selected trips are a mix of linked and unlinked. |
| 45 | 1. Delivery Trip List Screen | TC-DTL-045 | Export selected Delivery Trips | Access via Inventory > Delivery Trip | 1. Select one or more Delivery Trips
2. Click Export | - | The selected Delivery Trips are exported | Medium | Positive | Needs Clarification: SRS lists Export without details (file format, exported fields). |
| 46 | 1. Delivery Trip List Screen | TC-DTL-046 | Assign selected Delivery Trips to a user | Access via Inventory > Delivery Trip | 1. Select a Delivery Trip
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The Delivery Trip is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 47 | 1. Delivery Trip List Screen | TC-DTL-047 | Clear assignment of a Delivery Trip | Access via Inventory > Delivery Trip | 1. Select an assigned Delivery Trip
2. Click Clear assignment | Assigned trip | The assignment is cleared from the Delivery Trip | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 48 | 1. Delivery Trip List Screen | TC-DTL-048 | Add tags to a Delivery Trip | Access via Inventory > Delivery Trip | 1. Select a Delivery Trip
2. Click Add tags
3. Enter a tag and confirm | Tag: Urgent | The tag is added to the Delivery Trip | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 49 | 1. Delivery Trip List Screen | TC-DTL-049 | Print selected Delivery Trips | Access via Inventory > Delivery Trip | 1. Select a Delivery Trip
2. Click Print | - | The print view of the Delivery Trip is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 50 | 1. Delivery Trip List Screen | TC-DTL-050 | Delivery Trip list when there are no trips | Access via Inventory > Delivery Trip | Open the Delivery Trip list in a system with no trips | No trips | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. Expected behavior is a standard assumption. |
| 51 | 1. Delivery Trip List Screen | TC-DTL-051 | User without permission cannot access Delivery Trip | Access via Inventory > Delivery Trip | 1. Log in with a user that has no permission for Delivery Trip
2. Open the sidebar | Restricted user | The Delivery Trip menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 52 | 2. Add Delivery Trip Screen | TC-ADT-001 | Open the Add Delivery Trip screen | Logged in with a user that has Delivery Trip access | 1. Click Inventory from the side menu
2. Click Delivery Trip
3. Click Add Delivery Trip | - | The Add Delivery Trip screen is displayed with an empty form | High | Positive | - |
| 53 | 2. Add Delivery Trip Screen | TC-ADT-002 | Series dropdown lists the configured naming series | Inventory > Delivery Trip > Add Delivery Trip | Open the Series dropdown | - | All naming series configured or previously used in the system are listed | High | Positive | - |
| 54 | 2. Add Delivery Trip Screen | TC-ADT-003 | Select a Series | Inventory > Delivery Trip > Add Delivery Trip | Select a Series from the dropdown | Series: DT-.YYYY.- | The value is accepted | High | Positive | - |
| 55 | 2. Add Delivery Trip Screen | TC-ADT-004 | Leave Series empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave Series empty
2. Fill all other mandatory fields
3. Click Save | - | An error message is displayed because Series is mandatory | High | Negative | - |
| 56 | 2. Add Delivery Trip Screen | TC-ADT-005 | Series accepts a single selection only | Inventory > Delivery Trip > Add Delivery Trip | Select one Series, then select another one | DT-.YYYY.-, DT-.MM.- | Only one Series can be selected; the second selection replaces the first | Low | Positive | - |
| 57 | 2. Add Delivery Trip Screen | TC-ADT-006 | Company is a searchable dropdown | Inventory > Delivery Trip > Add Delivery Trip | Click the Company field and type part of a company name | Shamel | The list is filtered while typing (autocomplete) and shows matching companies | High | Positive | - |
| 58 | 2. Add Delivery Trip Screen | TC-ADT-007 | Select a Company | Inventory > Delivery Trip > Add Delivery Trip | Search for and select a Company | Shamel Trading Co. | The value is accepted | High | Positive | - |
| 59 | 2. Add Delivery Trip Screen | TC-ADT-008 | Company search with no matching result | Inventory > Delivery Trip > Add Delivery Trip | Type a name that does not exist in the Company field | ZZZ Unknown Co | No results are displayed and no value can be selected | Low | Negative | - |
| 60 | 2. Add Delivery Trip Screen | TC-ADT-009 | Leave Company empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave Company empty
2. Fill all other mandatory fields
3. Click Save | - | An error message is displayed because Company is mandatory | High | Negative | - |
| 61 | 2. Add Delivery Trip Screen | TC-ADT-010 | Company accepts a single selection only | Inventory > Delivery Trip > Add Delivery Trip | Select a Company and then select a different one | Two companies | Only one Company can be selected | Low | Positive | - |
| 62 | 2. Add Delivery Trip Screen | TC-ADT-011 | Driver is a searchable dropdown | Inventory > Delivery Trip > Add Delivery Trip | Click the Driver field and type part of a driver name | Ahmed | The list is filtered while typing and shows matching drivers | High | Positive | - |
| 63 | 2. Add Delivery Trip Screen | TC-ADT-012 | Select a Driver and auto-populate driver details | Inventory > Delivery Trip > Add Delivery Trip | Search for and select a Driver | Driver: Ahmed Hassan | Driver Name, Driver Email and Driver Address are populated automatically from the driver record | High | Positive | - |
| 64 | 2. Add Delivery Trip Screen | TC-ADT-013 | Leave Driver empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave Driver empty
2. Fill all other mandatory fields
3. Click Save | - | An error message is displayed because Driver is mandatory | High | Negative | - |
| 65 | 2. Add Delivery Trip Screen | TC-ADT-014 | Select a Driver that has no email or address | Inventory > Delivery Trip > Add Delivery Trip | Select a Driver whose record has no email and no address | Driver: Karim Adel (no email/address) | The Driver is accepted and Driver Email / Driver Address are left empty without errors | Medium | Positive | - |
| 66 | 2. Add Delivery Trip Screen | TC-ADT-015 | Driver details refresh when the Driver is changed | Inventory > Delivery Trip > Add Delivery Trip | 1. Select Driver A
2. Change the selection to Driver B | Ahmed Hassan, Karim Adel | Driver Name, Email and Address are replaced with Driver B details | Medium | Positive | - |
| 67 | 2. Add Delivery Trip Screen | TC-ADT-016 | Driver Name is a read-only label | Inventory > Delivery Trip > Add Delivery Trip | Select a Driver and try to edit the Driver Name | - | Driver Name displays the driver name and cannot be edited | Medium | UI | - |
| 68 | 2. Add Delivery Trip Screen | TC-ADT-017 | Driver Email is a read-only label | Inventory > Delivery Trip > Add Delivery Trip | Select a Driver and try to edit the Driver Email | - | Driver Email displays the driver email and cannot be edited | Medium | UI | - |
| 69 | 2. Add Delivery Trip Screen | TC-ADT-018 | Select a Driver Address | Inventory > Delivery Trip > Add Delivery Trip | Click Driver Address and select an address | Ahmed Hassan-Home | The address is accepted (searchable dropdown) | Medium | Positive | - |
| 70 | 2. Add Delivery Trip Screen | TC-ADT-019 | Leave Driver Address empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Fill all mandatory fields
2. Leave Driver Address empty
3. Click Save | - | The Delivery Trip is saved successfully (field is optional) | Medium | Positive | - |
| 71 | 2. Add Delivery Trip Screen | TC-ADT-020 | Edit the Driver Address | Inventory > Delivery Trip > Add Delivery Trip | Select a Driver Address and use the edit option on the field | - | The address can be edited and the updated address is shown | Low | Positive | Needs Clarification: SRS says the address can be edited but does not explain how (edit link or popup). |
| 72 | 2. Add Delivery Trip Screen | TC-ADT-021 | Total Estimated Distance is not displayed before saving | Inventory > Delivery Trip > Add Delivery Trip | Open the Add screen and review the form before saving | - | Total Estimated Distance is not displayed | Medium | UI | - |
| 73 | 2. Add Delivery Trip Screen | TC-ADT-022 | Total Estimated Distance is displayed after saving as read-only | Inventory > Delivery Trip > Add Delivery Trip | 1. Fill mandatory fields and add stops
2. Click Save
3. Review the Total Estimated Distance field | - | Total Estimated Distance is displayed as a read-only label with the estimated total distance | Medium | Positive | - |
| 74 | 2. Add Delivery Trip Screen | TC-ADT-023 | Distance UOM is a read-only label | Inventory > Delivery Trip > Add Delivery Trip | Review the Distance UOM field after saving | - | Distance UOM displays the unit used for the distance (e.g., Km) and cannot be edited | Medium | UI | - |
| 75 | 2. Add Delivery Trip Screen | TC-ADT-024 | Vehicle is a searchable dropdown | Inventory > Delivery Trip > Add Delivery Trip | Click the Vehicle field and type part of a vehicle name | ABC | The list is filtered while typing and shows matching vehicles | High | Positive | - |
| 76 | 2. Add Delivery Trip Screen | TC-ADT-025 | Select a Vehicle | Inventory > Delivery Trip > Add Delivery Trip | Search for and select a Vehicle | ABC-1234 | The value is accepted | High | Positive | - |
| 77 | 2. Add Delivery Trip Screen | TC-ADT-026 | Leave Vehicle empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave Vehicle empty
2. Fill all other mandatory fields
3. Click Save | - | An error message is displayed because Vehicle is mandatory | High | Negative | - |
| 78 | 2. Add Delivery Trip Screen | TC-ADT-027 | Vehicle search with no matching result | Inventory > Delivery Trip > Add Delivery Trip | Type a non-existing vehicle in the Vehicle field | ZZZ-0000 | No results are displayed and no value can be selected | Low | Negative | - |
| 79 | 2. Add Delivery Trip Screen | TC-ADT-028 | Select a Departure Time using the date-time picker | Inventory > Delivery Trip > Add Delivery Trip | Click Departure Time and select a date and time | 2026-11-01 09:00 | The selected date and time are accepted and displayed | High | Positive | - |
| 80 | 2. Add Delivery Trip Screen | TC-ADT-029 | Leave Departure Time empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave Departure Time empty
2. Fill all other mandatory fields
3. Click Save | - | An error message is displayed because Departure Time is mandatory | High | Negative | - |
| 81 | 2. Add Delivery Trip Screen | TC-ADT-030 | Select a Departure Time in the past | Inventory > Delivery Trip > Add Delivery Trip | 1. Select a date and time earlier than the current date-time
2. Click Save | 2025-01-01 09:00 | To be confirmed with the BA (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not say whether a past Departure Time is allowed. |
| 82 | 2. Add Delivery Trip Screen | TC-ADT-031 | Employee is a read-only label | Inventory > Delivery Trip > Add Delivery Trip | Review the Employee field | Driver linked to an employee | Employee displays the employee associated with the trip (if applicable) and cannot be edited | Low | UI | Needs Clarification: SRS does not say how the Employee is derived (from Driver?). Confirm the source. |
| 83 | 2. Add Delivery Trip Screen | TC-ADT-032 | Delivery Stops table displays the default columns | Inventory > Delivery Trip > Add Delivery Trip | Open the Add screen and review the Delivery Stops table | - | The table shows: Checkbox, No., Customer, Address Name, Locked, Delivery Note, Estimated Arrive | Medium | UI | - |
| 84 | 2. Add Delivery Trip Screen | TC-ADT-033 | Add Row adds a new stop | Inventory > Delivery Trip > Add Delivery Trip | Click Add Row in the Delivery Stops table | - | A new empty row is added to the table | High | Positive | - |
| 85 | 2. Add Delivery Trip Screen | TC-ADT-034 | Rows are numbered in order | Inventory > Delivery Trip > Add Delivery Trip | Add three rows | 3 rows | The No. column shows 1, 2, 3 in order | Medium | UI | - |
| 86 | 2. Add Delivery Trip Screen | TC-ADT-035 | Customer is a searchable dropdown | Inventory > Delivery Trip > Add Delivery Trip | Click Customer in a stop row and type part of a customer name | Al Noor | The list is filtered while typing and shows matching customers | High | Positive | - |
| 87 | 2. Add Delivery Trip Screen | TC-ADT-036 | Selecting a Customer auto-fills Address Name | Inventory > Delivery Trip > Add Delivery Trip | Select a Customer that has an address | Customer: Al Noor Stores | The Address Name field is filled automatically with the customer address | High | Positive | - |
| 88 | 2. Add Delivery Trip Screen | TC-ADT-037 | Select a Customer that has no address | Inventory > Delivery Trip > Add Delivery Trip | Select a Customer with no address on file | Customer: Nile Mart (no address) | No address is filled and Address Name stays empty for the user to select | Medium | Positive | - |
| 89 | 2. Add Delivery Trip Screen | TC-ADT-038 | Leave Customer empty and select an Address Name | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave Customer empty
2. Select an Address Name
3. Click Save | Address: Warehouse-Main | The stop is accepted because Customer is optional | Medium | Positive | Needs Clarification: Customer is optional but Address Name is mandatory. Confirm the intended business case for a stop without a customer. |
| 90 | 2. Add Delivery Trip Screen | TC-ADT-039 | Address Name is a searchable dropdown | Inventory > Delivery Trip > Add Delivery Trip | Click Address Name and type part of an address name | Al Noor | The list is filtered while typing and shows matching addresses | Medium | Positive | - |
| 91 | 2. Add Delivery Trip Screen | TC-ADT-040 | Leave Address Name empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Add a stop row
2. Leave Address Name empty
3. Click Save | - | An error message is displayed because Address Name is mandatory | High | Negative | - |
| 92 | 2. Add Delivery Trip Screen | TC-ADT-041 | Check the Locked checkbox | Inventory > Delivery Trip > Add Delivery Trip | Check Locked in a stop row | - | The Locked checkbox is checked for that stop | Medium | Positive | - |
| 93 | 2. Add Delivery Trip Screen | TC-ADT-042 | Locked checkbox is unchecked by default | Inventory > Delivery Trip > Add Delivery Trip | Add a new stop row and review Locked | - | Locked is unchecked by default | Low | UI | - |
| 94 | 2. Add Delivery Trip Screen | TC-ADT-043 | Delivery Note column is a read-only label | Inventory > Delivery Trip > Add Delivery Trip | Add a stop from a Delivery Note and review the Delivery Note column | DN-0001 | The Delivery Note of the stop is displayed and cannot be edited | Medium | UI | - |
| 95 | 2. Add Delivery Trip Screen | TC-ADT-044 | Select an Estimated Arrive date-time | Inventory > Delivery Trip > Add Delivery Trip | Click Estimated Arrive in a stop row and select a date and time | 2026-11-01 11:30 | The value is accepted | Medium | Positive | - |
| 96 | 2. Add Delivery Trip Screen | TC-ADT-045 | Leave Estimated Arrive empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Fill all mandatory fields
2. Leave Estimated Arrive empty
3. Click Save | - | The Delivery Trip is saved successfully (field is optional) | Medium | Positive | - |
| 97 | 2. Add Delivery Trip Screen | TC-ADT-046 | Action bar appears when a stop row is selected | Inventory > Delivery Trip > Add Delivery Trip | Select the checkbox of a stop row | - | An action bar appears with the Delete row action | Medium | Positive | - |
| 98 | 2. Add Delivery Trip Screen | TC-ADT-047 | Delete a single stop row | Inventory > Delivery Trip > Add Delivery Trip | 1. Select one stop row
2. Click Delete row | - | The selected row is deleted and the numbering is updated | High | Positive | - |
| 99 | 2. Add Delivery Trip Screen | TC-ADT-048 | Delete multiple stop rows | Inventory > Delivery Trip > Add Delivery Trip | 1. Select two stop rows
2. Click Delete row | - | Both selected rows are deleted | Medium | Positive | - |
| 100 | 2. Add Delivery Trip Screen | TC-ADT-049 | Open the Edit Row popup | Inventory > Delivery Trip > Add Delivery Trip | Click the Edit Row icon of a stop | - | A popup is displayed with the stop fields | High | Positive | - |
| 101 | 2. Add Delivery Trip Screen | TC-ADT-050 | Edit Row popup displays the visible fields | Inventory > Delivery Trip > Add Delivery Trip | Open the Edit Row popup and review the fields | - | Visible: Customer, Address Name, Locked, Customer Address, Delivery Note, Grand Total, Contact Name, Distance, UOM, Estimated Arrival, Details. Hidden: Latitude, Longitude, Customer Contact | Medium | UI | Needs Clarification: SRS marks Email sent to as read-only (and Customer Contact as hidden). Confirm whether Email sent to is visible. |
| 102 | 2. Add Delivery Trip Screen | TC-ADT-051 | Customer Address shows Address Line 1, City and Country | Inventory > Delivery Trip > Add Delivery Trip | 1. Open the Edit Row popup
2. Select an Address Name | Al Noor Stores-Billing | Customer Address (read-only) displays Address Line 1, City and Country of the selected address | High | Positive | - |
| 103 | 2. Add Delivery Trip Screen | TC-ADT-052 | Customer Address refreshes when Address Name changes | Inventory > Delivery Trip > Add Delivery Trip | 1. Open the Edit Row popup
2. Select Address A
3. Select Address B | Two addresses | Customer Address is replaced with the details of Address B | Medium | Positive | - |
| 104 | 2. Add Delivery Trip Screen | TC-ADT-053 | Visited checkbox is not displayed before Submit | Inventory > Delivery Trip > Add Delivery Trip | Open the Edit Row popup in a Draft/new trip | - | The Visited checkbox is not displayed | High | UI | - |
| 105 | 2. Add Delivery Trip Screen | TC-ADT-054 | Contact Name is a searchable dropdown | Inventory > Delivery Trip > Add Delivery Trip | Open Edit Row and type part of a contact name in Contact Name | Omar | The list is filtered while typing and the selected contact is accepted (optional field) | Medium | Positive | - |
| 106 | 2. Add Delivery Trip Screen | TC-ADT-055 | Grand Total in Edit Row is read-only | Inventory > Delivery Trip > Add Delivery Trip | Open Edit Row for a stop that has a Delivery Note and try to edit Grand Total | - | Grand Total is displayed as a label and cannot be edited | Medium | UI | - |
| 107 | 2. Add Delivery Trip Screen | TC-ADT-056 | Grand Total is calculated from the Delivery Notes | Inventory > Delivery Trip > Add Delivery Trip | 1. Add two Delivery Notes of different values
2. Open the trip and review Grand Total | DN-0001 = 1,000.00; DN-0002 = 500.00 | Grand Total equals the sum of the Grand Totals of the Delivery Notes | High | Positive | Needs Clarification: SRS defines Grand Total as the total of all Delivery Notes in the trip, but it appears per stop. Confirm whether it is per stop or per trip. |
| 108 | 2. Add Delivery Trip Screen | TC-ADT-057 | Distance and UOM labels in Edit Row | Inventory > Delivery Trip > Add Delivery Trip | Open Edit Row and review Distance and UOM | - | Distance and UOM are displayed as labels for the stop | Low | UI | - |
| 109 | 2. Add Delivery Trip Screen | TC-ADT-058 | Edit Row: Address Name is mandatory | Inventory > Delivery Trip > Add Delivery Trip | 1. Open Edit Row
2. Clear Address Name
3. Click Update | - | An error message is displayed because Address Name is mandatory | Medium | Negative | - |
| 110 | 2. Add Delivery Trip Screen | TC-ADT-059 | Edit Row: save changes with Update | Inventory > Delivery Trip > Add Delivery Trip | 1. Open Edit Row
2. Change Customer and Address Name
3. Click Update | Customer: Nile Mart | The popup closes and the changes are reflected in the stop row | High | Positive | - |
| 111 | 2. Add Delivery Trip Screen | TC-ADT-060 | Details accepts valid text | Inventory > Delivery Trip > Add Delivery Trip | Enter valid text in the Details field of Edit Row | Call the customer before arrival #12 | The value is accepted | Medium | Positive | - |
| 112 | 2. Add Delivery Trip Screen | TC-ADT-061 | Leave Details empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave Details empty
2. Click Update | - | The row is saved successfully (field is optional) | Low | Positive | - |
| 113 | 2. Add Delivery Trip Screen | TC-ADT-062 | Details shorter than the minimum length (2 characters) | Inventory > Delivery Trip > Add Delivery Trip | 1. Enter 2 characters in Details
2. Click Update | ab | An error message is displayed because the minimum length is 3 characters | Medium | Negative | - |
| 114 | 2. Add Delivery Trip Screen | TC-ADT-063 | Details at the minimum length (3 characters) | Inventory > Delivery Trip > Add Delivery Trip | 1. Enter 3 characters in Details
2. Click Update | abc | The value is accepted | Medium | Positive | - |
| 115 | 2. Add Delivery Trip Screen | TC-ADT-064 | Details at the maximum length (500 characters) | Inventory > Delivery Trip > Add Delivery Trip | Enter exactly 500 characters in Details | 500-character text | The value is accepted | Medium | Positive | - |
| 116 | 2. Add Delivery Trip Screen | TC-ADT-065 | Details longer than 500 characters | Inventory > Delivery Trip > Add Delivery Trip | Try to enter or paste 501 characters in Details | 501-character text | Input stops at 500 characters; extra characters are prevented | Medium | Negative | - |
| 117 | 2. Add Delivery Trip Screen | TC-ADT-066 | Details accepts letters, numbers and special characters | Inventory > Delivery Trip > Add Delivery Trip | Enter a mix of letters, numbers and special characters in Details | Gate 3 - Floor #2 (urgent) @9am | The value is accepted | Medium | Positive | - |
| 118 | 2. Add Delivery Trip Screen | TC-ADT-067 | Details rejects invalid data | Inventory > Delivery Trip > Add Delivery Trip | 1. Enter invalid content such as script tags
2. Click Update | <script>alert(1)</script> | An error message is displayed and the value is not saved | Medium | Negative | - |
| 119 | 2. Add Delivery Trip Screen | TC-ADT-068 | Open the table Settings popup | Inventory > Delivery Trip > Add Delivery Trip | Click Settings on the Delivery Stops table | - | A popup is displayed with column reordering, column width and Add/Remove Columns options | Medium | Positive | - |
| 120 | 2. Add Delivery Trip Screen | TC-ADT-069 | Reorder columns using drag and drop | Inventory > Delivery Trip > Add Delivery Trip | 1. Open Settings
2. Drag the Customer column header and drop it after Address Name | - | The column order changes to the new position | Medium | Positive | - |
| 121 | 2. Add Delivery Trip Screen | TC-ADT-070 | Column width default value is 3 | Inventory > Delivery Trip > Add Delivery Trip | Open Settings and review the Column width field | - | The default value is 3 | Medium | UI | - |
| 122 | 2. Add Delivery Trip Screen | TC-ADT-071 | Column width accepts numbers only | Inventory > Delivery Trip > Add Delivery Trip | 1. Open Settings
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 123 | 2. Add Delivery Trip Screen | TC-ADT-072 | Column width left empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Open Settings
2. Clear Column width
3. Click Update | - | An error message is displayed (minimum length is 1) | Medium | Negative | - |
| 124 | 2. Add Delivery Trip Screen | TC-ADT-073 | Column width with 1 character | Inventory > Delivery Trip > Add Delivery Trip | 1. Open Settings
2. Enter 1 digit as Column width
3. Click Update | 5 | The value is accepted and the column width changes | Low | Positive | - |
| 125 | 2. Add Delivery Trip Screen | TC-ADT-074 | Column width longer than 3 characters | Inventory > Delivery Trip > Add Delivery Trip | Try to enter 4 digits in Column width | 1000 | Input stops at 3 characters | Low | Negative | - |
| 126 | 2. Add Delivery Trip Screen | TC-ADT-075 | Add / Remove Columns popup lists all columns | Inventory > Delivery Trip > Add Delivery Trip | Click Add / Remove Columns | - | A popup lists all columns with checkboxes: Customer, Address Name, Locked, Delivery Note, Estimated Arrival, Customer Address, Visited, Grand Total, Contact Name, Email sent to, Customer Contact, Distance, UOM, Details | Medium | UI | - |
| 127 | 2. Add Delivery Trip Screen | TC-ADT-076 | Hide a column | Inventory > Delivery Trip > Add Delivery Trip | 1. Open Add / Remove Columns
2. Clear the Locked checkbox
3. Click Update | Column: Locked | The Locked column is hidden from the table | Medium | Positive | - |
| 128 | 2. Add Delivery Trip Screen | TC-ADT-077 | Show a hidden column | Inventory > Delivery Trip > Add Delivery Trip | 1. Hide the Locked column
2. Open Add / Remove Columns
3. Select the Locked checkbox
4. Click Update | Column: Locked | The Locked column is displayed again | Medium | Positive | - |
| 129 | 2. Add Delivery Trip Screen | TC-ADT-078 | Save the Settings using Update | Inventory > Delivery Trip > Add Delivery Trip | 1. Change column order, width and visibility
2. Click Update | - | All modifications are saved and applied to the table | High | Positive | - |
| 130 | 2. Add Delivery Trip Screen | TC-ADT-079 | Reset Settings to default | Inventory > Delivery Trip > Add Delivery Trip | 1. Change column order, width and visibility
2. Click Reset to default | - | All modifications return to their default values (width = 3, default columns and order) | Medium | Positive | - |
| 131 | 2. Add Delivery Trip Screen | TC-ADT-080 | Calculate Estimated Arrival Times | Inventory > Delivery Trip > Add Delivery Trip | 1. Add three stops with valid addresses
2. Click Calculate Estimated Arrival Times | 3 stops with addresses | Estimated Arrive is populated for each stop based on the travel time between consecutive stops (Google Maps Directions API) | High | Positive | - |
| 132 | 2. Add Delivery Trip Screen | TC-ADT-081 | Calculate Estimated Arrival Times when the Google Maps service is unavailable | Inventory > Delivery Trip > Add Delivery Trip | 1. Make the Google Maps Directions API unavailable (e.g., invalid key)
2. Click Calculate Estimated Arrival Times | Invalid API key | A clear error message is displayed and Estimated Arrive values are not changed | Medium | Negative | Needs Clarification: Error handling is not defined in the SRS. |
| 133 | 2. Add Delivery Trip Screen | TC-ADT-082 | Calculate Estimated Arrival Times with no stops | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave the Delivery Stops table empty
2. Click Calculate Estimated Arrival Times | No stops | A message is displayed and nothing is calculated | Medium | Negative | Needs Clarification: SRS does not define behavior for an empty table or a single stop. |
| 134 | 2. Add Delivery Trip Screen | TC-ADT-083 | Calculate Estimated Arrival Times for a stop without a valid location | Inventory > Delivery Trip > Add Delivery Trip | 1. Add a stop whose address has no location data
2. Click Calculate Estimated Arrival Times | Address without city/country | A clear error message is displayed for the stop and no wrong time is populated | Medium | Negative | Needs Clarification: Behavior for an invalid address is not defined in the SRS. |
| 135 | 2. Add Delivery Trip Screen | TC-ADT-084 | Optimize Route reorders unlocked stops | Inventory > Delivery Trip > Add Delivery Trip | 1. Add four unlocked stops in a non-efficient order
2. Click Optimize Route | 4 unlocked stops | The stops are reordered to give the fastest/shortest route and the No. column is updated | High | Positive | - |
| 136 | 2. Add Delivery Trip Screen | TC-ADT-085 | Optimize Route keeps Locked stops in position | Inventory > Delivery Trip > Add Delivery Trip | 1. Add four stops and lock stop No. 2
2. Click Optimize Route | Stop 2 locked | The locked stop stays in position 2; only unlocked stops are reordered | High | Positive | - |
| 137 | 2. Add Delivery Trip Screen | TC-ADT-086 | Optimize Route when all stops are locked | Inventory > Delivery Trip > Add Delivery Trip | 1. Lock all stops
2. Click Optimize Route | All stops locked | The order of the stops does not change | Medium | Positive | - |
| 138 | 2. Add Delivery Trip Screen | TC-ADT-087 | Recalculate arrival times after route optimization | Inventory > Delivery Trip > Add Delivery Trip | 1. Click Optimize Route
2. Click Calculate Estimated Arrival Times | 4 stops | Estimated Arrive values are recalculated according to the new order | Medium | Positive | - |
| 139 | 2. Add Delivery Trip Screen | TC-ADT-088 | Optimize Route when the Google Maps service is unavailable | Inventory > Delivery Trip > Add Delivery Trip | 1. Make the Google Maps Directions API unavailable
2. Click Optimize Route | Invalid API key | A clear error message is displayed and the stop order does not change | Medium | Negative | Needs Clarification: Error handling is not defined in the SRS. |
| 140 | 2. Add Delivery Trip Screen | TC-ADT-089 | Status is a read-only label | Inventory > Delivery Trip > Add Delivery Trip | Review the Status field on a new trip | - | Status is displayed as a label and cannot be edited | Medium | UI | - |
| 141 | 2. Add Delivery Trip Screen | TC-ADT-090 | Amended From is hidden on a new trip | Inventory > Delivery Trip > Add Delivery Trip | Review the form of a newly created trip | - | The Amended From field is not displayed | Medium | UI | - |
| 142 | 2. Add Delivery Trip Screen | TC-ADT-091 | View dropdown contains Delivery Note | Inventory > Delivery Trip > Add Delivery Trip | Click the View dropdown | - | The dropdown contains the Delivery Note option | Medium | Positive | - |
| 143 | 2. Add Delivery Trip Screen | TC-ADT-092 | Navigate to the Delivery Note List from View | Inventory > Delivery Trip > Add Delivery Trip | 1. Click View
2. Click Delivery Note | - | The user is redirected to the Delivery Note List screen | Medium | Positive | - |
| 144 | 2. Add Delivery Trip Screen | TC-ADT-093 | Get Stops From dropdown contains Delivery Note | Inventory > Delivery Trip > Add Delivery Trip | Click the Get Stops From dropdown | - | The dropdown contains the Delivery Note option | Medium | Positive | - |
| 145 | 2. Add Delivery Trip Screen | TC-ADT-094 | Open the Get Stops From Delivery Note popup | Inventory > Delivery Trip > Add Delivery Trip | 1. Click Get Stops From
2. Click Delivery Note | - | A popup is displayed with Search, Company, Customer fields, the Delivery Note list and Get Items button | High | Positive | - |
| 146 | 2. Add Delivery Trip Screen | TC-ADT-095 | Search Delivery Notes by full name | Inventory > Delivery Trip > Add Delivery Trip | Type a full Delivery Note name in Search | DN-0001 | Only the matching Delivery Note is displayed | Medium | Positive | - |
| 147 | 2. Add Delivery Trip Screen | TC-ADT-096 | Search Delivery Notes by part of the name | Inventory > Delivery Trip > Add Delivery Trip | Type part of a Delivery Note name in Search | 0001 | All Delivery Notes containing the text are displayed | Medium | Positive | - |
| 148 | 2. Add Delivery Trip Screen | TC-ADT-097 | Search field maximum length is 100 characters | Inventory > Delivery Trip > Add Delivery Trip | Enter 101 characters in the Search field | 101-character text | Input stops at 100 characters | Low | Negative | - |
| 149 | 2. Add Delivery Trip Screen | TC-ADT-098 | Search Delivery Notes with no match | Inventory > Delivery Trip > Add Delivery Trip | Type a non-existing name in Search | ZZZ-9999 | No Delivery Notes are displayed | Low | Negative | - |
| 150 | 2. Add Delivery Trip Screen | TC-ADT-099 | Filter Delivery Notes by Company | Inventory > Delivery Trip > Add Delivery Trip | Select a Company in the popup | Shamel Trading Co. | Only Delivery Notes of the selected Company are displayed | Medium | Positive | - |
| 151 | 2. Add Delivery Trip Screen | TC-ADT-100 | Filter Delivery Notes by Customer | Inventory > Delivery Trip > Add Delivery Trip | Select a Customer in the popup | Al Noor Stores | Only Delivery Notes of the selected Customer are displayed | Medium | Positive | - |
| 152 | 2. Add Delivery Trip Screen | TC-ADT-101 | Delivery Note list columns in the popup | Inventory > Delivery Trip > Add Delivery Trip | Review the Delivery Note list in the popup | - | The list shows: Checkbox, No., Name, Company, Customer | Medium | UI | - |
| 153 | 2. Add Delivery Trip Screen | TC-ADT-102 | Delivery Note name opens Delivery Note Details | Inventory > Delivery Trip > Add Delivery Trip | Click a Delivery Note name in the popup | DN-0001 | The user is redirected to the Delivery Note Details screen | Medium | Positive | - |
| 154 | 2. Add Delivery Trip Screen | TC-ADT-103 | Get Items adds the selected Delivery Note to the stops table | Inventory > Delivery Trip > Add Delivery Trip | 1. Select one Delivery Note in the popup
2. Click Get Items | DN-0001 | The Delivery Note is added as a new stop with its customer and address | High | Positive | - |
| 155 | 2. Add Delivery Trip Screen | TC-ADT-104 | Get Items with multiple Delivery Notes | Inventory > Delivery Trip > Add Delivery Trip | 1. Select two Delivery Notes
2. Click Get Items | DN-0001, DN-0002 | Both Delivery Notes are added to the Delivery Stops table | Medium | Positive | - |
| 156 | 2. Add Delivery Trip Screen | TC-ADT-105 | Click Get Items without selecting a Delivery Note | Inventory > Delivery Trip > Add Delivery Trip | 1. Do not select any Delivery Note
2. Click Get Items | - | A message is displayed asking the user to select a Delivery Note; nothing is added | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 157 | 2. Add Delivery Trip Screen | TC-ADT-106 | Add the same Delivery Note twice | Inventory > Delivery Trip > Add Delivery Trip | 1. Add Delivery Note DN-0001 using Get Items
2. Open the popup again and add DN-0001 | DN-0001 | The system prevents the duplicate or warns the user | Medium | Negative | Needs Clarification: SRS does not define duplicate handling (also whether a note already linked to another trip is listed). |
| 158 | 2. Add Delivery Trip Screen | TC-ADT-107 | Save a Delivery Trip with valid data | Inventory > Delivery Trip > Add Delivery Trip | 1. Fill all mandatory fields with valid data
2. Add at least one stop
3. Click Save | Series: DT-.YYYY.-; Company: Shamel Trading Co.; Driver: Ahmed Hassan; Vehicle: ABC-1234; Departure: 2026-11-01 09:00; Stop: Al Noor Stores | The trip is saved (not submitted), added to the Delivery Trip List with status Draft | High | Positive | - |
| 159 | 2. Add Delivery Trip Screen | TC-ADT-108 | Linked Delivery Notes are updated after Save | Inventory > Delivery Trip > Add Delivery Trip | 1. Add a stop from Delivery Note DN-0001
2. Click Save
3. Open DN-0001 | DN-0001 | The Delivery Note is updated accordingly (linked to the saved trip) | High | Positive | Needs Clarification: SRS does not say which field is updated on the Delivery Note. |
| 160 | 2. Add Delivery Trip Screen | TC-ADT-109 | Save with all mandatory fields empty | Inventory > Delivery Trip > Add Delivery Trip | 1. Leave the form empty
2. Click Save | - | A validation error message is displayed for each mandatory field (Series, Company, Driver, Vehicle, Departure Time, Address Name) | High | Negative | - |
| 161 | 2. Add Delivery Trip Screen | TC-ADT-110 | Save a trip with no stops | Inventory > Delivery Trip > Add Delivery Trip | 1. Fill all mandatory fields
2. Do not add stops
3. Click Save | No stops | To be confirmed with the BA (saved or blocked) | Medium | Negative | Needs Clarification: SRS does not say whether at least one stop is required. |
| 162 | 2. Add Delivery Trip Screen | TC-ADT-111 | Submit button is displayed only after Save | Inventory > Delivery Trip > Add Delivery Trip | 1. Click Save on a valid trip
2. Review the buttons | - | The Submit button is displayed after saving | High | Positive | - |
| 163 | 2. Add Delivery Trip Screen | TC-ADT-112 | Submit button is hidden before Save | Inventory > Delivery Trip > Add Delivery Trip | Review the buttons on a new unsaved trip | - | The Submit button is not displayed | Medium | Negative | - |
| 164 | 2. Add Delivery Trip Screen | TC-ADT-113 | Submit a saved Delivery Trip | Inventory > Delivery Trip > Add Delivery Trip | 1. Save a valid trip
2. Click Submit | Valid saved trip | The trip is submitted, added to the Delivery Trip List and its Status is Scheduled | High | Positive | - |
| 165 | 2. Add Delivery Trip Screen | TC-ADT-114 | Visited checkbox is displayed after Submit | Inventory > Delivery Trip > Add Delivery Trip | 1. Submit a trip
2. Open a stop (Edit Row) | - | The Visited checkbox is displayed | High | Positive | - |
| 166 | 2. Add Delivery Trip Screen | TC-ADT-115 | Update button is displayed after the Visited checkbox is selected | Inventory > Delivery Trip > Add Delivery Trip | 1. Submit a trip
2. Select Visited for a stop | - | The Update button is displayed on the page | High | Positive | - |
| 167 | 2. Add Delivery Trip Screen | TC-ADT-116 | Visited on a trip with a single customer | Inventory > Delivery Trip > Add Delivery Trip | 1. Submit a trip with one customer
2. Select Visited
3. Click Update | One customer | The trip Status changes from Scheduled to Completed | High | Positive | - |
| 168 | 2. Add Delivery Trip Screen | TC-ADT-117 | Visited for some customers of a multi-customer trip | Inventory > Delivery Trip > Add Delivery Trip | 1. Submit a trip with three customers
2. Select Visited for one customer
3. Click Update | 3 customers; 1 visited | The trip Status changes to In Transit | High | Positive | - |
| 169 | 2. Add Delivery Trip Screen | TC-ADT-118 | Visited for all customers of a multi-customer trip | Inventory > Delivery Trip > Add Delivery Trip | 1. Submit a trip with three customers
2. Select Visited for all customers
3. Click Update | 3 customers; 3 visited | The trip Status changes to Completed | High | Positive | - |
| 170 | 2. Add Delivery Trip Screen | TC-ADT-119 | Clear the Visited checkbox after it was saved | Inventory > Delivery Trip > Add Delivery Trip | 1. Mark a stop as Visited and Update
2. Clear Visited
3. Click Update | - | To be confirmed with the BA (status rollback or locked) | Low | Negative | Needs Clarification: SRS does not say whether Visited can be reverted. |
| 171 | 2. Add Delivery Trip Screen | TC-ADT-120 | Visited behavior for the In Transit to Completed transition | Inventory > Delivery Trip > Add Delivery Trip | 1. Submit a trip with two customers
2. Mark one Visited and Update
3. Mark the second Visited and Update | 2 customers | The status changes Scheduled > In Transit > Completed | High | Positive | Needs Clarification: The List use case says the status becomes Completed for a single customer, and In Transit for 'some' customers. Confirm the full rule. |
| 172 | 2. Add Delivery Trip Screen | TC-ADT-121 | Cancel button is displayed only for Scheduled trips | Inventory > Delivery Trip > Add Delivery Trip | 1. Open a Draft trip
2. Open a Scheduled trip | - | Cancel is hidden for Draft and displayed for Scheduled | High | Positive | - |
| 173 | 2. Add Delivery Trip Screen | TC-ADT-122 | Cancel a Scheduled trip from the form | Inventory > Delivery Trip > Add Delivery Trip | 1. Open a Scheduled trip
2. Click Cancel | - | The trip is cancelled successfully and the Cancel button changes to Amend | High | Positive | - |
| 174 | 2. Add Delivery Trip Screen | TC-ADT-123 | Amend button is displayed only for Cancelled trips | Inventory > Delivery Trip > Add Delivery Trip | Open trips with status Scheduled and Cancelled | - | Amend is displayed only for the Cancelled trip | High | Positive | - |
| 175 | 2. Add Delivery Trip Screen | TC-ADT-124 | Click Amend on a Cancelled trip | Inventory > Delivery Trip > Add Delivery Trip | 1. Open a Cancelled trip
2. Click Amend | - | A new Draft trip is created with the data of the cancelled trip and Amended From pointing to it | High | Positive | Needs Clarification: SRS defines when Amend appears but not what happens after clicking it. |
| 176 | 3. Delivery Trip Details Screen | TC-DTD-001 | Open Delivery Trip Details from the list | Logged in; at least one Delivery Trip exists | 1. Click Inventory from the side menu
2. Click Delivery Trip
3. Click a Delivery Trip ID | DT-2026-00001 | The Delivery Trip Details screen of the selected trip is displayed | High | Positive | - |
| 177 | 3. Delivery Trip Details Screen | TC-DTD-002 | Details display the data entered during creation | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open a trip created with known data and compare the fields | Driver: Ahmed Hassan; Vehicle: ABC-1234; Departure: 2026-11-01 09:00; 2 stops | All data entered during creation is displayed correctly | High | Positive | - |
| 178 | 3. Delivery Trip Details Screen | TC-DTD-003 | Draft: fields are displayed as input fields | Inventory > Delivery Trip > click a Delivery Trip ID in the table; a Draft trip exists | Open a Draft trip | Status: Draft | Fields are displayed as editable input fields | High | Positive | - |
| 179 | 3. Delivery Trip Details Screen | TC-DTD-004 | Draft: modify and save a trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Change the Vehicle
3. Click Save | Vehicle: ABC-1234 > XYZ-5678 | The changes are saved successfully and displayed after reopening the trip | High | Positive | - |
| 180 | 3. Delivery Trip Details Screen | TC-DTD-005 | Draft: clear a mandatory field and save | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Clear the Driver
3. Click Save | - | An error message is displayed because Driver is mandatory | High | Negative | - |
| 181 | 3. Delivery Trip Details Screen | TC-DTD-006 | Draft: clear Vehicle and save | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Clear the Vehicle
3. Click Save | - | An error message is displayed because Vehicle is mandatory | Medium | Negative | - |
| 182 | 3. Delivery Trip Details Screen | TC-DTD-007 | Draft: clear Departure Time and save | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Clear the Departure Time
3. Click Save | - | An error message is displayed because Departure Time is mandatory | Medium | Negative | - |
| 183 | 3. Delivery Trip Details Screen | TC-DTD-008 | Draft: clear Address Name of a stop and save | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Clear Address Name in a stop
3. Click Save | - | An error message is displayed because Address Name is mandatory | Medium | Negative | - |
| 184 | 3. Delivery Trip Details Screen | TC-DTD-009 | Draft: Details field minimum length | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open Edit Row of a stop in a Draft trip
2. Enter 2 characters in Details
3. Click Update | ab | An error message is displayed (minimum length is 3 characters) | Medium | Negative | - |
| 185 | 3. Delivery Trip Details Screen | TC-DTD-010 | Draft: Details field maximum length | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Try to enter 501 characters in Details of a stop in a Draft trip | 501-character text | Input stops at 500 characters | Medium | Negative | - |
| 186 | 3. Delivery Trip Details Screen | TC-DTD-011 | Draft: add a stop using Add Row | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Click Add Row
3. Select Customer and Address Name
4. Click Save | Al Noor Stores | The new stop is saved with the trip | Medium | Positive | - |
| 187 | 3. Delivery Trip Details Screen | TC-DTD-012 | Draft: delete a stop | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Select a stop row
3. Click Delete row
4. Click Save | - | The stop is removed from the trip | Medium | Positive | - |
| 188 | 3. Delivery Trip Details Screen | TC-DTD-013 | Draft: Calculate Estimated Arrival Times | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip with stops
2. Click Calculate Estimated Arrival Times | 3 stops | Estimated Arrive is populated for each stop | Medium | Positive | - |
| 189 | 3. Delivery Trip Details Screen | TC-DTD-014 | Draft: Optimize Route | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip with unlocked stops
2. Click Optimize Route | 4 stops | Unlocked stops are reordered; locked stops keep their positions | Medium | Positive | - |
| 190 | 3. Delivery Trip Details Screen | TC-DTD-015 | Draft: Get Stops From Delivery Note | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Click Get Stops From > Delivery Note
3. Select a note and click Get Items | DN-0003 | The Delivery Note is added to the Delivery Stops table | Medium | Positive | - |
| 191 | 3. Delivery Trip Details Screen | TC-DTD-016 | Scheduled: fields are displayed as read-only labels | Inventory > Delivery Trip > click a Delivery Trip ID in the table; a Scheduled trip exists | Open a Scheduled trip | Status: Scheduled | All fields are displayed as read-only labels | High | Positive | Needs Clarification: Details use case says 'Submitted'. The status list in the SRS has no 'Submitted' value. Assumed to be Scheduled. |
| 192 | 3. Delivery Trip Details Screen | TC-DTD-017 | Scheduled: fields cannot be edited | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Scheduled trip
2. Try to change Driver, Vehicle and Departure Time | Status: Scheduled | None of the fields can be edited | High | Negative | - |
| 193 | 3. Delivery Trip Details Screen | TC-DTD-018 | Cancelled: fields are displayed as read-only labels | Inventory > Delivery Trip > click a Delivery Trip ID in the table; a Cancelled trip exists | Open a Cancelled trip | Status: Cancelled | All fields are displayed as read-only labels and cannot be edited | High | Positive | - |
| 194 | 3. Delivery Trip Details Screen | TC-DTD-019 | In Transit: field editability | Inventory > Delivery Trip > click a Delivery Trip ID in the table; an In Transit trip exists | Open an In Transit trip and try to edit fields | Status: In Transit | To be confirmed with the BA (read-only or editable) | Medium | Positive | Needs Clarification: SRS defines editability only for Draft, Submitted and Cancelled. |
| 195 | 3. Delivery Trip Details Screen | TC-DTD-020 | Completed: field editability | Inventory > Delivery Trip > click a Delivery Trip ID in the table; a Completed trip exists | Open a Completed trip and try to edit fields | Status: Completed | All fields are read-only (expected - to be confirmed) | Medium | Positive | Needs Clarification: SRS does not state the Completed behavior in Details. |
| 196 | 3. Delivery Trip Details Screen | TC-DTD-021 | Fixed page actions are displayed at the top | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open any trip and review the top of the page | - | The Notify Customers via Email, View, Assign, Attachment, Tags, Share and Print actions are displayed at the top | High | UI | - |
| 197 | 3. Delivery Trip Details Screen | TC-DTD-022 | Fixed page actions remain visible for all statuses | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open trips in each status (Draft, Scheduled, In Transit, Completed, Cancelled) | 5 trips | The fixed page actions are consistently displayed on all of them | Medium | UI | - |
| 198 | 3. Delivery Trip Details Screen | TC-DTD-023 | Notify Customers via Email button is displayed | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open a trip and review the Notify Customers via Email button | - | The button is displayed and clickable | Medium | UI | - |
| 199 | 3. Delivery Trip Details Screen | TC-DTD-024 | Notify customers via email | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Scheduled trip whose customers have contact emails
2. Click Notify Customers via Email | Contact email: noor@example.com | An email with the trip notification/details is sent to each customer contact | High | Positive | Needs Clarification: SRS does not define the email content or the statuses in which it is allowed. |
| 200 | 3. Delivery Trip Details Screen | TC-DTD-025 | Email sent to field is populated after sending | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Click Notify Customers via Email
2. Open Edit Row of a notified stop | noor@example.com | Email sent to (read-only) shows the address(es) the email was sent to | High | Positive | - |
| 201 | 3. Delivery Trip Details Screen | TC-DTD-026 | Notify a customer that has no email | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a trip with a customer contact without email
2. Click Notify Customers via Email | Customer without email | A clear message is displayed for the customer without an email; others are still notified | Medium | Negative | Needs Clarification: Not defined in the SRS. |
| 202 | 3. Delivery Trip Details Screen | TC-DTD-027 | Notify customers for a Draft trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Draft trip
2. Click Notify Customers via Email | Status: Draft | To be confirmed with the BA (allowed or blocked) | Medium | Negative | Needs Clarification: SRS says the button is fixed on all pages, but a Draft trip may not be ready to notify. |
| 203 | 3. Delivery Trip Details Screen | TC-DTD-028 | Notify customers more than once | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Click Notify Customers via Email
2. Click it again | - | To be confirmed with the BA (second email sent or blocked) | Low | Positive | Needs Clarification: Duplicate notification behavior is not defined. |
| 204 | 3. Delivery Trip Details Screen | TC-DTD-029 | View dropdown contains Delivery Note | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Click View | - | The dropdown contains the Delivery Note option | Medium | Positive | - |
| 205 | 3. Delivery Trip Details Screen | TC-DTD-030 | Navigate to Delivery Note List from View | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Click View
2. Click Delivery Note | - | The user is redirected to the Delivery Note List screen | Medium | Positive | - |
| 206 | 3. Delivery Trip Details Screen | TC-DTD-031 | Assign the trip to a user | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Click Assign
2. Select a user
3. Confirm | User: Mona Samir | The trip is assigned to the selected user and the assignment is displayed | Medium | Positive | Needs Clarification: SRS lists Assign without details. |
| 207 | 3. Delivery Trip Details Screen | TC-DTD-032 | Add an attachment | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Click Attachment
2. Upload a file | delivery-proof.pdf | The file is attached to the trip and listed | Medium | Positive | Needs Clarification: Allowed file types and size limit are not defined. |
| 208 | 3. Delivery Trip Details Screen | TC-DTD-033 | Remove an attachment | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a trip with an attachment
2. Remove the attachment | delivery-proof.pdf | The attachment is removed from the trip | Low | Positive | - |
| 209 | 3. Delivery Trip Details Screen | TC-DTD-034 | Add a tag | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Click Tags
2. Add a tag | Tag: Urgent | The tag is added to the trip | Low | Positive | - |
| 210 | 3. Delivery Trip Details Screen | TC-DTD-035 | Share the trip with a user | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Click Share
2. Select a user and permission
3. Confirm | User: Mona Samir | The trip is shared with the selected user | Medium | Positive | Needs Clarification: SRS lists Share without details. |
| 211 | 3. Delivery Trip Details Screen | TC-DTD-036 | Print the trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Click Print | - | The print view of the trip is displayed and can be printed | Medium | Positive | - |
| 212 | 3. Delivery Trip Details Screen | TC-DTD-037 | Status label matches the trip state | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open trips in each status and review the Status field | 5 trips | The Status label shows the correct current status (read-only) | High | Positive | - |
| 213 | 3. Delivery Trip Details Screen | TC-DTD-038 | Amended From is displayed for an amended trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table; an amended trip exists | Open a trip created through Amend | DT-2026-00005-1 | The Amended From label displays the original trip | Medium | Positive | - |
| 214 | 3. Delivery Trip Details Screen | TC-DTD-039 | Amended From link opens the original trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open an amended trip
2. Click the Amended From link | - | The user is redirected to the original (cancelled) Delivery Trip | Medium | Positive | - |
| 215 | 3. Delivery Trip Details Screen | TC-DTD-040 | Amended From is hidden for a non-amended trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open a trip that was not amended from another trip | - | The Amended From field is not displayed | Medium | UI | - |
| 216 | 3. Delivery Trip Details Screen | TC-DTD-041 | Total Estimated Distance and Distance UOM are displayed | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open a saved trip | - | Total Estimated Distance and Distance UOM are displayed as read-only labels | Medium | UI | - |
| 217 | 3. Delivery Trip Details Screen | TC-DTD-042 | Calculate Estimated Arrival Times is unavailable for a Scheduled trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open a Scheduled trip and look for Calculate Estimated Arrival Times / Optimize Route | Status: Scheduled | Route actions cannot be used because the trip is read-only | Medium | Negative | Needs Clarification: SRS does not say whether these buttons are hidden or disabled after submission. |
| 218 | 3. Delivery Trip Details Screen | TC-DTD-043 | Visited checkbox is displayed on a submitted trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Scheduled trip
2. Open Edit Row of a stop | - | The Visited checkbox is displayed for the stop | High | Positive | - |
| 219 | 3. Delivery Trip Details Screen | TC-DTD-044 | Visited checkbox updates a single-customer trip to Completed | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Scheduled trip with one customer
2. Select Visited
3. Click Update | One customer | The trip Status changes to Completed | High | Positive | - |
| 220 | 3. Delivery Trip Details Screen | TC-DTD-045 | Visited checkbox updates a multi-customer trip to In Transit | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Scheduled trip with three customers
2. Select Visited for one customer
3. Click Update | 3 customers; 1 visited | The trip Status changes to In Transit | High | Positive | - |
| 221 | 3. Delivery Trip Details Screen | TC-DTD-046 | Visited for all customers completes the trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open an In Transit trip
2. Select Visited for the remaining customers
3. Click Update | 3 customers; 3 visited | The trip Status changes to Completed | High | Positive | - |
| 222 | 3. Delivery Trip Details Screen | TC-DTD-047 | Update button is hidden until Visited is selected | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open a Scheduled trip without changing anything | - | The Update button is not displayed | Medium | UI | - |
| 223 | 3. Delivery Trip Details Screen | TC-DTD-048 | Cancel a Scheduled trip from Details | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Scheduled trip
2. Click Cancel | - | The trip is cancelled and the Cancel button changes to Amend | High | Positive | - |
| 224 | 3. Delivery Trip Details Screen | TC-DTD-049 | Cancel button is hidden for a Draft trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | Open a Draft trip | Status: Draft | The Cancel button is not displayed | Medium | Negative | - |
| 225 | 3. Delivery Trip Details Screen | TC-DTD-050 | Submit a Draft trip from Details | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a saved Draft trip
2. Click Submit | Complete Draft trip | The trip is submitted and its Status changes to Scheduled | High | Positive | - |
| 226 | 3. Delivery Trip Details Screen | TC-DTD-051 | Amend a Cancelled trip from Details | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Cancelled trip
2. Click Amend | - | A new trip is created from the cancelled one with Amended From populated | High | Positive | Needs Clarification: SRS does not define the result of clicking Amend. |
| 227 | 3. Delivery Trip Details Screen | TC-DTD-052 | Edit Row popup is read-only for a Scheduled trip | Inventory > Delivery Trip > click a Delivery Trip ID in the table | 1. Open a Scheduled trip
2. Click the Edit Row icon of a stop | Status: Scheduled | The stop fields are displayed as read-only, except the Visited checkbox | Medium | Positive | Needs Clarification: Confirm whether Visited stays editable on read-only trips. |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Delivery Trip List Screen |  |  |  |
| 2. Add Delivery Trip Screen |  |  |  |
| 3. Delivery Trip Details Screen |  |  |  |
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