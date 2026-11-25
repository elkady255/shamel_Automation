"""Build SRS-Accounting-Sales-Invoice.md from the Accounting SRS PDF (pymupdf).
Run: python build_srs_md.py   (needs `pip install pymupdf`)
Adds [HIDDEN] (red), [YELLOW], [CYAN] markers from the PDF highlight colours."""
import re
import fitz

import argparse
ap = argparse.ArgumentParser()
ap.add_argument('--pdf', default='SRS-Azzrk-Shamel-Accounting-V.1.0.pdf')
ap.add_argument('--out', default='SRS-Accounting-Sales-Invoice.md')
ap.add_argument('--first', type=int, default=1)
ap.add_argument('--last', type=int, default=0)
ap.add_argument('--title', default='SRS Azzrk SHAMEL - Accounting module V1.0 - Part: Sales Invoice')
ap.add_argument('--auto-uc', action='store_true')
A = ap.parse_args()
PDF, OUT = A.pdf, A.out
ZW = re.compile('[​‌‍﻿]')
BUL = '●○■•▪◦'
NL = chr(10)

doc = fitz.open(PDF)


def col(c):
    if not c:
        return None
    r, g, b = c
    if r > .9 and g < .15 and b < .15:
        return 'HIDDEN'
    if r > .9 and g > .9 and b < .2:
        return 'YELLOW'
    if r < .2 and g > .9 and b > .9:
        return 'CYAN'
    return None


sections = [(1, 'Use case 1 - Sales Invoice List'), (5, 'Use case 2 - Add Sales Invoice, Details tab'),
            (54, 'Use case 3 - General Info tab'), (78, 'Use case 4 - More Info tab'),
            (88, 'Use case 5 - Sales Invoice Details (view / edit / actions)')]
LAST = A.last or len(doc)
if A.auto_uc:
    sections = []
    for pn in range(A.first, LAST + 1):
        t = ZW.sub('', doc[pn - 1].get_text()).replace(chr(10), ' ')
        m = re.search(r'Use\s*case\s*ID\s*(\d+)\s*Use\s*case\s*Name\s*(.{3,70}?)\s*Descriptions', t)
        if m:
            sections.append((pn, 'Use case %s - %s' % (m.group(1), m.group(2).strip())))
body = []
for pn, page in enumerate(doc, 1):
    if pn < A.first or pn > LAST:
        continue
    for p, t in sections:
        if p == pn:
            body.append(NL + '# ' + t + NL)
    body.append(NL + '<!-- page %d -->' % pn + NL)
    marks = [(col(d.get('fill')), d['rect']) for d in page.get_drawings()
             if col(d.get('fill')) and d['rect'].height < 60]
    items = []
    for b in page.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            txt = ZW.sub('', ''.join(s['text'] for s in l['spans'])).strip()
            if not txt:
                continue
            x0, y0, x1, y1 = l['bbox']
            tag = ''
            for c, r in marks:
                if min(y1, r.y1) - max(y0, r.y0) > (y1 - y0) * .4 and min(x1, r.x1) - max(x0, r.x0) > 2:
                    tag = c
                    break
            items.append((y0, x0, txt, tag))
    items.sort(key=lambda t: (round(t[0] / 3), t[1]))
    groups = []
    for it in items:
        if groups and abs(groups[-1][0][0] - it[0]) <= 3:
            groups[-1].append(it)
        else:
            groups.append([it])
    xs = sorted({round(c[1]) for g in groups for c in g if c[2][0] in BUL})
    lv = []
    for x in xs:
        if not lv or x - lv[-1] > 8:
            lv.append(x)

    def level(x):
        return min(range(len(lv)), key=lambda i: abs(lv[i] - x)) if lv else 0

    cur = None
    for g in groups:
        g.sort(key=lambda c: c[1])
        for k, (y, x, t, tag) in enumerate(g):
            later_bullet = any(c[2][0] in BUL and c[1] > x + 100 for c in g[k + 1:])
            if t[0] in BUL:
                cur = {'lvl': level(x), 'text': t[1:].strip(), 'tag': tag}
                body.append(cur)
            elif later_bullet:  # left cell of a table row = field name
                body.append({'label': t, 'tag': tag})
                cur = None
            elif cur is not None and x > 45 and not t.startswith(('Use case', 'Pre cond', 'Main Flow', 'Component', 'Post', 'Descr')):
                cur['text'] += ' ' + t
                cur['tag'] = cur['tag'] or tag
            else:
                body.append({'label': t, 'tag': tag})
                cur = None

hid = []
prev = False
for it in body:
    if isinstance(it, dict) and 'lvl' in it:
        h = it['tag'] == 'HIDDEN'
        if h and not prev:
            hid.append(it['text'][:110])
        prev = h
    elif isinstance(it, dict):
        if it['tag'] == 'HIDDEN':
            hid.append(it['label'])
        prev = False
    else:
        prev = False

out = ['# ' + A.title + NL + NL,
       '> Extract of `SRS-Azzrk-Shamel-Accounting-V.1.0.pdf` (PDF pages %d-%d). The PDF is the source of truth.' % (A.first, LAST) + NL + NL,
       '## How to use this file for test cases' + NL + NL,
       '- Every bullet is one testable statement. Nesting = the SRS bullet level. `<!-- page N -->` = PDF page. A bold line = field name (table-row label) or heading.' + NL,
       '- **[HIDDEN]** = red highlight in the PDF: the field/button must NOT be shown. Write a negative test (absent in the UI).' + NL,
       '- **[YELLOW]** = yellow highlight (new/changed in this version). **[CYAN]** = cyan highlight (changed rule).' + NL,
       '- Case patterns: Mandatory -> empty-save error; Min/Max length -> boundary (min-1, min, max, max+1); "numbers only" -> letters/specials rejected; read-only/label -> not editable; "displayed only when X" -> visible/hidden toggle; "fetched from X" -> auto-fill after selecting X; formulas (Net Amount = Net Rate * Qty, Shortage = Qty - Available, Total Weight = Weight/Unit * Qty, Paid/Credit/Refund Amount) -> value check; each Case/Note branch -> one case.' + NL,
       '- Statuses: Invoice Status (Draft, Unpaid, Partially Paid, Fully Paid, Overdue, Return, Fully Credited, Cancelled; On Hold/Closed are red = hidden), Credit Status, Refund Status. Repeated in use case 1 and 4.' + NL,
       '- SRS defects (not UI bugs): typos kept as written ("Credit Staus", "Grand Commision", "Total Avance"); copy-paste leftovers (use case 4 pre-conditions say Sales Order; address/terms text says Quotation; Save says "Sales order List"; Overdue rule says due date ">" current date; Delivery Note list says "quotations whose status is To Deliver"; Submit inside Hold pop-up).' + NL + NL,
       '## Existing material for the same module' + NL + NL,
       '- 546 cases: `Shamel-test-cases/SHAMEL_SalesInvoice_Test_Cases_EN.xlsx`; with execution status: `SHAMEL_SalesInvoice_Test_Cases_EN_executed.xlsx`.' + NL,
       '- Specs: `Shamel/srs-si-acc-*.spec.ts`, helpers `Shamel/helpers/si-ui.ts`; report: `Shamel-test-cases/reports/sales-invoice-accounting-srs-review-report.html`.' + NL + NL,
       '## Hidden (red) items - first line of each red block' + NL + NL]
out += ['- ' + h + NL for h in dict.fromkeys(hid)]
out.append(NL + '## Index' + NL + NL)
out += ['- %s: page %d' % (t, p) + NL for p, t in sections]
out.append(NL)
for it in body:
    if isinstance(it, str):
        out.append(it)
    elif 'label' in it:
        out.append(NL + '**%s**%s' % (it['label'], (' **[%s]**' % it['tag'] if it['tag'] else '')) + NL)
    else:
        out.append('%s- %s%s' % ('  ' * it['lvl'], ('**[%s]** ' % it['tag'] if it['tag'] else ''), it['text']) + NL)
open(OUT, 'w', encoding='utf-8').write(''.join(out))
print(len(hid), 'hidden blocks')
