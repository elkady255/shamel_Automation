<!-- converted from SHAMEL_Bin_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Bin |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Module - Bin) | Prepared for QA execution |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Bin List Screen | TC-BNL-001 | Display the Bin list | Access via Inventory > Bin | 1. Click Inventory from the side menu
2. Click Bin | - | A table listing all Bins in the system is displayed | High | Positive | - |
| 2 | 1. Bin List Screen | TC-BNL-002 | Add button is not available | Access via Inventory > Bin | Review the top of the Bin list | - | There is no Add / New button because Bins are system-generated | High | Negative | - |
| 3 | 1. Bin List Screen | TC-BNL-003 | Display checkbox column for row selection | Access via Inventory > Bin | Open the Bin list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 4 | 1. Bin List Screen | TC-BNL-004 | Display Bin ID column | Access via Inventory > Bin | Open the Bin list and review the Bin ID column | - | The Bin ID is displayed for each row | Medium | UI | - |
| 5 | 1. Bin List Screen | TC-BNL-005 | Navigate to Bin Details by clicking the ID | Access via Inventory > Bin | Click a Bin ID in the table | Bin: STO-ITEM-2026-00074 / Work In Progress - E | The user is redirected to the Bin Details screen of the selected Bin | High | Positive | - |
| 6 | 1. Bin List Screen | TC-BNL-006 | Display Item Code column | Access via Inventory > Bin | Open the Bin list and review the Item Code column | Item: STO-ITEM-2026-00074 | The item whose inventory balances are maintained in the warehouse is displayed | High | UI | - |
| 7 | 1. Bin List Screen | TC-BNL-007 | Display Warehouse column | Access via Inventory > Bin | Open the Bin list and review the Warehouse column | Warehouse: Work In Progress - E | The warehouse in which the balances of the item are maintained is displayed | High | UI | - |
| 8 | 1. Bin List Screen | TC-BNL-008 | Display Actual Qty column | Access via Inventory > Bin | Open the Bin list and review the Actual Qty column | Actual Qty: 3 | The actual quantity of the item in the warehouse is displayed | High | UI | - |
| 9 | 1. Bin List Screen | TC-BNL-009 | Display Ordered Qty column | Access via Inventory > Bin | Open the Bin list and review the Ordered Qty column | Ordered Qty: 0 | The quantity ordered through purchase orders but not yet received is displayed | High | UI | - |
| 10 | 1. Bin List Screen | TC-BNL-010 | Display Reserved Qty column | Access via Inventory > Bin | Open the Bin list and review the Reserved Qty column | Reserved Qty: 0 | The quantity reserved for sales orders is displayed | High | UI | - |
| 11 | 1. Bin List Screen | TC-BNL-011 | List displays only the columns defined in the SRS | Access via Inventory > Bin | Review the list header | - | The columns are: Checkbox, Bin ID, Item Code, Warehouse, Actual Qty, Ordered Qty, Reserved Qty | Medium | UI | - |
| 12 | 1. Bin List Screen | TC-BNL-012 | Actual Qty in the list equals the Actual Qty in Details | Access via Inventory > Bin | Compare the Actual Qty in the list and in Details for the same Bin | Actual Qty: 3 | Both screens show the same value | High | Positive | Needs Clarification: The list describes Actual Qty as 'the current available quantity', while Details describes it as the actual quantity. Confirm the list value is the actual quantity (not Available Qty). |
| 13 | 1. Bin List Screen | TC-BNL-013 | Ordered Qty in the list equals the Ordered Qty in Details | Access via Inventory > Bin | Compare the values for the same Bin | Ordered Qty: 10 | Both screens show the same value | Medium | Positive | - |
| 14 | 1. Bin List Screen | TC-BNL-014 | Reserved Qty in the list equals the Sales Orders Qty in Details | Access via Inventory > Bin | Compare the values for the same Bin | Reserved Qty: 4 | The list value equals the Sales Orders Qty shown in Details | Medium | Positive | Needs Clarification: SRS names the list column Reserved Qty and the Details field Sales Orders Qty (Reserved Qty in ERPNext). |
| 15 | 1. Bin List Screen | TC-BNL-015 | Bin is created automatically for a new item and warehouse combination | Access via Inventory > Bin | 1. Submit a Material Receipt of a new item to a warehouse
2. Open the Bin list | New item to Stores - E | A Bin for the item and warehouse appears in the list with the received quantity | High | Positive | Needs Clarification: Bin creation is not described in the SRS (system-generated). |
| 16 | 1. Bin List Screen | TC-BNL-016 | Only one Bin exists per item and warehouse | Access via Inventory > Bin | 1. Submit two receipts of the same item to the same warehouse
2. Open the Bin list | Coffee Mug to Stores - E x2 | A single Bin row exists and its Actual Qty is the sum | High | Positive | - |
| 17 | 1. Bin List Screen | TC-BNL-017 | Bins with zero quantity | Access via Inventory > Bin | 1. Issue all the stock of an item from a warehouse
2. Open the Bin list | Actual Qty: 0 | To be confirmed with the BA (the Bin stays in the list with zero) | Medium | Positive | Needs Clarification: SRS does not say whether empty Bins stay in the list. |
| 18 | 1. Bin List Screen | TC-BNL-018 | Group warehouses do not have Bins | Access via Inventory > Bin | Search the list for a group warehouse | All Warehouses | No Bin exists for group warehouses | Medium | Negative | Needs Clarification: Not defined in the SRS (standard behavior). |
| 19 | 1. Bin List Screen | TC-BNL-019 | List sort order | Access via Inventory > Bin | Open the list without sorting | - | To be confirmed with the BA (default sort order) | Low | Positive | Needs Clarification: SRS does not define the default sort order. |
| 20 | 1. Bin List Screen | TC-BNL-020 | Action bar appears when one row is selected | Access via Inventory > Bin | Select the checkbox of one Bin | - | An action bar appears showing the available actions | High | Positive | - |
| 21 | 1. Bin List Screen | TC-BNL-021 | Action bar appears when multiple rows are selected | Access via Inventory > Bin | Select the checkboxes of three Bins | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 22 | 1. Bin List Screen | TC-BNL-022 | Action bar disappears when all rows are deselected | Access via Inventory > Bin | 1. Select one Bin
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 23 | 1. Bin List Screen | TC-BNL-023 | Action bar contains the required actions | Access via Inventory > Bin | Select a Bin and review the action bar | - | The action bar contains: Export, Assign to, Clear assignment, Add tags, Print | High | UI | - |
| 24 | 1. Bin List Screen | TC-BNL-024 | Edit action is not available | Access via Inventory > Bin | Select a Bin and review the action bar | - | There is no Edit action because Bins are read-only | High | Negative | - |
| 25 | 1. Bin List Screen | TC-BNL-025 | Delete action is not available | Access via Inventory > Bin | Select a Bin and review the action bar | - | There is no Delete action because Bins cannot be deleted by users | High | Negative | - |
| 26 | 1. Bin List Screen | TC-BNL-026 | Delete a Bin by URL / API | Access via Inventory > Bin | 1. Try to delete a Bin using the API or the browser URL | DELETE request | The request is rejected because Bins cannot be deleted by users | High | Negative | Needs Clarification: SRS states Bins cannot be edited or deleted by users; how this is enforced is not described. |
| 27 | 1. Bin List Screen | TC-BNL-027 | Edit a Bin by API | Access via Inventory > Bin | 1. Try to update a Bin using the API | PUT request | The request is rejected because Bins cannot be edited by users | High | Negative | - |
| 28 | 1. Bin List Screen | TC-BNL-028 | Create a Bin manually | Access via Inventory > Bin | 1. Try to open the new Bin form by URL | URL: /app/bin/new | The form cannot be created manually; access is denied or redirected | High | Negative | - |
| 29 | 1. Bin List Screen | TC-BNL-029 | Export selected Bins | Access via Inventory > Bin | 1. Select one or more Bins
2. Click Export | - | The selected Bins are exported | Medium | Positive | Needs Clarification: SRS lists Export without details (file format, exported fields). |
| 30 | 1. Bin List Screen | TC-BNL-030 | Assign selected Bins to a user | Access via Inventory > Bin | 1. Select a Bin
2. Click Assign to
3. Choose a user and confirm | User: Mona Samir | The Bin is assigned to the selected user | Medium | Positive | Needs Clarification: SRS lists Assign to without details. |
| 31 | 1. Bin List Screen | TC-BNL-031 | Clear assignment of a Bin | Access via Inventory > Bin | 1. Select an assigned Bin
2. Click Clear assignment | Assigned Bin | The assignment is cleared | Low | Positive | Needs Clarification: SRS lists Clear assignment without details. |
| 32 | 1. Bin List Screen | TC-BNL-032 | Add tags to a Bin | Access via Inventory > Bin | 1. Select a Bin
2. Click Add tags
3. Enter a tag and confirm | Tag: Audit | The tag is added to the Bin | Low | Positive | Needs Clarification: SRS lists Add tags without details. |
| 33 | 1. Bin List Screen | TC-BNL-033 | Print selected Bins | Access via Inventory > Bin | 1. Select a Bin
2. Click Print | - | The print view of the Bin is displayed | Medium | Positive | Needs Clarification: SRS lists Print without details. |
| 34 | 1. Bin List Screen | TC-BNL-034 | Search or filter the list | Access via Inventory > Bin | Look for a search / filter option on the list | - | To be confirmed with the BA (the SRS defines no search or filter) | Medium | Positive | Needs Clarification: A Bin list is normally filtered by item and warehouse, but the SRS defines no filters. |
| 35 | 1. Bin List Screen | TC-BNL-035 | Bin list when there are no Bins | Access via Inventory > Bin | Open the list in a system with no stock | No stock | An empty list / empty-state message is displayed without errors | Low | UI | Needs Clarification: Not covered in the SRS. Expected behavior is a standard assumption. |
| 36 | 1. Bin List Screen | TC-BNL-036 | User without permission cannot access Bin | Access via Inventory > Bin | 1. Log in with a user that has no permission for Bin
2. Open the sidebar | Restricted user | The menu item is not available or access is denied | Medium | Negative | Needs Clarification: Permissions are not covered in the SRS. |
| 37 | 2. Bin Details Screen | TC-BND-001 | Open Bin Details from the list | Logged in; at least one Bin exists | 1. Click Inventory from the side menu
2. Click Bin
3. Click a Bin ID | Bin: STO-ITEM-2026-00074 / Work In Progress - E | The Bin Details screen of the selected Bin is displayed | High | Positive | - |
| 38 | 2. Bin Details Screen | TC-BND-002 | All fields are read-only labels | Inventory > Bin > click a Bin ID in the table | Open a Bin and try to edit every field | - | No field can be edited; all values are displayed as read-only labels | High | Negative | - |
| 39 | 2. Bin Details Screen | TC-BND-003 | Save, Submit and Cancel actions are not available | Inventory > Bin > click a Bin ID in the table | Open a Bin and review the page actions | - | No Save, Submit, Cancel or Delete action is displayed | High | Negative | Needs Clarification: SRS defines no page actions for the Details screen. |
| 40 | 2. Bin Details Screen | TC-BND-004 | Details screen displays the three groups | Inventory > Bin > click a Bin ID in the table | Open a Bin and review the page | - | The groups Item and Warehouse, Available / Future Inventory and Reserved Inventory are displayed together with UOM, Company, Valuation Rate and Stock Value | Medium | UI | - |
| 41 | 2. Bin Details Screen | TC-BND-005 | Item Code is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | STO-ITEM-2026-00074 | Item Code shows the item whose balances are maintained in the warehouse | High | Positive | - |
| 42 | 2. Bin Details Screen | TC-BND-006 | Warehouse is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Work In Progress - E | Warehouse shows the warehouse of the Bin | High | Positive | - |
| 43 | 2. Bin Details Screen | TC-BND-007 | Actual Qty is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Actual Qty: 3 | Actual Qty shows the current actual quantity of the item in the warehouse | High | Positive | - |
| 44 | 2. Bin Details Screen | TC-BND-008 | Actual Qty matches the stock ledger | Inventory > Bin > click a Bin ID in the table | 1. Sum the Qty Change of the item's Stock Ledger Entries in the warehouse
2. Compare with the Bin | +12, -6, -3 | Actual Qty equals the sum of the ledger quantities (3) | High | Positive | - |
| 45 | 2. Bin Details Screen | TC-BND-009 | Available Qty is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Available Qty: 3 | Available Qty shows the current available quantity | High | Positive | - |
| 46 | 2. Bin Details Screen | TC-BND-010 | Available Qty = Actual Qty - Reserved Stock | Inventory > Bin > click a Bin ID in the table | 1. Reserve part of the stock
2. Open the Bin | Actual 10; Reserved 4 | Available Qty shows 6 | High | Positive | - |
| 47 | 2. Bin Details Screen | TC-BND-011 | Available Qty equals Actual Qty when nothing is reserved | Inventory > Bin > click a Bin ID in the table | Open a Bin without reservations | Actual 3; Reserved 0 | Available Qty shows 3 | High | Positive | - |
| 48 | 2. Bin Details Screen | TC-BND-012 | Available Qty updates after a reservation is cancelled | Inventory > Bin > click a Bin ID in the table | 1. Cancel the Stock Reservation Entry
2. Open the Bin | Reserved 4 > 0 | Available Qty returns to equal Actual Qty | Medium | Positive | - |
| 49 | 2. Bin Details Screen | TC-BND-013 | Planned Qty is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Planned Qty: 0 | Planned Qty shows the quantity planned through production or manufacturing | Medium | Positive | Needs Clarification: Production is outside the Inventory SRS; confirm how this value can be produced in the test environment. |
| 50 | 2. Bin Details Screen | TC-BND-014 | Requested Qty is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Requested Qty: 0 | Requested Qty shows the quantity requested through pending material requests | Medium | Positive | - |
| 51 | 2. Bin Details Screen | TC-BND-015 | Requested Qty increases after a Purchase Material Request | Inventory > Bin > click a Bin ID in the table | 1. Submit a Purchase Material Request of 10 units
2. Open the Bin | MR for 10 | Requested Qty shows 10 | High | Positive | - |
| 52 | 2. Bin Details Screen | TC-BND-016 | Requested Qty decreases after the request is fulfilled | Inventory > Bin > click a Bin ID in the table | 1. Fulfil the Material Request (receipt or order)
2. Open the Bin | 10 > 0 | Requested Qty is reduced by the fulfilled quantity | High | Positive | - |
| 53 | 2. Bin Details Screen | TC-BND-017 | Requested Qty after a Material Transfer request | Inventory > Bin > click a Bin ID in the table | 1. Submit a Material Transfer request
2. Open the Bin of the target warehouse | Transfer MR 6 | To be confirmed with the BA (Requested Qty counts transfer requests) | Medium | Positive | Needs Clarification: SRS says 'pending material requests' without naming the types. |
| 54 | 2. Bin Details Screen | TC-BND-018 | Ordered Qty is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Ordered Qty: 0 | Ordered Qty shows the quantity ordered through purchase orders but not yet received | High | Positive | - |
| 55 | 2. Bin Details Screen | TC-BND-019 | Ordered Qty increases after a Purchase Order is submitted | Inventory > Bin > click a Bin ID in the table | 1. Submit a Purchase Order of 10 units
2. Open the Bin | PO for 10 | Ordered Qty shows 10 | High | Positive | - |
| 56 | 2. Bin Details Screen | TC-BND-020 | Ordered Qty decreases after a Purchase Receipt | Inventory > Bin > click a Bin ID in the table | 1. Receive 6 of the 10 ordered units
2. Open the Bin | 10 > 4 | Ordered Qty shows 4 | High | Positive | - |
| 57 | 2. Bin Details Screen | TC-BND-021 | Ordered Qty is cleared after the full receipt | Inventory > Bin > click a Bin ID in the table | 1. Receive all 10 units
2. Open the Bin | 10 > 0 | Ordered Qty shows 0 | High | Positive | - |
| 58 | 2. Bin Details Screen | TC-BND-022 | Ordered Qty decreases when a Purchase Order is cancelled or closed | Inventory > Bin > click a Bin ID in the table | 1. Cancel / close the Purchase Order
2. Open the Bin | 10 > 0 | Ordered Qty is reduced by the pending quantity | Medium | Positive | - |
| 59 | 2. Bin Details Screen | TC-BND-023 | Sales Orders Qty is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Sales Orders Qty: 0 | Sales Orders Qty shows the quantity reserved for sales orders | High | Positive | - |
| 60 | 2. Bin Details Screen | TC-BND-024 | Sales Orders Qty increases after a Sales Order is submitted | Inventory > Bin > click a Bin ID in the table | 1. Submit a Sales Order of 4 units
2. Open the Bin | SO for 4 | Sales Orders Qty shows 4 | High | Positive | - |
| 61 | 2. Bin Details Screen | TC-BND-025 | Sales Orders Qty decreases after delivery | Inventory > Bin > click a Bin ID in the table | 1. Deliver 4 units from the Sales Order
2. Open the Bin | 4 > 0 | Sales Orders Qty is reduced by the delivered quantity | High | Positive | - |
| 62 | 2. Bin Details Screen | TC-BND-026 | Projected Qty is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Projected Qty: 3 | Projected Qty shows the projected inventory quantity after pending stock movements | High | Positive | - |
| 63 | 2. Bin Details Screen | TC-BND-027 | Projected Qty formula | Inventory > Bin > click a Bin ID in the table | 1. Prepare a Bin with Actual 10, Ordered 5, Requested 3, Planned 2, Sales Orders 4, Reserved Stock 1
2. Open the Bin | 10 + 2 + 3 + 5 - 4 - 1 | Projected Qty shows 15 | High | Positive | Needs Clarification: SRS describes the components but does not give the exact formula. The standard formula is assumed. |
| 64 | 2. Bin Details Screen | TC-BND-028 | Projected Qty with only actual stock | Inventory > Bin > click a Bin ID in the table | Open a Bin with no pending documents | Actual 3 | Projected Qty equals Actual Qty (3) | High | Positive | - |
| 65 | 2. Bin Details Screen | TC-BND-029 | Reserved Stock is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Reserved Stock: 0 | Reserved Stock shows the total quantity reserved across all reservation types | High | Positive | - |
| 66 | 2. Bin Details Screen | TC-BND-030 | Reserved Stock increases after a Stock Reservation Entry | Inventory > Bin > click a Bin ID in the table | 1. Reserve 4 units from a Sales Order
2. Open the Bin | Reservation 4 | Reserved Stock shows 4 | High | Positive | - |
| 67 | 2. Bin Details Screen | TC-BND-031 | Reserved Stock vs Sales Orders Qty | Inventory > Bin > click a Bin ID in the table | 1. Create a Sales Order of 4 units without reserving stock
2. Open the Bin | SO 4; Reservation 0 | Sales Orders Qty shows 4 and Reserved Stock shows 0 | High | Positive | Needs Clarification: SRS does not explain the difference between Sales Orders Qty and Reserved Stock. |
| 68 | 2. Bin Details Screen | TC-BND-032 | UOM is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Nos | UOM shows the stock unit of measure of the item | Medium | Positive | - |
| 69 | 2. Bin Details Screen | TC-BND-033 | Company is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Ahmed Ebrahim CO. | Company shows the company associated with the inventory record | High | Positive | - |
| 70 | 2. Bin Details Screen | TC-BND-034 | Company matches the warehouse company | Inventory > Bin > click a Bin ID in the table | Open Bins of warehouses of two different companies | Stores - E; Stores - W | Each Bin shows the company of its warehouse | Medium | Positive | - |
| 71 | 2. Bin Details Screen | TC-BND-035 | Valuation Rate is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Valuation Rate: 10 | Valuation Rate shows the rate used to calculate the inventory value | High | Positive | - |
| 72 | 2. Bin Details Screen | TC-BND-036 | Valuation Rate after receipts at different rates | Inventory > Bin > click a Bin ID in the table | 1. Receive 10 at 50
2. Receive 10 at 60
3. Open the Bin | 10 x 50 + 10 x 60 | Valuation Rate reflects the valuation method (55 for the average) | High | Positive | Needs Clarification: The valuation method (FIFO or Moving Average) is not stated in the SRS. |
| 73 | 2. Bin Details Screen | TC-BND-037 | Stock Value is displayed | Inventory > Bin > click a Bin ID in the table | Open a Bin | Stock Value: 30 | Stock Value shows the total inventory value in the warehouse | High | Positive | - |
| 74 | 2. Bin Details Screen | TC-BND-038 | Stock Value = Actual Qty x Valuation Rate | Inventory > Bin > click a Bin ID in the table | Open a Bin | 3 x 10 | Stock Value shows 30 | High | Positive | - |
| 75 | 2. Bin Details Screen | TC-BND-039 | Stock Value matches the Stock Ledger balance | Inventory > Bin > click a Bin ID in the table | 1. Open the last Stock Ledger Entry of the item and warehouse
2. Compare Balance Stock Value with the Bin Stock Value | Balance 7485 | Both values are equal | High | Positive | - |
| 76 | 2. Bin Details Screen | TC-BND-040 | Stock Value is zero when the quantity is zero | Inventory > Bin > click a Bin ID in the table | Open a Bin with Actual Qty 0 | 0 x 10 | Stock Value shows 0 | Medium | Positive | - |
| 77 | 2. Bin Details Screen | TC-BND-041 | Negative stock in a Bin | Inventory > Bin > click a Bin ID in the table | 1. Enable Allow Negative Stock
2. Issue more than the stock
3. Open the Bin | Actual -2 | To be confirmed with the BA (negative Actual Qty and Stock Value are shown) | Low | Positive | Needs Clarification: Not covered in the SRS. |
| 78 | 2. Bin Details Screen | TC-BND-042 | Item Code is read-only | Inventory > Bin > click a Bin ID in the table | Open a Bin and try to edit Item Code | - | Item Code cannot be edited | Medium | UI | - |
| 79 | 2. Bin Details Screen | TC-BND-043 | Warehouse is read-only | Inventory > Bin > click a Bin ID in the table | Open a Bin and try to edit Warehouse | - | Warehouse cannot be edited | Medium | UI | - |
| 80 | 2. Bin Details Screen | TC-BND-044 | Actual Qty is read-only | Inventory > Bin > click a Bin ID in the table | Open a Bin and try to edit Actual Qty | - | Actual Qty cannot be edited | Medium | UI | - |
| 81 | 2. Bin Details Screen | TC-BND-045 | Available Qty is read-only | Inventory > Bin > click a Bin ID in the table | Open a Bin and try to edit Available Qty | - | Available Qty cannot be edited | Medium | UI | - |
| 82 | 2. Bin Details Screen | TC-BND-046 | Valuation Rate is read-only | Inventory > Bin > click a Bin ID in the table | Open a Bin and try to edit Valuation Rate | - | Valuation Rate cannot be edited | Medium | UI | - |
| 83 | 2. Bin Details Screen | TC-BND-047 | Stock Value is read-only | Inventory > Bin > click a Bin ID in the table | Open a Bin and try to edit Stock Value | - | Stock Value cannot be edited | Medium | UI | - |
| 84 | 2. Bin Details Screen | TC-BND-048 | Fixed page actions on the Details screen | Inventory > Bin > click a Bin ID in the table | Open a Bin and review the top of the page | - | To be confirmed with the BA (Assign, Attachment, Tags, Share and Print as in other modules) | Medium | Positive | Needs Clarification: The Details use case defines no fixed page actions. |
| 85 | 2. Bin Details Screen | TC-BND-049 | Connections tab on the Details screen | Inventory > Bin > click a Bin ID in the table | Open a Bin and scroll to the bottom | - | To be confirmed with the BA (no Connections are defined) | Low | Positive | Needs Clarification: Not defined in the SRS. |
| 86 | 2. Bin Details Screen | TC-BND-050 | Item and Warehouse of the Bin cannot be changed | Inventory > Bin > click a Bin ID in the table | 1. Try to change the Item Code or Warehouse by API | PUT request | The change is rejected | Medium | Negative | - |
| 87 | 3. Bin Update Rules (Integration) | TC-BNU-001 | Material Receipt increases the Actual Qty | Stock data prepared; the source voucher type is submitted from its own module | 1. Note the Bin Actual Qty
2. Submit a Material Receipt of 12
3. Reopen the Bin | 3 > 15 | Actual Qty increases by 12 and Stock Value is updated | High | Positive | Needs Clarification: Bin updates are not described in the Bin SRS; behavior is taken from the voucher modules. |
| 88 | 3. Bin Update Rules (Integration) | TC-BNU-002 | Material Issue decreases the Actual Qty | Stock data prepared; the source voucher type is submitted from its own module | 1. Note the Bin Actual Qty
2. Submit a Material Issue of 3
3. Reopen the Bin | 15 > 12 | Actual Qty decreases by 3 and Stock Value is updated | High | Positive | - |
| 89 | 3. Bin Update Rules (Integration) | TC-BNU-003 | Material Transfer updates both Bins | Stock data prepared; the source voucher type is submitted from its own module | 1. Submit a Material Transfer of 5 from Stores - E to Finished Goods - E
2. Open both Bins | 5 units | The source Bin decreases by 5 and the target Bin increases by 5 | High | Positive | - |
| 90 | 3. Bin Update Rules (Integration) | TC-BNU-004 | Material Transfer to a new warehouse creates a Bin | Stock data prepared; the source voucher type is submitted from its own module | 1. Transfer an item to a warehouse that never held it
2. Open the Bin list | New Bin | A new Bin is created for the target warehouse | High | Positive | - |
| 91 | 3. Bin Update Rules (Integration) | TC-BNU-005 | Add To Transit moves the quantity to the transit warehouse Bin | Stock data prepared; the source voucher type is submitted from its own module | 1. Submit a transfer with Add To Transit
2. Open the Bins | Stores - E to Transit - E | The source Bin decreases and the transit warehouse Bin increases | High | Positive | - |
| 92 | 3. Bin Update Rules (Integration) | TC-BNU-006 | Delivery Note decreases the Actual Qty | Stock data prepared; the source voucher type is submitted from its own module | 1. Deliver a Delivery Note of 6
2. Open the Bin | 20 > 14 | Actual Qty decreases by 6 | High | Positive | - |
| 93 | 3. Bin Update Rules (Integration) | TC-BNU-007 | Purchase Receipt increases the Actual Qty of the accepted warehouse | Stock data prepared; the source voucher type is submitted from its own module | 1. Submit a Purchase Receipt of 6 accepted units
2. Open the Bin | 14 > 20 | Actual Qty increases by 6 | High | Positive | - |
| 94 | 3. Bin Update Rules (Integration) | TC-BNU-008 | Rejected quantity goes to the rejected warehouse Bin | Stock data prepared; the source voucher type is submitted from its own module | 1. Submit a Purchase Receipt with 2 rejected units
2. Open both Bins | Rejected 2 | The rejected warehouse Bin increases by 2 | Medium | Positive | - |
| 95 | 3. Bin Update Rules (Integration) | TC-BNU-009 | Sales Return increases the Actual Qty | Stock data prepared; the source voucher type is submitted from its own module | 1. Submit a Sales Return of 2
2. Open the Bin | 14 > 16 | Actual Qty increases by 2 | High | Positive | - |
| 96 | 3. Bin Update Rules (Integration) | TC-BNU-010 | Purchase Return decreases the Actual Qty | Stock data prepared; the source voucher type is submitted from its own module | 1. Submit a Purchase Return of 2
2. Open the Bin | 16 > 14 | Actual Qty decreases by 2 | High | Positive | - |
| 97 | 3. Bin Update Rules (Integration) | TC-BNU-011 | Cancelling a voucher restores the Actual Qty | Stock data prepared; the source voucher type is submitted from its own module | 1. Cancel a submitted Material Receipt
2. Open the Bin | +12 cancelled | Actual Qty returns to the previous value | High | Positive | - |
| 98 | 3. Bin Update Rules (Integration) | TC-BNU-012 | Draft vouchers do not change the Bin | Stock data prepared; the source voucher type is submitted from its own module | 1. Save a Draft Material Receipt
2. Open the Bin | Draft | The Bin values do not change | High | Negative | - |
| 99 | 3. Bin Update Rules (Integration) | TC-BNU-013 | Backdated voucher recalculates the Bin | Stock data prepared; the source voucher type is submitted from its own module | 1. Submit a voucher with a past posting date
2. Open the Bin | Backdated receipt +5 | The current Actual Qty and Stock Value include the backdated quantity | Medium | Positive | - |
| 100 | 3. Bin Update Rules (Integration) | TC-BNU-014 | Actual Qty always equals the sum of the ledger entries | Stock data prepared; the source voucher type is submitted from its own module | 1. Perform several vouchers for one item and warehouse
2. Compare Bin Actual Qty with the ledger sum | +12, -6, +4 | Actual Qty equals 10 | High | Positive | - |
| 101 | 3. Bin Update Rules (Integration) | TC-BNU-015 | Stock Reservation Entry reduces the Available Qty | Stock data prepared; the source voucher type is submitted from its own module | 1. Reserve 4 units from a Sales Order
2. Open the Bin | Actual 10 | Available Qty shows 6 and Reserved Stock shows 4 | High | Positive | - |
| 102 | 3. Bin Update Rules (Integration) | TC-BNU-016 | Bin of an item in several warehouses | Stock data prepared; the source voucher type is submitted from its own module | 1. Hold the same item in two warehouses
2. Open the Bin list | Stores - E 10; Finished Goods - E 5 | Two Bins exist, one per warehouse, with their own quantities | High | Positive | - |
| 103 | 3. Bin Update Rules (Integration) | TC-BNU-017 | Concurrent vouchers on the same Bin | Stock data prepared; the source voucher type is submitted from its own module | 1. Submit two issues of the same item at the same time | Stock 10; two issues of 8 | The second one fails with an insufficient stock error; the Bin never becomes negative | Medium | Negative | Needs Clarification: Not defined in the SRS. |
## Sheet: Summary
| Test Cases Summary |  |  |  |
| --- | --- | --- | --- |
| Module / Screen | Number of Test Cases |  |  |
| 1. Bin List Screen |  |  |  |
| 2. Bin Details Screen |  |  |  |
| 3. Bin Update Rules (Integration) |  |  |  |
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