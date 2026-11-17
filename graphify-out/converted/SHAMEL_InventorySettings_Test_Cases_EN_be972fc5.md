<!-- converted from SHAMEL_InventorySettings_Test_Cases_EN.xlsx -->

## Sheet: Test Cases
| SHAMEL - Inventory Module | Test Cases - Inventory Settings |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Based on SRS v1.0 - SHAMEL Project (Inventory Settings)  |  |  |  |  |  |  |  |  |  |  |
| # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks |
| 1 | 1. Defaults Tab | TC-ISD-001 | Open the Inventory Settings screen | - | 1. Click Inventory from the side menu
2. Click Inventory Settings | - | The Inventory Settings screen is displayed with the tabs: Defaults, Stock Validations, Item Variant, Serial & Batch Item, Stock Reservation, Quality, Stock Closing | High | Positive | - |
| 2 | 1. Defaults Tab | TC-ISD-002 | Defaults tab sections are displayed | Access via Inventory > Inventory Settings > Defaults tab | Open the Defaults tab | - | The sections are displayed: Item Defaults, Price List Defaults, UOM Defaults, Warehouse Defaults, Auto Material Request and the Save button | High | UI | - |
| 3 | 1. Defaults Tab | TC-ISD-003 | Defaults tab is displayed first or selectable | Access via Inventory > Inventory Settings > Defaults tab | Click the Defaults tab | - | The Defaults tab content is displayed | Medium | Positive | Needs Clarification: SRS does not say which tab opens by default. |
| 4 | 1. Defaults Tab | TC-ISD-004 | Item Naming By - dropdown values | Access via Inventory > Inventory Settings > Defaults tab | Open the Item Naming By dropdown | - | The values are: Item Code, Naming Series | High | Positive | - |
| 5 | 1. Defaults Tab | TC-ISD-005 | Item Naming By - default value is Item Code | Access via Inventory > Inventory Settings > Defaults tab | Open the tab for the first time | - | Item Code is selected by default | High | Positive | - |
| 6 | 1. Defaults Tab | TC-ISD-006 | Item Naming By - single selection | Access via Inventory > Inventory Settings > Defaults tab | 1. Select Naming Series
2. Select Item Code | - | Only one value is kept at a time | Low | Positive | - |
| 7 | 1. Defaults Tab | TC-ISD-007 | Naming Series Options and Configure Series are hidden for Item Code | Access via Inventory > Inventory Settings > Defaults tab | Select Item Naming By = Item Code | Item Code | The Naming Series Options label and the Configure Series button are not displayed | High | Negative | - |
| 8 | 1. Defaults Tab | TC-ISD-008 | Naming Series Options and Configure Series are displayed for Naming Series | Access via Inventory > Inventory Settings > Defaults tab | Select Item Naming By = Naming Series | Naming Series | The Naming Series Options label and the Configure Series button are displayed | High | Positive | - |
| 9 | 1. Defaults Tab | TC-ISD-009 | Naming Series Options displays the default naming series | Access via Inventory > Inventory Settings > Defaults tab | Select Item Naming By = Naming Series | Naming Series | The read-only label displays the default naming series used to generate item IDs | Medium | Positive | Needs Clarification: SRS does not say what is displayed when no series is configured. |
| 10 | 1. Defaults Tab | TC-ISD-010 | Naming Series Options is read only | Access via Inventory > Inventory Settings > Defaults tab | 1. Select Naming Series
2. Click the Naming Series Options label | - | The label cannot be edited | Low | Negative | - |
| 11 | 1. Defaults Tab | TC-ISD-011 | Save Item Naming By = Naming Series | Access via Inventory > Inventory Settings > Defaults tab | 1. Select Naming Series
2. Click Save
3. Reload the page | Naming Series | The value is saved and displayed after reload | High | Positive | - |
| 12 | 1. Defaults Tab | TC-ISD-012 | Save Item Naming By = Item Code | Access via Inventory > Inventory Settings > Defaults tab | 1. Select Naming Series and save
2. Select Item Code
3. Click Save | Item Code | The value is saved and Naming Series Options / Configure Series are hidden | Medium | Positive | - |
| 13 | 1. Defaults Tab | TC-ISD-013 | Save Naming Series without any configured series | Access via Inventory > Inventory Settings > Defaults tab | 1. Remove all series rows
2. Select Naming Series
3. Click Save | No series | Behavior follows the BA rule (error or fallback) | Medium | Negative | Needs Clarification: SRS does not define Item Naming By = Naming Series with no series defined. |
| 14 | 1. Defaults Tab | TC-ISD-014 | Open the Configure Series popup | Access via Inventory > Inventory Settings > Defaults tab | 1. Select Naming Series
2. Click Configure Series | - | A popup is displayed with the Add Series Prefix table (Checkbox, Series, Preview), Add Row and Update | High | Positive | - |
| 15 | 1. Defaults Tab | TC-ISD-015 | Series table columns | Access via Inventory > Inventory Settings > Defaults tab | Open the Configure Series popup | - | The columns are: Checkbox, Series, Preview | Medium | UI | - |
| 16 | 1. Defaults Tab | TC-ISD-016 | Add Row adds a new row | Access via Inventory > Inventory Settings > Defaults tab | 1. Open the Configure Series popup
2. Click Add Row | - | A new empty row is added to the table | High | Positive | - |
| 17 | 1. Defaults Tab | TC-ISD-017 | Series - valid pattern | Access via Inventory > Inventory Settings > Defaults tab | 1. Click Add Row
2. Enter a series pattern
3. Click Update | Series: ITM-.##### | The series is saved and applied | High | Positive | - |
| 18 | 1. Defaults Tab | TC-ISD-018 | Series - Preview displays a sample item ID | Access via Inventory > Inventory Settings > Defaults tab | 1. Click Add Row
2. Enter a series pattern | Series: ITM-.##### | The Preview label displays a sample item ID such as ITM-00001 | High | Positive | - |
| 19 | 1. Defaults Tab | TC-ISD-019 | Series - Preview updates when the pattern changes | Access via Inventory > Inventory Settings > Defaults tab | 1. Enter ITM-.####
2. Change it to PRD-.#### | ITM-.#### -> PRD-.#### | The Preview is refreshed with the new pattern | Medium | Positive | - |
| 20 | 1. Defaults Tab | TC-ISD-020 | Series - Preview is read only | Access via Inventory > Inventory Settings > Defaults tab | Click the Preview label | - | The Preview cannot be edited | Low | Negative | - |
| 21 | 1. Defaults Tab | TC-ISD-021 | Series - minimum length (2 characters) | Access via Inventory > Inventory Settings > Defaults tab | 1. Enter a 2-character series
2. Click Update | Series: AB | The series is accepted | Medium | Positive | - |
| 22 | 1. Defaults Tab | TC-ISD-022 | Series - below minimum length (1 character) | Access via Inventory > Inventory Settings > Defaults tab | 1. Enter a 1-character series
2. Click Update | Series: A | An error message appears because the text is shorter than 2 characters | High | Negative | - |
| 23 | 1. Defaults Tab | TC-ISD-023 | Series - maximum length (100 characters) | Access via Inventory > Inventory Settings > Defaults tab | 1. Enter a 100-character series
2. Click Update | 100 characters | The series is accepted | Medium | Positive | - |
| 24 | 1. Defaults Tab | TC-ISD-024 | Series - input blocked beyond 100 characters | Access via Inventory > Inventory Settings > Defaults tab | Type or paste 101 characters in Series | 101 characters | Only the first 100 characters are accepted; further input is prevented | Medium | Negative | - |
| 25 | 1. Defaults Tab | TC-ISD-025 | Series - invalid pattern | Access via Inventory > Inventory Settings > Defaults tab | 1. Enter an invalid series pattern
2. Click Update | Series: ####-.@@ | An error message appears indicating an invalid series pattern | High | Negative | Needs Clarification: SRS does not define what an invalid series pattern is (ERPNext uses a '.#####' suffix). |
| 26 | 1. Defaults Tab | TC-ISD-026 | Series - letters, numbers and special characters | Access via Inventory > Inventory Settings > Defaults tab | 1. Enter a series containing all three types
2. Click Update | Series: ITM-2026-.#### | The series is accepted | Medium | Positive | - |
| 27 | 1. Defaults Tab | TC-ISD-027 | Series - empty value | Access via Inventory > Inventory Settings > Defaults tab | 1. Click Add Row
2. Leave Series empty
3. Click Update | Series: empty | Behavior follows the BA rule | Medium | Negative | Needs Clarification: SRS says Series is 'Optional' but also defines error messages; the empty-row result is not clear. |
| 28 | 1. Defaults Tab | TC-ISD-028 | Series - duplicate series rows | Access via Inventory > Inventory Settings > Defaults tab | 1. Add two rows with the same series
2. Click Update | ITM-.##### x2 | An error message appears or the duplicate is ignored | Medium | Negative | Needs Clarification: Duplicates are not addressed in the SRS. |
| 29 | 1. Defaults Tab | TC-ISD-029 | Series - whitespace only | Access via Inventory > Inventory Settings > Defaults tab | 1. Enter spaces only
2. Click Update | '   ' | An error message appears | Low | Negative | - |
| 30 | 1. Defaults Tab | TC-ISD-030 | Update with several valid rows | Access via Inventory > Inventory Settings > Defaults tab | 1. Add three valid series rows
2. Click Update
3. Reopen the popup | ITM-.####, PRD-.####, RM-.#### | All three series are saved and displayed after reopening | High | Positive | - |
| 31 | 1. Defaults Tab | TC-ISD-031 | Update with one invalid row among valid rows | Access via Inventory > Inventory Settings > Defaults tab | 1. Add a valid row and an invalid row
2. Click Update | ITM-.#### / A | A validation error is displayed for the invalid row and nothing is saved | Medium | Negative | - |
| 32 | 1. Defaults Tab | TC-ISD-032 | Select a row displays the action bar | Access via Inventory > Inventory Settings > Defaults tab | 1. Select the checkbox of a row | - | An action bar with Delete row appears | High | Positive | - |
| 33 | 1. Defaults Tab | TC-ISD-033 | Delete a single row | Access via Inventory > Inventory Settings > Defaults tab | 1. Select one row
2. Click Delete row
3. Click Update | - | The row is deleted and the change is saved | High | Positive | - |
| 34 | 1. Defaults Tab | TC-ISD-034 | Delete multiple rows | Access via Inventory > Inventory Settings > Defaults tab | 1. Select two rows
2. Click Delete row | - | Both rows are deleted | Medium | Positive | - |
| 35 | 1. Defaults Tab | TC-ISD-035 | Action bar disappears after deselecting rows | Access via Inventory > Inventory Settings > Defaults tab | 1. Select a row
2. Clear the checkbox | - | The action bar is no longer displayed | Low | Positive | - |
| 36 | 1. Defaults Tab | TC-ISD-036 | Close the popup without Update | Access via Inventory > Inventory Settings > Defaults tab | 1. Add a row
2. Close the popup
3. Reopen it | - | The unsaved row is not kept | Medium | Negative | Needs Clarification: SRS does not define closing without Update. |
| 37 | 1. Defaults Tab | TC-ISD-037 | Saved series are used for new items | Access via Inventory > Inventory Settings > Defaults tab | 1. Configure series ITM-.#####
2. Save the setting
3. Add a new item | ITM-.##### | The new item ID is generated from the configured series | High | Positive | Needs Clarification: Priority when several series exist is not defined. |
| 38 | 1. Defaults Tab | TC-ISD-038 | Default Item Group - searchable dropdown | Access via Inventory > Inventory Settings > Defaults tab | 1. Click Default Item Group
2. Type part of an item group name | All | The list is filtered by the typed text | Medium | Positive | - |
| 39 | 1. Defaults Tab | TC-ISD-039 | Default Item Group - select and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Select an Item Group
2. Click Save
3. Reload the page | Item Group: Products | The value is saved and displayed after reload | High | Positive | - |
| 40 | 1. Defaults Tab | TC-ISD-040 | Default Item Group - optional | Access via Inventory > Inventory Settings > Defaults tab | 1. Clear Default Item Group
2. Click Save | Empty | The setting is saved without an error | Medium | Positive | - |
| 41 | 1. Defaults Tab | TC-ISD-041 | Default Item Group - single selection | Access via Inventory > Inventory Settings > Defaults tab | 1. Select one item group
2. Select another | - | Only the last selected value is kept | Low | Positive | - |
| 42 | 1. Defaults Tab | TC-ISD-042 | Default Item Group - non-existing value | Access via Inventory > Inventory Settings > Defaults tab | 1. Type a name that does not exist
2. Click outside | Group XYZ | No option is selectable and the value is not accepted | Medium | Negative | - |
| 43 | 1. Defaults Tab | TC-ISD-043 | Default Item Group - group (parent) nodes | Access via Inventory > Inventory Settings > Defaults tab | 1. Open the dropdown and look for parent groups | All Item Groups | Behavior follows the BA rule (parent groups allowed or hidden) | Low | Positive | Needs Clarification: SRS does not say whether group nodes can be the default. |
| 44 | 1. Defaults Tab | TC-ISD-044 | Default Item Group - default value | Access via Inventory > Inventory Settings > Defaults tab | Open the tab on a fresh system | - | The default value is as defined by the BA | Low | Positive | Needs Clarification: SRS does not state a default value. |
| 45 | 1. Defaults Tab | TC-ISD-045 | Default Valuation Method - dropdown values | Access via Inventory > Inventory Settings > Defaults tab | Open the Default Valuation Method dropdown | - | The values are: FIFO, Moving Average | High | Positive | - |
| 46 | 1. Defaults Tab | TC-ISD-046 | Default Valuation Method - default is FIFO | Access via Inventory > Inventory Settings > Defaults tab | Open the tab on a fresh system | - | FIFO is selected by default | High | Positive | - |
| 47 | 1. Defaults Tab | TC-ISD-047 | Default Valuation Method - change to Moving Average and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Select Moving Average
2. Click Save
3. Reload the page | Moving Average | The value is saved and displayed after reload | High | Positive | - |
| 48 | 1. Defaults Tab | TC-ISD-048 | Default Valuation Method - change back to FIFO | Access via Inventory > Inventory Settings > Defaults tab | 1. Select Moving Average and save
2. Select FIFO
3. Click Save | FIFO | The value is saved | Medium | Positive | - |
| 49 | 1. Defaults Tab | TC-ISD-049 | Default Valuation Method - single selection | Access via Inventory > Inventory Settings > Defaults tab | 1. Select Moving Average
2. Select FIFO | - | Only one value is kept | Low | Positive | - |
| 50 | 1. Defaults Tab | TC-ISD-050 | Default Valuation Method - not applied to existing items | Access via Inventory > Inventory Settings > Defaults tab | 1. Change the default to Moving Average and save
2. Open an existing FIFO item | Existing item | The existing item keeps its valuation method | High | Negative | - |
| 51 | 1. Defaults Tab | TC-ISD-051 | Auto Create Item Price In First Transaction If Missing - default state is checked | Access via Inventory > Inventory Settings > Defaults tab | Open the tab and review the Auto Create Item Price In First Transaction If Missing checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 52 | 1. Defaults Tab | TC-ISD-052 | Auto Create Item Price In First Transaction If Missing - uncheck and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Uncheck Auto Create Item Price In First Transaction If Missing
2. Click Save
3. Reload the page and open the tab | Auto Create Item Price In First Transaction If Missing: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 53 | 1. Defaults Tab | TC-ISD-053 | Auto Create Item Price In First Transaction If Missing - re-check and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Uncheck Auto Create Item Price In First Transaction If Missing and save
2. Check Auto Create Item Price In First Transaction If Missing
3. Click Save
4. Reload the page | Auto Create Item Price In First Transaction If Missing: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 54 | 1. Defaults Tab | TC-ISD-054 | Default Stock UOM - default value is NOS | Access via Inventory > Inventory Settings > Defaults tab | Open the tab on a fresh system | - | NOS is displayed | High | Positive | - |
| 55 | 1. Defaults Tab | TC-ISD-055 | Default Stock UOM - searchable dropdown | Access via Inventory > Inventory Settings > Defaults tab | 1. Click Default Stock UOM
2. Type part of a UOM name | Un | The list is filtered by the typed text | Medium | Positive | - |
| 56 | 1. Defaults Tab | TC-ISD-056 | Default Stock UOM - select and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Select a UOM
2. Click Save
3. Reload the page | UOM: Kg | The value is saved and displayed after reload | High | Positive | - |
| 57 | 1. Defaults Tab | TC-ISD-057 | Default Stock UOM - optional | Access via Inventory > Inventory Settings > Defaults tab | 1. Clear Default Stock UOM
2. Click Save | Empty | The setting is saved without an error | Medium | Positive | Needs Clarification: Effect of an empty default UOM on the Add Item screen is not defined. |
| 58 | 1. Defaults Tab | TC-ISD-058 | Default Stock UOM - non-existing value | Access via Inventory > Inventory Settings > Defaults tab | 1. Type a UOM that does not exist
2. Click outside | UOM XYZ | No option is selectable and the value is not accepted | Medium | Negative | - |
| 59 | 1. Defaults Tab | TC-ISD-059 | Default Stock UOM - single selection | Access via Inventory > Inventory Settings > Defaults tab | 1. Select a UOM
2. Select another | - | Only the last selected value is kept | Low | Positive | - |
| 60 | 1. Defaults Tab | TC-ISD-060 | Allow to edit stock UOM qty for Sales documents - default state is checked | Access via Inventory > Inventory Settings > Defaults tab | Open the tab and review the Allow to edit stock UOM qty for Sales documents checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 61 | 1. Defaults Tab | TC-ISD-061 | Allow to edit stock UOM qty for Sales documents - uncheck and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Uncheck Allow to edit stock UOM qty for Sales documents
2. Click Save
3. Reload the page and open the tab | Allow to edit stock UOM qty for Sales documents: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 62 | 1. Defaults Tab | TC-ISD-062 | Allow to edit stock UOM qty for Sales documents - re-check and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Uncheck Allow to edit stock UOM qty for Sales documents and save
2. Check Allow to edit stock UOM qty for Sales documents
3. Click Save
4. Reload the page | Allow to edit stock UOM qty for Sales documents: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 63 | 1. Defaults Tab | TC-ISD-063 | Allow to edit stock UOM qty for Purchase documents - default state is unchecked | Access via Inventory > Inventory Settings > Defaults tab | Open the tab and review the Allow to edit stock UOM qty for Purchase documents checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 64 | 1. Defaults Tab | TC-ISD-064 | Allow to edit stock UOM qty for Purchase documents - check and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Check Allow to edit stock UOM qty for Purchase documents
2. Click Save
3. Reload the page and open the tab | Allow to edit stock UOM qty for Purchase documents: checked | The setting is saved and still checked after reload | High | Positive | - |
| 65 | 1. Defaults Tab | TC-ISD-065 | Allow to edit stock UOM qty for Purchase documents - uncheck again and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Check Allow to edit stock UOM qty for Purchase documents and save
2. Uncheck Allow to edit stock UOM qty for Purchase documents
3. Click Save
4. Reload the page | Allow to edit stock UOM qty for Purchase documents: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 66 | 1. Defaults Tab | TC-ISD-066 | Allow to edit stock UOM qty for Stock Entry - default state is unchecked | Access via Inventory > Inventory Settings > Defaults tab | Open the tab and review the Allow to edit stock UOM qty for Stock Entry checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 67 | 1. Defaults Tab | TC-ISD-067 | Allow to edit stock UOM qty for Stock Entry - check and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Check Allow to edit stock UOM qty for Stock Entry
2. Click Save
3. Reload the page and open the tab | Allow to edit stock UOM qty for Stock Entry: checked | The setting is saved and still checked after reload | High | Positive | - |
| 68 | 1. Defaults Tab | TC-ISD-068 | Allow to edit stock UOM qty for Stock Entry - uncheck again and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Check Allow to edit stock UOM qty for Stock Entry and save
2. Uncheck Allow to edit stock UOM qty for Stock Entry
3. Click Save
4. Reload the page | Allow to edit stock UOM qty for Stock Entry: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 69 | 1. Defaults Tab | TC-ISD-069 | Allow UOM with conversion rate defined in Item - default state is unchecked | Access via Inventory > Inventory Settings > Defaults tab | Open the tab and review the Allow UOM with conversion rate defined in Item checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 70 | 1. Defaults Tab | TC-ISD-070 | Allow UOM with conversion rate defined in Item - check and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Check Allow UOM with conversion rate defined in Item
2. Click Save
3. Reload the page and open the tab | Allow UOM with conversion rate defined in Item: checked | The setting is saved and still checked after reload | High | Positive | - |
| 71 | 1. Defaults Tab | TC-ISD-071 | Allow UOM with conversion rate defined in Item - uncheck again and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Check Allow UOM with conversion rate defined in Item and save
2. Uncheck Allow UOM with conversion rate defined in Item
3. Click Save
4. Reload the page | Allow UOM with conversion rate defined in Item: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 72 | 1. Defaults Tab | TC-ISD-072 | Default Warehouse - default value | Access via Inventory > Inventory Settings > Defaults tab | Open the tab on a fresh system | - | The value is 'Stores - <Company Abbreviation>' (example Stores - A) | High | Positive | Needs Clarification: In a multi-company system the abbreviation of which company is used is not defined. |
| 73 | 1. Defaults Tab | TC-ISD-073 | Default Warehouse - only non-group warehouses are listed | Access via Inventory > Inventory Settings > Defaults tab | Open the Default Warehouse dropdown | - | Only warehouses with Is Group disabled are displayed | High | Positive | - |
| 74 | 1. Defaults Tab | TC-ISD-074 | Default Warehouse - group warehouse is not selectable | Access via Inventory > Inventory Settings > Defaults tab | Type the name of a group warehouse | All Warehouses | The group warehouse is not offered | High | Negative | - |
| 75 | 1. Defaults Tab | TC-ISD-075 | Default Warehouse - searchable dropdown | Access via Inventory > Inventory Settings > Defaults tab | 1. Click Default Warehouse
2. Type part of a warehouse name | Stores | The list is filtered by the typed text | Medium | Positive | - |
| 76 | 1. Defaults Tab | TC-ISD-076 | Default Warehouse - select and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Select a warehouse
2. Click Save
3. Reload the page | Stores - E | The value is saved and displayed after reload | High | Positive | - |
| 77 | 1. Defaults Tab | TC-ISD-077 | Default Warehouse - optional | Access via Inventory > Inventory Settings > Defaults tab | 1. Clear Default Warehouse
2. Click Save | Empty | The setting is saved without an error | Medium | Positive | - |
| 78 | 1. Defaults Tab | TC-ISD-078 | Default Warehouse - single selection | Access via Inventory > Inventory Settings > Defaults tab | 1. Select a warehouse
2. Select another | - | Only the last selected value is kept | Low | Positive | - |
| 79 | 1. Defaults Tab | TC-ISD-079 | Default Warehouse - disabled warehouse | Access via Inventory > Inventory Settings > Defaults tab | 1. Open the dropdown and look for a disabled warehouse | Disabled warehouse | Behavior follows the BA rule | Low | Negative | Needs Clarification: SRS does not say whether disabled warehouses are listed. |
| 80 | 1. Defaults Tab | TC-ISD-080 | Sample Retention Warehouse - only non-group warehouses are listed | Access via Inventory > Inventory Settings > Defaults tab | Open the Sample Retention Warehouse dropdown | - | Only warehouses with Is Group disabled are displayed | High | Positive | - |
| 81 | 1. Defaults Tab | TC-ISD-081 | Sample Retention Warehouse - searchable dropdown | Access via Inventory > Inventory Settings > Defaults tab | 1. Click the field
2. Type part of a warehouse name | Sample | The list is filtered by the typed text | Medium | Positive | - |
| 82 | 1. Defaults Tab | TC-ISD-082 | Sample Retention Warehouse - select and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Select a warehouse
2. Click Save
3. Reload the page | Samples - E | The value is saved and displayed after reload | High | Positive | - |
| 83 | 1. Defaults Tab | TC-ISD-083 | Sample Retention Warehouse - optional with no default | Access via Inventory > Inventory Settings > Defaults tab | 1. Open the tab on a fresh system
2. Click Save | Empty | The field is empty by default and saving works | Medium | Positive | - |
| 84 | 1. Defaults Tab | TC-ISD-084 | Sample Retention Warehouse - non-existing value | Access via Inventory > Inventory Settings > Defaults tab | 1. Type a warehouse that does not exist
2. Click outside | WH XYZ | No option is selectable and the value is not accepted | Medium | Negative | - |
| 85 | 1. Defaults Tab | TC-ISD-085 | Raise Material Request when stock reaches re-order level - default state is checked | Access via Inventory > Inventory Settings > Defaults tab | Open the tab and review the Raise Material Request when stock reaches re-order level checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 86 | 1. Defaults Tab | TC-ISD-086 | Raise Material Request when stock reaches re-order level - uncheck and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Uncheck Raise Material Request when stock reaches re-order level
2. Click Save
3. Reload the page and open the tab | Raise Material Request when stock reaches re-order level: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 87 | 1. Defaults Tab | TC-ISD-087 | Raise Material Request when stock reaches re-order level - re-check and save | Access via Inventory > Inventory Settings > Defaults tab | 1. Uncheck Raise Material Request when stock reaches re-order level and save
2. Check Raise Material Request when stock reaches re-order level
3. Click Save
4. Reload the page | Raise Material Request when stock reaches re-order level: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 88 | 1. Defaults Tab | TC-ISD-088 | Raise Material Request - field location | Access via Inventory > Inventory Settings > Defaults tab | Search for the Raise Material Request checkbox in the Defaults tab and in the Stock Planning tab | - | The checkbox is displayed in the location approved by the BA | Medium | UI | Needs Clarification: SRS contains an Arabic note saying the field is located in the 'Stock Planning' tab in the live system, so it is unclear which tab is the final location. |
| 89 | 1. Defaults Tab | TC-ISD-089 | Save without changes | Access via Inventory > Inventory Settings > Defaults tab | 1. Open the tab
2. Click Save | - | The settings are saved without an error | Low | Positive | - |
| 90 | 1. Defaults Tab | TC-ISD-090 | Save displays a success message | Access via Inventory > Inventory Settings > Defaults tab | 1. Change a field
2. Click Save | - | A success message is displayed | Medium | Positive | Needs Clarification: SRS does not give the success message text. |
| 91 | 1. Defaults Tab | TC-ISD-091 | Save - changes are applied to the system | Access via Inventory > Inventory Settings > Defaults tab | 1. Change Default Warehouse
2. Click Save
3. Open Add Stock Entry | Stores - E | The new default is applied | High | Positive | - |
| 92 | 1. Defaults Tab | TC-ISD-092 | Save - multiple fields changed together | Access via Inventory > Inventory Settings > Defaults tab | 1. Change Default Item Group, Valuation Method, Stock UOM and Default Warehouse
2. Click Save
3. Reload | - | All four values are saved | High | Positive | - |
| 93 | 1. Defaults Tab | TC-ISD-093 | Defaults tab labels are localized | Access via Inventory > Inventory Settings > Defaults tab | 1. Switch the language to Arabic
2. Open the Defaults tab | - | All labels and notes are displayed in Arabic | Low | UI | - |
| 94 | 2. Stock Validations Tab | TC-ISV-001 | Stock Validations tab sections are displayed | Access via Inventory > Inventory Settings > Stock Validations tab | Open the Stock Validations tab | - | The sections are displayed: Negative Stock, Quantity Tolerance, Display & Data Formatting, Validate Material Transfer Warehouses and Save | High | UI | - |
| 95 | 2. Stock Validations Tab | TC-ISV-002 | Allow Negative Stock - default state is unchecked | Access via Inventory > Inventory Settings > Stock Validations tab | Open the tab on a fresh system | - | Allow Negative Stock is unchecked | High | Positive | - |
| 96 | 2. Stock Validations Tab | TC-ISV-003 | Allow Negative Stock - confirmation popup on check | Access via Inventory > Inventory Settings > Stock Validations tab | Check Allow Negative Stock | - | A popup appears with the message: 'Negative Stock disables FIFO and Moving Average valuation while inventory is negative and may result in inaccurate inventory, Do you still want to enable Negative Stock' | High | Positive | - |
| 97 | 2. Stock Validations Tab | TC-ISV-004 | Allow Negative Stock - popup buttons | Access via Inventory > Inventory Settings > Stock Validations tab | Check Allow Negative Stock | - | The popup contains the Yes and No buttons | Medium | UI | - |
| 98 | 2. Stock Validations Tab | TC-ISV-005 | Allow Negative Stock - click Yes | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Check Allow Negative Stock
2. Click Yes
3. Click Save | Yes | The checkbox stays checked and the setting is saved | High | Positive | - |
| 99 | 2. Stock Validations Tab | TC-ISV-006 | Allow Negative Stock - click No | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Check Allow Negative Stock
2. Click No | No | The popup disappears and the checkbox is not checked | High | Negative | Needs Clarification: SRS says only that the message disappears; the state of the checkbox after No is not defined. |
| 100 | 2. Stock Validations Tab | TC-ISV-007 | Allow Negative Stock - uncheck | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enable Allow Negative Stock and save
2. Uncheck it | - | The checkbox is unchecked with no confirmation popup | Medium | Positive | Needs Clarification: SRS defines a popup only when checking. |
| 101 | 2. Stock Validations Tab | TC-ISV-008 | Allow Negative Stock - saved value persists | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enable it with Yes
2. Click Save
3. Reload the page | - | The checkbox is still checked | High | Positive | - |
| 102 | 2. Stock Validations Tab | TC-ISV-009 | Allow Negative Stock - close the popup without choosing | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Check Allow Negative Stock
2. Close the popup (X / outside click / Esc) | - | The popup closes and the checkbox is not checked | Low | Negative | Needs Clarification: Not defined. |
| 103 | 2. Stock Validations Tab | TC-ISV-010 | Allow Negative Stock - Yes then Save is required | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Check Allow Negative Stock
2. Click Yes
3. Reload without saving | - | The setting is not applied until Save is clicked | Medium | Negative | - |
| 104 | 2. Stock Validations Tab | TC-ISV-011 | Over Delivery/Receipt Allowance (%) - default value 0.000 | Access via Inventory > Inventory Settings > Stock Validations tab | Open the tab on a fresh system | - | The field shows 0.000 | High | Positive | - |
| 105 | 2. Stock Validations Tab | TC-ISV-012 | Over Delivery/Receipt Allowance (%) - integer value | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter an integer
2. Click Save | 10 | The value is saved | High | Positive | - |
| 106 | 2. Stock Validations Tab | TC-ISV-013 | Over Delivery/Receipt Allowance (%) - decimal value | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter a decimal
2. Click Save | 2.5 | The value is saved | High | Positive | - |
| 107 | 2. Stock Validations Tab | TC-ISV-014 | Over Delivery/Receipt Allowance (%) - zero | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter 0
2. Click Save | 0 | The value is saved (no tolerance) | Medium | Positive | - |
| 108 | 2. Stock Validations Tab | TC-ISV-015 | Over Delivery/Receipt Allowance (%) - 100 percent | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter 100
2. Click Save | 100 | The value is saved | Medium | Positive | - |
| 109 | 2. Stock Validations Tab | TC-ISV-016 | Over Delivery/Receipt Allowance (%) - above 100 percent | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter 150
2. Click Save | 150 | Behavior follows the BA rule (accepted or rejected) | Medium | Negative | Needs Clarification: SRS does not define an upper limit for the percentage. |
| 110 | 2. Stock Validations Tab | TC-ISV-017 | Over Delivery/Receipt Allowance (%) - negative value | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter -5
2. Click Save | -5 | The value is rejected with an error message | High | Negative | Needs Clarification: SRS says integers and decimals only; negatives are not addressed. |
| 111 | 2. Stock Validations Tab | TC-ISV-018 | Over Delivery/Receipt Allowance (%) - letters | Access via Inventory > Inventory Settings > Stock Validations tab | Type letters in the field | abc | The letters are not accepted | High | Negative | - |
| 112 | 2. Stock Validations Tab | TC-ISV-019 | Over Delivery/Receipt Allowance (%) - special characters | Access via Inventory > Inventory Settings > Stock Validations tab | Type special characters in the field | @#% | The characters are not accepted | Medium | Negative | - |
| 113 | 2. Stock Validations Tab | TC-ISV-020 | Over Delivery/Receipt Allowance (%) - multiple decimal points | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter 1.2.3
2. Click Save | 1.2.3 | The value is rejected | Medium | Negative | - |
| 114 | 2. Stock Validations Tab | TC-ISV-021 | Over Delivery/Receipt Allowance (%) - comma as decimal separator | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter 2,5
2. Click Save | 2,5 | Behavior follows the BA rule (rejected or converted) | Low | Negative | Needs Clarification: Decimal separator not defined. |
| 115 | 2. Stock Validations Tab | TC-ISV-022 | Over Delivery/Receipt Allowance (%) - empty value | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Clear the field
2. Click Save | Empty | Behavior follows the BA rule (saved as 0 or error message) | High | Negative | Needs Clarification: SRS says the field is Optional but also says an error appears when shorter than the minimum length of 1 character; the empty case is contradictory. |
| 116 | 2. Stock Validations Tab | TC-ISV-023 | Over Delivery/Receipt Allowance (%) - maximum length (100 characters) | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter 100 digits
2. Click Save | 100 digits | The value is accepted by the field | Low | Positive | Needs Clarification: A 100-digit percentage is unrealistic; no numeric limit is defined. |
| 117 | 2. Stock Validations Tab | TC-ISV-024 | Over Delivery/Receipt Allowance (%) - input blocked beyond 100 characters | Access via Inventory > Inventory Settings > Stock Validations tab | Type 101 digits | 101 digits | Only the first 100 characters are accepted; further input is prevented | Medium | Negative | - |
| 118 | 2. Stock Validations Tab | TC-ISV-025 | Over Delivery/Receipt Allowance (%) - spaces | Access via Inventory > Inventory Settings > Stock Validations tab | Type spaces in the field | ' ' | The spaces are not accepted | Low | Negative | - |
| 119 | 2. Stock Validations Tab | TC-ISV-026 | Over Delivery/Receipt Allowance (%) - Arabic-indic digits | Access via Inventory > Inventory Settings > Stock Validations tab | Type Arabic-indic digits | ٥ | Behavior follows the BA rule | Low | Negative | Needs Clarification: Digit set not defined. |
| 120 | 2. Stock Validations Tab | TC-ISV-027 | Over Delivery/Receipt Allowance (%) - displays as percentage | Access via Inventory > Inventory Settings > Stock Validations tab | Enter 10 and save, then reopen | 10 | The value is displayed and understood as a percentage | Low | UI | - |
| 121 | 2. Stock Validations Tab | TC-ISV-028 | Over Transfer Allowance (%) - not displayed | Access via Inventory > Inventory Settings > Stock Validations tab | Open the tab and look for Over Transfer Allowance (%) | - | The field is not displayed (hidden) | Medium | UI | Needs Clarification: SRS marks the field Hidden but defines its rules; the condition for showing it is not stated. |
| 122 | 2. Stock Validations Tab | TC-ISV-029 | Over Picking Allowance (%) - not displayed | Access via Inventory > Inventory Settings > Stock Validations tab | Open the tab and look for Over Picking Allowance (%) | - | The field is not displayed (hidden) | Medium | UI | Needs Clarification: SRS marks the field Hidden but defines its rules; the condition for showing it is not stated. |
| 123 | 2. Stock Validations Tab | TC-ISV-030 | Over Transfer / Over Picking default value | Access via Inventory > Inventory Settings > Stock Validations tab | Check the stored default of the hidden fields | - | Both default to 0.000 | Low | Positive | Needs Clarification: Hidden fields cannot be verified from the UI; verify through the API / database. |
| 124 | 2. Stock Validations Tab | TC-ISV-031 | Show barcode field in transactions - default state is checked | Access via Inventory > Inventory Settings > Stock Validations tab | Open the tab and review the Show barcode field in transactions checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 125 | 2. Stock Validations Tab | TC-ISV-032 | Show barcode field in transactions - uncheck and save | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Uncheck Show barcode field in transactions
2. Click Save
3. Reload the page and open the tab | Show barcode field in transactions: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 126 | 2. Stock Validations Tab | TC-ISV-033 | Show barcode field in transactions - re-check and save | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Uncheck Show barcode field in transactions and save
2. Check Show barcode field in transactions
3. Click Save
4. Reload the page | Show barcode field in transactions: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 127 | 2. Stock Validations Tab | TC-ISV-034 | Convert Item description to clean HTML in transactions - hidden | Access via Inventory > Inventory Settings > Stock Validations tab | Open the tab and look for the checkbox | - | The checkbox is not displayed (hidden) and its value is checked by default | Low | UI | Needs Clarification: Hidden field; its effect is applied by default and cannot be changed from the UI. |
| 128 | 2. Stock Validations Tab | TC-ISV-035 | Validate Material Transfer Warehouses - default state is unchecked | Access via Inventory > Inventory Settings > Stock Validations tab | Open the tab and review the Validate Material Transfer Warehouses checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 129 | 2. Stock Validations Tab | TC-ISV-036 | Validate Material Transfer Warehouses - check and save | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Check Validate Material Transfer Warehouses
2. Click Save
3. Reload the page and open the tab | Validate Material Transfer Warehouses: checked | The setting is saved and still checked after reload | High | Positive | - |
| 130 | 2. Stock Validations Tab | TC-ISV-037 | Validate Material Transfer Warehouses - uncheck again and save | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Check Validate Material Transfer Warehouses and save
2. Uncheck Validate Material Transfer Warehouses
3. Click Save
4. Reload the page | Validate Material Transfer Warehouses: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 131 | 2. Stock Validations Tab | TC-ISV-038 | Validate Material Transfer Warehouses - default state | Access via Inventory > Inventory Settings > Stock Validations tab | Open the tab on a fresh system | - | The checkbox default is as defined by the BA | Medium | Positive | Needs Clarification: SRS does not state the default (ERPNext default is checked). |
| 132 | 2. Stock Validations Tab | TC-ISV-039 | Save with valid data | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Change several fields to valid values
2. Click Save | - | The Inventory Settings are saved and applied | High | Positive | - |
| 133 | 2. Stock Validations Tab | TC-ISV-040 | Save with an invalid tolerance value | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Enter an invalid value in a tolerance field
2. Click Save | abc / -5 | A validation error message is displayed for the invalid field and nothing is saved | High | Negative | - |
| 134 | 2. Stock Validations Tab | TC-ISV-041 | Save without changes | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Open the tab
2. Click Save | - | No error is displayed | Low | Positive | - |
| 135 | 2. Stock Validations Tab | TC-ISV-042 | Stock Validations tab labels are localized | Access via Inventory > Inventory Settings > Stock Validations tab | 1. Switch the language to Arabic
2. Open the tab | - | All labels, notes and the confirmation message are displayed in Arabic | Low | UI | - |
| 136 | 3. Item Variant Tab | TC-ISI-001 | Item Variant tab components are displayed | Access via Inventory > Inventory Settings > Item Variant tab | Open the Item Variant tab | - | The tab displays: Do not update variants on save, Allow Rename Attribute Value, Allow Variant UOM to be different from Template UOM, Copy Field To Variant table and Save | High | UI | - |
| 137 | 3. Item Variant Tab | TC-ISI-002 | Do not update variants on save - default state is unchecked | Access via Inventory > Inventory Settings > Item Variant tab | Open the tab and review the Do not update variants on save checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 138 | 3. Item Variant Tab | TC-ISI-003 | Do not update variants on save - check and save | Access via Inventory > Inventory Settings > Item Variant tab | 1. Check Do not update variants on save
2. Click Save
3. Reload the page and open the tab | Do not update variants on save: checked | The setting is saved and still checked after reload | High | Positive | - |
| 139 | 3. Item Variant Tab | TC-ISI-004 | Do not update variants on save - uncheck again and save | Access via Inventory > Inventory Settings > Item Variant tab | 1. Check Do not update variants on save and save
2. Uncheck Do not update variants on save
3. Click Save
4. Reload the page | Do not update variants on save: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 140 | 3. Item Variant Tab | TC-ISI-005 | Allow Rename Attribute Value - default state is unchecked | Access via Inventory > Inventory Settings > Item Variant tab | Open the tab and review the Allow Rename Attribute Value checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 141 | 3. Item Variant Tab | TC-ISI-006 | Allow Rename Attribute Value - check and save | Access via Inventory > Inventory Settings > Item Variant tab | 1. Check Allow Rename Attribute Value
2. Click Save
3. Reload the page and open the tab | Allow Rename Attribute Value: checked | The setting is saved and still checked after reload | High | Positive | - |
| 142 | 3. Item Variant Tab | TC-ISI-007 | Allow Rename Attribute Value - uncheck again and save | Access via Inventory > Inventory Settings > Item Variant tab | 1. Check Allow Rename Attribute Value and save
2. Uncheck Allow Rename Attribute Value
3. Click Save
4. Reload the page | Allow Rename Attribute Value: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 143 | 3. Item Variant Tab | TC-ISI-008 | Allow Variant UOM to be different from Template UOM - default state is unchecked | Access via Inventory > Inventory Settings > Item Variant tab | Open the tab and review the Allow Variant UOM to be different from Template UOM checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 144 | 3. Item Variant Tab | TC-ISI-009 | Allow Variant UOM to be different from Template UOM - check and save | Access via Inventory > Inventory Settings > Item Variant tab | 1. Check Allow Variant UOM to be different from Template UOM
2. Click Save
3. Reload the page and open the tab | Allow Variant UOM to be different from Template UOM: checked | The setting is saved and still checked after reload | High | Positive | - |
| 145 | 3. Item Variant Tab | TC-ISI-010 | Allow Variant UOM to be different from Template UOM - uncheck again and save | Access via Inventory > Inventory Settings > Item Variant tab | 1. Check Allow Variant UOM to be different from Template UOM and save
2. Uncheck Allow Variant UOM to be different from Template UOM
3. Click Save
4. Reload the page | Allow Variant UOM to be different from Template UOM: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 146 | 3. Item Variant Tab | TC-ISI-011 | Copy Field To Variant table columns | Access via Inventory > Inventory Settings > Item Variant tab | Open the Item Variant tab | - | The columns are: Checkbox, No., Field Name | Medium | UI | - |
| 147 | 3. Item Variant Tab | TC-ISI-012 | Copy Field To Variant - empty table by default | Access via Inventory > Inventory Settings > Item Variant tab | Open the tab on a fresh system | - | The table shows the rows defined by the BA or is empty | Low | UI | Needs Clarification: SRS does not state the default content of the table. |
| 148 | 3. Item Variant Tab | TC-ISI-013 | Add Row adds a new row | Access via Inventory > Inventory Settings > Item Variant tab | Click Add Row | - | A new row is added to the table | High | Positive | - |
| 149 | 3. Item Variant Tab | TC-ISI-014 | No. column displays the row order | Access via Inventory > Inventory Settings > Item Variant tab | 1. Add three rows | - | The rows are numbered 1, 2, 3 | Medium | UI | - |
| 150 | 3. Item Variant Tab | TC-ISI-015 | No. column is renumbered after deleting a row | Access via Inventory > Inventory Settings > Item Variant tab | 1. Add three rows
2. Delete row 2 | - | The remaining rows are renumbered 1, 2 | Low | Positive | - |
| 151 | 3. Item Variant Tab | TC-ISI-016 | Field Name - select an eligible Item field | Access via Inventory > Inventory Settings > Item Variant tab | 1. Click Add Row
2. Select or enter a field name
3. Click Save | Field: brand | The field is added and saved | High | Positive | - |
| 152 | 3. Item Variant Tab | TC-ISI-017 | Field Name - fetches fields from the Item DocType | Access via Inventory > Inventory Settings > Item Variant tab | 1. Click Add Row
2. Open the Field Name list | - | All eligible fields of the Item DocType are available for selection | High | Positive | Needs Clarification: SRS describes Field Name as a 'Text input field' that 'allows the user to select an Item field'. Dropdown vs free text is not clear. |
| 153 | 3. Item Variant Tab | TC-ISI-018 | Field Name - excluded / system fields are not offered | Access via Inventory > Inventory Settings > Item Variant tab | 1. Click Add Row
2. Search for system-controlled fields | name, owner, creation | System-controlled and excluded fields are not available for selection | Medium | Negative | - |
| 154 | 3. Item Variant Tab | TC-ISI-019 | Field Name - mandatory | Access via Inventory > Inventory Settings > Item Variant tab | 1. Click Add Row
2. Leave Field Name empty
3. Click Save | Empty | An error message appears because the field is mandatory | High | Negative | - |
| 155 | 3. Item Variant Tab | TC-ISI-020 | Field Name - minimum length (2 characters) | Access via Inventory > Inventory Settings > Item Variant tab | 1. Enter a 2-character field name
2. Click Save | Field: uo | The value is accepted if it is a valid field, otherwise a validation error appears | Medium | Positive | - |
| 156 | 3. Item Variant Tab | TC-ISI-021 | Field Name - below minimum length (1 character) | Access via Inventory > Inventory Settings > Item Variant tab | 1. Enter 1 character
2. Click Save | Field: b | An error message appears because the text is shorter than 2 characters | Medium | Negative | - |
| 157 | 3. Item Variant Tab | TC-ISI-022 | Field Name - maximum length (100 characters) | Access via Inventory > Inventory Settings > Item Variant tab | 1. Enter 100 characters | 100 characters | The input is accepted by the field | Low | Positive | - |
| 158 | 3. Item Variant Tab | TC-ISI-023 | Field Name - input blocked beyond 100 characters | Access via Inventory > Inventory Settings > Item Variant tab | Type or paste 101 characters | 101 characters | Only the first 100 characters are accepted; further input is prevented | Low | Negative | - |
| 159 | 3. Item Variant Tab | TC-ISI-024 | Field Name - non-existing field | Access via Inventory > Inventory Settings > Item Variant tab | 1. Enter a field name that does not exist on Item
2. Click Save | not_a_field | An error message appears and the row is not saved | High | Negative | - |
| 160 | 3. Item Variant Tab | TC-ISI-025 | Field Name - duplicate field in two rows | Access via Inventory > Inventory Settings > Item Variant tab | 1. Add two rows with the same field
2. Click Save | brand x2 | An error message appears or the duplicate is ignored | Medium | Negative | Needs Clarification: Duplicates are not addressed in the SRS. |
| 161 | 3. Item Variant Tab | TC-ISI-026 | Field Name - letters, numbers and special characters | Access via Inventory > Inventory Settings > Item Variant tab | 1. Type a name that contains all three types | field_1-x | The input is accepted by the field | Low | Positive | - |
| 162 | 3. Item Variant Tab | TC-ISI-027 | Field Name - saved rows persist after reload | Access via Inventory > Inventory Settings > Item Variant tab | 1. Add a row with a valid field
2. Click Save
3. Reload the page | Field: brand | The row is displayed after reload | High | Positive | - |
| 163 | 3. Item Variant Tab | TC-ISI-028 | Select a row displays the action bar | Access via Inventory > Inventory Settings > Item Variant tab | Select the checkbox of a row | - | An action bar with Delete row appears | High | Positive | - |
| 164 | 3. Item Variant Tab | TC-ISI-029 | Delete a single row | Access via Inventory > Inventory Settings > Item Variant tab | 1. Select one row
2. Click Delete row
3. Click Save | - | The row is deleted and the change is saved | High | Positive | - |
| 165 | 3. Item Variant Tab | TC-ISI-030 | Delete multiple rows | Access via Inventory > Inventory Settings > Item Variant tab | 1. Select two rows
2. Click Delete row | - | Both rows are deleted | Medium | Positive | - |
| 166 | 3. Item Variant Tab | TC-ISI-031 | Delete row - confirmation | Access via Inventory > Inventory Settings > Item Variant tab | 1. Select a row
2. Click Delete row | - | The row is deleted immediately (no confirmation) | Low | Positive | Needs Clarification: SRS does not define a confirmation message for Delete row. |
| 167 | 3. Item Variant Tab | TC-ISI-032 | Edit Row - icon opens a popup | Access via Inventory > Inventory Settings > Item Variant tab | 1. Click the Edit Row icon of a row | - | A popup is displayed with the Field Name field | High | Positive | - |
| 168 | 3. Item Variant Tab | TC-ISI-033 | Edit Row - displays non-displayed fields | Access via Inventory > Inventory Settings > Item Variant tab | 1. Click the Edit Row icon
2. Review the popup | - | The fields not displayed in the table are visible and editable | Medium | Positive | Needs Clarification: SRS lists only 'Field Name' (and 'Options Field Name'); the non-displayed fields are not named. |
| 169 | 3. Item Variant Tab | TC-ISI-034 | Edit Row - change the field name | Access via Inventory > Inventory Settings > Item Variant tab | 1. Open Edit Row
2. Select another field
3. Click Update / Save | Field: item_group | The row is updated | High | Positive | - |
| 170 | 3. Item Variant Tab | TC-ISI-035 | Edit Row - mandatory Field Name | Access via Inventory > Inventory Settings > Item Variant tab | 1. Open Edit Row
2. Clear Field Name
3. Confirm | Empty | An error message appears because the field is mandatory | High | Negative | - |
| 171 | 3. Item Variant Tab | TC-ISI-036 | Edit Row - below minimum length | Access via Inventory > Inventory Settings > Item Variant tab | 1. Open Edit Row
2. Enter 1 character
3. Confirm | Field: b | An error message appears | Medium | Negative | - |
| 172 | 3. Item Variant Tab | TC-ISI-037 | Edit Row - input blocked beyond 100 characters | Access via Inventory > Inventory Settings > Item Variant tab | 1. Open Edit Row
2. Paste 101 characters | 101 characters | Only the first 100 characters are accepted | Low | Negative | - |
| 173 | 3. Item Variant Tab | TC-ISI-038 | Setting - opens a popup | Access via Inventory > Inventory Settings > Item Variant tab | Click Setting | - | A popup is displayed with: column drag and drop, Column width, Add / Remove columns, Update and Reset to default | High | Positive | - |
| 174 | 3. Item Variant Tab | TC-ISI-039 | Setting - rearrange columns by drag and drop | Access via Inventory > Inventory Settings > Item Variant tab | 1. Open Setting
2. Drag the Field Name column header before No.
3. Click Update | - | The columns are displayed in the new order | Medium | Positive | - |
| 175 | 3. Item Variant Tab | TC-ISI-040 | Setting - Column width default is 3 | Access via Inventory > Inventory Settings > Item Variant tab | Open Setting and review Column width | - | The default value is 3 | Medium | Positive | - |
| 176 | 3. Item Variant Tab | TC-ISI-041 | Setting - Column width valid value | Access via Inventory > Inventory Settings > Item Variant tab | 1. Enter a width
2. Click Update | Width: 5 | The width is saved and applied to the column | Medium | Positive | - |
| 177 | 3. Item Variant Tab | TC-ISI-042 | Setting - Column width numbers only | Access via Inventory > Inventory Settings > Item Variant tab | Type letters in Column width | abc | The letters are not accepted | Medium | Negative | - |
| 178 | 3. Item Variant Tab | TC-ISI-043 | Setting - Column width minimum length (1 character) | Access via Inventory > Inventory Settings > Item Variant tab | 1. Clear Column width
2. Click Update | Empty | An error message appears or the default is restored | Medium | Negative | Needs Clarification: SRS defines min length 1 but not the error message. |
| 179 | 3. Item Variant Tab | TC-ISI-044 | Setting - Column width maximum length (3 characters) | Access via Inventory > Inventory Settings > Item Variant tab | Type 4 digits in Column width | 1000 | Only the first 3 digits are accepted; further input is prevented | Medium | Negative | - |
| 180 | 3. Item Variant Tab | TC-ISI-045 | Setting - Column width zero or negative | Access via Inventory > Inventory Settings > Item Variant tab | 1. Enter 0
2. Click Update | 0 | Behavior follows the BA rule | Low | Negative | Needs Clarification: Valid range / unit of the width is not defined. |
| 181 | 3. Item Variant Tab | TC-ISI-046 | Setting - Add / Remove columns popup | Access via Inventory > Inventory Settings > Item Variant tab | 1. Open Setting
2. Click Add / Remove columns | - | A popup is displayed listing the available table columns with checkboxes | Medium | Positive | Needs Clarification: SRS ends the sentence with 'These columns are: Column Name / Field Name' without listing them. |
| 182 | 3. Item Variant Tab | TC-ISI-047 | Setting - hide a column | Access via Inventory > Inventory Settings > Item Variant tab | 1. Open Add / Remove columns
2. Uncheck a column
3. Click Update | Column: No. | The column is hidden from the table | Medium | Positive | - |
| 183 | 3. Item Variant Tab | TC-ISI-048 | Setting - show a hidden column | Access via Inventory > Inventory Settings > Item Variant tab | 1. Hide a column
2. Open Add / Remove columns
3. Check it again
4. Click Update | - | The column is displayed again | Medium | Positive | - |
| 184 | 3. Item Variant Tab | TC-ISI-049 | Setting - hide all columns | Access via Inventory > Inventory Settings > Item Variant tab | 1. Uncheck every column
2. Click Update | All columns | Behavior follows the BA rule (at least one column is required) | Low | Negative | Needs Clarification: Not defined. |
| 185 | 3. Item Variant Tab | TC-ISI-050 | Setting - Update saves the modifications | Access via Inventory > Inventory Settings > Item Variant tab | 1. Change the order and the width
2. Click Update
3. Reopen Setting | - | The changes are kept | High | Positive | - |
| 186 | 3. Item Variant Tab | TC-ISI-051 | Setting - Reset to default | Access via Inventory > Inventory Settings > Item Variant tab | 1. Change order, width and columns
2. Click Reset to default | - | All modifications return to their default values | High | Positive | - |
| 187 | 3. Item Variant Tab | TC-ISI-052 | Setting - close without Update | Access via Inventory > Inventory Settings > Item Variant tab | 1. Change the width
2. Close the popup
3. Reopen Setting | - | The unsaved change is not applied | Low | Negative | Needs Clarification: Not defined. |
| 188 | 3. Item Variant Tab | TC-ISI-053 | Setting - applies to the current user only or to everyone | Access via Inventory > Inventory Settings > Item Variant tab | 1. User A changes the setting
2. User B opens the tab | - | Behavior follows the BA rule | Low | Negative | Needs Clarification: SRS does not say whether the table layout is per user. |
| 189 | 3. Item Variant Tab | TC-ISI-054 | Save with valid data | Access via Inventory > Inventory Settings > Item Variant tab | 1. Change settings and rows
2. Click Save | - | The Item Variant Settings are saved and applied | High | Positive | - |
| 190 | 3. Item Variant Tab | TC-ISI-055 | Save with an invalid row | Access via Inventory > Inventory Settings > Item Variant tab | 1. Add a row without Field Name
2. Click Save | Empty row | A validation error message is displayed and nothing is saved | High | Negative | - |
| 191 | 3. Item Variant Tab | TC-ISI-056 | Save without changes | Access via Inventory > Inventory Settings > Item Variant tab | 1. Open the tab
2. Click Save | - | No error is displayed | Low | Positive | - |
| 192 | 3. Item Variant Tab | TC-ISI-057 | Item Variant tab labels are localized | Access via Inventory > Inventory Settings > Item Variant tab | 1. Switch the language to Arabic
2. Open the tab | - | All labels are displayed in Arabic | Low | UI | - |
| 193 | 4. Serial & Batch Item Tab | TC-ISB-001 | Serial & Batch Item tab sections are displayed | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the Serial & Batch Item tab | - | The sections are displayed: Activate Serial / Batch No For Item, Serial Item Settings, Batch Item Settings, Serial and Batch Bundle and Save | High | UI | - |
| 194 | 4. Serial & Batch Item Tab | TC-ISB-002 | Activate Serial / Batch No For Item - default state is checked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Activate Serial / Batch No For Item checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 195 | 4. Serial & Batch Item Tab | TC-ISB-003 | Activate Serial / Batch No For Item - uncheck and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Activate Serial / Batch No For Item
2. Click Save
3. Reload the page and open the tab | Activate Serial / Batch No For Item: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 196 | 4. Serial & Batch Item Tab | TC-ISB-004 | Activate Serial / Batch No For Item - re-check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Activate Serial / Batch No For Item and save
2. Check Activate Serial / Batch No For Item
3. Click Save
4. Reload the page | Activate Serial / Batch No For Item: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 197 | 4. Serial & Batch Item Tab | TC-ISB-005 | Activate Serial / Batch No For Item - unchecked hides the dependent settings | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Activate Serial / Batch No For Item | - | These settings are hidden: Pick Serial / Batch Based On, Allow existing Serial No to be Received again, Use Direct Serial / Batch fields, Disable Automatic Serial / Batch Selector, Use Item Moving Average for New Batches, Set Default Naming Series for Batch ID | High | Negative | - |
| 198 | 4. Serial & Batch Item Tab | TC-ISB-006 | Activate Serial / Batch No For Item - checked shows the dependent settings | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck then check Activate Serial / Batch No For Item | - | These settings are displayed: Pick Serial / Batch Based On, Allow existing Serial No to be Received again, Use Direct Serial / Batch fields, Disable Automatic Serial / Batch Selector, Use Item Moving Average for New Batches, Set Default Naming Series for Batch ID | High | Positive | - |
| 199 | 4. Serial & Batch Item Tab | TC-ISB-007 | Activate Serial / Batch No For Item - values are kept when hidden | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Change a dependent setting
2. Uncheck Activate and save
3. Check Activate and open the tab | - | The previous value of the dependent setting is restored (or reset) according to the BA rule | Medium | Negative | Needs Clarification: SRS does not say whether hidden settings keep their values. |
| 200 | 4. Serial & Batch Item Tab | TC-ISB-008 | Activate Serial / Batch No For Item - Maintain serial / batch on Add Item | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Activate and save
2. Open the Add Item screen | - | The serial / batch tracking options are not available on the item | High | Negative | Needs Clarification: Impact on existing serialized / batched items is not defined. |
| 201 | 4. Serial & Batch Item Tab | TC-ISB-009 | Pick Serial / Batch Based On - dropdown values | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the dropdown | - | The values are: FIFO, LIFO, Expiry | High | Positive | - |
| 202 | 4. Serial & Batch Item Tab | TC-ISB-010 | Pick Serial / Batch Based On - default is FIFO | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab on a fresh system | - | FIFO is selected | High | Positive | - |
| 203 | 4. Serial & Batch Item Tab | TC-ISB-011 | Pick Serial / Batch Based On - select LIFO and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Select LIFO
2. Click Save
3. Reload | LIFO | The value is saved | High | Positive | - |
| 204 | 4. Serial & Batch Item Tab | TC-ISB-012 | Pick Serial / Batch Based On - select Expiry and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Select Expiry
2. Click Save
3. Reload | Expiry | The value is saved | High | Positive | - |
| 205 | 4. Serial & Batch Item Tab | TC-ISB-013 | Pick Serial / Batch Based On - single selection | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Select LIFO
2. Select Expiry | - | Only one value is kept | Low | Positive | - |
| 206 | 4. Serial & Batch Item Tab | TC-ISB-014 | Allow existing Serial No to be Received again - default state is checked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Allow existing Serial No to be Received again checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 207 | 4. Serial & Batch Item Tab | TC-ISB-015 | Allow existing Serial No to be Received again - uncheck and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Allow existing Serial No to be Received again
2. Click Save
3. Reload the page and open the tab | Allow existing Serial No to be Received again: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 208 | 4. Serial & Batch Item Tab | TC-ISB-016 | Allow existing Serial No to be Received again - re-check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Allow existing Serial No to be Received again and save
2. Check Allow existing Serial No to be Received again
3. Click Save
4. Reload the page | Allow existing Serial No to be Received again: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 209 | 4. Serial & Batch Item Tab | TC-ISB-017 | Use Direct Serial / Batch fields - default state is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Use Direct Serial / Batch fields checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 210 | 4. Serial & Batch Item Tab | TC-ISB-018 | Use Direct Serial / Batch fields - check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Use Direct Serial / Batch fields
2. Click Save
3. Reload the page and open the tab | Use Direct Serial / Batch fields: checked | The setting is saved and still checked after reload | High | Positive | - |
| 211 | 4. Serial & Batch Item Tab | TC-ISB-019 | Use Direct Serial / Batch fields - uncheck again and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Use Direct Serial / Batch fields and save
2. Uncheck Use Direct Serial / Batch fields
3. Click Save
4. Reload the page | Use Direct Serial / Batch fields: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 212 | 4. Serial & Batch Item Tab | TC-ISB-020 | Disable Automatic Serial / Batch Selector - default state is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Disable Automatic Serial / Batch Selector checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 213 | 4. Serial & Batch Item Tab | TC-ISB-021 | Disable Automatic Serial / Batch Selector - check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Disable Automatic Serial / Batch Selector
2. Click Save
3. Reload the page and open the tab | Disable Automatic Serial / Batch Selector: checked | The setting is saved and still checked after reload | High | Positive | - |
| 214 | 4. Serial & Batch Item Tab | TC-ISB-022 | Disable Automatic Serial / Batch Selector - uncheck again and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Disable Automatic Serial / Batch Selector and save
2. Uncheck Disable Automatic Serial / Batch Selector
3. Click Save
4. Reload the page | Disable Automatic Serial / Batch Selector: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 215 | 4. Serial & Batch Item Tab | TC-ISB-023 | Disable Automatic Serial / Batch Selector - dependency on Use Direct Serial / Batch fields | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Use Direct Serial / Batch fields
2. Check Disable Automatic Serial / Batch Selector
3. Try to uncheck Use Direct Serial / Batch fields | - | The system behaves as defined by the BA rule | High | Negative | Needs Clarification: SRS says Disable Automatic Selector 'can't be unchecked until Use Serial / Batch fields is Unchecked'. The sentence is contradictory / reversed; the intended dependency (enable only when Use Direct fields is checked) must be confirmed. |
| 216 | 4. Serial & Batch Item Tab | TC-ISB-024 | Disable Automatic Serial / Batch Selector - check while Use Direct fields is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Keep Use Direct Serial / Batch fields unchecked
2. Try to check Disable Automatic Serial / Batch Selector | - | Behavior follows the BA rule (blocked or allowed) | Medium | Negative | Needs Clarification: Same ambiguity as above. |
| 217 | 4. Serial & Batch Item Tab | TC-ISB-025 | Allow negative stock for Batch - hidden | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and look for Allow negative stock for Batch | - | The checkbox is not displayed (hidden) and is unchecked by default | Low | UI | Needs Clarification: Hidden field; the value can only be verified through the API. |
| 218 | 4. Serial & Batch Item Tab | TC-ISB-026 | Use Item Moving Average for New Batches - default state is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Use Item Moving Average for New Batches checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 219 | 4. Serial & Batch Item Tab | TC-ISB-027 | Use Item Moving Average for New Batches - check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Use Item Moving Average for New Batches
2. Click Save
3. Reload the page and open the tab | Use Item Moving Average for New Batches: checked | The setting is saved and still checked after reload | High | Positive | - |
| 220 | 4. Serial & Batch Item Tab | TC-ISB-028 | Use Item Moving Average for New Batches - uncheck again and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Use Item Moving Average for New Batches and save
2. Uncheck Use Item Moving Average for New Batches
3. Click Save
4. Reload the page | Use Item Moving Average for New Batches: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 221 | 4. Serial & Batch Item Tab | TC-ISB-029 | Set Default Naming Series for Batch ID - default state is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Set Default Naming Series for Batch ID checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 222 | 4. Serial & Batch Item Tab | TC-ISB-030 | Set Default Naming Series for Batch ID - check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Set Default Naming Series for Batch ID
2. Click Save
3. Reload the page and open the tab | Set Default Naming Series for Batch ID: checked | The setting is saved and still checked after reload | High | Positive | - |
| 223 | 4. Serial & Batch Item Tab | TC-ISB-031 | Set Default Naming Series for Batch ID - uncheck again and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Set Default Naming Series for Batch ID and save
2. Uncheck Set Default Naming Series for Batch ID
3. Click Save
4. Reload the page | Set Default Naming Series for Batch ID: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 224 | 4. Serial & Batch Item Tab | TC-ISB-032 | Naming Series Prefix - hidden when Set Default Naming Series for Batch ID is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Set Default Naming Series for Batch ID | - | The Naming Series Prefix field is not displayed | High | Negative | - |
| 225 | 4. Serial & Batch Item Tab | TC-ISB-033 | Naming Series Prefix - displayed when Set Default Naming Series for Batch ID is checked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Set Default Naming Series for Batch ID | - | The Naming Series Prefix field is displayed | High | Positive | - |
| 226 | 4. Serial & Batch Item Tab | TC-ISB-034 | Naming Series Prefix - default value BATCH- | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Set Default Naming Series for Batch ID | - | The field shows BATCH- | High | Positive | - |
| 227 | 4. Serial & Batch Item Tab | TC-ISB-035 | Naming Series Prefix - valid value | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter a prefix
2. Click Save | Prefix: LOT-2026- | The value is saved | High | Positive | - |
| 228 | 4. Serial & Batch Item Tab | TC-ISB-036 | Naming Series Prefix - minimum length (3 characters) | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter 3 characters
2. Click Save | Prefix: LOT | The value is accepted | Medium | Positive | - |
| 229 | 4. Serial & Batch Item Tab | TC-ISB-037 | Naming Series Prefix - below minimum length (2 characters) | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter 2 characters
2. Click Save | Prefix: LO | An error message appears because the text is shorter than 3 characters | High | Negative | - |
| 230 | 4. Serial & Batch Item Tab | TC-ISB-038 | Naming Series Prefix - maximum length (500 characters) | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter 500 characters
2. Click Save | 500 characters | The value is accepted | Medium | Positive | - |
| 231 | 4. Serial & Batch Item Tab | TC-ISB-039 | Naming Series Prefix - input blocked beyond 500 characters | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Type or paste 501 characters | 501 characters | Only the first 500 characters are accepted; further input is prevented | Medium | Negative | - |
| 232 | 4. Serial & Batch Item Tab | TC-ISB-040 | Naming Series Prefix - letters, numbers and special characters | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter a prefix with all three types
2. Click Save | B-26/# | The value is accepted | Medium | Positive | - |
| 233 | 4. Serial & Batch Item Tab | TC-ISB-041 | Naming Series Prefix - optional (empty) | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Clear the prefix
2. Click Save | Empty | Behavior follows the BA rule (saved empty or default restored) | Medium | Negative | Needs Clarification: SRS says Optional and defines a default; the effect of an empty value is not defined. |
| 234 | 4. Serial & Batch Item Tab | TC-ISB-042 | Naming Series Prefix - hidden when Activate Serial / Batch No is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Set Default Naming Series for Batch ID
2. Uncheck Activate Serial / Batch No For Item | - | The Naming Series Prefix field is not displayed | Medium | Negative | - |
| 235 | 4. Serial & Batch Item Tab | TC-ISB-043 | Naming Series Prefix - applied to a new batch | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Set prefix LOT-2026- and save
2. Create a new batch for an item without a naming series | LOT-2026- | The batch ID starts with the configured prefix | High | Positive | - |
| 236 | 4. Serial & Batch Item Tab | TC-ISB-044 | Auto create Serial and Batch Bundle for outward - default state is checked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Auto create Serial and Batch Bundle for outward checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 237 | 4. Serial & Batch Item Tab | TC-ISB-045 | Auto create Serial and Batch Bundle for outward - uncheck and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Auto create Serial and Batch Bundle for outward
2. Click Save
3. Reload the page and open the tab | Auto create Serial and Batch Bundle for outward: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 238 | 4. Serial & Batch Item Tab | TC-ISB-046 | Auto create Serial and Batch Bundle for outward - re-check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Auto create Serial and Batch Bundle for outward and save
2. Check Auto create Serial and Batch Bundle for outward
3. Click Save
4. Reload the page | Auto create Serial and Batch Bundle for outward: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 239 | 4. Serial & Batch Item Tab | TC-ISB-047 | Do not update Serial / Batch on creation of auto bundle - default state is checked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Do not update Serial / Batch on creation of auto bundle checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 240 | 4. Serial & Batch Item Tab | TC-ISB-048 | Do not update Serial / Batch on creation of auto bundle - uncheck and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Do not update Serial / Batch on creation of auto bundle
2. Click Save
3. Reload the page and open the tab | Do not update Serial / Batch on creation of auto bundle: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 241 | 4. Serial & Batch Item Tab | TC-ISB-049 | Do not update Serial / Batch on creation of auto bundle - re-check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Do not update Serial / Batch on creation of auto bundle and save
2. Check Do not update Serial / Batch on creation of auto bundle
3. Click Save
4. Reload the page | Do not update Serial / Batch on creation of auto bundle: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 242 | 4. Serial & Batch Item Tab | TC-ISB-050 | Set Default Naming Series for Serial and Batch Bundle - default state is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Open the tab and review the Set Default Naming Series for Serial and Batch Bundle checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 243 | 4. Serial & Batch Item Tab | TC-ISB-051 | Set Default Naming Series for Serial and Batch Bundle - check and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Set Default Naming Series for Serial and Batch Bundle
2. Click Save
3. Reload the page and open the tab | Set Default Naming Series for Serial and Batch Bundle: checked | The setting is saved and still checked after reload | High | Positive | - |
| 244 | 4. Serial & Batch Item Tab | TC-ISB-052 | Set Default Naming Series for Serial and Batch Bundle - uncheck again and save | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Set Default Naming Series for Serial and Batch Bundle and save
2. Uncheck Set Default Naming Series for Serial and Batch Bundle
3. Click Save
4. Reload the page | Set Default Naming Series for Serial and Batch Bundle: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 245 | 4. Serial & Batch Item Tab | TC-ISB-053 | Bundle Naming Series Options and Configure Series are hidden when the checkbox is unchecked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Uncheck Set Default Naming Series for Serial and Batch Bundle | - | The Naming Series Options label and the Configure Series button are not displayed | High | Negative | - |
| 246 | 4. Serial & Batch Item Tab | TC-ISB-054 | Bundle Naming Series Options and Configure Series are displayed when the checkbox is checked | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check Set Default Naming Series for Serial and Batch Bundle | - | The Naming Series Options label and the Configure Series button are displayed | High | Positive | - |
| 247 | 4. Serial & Batch Item Tab | TC-ISB-055 | Bundle Naming Series Options - read only | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Click the Naming Series Options label | - | The label cannot be edited | Low | Negative | - |
| 248 | 4. Serial & Batch Item Tab | TC-ISB-056 | Bundle Configure Series - opens the popup | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Check the checkbox
2. Click Configure Series | - | A popup is displayed with the Add Series Prefix table (Checkbox, Series, Preview), Add Row and Update | High | Positive | - |
| 249 | 4. Serial & Batch Item Tab | TC-ISB-057 | Bundle series - valid pattern | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Click Add Row
2. Enter a series
3. Click Update | Series: SABB-.##### | The series is saved and applied | High | Positive | - |
| 250 | 4. Serial & Batch Item Tab | TC-ISB-058 | Bundle series - Preview displays a sample ID | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Click Add Row
2. Enter a series | SABB-.##### | The Preview label displays a sample Serial and Batch Bundle ID | High | Positive | - |
| 251 | 4. Serial & Batch Item Tab | TC-ISB-059 | Bundle series - minimum length (2 characters) | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter 2 characters
2. Click Update | SB | The series is accepted | Medium | Positive | - |
| 252 | 4. Serial & Batch Item Tab | TC-ISB-060 | Bundle series - below minimum length (1 character) | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter 1 character
2. Click Update | S | An error message appears because the text is shorter than 2 characters | High | Negative | - |
| 253 | 4. Serial & Batch Item Tab | TC-ISB-061 | Bundle series - maximum length (100 characters) | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter 100 characters
2. Click Update | 100 characters | The series is accepted | Medium | Positive | - |
| 254 | 4. Serial & Batch Item Tab | TC-ISB-062 | Bundle series - input blocked beyond 100 characters | Access via Inventory > Inventory Settings > Serial & Batch Item tab | Type or paste 101 characters | 101 characters | Only the first 100 characters are accepted; further input is prevented | Medium | Negative | - |
| 255 | 4. Serial & Batch Item Tab | TC-ISB-063 | Bundle series - invalid pattern | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter an invalid pattern
2. Click Update | ####-@@ | An error message appears indicating an invalid series pattern | High | Negative | Needs Clarification: Invalid pattern is not defined. |
| 256 | 4. Serial & Batch Item Tab | TC-ISB-064 | Bundle series - empty value | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Click Add Row
2. Leave Series empty
3. Click Update | Empty | Behavior follows the BA rule | Medium | Negative | Needs Clarification: Series is 'Optional' but has validation messages. |
| 257 | 4. Serial & Batch Item Tab | TC-ISB-065 | Bundle series - Delete row | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Select one or more rows
2. Click Delete row | - | The selected rows are deleted | Medium | Positive | - |
| 258 | 4. Serial & Batch Item Tab | TC-ISB-066 | Bundle series - Update with one invalid row | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Add a valid and an invalid row
2. Click Update | SABB-.#### / S | A validation error is displayed for the invalid row and nothing is saved | Medium | Negative | - |
| 259 | 4. Serial & Batch Item Tab | TC-ISB-067 | Bundle series - applied to a new Serial and Batch Bundle | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Configure SABB-.##### and save
2. Submit a transaction that creates a bundle | SABB-.##### | The bundle ID follows the configured series | High | Positive | - |
| 260 | 4. Serial & Batch Item Tab | TC-ISB-068 | Save with valid data | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Change several settings
2. Click Save | - | The Inventory Settings are saved and applied | High | Positive | - |
| 261 | 4. Serial & Batch Item Tab | TC-ISB-069 | Save with an invalid prefix | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Enter a 2-character prefix
2. Click Save | LO | A validation error message is displayed and nothing is saved | High | Negative | - |
| 262 | 4. Serial & Batch Item Tab | TC-ISB-070 | Save without changes | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Open the tab
2. Click Save | - | No error is displayed | Low | Positive | - |
| 263 | 4. Serial & Batch Item Tab | TC-ISB-071 | Serial & Batch Item tab labels are localized | Access via Inventory > Inventory Settings > Serial & Batch Item tab | 1. Switch the language to Arabic
2. Open the tab | - | All labels are displayed in Arabic | Low | UI | - |
| 264 | 5. Stock Reservation Tab | TC-ISR-001 | Stock Reservation tab components are displayed | Access via Inventory > Inventory Settings > Stock Reservation tab | Open the Stock Reservation tab | - | The tab displays: Enable Stock Reservation, Auto Reserve Stock, Allow Partial Reservation, Auto reserve Stock for Sales Order on Purchase Receipt Submission, Auto Reserve Serial and Batch NOS and Save | High | UI | - |
| 265 | 5. Stock Reservation Tab | TC-ISR-002 | Enable Stock Reservation - default state is checked | Access via Inventory > Inventory Settings > Stock Reservation tab | Open the tab and review the Enable Stock Reservation checkbox | - | The checkbox is checked by default | Medium | UI | - |
| 266 | 5. Stock Reservation Tab | TC-ISR-003 | Enable Stock Reservation - uncheck and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck Enable Stock Reservation
2. Click Save
3. Reload the page and open the tab | Enable Stock Reservation: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 267 | 5. Stock Reservation Tab | TC-ISR-004 | Enable Stock Reservation - re-check and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck Enable Stock Reservation and save
2. Check Enable Stock Reservation
3. Click Save
4. Reload the page | Enable Stock Reservation: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 268 | 5. Stock Reservation Tab | TC-ISR-005 | Enable Stock Reservation - unchecked hides the dependent settings | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck Enable Stock Reservation | - | These settings are hidden: Allow Partial Reservation, Auto reserve Stock for Sales Order on Purchase Receipt Submission, Auto Reserve Serial and Batch NOS | High | Negative | - |
| 269 | 5. Stock Reservation Tab | TC-ISR-006 | Enable Stock Reservation - checked shows the dependent settings | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck then check Enable Stock Reservation | - | The three dependent settings are displayed | High | Positive | - |
| 270 | 5. Stock Reservation Tab | TC-ISR-007 | Enable Stock Reservation - Auto Reserve Stock visibility when unchecked | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck Enable Stock Reservation | - | Behavior of Auto Reserve Stock follows the BA rule (hidden or disabled) | Medium | Negative | Needs Clarification: SRS does not list Auto Reserve Stock among the settings that depend on Enable Stock Reservation. |
| 271 | 5. Stock Reservation Tab | TC-ISR-008 | Enable Stock Reservation - values are kept when hidden | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Change a dependent setting
2. Uncheck Enable and save
3. Check Enable again | - | The previous value of the dependent setting is restored (or reset) | Medium | Negative | Needs Clarification: Not defined. |
| 272 | 5. Stock Reservation Tab | TC-ISR-009 | Auto Reserve Stock - default state is unchecked | Access via Inventory > Inventory Settings > Stock Reservation tab | Open the tab and review the Auto Reserve Stock checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 273 | 5. Stock Reservation Tab | TC-ISR-010 | Auto Reserve Stock - check and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Check Auto Reserve Stock
2. Click Save
3. Reload the page and open the tab | Auto Reserve Stock: checked | The setting is saved and still checked after reload | High | Positive | - |
| 274 | 5. Stock Reservation Tab | TC-ISR-011 | Auto Reserve Stock - uncheck again and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Check Auto Reserve Stock and save
2. Uncheck Auto Reserve Stock
3. Click Save
4. Reload the page | Auto Reserve Stock: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 275 | 5. Stock Reservation Tab | TC-ISR-012 | Allow Partial Reservation - default state is checked | Access via Inventory > Inventory Settings > Stock Reservation tab | Open the tab and review the Allow Partial Reservation checkbox (with Enable Stock Reservation checked) | - | The checkbox is checked by default | Medium | UI | - |
| 276 | 5. Stock Reservation Tab | TC-ISR-013 | Allow Partial Reservation - uncheck and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck Allow Partial Reservation
2. Click Save
3. Reload the page and open the tab | Allow Partial Reservation: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 277 | 5. Stock Reservation Tab | TC-ISR-014 | Allow Partial Reservation - re-check and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck Allow Partial Reservation and save
2. Check Allow Partial Reservation
3. Click Save
4. Reload the page | Allow Partial Reservation: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 278 | 5. Stock Reservation Tab | TC-ISR-015 | Auto reserve Stock for Sales Order on Purchase Receipt Submission - default state is unchecked | Access via Inventory > Inventory Settings > Stock Reservation tab | Open the tab and review the Auto reserve Stock for Sales Order on Purchase Receipt Submission checkbox (with Enable Stock Reservation checked) | - | The checkbox is unchecked by default | Medium | UI | - |
| 279 | 5. Stock Reservation Tab | TC-ISR-016 | Auto reserve Stock for Sales Order on Purchase Receipt Submission - check and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Check Auto reserve Stock for Sales Order on Purchase Receipt Submission
2. Click Save
3. Reload the page and open the tab | Auto reserve Stock for Sales Order on Purchase Receipt Submission: checked | The setting is saved and still checked after reload | High | Positive | - |
| 280 | 5. Stock Reservation Tab | TC-ISR-017 | Auto reserve Stock for Sales Order on Purchase Receipt Submission - uncheck again and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Check Auto reserve Stock for Sales Order on Purchase Receipt Submission and save
2. Uncheck Auto reserve Stock for Sales Order on Purchase Receipt Submission
3. Click Save
4. Reload the page | Auto reserve Stock for Sales Order on Purchase Receipt Submission: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 281 | 5. Stock Reservation Tab | TC-ISR-018 | Auto Reserve Serial and Batch NOS - default state is checked | Access via Inventory > Inventory Settings > Stock Reservation tab | Open the tab and review the Auto Reserve Serial and Batch NOS checkbox (with Enable Stock Reservation checked) | - | The checkbox is checked by default | Medium | UI | - |
| 282 | 5. Stock Reservation Tab | TC-ISR-019 | Auto Reserve Serial and Batch NOS - uncheck and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck Auto Reserve Serial and Batch NOS
2. Click Save
3. Reload the page and open the tab | Auto Reserve Serial and Batch NOS: unchecked | The setting is saved and still unchecked after reload | High | Positive | - |
| 283 | 5. Stock Reservation Tab | TC-ISR-020 | Auto Reserve Serial and Batch NOS - re-check and save | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Uncheck Auto Reserve Serial and Batch NOS and save
2. Check Auto Reserve Serial and Batch NOS
3. Click Save
4. Reload the page | Auto Reserve Serial and Batch NOS: checked | The setting is saved and checked after reload | Medium | Positive | - |
| 284 | 5. Stock Reservation Tab | TC-ISR-021 | Save with valid data | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Change several settings
2. Click Save | - | The Inventory Settings are saved and applied | High | Positive | - |
| 285 | 5. Stock Reservation Tab | TC-ISR-022 | Save without changes | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Open the tab
2. Click Save | - | No error is displayed | Low | Positive | - |
| 286 | 5. Stock Reservation Tab | TC-ISR-023 | Stock Reservation tab labels are localized | Access via Inventory > Inventory Settings > Stock Reservation tab | 1. Switch the language to Arabic
2. Open the tab | - | All labels are displayed in Arabic | Low | UI | - |
| 287 | 6. Quality Tab | TC-ISQ-001 | Quality tab components are displayed | Access via Inventory > Inventory Settings > Quality tab | Open the Quality tab | - | The tab displays: Allow to make Quality Inspection after Purchase / Delivery, Action if Quality Inspection is rejected, Action if Quality Inspection is not submitted and Save | High | UI | - |
| 288 | 6. Quality Tab | TC-ISQ-002 | Allow to make Quality Inspection after Purchase / Delivery - default state is unchecked | Access via Inventory > Inventory Settings > Quality tab | Open the tab and review the Allow to make Quality Inspection after Purchase / Delivery checkbox | - | The checkbox is unchecked by default | Medium | UI | - |
| 289 | 6. Quality Tab | TC-ISQ-003 | Allow to make Quality Inspection after Purchase / Delivery - check and save | Access via Inventory > Inventory Settings > Quality tab | 1. Check Allow to make Quality Inspection after Purchase / Delivery
2. Click Save
3. Reload the page and open the tab | Allow to make Quality Inspection after Purchase / Delivery: checked | The setting is saved and still checked after reload | High | Positive | - |
| 290 | 6. Quality Tab | TC-ISQ-004 | Allow to make Quality Inspection after Purchase / Delivery - uncheck again and save | Access via Inventory > Inventory Settings > Quality tab | 1. Check Allow to make Quality Inspection after Purchase / Delivery and save
2. Uncheck Allow to make Quality Inspection after Purchase / Delivery
3. Click Save
4. Reload the page | Allow to make Quality Inspection after Purchase / Delivery: unchecked | The setting is saved and unchecked after reload | Medium | Positive | - |
| 291 | 6. Quality Tab | TC-ISQ-005 | Action if Quality Inspection is rejected - dropdown values | Access via Inventory > Inventory Settings > Quality tab | Open the dropdown | - | The values are: Stop, Warn | High | Positive | - |
| 292 | 6. Quality Tab | TC-ISQ-006 | Action if Quality Inspection is rejected - default is Stop | Access via Inventory > Inventory Settings > Quality tab | Open the tab on a fresh system | - | Stop is selected | High | Positive | - |
| 293 | 6. Quality Tab | TC-ISQ-007 | Action if Quality Inspection is rejected - select Warn and save | Access via Inventory > Inventory Settings > Quality tab | 1. Select Warn
2. Click Save
3. Reload | Warn | The value is saved | High | Positive | - |
| 294 | 6. Quality Tab | TC-ISQ-008 | Action if Quality Inspection is rejected - select Stop and save | Access via Inventory > Inventory Settings > Quality tab | 1. Select Warn and save
2. Select Stop
3. Click Save | Stop | The value is saved | Medium | Positive | - |
| 295 | 6. Quality Tab | TC-ISQ-009 | Action if Quality Inspection is rejected - single selection | Access via Inventory > Inventory Settings > Quality tab | 1. Select Warn
2. Select Stop | - | Only one value is kept | Low | Positive | - |
| 296 | 6. Quality Tab | TC-ISQ-010 | Action if Quality Inspection is not submitted - dropdown values | Access via Inventory > Inventory Settings > Quality tab | Open the dropdown | - | The values are: Stop, Warn | High | Positive | - |
| 297 | 6. Quality Tab | TC-ISQ-011 | Action if Quality Inspection is not submitted - default is Stop | Access via Inventory > Inventory Settings > Quality tab | Open the tab on a fresh system | - | Stop is selected | High | Positive | - |
| 298 | 6. Quality Tab | TC-ISQ-012 | Action if Quality Inspection is not submitted - select Warn and save | Access via Inventory > Inventory Settings > Quality tab | 1. Select Warn
2. Click Save
3. Reload | Warn | The value is saved | High | Positive | - |
| 299 | 6. Quality Tab | TC-ISQ-013 | Action if Quality Inspection is not submitted - select Stop and save | Access via Inventory > Inventory Settings > Quality tab | 1. Select Warn and save
2. Select Stop
3. Click Save | Stop | The value is saved | Medium | Positive | - |
| 300 | 6. Quality Tab | TC-ISQ-014 | Action if Quality Inspection is not submitted - single selection | Access via Inventory > Inventory Settings > Quality tab | 1. Select Warn
2. Select Stop | - | Only one value is kept | Low | Positive | - |
| 301 | 6. Quality Tab | TC-ISQ-015 | The two actions are independent | Access via Inventory > Inventory Settings > Quality tab | 1. Set rejected = Warn and not submitted = Stop
2. Click Save
3. Reload | Warn / Stop | Each dropdown keeps its own value | Medium | Positive | - |
| 302 | 6. Quality Tab | TC-ISQ-016 | Save with valid data | Access via Inventory > Inventory Settings > Quality tab | 1. Change settings
2. Click Save | - | The Inventory Settings are saved and applied | High | Positive | - |
| 303 | 6. Quality Tab | TC-ISQ-017 | Save without changes | Access via Inventory > Inventory Settings > Quality tab | 1. Open the tab
2. Click Save | - | No error is displayed | Low | Positive | - |
| 304 | 6. Quality Tab | TC-ISQ-018 | Quality tab labels are localized | Access via Inventory > Inventory Settings > Quality tab | 1. Switch the language to Arabic
2. Open the tab | - | All labels are displayed in Arabic | Low | UI | - |
| 305 | 7. Stock Closing Tab | TC-ISC-001 | Stock Closing tab components are displayed | Access via Inventory > Inventory Settings > Stock Closing tab | Open the Stock Closing tab | - | The tab displays: Freeze stock older than (days), Freeze stock up to and Save | High | UI | - |
| 306 | 7. Stock Closing Tab | TC-ISC-002 | Freeze stock older than (days) - default value is 0 | Access via Inventory > Inventory Settings > Stock Closing tab | Open the tab on a fresh system | - | The field shows 0 | High | Positive | - |
| 307 | 7. Stock Closing Tab | TC-ISC-003 | Freeze stock older than (days) - valid number | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Enter a number
2. Click Save
3. Reload | 30 | The value is saved | High | Positive | - |
| 308 | 7. Stock Closing Tab | TC-ISC-004 | Freeze stock older than (days) - zero disables the restriction | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Enter 0
2. Click Save | 0 | The restriction is disabled and the value is saved | High | Positive | - |
| 309 | 7. Stock Closing Tab | TC-ISC-005 | Freeze stock older than (days) - letters | Access via Inventory > Inventory Settings > Stock Closing tab | Type letters | abc | The letters are not accepted (numbers only) | High | Negative | - |
| 310 | 7. Stock Closing Tab | TC-ISC-006 | Freeze stock older than (days) - special characters | Access via Inventory > Inventory Settings > Stock Closing tab | Type special characters | @# | The characters are not accepted | Medium | Negative | - |
| 311 | 7. Stock Closing Tab | TC-ISC-007 | Freeze stock older than (days) - negative number | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Enter -5
2. Click Save | -5 | The value is rejected | High | Negative | Needs Clarification: Negatives are not addressed in the SRS. |
| 312 | 7. Stock Closing Tab | TC-ISC-008 | Freeze stock older than (days) - decimal number | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Enter 1.5
2. Click Save | 1.5 | The value is rejected (numbers only) | Medium | Negative | Needs Clarification: Decimals are not addressed in the SRS. |
| 313 | 7. Stock Closing Tab | TC-ISC-009 | Freeze stock older than (days) - empty value | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Clear the field
2. Click Save | Empty | Behavior follows the BA rule (saved as 0 or error message) | High | Negative | Needs Clarification: SRS says Optional, but also that an error appears when shorter than the minimum length of 1; contradictory. |
| 314 | 7. Stock Closing Tab | TC-ISC-010 | Freeze stock older than (days) - maximum length (100 characters) | Access via Inventory > Inventory Settings > Stock Closing tab | Enter 100 digits | 100 digits | The input is accepted by the field | Low | Positive | Needs Clarification: No numeric upper limit is defined. |
| 315 | 7. Stock Closing Tab | TC-ISC-011 | Freeze stock older than (days) - input blocked beyond 100 characters | Access via Inventory > Inventory Settings > Stock Closing tab | Type 101 digits | 101 digits | Only the first 100 digits are accepted; further input is prevented | Medium | Negative | - |
| 316 | 7. Stock Closing Tab | TC-ISC-012 | Freeze stock older than (days) - very large value | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Enter 99999999999
2. Click Save | 99999999999 | A clear validation error is shown (no server error) | Medium | Negative | Needs Clarification: No numeric limit defined. |
| 317 | 7. Stock Closing Tab | TC-ISC-013 | Freeze stock older than (days) - spaces | Access via Inventory > Inventory Settings > Stock Closing tab | Type spaces | ' ' | The spaces are not accepted | Low | Negative | - |
| 318 | 7. Stock Closing Tab | TC-ISC-014 | Freeze stock up to - default is empty | Access via Inventory > Inventory Settings > Stock Closing tab | Open the tab on a fresh system | - | The field is empty | High | Positive | - |
| 319 | 7. Stock Closing Tab | TC-ISC-015 | Freeze stock up to - select a date from the calendar | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Click the field
2. Pick a date | 2026-10-31 | The picked date is displayed | High | Positive | - |
| 320 | 7. Stock Closing Tab | TC-ISC-016 | Freeze stock up to - save and reload | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Pick a date
2. Click Save
3. Reload | 2026-10-31 | The date is saved and displayed | High | Positive | - |
| 321 | 7. Stock Closing Tab | TC-ISC-017 | Freeze stock up to - optional | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Clear the date
2. Click Save | Empty | The setting is saved without an error | Medium | Positive | - |
| 322 | 7. Stock Closing Tab | TC-ISC-018 | Freeze stock up to - future date | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Pick a future date
2. Click Save | 2027-01-01 | Behavior follows the BA rule (accepted or rejected) | Medium | Positive | Needs Clarification: SRS does not say whether future dates are allowed. |
| 323 | 7. Stock Closing Tab | TC-ISC-019 | Freeze stock up to - manually typed invalid date | Access via Inventory > Inventory Settings > Stock Closing tab | Type an invalid date | 31/31/2026 | The value is rejected | Low | Negative | - |
| 324 | 7. Stock Closing Tab | TC-ISC-020 | Role allowed to create/edit back-dated transactions - hidden | Access via Inventory > Inventory Settings > Stock Closing tab | Open the tab and look for the field | - | The field is not displayed (hidden) | Medium | UI | Needs Clarification: SRS marks the field Hidden but defines its rules; the condition for showing it is not stated. |
| 325 | 7. Stock Closing Tab | TC-ISC-021 | Save with valid data | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Change settings
2. Click Save | - | The Inventory Settings are saved and applied | High | Positive | - |
| 326 | 7. Stock Closing Tab | TC-ISC-022 | Save with an invalid value | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Enter an invalid value in Freeze stock older than (days)
2. Click Save | abc / -5 | A validation error message is displayed and nothing is saved | High | Negative | - |
| 327 | 7. Stock Closing Tab | TC-ISC-023 | Save without changes | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Open the tab
2. Click Save | - | No error is displayed | Low | Positive | - |
| 328 | 7. Stock Closing Tab | TC-ISC-024 | Stock Closing tab labels are localized | Access via Inventory > Inventory Settings > Stock Closing tab | 1. Switch the language to Arabic
2. Open the tab | - | All labels are displayed in Arabic | Low | UI | - |
| 329 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-001 | Each tab has its own Save button | The setting is saved before running the scenario | Open every tab and review the Save button | 7 tabs | A Save button is displayed on every tab | Medium | UI | - |
| 330 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-002 | Switch tabs with unsaved changes | The setting is saved before running the scenario | 1. Change a field on the Defaults tab
2. Switch to Quality tab
3. Return to Defaults | - | Behavior follows the BA rule (change kept, discarded, or warning shown) | Medium | Negative | Needs Clarification: SRS does not define behavior when switching tabs with unsaved changes. |
| 331 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-003 | Change in one tab then Save in another tab | The setting is saved before running the scenario | 1. Change a field on the Defaults tab
2. Switch to Quality tab and change a field
3. Click Save on the Quality tab
4. Reload | - | Behavior follows the BA rule (one Save may save all tabs or only the current one) | High | Negative | Needs Clarification: All tabs belong to one Inventory Settings document; whether Save is per tab is not defined. |
| 332 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-004 | Leave the screen with unsaved changes | The setting is saved before running the scenario | 1. Change a field
2. Navigate to another screen | - | A warning about unsaved changes is displayed (or the changes are discarded) | Low | Negative | Needs Clarification: Not defined. |
| 333 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-005 | Settings are visible to all users | The setting is saved before running the scenario | 1. User A saves a change
2. User B opens the Inventory Settings | - | User B sees the updated value | Medium | Positive | - |
| 334 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-006 | Access to Inventory Settings by a user without permission | The setting is saved before running the scenario | 1. Log in with a user that has no permission on Inventory Settings
2. Open the screen | - | Access is denied with a clear message | High | Negative | Needs Clarification: SRS does not define roles / permissions for this screen. |
| 335 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-007 | Concurrent edits by two users | The setting is saved before running the scenario | 1. User A and B open the settings
2. User A saves
3. User B saves a different change | - | User B gets a document-modified message (or last save wins per the BA rule) | Low | Negative | Needs Clarification: Not defined. |
| 336 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-008 | Item Naming By = Item Code affects Add Item | The setting is saved before running the scenario | 1. Select Item Code and save
2. Open Add Item | Item Code | The item code is entered manually on the Add Item screen | High | Positive | - |
| 337 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-009 | Item Naming By = Naming Series affects Add Item | The setting is saved before running the scenario | 1. Configure ITM-.##### and select Naming Series
2. Open Add Item and save an item | Naming Series | The item ID is generated from the series and no manual code is requested | High | Positive | Needs Clarification: How the Add Item screen changes (hidden code field) is not defined. |
| 338 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-010 | Default Item Group is applied on a new item | The setting is saved before running the scenario | 1. Set Default Item Group and save
2. Open Add Item | Products | The Item Group field is pre-filled with the default | High | Positive | - |
| 339 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-011 | Default Stock UOM is applied on a new item | The setting is saved before running the scenario | 1. Set Default Stock UOM = Kg and save
2. Open Add Item | Kg | The Stock UOM field is pre-filled with Kg | High | Positive | - |
| 340 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-012 | Default Valuation Method is applied on a new item | The setting is saved before running the scenario | 1. Set Moving Average and save
2. Open Add Item | Moving Average | The Valuation Method of the new item defaults to Moving Average | High | Positive | - |
| 341 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-013 | Default Warehouse is applied in stock transactions | The setting is saved before running the scenario | 1. Set Default Warehouse = Stores - E and save
2. Open Add Stock Entry | Stores - E | The warehouse fields are pre-filled with the default | High | Positive | - |
| 342 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-014 | Sample Retention Warehouse is used by Quality / Sample flows | The setting is saved before running the scenario | 1. Set Sample Retention Warehouse and save
2. Create a sample retention Stock Entry | Samples - E | The configured warehouse is used | Medium | Positive | Needs Clarification: SRS does not describe where this warehouse is consumed. |
| 343 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-015 | Auto Create Item Price - first sales transaction | The setting is saved before running the scenario | 1. Enable the setting and save
2. Create a Sales Order for an item without an Item Price
3. Submit it | Rate: 100 | An Item Price is created in the selling price list with the rate of the transaction | High | Positive | - |
| 344 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-016 | Auto Create Item Price - first purchase transaction | The setting is saved before running the scenario | 1. Enable the setting and save
2. Create a Purchase Order for an item without a buying Item Price | Rate: 80 | An Item Price is created in the buying price list with the transaction rate | High | Positive | - |
| 345 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-017 | Auto Create Item Price - existing price is not overwritten | The setting is saved before running the scenario | 1. Item already has an Item Price
2. Create a transaction with a different rate | Existing 100 / new 120 | The existing Item Price is not changed | High | Negative | - |
| 346 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-018 | Auto Create Item Price - disabled | The setting is saved before running the scenario | 1. Disable the setting and save
2. Create a transaction for an item without an Item Price | - | No Item Price is created | Medium | Negative | - |
| 347 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-019 | Allow to edit stock UOM qty for Sales documents - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Open a Sales Order item row | - | Qty as per stock UOM is editable | Medium | Positive | - |
| 348 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-020 | Allow to edit stock UOM qty for Sales documents - disabled | The setting is saved before running the scenario | 1. Disable and save
2. Open a Sales Order item row | - | Qty as per stock UOM is read only | Medium | Negative | - |
| 349 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-021 | Allow to edit stock UOM qty for Purchase documents - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Open a Purchase Receipt item row | - | Accepted Qty in stock UOM is editable | Medium | Positive | - |
| 350 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-022 | Allow to edit stock UOM qty for Purchase documents - disabled | The setting is saved before running the scenario | 1. Keep disabled
2. Open a Purchase Receipt item row | - | Accepted Qty in stock UOM is read only | Medium | Negative | - |
| 351 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-023 | Allow to edit stock UOM qty for Stock Entry - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Open a Stock Entry item row | - | Qty as per stock UOM is editable | Medium | Positive | - |
| 352 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-024 | Allow to edit stock UOM qty for Stock Entry - disabled | The setting is saved before running the scenario | 1. Keep disabled
2. Open a Stock Entry item row | - | Qty as per stock UOM is read only | Medium | Negative | - |
| 353 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-025 | Allow UOM with conversion rate defined in Item - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Open a transaction row and open the UOM list | - | Only UOMs with a conversion factor in the item are listed | High | Positive | - |
| 354 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-026 | Allow UOM with conversion rate defined in Item - disabled | The setting is saved before running the scenario | 1. Keep disabled
2. Open a transaction row and open the UOM list | - | All UOMs are listed | Medium | Negative | - |
| 355 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-027 | Raise Material Request at re-order level - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Reduce an item below its Re-order Level | Re-order level: 10 / stock: 5 | A Material Request is created automatically | High | Positive | Needs Clarification: Trigger timing (scheduler) is not defined. |
| 356 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-028 | Raise Material Request at re-order level - disabled | The setting is saved before running the scenario | 1. Disable and save
2. Reduce an item below its Re-order Level | - | No Material Request is created | Medium | Negative | - |
| 357 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-029 | Allow Negative Stock - enabled allows a negative Material Issue | The setting is saved before running the scenario | 1. Enable with Yes and save
2. Submit a Material Issue larger than the available stock | Available 5 / Issue 8 | The Stock Entry is submitted and the balance becomes negative | High | Positive | - |
| 358 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-030 | Allow Negative Stock - disabled blocks a negative Material Issue | The setting is saved before running the scenario | 1. Keep it disabled
2. Submit a Material Issue larger than the available stock | Available 5 / Issue 8 | An insufficient stock error message is displayed and the Stock Entry is not submitted | High | Negative | - |
| 359 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-031 | Allow Negative Stock - serial / batch items still blocked | The setting is saved before running the scenario | 1. Enable Allow Negative Stock
2. Submit an issue larger than stock for a serial / batch item | Serial item | The transaction is rejected even though negative stock is enabled | High | Negative | - |
| 360 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-032 | Over Delivery/Receipt Allowance - delivery within tolerance | The setting is saved before running the scenario | 1. Set 10% and save
2. Create a Delivery Note for 110 against a Sales Order of 100 | Ordered 100 / Delivered 110 / 10% | The Delivery Note is accepted | High | Positive | - |
| 361 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-033 | Over Delivery/Receipt Allowance - delivery above tolerance | The setting is saved before running the scenario | 1. Set 10% and save
2. Create a Delivery Note for 111 against a Sales Order of 100 | Ordered 100 / Delivered 111 / 10% | An error message is displayed and the Delivery Note is not accepted | High | Negative | - |
| 362 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-034 | Over Delivery/Receipt Allowance - receipt within tolerance | The setting is saved before running the scenario | 1. Set 10% and save
2. Create a Purchase Receipt for 110 against a Purchase Order of 100 | Ordered 100 / Received 110 | The Purchase Receipt is accepted | High | Positive | - |
| 363 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-035 | Over Delivery/Receipt Allowance - receipt above tolerance | The setting is saved before running the scenario | 1. Set 10% and save
2. Create a Purchase Receipt for 111 against a Purchase Order of 100 | Ordered 100 / Received 111 | An error message is displayed and the Purchase Receipt is not accepted | High | Negative | - |
| 364 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-036 | Over Delivery/Receipt Allowance - Sales Invoice with Update Stock | The setting is saved before running the scenario | 1. Set 10% and save
2. Create a Sales Invoice with Update Stock above the ordered quantity but within tolerance | 110 / 100 | The invoice is accepted | Medium | Positive | - |
| 365 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-037 | Over Delivery/Receipt Allowance - Purchase Invoice with Update Stock | The setting is saved before running the scenario | 1. Set 10% and save
2. Create a Purchase Invoice with Update Stock above the ordered quantity but within tolerance | 110 / 100 | The invoice is accepted | Medium | Positive | - |
| 366 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-038 | Over Delivery/Receipt Allowance - zero tolerance | The setting is saved before running the scenario | 1. Set 0 and save
2. Deliver more than the ordered quantity | 101 / 100 | An error message is displayed | High | Negative | - |
| 367 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-039 | Over Delivery/Receipt Allowance - decimal tolerance | The setting is saved before running the scenario | 1. Set 2.5% and save
2. Deliver 102.5 against 100
3. Deliver 102.6 against 100 | 2.5% | 102.5 is accepted and 102.6 is rejected | Medium | Positive | - |
| 368 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-040 | Over Delivery/Receipt Allowance - item-level allowance priority | The setting is saved before running the scenario | 1. Set a different allowance on the item
2. Deliver above the global tolerance | - | The behavior follows the BA rule (item vs global priority) | Low | Negative | Needs Clarification: SRS does not mention an item-level allowance. |
| 369 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-041 | Show barcode field in transactions - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Open a Stock Entry item row | - | The barcode field is displayed | Medium | Positive | - |
| 370 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-042 | Show barcode field in transactions - disabled | The setting is saved before running the scenario | 1. Disable and save
2. Open a Stock Entry item row | - | The barcode field is not displayed | Medium | Negative | - |
| 371 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-043 | Validate Material Transfer Warehouses - enabled blocks the same warehouse | The setting is saved before running the scenario | 1. Enable and save
2. Submit a Material Transfer with the same source and target | Stores - E / Stores - E | An error message is displayed and the Stock Entry is not saved | High | Negative | - |
| 372 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-044 | Validate Material Transfer Warehouses - enabled allows different warehouses | The setting is saved before running the scenario | 1. Enable and save
2. Submit a Material Transfer with different warehouses | Stores - E / Finished - E | The Stock Entry is saved | High | Positive | - |
| 373 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-045 | Validate Material Transfer Warehouses - disabled allows the same warehouse | The setting is saved before running the scenario | 1. Disable and save
2. Submit a Material Transfer with the same source and target | Stores - E / Stores - E | The Stock Entry is saved | High | Positive | - |
| 374 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-046 | Validate Material Transfer Warehouses - same warehouse with a different inventory dimension | The setting is saved before running the scenario | 1. Enable and save
2. Use the same warehouse with a different inventory dimension value | Same WH / different dimension | The Stock Entry is allowed | Medium | Positive | - |
| 375 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-047 | Validate Material Transfer Warehouses - same warehouse with the same inventory dimension | The setting is saved before running the scenario | 1. Enable and save
2. Use the same warehouse and the same dimension value | Same WH / same dimension | An error message is displayed | Medium | Negative | - |
| 376 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-048 | Do not update variants on save - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Change a template field
3. Open an existing variant | - | Existing variants are not updated | High | Negative | - |
| 377 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-049 | Do not update variants on save - disabled | The setting is saved before running the scenario | 1. Keep disabled
2. Change a template field
3. Open an existing variant | - | Existing variants are updated with the template change | High | Positive | - |
| 378 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-050 | Do not update variants on save - new variant copies template fields | The setting is saved before running the scenario | 1. Enable and save
2. Create a new variant | - | The new variant copies the configured template fields | Medium | Positive | - |
| 379 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-051 | Allow Rename Attribute Value - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Rename an attribute value assigned to variants | Red -> Dark Red | The value is renamed and propagated to the affected variants | High | Positive | - |
| 380 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-052 | Allow Rename Attribute Value - disabled | The setting is saved before running the scenario | 1. Keep disabled
2. Rename an attribute value assigned to variants | - | The rename is blocked with an error message | High | Negative | - |
| 381 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-053 | Allow Variant UOM to be different from Template UOM - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Create a variant with a different Stock UOM | Template: Nos / Variant: Box | The variant is created | High | Positive | - |
| 382 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-054 | Allow Variant UOM to be different from Template UOM - disabled | The setting is saved before running the scenario | 1. Keep disabled
2. Create a variant with a different Stock UOM | Template: Nos / Variant: Box | An error message is displayed | High | Negative | - |
| 383 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-055 | Copy Field To Variant - configured field is copied | The setting is saved before running the scenario | 1. Add brand to the table and save
2. Create a variant from a template with a brand | brand | The variant gets the brand of the template | High | Positive | - |
| 384 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-056 | Copy Field To Variant - field not in the table is not copied | The setting is saved before running the scenario | 1. Create a variant from a template with a value in a field that is not in the table | - | The field is not copied | Medium | Negative | - |
| 385 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-057 | Copy Field To Variant - mandatory system fields are always copied | The setting is saved before running the scenario | 1. Create a variant | - | Mandatory system fields are copied from the template | Medium | Positive | - |
| 386 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-058 | Pick Serial / Batch Based On = FIFO | The setting is saved before running the scenario | 1. Set FIFO and save
2. Issue stock of a serial item received on different dates | - | The oldest serial / batch is picked first | High | Positive | - |
| 387 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-059 | Pick Serial / Batch Based On = LIFO | The setting is saved before running the scenario | 1. Set LIFO and save
2. Issue stock of a serial item received on different dates | - | The newest serial / batch is picked first | High | Positive | - |
| 388 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-060 | Pick Serial / Batch Based On = Expiry | The setting is saved before running the scenario | 1. Set Expiry and save
2. Issue stock of a batch item with different expiry dates | - | The batch with the nearest expiry date is picked first | High | Positive | - |
| 389 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-061 | Allow existing Serial No to be Received again - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Receive a serial number that already exists | SN-001 | The receipt is accepted | High | Positive | - |
| 390 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-062 | Allow existing Serial No to be Received again - disabled | The setting is saved before running the scenario | 1. Disable and save
2. Receive a serial number that already exists | SN-001 | An error message is displayed because the serial number must be unique | High | Negative | - |
| 391 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-063 | Use Direct Serial / Batch fields - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Open a Stock Entry row of a serial item | - | Serial No and Batch No fields are displayed in the row and a bundle is created automatically on submit | High | Positive | - |
| 392 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-064 | Disable Automatic Serial / Batch Selector - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Add a serial item row | - | The selector does not open automatically; it opens through Pick Serial / Batch No | High | Positive | - |
| 393 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-065 | Disable Automatic Serial / Batch Selector - disabled | The setting is saved before running the scenario | 1. Keep disabled
2. Add a serial item row | - | The selector opens automatically | Medium | Positive | - |
| 394 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-066 | Use Item Moving Average for New Batches - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Create a new batch for a Moving Average item | - | Batch-wise valuation is not used for the new batch | High | Positive | - |
| 395 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-067 | Use Item Moving Average for New Batches - FIFO items are not affected | The setting is saved before running the scenario | 1. Create a new batch for a FIFO item | - | The batch keeps its own valuation | Medium | Negative | - |
| 396 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-068 | Auto create Serial and Batch Bundle for outward - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Submit a Delivery Note with a serial item without selecting serials | - | A bundle is created automatically using the Pick Serial / Batch Based On rule | High | Positive | - |
| 397 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-069 | Auto create Serial and Batch Bundle for outward - disabled | The setting is saved before running the scenario | 1. Disable and save
2. Submit a Delivery Note with a serial item without selecting serials | - | An error message asks the user to select serial / batch numbers | High | Negative | - |
| 398 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-070 | Do not update Serial / Batch on creation of auto bundle - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Submit an outward transaction with an auto bundle | - | The bundle is created without updating the serial / batch in the transaction row | Medium | Positive | - |
| 399 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-071 | Enable Stock Reservation - enabled allows reservation | The setting is saved before running the scenario | 1. Enable and save
2. Open a Sales Order | - | The Reserve Stock option is available | High | Positive | - |
| 400 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-072 | Enable Stock Reservation - disabled hides reservation | The setting is saved before running the scenario | 1. Disable and save
2. Open a Sales Order | - | The Reserve Stock option is not available | High | Negative | - |
| 401 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-073 | Auto Reserve Stock - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Create and submit a Sales Order | - | Reserve Stock is checked and stock is reserved automatically | High | Positive | - |
| 402 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-074 | Allow Partial Reservation - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Create a Sales Order whose quantity exceeds the available stock with Reserve Stock | Qty 10 / Available 6 | 6 units are reserved | High | Positive | - |
| 403 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-075 | Allow Partial Reservation - disabled | The setting is saved before running the scenario | 1. Disable and save
2. Create a Sales Order whose quantity exceeds the available stock with Reserve Stock | Qty 10 / Available 6 | The reservation is rejected with an error message | High | Negative | - |
| 404 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-076 | Auto reserve Stock for Sales Order on Purchase Receipt Submission - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Submit a Purchase Receipt against a Purchase Order created from a Material Request | - | The received stock is reserved for the related Sales Order | High | Positive | - |
| 405 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-077 | Auto Reserve Serial and Batch NOS - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Reserve stock of a serial item | - | Serial / batch numbers are reserved according to Pick Serial / Batch Based On | High | Positive | - |
| 406 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-078 | Allow to make Quality Inspection after Purchase / Delivery - enabled | The setting is saved before running the scenario | 1. Enable and save
2. Submit a Purchase Receipt without a Quality Inspection | - | The Purchase Receipt is submitted and the inspection can be created afterwards | High | Positive | - |
| 407 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-079 | Allow to make Quality Inspection after Purchase / Delivery - disabled | The setting is saved before running the scenario | 1. Keep disabled
2. Submit a Purchase Receipt that requires inspection without one | - | Submission is blocked until the inspection exists | High | Negative | - |
| 408 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-080 | Action if Quality Inspection is rejected = Stop | The setting is saved before running the scenario | 1. Set Stop and save
2. Submit a Purchase Receipt with a rejected Quality Inspection | Stop | The transaction is blocked with an error message | High | Negative | - |
| 409 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-081 | Action if Quality Inspection is rejected = Warn | The setting is saved before running the scenario | 1. Set Warn and save
2. Submit a Purchase Receipt with a rejected Quality Inspection | Warn | A warning is displayed and the transaction proceeds | High | Positive | - |
| 410 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-082 | Action if Quality Inspection is not submitted = Stop | The setting is saved before running the scenario | 1. Set Stop and save
2. Submit a transaction with a Draft Quality Inspection | Stop | The transaction is blocked with an error message | High | Negative | - |
| 411 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-083 | Action if Quality Inspection is not submitted = Warn | The setting is saved before running the scenario | 1. Set Warn and save
2. Submit a transaction with a Draft Quality Inspection | Warn | A warning is displayed and the transaction proceeds | High | Positive | - |
| 412 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-084 | Freeze stock older than (days) - transaction inside the period | The setting is saved before running the scenario | 1. Set 30 and save
2. Create a stock transaction dated 10 days ago | 30 days | The transaction is accepted | High | Positive | - |
| 413 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-085 | Freeze stock older than (days) - transaction older than the period | The setting is saved before running the scenario | 1. Set 30 and save
2. Create a stock transaction dated 31 days ago | 30 days | The transaction is blocked with an error message | High | Negative | - |
| 414 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-086 | Freeze stock older than (days) - exactly on the boundary | The setting is saved before running the scenario | 1. Set 30 and save
2. Create a stock transaction dated exactly 30 days ago | 30 days | Behavior follows the BA rule (inclusive or exclusive) | Medium | Negative | Needs Clarification: Boundary inclusiveness is not defined. |
| 415 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-087 | Freeze stock older than (days) = 0 disables the restriction | The setting is saved before running the scenario | 1. Set 0 and save
2. Create a stock transaction dated one year ago | 0 | The transaction is accepted | High | Positive | - |
| 416 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-088 | Freeze stock up to - transaction before the date | The setting is saved before running the scenario | 1. Set 2026-10-31 and save
2. Create a stock transaction dated 2026-10-15 | 2026-10-31 | The transaction is blocked with an error message | High | Negative | - |
| 417 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-089 | Freeze stock up to - transaction after the date | The setting is saved before running the scenario | 1. Set 2026-10-31 and save
2. Create a stock transaction dated 2026-11-02 | 2026-10-31 | The transaction is accepted | High | Positive | - |
| 418 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-090 | Freeze stock up to - transaction on the date | The setting is saved before running the scenario | 1. Set 2026-10-31 and save
2. Create a stock transaction dated 2026-10-31 | 2026-10-31 | Behavior follows the BA rule (inclusive or exclusive) | Medium | Negative | Needs Clarification: Boundary inclusiveness is not defined. |
| 419 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-091 | Freeze stock - editing an existing transaction in the frozen period | The setting is saved before running the scenario | 1. Freeze stock
2. Edit / cancel a transaction in the frozen period | - | The change is blocked | High | Negative | - |
| 420 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-092 | Freeze stock - role allowed to create / edit back-dated transactions | The setting is saved before running the scenario | 1. Assign a role in the hidden field (API)
2. Create a back-dated transaction with and without the role | - | Only users with the role can create / edit back-dated transactions | Medium | Positive | Needs Clarification: The field is hidden, so it cannot be configured from the UI. |
| 421 | 8. Cross-Tab Behavior & Settings Impact (Integration) | TC-ISX-093 | Freeze stock - empty role allows all authorized users | The setting is saved before running the scenario | 1. Leave the role empty
2. Create a back-dated transaction with an authorized user | - | The transaction is accepted | Low | Positive | - |
## Sheet: Summary
| Test Cases Summary |  |
| --- | --- |
| Module / Screen | Number of Test Cases |
| 1. Defaults Tab |  |
| 2. Stock Validations Tab |  |
| 3. Item Variant Tab |  |
| 4. Serial & Batch Item Tab |  |
| 5. Stock Reservation Tab |  |
| 6. Quality Tab |  |
| 7. Stock Closing Tab |  |
| 8. Cross-Tab Behavior & Settings Impact (Integration) |  |
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