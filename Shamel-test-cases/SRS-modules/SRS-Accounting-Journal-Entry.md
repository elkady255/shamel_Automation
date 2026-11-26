# SRS Azzrk SHAMEL - Accounting module V1.0 - Part: Journal Entry

> Extract of `SRS-Azzrk-Shamel-Accounting-FULL-V.1.0.pdf` (PDF pages 372-407). The PDF is the source of truth.

## Hidden (red) items - first line of each red block

- Periodic Accounting
- Expense Claim
- Loan
- Invoice Discounting
- Auto Repeat
- Under Withheld Reason
- Lower Deduction Certificate
- Label field (read only)
- than the applicable tax
- withholding amount
- Created By Migration
- Checkbox icon (read only)
- Payment Order
- Letter Head  (Remove)
- From template (Hidden)

## Index

- Use case 1 - Journal Entry List: page 372
- Use case 2 - Add Journal Entry: page 375
- Use case 3 - Tax Withholding Tab: page 390
- Use case 4 - More Info Tab: page 400
- Use case 5 - Journal Entry Details: page 404


# Use case 1 - Journal Entry List

<!-- page 372 -->

**Journal Entry............................................................................................................................................0**

**Journal Entry List.............................................................................................................................................. 0**

**Add Journal Entry............................................................................................................................................. 3**

**Details Tab......................................................................................................................... 3**

**Tax Withholding Tab.........................................................................................................18**

**More Info Tab...................................................................................................................28**

**Journal Entry Details..................................................................................................................................... 32**

**Journal Entry**

**Journal Entry List**

**Use case ID**

**1**

**Use  case**

**Journal Entry List**

**Name**

**Descriptions**

**The user is able to view the list of Journal Entries.**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Journal Entry from sidebar

**Main Flow**

**-**

**Components**
- Add Journal Entry
  - Button
  - For adding a new Journal Entry
  - When clicked, the user will be redirected to the “Add Journal Entry” screen.
- Journal Entry List
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - ID
      - It displays the Journal Entry ID
      - Clickable
      - When clicked, the user is navigated to the "Journal Entry Details” screen.
    - Title
      - It displays the party name of first row in the “Accounting Entries”

<!-- page 373 -->

**table**
      - Note: if party field is empty
        - It displays the Account name of first row in the “Accounting Entries” table
    - Status
      - It displays the Journal Entry status.
      - Displays one of the following values:
        - Draft
        - Submitted
        - Cancelled
    - Company
      - It displays the Company
    - Posting Date
      - It displays the journal entry posting date
- Note: when a Journal Entry is selected , an action bar appears showing the following actions:
  - Edit
    - Button
    - When clicked , a popup appears containing the following fields.
      - Field
        - DDL
        - To select the field you want to edit
        - Link “Journal Entry” doctype
        - Single selection
        - Mandatory
      - Value
        - Dynamic field
        - Based on the selected option from the first dropdown field, the second field shall :
          - Dynamically change it’s input type
          - Be marked as either mandatory
          - Or optional
          - Apply the corresponding validation rules
      - Update (button)
        - Button
        - When clicked,
          - If the Journal Entry status is "submitted" or "Cancelled":
            - an error message is displayed informing the user that the Journal Entry cannot be modified.
  - Export
  - Assign to
  - Clear assignment
  - Add tags
  - Print
  - Submit

<!-- page 374 -->
    - It appears only when the Journal Entry status = Draft.
    - If all required data is entered correctly and completely:
      - The Journal Entry is successfully submitted.
  - Cancel
    - It appears only when the Journal Entry status = Submitted
    - When clicked,
      - The Journal Entry is canceled successfully.
      - And “Cancel” button changes to “Amend”
  - Delete
    - It appears only when the Journal Entry status = Draft / Cancelled
    - When clicked,
      - A confirmation message is displayed to the user whether they want to delete this Journal Entry
      - Upon clicking the “Yes” button:
        - If other Journal Entry is Amended from this Journal Entry
          - A warning message appears indicating that this Journal Entry cannot be deleted until the user deletes all doctypes related to it.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - if the Journal Entry is linked to other transactions,
          - a message is displayed informing the user that the linked transactions must be deleted before the Journal Entry can be deleted.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - If the Journal Entry isn’t linked to another doctype
          - The Journal Entry is deleted successfully.

**Post**
- Ability to add and view Journal Entry details.

**Conditions**
- Ability to Edit , Export , Assign to, Clear Assignment , Add Tags , Print , Delete

# Use case 2 - Add Journal Entry

<!-- page 375 -->

**Add Journal Entry**

**Details Tab**

**Use case ID**

**2**

**Use  case**

**Add Journal Entry**

**Name**

**Descriptions**

**The user can add a new Journal Entry.**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Journal Entry from sidebar
- Click on “Add Journal Entry” button

**Main Flow**

**-**

**Components**
- Company
  - Searchable DDL
  - Link “Company” doctype
  - To select the company for which the Journal Entry will be recorded
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Series
  - DDL
  - Used to select the naming series that will be used to generate the Journal Entry ID automatically
  - Displays all series added to Journal Entry doctype
  - Mandatory.
  - Single selection
  - If the field is left empty an error message appears.
- Entry Type
  - DDL
  - To select the type of journal Entry
  - It contains the following values:
    - Journal Entry
    - Inter Company Journal Entry
    - Bank Entry
    - Cash Entry
    - Credit Card Entry
    - Debit Note
    - Credit Note
    - Contra Entry
    - Excise Entry

<!-- page 376 -->
    - Write Off Entry
    - Opening Entry
    - Depreciation Entry
    - Asset Disposal
    - Exchange Rate Revaluation
    - Exchange Gain Or Loss
    - Deferred Revenue
    - Deferred Expense
  - Single selection
  - It has a default value “Journal Entry”
- Posting Date
  - Date calendar picker
  - To select the Journal Entry date
  - Default value = current date
  - Mandatory
  - If the field is left empty an error message appears.
- Multi Currency
  - Checkbox
  - When checked, the system shall allow the Journal Entry to include accounts with different currencies.
- Consider for Tax Withholding
  - Checkbox
  - Note: it appears only when the entry type is equal to “Credit Note” or “Debit Note”
  - When checked,
    - The system shall consider the Journal Entry for Tax Withholding calculation.
    - The “Tax Withholding Category” field is displayed
    - The “Tax Withholding” tab is displayed
- Tax Withholding Category
  - Searchable DDL
  - Link “Tax Withholding Category” doctype
  - To select the Tax Withholding Category to be applied to the Journal Entry
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: it appears only when the “Consider for Tax Withholding = 1”
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Is system generated
  - Checkbox icon (read only)
  - It appears only when the document is generated by the system
- Amended From
  - Label field
  - Displays the journal entry from which this document was amended.
  - Clickable
  - When clicked, it navigates the user to the journal entry from which this document was amended.

<!-- page 377 -->
  - Note: This field is displayed only if this journal entry is amended from another journal entry
- **[HIDDEN]** Periodic Accounting
  - **[HIDDEN]** Note: it appears only when the Entry Type = Periodic Accounting Entry
  - **[HIDDEN]** It contains the following fields:
    - **[HIDDEN]** For All Stock Asset Accounts
      - **[HIDDEN]** Checkbox
      - **[HIDDEN]** When checked, the system shall apply the periodic accounting entry to all Stock Asset Accounts.
      - **[HIDDEN]** It’s checked by default
      - **[HIDDEN]** When unchecked, the “Stock Asset Account” field is displayed
    - **[HIDDEN]** Stock Asset Account
      - **[HIDDEN]** Searchable DDL
      - **[HIDDEN]** Link “Account” doctype
      - **[HIDDEN]** To select the Stock Asset Account to be used for the periodic accounting entry
      - **[HIDDEN]** Single selection
      - **[HIDDEN]** Mandatory
      - **[HIDDEN]** If the field is left empty an error message appears.
      - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
      - **[HIDDEN]** Note: it appears only when the “For All Stock Asset Accounts = 0”
    - **[HIDDEN]** Periodic Entry Difference Account
      - **[HIDDEN]** Searchable DDL
      - **[HIDDEN]** Link “Account” doctype
      - **[HIDDEN]** To select the account used to record the difference resulting from the periodic accounting entry
      - **[HIDDEN]** Single selection
      - **[HIDDEN]** Mandatory
      - **[HIDDEN]** If the field is left empty an error message appears.
      - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - **[HIDDEN]** Get Balance
      - **[HIDDEN]** Button
      - **[HIDDEN]** Fetches the balance of the specified Stock Asset Account for use in the periodic accounting entry.
      - **[HIDDEN]** When clicked, the system shall retrieve the balance of the selected Stock Asset Account, compare it with the corresponding stock balance, calculate the difference, and populate the Accounting Entries with the calculated amount for the Periodic Accounting Entry.
- Accounting Entries
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection

<!-- page 378 -->
- No.
  - Displays the ordering of items in the table
- Account
  - Searchable DDL
  - Link “Account” doctype
  - To select the account against which the accounting transaction is recorded
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Party Type
  - Searchable DDL
  - Link “Doctype”
  - To select the type of party associated with the accounting entry
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Party
  - Searchable DDL
  - links the DocTypes based only on the DocTypes selected in the Party Type field
  - To select the party associated with the accounting entry
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Debit
  - Text input field
  - To enter debit amount to be recorded against the account
  - Accepts integers and decimal numbers only
  - Optional
  - Note: when “Multi Currency” is equal to 1
    - The Debit column changes to “Debit in Account Currency”
  - Note: The system shall prevent the user from entering both Debit and Credit amounts for the same Account in the same Accounting Entry. If both Debit and Credit amounts are specified for the same Account, the system shall display an error message: "You cannot credit and debit the same account at the same time."
- Credit

<!-- page 379 -->
  - Text input field
  - To enter the credit amount to be recorded against the account
  - Accepts integers and decimal numbers only
  - Optional
  - Note: when “Multi Currency” is equal to 1
    - The Credit column changes to “Credit in Account Currency”
  - Note: The system shall prevent the user from entering both Debit and Credit amounts for the same Account in the same Accounting Entry. If both Debit and Credit amounts are specified for the same Account, the system shall display an error message: "You cannot credit and debit the same account at the same time."
- Setting
  - When clicked, a pop up appears contains the following options :
    - Rearranging table columns using drag and drop functionality.
      - Users can click and hold a column header , then drag and drop it into the desired position within the table.
    - Column width
      - Text input field
      - For entering or edit the column width
      - Accepts numbers only
      - Minimum length: 1 character.
      - Maximum length: 3 characters.
      - Default value = 3
    - Add / Remove columns
      - Button
      - For adding or removing columns from the table
      - When clicked, a pop-up appears containing all available table columns with their corresponding checkboxes.
      - These columns are: Column Name Account Party Type Party Debit in Account Currency Credit in Account Currency Bank Account

<!-- page 380 -->

**Cost Center**

**Project**

**Account Currency**

**Exchange Rate**

**Debit in Company Currency**

**Credit in Company Currency**

**Reference Type**

**Reference Name**

**Reference Due Date**

**Advance Voucher Type**

**Advance Voucher No**

**Is Tax Withholding Account**

**Is Advance**

**User Remark**
      - Users can show or hide columns by selecting or deselecting the related checkbox.
    - “Update” button
      - Button
      - For save any changes or updates made by the user
      - When clicked, any modifications made by the user will be saved
    - “Reset to default” button
      - Button
      - To reset all modifications to their default values.
      - When clicked, any modifications made by the user will be reset to their default values.
  - Note: when a row is selected , an action bar appears showing the following actions:
    - Delete row
      - Button
      - To delete a specific row or multiple rows
      - When clicked, the selected item group(s) will be deleted
- Edit Row
  - Clickable icon
  - Users can edit and view non displayed fields in the table.
  - When clicked , a pop up appears containing the following fields:

<!-- page 381 -->

**Field Name**

**Options**

**Account**
- Searchable DDL
- Link “Account” doctype
- To select the account against which the accounting transaction is recorded
- Single selection
- Mandatory
- If the field is left empty an error message appears.
- Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values

**Account type**
- Label field (read only)
- Displays the account type of the selected Account
- Note: it’s fetched from the selected Account

**Bank Account**
- Searchable DDL
- Link “Bank Account” doctype
- To select the related bank account for bank transactions
- Single selection
- Optional
- Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Party Type**
- Searchable DDL
- Link “Doctype”
- To select the type of party associated with the accounting entry
- Single selection
- Optional
- Note: the field shall be

<!-- page 382 -->

**implemented as a searchable**

**DDL (autocomplete), allowing the**

**user to search and select from a**

**predefined list of values.**

**Party**
- Searchable DDL
- links the DocTypes based only on the DocTypes selected in the Party Type field
- To select the party associated with the accounting entry
- Single selection
- Optional
- Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Cost Center**
- Searchable DDL
- Link "Cost Center” doctype
- Used to specify the department or business unit that will bear the expense or receive the revenue.
- Single selection
- Optional

**Project**
- Searchable DDL
- Link "Project” doctype
- Used to link the transaction to a specific project.
- Single selection
- Optional

**Account Currency**
- Label field (read only)
- Displays the currency of the selected Account
- Note: it’s fetched from the selected Account
- It appears only when “Multi Currency = 1”

<!-- page 383 -->

**Exchange Rate**
- Click here “Exchange Rate”

**Debit**
- Text input field
- To enter debit amount to be recorded against the account
- Accepts integers and decimal numbers only
- Optional
- Note: when “Multi Currency” is equal to 1
  - The Debit column changes to “Debit in Account Currency”

**Credit**
- Text input field
- To enter the credit amount to be recorded against the account
- Accepts integers and decimal numbers only
- Optional
- Note: when “Multi Currency” is equal to 1
  - The Credit column changes to “Credit in Account Currency”

**Debit in Account Currency**
- Label field
- Displays the debit amount converted into the company currency based on the applicable exchange rate.
- It appears only when “Multi Currency = 1”

**Credit in Account Currency**
- Label field
- Displays the credit amount converted into the company currency based on the applicable exchange rate.
- It appears only when “Multi

<!-- page 384 -->

**Currency = 1”**

**Reference Type**
- DDL
- To select the type of document referenced by the accounting entry
- It contains the following values:
  - Sales Invoice
  - Purchase Invoice
  - Journal Entry
  - Sales Order
  - Purchase Order
  - **[HIDDEN]** Expense Claim
  - Asset
  - **[HIDDEN]** Loan
  - **[HIDDEN]** Payroll Entry
  - **[HIDDEN]** Employee Advance
  - Exchange Rate Revaluation
  - **[HIDDEN]** Invoice Discounting
  - **[HIDDEN]** Fees
  - **[HIDDEN]** Full and Final Statement
  - Payment Entry
  - Bank Transaction
- Single selection
- Optional

**Reference name**
- Searchable DDL
- links the DocTypes based only on the DocType selected in the Reference Type field
- To select the name or identifier of the referenced document
- Single selection
- Optional
- Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Reference Due date**
- Date calendar picker
- To select the due date of the

<!-- page 385 -->

**referenced document**

**Reference Detail No**
- Label field
- Displays the detail or row identifier of the referenced document associated with the accounting entry
- Clickable
- When clicked, it navigates the user to the corresponding document

**Advance voucher type**
- Label field
- Displays the type of voucher from which the advance payment was recorded

**Advance voucher No**
- Label field
- Displays the advance voucher associated with the accounting entry

**Is tax withholding account**
- Checkbox icon (read only)
- Displays whether the account is a tax withholding account

**Is Advance**
- DDL
- To select whether the accounting entry represents an advance payment.
- It contains the following values:
  - Yes
  - No
- Single selection
- Optional

**User remarks**
- Text area
- Allows the user to enter additional remarks for the accounting entry.

<!-- page 386 -->
    - Add Row
      - Button
      - To add a new row in the table
      - When clicked, a new row is added to the table.
- Total Debit
  - Label field
  - Displays the total debit amount of all accounting entries.
- Total Credit
  - Label field
  - Displays the total credit amount of all accounting entries.
- Note: The total Debit amount must be equal to the total Credit amount in the Accounting Entries table. The Journal Entry cannot be saved or submitted unless the total Debit and total Credit amounts are equal and the difference between them is zero.
- Difference (Dr-Cr)
  - Label field
  - Calculates and displays the difference between the Total Debit and Total Credit amounts by subtracting Total Credit from Total Debit.
  - If the result is zero,
    - The Journal Entry is balanced.
  - If the result is positive or negative,
    - It indicates that the Total Debit and Total Credit amounts are not equal and the Journal Entry has an outstanding difference.
  - This value must be zero before submitting the journal entry.
- Make difference entry
  - Button
  - It allows the user to create an entry for the difference between the Total Debit and Total Credit amounts to balance the Journal Entry.
  - When checked, a new row is added in the “Accounting Entries” table and create a balancing entry for any debit and credit difference
  - Note: it appears only when “Difference” is not equal to Zero
- Reference Number
  - Text input field
  - To enter an external reference number such as a cheque number, bank transaction number, or any supporting reference
  - Optional
  - Accepts numbers only
  - Note: it’s mandatory only when the “Entry Type = Bank Entry”
- Reference Date
  - Date calendar picker
  - To Specify the date of the external reference document.
  - Optional
  - Note: it’s mandatory only when the “Entry Type = Bank Entry”
- Clearance date
  - Label field (read only)
  - Displays date on which the referenced cheque or transaction was cleared
  - Note: it’s displayed only when the document is submitted

<!-- page 387 -->
- **[HIDDEN]** Auto Repeat
  - **[HIDDEN]** Label field (read only)
  - **[HIDDEN]** Displays the Auto Repeat configuration used to automatically generate recurring Journal Entries
  - **[HIDDEN]** Note: it appears only after submitting
- Fixed Page Actions
  - It contains the following actions
    - Quick Entry
      - Button
      - Note:
        - It appears only before clicking on “Save” button
        - When clicked on “Save” button:
          - It disappears
      - When clicked, a pop up appears containing the following fields:
        - Amount
          - Text input field.
          - To enter the amount to be recorded in the Quick Journal Entry
          - Mandatory.
          - Accept integers and decimal numbers only.
          - Maximum length: 100 characters.
          - Once the maximum length is reached, further input is prevented.
          - If the field is left empty an error message appears.
          - Note: the entered amount is recorded as a debit to the selected Debit Account and as a credit to the selected Credit Account
        - Debit Account
          - Searchable DDL
          - Link “Account” doctype
          - To select the account to be debited by the specified amount
          - Single selection
          - Mandatory
          - If the field is left empty an error message appears.
          - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values
        - Credit Account
          - Searchable DDL
          - Link “Account” doctype
          - To select the account to be credited by the specified amount
          - Single selection
          - Mandatory
          - If the field is left empty an error message appears.
          - Note: the field shall be implemented as a searchable

<!-- page 388 -->

**DDL (autocomplete), allowing the user to search and**

**select from a predefined list of values.**
    - Date
      - Date calendar picker
      - To select the Journal Entry date
      - Default value = current date
      - Mandatory
      - If the field is left empty an error message appears.
    - Remark
      - Text area
      - Allows the user to enter remarks for the Quick Entry
      - Mandatory
      - If the field is left empty an error message appears.
    - Series
      - DDL
      - Used to select the naming series that will be used to generate the Journal Entry ID automatically
      - Displays all series added to Journal Entry doctype
      - Mandatory.
      - Single selection
      - If the field is left empty an error message appears.
    - Save
      - Button
      - When clicked,
        - If all required data is entered correctly and completely:
          - the quick entry is populated in the Journal Entry document successfully
        - If incorrect or incomplete data is entered:
          - A validation error message is displayed for each invalid field
- Save
  - Button
  - When clicked,
    - If all required data is entered correctly and completely:
      - The Journal Entry is successfully saved and not submitted.
      - And added to the Journal Entry List and its status is draft
    - If incorrect or incomplete data is entered:
      - A validation error message is displayed for each invalid field.
- Submit
  - It appears only when the Journal Entry status = Draft.
  - If all required data is entered correctly and completely:
    - The Journal Entry is successfully submitted.
- Cancel

<!-- page 389 -->
    - It appears only when the Journal Entry status = Submitted
    - When clicked,
      - The Journal Entry is canceled successfully.
      - And “Cancel” button changes to “Amend”
  - Amend
    - Button
    - It appears only when the Journal Entry status = cancelled
  - Delete
    - It appears only when the Journal Entry status = Draft / Cancelled
    - When clicked,
      - A confirmation message is displayed to the user whether they want to delete this Journal Entry
      - Upon clicking the “Yes” button:
        - If other Journal Entry is Amended from this Journal Entry
          - A warning message appears indicating that this Journal Entry cannot be deleted until the user deletes all doctypes related to it.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - if the Journal Entry is linked to other transactions,
          - a message is displayed informing the user that the linked transactions must be deleted before the Journal Entry can be deleted.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - If the Journal Entry isn’t linked to another doctype
          - The Journal Entry is deleted successfully.

**Post**
- The new Journal Entry has been added successfully

**Conditions**
- If invalid or incomplete data is entered, the corresponding error message will be displayed for each field.

# Use case 3 - Tax Withholding Tab

<!-- page 390 -->

**Tax Withholding Tab**

**Use case ID**

**3**

**Use  case**

**Tax Withholding Tab**

**Name**

**Descriptions**

**The user can continue the creation process and enter the Tax Withholding info**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Journal Entry from sidebar
- Click on “Add Journal Entry” button
- Click on Tax Withholding Tab

**Main Flow**

**-**

**Components**
- Note: this tab appears only when “Consider For Tax Withholding = 1”
- Tax Withholding Group
  - Searchable DDL
  - Link “Tacx Withholding Group” doctype
  - To select the tax withholding group applicable to the Journal Entry
  - Single selection
  - Optional
  - Note:
    - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Ignore Tax Withholding Threshold
  - Checkbox
  - is used to bypass the configured tax withholding threshold
  - When checked, the system applies tax withholding without validating whether the transaction amount meets the defined threshold
- Edit Tax Withholding Entries
  - Checkbox
  - When checked, the system shall allow the user to manually edit the Tax Withholding Entries table.
- Tax Withholding Entries
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - Tax Withholding Category
      - Label field (read only)
      - Displays the Tax Withholding Category
      - Note: It’s fetched from the selected “Tax Withholding Category”
    - Tax Withholding Group
      - Label field (read only)

<!-- page 391 -->
  - Displays the Tax Withholding Group
  - Note: It’s fetched from the selected “Tax Withholding Category”
- Base Taxable Amount
  - Text input field.
  - To enter the base amount on which the tax withholding is calculated
  - Optional
  - Accept integers and decimal numbers only
  - Maximum length: 100 characters.
  - Once the maximum length is reached, further input is prevented.
  - Note: It’s fetched from the selected “Tax Withholding Category”
  - Note:
    - If the “Edit Tax Withholding Entries = 1”
      - This field can be edited by the user (Editable)
    - If the “Edit Tax Withholding Entries = 0”
      - This field become read-only
- Tax Rate
  - Text input field.
  - To enter the tax withholding rate applied to the base taxable amount
  - Optional
  - Accept integers and decimal numbers only
  - Maximum length: 100 characters.
  - Once the maximum length is reached, further input is prevented.
  - Note: It’s fetched from the selected “Tax Withholding Category”
  - Note:
    - If the “Edit Tax Withholding Entries = 1”
      - This field can be edited by the user (Editable)
    - If the “Edit Tax Withholding Entries = 0”
      - This field become read-only
- Base Tax Withheld
  - Label field (read only)
  - Displays the tax amount withheld based on the base taxable amount and applicable tax rate
  - Note: It’s fetched from the selected “Tax Withholding Category”
- Taxable Document Name
  - Searchable DDL
  - links the DocTypes based only on the DocType selected in the Taxable Document Type field
  - To select the name or identifier of the document against which the tax withholding is applied
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values
  - Note:

<!-- page 392 -->
    - If the “Edit Tax Withholding Entries = 1”
      - This field can be edited by the user (Editable)
    - If the “Edit Tax Withholding Entries = 0”
      - This field become read-only
- Setting
  - When clicked, a pop up appears contains the following options :
    - Rearranging table columns using drag and drop functionality.
      - Users can click and hold a column header , then drag and drop it into the desired position within the table.
    - Column width
      - Text input field
      - For entering or edit the column width
      - Accepts numbers only
      - Minimum length: 1 character.
      - Maximum length: 3 characters.
      - Default value = 3
    - Add / Remove columns
      - Button
      - For adding or removing columns from the table
      - When clicked, a pop-up appears containing all available table columns with their corresponding checkboxes.
      - These columns are: Column Name Tax Withholding Category Tax Withholding Group Base Taxable Amount Tax Rate Base Tax Withheld Taxable Document Name Company Party Type Party Tax ID Taxable Document Type

<!-- page 393 -->

**Taxable Date**

**Currency**

**Exchange Rate**

**Under Withheld Reason** **[HIDDEN]**

**Lower Deduction Certificate** **[HIDDEN]**

**Withholding Document Type**

**Withholding Document Name**

**Withholding Date**

**Status**
      - Users can show or hide columns by selecting or deselecting the related checkbox.
    - “Update” button
      - Button
      - For save any changes or updates made by the user
      - When clicked, any modifications made by the user will be saved
    - “Reset to default” button
      - Button
      - To reset all modifications to their default values.
      - When clicked, any modifications made by the user will be reset to their default values.
  - Note: when a row is selected , an action bar appears showing the following actions:
    - Delete row
      - Button
      - To delete a specific row or multiple rows
      - When clicked, the selected item group(s) will be deleted
- Edit Row
  - Clickable icon
  - Users can edit and view non displayed fields in the table.
  - When clicked , a pop up appears containing the following fields: Field Name Options

**Company**
        - Searchable DDL
        - Link “Company” doctype
        - To select the company associated with the Tax

<!-- page 394 -->

**Withholding Entry**
- Single selection
- Optional
- Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Note:
  - If the “Edit Tax Withholding Entries = 1”
    - This field can be edited by the user (Editable)
  - If the “Edit Tax Withholding Entries = 0”
    - This field become read-only

**Party Type**
- Label field (read only)
- Displays the type of party associated with the Tax Withholding Entry

**Party**
- Label field (read only)
- Displays the party associated with the Tax Withholding Entry

**Tax ID**
- Label field (read only)
- Displays the Tax Identification Number of the party

**Tax Withholding Category**
- Label field (read only)
- Displays the Tax Withholding Category
- Note: It’s fetched from the selected “Tax Withholding Category”

**Tax Withholding Group**
- Label field (read only)
- Displays the Tax Withholding Group

<!-- page 395 -->
- Note: It’s fetched from the selected “Tax Withholding Category”

**Base Taxable Amount**
- Text input field.
- To enter the base amount on which the tax withholding is calculated
- Optional
- Accept integers and decimal numbers only
- Maximum length: 100 characters.
- Once the maximum length is reached, further input is prevented.
- Note:
  - If the “Edit Tax Withholding Entries = 1”
    - This field can be edited by the user (Editable)
  - If the “Edit Tax Withholding Entries = 0”
    - This field become read-only

**Tax Rate**
- Text input field.
- To enter the tax withholding rate applied to the base taxable amount
- Optional
- Accept integers and decimal numbers only
- Maximum length: 100 characters.
- Once the maximum length is reached, further input is prevented.
- Note: It’s fetched from the selected “Tax Withholding Category”
- Note:
  - If the “Edit Tax Withholding Entries = 1”
    - This field can be

<!-- page 396 -->

**edited by the user**

**(Editable)**
  - If the “Edit Tax Withholding Entries = 0”
    - This field become read-only

**Base Tax Withheld**
- Label field (read only)
- Displays the tax amount withheld based on the base taxable amount and applicable tax rate

**Taxable Document Type**
- Searchable DDL
- Link the following “Doctypes”
  - Purchase Invoice
  - Sales Invoice
  - Payment Entry
  - Journal Entry
- To select the type of document against which the tax withholding is applied
- Single selection
- Optional
- If the field is left empty an error message appears
- Note:
  - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Note:
  - If the “Edit Tax Withholding Entries = 1”
    - This field can be edited by the user (Editable)
  - If the “Edit Tax Withholding Entries = 0”
    - This field become read-only

<!-- page 397 -->

**Taxable Document Name**
- Searchable DDL
- links the DocTypes based only on the DocType selected in the Taxable Document Type field
- To select the name or identifier of the document against which the tax withholding is applied
- Single selection
- Optional
- Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Note:
  - If the “Edit Tax Withholding Entries = 1”
    - This field can be edited by the user (Editable)
  - If the “Edit Tax Withholding Entries = 0”
    - This field become read-only

**Taxable Date**
- Label field (read only)
- Displays the date on which the taxable transaction occurred

**Currency**
- Label field (read only)
- Displays the currency used for the Tax Withholding Entry

**Exchange Rate**
- Label field (read only)
- Displays the exchange rate used to convert the Tax Withholding Entry amount from the transaction currency to the company currency

**Under Withheld Reason** **[HIDDEN]**
- **[HIDDEN]** Label field (read only)
- **[HIDDEN]** Displays the reason for withholding an amount lower

<!-- page 398 -->

**than the applicable tax** **[HIDDEN]**

**withholding amount** **[HIDDEN]**

**Lower Deduction Certificate** **[HIDDEN]**
- **[HIDDEN]** Label field (read only)
- **[HIDDEN]** Displays the certificate that authorizes a lower tax deduction or withholding amount

**Withholding Document Type**
- Searchable DDL
- Link the following “Doctypes”
  - Purchase Invoice
  - Sales Invoice
  - Payment Entry
  - Journal Entry
- To select type of document from which the tax withholding amount is deducted
- Note:
  - If the “Edit Tax Withholding Entries = 1”
    - This field can be edited by the user (Editable)
  - If the “Edit Tax Withholding Entries = 0”
    - This field become read-only

**Withholding Document Name**
- Searchable DDL
- links the DocTypes based only on the DocType selected in the Withholding Document Type field
- To select the name or identifier of the document from which the tax withholding amount is deducted
- Note:
  - If the “Edit Tax Withholding Entries = 1”
    - This field can be edited by the user (Editable)
  - If the “Edit Tax Withholding Entries = 0”

<!-- page 399 -->
          - This field become read-only

**Withholding Date**
      - Label field (read only)
      - Displays the date on which the tax withholding was applied or recorded

**Status**
      - Label field (read only)
      - Displays the current status of the Tax Withholding Entry
      - It displays one of the following values:
        - Settled
        - Under Withheld
        - Over Withheld
        - Duplicate
        - Cancelled

**Created By Migration** **[HIDDEN]**
      - **[HIDDEN]** Checkbox icon (read only)
      - **[HIDDEN]** Indicates whether the Tax Withholding Entry was created through a data migration process.
  - Add Row
    - Button
    - To add a new row in the table
    - When clicked, a new row is added to the table.

**Post**
- The Tax Withholding Details is successfully saved.

**Conditions**
- If invalid or incomplete data is entered, the corresponding error message will be displayed for each field.

# Use case 4 - More Info Tab

<!-- page 400 -->

**More Info Tab**

**Use case ID**

**4**

**Use  case**

**More Info Tab**

**Name**

**Descriptions**

**The user can continue the creation process and enter the More Info**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Journal Entry from sidebar
- Click on Add Journal Entry button
- Click on More Info Tab

**Main Flow**

**-**

**Components**
- Reference
  - It contains the following fields
    - Bill No
      - Text input field
      - To Specify the bill or external document number associated with the journal entry.
      - Optional
    - Bill date
      - Date calendar picker
      - Specifies the date of the referenced bill or document.
      - Optional
    - Due date
      - Date calendar picker
      - Specifies the due date of the referenced bill or document.
      - Optional
    - Inter Company Journal Entry Reference
      - Label field
      - Links the journal entry to the corresponding inter-company journal entry.
      - Note: it appears only when Entry Type = Inter Company Journal Entry
    - Process Deferred Accounting
      - Label field
      - Displays the deferred accounting process associated with the journal entry
    - Reversal Of
      - Label field
      - Displays the journal entry that is being reversed
    - **[HIDDEN]** Payment Order
      - **[HIDDEN]** Label field
      - **[HIDDEN]** Displays the payment order associated with the journal entry

<!-- page 401 -->
    - Stock Entry
      - Label field
      - Links the journal entry to the related stock entry document.
- Print Settings
  - It contains the following fields:
    - Pay To / Recd From
      - Text input field
      - To Specify the payee or payer name displayed on the printed journal entry.
      - Optional
      - It has a default value “Party Name” if specified
    - **[HIDDEN]** Letter Head  (Remove)
      - **[HIDDEN]** Searchable DDL
      - **[HIDDEN]** Link “Letter Head” doctype
      - **[HIDDEN]** Single selection
      - **[HIDDEN]** optional,
      - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - **[HIDDEN]** Total Amount Currency (Hidden)
      - **[HIDDEN]** Label field
      - **[HIDDEN]** Displays the currency of the total amount on the printed document.
    - **[HIDDEN]** Total Amount  (Hidden)
      - **[HIDDEN]** Label field
      - **[HIDDEN]** Displays the total amount of the Payment Entry.
    - **[HIDDEN]** Total Amount In Words  (Hidden)
      - **[HIDDEN]** Label field
      - **[HIDDEN]** Displays the total amount in words on the printed document.
- Write Off
  - Note: it appears only when Entry Type = Write Off Entry
  - It contains the following fields:
    - Write Off Based On
      - DDL
      - It contains the following values:
        - Accounts Receivable
        - Accounts Payable
      - Single selection
      - Optional
    - Write Off Amount
      - Text input field
      - To enter the write off amount
      - Optional
      - Accepts numbers only.
      - Note:
        - If the entered value is greater than 0 ,
          - The system sets it as the maximum outstanding balance allowed per invoice.

<!-- page 402 -->
          - This limit is applied when the user clicks “Get Outstanding Invoices”, and only invoices within the defined outstanding balance limit are fetched into the Accounting Entries table.
        - If the entered value = 0 or left empty ,
          - It fetches all invoices
    - Get outstanding Invoices
      - Button
      - When clicked,
        - it retrieves all outstanding invoices for the selected party to allocate against them.
- Additional Info
  - It contains the following fields:
    - Is Opening
      - DDL
      - whether the Journal Entry is created to record opening balances.
      - It contains the following values
        - Yes
        - No
      - Single selection
      - Optional
      - When set to Yes, the entry is treated as an opening entry, otherwise, it is treated as a regular Journal Entry
    - Finance Book
      - Label field
      - Displays the Finance Book to which the Journal Entry belongs
    - **[HIDDEN]** From template (Hidden)
      - **[HIDDEN]** Searchable DDL
      - **[HIDDEN]** Link “Journal Entry Template” doctype
      - **[HIDDEN]** To select the Journal Entry Template from which the Journal Entry was created
      - **[HIDDEN]** Single selection
      - **[HIDDEN]** Optional
      - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values
    - **[HIDDEN]** Title  (Hidden)
      - **[HIDDEN]** Text input field
      - **[HIDDEN]** Allows the user a descriptive title for the Journal Entry to help identify and distinguish the transaction
      - **[HIDDEN]** Accepts letters, numbers, and special characters.
      - **[HIDDEN]** Minimum length: 2 characters.
      - **[HIDDEN]** Maximum length: 100 characters.
      - **[HIDDEN]** Once the maximum limit is reached, further input will be prevented.
      - **[HIDDEN]** An error message will appear if the entered text is less than the minimum length.
      - **[HIDDEN]** An error message will appear if invalid data is entered.

<!-- page 403 -->
  - Custom Remark
    - Checkbox
    - Indicates that a custom remark will be used instead of the system-generated remark.
    - When checked, the system shall allow the user to enter custom remarks for the Journal Entry. And the “Remarks” field becomes enabled
  - Remarks
    - Text area
    - Allows the user to enter additional remarks or notes related to the journal entry.
    - Accepts letters, numbers, and special characters.
    - Minimum length: 3 characters.
    - Maximum length: 500 characters.
    - Once the maximum limit is reached, further input will be prevented.
    - An error message will appear if the entered text is less than the minimum length.
    - An error message will appear if invalid data is entered.
    - Note: it becomes enabled and can be edited only when the “Custom Remark = 1”
  - Mode of payment
    - Searchable DDL
    - Link “Mode of Payment” doctype
    - To select the payment method associated with the Journal Entry
    - Single selection
    - optional,
    - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
  - Party Not Required
    - Checkbox
    - indicates that a Party is not required for the Journal Entry.
    - When checked, the system allows the Journal Entry to be created without specifying a Customer, Supplier, Employee, or other Party

**Post**
- The More Info Details is successfully saved.

**Conditions**
- If invalid or incomplete data is entered, the corresponding error message will be displayed for each field.

# Use case 5 - Journal Entry Details

<!-- page 404 -->

**Journal Entry Details**

**Use case ID**

**5**

**Use case Name  Journal Entry Details**

**Descriptions**

**The user can view / edit the Journal Entry details.**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Journal Entry from sidebar
- Click on “Journal Entry  ID” from the table

**Main Flow**

**-**

**Components**
- Label / Input fields
  - Note:
    - If the Journal Entry status is Submitted or Cancelled:
      - The system retrieves and displays the fields as labels for viewing purposes only. These fields are read-only and cannot be edited.
    - If the Journal Entry status is Draft:
      - The system retrieves and displays the fields as input fields, allowing the user to modify the Journal Entry data.
  - The system retrieves and displays the data entered during creation, allowing users to view or update it as needed in addition to the following:
- Fixed Page Actions
  - The following action buttons are fixed and consistently displayed at the top of all (Journal Entry details) pages to provide a quick access to common functions:
    - View Ledger
      - Button
      - It appears only after Submitting
      - When clicked, it navigates the user to “General Ledger” report
    - Actions
      - DDl
      - It contains the following actions
        - Reverse Journal Entry
          - Button
          - It appears only after Submitting
          - When clicked,
            - The system navigates the user to a new Journal Entry creation screen and automatically populates the new Journal Entry with data from the selected Journal Entry.
            - And create a reverse Journal Entry by swapping the debit and credit amounts for all accounting entries, in other words, each Debit amount in the original Journal Entry

<!-- page 405 -->

**shall become a Credit amount in the new**

**Journal Entry, and each Credit amount shall**

**become a Debit amount**
    - Assign
    - Attachment
    - Tags
    - Share
    - Print
    - Delete
      - It appears only when the Journal Entry status = Draft / Cancelled
      - When clicked,
        - A confirmation message is displayed to the user whether they want to delete this Journal Entry
        - Upon clicking the “Yes” button:
          - If other Journal Entry is Amended from this Journal Entry
            - A warning message appears indicating that this Journal Entry cannot be deleted until the user deletes all doctypes related to it.
            - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
          - if the Journal Entry is linked to other transactions,
            - a message is displayed informing the user that the linked transactions must be deleted before the Journal Entry can be deleted.
            - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
          - If the Journal Entry isn’t linked to another doctype
            - The Journal Entry is deleted successfully.
- Connections
  - Bank Transaction
    - Button
    - Link “Bank Transaction” docktype

**Post**
- The Journal Entry data has been successfully modified and saved.

**Conditions**
- Entering incorrect or incomplete data will display the corresponding error message for each field.

<!-- page 406 -->

**Exchange Rate**
- The behavior of the Exchange Rate field depends on the Exchange Rate configuration in Accounts Settings
- Case 1:
  - Exchange Rate Fetching Rule is configured
    - If an Exchange Rate Fetching Rule is defined in Accounts Settings, the system shall automatically fetch the exchange rate based on the configured rule and populate the Exchange Rate field.
    - In this case Exchange Rate field is Label Field (read only)
    - Note:
      - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
      - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
- Case 2:
  - No Exchange Rate Found
    - If no exchange rate is found based on the configured fetching rule, the system shall evaluate the Action if No Exchange Rate Found field in Accounts Settings.
      - Prompt User to Add Exchange Rate:
        - The system shall prompt the user to create a new Exchange Rate record before proceeding.
        - Once the Exchange Rate is created, the system shall populate the Exchange Rate field.
        - The Exchange Rate field shall remain read-only
        - Note:
          - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
          - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
      - Use API to Get Exchange Rate
        - The system shall automatically create and retrieve the Exchange Rate using the configured external API.
        - After the Exchange Rate is successfully created, the system shall populate the Exchange Rate field.
        - The Exchange Rate field shall remain read-only.
        - Note:
          - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
          - Any manually entered Exchange Rate by an

<!-- page 407 -->

**authorized user shall override the automatically**

**fetched Exchange Rate and shall be considered**

**the effective value for the transaction.**

<!-- TEST CASES -->

# Test cases - Journal Entry (executed 2026-11-26 on test.hr.azzrk.com)

> 167 cases: 158 passed, 9 failed. Red (hidden) items are tested as "must not be shown".

## Add and submit, every common entry kind (42 cases: 42 passed, 0 failed) - `Shamel/je-add.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| JE-TC-J01-1 | Journal Entry: Save creates the entry | Passed |  |
| JE-TC-J01-2 | Journal Entry: the stored data matches what was typed | Passed |  |
| JE-TC-J01-3 | Journal Entry: Submit works | Passed |  |
| JE-TC-J01-4 | Journal Entry: the ledger is posted and balanced | Passed |  |
| JE-TC-J02-1 | With a customer: Save creates the entry | Passed |  |
| JE-TC-J02-2 | With a customer: the stored data matches what was typed | Passed |  |
| JE-TC-J02-3 | With a customer: Submit works | Passed |  |
| JE-TC-J02-4 | With a customer: the ledger is posted and balanced | Passed |  |
| JE-TC-J02-5 | The customer is stored on the receivable row | Passed |  |
| JE-TC-J03-1 | With a supplier: Save creates the entry | Passed |  |
| JE-TC-J03-2 | With a supplier: the stored data matches what was typed | Passed |  |
| JE-TC-J03-3 | With a supplier: Submit works | Passed |  |
| JE-TC-J03-4 | With a supplier: the ledger is posted and balanced | Passed |  |
| JE-TC-J04-1 | Bank Entry: Save creates the entry | Passed |  |
| JE-TC-J04-2 | Bank Entry: the stored data matches what was typed | Passed |  |
| JE-TC-J04-3 | Bank Entry: Submit works | Passed |  |
| JE-TC-J04-4 | Bank Entry: the ledger is posted and balanced | Passed |  |
| JE-TC-J05-1 | Cash Entry: Save creates the entry | Passed |  |
| JE-TC-J05-2 | Cash Entry: the stored data matches what was typed | Passed |  |
| JE-TC-J05-3 | Cash Entry: Submit works | Passed |  |
| JE-TC-J05-4 | Cash Entry: the ledger is posted and balanced | Passed |  |
| JE-TC-J06-1 | Contra Entry: Save creates the entry | Passed |  |
| JE-TC-J06-2 | Contra Entry: the stored data matches what was typed | Passed |  |
| JE-TC-J06-3 | Contra Entry: Submit works | Passed |  |
| JE-TC-J06-4 | Contra Entry: the ledger is posted and balanced | Passed |  |
| JE-TC-J07-1 | Three rows: Save creates the entry | Passed |  |
| JE-TC-J07-2 | Three rows: the stored data matches what was typed | Passed |  |
| JE-TC-J07-3 | Three rows: Submit works | Passed |  |
| JE-TC-J07-4 | Three rows: the ledger is posted and balanced | Passed |  |
| JE-TC-J08-1 | Multi currency (USD customer): Save creates the entry | Passed |  |
| JE-TC-J08-2 | Multi currency (USD customer): the stored data matches what was typed | Passed |  |
| JE-TC-J08-3 | Multi currency (USD customer): Submit works | Passed |  |
| JE-TC-J08-4 | Multi currency (USD customer): the ledger is posted and balanced | Passed |  |
| JE-TC-J09-1 | Edit Row: Save creates the entry | Passed |  |
| JE-TC-J09-2 | Edit Row: the stored data matches what was typed | Passed |  |
| JE-TC-J09-3 | Edit Row: Submit works | Passed |  |
| JE-TC-J09-4 | Edit Row: the ledger is posted and balanced | Passed |  |
| JE-TC-J09-5 | The row remark typed in Edit Row is stored | Passed |  |
| JE-TC-J10-1 | Quick Entry creates the entry | Passed |  |
| JE-TC-J10-2 | Quick Entry stores amount, both accounts and the remark | Passed |  |
| JE-TC-J10-3 | Quick Entry document submits | Passed |  |
| JE-TC-J11-1 | An unbalanced entry is not saved and a clear message is shown | Passed |  |

## A - Add screen: fields, rows, rules, Quick Entry (47 cases: 43 passed, 4 failed) - `Shamel/je-a-form.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| JE-TC-A01-1 | Company is shown and mandatory | Passed |  |
| JE-TC-A01-2 | Series is mandatory and filled | Passed |  |
| JE-TC-A01-3 | Entry Type defaults to Journal Entry and is shown translated | FAILED | JE-04 |
| JE-TC-A01-4 | Posting Date defaults to the current date and is mandatory | Passed |  |
| JE-TC-A01-5 | Multi Currency is a switch, off by default | Passed |  |
| JE-TC-A01-6 | Consider for Tax Withholding is hidden for a Journal Entry | Passed |  |
| JE-TC-A01-7 | Is System Generated and Amended From are hidden on a new entry | Passed |  |
| JE-TC-A01-8 | Hidden (red) Periodic Accounting fields are not shown | Passed |  |
| JE-TC-A01-9 | Hidden (red) Auto Repeat is not shown | Passed |  |
| JE-TC-A01-10 | Total Debit, Total Credit and Difference are read only labels | Passed |  |
| JE-TC-A01-11 | Reference Number and Reference Date are optional for a Journal Entry | Passed |  |
| JE-TC-A01-12 | Clearance Date is hidden before submit | Passed |  |
| JE-TC-A01-13 | Quick Entry is offered before Save | Passed |  |
| JE-TC-A01-14 | Entry Type offers the 17 SRS values (no Periodic Accounting Entry) | Passed |  |
| JE-TC-A02-1 | Bank Entry makes Reference Number and Date mandatory | Passed |  |
| JE-TC-A02-2 | Bank Entry without a reference is not saved and the fields show errors | Passed |  |
| JE-TC-A02-3 | إشعار دائن: Consider for Tax Withholding is shown | Passed |  |
| JE-TC-A02-4 | إشعار مدين: Consider for Tax Withholding is shown | Passed |  |
| JE-TC-A02-5 | قيد نقد: Consider for Tax Withholding is hidden | Passed |  |
| JE-TC-A03-1 | Table columns: No., Account, Party Type, Party, Debit, Credit | Passed |  |
| JE-TC-A03-3 | Party is disabled until a Party Type is chosen | Passed |  |
| JE-TC-A03-4 | Party lists records of the chosen Party Type | Passed |  |
| JE-TC-A03-5 | Debit accepts numbers only | Passed |  |
| JE-TC-A03-6 | Debit accepts decimals | Passed |  |
| JE-TC-A03-7 | Debit rejects a negative value | Passed |  |
| JE-TC-A03-8 | Debit and Credit cannot both be entered on one row in the table (the other box is locked) | Passed |  |
| JE-TC-A03-9 | Edit Row also prevents Debit and Credit together on one row | Passed |  |
| JE-TC-A04-1 | Totals and Difference follow the rows (70 / 0 / 70) | Passed |  |
| JE-TC-A04-2 | Make Difference Entry button appears while Difference is not zero | Passed |  |
| JE-TC-A04-3 | It adds a balancing row (credit 70) and the Difference becomes zero | Passed |  |
| JE-TC-A04-4 | The button disappears when the entry is balanced | Passed |  |
| JE-TC-A04-5 | An unbalanced entry cannot be saved | Passed |  |
| JE-TC-A05-1 | An untouched form is not saved | Passed |  |
| JE-TC-A05-2 | A row without an Account is refused with an error | Passed |  |
| JE-TC-A05-3 | Saving without any accounting row shows an error | Passed |  |
| JE-TC-A06-1 | Edit Row shows the SRS fields | Passed |  |
| JE-TC-A06-2 | Account Currency and company currency amounts are hidden without Multi Currency | Passed |  |
| JE-TC-A06-4 | Reference Type offers the visible SRS doctypes | Passed |  |
| JE-TC-A06-5 | Hidden (red) reference types are not offered (Expense Claim, Loan, Payroll, Employee Advance, Invoice Discounting, Fees, FnF) | Passed |  |
| JE-TC-A06-6 | Table settings has Column width, Add / Remove columns, Update and Reset to default | FAILED | JE-06 |
| JE-TC-A06-7 | Column width accepts numbers only | FAILED | JE-05 |
| JE-TC-A06-8 | Column width stops at 3 characters | FAILED | JE-05 |
| JE-TC-A06-9 | Add / Remove columns lists the SRS columns | Passed |  |
| JE-TC-A07-1 | Pop-up has Amount, Debit Account, Credit Account, Date, Remark, Series (all mandatory) and Save | Passed |  |
| JE-TC-A07-2 | Saving it empty shows an error for the fields | Passed |  |
| JE-TC-A07-3 | Amount accepts integers and decimals only | Passed |  |
| JE-TC-A07-4 | Amount stops at 100 characters | Passed |  |

## B - References, multi currency, More Info, write off, tax withholding (32 cases: 30 passed, 2 failed) - `Shamel/je-b-tabs.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| JE-TC-B01-1 | Reference Name is chosen from the doctype selected in Reference Type | Passed |  |
| JE-TC-B01-2 | The entry with a reference saves | Passed |  |
| JE-TC-B01-3 | Reference type, name and due date are stored | Passed |  |
| JE-TC-B01-4 | Submit reduces the invoice balance by 100 | Passed |  |
| JE-TC-B02-1 | With Multi Currency the columns become Debit / Credit in Account Currency | Passed |  |
| JE-TC-B02-2 | Edit Row shows Account Currency, Exchange Rate and the company currency amounts | Passed |  |
| JE-TC-B02-3 | Exchange Rate 3.75 is fetched from Currency Exchange | Passed |  |
| JE-TC-B02-4 | An authorised user can change the rate | Passed |  |
| JE-TC-B02-5 | The entry saves with the manual rate | Passed |  |
| JE-TC-B02-6 | Stored: rate 3.8, credit 10 USD = 38 SAR | Passed |  |
| JE-TC-B03-1 | More Info shows the SRS fields | Passed |  |
| JE-TC-B03-2 | Hidden (red) Payment Order is not shown | FAILED | JE-02 |
| JE-TC-B03-3 | Hidden (red) Letter Head, Total Amount, From Template and Title are not shown | Passed |  |
| JE-TC-B03-4 | Inter Company Reference and the Write Off section are hidden for a Journal Entry | Passed |  |
| JE-TC-B03-5 | Remarks is read only while Custom Remark is off | Passed |  |
| JE-TC-B03-6 | Custom Remark enables Remarks | Passed |  |
| JE-TC-B03-7 | Remarks shorter than 3 characters are refused with an error | Passed |  |
| JE-TC-B03-8 | Remarks stops at 500 characters | Passed |  |
| JE-TC-B03-9 | The entry saves with the More Info values | Passed |  |
| JE-TC-B03-10 | Bill No, Bill Date, Due Date, Pay To, Mode of Payment and the remark are stored | Passed |  |
| JE-TC-B04-1 | Write Off Entry shows Write Off Based On, Write Off Amount and Get Outstanding Invoices | Passed |  |
| JE-TC-B04-2 | Based On offers Accounts Receivable and Accounts Payable | Passed |  |
| JE-TC-B04-3 | Write Off Amount accepts numbers only | Passed |  |
| JE-TC-B04-4 | Get Outstanding Invoices adds the open invoices within the limit to the accounting entries | FAILED | JE-01 |
| JE-TC-B05-1 | Turning it on shows Tax Withholding Category (mandatory) and the Tax Withholding tab | Passed |  |
| JE-TC-B05-2 | Saving without the category is refused | Passed |  |
| JE-TC-B05-3 | The tab offers Tax Withholding Group, Ignore Threshold and Edit Entries | Passed |  |
| JE-TC-B05-4 | Hidden (red) withholding fields are not shown | Passed |  |
| JE-TC-B05-5 | The entry saves with tax withholding | Passed |  |
| JE-TC-B05-6 | A withholding entry of 5% = 50 is calculated | Passed |  |
| JE-TC-B05-7 | The Tax Withholding Entries table shows category, rate and amounts | Passed |  |
| JE-TC-B05-8 | Submit posts the withholding of 50 to the withholding account | Passed |  |

## C - List, details, reverse, cancel, amend, delete, bulk actions (46 cases: 43 passed, 3 failed) - `Shamel/je-c-lifecycle.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| JE-TC-C01-1 | List shows ID, Title, Status, Company and Posting Date | Passed |  |
| JE-TC-C01-3 | A new draft is listed as Draft and its Title is the party of the first row | Passed |  |
| JE-TC-C01-4 | Clicking the ID opens the details | Passed |  |
| JE-TC-C01-5 | Add Journal Entry opens the add screen | Passed |  |
| JE-TC-C01-6 | Without a party the Title is the account of the first row | Passed |  |
| JE-TC-C02-1 | Draft offers Submit and Delete, and no Ledger, Cancel or Amend | Passed |  |
| JE-TC-C02-2 | Draft fields are editable | Passed |  |
| JE-TC-C02-3 | Quick Entry is not offered after Save | Passed |  |
| JE-TC-C02-4 | Edited amounts are saved on the draft | Passed |  |
| JE-TC-C02-5 | The new amounts show after reopening | Passed |  |
| JE-TC-C02-6 | A row can be added to a draft | Passed |  |
| JE-TC-C02-7 | A row can be deleted from a draft | Passed |  |
| JE-TC-C03-1 | Submitted offers View Ledger, Actions and Cancel; no Submit, Delete or Quick Entry | Passed |  |
| JE-TC-C03-2 | Submitted fields are read only | Passed |  |
| JE-TC-C03-3 | Clearance Date is shown after submit | Passed |  |
| JE-TC-C03-4 | Connections offers Bank Transaction | Passed |  |
| JE-TC-C03-5 | View Ledger opens the General Ledger report filtered on this entry | Passed |  |
| JE-TC-C03-6 | Actions offers Reverse Journal Entry | Passed |  |
| JE-TC-C03-7 | Reverse opens a new entry with debit and credit swapped | Passed |  |
| JE-TC-C03-9 | The reverse entry is saved and linked through Reversal Of | Passed |  |
| JE-TC-C03-10 | More Info of the reverse entry shows Reversal Of | Passed |  |
| JE-TC-C04-1 | Cancel cancels the entry | Passed |  |
| JE-TC-C04-2 | The ledger entries are reversed | Passed |  |
| JE-TC-C04-3 | Cancelled offers Amend and Delete, not Cancel or Submit | Passed |  |
| JE-TC-C04-4 | Cancelled fields are read only | Passed |  |
| JE-TC-C04-5 | View Ledger is not offered on a cancelled entry (SRS: only after submit) | Passed |  |
| JE-TC-C04-7 | Amend creates a draft linked through Amended From with the same data | Passed |  |
| JE-TC-C04-8 | The new entry shows Amended From on the details | Passed |  |
| JE-TC-C04-9 | Amended From is clickable and opens the original | Passed |  |
| JE-TC-C04-10 | Delete asks for confirmation | Passed |  |
| JE-TC-C04-11 | An entry that has an amendment cannot be deleted | Passed |  |
| JE-TC-C04-12 | The refusal names the linked entry as a link | Passed |  |
| JE-TC-C05-1 | Delete on a draft asks for confirmation | Passed |  |
| JE-TC-C05-2 | Answering No keeps the entry | Passed |  |
| JE-TC-C05-3 | Answering Yes deletes the draft | Passed |  |
| JE-TC-C05-4 | The user returns to the list | Passed |  |
| JE-TC-C05-5 | A cancelled entry without links can be deleted | FAILED | Question 1 (setting) |
| JE-TC-C06-1 | A selected draft offers Edit, Export, Assign, Clear Assignment, Tags, Print, Submit and Delete | Passed |  |
| JE-TC-C06-2 | Bulk Edit does not offer the hidden (red) Letter Head | FAILED | JE-03 |
| JE-TC-C06-3 | Bulk Edit updates a draft | Passed |  |
| JE-TC-C06-4 | Bulk Submit submits the selected draft | Passed |  |
| JE-TC-C06-5 | A submitted entry offers Cancel and neither Submit nor Delete | Passed |  |
| JE-TC-C06-6 | Bulk Edit of a submitted entry shows a "cannot be modified" error and changes nothing | Passed |  |
| JE-TC-C06-7 | Bulk Cancel cancels the selected entry | Passed |  |
| JE-TC-C06-8 | A cancelled entry offers Delete and neither Submit nor Cancel | Passed |  |
| JE-TC-C06-9 | Bulk Delete asks for confirmation then deletes | FAILED | Question 1 (setting) |
