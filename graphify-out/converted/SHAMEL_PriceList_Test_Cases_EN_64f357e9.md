<!-- converted from SHAMEL_PriceList_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Selling Module | Test Cases - Price List |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Selling Module - Price List) |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Price List Screen | TC-PLL-001 | Display the Price List list | Access via Selling > Price List | 1. Click Selling from the side menu
2. Click Price List | - | A table listing all Price Lists in the system is displayed | High | Positive | - |
| 2 | 1. Price List Screen | TC-PLL-002 | Add Price List button is displayed | Access via Selling > Price List | Verify the Add Price List button on the list screen | - | The Add Price List button is visible and clickable | Medium | UI | - |
| 3 | 1. Price List Screen | TC-PLL-003 | Navigate to the Add Price List screen | Access via Selling > Price List | Click Add Price List | - | The user is redirected to the Add Price List screen | High | Positive | - |
| 4 | 1. Price List Screen | TC-PLL-004 | Display checkbox column for row selection | Access via Selling > Price List | Open the list | - | A checkbox is displayed next to each row and supports multiple selection | Low | UI | - |
| 5 | 1. Price List Screen | TC-PLL-005 | Display ID column | Access via Selling > Price List | Open the list | - | The Price List ID is displayed for each row as a clickable link | Medium | UI | - |
| 6 | 1. Price List Screen | TC-PLL-006 | Navigate to Details by clicking the ID | Access via Selling > Price List | Click a Price List ID in the table | Standard Selling | The Price List Details screen of the selected record is displayed | High | Positive | - |
| 7 | 1. Price List Screen | TC-PLL-007 | Display Status column | Access via Selling > Price List | Open the list and review the Status column | - | Each row shows exactly one value: Enabled or Disabled | High | Positive | - |
| 8 | 1. Price List Screen | TC-PLL-008 | Status Enabled for an enabled price list | Access via Selling > Price List | Review the row of an enabled price list | Enabled checked | Status = Enabled | Medium | Positive | - |
| 9 | 1. Price List Screen | TC-PLL-009 | Status Disabled for a disabled price list | Access via Selling > Price List | Review the row of a disabled price list | Enabled unchecked | Status = Disabled | Medium | Positive | - |
| 10 | 1. Price List Screen | TC-PLL-010 | Display Currency column | Access via Selling > Price List | Open the list | SAR, USD | The currency of each price list is displayed | Medium | UI | - |
| 11 | 1. Price List Screen | TC-PLL-011 | Display Buying column | Access via Selling > Price List | Open the list | - | A read-only checkbox label shows whether the price list is for Buying | Medium | UI | Needs Clarification: SRS describes Buying as 'Checkbox label (read only)' but Selling only as 'Checkbox label'. Confirm both are read only in the list. |
| 12 | 1. Price List Screen | TC-PLL-012 | Display Selling column | Access via Selling > Price List | Open the list | - | A checkbox label shows whether the price list is for Selling | Medium | UI | - |
| 13 | 1. Price List Screen | TC-PLL-013 | Buying and Selling flags match the saved record | Access via Selling > Price List | Compare a row with its Details screen | Buying checked, Selling unchecked | The Buying and Selling columns match the Details screen | Medium | Positive | - |
| 14 | 1. Price List Screen | TC-PLL-014 | List displays only the columns defined in the SRS | Access via Selling > Price List | Review the list header | - | The columns are: Checkbox, ID, Status, Currency, Buying, Selling | Medium | UI | - |
| 15 | 1. Price List Screen | TC-PLL-015 | System-defined Standard Selling and Standard Buying exist | Access via Selling > Price List | Open the list of a new system | - | The price lists 'Standard Selling' and 'Standard Buying' are listed | Medium | Positive | - |
| 16 | 1. Price List Screen | TC-PLL-016 | Newly added price list appears in the list | Access via Selling > Price List | 1. Add a new Price List
2. Return to the list | Retail 2026 | The new price list is displayed with the entered values | High | Positive | - |
| 17 | 1. Price List Screen | TC-PLL-017 | List displays an empty state when no price lists exist | Access via Selling > Price List | Open the list when no price list matches the filter | - | An empty-state message / empty table is displayed with no error | Low | UI | Needs Clarification: SRS does not define the empty state. |
| 18 | 1. Price List Screen | TC-PLL-018 | Action bar appears when one row is selected | Access via Selling > Price List | Select the checkbox of one price list | - | An action bar appears showing the available actions | High | Positive | - |
| 19 | 1. Price List Screen | TC-PLL-019 | Action bar appears when multiple rows are selected | Access via Selling > Price List | Select the checkboxes of three price lists | - | The action bar is displayed and applies to the selected rows | Medium | Positive | - |
| 20 | 1. Price List Screen | TC-PLL-020 | Action bar disappears when all rows are deselected | Access via Selling > Price List | 1. Select one price list
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 21 | 1. Price List Screen | TC-PLL-021 | Action bar contains the required actions | Access via Selling > Price List | Select a price list and review the action bar | - | The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete | Medium | UI | - |
| 22 | 1. Price List Screen | TC-PLL-022 | Open the Edit popup | Access via Selling > Price List | 1. Select a price list
2. Click Edit | - | A popup is displayed containing the Field dropdown and the Value field | High | Positive | - |
| 23 | 1. Price List Screen | TC-PLL-023 | Field dropdown is a single-selection list of Price List fields | Access via Selling > Price List | 1. Open the Edit popup
2. Open the Field dropdown
3. Try to select two options | - | The dropdown lists the fields of the Price List doctype and allows selecting only one option | Medium | Positive | - |
| 24 | 1. Price List Screen | TC-PLL-024 | Click Update without selecting a Field | Access via Selling > Price List | 1. Open the Edit popup
2. Leave Field empty
3. Click the confirm button | - | An error message is displayed because Field is mandatory | Medium | Negative | Needs Clarification: SRS does not name the popup confirm button nor its error text. |
| 25 | 1. Price List Screen | TC-PLL-025 | Value input changes type based on the selected Field (checkbox) | Access via Selling > Price List | 1. Open the Edit popup
2. Select Field = Enabled | Field: Enabled | The Value field becomes a checkbox / Yes-No selector | Medium | Positive | - |
| 26 | 1. Price List Screen | TC-PLL-026 | Value input changes type based on the selected Field (text) | Access via Selling > Price List | 1. Open the Edit popup
2. Select Field = Price List Name | Field: Price List Name | The Value field becomes a text input | Medium | Positive | - |
| 27 | 1. Price List Screen | TC-PLL-027 | Value input changes type based on the selected Field (link) | Access via Selling > Price List | 1. Open the Edit popup
2. Select Field = Currency | Field: Currency | The Value field becomes a searchable dropdown of currencies | Medium | Positive | - |
| 28 | 1. Price List Screen | TC-PLL-028 | Value is mandatory for a mandatory Field | Access via Selling > Price List | 1. Open the Edit popup
2. Select Field = Currency
3. Leave Value empty
4. Click the confirm button | Field: Currency | An error message is displayed because the Value is mandatory for this field | Medium | Negative | - |
| 29 | 1. Price List Screen | TC-PLL-029 | Value validation rules follow the selected Field | Access via Selling > Price List | 1. Open the Edit popup
2. Select Field = Price List Name
3. Enter a single character
4. Click the confirm button | Price List Name: A | A minimum length (2 characters) error message is displayed | High | Negative | - |
| 30 | 1. Price List Screen | TC-PLL-030 | Bulk edit disables several price lists | Access via Selling > Price List | 1. Select two price lists
2. Click Edit
3. Select Field = Enabled
4. Set the value to unchecked
5. Confirm | Enabled: unchecked | Both price lists become Disabled | High | Positive | Needs Clarification: SRS does not define the success message or the result when one record fails. |
| 31 | 1. Price List Screen | TC-PLL-031 | Bulk edit of Currency on a price list that already has item prices | Access via Selling > Price List | 1. Select a price list that has Item Prices
2. Click Edit
3. Select Field = Currency
4. Pick another currency
5. Confirm | Currency: USD | The system either updates the Currency or blocks the change with an error message | Medium | Negative | Needs Clarification: SRS does not say whether the Currency can be changed after item prices exist. |
| 32 | 1. Price List Screen | TC-PLL-032 | Export the selected price lists | Access via Selling > Price List | Select two price lists and click Export | - | The selected price lists are exported to a file | Medium | Positive | - |
| 33 | 1. Price List Screen | TC-PLL-033 | Assign the selected price list to a user | Access via Selling > Price List | 1. Select a price list
2. Click Assign to
3. Choose a user | - | The price list is assigned to the selected user | Medium | Positive | - |
| 34 | 1. Price List Screen | TC-PLL-034 | Clear the assignment of the selected price list | Access via Selling > Price List | 1. Assign a price list
2. Select it and click Clear assignment | - | The assignment is removed | Medium | Positive | - |
| 35 | 1. Price List Screen | TC-PLL-035 | Add a tag to the selected price list | Access via Selling > Price List | 1. Select a price list
2. Click Add tags
3. Add a tag | Tag: Retail | The tag is added to the price list | Low | Positive | - |
| 36 | 1. Price List Screen | TC-PLL-036 | Print the selected price list | Access via Selling > Price List | Select a price list and click Print | - | The print view of the selected price list is displayed | Low | Positive | - |
| 37 | 1. Price List Screen | TC-PLL-037 | Delete confirmation message is displayed | Access via Selling > Price List | 1. Select an unlinked price list
2. Click Delete | - | A confirmation message asks whether the user wants to delete this Price List | High | Positive | - |
| 38 | 1. Price List Screen | TC-PLL-038 | Cancel the delete confirmation | Access via Selling > Price List | 1. Select a price list
2. Click Delete
3. Choose No / Cancel | - | The price list is not deleted | Medium | Positive | - |
| 39 | 1. Price List Screen | TC-PLL-039 | Delete an unlinked price list | Access via Selling > Price List | 1. Select an unlinked price list
2. Click Delete
3. Click Yes | Retail 2026 | The price list is deleted successfully and removed from the list | High | Positive | - |
| 40 | 1. Price List Screen | TC-PLL-040 | Delete a price list linked to other transactions | Access via Selling > Price List | 1. Select a price list used in a Sales Order, Customer or Item Price
2. Click Delete
3. Click Yes | Standard Selling | A message informs the user that the linked transactions must be deleted first | High | Negative | - |
| 41 | 1. Price List Screen | TC-PLL-041 | Linked doctypes in the warning message are hyperlinks | Access via Selling > Price List | 1. Delete a linked price list
2. Click a doctype in the warning | - | The user is redirected to the corresponding doctype list | Medium | Positive | - |
| 42 | 1. Price List Screen | TC-PLL-042 | Delete the system-defined Standard Selling price list | Access via Selling > Price List | 1. Select Standard Selling
2. Click Delete
3. Click Yes | Standard Selling | The delete is allowed or blocked according to the BA rule | Medium | Negative | Needs Clarification: SRS note says the system-defined 'Standard Selling' and 'Standard Buying' can be edited or deleted, which is unusual for system lists. Confirm. |
| 43 | 1. Price List Screen | TC-PLL-043 | Search the list by price list name | Access via Selling > Price List | Search for a price list in the list search box | Standard | Only matching price lists are displayed | Medium | Positive | Needs Clarification: SRS does not describe search, filter, sort or paging for this list. |
| 44 | 1. Price List Screen | TC-PLL-044 | Filter the list by Status | Access via Selling > Price List | Filter by Status = Disabled | - | Only disabled price lists are displayed | Medium | Positive | - |
| 45 | 2. Add Price List Screen | TC-PLA-001 | Display all fields of the Add Price List screen | Access via Selling > Price List > Add Price List | Open the Add Price List screen | - | The screen shows: Enabled, Price List Name, Currency, Buying, Selling, Price Not UOM Dependent, Applicable for Countries table, Add / Edit Prices, Save | High | UI | - |
| 46 | 2. Add Price List Screen | TC-PLA-002 | Mandatory fields are marked | Access via Selling > Price List > Add Price List | Review the field labels | - | Price List Name and Currency are marked mandatory | Medium | UI | - |
| 47 | 2. Add Price List Screen | TC-PLA-003 | Add a price list with all valid fields | Access via Selling > Price List > Add Price List | 1. Enter Price List Name
2. Select Currency
3. Check Selling
4. Click Save | Retail 2026 / SAR / Selling | The price list is saved and displayed in the list | High | Positive | - |
| 48 | 2. Add Price List Screen | TC-PLA-004 | Add a price list with only mandatory fields | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Click Save | Retail 2026 / SAR | The price list is saved (see the clarification on Buying / Selling) | High | Positive | Needs Clarification: SRS does not say whether at least one of Buying / Selling must be checked. Confirm. |
| 49 | 2. Add Price List Screen | TC-PLA-005 | Enabled is checked by default | Access via Selling > Price List > Add Price List | Open the Add screen and review Enabled | - | Enabled is checked by default | High | Positive | - |
| 50 | 2. Add Price List Screen | TC-PLA-006 | Enabled checked - price list is available in transactions | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Keep Enabled checked
3. Check Selling
4. Save
5. Open a new Sales Order and open the Price List dropdown | Retail 2026 | The new price list is available in the transaction | High | Positive | - |
| 51 | 2. Add Price List Screen | TC-PLA-007 | Enabled unchecked - price list is not available in new transactions | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Uncheck Enabled
3. Check Selling
4. Save
5. Open a new Sales Order and open the Price List dropdown | Retail 2026 | The disabled price list is not available in the new transaction | High | Positive | - |
| 52 | 2. Add Price List Screen | TC-PLA-008 | Enabled unchecked - saved price list shows Disabled in the list | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Uncheck Enabled
3. Save
4. Open the list | Retail 2026 | Status = Disabled | Medium | Positive | - |
| 53 | 2. Add Price List Screen | TC-PLA-009 | Price List Name - valid text | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Save | Retail 2026 | The price list is saved | High | Positive | - |
| 54 | 2. Add Price List Screen | TC-PLA-010 | Price List Name - minimum length (2 characters) | Access via Selling > Price List > Add Price List | 1. Enter 2 characters in Price List Name
2. Select Currency
3. Save | AB | The price list is saved | Medium | Positive | - |
| 55 | 2. Add Price List Screen | TC-PLA-011 | Price List Name - below minimum length (1 character) | Access via Selling > Price List > Add Price List | 1. Enter 1 character in Price List Name
2. Select Currency
3. Save | A | A minimum length error message is displayed and the price list is not saved | High | Negative | - |
| 56 | 2. Add Price List Screen | TC-PLA-012 | Price List Name - maximum length (100 characters) | Access via Selling > Price List > Add Price List | 1. Enter 100 characters in Price List Name
2. Select Currency
3. Save | 100 x A | The price list is saved | Medium | Positive | - |
| 57 | 2. Add Price List Screen | TC-PLA-013 | Price List Name - input is blocked beyond 100 characters | Access via Selling > Price List > Add Price List | Paste 105 characters in Price List Name | 105 x A | The field keeps only the first 100 characters | Medium | Negative | - |
| 58 | 2. Add Price List Screen | TC-PLA-014 | Price List Name - empty | Access via Selling > Price List > Add Price List | 1. Leave Price List Name empty
2. Select Currency
3. Save | - | An error message is displayed for Price List Name | High | Negative | - |
| 59 | 2. Add Price List Screen | TC-PLA-015 | Price List Name - whitespace only | Access via Selling > Price List > Add Price List | 1. Enter spaces only in Price List Name
2. Select Currency
3. Save | 5 spaces | An error message is displayed and the price list is not saved | Medium | Negative | - |
| 60 | 2. Add Price List Screen | TC-PLA-016 | Price List Name - leading and trailing spaces | Access via Selling > Price List > Add Price List | 1. Enter ' Retail 2026 ' in Price List Name
2. Select Currency
3. Save |  Retail 2026  | The name is saved without leading or trailing spaces, or an error is displayed | Low | Positive | Needs Clarification: SRS does not define trimming. |
| 61 | 2. Add Price List Screen | TC-PLA-017 | Price List Name - letters, numbers and special characters | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Save | Retail-2026 #1 (VIP) & | The price list is saved with the special characters | Medium | Positive | - |
| 62 | 2. Add Price List Screen | TC-PLA-018 | Price List Name - Arabic characters | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Save | قائمة أسعار التجزئة | The price list is saved and displayed correctly in the list | Medium | Positive | - |
| 63 | 2. Add Price List Screen | TC-PLA-019 | Price List Name - duplicate name | Access via Selling > Price List > Add Price List | 1. Enter the name of an existing price list
2. Select Currency
3. Save | Standard Selling | An error message is displayed and the price list is not saved | High | Negative | Needs Clarification: SRS does not define uniqueness or the duplicate-name message. |
| 64 | 2. Add Price List Screen | TC-PLA-020 | Price List Name - duplicate with different letter case | Access via Selling > Price List > Add Price List | 1. Enter 'standard selling' as Price List Name
2. Select Currency
3. Save | standard selling | The system rejects the duplicate or accepts it according to the BA rule | Low | Negative | Needs Clarification: SRS does not define case sensitivity. |
| 65 | 2. Add Price List Screen | TC-PLA-021 | Price List Name - invalid name error | Access via Selling > Price List > Add Price List | 1. Enter an invalid name (only symbols)
2. Select Currency
3. Save | @@@@ | An error message is displayed for the invalid name | Medium | Negative | Needs Clarification: SRS says 'An error message will appear if an invalid item name is entered' (copied from Item) and does not define what is invalid. |
| 66 | 2. Add Price List Screen | TC-PLA-022 | Currency - searchable dropdown | Access via Selling > Price List > Add Price List | 1. Click the Currency field
2. Type part of a currency code | SA | The list is filtered while typing and SAR is displayed | High | Positive | - |
| 67 | 2. Add Price List Screen | TC-PLA-023 | Currency - single selection | Access via Selling > Price List > Add Price List | 1. Select SAR
2. Select USD | - | Only the last selected currency (USD) is kept | Medium | Positive | - |
| 68 | 2. Add Price List Screen | TC-PLA-024 | Currency - empty | Access via Selling > Price List > Add Price List | 1. Enter Price List Name
2. Leave Currency empty
3. Save | - | An error message is displayed for Currency | High | Negative | - |
| 69 | 2. Add Price List Screen | TC-PLA-025 | Currency - search with no match | Access via Selling > Price List > Add Price List | Type a text that matches no currency | ZZZZ | No result is displayed and no error occurs | Low | Negative | - |
| 70 | 2. Add Price List Screen | TC-PLA-026 | Currency - only enabled currencies are listed | Access via Selling > Price List > Add Price List | Open the Currency dropdown | - | Only enabled currencies are offered | Medium | Positive | Needs Clarification: SRS does not say whether disabled currencies are listed. |
| 71 | 2. Add Price List Screen | TC-PLA-027 | Currency - non-existing value is rejected | Access via Selling > Price List > Add Price List | Type a currency that does not exist and press Save | XYZ | The value is not accepted and an error message is displayed | Medium | Negative | - |
| 72 | 2. Add Price List Screen | TC-PLA-028 | Currency - default value | Access via Selling > Price List > Add Price List | Open the Add screen and review Currency | - | Currency is empty (no default) or follows the company default currency | Low | Positive | Needs Clarification: SRS does not define a default currency. |
| 73 | 2. Add Price List Screen | TC-PLA-029 | Buying - checked | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Check Buying
3. Save | Buying checked | The price list is saved with Buying checked and is used in purchasing transactions | High | Positive | - |
| 74 | 2. Add Price List Screen | TC-PLA-030 | Selling - checked | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Check Selling
3. Save | Selling checked | The price list is saved with Selling checked and is used in selling transactions | High | Positive | - |
| 75 | 2. Add Price List Screen | TC-PLA-031 | Buying and Selling - both checked | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Check Buying and Selling
3. Save | Both checked | The price list is saved and is available in both purchasing and selling transactions | Medium | Positive | - |
| 76 | 2. Add Price List Screen | TC-PLA-032 | Buying and Selling - none checked | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Leave Buying and Selling unchecked
3. Save | None | The price list is saved, or an error asks to select Buying or Selling | High | Negative | Needs Clarification: SRS does not say whether one of the two is required. |
| 77 | 2. Add Price List Screen | TC-PLA-033 | Selling price list is listed in a Sales Order | Access via Selling > Price List > Add Price List | 1. Save a price list with Selling checked
2. Open a new Sales Order | - | The price list can be selected in the Sales Order | High | Positive | - |
| 78 | 2. Add Price List Screen | TC-PLA-034 | Buying-only price list is not listed in a Sales Order | Access via Selling > Price List > Add Price List | 1. Save a price list with only Buying checked
2. Open a new Sales Order | - | The price list is not offered in the Sales Order | Medium | Negative | - |
| 79 | 2. Add Price List Screen | TC-PLA-035 | Price Not UOM Dependent - unchecked by default | Access via Selling > Price List > Add Price List | Open the Add screen | - | Price Not UOM Dependent is unchecked | Low | Positive | Needs Clarification: SRS does not state the default. |
| 80 | 2. Add Price List Screen | TC-PLA-036 | Price Not UOM Dependent - checked keeps the same price for any UOM | Access via Selling > Price List > Add Price List | 1. Save a price list with Price Not UOM Dependent checked
2. Add an item price of 100 for UOM Nos
3. Sell the item in Box (12 Nos) | Price 100 | The price stays 100 for the Box UOM (no conversion) | High | Positive | - |
| 81 | 2. Add Price List Screen | TC-PLA-037 | Price Not UOM Dependent - unchecked adjusts the price by the UOM conversion factor | Access via Selling > Price List > Add Price List | 1. Save a price list with Price Not UOM Dependent unchecked
2. Add an item price of 100 for UOM Nos
3. Sell the item in Box (12 Nos) | Price 100 / factor 12 | The price is converted to 1,200 for the Box UOM | High | Positive | - |
| 82 | 2. Add Price List Screen | TC-PLA-038 | Applicable for Countries table - display | Access via Selling > Price List > Add Price List | Open the Add screen and review the table | - | The table has a checkbox column, No. and Country columns, Setting, Add Row | Medium | UI | - |
| 83 | 2. Add Price List Screen | TC-PLA-039 | Applicable for Countries - Add Row | Access via Selling > Price List > Add Price List | Click Add Row | - | A new row is added with the next No. | High | Positive | - |
| 84 | 2. Add Price List Screen | TC-PLA-040 | Applicable for Countries - Country is a searchable single-selection dropdown | Access via Selling > Price List > Add Price List | 1. Add a row
2. Type part of a country name | Saudi | The list is filtered and only one country can be selected | Medium | Positive | - |
| 85 | 2. Add Price List Screen | TC-PLA-041 | Applicable for Countries - Country empty | Access via Selling > Price List > Add Price List | 1. Add a row
2. Leave Country empty
3. Save | - | An error message is displayed for Country | High | Negative | - |
| 86 | 2. Add Price List Screen | TC-PLA-042 | Applicable for Countries - save with several countries | Access via Selling > Price List > Add Price List | 1. Add two rows
2. Select Saudi Arabia and Egypt
3. Save | Saudi Arabia, Egypt | The price list is saved with both countries | High | Positive | - |
| 87 | 2. Add Price List Screen | TC-PLA-043 | Applicable for Countries - duplicate country | Access via Selling > Price List > Add Price List | 1. Add two rows
2. Select the same country in both
3. Save | Saudi Arabia x2 | An error message is displayed for the duplicate country | Medium | Negative | Needs Clarification: SRS does not define duplicates in the Country table. |
| 88 | 2. Add Price List Screen | TC-PLA-044 | Applicable for Countries - empty table is allowed | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and select Currency
2. Do not add any country
3. Save | - | The price list is saved (applies to all countries) | Medium | Positive | Needs Clarification: SRS does not say the table is optional. |
| 89 | 2. Add Price List Screen | TC-PLA-045 | Applicable for Countries - row numbers | Access via Selling > Price List > Add Price List | 1. Add three rows
2. Delete the second row | - | The No. column is re-ordered 1, 2 | Low | Positive | - |
| 90 | 2. Add Price List Screen | TC-PLA-046 | Applicable for Countries - select rows shows the action bar | Access via Selling > Price List > Add Price List | 1. Add a row
2. Select its checkbox | - | An action bar with Delete row appears | Medium | Positive | - |
| 91 | 2. Add Price List Screen | TC-PLA-047 | Applicable for Countries - Delete row | Access via Selling > Price List > Add Price List | 1. Add two rows
2. Select one
3. Click Delete row | - | The selected row is removed | High | Positive | - |
| 92 | 2. Add Price List Screen | TC-PLA-048 | Applicable for Countries - delete several rows | Access via Selling > Price List > Add Price List | 1. Add three rows
2. Select two
3. Click Delete row | - | Both selected rows are removed | Medium | Positive | - |
| 93 | 2. Add Price List Screen | TC-PLA-049 | Applicable for Countries - Edit Row popup | Access via Selling > Price List > Add Price List | 1. Add a row
2. Click the Edit Row icon | - | A popup is displayed with the Country field (searchable, single selection, mandatory) | Medium | Positive | - |
| 94 | 2. Add Price List Screen | TC-PLA-050 | Applicable for Countries - Edit Row saves the country | Access via Selling > Price List > Add Price List | 1. Open the Edit Row popup
2. Select a country
3. Close the popup | Egypt | The row shows the selected country | Medium | Positive | - |
| 95 | 2. Add Price List Screen | TC-PLA-051 | Applicable for Countries - Edit Row with an empty Country | Access via Selling > Price List > Add Price List | 1. Open the Edit Row popup
2. Leave Country empty
3. Close the popup
4. Save | - | An error message is displayed for Country | Medium | Negative | - |
| 96 | 2. Add Price List Screen | TC-PLA-052 | Table Setting - popup options | Access via Selling > Price List > Add Price List | Click Setting on the table | - | A popup is displayed with reorder, column width, Add / Remove columns, Update and Reset to default | Medium | UI | - |
| 97 | 2. Add Price List Screen | TC-PLA-053 | Table Setting - Column width accepts numbers only | Access via Selling > Price List > Add Price List | 1. Open Setting
2. Type letters in Column width | abc | Letters are not accepted | Medium | Negative | - |
| 98 | 2. Add Price List Screen | TC-PLA-054 | Table Setting - Column width default value | Access via Selling > Price List > Add Price List | Open Setting and review Column width | - | The default value is 3 | Low | UI | - |
| 99 | 2. Add Price List Screen | TC-PLA-055 | Table Setting - Column width minimum length (1 character) | Access via Selling > Price List > Add Price List | 1. Open Setting
2. Enter 1 digit
3. Update | 5 | The value is accepted | Low | Positive | - |
| 100 | 2. Add Price List Screen | TC-PLA-056 | Table Setting - Column width below minimum (empty) | Access via Selling > Price List > Add Price List | 1. Open Setting
2. Clear Column width
3. Update | - | An error message is displayed or the default is restored | Medium | Negative | Needs Clarification: SRS does not define the error for an empty width. |
| 101 | 2. Add Price List Screen | TC-PLA-057 | Table Setting - Column width maximum length (3 characters) | Access via Selling > Price List > Add Price List | 1. Open Setting
2. Enter 3 digits
3. Update | 300 | The value is accepted | Low | Positive | - |
| 102 | 2. Add Price List Screen | TC-PLA-058 | Table Setting - Column width blocked beyond 3 characters | Access via Selling > Price List > Add Price List | 1. Open Setting
2. Type 5 digits | 12345 | The field keeps only 3 digits | Low | Negative | - |
| 103 | 2. Add Price List Screen | TC-PLA-059 | Table Setting - Column width zero | Access via Selling > Price List > Add Price List | 1. Open Setting
2. Enter 0
3. Update | 0 | An error message is displayed or the value is rejected | Low | Negative | Needs Clarification: SRS does not define the valid range, only the length. |
| 104 | 2. Add Price List Screen | TC-PLA-060 | Table Setting - Add / Remove columns popup | Access via Selling > Price List > Add Price List | 1. Open Setting
2. Click Add / Remove columns | - | A popup lists all available columns (Country) with checkboxes | Medium | Positive | - |
| 105 | 2. Add Price List Screen | TC-PLA-061 | Table Setting - hide the Country column | Access via Selling > Price List > Add Price List | 1. Open Add / Remove columns
2. Uncheck Country
3. Update | - | The Country column is hidden from the table | Medium | Positive | - |
| 106 | 2. Add Price List Screen | TC-PLA-062 | Table Setting - show the Country column again | Access via Selling > Price List > Add Price List | 1. Hide the column
2. Check it again
3. Update | - | The Country column is displayed again | Medium | Positive | - |
| 107 | 2. Add Price List Screen | TC-PLA-063 | Table Setting - reorder columns by drag and drop | Access via Selling > Price List > Add Price List | 1. Open Setting
2. Drag the Country column header to another position | - | The column moves to the new position | Low | Positive | - |
| 108 | 2. Add Price List Screen | TC-PLA-064 | Table Setting - Update saves the changes | Access via Selling > Price List > Add Price List | 1. Change the column width
2. Click Update | Width 5 | The new width is applied to the table | Medium | Positive | - |
| 109 | 2. Add Price List Screen | TC-PLA-065 | Table Setting - Reset to default | Access via Selling > Price List > Add Price List | 1. Change the column width
2. Click Reset to default | - | All table settings return to the default values | Medium | Positive | - |
| 110 | 2. Add Price List Screen | TC-PLA-066 | Add / Edit Prices button is displayed | Access via Selling > Price List > Add Price List | Open the Add screen | - | The Add / Edit Prices button is visible | Medium | UI | - |
| 111 | 2. Add Price List Screen | TC-PLA-067 | Add / Edit Prices navigates to Item Price | Access via Selling > Price List > Add Price List | 1. Save a price list
2. Click Add / Edit Prices | Retail 2026 | The user is navigated to the Item Price screen for this price list | High | Positive | - |
| 112 | 2. Add Price List Screen | TC-PLA-068 | Add / Edit Prices on an unsaved price list | Access via Selling > Price List > Add Price List | 1. Enter Price List Name and Currency
2. Do not save
3. Click Add / Edit Prices | - | The user is asked to save first, or the unsaved data is kept according to the BA rule | Medium | Negative | Needs Clarification: SRS does not define the behavior on an unsaved price list. |
| 113 | 2. Add Price List Screen | TC-PLA-069 | Save - empty form | Access via Selling > Price List > Add Price List | 1. Open the Add screen
2. Click Save | - | A validation error message is displayed for Price List Name and Currency and nothing is saved | High | Negative | - |
| 114 | 2. Add Price List Screen | TC-PLA-070 | Save - multiple invalid fields show one error per field | Access via Selling > Price List > Add Price List | 1. Enter 1 character in Price List Name
2. Leave Currency empty
3. Add a country row without a Country
4. Save | - | An error message is displayed for each invalid field | High | Negative | - |
| 115 | 2. Add Price List Screen | TC-PLA-071 | Save - the price list is not created when validation fails | Access via Selling > Price List > Add Price List | 1. Fill invalid data
2. Click Save
3. Open the list | - | No new price list is created | High | Negative | - |
| 116 | 2. Add Price List Screen | TC-PLA-072 | Save - data is kept in the form after a validation error | Access via Selling > Price List > Add Price List | 1. Fill Price List Name with 1 character
2. Leave Currency empty
3. Click Save | - | The entered values are kept in the form | Medium | Positive | - |
| 117 | 2. Add Price List Screen | TC-PLA-073 | Save - double click does not create duplicates | Access via Selling > Price List > Add Price List | 1. Fill valid data
2. Double-click Save | - | Only one price list is created | Medium | Negative | - |
| 118 | 2. Add Price List Screen | TC-PLA-074 | Save - the saved data matches the entered data | Access via Selling > Price List > Add Price List | 1. Save a price list with all fields
2. Open its Details screen | - | All entered values are displayed unchanged | High | Positive | - |
| 119 | 2. Add Price List Screen | TC-PLA-075 | Save - the new price list is displayed in the list | Access via Selling > Price List > Add Price List | 1. Save a price list
2. Open the list | - | The new price list is listed with Status, Currency, Buying and Selling | High | Positive | - |
| 120 | 2. Add Price List Screen | TC-PLA-076 | Leave the screen with unsaved data | Access via Selling > Price List > Add Price List | 1. Fill some fields
2. Navigate away without saving | - | A warning is displayed, or the data is discarded according to the BA rule | Low | Negative | Needs Clarification: SRS does not define the unsaved changes warning. |
| 121 | 2. Add Price List Screen | TC-PLA-077 | Mandatory field messages are localized | Access via Selling > Price List > Add Price List | Switch the language to Arabic and click Save on an empty form | - | The error messages are displayed in Arabic | Low | UI | - |
| 122 | 3. Price List Details Screen | TC-PLD-001 | Open the Details screen | Access via Selling > Price List > click a Price List ID | Click a Price List ID in the list | Retail 2026 | The Price List Details screen is displayed | High | Positive | - |
| 123 | 3. Price List Details Screen | TC-PLD-002 | Details display the data entered at creation | Access via Selling > Price List > click a Price List ID | Open a saved price list | - | Enabled, Name, Currency, Buying, Selling, Price Not UOM Dependent and the countries are displayed as saved | High | Positive | - |
| 124 | 3. Price List Details Screen | TC-PLD-003 | Fixed page actions are displayed | Access via Selling > Price List > click a Price List ID | Review the top of the Details screen | - | The buttons Assign, Attachment, Tags, Share, Print and Delete are displayed | High | UI | - |
| 125 | 3. Price List Details Screen | TC-PLD-004 | Fixed page actions stay visible when scrolling | Access via Selling > Price List > click a Price List ID | Scroll down a price list with many country rows | - | The action buttons remain visible | Low | UI | - |
| 126 | 3. Price List Details Screen | TC-PLD-005 | Edit Price List Name | Access via Selling > Price List > click a Price List ID | 1. Change the name
2. Save | Retail 2027 | The name is updated and displayed in the list | High | Positive | Needs Clarification: SRS does not say whether the Price List Name can be edited on the Details screen (in ERPNext it is the record ID). |
| 127 | 3. Price List Details Screen | TC-PLD-006 | Edit Price List Name below minimum length | Access via Selling > Price List > click a Price List ID | 1. Change the name to 1 character
2. Save | A | A minimum length error message is displayed | Medium | Negative | - |
| 128 | 3. Price List Details Screen | TC-PLD-007 | Edit Price List Name - empty | Access via Selling > Price List > click a Price List ID | 1. Clear the name
2. Save | - | An error message is displayed for Price List Name | Medium | Negative | - |
| 129 | 3. Price List Details Screen | TC-PLD-008 | Edit Price List Name to a duplicate value | Access via Selling > Price List > click a Price List ID | 1. Change the name to an existing name
2. Save | Standard Selling | An error message is displayed | Medium | Negative | - |
| 130 | 3. Price List Details Screen | TC-PLD-009 | Disable an enabled price list | Access via Selling > Price List > click a Price List ID | 1. Uncheck Enabled
2. Save | - | The price list becomes Disabled and is not offered in new transactions | High | Positive | - |
| 131 | 3. Price List Details Screen | TC-PLD-010 | Enable a disabled price list | Access via Selling > Price List > click a Price List ID | 1. Check Enabled
2. Save | - | The price list becomes Enabled and is available in new transactions | High | Positive | - |
| 132 | 3. Price List Details Screen | TC-PLD-011 | Disable a price list used in an existing transaction | Access via Selling > Price List > click a Price List ID | 1. Disable a price list used in a Sales Order
2. Save | - | The price list is disabled and existing documents are not changed | Medium | Positive | Needs Clarification: SRS does not define the effect on existing documents. |
| 133 | 3. Price List Details Screen | TC-PLD-012 | Edit Currency of a price list without item prices | Access via Selling > Price List > click a Price List ID | 1. Select another currency
2. Save | USD | The currency is updated | Medium | Positive | - |
| 134 | 3. Price List Details Screen | TC-PLD-013 | Edit Currency of a price list that has item prices | Access via Selling > Price List > click a Price List ID | 1. Open a price list that has item prices
2. Change the currency
3. Save | USD | The change is blocked with an error message, or the item prices are handled according to the BA rule | High | Negative | Needs Clarification: SRS does not define it. |
| 135 | 3. Price List Details Screen | TC-PLD-014 | Edit Currency - empty | Access via Selling > Price List > click a Price List ID | 1. Clear Currency
2. Save | - | An error message is displayed for Currency | Medium | Negative | - |
| 136 | 3. Price List Details Screen | TC-PLD-015 | Edit Buying and Selling flags | Access via Selling > Price List > click a Price List ID | 1. Change Buying from checked to unchecked
2. Save | - | The change is saved and the list shows the new value | Medium | Positive | - |
| 137 | 3. Price List Details Screen | TC-PLD-016 | Remove Selling from a price list used in a Sales Order | Access via Selling > Price List > click a Price List ID | 1. Uncheck Selling
2. Save | - | The change is saved or blocked according to the BA rule | Medium | Negative | Needs Clarification: SRS does not define the check against existing documents. |
| 138 | 3. Price List Details Screen | TC-PLD-017 | Edit Price Not UOM Dependent | Access via Selling > Price List > click a Price List ID | 1. Change the checkbox
2. Save | - | The change is saved | Medium | Positive | - |
| 139 | 3. Price List Details Screen | TC-PLD-018 | Add a country to a saved price list | Access via Selling > Price List > click a Price List ID | 1. Click Add Row
2. Select a country
3. Save | Egypt | The country is saved in the table | High | Positive | - |
| 140 | 3. Price List Details Screen | TC-PLD-019 | Delete a country row from a saved price list | Access via Selling > Price List > click a Price List ID | 1. Select a row
2. Click Delete row
3. Save | - | The row is removed after Save | High | Positive | - |
| 141 | 3. Price List Details Screen | TC-PLD-020 | Change a country in a saved row | Access via Selling > Price List > click a Price List ID | 1. Open Edit Row
2. Select another country
3. Save | Kuwait | The new country is saved | Medium | Positive | - |
| 142 | 3. Price List Details Screen | TC-PLD-021 | Country table settings are kept after reopening | Access via Selling > Price List > click a Price List ID | 1. Hide a column or change the width
2. Reopen the Details | - | The table settings are kept or reset according to the BA rule | Low | Positive | Needs Clarification: SRS does not say whether table settings persist. |
| 143 | 3. Price List Details Screen | TC-PLD-022 | Add / Edit Prices navigates to Item Price | Access via Selling > Price List > click a Price List ID | Click Add / Edit Prices | - | The user is navigated to the Item Price screen showing the prices of this price list | High | Positive | - |
| 144 | 3. Price List Details Screen | TC-PLD-023 | Save without changes | Access via Selling > Price List > click a Price List ID | Open the Details and click Save without changing anything | - | The save succeeds without an error | Low | Positive | - |
| 145 | 3. Price List Details Screen | TC-PLD-024 | Saved changes persist after reload | Access via Selling > Price List > click a Price List ID | 1. Edit a field
2. Save
3. Reload the page | - | The saved values are displayed | Medium | Positive | - |
| 146 | 3. Price List Details Screen | TC-PLD-025 | Assign the price list to a user | Access via Selling > Price List > click a Price List ID | 1. Click Assign
2. Choose a user | - | The price list is assigned to the user | Medium | Positive | - |
| 147 | 3. Price List Details Screen | TC-PLD-026 | Add an attachment | Access via Selling > Price List > click a Price List ID | 1. Click Attachment
2. Upload a file | price.pdf | The file is attached to the price list | Medium | Positive | - |
| 148 | 3. Price List Details Screen | TC-PLD-027 | Add a tag | Access via Selling > Price List > click a Price List ID | 1. Click Tags
2. Add a tag | Retail | The tag is added | Low | Positive | - |
| 149 | 3. Price List Details Screen | TC-PLD-028 | Share the price list with a user | Access via Selling > Price List > click a Price List ID | 1. Click Share
2. Choose a user | - | The price list is shared with the user | Low | Positive | - |
| 150 | 3. Price List Details Screen | TC-PLD-029 | Print the price list | Access via Selling > Price List > click a Price List ID | Click Print | - | The print view of the price list is displayed | Low | Positive | - |
| 151 | 3. Price List Details Screen | TC-PLD-030 | Delete confirmation message is displayed | Access via Selling > Price List > click a Price List ID | 1. Click Delete on an unlinked price list | - | A confirmation message asks whether the user wants to delete this Price List | High | Positive | - |
| 152 | 3. Price List Details Screen | TC-PLD-031 | Cancel the delete confirmation | Access via Selling > Price List > click a Price List ID | 1. Click Delete
2. Choose No / Cancel | - | The price list is not deleted | Medium | Positive | - |
| 153 | 3. Price List Details Screen | TC-PLD-032 | Delete an unlinked price list | Access via Selling > Price List > click a Price List ID | 1. Click Delete
2. Click Yes | Retail 2026 | The price list is deleted and the user returns to the list | High | Positive | - |
| 154 | 3. Price List Details Screen | TC-PLD-033 | Delete a price list linked to other transactions | Access via Selling > Price List > click a Price List ID | 1. Open a price list used in Item Price / Customer / Sales Order
2. Click Delete
3. Click Yes | Standard Selling | A message informs the user that the linked transactions must be deleted first | High | Negative | - |
| 155 | 3. Price List Details Screen | TC-PLD-034 | Linked doctypes in the warning message are hyperlinks | Access via Selling > Price List > click a Price List ID | 1. Delete a linked price list
2. Click a doctype in the warning | - | The user is redirected to the corresponding doctype list | Medium | Positive | - |
| 156 | 3. Price List Details Screen | TC-PLD-035 | Deleted price list cannot be opened again | Access via Selling > Price List > click a Price List ID | 1. Delete a price list
2. Open its old URL | - | A not-found message is displayed | Low | Negative | - |
| 157 | 3. Price List Details Screen | TC-PLD-036 | Details screen with an invalid ID in the URL | Access via Selling > Price List > click a Price List ID | Open the Details URL with an ID that does not exist | - | A not-found message is displayed and no error page appears | Low | Negative | - |
| 158 | 3. Price List Details Screen | TC-PLD-037 | Details screen layout and labels | Access via Selling > Price List > click a Price List ID | Review the Details screen | - | All labels match the Add screen and nothing is cut off | Low | UI | - |
| 159 | 3. Price List Details Screen | TC-PLD-038 | Details screen in Arabic (RTL) | Access via Selling > Price List > click a Price List ID | Switch the language to Arabic and open the Details | - | The screen is displayed right-to-left with Arabic labels | Low | UI | - |
## Sheet: Summary
| Test Cases Summary |  |
| --- | --- |
| Module / Screen | Number of Test Cases |
| 1. Price List Screen |  |
| 2. Add Price List Screen |  |
| 3. Price List Details Screen |  |
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