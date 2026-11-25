"""Append hand-built test cases for the Accounting module / Account doctype to SRS-Accounting-Account.md.
Source: SRS-Azzrk-Shamel-Accounting-FULL-V.1.0.pdf pages 3-13 (use cases 1-3).
Run after: python build_srs_md.py --pdf SRS-Azzrk-Shamel-Accounting-FULL-V.1.0.pdf --first 3 --last 13 --auto-uc --out SRS-Accounting-Account.md --title "..."
Colours in these pages: RED only (Account Category, Tax Rate, Merge Accounts). No yellow highlight exists on pages 3-13."""
MD = 'SRS-Accounting-Account.md'
MARK = '<!-- TEST CASES -->'
NL = chr(10)
txt = open(MD, encoding='utf-8').read().split(MARK)[0].rstrip() + NL + NL

UC = {1: 'Account List', 2: 'Add Account', 3: 'Account Details'}
C = []
seq = {}


def a(uc, page, field, scn, exp, pri='Medium', typ='Functional'):
    seq[uc] = seq.get(uc, 0) + 1
    C.append(dict(id='ACCT-%d-%03d' % (uc, seq[uc]), uc=uc, page=page, field=field, scn=scn, exp=exp, pri=pri, typ=typ))


# ============================================================ USE CASE 1 - LIST (pages 3-4)
L = 'Account List'
a(1, 3, L, 'Click Accounting then Account in the sidebar', 'Account List opens', 'High')
a(1, 3, 'Add Account button', 'Click Add Account', 'Redirected to the Add Account screen', 'High')
a(1, 3, L + ' columns', 'Open the list', 'Table has: checkbox, ID, Status, Account name, Account Number, in this order', 'High')
a(1, 3, 'Checkbox column', 'Tick one row, tick several rows, tick the header', 'Multi selection works; header selects all rows of the page; action bar appears when at least one row is selected', 'High')
a(1, 3, 'ID', 'Click an Account ID', 'Navigates to the Account Details screen of that account', 'High')
a(1, 3, 'Status', 'Compare enabled and disabled accounts', 'Status shows only Enabled or Disabled', 'High')
a(1, 3, 'Status', 'Disable an account (details screen) then reopen the list', 'Its Status becomes Disabled; enabling it returns Enabled', 'High', 'Integration')
a(1, 3, 'Account name', 'Compare list value with the details screen', 'Same name', 'Medium', 'Consistency')
a(1, 3, 'Account Number', 'Account without a number', 'Number column is empty without error', 'Low')
a(1, 3, 'Account Number', 'Compare list value with the details screen', 'Same number', 'Medium', 'Consistency')
a(1, 3, 'Action bar', 'Select a row', 'Action bar shows Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete', 'High')
a(1, 3, 'Action bar', 'Untick the last selected row', 'Action bar disappears', 'Medium')
a(1, 3, 'Edit', 'Click Edit with one or more rows selected', 'Pop-up opens with Field and Value', 'High')
a(1, 4, 'Edit - Field', 'Open the Field list', 'Single-selection list of fields of the Account doctype', 'High')
a(1, 4, 'Edit - Field', 'Leave Field empty and confirm', 'Error: Field is mandatory; nothing changed', 'High', 'Negative')
a(1, 4, 'Edit - Value', 'Select different fields one after another (text, checkbox, DDL, link)', 'Value input changes type to match the field (text / checkbox / dropdown / searchable list)', 'High')
a(1, 4, 'Edit - Value', 'Select a mandatory field then leave Value empty', 'Value is marked mandatory and an error appears', 'High', 'Negative')
a(1, 4, 'Edit - Value', 'Select an optional field then leave Value empty', 'Value is marked optional and accepted', 'Medium')
a(1, 4, 'Edit - Value', 'Enter an invalid value for the chosen field (too short Account name, letters in Account Number)', 'The validation rules of that field apply and an error appears', 'High', 'Negative')
a(1, 4, 'Edit', 'Edit one field for several selected accounts', 'All selected accounts receive the value (or are rejected per rule with a message)', 'High')
a(1, 4, 'Edit', 'SRS gap: the Edit pop-up has no confirm / Update button described', 'Ask BA how the pop-up is submitted and what message is shown', 'Low', 'SRS-gap')
a(1, 4, 'Export', 'Select rows and click Export', 'File is generated with the selected accounts and the list columns', 'Medium')
a(1, 4, 'Assign to', 'Select a row, Assign to a user', 'Assignment saved and visible; user is notified per system rules', 'Medium')
a(1, 4, 'Clear assignment', 'Clear the assignment of an assigned row', 'Assignment removed', 'Medium')
a(1, 4, 'Add tags', 'Add a tag to a row', 'Tag saved and shown', 'Low')
a(1, 4, 'Print', 'Print a selected account', 'Print preview opens with the account data', 'Low')
a(1, 4, 'Delete', 'Click Delete', 'Confirmation message asks whether to delete this Account', 'High')
a(1, 4, 'Delete', 'Confirm Yes on an account not linked to any document', 'Account deleted successfully and removed from the list', 'High')
a(1, 4, 'Delete', 'Confirm Yes on an account linked to transactions (GL entries, Payment Entry, Journal Entry, child accounts)', 'Message that linked transactions must be deleted first; linked doctypes shown as hyperlinks that open the corresponding doctype', 'High', 'Negative')
a(1, 4, 'Delete', 'Click Delete then No / close', 'Nothing deleted', 'Medium', 'Negative')
a(1, 4, 'Delete', 'Delete a Group account that has child accounts', 'Not deleted; message lists the children (children are linked records)', 'High', 'Negative')
a(1, 4, 'Delete', 'Delete several selected accounts, one of them linked', 'Behaviour per account is explained (linked one blocked); SRS does not define bulk delete result - note as gap', 'Medium', 'SRS-gap')
a(1, 4, 'Post condition', 'After delete / edit', 'List refreshes with the latest data', 'Medium')
a(1, 3, 'Permissions', 'User without read / write / delete permission on Account', 'Menu, buttons and actions respect permissions; server rejects direct calls', 'High', 'Security')

# ============================================================ USE CASE 2 - ADD (pages 5-9)


def text_field(page, name, mand, minl, maxl, kind):
    f = name
    if mand:
        a(2, page, f, 'Leave empty and Save', 'Error message for %s; Account not saved' % f, 'High', 'Negative')
    else:
        a(2, page, f, 'Leave empty and Save', 'Saved without error (optional)', 'Medium')
    a(2, page, f, 'Enter %d character(s) (min-1) and Save' % (minl - 1), 'Error message: shorter than the minimum length (%d)' % minl, 'High', 'Boundary')
    a(2, page, f, 'Enter exactly %d characters and Save' % minl, 'Accepted', 'High', 'Boundary')
    a(2, page, f, 'Enter exactly %d characters and Save' % maxl, 'Accepted and saved in full', 'High', 'Boundary')
    a(2, page, f, 'Type or paste %d characters' % (maxl + 1), 'Input stops at %d characters (further input prevented)' % maxl, 'High', 'Boundary')
    if kind == 'any':
        a(2, page, f, 'Enter letters, numbers and special characters (Cash-01 / #A_9)', 'Accepted and saved exactly', 'High')
        a(2, page, f, 'Enter Arabic text', 'Accepted and saved (RTL kept)', 'Medium')
        a(2, page, f, 'Enter leading / trailing spaces', 'Trimmed or rejected consistently; not saved with invisible edges', 'Low', 'Boundary')
        a(2, page, f, 'Enter only spaces (2+) and Save', 'Rejected as empty / invalid', 'Medium', 'Negative')
        a(2, page, f, 'Enter an HTML / script string', 'Saved as plain text, no script runs', 'Medium', 'Security')
    else:
        a(2, page, f, 'Enter digits and special characters (1001-01, 10/5)', 'Accepted and saved exactly', 'High')
        a(2, page, f, 'Enter letters (ABC12)', 'Rejected (letters are not accepted: numbers and special characters only)', 'High', 'Negative')
        a(2, page, f, 'Enter Arabic letters', 'Rejected', 'Medium', 'Negative')


A = 'Account name'
text_field(5, A, True, 2, 100, 'any')
a(2, 5, A, 'Create two accounts with the same name in the same company / under the same parent', 'Behaviour per system rule (duplicate name in same parent is not allowed in the standard behaviour); SRS does not say - flag as gap', 'Medium', 'SRS-gap')
a(2, 5, A, 'Save an account whose name equals an existing account name in another company', 'Allowed (names are unique per company)', 'Low')

N = 'Account Number'
text_field(5, N, False, 2, 100, 'num')
a(2, 5, N, 'Save two accounts with the same Account Number', 'Error: Account Number must be unique; second account not saved', 'High', 'Negative')
a(2, 5, N, 'Save the same number in a different company', 'Unique per company in standard behaviour; confirm with BA (SRS only says "unique")', 'Medium', 'SRS-gap')
a(2, 5, N, 'Number with 2 digits + dash + 2 digits', 'Account ID / display shows number and name together as the system format', 'Low')

G = 'Is Group'
a(2, 5, G, 'Open Add Account', 'Checkbox is optional and unchecked by default', 'High', 'Default')
a(2, 5, G, 'Tick Is Group on a new account', 'Currency field is hidden (group account)', 'High', 'Conditional')
a(2, 5, G, 'Untick Is Group on a new account', 'Currency field is displayed', 'High', 'Conditional')
a(2, 5, G, 'Save a Group account', 'Saved; appears in Parent Account list for other accounts; General Ledger action not shown on its details', 'High')
a(2, 5, G, 'Convert a saved non-group account (no Account Type, no transactions) to Group', 'Converted successfully; Currency becomes hidden', 'High')
a(2, 5, G, 'Convert a non-group account that has an Account Type to Group', 'Prevented with an appropriate error message', 'High', 'Negative')
a(2, 5, G, 'Convert a non-group account that has transactions to Group', 'Prevented with an appropriate error message', 'High', 'Negative')
a(2, 6, G, 'Convert a non-group account with Account Type = Empty and no transactions', 'Allowed (both validations satisfied)', 'High')
a(2, 6, G, 'Convert a Group account with no children to non-group', 'Converted successfully; Currency field is displayed', 'High')
a(2, 6, G, 'Convert a Group account that has one child to non-group', 'Prevented with an appropriate error message', 'High', 'Negative')
a(2, 6, G, 'Convert a Group account with several children to non-group', 'Prevented with an appropriate error message', 'Medium', 'Negative')
a(2, 6, G, 'Delete the only child, then convert the Group to non-group', 'Conversion now allowed', 'Medium')
a(2, 6, G, 'Convert Group to non-group and back', 'State persists after reload; Currency visibility follows', 'Medium')
a(2, 6, G, 'Error text for the blocked conversions', 'Message is clear and says why (Account Type set / transactions exist / children exist)', 'Medium', 'Usability')

CO = 'Company'
a(2, 6, CO, 'Open the list and type part of a company', 'Searchable DDL filters while typing; select fills the field', 'High')
a(2, 6, CO, 'Leave Company empty and Save', 'Error message for Company; not saved', 'High', 'Negative')
a(2, 6, CO, 'Select a company, Save, reopen the account', 'Company is read-only after save (cannot be edited)', 'High', 'Conditional')
a(2, 6, CO, 'Try to edit Company on an existing account through list Edit pop-up / API', 'Rejected: Company editable only during creation', 'High', 'Negative')
a(2, 6, CO, 'Type text with no match', 'No result; no value set', 'Low', 'Negative')
a(2, 6, CO, 'Change Company on the Add screen after choosing a Parent Account', 'Parent Account is cleared / re-validated because it belongs to the old company', 'High', 'Integration')
a(2, 6, CO, 'Select a company', 'Parent Account list shows only group accounts of that company', 'High', 'Filter')

RT = 'Root type'
a(2, 6, RT, 'View the field', 'Label (read only) showing Asset / Liability / Income / Expense / Equity', 'High')
for p, rt in [('an Asset', 'Asset'), ('a Liability', 'Liability'), ('an Income', 'Income'), ('an Expense', 'Expense'), ('an Equity', 'Equity')]:
    a(2, 6, RT, 'Select a Parent Account whose root is ' + p.split()[1], 'Root type = ' + rt + ' (fetched from the Parent Account)', 'High', 'Integration')
a(2, 6, RT, 'Change the Parent Account to one under another root', 'Root type updates accordingly', 'High', 'Integration')
a(2, 6, RT, 'No Parent Account selected', 'SRS: editable only when there is no Parent Account. But Parent Account is mandatory - contradiction; ask BA when this can happen (creating root accounts?)', 'High', 'SRS-gap')

RP = 'Report type'
a(2, 6, RP, 'View the field', 'Label (read only): Balance Sheet or Profit and Loss', 'High')
a(2, 7, RP, 'Parent under Assets / Liabilities / Equity', 'Report type = Balance Sheet', 'High', 'Integration')
a(2, 7, RP, 'Parent under Income / Expenses', 'Report type = Profit and Loss', 'High', 'Integration')
a(2, 7, RP, 'Try to edit', 'Not editable', 'Medium', 'Negative')

CU = 'Currency'
a(2, 7, CU, 'Open the list', 'Searchable DDL of currencies; single selection; optional', 'High')
a(2, 7, CU, 'Leave empty and Save', 'Saved without error (optional); company currency used by default behaviour - confirm', 'Medium')
a(2, 7, CU, 'Non-group account: view field', 'Currency is displayed', 'High', 'Conditional')
a(2, 7, CU, 'Group account: view field', 'Currency is hidden', 'High', 'Conditional')
a(2, 7, CU, 'After save, change the currency of an account with transactions in another currency', 'Error exactly: "Currency cannot be changed after making entries using some other currency."', 'High', 'Negative')
a(2, 7, CU, 'After save, change the currency of an account with no transactions', 'Change allowed and saved successfully', 'High')
a(2, 7, CU, 'After save, change the currency of an account with transactions only in the same (company) currency', 'Per SRS check "transactions in another currency" - allowed; confirm', 'Medium', 'SRS-gap')
a(2, 7, CU, 'Type text with no match', 'No result', 'Low', 'Negative')

PA = 'Parent Account'
a(2, 7, PA, 'Open the list', 'Only accounts with Is Group enabled are offered (of the selected company)', 'High', 'Filter')
a(2, 7, PA, 'Check that a non-group account is not offered', 'Not in the list', 'High', 'Filter')
a(2, 7, PA, 'Leave empty and Save', 'Error message for Parent Account; not saved', 'High', 'Negative')
a(2, 7, PA, 'Select a parent, Save', 'Account appears under that parent in the Chart of Accounts tree', 'High', 'Integration')
a(2, 7, PA, 'Search by name and by number', 'Both find the account (number + name displayed)', 'Medium')
a(2, 7, PA, 'Select a disabled group account as parent', 'Behaviour per rule (disabled accounts not selectable in new transactions - check whether also as parent); flag if SRS silent', 'Low', 'SRS-gap')
a(2, 7, PA, 'Edit parent after save (move account)', 'Account moves under the new parent; Root type / Report type refreshed; descendants follow', 'Medium', 'Integration')
a(2, 7, PA, 'Choose the account itself or one of its own children as parent', 'Rejected (circular tree)', 'Medium', 'Negative')

AC = 'Account Category (hidden)'
a(2, 7, AC, 'Open the Add and Details screens', 'Account Category field is NOT displayed anywhere (red in SRS)', 'High', 'Negative')

AT = 'Account Type'
a(2, 7, AT, 'Open the list', 'Single-selection DDL; optional', 'High')
types = ['Empty', 'Accumulated Depreciation', 'Asset Received But Not Billed', 'Bank', 'Cash', 'Chargeable', 'Capital Work in Progress',
         'Cost of Goods Sold', 'Current Asset', 'Current Liability', 'Depreciation', 'Direct Expense', 'Direct Income', 'Equity',
         'Expense Account', 'Expenses Included In Asset Valuation', 'Expenses Included In Valuation', 'Fixed Asset', 'Income Account',
         'Indirect Expense', 'Indirect Income', 'Liability', 'Payable', 'Receivable', 'Round Off', 'Round Off for Opening', 'Stock',
         'Stock Adjustment', 'Stock Received But Not Billed', 'Service Received But Not Billed', 'Tax', 'Temporary']
a(2, 8, AT, 'Compare the list with the SRS', 'Exactly these %d values in this order: %s' % (len(types), ', '.join(types)), 'High', 'Content')
a(2, 8, AT, 'Leave on Empty and Save', 'Saved; Account Type empty', 'Medium')
for t in ['Bank', 'Cash', 'Receivable', 'Payable', 'Stock', 'Tax']:
    a(2, 8, AT, 'Create an account with type ' + t, 'Saved; the account is offered where the type is required (e.g. Bank / Cash in payments, Receivable in invoices)', 'Medium', 'Integration')
a(2, 8, AT, 'Select any Account Type on a Group account', 'SRS: converting to Group needs Account Type empty - check the type on a group is blocked or cleared', 'High', 'Negative')
a(2, 8, AT, 'Change the type of an account that has transactions', 'Behaviour per rule; error if not allowed (not stated in SRS)', 'Medium', 'SRS-gap')

FR = 'Frozen'
a(2, 8, FR, 'Open Add Account', 'Frozen is NOT displayed before the first save', 'High', 'Conditional')
a(2, 8, FR, 'Save the account then reopen it', 'Frozen DDL appears with Yes / No; optional', 'High', 'Conditional')
a(2, 8, FR, 'Set Frozen = Yes and create a transaction with a normal user', 'Account cannot be selected / posted in transactions', 'High', 'Integration')
a(2, 8, FR, 'Set Frozen = Yes and post with the role "Roles Allowed to Set and Edit Frozen Account Entries" (company setting)', 'Posting is allowed for that role', 'High', 'Integration')
a(2, 8, FR, 'Set Frozen = No', 'Account selectable again', 'Medium')

TX = 'Tax Rate (hidden)'
a(2, 8, TX, 'Open the Add and Details screens', 'Tax Rate field is NOT displayed anywhere (red in SRS)', 'High', 'Negative')

BM = 'Balance must be'
a(2, 9, BM, 'Open the list', 'Values: Empty, Debit, Credit; single selection; optional', 'High', 'Content')
a(2, 9, BM, 'Set Debit then post an entry that makes the balance credit', 'Posting rejected with an error', 'High', 'Integration')
a(2, 9, BM, 'Set Credit then post an entry that makes the balance debit', 'Posting rejected with an error', 'High', 'Integration')
a(2, 9, BM, 'Set Debit and post entries that keep the balance debit', 'Accepted', 'High', 'Integration')
a(2, 9, BM, 'Set Empty and post entries that give either debit or credit balance', 'Both accepted', 'High', 'Integration')
a(2, 9, BM, 'Set Debit on an account that already has a credit balance', 'Behaviour per rule (error or accepted); not defined in SRS', 'Medium', 'SRS-gap')

SV = 'Save'
a(2, 9, SV, 'Fill Account name, Company, Parent Account and click Save', 'Account saved and added to the Accounts List; success message', 'High')
a(2, 9, SV, 'Fill every field of the screen and Save', 'All values persisted when reopened', 'High')
a(2, 9, SV, 'Save with missing / invalid data in several fields', 'Validation error for each invalid field, shown next to the field', 'High', 'Negative')
a(2, 9, SV, 'Save, then check the Chart of Accounts tree', 'The new account appears under the parent with name and number', 'High', 'Integration')
a(2, 9, SV, 'Double-click Save quickly', 'Only one account created', 'Medium', 'Negative')
a(2, 9, SV, 'Leave the screen with unsaved data', 'Unsaved-changes warning or data discarded per system behaviour', 'Low')
a(2, 9, 'Add Account', 'Check the screen against the SRS field list', 'Fields shown: Account name, Account Number, Is Group, Company, Root type, Report type, Currency, Parent Account, Account Type, Frozen (after save), Balance must be; hidden: Account Category, Tax Rate', 'High', 'Consistency')
a(2, 5, 'Localization', 'Switch UI between Arabic and English', 'Labels and messages localized; RTL layout in Arabic', 'Medium')

# ============================================================ USE CASE 3 - DETAILS (pages 10-12)
D = 'Account Details'
a(3, 10, D, 'Click an Account ID in the list', 'Details opens with all data entered at creation', 'High')
a(3, 10, D, 'Compare every field with the list / creation values', 'Same values', 'High', 'Consistency')
a(3, 10, D, 'Edit a field (e.g. Balance must be) and save', 'Saved: "Account data has been successfully modified and saved"', 'High')
a(3, 10, D, 'Enter incorrect or incomplete data and save', 'Validation error for each invalid field', 'High', 'Negative')
a(3, 10, D, 'Company field on details', 'Read-only', 'High', 'Negative')
a(3, 10, D, 'Frozen on details', 'Visible and editable (appears after saving)', 'High', 'Conditional')

DI = 'Disabled'
a(3, 10, DI, 'View the checkbox', 'Checkbox shown, unchecked for enabled accounts', 'High')
a(3, 10, DI, 'Tick Disabled and save', 'Status changes to Disabled in details and list', 'High')
a(3, 10, DI, 'Create a new transaction (invoice, payment, journal entry) and look for the disabled account', 'Disabled account cannot be selected in new transactions', 'High', 'Integration')
a(3, 10, DI, 'Open historical documents / General Ledger that used the account', 'Account still shown in historical records', 'High', 'Integration')
a(3, 10, DI, 'Untick Disabled and save', 'Status Enabled; selectable again', 'High')
a(3, 10, DI, 'Disable a Group account that has enabled children', 'Behaviour per rule (not defined in SRS)', 'Medium', 'SRS-gap')

VW = 'View menu'
a(3, 10, VW, 'Open View', 'Contains General Ledger and Chart of Accounts', 'High')
a(3, 10, 'General Ledger', 'Open a non-group account and open View', 'General Ledger action is displayed', 'High', 'Conditional')
a(3, 10, 'General Ledger', 'Open a Group account and open View', 'General Ledger action is NOT displayed', 'High', 'Conditional')
a(3, 10, 'General Ledger', 'Click General Ledger', 'Navigates to the General Ledger screen filtered on this account', 'High', 'Integration')
a(3, 10, 'Chart of Accounts', 'Click Chart of Accounts', 'Navigates to the hierarchical tree of all parent and child accounts', 'High', 'Integration')
a(3, 11, 'Chart of Accounts', 'Check the tree after navigation', 'The account opened in the details screen is highlighted and visible (tree expanded to it)', 'High', 'Integration')

AM = 'Actions menu'
a(3, 11, AM, 'Open Actions', 'Contains: Update Account Name and Number, Assign, Attachment, Tags, Share, Print, Delete (no Merge Accounts)', 'High')
a(3, 11, 'Merge Accounts (hidden)', 'Open Actions and look for Merge Accounts', 'Not displayed (red in SRS); no merge pop-up reachable', 'High', 'Negative')
a(3, 11, 'Merge Accounts (hidden)', 'Check API / URL access to merge', 'Not exposed from the UI (confirm with DEV whether the server method must stay)', 'Low', 'SRS-gap')

UN = 'Update Account Name and Number'
a(3, 11, UN, 'Click Update Account Name and Number', 'Pop-up with Account name and Account Number prefilled with the current values and an Update button', 'High')
text_field_rows = [
    (3, 11, UN + ' - Account name', 'Clear the name and click Update', 'Error: Account name mandatory; not updated', 'High', 'Negative'),
    (3, 11, UN + ' - Account name', 'Enter 1 character and Update', 'Error: shorter than the minimum length (2)', 'High', 'Boundary'),
    (3, 11, UN + ' - Account name', 'Enter 2 characters and Update', 'Updated', 'High', 'Boundary'),
    (3, 11, UN + ' - Account name', 'Enter 100 characters and Update', 'Updated in full', 'High', 'Boundary'),
    (3, 11, UN + ' - Account name', 'Type / paste 101 characters', 'Input stops at 100', 'High', 'Boundary'),
    (3, 11, UN + ' - Account name', 'Enter letters, numbers and special characters', 'Accepted', 'Medium'),
    (3, 12, UN + ' - Account Number', 'Clear the number and Update', 'Updated; number removed (optional)', 'Medium'),
    (3, 12, UN + ' - Account Number', 'Enter 1 character and Update', 'Error: shorter than the minimum length (2)', 'High', 'Boundary'),
    (3, 12, UN + ' - Account Number', 'Enter 2 digits and Update', 'Updated', 'High', 'Boundary'),
    (3, 12, UN + ' - Account Number', 'Enter 100 characters and Update', 'Updated in full', 'High', 'Boundary'),
    (3, 12, UN + ' - Account Number', 'Type / paste 101 characters', 'Input stops at 100', 'High', 'Boundary'),
    (3, 12, UN + ' - Account Number', 'Enter letters', 'Rejected (numbers and special characters only)', 'High', 'Negative'),
    (3, 12, UN + ' - Account Number', 'Enter a number used by another account', 'Error: Account Number must be unique', 'High', 'Negative'),
    (3, 12, UN + ' - Account Number', 'Keep the same number and change only the name', 'Updated; no false duplicate error against itself', 'High', 'Negative'),
    (3, 12, 'Update button', 'Enter valid name and number and click Update', 'Success: Account name / number updated and shown in details, list and tree', 'High', 'Functional'),
    (3, 12, 'Update button', 'Enter invalid data and click Update', 'Validation error for each invalid field; nothing changed', 'High', 'Negative'),
    (3, 12, 'Update button', 'Rename an account that has transactions', 'Renamed; transactions, General Ledger and reports show the new name / ID consistently', 'High', 'Integration'),
    (3, 12, 'Update button', 'Cancel / close the pop-up without Update', 'No change', 'Medium', 'Negative'),
]
for r in text_field_rows:
    a(*r)
for f in ['Assign', 'Attachment', 'Tags', 'Share', 'Print']:
    a(3, 12, f, 'Use ' + f + ' from Actions', f + ' works and the result is saved / shown on the details screen', 'Medium')
a(3, 12, 'Delete', 'Click Delete on an unlinked account and confirm', 'Confirmation first; then deleted successfully and user returns to the list', 'High')
a(3, 12, 'Delete', 'Delete a linked account and confirm', 'Message: linked transactions must be deleted first; linked doctypes as hyperlinks that open them', 'High', 'Negative')
a(3, 12, 'Delete', 'Click Delete then No', 'Nothing deleted', 'Medium', 'Negative')
a(3, 12, 'Delete', 'Delete an account that has child accounts', 'Blocked; children shown as links', 'High', 'Negative')
a(3, 12, 'Post condition', 'Edit and Save, then reopen', 'Account data successfully modified and saved', 'High')
a(3, 10, 'Permissions', 'Open details with read-only permission', 'Fields read-only; no Save / Delete / Update Name actions', 'High', 'Security')

# ============================================================ cross-use-case scenarios
S = [
    (2, 9, 'End to end', 'Create a Group account, then a child under it, then post a Journal Entry on the child, then open General Ledger', 'Tree shows the hierarchy; GL shows the entry on the child; Group has no General Ledger action', 'High', 'Flow'),
    (2, 9, 'End to end', 'Create an account, disable it, try to use it in a new Journal Entry', 'Not selectable', 'High', 'Flow'),
    (2, 9, 'End to end', 'Create a Bank account with Currency USD; post an EUR transaction; try to change currency', 'Blocked with the exact SRS message', 'High', 'Flow'),
    (3, 12, 'End to end', 'Rename an account then search by the new name in a Parent Account list', 'Found by new name / number; old name no longer found', 'Medium', 'Flow'),
    (1, 4, 'Consistency', 'Create, edit and delete an account in sequence', 'List, tree and details stay consistent after each step', 'High', 'Flow'),
]
for uc, p, f, s, e, pr, t in S:
    a(uc, p, f, s, e, pr, t)

out = [txt, MARK + NL + NL, '# Generated test cases - Accounting module / Account (use cases 1-3)' + NL + NL,
       '> %d cases. IDs `ACCT-<use case>-<seq>`. Source: SRS pages 3-13. Highlights in these pages: RED = hidden (Account Category, Tax Rate, Merge Accounts: each has a negative case). No YELLOW highlight exists in this part of the SRS, so there are no "focus" cases. Types: Functional, Boundary, Negative, Conditional, Integration, Filter, Default, Content, Consistency, Security, Flow, SRS-gap (needs BA answer).' % len(C) + NL + NL]
for uc in (1, 2, 3):
    sub = [c for c in C if c['uc'] == uc]
    out.append('## Use case %d - %s (%d cases)' % (uc, UC[uc], len(sub)) + NL + NL)
    out.append('| ID | Page | Field / feature | Scenario | Expected | Pri | Type | Spec |' + NL + '|---|---|---|---|---|---|---|---|' + NL)
    for c in sub:
        esc = lambda s: s.replace('|', '/').replace(NL, ' ')
        out.append('| %s | %d | %s | %s | %s | %s | %s |  |' % (c['id'], c['page'], esc(c['field']), esc(c['scn']), esc(c['exp']), c['pri'], c['typ']) + NL)
    out.append(NL)
open(MD, 'w', encoding='utf-8').write(''.join(out))
print(len(C), {k: len([c for c in C if c['uc'] == k]) for k in UC})
