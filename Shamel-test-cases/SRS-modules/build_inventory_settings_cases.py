import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from qa_xlsx import H, M, L, P, N, U, CLR, mk, build

OUT = r"C:\Playwright_Automation\Shamel-test-cases\SHAMEL_InventorySettings_Test_Cases_EN.xlsx"
SAVE = "Click Save"


def tabpre(tab):
    return f"Access via Inventory > Inventory Settings > {tab} tab"


def cb(f, label, default, hidden_note=None, depends=None):
    """Checkbox pattern: default state, enable + persist, disable + persist."""
    out = []
    d = "checked" if default else "unchecked"
    dep = f" (with {depends} checked)" if depends else ""
    out.append(f(f"{label} - default state is {d}", f"Open the tab and review the {label} checkbox{dep}", "-",
                 f"The checkbox is {d} by default", M, U))
    if default:
        out.append(f(f"{label} - uncheck and save", [f"Uncheck {label}", SAVE, "Reload the page and open the tab"], f"{label}: unchecked",
                     "The setting is saved and still unchecked after reload", H, P))
        out.append(f(f"{label} - re-check and save", [f"Uncheck {label} and save", f"Check {label}", SAVE, "Reload the page"], f"{label}: checked",
                     "The setting is saved and checked after reload", M, P))
    else:
        out.append(f(f"{label} - check and save", [f"Check {label}", SAVE, "Reload the page and open the tab"], f"{label}: checked",
                     "The setting is saved and still checked after reload", H, P))
        out.append(f(f"{label} - uncheck again and save", [f"Check {label} and save", f"Uncheck {label}", SAVE, "Reload the page"], f"{label}: unchecked",
                     "The setting is saved and unchecked after reload", M, P))
    return out


# =========================================================== 1. DEFAULTS
D = mk(tabpre("Defaults"))
DEF = [
 D("Open the Inventory Settings screen", ["Click Inventory from the side menu", "Click Inventory Settings"], "-", "The Inventory Settings screen is displayed with the tabs: Defaults, Stock Validations, Item Variant, Serial & Batch Item, Stock Reservation, Quality, Stock Closing", H, P, p="-"),
 D("Defaults tab sections are displayed", "Open the Defaults tab", "-", "The sections are displayed: Item Defaults, Price List Defaults, UOM Defaults, Warehouse Defaults, Auto Material Request and the Save button", H, U),
 D("Defaults tab is displayed first or selectable", "Click the Defaults tab", "-", "The Defaults tab content is displayed", M, P, CLR + "SRS does not say which tab opens by default."),
 # item naming by
 D("Item Naming By - dropdown values", "Open the Item Naming By dropdown", "-", "The values are: Item Code, Naming Series", H, P),
 D("Item Naming By - default value is Item Code", "Open the tab for the first time", "-", "Item Code is selected by default", H, P),
 D("Item Naming By - single selection", ["Select Naming Series", "Select Item Code"], "-", "Only one value is kept at a time", L, P),
 D("Naming Series Options and Configure Series are hidden for Item Code", "Select Item Naming By = Item Code", "Item Code", "The Naming Series Options label and the Configure Series button are not displayed", H, N),
 D("Naming Series Options and Configure Series are displayed for Naming Series", "Select Item Naming By = Naming Series", "Naming Series", "The Naming Series Options label and the Configure Series button are displayed", H, P),
 D("Naming Series Options displays the default naming series", "Select Item Naming By = Naming Series", "Naming Series", "The read-only label displays the default naming series used to generate item IDs", M, P, CLR + "SRS does not say what is displayed when no series is configured."),
 D("Naming Series Options is read only", ["Select Naming Series", "Click the Naming Series Options label"], "-", "The label cannot be edited", L, N),
 D("Save Item Naming By = Naming Series", ["Select Naming Series", SAVE, "Reload the page"], "Naming Series", "The value is saved and displayed after reload", H, P),
 D("Save Item Naming By = Item Code", ["Select Naming Series and save", "Select Item Code", SAVE], "Item Code", "The value is saved and Naming Series Options / Configure Series are hidden", M, P),
 D("Save Naming Series without any configured series", ["Remove all series rows", "Select Naming Series", SAVE], "No series", "Behavior follows the BA rule (error or fallback)", M, N, CLR + "SRS does not define Item Naming By = Naming Series with no series defined."),
 # configure series popup
 D("Open the Configure Series popup", ["Select Naming Series", "Click Configure Series"], "-", "A popup is displayed with the Add Series Prefix table (Checkbox, Series, Preview), Add Row and Update", H, P),
 D("Series table columns", "Open the Configure Series popup", "-", "The columns are: Checkbox, Series, Preview", M, U),
 D("Add Row adds a new row", ["Open the Configure Series popup", "Click Add Row"], "-", "A new empty row is added to the table", H, P),
 D("Series - valid pattern", ["Click Add Row", "Enter a series pattern", "Click Update"], "Series: ITM-.#####", "The series is saved and applied", H, P),
 D("Series - Preview displays a sample item ID", ["Click Add Row", "Enter a series pattern"], "Series: ITM-.#####", "The Preview label displays a sample item ID such as ITM-00001", H, P),
 D("Series - Preview updates when the pattern changes", ["Enter ITM-.####", "Change it to PRD-.####"], "ITM-.#### -> PRD-.####", "The Preview is refreshed with the new pattern", M, P),
 D("Series - Preview is read only", "Click the Preview label", "-", "The Preview cannot be edited", L, N),
 D("Series - minimum length (2 characters)", ["Enter a 2-character series", "Click Update"], "Series: AB", "The series is accepted", M, P),
 D("Series - below minimum length (1 character)", ["Enter a 1-character series", "Click Update"], "Series: A", "An error message appears because the text is shorter than 2 characters", H, N),
 D("Series - maximum length (100 characters)", ["Enter a 100-character series", "Click Update"], "100 characters", "The series is accepted", M, P),
 D("Series - input blocked beyond 100 characters", "Type or paste 101 characters in Series", "101 characters", "Only the first 100 characters are accepted; further input is prevented", M, N),
 D("Series - invalid pattern", ["Enter an invalid series pattern", "Click Update"], "Series: ####-.@@", "An error message appears indicating an invalid series pattern", H, N, CLR + "SRS does not define what an invalid series pattern is (ERPNext uses a '.#####' suffix)."),
 D("Series - letters, numbers and special characters", ["Enter a series containing all three types", "Click Update"], "Series: ITM-2026-.####", "The series is accepted", M, P),
 D("Series - empty value", ["Click Add Row", "Leave Series empty", "Click Update"], "Series: empty", "Behavior follows the BA rule", M, N, CLR + "SRS says Series is 'Optional' but also defines error messages; the empty-row result is not clear."),
 D("Series - duplicate series rows", ["Add two rows with the same series", "Click Update"], "ITM-.##### x2", "An error message appears or the duplicate is ignored", M, N, CLR + "Duplicates are not addressed in the SRS."),
 D("Series - whitespace only", ["Enter spaces only", "Click Update"], "'   '", "An error message appears", L, N),
 D("Update with several valid rows", ["Add three valid series rows", "Click Update", "Reopen the popup"], "ITM-.####, PRD-.####, RM-.####", "All three series are saved and displayed after reopening", H, P),
 D("Update with one invalid row among valid rows", ["Add a valid row and an invalid row", "Click Update"], "ITM-.#### / A", "A validation error is displayed for the invalid row and nothing is saved", M, N),
 D("Select a row displays the action bar", ["Select the checkbox of a row"], "-", "An action bar with Delete row appears", H, P),
 D("Delete a single row", ["Select one row", "Click Delete row", "Click Update"], "-", "The row is deleted and the change is saved", H, P),
 D("Delete multiple rows", ["Select two rows", "Click Delete row"], "-", "Both rows are deleted", M, P),
 D("Action bar disappears after deselecting rows", ["Select a row", "Clear the checkbox"], "-", "The action bar is no longer displayed", L, P),
 D("Close the popup without Update", ["Add a row", "Close the popup", "Reopen it"], "-", "The unsaved row is not kept", M, N, CLR + "SRS does not define closing without Update."),
 D("Saved series are used for new items", ["Configure series ITM-.#####", "Save the setting", "Add a new item"], "ITM-.#####", "The new item ID is generated from the configured series", H, P, CLR + "Priority when several series exist is not defined."),
 # default item group
 D("Default Item Group - searchable dropdown", ["Click Default Item Group", "Type part of an item group name"], "All", "The list is filtered by the typed text", M, P),
 D("Default Item Group - select and save", ["Select an Item Group", SAVE, "Reload the page"], "Item Group: Products", "The value is saved and displayed after reload", H, P),
 D("Default Item Group - optional", ["Clear Default Item Group", SAVE], "Empty", "The setting is saved without an error", M, P),
 D("Default Item Group - single selection", ["Select one item group", "Select another"], "-", "Only the last selected value is kept", L, P),
 D("Default Item Group - non-existing value", ["Type a name that does not exist", "Click outside"], "Group XYZ", "No option is selectable and the value is not accepted", M, N),
 D("Default Item Group - group (parent) nodes", ["Open the dropdown and look for parent groups"], "All Item Groups", "Behavior follows the BA rule (parent groups allowed or hidden)", L, P, CLR + "SRS does not say whether group nodes can be the default."),
 D("Default Item Group - default value", "Open the tab on a fresh system", "-", "The default value is as defined by the BA", L, P, CLR + "SRS does not state a default value."),
 # valuation
 D("Default Valuation Method - dropdown values", "Open the Default Valuation Method dropdown", "-", "The values are: FIFO, Moving Average", H, P),
 D("Default Valuation Method - default is FIFO", "Open the tab on a fresh system", "-", "FIFO is selected by default", H, P),
 D("Default Valuation Method - change to Moving Average and save", ["Select Moving Average", SAVE, "Reload the page"], "Moving Average", "The value is saved and displayed after reload", H, P),
 D("Default Valuation Method - change back to FIFO", ["Select Moving Average and save", "Select FIFO", SAVE], "FIFO", "The value is saved", M, P),
 D("Default Valuation Method - single selection", ["Select Moving Average", "Select FIFO"], "-", "Only one value is kept", L, P),
 D("Default Valuation Method - not applied to existing items", ["Change the default to Moving Average and save", "Open an existing FIFO item"], "Existing item", "The existing item keeps its valuation method", H, N),
 # price list
 *cb(D, "Auto Create Item Price In First Transaction If Missing", True),
 # UOM
 D("Default Stock UOM - default value is NOS", "Open the tab on a fresh system", "-", "NOS is displayed", H, P),
 D("Default Stock UOM - searchable dropdown", ["Click Default Stock UOM", "Type part of a UOM name"], "Un", "The list is filtered by the typed text", M, P),
 D("Default Stock UOM - select and save", ["Select a UOM", SAVE, "Reload the page"], "UOM: Kg", "The value is saved and displayed after reload", H, P),
 D("Default Stock UOM - optional", ["Clear Default Stock UOM", SAVE], "Empty", "The setting is saved without an error", M, P, CLR + "Effect of an empty default UOM on the Add Item screen is not defined."),
 D("Default Stock UOM - non-existing value", ["Type a UOM that does not exist", "Click outside"], "UOM XYZ", "No option is selectable and the value is not accepted", M, N),
 D("Default Stock UOM - single selection", ["Select a UOM", "Select another"], "-", "Only the last selected value is kept", L, P),
 *cb(D, "Allow to edit stock UOM qty for Sales documents", True),
 *cb(D, "Allow to edit stock UOM qty for Purchase documents", False),
 *cb(D, "Allow to edit stock UOM qty for Stock Entry", False),
 *cb(D, "Allow UOM with conversion rate defined in Item", False),
 # warehouse
 D("Default Warehouse - default value", "Open the tab on a fresh system", "-", "The value is 'Stores - <Company Abbreviation>' (example Stores - A)", H, P, CLR + "In a multi-company system the abbreviation of which company is used is not defined."),
 D("Default Warehouse - only non-group warehouses are listed", "Open the Default Warehouse dropdown", "-", "Only warehouses with Is Group disabled are displayed", H, P),
 D("Default Warehouse - group warehouse is not selectable", "Type the name of a group warehouse", "All Warehouses", "The group warehouse is not offered", H, N),
 D("Default Warehouse - searchable dropdown", ["Click Default Warehouse", "Type part of a warehouse name"], "Stores", "The list is filtered by the typed text", M, P),
 D("Default Warehouse - select and save", ["Select a warehouse", SAVE, "Reload the page"], "Stores - E", "The value is saved and displayed after reload", H, P),
 D("Default Warehouse - optional", ["Clear Default Warehouse", SAVE], "Empty", "The setting is saved without an error", M, P),
 D("Default Warehouse - single selection", ["Select a warehouse", "Select another"], "-", "Only the last selected value is kept", L, P),
 D("Default Warehouse - disabled warehouse", ["Open the dropdown and look for a disabled warehouse"], "Disabled warehouse", "Behavior follows the BA rule", L, N, CLR + "SRS does not say whether disabled warehouses are listed."),
 D("Sample Retention Warehouse - only non-group warehouses are listed", "Open the Sample Retention Warehouse dropdown", "-", "Only warehouses with Is Group disabled are displayed", H, P),
 D("Sample Retention Warehouse - searchable dropdown", ["Click the field", "Type part of a warehouse name"], "Sample", "The list is filtered by the typed text", M, P),
 D("Sample Retention Warehouse - select and save", ["Select a warehouse", SAVE, "Reload the page"], "Samples - E", "The value is saved and displayed after reload", H, P),
 D("Sample Retention Warehouse - optional with no default", ["Open the tab on a fresh system", SAVE], "Empty", "The field is empty by default and saving works", M, P),
 D("Sample Retention Warehouse - non-existing value", ["Type a warehouse that does not exist", "Click outside"], "WH XYZ", "No option is selectable and the value is not accepted", M, N),
 # auto material request
 *cb(D, "Raise Material Request when stock reaches re-order level", True),
 D("Raise Material Request - field location", "Search for the Raise Material Request checkbox in the Defaults tab and in the Stock Planning tab", "-", "The checkbox is displayed in the location approved by the BA", M, U,
   CLR + "SRS contains an Arabic note saying the field is located in the 'Stock Planning' tab in the live system, so it is unclear which tab is the final location."),
 # save
 D("Save without changes", ["Open the tab", SAVE], "-", "The settings are saved without an error", L, P),
 D("Save displays a success message", ["Change a field", SAVE], "-", "A success message is displayed", M, P, CLR + "SRS does not give the success message text."),
 D("Save - changes are applied to the system", ["Change Default Warehouse", SAVE, "Open Add Stock Entry"], "Stores - E", "The new default is applied", H, P),
 D("Save - multiple fields changed together", ["Change Default Item Group, Valuation Method, Stock UOM and Default Warehouse", SAVE, "Reload"], "-", "All four values are saved", H, P),
 D("Defaults tab labels are localized", ["Switch the language to Arabic", "Open the Defaults tab"], "-", "All labels and notes are displayed in Arabic", L, U),
]

# =========================================================== 2. STOCK VALIDATIONS
V = mk(tabpre("Stock Validations"))
TOL = "Over Delivery/Receipt Allowance (%)"
VAL = [
 V("Stock Validations tab sections are displayed", "Open the Stock Validations tab", "-", "The sections are displayed: Negative Stock, Quantity Tolerance, Display & Data Formatting, Validate Material Transfer Warehouses and Save", H, U),
 V("Allow Negative Stock - default state is unchecked", "Open the tab on a fresh system", "-", "Allow Negative Stock is unchecked", H, P),
 V("Allow Negative Stock - confirmation popup on check", "Check Allow Negative Stock", "-", "A popup appears with the message: 'Negative Stock disables FIFO and Moving Average valuation while inventory is negative and may result in inaccurate inventory, Do you still want to enable Negative Stock'", H, P),
 V("Allow Negative Stock - popup buttons", "Check Allow Negative Stock", "-", "The popup contains the Yes and No buttons", M, U),
 V("Allow Negative Stock - click Yes", ["Check Allow Negative Stock", "Click Yes", SAVE], "Yes", "The checkbox stays checked and the setting is saved", H, P),
 V("Allow Negative Stock - click No", ["Check Allow Negative Stock", "Click No"], "No", "The popup disappears and the checkbox is not checked", H, N, CLR + "SRS says only that the message disappears; the state of the checkbox after No is not defined."),
 V("Allow Negative Stock - uncheck", ["Enable Allow Negative Stock and save", "Uncheck it"], "-", "The checkbox is unchecked with no confirmation popup", M, P, CLR + "SRS defines a popup only when checking."),
 V("Allow Negative Stock - saved value persists", ["Enable it with Yes", SAVE, "Reload the page"], "-", "The checkbox is still checked", H, P),
 V("Allow Negative Stock - close the popup without choosing", ["Check Allow Negative Stock", "Close the popup (X / outside click / Esc)"], "-", "The popup closes and the checkbox is not checked", L, N, CLR + "Not defined."),
 V("Allow Negative Stock - Yes then Save is required", ["Check Allow Negative Stock", "Click Yes", "Reload without saving"], "-", "The setting is not applied until Save is clicked", M, N),
 # tolerance
 V(f"{TOL} - default value 0.000", "Open the tab on a fresh system", "-", "The field shows 0.000", H, P),
 V(f"{TOL} - integer value", [f"Enter an integer", SAVE], "10", "The value is saved", H, P),
 V(f"{TOL} - decimal value", [f"Enter a decimal", SAVE], "2.5", "The value is saved", H, P),
 V(f"{TOL} - zero", ["Enter 0", SAVE], "0", "The value is saved (no tolerance)", M, P),
 V(f"{TOL} - 100 percent", ["Enter 100", SAVE], "100", "The value is saved", M, P),
 V(f"{TOL} - above 100 percent", ["Enter 150", SAVE], "150", "Behavior follows the BA rule (accepted or rejected)", M, N, CLR + "SRS does not define an upper limit for the percentage."),
 V(f"{TOL} - negative value", ["Enter -5", SAVE], "-5", "The value is rejected with an error message", H, N, CLR + "SRS says integers and decimals only; negatives are not addressed."),
 V(f"{TOL} - letters", "Type letters in the field", "abc", "The letters are not accepted", H, N),
 V(f"{TOL} - special characters", "Type special characters in the field", "@#%", "The characters are not accepted", M, N),
 V(f"{TOL} - multiple decimal points", ["Enter 1.2.3", SAVE], "1.2.3", "The value is rejected", M, N),
 V(f"{TOL} - comma as decimal separator", ["Enter 2,5", SAVE], "2,5", "Behavior follows the BA rule (rejected or converted)", L, N, CLR + "Decimal separator not defined."),
 V(f"{TOL} - empty value", ["Clear the field", SAVE], "Empty", "Behavior follows the BA rule (saved as 0 or error message)", H, N,
   CLR + "SRS says the field is Optional but also says an error appears when shorter than the minimum length of 1 character; the empty case is contradictory."),
 V(f"{TOL} - maximum length (100 characters)", ["Enter 100 digits", SAVE], "100 digits", "The value is accepted by the field", L, P, CLR + "A 100-digit percentage is unrealistic; no numeric limit is defined."),
 V(f"{TOL} - input blocked beyond 100 characters", "Type 101 digits", "101 digits", "Only the first 100 characters are accepted; further input is prevented", M, N),
 V(f"{TOL} - spaces", "Type spaces in the field", "' '", "The spaces are not accepted", L, N),
 V(f"{TOL} - Arabic-indic digits", "Type Arabic-indic digits", "٥", "Behavior follows the BA rule", L, N, CLR + "Digit set not defined."),
 V(f"{TOL} - displays as percentage", "Enter 10 and save, then reopen", "10", "The value is displayed and understood as a percentage", L, U),
 V("Over Transfer Allowance (%) - not displayed", "Open the tab and look for Over Transfer Allowance (%)", "-", "The field is not displayed (hidden)", M, U, CLR + "SRS marks the field Hidden but defines its rules; the condition for showing it is not stated."),
 V("Over Picking Allowance (%) - not displayed", "Open the tab and look for Over Picking Allowance (%)", "-", "The field is not displayed (hidden)", M, U, CLR + "SRS marks the field Hidden but defines its rules; the condition for showing it is not stated."),
 V("Over Transfer / Over Picking default value", "Check the stored default of the hidden fields", "-", "Both default to 0.000", L, P, CLR + "Hidden fields cannot be verified from the UI; verify through the API / database."),
 # display
 *cb(V, "Show barcode field in transactions", True),
 V("Convert Item description to clean HTML in transactions - hidden", "Open the tab and look for the checkbox", "-", "The checkbox is not displayed (hidden) and its value is checked by default", L, U, CLR + "Hidden field; its effect is applied by default and cannot be changed from the UI."),
 *cb(V, "Validate Material Transfer Warehouses", False),
 V("Validate Material Transfer Warehouses - default state", "Open the tab on a fresh system", "-", "The checkbox default is as defined by the BA", M, P, CLR + "SRS does not state the default (ERPNext default is checked)."),
 # save
 V("Save with valid data", ["Change several fields to valid values", SAVE], "-", "The Inventory Settings are saved and applied", H, P),
 V("Save with an invalid tolerance value", ["Enter an invalid value in a tolerance field", SAVE], "abc / -5", "A validation error message is displayed for the invalid field and nothing is saved", H, N),
 V("Save without changes", ["Open the tab", SAVE], "-", "No error is displayed", L, P),
 V("Stock Validations tab labels are localized", ["Switch the language to Arabic", "Open the tab"], "-", "All labels, notes and the confirmation message are displayed in Arabic", L, U),
]

# =========================================================== 3. ITEM VARIANT
I = mk(tabpre("Item Variant"))
ITV = [
 I("Item Variant tab components are displayed", "Open the Item Variant tab", "-", "The tab displays: Do not update variants on save, Allow Rename Attribute Value, Allow Variant UOM to be different from Template UOM, Copy Field To Variant table and Save", H, U),
 *cb(I, "Do not update variants on save", False),
 *cb(I, "Allow Rename Attribute Value", False),
 *cb(I, "Allow Variant UOM to be different from Template UOM", False),
 # table
 I("Copy Field To Variant table columns", "Open the Item Variant tab", "-", "The columns are: Checkbox, No., Field Name", M, U),
 I("Copy Field To Variant - empty table by default", "Open the tab on a fresh system", "-", "The table shows the rows defined by the BA or is empty", L, U, CLR + "SRS does not state the default content of the table."),
 I("Add Row adds a new row", "Click Add Row", "-", "A new row is added to the table", H, P),
 I("No. column displays the row order", ["Add three rows"], "-", "The rows are numbered 1, 2, 3", M, U),
 I("No. column is renumbered after deleting a row", ["Add three rows", "Delete row 2"], "-", "The remaining rows are renumbered 1, 2", L, P),
 I("Field Name - select an eligible Item field", ["Click Add Row", "Select or enter a field name", SAVE], "Field: brand", "The field is added and saved", H, P),
 I("Field Name - fetches fields from the Item DocType", ["Click Add Row", "Open the Field Name list"], "-", "All eligible fields of the Item DocType are available for selection", H, P,
   CLR + "SRS describes Field Name as a 'Text input field' that 'allows the user to select an Item field'. Dropdown vs free text is not clear."),
 I("Field Name - excluded / system fields are not offered", ["Click Add Row", "Search for system-controlled fields"], "name, owner, creation", "System-controlled and excluded fields are not available for selection", M, N),
 I("Field Name - mandatory", ["Click Add Row", "Leave Field Name empty", SAVE], "Empty", "An error message appears because the field is mandatory", H, N),
 I("Field Name - minimum length (2 characters)", ["Enter a 2-character field name", SAVE], "Field: uo", "The value is accepted if it is a valid field, otherwise a validation error appears", M, P),
 I("Field Name - below minimum length (1 character)", ["Enter 1 character", SAVE], "Field: b", "An error message appears because the text is shorter than 2 characters", M, N),
 I("Field Name - maximum length (100 characters)", ["Enter 100 characters"], "100 characters", "The input is accepted by the field", L, P),
 I("Field Name - input blocked beyond 100 characters", "Type or paste 101 characters", "101 characters", "Only the first 100 characters are accepted; further input is prevented", L, N),
 I("Field Name - non-existing field", ["Enter a field name that does not exist on Item", SAVE], "not_a_field", "An error message appears and the row is not saved", H, N),
 I("Field Name - duplicate field in two rows", ["Add two rows with the same field", SAVE], "brand x2", "An error message appears or the duplicate is ignored", M, N, CLR + "Duplicates are not addressed in the SRS."),
 I("Field Name - letters, numbers and special characters", ["Type a name that contains all three types"], "field_1-x", "The input is accepted by the field", L, P),
 I("Field Name - saved rows persist after reload", ["Add a row with a valid field", SAVE, "Reload the page"], "Field: brand", "The row is displayed after reload", H, P),
 I("Select a row displays the action bar", "Select the checkbox of a row", "-", "An action bar with Delete row appears", H, P),
 I("Delete a single row", ["Select one row", "Click Delete row", SAVE], "-", "The row is deleted and the change is saved", H, P),
 I("Delete multiple rows", ["Select two rows", "Click Delete row"], "-", "Both rows are deleted", M, P),
 I("Delete row - confirmation", ["Select a row", "Click Delete row"], "-", "The row is deleted immediately (no confirmation)", L, P, CLR + "SRS does not define a confirmation message for Delete row."),
 # edit row
 I("Edit Row - icon opens a popup", ["Click the Edit Row icon of a row"], "-", "A popup is displayed with the Field Name field", H, P),
 I("Edit Row - displays non-displayed fields", ["Click the Edit Row icon", "Review the popup"], "-", "The fields not displayed in the table are visible and editable", M, P, CLR + "SRS lists only 'Field Name' (and 'Options Field Name'); the non-displayed fields are not named."),
 I("Edit Row - change the field name", ["Open Edit Row", "Select another field", "Click Update / Save"], "Field: item_group", "The row is updated", H, P),
 I("Edit Row - mandatory Field Name", ["Open Edit Row", "Clear Field Name", "Confirm"], "Empty", "An error message appears because the field is mandatory", H, N),
 I("Edit Row - below minimum length", ["Open Edit Row", "Enter 1 character", "Confirm"], "Field: b", "An error message appears", M, N),
 I("Edit Row - input blocked beyond 100 characters", ["Open Edit Row", "Paste 101 characters"], "101 characters", "Only the first 100 characters are accepted", L, N),
 # setting
 I("Setting - opens a popup", "Click Setting", "-", "A popup is displayed with: column drag and drop, Column width, Add / Remove columns, Update and Reset to default", H, P),
 I("Setting - rearrange columns by drag and drop", ["Open Setting", "Drag the Field Name column header before No.", "Click Update"], "-", "The columns are displayed in the new order", M, P),
 I("Setting - Column width default is 3", "Open Setting and review Column width", "-", "The default value is 3", M, P),
 I("Setting - Column width valid value", ["Enter a width", "Click Update"], "Width: 5", "The width is saved and applied to the column", M, P),
 I("Setting - Column width numbers only", "Type letters in Column width", "abc", "The letters are not accepted", M, N),
 I("Setting - Column width minimum length (1 character)", ["Clear Column width", "Click Update"], "Empty", "An error message appears or the default is restored", M, N, CLR + "SRS defines min length 1 but not the error message."),
 I("Setting - Column width maximum length (3 characters)", "Type 4 digits in Column width", "1000", "Only the first 3 digits are accepted; further input is prevented", M, N),
 I("Setting - Column width zero or negative", ["Enter 0", "Click Update"], "0", "Behavior follows the BA rule", L, N, CLR + "Valid range / unit of the width is not defined."),
 I("Setting - Add / Remove columns popup", ["Open Setting", "Click Add / Remove columns"], "-", "A popup is displayed listing the available table columns with checkboxes", M, P, CLR + "SRS ends the sentence with 'These columns are: Column Name / Field Name' without listing them."),
 I("Setting - hide a column", ["Open Add / Remove columns", "Uncheck a column", "Click Update"], "Column: No.", "The column is hidden from the table", M, P),
 I("Setting - show a hidden column", ["Hide a column", "Open Add / Remove columns", "Check it again", "Click Update"], "-", "The column is displayed again", M, P),
 I("Setting - hide all columns", ["Uncheck every column", "Click Update"], "All columns", "Behavior follows the BA rule (at least one column is required)", L, N, CLR + "Not defined."),
 I("Setting - Update saves the modifications", ["Change the order and the width", "Click Update", "Reopen Setting"], "-", "The changes are kept", H, P),
 I("Setting - Reset to default", ["Change order, width and columns", "Click Reset to default"], "-", "All modifications return to their default values", H, P),
 I("Setting - close without Update", ["Change the width", "Close the popup", "Reopen Setting"], "-", "The unsaved change is not applied", L, N, CLR + "Not defined."),
 I("Setting - applies to the current user only or to everyone", ["User A changes the setting", "User B opens the tab"], "-", "Behavior follows the BA rule", L, N, CLR + "SRS does not say whether the table layout is per user."),
 # save
 I("Save with valid data", ["Change settings and rows", SAVE], "-", "The Item Variant Settings are saved and applied", H, P),
 I("Save with an invalid row", ["Add a row without Field Name", SAVE], "Empty row", "A validation error message is displayed and nothing is saved", H, N),
 I("Save without changes", ["Open the tab", SAVE], "-", "No error is displayed", L, P),
 I("Item Variant tab labels are localized", ["Switch the language to Arabic", "Open the tab"], "-", "All labels are displayed in Arabic", L, U),
]

# =========================================================== 4. SERIAL & BATCH
B = mk(tabpre("Serial & Batch Item"))
DEPS = ["Pick Serial / Batch Based On", "Allow existing Serial No to be Received again", "Use Direct Serial / Batch fields", "Disable Automatic Serial / Batch Selector",
        "Use Item Moving Average for New Batches", "Set Default Naming Series for Batch ID"]
SBI = [
 B("Serial & Batch Item tab sections are displayed", "Open the Serial & Batch Item tab", "-", "The sections are displayed: Activate Serial / Batch No For Item, Serial Item Settings, Batch Item Settings, Serial and Batch Bundle and Save", H, U),
 *cb(B, "Activate Serial / Batch No For Item", True),
 B("Activate Serial / Batch No For Item - unchecked hides the dependent settings", ["Uncheck Activate Serial / Batch No For Item"], "-", "These settings are hidden: " + ", ".join(DEPS), H, N),
 B("Activate Serial / Batch No For Item - checked shows the dependent settings", ["Uncheck then check Activate Serial / Batch No For Item"], "-", "These settings are displayed: " + ", ".join(DEPS), H, P),
 B("Activate Serial / Batch No For Item - values are kept when hidden", ["Change a dependent setting", "Uncheck Activate and save", "Check Activate and open the tab"], "-", "The previous value of the dependent setting is restored (or reset) according to the BA rule", M, N, CLR + "SRS does not say whether hidden settings keep their values."),
 B("Activate Serial / Batch No For Item - Maintain serial / batch on Add Item", ["Uncheck Activate and save", "Open the Add Item screen"], "-", "The serial / batch tracking options are not available on the item", H, N, CLR + "Impact on existing serialized / batched items is not defined."),
 # serial item settings
 B("Pick Serial / Batch Based On - dropdown values", "Open the dropdown", "-", "The values are: FIFO, LIFO, Expiry", H, P),
 B("Pick Serial / Batch Based On - default is FIFO", "Open the tab on a fresh system", "-", "FIFO is selected", H, P),
 B("Pick Serial / Batch Based On - select LIFO and save", ["Select LIFO", SAVE, "Reload"], "LIFO", "The value is saved", H, P),
 B("Pick Serial / Batch Based On - select Expiry and save", ["Select Expiry", SAVE, "Reload"], "Expiry", "The value is saved", H, P),
 B("Pick Serial / Batch Based On - single selection", ["Select LIFO", "Select Expiry"], "-", "Only one value is kept", L, P),
 *cb(B, "Allow existing Serial No to be Received again", True),
 *cb(B, "Use Direct Serial / Batch fields", False),
 *cb(B, "Disable Automatic Serial / Batch Selector", False),
 B("Disable Automatic Serial / Batch Selector - dependency on Use Direct Serial / Batch fields", ["Check Use Direct Serial / Batch fields", "Check Disable Automatic Serial / Batch Selector", "Try to uncheck Use Direct Serial / Batch fields"], "-", "The system behaves as defined by the BA rule", H, N,
   CLR + "SRS says Disable Automatic Selector 'can't be unchecked until Use Serial / Batch fields is Unchecked'. The sentence is contradictory / reversed; the intended dependency (enable only when Use Direct fields is checked) must be confirmed."),
 B("Disable Automatic Serial / Batch Selector - check while Use Direct fields is unchecked", ["Keep Use Direct Serial / Batch fields unchecked", "Try to check Disable Automatic Serial / Batch Selector"], "-", "Behavior follows the BA rule (blocked or allowed)", M, N, CLR + "Same ambiguity as above."),
 # batch
 B("Allow negative stock for Batch - hidden", "Open the tab and look for Allow negative stock for Batch", "-", "The checkbox is not displayed (hidden) and is unchecked by default", L, U, CLR + "Hidden field; the value can only be verified through the API."),
 *cb(B, "Use Item Moving Average for New Batches", False),
 *cb(B, "Set Default Naming Series for Batch ID", False),
 B("Naming Series Prefix - hidden when Set Default Naming Series for Batch ID is unchecked", ["Uncheck Set Default Naming Series for Batch ID"], "-", "The Naming Series Prefix field is not displayed", H, N),
 B("Naming Series Prefix - displayed when Set Default Naming Series for Batch ID is checked", ["Check Set Default Naming Series for Batch ID"], "-", "The Naming Series Prefix field is displayed", H, P),
 B("Naming Series Prefix - default value BATCH-", ["Check Set Default Naming Series for Batch ID"], "-", "The field shows BATCH-", H, P),
 B("Naming Series Prefix - valid value", ["Enter a prefix", SAVE], "Prefix: LOT-2026-", "The value is saved", H, P),
 B("Naming Series Prefix - minimum length (3 characters)", ["Enter 3 characters", SAVE], "Prefix: LOT", "The value is accepted", M, P),
 B("Naming Series Prefix - below minimum length (2 characters)", ["Enter 2 characters", SAVE], "Prefix: LO", "An error message appears because the text is shorter than 3 characters", H, N),
 B("Naming Series Prefix - maximum length (500 characters)", ["Enter 500 characters", SAVE], "500 characters", "The value is accepted", M, P),
 B("Naming Series Prefix - input blocked beyond 500 characters", "Type or paste 501 characters", "501 characters", "Only the first 500 characters are accepted; further input is prevented", M, N),
 B("Naming Series Prefix - letters, numbers and special characters", ["Enter a prefix with all three types", SAVE], "B-26/#", "The value is accepted", M, P),
 B("Naming Series Prefix - optional (empty)", ["Clear the prefix", SAVE], "Empty", "Behavior follows the BA rule (saved empty or default restored)", M, N, CLR + "SRS says Optional and defines a default; the effect of an empty value is not defined."),
 B("Naming Series Prefix - hidden when Activate Serial / Batch No is unchecked", ["Check Set Default Naming Series for Batch ID", "Uncheck Activate Serial / Batch No For Item"], "-", "The Naming Series Prefix field is not displayed", M, N),
 B("Naming Series Prefix - applied to a new batch", ["Set prefix LOT-2026- and save", "Create a new batch for an item without a naming series"], "LOT-2026-", "The batch ID starts with the configured prefix", H, P),
 # bundle
 *cb(B, "Auto create Serial and Batch Bundle for outward", True),
 *cb(B, "Do not update Serial / Batch on creation of auto bundle", True),
 *cb(B, "Set Default Naming Series for Serial and Batch Bundle", False),
 B("Bundle Naming Series Options and Configure Series are hidden when the checkbox is unchecked", ["Uncheck Set Default Naming Series for Serial and Batch Bundle"], "-", "The Naming Series Options label and the Configure Series button are not displayed", H, N),
 B("Bundle Naming Series Options and Configure Series are displayed when the checkbox is checked", ["Check Set Default Naming Series for Serial and Batch Bundle"], "-", "The Naming Series Options label and the Configure Series button are displayed", H, P),
 B("Bundle Naming Series Options - read only", ["Click the Naming Series Options label"], "-", "The label cannot be edited", L, N),
 B("Bundle Configure Series - opens the popup", ["Check the checkbox", "Click Configure Series"], "-", "A popup is displayed with the Add Series Prefix table (Checkbox, Series, Preview), Add Row and Update", H, P),
 B("Bundle series - valid pattern", ["Click Add Row", "Enter a series", "Click Update"], "Series: SABB-.#####", "The series is saved and applied", H, P),
 B("Bundle series - Preview displays a sample ID", ["Click Add Row", "Enter a series"], "SABB-.#####", "The Preview label displays a sample Serial and Batch Bundle ID", H, P),
 B("Bundle series - minimum length (2 characters)", ["Enter 2 characters", "Click Update"], "SB", "The series is accepted", M, P),
 B("Bundle series - below minimum length (1 character)", ["Enter 1 character", "Click Update"], "S", "An error message appears because the text is shorter than 2 characters", H, N),
 B("Bundle series - maximum length (100 characters)", ["Enter 100 characters", "Click Update"], "100 characters", "The series is accepted", M, P),
 B("Bundle series - input blocked beyond 100 characters", "Type or paste 101 characters", "101 characters", "Only the first 100 characters are accepted; further input is prevented", M, N),
 B("Bundle series - invalid pattern", ["Enter an invalid pattern", "Click Update"], "####-@@", "An error message appears indicating an invalid series pattern", H, N, CLR + "Invalid pattern is not defined."),
 B("Bundle series - empty value", ["Click Add Row", "Leave Series empty", "Click Update"], "Empty", "Behavior follows the BA rule", M, N, CLR + "Series is 'Optional' but has validation messages."),
 B("Bundle series - Delete row", ["Select one or more rows", "Click Delete row"], "-", "The selected rows are deleted", M, P),
 B("Bundle series - Update with one invalid row", ["Add a valid and an invalid row", "Click Update"], "SABB-.#### / S", "A validation error is displayed for the invalid row and nothing is saved", M, N),
 B("Bundle series - applied to a new Serial and Batch Bundle", ["Configure SABB-.##### and save", "Submit a transaction that creates a bundle"], "SABB-.#####", "The bundle ID follows the configured series", H, P),
 # save
 B("Save with valid data", ["Change several settings", SAVE], "-", "The Inventory Settings are saved and applied", H, P),
 B("Save with an invalid prefix", ["Enter a 2-character prefix", SAVE], "LO", "A validation error message is displayed and nothing is saved", H, N),
 B("Save without changes", ["Open the tab", SAVE], "-", "No error is displayed", L, P),
 B("Serial & Batch Item tab labels are localized", ["Switch the language to Arabic", "Open the tab"], "-", "All labels are displayed in Arabic", L, U),
]

# =========================================================== 5. STOCK RESERVATION
R = mk(tabpre("Stock Reservation"))
RES = [
 R("Stock Reservation tab components are displayed", "Open the Stock Reservation tab", "-", "The tab displays: Enable Stock Reservation, Auto Reserve Stock, Allow Partial Reservation, Auto reserve Stock for Sales Order on Purchase Receipt Submission, Auto Reserve Serial and Batch NOS and Save", H, U),
 *cb(R, "Enable Stock Reservation", True),
 R("Enable Stock Reservation - unchecked hides the dependent settings", ["Uncheck Enable Stock Reservation"], "-", "These settings are hidden: Allow Partial Reservation, Auto reserve Stock for Sales Order on Purchase Receipt Submission, Auto Reserve Serial and Batch NOS", H, N),
 R("Enable Stock Reservation - checked shows the dependent settings", ["Uncheck then check Enable Stock Reservation"], "-", "The three dependent settings are displayed", H, P),
 R("Enable Stock Reservation - Auto Reserve Stock visibility when unchecked", ["Uncheck Enable Stock Reservation"], "-", "Behavior of Auto Reserve Stock follows the BA rule (hidden or disabled)", M, N, CLR + "SRS does not list Auto Reserve Stock among the settings that depend on Enable Stock Reservation."),
 R("Enable Stock Reservation - values are kept when hidden", ["Change a dependent setting", "Uncheck Enable and save", "Check Enable again"], "-", "The previous value of the dependent setting is restored (or reset)", M, N, CLR + "Not defined."),
 *cb(R, "Auto Reserve Stock", False),
 *cb(R, "Allow Partial Reservation", True, depends="Enable Stock Reservation"),
 *cb(R, "Auto reserve Stock for Sales Order on Purchase Receipt Submission", False, depends="Enable Stock Reservation"),
 *cb(R, "Auto Reserve Serial and Batch NOS", True, depends="Enable Stock Reservation"),
 R("Save with valid data", ["Change several settings", SAVE], "-", "The Inventory Settings are saved and applied", H, P),
 R("Save without changes", ["Open the tab", SAVE], "-", "No error is displayed", L, P),
 R("Stock Reservation tab labels are localized", ["Switch the language to Arabic", "Open the tab"], "-", "All labels are displayed in Arabic", L, U),
]

# =========================================================== 6. QUALITY
Q = mk(tabpre("Quality"))
QUA = [
 Q("Quality tab components are displayed", "Open the Quality tab", "-", "The tab displays: Allow to make Quality Inspection after Purchase / Delivery, Action if Quality Inspection is rejected, Action if Quality Inspection is not submitted and Save", H, U),
 *cb(Q, "Allow to make Quality Inspection after Purchase / Delivery", False),
 Q("Action if Quality Inspection is rejected - dropdown values", "Open the dropdown", "-", "The values are: Stop, Warn", H, P),
 Q("Action if Quality Inspection is rejected - default is Stop", "Open the tab on a fresh system", "-", "Stop is selected", H, P),
 Q("Action if Quality Inspection is rejected - select Warn and save", ["Select Warn", SAVE, "Reload"], "Warn", "The value is saved", H, P),
 Q("Action if Quality Inspection is rejected - select Stop and save", ["Select Warn and save", "Select Stop", SAVE], "Stop", "The value is saved", M, P),
 Q("Action if Quality Inspection is rejected - single selection", ["Select Warn", "Select Stop"], "-", "Only one value is kept", L, P),
 Q("Action if Quality Inspection is not submitted - dropdown values", "Open the dropdown", "-", "The values are: Stop, Warn", H, P),
 Q("Action if Quality Inspection is not submitted - default is Stop", "Open the tab on a fresh system", "-", "Stop is selected", H, P),
 Q("Action if Quality Inspection is not submitted - select Warn and save", ["Select Warn", SAVE, "Reload"], "Warn", "The value is saved", H, P),
 Q("Action if Quality Inspection is not submitted - select Stop and save", ["Select Warn and save", "Select Stop", SAVE], "Stop", "The value is saved", M, P),
 Q("Action if Quality Inspection is not submitted - single selection", ["Select Warn", "Select Stop"], "-", "Only one value is kept", L, P),
 Q("The two actions are independent", ["Set rejected = Warn and not submitted = Stop", SAVE, "Reload"], "Warn / Stop", "Each dropdown keeps its own value", M, P),
 Q("Save with valid data", ["Change settings", SAVE], "-", "The Inventory Settings are saved and applied", H, P),
 Q("Save without changes", ["Open the tab", SAVE], "-", "No error is displayed", L, P),
 Q("Quality tab labels are localized", ["Switch the language to Arabic", "Open the tab"], "-", "All labels are displayed in Arabic", L, U),
]

# =========================================================== 7. STOCK CLOSING
C = mk(tabpre("Stock Closing"))
FR = "Freeze stock older than (days)"
CLO = [
 C("Stock Closing tab components are displayed", "Open the Stock Closing tab", "-", "The tab displays: Freeze stock older than (days), Freeze stock up to and Save", H, U),
 C(f"{FR} - default value is 0", "Open the tab on a fresh system", "-", "The field shows 0", H, P),
 C(f"{FR} - valid number", ["Enter a number", SAVE, "Reload"], "30", "The value is saved", H, P),
 C(f"{FR} - zero disables the restriction", ["Enter 0", SAVE], "0", "The restriction is disabled and the value is saved", H, P),
 C(f"{FR} - letters", "Type letters", "abc", "The letters are not accepted (numbers only)", H, N),
 C(f"{FR} - special characters", "Type special characters", "@#", "The characters are not accepted", M, N),
 C(f"{FR} - negative number", ["Enter -5", SAVE], "-5", "The value is rejected", H, N, CLR + "Negatives are not addressed in the SRS."),
 C(f"{FR} - decimal number", ["Enter 1.5", SAVE], "1.5", "The value is rejected (numbers only)", M, N, CLR + "Decimals are not addressed in the SRS."),
 C(f"{FR} - empty value", ["Clear the field", SAVE], "Empty", "Behavior follows the BA rule (saved as 0 or error message)", H, N,
   CLR + "SRS says Optional, but also that an error appears when shorter than the minimum length of 1; contradictory."),
 C(f"{FR} - maximum length (100 characters)", "Enter 100 digits", "100 digits", "The input is accepted by the field", L, P, CLR + "No numeric upper limit is defined."),
 C(f"{FR} - input blocked beyond 100 characters", "Type 101 digits", "101 digits", "Only the first 100 digits are accepted; further input is prevented", M, N),
 C(f"{FR} - very large value", ["Enter 99999999999", SAVE], "99999999999", "A clear validation error is shown (no server error)", M, N, CLR + "No numeric limit defined."),
 C(f"{FR} - spaces", "Type spaces", "' '", "The spaces are not accepted", L, N),
 C("Freeze stock up to - default is empty", "Open the tab on a fresh system", "-", "The field is empty", H, P),
 C("Freeze stock up to - select a date from the calendar", ["Click the field", "Pick a date"], "2026-10-31", "The picked date is displayed", H, P),
 C("Freeze stock up to - save and reload", ["Pick a date", SAVE, "Reload"], "2026-10-31", "The date is saved and displayed", H, P),
 C("Freeze stock up to - optional", ["Clear the date", SAVE], "Empty", "The setting is saved without an error", M, P),
 C("Freeze stock up to - future date", ["Pick a future date", SAVE], "2027-01-01", "Behavior follows the BA rule (accepted or rejected)", M, P, CLR + "SRS does not say whether future dates are allowed."),
 C("Freeze stock up to - manually typed invalid date", "Type an invalid date", "31/31/2026", "The value is rejected", L, N),
 C("Role allowed to create/edit back-dated transactions - hidden", "Open the tab and look for the field", "-", "The field is not displayed (hidden)", M, U, CLR + "SRS marks the field Hidden but defines its rules; the condition for showing it is not stated."),
 C("Save with valid data", ["Change settings", SAVE], "-", "The Inventory Settings are saved and applied", H, P),
 C("Save with an invalid value", ["Enter an invalid value in Freeze stock older than (days)", SAVE], "abc / -5", "A validation error message is displayed and nothing is saved", H, N),
 C("Save without changes", ["Open the tab", SAVE], "-", "No error is displayed", L, P),
 C("Stock Closing tab labels are localized", ["Switch the language to Arabic", "Open the tab"], "-", "All labels are displayed in Arabic", L, U),
]

# =========================================================== 8. INTEGRATION / CROSS TAB
X = mk("The setting is saved before running the scenario")
INTG = [
 # general
 X("Each tab has its own Save button", "Open every tab and review the Save button", "7 tabs", "A Save button is displayed on every tab", M, U),
 X("Switch tabs with unsaved changes", ["Change a field on the Defaults tab", "Switch to Quality tab", "Return to Defaults"], "-", "Behavior follows the BA rule (change kept, discarded, or warning shown)", M, N, CLR + "SRS does not define behavior when switching tabs with unsaved changes."),
 X("Change in one tab then Save in another tab", ["Change a field on the Defaults tab", "Switch to Quality tab and change a field", "Click Save on the Quality tab", "Reload"], "-", "Behavior follows the BA rule (one Save may save all tabs or only the current one)", H, N, CLR + "All tabs belong to one Inventory Settings document; whether Save is per tab is not defined."),
 X("Leave the screen with unsaved changes", ["Change a field", "Navigate to another screen"], "-", "A warning about unsaved changes is displayed (or the changes are discarded)", L, N, CLR + "Not defined."),
 X("Settings are visible to all users", ["User A saves a change", "User B opens the Inventory Settings"], "-", "User B sees the updated value", M, P),
 X("Access to Inventory Settings by a user without permission", ["Log in with a user that has no permission on Inventory Settings", "Open the screen"], "-", "Access is denied with a clear message", H, N, CLR + "SRS does not define roles / permissions for this screen."),
 X("Concurrent edits by two users", ["User A and B open the settings", "User A saves", "User B saves a different change"], "-", "User B gets a document-modified message (or last save wins per the BA rule)", L, N, CLR + "Not defined."),
 # defaults effect
 X("Item Naming By = Item Code affects Add Item", ["Select Item Code and save", "Open Add Item"], "Item Code", "The item code is entered manually on the Add Item screen", H, P),
 X("Item Naming By = Naming Series affects Add Item", ["Configure ITM-.##### and select Naming Series", "Open Add Item and save an item"], "Naming Series", "The item ID is generated from the series and no manual code is requested", H, P, CLR + "How the Add Item screen changes (hidden code field) is not defined."),
 X("Default Item Group is applied on a new item", ["Set Default Item Group and save", "Open Add Item"], "Products", "The Item Group field is pre-filled with the default", H, P),
 X("Default Stock UOM is applied on a new item", ["Set Default Stock UOM = Kg and save", "Open Add Item"], "Kg", "The Stock UOM field is pre-filled with Kg", H, P),
 X("Default Valuation Method is applied on a new item", ["Set Moving Average and save", "Open Add Item"], "Moving Average", "The Valuation Method of the new item defaults to Moving Average", H, P),
 X("Default Warehouse is applied in stock transactions", ["Set Default Warehouse = Stores - E and save", "Open Add Stock Entry"], "Stores - E", "The warehouse fields are pre-filled with the default", H, P),
 X("Sample Retention Warehouse is used by Quality / Sample flows", ["Set Sample Retention Warehouse and save", "Create a sample retention Stock Entry"], "Samples - E", "The configured warehouse is used", M, P, CLR + "SRS does not describe where this warehouse is consumed."),
 X("Auto Create Item Price - first sales transaction", ["Enable the setting and save", "Create a Sales Order for an item without an Item Price", "Submit it"], "Rate: 100", "An Item Price is created in the selling price list with the rate of the transaction", H, P),
 X("Auto Create Item Price - first purchase transaction", ["Enable the setting and save", "Create a Purchase Order for an item without a buying Item Price"], "Rate: 80", "An Item Price is created in the buying price list with the transaction rate", H, P),
 X("Auto Create Item Price - existing price is not overwritten", ["Item already has an Item Price", "Create a transaction with a different rate"], "Existing 100 / new 120", "The existing Item Price is not changed", H, N),
 X("Auto Create Item Price - disabled", ["Disable the setting and save", "Create a transaction for an item without an Item Price"], "-", "No Item Price is created", M, N),
 X("Allow to edit stock UOM qty for Sales documents - enabled", ["Enable and save", "Open a Sales Order item row"], "-", "Qty as per stock UOM is editable", M, P),
 X("Allow to edit stock UOM qty for Sales documents - disabled", ["Disable and save", "Open a Sales Order item row"], "-", "Qty as per stock UOM is read only", M, N),
 X("Allow to edit stock UOM qty for Purchase documents - enabled", ["Enable and save", "Open a Purchase Receipt item row"], "-", "Accepted Qty in stock UOM is editable", M, P),
 X("Allow to edit stock UOM qty for Purchase documents - disabled", ["Keep disabled", "Open a Purchase Receipt item row"], "-", "Accepted Qty in stock UOM is read only", M, N),
 X("Allow to edit stock UOM qty for Stock Entry - enabled", ["Enable and save", "Open a Stock Entry item row"], "-", "Qty as per stock UOM is editable", M, P),
 X("Allow to edit stock UOM qty for Stock Entry - disabled", ["Keep disabled", "Open a Stock Entry item row"], "-", "Qty as per stock UOM is read only", M, N),
 X("Allow UOM with conversion rate defined in Item - enabled", ["Enable and save", "Open a transaction row and open the UOM list"], "-", "Only UOMs with a conversion factor in the item are listed", H, P),
 X("Allow UOM with conversion rate defined in Item - disabled", ["Keep disabled", "Open a transaction row and open the UOM list"], "-", "All UOMs are listed", M, N),
 X("Raise Material Request at re-order level - enabled", ["Enable and save", "Reduce an item below its Re-order Level"], "Re-order level: 10 / stock: 5", "A Material Request is created automatically", H, P, CLR + "Trigger timing (scheduler) is not defined."),
 X("Raise Material Request at re-order level - disabled", ["Disable and save", "Reduce an item below its Re-order Level"], "-", "No Material Request is created", M, N),
 # validations effect
 X("Allow Negative Stock - enabled allows a negative Material Issue", ["Enable with Yes and save", "Submit a Material Issue larger than the available stock"], "Available 5 / Issue 8", "The Stock Entry is submitted and the balance becomes negative", H, P),
 X("Allow Negative Stock - disabled blocks a negative Material Issue", ["Keep it disabled", "Submit a Material Issue larger than the available stock"], "Available 5 / Issue 8", "An insufficient stock error message is displayed and the Stock Entry is not submitted", H, N),
 X("Allow Negative Stock - serial / batch items still blocked", ["Enable Allow Negative Stock", "Submit an issue larger than stock for a serial / batch item"], "Serial item", "The transaction is rejected even though negative stock is enabled", H, N),
 X("Over Delivery/Receipt Allowance - delivery within tolerance", ["Set 10% and save", "Create a Delivery Note for 110 against a Sales Order of 100"], "Ordered 100 / Delivered 110 / 10%", "The Delivery Note is accepted", H, P),
 X("Over Delivery/Receipt Allowance - delivery above tolerance", ["Set 10% and save", "Create a Delivery Note for 111 against a Sales Order of 100"], "Ordered 100 / Delivered 111 / 10%", "An error message is displayed and the Delivery Note is not accepted", H, N),
 X("Over Delivery/Receipt Allowance - receipt within tolerance", ["Set 10% and save", "Create a Purchase Receipt for 110 against a Purchase Order of 100"], "Ordered 100 / Received 110", "The Purchase Receipt is accepted", H, P),
 X("Over Delivery/Receipt Allowance - receipt above tolerance", ["Set 10% and save", "Create a Purchase Receipt for 111 against a Purchase Order of 100"], "Ordered 100 / Received 111", "An error message is displayed and the Purchase Receipt is not accepted", H, N),
 X("Over Delivery/Receipt Allowance - Sales Invoice with Update Stock", ["Set 10% and save", "Create a Sales Invoice with Update Stock above the ordered quantity but within tolerance"], "110 / 100", "The invoice is accepted", M, P),
 X("Over Delivery/Receipt Allowance - Purchase Invoice with Update Stock", ["Set 10% and save", "Create a Purchase Invoice with Update Stock above the ordered quantity but within tolerance"], "110 / 100", "The invoice is accepted", M, P),
 X("Over Delivery/Receipt Allowance - zero tolerance", ["Set 0 and save", "Deliver more than the ordered quantity"], "101 / 100", "An error message is displayed", H, N),
 X("Over Delivery/Receipt Allowance - decimal tolerance", ["Set 2.5% and save", "Deliver 102.5 against 100", "Deliver 102.6 against 100"], "2.5%", "102.5 is accepted and 102.6 is rejected", M, P),
 X("Over Delivery/Receipt Allowance - item-level allowance priority", ["Set a different allowance on the item", "Deliver above the global tolerance"], "-", "The behavior follows the BA rule (item vs global priority)", L, N, CLR + "SRS does not mention an item-level allowance."),
 X("Show barcode field in transactions - enabled", ["Enable and save", "Open a Stock Entry item row"], "-", "The barcode field is displayed", M, P),
 X("Show barcode field in transactions - disabled", ["Disable and save", "Open a Stock Entry item row"], "-", "The barcode field is not displayed", M, N),
 X("Validate Material Transfer Warehouses - enabled blocks the same warehouse", ["Enable and save", "Submit a Material Transfer with the same source and target"], "Stores - E / Stores - E", "An error message is displayed and the Stock Entry is not saved", H, N),
 X("Validate Material Transfer Warehouses - enabled allows different warehouses", ["Enable and save", "Submit a Material Transfer with different warehouses"], "Stores - E / Finished - E", "The Stock Entry is saved", H, P),
 X("Validate Material Transfer Warehouses - disabled allows the same warehouse", ["Disable and save", "Submit a Material Transfer with the same source and target"], "Stores - E / Stores - E", "The Stock Entry is saved", H, P),
 X("Validate Material Transfer Warehouses - same warehouse with a different inventory dimension", ["Enable and save", "Use the same warehouse with a different inventory dimension value"], "Same WH / different dimension", "The Stock Entry is allowed", M, P),
 X("Validate Material Transfer Warehouses - same warehouse with the same inventory dimension", ["Enable and save", "Use the same warehouse and the same dimension value"], "Same WH / same dimension", "An error message is displayed", M, N),
 # variant effect
 X("Do not update variants on save - enabled", ["Enable and save", "Change a template field", "Open an existing variant"], "-", "Existing variants are not updated", H, N),
 X("Do not update variants on save - disabled", ["Keep disabled", "Change a template field", "Open an existing variant"], "-", "Existing variants are updated with the template change", H, P),
 X("Do not update variants on save - new variant copies template fields", ["Enable and save", "Create a new variant"], "-", "The new variant copies the configured template fields", M, P),
 X("Allow Rename Attribute Value - enabled", ["Enable and save", "Rename an attribute value assigned to variants"], "Red -> Dark Red", "The value is renamed and propagated to the affected variants", H, P),
 X("Allow Rename Attribute Value - disabled", ["Keep disabled", "Rename an attribute value assigned to variants"], "-", "The rename is blocked with an error message", H, N),
 X("Allow Variant UOM to be different from Template UOM - enabled", ["Enable and save", "Create a variant with a different Stock UOM"], "Template: Nos / Variant: Box", "The variant is created", H, P),
 X("Allow Variant UOM to be different from Template UOM - disabled", ["Keep disabled", "Create a variant with a different Stock UOM"], "Template: Nos / Variant: Box", "An error message is displayed", H, N),
 X("Copy Field To Variant - configured field is copied", ["Add brand to the table and save", "Create a variant from a template with a brand"], "brand", "The variant gets the brand of the template", H, P),
 X("Copy Field To Variant - field not in the table is not copied", ["Create a variant from a template with a value in a field that is not in the table"], "-", "The field is not copied", M, N),
 X("Copy Field To Variant - mandatory system fields are always copied", ["Create a variant"], "-", "Mandatory system fields are copied from the template", M, P),
 # serial / batch effect
 X("Pick Serial / Batch Based On = FIFO", ["Set FIFO and save", "Issue stock of a serial item received on different dates"], "-", "The oldest serial / batch is picked first", H, P),
 X("Pick Serial / Batch Based On = LIFO", ["Set LIFO and save", "Issue stock of a serial item received on different dates"], "-", "The newest serial / batch is picked first", H, P),
 X("Pick Serial / Batch Based On = Expiry", ["Set Expiry and save", "Issue stock of a batch item with different expiry dates"], "-", "The batch with the nearest expiry date is picked first", H, P),
 X("Allow existing Serial No to be Received again - enabled", ["Enable and save", "Receive a serial number that already exists"], "SN-001", "The receipt is accepted", H, P),
 X("Allow existing Serial No to be Received again - disabled", ["Disable and save", "Receive a serial number that already exists"], "SN-001", "An error message is displayed because the serial number must be unique", H, N),
 X("Use Direct Serial / Batch fields - enabled", ["Enable and save", "Open a Stock Entry row of a serial item"], "-", "Serial No and Batch No fields are displayed in the row and a bundle is created automatically on submit", H, P),
 X("Disable Automatic Serial / Batch Selector - enabled", ["Enable and save", "Add a serial item row"], "-", "The selector does not open automatically; it opens through Pick Serial / Batch No", H, P),
 X("Disable Automatic Serial / Batch Selector - disabled", ["Keep disabled", "Add a serial item row"], "-", "The selector opens automatically", M, P),
 X("Use Item Moving Average for New Batches - enabled", ["Enable and save", "Create a new batch for a Moving Average item"], "-", "Batch-wise valuation is not used for the new batch", H, P),
 X("Use Item Moving Average for New Batches - FIFO items are not affected", ["Create a new batch for a FIFO item"], "-", "The batch keeps its own valuation", M, N),
 X("Auto create Serial and Batch Bundle for outward - enabled", ["Enable and save", "Submit a Delivery Note with a serial item without selecting serials"], "-", "A bundle is created automatically using the Pick Serial / Batch Based On rule", H, P),
 X("Auto create Serial and Batch Bundle for outward - disabled", ["Disable and save", "Submit a Delivery Note with a serial item without selecting serials"], "-", "An error message asks the user to select serial / batch numbers", H, N),
 X("Do not update Serial / Batch on creation of auto bundle - enabled", ["Enable and save", "Submit an outward transaction with an auto bundle"], "-", "The bundle is created without updating the serial / batch in the transaction row", M, P),
 # reservation / quality / closing
 X("Enable Stock Reservation - enabled allows reservation", ["Enable and save", "Open a Sales Order"], "-", "The Reserve Stock option is available", H, P),
 X("Enable Stock Reservation - disabled hides reservation", ["Disable and save", "Open a Sales Order"], "-", "The Reserve Stock option is not available", H, N),
 X("Auto Reserve Stock - enabled", ["Enable and save", "Create and submit a Sales Order"], "-", "Reserve Stock is checked and stock is reserved automatically", H, P),
 X("Allow Partial Reservation - enabled", ["Enable and save", "Create a Sales Order whose quantity exceeds the available stock with Reserve Stock"], "Qty 10 / Available 6", "6 units are reserved", H, P),
 X("Allow Partial Reservation - disabled", ["Disable and save", "Create a Sales Order whose quantity exceeds the available stock with Reserve Stock"], "Qty 10 / Available 6", "The reservation is rejected with an error message", H, N),
 X("Auto reserve Stock for Sales Order on Purchase Receipt Submission - enabled", ["Enable and save", "Submit a Purchase Receipt against a Purchase Order created from a Material Request"], "-", "The received stock is reserved for the related Sales Order", H, P),
 X("Auto Reserve Serial and Batch NOS - enabled", ["Enable and save", "Reserve stock of a serial item"], "-", "Serial / batch numbers are reserved according to Pick Serial / Batch Based On", H, P),
 X("Allow to make Quality Inspection after Purchase / Delivery - enabled", ["Enable and save", "Submit a Purchase Receipt without a Quality Inspection"], "-", "The Purchase Receipt is submitted and the inspection can be created afterwards", H, P),
 X("Allow to make Quality Inspection after Purchase / Delivery - disabled", ["Keep disabled", "Submit a Purchase Receipt that requires inspection without one"], "-", "Submission is blocked until the inspection exists", H, N),
 X("Action if Quality Inspection is rejected = Stop", ["Set Stop and save", "Submit a Purchase Receipt with a rejected Quality Inspection"], "Stop", "The transaction is blocked with an error message", H, N),
 X("Action if Quality Inspection is rejected = Warn", ["Set Warn and save", "Submit a Purchase Receipt with a rejected Quality Inspection"], "Warn", "A warning is displayed and the transaction proceeds", H, P),
 X("Action if Quality Inspection is not submitted = Stop", ["Set Stop and save", "Submit a transaction with a Draft Quality Inspection"], "Stop", "The transaction is blocked with an error message", H, N),
 X("Action if Quality Inspection is not submitted = Warn", ["Set Warn and save", "Submit a transaction with a Draft Quality Inspection"], "Warn", "A warning is displayed and the transaction proceeds", H, P),
 X("Freeze stock older than (days) - transaction inside the period", ["Set 30 and save", "Create a stock transaction dated 10 days ago"], "30 days", "The transaction is accepted", H, P),
 X("Freeze stock older than (days) - transaction older than the period", ["Set 30 and save", "Create a stock transaction dated 31 days ago"], "30 days", "The transaction is blocked with an error message", H, N),
 X("Freeze stock older than (days) - exactly on the boundary", ["Set 30 and save", "Create a stock transaction dated exactly 30 days ago"], "30 days", "Behavior follows the BA rule (inclusive or exclusive)", M, N, CLR + "Boundary inclusiveness is not defined."),
 X("Freeze stock older than (days) = 0 disables the restriction", ["Set 0 and save", "Create a stock transaction dated one year ago"], "0", "The transaction is accepted", H, P),
 X("Freeze stock up to - transaction before the date", ["Set 2026-10-31 and save", "Create a stock transaction dated 2026-10-15"], "2026-10-31", "The transaction is blocked with an error message", H, N),
 X("Freeze stock up to - transaction after the date", ["Set 2026-10-31 and save", "Create a stock transaction dated 2026-11-02"], "2026-10-31", "The transaction is accepted", H, P),
 X("Freeze stock up to - transaction on the date", ["Set 2026-10-31 and save", "Create a stock transaction dated 2026-10-31"], "2026-10-31", "Behavior follows the BA rule (inclusive or exclusive)", M, N, CLR + "Boundary inclusiveness is not defined."),
 X("Freeze stock - editing an existing transaction in the frozen period", ["Freeze stock", "Edit / cancel a transaction in the frozen period"], "-", "The change is blocked", H, N),
 X("Freeze stock - role allowed to create / edit back-dated transactions", ["Assign a role in the hidden field (API)", "Create a back-dated transaction with and without the role"], "-", "Only users with the role can create / edit back-dated transactions", M, P, CLR + "The field is hidden, so it cannot be configured from the UI."),
 X("Freeze stock - empty role allows all authorized users", ["Leave the role empty", "Create a back-dated transaction with an authorized user"], "-", "The transaction is accepted", L, P),
]

SECTIONS = [
    ("1. Defaults Tab", "ISD", DEF),
    ("2. Stock Validations Tab", "ISV", VAL),
    ("3. Item Variant Tab", "ISI", ITV),
    ("4. Serial & Batch Item Tab", "ISB", SBI),
    ("5. Stock Reservation Tab", "ISR", RES),
    ("6. Quality Tab", "ISQ", QUA),
    ("7. Stock Closing Tab", "ISC", CLO),
    ("8. Cross-Tab Behavior & Settings Impact (Integration)", "ISX", INTG),
]

build(OUT, "SHAMEL - Inventory Module | Test Cases - Inventory Settings",
      "Based on SRS v1.0 - SHAMEL Project (Inventory Settings) ", SECTIONS)
tot = sum(len(c) for _, _, c in SECTIONS)
clar = sum(1 for _, _, cs in SECTIONS for c in cs if c[7].startswith("Needs"))
print("total", tot, "clarifications", clar, {s: len(c) for s, _, c in SECTIONS})
