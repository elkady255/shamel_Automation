# SRS Azzrk SHAMEL - Accounting module V1.0 - Part: Payment Reconciliation

> Extract of `SRS-Azzrk-Shamel-Accounting-V.1.0.pdf` (PDF pages 312-324). The PDF is the source of truth.

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

- It displays one of the following values;

## Index

- Use case 1 - Payment Reconciliation: page 312


# Use case 1 - Payment Reconciliation

<!-- page 312 -->

**Payment Reconciliation**

**Use case ID**

**1**

**Use  case**

**Payment Reconciliation**

**Name**

**Descriptions**

**The user can perform a payment reconciliation process.**

**Pre conditions**
- Click on Accounting from sidebar
- Click on Payment Reconciliation from sidebar

**Main Flow**

**-**

**Components**
- Company
  - Searchable DDL
  - Link “Company” doctype
  - Single selection
  - Mandatory
  - If the field is left empty, an error message will appear.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Party Type
  - Searchable DDL
  - Link “Doctype”
  - It displays only accounts associated with the selected company , account type equal “Bank” and “Is Group” option disabled.
  - Single selection
  - Mandatory
  - If the field is left empty, an error message will appear.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Party
  - Searchable DDL
  - links the DocTypes based only on the DocTypes selected in the Party Type field
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: it appears only when the “Party Type” has a value
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Receivable / Payable Account
  - Searchable DDL
  - Link “Account” doctype
  - Only accounts with “is group” disabled and account type one of “Payable” or “Receivable” , are displayed.

<!-- page 313 -->
  - Single selection
  - Mandatory
  - If the field is left empty, an error message will appear.
  - Note: it’s fetched from the selected Company (“Default Receivable Account” if the Party Type = Customer) and (“Default Payable Account” if the Party Type = Supplier), and it can be edited
  - Note: it appears only when the “Party” has a value
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Default Advance Account
  - Searchable DDL
  - Link “Account” doctype
  - To specify the default advance account to be considered for advance payments during reconciliation.
  - Only accounts with “is group” disabled and account type one of “Receivable” or “Payable” , are displayed.
  - Single selection
  - Optional
  - Note: it’s fetched from the selected company (“Default Advance Received Account” if the Party Type = Customer) and (“Default Advance Paid Account” if the Party Type = Supplier)
  - Note: it appears only when the “Party” has a value
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Filters
  - Note: it appears only when the “Party” has a value
  - It contains the following filters:
    - From Invoice Date
      - Date calendar picker
      - Users can filter by start invoice date
    - To Invoice Date
      - Date calendar picker
      - Users can filter by  end invoice date
    - Invoice Limit
      - Text input field
      - Users can filter by invoice limit
    - From Payment Date
      - Date calendar picker
      - Users can filter by start payment date
    - To Payment Date
      - Date calendar picker
      - Users can filter by end payment date
    - Minimum Invoice Amount
      - Text input field
      - Users can filter by minimum invoice amount
    - Maximum Invoice Amount
      - Text input field

<!-- page 314 -->
      - Users can filter by maximum invoice amount
    - Payment Limit
      - Text input field
      - Users can filter by payment limit
    - Minimum Payment Amount
      - Text input field
      - Users can filter by minimum payment amount
    - Maximum Payment Amount
      - Text input field
      - Users can filter by maximum payment amount
    - Bank / Cash Account
      - Searchable DDL
      - Link "Account" doctype
    - Cost Center
      - Searchable DDL
      - Link "Cost Center" doctype
    - Project
      - Searchable DDL
      - Link "Project" doctype
- Unreconciled Entries
  - It contains the following fields:
    - Filter On Invoice
      - Text input field
      - It allows the user to search the invoices using Invoice Number
    - Invoices
      - A table displays only unreconciled documents
      - Note: it appears only after Clicking on “Get Unreconciled Entries”
      - It contain the following columns:
        - Checkbox icon
          - Multi selection
        - No.
          - Displays the ordering of items in the table
        - Invoice Type
          - Label field
          - Displays all submitted documents with an outstanding balance
          - **[HIDDEN]** It displays one of the following values;
            - **[HIDDEN]** Payment Entry
            - **[HIDDEN]** Journal Entry
            - **[HIDDEN]** Sales Invoice
        - Invoice Number
          - Label field
          - Displays the invoice number (ID)
          - Clickable
          - When clicked, it navigates the user to the corresponding document
        - Invoice Date

<!-- page 315 -->
  - Label field
  - Displays the invoice date
- Outstanding Amount
  - Label field
  - Displays the outstanding amount
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
      - These columns are: Column Name Invoice Type Invoice Number Invoice Date Outstanding Amount Amount
      - Users can show or hide columns by selecting or deselecting the related checkbox.
    - “Update” button
      - Button
      - For save any changes or updates

<!-- page 316 -->

**made by the user**
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

**Invoice Type**
        - Label field
        - Displays all submitted documents with an outstanding balance

**Invoice Number**
        - Label field
        - Displays the invoice number (ID)
        - Clickable
        - When clicked, it navigates the user to the corresponding document

**Invoice Date**
        - Label field
        - **[YELLOW]** Displays the document Posting Date or Due Date ?

**Outstanding Amount**
        - Label field

<!-- page 317 -->
            - Displays the outstanding amount of the selected document

**Amount**
            - Label field
            - Displays the grand total of the selected document
- Payments
  - **[YELLOW]** Note: it displays only advance payments and payments with return invoices
  - **[YELLOW]** Note: it displays submitted payment entries and journal entries with an amount available to allocate
  - Note: it appears only after Clicking on “Get Unreconciled Entries”
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - Reference Name
      - Label field
      - Displays the payment reference name
    - Posting Date
      - Label field
      - Displays the payment posting date
    - Amount
      - Label field
      - Displays the payment amount
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

<!-- page 318 -->
      - For adding or removing columns from the table
      - When clicked, a pop-up appears containing all available table columns with their corresponding checkboxes.
      - These columns are: Column Name Reference Name

**Posting Date**

**Amount**

**Reference Type**

**Difference Amount**

**Remarks**

**Cost Center**
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

<!-- page 319 -->
        - Clickable icon
        - Users can edit and view non displayed fields in the table.
        - When clicked , a pop up appears containing the following fields: Field Name Options

**Reference Type**
          - Label field
          - Displays the payment reference type
          - It displays one of the following values:
            - Payment Entry
            - Journal Entry
            - Invoice

**Reference name**
          - Label field
          - Displays the payment reference name

**Posting Date**
          - Label field
          - Displays the payment posting date

**Amount**
          - Label field
          - Displays the payment amount

**Deference Amount**
          - Label field (read only)

**Remarks**
          - Label field (read only)

**Cost Center**
          - Searchable DDL
          - Link "Cost Center" doctype
- Allocation
  - Note: it appears only after Clicking on “Allocate” button
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table

<!-- page 320 -->
- Reference Name
  - Label field
  - Displays the reference number (ID) of the payment selected for allocation.
- Invoice Number
  - Label field
  - Displays the reference number (ID) of the invoice against which the payment is being allocated.
- Allocated Amount
  - Text input field
  - To Specify the amount of the selected payment that is allocated against the corresponding invoice.
  - Accepts integers and decimal numbers only
  - Mandatory
  - If the field is left empty an error message appears
  - Note: if the entered value is bigger than the Invoice Outstanding Amount or Payment Amount
    - An error message appears
- Difference Amount
  - Label field
  - Displays the difference between the invoice outstanding amount and the allocated amount. (Amount left unmatched in that allocation row)
  - Note: a value of 0 indicates that the invoice has been fully allocated.
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
      - These columns are:

<!-- page 321 -->

**Column Name**

**Reference Name**

**Invoice Number**

**Allocated Amount**

**Difference Amount**

**Reference Type**

**Invoice Type**

**Difference Posting Date**

**Debit / Credit Note Posting Date**

**Difference Account**

**Exchange Rate**

**Cost Center**
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

<!-- page 322 -->

**Reference Type**
- Label field
- Displays type of document used as the payment reference for the allocation

**Reference Name**
- Label field
- Displays the reference number (ID) of the payment selected for allocation.

**Invoice Type**
- Label field
- Displays the type of invoice against which the payment is being allocated

**Invoice Number**
- Label field
- Displays the reference number (ID) of the invoice against which the payment is being allocated.

**Allocated Amount**
- Text input field
- To Specify the amount of the selected payment that is allocated against the corresponding invoice.
- Accepts integers and decimal numbers only
- Mandatory
- If the field is left empty an error message appears
- Note: if the entered value is bigger than the Invoice Outstanding Amount or Payment Amount
  - An error message appears

**Deference Amount**
- Label field
- Displays the difference between the invoice outstanding amount and the allocated amount. (Amount left unmatched in that

<!-- page 323 -->

**allocation row)**
        - Note: a value of 0 indicates that the invoice has been fully allocated.

**Difference Account**
        - Label field
        - Displays the account that will be used to record any difference amount resulting from the reconciliation, such as an exchange gain or loss

**Difference Posting Date**
        - Date calendar picker
        - To Specify the posting date on which the difference amount will be recorded.
        - Optional
        - It has a default value “current date”

**Exchange Rate**
        - Label field
        - Displays the exchange rate used to calculate the allocated amount and any resulting exchange gain or loss when the transaction involves different currencies

**Debit / Credit Note Posting Date**
        - Date calendar picker
        - To Specify the posting date of the related Debit Note or Credit Note when the allocation is associated with such a document.
- Payment Reconciliation Workflow
  - Get Unreconciled Entries
    - Button
    - When clicked,
      - the system shall display the Invoices and Payments tables.
      - The system shall retrieve and populate the Invoices table with all unreconciled invoices related to the selected party.

<!-- page 324 -->
      - The system shall retrieve and populate the Payments table with all unreconciled payments related to the selected party.
      - The “Allocate” button is displayed
  - Allocate
    - Button
    - When the user selects one or more Invoices and one or more payments, and clicks on ‘Allocate’ Button:
      - The “Allocation” table is displayed
      - The “Reconcile” button is displayed
      - The “Get Unreconciled Entries” button remains visible and doesn’t disappear.
  - Reconcile
    - Button
    - When the user clicks the Reconcile button:
      - The system shall validate the allocation entries and reconcile the selected Payment Entries against the corresponding invoices based on the specified allocated amounts.
      - The system shall update the outstanding amount of each affected invoice and reduce the unallocated amount of the corresponding payment accordingly.
      - If a difference amount exists, the system shall process the difference using the specified Difference Account and Exchange Rate, where applicable
      - No new Journal Entry shall be automatically created when reconciling a Payment Entry against an invoice
      - Upon successful completion:
        - The system shall display a confirmation message indicating that the entries have been successfully reconciled
      - The “Reconcile” button disappears

**Post**
- The payment reconciliation process is performed successfully

**Conditions**
- If invalid or incomplete data is entered, the corresponding error message will be displayed for each field.
