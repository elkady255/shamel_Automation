User is a QA engineer on the SHAMEL / Azzrk ERP project (Inventory/Stock module), writing manual test cases from SRS PDFs, later automating with Playwright. Reply to the user in Egyptian Arabic; test cases are in English.

**Format (matches user's reference file `SHAMEL_ItemGroup_Test_Cases_EN.xlsx`)**: sheet "Test Cases", title row 1 (Arial 16 bold navy 1F4E78), subtitle row 2, headers row 4 (white bold on navy). Columns: # | Module / Screen | Test Case ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type | Remarks (Remarks column added by me, holds "Needs Clarification: ..."). One check per case, steps numbered "1. ...\n2. ...", Arial 10, thin B7B7B7 borders, first row of each screen has bold section label with fill D9E1F2. Priority fills High FCE4E4 / Medium FFF4E5 / Low E8F5E9. Type = Positive (1E7E34) / Negative (C0392B) / UI (2E5EAA), bold coloured text. Column A "#" yellow/red fill is the USER's manual tracking - never colour it. Second sheet "Summary" with COUNTIF formulas (by screen, type, priority, clarification count). Freeze at A5, autofilter.
IDs: TC-<SCREEN3>-NNN (e.g. TC-DTL/ADT/DTD for Delivery Trip, TC-PBL/APB/PBD for Product Bundle).

**Workflow**: Read PDF via pypdf (pdftoppm missing; Read tool returns no PDF text here) -> python data file (T(title, steps, data, exp, priority, type, pre, remark)) -> openpyxl build script. Where SRS is silent/contradictory, still add the case and flag "Needs Clarification". User wants test data illustrative (not real).

**Done so far**: Delivery Trip (227 cases, 44 clarifications), Product Bundle (136 cases, 27 clarifications).

**Why:** user wants identical style across modules and to reuse project data later for Playwright automation. See [[shamel-test-data]].
**How to apply:** for any new SRS from this project, repeat the same format and workflow without re-asking questions.

