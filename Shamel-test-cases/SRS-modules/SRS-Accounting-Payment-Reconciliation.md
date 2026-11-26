# SRS Azzrk SHAMEL - Accounting module V1.0 - Part: Payment Reconciliation

> Extract of `SRS-Azzrk-Shamel-Accounting-V.1.0.pdf` (PDF pages 312-324). The PDF is the source of truth.

## How to use this file for test cases

- Every bullet is one testable statement. Nesting = the SRS bullet level. `<!-- page N -->` = PDF page. A bold line = field name (table-row label) or heading.
- **[HIDDEN]** = red highlight in the PDF: the field/button must NOT be shown. Write a negative test (absent in the UI).
- **[YELLOW]** = yellow highlight (new/changed in this version). **[CYAN]** = cyan highlight (changed rule).
- Case patterns: Mandatory -> empty-save error; Min/Max length -> boundary (min-1, min, max, max+1); "numbers only" -> letters/specials rejected; read-only/label -> not editable; "displayed only when X" -> visible/hidden toggle; "fetched from X" -> auto-fill after selecting X; formulas (Net Amount = Net Rate * Qty, Shortage = Qty - Available, Total Weight = Weight/Unit * Qty, Paid/Credit/Refund Amount) -> value check; each Case/Note branch -> one case.
- Statuses: Invoice Status (Draft, Unpaid, Partially Paid, Fully Paid, Overdue, Return, Fully Credited, Cancelled; On Hold/Closed are red = hidden), Credit Status, Refund Status. Repeated in use case 1 and 4.
- SRS defects (not UI bugs): typos kept as written ("Credit Staus", "Grand Commision", "Total Avance"); copy-paste leftovers (use case 4 pre-conditions say Sales Order; address/terms text says Quotation; Save says "Sales order List"; Overdue rule says due date ">" current date; Delivery Note list says "quotations whose status is To Deliver"; Submit inside Hold pop-up).

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

<!-- TEST CASES -->

# Test cases - Payment Reconciliation (executed 2026-11-26 on test.hr.azzrk.com)

> 234 cases: 225 passed, 9 failed. Red item (the Invoice Type value list) is excluded on purpose. Foreign currency observations (not SRS requirements): the tables show no currency, and the popup shows no gain / loss amount.

## A - Header fields (32 cases: 32 passed, 0 failed) - `Shamel/prec-a-header.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PREC-TC-A01-1 | On open only Company and Party Type are shown (Party, accounts and filters hidden) | Passed |  |
| PREC-TC-A01-2 | No tables and no Allocate / Reconcile before Get Unreconciled Entries | Passed |  |
| PREC-TC-A01-3 | Company is marked mandatory | Passed |  |
| PREC-TC-A01-4 | After Party Type has a value the Party field appears | Passed |  |
| PREC-TC-A01-5 | Accounts and filters stay hidden until Party has a value | Passed |  |
| PREC-TC-A01-6 | After Party: Receivable / Payable Account, Default Advance Account and Filters appear | Passed |  |
| PREC-TC-A01-7 | All 13 SRS filters are present | Passed |  |
| PREC-TC-A01-8 | Receivable / Payable Account is marked mandatory, advance account optional | Passed |  |
| PREC-TC-A02-1 | Get with Company cleared and no Party Type shows an error under both | Passed |  |
| PREC-TC-A02-2 | Get with Company only shows an error under Party Type only | Passed |  |
| PREC-TC-A02-3 | Get without Party shows an error under Party | Passed |  |
| PREC-TC-A02-4 | A cleared Receivable / Payable Account blocks Get with an error (or the value cannot be cleared) | Passed |  |
| PREC-TC-A03-1 | Company list offers records of the Company doctype | Passed |  |
| PREC-TC-A03-2 | Company is searchable | Passed |  |
| PREC-TC-A03-3 | Search with no match offers no company | Passed |  |
| PREC-TC-A03-5 | Party Type offers Customer and Supplier | Passed |  |
| PREC-TC-A03-6 | Party is searchable and lists the selected type (customers) | Passed |  |
| PREC-TC-A03-7 | A supplier is not offered when Party Type is Customer | Passed |  |
| PREC-TC-A03-8 | حساب المدينين / الدائنين: only non-group Receivable / Payable accounts of the company | Passed |  |
| PREC-TC-A03-8b | حساب المدينين / الدائنين: all enabled matching accounts are offered | Passed |  |
| PREC-TC-A03-9 | حساب الدفعات المقدمة الافتراضي: only non-group Receivable / Payable accounts of the company | Passed |  |
| PREC-TC-A03-9b | حساب الدفعات المقدمة الافتراضي: all enabled matching accounts are offered | Passed |  |
| PREC-TC-A03-11 | Bank / Cash Account offers only bank or cash accounts of the company | Passed |  |
| PREC-TC-A03-12 | Cost Center offers cost centers of the selected company only | Passed |  |
| PREC-TC-A04-1 | Customer: account = company Default Receivable Account | Passed |  |
| PREC-TC-A04-2 | Customer: advance account = company Default Advance Received Account | Passed |  |
| PREC-TC-A04-3 | The fetched account can be edited | Passed |  |
| PREC-TC-A04-5 | Changing the Party clears the previous entry tables | Passed |  |
| PREC-TC-A04-6 | Changing Party Type clears the Party and hides dependent fields | Passed |  |
| PREC-TC-A04-7 | Supplier: account = company Default Payable Account | Passed |  |
| PREC-TC-A04-8 | Supplier: advance account = company Default Advance Paid Account | Passed |  |
| PREC-TC-A04-9 | Changing Company does not keep accounts of the old company | Passed |  |

## B - Filters (41 cases: 39 passed, 2 failed) - `Shamel/prec-b-filters.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PREC-TC-B01-1 | From Invoice Date 2026-11-15 keeps invoices dated on or after it | Passed |  |
| PREC-TC-B01-2 | From Invoice Date does not filter the payments | Passed |  |
| PREC-TC-B01-3 | From = To = 2026-11-15 returns exactly that invoice (inclusive) | Passed |  |
| PREC-TC-B01-4 | The table on screen shows the same invoices as the server answer | Passed |  |
| PREC-TC-B02-1 | From later than To is prevented or answered with a clear message (not silently wrong rows) | Passed |  |
| PREC-TC-B03-1 | From Payment Date 2026-11-20 keeps payments on or after it | Passed |  |
| PREC-TC-B03-2 | Payment dates do not filter the invoices | Passed |  |
| PREC-TC-B03-3 | Payment range 2026-11-20..2026-11-23 (inclusive) | Passed |  |
| PREC-TC-B04-1 | Minimum Invoice Amount 600 | Passed |  |
| PREC-TC-B04-2 | Invoice amount 600..1500 | Passed |  |
| PREC-TC-B04-3 | Min = Max = 500 returns the 500 invoice (inclusive) | Passed |  |
| PREC-TC-B04-4 | A range with no match gives no invoices without an error | Passed |  |
| PREC-TC-B04-5 | Min greater than Max is rejected with a message or returns nothing | Passed |  |
| PREC-TC-B05-1 | Minimum Payment Amount 300 | Passed |  |
| PREC-TC-B05-2 | Payment amount 300..800 | Passed |  |
| PREC-TC-B05-3 | Payment amounts do not filter the invoices | Passed |  |
| PREC-TC-B06-0 | Default limits are 50 | Passed |  |
| PREC-TC-B06-1 | Invoice Limit 1 returns one invoice | Passed |  |
| PREC-TC-B06-2 | Invoice Limit 2 and Payment Limit 1 are applied | Passed |  |
| PREC-TC-B06-5 | Empty limits return all entries | Passed |  |
| PREC-TC-B07-1a | حد الفواتير: letters and symbols are rejected | Passed |  |
| PREC-TC-B07-1b | حد الفواتير: a negative value is not accepted | Passed |  |
| PREC-TC-B07-1c | حد الفواتير: a limit accepts whole numbers only | Passed |  |
| PREC-TC-B07-2a | حد الدفعات: letters and symbols are rejected | Passed |  |
| PREC-TC-B07-2b | حد الدفعات: a negative value is not accepted | Passed |  |
| PREC-TC-B07-2c | حد الدفعات: a limit accepts whole numbers only | Passed |  |
| PREC-TC-B07-3a | الحد الأدنى لمبلغ الفاتورة: letters and symbols are rejected | Passed |  |
| PREC-TC-B07-3b | الحد الأدنى لمبلغ الفاتورة: a negative value is not accepted | Passed |  |
| PREC-TC-B07-4a | الحد الأقصى لمبلغ الفاتورة: letters and symbols are rejected | Passed |  |
| PREC-TC-B07-4b | الحد الأقصى لمبلغ الفاتورة: a negative value is not accepted | Passed |  |
| PREC-TC-B07-5a | الحد الأدنى لمبلغ الدفعة: letters and symbols are rejected | Passed |  |
| PREC-TC-B07-5b | الحد الأدنى لمبلغ الدفعة: a negative value is not accepted | Passed |  |
| PREC-TC-B07-6a | الحد الأقصى لمبلغ الدفعة: letters and symbols are rejected | Passed |  |
| PREC-TC-B07-6b | الحد الأقصى لمبلغ الدفعة: a negative value is not accepted | Passed |  |
| PREC-TC-B07-7 | A very large limit does not cause a server error | Passed |  |
| PREC-TC-B08-1 | Cost Center filter is sent to the server | Passed |  |
| PREC-TC-B08-3 | Bank / Cash Account filter is sent to the server | Passed |  |
| PREC-TC-B08-4 | Bank filter keeps payment entries that used this bank | Passed |  |
| PREC-TC-B08-5 | A bank with no payments of this party returns no payment entries | FAILED | PREC-01 |
| PREC-TC-B08-6 | Project filter with an unused project returns no payments | Passed |  |
| PREC-TC-B08-7 | Payments return the cost center stored on the Payment Entry | FAILED | PREC-02 |

## C - Unreconciled Entries tables (74 cases: 67 passed, 7 failed) - `Shamel/prec-c-tables.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PREC-TC-C01-1 | Invoices table lists exactly the submitted invoices with an outstanding balance | Passed |  |
| PREC-TC-C01-2 | Each invoice row shows its type, number, posting date and outstanding amount as stored | Passed |  |
| PREC-TC-C01-3 | Returned Amount = grand total and Outstanding = document outstanding | Passed |  |
| PREC-TC-C01-4 | Rows are numbered 1..n | Passed |  |
| PREC-TC-C01-5 | Every submitted payment entry with an unallocated amount is listed with date and available amount | Passed |  |
| PREC-TC-C01-6 | Return invoices with an available amount are listed in Payments | Passed |  |
| PREC-TC-C01-7 | The advance journal entry is listed in Payments | Passed |  |
| PREC-TC-C01-8 | Payments lists nothing else (no normal invoices, no allocated documents) | Passed |  |
| PREC-TC-C02-1 | Invoices table lists exactly the submitted invoices with an outstanding balance | Passed |  |
| PREC-TC-C02-2 | Each invoice row shows its type, number, posting date and outstanding amount as stored | Passed |  |
| PREC-TC-C02-3 | Returned Amount = grand total and Outstanding = document outstanding | Passed |  |
| PREC-TC-C02-4 | Rows are numbered 1..n | Passed |  |
| PREC-TC-C02-5 | Every submitted payment entry with an unallocated amount is listed with date and available amount | Passed |  |
| PREC-TC-C02-6 | Return invoices with an available amount are listed in Payments | Passed |  |
| PREC-TC-C02-7 | The advance journal entry is listed in Payments | Passed |  |
| PREC-TC-C02-8 | Payments lists nothing else (no normal invoices, no allocated documents) | Passed |  |
| PREC-TC-C03-1 | Invoices columns: No., Invoice Type, Invoice Number, Invoice Date, Outstanding Amount | Passed |  |
| PREC-TC-C03-2 | Payments columns: No., Reference Name, Posting Date, Amount | Passed |  |
| PREC-TC-C03-3 | All columns are fully visible without clipping at 1400px width | FAILED | PREC-03 |
| PREC-TC-C04-1 | Draft invoice ACC-SINV-2026-02912 is not listed | Passed |  |
| PREC-TC-C04-2 | Cancelled invoice ACC-SINV-2026-02913 is not listed | Passed |  |
| PREC-TC-C04-3 | Cancelled payment ACC-PAY-2026-03077 is not listed | Passed |  |
| PREC-TC-C05-1 | Invoice Number is a link | Passed |  |
| PREC-TC-C05-2 | The link opens the corresponding Sales Invoice | Passed |  |
| PREC-TC-C05-3 | The opened document is not an error / empty screen | Passed |  |
| PREC-TC-C06-1 | Full number shows only that invoice | Passed |  |
| PREC-TC-C06-2 | Part of the number works | Passed |  |
| PREC-TC-C06-3 | Search ignores letter case | Passed |  |
| PREC-TC-C06-4 | Leading / trailing spaces are ignored | Passed |  |
| PREC-TC-C06-5 | No match shows an empty table | Passed |  |
| PREC-TC-C06-6 | Clearing the search restores every invoice | Passed |  |
| PREC-TC-C06-7 | The search does not filter the payments table | Passed |  |
| PREC-TC-C07-1 | Header checkbox selects all rows and shows the action bar with the count | Passed |  |
| PREC-TC-C07-2 | Unticking the header hides the action bar | Passed |  |
| PREC-TC-C07-4 | Delete removes exactly the selected rows | Passed |  |
| PREC-TC-C07-5 | The row delete icon removes that payment row only | Passed |  |
| PREC-TC-C07-6 | Remaining rows are renumbered from 1 | Passed |  |
| PREC-TC-C07-7 | Deleting rows only removes them from the screen (documents stay submitted) | Passed |  |
| PREC-TC-C07-8 | Get Unreconciled Entries brings the removed rows back | Passed |  |
| PREC-TC-C08-1 | Invoice Edit Row shows Invoice Type, Number, Date, Outstanding Amount and Amount | Passed |  |
| PREC-TC-C08-2 | Invoice Edit Row values match the row | Passed |  |
| PREC-TC-C08-3 | All invoice popup fields are read-only labels | Passed |  |
| PREC-TC-C08-4 | Invoice Number inside Edit Row is clickable (opens the document) | Passed |  |
| PREC-TC-C08-5 | Payment Edit Row shows Reference Type, Name, Posting Date, Amount, Difference Amount, Remarks, Cost Center | Passed |  |
| PREC-TC-C08-6 | Payment Edit Row shows Journal Entry values | Passed |  |
| PREC-TC-C08-7 | Cost Center in the payment popup is a searchable dropdown (SRS) | Passed |  |
| PREC-TC-C08-8 | Return invoice payment shows reference type Invoice | Passed |  |
| PREC-TC-C08-9 | Payment Entry row shows reference type Payment Entry with remarks | Passed |  |
| PREC-TC-C09-1-1 | Invoices: settings popup has drag handles, column width, Add/Remove columns, Reset and Save | Passed |  |
| PREC-TC-C09-1-2 | Invoices: save button is labelled Update as in the SRS | FAILED | PREC-05 |
| PREC-TC-C09-1-3 | Invoices: default column width is 3 | Passed |  |
| PREC-TC-C09-1-4 | Invoices: column width accepts numbers only | FAILED | PREC-04 |
| PREC-TC-C09-1-5 | Invoices: column width maximum 3 characters | FAILED | PREC-04 |
| PREC-TC-C09-1-6 | Invoices: negative width is not accepted | Passed |  |
| PREC-TC-C09-1-7 | Invoices: empty width (below 1 character) is rejected or replaced by the default | Passed |  |
| PREC-TC-C09-1-8 | Invoices: Add/Remove lists every SRS column | Passed |  |
| PREC-TC-C09-1-10 | Invoices: ticking / unticking a column changes the table after saving | Passed |  |
| PREC-TC-C09-1-11 | Invoices: saved column choice persists after reopening the page | Passed |  |
| PREC-TC-C09-1-12 | Invoices: Reset to default restores the original columns | Passed |  |
| PREC-TC-C09-1-13 | Invoices: Cancel discards a width change | Passed |  |
| PREC-TC-C09-2-1 | Payments: settings popup has drag handles, column width, Add/Remove columns, Reset and Save | Passed |  |
| PREC-TC-C09-2-2 | Payments: save button is labelled Update as in the SRS | FAILED | PREC-05 |
| PREC-TC-C09-2-3 | Payments: default column width is 3 | Passed |  |
| PREC-TC-C09-2-4 | Payments: column width accepts numbers only | FAILED | PREC-04 |
| PREC-TC-C09-2-5 | Payments: column width maximum 3 characters | FAILED | PREC-04 |
| PREC-TC-C09-2-6 | Payments: negative width is not accepted | Passed |  |
| PREC-TC-C09-2-7 | Payments: empty width (below 1 character) is rejected or replaced by the default | Passed |  |
| PREC-TC-C09-2-8 | Payments: Add/Remove lists every SRS column | Passed |  |
| PREC-TC-C09-2-10 | Payments: ticking / unticking a column changes the table after saving | Passed |  |
| PREC-TC-C09-2-11 | Payments: saved column choice persists after reopening the page | Passed |  |
| PREC-TC-C09-2-12 | Payments: Reset to default restores the original columns | Passed |  |
| PREC-TC-C09-2-13 | Payments: Cancel discards a width change | Passed |  |
| PREC-TC-C09-3-1 | Saving a non-numeric column width falls back to the default (auto) | Passed |  |
| PREC-TC-C09-3-2 | Saving column width "12345" is refused or corrected to a valid 1-3 digit number | Passed |  |

## D - Allocate and Allocation table (46 cases: 46 passed, 0 failed) - `Shamel/prec-d-alloc.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PREC-TC-D01-1 | Allocate with nothing selected shows an error and no Allocation table | Passed |  |
| PREC-TC-D01-2 | Allocate with an invoice only selected shows an error and no Allocation table | Passed |  |
| PREC-TC-D01-3 | Allocate with a payment only selected shows an error and no Allocation table | Passed |  |
| PREC-TC-D02-1 | The Allocation table appears with one row | Passed |  |
| PREC-TC-D02-2 | Row shows Reference Name, Invoice Number, Allocated Amount and Difference Amount | Passed |  |
| PREC-TC-D02-3 | Allocated = min(outstanding 1000, payment 700) = 700 | Passed |  |
| PREC-TC-D02-4 | Difference Amount = outstanding - allocated = 300 | Passed |  |
| PREC-TC-D02-5 | Reconcile button is displayed | Passed |  |
| PREC-TC-D02-6 | Get Unreconciled Entries stays visible | Passed |  |
| PREC-TC-D02-7 | Allocation default columns: No., Reference Name, Invoice Number, Allocated Amount, Difference Amount | Passed |  |
| PREC-TC-D02-8 | Pressing Get Unreconciled Entries again clears the old allocation and Reconcile | Passed |  |
| PREC-TC-D03-1 | Two rows: 700 from the first payment and 1300 from the second | Passed |  |
| PREC-TC-D03-2 | The invoice is never over-allocated | Passed |  |
| PREC-TC-D03-3 | Difference of the last row is 0 when the invoice is fully allocated | Passed |  |
| PREC-TC-D04-1 | Payment 3000 covers 1000 + 2000 (oldest first), nothing left for the third | Passed |  |
| PREC-TC-D04-2 | The payment is never over-allocated | Passed |  |
| PREC-TC-D05-1 | Return invoice 200 allocates to invoice 500: allocated 200, difference 300 | Passed |  |
| PREC-TC-D05-3 | Journal entry 400 allocates to invoice 1000: allocated 400, difference 600 | Passed |  |
| PREC-TC-D06-1 | No invoice receives more than its outstanding amount | Passed |  |
| PREC-TC-D06-2 | No payment gives more than its amount | Passed |  |
| PREC-TC-D06-3 | All 3500 of outstanding is covered (payments total 4300) | Passed |  |
| PREC-TC-D06-4 | Table rows equal the server allocation | Passed |  |
| PREC-TC-D07-1 | Decimals are accepted | Passed |  |
| PREC-TC-D07-2 | Difference Amount is recalculated after editing (1000 - 500.55 = 499.45) | Passed |  |
| PREC-TC-D07-3 | Integers are accepted and the difference becomes 900 | Passed |  |
| PREC-TC-D07-4 | More than the payment amount (800 > 700) shows an error | Passed |  |
| PREC-TC-D07-5 | More than the invoice outstanding (1500 > 1000) shows an error | Passed |  |
| PREC-TC-D07-6 | Letters and symbols are rejected | Passed |  |
| PREC-TC-D07-7 | A negative amount is not accepted | Passed |  |
| PREC-TC-D07-8 | Zero is rejected with a message | Passed |  |
| PREC-TC-D07-9 | An empty mandatory amount shows an error | Passed |  |
| PREC-TC-D07-10 | The exact payment amount is accepted without error | Passed |  |
| PREC-TC-D08-1 | Rows that together exceed the invoice outstanding (700 + 2000 > 2000) raise an error | Passed |  |
| PREC-TC-D09-1 | All 10 SRS fields are in the popup | Passed |  |
| PREC-TC-D09-2 | Allocated Amount is marked mandatory | Passed |  |
| PREC-TC-D09-4 | Only Allocated Amount, Difference Posting Date and Debit / Credit Note Posting Date are editable | Passed |  |
| PREC-TC-D09-5 | Difference Posting Date defaults to the current date | Passed |  |
| PREC-TC-D09-6 | Empty Allocated Amount in the popup shows an error and is not applied | Passed |  |
| PREC-TC-D09-7 | Amount above the payment (900 > 700) shows an error in the popup | Passed |  |
| PREC-TC-D09-8 | A valid change in the popup updates the table row (250, difference 750) | Passed |  |
| PREC-TC-D09-9 | Cancel keeps the previous amount | Passed |  |
| PREC-TC-D10-1 | Deleting one allocation row keeps the other | Passed |  |
| PREC-TC-D10-2 | Bulk delete empties the Allocation table | Passed |  |
| PREC-TC-D10-3 | Reconcile is hidden when no allocation row is left | Passed |  |
| PREC-TC-D11-1 | Allocation settings popup: width, Add/Remove, Reset, Save | Passed |  |
| PREC-TC-D11-2 | Add/Remove lists every SRS allocation column | Passed |  |

## E - Reconcile (customer) (22 cases: 22 passed, 0 failed) - `Shamel/prec-e-reconcile.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PREC-TC-E01-1 | Reconcile with more than the payment (900 > 700) is refused with a message and changes nothing | Passed |  |
| PREC-TC-E01-2 | Reconcile with an empty amount is refused with a message and changes nothing | Passed |  |
| PREC-TC-E02-1 | A success confirmation message is displayed | Passed |  |
| PREC-TC-E02-2 | Invoice outstanding is reduced from 1000 to 400 | Passed |  |
| PREC-TC-E02-3 | Invoice status becomes Partly Paid (Overdue when the due date has passed) | Passed |  |
| PREC-TC-E02-4 | Payment unallocated amount is reduced from 700 to 100 | Passed |  |
| PREC-TC-E02-5 | Payment Entry references the invoice with allocated 600 | Passed |  |
| PREC-TC-E02-6 | No new Journal Entry is created for a payment-entry reconciliation | Passed |  |
| PREC-TC-E02-7 | The Reconcile button disappears after success | Passed |  |
| PREC-TC-E02-8 | The screen refreshes: invoice shows 400 and the payment shows 100 | Passed |  |
| PREC-TC-E02-9 | Payment Ledger has the -600 allocation against the invoice | Passed |  |
| PREC-TC-E02-10 | Get Unreconciled Entries returns the new balances | Passed |  |
| PREC-TC-E03-0b | A success confirmation message is displayed | Passed |  |
| PREC-TC-E03-1 | Invoice 2000 becomes fully Paid | Passed |  |
| PREC-TC-E03-2 | First payment fully used (0) and second keeps 1100 | Passed |  |
| PREC-TC-E03-3 | The first payment keeps its earlier reference too | Passed |  |
| PREC-TC-E03-4 | Paid invoice and used payment are no longer listed | Passed |  |
| PREC-TC-E04-1 | Invoice 02907 is fully paid by the journal entry | Passed |  |
| PREC-TC-E04-2 | The journal entry row now references the invoice | Passed |  |
| PREC-TC-E05-1 | Invoice 500 is reduced to 300 by the 200 return | Passed |  |
| PREC-TC-E05-2 | The return has nothing left to allocate | Passed |  |
| PREC-TC-E05-4 | Remaining entries: invoice 02909 (300) and payment 03073 (1100) only | Passed |  |

## F/G - Supplier and foreign currency (19 cases: 19 passed, 0 failed) - `Shamel/prec-f-supplier-usd.spec.ts`

| ID | Test case (expected behaviour) | Result | Bug |
|---|---|---|---|
| PREC-TC-F01-1 | Supplier allocation: 600 of 1500, difference 900 | Passed |  |
| PREC-TC-F01-2 | Success message for a supplier reconciliation | Passed |  |
| PREC-TC-F01-3 | Purchase invoice outstanding = 900 | Passed |  |
| PREC-TC-F01-4 | Supplier payment fully used and references the invoice | Passed |  |
| PREC-TC-F01-5 | No new Journal Entry for a supplier payment reconciliation | Passed |  |
| PREC-TC-F02-1 | Purchase return 100 allocates to the 800 invoice | Passed |  |
| PREC-TC-F02-2 | Invoice reduced to 700, return fully used, success message | Passed |  |
| PREC-TC-F03-1 | The two payments cover exactly the remaining 900 | Passed |  |
| PREC-TC-F03-2 | Invoice 1500 is fully paid | Passed |  |
| PREC-TC-F03-3 | Payment keeps the remainder and the journal entry references the invoice | Passed |  |
| PREC-TC-G01-1 | USD invoice 300 and USD payment 100 are returned in account currency | Passed |  |
| PREC-TC-G01-3 | Allocated 100, difference 200 (outstanding - allocated) | Passed |  |
| PREC-TC-G01-4 | A Difference Account is filled for the exchange difference | Passed |  |
| PREC-TC-G01-6 | Exchange Rate of the transaction is shown (payment 3.8 or invoice 3.7, not 1) | Passed |  |
| PREC-TC-G01-8 | The chosen Difference Posting Date (24-11) is sent | Passed |  |
| PREC-TC-G01-9 | Reconcile succeeds with the success message | Passed |  |
| PREC-TC-G01-10 | USD invoice outstanding = 200 and payment fully used | Passed |  |
| PREC-TC-G01-12 | The exchange difference of 10 SAR is posted to the Difference Account | Passed |  |
| PREC-TC-G01-13 | It is posted on the chosen Difference Posting Date | Passed |  |
