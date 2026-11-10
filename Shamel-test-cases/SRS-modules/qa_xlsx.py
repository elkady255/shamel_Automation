import math
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

H, M, L = "High", "Medium", "Low"
P, N, U = "Positive", "Negative", "UI"
CLR = "Needs Clarification: "


def mk(pre):
    def f(title, steps, data, exp, pri, typ, rem="-", p=None):
        return (title, p or pre, steps, data, exp, pri, typ, rem)
    return f


def build(OUT, TITLE, SUBTITLE, SECTIONS):
    wb = Workbook()
    ws = wb.active
    ws.title = "Test Cases"
    navy = "1F4E78"
    thin = Side(style="thin", color="B7B7B7")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    widths = dict(A=6, B=30, C=14, D=36, E=26, F=34, G=22, H=42, I=11, J=12, K=40)
    for k, v in widths.items():
        ws.column_dimensions[k].width = v

    ws["A1"] = TITLE
    ws["A1"].font = Font(name="Arial", size=16, bold=True, color=navy)
    ws["A2"] = SUBTITLE
    ws["A2"].font = Font(name="Arial", size=10, color="595959")
    ws.merge_cells("A1:K1")
    ws.merge_cells("A2:K2")
    ws.row_dimensions[1].height = 28
    heads = ["#", "Module / Screen", "Test Case ID", "Test Case Title", "Preconditions", "Test Steps", "Test Data", "Expected Result", "Priority", "Type", "Remarks"]
    for c, h in enumerate(heads, 1):
        cell = ws.cell(4, c, h)
        cell.font = Font(name="Arial", size=11, bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor=navy)
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = border
    ws.row_dimensions[4].height = 33.75

    PRI = {"High": "FCE4E4", "Medium": "FFF4E5", "Low": "E8F5E9"}
    TYP = {"Positive": "1E7E34", "Negative": "C0392B", "UI": "2E5EAA"}

    row = 5
    n = 0
    counts = {}
    for screen, prefix, cases in SECTIONS:
        counts[screen] = len(cases)
        for i, (title, pre, steps, data, exp, pri, typ, rem) in enumerate(cases, 1):
            n += 1
            if isinstance(steps, list):
                steps = "\n".join(f"{k}. {s}" for k, s in enumerate(steps, 1))
            vals = [n, screen, f"TC-{prefix}-{i:03d}", title, pre, steps, data, exp, pri, typ, rem]
            for c, v in enumerate(vals, 1):
                cell = ws.cell(row, c, v)
                cell.font = Font(name="Arial", size=10)
                cell.alignment = Alignment(vertical="center", wrap_text=True,
                                           horizontal="center" if c in (1, 3, 9, 10) else None)
                cell.border = border
            if i == 1:
                ws.cell(row, 2).font = Font(name="Arial", size=10, bold=True)
                ws.cell(row, 2).fill = PatternFill("solid", fgColor="D9E1F2")
            ws.cell(row, 9).fill = PatternFill("solid", fgColor=PRI[pri])
            ws.cell(row, 10).font = Font(name="Arial", size=10, bold=True, color=TYP[typ])
            lines = 1
            for c, v in enumerate(vals, 1):
                w = list(widths.values())[c - 1]
                t = str(v)
                est = sum(max(1, math.ceil(len(p) / (w * 1.05))) for p in t.split("\n"))
                lines = max(lines, est)
            ws.row_dimensions[row].height = max(30, 13.5 * lines + 4)
            row += 1
    last = row - 1
    ws.freeze_panes = "A5"
    ws.auto_filter.ref = f"A4:K{last}"

    sm = wb.create_sheet("Summary")
    sm.column_dimensions["A"].width = 52
    sm.column_dimensions["B"].width = 20
    sm["A1"] = "Test Cases Summary"
    sm["A1"].font = Font(name="Arial", size=16, bold=True)
    r = 3
    sm.cell(r, 1, "Module / Screen"); sm.cell(r, 2, "Number of Test Cases")
    first = r + 1
    for k, (screen, _, _) in enumerate(SECTIONS):
        sm.cell(first + k, 1, screen)
        sm.cell(first + k, 2, f"=COUNTIF('Test Cases'!$B$5:$B${last},A{first + k})")
    tot = first + len(SECTIONS)
    sm.cell(tot, 1, "Total"); sm.cell(tot, 2, f"=SUM(B{first}:B{tot - 1})")
    r = tot + 3
    blocks = [("By Type", "J", ["Positive", "Negative", "UI"]), ("By Priority", "I", ["High", "Medium", "Low"])]
    for label, col, items in blocks:
        sm.cell(r, 1, label); sm.cell(r, 2, "Count")
        for k, it in enumerate(items, 1):
            sm.cell(r + k, 1, it)
            sm.cell(r + k, 2, f"=COUNTIF('Test Cases'!${col}$5:${col}${last},A{r + k})")
        r += len(items) + 2
    sm.cell(r, 1, "Clarification"); sm.cell(r, 2, "Count")
    sm.cell(r + 1, 1, "Needs Clarification (see Remarks)")
    sm.cell(r + 1, 2, f"=COUNTIF('Test Cases'!$K$5:$K${last},\"Needs Clarification*\")")
    for rr in range(3, r + 2):
        for cc in (1, 2):
            cell = sm.cell(rr, cc)
            hdr = cell.value in ("Module / Screen", "Number of Test Cases", "By Type", "By Priority", "Clarification", "Count")
            cell.font = Font(name="Arial", size=10, bold=hdr or cell.value == "Total", color=navy if hdr else None)
    wb.save(OUT)
    clar = sum(1 for _, _, cs in SECTIONS for c in cs if c[7].startswith("Needs"))
    print("saved", OUT, "total", n, "clarifications", clar, counts)


