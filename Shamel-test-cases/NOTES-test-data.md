**App conventions (from SRS)**: Frappe/ERPNext-style UI. Navigation: sidebar Inventory > <module>. List pages have row checkboxes + action bar (Edit, Export, Assign to, Clear assignment, Add tags, Print, Delete). Edit popup = Field DDL + dynamic Value + Update. Link fields are searchable DDLs (autocomplete). Child tables have Add Row, Delete row, Edit Row popup, Setting popup (drag-drop columns, Column width default 3 max 3 digits numbers only, Add/Remove columns, Update, Reset to default). Delete shows confirmation, blocked with hyperlinked linked doctypes if linked.

**Delivery Trip** statuses: Draft -> (Submit) Scheduled -> In Transit / Completed (Visited checkbox per stop) ; Scheduled -> Cancelled -> Amend. Mandatory: Series, Company, Driver, Vehicle, Departure Time, stop Address Name. Details text 3-500 chars. Uses Google Maps Directions API (Calculate ETA, Optimize Route; Locked stops stay in place).

**Product Bundle**: Parent Item (Is Bundle Item on, Maintains Stock off, Is Fixed Asset off), Disabled checkbox only after first save, Description 2-100 chars, Items table: Item (Has Variants off), Qty (mandatory numbers, max 100 chars), Description 2-100, UOM auto label. Save -> status Active and Parent Item status becomes "Bundle".

**Illustrative test data used (not real, create in test env for automation)**: Company "Shamel Trading Co."; Driver "Ahmed Hassan" (also "Karim Adel" with no email/address); Vehicle "ABC-1234", "XYZ-5678"; Customers "Al Noor Stores" (address "Al Noor Stores-Billing"), "Nile Mart" (no address); Delivery Notes DN-0001/0002/0003; Series "DT-.YYYY.-"; Parent Item "Gift Box Bundle"; child items "Chocolate Bar 100g", "Coffee Mug", "Ceramic Plate"; user "Mona Samir"; boundary strings of exact lengths (2/3/100/101/500/501 chars); XSS string `<script>alert(1)</script>` as invalid-data probe.

**Open SRS ambiguities worth re-checking with BA**: Delivery Trip "Submitted" vs "Scheduled"; In Transit editability; Grand Total per stop vs per trip; Amend result; Google API error handling; duplicate Parent Item per bundle; Qty zero/negative/decimal; Item status when bundle deleted/disabled.

Related: [[shamel-testcase-format]].

