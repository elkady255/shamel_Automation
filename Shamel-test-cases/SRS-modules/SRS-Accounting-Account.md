# SRS Azzrk SHAMEL - Accounting module V1.0 - Part: Account (Chart of Accounts doctype)

> Extract of `SRS-Azzrk-Shamel-Accounting-V.1.0.pdf` (PDF pages 3-13). The PDF is the source of truth.

## How to use this file for test cases

- Every bullet is one testable statement. Nesting = the SRS bullet level. `<!-- page N -->` = PDF page. A bold line = field name (table-row label) or heading.
- **[HIDDEN]** = red highlight in the PDF: the field/button must NOT be shown. Write a negative test (absent in the UI).
- **[YELLOW]** = yellow highlight (new/changed in this version). **[CYAN]** = cyan highlight (changed rule).
- Case patterns: Mandatory -> empty-save error; Min/Max length -> boundary (min-1, min, max, max+1); "numbers only" -> letters/specials rejected; read-only/label -> not editable; "displayed only when X" -> visible/hidden toggle; "fetched from X" -> auto-fill after selecting X; formulas (Net Amount = Net Rate * Qty, Shortage = Qty - Available, Total Weight = Weight/Unit * Qty, Paid/Credit/Refund Amount) -> value check; each Case/Note branch -> one case.
- Statuses: Invoice Status (Draft, Unpaid, Partially Paid, Fully Paid, Overdue, Return, Fully Credited, Cancelled; On Hold/Closed are red = hidden), Credit Status, Refund Status. Repeated in use case 1 and 4.
- SRS defects (not UI bugs): typos kept as written ("Credit Staus", "Grand Commision", "Total Avance"); copy-paste leftovers (use case 4 pre-conditions say Sales Order; address/terms text says Quotation; Save says "Sales order List"; Overdue rule says due date ">" current date; Delivery Note list says "quotations whose status is To Deliver"; Submit inside Hold pop-up).

## Existing material for the same module

- 546 cases: `Shamel-test-cases/SHAMEL_SalesInvoice_Test_Cases_EN.xlsx`; with execution status: `SHAMEL_SalesInvoice_Test_Cases_EN_executed.xlsx`.
- Specs: `Shamel/srs-si-acc-*.spec.ts`, helpers `Shamel/helpers/si-ui.ts`; report: `Shamel-test-cases/reports/sales-invoice-accounting-srs-review-report.html`.

## Hidden (red) items - first line of each red block

- Account Category (hidden)
- Tax Rate (hidden)
- Minimum length: 2 characters.
- Merge Accounts (hidden)

## Index

- Use case 1 - Account List: page 3
- Use case 2 - Add Account: page 5
- Use case 3 - Account details: page 10


# Use case 1 - Account List

<!-- page 3 -->

**Account**

**Account List**

**Use case ID**

**1**

**Use  case**

**Account List**

**Name**

**Descriptions**

**The user is able to view the list of Accounts.**
- Click on Accounting from sidebar

**Pre conditions**
- Click on Account from sidebar -

**Main Flow**
- Add Account

**Components**
  - Button
  - For adding a new Account
  - When clicked, the user will be redirected to the “Add Account” screen.
- Accounts List
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - ID
      - It displays the Account ID
      - Clickable
      - When clicked, the user is navigated to the "Account Details” screen.
    - Status
      - Displays one of the following values:
        - Enabled
        - Disabled
    - Account name
      - It displays the Account name
    - Account Number
      - It displays the Account Number
- Note: when an account is selected , an action bar appears showing the following actions:
  - Edit
    - Button
    - When clicked , a popup appears containing the following fields.
      - Field
        - DDL 2

<!-- page 4 -->
        - To select the field you want to edit
        - Link “Account” doctype
        - Single selection
        - Mandatory
      - Value
        - Dynamic field
        - Based on the selected option from the first dropdown field, the second field shall :
          - Dynamically change it’s input type
          - Be marked as either mandatory
          - Or optional
          - Apply the corresponding validation rules
  - Export
  - Assign to
  - Clear assignment
  - Add tags
  - Print
  - Delete
    - When clicked,
      - A confirmation message is displayed to the user whether they want to delete this Account
      - Upon clicking the “Yes” button:
        - if the Account is linked to other transactions,
          - a message is displayed informing the user that the linked transactions must be deleted before the Account can be deleted.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - If the Account isn’t linked to another doctype
          - The Account is deleted successfully.
- Ability to add and view Account details.

**Post**
- Ability to Edit , Export , Assign to, Clear Assignment , Add Tags , Print , Delete

**Conditions**

**3**

# Use case 2 - Add Account

<!-- page 5 -->

**Add Account**

**Use case ID**

**2**

**Use case Name  Add Account**

**Descriptions**

**The user can add a new Account.**
- Click on Accounting from sidebar

**Pre conditions**
- Click on Account from sidebar
- Click on “Add Account” button -

**Main Flow**
- Account name

**Components**
  - Text input field
  - For entering the Account name
  - Mandatory.
  - Accepts letters, numbers, and special characters.
  - Minimum length: 2 characters.
  - Maximum length: 100 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
  - If the field is left empty an error message appears.
- Account Number
  - Text input field
  - For entering the Account number
  - It has a unique value
  - Optional
  - Accepts numbers and special characters only.
  - Minimum length: 2 characters.
  - Maximum length: 100 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
- Is Group
  - Checkbox
  - If the user wants to make this account a parent account
  - Optional
  - When converting a non-group account into a group account:
    - If the Group checkbox is unchecked and the user attempts to check it,
      - The system shall perform the following validations: 4

<!-- page 6 -->
        - Verify that the Account Type is not specified.
        - Verify that the account is not associated with any transactions.
      - If both conditions are satisfied, the system shall successfully :
        - convert the account into a Group Account (Parent Account).
        - The “Currency” field is hidden
      - If either validation fails, the system shall prevent the conversion and display an appropriate error message.
  - When converting a group account into a non-group account:
    - If the Group checkbox is checked and the user attempts to uncheck it,
      - The system shall perform the following validations:
        - Verify that the account has no child accounts.
      - If the account has no child accounts,
        - The system shall successfully convert it into a Non-Group Account.
        - The “Currency” field is displayed
      - If the account has one or more child accounts,
        - The system shall prevent the conversion and display an appropriate error message.
- Company
  - Searchable DDL
  - Link “Company” doctype
  - To select the company for which the Account will be assigned.
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
  - Important Note: this field is editable only during creation. After saving, it becomes read-only and cannot be edited.
- Root type
  - Label field (read only)
  - It displays one of the following values according to Parent Account Type:
    - Asset
    - Liability
    - Income
    - Expense
    - Equity
  - Note: it’s fetched from the Parent Account Type
  - Note: this field is editable only when there is no Parent Account to fetch Root Type from
- Report type
  - Label field (read only)
  - It displays one of the following values according to Parent Account Type:
    - Balance Sheet
    - Profit and Loss 5

<!-- page 7 -->
  - Note: it’s fetched from the Parent Account Type
- Currency
  - Searchable DDL
  - Link “Currency” doctype
  - To select the account currency.
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
  - Note:
    - After saving, if the user tries to change the account currency, the system shall validate whether there are any transactions recorded against the account using a different currency.
      - If transactions exist in another currency:
        - The system shall prevent the change and display the following error message "Currency cannot be changed after making entries using some other currency."
      - If no transactions exist in another currency:
        - The system shall allow the user to change the currency and save the changes successfully.
- Parent Account
  - Searchable DDL
  - Link “Account” doctype
  - To select the parent account
  - It displays only accounts with the “Is Group” option enabled.
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- **[HIDDEN]** Account Category (hidden)
  - **[HIDDEN]** Searchable DDL
  - **[HIDDEN]** Link “Account Category” doctype
  - **[HIDDEN]** To select the Category of the Account
  - **[HIDDEN]** Single selection
  - **[HIDDEN]** Optional
  - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Account Type
  - DDL
  - To select the Account type
  - It contains the following values:
    - Empty
    - Accumulated Depreciation
    - Asset Received But Not Billed
    - Bank 6

<!-- page 8 -->
    - Cash
    - Chargeable
    - Capital Work in Progress
    - Cost of Goods Sold
    - Current Asset
    - Current Liability
    - Depreciation
    - Direct Expense
    - Direct Income
    - Equity
    - Expense Account
    - Expenses Included In Asset Valuation
    - Expenses Included In Valuation
    - Fixed Asset
    - Income Account
    - Indirect Expense
    - Indirect Income
    - Liability
    - Payable
    - Receivable
    - Round Off
    - Round Off for Opening
    - Stock
    - Stock Adjustment
    - Stock Received But Not Billed
    - Service Received But Not Billed
    - Tax
    - Temporary
  - Single selection
  - Optional
- Frozen
  - DDL
  - To select accounts that are not allowed to be selected in transactions except for role specified as “Roles Allowed to Set and Edit Frozen Account Entries” in company details
  - It  contains the following values:
    - Yes
    - No
  - Single selection
  - Optional
  - Note: it appears only after saving
- **[HIDDEN]** Tax Rate (hidden)
  - **[HIDDEN]** Text input field
  - **[HIDDEN]** For entering the tax rate
  - **[HIDDEN]** Optional
  - **[HIDDEN]** Accepts numbers only. 7

<!-- page 9 -->
  - **[HIDDEN]** Minimum length: 2 characters.
  - **[HIDDEN]** Maximum length: 100 characters.
  - **[HIDDEN]** Once the maximum limit is reached, further input will be prevented.
  - **[HIDDEN]** An error message will appear if the entered text is less than the minimum length.
- Balance must be
  - DDL
  - It  contains the following values:
    - Empty
    - Debit
    - Credit
  - Single selection
  - Optional
  - Note:
    - When the “Balance Must Be” is set to Debit
      - The system rejects any transactions that would cause the account’s overall balance to become credit and vise versa
    - When the “Balance Must Be” is set to Empty
      - Account can have either debit or credit balance
- Save
  - Button
  - When clicked,
    - If all required data is entered correctly and completely:
      - The Account is successfully saved and added to the “Accounts List”
    - If incorrect or incomplete data is entered:
      - A validation error message is displayed for each invalid field.
- The new Account has been added successfully

**Post**
- If invalid or incomplete data is entered, the corresponding error message will be displayed

**Conditions**

**for each field.**

**8**

# Use case 3 - Account details

<!-- page 10 -->

**Account Details**

**Use case ID**

**3**

**Use case Name  Account details**

**Descriptions**

**The user can view / edit the account details.**
- Click on Accounting from sidebar

**Pre conditions**
- Click on Account from sidebar
- Click on “Account ID” from the table -

**Main Flow**
- Input fields

**Components**
  - The system retrieves and displays the data entered during creation, allowing users to view or  update it as needed in addition to the following:
- Disabled
  - Checkbox
  - To mark the Account as inactive.
  - When checked, the Account status changes to Disabled.
  - Note: Disabled Accounts cannot be selected in new transactions but remain available in historical records.
- Fixed Page Actions
  - The following action buttons are fixed and consistently displayed at the top of all (Account details) pages to provide a quick access to common functions:
    - View
      - DDL
      - It contains the following actions:
        - General Ledger
          - Button
          - It appears only when the “Is Group” checkbox is disabled
          - When clicked, the user is navigated to the “General Ledger” screen.
        - Chart of Accounts
          - Button
          - When clicked, the system navigates to the Accounts List, presented in a hierarchical tree structure that includes all parent and child Accounts, and 9

<!-- page 11 -->

**highlights the Account that was previously opened**

**in the details view.**
- Actions
  - DDL
  - Contains the following actions:
    - **[HIDDEN]** Merge Accounts (hidden)
      - **[HIDDEN]** Button
      - **[HIDDEN]** When clicked, a pop up appears containing the following fields:
        - **[HIDDEN]** Name
          - **[HIDDEN]** Searchable DDL
          - **[HIDDEN]** Link “Account” doctype
          - **[HIDDEN]** To select the account that will be merged with this account
          - **[HIDDEN]** Single selection
          - **[HIDDEN]** mandatory
          - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
          - **[HIDDEN]** Note: if the current account is the selected account, an error message appears indicating that the old and new accounts are the same.
    - Update Account Name and Number
      - Button
      - When clicked, a pop up appears containing the following fields:
        - Account name
          - Text input field
          - For updating the Account name
          - Mandatory.
          - Accepts letters, numbers, and special characters.
          - Minimum length: 2 characters.
          - Maximum length: 100 characters.
          - Once the maximum limit is reached, further input will be prevented.
          - An error message will appear if the entered text is less than the minimum length.
          - If the field is left empty an error message appears.
        - Account Number
          - Text input field 10

<!-- page 12 -->
            - For updating the Account number
            - It has a unique value
            - Optional
            - Accepts numbers and special characters only.
            - Minimum length: 2 characters.
            - Maximum length: 100 characters.
            - Once the maximum limit is reached, further input will be prevented.
            - An error message will appear if the entered text is less than the minimum length.
          - Update
            - Button
            - When clicked,
              - If all required data is entered correctly and completely: the Account Name / Number is successfully updated
              - If incorrect or incomplete data is entered: a validation error message is displayed for each invalid field.
  - Assign
  - Attachment
  - Tags
  - Share
  - Print
  - Delete
    - When clicked,
      - A confirmation message is displayed to the user whether they want to delete this Account
      - Upon clicking the “Yes” button:
        - if the Account is linked to other transactions,
          - a message is displayed informing the user that the linked transactions must be deleted before the Account can be deleted.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - If the Account isn’t linked to another doctype
          - The Account is deleted successfully.
- The Account data has been successfully modified and saved.

**Post**
- Entering incorrect or incomplete data will display the corresponding error message for

**Conditions**

**each field.**

**11**

<!-- page 13 -->

**12**

<!-- TEST CASES -->

# Generated test cases - Accounting module / Account (use cases 1-3)

> 194 cases. IDs `ACCT-<use case>-<seq>`. Source: SRS pages 3-13. Highlights in these pages: RED = hidden (Account Category, Tax Rate, Merge Accounts: each has a negative case). No YELLOW highlight exists in this part of the SRS, so there are no "focus" cases. Types: Functional, Boundary, Negative, Conditional, Integration, Filter, Default, Content, Consistency, Security, Flow, SRS-gap (needs BA answer).

## Use case 1 - Account List (35 cases)

| ID | Page | Field / feature | Scenario | Expected | Pri | Type | Spec |
|---|---|---|---|---|---|---|---|
| ACCT-1-001 | 3 | Account List | Click Accounting then Account in the sidebar | Account List opens | High | Functional |  |
| ACCT-1-002 | 3 | Add Account button | Click Add Account | Redirected to the Add Account screen | High | Functional |  |
| ACCT-1-003 | 3 | Account List columns | Open the list | Table has: checkbox, ID, Status, Account name, Account Number, in this order | High | Functional |  |
| ACCT-1-004 | 3 | Checkbox column | Tick one row, tick several rows, tick the header | Multi selection works; header selects all rows of the page; action bar appears when at least one row is selected | High | Functional |  |
| ACCT-1-005 | 3 | ID | Click an Account ID | Navigates to the Account Details screen of that account | High | Functional |  |
| ACCT-1-006 | 3 | Status | Compare enabled and disabled accounts | Status shows only Enabled or Disabled | High | Functional |  |
| ACCT-1-007 | 3 | Status | Disable an account (details screen) then reopen the list | Its Status becomes Disabled; enabling it returns Enabled | High | Integration |  |
| ACCT-1-008 | 3 | Account name | Compare list value with the details screen | Same name | Medium | Consistency |  |
| ACCT-1-009 | 3 | Account Number | Account without a number | Number column is empty without error | Low | Functional |  |
| ACCT-1-010 | 3 | Account Number | Compare list value with the details screen | Same number | Medium | Consistency |  |
| ACCT-1-011 | 3 | Action bar | Select a row | Action bar shows Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete | High | Functional |  |
| ACCT-1-012 | 3 | Action bar | Untick the last selected row | Action bar disappears | Medium | Functional |  |
| ACCT-1-013 | 3 | Edit | Click Edit with one or more rows selected | Pop-up opens with Field and Value | High | Functional |  |
| ACCT-1-014 | 4 | Edit - Field | Open the Field list | Single-selection list of fields of the Account doctype | High | Functional |  |
| ACCT-1-015 | 4 | Edit - Field | Leave Field empty and confirm | Error: Field is mandatory; nothing changed | High | Negative |  |
| ACCT-1-016 | 4 | Edit - Value | Select different fields one after another (text, checkbox, DDL, link) | Value input changes type to match the field (text / checkbox / dropdown / searchable list) | High | Functional |  |
| ACCT-1-017 | 4 | Edit - Value | Select a mandatory field then leave Value empty | Value is marked mandatory and an error appears | High | Negative |  |
| ACCT-1-018 | 4 | Edit - Value | Select an optional field then leave Value empty | Value is marked optional and accepted | Medium | Functional |  |
| ACCT-1-019 | 4 | Edit - Value | Enter an invalid value for the chosen field (too short Account name, letters in Account Number) | The validation rules of that field apply and an error appears | High | Negative |  |
| ACCT-1-020 | 4 | Edit | Edit one field for several selected accounts | All selected accounts receive the value (or are rejected per rule with a message) | High | Functional |  |
| ACCT-1-021 | 4 | Edit | SRS gap: the Edit pop-up has no confirm / Update button described | Ask BA how the pop-up is submitted and what message is shown | Low | SRS-gap |  |
| ACCT-1-022 | 4 | Export | Select rows and click Export | File is generated with the selected accounts and the list columns | Medium | Functional |  |
| ACCT-1-023 | 4 | Assign to | Select a row, Assign to a user | Assignment saved and visible; user is notified per system rules | Medium | Functional |  |
| ACCT-1-024 | 4 | Clear assignment | Clear the assignment of an assigned row | Assignment removed | Medium | Functional |  |
| ACCT-1-025 | 4 | Add tags | Add a tag to a row | Tag saved and shown | Low | Functional |  |
| ACCT-1-026 | 4 | Print | Print a selected account | Print preview opens with the account data | Low | Functional |  |
| ACCT-1-027 | 4 | Delete | Click Delete | Confirmation message asks whether to delete this Account | High | Functional |  |
| ACCT-1-028 | 4 | Delete | Confirm Yes on an account not linked to any document | Account deleted successfully and removed from the list | High | Functional |  |
| ACCT-1-029 | 4 | Delete | Confirm Yes on an account linked to transactions (GL entries, Payment Entry, Journal Entry, child accounts) | Message that linked transactions must be deleted first; linked doctypes shown as hyperlinks that open the corresponding doctype | High | Negative |  |
| ACCT-1-030 | 4 | Delete | Click Delete then No / close | Nothing deleted | Medium | Negative |  |
| ACCT-1-031 | 4 | Delete | Delete a Group account that has child accounts | Not deleted; message lists the children (children are linked records) | High | Negative |  |
| ACCT-1-032 | 4 | Delete | Delete several selected accounts, one of them linked | Behaviour per account is explained (linked one blocked); SRS does not define bulk delete result - note as gap | Medium | SRS-gap |  |
| ACCT-1-033 | 4 | Post condition | After delete / edit | List refreshes with the latest data | Medium | Functional |  |
| ACCT-1-034 | 3 | Permissions | User without read / write / delete permission on Account | Menu, buttons and actions respect permissions; server rejects direct calls | High | Security |  |
| ACCT-1-035 | 4 | Consistency | Create, edit and delete an account in sequence | List, tree and details stay consistent after each step | High | Flow |  |

## Use case 2 - Add Account (107 cases)

| ID | Page | Field / feature | Scenario | Expected | Pri | Type | Spec |
|---|---|---|---|---|---|---|---|
| ACCT-2-001 | 5 | Account name | Leave empty and Save | Error message for Account name; Account not saved | High | Negative |  |
| ACCT-2-002 | 5 | Account name | Enter 1 character(s) (min-1) and Save | Error message: shorter than the minimum length (2) | High | Boundary |  |
| ACCT-2-003 | 5 | Account name | Enter exactly 2 characters and Save | Accepted | High | Boundary |  |
| ACCT-2-004 | 5 | Account name | Enter exactly 100 characters and Save | Accepted and saved in full | High | Boundary |  |
| ACCT-2-005 | 5 | Account name | Type or paste 101 characters | Input stops at 100 characters (further input prevented) | High | Boundary |  |
| ACCT-2-006 | 5 | Account name | Enter letters, numbers and special characters (Cash-01 / #A_9) | Accepted and saved exactly | High | Functional |  |
| ACCT-2-007 | 5 | Account name | Enter Arabic text | Accepted and saved (RTL kept) | Medium | Functional |  |
| ACCT-2-008 | 5 | Account name | Enter leading / trailing spaces | Trimmed or rejected consistently; not saved with invisible edges | Low | Boundary |  |
| ACCT-2-009 | 5 | Account name | Enter only spaces (2+) and Save | Rejected as empty / invalid | Medium | Negative |  |
| ACCT-2-010 | 5 | Account name | Enter an HTML / script string | Saved as plain text, no script runs | Medium | Security |  |
| ACCT-2-011 | 5 | Account name | Create two accounts with the same name in the same company / under the same parent | Behaviour per system rule (duplicate name in same parent is not allowed in the standard behaviour); SRS does not say - flag as gap | Medium | SRS-gap |  |
| ACCT-2-012 | 5 | Account name | Save an account whose name equals an existing account name in another company | Allowed (names are unique per company) | Low | Functional |  |
| ACCT-2-013 | 5 | Account Number | Leave empty and Save | Saved without error (optional) | Medium | Functional |  |
| ACCT-2-014 | 5 | Account Number | Enter 1 character(s) (min-1) and Save | Error message: shorter than the minimum length (2) | High | Boundary |  |
| ACCT-2-015 | 5 | Account Number | Enter exactly 2 characters and Save | Accepted | High | Boundary |  |
| ACCT-2-016 | 5 | Account Number | Enter exactly 100 characters and Save | Accepted and saved in full | High | Boundary |  |
| ACCT-2-017 | 5 | Account Number | Type or paste 101 characters | Input stops at 100 characters (further input prevented) | High | Boundary |  |
| ACCT-2-018 | 5 | Account Number | Enter digits and special characters (1001-01, 10/5) | Accepted and saved exactly | High | Functional |  |
| ACCT-2-019 | 5 | Account Number | Enter letters (ABC12) | Rejected (letters are not accepted: numbers and special characters only) | High | Negative |  |
| ACCT-2-020 | 5 | Account Number | Enter Arabic letters | Rejected | Medium | Negative |  |
| ACCT-2-021 | 5 | Account Number | Save two accounts with the same Account Number | Error: Account Number must be unique; second account not saved | High | Negative |  |
| ACCT-2-022 | 5 | Account Number | Save the same number in a different company | Unique per company in standard behaviour; confirm with BA (SRS only says "unique") | Medium | SRS-gap |  |
| ACCT-2-023 | 5 | Account Number | Number with 2 digits + dash + 2 digits | Account ID / display shows number and name together as the system format | Low | Functional |  |
| ACCT-2-024 | 5 | Is Group | Open Add Account | Checkbox is optional and unchecked by default | High | Default |  |
| ACCT-2-025 | 5 | Is Group | Tick Is Group on a new account | Currency field is hidden (group account) | High | Conditional |  |
| ACCT-2-026 | 5 | Is Group | Untick Is Group on a new account | Currency field is displayed | High | Conditional |  |
| ACCT-2-027 | 5 | Is Group | Save a Group account | Saved; appears in Parent Account list for other accounts; General Ledger action not shown on its details | High | Functional |  |
| ACCT-2-028 | 5 | Is Group | Convert a saved non-group account (no Account Type, no transactions) to Group | Converted successfully; Currency becomes hidden | High | Functional |  |
| ACCT-2-029 | 5 | Is Group | Convert a non-group account that has an Account Type to Group | Prevented with an appropriate error message | High | Negative |  |
| ACCT-2-030 | 5 | Is Group | Convert a non-group account that has transactions to Group | Prevented with an appropriate error message | High | Negative |  |
| ACCT-2-031 | 6 | Is Group | Convert a non-group account with Account Type = Empty and no transactions | Allowed (both validations satisfied) | High | Functional |  |
| ACCT-2-032 | 6 | Is Group | Convert a Group account with no children to non-group | Converted successfully; Currency field is displayed | High | Functional |  |
| ACCT-2-033 | 6 | Is Group | Convert a Group account that has one child to non-group | Prevented with an appropriate error message | High | Negative |  |
| ACCT-2-034 | 6 | Is Group | Convert a Group account with several children to non-group | Prevented with an appropriate error message | Medium | Negative |  |
| ACCT-2-035 | 6 | Is Group | Delete the only child, then convert the Group to non-group | Conversion now allowed | Medium | Functional |  |
| ACCT-2-036 | 6 | Is Group | Convert Group to non-group and back | State persists after reload; Currency visibility follows | Medium | Functional |  |
| ACCT-2-037 | 6 | Is Group | Error text for the blocked conversions | Message is clear and says why (Account Type set / transactions exist / children exist) | Medium | Usability |  |
| ACCT-2-038 | 6 | Company | Open the list and type part of a company | Searchable DDL filters while typing; select fills the field | High | Functional |  |
| ACCT-2-039 | 6 | Company | Leave Company empty and Save | Error message for Company; not saved | High | Negative |  |
| ACCT-2-040 | 6 | Company | Select a company, Save, reopen the account | Company is read-only after save (cannot be edited) | High | Conditional |  |
| ACCT-2-041 | 6 | Company | Try to edit Company on an existing account through list Edit pop-up / API | Rejected: Company editable only during creation | High | Negative |  |
| ACCT-2-042 | 6 | Company | Type text with no match | No result; no value set | Low | Negative |  |
| ACCT-2-043 | 6 | Company | Change Company on the Add screen after choosing a Parent Account | Parent Account is cleared / re-validated because it belongs to the old company | High | Integration |  |
| ACCT-2-044 | 6 | Company | Select a company | Parent Account list shows only group accounts of that company | High | Filter |  |
| ACCT-2-045 | 6 | Root type | View the field | Label (read only) showing Asset / Liability / Income / Expense / Equity | High | Functional |  |
| ACCT-2-046 | 6 | Root type | Select a Parent Account whose root is Asset | Root type = Asset (fetched from the Parent Account) | High | Integration |  |
| ACCT-2-047 | 6 | Root type | Select a Parent Account whose root is Liability | Root type = Liability (fetched from the Parent Account) | High | Integration |  |
| ACCT-2-048 | 6 | Root type | Select a Parent Account whose root is Income | Root type = Income (fetched from the Parent Account) | High | Integration |  |
| ACCT-2-049 | 6 | Root type | Select a Parent Account whose root is Expense | Root type = Expense (fetched from the Parent Account) | High | Integration |  |
| ACCT-2-050 | 6 | Root type | Select a Parent Account whose root is Equity | Root type = Equity (fetched from the Parent Account) | High | Integration |  |
| ACCT-2-051 | 6 | Root type | Change the Parent Account to one under another root | Root type updates accordingly | High | Integration |  |
| ACCT-2-052 | 6 | Root type | No Parent Account selected | SRS: editable only when there is no Parent Account. But Parent Account is mandatory - contradiction; ask BA when this can happen (creating root accounts?) | High | SRS-gap |  |
| ACCT-2-053 | 6 | Report type | View the field | Label (read only): Balance Sheet or Profit and Loss | High | Functional |  |
| ACCT-2-054 | 7 | Report type | Parent under Assets / Liabilities / Equity | Report type = Balance Sheet | High | Integration |  |
| ACCT-2-055 | 7 | Report type | Parent under Income / Expenses | Report type = Profit and Loss | High | Integration |  |
| ACCT-2-056 | 7 | Report type | Try to edit | Not editable | Medium | Negative |  |
| ACCT-2-057 | 7 | Currency | Open the list | Searchable DDL of currencies; single selection; optional | High | Functional |  |
| ACCT-2-058 | 7 | Currency | Leave empty and Save | Saved without error (optional); company currency used by default behaviour - confirm | Medium | Functional |  |
| ACCT-2-059 | 7 | Currency | Non-group account: view field | Currency is displayed | High | Conditional |  |
| ACCT-2-060 | 7 | Currency | Group account: view field | Currency is hidden | High | Conditional |  |
| ACCT-2-061 | 7 | Currency | After save, change the currency of an account with transactions in another currency | Error exactly: "Currency cannot be changed after making entries using some other currency." | High | Negative |  |
| ACCT-2-062 | 7 | Currency | After save, change the currency of an account with no transactions | Change allowed and saved successfully | High | Functional |  |
| ACCT-2-063 | 7 | Currency | After save, change the currency of an account with transactions only in the same (company) currency | Per SRS check "transactions in another currency" - allowed; confirm | Medium | SRS-gap |  |
| ACCT-2-064 | 7 | Currency | Type text with no match | No result | Low | Negative |  |
| ACCT-2-065 | 7 | Parent Account | Open the list | Only accounts with Is Group enabled are offered (of the selected company) | High | Filter |  |
| ACCT-2-066 | 7 | Parent Account | Check that a non-group account is not offered | Not in the list | High | Filter |  |
| ACCT-2-067 | 7 | Parent Account | Leave empty and Save | Error message for Parent Account; not saved | High | Negative |  |
| ACCT-2-068 | 7 | Parent Account | Select a parent, Save | Account appears under that parent in the Chart of Accounts tree | High | Integration |  |
| ACCT-2-069 | 7 | Parent Account | Search by name and by number | Both find the account (number + name displayed) | Medium | Functional |  |
| ACCT-2-070 | 7 | Parent Account | Select a disabled group account as parent | Behaviour per rule (disabled accounts not selectable in new transactions - check whether also as parent); flag if SRS silent | Low | SRS-gap |  |
| ACCT-2-071 | 7 | Parent Account | Edit parent after save (move account) | Account moves under the new parent; Root type / Report type refreshed; descendants follow | Medium | Integration |  |
| ACCT-2-072 | 7 | Parent Account | Choose the account itself or one of its own children as parent | Rejected (circular tree) | Medium | Negative |  |
| ACCT-2-073 | 7 | Account Category (hidden) | Open the Add and Details screens | Account Category field is NOT displayed anywhere (red in SRS) | High | Negative |  |
| ACCT-2-074 | 7 | Account Type | Open the list | Single-selection DDL; optional | High | Functional |  |
| ACCT-2-075 | 8 | Account Type | Compare the list with the SRS | Exactly these 32 values in this order: Empty, Accumulated Depreciation, Asset Received But Not Billed, Bank, Cash, Chargeable, Capital Work in Progress, Cost of Goods Sold, Current Asset, Current Liability, Depreciation, Direct Expense, Direct Income, Equity, Expense Account, Expenses Included In Asset Valuation, Expenses Included In Valuation, Fixed Asset, Income Account, Indirect Expense, Indirect Income, Liability, Payable, Receivable, Round Off, Round Off for Opening, Stock, Stock Adjustment, Stock Received But Not Billed, Service Received But Not Billed, Tax, Temporary | High | Content |  |
| ACCT-2-076 | 8 | Account Type | Leave on Empty and Save | Saved; Account Type empty | Medium | Functional |  |
| ACCT-2-077 | 8 | Account Type | Create an account with type Bank | Saved; the account is offered where the type is required (e.g. Bank / Cash in payments, Receivable in invoices) | Medium | Integration |  |
| ACCT-2-078 | 8 | Account Type | Create an account with type Cash | Saved; the account is offered where the type is required (e.g. Bank / Cash in payments, Receivable in invoices) | Medium | Integration |  |
| ACCT-2-079 | 8 | Account Type | Create an account with type Receivable | Saved; the account is offered where the type is required (e.g. Bank / Cash in payments, Receivable in invoices) | Medium | Integration |  |
| ACCT-2-080 | 8 | Account Type | Create an account with type Payable | Saved; the account is offered where the type is required (e.g. Bank / Cash in payments, Receivable in invoices) | Medium | Integration |  |
| ACCT-2-081 | 8 | Account Type | Create an account with type Stock | Saved; the account is offered where the type is required (e.g. Bank / Cash in payments, Receivable in invoices) | Medium | Integration |  |
| ACCT-2-082 | 8 | Account Type | Create an account with type Tax | Saved; the account is offered where the type is required (e.g. Bank / Cash in payments, Receivable in invoices) | Medium | Integration |  |
| ACCT-2-083 | 8 | Account Type | Select any Account Type on a Group account | SRS: converting to Group needs Account Type empty - check the type on a group is blocked or cleared | High | Negative |  |
| ACCT-2-084 | 8 | Account Type | Change the type of an account that has transactions | Behaviour per rule; error if not allowed (not stated in SRS) | Medium | SRS-gap |  |
| ACCT-2-085 | 8 | Frozen | Open Add Account | Frozen is NOT displayed before the first save | High | Conditional |  |
| ACCT-2-086 | 8 | Frozen | Save the account then reopen it | Frozen DDL appears with Yes / No; optional | High | Conditional |  |
| ACCT-2-087 | 8 | Frozen | Set Frozen = Yes and create a transaction with a normal user | Account cannot be selected / posted in transactions | High | Integration |  |
| ACCT-2-088 | 8 | Frozen | Set Frozen = Yes and post with the role "Roles Allowed to Set and Edit Frozen Account Entries" (company setting) | Posting is allowed for that role | High | Integration |  |
| ACCT-2-089 | 8 | Frozen | Set Frozen = No | Account selectable again | Medium | Functional |  |
| ACCT-2-090 | 8 | Tax Rate (hidden) | Open the Add and Details screens | Tax Rate field is NOT displayed anywhere (red in SRS) | High | Negative |  |
| ACCT-2-091 | 9 | Balance must be | Open the list | Values: Empty, Debit, Credit; single selection; optional | High | Content |  |
| ACCT-2-092 | 9 | Balance must be | Set Debit then post an entry that makes the balance credit | Posting rejected with an error | High | Integration |  |
| ACCT-2-093 | 9 | Balance must be | Set Credit then post an entry that makes the balance debit | Posting rejected with an error | High | Integration |  |
| ACCT-2-094 | 9 | Balance must be | Set Debit and post entries that keep the balance debit | Accepted | High | Integration |  |
| ACCT-2-095 | 9 | Balance must be | Set Empty and post entries that give either debit or credit balance | Both accepted | High | Integration |  |
| ACCT-2-096 | 9 | Balance must be | Set Debit on an account that already has a credit balance | Behaviour per rule (error or accepted); not defined in SRS | Medium | SRS-gap |  |
| ACCT-2-097 | 9 | Save | Fill Account name, Company, Parent Account and click Save | Account saved and added to the Accounts List; success message | High | Functional |  |
| ACCT-2-098 | 9 | Save | Fill every field of the screen and Save | All values persisted when reopened | High | Functional |  |
| ACCT-2-099 | 9 | Save | Save with missing / invalid data in several fields | Validation error for each invalid field, shown next to the field | High | Negative |  |
| ACCT-2-100 | 9 | Save | Save, then check the Chart of Accounts tree | The new account appears under the parent with name and number | High | Integration |  |
| ACCT-2-101 | 9 | Save | Double-click Save quickly | Only one account created | Medium | Negative |  |
| ACCT-2-102 | 9 | Save | Leave the screen with unsaved data | Unsaved-changes warning or data discarded per system behaviour | Low | Functional |  |
| ACCT-2-103 | 9 | Add Account | Check the screen against the SRS field list | Fields shown: Account name, Account Number, Is Group, Company, Root type, Report type, Currency, Parent Account, Account Type, Frozen (after save), Balance must be; hidden: Account Category, Tax Rate | High | Consistency |  |
| ACCT-2-104 | 5 | Localization | Switch UI between Arabic and English | Labels and messages localized; RTL layout in Arabic | Medium | Functional |  |
| ACCT-2-105 | 9 | End to end | Create a Group account, then a child under it, then post a Journal Entry on the child, then open General Ledger | Tree shows the hierarchy; GL shows the entry on the child; Group has no General Ledger action | High | Flow |  |
| ACCT-2-106 | 9 | End to end | Create an account, disable it, try to use it in a new Journal Entry | Not selectable | High | Flow |  |
| ACCT-2-107 | 9 | End to end | Create a Bank account with Currency USD; post an EUR transaction; try to change currency | Blocked with the exact SRS message | High | Flow |  |

## Use case 3 - Account Details (52 cases)

| ID | Page | Field / feature | Scenario | Expected | Pri | Type | Spec |
|---|---|---|---|---|---|---|---|
| ACCT-3-001 | 10 | Account Details | Click an Account ID in the list | Details opens with all data entered at creation | High | Functional |  |
| ACCT-3-002 | 10 | Account Details | Compare every field with the list / creation values | Same values | High | Consistency |  |
| ACCT-3-003 | 10 | Account Details | Edit a field (e.g. Balance must be) and save | Saved: "Account data has been successfully modified and saved" | High | Functional |  |
| ACCT-3-004 | 10 | Account Details | Enter incorrect or incomplete data and save | Validation error for each invalid field | High | Negative |  |
| ACCT-3-005 | 10 | Account Details | Company field on details | Read-only | High | Negative |  |
| ACCT-3-006 | 10 | Account Details | Frozen on details | Visible and editable (appears after saving) | High | Conditional |  |
| ACCT-3-007 | 10 | Disabled | View the checkbox | Checkbox shown, unchecked for enabled accounts | High | Functional |  |
| ACCT-3-008 | 10 | Disabled | Tick Disabled and save | Status changes to Disabled in details and list | High | Functional |  |
| ACCT-3-009 | 10 | Disabled | Create a new transaction (invoice, payment, journal entry) and look for the disabled account | Disabled account cannot be selected in new transactions | High | Integration |  |
| ACCT-3-010 | 10 | Disabled | Open historical documents / General Ledger that used the account | Account still shown in historical records | High | Integration |  |
| ACCT-3-011 | 10 | Disabled | Untick Disabled and save | Status Enabled; selectable again | High | Functional |  |
| ACCT-3-012 | 10 | Disabled | Disable a Group account that has enabled children | Behaviour per rule (not defined in SRS) | Medium | SRS-gap |  |
| ACCT-3-013 | 10 | View menu | Open View | Contains General Ledger and Chart of Accounts | High | Functional |  |
| ACCT-3-014 | 10 | General Ledger | Open a non-group account and open View | General Ledger action is displayed | High | Conditional |  |
| ACCT-3-015 | 10 | General Ledger | Open a Group account and open View | General Ledger action is NOT displayed | High | Conditional |  |
| ACCT-3-016 | 10 | General Ledger | Click General Ledger | Navigates to the General Ledger screen filtered on this account | High | Integration |  |
| ACCT-3-017 | 10 | Chart of Accounts | Click Chart of Accounts | Navigates to the hierarchical tree of all parent and child accounts | High | Integration |  |
| ACCT-3-018 | 11 | Chart of Accounts | Check the tree after navigation | The account opened in the details screen is highlighted and visible (tree expanded to it) | High | Integration |  |
| ACCT-3-019 | 11 | Actions menu | Open Actions | Contains: Update Account Name and Number, Assign, Attachment, Tags, Share, Print, Delete (no Merge Accounts) | High | Functional |  |
| ACCT-3-020 | 11 | Merge Accounts (hidden) | Open Actions and look for Merge Accounts | Not displayed (red in SRS); no merge pop-up reachable | High | Negative |  |
| ACCT-3-021 | 11 | Merge Accounts (hidden) | Check API / URL access to merge | Not exposed from the UI (confirm with DEV whether the server method must stay) | Low | SRS-gap |  |
| ACCT-3-022 | 11 | Update Account Name and Number | Click Update Account Name and Number | Pop-up with Account name and Account Number prefilled with the current values and an Update button | High | Functional |  |
| ACCT-3-023 | 11 | Update Account Name and Number - Account name | Clear the name and click Update | Error: Account name mandatory; not updated | High | Negative |  |
| ACCT-3-024 | 11 | Update Account Name and Number - Account name | Enter 1 character and Update | Error: shorter than the minimum length (2) | High | Boundary |  |
| ACCT-3-025 | 11 | Update Account Name and Number - Account name | Enter 2 characters and Update | Updated | High | Boundary |  |
| ACCT-3-026 | 11 | Update Account Name and Number - Account name | Enter 100 characters and Update | Updated in full | High | Boundary |  |
| ACCT-3-027 | 11 | Update Account Name and Number - Account name | Type / paste 101 characters | Input stops at 100 | High | Boundary |  |
| ACCT-3-028 | 11 | Update Account Name and Number - Account name | Enter letters, numbers and special characters | Accepted | Medium | Functional |  |
| ACCT-3-029 | 12 | Update Account Name and Number - Account Number | Clear the number and Update | Updated; number removed (optional) | Medium | Functional |  |
| ACCT-3-030 | 12 | Update Account Name and Number - Account Number | Enter 1 character and Update | Error: shorter than the minimum length (2) | High | Boundary |  |
| ACCT-3-031 | 12 | Update Account Name and Number - Account Number | Enter 2 digits and Update | Updated | High | Boundary |  |
| ACCT-3-032 | 12 | Update Account Name and Number - Account Number | Enter 100 characters and Update | Updated in full | High | Boundary |  |
| ACCT-3-033 | 12 | Update Account Name and Number - Account Number | Type / paste 101 characters | Input stops at 100 | High | Boundary |  |
| ACCT-3-034 | 12 | Update Account Name and Number - Account Number | Enter letters | Rejected (numbers and special characters only) | High | Negative |  |
| ACCT-3-035 | 12 | Update Account Name and Number - Account Number | Enter a number used by another account | Error: Account Number must be unique | High | Negative |  |
| ACCT-3-036 | 12 | Update Account Name and Number - Account Number | Keep the same number and change only the name | Updated; no false duplicate error against itself | High | Negative |  |
| ACCT-3-037 | 12 | Update button | Enter valid name and number and click Update | Success: Account name / number updated and shown in details, list and tree | High | Functional |  |
| ACCT-3-038 | 12 | Update button | Enter invalid data and click Update | Validation error for each invalid field; nothing changed | High | Negative |  |
| ACCT-3-039 | 12 | Update button | Rename an account that has transactions | Renamed; transactions, General Ledger and reports show the new name / ID consistently | High | Integration |  |
| ACCT-3-040 | 12 | Update button | Cancel / close the pop-up without Update | No change | Medium | Negative |  |
| ACCT-3-041 | 12 | Assign | Use Assign from Actions | Assign works and the result is saved / shown on the details screen | Medium | Functional |  |
| ACCT-3-042 | 12 | Attachment | Use Attachment from Actions | Attachment works and the result is saved / shown on the details screen | Medium | Functional |  |
| ACCT-3-043 | 12 | Tags | Use Tags from Actions | Tags works and the result is saved / shown on the details screen | Medium | Functional |  |
| ACCT-3-044 | 12 | Share | Use Share from Actions | Share works and the result is saved / shown on the details screen | Medium | Functional |  |
| ACCT-3-045 | 12 | Print | Use Print from Actions | Print works and the result is saved / shown on the details screen | Medium | Functional |  |
| ACCT-3-046 | 12 | Delete | Click Delete on an unlinked account and confirm | Confirmation first; then deleted successfully and user returns to the list | High | Functional |  |
| ACCT-3-047 | 12 | Delete | Delete a linked account and confirm | Message: linked transactions must be deleted first; linked doctypes as hyperlinks that open them | High | Negative |  |
| ACCT-3-048 | 12 | Delete | Click Delete then No | Nothing deleted | Medium | Negative |  |
| ACCT-3-049 | 12 | Delete | Delete an account that has child accounts | Blocked; children shown as links | High | Negative |  |
| ACCT-3-050 | 12 | Post condition | Edit and Save, then reopen | Account data successfully modified and saved | High | Functional |  |
| ACCT-3-051 | 10 | Permissions | Open details with read-only permission | Fields read-only; no Save / Delete / Update Name actions | High | Security |  |
| ACCT-3-052 | 12 | End to end | Rename an account then search by the new name in a Parent Account list | Found by new name / number; old name no longer found | Medium | Flow |  |

