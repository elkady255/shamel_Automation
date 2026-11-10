import math
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

OUT = r"C:\Playwright_Automation\Shamel-test-cases\SHAMEL_CouponCode_Test_Cases_EN.xlsx"
H, M, L = "High", "Medium", "Low"
P, N, U = "Positive", "Negative", "UI"
CLR = "Needs Clarification: "


def mk(pre):
    def f(title, steps, data, exp, pri, typ, rem="-", p=None):
        return (title, p or pre, steps, data, exp, pri, typ, rem)
    return f


S1 = "1. Coupon Code List Screen"
S2 = "2. Add Coupon Code Screen"
S3 = "3. Coupon Code Details Screen"
S4 = "4. Coupon Code Integration (Pricing Rule / Sales Order)"

# =========================================================== LIST
Lc = mk("Access via Selling > Coupon Code")
LIST = [
 Lc("Display the Coupon Code list", ["Click Selling from the side menu", "Click Coupon Code"], "-", "A table listing all Coupon Codes in the system is displayed", H, P),
 Lc("Add Coupon Code button is displayed", "Verify the Add Coupon Code button on the list screen", "-", "The Add Coupon Code button is visible and clickable", M, U),
 Lc("Navigate to the Add Coupon Code screen", "Click the Add Coupon Code button", "-", "The user is redirected to the Add Coupon Code screen", H, P),
 Lc("Display checkbox column for row selection", "Open the list", "-", "A checkbox is displayed next to each row and supports multiple selection", L, U),
 Lc("Display Coupon Code ID column", "Open the list", "-", "The Coupon Code ID is displayed for each row as a clickable link", M, U),
 Lc("Navigate to Details by clicking the Coupon Code ID", "Click a Coupon Code ID in the table", "SUMMER25", "The user is redirected to the Coupon Code Details screen of the selected record", H, P),
 Lc("Display Coupon Code name column", "Open the list", "Summer Sale 2026", "The Coupon Code name is displayed for each row", M, U),
 Lc("Display Coupon Type column", "Open the list and review the Coupon Type column", "Promotional, Gift Card", "Each row shows exactly one Coupon Type value", H, P,
    CLR + "SRS lists the values as 'Promotional' and 'Gift type' on the list, but 'Promotional' and 'Gift Card' on the Add screen. Confirm the correct label."),
 Lc("Display Valid From column", "Open the list and review the Valid From column", "2026-12-01", "The date from which the coupon becomes valid is displayed", M, U),
 Lc("Valid From is empty for a coupon without a start date", "Review the row of a coupon saved without Valid From", "Valid From: empty", "The Valid From cell is displayed empty and no error occurs", L, P,
    CLR + "SRS marks Valid From optional but does not say how an empty value is displayed in the list."),
 Lc("List displays only the columns defined in the SRS", "Review the list header", "-", "The columns are: Checkbox, Coupon code ID, Coupon Code name, Coupon Type, Valid from", M, U,
    CLR + "SRS does not list Valid To, Maximum Use or Used in the list. Confirm this is intended."),
 Lc("Newly added coupon appears in the list", ["Add a new Coupon Code", "Return to the list"], "Summer Sale 2026 / SUMMER25", "The new coupon is displayed in the list with the entered values", H, P),
 Lc("List displays an empty state when no coupons exist", "Open the list in a system without Coupon Codes", "-", "An empty-state message / empty table is displayed with no error", L, U,
    CLR + "SRS does not define the empty state."),
 Lc("Action bar appears when one row is selected", "Select the checkbox of one coupon", "-", "An action bar appears showing the available actions", H, P),
 Lc("Action bar appears when multiple rows are selected", "Select the checkboxes of three coupons", "-", "The action bar is displayed and applies to the selected rows", M, P),
 Lc("Action bar disappears when all rows are deselected", ["Select one coupon", "Clear the checkbox"], "-", "The action bar is no longer displayed", L, P),
 Lc("Action bar contains the required actions", "Select a coupon and review the action bar", "-", "The action bar contains: Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete", M, U),
 # ---- Edit
 Lc("Open the Edit popup", ["Select a coupon", "Click Edit"], "-", "A popup is displayed containing the Field dropdown and the Value field", H, P),
 Lc("Field dropdown is a single-selection list of Coupon Code fields", ["Open the Edit popup", "Open the Field dropdown", "Try to select two options"], "-", "The dropdown lists the fields of the Coupon Code doctype and allows selecting only one option", M, P),
 Lc("Click Update without selecting a Field", ["Open the Edit popup", "Leave Field empty", "Click the confirm button"], "-", "An error message is displayed because Field is mandatory", M, N,
    CLR + "SRS does not name the popup confirm button (Update / Save) nor its error text."),
 Lc("Value input changes type based on the selected Field (text)", ["Open the Edit popup", "Select Field = Coupon Name"], "Field: Coupon Name", "The Value field becomes a text input", M, P),
 Lc("Value input changes type based on the selected Field (date)", ["Open the Edit popup", "Select Field = Valid To"], "Field: Valid To", "The Value field becomes a date picker", M, P),
 Lc("Value input changes type based on the selected Field (dropdown)", ["Open the Edit popup", "Select Field = Coupon Type"], "Field: Coupon Type", "The Value field becomes a dropdown with Promotional and Gift Card", M, P),
 Lc("Value input changes type based on the selected Field (link)", ["Open the Edit popup", "Select Field = Pricing Rule"], "Field: Pricing Rule", "The Value field becomes a searchable dropdown listing only Coupon Code Based pricing rules", M, P),
 Lc("Value is mandatory for a mandatory Field", ["Open the Edit popup", "Select Field = Coupon Type", "Leave Value empty", "Click the confirm button"], "Field: Coupon Type", "An error message is displayed because the Value is mandatory for this field", M, N),
 Lc("Value is optional for an optional Field", ["Open the Edit popup", "Select Field = Valid To", "Leave Value empty", "Click the confirm button"], "Field: Valid To", "The Valid To value is cleared on the selected coupon without an error", M, P),
 Lc("Value validation rules follow the selected Field", ["Open the Edit popup", "Select Field = Coupon Name", "Enter a single character", "Click the confirm button"], "Coupon Name: A", "A minimum length (2 characters) error message is displayed", H, N),
 Lc("Bulk edit updates all selected coupons", ["Select two coupons", "Click Edit", "Select Field = Valid To", "Pick a date", "Confirm"], "Valid To: 2026-12-31", "Valid To is updated on both selected coupons", H, P,
    CLR + "SRS does not define the success message or a partial-failure result for bulk edit."),
 Lc("Bulk edit with a value that is invalid for one of the coupons", ["Select two coupons (one with Valid From 2026-12-15)", "Click Edit", "Select Field = Valid To", "Pick 2026-12-01", "Confirm"], "Valid To earlier than Valid From of one record", "The invalid record is rejected with an error message and the valid record is handled according to the BA rule", M, N,
    CLR + "SRS does not define partial failure behavior."),
 Lc("Edit the Coupon Code (unique) field in bulk to a duplicate value", ["Select one coupon", "Click Edit", "Select Field = Coupon Code", "Enter the code of another existing coupon", "Confirm"], "SUMMER25", "An error message is displayed because the coupon code must be unique", H, N),
 # ---- Other actions
 Lc("Export the selected coupons", ["Select a coupon", "Click Export"], "-", "The selected coupons are exported to a file", M, P, CLR + "SRS only names the action; format and columns are not defined."),
 Lc("Assign the selected coupon to a user", ["Select a coupon", "Click Assign to", "Select a user", "Confirm"], "User: Test QA User", "The coupon is assigned to the selected user", L, P),
 Lc("Clear the assignment of the selected coupon", ["Select an assigned coupon", "Click Clear assignment"], "-", "The assignment is removed from the coupon", L, P),
 Lc("Add a tag to the selected coupon", ["Select a coupon", "Click Add tags", "Enter a tag", "Confirm"], "Tag: Summer", "The tag is added to the coupon", L, P),
 Lc("Print the selected coupon", ["Select a coupon", "Click Print"], "-", "The print preview / print dialog of the coupon is displayed", L, P),
 # ---- Delete
 Lc("Delete confirmation message is displayed", ["Select an unlinked coupon", "Click Delete"], "-", "A confirmation message is displayed asking whether the user wants to delete this Coupon Code", H, P),
 Lc("Cancel the delete confirmation", ["Select a coupon", "Click Delete", "Choose to not confirm (No / close)"], "-", "The coupon is not deleted and remains in the list", M, N, CLR + "SRS defines only the 'Yes' button; the cancel option is assumed."),
 Lc("Delete an unlinked coupon", ["Select a coupon not used in any transaction", "Click Delete", "Click Yes"], "Unused coupon", "The coupon is deleted successfully and removed from the list", H, P),
 Lc("Delete a coupon linked to a Sales Order", ["Select a coupon used in a Sales Order", "Click Delete", "Click Yes"], "Coupon used in SO-2026-00001", "A message is displayed that the linked transactions must be deleted first; the coupon is not deleted", H, N),
 Lc("Linked doctypes in the warning message are hyperlinks", ["Trigger the linked-transactions warning", "Click a linked doctype"], "Sales Order", "The user is redirected to the corresponding doctype list", M, P),
 Lc("Delete multiple coupons including a linked one", ["Select one unlinked and one linked coupon", "Click Delete", "Click Yes"], "2 coupons", "Behavior follows the BA rule (linked coupon blocked)", M, N, CLR + "SRS does not define bulk delete when only some records are linked."),
 Lc("Delete is blocked when the coupon is only referenced by a Pricing Rule", ["Select a coupon", "Click Delete", "Click Yes"], "Coupon linked to PRLE-0001", "Behavior follows the BA rule", L, N, CLR + "SRS lists 'other transactions' without naming them; confirm whether the Pricing Rule link blocks deletion."),
 # ---- Search / sort
 Lc("Search the list by Coupon Code ID", ["Enter a coupon code ID in the search field"], "SUMMER25", "Only matching coupons are displayed", M, P, CLR + "SRS does not describe search, filters or sorting for this list."),
 Lc("Filter the list by Coupon Type", ["Open filters", "Select Coupon Type = Gift Card"], "Gift Card", "Only Gift Card coupons are displayed", M, P, CLR + "SRS does not describe search, filters or sorting for this list."),
 Lc("Sort the list by Valid From", ["Click the Valid From column / sort control"], "-", "The list is sorted by Valid From ascending then descending", L, P, CLR + "SRS does not describe search, filters or sorting for this list."),
 Lc("List pagination with many coupons", ["Create more coupons than the page size", "Scroll / go to the next page"], "> 20 coupons", "All records are reachable through pagination", L, P, CLR + "Pagination is not described in the SRS."),
]

# =========================================================== ADD
A = mk("Access via Selling > Coupon Code > Add Coupon Code")
VALID = "Fill all other mandatory fields with valid data"
ADD = [
 # screen layout
 A("Display all fields of the Add Coupon Code screen", "Open the Add Coupon Code screen", "-", "The screen displays: Coupon Name, Coupon Code, Coupon Type, Pricing Rule, Valid From, Valid To, Maximum Use, Used, Coupon Description and the Save button", H, U),
 A("From External Ecomm platform field is hidden", "Open the Add Coupon Code screen and review the fields", "-", "The 'From External Ecomm platform' checkbox is not displayed", M, U,
   CLR + "SRS marks the field '(Hidden)' but also describes behavior when it is checked. Confirm when it is shown (role, integration, setting)."),
 A("Customer field is hidden for the default Coupon Type", "Open the Add Coupon Code screen", "-", "The Customer field is not displayed", M, U),
 A("Used field is read only", "Open the Add Coupon Code screen and try to type in Used", "-", "The Used field is a read-only label (no input), displaying 0 for a new coupon", M, U, CLR + "SRS does not state the default value (0) of Used on a new coupon."),
 A("Mandatory fields are marked", "Open the Add Coupon Code screen", "-", "Coupon Name, Coupon Code, Coupon Type and Pricing Rule are marked as mandatory", M, U),
 A("Optional fields are not marked mandatory", "Open the Add Coupon Code screen", "-", "Customer, Valid From, Valid To, Maximum Use and Coupon Description are not marked mandatory", L, U),
 # coupon name
 A("Add a coupon with all valid fields", ["Enter a valid Coupon Name", "Enter a unique Coupon Code", "Select Coupon Type = Promotional", "Select a Pricing Rule", "Click Save"], "Name: Summer Sale 2026 / Code: SUMMER25 / Type: Promotional / Pricing Rule: PRLE-0001", "The coupon is added successfully", H, P,
   CLR + "SRS does not say where the user is redirected after Save (Details screen or list) nor the success message."),
 A("Add a coupon with only mandatory fields", ["Fill only the mandatory fields", "Click Save"], "Name: Basic Coupon / Code: BASIC10 / Type: Promotional / Pricing Rule: PRLE-0001", "The coupon is added successfully with optional fields empty", H, P),
 A("Add a coupon with all fields (including optional)", ["Fill all fields including Valid From, Valid To, Maximum Use and Description", "Click Save"], "Valid From: 2026-12-01 / Valid To: 2026-12-31 / Max Use: 50 / Description: Winter campaign", "The coupon is added successfully with all entered data", H, P),
 A("Coupon Name - minimum length (2 characters)", ["Enter a 2-character name", VALID, "Click Save"], "Name: AB", "The coupon is saved without an error", M, P),
 A("Coupon Name - below minimum length (1 character)", ["Enter a 1-character name", VALID, "Click Save"], "Name: A", "An error message appears because the name is shorter than 2 characters", H, N),
 A("Coupon Name - maximum length (100 characters)", ["Enter a 100-character name", VALID, "Click Save"], "100 characters", "The name is accepted and the coupon is saved", M, P),
 A("Coupon Name - input is blocked beyond 100 characters", "Type or paste 101 characters in Coupon Name", "101 characters", "Only the first 100 characters are accepted; further input is prevented", H, N),
 A("Coupon Name - empty", ["Leave Coupon Name empty", VALID, "Click Save"], "-", "An error message appears because the field is mandatory and the coupon is not saved", H, N),
 A("Coupon Name - whitespace only", ["Enter spaces only in Coupon Name", VALID, "Click Save"], "Name: '   '", "An error message appears; the coupon is not saved", M, N, CLR + "SRS does not define how spaces-only input is treated."),
 A("Coupon Name - leading and trailing spaces", ["Enter ' Summer ' in Coupon Name", VALID, "Click Save"], "Name: ' Summer '", "The coupon is saved and the name is trimmed", L, P, CLR + "Trimming behavior is not defined in the SRS."),
 A("Coupon Name - letters, numbers and special characters", ["Enter a name containing all three types", VALID, "Click Save"], "Name: Eid #1 - 50% Off!", "The name is accepted and the coupon is saved", M, P),
 A("Coupon Name - Arabic characters", ["Enter an Arabic name", VALID, "Click Save"], "Name: عرض الصيف", "The name is accepted and displayed correctly", M, P),
 A("Coupon Name - duplicate name", ["Enter the name of an existing coupon", "Enter a different unique Coupon Code", "Click Save"], "Name: Summer Sale 2026 (already exists)", "Behavior follows the BA rule (allowed or rejected)", M, N, CLR + "SRS requires uniqueness only for Coupon Code, not for Coupon Name."),
 A("Coupon Name - invalid name error", ["Enter a name containing only special characters", VALID, "Click Save"], "Name: @@@@", "To be confirmed: an 'invalid name' error message is displayed", L, N,
   CLR + "SRS says 'Accepts letters, numbers, and special characters' and also 'an error message will appear if an invalid item name is entered' ('item name' looks copied). The invalid pattern is undefined."),
 # coupon code
 A("Coupon Code - valid unique code", ["Enter a unique Coupon Code", VALID, "Click Save"], "Code: SUMMER25", "The code is accepted and the coupon is saved", H, P),
 A("Coupon Code - minimum length (2 characters)", ["Enter a 2-character code", VALID, "Click Save"], "Code: S1", "The code is accepted and the coupon is saved", M, P),
 A("Coupon Code - below minimum length (1 character)", ["Enter a 1-character code", VALID, "Click Save"], "Code: S", "An error message appears because the code is shorter than 2 characters", H, N),
 A("Coupon Code - maximum length (100 characters)", ["Enter a 100-character code", VALID, "Click Save"], "100 characters", "The code is accepted and the coupon is saved", M, P),
 A("Coupon Code - input is blocked beyond 100 characters", "Type or paste 101 characters in Coupon Code", "101 characters", "Only the first 100 characters are accepted; further input is prevented", H, N),
 A("Coupon Code - empty", ["Leave Coupon Code empty", VALID, "Click Save"], "-", "An error message appears because the field is mandatory and the coupon is not saved", H, N),
 A("Coupon Code - duplicate code", ["Enter the code of an existing coupon", VALID, "Click Save"], "Code: SUMMER25 (already exists)", "The coupon is not saved and an error message indicates that the code must be unique", H, N,
   CLR + "SRS does not define the duplicate-code error message."),
 A("Coupon Code - duplicate with different letter case", ["Enter 'summer25' while 'SUMMER25' exists", VALID, "Click Save"], "Code: summer25", "Behavior follows the BA rule (case-insensitive uniqueness expected)", M, N, CLR + "SRS does not say whether uniqueness is case sensitive."),
 A("Coupon Code - duplicate with leading or trailing space", ["Enter ' SUMMER25' while 'SUMMER25' exists", VALID, "Click Save"], "Code: ' SUMMER25'", "The code is treated as a duplicate and rejected", L, N, CLR + "Trimming is not defined in the SRS."),
 A("Coupon Code - special characters", ["Enter a code with special characters", VALID, "Click Save"], "Code: SAVE-20%_VIP", "The code is accepted and the coupon is saved", M, P),
 A("Coupon Code - Arabic characters", ["Enter an Arabic code", VALID, "Click Save"], "Code: خصم٢٠", "The code is accepted and the coupon is saved", L, P, CLR + "Confirm that non-Latin codes can be redeemed."),
 A("Coupon Code - spaces inside the code", ["Enter a code that contains a space", VALID, "Click Save"], "Code: SUMMER 25", "Behavior follows the BA rule (accepted or rejected)", L, N, CLR + "SRS does not say whether spaces are allowed."),
 A("Coupon Code - whitespace only", ["Enter spaces only", VALID, "Click Save"], "Code: '  '", "An error message appears; the coupon is not saved", M, N),
 A("Coupon Code - duplicate error is shown without saving other data", ["Enter a duplicate code", "Click Save", "Review the form"], "SUMMER25", "The error is shown and the other entered values are kept in the form", L, N),
 # ecomm checkbox
 A("From External Ecomm platform - Pricing Rule behavior when checked", ["Make the 'From External Ecomm platform' checkbox available", "Check it"], "-", "The Pricing Rule field is hidden", M, P,
   CLR + "The checkbox is 'Hidden' in the SRS, so it cannot be checked from the UI. Also Pricing Rule is mandatory: if hidden, what is saved?"),
 A("Save with 'From External Ecomm platform' checked and no Pricing Rule", ["Check the checkbox (if available)", "Fill Coupon Name, Coupon Code and Coupon Type", "Click Save"], "Ecomm: checked", "The coupon is saved without a Pricing Rule", M, P, CLR + "Conflict between 'Pricing Rule mandatory' and 'Pricing Rule hidden when checked'."),
 # coupon type
 A("Coupon Type - dropdown values", "Open the Coupon Type dropdown", "-", "The values are: Promotional, Gift Card", H, P),
 A("Coupon Type - single selection", ["Select Promotional", "Select Gift Card"], "-", "Only the last selected value is kept", L, P),
 A("Coupon Type - empty", ["Leave Coupon Type empty", VALID, "Click Save"], "-", "An error message appears because the field is mandatory", H, N),
 A("Coupon Type - Promotional", ["Select Coupon Type = Promotional", VALID, "Click Save"], "Promotional", "The coupon is saved and the Customer field is not displayed", H, P),
 A("Coupon Type - Gift Card", ["Select Coupon Type = Gift Card", VALID, "Click Save"], "Gift Card", "The coupon is saved", H, P),
 A("Customer field appears only for Gift Card", ["Select Coupon Type = Gift Card"], "Gift Card", "The Customer field is displayed", H, P),
 A("Customer field is hidden for Promotional", ["Select Coupon Type = Promotional"], "Promotional", "The Customer field is not displayed", H, N),
 A("Customer value is cleared when switching from Gift Card to Promotional", ["Select Gift Card", "Select a Customer", "Switch Coupon Type to Promotional", "Switch back to Gift Card"], "Customer: Test Customer 1", "The Customer field is hidden for Promotional; the previous value is cleared (or kept) according to the BA rule", M, N, CLR + "SRS does not define what happens to a selected Customer when the type changes."),
 # customer
 A("Customer - optional for Gift Card", ["Select Gift Card", "Leave Customer empty", VALID, "Click Save"], "Gift Card, Customer: empty", "The coupon is saved without a customer", M, P),
 A("Customer - select a customer for Gift Card", ["Select Gift Card", "Select a Customer", VALID, "Click Save"], "Customer: Test Customer 1", "The coupon is saved and linked to the selected customer", H, P),
 A("Customer - searchable dropdown", ["Select Gift Card", "Open the Customer field", "Type part of a customer name"], "Test", "The list is filtered by the typed text", M, P),
 A("Customer - non-existing value is rejected", ["Select Gift Card", "Type a customer name that does not exist", "Click outside"], "Customer: Unknown XYZ", "No option is selectable and the value is not accepted", M, N),
 A("Customer - disabled customer", ["Select Gift Card", "Search for a disabled customer"], "Disabled customer", "The disabled customer is not offered (or an error appears)", L, N, CLR + "SRS does not say whether disabled customers can be selected."),
 # pricing rule
 A("Pricing Rule - searchable dropdown", ["Open the Pricing Rule field", "Type part of a pricing rule name"], "PRLE", "The list is filtered by the typed text", M, P),
 A("Pricing Rule - only Coupon Code Based rules are listed", "Open the Pricing Rule dropdown", "Rules with and without Coupon Code Based", "Only pricing rules with the Coupon Code Based option enabled are displayed", H, P),
 A("Pricing Rule - non Coupon Code Based rule is not selectable", ["Type the name of a rule that is not Coupon Code Based"], "PRLE-0002 (not coupon based)", "The rule is not offered in the list", H, N),
 A("Pricing Rule - empty", ["Leave Pricing Rule empty", VALID, "Click Save"], "-", "An error message appears because the field is mandatory", H, N),
 A("Pricing Rule - single selection", ["Select a pricing rule", "Select another one"], "-", "Only the last selected rule is kept", L, P),
 A("Pricing Rule - disabled rule", ["Open the Pricing Rule dropdown and look for a disabled rule"], "Disabled rule", "Behavior follows the BA rule (a disabled rule should not be selectable)", M, N, CLR + "SRS does not say whether disabled or expired pricing rules are listed."),
 A("Pricing Rule - already used by another coupon", ["Select a pricing rule that is used by another coupon", VALID, "Click Save"], "PRLE-0001 (used by SUMMER25)", "Behavior follows the BA rule (one rule to many coupons)", M, P, CLR + "SRS does not say whether a pricing rule can be linked to more than one coupon."),
 A("Pricing Rule - no Coupon Code Based rule exists", "Open the Pricing Rule dropdown in a system without coupon-based rules", "-", "An empty list / no-data message is displayed and the coupon cannot be saved", M, N),
 # valid from / to
 A("Valid From - select a date from the calendar", ["Click Valid From", "Pick a date"], "2026-12-01", "The picked date is displayed in the field", M, P),
 A("Valid From - optional", ["Leave Valid From empty", VALID, "Click Save"], "-", "The coupon is saved without an error", M, P),
 A("Valid To - select a date from the calendar", ["Click Valid To", "Pick a date"], "2026-12-31", "The picked date is displayed in the field", M, P),
 A("Valid To - optional", ["Leave Valid To empty", VALID, "Click Save"], "-", "The coupon is saved without an error", M, P),
 A("Valid To greater than Valid From", ["Enter Valid From", "Enter a later Valid To", VALID, "Click Save"], "From: 2026-12-01 / To: 2026-12-31", "The coupon is saved", H, P),
 A("Valid To earlier than Valid From", ["Enter Valid From = 2026-12-31", "Enter Valid To = 2026-12-01", VALID, "Click Save"], "From: 2026-12-31 / To: 2026-12-01", "An error message appears and the coupon is not saved", H, N, CLR + "SRS defines the rule but not the error message text or which field shows it."),
 A("Valid To equal to Valid From", ["Enter the same date in Valid From and Valid To", VALID, "Click Save"], "From = To = 2026-12-01", "Behavior follows the BA rule", H, N, CLR + "SRS says 'Valid To must be greater than Valid From': an equal date (one-day coupon) is not clear."),
 A("Only Valid To is entered", ["Leave Valid From empty", "Enter Valid To", VALID, "Click Save"], "To: 2026-12-31", "The coupon is saved (valid from creation until Valid To)", M, P),
 A("Only Valid From is entered", ["Enter Valid From", "Leave Valid To empty", VALID, "Click Save"], "From: 2026-12-01", "The coupon is saved (valid without an end date)", M, P),
 A("Valid From in the past", ["Select a past date in Valid From", VALID, "Click Save"], "From: 2025-01-01", "Behavior follows the BA rule (allowed or rejected)", M, P, CLR + "SRS does not say whether past dates are allowed."),
 A("Valid To in the past", ["Select a past date in Valid To", VALID, "Click Save"], "To: 2025-12-31", "Behavior follows the BA rule (allowed or rejected)", M, N, CLR + "SRS does not say whether an already expired coupon can be created."),
 A("Valid To is re-validated when Valid From is changed afterwards", ["Enter From 2026-12-01 and To 2026-12-31", "Change From to 2027-01-01", "Click Save"], "From: 2027-01-01 / To: 2026-12-31", "An error message appears and the coupon is not saved", M, N),
 A("Valid From - manually typed invalid date", ["Type an invalid date in Valid From"], "31/31/2026", "The value is rejected / an error message appears", L, N),
 # maximum use
 A("Maximum Use - valid number", ["Enter a number in Maximum Use", VALID, "Click Save"], "Max Use: 50", "The coupon is saved with Maximum Use 50", H, P),
 A("Maximum Use - optional", ["Leave Maximum Use empty", VALID, "Click Save"], "-", "The coupon is saved and has no usage limit", M, P, CLR + "SRS does not say what an empty Maximum Use means (unlimited expected)."),
 A("Maximum Use - single digit", ["Enter a single digit in Maximum Use", VALID, "Click Save"], "Max Use: 5", "The value 5 is accepted", H, P,
   CLR + "SRS states a minimum length of 2 characters, which would block the valid limits 1 to 9. Likely a template error."),
 A("Maximum Use - minimum length (2 digits)", ["Enter two digits", VALID, "Click Save"], "Max Use: 10", "The value is accepted", M, P),
 A("Maximum Use - letters are not accepted", "Type letters in Maximum Use", "Max Use: abc", "The letters are not entered (numbers only)", H, N),
 A("Maximum Use - special characters are not accepted", "Type special characters in Maximum Use", "Max Use: @#$", "The characters are not entered", M, N),
 A("Maximum Use - negative number", "Type a negative number in Maximum Use", "Max Use: -10", "The value is rejected (numbers only)", M, N),
 A("Maximum Use - decimal number", ["Enter a decimal number in Maximum Use", VALID, "Click Save"], "Max Use: 10.5", "The value is rejected or the dot is not accepted", M, N, CLR + "SRS says numbers only; decimals are not addressed."),
 A("Maximum Use - zero", ["Enter 00 in Maximum Use", VALID, "Click Save"], "Max Use: 00", "Behavior follows the BA rule (zero = unlimited or an error)", M, N, CLR + "SRS does not define zero (in ERPNext 0 means unlimited)."),
 A("Maximum Use - spaces", "Type spaces in Maximum Use", "Max Use: '  '", "The spaces are not accepted", L, N),
 A("Maximum Use - arabic-indic digits", "Type Arabic-indic digits in Maximum Use", "Max Use: ٥٠", "Behavior follows the BA rule (accepted and converted, or rejected)", L, N, CLR + "SRS does not define digit set."),
 A("Maximum Use - maximum length (100 digits)", "Enter 100 digits in Maximum Use", "100 digits", "The value is accepted by the field", L, P, CLR + "100 digits is not a realistic count; the SRS gives no numeric maximum (overflow risk)."),
 A("Maximum Use - input blocked beyond 100 characters", "Type 101 digits in Maximum Use", "101 digits", "Only the first 100 digits are accepted; further input is prevented", M, N),
 A("Maximum Use - very large value is saved", ["Enter a very large number (e.g. 20 digits)", VALID, "Click Save"], "Max Use: 99999999999999999999", "The coupon is saved or a clear validation error is shown (no server error)", M, N, CLR + "No numeric upper limit is defined."),
 A("Maximum Use - leading zeros", ["Enter 007", VALID, "Click Save"], "Max Use: 007", "The value is saved as 7", L, P),
 # used
 A("Used - displays zero on a new coupon", ["Add a new coupon", "Open it"], "-", "Used = 0", M, P),
 A("Used - cannot be edited", "Click the Used field", "-", "The field is read only and cannot be edited", M, N),
 # description
 A("Coupon Description - valid text", ["Enter a description", VALID, "Click Save"], "Description: Valid on all items in December", "The coupon is saved with the description", M, P),
 A("Coupon Description - optional", ["Leave Coupon Description empty", VALID, "Click Save"], "-", "The coupon is saved without an error", M, P),
 A("Coupon Description - minimum length (3 characters)", ["Enter 3 characters", VALID, "Click Save"], "Description: ABC", "The coupon is saved", M, P),
 A("Coupon Description - below minimum length (2 characters)", ["Enter 2 characters", VALID, "Click Save"], "Description: AB", "An error message appears because the text is shorter than 3 characters", H, N),
 A("Coupon Description - maximum length (500 characters)", ["Enter 500 characters", VALID, "Click Save"], "500 characters", "The description is accepted and saved", M, P),
 A("Coupon Description - input blocked beyond 500 characters", "Type or paste 501 characters", "501 characters", "Only the first 500 characters are accepted; further input is prevented", M, N),
 A("Coupon Description - letters, numbers and special characters", ["Enter a description with all three types", VALID, "Click Save"], "Use code SAVE-20 for 20% off (VIP only)!", "The description is accepted", L, P),
 A("Coupon Description - multi-line text", ["Enter a description with line breaks", VALID, "Click Save"], "Line 1 / Line 2", "The description is saved with line breaks", L, P),
 A("Coupon Description - invalid data error", ["Enter unsupported characters (e.g. only emojis)", VALID, "Click Save"], "Description: 😀😀😀", "To be confirmed: an error message for invalid data", L, N, CLR + "SRS says an error appears 'if invalid data is entered' while all characters are accepted. The invalid pattern is undefined."),
 A("Coupon Description - whitespace only", ["Enter spaces only", VALID, "Click Save"], "'     '", "An error message appears or the field is treated as empty", L, N),
 # save
 A("Save - multiple invalid fields show one error per field", ["Leave the form empty", "Click Save"], "-", "A validation error is displayed for each mandatory field (Coupon Name, Coupon Code, Coupon Type, Pricing Rule)", H, N),
 A("Save - the coupon is not created when validation fails", ["Click Save with invalid data", "Open the coupon list"], "-", "No new coupon is added to the list", H, N),
 A("Save - data is kept in the form after a validation error", ["Enter valid and invalid data", "Click Save"], "-", "The valid values remain in the form after the error is displayed", M, P),
 A("Save - double click does not create duplicates", ["Fill valid data", "Double click Save"], "Code: SUMMER25", "Only one coupon is created", M, N),
 A("Save - the saved data matches the entered data", ["Add a coupon with all fields", "Open its Details screen"], "All fields", "Every field shows the value that was entered", H, P),
 A("Save - the new coupon is displayed in the list", ["Add a valid coupon", "Open the list"], "-", "The coupon appears in the list with the correct type and Valid From", H, P),
 A("Leave the screen with unsaved data", ["Enter data in some fields", "Navigate to another screen"], "-", "A warning about unsaved changes is displayed (or the data is discarded)", L, N, CLR + "SRS does not define it."),
 A("Add a coupon with Customer in Gift Card then check the Details", ["Add a Gift Card coupon with a customer", "Open the Details"], "Customer: Test Customer 1", "Customer is displayed on the Details screen", M, P),
 A("Mandatory field messages are localized", ["Switch the language to Arabic", "Click Save on an empty form"], "-", "Messages are displayed in Arabic and no English text appears", L, U),
 A("Field labels are localized", ["Switch the language to Arabic", "Open the Add Coupon Code screen"], "-", "All labels are displayed in Arabic", L, U),
]

# =========================================================== DETAILS
D = mk("Access via Selling > Coupon Code > Coupon Code ID")
DET = [
 D("Open the Details screen", ["Click Selling", "Click Coupon Code", "Click a Coupon Code ID"], "SUMMER25", "The Coupon Code Details screen is displayed", H, P),
 D("Details display the data entered at creation", "Open the Details of a coupon added with all fields", "-", "All entered fields (name, code, type, customer, pricing rule, dates, maximum use, description) are displayed with the saved values", H, P),
 D("Details display Used", "Open the Details of a coupon used in a Sales Order", "Used: 2", "The Used field shows the number of times the coupon was redeemed", M, P),
 D("Fixed page actions are displayed", "Review the top of the Details screen", "-", "The actions are displayed: Add / Edit Coupon Conditions, Assign, Attachment, Tags, Share, Print, Delete", M, U),
 D("Fixed page actions stay visible when scrolling", ["Scroll down the Details screen"], "-", "The page actions remain fixed and visible at the top", L, U),
 # edit
 D("Edit Coupon Name", ["Change the Coupon Name", "Click Save"], "Name: Summer Sale 2026 V2", "The coupon is updated and the new name is displayed", H, P, CLR + "SRS does not name the Save button on the Details screen."),
 D("Edit Coupon Name below minimum length", ["Enter one character", "Click Save"], "Name: A", "An error message appears and the coupon is not updated", H, N),
 D("Edit Coupon Name - empty", ["Clear Coupon Name", "Click Save"], "-", "An error message appears because the field is mandatory", H, N),
 D("Edit Coupon Code to a unique value", ["Change the Coupon Code", "Click Save"], "Code: SUMMER26", "The coupon code is updated", M, P, CLR + "SRS does not say whether Coupon Code can be edited after creation (it is the redemption key)."),
 D("Edit Coupon Code to a duplicate value", ["Enter the code of another coupon", "Click Save"], "Code: BASIC10", "An error message appears because the code must be unique", H, N),
 D("Edit Coupon Code - empty", ["Clear Coupon Code", "Click Save"], "-", "An error message appears because the field is mandatory", H, N),
 D("Edit Coupon Type from Promotional to Gift Card", ["Change Coupon Type to Gift Card", "Click Save"], "Gift Card", "The Customer field appears and the coupon is updated", M, P),
 D("Edit Coupon Type from Gift Card to Promotional", ["Change Coupon Type to Promotional", "Click Save"], "Promotional", "The Customer field is hidden and the coupon is updated", M, P, CLR + "Impact on the existing Customer value is not defined."),
 D("Edit Customer on a Gift Card", ["Select another customer", "Click Save"], "Customer: Test Customer 2", "The customer is updated", M, P),
 D("Edit Pricing Rule", ["Select another Coupon Code Based rule", "Click Save"], "PRLE-0003", "The pricing rule is updated", H, P),
 D("Edit Pricing Rule - empty", ["Clear Pricing Rule", "Click Save"], "-", "An error message appears because the field is mandatory", H, N),
 D("Edit Valid From and Valid To", ["Change both dates", "Click Save"], "From: 2026-12-05 / To: 2027-01-05", "The dates are updated", M, P),
 D("Edit Valid To earlier than Valid From", ["Set Valid To before Valid From", "Click Save"], "From: 2026-12-31 / To: 2026-12-01", "An error message appears and the coupon is not updated", H, N),
 D("Clear Valid From and Valid To", ["Clear both dates", "Click Save"], "-", "The dates are removed and the coupon is updated", L, P),
 D("Edit Maximum Use to a valid number", ["Change Maximum Use", "Click Save"], "Max Use: 100", "The value is updated", M, P),
 D("Edit Maximum Use to less than Used", ["Open a coupon with Used = 5", "Set Maximum Use to 02", "Click Save"], "Used: 5 / Max Use: 02", "Behavior follows the BA rule (rejected or accepted)", M, N, CLR + "SRS does not define Maximum Use lower than the already Used count."),
 D("Edit Maximum Use - letters", "Type letters in Maximum Use", "Max Use: abc", "The letters are not accepted", M, N),
 D("Edit Coupon Description", ["Change the description", "Click Save"], "Description: Updated notes", "The description is updated", L, P),
 D("Edit Coupon Description below minimum length", ["Enter two characters", "Click Save"], "Description: AB", "An error message appears", M, N),
 D("Used field is read only on the Details screen", "Click the Used field", "-", "The field cannot be edited", M, N),
 D("Edit an expired coupon", ["Open a coupon whose Valid To is in the past", "Change the description", "Click Save"], "Expired coupon", "The coupon can be updated", L, P, CLR + "SRS does not restrict editing expired coupons."),
 D("Edit a coupon that has been used in a Sales Order", ["Open a used coupon", "Change Pricing Rule", "Click Save"], "Used coupon", "Behavior follows the BA rule (allowed or blocked)", M, N, CLR + "SRS does not say whether a used coupon can be modified."),
 D("Save without changes", ["Open a coupon", "Click Save without editing"], "-", "No error appears; the record is unchanged", L, P),
 D("Unsaved changes warning", ["Change a field", "Navigate away without saving"], "-", "A warning about unsaved changes is displayed (or the changes are discarded)", L, N, CLR + "SRS does not define it."),
 D("Saved changes persist after reload", ["Edit and save a field", "Reload the page"], "Name changed", "The updated value is displayed", H, P),
 D("Two users edit the same coupon", ["User A and User B open the same coupon", "User A saves a change", "User B saves another change"], "-", "User B gets a message that the document was modified (or the last change wins per the BA rule)", L, N, CLR + "Concurrent edit behavior is not defined."),
 # actions
 D("Add / Edit Coupon Conditions navigates to the Pricing Rule", ["Click Add / Edit Coupon Conditions"], "Pricing Rule: PRLE-0001", "The user is redirected to the Pricing Rule selected in the coupon", H, P),
 D("Add / Edit Coupon Conditions after changing the Pricing Rule (unsaved)", ["Change the Pricing Rule without saving", "Click Add / Edit Coupon Conditions"], "Unsaved PRLE-0003", "Behavior follows the BA rule (opens the saved or the newly selected rule)", L, N, CLR + "SRS does not define behavior with unsaved changes."),
 D("Assign the coupon to a user", ["Click Assign", "Select a user", "Confirm"], "User: Test QA User", "The coupon is assigned to the selected user", L, P),
 D("Add an attachment", ["Click Attachment", "Upload a file"], "terms.pdf", "The file is attached to the coupon", L, P),
 D("Add an attachment with an unsupported or large file", ["Click Attachment", "Upload a very large file"], "File > 25 MB", "An error message is displayed", L, N, CLR + "SRS defines no attachment limits."),
 D("Add a tag", ["Click Tags", "Enter a tag", "Confirm"], "Tag: Summer", "The tag is added", L, P),
 D("Share the coupon with a user", ["Click Share", "Select a user and permission", "Confirm"], "User: Test QA User / Read", "The coupon is shared with the user", L, P),
 D("Print the coupon", ["Click Print"], "-", "The print preview / print dialog is displayed", L, P),
 D("Delete confirmation message is displayed", ["Click Delete"], "-", "A confirmation message is displayed asking whether the user wants to delete this Coupon Code", H, P),
 D("Cancel the delete confirmation", ["Click Delete", "Choose to not confirm"], "-", "The coupon is not deleted and the Details screen stays open", M, N),
 D("Delete an unlinked coupon", ["Click Delete", "Click Yes"], "Unused coupon", "The coupon is deleted successfully", H, P, CLR + "SRS does not say where the user is redirected after deletion (list expected)."),
 D("Delete a coupon linked to other transactions", ["Open a coupon used in a Sales Order", "Click Delete", "Click Yes"], "Coupon used in SO-2026-00001", "A message states that the linked transactions must be deleted first and the coupon is not deleted", H, N),
 D("Linked doctypes in the warning message are hyperlinks", ["Trigger the linked-transactions warning", "Click a linked doctype link"], "Sales Order", "The user is redirected to the corresponding doctype", M, P),
 D("Deleted coupon cannot be opened again", ["Delete a coupon", "Open its URL"], "-", "A not-found / no-data message is displayed", L, N),
 D("Details screen with an invalid coupon ID in the URL", ["Open the Details URL with a random ID"], "COUPON-XXXX", "A not-found message is displayed without a server error", L, N),
 D("Details screen layout and labels", "Review the Details screen", "-", "All fields and labels are displayed correctly with no overlap or truncation", L, U),
 D("Details screen in Arabic (RTL)", ["Switch the language to Arabic", "Open the Details"], "-", "The layout is mirrored and all labels are translated", L, U),
]

# =========================================================== INTEGRATION
I = mk("A Coupon Code and a Coupon Code Based Pricing Rule exist")
INT = [
 I("Coupon appears as selectable on a Sales Order", ["Create a Sales Order", "Enter the coupon code"], "Code: SUMMER25", "The coupon is accepted and the linked pricing rule discount is applied", H, P, CLR + "SRS does not describe the redemption flow (where the code is entered, what is applied)."),
 I("Used is incremented after a Sales Order uses the coupon", ["Note Used on the coupon", "Create and submit a Sales Order with the coupon", "Open the coupon Details"], "Used: 0 -> 1", "Used is incremented by 1", H, P, CLR + "SRS says Used counts redemptions 'through Sales Order' but not at which point (Save or Submit)."),
 I("Used is decremented when the Sales Order is cancelled", ["Cancel the Sales Order that used the coupon", "Open the coupon Details"], "Used: 1 -> 0", "Used is decremented by 1", H, P, CLR + "Cancellation behavior is not defined."),
 I("Used is not incremented by a Draft Sales Order", ["Save a Sales Order with the coupon without submitting", "Open the coupon Details"], "Draft SO", "Used is unchanged", M, N, CLR + "Not defined in the SRS."),
 I("Coupon cannot be used after reaching Maximum Use", ["Set Maximum Use = 10 and Used = 10", "Create a Sales Order with the coupon"], "Max Use: 10 / Used: 10", "The coupon is rejected with an error message", H, N),
 I("Coupon can be used until Maximum Use is reached", ["Set Maximum Use = 10 and Used = 9", "Submit a Sales Order with the coupon"], "Used: 9 -> 10", "The Sales Order is accepted and Used becomes 10", H, P),
 I("Coupon without Maximum Use has no limit", ["Use a coupon with empty Maximum Use in several Sales Orders"], "Max Use: empty", "All Sales Orders are accepted", M, P, CLR + "Meaning of empty Maximum Use is not defined."),
 I("Coupon cannot be used before Valid From", ["Create a Sales Order before the coupon Valid From date"], "Valid From: tomorrow", "The coupon is rejected with an error message", H, N, CLR + "SRS defines the validity dates but not the redemption validation."),
 I("Coupon cannot be used after Valid To", ["Create a Sales Order after the coupon Valid To date"], "Valid To: yesterday", "The coupon is rejected with an error message", H, N),
 I("Coupon can be used on Valid From and Valid To dates", ["Create a Sales Order on the Valid From date", "Create a Sales Order on the Valid To date"], "Boundary dates", "Both Sales Orders are accepted (boundary inclusive)", M, P, CLR + "Boundary inclusiveness is not defined."),
 I("Gift Card coupon restricted to its customer", ["Create a Sales Order for a different customer using a Gift Card coupon linked to Test Customer 1"], "Customer mismatch", "The coupon is rejected", H, N, CLR + "SRS does not describe the effect of the optional Customer field."),
 I("Gift Card coupon with no customer can be used by any customer", ["Create Sales Orders for different customers with a Gift Card coupon without a Customer"], "Customer: empty", "The coupon is accepted", M, P, CLR + "Not defined."),
 I("Promotional coupon can be used by any customer", ["Create Sales Orders for different customers using a Promotional coupon"], "Promotional", "The coupon is accepted for every customer", M, P),
 I("Invalid coupon code in a Sales Order", ["Enter a coupon code that does not exist"], "Code: WRONG1", "An error message appears and no discount is applied", H, N),
 I("Pricing Rule discount is applied through the coupon", ["Use the coupon in a Sales Order with an eligible item"], "Pricing Rule: 10% discount", "The discount of the linked pricing rule is applied on eligible items", H, P),
 I("Coupon with a disabled Pricing Rule", ["Disable the linked Pricing Rule", "Use the coupon in a Sales Order"], "Disabled PRLE-0001", "The coupon is rejected or no discount is applied", M, N, CLR + "Not defined in the SRS."),
 I("Pricing Rule no longer Coupon Code Based", ["Disable the Coupon Code Based option on the linked Pricing Rule", "Open the coupon Details"], "PRLE-0001", "The coupon behavior follows the BA rule (still displayed, warning or invalid)", L, N, CLR + "Not defined in the SRS."),
 I("Add / Edit Coupon Conditions opens the same Pricing Rule", ["Open a coupon", "Click Add / Edit Coupon Conditions"], "PRLE-0001", "The Pricing Rule opened matches the one selected in the coupon", M, P),
 I("Delete a Sales Order then delete the coupon", ["Delete (or cancel and delete) the Sales Order linked to the coupon", "Delete the coupon"], "SO-2026-00001", "The coupon is deleted successfully once no linked transactions remain", M, P),
 I("Coupon from the external ecommerce platform", ["Create a coupon with 'From External Ecomm platform' = checked through the integration", "Open it"], "Ecomm = checked", "The coupon is displayed without a Pricing Rule", L, P, CLR + "Integration behavior is not described."),
 I("Used after multiple concurrent redemptions", ["Redeem the same coupon in two Sales Orders at the same time with Used = Maximum Use - 1"], "Max Use: 10 / Used: 9", "Only one redemption is accepted", L, N, CLR + "Concurrency is not defined."),
]

SECTIONS = [(S1, "CPL", LIST), (S2, "CPA", ADD), (S3, "CPD", DET), (S4, "CPI", INT)]

# =========================================================== BUILD
wb = Workbook()
ws = wb.active
ws.title = "Test Cases"
navy = "1F4E78"
thin = Side(style="thin", color="B7B7B7")
border = Border(left=thin, right=thin, top=thin, bottom=thin)
widths = dict(A=6, B=30, C=14, D=36, E=26, F=34, G=22, H=42, I=11, J=12, K=40)
for k, v in widths.items():
    ws.column_dimensions[k].width = v

ws["A1"] = "SHAMEL - Selling Module | Test Cases - Coupon Code"
ws["A1"].font = Font(name="Arial", size=16, bold=True, color=navy)
ws["A2"] = "Based on SRS v1.0 - SHAMEL Project (Selling Module - Coupon Code) "
ws["A2"].font = Font(name="Arial", size=10, color="595959")
ws.merge_cells("A1:K1")
ws.merge_cells("A2:K2")
ws.row_dimensions[1].height = 28
heads = ["#", "Module / Screen", "Test Case ID", "Test Case Title", "Preconditions", "Test Steps", "Test Data", "Expected Result", "Priority", "Type", "Remarks"]
for c, h in enumerate(heads, 1):
    cell = ws.cell(4, c, h)
    cell.font = Font(name="Arial", size=11, bold=True, color="FFFFFF")
    cell.fill = PatternFill("solid", fgColor=navy)
    cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    cell.border = border
ws.row_dimensions[4].height = 33.75

PRI = {"High": "FCE4E4", "Medium": "FFF4E5", "Low": "E8F5E9"}
TYP = {"Positive": "1E7E34", "Negative": "C0392B", "UI": "2E5EAA"}

row = 5
n = 0
counts = {}
for screen, prefix, cases in SECTIONS:
    counts[screen] = len(cases)
    for i, (title, pre, steps, data, exp, pri, typ, rem) in enumerate(cases, 1):
        n += 1
        if isinstance(steps, list):
            steps = "\n".join(f"{k}. {s}" for k, s in enumerate(steps, 1))
        vals = [n, screen, f"TC-{prefix}-{i:03d}", title, pre, steps, data, exp, pri, typ, rem]
        for c, v in enumerate(vals, 1):
            cell = ws.cell(row, c, v)
            cell.font = Font(name="Arial", size=10)
            cell.alignment = Alignment(vertical="center", wrap_text=True,
                                       horizontal="center" if c in (1, 3, 9, 10) else None)
            cell.border = border
        if i == 1:
            ws.cell(row, 2).font = Font(name="Arial", size=10, bold=True)
            ws.cell(row, 2).fill = PatternFill("solid", fgColor="D9E1F2")
        ws.cell(row, 9).fill = PatternFill("solid", fgColor=PRI[pri])
        ws.cell(row, 10).font = Font(name="Arial", size=10, bold=True, color=TYP[typ])
        lines = 1
        for c, v in enumerate(vals, 1):
            w = list(widths.values())[c - 1]
            t = str(v)
            est = sum(max(1, math.ceil(len(p) / (w * 1.05))) for p in t.split("\n"))
            lines = max(lines, est)
        ws.row_dimensions[row].height = max(30, 13.5 * lines + 4)
        row += 1
last = row - 1
ws.freeze_panes = "A5"
ws.auto_filter.ref = f"A4:K{last}"

sm = wb.create_sheet("Summary")
sm.column_dimensions["A"].width = 52
sm.column_dimensions["B"].width = 20
sm["A1"] = "Test Cases Summary"
sm["A1"].font = Font(name="Arial", size=16, bold=True)
r = 3
sm.cell(r, 1, "Module / Screen"); sm.cell(r, 2, "Number of Test Cases")
first = r + 1
for k, (screen, _, _) in enumerate(SECTIONS):
    sm.cell(first + k, 1, screen)
    sm.cell(first + k, 2, f"=COUNTIF('Test Cases'!$B$5:$B${last},A{first + k})")
tot = first + len(SECTIONS)
sm.cell(tot, 1, "Total"); sm.cell(tot, 2, f"=SUM(B{first}:B{tot - 1})")
r = tot + 3
blocks = [("By Type", "J", ["Positive", "Negative", "UI"]), ("By Priority", "I", ["High", "Medium", "Low"])]
for label, col, items in blocks:
    sm.cell(r, 1, label); sm.cell(r, 2, "Count")
    for k, it in enumerate(items, 1):
        sm.cell(r + k, 1, it)
        sm.cell(r + k, 2, f"=COUNTIF('Test Cases'!${col}$5:${col}${last},A{r + k})")
    r += len(items) + 2
sm.cell(r, 1, "Clarification"); sm.cell(r, 2, "Count")
sm.cell(r + 1, 1, "Needs Clarification (see Remarks)")
sm.cell(r + 1, 2, f"=COUNTIF('Test Cases'!$K$5:$K${last},\"Needs Clarification*\")")
for rr in range(3, r + 2):
    for cc in (1, 2):
        cell = sm.cell(rr, cc)
        hdr = cell.value in ("Module / Screen", "Number of Test Cases", "By Type", "By Priority", "Clarification", "Count")
        cell.font = Font(name="Arial", size=10, bold=hdr or cell.value == "Total", color=navy if hdr else None)
wb.save(OUT)
clar = sum(1 for _, _, cs in SECTIONS for c in cs if c[7].startswith("Needs"))
print("saved", OUT, "total", n, "clarifications", clar, counts)
