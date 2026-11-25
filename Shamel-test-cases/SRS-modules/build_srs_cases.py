"""Append generated test cases to SRS-Accounting-Sales-Invoice.md (after the marker line).
Run after build_srs_md.py:  python build_srs_cases.py
Cases are generated per field from the SRS wording (rules) + hand-written flow scenarios."""
import re

MD = 'SRS-Accounting-Sales-Invoice.md'
MARK = '<!-- TEST CASES -->'
NL = chr(10)
txt = open(MD, encoding='utf-8').read().split(MARK)[0].rstrip() + NL + NL

UC_NAMES = {1: 'List', 2: 'Add-Details', 3: 'Add-General', 4: 'Add-MoreInfo', 5: 'Details'}
# ---------------------------------------------------------------- parse md
nodes = []
page, uc = 1, 1
for ln in txt.split(NL):
    m = re.match(r'<!-- page (\d+) -->', ln)
    if m:
        page = int(m.group(1))
        continue
    m = re.match(r'# Use case (\d)', ln)
    if m:
        uc = int(m.group(1))
        continue
    m = re.match(r'^( *)- (\*\*\[(\w+)\]\*\* )?(.*)$', ln)
    if m and not ln.startswith('- **[') or (m and ln.startswith('- **[')):
        lvl = len(m.group(1)) // 2
        tag = m.group(3) or ''
        t = m.group(4).strip()
        if page >= 1 and uc and not ln.startswith('- ') or ln.startswith('- ') or ln.startswith(' '):
            nodes.append(dict(kind='b', lvl=lvl, text=t, tag=tag, page=page, uc=uc))
        continue
    m = re.match(r'^\*\*(.+?)\*\*( \*\*\[(\w+)\]\*\*)?$', ln)
    if m:
        nodes.append(dict(kind='l', lvl=2, text=m.group(1).strip(), tag=m.group(3) or '', page=page, uc=uc))
# only keep nodes after the Index (skip header bullets): start at first use case node
start = next(i for i, n in enumerate(nodes) if n['uc'] == 1 and n['page'] == 1)
nodes = nodes[start:]

cases = []
cnt = {}


def add(n, ctx, field, scn, exp, pri='Medium', typ='Functional'):
    k = n['uc']
    cnt[k] = cnt.get(k, 0) + 1
    cases.append(dict(id='SIA-%d-%04d' % (k, cnt[k]), uc=k, page=n['page'], ctx=ctx, field=field, scn=scn,
                      exp=exp, pri=pri, typ=typ))


def clean(s):
    return re.sub(r'\s*\(Hidden\)', '', s).strip(' :')


TYPE_RX = [('search', r'searchable ddl'), ('ddl', r'^ddl'), ('text', r'text input field'), ('area', r'^text area'),
           ('label', r'label field'), ('check', r'^checkbox'), ('date', r'date calendar picker'), ('time', r'time picker'),
           ('button', r'^button'), ('image', r'^image'), ('dyn', r'dynamic field')]
VIS_RX = re.compile(r'(appears only|displayed only|it appears|is displayed only|it.s displayed only|shown only|visible only)', re.I)
DEF_RX = re.compile(r'(default value|checked by default|by default)', re.I)
TRIG_RX = re.compile(r'(when clicked|will be |is displayed|displays |redirect|navigat|error message|automatically|should|shall|is fetched|it.s fetched|not be overwritten|only when|cannot|can be)', re.I)

# split nodes into blocks: a block = node + deeper children
n_total = len(nodes)


def children(i):
    n = nodes[i]
    out = []
    j = i + 1
    while j < n_total:
        m = nodes[j]
        if n['kind'] == 'l':
            if m['kind'] == 'l' or (m['kind'] == 'b' and m['lvl'] <= 1) or m['uc'] != n['uc']:
                break
        else:
            if m['kind'] == 'l' or m['lvl'] <= n['lvl']:
                break
        out.append(m)
        j += 1
    return out


stack = []  # (lvl,text)
table_owner = ''
done = set()
for i, n in enumerate(nodes):
    if n['kind'] == 'b':
        while stack and stack[-1][0] >= n['lvl']:
            stack.pop()
        stack.append((n['lvl'], n['text']))
    ctxs = [clean(s[1])[:40] for s in stack[:2]]
    ctx = ' > '.join(ctxs)
    name = clean(n['text'])
    kids = children(i)
    ktx = [k['text'] for k in kids]
    kl = [k.lower() for k in ktx]
    joined = ' | '.join(ktx)
    hidden = n['tag'] == 'HIDDEN' or '(hidden)' in n['text'].lower()
    # --- structural cases
    low = n['text'].lower()
    if low.startswith('a table contain'):
        owner = clean(stack[-2][1]) if len(stack) > 1 else ctx
        add(n, owner, owner + ' table', 'Open the screen and view the table', 'Table shows the columns defined in the SRS, in order; multi-select checkbox column and No. column present', 'Medium')
        continue
    if re.match(r'^setting\b', low) and any('pop up' in k for k in kl):
        owner = clean(stack[-2][1]) if len(stack) > 1 else ctx
        f = owner + ' - table Setting'
        add(n, owner, f, 'Click Setting', 'Pop-up opens with: drag-and-drop column order, Column width, Add / Remove columns, Update, Reset to default', 'Medium')
        add(n, owner, f, 'Drag a column header to a new position then Update', 'Column order changes and is kept', 'Low')
        add(n, owner, f, 'Column width: empty / 0 / 1 / 999 / 1000 / letters', 'Min 1 and max 3 characters, numbers only; default 3; further input blocked after 3 chars', 'Low', 'Boundary')
        add(n, owner, f, 'Add / Remove columns: untick then tick columns, Update', 'Pop-up lists all columns listed in the SRS; unticked columns hide, ticked show', 'Medium')
        add(n, owner, f, 'Click Reset to default after changes', 'Order, widths and visible columns return to default', 'Low')
        continue
    if re.match(r'^add\s+row', low):
        owner = clean(stack[-2][1]) if len(stack) > 1 else ctx
        add(n, owner, owner + ' - Add Row', 'Click Add Row', 'A new empty row is added to the table', 'High')
        continue
    if re.match(r'^delete row', low):
        owner = clean(stack[-3][1]) if len(stack) > 2 else ctx
        f = owner + ' - Delete row'
        add(n, owner, f, 'Select one row (checkbox)', 'Action bar appears with Delete row', 'Medium')
        add(n, owner, f, 'Select several rows and click Delete row', 'All selected rows are deleted; totals recalculated', 'High')
        add(n, owner, f, 'Select all rows then Delete row', 'Rows removed; table is empty; save validation per rule for the table', 'Medium')
        continue
    if re.match(r'^edit row', low):
        owner = clean(stack[-2][1]) if len(stack) > 1 else ctx
        add(n, owner, owner + ' - Edit Row', 'Click the Edit Row icon of a row', 'Pop-up opens with the full field list from the SRS and the row values', 'High')
        add(n, owner, owner + ' - Edit Row', 'Change a value in the pop-up and close / save', 'Row in the table shows the new value; document stays Draft', 'High')
        continue
    # --- field detection
    ftype = None
    first = kl[0] if kl else ''
    for t, rx in TYPE_RX:
        if any(re.search(rx, k) for k in kl[:3]):
            ftype = t
            break
    if n['kind'] == 'b' and n['lvl'] > 6:
        pass
    if not kids or ftype is None:
        # behaviour block: generate verify cases from trigger sentences (shallow only)
        if kids and n['kind'] == 'b' and (re.match(r'^(when clicked|if |case|upon)', low) is None):
            pass
        continue
    if i in done:
        continue
    if re.match(r'^(it contains|a table|it shows|it displays|these columns|column width|users can|when clicked|note|important)', name.lower()) or name.lower() in ('setting','create','status','items'):
        continue
    f = name
    if hidden:
        add(n, ctx, f, 'Open the screen (all tabs / statuses) and look for the field', 'Field "%s" is NOT displayed anywhere (red in SRS = hidden)' % f, 'Medium', 'Negative')
        continue
    mand = any(k.startswith('mandatory') for k in kl)
    opt = any(k.startswith('optional') for k in kl)
    ro = any('read only' in k or k.startswith('label field') for k in kl) or ftype == 'label'
    errmsg = any('error message' in k and 'empty' in k for k in kl)
    # core behaviour per type
    if ftype in ('search', 'ddl'):
        vals = []
        for k in ktx:
            if k.lower().startswith(('it contains the following values', 'it displays the following values', 'it shows one of')):
                pass
        add(n, ctx, f, 'Open the list and type part of a value', 'List filters while typing; selecting a value fills the field' if ftype == 'search' else 'List shows all values defined in the SRS; selecting one fills the field', 'High')
        add(n, ctx, f, 'Select a value, Save, reopen the document', 'Value persisted; single selection only (a second pick replaces the first)', 'High')
        lk = re.search(r'link .(.+?). doctype', joined, re.I)
        if lk:
            add(n, ctx, f, 'Check the options list', 'Only records of doctype "%s" are offered; no cancelled/disabled values unless SRS says so' % lk.group(1), 'Medium')
        add(n, ctx, f, 'Type text with no match', 'No result shown; no value is set; no error crash', 'Low', 'Negative')
    elif ftype in ('text', 'area'):
        pass
    if mand:
        add(n, ctx, f, 'Leave the field empty and Save', ('Error message for "%s" and the document is not saved' % f), 'High', 'Negative')
        add(n, ctx, f, 'Fill the field with a valid value and Save', 'Saved without a field error', 'High')
    elif opt:
        add(n, ctx, f, 'Leave the field empty and Save', 'Saved; no error (optional)', 'Medium')
    mx = re.search(r'maximum length: (\d+)', joined, re.I)
    mn = re.search(r'minimum length: (\d+)', joined, re.I)
    if mx and ftype in ('text', 'area'):
        v = int(mx.group(1))
        add(n, ctx, f, 'Enter exactly %d characters' % v, 'Accepted in full and saved', 'Medium', 'Boundary')
        add(n, ctx, f, 'Type / paste %d characters' % (v + 1), 'Input stops at %d characters (further input prevented)' % v, 'Medium', 'Boundary')
    if mn and ftype in ('text', 'area'):
        v = int(mn.group(1))
        add(n, ctx, f, 'Enter %d character(s) (min-1) and Save' % (v - 1), 'Error message about the minimum length' if (v > 1) else 'Handled per SRS', 'Medium', 'Boundary')
        add(n, ctx, f, 'Enter exactly %d characters and Save' % v, 'Accepted', 'Medium', 'Boundary')
    if ftype in ('text', 'area'):
        if any('numbers only' in k or 'integers numbers only' in k for k in kl):
            add(n, ctx, f, 'Type letters and special characters', 'Rejected (not typed or error shown); only digits stay', 'Medium', 'Negative')
            add(n, ctx, f, 'Type a number with decimals (12.5)', 'Accepted when decimals are allowed; otherwise error', 'Medium')
            add(n, ctx, f, 'Type negative / zero / very large number', 'Behaves per rule (documented in expected result of the SRS note, else flag as SRS gap)', 'Low', 'Boundary')
        if any('integers and decimal' in k for k in kl):
            add(n, ctx, f, 'Type 10, 10.55, abc, 10,5', 'Integers and decimals accepted; letters rejected', 'Medium')
        if any('letters, numbers' in k for k in kl):
            add(n, ctx, f, 'Enter letters, digits and special characters (Ab1-#_/ )', 'Accepted and saved exactly', 'Medium')
            add(n, ctx, f, 'Enter an HTML/script string and Save', 'Stored as plain text; no execution; or "invalid data" error per SRS', 'Medium', 'Security')
        if any('invalid data' in k for k in kl):
            add(n, ctx, f, 'Enter invalid data (only special characters / script)', 'Error message "invalid data" for the field', 'Medium', 'Negative')
    if ftype == 'check' and any('read only' in k for k in kl):
        add(n, ctx, f, 'View the checkbox on a document where its condition is met / not met', 'Shows the system-set state (checked/unchecked) and cannot be changed by the user', 'Medium', 'Negative')
    elif ftype == 'check':
        add(n, ctx, f, 'Tick the checkbox', 'Checked; dependent fields / behaviour of the SRS "when checked" apply', 'High')
        add(n, ctx, f, 'Untick the checkbox', 'Unchecked; dependent fields / behaviour revert', 'High')
    if ftype == 'date':
        add(n, ctx, f, 'Pick a date from the calendar', 'Date set and displayed in the system format', 'High')
        add(n, ctx, f, 'Type an invalid date (31/02, letters)', 'Rejected / error', 'Low', 'Negative')
    if ftype == 'time':
        add(n, ctx, f, 'Pick a time', 'Time set; default is the current time when SRS says so', 'Low')
    if ftype == 'button':
        for k in ktx[:6]:
            if re.search(r'when clicked|it appears|only when|redirect|navigat', k, re.I):
                add(n, ctx, f, 'Verify: ' + k[:140], 'Behaves exactly as the SRS sentence', 'High')
    if ro and ftype in ('label', 'text', 'search', 'check') and ftype == 'label':
        add(n, ctx, f, 'Click on the value and try to type', 'Read-only: value cannot be edited', 'Medium', 'Negative')
    for k in ktx:
        kk = k.lower()
        if re.search(r'(fetched from|it.s fetched|fetched based)', kk) and 'note' in kk[:6] or kk.startswith(('it displays the', 'it.s fetched', 'displays the')) and 'fetch' in kk:
            add(n, ctx, f, 'Verify: ' + k[:140], 'Value is filled automatically from the source and matches it; changing the source updates it', 'High', 'Integration')
        if VIS_RX.search(kk) and kk.startswith(('note', 'it ', 'appears', 'displayed')) and 'only' in kk:
            add(n, ctx, f, 'Condition TRUE: ' + k[:140], 'Field is visible', 'High', 'Conditional')
            add(n, ctx, f, 'Condition FALSE: ' + k[:140], 'Field is not visible', 'High', 'Conditional')
        if DEF_RX.search(kk):
            add(n, ctx, f, 'Open a new document: ' + k[:130], 'Default value is as stated', 'Medium', 'Default')
        if '=' in k and re.search(r'note|calculated|=', kk) and not kk.startswith(('when', 'if ')) and 'name in erpnext' not in kk and 'original name' not in kk and len(k) < 160 and re.search(r'[A-Za-z] *= *[A-Za-z(]', k):
            add(n, ctx, f, 'Formula: ' + k[:140], 'Displayed value equals the formula result (check with 2 sets of numbers incl. rounding)', 'High', 'Calculation')
        if re.search(r'(only .*(displays|are displayed|shows)|filtered|displays only)', kk) and not VIS_RX.search(kk):
            add(n, ctx, f, 'Filter: ' + k[:140], 'List contains only the records allowed by the rule; excluded records are not offered', 'Medium', 'Filter')
        if 'drag' in kk and 'drop' in kk:
            pass

# ---------------------------------------------------------------- scenarios (hand written, flow level)
S = []


def sc(uc, page, feat, scn, exp, pri='High', typ='Flow'):
    S.append((uc, page, feat, scn, exp, pri, typ))


# list (uc1)
for st, rule in [('Draft', 'saved, not submitted'), ('Unpaid', 'submitted and Grand Total = Outstanding'),
                 ('Partially Paid', 'submitted and Grand Total > Outstanding'), ('Fully Paid', 'submitted and Outstanding = 0'),
                 ('Overdue', 'submitted, due date passed and not paid'), ('Return', 'submitted and Is Return = 1'),
                 ('Fully Credited', 'submitted, Outstanding = 0 and Grand Total = Credit Amount'), ('Cancelled', 'document cancelled')]:
    sc(1, 1, 'Invoice Status', 'Create an invoice that is: ' + rule, 'List and details show Invoice Status = ' + st)
for st, rule in [('Not Applicable', 'Draft'), ('No Credit', 'Credit Amount = 0'), ('Partially Credited', 'Credit Amount > 0'), ('Fully Credited', 'sum of submitted returns = Grand Total')]:
    sc(1, 2, 'Credit Status', 'Invoice with ' + rule, 'Credit Status = ' + st)
for st, rule in [('Not Applicable', 'Draft'), ('No Refund', 'Refund Amount = 0'), ('Partially Refunded', 'Refund Amount > 0'), ('Fully Refunded', 'Refund Amount > 0 and = Paid Amount')]:
    sc(1, 3, 'Refund Status', 'Invoice with ' + rule, 'Refund Status = ' + st)
sc(1, 2, 'Invoice Status', 'Check that On Hold and Closed (red) never appear as a value / filter option', 'Not present anywhere', 'Medium', 'Negative')
sc(1, 3, 'List columns', 'Open the list', 'Columns: checkbox, Sales Invoice ID, Invoice Status, Credit Status, Refund Status, Customer Name, Posting Date, Payment Due date, Grand Total', 'High')
sc(1, 3, 'List', 'Click a Sales Invoice ID', 'Opens Sales Invoice Details of that invoice', 'High')
sc(1, 3, 'Add Sales Invoice', 'Click Add Sales Invoice', 'Opens the Add Sales Invoice screen', 'High')
sc(1, 3, 'Bulk Edit', 'Select Draft invoices > Edit > pick field > value > Update', 'Field changed on all selected Drafts; Value input type follows the selected field', 'High')
sc(1, 3, 'Bulk Edit', 'Select a Submitted or Cancelled invoice > Edit > Update', 'Error: the Sales Invoice cannot be modified', 'High', 'Negative')
sc(1, 3, 'Bulk Edit', 'Update with empty Field or empty mandatory Value', 'Validation error; nothing changed', 'Medium', 'Negative')
sc(1, 4, 'Actions bar', 'Select a row', 'Action bar shows Edit, Export, Assign to, Clear assignment, Add tags, Print, Submit (Draft only), Cancel (Submitted only), Delete (Draft/Cancelled only)', 'High')
sc(1, 4, 'Submit (list)', 'Select Drafts and Submit', 'Submitted successfully; button hidden for non-Draft', 'High')
sc(1, 4, 'Cancel (list)', 'Select a Submitted invoice and Cancel', 'Cancelled; Cancel changes to Amend', 'High')
sc(1, 4, 'Delete (list)', 'Delete a Draft not linked to anything, confirm Yes', 'Confirmation first; then deleted successfully', 'High')
sc(1, 4, 'Delete (list)', 'Delete an invoice that another invoice was amended from', 'Warning: cannot delete until related documents are deleted; linked doctypes shown as hyperlinks that open them', 'High', 'Negative')
sc(1, 4, 'Delete (list)', 'Delete an invoice linked to other transactions (payment, return, delivery note)', 'Message that linked transactions must be deleted first, with hyperlinks', 'High', 'Negative')
sc(1, 4, 'Delete (list)', 'Delete a Cancelled invoice with no links', 'Deleted successfully (known issue SI-45 in review report)', 'High')
sc(1, 4, 'Delete (list)', 'Click Delete then answer No / close the dialog', 'Nothing deleted', 'Medium', 'Negative')
sc(1, 4, 'Export / Print / Assign / Tags', 'Use each action on a selected invoice', 'Export file downloads; Print preview opens; assign and tags are saved and visible', 'Medium')
# add flow uc2
sc(2, 5, 'Add - full happy path', 'Fill Company, Series, Customer, Due Date, one item with warehouse, Save', 'Saved as Draft, appears in list with status Draft', 'High')
sc(2, 5, 'Add - submit', 'After Save click Submit', 'Status Submitted (Unpaid); form read-only; GL entries created', 'High')
sc(2, 5, 'Add - required set', 'Save with only Company', 'Error messages for each missing mandatory field (Series, Customer, Currency, Price List, Due Date, Item rows)', 'High', 'Negative')
sc(2, 6, 'Posting date/time', 'Tick Edit Posting Date And Time, change date and time, Save', 'Saved values used; with the box unticked both are read-only with defaults (current date/time)', 'High')
sc(2, 6, 'Payment Due Date', 'Set Due Date earlier than Posting Date', 'Error (due date cannot be before posting date)', 'High', 'Negative')
sc(2, 6, 'Customer change', 'Select customer A then customer B', 'Customer Name, Tax ID, addresses, contacts, payment terms, price list and currency refresh for B', 'High', 'Integration')
sc(2, 7, 'Rate Adjustment Entry (Debit Note)', 'Tick Is Rate Adjustment Entry, pick Source Invoice', 'Source Invoice appears (yellow in SRS); untick hides it; check the original is not changed', 'Medium', 'Conditional')
sc(2, 7, 'Update Outstanding for Self', 'Default state; untick on a return/debit note', 'Checked by default; unticked: amount allocated to the original invoice only if original >= current', 'High', 'Calculation')
sc(2, 7, 'Update Billed Amount (SO / DN)', 'Open a return invoice', 'Both checkboxes visible only when Is Return = 1; ticked: billed amount in linked SO / DN updates', 'Medium', 'Conditional')
sc(2, 7, 'Amended From', 'Amend a cancelled invoice', 'Amended From shows the original and is clickable (opens it); not shown on a normal invoice', 'Medium')
sc(2, 8, 'Exchange Rate - rule configured', 'Currency <> company currency with a fetching rule in Accounts Settings', 'Rate fetched automatically and read-only; only users with the configured role may edit; manual value overrides the fetched one', 'High', 'Integration')
sc(2, 9, 'Exchange Rate - not found / Prompt', 'No rate exists and Action = Prompt User to Add Exchange Rate', 'User is prompted to create an Exchange Rate; after creation the field is populated and read-only', 'High', 'Integration')
sc(2, 9, 'Exchange Rate - not found / API', 'No rate exists and Action = Use API to Get Exchange Rate', 'Rate created and fetched via API; field populated, read-only', 'High', 'Integration')
sc(2, 10, 'Price List Exchange Rate', 'Repeat the three exchange-rate cases for the price-list currency', 'Same behaviour as document Exchange Rate', 'High', 'Integration')
sc(2, 10, 'Price List defaults', 'Open a new invoice', 'Price List defaults to the one in Selling Settings; Price List Currency is read-only from the list', 'Medium', 'Default')
sc(2, 12, 'Ignore Pricing Rule', 'Tick with a price list that has pricing rules', 'Pricing rules ignored; Discount (%) and Discount Amount columns not shown when Ignore = 0 rule: shown only when Ignore Pricing Rule = 0', 'Medium', 'Conditional')
sc(2, 12, 'Scan Barcode', 'Type 1, 2, 100, 101 characters; letters/numbers/special; slow manual typing', 'Min 2 / max 100; input blocked at 100; value typed too slowly is cleared; valid barcode adds the item row', 'Medium', 'Boundary')
sc(2, 12, 'Source Warehouse', 'Visible only when Update Stock = 1; pick a warehouse', 'Fills empty row warehouses only; existing values not overwritten; only child (non-group) warehouses of the company', 'High', 'Conditional')
sc(2, 12, 'Update Stock - visibility', 'Selling Settings: Allow Update Stock In Sales Invoice on / off', 'Checkbox appears only when the setting is on', 'High', 'Conditional')
sc(2, 12, 'Update Stock - POS', 'Include Payment (POS) = 1', 'Update Stock value comes from the POS Profile and is read-only', 'High', 'Conditional')
sc(2, 12, 'Update Stock - from Delivery Note', 'Create the invoice from a Delivery Note', 'Update Stock unchecked and read-only', 'High', 'Conditional')
sc(2, 12, 'Update Stock - no stock items', 'Only non-stock items in the table', 'Update Stock unchecked and read-only', 'High', 'Conditional')
sc(2, 13, 'Update Stock - dropship', 'At least one dropshipping item', 'Update Stock unchecked and read-only', 'High', 'Conditional')
sc(2, 13, 'Update Stock - none of the 4 rules', 'Stock items, no POS/DN/dropship', 'Update Stock checked and editable', 'High', 'Conditional')
sc(2, 13, 'Update Stock - submit', 'Submit with Update Stock = 1', 'Stock Ledger Entries and Accounting Entries created; quantity deducted immediately', 'High', 'Integration')
sc(2, 13, 'Item shortage - Ignore / Warn / Block', 'Enter Qty above Available Qty under each Selling Settings action', 'Ignore: proceed silently; Warn: warning, can continue; Block: transaction stopped', 'High', 'Integration')
sc(2, 13, 'Qty vs available', 'Qty less than available', 'Warning that quantity is less than available (SRS note) - clarify wording gap with BA', 'Low', 'SRS-gap')
sc(2, 14, 'Item table - Rate', 'Select item', 'Rate auto-filled from price list in document currency; can be edited; numbers only', 'High', 'Integration')
sc(2, 14, 'Item table - Amount', 'Change Qty and Rate', 'Amount = Qty x Rate updates immediately (SI-35 known: stale after Rate edit)', 'High', 'Calculation')
sc(2, 14, 'Item Code filter', 'Open the Item Code list', 'Only items with Is Fixed Asset = 0, Has Variants = 0 and Allow Sales = 1', 'High', 'Filter')
sc(2, 14, 'Warehouse filter', 'Open the Warehouse list', 'Only non-group warehouses of the selected company', 'High', 'Filter')
sc(2, 14, 'Row selection', 'Tick a row checkbox / header checkbox', 'Action bar with Delete row appears; header selects all', 'Medium')
sc(2, 15, 'Table settings (items)', 'Add / Remove columns: list must contain the SRS columns (Barcode and Has Item Scanned are red = hidden)', 'Barcode / Has Item Scanned not offered', 'Medium', 'Negative')
sc(2, 18, 'Item Edit Row', 'Open Edit Row of an item', 'Fields per SRS; Barcode and Has item scanned (red) not shown', 'High')
sc(2, 18, 'Item Edit Row - Description', 'Description with 2, 3, 500, 501 chars', 'Min 3 / max 500; error under 3; stops at 500', 'Medium', 'Boundary')
sc(2, 21, 'UOM', 'Open UOM list of an item', 'Only UOMs defined in the item UOM table; Stock UOM, Conversion Factor, Qty as per Stock UOM update', 'High', 'Calculation')
sc(2, 22, 'Margin', 'Margin Type = Percentage / Amount with a Margin value', 'Rate With Margin = Price List Rate + Margin; Margin Rate or Amount accepts numbers and special characters only per SRS', 'Medium', 'Calculation')
sc(2, 22, 'Discount fields visibility', 'Ignore Pricing Rule = 0 then = 1', 'Discount (%) and Discount Amount rows visible only when = 0', 'Medium', 'Conditional')
sc(2, 24, 'Net totals', 'Item with tax template', 'Net Amount = Net Rate x Qty; company-currency values use the exchange rate', 'High', 'Calculation')
sc(2, 25, 'Finance Book / Asset', 'Pick an Asset', 'Finance Book appears only after Asset is entered', 'Low', 'Conditional')
sc(2, 26, 'Deferred revenue', 'Tick Enable deferred revenue (default from item)', 'Deferred revenue account, Service start / end / stop dates appear; untick hides them', 'Medium', 'Conditional')
sc(2, 26, 'Total weight', 'Qty 3 and weight per unit 2', 'Total Weight = 6', 'Low', 'Calculation')
sc(2, 27, 'Serial / Batch', 'Activate Serial/Batch in Inventory Settings; Pick Serial / Batch No', 'Picks per FIFO / LIFO / Expiry; Use Serial No / Batch Fields hides the pick button and bundle, shows Serial No and Batch No', 'High', 'Integration')
sc(2, 28, 'Serial No field', 'Enter serials, press Enter', 'New line per serial; min 3 / max 500; error under 3 or invalid', 'Medium', 'Boundary')
sc(2, 31, 'Totals', 'Several items with different qty and rates', 'Total Quantity, Total, Total (company currency), Net Total, Total Net Weight all match the sums', 'High', 'Calculation')
sc(2, 32, 'Taxes template', 'Select Sales Taxes and Charges Template', 'Taxes table filled from the template; Tax category fetched; clearing the template keeps/clears per rule', 'High', 'Integration')
sc(2, 32, 'Incoterm / Named Place', 'Look for both fields', 'Not displayed (red = hidden)', 'Medium', 'Negative')
for mode in ['Actual', 'On Net Total', 'On Previous Row Amount', 'On Previous Row Total', 'On Item Quantity']:
    sc(2, 32, 'Taxes - Mode', 'Add a tax row with mode ' + mode, 'Tax amount computed per mode; Reference Row only for the two "Previous Row" modes (auto = previous row number)', 'High', 'Calculation')
sc(2, 33, 'Taxes - mandatory', 'Row without Mode / Account Head', 'Error for each', 'High', 'Negative')
sc(2, 35, 'Taxes - Edit Row', 'Open Edit Row of a tax', 'Fields per SRS; Set by Item Tax Template and Is tax withholding Account only when applicable; Description 3-500', 'Medium')
sc(2, 38, 'Totals (currency)', 'Taxes + items', 'Grand Total, Rounding Adjustment, Rounded Total, In Words in both document and company currency consistent', 'High', 'Calculation')
sc(2, 38, 'Use Company Default cost center for round off', 'Tick and submit with rounding', 'Round-off posted to the company default cost center', 'Low', 'Integration')
sc(2, 39, 'Total Avance / Outstanding', 'Invoice with advance allocated', 'Total Advance = allocated; Outstanding = Grand Total - advances - payments', 'High', 'Calculation')
sc(2, 39, 'Additional Discount', 'Apply on Grand Total, then on Net Total, with % then amount', 'Totals recalc; % and amount stay consistent; item Distributed Discount Amount shows each row share (SI-33 known server error)', 'High', 'Calculation')
sc(2, 40, 'Additional Discount - limits', 'Type 100 chars; letters; negative; > 100 %', 'Numbers only; blocked at 100 chars; > 100 % rejected', 'Medium', 'Boundary')
sc(2, 40, 'Coupon Code', 'Select a valid / expired / used-up coupon', 'Valid applies the pricing rule; invalid shows an error', 'Medium', 'Integration')
sc(2, 40, 'Bundle Items table', 'Add a Product Bundle item and Save', 'Table appears only after Save; parent item, item code, qty, rate read-only; description 3-500 editable', 'High', 'Conditional')
sc(2, 47, 'Billing hours / amounts', 'Invoice linked to Timesheets', 'Total Billing Hours / Amounts calculated automatically', 'Low', 'Calculation')
sc(2, 47, 'Get Items From - Sales Order', 'Open the pop-up', 'Search by name (max 100) and customer; list only Sales Orders To Bill / Partially Billed; Get Items fills the table; name link opens the SO', 'High', 'Integration')
sc(2, 48, 'Get Items From - Quotation', 'Open the pop-up', 'Only Open quotations; Party column; Get Items fills the table', 'High', 'Integration')
sc(2, 49, 'Get Items From - Delivery Note', 'Open the pop-up', 'Only To Deliver delivery notes (SRS says quotations - SRS defect); Get Items fills the table', 'High', 'Integration')
sc(2, 50, 'View menu', 'Open View on Draft / Submitted / Cancelled', 'View Accounting Ledger only for Draft/Submitted; View Stock Ledger only when Update Stock = 1 and Draft/Submitted', 'High', 'Conditional')
sc(2, 51, 'Create Quality Inspection(s)', 'Item with Inspection Required Before Delivery; Update Stock = 1', 'Pop-up lists only those items; Sample size cannot exceed Qty; Create makes the inspection; shown only per SRS conditions', 'High', 'Integration')
sc(2, 52, 'Save', 'Save valid data', 'Saved, not submitted, status Draft, appears in list', 'High')
sc(2, 52, 'Save', 'Save with invalid data', 'Validation error per invalid field', 'High', 'Negative')
sc(2, 52, 'Submit button', 'New unsaved document', 'Submit appears only after Save', 'High', 'Conditional')
sc(2, 52, 'Loyalty earn', 'Customer with Loyalty Program, submit', 'Positive Loyalty Point Entry created; balance rises; no GL / Payment Ledger / cash entry for earning', 'High', 'Integration')
sc(2, 52, 'Loyalty redeem', 'Redeem points and submit', 'Negative Loyalty Point Entries; GL Dr Loyalty Redemption Expense / Cr Receivable; outstanding reduced; no Payment Entry', 'High', 'Integration')
sc(2, 52, 'Loyalty redeem checks', 'Redeem with insufficient / expired points, another company program, amount > Grand Total, missing account or cost center', 'Submit blocked with a specific error each', 'High', 'Negative')
sc(2, 53, 'Submit - read only', 'Open a submitted invoice and try to edit', 'All fields read-only', 'High', 'Negative')
sc(2, 53, 'Cancel', 'Cancel a submitted invoice', 'Status Cancelled; GL reversed; Cancel replaced by Amend', 'High')
sc(2, 53, 'Amend', 'Click Amend on a cancelled invoice', 'New Draft copy with Amended From set', 'High')
# uc3
sc(3, 54, 'Cash / Bank Account', 'Open the list', 'Only accounts of type Bank or Cash; default from POS Profile', 'Medium', 'Filter')
sc(3, 55, 'Payments table', 'Add a row, clear Mode of Payment; clear Amount', 'Errors for each mandatory field', 'High', 'Negative')
sc(3, 55, 'Payments - Amount', 'Enter 0, 1, 10.5, abc, 101 chars', 'Integers and decimals only, max 100; letters rejected', 'Medium', 'Boundary')
sc(3, 56, 'Payments - columns', 'Add / Remove columns', 'Default, Mode of Payment, Amount, Reference No, Account, Type, Base Amount, Clearance Date', 'Low')
sc(3, 58, 'POS & Loyalty Amount', 'Check values with payments + loyalty', 'Company-currency and document-currency amounts correct (original ERPNext name Paid Amount)', 'High', 'Calculation')
sc(3, 59, 'Change amount', 'Pay more than Grand Total', 'Change Amount / Base Change Amount calculated; Account For Change Amount from POS Profile', 'High', 'Calculation')
sc(3, 59, 'Allocate Advance Automatically (FIFO)', 'Selling Settings on / off', 'Default checked / unchecked accordingly; ticked: advances fetched FIFO', 'High', 'Default')
sc(3, 60, 'Only Include Allocated Payments Against Reference SO', 'Visible only when FIFO ticked; default from Selling Settings', 'Conditional display and default', 'Medium', 'Conditional')
sc(3, 60, 'Advances table', 'Delete a row and Save', 'The system does not overwrite the Advances table (row stays deleted)', 'High')
sc(3, 60, 'Get Advance Received', 'Look for the button', 'Not displayed (red = hidden) - actual UI shows it, error SI-46', 'Medium', 'Negative')
sc(3, 61, 'Advances - Allocated Amount', 'Edit allocated amount above / below advance amount', 'Above advance blocked; below allowed; outstanding recalculated', 'High', 'Calculation')
sc(3, 64, 'Write Off', 'Write Off Amount 0 / partial / above outstanding; tick Write Off Outstanding Amount', 'Partial reduces outstanding; tick writes off all and marks Fully Paid; above outstanding rejected; Account and Cost Center used in GL', 'High', 'Calculation')
sc(3, 65, 'Loyalty Points Redemption', 'Tick Redeem Loyalty Points', 'Loyalty Points, Loyalty Amount, Redemption Account, Redemption Cost Center appear; points auto-retrieved up to Grand Total', 'High', 'Conditional')
sc(3, 65, 'Loyalty Amount', 'Points x conversion factor', 'Loyalty Amount = points x conversion factor; excluded from earning calculation', 'High', 'Calculation')
sc(3, 66, 'Restore Redeemed Loyalty Points', 'Return against an invoice that redeemed points', 'Checkbox shown and checked by default; checked: redemption entry returned=1,restored=1; unchecked: returned=1,restored=0', 'High', 'Integration')
sc(3, 67, 'Billing Address', 'Select customer with preferred / primary / only latest address', 'Preferred billing address first; else primary; else latest created; user can overwrite; Address text shows description, city, state, country', 'High', 'Default')
sc(3, 68, 'Billing Contact', 'Select customer with preferred / primary / latest contact', 'Same fallback order; Contact Person filtered to Customer or Lead contacts; details show phones and emails with primary clearly marked; Contact (name) field hidden', 'High', 'Default')
sc(3, 68, 'Shipping Address', 'Same fallback order as billing', 'Preferred shipping, then primary, then latest', 'High', 'Default')
sc(3, 69, 'Company Address', 'Open a new invoice', 'Company primary address, else latest company address; Contact Person only company contacts with Is Your Company Contact', 'Medium', 'Default')
sc(3, 70, 'Payment Terms Template', 'Select a template', 'Payment Schedule rows filled automatically from the template', 'High', 'Integration')
sc(3, 70, 'Payment Schedule - Due Date', 'Clear Due Date in a row', 'Error; mandatory', 'High', 'Negative')
sc(3, 71, 'Payment Schedule - Invoice Portion', 'Portion 0, 1, 100, 101, letters; sum of portions <> 100', 'Percent numbers only, 1-3 chars (list) / up to 100 chars (Edit Row - SRS inconsistency); total must be 100 percent', 'High', 'Boundary')
sc(3, 71, 'Payment Schedule - Payment Amount', 'Enter amount with decimals', 'Accepted; sum equals Grand Total else error', 'High', 'Calculation')
sc(3, 74, 'Payment Schedule - Edit Row read-only', 'Open Edit Row', 'Due Date Based On, Credit Days, Credit Months, Discount Validity Based On, Discount Validity, Paid Amount read-only and fetched from the Payment Term', 'Medium')
sc(3, 75, 'Early payment discount', 'Enter Discount value', 'Discount Date appears only after a Discount value and is then mandatory; Discount Type Percentage / Amount', 'Medium', 'Conditional')
sc(3, 77, 'Outstanding in schedule', 'Payment Term empty then filled', 'Outstanding shown only when Payment Term has a value', 'Low', 'Conditional')
sc(3, 77, 'Terms', 'Select Terms and Conditions', 'Content filled automatically; empty terms: section not shown on details page', 'Medium', 'Integration')
sc(3, 78, 'Terms content', '2, 3, 500, 501 chars; script text', 'Min 3, max 500, invalid data error', 'Medium', 'Boundary')
# uc4
sc(4, 79, 'Status block', 'Compare Invoice / Credit / Refund Status with the list for the same invoice', 'Identical values in list and More Info', 'High', 'Consistency')
sc(4, 80, 'Debit To', 'Open a submitted invoice and click Debit To', 'Shows receivable account; click opens the account', 'Medium')
sc(4, 80, 'Is Opening Entry', 'Normal invoice / opening entry', 'Label shows No / Yes', 'Low')
sc(4, 80, 'Against Income Account', 'Items with different income accounts', 'Lists the income accounts used by the items', 'Medium', 'Calculation')
sc(4, 81, 'Paid Amount', 'Receive payment(s) via Payment Entry', 'Paid Amount = sum of Payment Ledger Entries (Payment Entry, type Receive, amount < 0, not delinked, against this invoice); draft and cancelled documents ignored', 'High', 'Calculation')
sc(4, 81, 'Credit Amount', 'Create partial / full returns', 'Credit Amount = sum of submitted returns against this invoice', 'High', 'Calculation')
sc(4, 81, 'Credit Allocated', 'Return invoice and credit-note Journal Entry against the invoice', 'Sum of PLE from return invoices + credit-note journal entries (amount < 0, not delinked)', 'High', 'Calculation')
sc(4, 81, 'Refund Amount - return', 'Pay a refund (Payment Entry type Pay) against the return invoice', 'Refund Amount = sum of Pay entries (amount > 0) against the return', 'High', 'Calculation')
sc(4, 82, 'Refund Amount - normal invoice', 'Journal Entry (Journal/Cash/Bank) crediting a cash or bank account against the invoice', 'Refund Amount = sum of those entries (amount > 0)', 'Medium', 'Calculation')
sc(4, 82, 'Accounting Details - cancelled docs', 'Cancel the payment / journal entry', 'Values recalculated ignoring the cancelled document', 'High', 'Calculation')
sc(4, 82, 'Commission / Sales Team / Auto repeat / UTM Analytics', 'Look for each group', 'None displayed (red = hidden)', 'Medium', 'Negative')
sc(4, 86, 'Loyalty Points block', 'Invoice with redeemed points', 'Loyalty points and Loyalty amount shown as labels', 'Medium')
sc(4, 87, 'Print Settings', 'Pick Letter Head; tick Print without Amount and Group same items; Print', 'Print preview reflects every setting; Language label shows the print language', 'Medium', 'Integration')
sc(4, 87, 'Additional Info - Territory', 'Select customer', 'Territory comes from the customer; SRS says multi selection (check single vs multi)', 'Low', 'SRS-gap')
sc(4, 88, 'Customer Purchase Order', '1, 2, 100, 101 chars', 'Min 2, max 100; special characters allowed', 'Medium', 'Boundary')
sc(4, 88, 'Customer Group', 'Select customer', 'Customer Group label fetched from the customer (SI-41 known)', 'Medium', 'Integration')
# uc5
sc(5, 89, 'Details - editability', 'Open Draft / Submitted / Cancelled', 'Draft: input fields; Submitted and Cancelled: labels only', 'High', 'Conditional')
sc(5, 89, 'Hold / Resume / Close / Re-open', 'Look for the four buttons', 'None displayed (red = hidden); no On Hold / Closed status reachable', 'High', 'Negative')
sc(5, 90, 'Create menu', 'Open Create on Draft / Submitted / Cancelled', 'Visible only when Submitted', 'High', 'Conditional')
sc(5, 90, 'Create > Return / Credit Note', 'Create a return from a submitted invoice', 'Opens Add Sales Invoice with items; Qty, Rate, Valuation Rate negative; Return Against set', 'High', 'Integration')
sc(5, 92, 'Return after submit', 'Submit the return', 'Is Return checked and shown; Return Against displayed; status Return; original Credit Status updated', 'High', 'Integration')
sc(5, 91, 'Return - loyalty', 'Return an invoice that redeemed points', 'Opposite loyalty GL (Dr Receivable / Cr Redemption Expense); positive PLE; no restoration entry; cancelling the return restores previous flags', 'High', 'Integration')
sc(5, 92, 'Create > Delivery Note', 'Click Delivery Note', 'Opens Add Delivery Note with the items', 'High', 'Integration')
sc(5, 92, 'Create > Payment', 'Outstanding > 0, then pay fully', 'Opens Add Payment Entry with invoice data; item disappears when Outstanding = 0', 'High', 'Conditional')
sc(5, 92, 'Create > Maintenance Schedule', 'Look for the item', 'Not displayed (red = hidden) - SI-38', 'Low', 'Negative')
sc(5, 92, 'Actions > UnReconcile', 'Invoice Partially / Fully Paid', 'Actions menu only for those statuses; pop-up lists only Payment Entry and Journal Entry allocations', 'High', 'Conditional')
sc(5, 93, 'UnReconcile run', 'Select allocations and UnReconcile', 'Link removed, amount returns to source payment as unallocated, outstanding and status recalculated, no document cancelled', 'High', 'Integration')
sc(5, 93, 'Assign / Attachment / Tags / Share / Print', 'Use each on the details page', 'Each works and persists', 'Medium')
sc(5, 93, 'Connections tab', 'Open Connections with linked documents', 'Buttons for Sales Invoice (returns only), Delivery Note, Sales Order, Quotation, Payment Entry, Journal Entry open the filtered list; POS Invoice, Payment Request, Invoice Discounting, Dunning are not shown (red)', 'Medium', 'Negative')
sc(5, 89, 'Permissions', 'Log in with a role that cannot create / submit / cancel / delete Sales Invoice', 'Buttons hidden or server rejects with permission error', 'High', 'Security')
sc(5, 89, 'Concurrency', 'Edit the same Draft in two sessions and save both', 'Second save warns about modified document', 'Medium', 'Negative')
sc(5, 89, 'Localization', 'Switch UI to Arabic / English', 'Labels, messages, statuses and number/date formats localized; layout RTL in Arabic', 'Medium')
sc(5, 89, 'Closed accounting period', 'Posting date in a closed period', 'Submit blocked with period error', 'Medium', 'Negative')

for uc, p, feat, scn, exp, pri, typ in S:
    cnt[uc] = cnt.get(uc, 0) + 1
    cases.append(dict(id='SIA-%d-S%03d' % (uc, cnt[uc]), uc=uc, page=p, ctx='Scenario', field=feat, scn=scn, exp=exp, pri=pri, typ=typ))

# de-duplicate identical (field, scn)
seen = set()
final = []
for c in cases:
    key = (c['uc'], c['field'], c['scn'])
    if key in seen:
        continue
    seen.add(key)
    final.append(c)
cases = final


def esc(s):
    return s.replace('|', '/').replace(NL, ' ')


out = [txt, MARK + NL + NL, '# Generated test cases (Sales Invoice - Accounting SRS V1.0)' + NL + NL,
       '> %d cases. IDs: `SIA-<use case>-<seq>` = rule-generated from the SRS wording (one SRS sentence = one case); `SIA-<use case>-S<seq>` = hand-written flow / integration scenario. Columns: SRS page, context, field/feature, scenario, expected, priority, type. Regenerate with `python build_srs_md.py && python build_srs_cases.py`.' % len(cases) + NL + NL,
       '> Automation column idea: add a `Spec` column when a case is automated (specs in `Shamel/srs-si-acc-*.spec.ts`). Cases marked type `SRS-gap` need a BA answer before they can pass/fail.' + NL + NL]
for uc in sorted(UC_NAMES):
    sub = [c for c in cases if c['uc'] == uc]
    out.append('## Use case %d - %s (%d cases)' % (uc, UC_NAMES[uc], len(sub)) + NL + NL)
    out.append('| ID | Page | Context | Field / feature | Scenario | Expected | Pri | Type |' + NL + '|---|---|---|---|---|---|---|---|' + NL)
    for c in sub:
        out.append('| %s | %d | %s | %s | %s | %s | %s | %s |' % (c['id'], c['page'], esc(c['ctx'] if c['ctx']!=c['field'] else '-'), esc(c['field']), esc(c['scn']), esc(c['exp']), c['pri'], c['typ']) + NL)
    out.append(NL)
open(MD, 'w', encoding='utf-8').write(''.join(out))
print(len(cases), {k: len([c for c in cases if c['uc'] == k]) for k in UC_NAMES})
