# Adds "Execution status", "Evidence" and "Bug" columns to the Sales Invoice test-case workbook.
# Evidence = check ids of the Playwright specs srs-si-acc-*.spec.ts (+ the older srs-sales-invoice-*.spec.ts, which reference case ids directly).
import json, re, os, glob, shutil
import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = os.path.join(ROOT, 'Shamel-test-cases', 'SHAMEL_SalesInvoice_Test_Cases_EN.xlsx')
OUT = os.path.join(ROOT, 'Shamel-test-cases', 'SHAMEL_SalesInvoice_Test_Cases_EN_executed.xlsx')
RES = os.path.join(ROOT, 'Shamel', 'si-results')

# ---- results: latest entry per check id ----
checks = {}
for f in glob.glob(os.path.join(RES, '*.jsonl')):
    for line in open(f, encoding='utf8'):
        line = line.strip()
        if not line: continue
        r = json.loads(line); checks[r['id']] = r

def res(ids):
    """returns (status, evidence, bugs) for a list of check ids"""
    got = [checks[i] for i in ids if i in checks and checks[i]['ok'] is not None]
    notes = [i for i in ids if i in checks and checks[i]['ok'] is None]
    if not got and not notes: return None
    bugs = sorted({c['known'] for c in got if c.get('known') and not c['ok']})
    failed = [c for c in got if not c['ok']]
    st = 'Failed' if failed else ('Passed' if got else 'Observed')
    return st, ', '.join(ids), ', '.join(bugs)

# ---- case -> check ids (checks are in Shamel/si-results; letters = spec batch) ----
M = {
 'SIH-001': ['A01-1','A01-2'], 'SIH-002': ['A02-1','F01-2'], 'SIH-003': ['F01-2','F01-4','F01-6'], 'SIH-004': ['A03-2','A03-3'], 'SIH-005': ['A03-1'], 'SIH-006': ['A05-1'], 'SIH-007': ['A05-2'],
 'SIH-009': ['A07-1'], 'SIH-011': ['F01-4'], 'SIH-012': ['A04-2'], 'SIH-013': ['A05-3'], 'SIH-014': ['A05-4'], 'SIH-015': ['A05-7','A05-10','A05-16'], 'SIH-018': ['A01-2'], 'SIH-019': ['A01-4'],
 'SIH-020': ['A02-1','A02-2'], 'SIH-021': ['A02-3','A02-4'], 'SIH-022': ['A02-6'], 'SIH-028': ['A01-3'], 'SIH-029': ['J09'], 'SIH-030': ['A01-3'], 'SIH-032': ['A01-9'], 'SIH-033': ['A01-8'],
 'SIH-034': ['C06-4','I02-2'], 'SIH-035': ['A01-13'], 'SIH-036': ['I02-2'], 'SIH-038': ['I01-11'], 'SIH-041': ['I01-10'], 'SIH-043': ['A01-14','F04-11'], 'SIH-044': ['A07-4','A07-5'], 'SIH-046': ['A05-7'],
 'SIH-048': ['A06-4'], 'SIH-049': ['A06-5'], 'SIH-052': ['K-2-EUR'], 'SIH-053': ['A06-4'], 'SIH-059': ['A01-5'], 'SIH-060': ['A05-8'], 'SIH-071': ['A01-12'],
 'SII-001': ['B06-2'], 'SII-002': ['B01-fixed asset 2121','B01-template item 1111','B01-not for sale Item-123'], 'SII-003': ['B01-fixed asset 2121','B01-fixed asset Test Asset'], 'SII-004': ['B01-not for sale Item-123','B01-not for sale asdasd'],
 'SII-005': ['B01-template item 1111'], 'SII-007': ['B03-2'], 'SII-009': ['B03-9'], 'SII-010': ['B03-1'], 'SII-011': ['B03-4','J02'], 'SII-017': ['B05-4'], 'SII-021': ['F02-6'], 'SII-027': ['B2-1c'], 'SII-030': ['J03'],
 'SII-031': ['B03-2'], 'SII-032': ['B03-2'], 'SII-033': ['B2-2-below valuation 250'], 'SII-079': ['B06-4'], 'SII-083': ['B2-3d','B2-3e','B2-3f','B2-3g'], 'SII-084': ['B2-3b'], 'SII-085': ['B08-desc500'], 'SII-090': ['B07-5'], 'SII-092': ['B04-7'], 'SII-081': ['J01'],
 'SIT-001': ['C01-sum-a - E'], 'SIT-003': ['C01-sum-a - E'], 'SIT-007': ['C02-4'], 'SIT-008': ['C02-6'], 'SIT-009': ['C02-6'], 'SIT-021': ['C02-4'], 'SIT-024': ['C05-2'], 'SIT-026': ['A01-12'], 'SIT-027': ['C01-sum-a - E'], 'SIT-028': ['C04-3'],
 'SIT-032': ['C04-7'], 'SIT-033': ['C04-7'], 'SIT-034': ['C3-pct-calc','C03-2'], 'SIT-035': ['C3-pct-calc','C03-2'], 'SIT-036': ['C3-amount-calc','C03-5'], 'SIT-038': ['C03-7'], 'SIT-040': ['J08'], 'SIT-043': ['C03-10'], 'SIT-049': ['C04-5'],
 'SIG-001': ['D01-5'], 'SIG-002': ['D01-5'], 'SIG-016': ['D02-1'], 'SIG-018': ['D02-5'], 'SIG-019': ['D01-6','L05-3'], 'SIG-021': ['D01-6'], 'SIG-022': ['L05-7'], 'SIG-033': ['D03-4','J07'], 'SIG-034': ['D03-4','J07'], 'SIG-036': ['J06'],
 'SIG-041': ['D04-3'], 'SIG-042': ['D04-1'], 'SIG-057': ['D04-4'], 'SIG-058': ['D05-1','F01-6'], 'SIG-062': ['D05-2'], 'SIG-063': ['D05-2'], 'SIG-073': ['D06-4','D06-5'], 'SIG-090': ['D07-2'], 'SIG-091': ['D07-3'],
 'SIM-001': ['F01-7'], 'SIM-002': ['F01-8','F01-9'], 'SIM-004': ['F02-9'], 'SIM-007': ['F02-10'], 'SIM-016': ['A01-12'], 'SIM-018': ['F01-6'], 'SIM-019': ['F01-6'], 'SIM-020': ['F01-6'], 'SIM-022': ['A05-19','SI41'], 'SIM-023': ['A05-18','SI41'], 'SIM-024': ['J11'], 'SIM-025': ['F01-6'],
 'SIF-001': ['G01-أمر المبيعات-open','G01-عرض سعر-open','G01-إذن التسليم-open'], 'SIF-002': ['G01-أمر المبيعات-open','G01-أمر المبيعات-cols','G01-أمر المبيعات-btn'], 'SIF-018': ['G01-عرض سعر-open','G01-عرض سعر-cols'], 'SIF-019': ['G01-quotation-fetch','G01-quotation-totals'],
 'SIF-022': ['G01-إذن التسليم-open','G01-إذن التسليم-cols'], 'SIF-008': ['G01-أمر المبيعات-search'], 'SIF-009': ['G01-أمر المبيعات-search'],
 'SIL-001': ['H01-2'], 'SIL-002': ['H01-2'], 'SIL-003': ['H01-col-رقم المعرف','H01-col-حالة الفاتورة','H01-col-اسم العميل'], 'SIL-005': ['F01-8'], 'SIL-006': ['F02-6'], 'SIL-007': ['L01-2'], 'SIL-008': ['L01-8'], 'SIL-009': ['L02-2'],
 'SIL-011': ['L03-6'], 'SIL-012': ['L03-11'], 'SIL-015': ['F04-5'], 'SIL-016': ['F02-7'], 'SIL-017': ['L03-3'], 'SIL-018': ['L03-10'], 'SIL-019': ['F02-8'], 'SIL-020': [], 'SIL-021': ['L04-5'], 'SIL-023': ['H01-3'],
 'SIL-024': ['H02-draft'], 'SIL-025': ['H02-draft-has-اعتماد','H02-draft-not-إلغاء'], 'SIL-026': ['H02-submitted-has-إلغاء','H02-submitted-not-اعتماد'], 'SIL-027': ['H02-submitted-not-حذف','H02-cancelled-has-حذف'], 'SIL-032': ['K03-3'], 'SIL-033': ['F05-4'],
 'SIL-034': ['K04-3','K04-4'], 'SIL-035': ['K04-4'], 'SIL-036': ['K04-4'], 'SIL-037': ['H03-1'], 'SIL-039': ['H03-2'],
 'SID-001': ['F01-1','K01-1'], 'SID-002': ['F02-11'], 'SID-004': ['F01-6'], 'SID-005': ['K01-3'], 'SID-006': ['K01-4','K01-5'], 'SID-007': ['K02-1'], 'SID-009': ['F02-13'], 'SID-010': ['F01-11'], 'SID-011': ['F02-6'], 'SID-012': ['A03-3'],
 'SID-016': ['F03-1'], 'SID-017': ['L01-4'], 'SID-018': ['F04-5'], 'SID-026': ['F04-10','F04-11'], 'SID-028': ['F04-6'], 'SID-029': ['K03-3'], 'SID-030': ['K04-6'], 'SID-031': ['K04-3','K04-4'], 'SID-033': ['F02-14','K05-1'],
 'SID-034': ['F01-12'], 'SID-042': ['F01-13','F02-13'], 'SID-043': ['I01-2','I01-5','I01-8'], 'SID-044': ['I01-5','L03-6','L03-7'], 'SID-045': ['L03-3','L03-4'], 'SID-047': ['L03-10'], 'SID-051': ['L03-2'], 'SID-052': ['L04-5'],
 'SID-059': ['F03-3'], 'SID-060': ['F03-4','F03-6'], 'SID-061': ['L01-9'], 'SID-062': ['L01-3','L01-4'], 'SID-064': ['F03-5'], 'SID-065': ['L01-5','L01-10'], 'SID-066': ['L05-11'], 'SID-067': ['L05-13'], 'SID-069': ['G2-1'], 'SID-077': ['F02-13'],
}
# a few more case ids that the older API specs (2026-11-10) cover directly
OLD = '''TC-SIB-001 TC-SID-002 TC-SID-010 TC-SID-011 TC-SID-013 TC-SID-017 TC-SID-018 TC-SID-021 TC-SID-025 TC-SID-031 TC-SID-040 TC-SID-046 TC-SID-061 TC-SID-063 TC-SID-064 TC-SID-065 TC-SID-066 TC-SID-067 TC-SID-068 TC-SID-070 TC-SID-072
TC-SIF-001 TC-SIF-002 TC-SIF-003 TC-SIF-012 TC-SIF-014 TC-SIG-001 TC-SIG-009 TC-SIG-020 TC-SIG-024 TC-SIG-027 TC-SIG-029 TC-SIG-032 TC-SIG-035 TC-SIG-036 TC-SIG-037 TC-SIG-038 TC-SIG-054 TC-SIG-055 TC-SIG-056 TC-SIG-060 TC-SIG-066 TC-SIG-070
TC-SIH-001 TC-SIH-004 TC-SIH-015 TC-SIH-044 TC-SIH-049 TC-SIH-050 TC-SII-020 TC-SII-079 TC-SIL-002 TC-SIL-003 TC-SIL-007 TC-SIL-009 TC-SIL-023 TC-SIL-026 TC-SIM-001 TC-SIM-002 TC-SIM-005 TC-SIM-012 TC-SIM-013 TC-SIM-019 TC-SIT-029 TC-SIT-034 TC-SIT-036 TC-SIT-051'''.split()

# reasons for what is not executed
def reason(tc, title):
    t = title.lower()
    if re.search(r'update stock|source warehouse|stock ledger|cogs|stock entries|backdated|valuation|quality inspection|sample size|serial|batch|bundle|dropship|reserved|negative stock|allow negative|shortage', t):
        if re.search(r'serial|batch|bundle', t): return 'Not executed: serial / batch / Product Bundle items'
        return 'Blocked: Update Stock needs the setting "Allow Update Stock In Sales Invoice" (SI-43: Selling Settings cannot be saved)'
    if re.search(r'permission|authorized|unauthorized|role|user without|restricted', t): return 'Not executed: needs a second user / role'
    if re.search(r'closed (accounting )?period|frozen|freeze|round off account|audit|concurrent', t): return 'Not executed: needs an accounting setting change (not approved)'
    if re.search(r'loyalty|redeem|points|coupon|timesheet|pricing rule|margin|deferred|finance book|incoterm', t): return 'Not executed: loyalty / pricing rule / coupon / deferred revenue data not set up'
    if re.search(r'sales order|delivery note|quotation', t): return 'Blocked: creating a Sales Order fails on the server (SI-43)'
    if re.search(r'print|export|assign|tags|attachment|share|pagination|sorting|search|filter', t): return 'Not executed: manual / output check'
    return 'Not executed: not automated yet'

wb = openpyxl.load_workbook(SRC)
ws = wb['Test Cases']
hdr_row = 4
col = {c.value: c.column for c in ws[hdr_row] if c.value}
tc_col = col['Test Case ID']; title_col = col['Test Case Title']
n = ws.max_column
for i, h in enumerate(['Execution Status', 'Evidence (spec check ids)', 'Bug IDs', 'Execution Note'], 1):
    ws.cell(hdr_row, n + i, h)
    ws.cell(hdr_row, n + i).font = Font(bold=True)
    ws.cell(hdr_row, n + i).alignment = Alignment(wrap_text=True)
fills = {'Passed': 'C6EFCE', 'Failed': 'FFC7CE', 'Observed': 'FFEB9C', 'Not re-verified': 'DDEBF7', 'Blocked': 'F8CBAD', 'Not executed': 'EDEDED'}
stat = {}
for r in range(hdr_row + 1, ws.max_row + 1):
    tc = ws.cell(r, tc_col).value
    if not tc: continue
    key = tc.replace('TC-', '')
    title = str(ws.cell(r, title_col).value or '')
    status, ev, bugs, note = 'Not executed', '', '', ''
    if key in M and M[key]:
        out = res(M[key])
        if out:
            status, ev, bugs = out
            note = 'Executed on 2026-11-23 (srs-si-acc-*.spec.ts)'
    if status == 'Not executed':
        if tc in OLD:
            status, note = 'Not re-verified', 'Automated and passed on 2026-11-10 (srs-sales-invoice-*.spec.ts); the re-run on 2026-11-23 is blocked because creating a Sales Order fails (SI-43)'
        else:
            rs = reason(tc, title); status = 'Blocked' if rs.startswith('Blocked') else 'Not executed'; note = rs
    stat[status] = stat.get(status, 0) + 1
    vals = [status, ev, bugs, note]
    for i, v in enumerate(vals, 1):
        c = ws.cell(r, n + i, v); c.alignment = Alignment(wrap_text=True, vertical='top')
    ws.cell(r, n + 1).fill = PatternFill('solid', fgColor=fills[status])
for i, w in enumerate([16, 38, 12, 60], 1):
    ws.column_dimensions[openpyxl.utils.get_column_letter(n + i)].width = w
# summary sheet
s = wb.create_sheet('Execution Summary')
s.append(['Execution status (2026-11-23)', 'Cases']); s['A1'].font = Font(bold=True); s['B1'].font = Font(bold=True)
for k in ['Passed', 'Failed', 'Observed', 'Not re-verified', 'Blocked', 'Not executed']: s.append([k, stat.get(k, 0)])
s.append(['Total', sum(stat.values())])
s.column_dimensions['A'].width = 34
wb.save(OUT)
print(json.dumps(stat), sum(stat.values()))
stat['total'] = sum(v for k, v in stat.items() if k != 'total')
json.dump(stat, open(os.path.join(RES, '_case_status.json'), 'w'))
