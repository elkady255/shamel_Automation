# SRS Azzrk SHAMEL - Accounting module V1.0 - Part: Payment Entry

> Extract of `SRS-Azzrk-Shamel-Accounting-V.1.0.pdf` (PDF pages 325-371). The PDF is the source of truth.

## Hidden (red) items - first line of each red block

- Payment Order Status
- Account type
- Text input field
- Payment type
- Payment request
- Searchable DDL
- Payment request outstanding
- Label field
- Under Withheld Reason
- Lower Deduction Certificate
- Label field (read only)
- Created By Migration
- Checkbox icon (read only)
- Letter Head
- Payment Order
- Auto Repeat

## Index

- Use case 1 - Payment Entry List: page 325
- Use case 2 - Add Payment Entry: page 328


# Use case 1 - Payment Entry List

<!-- page 325 -->

**Payment Entry..........................................................................................................................................0**

**Payment Entry List............................................................................................................................................0**

**Add Payment Entry...........................................................................................................................................3**

**Payment Entry Details....................................................................................................................................41**

**Payment Entry**

**Payment Entry List**

**Use case ID**

**1**

**Use  case**

**Payment Entry List**

**Name**

**Descriptions**

**The user is able to view the list of payment Entries.**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Payment Entry from sidebar

**Main Flow**

**-**

**Components**
- Add Payment Entry
  - Button
  - For adding a new Payment Entry
  - When clicked, the user will be redirected to the “Add Payment Entry” screen.
- Payment Entry List
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - ID
      - It displays the Payment Entry ID
      - Clickable
      - When clicked, the user is navigated to the "Payment Entry Details” screen.
    - Status
      - It displays the Payment Entry status.
      - Displays one of the following values:
        - Draft
        - Submitted

<!-- page 326 -->
        - Cancelled
    - Payment Type
      - It displays the Payment Entry type
      - It displays one of the following values:
        - Receive
        - Pay
    - Posting Date
      - It displays the the date on which the Payment Entry is posted
    - Paid Amount
      - It displays the Paid Amount of the payment Entry
- Note: when a Payment Entry is selected , an action bar appears showing the following actions:
  - Edit
    - Button
    - When clicked , a popup appears containing the following fields.
      - Field
        - DDL
        - To select the field you want to edit
        - Link “Payment Entry” doctype
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
          - If the Payment Entry status is "submitted" or "Cancelled":
            - an error message is displayed informing the user that the Payment Entry cannot be modified.
  - Export
  - Assign to
  - Clear assignment
  - Add tags
  - Print
  - Submit
    - It appears only when the Payment Entry status = Draft.
    - If all required data is entered correctly and completely:
      - The Payment Entry is successfully submitted.
  - Cancel

<!-- page 327 -->
    - It appears only when the Payment Entry status = Submitted
    - When clicked,
      - The Payment Entry is canceled successfully.
      - And “Cancel” button changes to “Amend”
  - Delete
    - It appears only when the Payment Entry status = Draft / Cancelled
    - When clicked,
      - A confirmation message is displayed to the user whether they want to delete this Payment Entry
      - Upon clicking the “Yes” button:
        - If other Payment Entry is Amended from this Payment Entry
          - A warning message appears indicating that this Payment Entry cannot be deleted until the user deletes all doctypes related to it.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - if the Payment Entry is linked to other transactions,
          - a message is displayed informing the user that the linked transactions must be deleted before the Payment Entry can be deleted.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - If the Payment Entry isn’t linked to another doctype
          - The Payment Entry is deleted successfully.

**Post**
- Ability to add and view Payment Entry details.

**Conditions**
- Ability to Edit , Export , Assign to, Clear Assignment , Add Tags , Print , Delete

# Use case 2 - Add Payment Entry

<!-- page 328 -->

**Add Payment Entry**

**Use case ID**

**2**

**Use  case**

**Add Payment Entry**

**Name**

**Descriptions**

**The user can add a new Payment Entry.**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Payment Entry from sidebar
- Click on “Add Payment Entry” button

**Main Flow**

**-**

**Components**
- Series
  - DDL
  - Used to select the naming series that will be used to generate the Payment Entry ID automatically
  - Displays all series added to Payment Entry doctype
  - Mandatory.
  - Single selection
  - If the field is left empty an error message appears.
- Payment Type
  - DDL
  - To select the type of Payment Entry
  - It contains the following values:
    - Receive
    - Pay
    - Internal Transfer
  - Single selection
  - It has default value "Receive"
- **[HIDDEN]** Payment Order Status
  - **[HIDDEN]** Label field (read only)
  - **[HIDDEN]** Displays the status of the Payment Order associated with the Payment Entry, if applicable.
- Posting Date
  - Date calendar picker
  - To select the Payment Entry date
  - Default value = current date
  - Mandatory
  - If the field is left empty an error message appears.
- Company
  - Searchable DDL
  - Link “Company” doctype
  - To select the company for which the Payment Entry will be recorded
  - Single selection

<!-- page 329 -->
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Mode of Payment
  - Searchable DDL
  - Link “Mode of Payment” doctype
  - To select the payment method used for the transaction
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Payment From / To
  - Note:
    - It appears only if the Payment Type is set to Receive or Pay
    - It disappears only if the Payment Type is set to “Internal Transfer”
  - It contains the following fields:
    - Party Type
        - Searchable DDL
        - Link “Doctype”
        - Displays only the following doctypes:
          - Customer
          - Employee
          - Shareholder
          - Supplier
        - Single selection
        - Mandatory
        - If the field is left empty an error message appears
        - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
        - Note:
          - If the Payment Type is equal to “Pay”
            - The party type is set to “Supplier” by default
          - If the Payment Type is equal to “Receive”
            - The party type is set to “Customer” by default
    - Party
      - Searchable DDL
      - links the DocTypes based only on the DocType selected in the Party Type field
      - Single selection
      - Mandatory
      - If the field is left empty an error message appears.
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a

<!-- page 330 -->

**predefined list of values.**
- Party Name
  - Label field (read only)
  - It displays the party name based on the selected Party
  - Note: it’s fetched from the selected party
- Book advance payments in separate party account
  - Checkbox icon (read only)
  - It displays that the advance payments are posted to a separate advance account for the selected party
  - Note: it’s fetched from the Company Details
- Reconcile On Advance Payment Date
  - Checkbox icon (read only)
  - It indicates that the system shall reconcile the advance payment based on the advance payment date
  - Note: it’s fetched from the Company Details
- Consider for Tax Withholding
  - Checkbox
  - Note: it appears only when the Payment type is set to “Pay”, and Party is set to “Supplier”
  - When checked:
    - The payment transaction shall be considered for tax withholding
    - The “Tax Withholding Category” field is displayed
- Tax Withholding Category
  - Searchable DDL
  - Link “Tax Withholding Category” doctype
  - To select the payment method used for the transaction
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: it appears only when the “Consider for Tax Withholding = 1”
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Company Bank Account
  - Searchable DDL
  - Link “Account” doctype
  - It displays all accounts associated with the selected company  with the “Is Company Account” option enabled.
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
  - Note: it appears only when the “Party” field has a value
- Party Bank Account
  - Searchable DDL

<!-- page 331 -->
      - Link “Account” doctype
      - It displays all accounts associated with the selected Party  with the “Is Company Account” option disabled.
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
      - Note: it appears only when the “Party” field has a value
    - Contact
      - Searchable DDL
      - Link “Contact” doctype
      - It displays all contacts associated with the selected Party , whose Party Type = Customer or Shareholder or Supplier
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
      - Note: it’s displayed only when the Party Type = Customer or Shareholder or Supplier
      - Note: it has a default value “Primary Contact”
    - Email
      - Label field
      - It displays the party email
      - Note:
        - if the party Type is set to Customer or Shareholder or Supplier and a Party is selected
          - The Email is displayed and fetched from the Contact primary Email ID
        - If the Party Type is set to Employee and a party is selected
          - The Email is displayed and fetched from the selected Party Personal Email
- Accounts
  - It contains the following fields:
    - Account paid from
      - Searchable DDL
      - Link “Account” doctype
      - It displays only accounts with “Is Group” option is disabled
      - It displays accounts based on the following :
        - If the Payment Type = Receive
          - It displays only accounts with Account Type = Receivable when Party Type = Customer
          - It displays only accounts with Account Type = Payable when Party Type = Supplier or Employee
          - It displays only accounts with Account Type = Payable or Equity when Party Type = Shareholder

<!-- page 332 -->
    - If the Payment Type = Pay
      - It displays only accounts with Account Type = Cash or Bank when Party Type = Customer or Supplier or Employee
      - It displays only accounts with Account Type = Cash or Bank or Equity when Party Type = Shareholder
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears
  - Note:
    - If the Party Type = Customer
      - And there is a default account is defined for that customer
        - The system fetches the “Account Paid From” from the Customer’s Default Account and it can be edited
      - If no default account is defined for that customer
        - The system fetches the “Account Paid Form" from the company's Default Receivable Account and it can be edited
    - If the Party Type = Supplier
      - And there is a default account is defined for that supplier
        - The system fetches the “Account Paid From” from the Supplier’s Default Account and it can be edited
      - If no default account is defined for that supplier
        - The system fetches the “Account Paid Form" from the company's Default Payable Account and it can be edited
  - Note: it appears only when the Payment Type = Pay or Internal Transfer
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Paid From Account Type
  - Label field (read only)
  - Displays the type of the “Account Paid From”
  - Note: it’s fetched from the selected Account
- Account Currency (From)
  - Label field
  - It displays the account currency
  - Note: it’s fetched from the selected Account
- Account paid to
  - Searchable DDL
  - Link “Account” doctype
  - It displays only accounts with “Is Group” option is disabled

<!-- page 333 -->
      - It displays accounts based on the following :
        - If the Payment Type = Pay
          - It displays only accounts with Account Type = Receivable when Party Type = Customer
          - It displays only accounts with Account Type = Payable when Party Type = Supplier or Employee
          - It displays only accounts with Account Type = Payable or Equity when Party Type = Shareholder
        - If the Payment Type = Receive
          - It displays only accounts with Account Type = Cash or Bank when Party Type = Customer or Supplier or Employee
          - It displays only accounts with Account Type = Cash or Bank or Equity when Party Type = Shareholder
      - Single selection
      - Mandatory
      - If the field is left empty an error message appears
      - Note: it appears only when the Payment Type = Receive or Internal Transfer
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Paid To Account Type
      - Label field (read only)
      - Displays the type of the “Account Paid To”
      - Note: it’s fetched from the selected Account
    - Account Currency (To)
      - Label field
      - It displays the account currency
      - Note: it’s fetched from the selected Account
- Amount
  - It contains the following fields:
    - Paid Amount
      - Text input field.
      - To enter the Paid Amount in source currency
      - It appears only when both “Account Paid From” and “Account Paid To” are set
      - Mandatory.
      - Accept integers and decimal numbers only.
      - Maximum length: 100 characters.
      - Once the maximum length is reached, further input is prevented.
      - If the field is left empty an error message appears.
      - Note:
        - If the “Paid Amount” is left empty and Received Amount is set,
          - It’s calculated as "Received Amount Х Target Exchange Rate / Source Exchange Rate” by the

<!-- page 334 -->

**system.**
    - If the “Paid Amount” is set by the user
      - No calculation is performed by the system
- Paid Amount After Tax
  - Label field (read only)
  - Displays the paid amount after deducting the applicable tax withholding
- Source Exchange Rate
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
            - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be

<!-- page 335 -->

**allowed to modify its value**
        - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
    - Use API to Get Exchange Rate
      - The system shall automatically create and retrieve the Exchange Rate using the configured external API.
      - After the Exchange Rate is successfully created, the system shall populate the Exchange Rate field.
      - The Exchange Rate field shall remain read-only.
      - Note:
        - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
        - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
- Paid Amount (Company Currency)
  - Label field (read only)
  - Displays the paid amount converted into the company's currency using the source exchange rate
- Paid Amount After Tax Company Currency
  - Label field (read only)
  - Displays the the paid amount after tax converted into the company's currency
- Received Amount
  - Text input field.
  - To enter the Received Amount in target currency
  - It’s calculated based on the Target Exchange Rate
  - Mandatory.
  - Accept integers and decimal numbers only.
  - Maximum length: 100 characters.
  - Once the maximum length is reached, further input is prevented.
  - If the field is left empty an error message appears.

<!-- page 336 -->
  - Note:
    - If the "Received Amount” is left empty and Paid Amount is set,
      - It’s calculated as "Paid Amount Х Source Exchange Rate / Target Exchange Rate”
    - If the "Received Amount” is set by the user
      - No calculation is performed by the system
- Received Amount After Tax
  - Label field (read only)
  - Displays the received amount after deducting the applicable tax withholding
- Target Exchange Rate
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

<!-- page 337 -->
            - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
            - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
        - Use API to Get Exchange Rate
          - The system shall automatically create and retrieve the Exchange Rate using the configured external API.
          - After the Exchange Rate is successfully created, the system shall populate the Exchange Rate field.
          - The Exchange Rate field shall remain read-only.
          - Note:
            - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
            - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
    - Received Amount (Company Currency)
      - Label field (read only)
      - Displays the received amount converted into the company's currency using the target exchange rate
    - Received Amount After Tax (Company Currency)
      - Label field (read only)
      - Displays the received amount after tax converted into the company's currency
- Reference
  - Note: it appears only after clicking on “Save” button
  - It contains the following fields:
    - Get Outstanding Invoices
      - Button

<!-- page 338 -->
  - When clicked, it retrieves all outstanding invoices for the selected party to allocate the payment against them.
- Get Outstanding Orders
  - Button
  - Retrieves outstanding sales or purchase orders that can receive advance payment allocations.
- Payment References
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - Type
      - Searchable DDL
      - Link “Doctype”
      - To select the type of document to which the payment is allocated
      - It displays only the following doctypes:
        - Dunning
        - Journal Entry
        - Sales Invoice
        - Sales Order
      - Single selection
      - Mandatory
      - If the field is left empty an error message appears.
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Name
      - Searchable DDL
      - links the DocTypes based only on the DocTypes selected in the Type field
      - To select the specific document receiving the payment allocation
      - Single selection
      - Mandatory
      - If the field is left empty an error message appears.
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Due date
      - Label field
      - Displays the due date of the referenced document.
      - Note: It’s fetched from the selected document
    - Grand total
      - Label field

<!-- page 339 -->
  - Displays the total value of the referenced document.
  - Note: It’s fetched from the selected document
- Outstanding
  - Label field
  - Displays the remaining unpaid amount of the referenced document.
  - Note: It’s fetched from the selected document
- Allocated
  - Text input field.
  - To enter the amount of the payment allocated to the referenced document
  - optional .
  - Accept integers and decimal numbers only.
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
      - These columns are: Column Name Type Name Due Date Grand Total (EGP)

<!-- page 340 -->

**Outstanding (EGP)**

**Allocated (EGP)**

**Supplier Invoice No**

**Payment Term**

**Payment Term Outstanding**

**Account Type**

**Payment Type**

**Reconcile Effect On**

**Exchange Rate**

**Exchange Gain/Loss**

**Account**

**Payment Request**

**Payment Request Outstanding**

**Advance Voucher Type**

**Advance Voucher No**
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
    - To delete a specific row or multiple

<!-- page 341 -->

**rows**
    - When clicked, the selected item group(s) will be deleted
- Edit Row
  - Clickable icon
  - Users can edit and view non displayed fields in the table.
  - When clicked , a pop up appears containing the following fields: Field Name Options

**Type**
      - Searchable DDL
      - Link “Doctype”
      - To select the type of document to which the payment is allocated
      - It displays only the following doctypes:
        - Journal Entry
        - Sales Invoice
        - Sales Order
      - Single selection
      - Mandatory
      - If the field is left empty an error message appears.
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Name**
      - Searchable DDL
      - links the DocTypes based only on the DocTypes selected in the Type field
      - To select the specific document receiving the payment allocation
      - Single selection
      - Mandatory
      - If the field is left empty an error message appears.
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the

<!-- page 342 -->

**user to search and select from a**

**predefined list of values.**

**Due date**
- Label field
- Displays the due date of the referenced document.
- Note: It’s fetched from the selected document

**Supplier Invoice No**
- Label field
- Displays the supplier's invoice number associated with the referenced purchase invoice.
- It appears only when the Invoice is a Purchase Invoice

**Payment term**
- Searchable DDL
- Link “Payment Term” doctype
- Single selection
- Optional
- Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Payment term outstanding**
- Label field
- Displays the outstanding amount for the selected payment term.

**Account type** **[HIDDEN]**
- **[HIDDEN]** Text input field
- **[HIDDEN]** To enter the account type associated with the referenced document

**Payment type** **[HIDDEN]**
- **[HIDDEN]** Text input field
- **[HIDDEN]** To enter the payment type associated with the reference

**Reconcile effect on**
- Label field
- Displays the effective date used for payment reconciliation

<!-- page 343 -->
- Note: it appears only when it has a value

**Grand total**
- Label field
- Displays the total value of the referenced document.
- Note: It’s fetched from the selected document

**Outstanding**
- Label field
- Displays the remaining unpaid amount of the referenced document.
- Note: It’s fetched from the selected document

**Allocated**
- Text input field.
- To enter the amount of the payment allocated to the referenced document
- Optional
- Accept numbers only.
- Its value must be greater than 0

**Exchange rate**
- Label field
- Displays the exchange rate used for the payment allocation when multiple currencies are involved in the reference document.

**Exchange gain / loss**
- Label field
- Displays the exchange gain or loss generated during payment allocation.

**Account**
- Searchable DDL
- Link “Account” doctype
- To select the ledger account associated with the payment reference
- Single selection
- Optional
- Note: the field shall be

<!-- page 344 -->

**implemented as a searchable**

**DDL (autocomplete), allowing the**

**user to search and select from a**

**predefined list of values.**
          - Note: it’s fetched from the reference document

**Payment request** **[HIDDEN]**
          - **[HIDDEN]** Searchable DDL
          - **[HIDDEN]** Link “Payment Request” doctype
          - **[HIDDEN]** To Reference the Payment Request associated with this payment allocation.
          - **[HIDDEN]** Single selection
          - **[HIDDEN]** Optional
          - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Payment request outstanding** **[HIDDEN]**
          - **[HIDDEN]** Label field
          - **[HIDDEN]** Displays the outstanding balance of the related Payment Request.

**Advance voucher type**
          - Label field
          - Displays the type of advance voucher applied to this payment
          - Note: it appears only when it has a value

**Advance voucher No**
          - Label field
          - Displays the advance voucher applied to the payment allocation
          - Note: it appears only when it has a value
      - Add Row
        - Button
        - To add a new row in the table
        - When clicked, a new row is added to the table.
- Writeoff
  - Note: it appears only after clicking on “Save” button
  - It contains the following fields:
    - Total Allocated Amount (Currency)

<!-- page 345 -->
      - Label field
      - Displays the total amount allocated across all referenced documents.
    - Total Allocated Amount (Company Currency)
      - Label field
      - Displays the total allocated amount in the company currency.
    - Unallocated Amount
      - Label field
      - Displays the portion of the payment that has not yet been allocated.
    - Difference Amount (Company Currency)
      - Label field
      - Displays the remaining difference between the payment and allocated amounts in the company currency.
    - Write off Difference Amount
      - Button
      - It Specifies the amount to be written off to clear any remaining payment difference.
      - It appears only when Difference Amount > 0
- Purchase Taxes and Charges Template
  - Searchable DDL
  - Link “Purchase Taxes and Charges Template" doctype
  - When a template is selected, its details are fetched and populated into the Advance Taxes and Charges table.
  - Single selection
  - Optional
  - Note: it appears only when the Payment type is equal to “Pay”, and Party Type = Supplier
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Sales Taxes and Charges Template
  - Searchable DDL
  - Link “Sales Taxes and Charges Template" doctype
  - When a template is selected, its details are fetched and populated into the Advance Taxes and Charges table.
  - Single selection
  - Optional
  - Note: it appears only when the Payment type is equal to “Receive”, and Party Type = Customer
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Advance Taxes and Charges
  - Note: it appears only when the Party Type = Supplier or Customer
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.

<!-- page 346 -->
  - Displays the ordering of items in the table
- Type
  - DDL
  - To select the Advance taxes type
  - It contains the following values:
    - Actual
    - On Paid Amount
    - On Previous Row Amount
    - On Previous Row Total
  - Single selection
  - Mandatory
  - If the field is left empty, an error message will appear.
- Account Head
  - Searchable DDL
  - Link “Accounts” doctype
  - To select an account head
  - Single selection
  - Mandatory
  - If the field is left empty, an error message will appear.
  - Note:
    - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Tax Rate
  - Text input field.
  - To enter the tax rate
  - Optional
  - Accept integers and decimal numbers only
  - Maximum length: 25 characters.
  - Once the maximum length is reached, further input is prevented.
- Net Amount
  - Label field (read only)
  - Displays the net amount currency
- Amount
  - Label field (read only)
  - Displays the amount currency
- Total
  - Label field (read only)
  - Displays the total currency
- Setting
  - When clicked, a pop up appears contains the following options :
    - Rearranging table columns using drag and drop functionality.
      - Users can click and hold a column header , then drag and drop it into the desired position within the table.
    - Column width

<!-- page 347 -->
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
  - These columns are: Column Name Type Account Head Tax Rate Net Amount Amount Total Add Or Deduct Reference Row #

**Description**

**Considered In Paid Amount**

**Is Tax Withholding Account**

**Cost Center**

**Project**

**Account Currency**

**Amount (Company Currency)**

**Net Amount (Company Currency)**

**Total (Company Currency)**
  - Users can show or hide columns by selecting or deselecting the related checkbox.

<!-- page 348 -->
    - “Update” button
      - Button
      - For save any changes or updates made by the user
      - When clicked, any modifications made by the user will be saved
    - “Reset to default” button
      - Button
      - To reset all modifications to their default values.
      - When clicked, any modifications made by the user will be reset to their default values.
  - Note: when an Item is selected , an action bar appears showing the following actions:
    - Delete row
      - Button
      - To delete a specific row or multiple rows
      - When clicked, the selected item group(s) will be deleted
- Edit Row
  - Clickable icon
  - Users can edit and view non displayed fields in the table.
  - When clicked , a pop up appears containing the following fields: Field Name Options

**Add or deduct**
        - DDL
        - To select whether the tax or charge amount will be added to or deducted from the document total
        - It contains the following values:
          - Add
          - Deduct
        - It has a default value “Add”

**Type**
        - DDL
        - To select the Advance taxes type
        - It contains the following values:
          - Actual
          - On Paid Amount
          - On Previous Row Amount
          - On Previous Row Total
        - Single selection
        - Mandatory
        - If the field is left empty, an error

<!-- page 349 -->

**message will appear**

**Reference Row**
- Text input field
- Used to enter the reference row
- Note: This field appears only when more than one tax is added and the tax type is set to On Previous Row Amount or On Previous Row Total. The system automatically populates the Reference Row field with the row number immediately preceding the current row.

**Account Head**
- Searchable DDL
- Link “Accounts” doctype
- To select an account head
- Single selection
- Mandatory

**Description**
- Text area
- For adding a description
- Mandatory
- Accepts letters, numbers, and special characters.
- Minimum length: 3 characters.
- Maximum length: 500 characters.
- Once the maximum limit is reached, further input will be prevented.
- An error message will appear if the entered text is less than the minimum length.
- An error message will appear if invalid data is entered.

**Considered In Paid Amount**
- Checkbox
- If checked, this tax amount will be considered as already included in the paid Amount in Paid Entry

**Set by Item Tax Template**
- Checkbox icon (read only)
- It appears only in case this tax

<!-- page 350 -->

**set be item tax template**

**Is tax withholding Account**
- Checkbox icon (read only)
- It appears only in case this tax is tax withholding Account

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

**Tax Rate**
- Text input field.
- To enter the tax rate
- Optional
- Accept integers and decimal numbers only
- Maximum length: 25 characters.
- Once the maximum length is reached, further input is prevented.

**Account Currency**
- Label field
- Displays the Account Currency

**Net Amount (Currency)**
- Label field (read only)
- Displays the Net Amount Currency

**Amount (Currency)**
- Label field (read only)
- Displays the Amount Currency

**Total (Currency)**
- Label field (read only)
- Displays the Total Currency

<!-- page 351 -->

**Net Amount (Company’s base currency)**
          - Label field (read only)
          - Displays the Net Amount (Company’s base currency)

**Amount (Company’s base currency)**
          - Label field (read only)
          - Displays the Amount (Company’s base currency)

**Total (Company’s base currency)**
          - Label field (read only)
          - Displays the Total (Company’s base currency)
    - Add Row
      - Button
      - To add a new row in the table
      - When clicked, a new row is added to the table.
- Total Taxes and Charges (Company’s base Currency)
  - Label field (read only)
  - It displays total taxes and charges in company’s base currency
- Total Taxes and Charges (Currency)
  - Label field (read only)
  - It displays total taxes and charges in document currency
- Deduction or Loss
  - Note: it appears only after clicking on “Save” button
  - Note: The table automatically adds a row for the difference amount when the difference between Paid Amount (Company Currency) and Received Amount (Company Currency) exists and Is Exchange Gain / Loss is checked.
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - Account
      - Searchable DDL
      - Link “Accounts” doctype
      - Single selection
      - Mandatory
      - If the field is left empty an error message appears
      - Note:
        - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Cost Center
      - Searchable DDL
      - Link “Cost Center” doctype
      - Single selection

<!-- page 352 -->
  - Mandatory
  - If the field is left empty an error message appears
  - Note:
    - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Amount (Company Currency)
  - Text input field.
  - To enter the amount
  - Mandatory
  - Accept integers and decimal numbers only
  - Maximum length: 100 characters.
  - Once the maximum length is reached, further input is prevented.
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
      - These columns are: Column Name Account Cost Center Amount (Company Currency) Is Exchange Gain / Loss

**Description**

<!-- page 353 -->
      - Users can show or hide columns by selecting or deselecting the related checkbox.
    - “Update” button
      - Button
      - For save any changes or updates made by the user
      - When clicked, any modifications made by the user will be saved
    - “Reset to default” button
      - Button
      - To reset all modifications to their default values.
      - When clicked, any modifications made by the user will be reset to their default values.
  - Note: when an Item is selected , an action bar appears showing the following actions:
    - Delete row
      - Button
      - To delete a specific row or multiple rows
      - When clicked, the selected item group(s) will be deleted
- Edit Row
  - Clickable icon
  - Users can edit and view non displayed fields in the table.
  - When clicked , a pop up appears containing the following fields: Field Name Options

**Account**
        - Searchable DDL
        - Link “Accounts” doctype
        - Single selection
        - Mandatory
        - If the field is left empty an error message appears
        - Note:
          - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Cost Center**
        - Searchable DDL
        - Link “Cost Center” doctype
        - Single selection

<!-- page 354 -->
    - Mandatory
    - If the field is left empty an error message appears
    - Note:
      - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Amount (Company Currency)**
    - Text input field.
    - To enter the amount
    - Mandatory
    - Accept integers and decimal numbers only.
    - Maximum length: 100 characters.
    - Once the maximum length is reached, further input is prevented.

**Is Exchange Gain / Loss**
    - Checkbox icon (read only)

**Description**
    - Text area
    - For adding a description Optional
    - Accepts letters, numbers, and special characters.
    - Minimum length: 3 characters.
    - Maximum length: 500 characters.
    - Once the maximum limit is reached, further input will be prevented.
    - An error message will appear if the entered text is less than the minimum length.
    - An error message will appear if invalid data is entered.
- Add Row
  - Button
  - To add a new row in the table

<!-- page 355 -->
      - When clicked, a new row is added to the table.
- Tax Withholding Entry
  - It contains the following fields;
    - Tax Withholding Group
      - Searchable DDL
      - Link “Tacx Withholding Group” doctype
      - To select the Tax Withholding Group to be applied to the payment transaction
      - Note: it appears only when the “Consider For Tax Withholding = 1”
      - Single selection
      - Optional
      - Note:
        - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Ignore Tax Withholding Threshold
      - Checkbox
      - When checked, the system shall ignore the defined Tax Withholding Threshold when calculating tax withholding for the payment transaction.
      - Note: it appears only when the “Consider For Tax Withholding = 1”
    - Edit Tax Withholding Entries
      - Checkbox
      - When checked, the system shall allow the user to manually edit the Tax Withholding Entries table.
      - Note: it appears only when the “Consider For Tax Withholding = 1”
    - Tax Withholding Entries
      - Note: it appears only when:
        - the “Consider For Tax Withholding = 1”
        - And the user clicks on “Save” button
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
          - Displays the Tax Withholding Group
          - Note: It’s fetched from the selected “Tax Withholding Category”
        - Base Taxable Amount
          - Text input field.

<!-- page 356 -->
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
  - Note: the field shall be implemented as a searchable

<!-- page 357 -->

**DDL (autocomplete), allowing the user to search and**

**select from a predefined list of values**
  - Note:
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
      - These columns are: Column Name Tax Withholding Category Tax Withholding Group Base Taxable Amount Tax Rate Base Tax Withheld Taxable Document Name Company

<!-- page 358 -->

**Party Type**

**Party**

**Tax ID**

**Taxable Document Type**

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

<!-- page 359 -->
- Clickable icon
- Users can edit and view non displayed fields in the table.
- When clicked , a pop up appears containing the following fields: Field Name Options

**Company**
  - Searchable DDL
  - Link “Company” doctype
  - To select the company associated with the Tax Withholding Entry
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

<!-- page 360 -->

**Tax Withholding Category**
- Label field (read only)
- Displays the Tax Withholding Category
- Note: It’s fetched from the selected “Tax Withholding Category”

**Tax Withholding Group**
- Label field (read only)
- Displays the Tax Withholding Group
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

<!-- page 361 -->
- Once the maximum length is reached, further input is prevented.
- Note: It’s fetched from the selected “Tax Withholding Category”
- Note:
  - If the “Edit Tax Withholding Entries = 1”
    - This field can be edited by the user (Editable)
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
  - If the “Edit Tax

<!-- page 362 -->

**Withholding Entries = 1”**
    - This field can be edited by the user (Editable)
  - If the “Edit Tax Withholding Entries = 0”
    - This field become read-only

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

<!-- page 363 -->
- Displays the exchange rate used to convert the Tax Withholding Entry amount from the transaction currency to the company currency

**Under Withheld Reason** **[HIDDEN]**
- **[HIDDEN]** Label field (read only)
- **[HIDDEN]** Displays the reason for withholding an amount lower than the applicable tax withholding amount

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
- To select the name or identifier of the document from which the

<!-- page 364 -->

**tax withholding amount is**

**deducted**
          - Note:
            - If the “Edit Tax Withholding Entries = 1”
              - This field can be edited by the user (Editable)
            - If the “Edit Tax Withholding Entries = 0”
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
- Transaction ID
  - Note: it appears only when “Account Paid From” and “Account Paid To” are set,
  - It contains the following fields:
    - Cheque/Reference No

<!-- page 365 -->
      - Text input field.
      - To enter the cheque number or reference number associated with the payment transaction
      - Optional
      - Note: it’s mandatory only when the “Paid From Account Type = Bank” or “Paid To Account Type = Bank”
      - Accepts letters, numbers and special characters.
      - Maximum length: 100 characters.
      - Once the maximum length is reached, further input is prevented.
    - Cheque/Reference Date
      - Date Calendar picker
      - To select the date associated with the cheque or payment reference
      - Optional
      - Note: it’s mandatory only when the “Paid From Account Type = Bank” or “Paid To Account Type = Bank”
    - Clearance Date
      - Label field (read only)
      - Displays the date on which the cheque or payment transaction was cleared
      - Note: it’s displayed only when the document is submitted
- Accounting Dimensions
  - It contains the following fields:
    - Project
      - Searchable DDL
      - Link "Project” doctype
      - Used to link the shipping rule to a specific project.
      - Single selection
      - Optional
    - Cost center
      - Searchable DDL
      - Link "Cost Center” doctype
      - Used to specify the department or business unit that will bear the expense or receive the revenue.
      - It displays cost centers based on the selected company.
      - Single selection
      - Mandatory
      - If the field is left empty an error message appears.
- More Information
  - Note: it appears only after clicking on “Save” button
  - It contains the following values:
    - Status
      - Label field
      - It displays the payment entry status
      - It displays one of the following values:
        - Draft
        - Submitted

<!-- page 366 -->
    - Cancelled
- Custom Remarks
  - Checkbox
  - When checked, the system shall allow the user to enter custom remarks for the Payment Entry. And the “Remarks” field becomes enabled
- Remarks
  - Text area
  - Allows the user to enter additional remarks or notes related to the payment transaction.
  - Accepts letters, numbers, and special characters.
  - Minimum length: 3 characters.
  - Maximum length: 500 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
  - An error message will appear if invalid data is entered.
  - Note: it becomes enabled and can be edited only when the “Custom Remarks = 1”
- **[HIDDEN]** Letter Head
  - **[HIDDEN]** Searchable DDL
  - **[HIDDEN]** Link “Letter Head” doctype
  - **[HIDDEN]** Single selection
  - **[HIDDEN]** Optional
  - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- In Words (Company Currency)
  - Label field
  - It displays the paid amount in words (Company Currency)
- In Words (Currency)
  - Label field
  - It displays the paid amount in words ( Currency)
- Bank
  - Label field
  - It displays the company bank account associated with the payment transaction
  - Note: it’s fetched from the Company Bank Account
- Bank Account No
  - Label field
  - It displays the company bank account number associated with the payment transaction
  - Note: it’s fetched from the Company Bank Account
- **[HIDDEN]** Payment Order
  - **[HIDDEN]** Label field
  - **[HIDDEN]** It displays the Payment Order associated with the Payment Entry
- Amended From

<!-- page 367 -->
      - Label field
      - Displays the Payment Entry from which this document was amended.
      - Clickable
      - When clicked, it navigates the user to the Payment Entry from which this document was amended.
      - Note: This field is displayed only if this Payment Entry is amended from another Payment Entry
    - Is Opening
      - DDL
      - To specify whether the Payment Entry is an opening entry used to record an opening balance
      - Note: it appears only when “Book advance payments in separate party account = 1”
      - It contains the following values
        - Yes
        - No
      - Single selection
      - Optional
- **[HIDDEN]** Auto Repeat
  - **[HIDDEN]** Label field (read only)
  - **[HIDDEN]** Displays the Auto Repeat configuration used to automatically generate recurring Payment Entries
  - **[HIDDEN]** Note: it appears only after submitting
- Save
  - Button
  - When clicked,
    - If all required data is entered correctly and completely:
      - The Payment Entry is successfully saved and not submitted.
      - And added to the Payment Entry List and its status is draft
    - If incorrect or incomplete data is entered:
      - A validation error message is displayed for each invalid field.
- Submit
  - It appears only when the Payment Entry status = Draft.
  - If all required data is entered correctly and completely:
    - The Payment Entry is successfully submitted.
- Cancel
  - It appears only when the Payment Entry status = Submitted
  - When clicked,
    - The Payment Entry is canceled successfully.
    - And “Cancel” button changes to “Amend”
- Amend
  - Button
  - It appears only when the Payment Entry status = cancelled
- Delete
  - It appears only when the Payment Entry status = Draft / Cancelled
  - When clicked,

<!-- page 368 -->
  - A confirmation message is displayed to the user whether they want to delete this Payment Entry
  - Upon clicking the “Yes” button:
    - If other Payment Entry is Amended from this Payment Entry
      - A warning message appears indicating that this Payment Entry cannot be deleted until the user deletes all doctypes related to it.
      - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
    - if the Payment Entry is linked to other transactions,
      - a message is displayed informing the user that the linked transactions must be deleted before the Payment Entry can be deleted.
      - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
    - If the Payment Entry isn’t linked to another doctype
      - The Payment Entry is deleted successfully.

**Post**
- The new Payment Entry has been added successfully

**Conditions**
- If invalid or incomplete data is entered, the corresponding error message will be displayed for each field. Payment Entry Details

**Use case ID**

**3**

**Use case Name  Payment Entry Details**

<!-- page 369 -->

**Descriptions**

**The user can view / edit the Payment Entry details.**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Payment Entry from sidebar
- Click on “Payment Entry  ID” from the table

**Main Flow**

**-**

**Components**
- Label / Input fields
  - Note:
    - If the Payment Entry status is Submitted or Cancelled:
      - The system retrieves and displays the fields as labels for viewing purposes only. These fields are read-only and cannot be edited.
    - If the Payment Entry status is Draft:
      - The system retrieves and displays the fields as input fields, allowing the user to modify the Payment Entry data.
  - The system retrieves and displays the data entered during creation, allowing users to view or update it as needed in addition to the following:
- Fixed Page Actions
  - The following action buttons are fixed and consistently displayed at the top of all (Payment Entry details) pages to provide a quick access to common functions:
    - Preview
      - DDL
      - It appears only when the document status = Draft
      - It contains the following actions;
        - Accounting Ledger
          - Button
          - when clicked, a pop up appears containing the following fields:
            - Accounting Ledger Preview
              - A table contain the following columns:
              - Posting Date
                - Label field
                - Displays the posting date of the accounting entry
              - Account
                - Label field
                - Displays the account against which the accounting entry is recorded
              - Debit
                - Label field
                - Displays the debit amount recorded against the account in the company currency
              - Credit

<!-- page 370 -->
        - Label field
        - Displays the credit amount recorded against the account in the company currency
      - Against Account
        - Label field
        - Displays the account against which the current accounting entry is posted
      - Party Type
        - Label field
        - Displays the type of party associated with the accounting entry
      - Party
        - Label field
        - Displays the party associated with the accounting entry
      - Cost Center
        - Label field
        - Displays the cost center associated with the accounting entry
      - Against Voucher Type
        - Label field
        - Displays the type of voucher associated with the accounting entry
      - Against Voucher
        - Label field
        - Displays the voucher associated with the accounting entry
- Ledger
  - Button
  - It appears only when the document status = Submitted
  - When clicked, it navigates the user to “General Ledger” report
- Assign
- Attachment
- Tags
- Share
- Print
- Delete
  - It appears only when the Payment Entry status = Draft / Cancelled
  - When clicked,
    - A confirmation message is displayed to the user whether they want to delete this Payment Entry

<!-- page 371 -->
      - Upon clicking the “Yes” button:
        - If the Payment Entry is Amended from other Payment Entry
          - A warning message appears indicating that this Payment Entry cannot be deleted until the user deletes all doctypes related to it.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - if the Payment Entry is linked to other transactions,
          - a message is displayed informing the user that the linked transactions must be deleted before the Payment Entry can be deleted.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - If the Payment Entry isn’t linked to another doctype
          - The Payment Entry is deleted successfully.
- Connections
  - Bank Transaction
    - Button
    - Link “Bank Transaction” docktype

**Post**
- The Payment Entry data has been successfully modified and saved.

**Conditions**
- Entering incorrect or incomplete data will display the corresponding error message for each field.

<!-- TEST CASES -->

# Test cases - Payment Entry (executed 2026-11-26 on test.hr.azzrk.com)

> 260 cases: 254 passed, 6 failed. Red (hidden) items are tested as "must not be shown".

## A - Add screen: fields and rules (72 cases: 70 passed, 2 failed) - `Shamel/pe-a-form.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PE-TC-A01-1 | Series is shown, mandatory and filled from the doctype naming series | Passed |  |
| PE-TC-A01-2 | Payment Type defaults to Receive | Passed |  |
| PE-TC-A01-3 | Posting Date defaults to the current date and is mandatory | Passed |  |
| PE-TC-A01-4 | Company and Mode of Payment are mandatory | Passed |  |
| PE-TC-A01-5 | Party Type defaults to Customer for Receive and is shown translated in Arabic | FAILED | PE-03 |
| PE-TC-A01-6 | Party is mandatory | Passed |  |
| PE-TC-A01-7 | Receive shows Account Paid To and hides Account Paid From | Passed |  |
| PE-TC-A01-8 | Paid / Received amounts are hidden until the accounts are set | Passed |  |
| PE-TC-A01-9 | Company Bank Account and Party Bank Account are hidden until a Party is chosen | Passed |  |
| PE-TC-A01-10 | References, Write-off, Deductions and More Info are not shown before Save | Passed |  |
| PE-TC-A01-11 | Cheque / Reference fields are hidden until the accounts are set | Passed |  |
| PE-TC-A01-12 | Cost Center is mandatory | Passed |  |
| PE-TC-A01-13 | Hidden (red) field "Payment Order Status" is not displayed | Passed |  |
| PE-TC-A01-14 | Hidden (red) field "Letter Head" is not displayed | Passed |  |
| PE-TC-A01-15 | Hidden (red) field "Auto Repeat" is not displayed | Passed |  |
| PE-TC-A01-16 | Hidden (red) field "Payment Order" is not displayed | Passed |  |
| PE-TC-A02-1 | Payment Type offers exactly Receive, Pay and Internal Transfer | Passed |  |
| PE-TC-A02-2 | Pay: Party Type defaults to Supplier | Passed |  |
| PE-TC-A02-3 | Pay: Account Paid From is shown and Account Paid To is hidden (SRS) | Passed |  |
| PE-TC-A02-4 | Internal Transfer hides Party Type, Party and Party Name | Passed |  |
| PE-TC-A02-5 | Internal Transfer shows both Account Paid From and Account Paid To | Passed |  |
| PE-TC-A02-6 | Back to Receive: party fields return with Party Type Customer | Passed |  |
| PE-TC-A02-7 | Party Type offers exactly Customer, Employee, Shareholder and Supplier | Passed |  |
| PE-TC-A03-1 | Save with empty mandatory fields shows an error under each (Mode of Payment, Party, Account) | Passed |  |
| PE-TC-A03-2 | No document is sent to the server while mandatory fields are empty | Passed |  |
| PE-TC-A03-3 | Empty Paid Amount shows a mandatory error and nothing is saved | Passed |  |
| PE-TC-A04-1 | receive / Customer: الحساب المدفوع إليه offers only non-group Cash or Bank accounts | Passed |  |
| PE-TC-A04-2 | receive / Supplier: الحساب المدفوع إليه offers only non-group Cash or Bank accounts | Passed |  |
| PE-TC-A04-3 | receive / Employee: الحساب المدفوع إليه offers only non-group Cash or Bank accounts | Passed |  |
| PE-TC-A04-4 | receive / Shareholder: الحساب المدفوع إليه offers only non-group Cash or Bank or Equity accounts | Passed |  |
| PE-TC-A05-1 | pay / Supplier: الحساب المدفوع منه offers only non-group Cash or Bank accounts | Passed |  |
| PE-TC-A05-2 | pay / Customer: الحساب المدفوع منه offers only non-group Cash or Bank accounts | Passed |  |
| PE-TC-A05-3 | pay / Employee: الحساب المدفوع منه offers only non-group Cash or Bank accounts | Passed |  |
| PE-TC-A05-4 | pay / Shareholder: الحساب المدفوع منه offers only non-group Cash or Bank or Equity accounts | Passed |  |
| PE-TC-A06-1a | Customer: Party Name is fetched and read-only | Passed |  |
| PE-TC-A06-1b | Customer: Company / Party Bank Account fields appear after choosing the Party | Passed |  |
| PE-TC-A06-1c | Customer: Contact field is shown | Passed |  |
| PE-TC-A06-1d | Customer: Contact defaults to the primary contact and Email shows its primary e-mail | Passed |  |
| PE-TC-A06-1e | Customer: Consider for Tax Withholding is shown only for Pay + Supplier | Passed |  |
| PE-TC-A06-2a | Supplier: Party Name is fetched and read-only | Passed |  |
| PE-TC-A06-2b | Supplier: Company / Party Bank Account fields appear after choosing the Party | Passed |  |
| PE-TC-A06-2c | Supplier: Contact field is shown | Passed |  |
| PE-TC-A06-2d | Supplier: Contact defaults to the primary contact and Email shows its primary e-mail | Passed |  |
| PE-TC-A06-2e | Supplier: Consider for Tax Withholding is shown only for Pay + Supplier | Passed |  |
| PE-TC-A06-3a | Employee: Party Name is fetched and read-only | Passed |  |
| PE-TC-A06-3b | Employee: Company / Party Bank Account fields appear after choosing the Party | Passed |  |
| PE-TC-A06-3c | Employee: Contact field is hidden | Passed |  |
| PE-TC-A06-3d | Employee: Email is the personal e-mail of the employee | Passed |  |
| PE-TC-A06-3e | Employee: Consider for Tax Withholding is shown only for Pay + Supplier | Passed |  |
| PE-TC-A06-4a | Shareholder: Party Name is fetched and read-only | Passed |  |
| PE-TC-A06-4b | Shareholder: Company / Party Bank Account fields appear after choosing the Party | Passed |  |
| PE-TC-A06-4c | Shareholder: Contact field is shown | Passed |  |
| PE-TC-A06-4e | Shareholder: Consider for Tax Withholding is shown only for Pay + Supplier | Passed |  |
| PE-TC-A07-1 | Account Paid To is filled from the Mode of Payment account | Passed |  |
| PE-TC-A07-2 | Paid To Account Type and Account Currency (To) are fetched from the account | Passed |  |
| PE-TC-A07-3 | Amount section appears once both accounts are known | Passed |  |
| PE-TC-A07-4 | Reference No / Date appear once the accounts are set | Passed |  |
| PE-TC-A07-5 | Received Amount is calculated from Paid Amount (same currency, rate 1) | Passed |  |
| PE-TC-A07-6 | Paid Amount rejects letters and symbols | Passed |  |
| PE-TC-A07-7 | Paid Amount rejects a negative value | Passed |  |
| PE-TC-A07-8 | Paid Amount stops at 100 characters | Passed |  |
| PE-TC-A07-9 | Reference No stops at 100 characters | Passed |  |
| PE-TC-A07-10 | Reference No accepts letters, numbers and special characters | Passed |  |
| PE-TC-A08-1 | Bank account: Reference No and Date are marked mandatory | Passed |  |
| PE-TC-A08-2 | Bank account without a reference: Save is refused with errors on the reference fields | Passed |  |
| PE-TC-A08-3 | Cash account: Reference fields are optional | Passed |  |
| PE-TC-A09-1 | Company Bank Account lists only company accounts of the selected company | Passed |  |
| PE-TC-A09-2 | Party Bank Account lists only the accounts of the selected party | Passed |  |
| PE-TC-A10-1 | Cost Center lists the cost centers of the company | Passed |  |
| PE-TC-A10-2 | Cost Center option text is not duplicated | FAILED | PE-04 |
| PE-TC-A10-3 | Mode of Payment lists the enabled modes | Passed |  |
| PE-TC-A10-4 | Changing the Company clears accounts / cost center of the old company | Passed |  |

## B - End to end, every payment and party type (60 cases: 60 passed, 0 failed) - `Shamel/pe-b-e2e.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PE-TC-B01-1 | Receive / Customer: Save creates a draft from the screen | Passed |  |
| PE-TC-B01-2 | Receive / Customer: every entered value is saved on the document | Passed |  |
| PE-TC-B01-3 | Receive / Customer: Get Outstanding Invoices lists the open invoices of the party | Passed |  |
| PE-TC-B01-4 | Receive / Customer: the allocation is saved on the draft | Passed |  |
| PE-TC-B01-5 | Receive / Customer: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B01-6 | Receive / Customer: General Ledger posts Dr 122102 - RIYAD BANK - E / Cr 1210 - العملاء - E with 2000 | Passed |  |
| PE-TC-B01-7 | Receive / Customer: the ledger is balanced | Passed |  |
| PE-TC-B01-8 | Receive / Customer: invoice balances are reduced (0 / 700) | Passed |  |
| PE-TC-B01-9 | Receive / Customer: the details screen shows status Submitted and the saved values | Passed |  |
| PE-TC-B02-1 | Pay / Supplier: Save creates a draft from the screen | Passed |  |
| PE-TC-B02-2 | Pay / Supplier: every entered value is saved on the document | Passed |  |
| PE-TC-B02-3 | Pay / Supplier: Get Outstanding Invoices lists the open invoices of the party | Passed |  |
| PE-TC-B02-4 | Pay / Supplier: the allocation is saved on the draft | Passed |  |
| PE-TC-B02-5 | Pay / Supplier: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B02-6 | Pay / Supplier: General Ledger posts Dr QA-PR Payable - E / Cr 122301 - Tabby - E with 1500 | Passed |  |
| PE-TC-B02-7 | Pay / Supplier: the ledger is balanced | Passed |  |
| PE-TC-B02-8 | Pay / Supplier: invoice balances are reduced (0) | Passed |  |
| PE-TC-B02-9 | Pay / Supplier: the details screen shows status Submitted and the saved values | Passed |  |
| PE-TC-B03-1 | Internal Transfer: Save creates a draft from the screen | Passed |  |
| PE-TC-B03-2 | Internal Transfer: every entered value is saved on the document | Passed |  |
| PE-TC-B03-5 | Internal Transfer: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B03-6 | Internal Transfer: General Ledger posts Dr 122301 - Tabby - E / Cr 122102 - RIYAD BANK - E with 250 | Passed |  |
| PE-TC-B03-7 | Internal Transfer: the ledger is balanced | Passed |  |
| PE-TC-B03-9 | Internal Transfer: the details screen shows status Submitted and the saved values | Passed |  |
| PE-TC-B04-1 | Receive / Employee: Save creates a draft from the screen | Passed |  |
| PE-TC-B04-2 | Receive / Employee: every entered value is saved on the document | Passed |  |
| PE-TC-B04-5 | Receive / Employee: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B04-6 | Receive / Employee: General Ledger posts Dr 122102 - RIYAD BANK - E / Cr 2300 - مصروفات مستحقة - E with 300 | Passed |  |
| PE-TC-B04-7 | Receive / Employee: the ledger is balanced | Passed |  |
| PE-TC-B04-9 | Receive / Employee: the details screen shows status Submitted and the saved values | Passed |  |
| PE-TC-B05-1 | Pay / Employee: Save creates a draft from the screen | Passed |  |
| PE-TC-B05-2 | Pay / Employee: every entered value is saved on the document | Passed |  |
| PE-TC-B05-5 | Pay / Employee: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B05-6 | Pay / Employee: General Ledger posts Dr 2300 - مصروفات مستحقة - E / Cr 122102 - RIYAD BANK - E with 100 | Passed |  |
| PE-TC-B05-7 | Pay / Employee: the ledger is balanced | Passed |  |
| PE-TC-B05-9 | Pay / Employee: the details screen shows status Submitted and the saved values | Passed |  |
| PE-TC-B06-1 | Receive / Shareholder: Save creates a draft from the screen | Passed |  |
| PE-TC-B06-2 | Receive / Shareholder: every entered value is saved on the document | Passed |  |
| PE-TC-B06-5 | Receive / Shareholder: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B06-6 | Receive / Shareholder: General Ledger posts Dr 122102 - RIYAD BANK - E / Cr 2300 - مصروفات مستحقة - E with 400 | Passed |  |
| PE-TC-B06-7 | Receive / Shareholder: the ledger is balanced | Passed |  |
| PE-TC-B06-9 | Receive / Shareholder: the details screen shows status Submitted and the saved values | Passed |  |
| PE-TC-B07-1 | Pay / Shareholder: Save creates a draft from the screen | Passed |  |
| PE-TC-B07-2 | Pay / Shareholder: every entered value is saved on the document | Passed |  |
| PE-TC-B07-5 | Pay / Shareholder: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B07-6 | Pay / Shareholder: General Ledger posts Dr 2300 - مصروفات مستحقة - E / Cr 122102 - RIYAD BANK - E with 150 | Passed |  |
| PE-TC-B07-7 | Pay / Shareholder: the ledger is balanced | Passed |  |
| PE-TC-B07-9 | Pay / Shareholder: the details screen shows status Submitted and the saved values | Passed |  |
| PE-TC-B08-1 | Pay / Customer: Save creates a draft from the screen | Passed |  |
| PE-TC-B08-2 | Pay / Customer: every entered value is saved on the document | Passed |  |
| PE-TC-B08-5 | Pay / Customer: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B08-6 | Pay / Customer: General Ledger posts Dr 1210 - العملاء - E / Cr 122102 - RIYAD BANK - E with 120 | Passed |  |
| PE-TC-B08-7 | Pay / Customer: the ledger is balanced | Passed |  |
| PE-TC-B08-9 | Pay / Customer: the details screen shows status Submitted and the saved values | Passed |  |
| PE-TC-B09-1 | Receive / Supplier: Save creates a draft from the screen | Passed |  |
| PE-TC-B09-2 | Receive / Supplier: every entered value is saved on the document | Passed |  |
| PE-TC-B09-5 | Receive / Supplier: Submit from the screen submits the document with a success message | Passed |  |
| PE-TC-B09-6 | Receive / Supplier: General Ledger posts Dr 122102 - RIYAD BANK - E / Cr QA-PR Payable - E with 130 | Passed |  |
| PE-TC-B09-7 | Receive / Supplier: the ledger is balanced | Passed |  |
| PE-TC-B09-9 | Receive / Supplier: the details screen shows status Submitted and the saved values | Passed |  |

## C - References, taxes, deductions and write off (41 cases: 40 passed, 1 failed) - `Shamel/pe-c-advanced.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PE-TC-C01-1 | Type offers Dunning, Journal Entry, Sales Invoice and Sales Order (customer) | Passed |  |
| PE-TC-C01-2 | Name lists only documents of the selected type that belong to the party | Passed |  |
| PE-TC-C01-3 | Name offers only invoices that still have an outstanding amount | Passed |  |
| PE-TC-C01-4 | Due Date, Grand Total and Outstanding are fetched from the document | Passed |  |
| PE-TC-C01-5 | Allocated accepts numbers only | Passed |  |
| PE-TC-C01-6 | An allocated amount negative is refused | Passed |  |
| PE-TC-C01-7 | An allocated amount above the outstanding amount is refused | Passed |  |
| PE-TC-C01-8 | Totals follow the row: Total Allocated 600, Unallocated 0 | Passed |  |
| PE-TC-C01-9 | Reference Edit Row shows the SRS fields | Passed |  |
| PE-TC-C01-10 | Hidden (red) fields Account Type, Payment Type and Payment Request are not shown | Passed |  |
| PE-TC-C01-11 | Supplier Invoice No is not shown for a sales invoice | Passed |  |
| PE-TC-C01-12 | Add/Remove columns of references lists the SRS columns | Passed |  |
| PE-TC-C01-13 | The hand-made reference is saved | Passed |  |
| PE-TC-C01-14 | Deleting the reference row and saving removes it from the draft | Passed |  |
| PE-TC-C01-15 | Get Outstanding Orders answers without an error (no order exists for this party) | Passed |  |
| PE-TC-C02-1 | Add Row in Advance Taxes and Charges adds a row without any error | FAILED | PE-01 |
| PE-TC-C02-2 | Tax Type offers Actual, On Paid Amount, On Previous Row Amount and On Previous Row Total | Passed |  |
| PE-TC-C02-4 | Amount = 10% of 500 = 50 and totals show it | Passed |  |
| PE-TC-C02-5 | Tax Edit Row shows the SRS fields | Passed |  |
| PE-TC-C02-6 | Reference Row is hidden for On Paid Amount | Passed |  |
| PE-TC-C02-7 | Description is mandatory in the tax Edit Row | Passed |  |
| PE-TC-C02-8 | The tax row is saved with the draft | Passed |  |
| PE-TC-C02-9 | Submit from the screen submits the document | Passed |  |
| PE-TC-C02-10 | The ledger posts the tax of 50 to the tax account and stays balanced | Passed |  |
| PE-TC-C03-1 | Receive + Customer shows the Sales template only | Passed |  |
| PE-TC-C03-2 | Choosing a template fills the taxes table with the template rows | Passed |  |
| PE-TC-C03-3 | The draft saves with the template taxes | Passed |  |
| PE-TC-C03-4 | Pay + Supplier shows the Purchase template only | Passed |  |
| PE-TC-C03-5 | Advance Taxes and Charges is hidden for an Employee | Passed |  |
| PE-TC-C04-1 | Difference Amount shows 20 when 900 is allocated from a payment of 880 | Passed |  |
| PE-TC-C04-2 | Write off Difference Amount appears when Difference Amount > 0 | Passed |  |
| PE-TC-C04-3 | Write off adds a deduction row of 20 to the write off account and clears the difference | Passed |  |
| PE-TC-C04-4 | Deduction Edit Row shows Account, Cost Center, Amount, Is Exchange Gain / Loss, Description | Passed |  |
| PE-TC-C04-5 | Account, Cost Center and Amount are marked mandatory | Passed |  |
| PE-TC-C04-6 | Draft saves with allocation 900 and deduction 20 | Passed |  |
| PE-TC-C04-7 | Submit from the screen submits the document | Passed |  |
| PE-TC-C04-8 | Invoice 900 is fully paid and 20 is posted to the write off account | Passed |  |
| PE-TC-C05-1 | A payment with an unsettled difference of 10 cannot be submitted and an error is shown | Passed |  |
| PE-TC-C05-2 | A hand-made deduction of 10 clears the difference | Passed |  |
| PE-TC-C05-3 | The deduction row is saved | Passed |  |
| PE-TC-C05-4 | Submit from the screen submits the document | Passed |  |

## D - Tax withholding and foreign currency (36 cases: 36 passed, 0 failed) - `Shamel/pe-d-tds-fx.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PE-TC-D01-1 | Tax Withholding Category is hidden while Consider for Tax Withholding is off | Passed |  |
| PE-TC-D01-3 | Turning it on shows Tax Withholding Category | Passed |  |
| PE-TC-D01-4 | Tax Withholding Category is mandatory | Passed |  |
| PE-TC-D01-5 | Tax Withholding Group is offered | Passed |  |
| PE-TC-D01-6 | Ignore Tax Withholding Threshold and Edit Tax Withholding Entries are offered | Passed |  |
| PE-TC-D01-7 | Saving without the category is refused with an error | Passed |  |
| PE-TC-D01-8 | Choosing the category calculates without a server error | Passed |  |
| PE-TC-D01-10 | The draft saves with the withholding category | Passed |  |
| PE-TC-D01-11 | Stored: apply withholding, category, one withholding entry of 5% = 50 | Passed |  |
| PE-TC-D01-12 | Paid Amount After Tax shows 950 | Passed |  |
| PE-TC-D01-13 | The Tax Withholding Entries table appears after Save with category, group, base amount, rate, withheld and document | Passed |  |
| PE-TC-D01-14 | Withholding entry Edit Row shows the SRS fields | Passed |  |
| PE-TC-D01-15 | Hidden (red) fields Under Withheld Reason, Lower Deduction Certificate, Created By Migration are not shown | Passed |  |
| PE-TC-D01-16 | Submit from the screen submits the document | Passed |  |
| PE-TC-D01-17 | Ledger: 50 credited to the withholding account and balanced | Passed |  |
| PE-TC-D02-1 | Source rate is fetched from Currency Exchange (3.75), target rate 1 | Passed |  |
| PE-TC-D02-2 | Received Amount = 300 x 3.75 / 1 = 1125 and company amounts follow | Passed |  |
| PE-TC-D02-3 | The foreign currency draft saves | Passed |  |
| PE-TC-D02-4 | Outstanding USD invoices are allocated up to 300 USD | Passed |  |
| PE-TC-D02-5 | Stored rates and amounts: 3.75, paid 300, received 1125 | Passed |  |
| PE-TC-D02-6 | Submit from the screen submits the document | Passed |  |
| PE-TC-D02-7 | Ledger: cash debited 1125 and receivable credited at the invoice rate | Passed |  |
| PE-TC-D02-8 | Exchange gain of 15 SAR is posted to the exchange gain / loss account | Passed |  |
| PE-TC-D02-9 | USD invoice balances are reduced by 300 in total | Passed |  |
| PE-TC-D03-1 | An authorised user can change the fetched rate | Passed |  |
| PE-TC-D03-2 | Received Amount is recalculated with the manual rate (380) | Passed |  |
| PE-TC-D03-3 | The manual rate is saved on the document | Passed |  |
| PE-TC-D03-4 | Submit from the screen submits the document | Passed |  |
| PE-TC-D04-1 | Paid Amount empty + Received 375: Paid = 375 x 1 / 3.75 = 100 | Passed |  |
| PE-TC-D04-2 | A Paid Amount typed by the user is kept as typed | Passed |  |
| PE-TC-D04-3 | When both are typed by the user neither is recalculated | Passed |  |
| PE-TC-D05-1 | Currencies SAR to EGP with the target rate fetched (0.078740157) | Passed |  |
| PE-TC-D05-2 | Received = 100 / 0.078740157 = 1270 | Passed |  |
| PE-TC-D05-3 | The transfer saves with both currencies | Passed |  |
| PE-TC-D05-4 | Submit from the screen submits the document | Passed |  |
| PE-TC-D05-5 | Ledger balanced between the two cash / bank accounts | Passed |  |

## E - List, details and document life cycle (51 cases: 48 passed, 3 failed) - `Shamel/pe-e-lifecycle.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PE-TC-E01-1 | List shows ID, Status, Payment Type, Posting Date and Paid Amount | Passed |  |
| PE-TC-E01-3 | A new draft is listed with status Draft, its type, date and amount | Passed |  |
| PE-TC-E01-4 | Clicking the ID opens the details screen | Passed |  |
| PE-TC-E01-5 | Add Payment Entry opens the add screen | Passed |  |
| PE-TC-E01-6 | Search by ID returns that entry only | Passed |  |
| PE-TC-E02-1 | Draft shows Preview, Submit and Delete, and no Ledger, Cancel or Amend | Passed |  |
| PE-TC-E02-2 | Draft offers Assign, Tags, Attachment, Share and Print | Passed |  |
| PE-TC-E02-3 | Editing the amount of a draft and saving updates the stored document | Passed |  |
| PE-TC-E02-4 | The edited value is shown after reopening | Passed |  |
| PE-TC-E02-5 | Clearing a mandatory field on a draft is refused with a field error | Passed |  |
| PE-TC-E02-6 | Accounting Ledger Preview shows the SRS columns | Passed |  |
| PE-TC-E02-7 | Preview rows show the amount 150 on both sides and create no ledger entry | Passed |  |
| PE-TC-E02-8 | More Info shows Status, Custom Remarks, Remarks, both In Words, Bank and Bank Account No | Passed |  |
| PE-TC-E02-9 | Hidden (red) Letter Head, Payment Order and Auto Repeat are not shown | Passed |  |
| PE-TC-E02-10 | Is Opening is hidden when advances are not booked in a separate account | Passed |  |
| PE-TC-E02-11 | Remarks is read only while Custom Remarks is off | Passed |  |
| PE-TC-E02-12 | Turning Custom Remarks on enables Remarks | Passed |  |
| PE-TC-E02-13 | Remarks shorter than 3 characters are refused with an error | Passed |  |
| PE-TC-E02-14 | Remarks stops at 500 characters | Passed |  |
| PE-TC-E02-15 | Custom remarks (letters, numbers, symbols) are saved | Passed |  |
| PE-TC-E03-1 | Submitted shows Cancel and Ledger only: no Submit, Preview, Delete or Amend | Passed |  |
| PE-TC-E03-2 | Submitted fields are read only | Passed |  |
| PE-TC-E03-3 | Clearance Date is shown after submit | Passed |  |
| PE-TC-E03-4 | Connections offers Bank Transaction | Passed |  |
| PE-TC-E03-5 | Ledger opens the General Ledger report filtered on this entry | Passed |  |
| PE-TC-E03-6 | Cancel cancels the entry | Passed |  |
| PE-TC-E03-8 | The ledger entries are reversed | Passed |  |
| PE-TC-E03-9 | Cancelled shows status Cancelled, Amend and Delete (no Cancel / Submit) | Passed |  |
| PE-TC-E03-10 | Preview and Ledger are not offered on a cancelled entry | Passed |  |
| PE-TC-E03-11 | Cancelled fields are read only | Passed |  |
| PE-TC-E03-13 | Amend creates a new draft linked through Amended From with the same data | Passed |  |
| PE-TC-E03-14 | More Info of the new entry shows Amended From | Passed |  |
| PE-TC-E03-15 | Amended From is clickable and opens the original entry | Passed |  |
| PE-TC-E03-16 | Delete asks for confirmation | Passed |  |
| PE-TC-E03-17 | An entry that has an amendment cannot be deleted | Passed |  |
| PE-TC-E03-18 | The refusal names the linked document as a link | Passed |  |
| PE-TC-E04-1 | Delete on a draft shows a confirmation naming the action | Passed |  |
| PE-TC-E04-2 | Answering No keeps the entry | Passed |  |
| PE-TC-E04-3 | Answering Yes deletes the draft | Passed |  |
| PE-TC-E04-4 | After deleting the user is returned to the list | Passed |  |
| PE-TC-E04-5 | A cancelled entry without links can be deleted | FAILED | Question 1 (setting) |
| PE-TC-E05-1 | Selecting a draft shows Edit, Export, Assign, Clear Assignment, Tags, Print, Submit and Delete | Passed |  |
| PE-TC-E05-2 | Cancel is not offered for a draft | Passed |  |
| PE-TC-E05-3 | Bulk Edit pop-up has Field (mandatory), Value and Update | Passed |  |
| PE-TC-E05-4 | Bulk Edit does not offer the hidden (red) Letter Head | FAILED | PE-02 |
| PE-TC-E05-6 | Bulk Submit submits the selected draft | Passed |  |
| PE-TC-E05-7 | A submitted entry offers Cancel and neither Submit nor Delete | Passed |  |
| PE-TC-E05-8 | Bulk Edit of a submitted entry shows a "cannot be modified" error and changes nothing | Passed |  |
| PE-TC-E05-9 | Bulk Cancel cancels the selected entry | Passed |  |
| PE-TC-E05-10 | A cancelled entry offers Delete and neither Submit nor Cancel | Passed |  |
| PE-TC-E05-11 | Bulk Delete asks for confirmation then deletes | FAILED | Question 1 (setting) |
