# SRS Azzrk SHAMEL - Accounting module V1.0 - Part: Sales Invoice

> Extract of `SRS-Azzrk-Shamel-Accounting-V.1.0.pdf` (PDF pages 1-94). The PDF is the source of truth.

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

- On Hold
- These columns are: Column Name Item Quantity Available Qty Shortage Qty Projected Qty Ordered Qty Requested Qt
- Barcode
- Label field
- Has item scanned
- Checkbox icon (read only)
- Grand Commision
- Incoterm (Hidden)
- Get Advance Received
- Contact (Hidden)
- Commission (Hidden)
- Minimum length: 2 characters.
- Setting
- actions:
- Delete row
- Sales Person
- Searchable DDL
- Contribution (%)
- Text input field
- Contribution to Net Total
- Commission Rate
- Incentives
- Auto repeat (Hidden)
- Link “Auto Repeat” doctype
- UTM Analytics (Hidden)
- Hold (Hidden)
- When clicked, the sales invoice status is set to its previous status
- Maintenance Schedule
- POS Invoice
- Payment Request
- Invoice Discounting

## Index

- Use case 1 - Sales Invoice List: page 1
- Use case 2 - Add Sales Invoice, Details tab: page 5
- Use case 3 - General Info tab: page 54
- Use case 4 - More Info tab: page 78
- Use case 5 - Sales Invoice Details (view / edit / actions): page 88


# Use case 1 - Sales Invoice List

<!-- page 1 -->

**Sales Invoice................................................................................................................................0**

**Sales Invoice List.....................................................................................................................0**

**Add Sales Invoice....................................................................................................................3**

**Details Tab......................................................................................................................... 3**

**General Info Tab.............................................................................................................. 53**

**More Info Tab...................................................................................................................77**

**Sales Invoice Details............................................................................................................. 87**

**Sales Invoice**

**Sales Invoice List**

**Use case ID**

**1**

**Use  case**

**Sales Invoice List**

**Name**

**Descriptions**

**The user is able to view the list of Sales Invoices.**

**Pre conditions**
- Click on Selling from sidebar
- Click on Sales Invoice from sidebar

**Main Flow**

**-**

**Components**
- Add Sales Invoice
  - Button
  - For adding a new Sales Invoice
  - When clicked, the user will be redirected to the “Add Sales Invoice” screen.
- Sales Invoice List
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - Sales Invoice ID
      - It displays the sales invoice ID
      - Clickable
      - When clicked, the user will be redirected to the “Sales Invoice Details” screen.
    - Invoice Status
      - Label field

<!-- page 2 -->
  - It displays the Sales Invoice status
  - It shows one of the following values:
    - Draft
    - Unpaid
      - It is displayed when the document is submitted & Grand Total = Outstanding
    - Partially Paid
      - It is displayed when the document is submitted & Grand Total > Outstanding
    - Fully Paid
      - It is displayed when the document is submitted & Outstanding = 0
    - Overdue
      - It is displayed when the document is submitted & the due date of payment term is > current date and the invoice is not paid
    - Return
      - It is displayed when the document is submitted and (Is Return = 1)
    - Fully Credited
      - It is displayed when the document is submitted and Outstanding= 0 and Grand Total = Credit Amount
    - **[HIDDEN]** On Hold
      - **[HIDDEN]** It is displayed when Hold button is clicked
    - **[HIDDEN]** Closed
      - **[HIDDEN]** It is displayed when Close button is clicked
    - Cancelled
      - It is displayed when the document is cancelled.
- Credit Staus
  - Label field
  - It displays the Credit status of the Sales Invoice
  - It shows one of the following values:
    - Not Applicable
      - It is displayed only when the Invoice Status = Draft
    - No Credit
      - It is displayed when the Credit Amount = 0
    - Partially Credited
      - It is displayed when the Credit Amount > 0
    - Fully Credited
      - It is displayed when Sum of total “Amounts” of submitted sales invoice where:
        - Is Return = 1
        - Return Against = this Invoice is equal to Grand Total
- Refund Status
  - Label field
  - It displays the Refund status of the Sales Invoice

<!-- page 3 -->
    - It shows one of the following values:
      - Not Applicable
        - It is displayed only when the Invoice Status = Draft
      - No Refund
        - It is displayed when Refund Amount = 0
      - Partially Refunded
        - It is displayed when Refund Amount > 0
      - Fully Refunded
        - It is displayed when Refund Amount > 0
        - And Refund Amount = Paid Amount
  - Customer Name
    - It displays the customer name
  - Posting Date
    - It displays the the accounting date on which the Sales Invoice is posted
  - Payment Due date
    - Displays the due date for the Sales Invoice payment
  - Grand Total
    - It displays the Grand Total
- when a Sales invoice is selected , an action bar appears showing the following actions:
- Edit
  - Button
  - When clicked , a popup appears containing the following fields.
    - Field
      - DDL
      - To select the field you want to edit
      - Link “Sales Invoice” doctype
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
        - If the Sales Invoice status is "submitted" or "Cancelled":
          - an error message is displayed informing the user that the Sales invoice cannot be modified.
- Export

<!-- page 4 -->
  - Assign to
  - Clear assignment
  - Add tags
  - Print
  - Submit
    - It appears only when the Sales invoice status = Draft.
    - If all required data is entered correctly and completely:
      - The Sales invoice is successfully submitted.
  - Cancel
    - It appears only when the Sales invoice status = submitted
    - When clicked,
      - The Sales invoice was canceled successfully.
      - And “Cancel” button changes to “Amend”
  - Delete
    - It appears only when the Sales Invoice status = Draft / Cancelled
    - When clicked,
      - A confirmation message is displayed to the user whether they want to delete this Sales invoice
      - Upon clicking the “Yes” button:
        - If other Sales Invoice is Amended from this Sales Invoice
          - A warning message appears indicating that this Sales Invoice cannot be deleted until the user deletes all doctypes related to it.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - if the Sales Invoice is linked to other transactions,
          - a message is displayed informing the user that the linked transactions must be deleted before the Sales Invoice can be deleted.
          - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - If the Sales Invoice isn’t linked to another doctype
          - The Sales Invoice is deleted successfully.

**Post**
- Ability to add and view Sales Invoice details.

**Conditions**
- Ability to Edit , Export , Assign to, Clear Assignment , Add Tags , Print , Delete

# Use case 2 - Add Sales Invoice, Details tab

<!-- page 5 -->

**Add Sales Invoice**

**Details Tab**

**Use case ID**

**2**

**Use  case**

**Add Sales Invoice**

**Name**

**Descriptions**

**The user can add a new sales invoice.**

**Pre conditions**
- Click on Selling from sidebar
- Click on Sales Invoice from sidebar
- Click on “Add Sales Invoice” button

**Main Flow**

**-**

**Components**
- Company
  - Searchable DDL
  - Link “Company” doctype
  - To select the company for which the Sales Invoice will be recorded
  - Single selection
  - Mandatory
  - If the field is left empty, an error message will appear.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Company Tax ID
  - Label field (read only)
  - It displays the company tax ID fetched from the selected company.
- Series
  - DDL
  - Displays all series added to Sales invoice doctype
  - Mandatory.
  - Single selection
  - If the field is left empty an error message appears.
- Customer
  - Searchable DDL
  - Link “Customer” doctype
  - To select the customer for whom the Sales Invoice is created.
  - Single selection
  - Mandatory
  - If the field is left empty, an error message will appear.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Customer Name
  - Label field (read only)
  - It displays the customer name fetched from the selected customer.

<!-- page 6 -->
- Tax ID
  - Label field (read only)
  - It displays the customer tax ID fetched from the selected customer.
- Posting Date
  - Date calendar picker
  - To select the accounting date on which the Sales Invoice is posted
  - Mandatory
  - It has a default value “currend date”
  - If the field is left empty an error message appears.
  - Note: it is enabled only when the Edit posting date and time checkbox is checked
- Posting Time
  - Time picker
  - To select the posting time of the Sales Invoice
  - Optional
  - It has a default value “currend time”
  - Note: it is enabled only when the Edit posting date and time checkbox is checked
- Edit Posting Date And Time
  - Checkbox
  - When checked, the user can modify the Posting date and Posting Time
  - When unchecked, the Posting Date and Posting Time fields become read-only and cannot be edited.
- Payment Due Date
  - Date calendar picker
  - To select the due date for the Sales Invoice payment
  - Mandatory
  - If the field is left empty an error message appears.
- Include payment (POS)
  - Checkbox icon (read only)
  - Indicates whether the Sales Invoice was created as a Point of Sale (POS) transaction.
  - The value is set automatically by the system and is displayed only when the invoice is created from the POS and cannot be modified by the user
- POS Profile
  - Label field (read only)
  - Displays the Profile used to apply the Point of Sale settings to the Sales Invoice
- Is Consolidated
  - Checkbox icon (read only)
  - Indicates that this Sales Invoice is generated as a consolidated invoice.
- Is Return (Credit Note)
  - Checkbox icon (read only)
  - It displays whether this sales invoice is returned from other sales invoice
  - Checked only when this sales invoice is returned from other sales invoice
- **[YELLOW]** Is Rate Adjustment Entry (Debit Note)
  - **[YELLOW]** Checkbox
  - **[YELLOW]** Indicates that the Sales Invoice is a Debit Note created to adjust the rate of an existing Sales Invoice while retaining the original invoice quantities.

<!-- page 7 -->
  - **[YELLOW]** When checked, the “Source Invoice” field is displayed
- **[YELLOW]** Source Invoice
  - **[YELLOW]** Searchable DDL
  - **[YELLOW]** Link "Sales Invoice” doctype
  - **[YELLOW]** To select the original Sales Invoice against which the return is created
  - **[YELLOW]** Note: it’s name in ERPNext = Return Against
  - **[YELLOW]** Single selection
  - **[YELLOW]** Optional
  - **[YELLOW]** Note: it’s displayed only when the “Is Rate Adjustment Entry (Debit Note) = 1”
- Update Outstanding for Self
  - Checkbox
  - Determines whether this Sales Invoice updates its own outstanding balance. The outstanding amount represents the remaining unpaid balance after considering all related payments, credit notes, returns, and other accounting transactions.
  - When checked, the outstanding amount is updated on this document itself rather than on the linked reference document
  - When unchecked,
    - The system does not update the outstanding amount of this Sales Invoice automatically
    - The Amount of this sales invoice is allocated to the original sales invoice only if:
      - The amount of the original sales invoice must be greater than or equal to the current sales invoice
  - Note: it’s checked by default
- Update Billed Amount in Sales Order
  - Checkbox
  - When checked, the system will update the billed amount in the linked Sales Order
  - Note: it’s displayed only when the “Is Return (Credit Note) = 1”
- Update Billed Amount in Delivery note
  - Checkbox
  - When checked, the system will update the billed amount in the linked Delivery Note
  - Note: it’s displayed only when the “Is Return (Credit Note) = 1”
- Consider for Tax Withholding
  - Checkbox
  - Enable this option to apply withholding tax to the Sales Invoice.
- Amended From
  - Label field
  - Displays the Sales invoice from which this document was amended.
  - Clickable
  - When clicked, it navigates the user to the Sales invoice from which this document was amended.
  - Note: This field is displayed only if this Sales invoice is amended from another Sales invoice.
- Is Created Using POS
  - Checkbox icon (read only)
  - Indicates that the Sales Invoice was created using the Point of Sale (POS).

<!-- page 8 -->
  - It is displayed only when the Sales Invoice was created using the Point of Sale (POS).
- POS Closing Entry
  - Label field (read only)
  - Displays the POS Closing Entry associated with the Sales Invoice.
- Accounting Dimensions
  - It contains the following fields:
    - Cost Center
      - Searchable DDL
      - Link "Cost Center” doctype
      - Used to specify the department or business unit that will bear the expense or receive the revenue.
      - Single selection
      - Optional
    - Project
      - Searchable DDL
      - Link "Project” doctype
      - Used to link the transaction to a specific project.
      - Single selection
      - Optional
- Currency and Price List
  - It contains the following fields:
    - Currency
      - Searchable DDL
      - Link “Currency” doctype
      - To select the document currency
      - Single selection
      - Mandatory
      - If the field is left empty, an error message will appear.
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
      - Note: it’s fetched from the Company “Default Currency”
    - Exchange Rate
      - The behavior of the Exchange Rate field depends on the Exchange Rate configuration in Accounts Settings
      - Case 1:
        - Exchange Rate Fetching Rule is configured
          - If an Exchange Rate Fetching Rule is defined in Accounts Settings, the system shall automatically fetch the exchange rate based on the configured rule and populate the Exchange Rate field.
          - In this case Exchange Rate field is Label Field (read only)
          - Note:
            - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts

<!-- page 9 -->

**Settings) shall be allowed to modify its value**
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
          - only users with the appropriate Role to edit the Exchange Rate(Configured in

<!-- page 10 -->

**Accounts Settings) shall be**

**allowed to modify its value**
          - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
- Price List
  - Searchable DDL
  - Link “Price List” doctype
  - Single selection
  - Mandatory
  - If the field is left empty, an error message will appear.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
  - Note: it’s set by default as “Standard Price List” in selling settings
- Price List Currency
  - Label field (read only)
  - Fetched from Price list’s “Currency” field
- Price List Exchange Rate
  - The behavior of the Price List Exchange Rate field depends on the Exchange Rate configuration in Accounts Settings
  - Case 1:
    - Exchange Rate Fetching Rule is configured
      - Exchange Rate Fetching Rule is defined in Accounts Settings, the system shall automatically fetch the exchange rate based on the configured rule and populate the Exchange Rate field.
      - In this case Exchange Rate field is Label Field (read only)
      - Note:
        - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
        - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
  - Case 2:
    - No Exchange Rate Found
      - If no exchange rate is found based on the configured fetching rule, the system shall evaluate the Action if No Exchange Rate Found field in

<!-- page 11 -->

**Accounts Settings.**
    - Prompt User to Add Exchange Rate:
      - The system shall prompt the user to create a new Exchange Rate record before proceeding.
      - Once the Exchange Rate is created, the system shall populate the Exchange Rate field.
      - The Exchange Rate field shall remain read-only
      - Note:
        - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
        - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
    - Use API to Get Exchange Rate
      - The system shall automatically retrieve the Exchange Rate using the configured external API.
      - After the Exchange Rate is successfully created, the system shall populate the Exchange Rate field.
      - The Exchange Rate field shall remain read-only.
      - Note:
        - only users with the appropriate Role to edit the Exchange Rate(Configured in Accounts Settings) shall be allowed to modify its value
        - Any manually entered Exchange Rate by an authorized user shall override the automatically fetched Exchange Rate and shall be considered the effective value for the transaction.
- Ignore Pricing Rule
  - Checkbox

<!-- page 12 -->
        - When checked, the system ignores any Pricing Rules if the selected Price List already has Pricing Rules configured.
- Scan Barcode
  - Text input field
  - Allows the user to enter or scan a barcode.
  - optional.
  - Accepts letters,numbers and special characters.
  - Minimum length: 2 characters.
  - Maximum length: 100 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - Note:
    - When a scan barcode option is selected, the system opens a device camera to scan a barcode and automatically populates the field with the scanned value.
    - If the user enters a barcode manually at a slow typing speed, the entered value is automatically cleared
- Source Warehouse
  - The user can select a default warehouse to automatically populate the Warehouse field for all items in the item table, but only for rows where the Warehouse field is empty. Existing warehouse values will not be overwritten.
  - Searchable DDL
  - Link “Warehouse” doctype
  - Displays only child warehouses that belong to the selected company, where the “Is Group warehouse” option is disabled.
  - Single selection
  - Optional
  - Note: it’s displayed only when the “Update Stock = 1”
- Update Stock
  - Note: it appears only when “Allow Update Stock In Sales Invoice” is checked in Selling Settings.
  - Checkbox
  - When checked,
    - the system will create both the Stock Ledger Entries and the Accounting Entries when the invoice is submitted.
    - The item quantities will be deducted from inventory immediately
  - If a separate Delivery Note will be created, this option should be left disabled.
  - Important Notes: if “Allow Update Stock In Sales Invoice” is checked in Selling Settings and a new invoice is being created:
    - If “Include Payment (POS)” = 1
      - “Update Stock” value is fetched from the “POS Profile” doctype
      - And it will be label field (read only)
    - If this Sales Invoice is created from delivery note
      - “Update Stock” value will be unchecked
      - And it will be label field (read only)
    - If there is no Stock Items in Items table
      - “Update Stock” value will be unchecked
      - And it will be label field (read only)

<!-- page 13 -->
    - If there is at least one Dropshipping Item in Items table
      - “Update Stock” value will be unchecked
      - And it will be label field (read only)
    - If the 4 previous rules not found
      - “Update Stock” value will be checked
      - And it will be input field (editable)
- Items
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - Item Code
      - Searchable DDL
      - Link “item” doctype
      - To select the item included in the sales invoice
      - Only items with “Is Fixed Asset” disabled, “Has Variants” disabled and “Allow Sales” enabled are displayed..
      - Single selection
      - Mandatory
      - If the field is left empty, an error message will appear.
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Qty
      - Text input field.
      - To enter the item Qty
      - Mandatory.
      - Accept numbers only.
      - Maximum length: 100 characters.
      - Once the maximum length is reached, further input is prevented.
      - If the field is left empty an error message appears.
      - Note: Qty <= Actual Qty in the selected warehouse - Reserved Qty in that warehouse
      - Note: If a quantity less than the available quantity in the selected warehouse is entered, a warning message is displayed indicating that the entered quantity is less than the available quantity in the selected warehouse.
    - Available Qty
      - Label field (read only)
      - It displays the available Qty in the selected source warehouse
      - Note: Available Qty = Actual Qty in the selected warehouse - Reserved Qty in that warehouse
    - Shortage Qty
      - Label field (read only)
      - It displays the shortage Qty in the selected source warehouse
      - Note: Shortage Qty = Qty - Available Qty in that warehouse

<!-- page 14 -->
  - Note:
    - The Shortage Quantity is calculated and displayed in real time only after the user enters the Qty value.
    - If the Shortage Quantity is less than or equal to 0,
      - It means there is no shortage and the available quantity is sufficient.
    - If the Shortage Quantity is greater than 0,
      - It indicates that there is a shortage.
      - In this case, the system's behavior depends on the Selling Settings configuration: it will either Ignore the shortage and allow the user to proceed, display a Warning while allowing the user to continue, or Block the transaction and prevent the user from proceeding.
- Rate
  - Text input field
  - Displays automatically the unit price of the item in the document currency
  - Can be edited.
  - Accepts numbers only.
- Amount
  - Label field
  - Displays the total amount of the item calculated in the document currency.
- Warehouse
  - Searchable DDL
  - Link “Warehouse” doctype
  - To select the warehouse from which the item quantity will be issued.
  - Displays only child warehouses that belong to the selected company, where the “Is Group warehouse” option is disabled.
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
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

<!-- page 15 -->
  - Default value = 3
- Add / Remove columns
  - Button
  - For adding or removing columns from the table
  - When clicked, a pop-up appears containing all available table columns with their corresponding checkboxes.
  - **[HIDDEN]** These columns are: Column Name Item Quantity Available Qty Shortage Qty Projected Qty Ordered Qty Requested Qty Returned Qty Rate Amount Warehouse Barcode Has Item Scanned Item Name

**Description**

**Stock UOM**

**UOM**

**UOM Conversion Factor**

**Qty as per Stock UOM**

**Price List Rate**

**Price List Rate (Company Currency)**

**Margin Type**

<!-- page 16 -->

**Margin Rate or Amount**

**Rate With Margin**

**Discount (%) on Price List Rate with Margin**

**Discount Amount**

**Distributed Discount Amount**

**Rate With Margin (Company Currency)**

**Item Tax Template**

**Tax Withholding Category**

**Rate (Company Currency)**

**Amount (Company Currency)**

**Rate of Stock UOM**

**Is Free Item**

**Consider for Tax Withholding**

**Grant Commission**

**Allow Zero Valuation Rate**

**Net Rate**

**Net Amount**

**Net Rate (Company Currency)**

**Net Amount (Company Currency)**

**Delivered By Supplier**

**Income Account**

**Asset**

**Finance Book**

**Expense Account**

**Deferred Revenue Account**

**Service Stop Date**

**Enable Deferred Revenue**

**Service Start Date**

**Service End Date**

<!-- page 17 -->

**Weight Per Unit**

**Total Weight**

**Weight UOM**

**Quality Inspection**

**Pick Serial / Batch No**

**Incoming Rate (Costing)**

**Available Batch Qty at Warehouse**

**Qty (Warehouse)**

**Qty (Company)**

**Sales Order**

**Sales Invoice Item**

**Delivery Note**

**Delivered Qty**

**POS Invoice**

**POS Invoice Item**

**Purchase Order**

**Purchase Order Item**

**Cost Center**

**Project**
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

<!-- page 18 -->
    - Button
    - To delete a specific row or multiple rows
    - When clicked, the selected item group(s) will be deleted
- Edit Row
  - Clickable icon
  - Users can edit and view non displayed fields in the table.
  - When clicked , a pop up appears containing the following fields: Field Name Options

**Barcode** **[HIDDEN]**
      - **[HIDDEN]** Label field
      - **[HIDDEN]** It displays the item barcode
      - **[HIDDEN]** Note: it’s fetched from the selected item

**Has item scanned** **[HIDDEN]**
      - **[HIDDEN]** Checkbox icon (read only)
      - **[HIDDEN]** It appears only when there is a scanned items

**Item code**
      - Searchable DDL
      - Link “item” doctype
      - To select the item included in the sales invoice
      - Only items with “Is Fixed Asset” disabled, “Has Variants” disabled and “Allow Sales” enabled are displayed..
      - Single selection
      - Mandatory
      - If the field is left empty, an error message will appear.
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Item Group**
      - Label field
      - Displays the item group associated with the selected item
      - Note: it’s fetched from the selected item

**Item Name**
      - Label field
      - Displays the item name

<!-- page 19 -->
- Note: it’s fetched from the selected item

**Description**
- Text area
- For adding a description to this sales invoice item
- Optional
- Accepts letters, numbers, and special characters.
- Minimum length: 3 characters.
- Maximum length: 500 characters.
- Once the maximum limit is reached, further input will be prevented.
- An error message will appear if the entered text is less than the minimum length.
- An error message will appear if invalid data is entered.

**Brand name**
- Label field
- Displays the brand name
- Note: it’s fetched from the selected item

**Image**
- Image (read only)
- It’s fetched from the selected item and cannot be edited.

**Qty**
- Text input field.
- To enter the item Qty
- Mandatory.
- Accept numbers only.
- Maximum length: 100 characters.
- Once the maximum length is reached, further input is prevented.
- If the field is left empty an error message appears.
- Note: Qty = Actual Qty in the selected warehouse - Reserved Qty in that warehouse
- Note: If a quantity less than the available quantity in the selected warehouse is entered, a warning message is displayed indicating

<!-- page 20 -->

**that the entered quantity is less**

**than the available quantity in the**

**selected warehouse.**

**Available Qty**
- Label field (read only)
- It displays the available Qty in the selected source warehouse
- Note: Available Qty = Actual Qty in the selected warehouse - Reserved Qty in that warehouse

**Shortage Qty**
- Label field (read only)
- It displays the shortage Qty in the selected source warehouse
- Note: Shortage Qty = Qty - Available Qty in that warehouse
- Note:
  - The Shortage Quantity is calculated and displayed in real time only after the user enters the Qty value.
  - If the Shortage Quantity is less than or equal to 0,
    - It means there is no shortage and the available quantity is sufficient.
  - If the Shortage Quantity is greater than 0,
    - It indicates that there is a shortage.
    - In this case, the system's behavior depends on the Selling Settings configuration: it will either Ignore the shortage and allow the user to proceed, display a Warning while allowing the user

<!-- page 21 -->

**to continue, or**

**Block the**

**transaction and**

**prevent the user**

**from proceeding.**

**UOM**
- Searchable DDL
- Link “UOM” doctype
- To select the UOM for the requested Qty
- Displays only the UOMs defined for this item in its UOM table.
- Single selection
- Mandatory

**Stock UOM**
- Label field
- Displays the default UOM of the selected item

**UOM Conversion Factor**
- Label field
- Displays the conversion factor between the UOM of the requested Qty and the default UOM.

**Qty as Per Stock UOM**
- Label field (read only)
- Displays the item quantity converted to the item's Stock UOM (Stock Unit of Measure) based on the selected UOM conversion factor.

**Price List rate (Currency)**
- Label field
- Displays the item's selling price retrieved from the selected Price List before applying any pricing rules

**Price List rate (Company Currency)**
- Label field
- Displays the item's selling price

<!-- page 22 -->

**retrieved from the selected Price**

**List in company’s base currency**

**before applying any pricing rules**

**Margin Type**
- DDL
- Used to select the profit margin calculation method
- Single selection
- Optional
- It displays the following values:
  - Percentage
  - Amount

**Margin Rate or Amount**
- Text input field.
- To enter the profit margin value
- optional.
- Accept numbers and special characters only.

**Rate with margin**
- Label field
- Displays the price after applying the profit margin and before applying any pricing rules
- Note: Rate With Margin = Price List Rate + Margin Rate

**Discount (%) on price list rate with margin**
- Label field
- Displays the discount percentage applied to the price list after the profit margin has been added
- Note: It displays only when, “Ignore Pricing Rule = 0”

**Discount Amount**
- Label field
- Displays the actual discount amount
- Note: It displays only when, “Ignore Pricing Rule = 0”

**Distributed Discount Amount**
- Label field

<!-- page 23 -->
- When an additional discount is applied at the document level, the system distributes the total discount across all items and displays this item's allocated share of the discount.

**Rate with Margin (Company Currency)**
- Label field
- Displays the item price after applying the profit margin in the company's base currency

**Rate**
- Label field
- Displays the unit price of the item in the document currency

**Amount**
- Label field
- Displays the total amount of the item calculated in the document currency.

**Item Tax template**
- Label field
- Displays the taxes applied to this item.

**Rate (Company Currency)**
- Label field
- Displays the unit price of the item in the company’s base currency after applying all pricing rules and discounts.

**Amount (Company Currency)**
- Label field
- Displays the total amount of the item calculated in the company’s base currency.

**Pricing Rules**
- Label field
- Displays the names of the pricing rules applied to this item

<!-- page 24 -->

**Rate of Stock UOM**
- Label field
- Displays the price of Stock UOM

**Is Free Item**
- Checkbox icon (read only)

**Consider for tax withholding**
- Checkbox icon (read only)
- Displays whether the withholding tax is applied to the Sales Invoice or not.

**Grand Commision** **[HIDDEN]**
- **[HIDDEN]** Checkbox icon (read only)

**Allow zero valuation rate**
- Checkbox
- Allows the item to be delivered even its stock value is zero

**Net Rate**
- Label field
- Displays the unit price of the item in the document currency after applying all pricing rules, discounts and tax templates.

**Net Amount**
- Label field
- Displays the total amount of the item calculated in the document currency after applying all pricing rules, discounts and tax templates.
- Note: Net Amount = Net Rate * Qty

**Net Rate (Company Currency)**
- Label field
- Displays the unit price of the item in the company’s base currency after applying all pricing rules, discounts and tax templates.

**Net Amount (Company Currency)**
- Label field
- Displays the total amount of the item calculated in the company’s base currency after applying all pricing rules, discounts and tax

<!-- page 25 -->

**templates.**

**Delivered by supplier**
- Checkbox icon
- When checked:
  - It means that the supplier delivers the order directly to the customer instead of the company.

**Income Account**
- Searchable DDL
- Link “Accounts” doctype
- To select the income account
- Single selection
- Mandatory

**Expense Account**
- Searchable DDL
- Link “Accounts” doctype
- To select the expense account
- Single selection
- Optional

**Is Fixed Asset**
- Checkbox icon (read only)

**Discount Account**
- Searchable DDL
- Link “Accounts” doctype
- To select the Discount account
- Single selection
- Optional

**Asset**
- Searchable DDL
- Link “Asset” doctype
- Single selection
- Optional

**Finance Book**
- Searchable DDL
- Link “Finance Book” doctype
- Single selection
- Optional
- It appears only when  the “Asset” field is entered

<!-- page 26 -->

**Enable deferred revenue**
- Checkbox
- Its value is fetched from the Item Details and it can be edited.
- When checked, the following fields are displayed;
  - Deferred revenue account
  - Service start date
  - Service end date
  - Service stop date

**Deferred revenue account**
- Searchable DDL
- Link “Accounts” doctype

**Service start date**
- Date calendar picker

**Service end date**
- Date calendar picker

**Service stop date**
- Date calendar picker

**Weight per unit**
- Label field
- Displays the weight per item unit

**Weight UOM**
- Label field
- Displays the weight of the UOM itself

**Total weight**
- Label field
- Displays the total weight of the item
- Note: Total Weight = Weight per Unit * Qty

**Warehouse**
- Searchable DDL
- Link “Warehouse” doctype
- To select the warehouse from which the item quantity will be issued.
- Displays only child warehouses that belong to the selected

<!-- page 27 -->

**company, where the “Is Group**

**warehouse” option is disabled.**
- Single selection
- Mandatory

**Quality inspection**
- Label field
- Displays the quality inspection document linked to this item

**Incoming rate**
- Text input field
- Stores the inventory valuation rate (cost per unit) used by the system when updating stock.

**Available batch Qty at warehouse**
- Label field
- Displays the available batch Qty at warehouse

**Pick Serial / batch No**
- Button
- Appears only when the “Activate Serial / Batch No for item” checkbox is enabled from Inventory settings
- When clicked, the available Serial Numbers and Batches are automatically selected based on the picking method defined in Inventory Settings, such as FIFO, LIFO, or Expiry.

**Serial and Batch Bundle**
- Searchable DDL
- Link "Serial and Batch Bundle” doctype
- To select serial and batch bundle related to this item
- Single selection
- Optional

**Use Serial No / Batch Fields**
- Checkbox
- When checked:
  - the "Pick Serial and

<!-- page 28 -->

**Batch No" button and the**

**"Serial and Batch**

**Bundle" field are hidden**
  - The "Serial No" and "Batch No" fields are displayed to allow manual entry of Serial Numbers and Batches.

**Serial No**
- Text area
- To enter serial numbers manually
- It appears only when “Use Serial No / Batch No” is checked
- Optional
- Accepts letters, numbers, and special characters.
- Minimum length: 3 characters.
- Maximum length: 500 characters.
- Once the maximum limit is reached, further input will be prevented.
- An error message will appear if the entered text is less than the minimum length.
- An error message will appear if invalid data is entered.
- When a Serial Number is entered and the Enter key is pressed, a new line is created to allow entry of another Serial Number.

**Batch No**
- Searchable DDL
- Link "Batch No” doctype
- To select Batch No related to this item and the selected warehouse.
- Single selection
- Optional

**Qty (warehouse)**
- Label field
- Displays the actual quantity of the selected warehouse

<!-- page 29 -->

**Qty (company)**
- Label field
- Displays the actual quantity of the company

**Projected Qty**
- Label field (read only)
- Displays the projected available quantity after considering current stock, incoming stock, and reserved quantities.

**Ordered Qty**
- Label field (read only)
- Displays the total quantity of the item committed in submitted Sales Orders.

**Requested Qty**
- Label field (read only)
- Displays the quantity requested through Material Requests related to the Sales Order.

**Returned Qty**
- Label field (read only)
- Displays the quantity of the item returned by the customer.

**Against sales order**
- Label field
- Displays the sales order from which this sales invoice  was created , if available.
- Clickable
- When clicked, the user is redirected to the sales order related to this sales invoice

**Against sales order item**
- Label field
- Displays the specific item row in the linked sales order that corresponds to this item.

**Against sales invoice item**
- Label field
- Appears when this sales invoice

<!-- page 30 -->

**is linked to another sales invoice**

**in certain internal processes or**

**when derived documents are**

**created.**

**Against delivery note**
- Label field
- Displays the delivery note from which this sales invoice was created , if available.
- Clickable
- When clicked, the user is redirected to the delivery note related to this sales invoice

**Against Delivery Note Item**
- Label field
- Displays the specific item row in the linked delivery note that corresponds to this item.

**Delivered Qty**
- Label field
- Displays the sales invoice delivered Qty

**Pos invoice**
- Label field
- Displays the POS Invoice from which this invoice item was generated. This field is automatically populated by the system and is read-only.

**Pos invoice item**
- Label field
- Displays the corresponding item row from the source POS Invoice. This field is automatically populated by the system and is read-only.

**Cost Center**
- Searchable DDL

<!-- page 31 -->
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
  - Add  Row
    - Button
    - To add a new row in the table
    - When clicked, a new row is added to the table.
- Total Quantity
  - Label field (read only)
  - Displays the total quantity of items.
- Total Currency
  - Label field (read only)
  - Displays the total amount of the item’s quantity in the selected currency
- Total Company’s base Currency
  - Label field (read only)
  - Displays the total amount of the item’s quantity in the company’s base currency
- Total Net weight
  - Label field (read only)
  - Displays the total net weight
- Net Total Currency
  - Label field (read only)
  - Displays the net total currency
- Net Total Company’s base Currency
  - Label field (read only)
  - Displays the net total company’s base currency
- Taxes And Charges
  - It contains the following fields:
    - Tax category
      - Label field (read only)
      - It fetched from the selected “Sales Taxes and Charges Template”
    - Shipping Rule
      - Searchable DDL
      - Link “Shipping Rule” doctype

<!-- page 32 -->
  - To select a shipping rule
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- **[HIDDEN]** Incoterm (Hidden)
  - **[HIDDEN]** Searchable DDL
  - **[HIDDEN]** Link “Incoterm” doctype
  - **[HIDDEN]** Single selection
  - **[HIDDEN]** Optional
  - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- **[HIDDEN]** Named Place (Hidden)
  - **[HIDDEN]** Text input field.
  - **[HIDDEN]** To specify the location associated with the selected incoterm
  - **[HIDDEN]** Optional
  - **[HIDDEN]** Accept letters, numbers and special characters.
  - **[HIDDEN]** Maximum length: 100 characters.
  - **[HIDDEN]** Once the maximum length is reached, further input is prevented.
  - **[HIDDEN]** Note: it appears only after selecting an Incoterm
- Sales Taxes and Charges Template
  - Searchable DDL
  - Link “Sales Taxes and Charges Template" doctype
  - When a template is selected, its details are fetched and populated into the sales taxes and charges table.
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Sales Taxes and Charges
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - **[YELLOW]** Mode
      - DDL
      - To select the sales taxes type
      - It contains the following values:
        - Actual
        - On Net Total
        - On Previous Row Amount
        - On Previous Row Total

<!-- page 33 -->
    - On Item Quantity
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
  - optional .
  - Accept numbers only.
  - Maximum length: 100 characters.
  - Once the maximum length is reached, further input is prevented.
- Net Amount Currency
  - Label field
  - Displays the net amount currency
- Amount Currency
  - Label field
  - Displays the amount currency
- Total Currency
  - Label field
  - Displays the total currency
- Setting
  - When clicked, a pop up appears contains the following options :
    - Rearranging table columns using drag and drop functionality.
      - Users can click and hold a column header , then drag and drop it into the desired position within the table.
    - Column width
      - Text input field
      - For entering or edit the column width
      - Accepts numbers only

<!-- page 34 -->
  - Minimum length: 1 character.
  - Maximum length: 3 characters.
  - Default value = 3
- Add / Remove columns
  - Button
  - For adding or removing columns from the table
  - When clicked, a pop-up appears containing all available table columns with their corresponding checkboxes.
  - **[YELLOW]** These columns are: Column Name Mode Account Head Tax Rate Net Amount (USD) Amount (USD) Total (USD) Reference Row #

**Description**

**Is this Tax included in Basic Rate?**

**Considered In Paid Amount**

**Is Tax Withholding Account**

**Cost Center**

**Project**

**Account Currency**

**Tax Amount After Discount Amount (USD)**

**Net Amount (EGP)**

**Amount (EGP)**

**Total (EGP)**

**Tax Amount After Discount Amount (EGP)**
  - Users can show or hide columns by

<!-- page 35 -->

**selecting or deselecting the related**

**checkbox.**
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

**Mode** **[YELLOW]**
        - DDL
        - To select the sales taxes type
        - It contains the following values:
          - Actual
          - On Net Total
          - On Previous Row Amount
          - On Previous Row Total
          - On Item Quantity
        - Single selection
        - Mandatory

**Reference Row**
        - Text input field
        - Used to enter the reference row

<!-- page 36 -->
- Note: This field appears only when more than one tax is added and the tax type is set to On Previous Row Amount or On Previous Row Total. The system automatically populates the Reference Row field with the row number immediately preceding the current row.

**Account Head**
- Searchable DDL
- Link “Accounts” doctype
- To select an account head
- Single selection
- Mandatory

**Description**
- Text area
- For adding a description Optional
- Accepts letters, numbers, and special characters.
- Minimum length: 3 characters.
- Maximum length: 500 characters.
- Once the maximum limit is reached, further input will be prevented.
- An error message will appear if the entered text is less than the minimum length.
- An error message will appear if invalid data is entered.

**Is this Tax Included In Basic Rate ?**
- Checkbox
- If checked, this tax amount will be considered as already included in Print Rate / Print Amount

**Considered In Paid Amount**
- Checkbox
- If checked, this tax amount will be considered as already included in the paid Amount in Paid Entry

**Set by Item Tax Template**
- Checkbox icon (read only)

<!-- page 37 -->
- It appears only in case this tax set be item tax template

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
- optional .
- Accept numbers only.

**Account Currency**
- Label field
- Displays the Account Currency

**Net Amount (Currency)**
- Label field
- Displays the Net Amount Currency

**Amount (Currency)**
- Label field
- Displays the Amount Currency

**Total (Currency)**
- Label field
- Displays the Total Currency

**Tax Amount After Discount Amount**
- Label field
- Displays the tax Amount After Discount Amount

<!-- page 38 -->

**Net Amount (Company’s base currency)**
            - Label field
            - Displays the Net Amount (Company’s base currency)

**Amount (Company’s base currency)**
            - Label field
            - Displays the Amount (Company’s base currency)

**Total (Company’s base currency)**
            - Label field
            - Displays the Total (Company’s base currency)

**Tax Amount After Discount Amount**
            - Label field

**(company’s base currency)**
            - Displays the tax Amount After Discount Amount (Company’s base currency)

**Don’t Recompute Tax**
            - Checkbox icon (read only)
            - It displays that the system will not automatically recompute the tax amount for this row during tax recalculations.
        - Add Row
          - Button
          - To add a new row in the table
          - When clicked, a new row is added to the table.
    - Total Taxes and Charges (Company’s base Currency)
      - Label field (read only)
      - It displays total taxes and charges in company’s base currency
    - Total Taxes and Charges (Currency)
      - Label field (read only)
      - It displays total taxes and charges in currency
- Totals (Currency)
  - It contains the following fields:
    - Use Company Default cost center for round off
      - Checkbox
      - If enabled, the system posts the round-off amount to the company's default Cost Center instead of using the Cost Center assigned to the document or its items.
    - Grand Total (Currency)
      - Label field
      - It displays the grand total in the selected Currency
    - Rounding Adjustment (Currency)
      - Label field
      - It displays the rounding adjustment in the selected Currency

<!-- page 39 -->
    - Rounded Total (Currency)
      - Label field
      - It displays the rounded total in the selected Currency
    - In Words
      - Label field
      - It displays the grand total in the selected Currency in words
- Totals (Company’s base Currency)
  - It contains the following fields:
    - Grand Total (Company’s base Currency)
      - Label field
      - It displays the grand total in the selected Company’s base Currency
    - Rounding Adjustment (Company’s base Currency)
      - Label field
      - It displays the rounding adjustment in the selected Company’s base Currency
      - 
    - Rounded Total (Company’s base Currency)
      - Label field
      - It displays the rounded total in the selected Company’s base Currency
    - In Words
      - Label field
      - It displays the grand total in the selected Company’s base Currency in words.
    - Total Avance
      - Label field
      - Displays the total amount of advance payments applied to the Sales Invoice.
    - Outstanding Amount
      - Label field
      - Displays the remaining amount that the customer is required to pay after deducting all applied advances and payments from the invoice total.
- Additional Discount
  - It contains the following fields:
    - Apply Additional Discount On
      - DDL
      - To apply additional discount
      - It contains the following values:
        - Grand Total
        - Net Total
      - Single selection
      - Optional
    - Additional Discount Percentage
      - Text input field
      - To enter the Additional Discount Percentage
      - optional .

<!-- page 40 -->
      - Accept numbers only.
      - When a number is entered, it is calculated as a percentage.
      - Maximum length: 100 characters.
      - Once the maximum length is reached, further input is prevented.
    - Additional Discount Amount (Company’s base Currency)
      - Label field
      - It displays the additional discount amount in company’s base currency
    - Additional Discount Amount (Currency)
      - Text input field
      - To enter the Additional Discount amount using the selected currency
      - optional .
      - Accept numbers only.
      - Maximum length: 100 characters.
      - Once the maximum length is reached, further input is prevented.
    - Coupon Code
      - Searchable DDL
      - Link “Coupon Code” doctype
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Is cash or non trade account
      - Checkbox
      - Indicates whether the account associated with the Sales Invoice is a cash account or a non-trade account. This
- Bundle Items
  - Note: This table is displayed only when the item in the Sales invoice is a Product Bundle and the user clicks the Save button.
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - Parent Item
      - Label field (read only)
      - It displays the parent item of the Product bundle
    - Item Code
      - Label field (read only)
      - It displays the item code of the Product bundle
    - Description
      - Text area
      - For adding a description Optional
      - Accepts letters, numbers, and special characters.
      - Minimum length: 3 characters.

<!-- page 41 -->
  - Maximum length: 500 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
  - An error message will appear if invalid data is entered.
- Qty
  - Label field
  - Displays the Qty of the item
- Rate
  - Label field
  - Displays the unit price of the item
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
      - These columns are: Column Name Parent Item Item Code

**Description**

**Qty**

**Rate**

**Item Name**

**Supplier delivers to Customer**

<!-- page 42 -->

**From Warehouse**

**To Warehouse (Optional)**

**Conversion Factor**

**UOM**

**Pick Serial / Batch No**

**Use Serial No / Batch Fields**

**Serial and Batch Bundle**

**Serial No**

**Batch No**

**Actual Batch Quantity**

**Actual Qty**

**Projected Qty**

**Ordered Qty**

**Packed Qty**

**Requested Qty**

**Incoming Rate**

**Picked Qty**
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
    - When clicked, the selected item group(s) will be

<!-- page 43 -->

**deleted**
- Edit Row
  - Clickable icon
  - Users can edit and view non displayed fields in the table.
  - When clicked , a pop up appears containing the following fields: Field Name Options

**Parent Item**
    - Label field (read only)
    - Displays the parent product bundle to which this item belongs.

**Item Code**
    - Label field (read only)
    - Displays the item code of the bundled component

**Item Name**
    - Label field (read only)
    - Displays the name of the bundled item.

**Suppliers delivers to customer**
    - Checkbox icon (read only)
    - Indicates that the supplier will deliver the bundled item directly to the customer.

**Description**
    - Text area
    - For adding a description Optional
    - Accepts letters, numbers, and special characters.
    - Minimum length: 3 characters.
    - Maximum length: 500 characters.
    - Once the maximum limit is reached, further input will be prevented.
    - An error message will appear if the entered text is less than the minimum length.
    - An error message will appear if invalid data is entered.

<!-- page 44 -->

**From Warehouse**
- Searchable DDL
- Link "Warehouse” doctype
- To select the source warehouse of the bundled item
- Single selection
- Optional

**To Warehouse**
- Searchable DDL
- Link "Warehouse” doctype
- To select the destination warehouse when applicable
- Single selection
- Optional

**Conversion Factor**
- Label field (read only)
- It displays conversion factor between the selected UOM and the Stock UOM

**Qty**
- Label field (read only)
- It displays the quantity of the bundled item

**Rate**
- Label field (read only)
- Displays the unit price of the bundled item when applicable.

**UOM**
- Label field (read only)
- It displays the UOM of the bundled item

**Pick Serial / batch No**
- Button
- Appears only when the “Activate Serial / Batch No for item” checkbox is enabled from Inventory settings
- When clicked, the available Serial Numbers and Batches are automatically selected based on the picking method defined in

<!-- page 45 -->

**Inventory Settings, such as FIFO,**

**LIFO, or Expiry.**

**Serial and Batch Bundle**
- Searchable DDL
- Link "Serial and Batch Bundle” doctype
- To select serial and batch bundle related to this item
- Single selection
- Optional

**Use Serial No / Batch Fields**
- Checkbox
- When checked:
  - the "Pick Serial and Batch No" button and the "Serial and Batch Bundle" field are hidden
  - The "Serial No" and "Batch No" fields are displayed to allow manual entry of Serial Numbers and Batches.

**Serial No**
- Text area
- To enter serial numbers manually
- It appears only when “Use Serial No / Batch No” is checked
- Optional
- Accepts letters, numbers, and special characters.
- Minimum length: 3 characters.
- Maximum length: 500 characters.
- Once the maximum limit is reached, further input will be prevented.
- An error message will appear if the entered text is less than the minimum length.
- An error message will appear if invalid data is entered.
- When a Serial Number is entered and the Enter key is pressed, a new line is created to allow entry

<!-- page 46 -->

**of another Serial Number.**

**Batch No**
- Searchable DDL
- Link "Batch No” doctype
- To select Batch No related to this item and the selected warehouse.
- Single selection
- Optional

**Actual Batch Qty**
- Label field (read only)
- Displays the total available quantity of the selected item across all batches in the selected warehouse

**Actual Qty**
- Label field (read only)
- Displays the current available stock quantity of the item in the selected warehouse.

**Projected Qty**
- Label field (read only)
- Displays the projected available quantity after considering all future stock transactions.

**Ordered Qty**
- Label field (read only)
- Displays the quantity currently ordered through Purchase Orders and not yet received.

**Packed Qty**
- Label field (read only)
- Displays the quantity that has already been packed for this item.

**Requested Qty**
- Label field (read only)
- Displays the quantity requested through Material Requests.

**Incoming Rate**
- Label field (read only)
- Displays the incoming valuation rate of the item used for stock

<!-- page 47 -->

**valuation.**

**Picked Qty**
              - Label field (read only)
              - Displays the quantity that has already been picked for fulfillment.
    - Add Row
      - Button
      - To add a new row in the table
      - When clicked, a new row is added to the table.
- Total Billing Hours
  - Label field
  - Displays the total billable hours included in the Sales Invoice. This value is calculated automatically from the linked Timesheets.
- Total Billing Amounts
  - Label field
  - Displays the total billable amount calculated from the linked Timesheets before taxes and additional charges. This value is calculated automatically by the system.
- Fixed Page Actions
  - It contains the following:
    - Get Items From
      - DDL
      - It contains the following actions
        - Sales Order
          - Button
          - When clicked, a pop up appears containing the following fields:
          - Search
            - The user can search by the following:
          - Name
            - Text input field
            - Users can search by the sales order name or any part of it.
            - Max length : 100 characters
            - Once the maximum limit is reached, further input will be prevented.
          - customer
            - Searchable DDL
            - Link “Customer” doctype
            - Single selection
            - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

<!-- page 48 -->
  - Sales order list
    - **[CYAN]** It  contains only sales orders whose status is equal to “To Bill”, “Partially Billed”
    - A table contain the following columns:
      - Checkbox icon
        - Multi selection
      - No.
        - Displays the ordering of items in the table
      - Name
        - Label field
        - It displays the sales order name
        - Clickable
        - When clicked, it navigates the user to “sales order details” screen
      - customer
        - Label field
        - It displays the customer name
      - Get Items
        - Button
        - When a sales order(s) is selected and the user clicks the “Get Items” button, the sales order items are successfully fetched and indeed to the items table.
- Quotation
  - Button
  - When clicked, a pop up appears containing the following fields:
  - Search
    - The user can search by the following:
  - Name
    - Text input field
    - Users can search by the quotation name or any part of it.
    - Max length : 100 characters
    - Once the maximum limit is reached, further input will be prevented.
  - customer
    - Searchable DDL
    - Link “Customer” doctype
    - Single selection
    - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the

<!-- page 49 -->

**user to search and select from a predefined**

**list of values.**
  - Quotation list
    - It  contains only quotations whose status is equal to “Open”
    - A table contain the following columns:
      - Checkbox icon
        - Multi selection
      - No.
        - Displays the ordering of items in the table
      - Name
        - Label field
        - It displays the quotation name
        - Clickable
        - When clicked, it navigates the user to "Quotation Details” screen
      - Party (read-only)
        - Label field
        - It displays the party name
      - Get Items
        - Button
        - When a quotation(s) is selected and the user clicks the “Get Items” button, the quotation items are successfully fetched and indeed to the items table.
- Delivery Note
  - Button
  - When clicked, a pop up appears containing the following fields:
  - Search
    - The user can search by the following:
  - Name
    - Text input field
    - Users can search by the delivery note name or any part of it.
    - Max length : 100 characters
    - Once the maximum limit is reached, further input will be prevented.
  - customer
    - Searchable DDL
    - Link “Customer” doctype
    - Single selection
    - Note: the field shall be implemented as a

<!-- page 50 -->

**searchable DDL (autocomplete), allowing the**

**user to search and select from a predefined**

**list of values.**
      - Delivery note list
        - It  contains only quotations whose status is equal to “To Deliver”
          - A table contain the following columns:
      - Checkbox icon
        - Multi selection
      - No.
        - Displays the ordering of items in the table
      - Name
        - Label field
        - It displays the delivery note name
        - Clickable
        - When clicked, it navigates the user to "Delivery note Details” screen
      - Customer
        - Label field
        - It displays the customer name
      - Get Items
        - Button
        - When a delivery note(s) is selected and the user clicks the “Get Items” button, the delivery note items are successfully fetched and indeed to the items table.
- View
  - It contains the following actions :
    - View Accounting Ledger
      - Button
      - When clicked, it navigates the user to the “General Ledger” screen.
      - Note: it appears only when the document status is Draft or Submitted
    - View Stock Ledger
      - Button
      - When clicked, it navigates the user to the “Stock Ledger” screen.
      - Note: it appears only when the Update Stock = 1 , when the document status is Draft or Submitted
- Create Quality Inspection(s)
  - Button
  - When clicked, a pop up appears containing the following fields:
    - Items
      - A table contain the following columns:
        - Checkbox icon

<!-- page 51 -->
          - Multi selection
        - No.
          - Displays the ordering of items in the table
        - Item Code
          - Label field
          - It displays the item code
          - Displays all items added to the Sales Invoice that have the "Inspection Required Before Delivery" option enabled.
        - Item Name
          - Label field
          - It displays the item name
        - Accepted Quantity
          - Label field
          - It displays the accepted Qty of the item available for creating a quality inspection
        - Sample size
          - Text input field
          - To enter a quantity for which a quality inspection will be created.
          - Note: the Sample Size cannot greater than the Qty
    - Create
      - Button
      - When clicked, If all required data is entered correctly and completely:
        - The Quality Inspection is successfully created.
      - If incorrect or incomplete data is entered:
        - A validation error message is displayed for each invalid field.
  - Note:
    - The "Inspection Required Before Delivery" option must be enabled from the item's Advanced tab in order to allow creating a Quality Inspection from this item.
    - It appears only when:
      - The Update Stock = 1 , and “Save” button is clicked
      - It is in Draft or Submitted status, provided that the "Allow to make Quality Inspection after Purchase/Delivery" option is enabled in the Inventory Settings.
- Save
  - Button
  - When clicked,

<!-- page 52 -->
    - If all required data is entered correctly and completely:
      - The Sales invoice is successfully saved and not submitted.
      - And added to the Sales order List and its status is draft
    - If incorrect or incomplete data is entered:
      - A validation error message is displayed for each invalid field.
- Submit
  - Button
  - Appears only after clicking on the save button
  - When clicked,
    - The Sales invoice is successfully submitted
    - And added to the Sales invoice List and its status is Submitted
    - If the customer is associated with a Loyalty Program,
      - The system checks the following:
        - The invoice is eligible to create points.
        - The invoice posting date.
        - The eligible invoice amount.
        - The program’s earning rules and collection factor.
        - Any loyalty amount redeemed on the invoice is excluded from the earning amount.
      - Then the system creates:
        - A Positive Loyalty Point Entry linked to the Sales Invoice
      - The customer’s available loyalty balance increases.
      - The points may be redeemed later and may be expired.
      - Note: Earning points doesn’t create GL Entry, Payment Ledger Entry, or cash movement
    - If the customer Redeems Loyalty Points on this invoice
      - Before submission the system checks the following:
        - “Redeem Loyalty Points” is enabled.
        - The customer has sufficient valid, non-expired points.
        - The Loyalty Program belongs to the invoice company.
        - The POS & Loyalty Amount does not exceed the Sales Invoice Grand Total.
        - The Loyalty Redemption Account and Cost Center exist.
      - On submission
        - The system creates:
          - Negative Loyalty Point Entries that consume the customer’s existing

<!-- page 53 -->

**points.**
          - Loyalty GL Entry
            - Debit: Loyalty Redemption Expense
            - Credit: Customer Receivable
          - A negative receivable Payment Ledger effect from the receivable credit.
          - A separate positive Loyalty Point Entry for points earned from the remaining eligible invoice value.
        - The redeemed points reduce the customer’s available balance.
        - The invoice outstanding decreases by the loyalty amount.
        - Loyalty Redemption Expense Account increases.
        - No cash, bank transaction, or Payment Entry is created.
  - Note: once the document is submitted, it becomes read only and cannot be edited.
- Cancel
  - It appears only when the Sales invoice status = Submitted
  - When clicked,
    - The Sales invoice was canceled successfully.
    - And it’s status changes to “Canceled”
- Amend
  - Button
  - It appears only when the Sales invoice status = cancelled
- Delete
  - It appears only when the Sales Invoice status = Draft / Cancelled
  - When clicked,
    - A confirmation message is displayed to the user whether they want to delete this Sales invoice
    - Upon clicking the “Yes” button:
      - If other Sales Invoice is Amended from this Sales Invoice
        - A warning message appears indicating that this Sales Invoice cannot be deleted until the user deletes all doctypes related to it.
        - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
        - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
      - if the Sales Invoice is linked to other transactions,

# Use case 3 - General Info tab

<!-- page 54 -->
            - a message is displayed informing the user that the linked transactions must be deleted before the Sales Invoice can be deleted.
            - The warning message displays the linked doctypes as hyperlinks; they are redirected to the corresponding doctype.
          - If the Sales Invoice isn’t linked to another doctype
            - The Sales Invoice is deleted successfully.

**Post**
- The new Sales invoice has been added successfully

**Conditions**
- If invalid or incomplete data is entered, the corresponding error message will be displayed for each field. General Info Tab

**Use case ID**

**3**

**Use  case**

**General Info Tab**

**Name**

**Descriptions**

**The user can continue the creation process and enter the General Info**

**Pre conditions**
- Click on Selling from sidebar
- Click on Sales Invoice from sidebar
- Click on Add Sales Invoice
- Click on General Info Tab

**Main Flow**

**-**

**Components**
- Payments
  - It contains the following fields:
    - Cash / Bank Account
      - Searchable DDL
      - Link “Account” doctype
      - It displays all accounts with type = Bank or Cash.
      - Note: it’s fetched from the POS Profile
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Sales Invoice Payments
      - A table contain the following columns:
        - Checkbox icon
          - Multi selection
        - No.

<!-- page 55 -->
  - Displays the ordering of items in the table
- Mode Of Payment
  - Searchable DDL
  - Link “Mode Of Payment” doctype
  - Note: it’s fetched from the POS Profile and it can be edited
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Amounts
  - Text input field
  - To Specify the amount received using the selected Mode of Payment.
  - Note: it’s fetched from the POS Profile and it can be edited
  - Mandatory
  - Accepts integers and decimal numbers.
  - Minimum length: 1 character.
  - Maximum length: 100 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
  - If the field is left empty an error message appears.
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
      - When clicked, a pop-up appears

<!-- page 56 -->

**containing all available table columns**

**with their corresponding checkboxes.**
      - These columns are: Column Name Default Mode of Payment Amount Reference No Account Type Base Amount (Company Currency) Clearance Date
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

<!-- page 57 -->
- Users can edit and view non displayed fields in the table.
- When clicked , a pop up appears containing the following fields: Field Name Options

**Mode Of Payment**
  - Searchable DDL
  - Link “Mode Of Payment” doctype
  - Note: it’s fetched from the POS Profile and it can be edited
  - Single selection
  - Mandatory
  - If the field is left empty an error message appears.
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Amounts**
  - Text input field
  - To Specify the amount received using the selected Mode of Payment.
  - Note: it’s fetched from the POS Profile and it can be edited
  - Mandatory
  - Accepts integers and decimal numbers.
  - Minimum length: 1 character.
  - Maximum length: 100 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
  - If the field is left empty an error message appears.

**Default**
  - Checkbox icon (read only)
  - Note: it’s fetched from the

<!-- page 58 -->

**POS Profile.**

**Reference No**
        - Label field (read only)
        - Note: it’s fetched from the POS Profile.

**Account**
        - Label field (read only)
        - Note: it’s fetched from the POS Profile.

**Type**
        - Label field (read only)
        - Note: it’s fetched from the POS Profile.

**Base Amount (Company Currency)**
        - Label field (read only)
        - Note: it’s fetched from the POS Profile.

**Clearance Date**
        - Label field (read only)
        - Note: it’s fetched from the POS Profile.
    - Add Row
      - Button
      - To add a new row in the table
      - When clicked, a new row is added to the table.
- POS & Loyalty Amount (Company Currency)
  - Label field (read only)
  - Displays the total paid amount of the POS amount + the Loyalty Point Amount converted to  the company's base currency.
  - Note: it’s fetched from the POS Profile.
  - Note: its original name in ERPNext = Paid Amount (Company Currency)
  - Note: POS means that “a retail sales interface that enables users to quickly create and complete sales transactions. It allows users to add items, receive customer payments, and generate sales invoices in a single workflow while automatically updating inventory and accounting records”
- POS & Loyalty Amount (Currency)
  - Label field (read only)
  - Displays the total amount paid in the Sales Invoice currency.
  - Note: it’s fetched from the POS Profile
  - Note: its original name in ERPNext = Paid Amount ( Currency)

<!-- page 59 -->
- Changes
  - It contains the following fields:
    - Base Change Amount (Company Currency)
      - Label field (read only)
      - Displays the change amount returned to the customer in the company's base currency.
      - Note: it’s fetched from the POS Profile
    - Change Amount
      - Label field (read only)
      - Displays the change amount returned to the customer in the invoice currency
      - Note: it’s fetched from the POS Profile
    - Account For Change Amount
      - Searchable DDL
      - Link “Account” doctype
      - Note: it’s fetched from the POS Profile
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Advance Payment
  - It contains the following fields:
    - Allocate Advance Automatically (FIFO)
      - Checkbox
      - When checked, it fetches all available advance payments received from the customer and allows them to be allocated to the current Sales Invoice using the First In, First Out (FIFO) method.
      - Note: default value is decided through Selling Settings
        - If the “Allocate Advance Automatically In Sales Invoice” is checked:
          - Then, the ”Allocate Advance Automatically (FIFO)” default value is checked
        - If the “Allocate Advance Automatically In Sales Invoice” is unchecked:
          - Then, the ”Allocate Advance Automatically (FIFO)” default value is unchecked
      - Note: when a row is deleted from the Advances table and the user clicks on Save, the system should not overwrite the Advances table
    - Only Include Allocated Payments Against Reference Sales Order
      - Checkbox
      - If enabled, the system fetches only advance payments that have already been allocated to the related Sales Order.
      - Note: it appears only when the “Allocate Advance Automatically (FIFO) = 1”

<!-- page 60 -->
  - Note: default value is decided through Selling Settings
    - If the “Only Include Allocated Payments Against Sales Order In Sales Invoice” is checked:
      - Then, the ”Only Include Allocated Payments Against Reference Sales Order” default value is checked
    - If the “Only Include Allocated Payments Against Sales Order In Sales Invoice” is unchecked:
      - Then, the ”Only Include Allocated Payments Against Reference Sales Order” default value is unchecked
  - Note: when a row is deleted from the Advances table and the user clicks on Save, the system should not overwrite the Advances table
- **[HIDDEN]** Get Advance Received
  - **[HIDDEN]** Button
  - **[HIDDEN]** It retrieves unallocated advance payments for the selected customer, populates the Advances table, and reduces the invoice outstanding amount by the allocated advance when the invoice is submitted.
  - **[HIDDEN]** When clicked, it fetches all available advance payments received from the customer and allows them to be allocated to the current Sales Invoice.
  - **[HIDDEN]** Note: it appears only when the Sales Invoice status = Draft
- Advances
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - Reference Name
      - Label field (read only)
      - Displays the reference document from which the advance payment is applied.
    - Remarks
      - Label field (read only)
      - Displays the remarks associated with the referenced advance payment document.
    - Advance Amount
      - Label field
      - Displays the total amount of the referenced advance payment.
    - Allocated Amount
      - Text input field
      - Displays the amount of the advance payment allocated to the current Sales Invoice.
      - It can be edited

<!-- page 61 -->
- Difference Posting Date
  - Date calendar picker
  - Specifies the posting date used for accounting adjustments when there is a posting date difference between the advance payment and the Sales Invoice.
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
      - These columns are: Column Name Reference Name Remarks Advance amount Allocated amount Difference Posting Date Reference Type Exchange Gain/Loss Reference Exchange Rate

<!-- page 62 -->
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

**Reference type**
        - Label field (read only)
        - Displays the type of the reference document from which the advance payment is applied.

**Reference name**
        - Label field (read only)
        - Displays the reference document from which the advance payment is retrieved.

<!-- page 63 -->

**Remarks**
- Label field (read only)
- Displays the remarks associated with the referenced advance payment document.

**Reference Row**
- Label field (read only)
- Displays the reference row associated with the advance payment. This field is automatically populated by the system when applicable.

**Advance Amount**
- Label field
- Displays the total amount of the referenced advance payment.

**Allocated Amount**
- Text input field
- Displays the amount of the advance payment allocated to the current Sales Invoice.
- It can be edited

**Exchange Gain / Loss**
- Label field (read only)
- Displays the exchange gain or loss resulting from differences between the advance payment exchange rate and the Sales Invoice exchange rate.

**Reference Exchange Rate**
- Label field (read only)
- Displays the exchange rate used in the referenced advance payment document.

**Difference Posting Date**
- Date calendar picker

<!-- page 64 -->
            - Specifies the posting date used for accounting adjustments resulting from posting date differences between the advance payment and the Sales Invoice. This field is automatically populated when applicable.
        - Add Row
          - Button
          - To add a new row in the table
          - When clicked, a new row is added to the table.
- Write Off
  - It contains the following fields:
    - Write Off Amount
      - Text input field.
      - To enter the amount to be written off from the invoice
      - Optional
      - Accept integers and decimal numbers only.
      - Maximum length: 100 characters.
      - Once the maximum length is reached, further input is prevented.
    - Write Off Amount (Company Currency)
      - Label field (read only)
      - It displays the amount to be written off from the invoice in Company Currency
    - Write Off Outstanding Amount
      - Checkbox
      - When checked, the system writes off the entire outstanding balance and marks the invoice as fully settled.
    - Write Off Account
      - Searchable DDL
      - Link “Account” doctype
      - To select the account where the write-off amount will be recorded
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values
    - Write Off Cost Center
      - Searchable DDL
      - Link “Cost Center” doctype
      - To select the Cost Center to which the write-off entry will be allocated

<!-- page 65 -->
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values
- Loyalty Points Redemption
  - It contains the following fields:
    - Redeem Loyalty Points
      - Checkbox
      - When checked, it allows the customer to redeem available loyalty points against the invoice
    - Loyalty Points
      - Text input field.
      - To Specify the number of loyalty points to redeem.
      - Optional
      - Accept integers numbers only.
      - Maximum length: 100 characters.
      - Once the maximum length is reached, further input is prevented
      - Note: it appears only when the “Redeem Loyalty Points = 1”
      - Note:
        - If the customer's available loyalty points exceed the Sales Invoice Grand Total,
          - The system shall automatically retrieve only the loyalty points required to match the invoice Grand Total.
        - If the customer's available loyalty points are less than the Sales Invoice Grand Total,
          - The system shall automatically retrieve all available loyalty points for the customer.
    - Loyalty Amount
      - Label field (read only)
      - Displays the monetary value of the redeemed loyalty points.
      - Note: it appears only when the “Redeem Loyalty Points = 1”
      - Note:
        - Loyalty Amount = Redeemed Loyalty Points * Conversion Factor
        - Any Loyalty Amount redeemed using loyalty points on the Sales Invoice shall be excluded from the loyalty points earning calculation.
    - Loyalty Program
      - Searchable DDL
      - Link “Loyalty Program” doctype
      - To Specify the loyalty program used for earning or redeeming points.
      - It’s fetched from the selected customer and it can be edited.
      - Single selection
      - Optional

<!-- page 66 -->
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values
- Don’t Create Loyalty Points
  - Checkbox
  - When checked, it prevents the system from creating loyalty points for this invoice.
- Redemption Account
  - Searchable DDL
  - Link “Account” doctype
  - To Specify the account used to record the redeemed loyalty amount.
  - Note: it appears only when the “Redeem Loyalty Points = 1”
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values
- Redemption Cost Center
  - Searchable DDL
  - Link “Cost Center” doctype
  - To Specify the Cost Center to which the loyalty redemption entry will be allocated.
  - Note: it appears only when the “Redeem Loyalty Points = 1”
  - Single selection
  - Optional
  - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values
- Restore Redeemed Loyalty Points
  - Checkbox
  - It’s displayed only When a sales return is created against the original sales invoice and the “Redeem Loyalty Points” checkbox is checked in the original Sales Invoice
  - It’s checked by default
  - When checked,
    - The original negative redemption entry is marked: returned = 1 , restored = 1 , that means The original negative entry is ignored in customer balance and earning-bucket calculations. And the redeemed points become available again without creating a positive restoration entry.
    - The original positive Redemption entry is marked as : returned = 1 , restored = 1
  - When unchecked,
    - The original negative redemption entry is marked: returned = 1 , restored = 0 , that means The negative entry remains included in the calculation. And the redeemed points

<!-- page 67 -->

**remain deducted from the customer’s balance**
        - The original positive Redemption entry is marked as : returned = 1 , restored = 1
    - Note: Loyalty Points of a specific customer is calculated by summing all “Loyalty Points” field values of Loyalty Point Entry Doctype referencing the customer and his active Loyalty Program (which is defined in Customer Details)
- Billing Address
  - It contains the following fields:
    - Customer Address Name
      - Searchable DDL
      - Link “Address” doctype
      - Displays all addresses associated with the customer in the Quotation
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
      - Important Note:
        - The system automatically fetches the customer's Preferred Billing Address.
        - If no Preferred Billing Address is available,
          - The system fetches the Primary Address.
        - If no Primary Address exists,
          - The system fetches the latest created address.
        - The user can overwrite the automatically selected address by choosing another one.
    - Address
      - Label field (read only)
      - It displays the address of the selected customer
      - It displays the following data:
        - Address Description
        - City / town
        - State
        - Country
    - Contact Person
      - Searchable DDL
      - Link “Contact” doctype
      - Note: it’s filtered to show only contacts that belong to the “Customer” or “Lead”
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

<!-- page 68 -->
      - Important Note:
        - The system automatically fetches the customer's Preferred Billing Contact.
        - If no Preferred Billing Contact is available,
          - The system fetches the Primary Contact.
        - If no Primary Contact exists,
          - The system fetches the latest created Contact.
        - The user can overwrite the automatically selected contact by choosing another one.
    - **[HIDDEN]** Contact (Hidden)
      - **[HIDDEN]** Label field (read only)
      - **[HIDDEN]** It displays the contact name of the selected contact person
    - (Contact Details)
      - Label field (read only)
      - It displays all contact numbers and Emails ID of the selected contact person
      - Note:
        - UI must clearly tell which:
          - Number is the primary phone
          - Email ID is the primary Email
- Shipping Address
  - It contains the following fields:
    - Shipping Address
      - Searchable DDL
      - Link “Address” doctype
      - Displays all addresses associated with the customer in the Quotation to select the customer shipping address.
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
      - Important Note:
        - The system automatically fetches the customer's Preferred Shipping Address.
        - If no Preferred Shipping Address is available,
          - The system fetches the Primary Address.
        - If no Primary Address exists,
          - The system fetches the latest created address.
        - The user can overwrite the automatically selected address by choosing another one.
    - Shipping Address
      - Label field (read only)
      - It displays the shipping address of the selected shipping address
      - It displays the following data:
        - Address Description
        - City / town

<!-- page 69 -->
        - State
        - Country
- Company Address
  - It contains the following fields:
    - Company Address Name
      - Searchable DDL
      - Link “Address” doctype
      - Displays all company addresses to select the company address name.
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
      - Note:
        - Company primary address is fetched
        - If Company primary address is not found
          - The latest company address is fetched.
    - Company Address
      - Label field (read only)
      - It displays the company address of the selected Company Address Name
      - It displays the following data:
        - Address Description
        - City / town
        - State
        - Country
    - Contact Person
      - Searchable DDL
      - Link “Contact” doctype
      - Note: it’s filtered to show only contacts that belong to the selected company and the “Is Your Company Contact” checked.
      - Single selection
      - Optional
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
      - Important Note:
        - The system automatically fetches the company’s Preferred Billing Contact.
        - If no Preferred Billing Contact is available,
          - The system fetches the Primary Contact.
        - If no Primary Contact exists,
          - The system fetches the latest created Contact.
        - The user can overwrite the automatically selected contact by choosing another one.
    - (Contact Details)

<!-- page 70 -->
      - Label field (read only)
      - It displays all contact numbers and Emails ID of the selected Contact Person
      - Note:
        - UI must clearly tell which:
          - Number is the primary phone
          - Email ID is the primary Email
- Payment Terms Template
  - Searchable DDL
  - Link “Payment Terms Template” doctype
  - Single selection
  - Optional
  - When a value is selected from the Payment Terms Template DDL, the Payment Schedule field is automatically filled based on the selected value.
- Payment Schedule
  - A table contain the following columns:
    - Checkbox icon
      - Multi selection
    - No.
      - Displays the ordering of items in the table
    - Payment Term
      - Searchable DDL
      - Link “Payment Term” doctype
      - Single selection
      - Optional
      - When a value is selected from the Payment Terms Template DDL, the Payment Schedule field is automatically filled based on the selected value.
    - Description
      - Text area
      - For adding a description
      - It’s fetched from the selected Payment Term
      - Optional
      - Accepts letters, numbers, and special characters.
      - Minimum length: 3 characters.
      - Maximum length: 500 characters.
      - Once the maximum limit is reached, further input will be prevented.
      - An error message will appear if the entered text is less than the minimum length.
      - An error message will appear if invalid data is entered
    - Due Date
      - Date calendar picker
      - To select the payment Due date
      - It’s fetched based on the “Due Date Based On” field from the selected payment term
      - Mandatory
      - If the field is left empty an error message appears.

<!-- page 71 -->
- Invoice Portion
  - Text input field
  - For entering the percentage of the total invoice amount assigned to this payment term
  - It’s fetched from the selected Payment Term
  - Optional
  - Accepts numbers only.
  - The entered numbers are treated as percentages
  - Minimum length: 1 character.
  - Maximum length: 3 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
- Payment Amount
  - Text input field
  - For entering the payment amount
  - Optional
  - Accepts integers and decimal numbers only.
  - Minimum length: 1 character.
  - Maximum length: 100 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
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
      - These columns are: Column Name

<!-- page 72 -->

**Payment Term**

**Description**

**Due Date**

**Invoice Portion**

**Payment Amount (EGP)**

**Mode of Payment**

**Due Date Based On**

**Credit Days**

**Credit Months**

**Discount Date**

**Discount**

**Discount Type**

**Discount Validity Based On**

**Discount Validity**

**Outstanding (EGP)**

**Paid Amount (EGP)**

**Discounted Amount**
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
    - When clicked, the selected item group(s) will be

<!-- page 73 -->

**deleted**
- Edit Row
  - Clickable icon
  - Users can edit and view non displayed fields in the table.
  - When clicked , a pop up appears containing the following fields: Field Name Options

**Payment Term**
    - Searchable DDL
    - Link “Payment Term” doctype
    - Single selection
    - Optional
    - When a value is selected from the Payment Terms Template DDL, the Payment Schedule field is automatically filled based on the selected value.

**Description**
    - Text area
    - For adding a description
    - It’s fetched from the selected Payment Term
    - Optional
    - Accepts letters, numbers, and special characters.
    - Minimum length: 3 characters.
    - Maximum length: 500 characters.
    - Once the maximum limit is reached, further input will be prevented.
    - An error message will appear if the entered text is less than the minimum length.
    - An error message will appear if invalid data is entered

**Due Date**
    - Date calendar picker
    - To select the payment Due date
    - It’s fetched based on the “Due Date Based On” field from the selected payment term
    - Mandatory
    - If the field is left empty an error message appears.

<!-- page 74 -->

**Invoice Portion**
- Text input field
- For entering the percentage of the total invoice amount assigned to this payment term
- It’s fetched from the selected Payment Term
- Optional
- Accepts numbers only.
- The entered numbers are treated as percentages
- Minimum length: 1 character.
- Maximum length: 100 characters.
- Once the maximum limit is reached, further input will be prevented.
- An error message will appear if the entered text is less than the minimum length.

**Mode of Payment**
- Searchable DDL
- Link “Mode of Payment” doctype
- To select the default mode of payment for this payment term
- It’s fetched from the selected Payment Term
- Single selection
- Optional
- Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Due Date Based On**
- Label field (read only)
- It’s fetched from the selected Payment Term
- It display one of the following values:
  - Day(s) after invoice date
  - Day(s) after the end of the invoice month
  - Month(s) after the end of the invoice month

<!-- page 75 -->

**Credit Days**
- Label field (read only)
- It display the number of credit days before the payment becomes due
- It’s fetched from the selected Payment Term

**Credit Months**
- Label field (read only)
- It display the number of credit months before the payment becomes due
- It’s fetched from the selected Payment Term

**Discount Date**
- Date calendar picker
- To select the discount date
- Mandatory
- If the field is left empty an error message appears.
- Note: it appears only after entering a value in Discount field

**Discount**
- Text input field
- For entering the discount value applicable for early payment
- It’s fetched from the selected Payment Term
- Optional
- Accepts numbers only.
- Minimum length: 1 character.
- Maximum length: 100 characters.
- Once the maximum limit is reached, further input will be prevented.
- An error message will appear if the entered text is less than the minimum length

**Discount Type**
- DDL
- To select whether the early payment discount is calculated as a percentage or a fixed amount

<!-- page 76 -->
- It’s fetched from the selected Payment Term
- It contains the following values:
  - Percentage
  - Amount
- Single selection
- Optional

**Discount Validity Based On**
- Label field (read only)
- Displays the basis used to calculate the early payment discount validity period
- It’s fetched from the selected Payment Term
- It display one of the following values:
  - Day(s) after invoice date
  - Day(s) after the end of the invoice month
  - Month(s) after the end of the invoice month

**Discount Validity**
- Label field (read only)
- It’s fetched from the selected Payment Term
- Displays the validity period during which the early payment discount can be applied

**Payment Amount**
- Text input field
- For entering the payment amount
- Optional
- Accepts integers and decimal numbers only.
- Minimum length: 1 character.
- Maximum length: 100 characters.
- Once the maximum limit is reached, further input will be prevented.
- An error message will appear if the entered text is less than the minimum length.

**Outstanding**
- Label field

<!-- page 77 -->
        - Displays the outstanding
        - Note:
          - it appears only when the “Payment Term” field has a value
          - It disappears only when the “Payment Term” field is empty

**Paid Amount**
        - Label field (read only)
        - Displays the Paid Amount

**Discounted Amount**
        - Label field
        - Displays the Discounted Amount

**Payment Amount (Company’s base**
        - Text input field

**currency)**
        - For entering the payment amount (Company Currency)
        - Optional
        - Accepts integers and decimal numbers only.
        - Minimum length: 1 character.
        - Maximum length: 100 characters.
        - Once the maximum limit is reached, further input will be prevented.
        - An error message will appear if the entered text is less than the minimum length.

**Outstanding (Company’s base currency)**
        - Label field (read only)
        - Displays the Outstanding (Company’s base currency)

**Paid Amount (company’s base currency)**
        - Label field (read only)
        - Displays the Paid Amount (company’s base currency)
    - Add Row
      - Button
      - To add a new row in the table
      - When clicked, a new row is added to the table.
- Terms
  - Searchable DDL
  - Link “Terms and Condition” doctype
  - Single selection

# Use case 4 - More Info tab

<!-- page 78 -->
  - Optional
  - When a value is selected from the terms DDL, the terms and condition content field is automatically filled based on the selected value.
  - Note:
    - If no terms and conditions are entered, the terms and conditions section is not displayed on the Quotation Details page
    - the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Terms and Condition Content
  - Text area
  - For adding detailed terms and condition content.
  - Optional
  - Accepts letters, numbers, and special characters.
  - Minimum length: 3 characters.
  - Maximum length: 500 characters.
  - Once the maximum limit is reached, further input will be prevented.
  - An error message will appear if the entered text is less than the minimum length.
  - An error message will appear if invalid data is entered.
  - Note: The terms and condition content is automatically fetched based on the term selected from the DDL

**Post**
- The General Info Details is successfully saved.

**Conditions**
- If invalid or incomplete data is entered, the corresponding error message will be displayed for each field. More Info Tab

**Use case ID**

**4**

**Use  case**

**More Info Tab**

**Name**

**Descriptions**

**The user can continue the creation process and enter the General Info**

**Pre conditions**
- Click on Selling from sidebar

<!-- page 79 -->
- Click on Sales Order from sidebar
- Click on Add Sales Order
- Click on More Info Tab

**Main Flow**

**-**

**Components**
- Status
  - It contains the following fields:
    - Invoice Status
      - Label field
      - It displays the Sales Invoice status
      - It shows one of the following values:
        - Draft
        - Unpaid
          - It is displayed when the document is submitted & Grand Total = Outstanding
        - Partially Paid
          - It is displayed when the document is submitted & Grand Total > Outstanding
        - Fully Paid
          - It is displayed when the document is submitted & Outstanding = 0
        - Overdue
          - It is displayed when the document is submitted & the due date of payment term is > current date and the invoice is not paid
        - Return
          - It is displayed when the document is submitted and (Is Return = 1)
        - Fully Credited
          - It is displayed when the document is submitted and Outstanding= 0 and Grand Total = Credit Amount
        - On Hold
          - It is displayed when Hold button is clicked
        - Closed
          - It is displayed when Close button is clicked
        - Cancelled
          - It is displayed when the document is cancelled.
    - Credit Staus
      - Label field
      - It displays the Credit status of the Sales Invoice
      - It shows one of the following values:
        - Not Applicable
          - It is displayed only when the Invoice Status = Draft
        - No Credit
          - It is displayed when the Credit Amount = 0
        - Partially Credited

<!-- page 80 -->
          - It is displayed when the Credit Amount > 0
        - Fully Credited
          - It is displayed when Sum of total “Amounts” of submitted sales invoice where:
            - Is Return = 1
            - Return Against = this Invoice is equal to Grand Total
    - Refund Status
      - Label field
      - It displays the Refund status of the Sales Invoice
      - It shows one of the following values:
        - Not Applicable
          - It is displayed only when the Invoice Status = Draft
        - No Refund
          - It is displayed when Refund Amount = 0
        - Partially Refunded
          - It is displayed when Refund Amount > 0
        - Fully Refunded
          - It is displayed when Refund Amount > 0
          - And Refund Amount = Paid Amount
- Accounting Details
  - It contains the following fields:
    - Debit To
      - Label field (read only)
      - It displays the receivable account that will be debited with the invoice amount when the Sales Invoice is submitted.
      - Clickable
      - When clicked, it navigates the user to the receivable account that will be debited with the invoice amount
    - Is Opening Entry
      - Label field (read only)
      - Displays whether the Sales Invoice is an opening entry
      - It displays one of the following values:
        - No
        - Yes
    - Against Income Account
      - Label field (read only)
      - Displays the income accounts against which the invoice revenue is recorded based on the invoice items.
    - Paid Amount
      - Label field (read only)
      - It displays the total allocated paid amounts in payment entries against this invoice
      - It’s calculated as :
        - Sum of total “Amounts” of Payment Ledger Entries where:
          - Voucher Type = Payment Entry and Payment Entry Type = Receive

<!-- page 81 -->
      - Amount < 0
      - Delinked = 0
      - Against Voucher Type = Sales Invoice
      - Against Voucher No = this Invoice
- Credit Amount
  - Label field (read only)
  - It displays the total credit amounts of return invoices against this invoice
  - It’s calculated as :
    - Sum of total “Amounts” of submitted sales invoice where:
      - Is Return = 1
      - Return Against = this Invoice
- Credit Allocated
  - Label field (read only)
  - It displays the credit amount allocated to this invoice
  - It’s calculated as :
    - Sum of total “Amounts” of Payment Ledger Entries where:
      - Voucher Type = Sales Invoice and (Is Return = 1)
      - Amount < 0
      - Delinked = 0
      - Against Voucher Type = Sales Invoice
      - Against Voucher No = this Invoice +
    - Sum of total “Amounts” of Payment Ledger Entries where:
      - Voucher Type = Journal Entry (Entry Type = Credit Note)
      - Amount < 0
      - Delinked = 0
      - Against Voucher Type = Sales Invoice
      - Against Voucher No = this Invoice
- Refund Amount
  - Label field (read only)
  - It displays the amount to be refunded to the customer
  - When the Sales Invoice (Is Return = 1)
    - It’s calculated as :
      - Sum of total “Amounts” of Payment Ledger Entries where:
        - Voucher Type = Payment Entry
        - Payment Entry Type = Pay
        - Amount > 0
        - Delinked = 0
        - Against Voucher Type = Sales Invoice
        - Against Voucher No = this Invoice
  - When the Sales Invoice (Is Return = 0)
    - It’s calculated as :
      - Sum of total “Amounts” of Payment Ledger Entries

<!-- page 82 -->

**where:**
        - Voucher Type = Journal Entry
        - Entry Type = Journal Entry or Cash Entry or Bank Entry
        - Credited Account Type = Cash Account or Bank Account
        - Amount > 0
        - Delinked = 0
        - Against Voucher Type = Sales Invoice
        - Against Voucher No = this Invoice
  - Note:
    - All Accounting Details of sales invoice have metrics like credit allocated, paid amount, refund amount.. etc
    - Those are calculated by looking inside other doctypes like journal entry or payment ledger entry.. etc
    - All reference doctypes must be submitted while draft and cancelled docs are completely ignored
- **[HIDDEN]** Commission (Hidden)
  - **[HIDDEN]** It contains the following fields:
    - **[HIDDEN]** Sales Partner
      - **[HIDDEN]** Searchable DDL
      - **[HIDDEN]** Link “Sales Partner” doctype
      - **[HIDDEN]** To select the sales partner associated with the Sales Invoice for commission calculation
      - **[HIDDEN]** Single selection
      - **[HIDDEN]** optional,
      - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - **[HIDDEN]** Amount Eligible for Commission
      - **[HIDDEN]** Label field (read only)
      - **[HIDDEN]** Displays the amount on which the sales commission is calculated.
    - **[HIDDEN]** Commission Rate
      - **[HIDDEN]** Text input field
      - **[HIDDEN]** Allows users to specify the commission percentage applied to the eligible amount.
      - **[HIDDEN]** Optional
      - **[HIDDEN]** Accepts numbers only.
      - **[HIDDEN]** Minimum length: 2 characters.
      - **[HIDDEN]** Maximum length: 100 characters.
    - **[HIDDEN]** Total Commission
      - **[HIDDEN]** Text input field
      - **[HIDDEN]** Displays the total commission amount calculated based on the eligible amount and commission rate.
      - **[HIDDEN]** Optional
      - **[HIDDEN]** Accepts numbers only.

<!-- page 83 -->
      - **[HIDDEN]** Minimum length: 2 characters.
      - **[HIDDEN]** Maximum length: 100 characters.
- **[HIDDEN]** Sales Team (Hidden)
  - **[HIDDEN]** A table contain the following columns:
    - **[HIDDEN]** Checkbox icon
      - **[HIDDEN]** Multi selection
    - **[HIDDEN]** No.
      - **[HIDDEN]** Displays the ordering of items in the table
    - **[HIDDEN]** Sales Person
      - **[HIDDEN]** Searchable DDL
      - **[HIDDEN]** Link “Sales Person” doctype
      - **[HIDDEN]** To select the sales employee responsible for the Sales invoice
      - **[HIDDEN]** Single selection
      - **[HIDDEN]** Optional
      - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - **[HIDDEN]** Contribution (%)
      - **[HIDDEN]** Text input field
      - **[HIDDEN]** To enter the percentage contribution of the sales person to the Sales invoice
      - **[HIDDEN]** Optional
      - **[HIDDEN]** Accepts numbers only.
      - **[HIDDEN]** Minimum length: 2 characters.
      - **[HIDDEN]** Maximum length: 100 characters.
      - **[HIDDEN]** Once the maximum limit is reached, further input will be prevented.
      - **[HIDDEN]** An error message will appear if the entered text is less than the minimum length.
    - **[HIDDEN]** Contribution to Net Total
      - **[HIDDEN]** Label field
      - **[HIDDEN]** Displays the portion of the Sales invoice net total attributed to the sales person based on the contribution percentage.
    - **[HIDDEN]** Commission Rate
      - **[HIDDEN]** Label field
      - **[HIDDEN]** Displays the commission percentage assigned to the sales person
    - **[HIDDEN]** Incentives
      - **[HIDDEN]** Text input field
      - **[HIDDEN]** To enter the incentive or commission amount earned by the sales person
      - **[HIDDEN]** Optional
      - **[HIDDEN]** Accepts numbers only.
      - **[HIDDEN]** Minimum length: 2 characters.
      - **[HIDDEN]** Maximum length: 100 characters.
      - **[HIDDEN]** Once the maximum limit is reached, further input will be prevented.
      - **[HIDDEN]** An error message will appear if the entered text is less than the minimum length.

<!-- page 84 -->
- **[HIDDEN]** Setting
  - **[HIDDEN]** When clicked, a pop up appears contains the following options :
    - **[HIDDEN]** Rearranging table columns using drag and drop functionality.
      - **[HIDDEN]** Users can click and hold a column header , then drag and drop it into the desired position within the table.
    - **[HIDDEN]** Column width
      - **[HIDDEN]** Text input field
      - **[HIDDEN]** For entering or edit the column width
      - **[HIDDEN]** Accepts numbers only
      - **[HIDDEN]** Minimum length: 1 character.
      - **[HIDDEN]** Maximum length: 3 characters.
      - **[HIDDEN]** Default value = 3
    - **[HIDDEN]** Add / Remove columns
      - **[HIDDEN]** Button
      - **[HIDDEN]** For adding or removing columns from the table
      - **[HIDDEN]** When clicked, a pop-up appears containing all available table columns with their corresponding checkboxes.
      - **[HIDDEN]** These columns are: Column Name Sales Person Contribution (%) Contribution to Net Total (EGP) Commission Rate Incentives (EGP)
      - **[HIDDEN]** Users can show or hide columns by selecting or deselecting the related checkbox.
    - **[HIDDEN]** “Update” button
      - **[HIDDEN]** Button
      - **[HIDDEN]** For save any changes or updates made by the user
      - **[HIDDEN]** When clicked, any modifications made by the user will be saved
    - **[HIDDEN]** “Reset to default” button
      - **[HIDDEN]** Button
      - **[HIDDEN]** To reset all modifications to their default values.
      - **[HIDDEN]** When clicked, any modifications made by the user will be reset to their default values.
- **[HIDDEN]** Note: when a row is selected , an action bar appears showing the following

<!-- page 85 -->

**actions:** **[HIDDEN]**
    - **[HIDDEN]** Delete row
      - **[HIDDEN]** Button
      - **[HIDDEN]** To delete a specific row or multiple rows
      - **[HIDDEN]** When clicked, the selected item group(s) will be deleted
- **[HIDDEN]** Edit Row
  - **[HIDDEN]** Clickable icon
  - **[HIDDEN]** Users can edit and view non displayed fields in the table.
  - **[HIDDEN]** When clicked , a pop up appears containing the following fields: Field Name Options

**Sales Person** **[HIDDEN]**
        - **[HIDDEN]** Searchable DDL
        - **[HIDDEN]** Link “Sales Person” doctype
        - **[HIDDEN]** To select the sales employee responsible for the Sales invoice
        - **[HIDDEN]** Single selection
        - **[HIDDEN]** Optional
        - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.

**Contribution (%)** **[HIDDEN]**
        - **[HIDDEN]** Text input field
        - **[HIDDEN]** To enter the percentage contribution of the sales person to the Sales invoice
        - **[HIDDEN]** Optional
        - **[HIDDEN]** Accepts numbers only.
        - **[HIDDEN]** Minimum length: 2 characters.
        - **[HIDDEN]** Maximum length: 100 characters.
        - **[HIDDEN]** Once the maximum limit is reached, further input will be prevented.
        - **[HIDDEN]** An error message will appear if the entered text is less than the minimum length.

**Contribution to Net Total** **[HIDDEN]**
        - **[HIDDEN]** Label field
        - **[HIDDEN]** Displays the portion of the Sales invoice net total attributed to the sales person based on the contribution percentage.

<!-- page 86 -->

**Commission Rate** **[HIDDEN]**
        - **[HIDDEN]** Label field
        - **[HIDDEN]** Displays the commission percentage assigned to the sales person

**Incentives** **[HIDDEN]**
        - **[HIDDEN]** Text input field
        - **[HIDDEN]** To enter the incentive or commission amount earned by the sales person
        - **[HIDDEN]** Optional
        - **[HIDDEN]** Accepts numbers only.
        - **[HIDDEN]** Minimum length: 2 characters.
        - **[HIDDEN]** Maximum length: 100 characters.
        - **[HIDDEN]** Once the maximum limit is reached, further input will be prevented.
        - **[HIDDEN]** An error message will appear if the entered text is less than the minimum length.
  - **[HIDDEN]** Add  Row
    - **[HIDDEN]** Button
    - **[HIDDEN]** To add a new row in the table
    - **[HIDDEN]** When clicked, a new row is added to the table.
- Loyalty Points
  - It contains the following fields:
    - Loyalty points
      - Label field
      - Displays the number of loyalty points redeemed by the customer in the current transaction
    - Loyalty amount
      - Label field
      - Displays the monetary value of the redeemed loyalty points, which is deducted from the document total.
- **[HIDDEN]** Auto repeat (Hidden)
  - **[HIDDEN]** It contains the following fields:
    - **[HIDDEN]** From Date
      - **[HIDDEN]** Date calendar picker
      - **[HIDDEN]** To select the start date of auto repeat
    - **[HIDDEN]** To date
      - **[HIDDEN]** Date calendar picker
      - **[HIDDEN]** To select the end date of auto repeat
    - **[HIDDEN]** Auto Repeat
      - **[HIDDEN]** Searchable DDL

<!-- page 87 -->
      - **[HIDDEN]** Link “Auto Repeat” doctype
      - **[HIDDEN]** Single selection
      - **[HIDDEN]** optional,
      - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Print Settings
  - It contains the following fields:
    - Letter Head
      - Searchable DDL
      - Link “Letter Head” doctype
      - Single selection
      - optional,
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Language
      - Label field
      - It displays the language selected in the print settings.
    - Print without Amount
      - Checkbox
      - If checked, the printing will be generated without amounts.
    - Group same items
      - Checkbox
      - To group the same items during printing.
- **[HIDDEN]** UTM Analytics (Hidden)
  - **[HIDDEN]** It contains the following fields:
    - **[HIDDEN]** Source
      - **[HIDDEN]** Searchable DDL
      - **[HIDDEN]** Link “UTM Source” doctype
      - **[HIDDEN]** Single selection
      - **[HIDDEN]** optional,
      - **[HIDDEN]** Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
- Additional Info
  - It contains the following fields:
    - Territory
      - Searchable DDL
      - Link “Territory” doctype
      - Displays the sales territory associated with the selected customer.
      - Multi selection
      - optional,
      - Note: the field shall be implemented as a searchable DDL (autocomplete), allowing the user to search and select from a predefined list of values.
    - Customer Purchase Order

# Use case 5 - Sales Invoice Details (view / edit / actions)

<!-- page 88 -->
    - Text input field
    - To enter the customer purchase order
    - Optional
    - Accepts letters, numbers and special characters.
    - Minimum length: 2 characters.
    - Maximum length: 100 characters.
  - Customer Purchase Order Date
    - Date calendar picker
    - To select the customer purchase order date
  - Customer Group
    - Label field
    - It displays the customer group of the customer
    - It’s fetched from the customer details

**Post**
- The More Info Details is successfully saved.

**Conditions**
- If invalid or incomplete data is entered, the corresponding error message will be displayed for each field. Sales Invoice Details

**Use case ID**

**5**

**Use case Name  Sales Invoice Details**

**Descriptions**

**The user can view / edit the sales invoice details.**

**Pre conditions**
- Click on Selling from sidebar
- Click on Sales Invoice from sidebar

<!-- page 89 -->
- Click on “Sales Invoice ID” from the table

**Main Flow**

**-**

**Components**
- Label / Input fields
  - Note:
    - If the sales Invoice status is Submitted or Cancelled:
      - The system retrieves and displays the fields as labels for viewing purposes only. These fields are read-only and cannot be edited.
    - If the sales Invoice status is Draft:
      - The system retrieves and displays the fields as input fields, allowing the user to modify the sales invoice data.
  - The system retrieves and displays the data entered during creation, allowing users to view or update it as needed in addition to the following:
- Fixed Page Actions
  - The following action buttons are fixed and consistently displayed at the top of all (Sales invoice details) pages to provide a quick access to common functions:
    - **[HIDDEN]** Hold (Hidden)
      - **[HIDDEN]** Button
      - **[HIDDEN]** When clicked, a pop up appears containing the following field:
        - **[HIDDEN]** Reason For Hold
          - **[HIDDEN]** Text area
          - **[HIDDEN]** For adding a reason for hold
          - **[HIDDEN]** Mandatory
          - **[HIDDEN]** Accepts letters, numbers, and special characters.
          - **[HIDDEN]** Minimum length: 3 characters.
          - **[HIDDEN]** Maximum length: 500 characters.
          - **[HIDDEN]** Once the maximum limit is reached, further input will be prevented.
          - **[HIDDEN]** An error message will appear if the entered text is less than the minimum length.
          - **[HIDDEN]** If the field is left empty an error message appears.
        - **[HIDDEN]** Submit
          - **[HIDDEN]** Button
          - **[HIDDEN]** When clicked,
            - **[HIDDEN]** If all required data is entered correctly and completely:
              - **[HIDDEN]** The Sales invoice is successfully holded
              - **[HIDDEN]** And its status changes to “On Hold”
            - **[HIDDEN]** If incorrect or incomplete data is entered:
              - **[HIDDEN]** A validation error message is displayed for each invalid field.
        - **[HIDDEN]** Note: after submitting the “Hold” button changes to “Resume”
      - **[HIDDEN]** Resume
        - **[HIDDEN]** Button

<!-- page 90 -->
    - **[HIDDEN]** When clicked, the sales invoice status is set to its previous status
- **[HIDDEN]** Close
  - **[HIDDEN]** Button
  - **[HIDDEN]** When clicked, the sales invoice status changes to “Closed”
  - **[HIDDEN]** And the “Close” button changes to “Re-open”
- **[HIDDEN]** Re-open
  - **[HIDDEN]** Button
  - **[HIDDEN]** When clicked, the sales invoice status is set to its previous status
- Create
  - DDL
  - Note: it appears only when the document status = Submitted
  - It contains the following values:
    - Return / Credit Note
      - Button
      - When clicked, the system navigates the user to a new “Add Sales Invoice” screen, and fetches the sales invoice data that is being returned with negative values for:
        - Qty
        - Rate
        - Valuation Rate
      - When a sales return is created against the invoice,
        - The customized system checks:
          - The original invoice is submitted.
          - The original invoice used loyalty points.
          - The original loyalty amount and loyalty paid component.
          - The original Redemption Account and accounting dimensions.
          - The original negative redemption entries.
          - The positive points earned from the original invoice.
        - If the “Redeem Loyalty Points” checkbox is checked in the original Sales Invoice
          - The “Restore Redeemed Loyalty Points” checkbox is automatically displayed and checked by default
          - Fetches the original Loyalty Amount as negative
          - Fetches the loyalty portion of POS & Loyalty Amount as negative.
          - Uses the original Redemption Account internally.
          - The user does not re-enter the

<!-- page 91 -->

**original loyalty fields.**
- On submission
  - the system creates: the opposite loyalty GL entries:
    - Debit: Customer Receivable
    - Credit: The original Loyalty Redemption Expense account
  - A positive receivable Payment Ledger Entry effect for the reversed loyalty amount.
  - No positive Redemption Restoration entry.
  - No original entry is deleted.
  - The main return receivable is a credit, while the loyalty reversal is a debit.
  - Their net Payment Ledger Entry produces the correct return outstanding.
  - If the “Redeem Loyalty Points” checkbox is checked in the original Sales Invoice :
    - Case 1 : “Restore Redeemed Loyalty Points” is checked
      - The original negative redemption entry is marked: returned = 1 , restored = 1 , that means The original negative entry is ignored in customer balance and earning-bucket calculations. And the redeemed points become available again without creating a positive restoration entry.
      - The original positive Redemption entry is marked as : returned = 1 , restored = 1
    - Case 2 : “Restore Redeemed Loyalty Points” is not checked
      - The original negative redemption entry is marked: returned = 1 , restored = 0 , that means The negative entry remains included in the calculation. And the redeemed points remain deducted from the customer’s balance
      - The original positive Redemption entry is marked as : returned = 1 , restored = 1

<!-- page 92 -->
      - If the return is cancelled,
        - Its reversal entries are reversed and the original redemption flags are restored to their previous values.
  - Note: if the original Sales Invoice is cancelled, the original Positive and negative redemption entries are marked as cancelled.
      - After submitting return / credit note:
        - The “Is Return” checkbox is displayed and checked.
        - The “Return Against Sales Invoice” field is displayed
        - The new Sales Invoice status will be “Return”
    - Delivery Note
      - Button
      - When clicked it navigates the user to the “Add Delivery Note” screen and items are fetched from the sales invoice to the Delivery Note.
    - Payment
      - When clicked, the system navigates the user to a new “Add Payment Entry” screen, and fetches the sales invoice data
      - Notes: it appears only when the:
        - Outstanding is not equal to 0
      - Notes: it disappears only when the:
        - Outstanding is equal to 0
    - **[HIDDEN]** Maintenance Schedule
      - **[HIDDEN]** Button
      - **[HIDDEN]** When clicked it navigates the user to the “Add maintenance Schedule” screen and items are fetched from the sales invoice to the maintenance Schedule.
- Actions
  - Note: it’s displayed only after submitting and the Sales Invoice status = Fully Paid or Partially Paid
  - DDL
  - It contains the following actions:
    - UnReconcile
      - Button
      - When clicked, a pop up appears containing the following table
        - Allocations
          - A table contain the following columns:
            - Checkbox icon
            - Voucher type
            - Voucher No
            - Allocated Amount

<!-- page 93 -->
          - UnReconcile
            - Button
            - When clicked, the system unreconciles the selected allocations by removing the link between the Sales Invoice and the selected payment document(s).
            - The allocated amount is released back to the source payment as an unallocated balance, the invoice outstanding amount is recalculated, and the invoice status is updated accordingly.
            - No Payment Entry or Journal Entry is cancelled or deleted; only the allocation between the documents is removed.
        - Note: the Allocations table displays only voucher type of “Payment Entry” or “Journal Entry”
    - Assign
    - Attachment
    - Tags
    - Share
    - Print
- Connections Tab
  - It contains the following values:
    - Sales Invoice
      - Button
      - Link “Sales Invoice” docktype
      - Note: filtered by “Return Invoices” only
    - Delivery Note
      - Button
      - Link “Delivery Note” docktype
    - Sales Order
      - Button
      - Link “Sales Order” docktype
    - Quotation
      - Button
      - Link “Quotation” docktype
    - **[HIDDEN]** POS Invoice
      - **[HIDDEN]** Button
      - **[HIDDEN]** Link “Pos Invoice” docktype
    - Payment Entry
      - Button
      - Link “Payment Entry” docktype

<!-- page 94 -->
  - **[HIDDEN]** Payment Request
    - **[HIDDEN]** Button
    - **[HIDDEN]** Link “Payment Request” docktype
  - Journal Entry
    - Button
    - Link “Journal Entry” docktype
  - **[HIDDEN]** Invoice Discounting
    - **[HIDDEN]** Button
    - **[HIDDEN]** Link “Invoice Discounting” docktype
  - **[HIDDEN]** Dunning
    - **[HIDDEN]** Button
    - **[HIDDEN]** Link “Dunning” docktype

**Post**
- The Sales invoice details has been successfully modified and saved

**Conditions**
- Entering incorrect or incomplete data will display the corresponding error message for each field.
