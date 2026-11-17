# Graph Report - Playwright_Automation  (2026-11-17)

## Corpus Check
- 224 files · ~986,707 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .log 3, .example 1)

## Summary
- 1618 nodes · 2441 edges · 150 communities (103 shown, 47 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 66 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d1b188ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- mr-data.ts
- ProductBundlePage
- DeliveryNotePage
- QualityInspectionPage
- Cookies
- Cookies
- StockReconciliationPage
- api.ts
- si-data.ts
- sr-data.ts
- code
- Browser Automation with playwright-cli
- Browser Automation with playwright-cli
- ps-data.ts
- 3. Heal
- ItemFormPage
- PackingSlipPage
- steps
- Browser Session Management
- Browser Session Management
- @playwright/test
- srs-coupon-code.spec.ts
- dn-data.ts
- srs-quality-inspection-add.spec.ts
- qa_xlsx.py
- Tracing
- qt-api.ts
- Agent steps
- AccountingTab
- pr-probe5.spec.ts
- Running Custom Playwright Code
- 3. Heal
- Running Custom Playwright Code
- package.json
- devDependencies
- srs-landed-cost-add.spec.ts
- srs-sales-invoice-remaining.spec.ts
- compilerOptions
- .agents/skills/playwright-cli/SKILL.md
- Setting up e2e
- Tracing
- scripts
- pr-probe4.spec.ts
- playwright-claude-automation/package.json
- qt-probe11.spec.ts
- srs-sales-invoice-tabs.spec.ts
- Video Recording
- Running a bug bash
- .claude/skills/playwright-cli/SKILL.md
- Video Recording
- ItemsListPage
- pr-probe7.spec.ts
- qt-probe16.spec.ts
- srs-sales-invoice-ui.spec.ts
- Advanced Mocking with run-code
- Advanced Mocking with run-code
- e2e
- ct-probe2.spec.ts
- srs-item-tracking-lock.spec.ts
- pr-probe3.spec.ts
- qt-probe18.spec.ts
- qt-probe20.spec.ts
- qt-probe21.spec.ts
- qt-probe23.spec.ts
- qt-probe27.spec.ts
- st-probe3.spec.ts
- st-probe5.spec.ts
- st-probe6.spec.ts
- Debugging a failing run
- Exploring without a test
- Running tests
- addr-probe2.spec.ts
- addr-probe4.spec.ts
- addr-probe.spec.ts
- ct-probe.spec.ts
- pr-probe2.spec.ts
- pr-probe8.spec.ts
- qt-probe10.spec.ts
- qt-probe17.spec.ts
- qt-probe25.spec.ts
- qt-probe30.spec.ts
- qt-probe3.spec.ts
- qt-probe4.spec.ts
- qt-probe6.spec.ts
- qt-probe7.spec.ts
- qt-probe8.spec.ts
- st-probe4.spec.ts
- st-probe8.spec.ts
- Driving the app over MCP
- Auth, API Testing, Mocking, Visual Checks
- SHAMEL_QualityInspection_Test_Cases_EN_423d8cff.md
- qt-probe19.spec.ts
- pr-probe.spec.ts
- qt-probe22.spec.ts
- qt-probe28.spec.ts
- qt-probe2.spec.ts
- qt-probe31.spec.ts
- qt-probe9.spec.ts
- st-probe7.spec.ts
- st-probe.spec.ts
- e2e: agentic end-to-end tests
- Debugging Failing and Flaky Tests
- ct-probe3.spec.ts
- ct-probe5.spec.ts
- ct-probe6.spec.ts
- pr-probe9.spec.ts
- qt-probe26.spec.ts
- qt-probe29.spec.ts
- qt-probe32.spec.ts
- qt-probe.spec.ts
- st-probe2.spec.ts
- st-probe9.spec.ts
- Attaching Screenshots and Videos to Pull Requests
- 0. How generation works
- 1. Planning
- Attaching Screenshots and Videos to Pull Requests
- Page Objects and Fixtures
- eslint-plugin-playwright
- playwright
- pr-probe6.spec.ts
- Trace Output Files
- playwright.config.ts
- ref_fs
- srs-landed-cost-add-api.spec.ts
- .claude/skills/playwright-cli/references/element-attributes.md
- e2e
- SHAMEL_Bin_Test_Cases_EN_e038332a.md
- SHAMEL_CouponCode_Test_Cases_EN_844a0f32.md
- SHAMEL_DeliveryNote_Test_Cases_EN_3e0d4ea7.md
- SHAMEL_DeliveryTrip_Test_Cases_EN_5894dc1c.md
- SHAMEL_InventorySettings_Test_Cases_EN_be972fc5.md
- SHAMEL_LandedCostVoucher_Test_Cases_EN_f77f34a9.md
- SHAMEL_PackingSlip_Test_Cases_EN_894e0af2.md
- SHAMEL_PriceList_Test_Cases_EN_64f357e9.md
- SHAMEL_ProductBundle_Test_Cases_EN_ef86fb34.md
- SHAMEL_PurchaseReceipt_Test_Cases_EN_246e7c69.md
- SHAMEL_RepostItemValuation_Test_Cases_EN_d1fe0f28.md
- SHAMEL_SalesInvoice_Test_Cases_EN_43a47400.md
- SHAMEL_Shipment_Test_Cases_EN_cdb0fcfc.md
- SHAMEL_ShippingRule_Test_Cases_EN_2e009b83.md
- SHAMEL_StockEntry_Test_Cases_EN_3d614c44.md
- SHAMEL_StockLedgerEntry_Test_Cases_EN_56bcaba2.md
- SHAMEL_StockReconciliation_Test_Cases_EN_91ea715c.md
- SHAMEL_StockReservationEntry_Test_Cases_EN_21a77220.md
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `@playwright/test` - 129 edges
2. `api` - 59 edges
3. `code()` - 33 edges
4. `seed()` - 33 edges
5. `QualityInspectionPage` - 26 edges
6. `StockReconciliationPage` - 24 edges
7. `ITEM_A` - 22 edges
8. `today()` - 22 edges
9. `ProductBundlePage` - 22 edges
10. `DeliveryNotePage` - 21 edges

## Surprising Connections (you probably didn't know these)
- `The browser fixture (browser only)` --references--> `json()`  [INFERRED]
  .claude/skills/e2e/references/writing-tests.md → Shamel/helpers/api.ts
- `receipt()` --calls--> `today()`  [EXTRACTED]
  Shamel/srs-item-tracking-lock.spec.ts → Shamel/helpers/ps-data.ts
- `draftDN()` --calls--> `code()`  [EXTRACTED]
  Shamel/helpers/dn-data.ts → Shamel/helpers/ps-data.ts
- `draftDN()` --calls--> `customer()`  [EXTRACTED]
  Shamel/helpers/dn-data.ts → Shamel/helpers/ps-data.ts
- `draftDN()` --calls--> `seed()`  [EXTRACTED]
  Shamel/helpers/dn-data.ts → Shamel/helpers/ps-data.ts

## Import Cycles
- None detected.

## Communities (150 total, 47 thin omitted)

### Community 0 - "mr-data.ts"
Cohesion: 0.08
Nodes (22): addDays(), cancel(), COMPANY, CUSTOMER, GROUP_WAREHOUSE, ITEM_NAME, mr(), MrPurpose (+14 more)

### Community 1 - "ProductBundlePage"
Cohesion: 0.06
Nodes (11): Further references, Know the project first, Minimal template, Playwright Tester, Running tests — quick reference, When a test fails, Workflow for a new test, Writing rules (and why) (+3 more)

### Community 2 - "DeliveryNotePage"
Cohesion: 0.07
Nodes (9): DeliveryNotePage, LOAD, rowEl(), rowSelect(), act(), setPicked(), statusOf(), toDeliver() (+1 more)

### Community 3 - "QualityInspectionPage"
Cohesion: 0.08
Nodes (14): param(), paramGroup(), QualityInspectionPage, clean(), errText(), groupKind(), Kind, observe() (+6 more)

### Community 4 - "Cookies"
Cohesion: 0.06
Nodes (35): Advanced: Multiple Cookies or Custom Options, Advanced: Multiple Operations, Authentication State Reuse, Clear All Cookies, Clear All localStorage, Clear sessionStorage, Common Patterns, Cookies (+27 more)

### Community 5 - "Cookies"
Cohesion: 0.06
Nodes (35): Advanced: Multiple Cookies or Custom Options, Advanced: Multiple Operations, Authentication State Reuse, Clear All Cookies, Clear All localStorage, Clear sessionStorage, Common Patterns, Cookies (+27 more)

### Community 6 - "StockReconciliationPage"
Cohesion: 0.08
Nodes (16): A complete file, Actions, app, Contents, expect, Fixtures, Habits, Locators (+8 more)

### Community 7 - "api.ts"
Cohesion: 0.09
Nodes (12): api, apiSession(), createItem(), deleteItem(), getItem(), ItemDoc, ItemSeed, UI_DEFAULTS (+4 more)

### Community 8 - "si-data.ts"
Cohesion: 0.17
Nodes (20): COMPANY, today(), advance(), BOOKS, cancel(), contractFields(), deliveryNote(), draftFor() (+12 more)

### Community 9 - "sr-data.ts"
Cohesion: 0.10
Nodes (15): Doc, entriesOf(), ACCOUNT, COST_CENTER, removeSR(), sr(), SRStatus, LOAD (+7 more)

### Community 10 - "code"
Cohesion: 0.13
Nodes (12): code(), binQty(), books, ledger(), OTHER_WAREHOUSE, plainItem(), stockEntry(), draftSR() (+4 more)

### Community 11 - "Browser Automation with playwright-cli"
Cohesion: 0.07
Nodes (27): Attaching screenshots and videos to pull requests, Browser Automation with playwright-cli, Browser Sessions, Commands, Core, DevTools, Emulation, Example: Debugging with DevTools (+19 more)

### Community 12 - "Browser Automation with playwright-cli"
Cohesion: 0.07
Nodes (27): Attaching screenshots and videos to pull requests, Browser Automation with playwright-cli, Browser Sessions, Commands, Core, DevTools, Emulation, Example: Debugging with DevTools (+19 more)

### Community 13 - "ps-data.ts"
Cohesion: 0.15
Nodes (14): bundle(), BundleLine, parentItem(), stamp(), customer(), CUSTOMER_NAME, draftDN(), ensureItem() (+6 more)

### Community 14 - "3. Heal"
Cohesion: 0.09
Nodes (23): 0. How generation works, 1.1 Prerequisite: workspace, 1.2 Prerequisite: seed test, 1.3 Explore the app, 1.4 Write the spec file, 1. Planning, 2.1 Inputs, 2.2 Generate one scenario (+15 more)

### Community 17 - "steps"
Cohesion: 0.10
Nodes (20): jobs, test, name, on, pull_request, push, branches, branches (+12 more)

### Community 18 - "Browser Session Management"
Cohesion: 0.10
Nodes (20): 1. Name Browser Sessions Semantically, 2. Always Clean Up, 3. Delete Stale Browser Data, A/B Testing Sessions, Attach by channel name, Attach via browser extension, Attach via CDP endpoint, Attaching to a Running Browser (+12 more)

### Community 19 - "Browser Session Management"
Cohesion: 0.10
Nodes (20): 1. Name Browser Sessions Semantically, 2. Always Clean Up, 3. Delete Stale Browser Data, A/B Testing Sessions, Attach by channel name, Attach via browser extension, Attach via CDP endpoint, Attaching to a Running Browser (+12 more)

### Community 20 - "@playwright/test"
Cohesion: 0.11
Nodes (3): @playwright/test, LOAD, { chromium }

### Community 21 - "srs-coupon-code.spec.ts"
Cohesion: 0.18
Nodes (16): clean(), codeBox(), descBox(), field(), LOAD, main(), maxUseBox(), nameBox() (+8 more)

### Community 22 - "dn-data.ts"
Cohesion: 0.17
Nodes (7): books(), draftDN(), note(), Status, stockOf(), ITEM_A, ids

### Community 23 - "srs-quality-inspection-add.spec.ts"
Cohesion: 0.16
Nodes (11): draftQI(), inspectable(), qi(), QIStatus, refDN(), clean(), dd(), fillValid() (+3 more)

### Community 24 - "qa_xlsx.py"
Cohesion: 0.19
Nodes (4): mk(), cb(), build(), mk()

### Community 25 - "Tracing"
Cohesion: 0.12
Nodes (16): 1. Start Tracing Before the Problem, 2. Clean Up Old Traces, Analyzing Performance, Basic Usage, Best Practices, Capturing Evidence, Debugging Failed Actions, Limitations (+8 more)

### Community 26 - "qt-api.ts"
Cohesion: 0.26
Nodes (12): BASE(), ctx(), method(), post(), put(), Res, serverMsg(), log() (+4 more)

### Community 27 - "Agent steps"
Cohesion: 0.14
Nodes (14): act: one goal, Agent steps, assert, waitFor, extract: one question, Beyond the built-in agent, Budgets and cost, Choose an agent, Configure a model, Contents (+6 more)

### Community 29 - "pr-probe5.spec.ts"
Cohesion: 0.27
Nodes (12): clean(), diff(), LOAD, log(), main(), openAll(), options(), pick() (+4 more)

### Community 30 - "Running Custom Playwright Code"
Cohesion: 0.15
Nodes (13): Clipboard, Complex Workflows, Error Handling, File Downloads, Frames and Iframes, Geolocation, JavaScript Execution, Media Emulation (+5 more)

### Community 31 - "3. Heal"
Cohesion: 0.15
Nodes (13): 2.1 Inputs, 2.2 Generate one scenario, 2.3 Generate multiple scenarios, 2.4 Run generated tests, 2. Generate, 3.1 Find failing tests, 3.2 Debug one failure, 3.3 Apply the fix (+5 more)

### Community 32 - "Running Custom Playwright Code"
Cohesion: 0.15
Nodes (13): Clipboard, Complex Workflows, Error Handling, File Downloads, Frames and Iframes, Geolocation, JavaScript Execution, Media Emulation (+5 more)

### Community 33 - "package.json"
Cohesion: 0.15
Nodes (12): author, description, ai@^7.0.0, @playwright/mcp@^0.0.83, keywords, license, main, name (+4 more)

### Community 34 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint@^10.12.0, @faker-js/faker@^10.6.0, @playwright/test@^1.63.0, prettier@^3.9.9, @types/node@^26.6.4, typescript@^6.0.3, zod@^4.1.8 (+5 more)

### Community 35 - "srs-landed-cost-add.spec.ts"
Cohesion: 0.29
Nodes (11): basics(), clean(), costRow(), creates, distribute(), main(), openNew(), options() (+3 more)

### Community 36 - "srs-sales-invoice-remaining.spec.ts"
Cohesion: 0.24
Nodes (8): buttons(), clean(), expandAll(), field(), LOAD, main(), press(), tab()

### Community 37 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, module, moduleResolution, noEmit, resolveJsonModule, skipLibCheck, strict (+4 more)

### Community 38 - ".agents/skills/playwright-cli/SKILL.md"
Cohesion: 0.21
Nodes (4): Examples, Inspecting Element Attributes, Debugging Playwright Tests, Running Playwright Tests

### Community 39 - "Setting up e2e"
Cohesion: 0.17
Nodes (12): Contents, Done when, Environment variables the runner reads, Existing MCP registration, Let the runner start the app, Mobile targets, Requirements, Scaffold (+4 more)

### Community 40 - "Tracing"
Cohesion: 0.17
Nodes (12): 1. Start Tracing Before the Problem, 2. Clean Up Old Traces, Analyzing Performance, Basic Usage, Best Practices, Capturing Evidence, Debugging Failed Actions, Limitations (+4 more)

### Community 41 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, codegen, format, lint, report, test, test:chromium, test:debug (+4 more)

### Community 42 - "pr-probe4.spec.ts"
Cohesion: 0.29
Nodes (9): clean(), LOAD, log(), main(), openAll(), options(), pick(), SECTIONS (+1 more)

### Community 43 - "playwright-claude-automation/package.json"
Cohesion: 0.18
Nodes (10): author, description, keywords, license, main, name, scripts, test (+2 more)

### Community 44 - "qt-probe11.spec.ts"
Cohesion: 0.29
Nodes (8): addRow(), clean(), LOAD, main(), msgs(), party(), press(), save()

### Community 45 - "srs-sales-invoice-tabs.spec.ts"
Cohesion: 0.29
Nodes (7): clean(), expandAll(), LOAD, main(), missing(), press(), tab()

### Community 46 - "Video Recording"
Cohesion: 0.20
Nodes (10): 1. Use Descriptive Filenames, 2. Record entire hero scripts., 3. Attach the recording to the pull request, Basic Recording, Best Practices, Cursor, Target Highlight and Click Point, Limitations, Overlay API Summary (+2 more)

### Community 47 - "Running a bug bash"
Cohesion: 0.20
Nodes (10): 1. Prepare, 2. Plan charters, 3. Fan out, 4. Merge, 5. Triage, 6. Verify, 7. Report, Contents (+2 more)

### Community 49 - "Video Recording"
Cohesion: 0.20
Nodes (10): 1. Use Descriptive Filenames, 2. Record entire hero scripts., 3. Attach the recording to the pull request, Basic Recording, Best Practices, Cursor, Target Highlight and Click Point, Limitations, Overlay API Summary (+2 more)

### Community 51 - "pr-probe7.spec.ts"
Cohesion: 0.24
Nodes (6): clean(), dlgs(), LOAD, main(), openAll(), SECTIONS

### Community 52 - "qt-probe16.spec.ts"
Cohesion: 0.31
Nodes (6): btns(), clean(), LOAD, main(), status(), toasts()

### Community 53 - "srs-sales-invoice-ui.spec.ts"
Cohesion: 0.24
Nodes (4): buttons(), clean(), LOAD, main()

### Community 54 - "Advanced Mocking with run-code"
Cohesion: 0.22
Nodes (8): Advanced Mocking with run-code, CLI Route Commands, Conditional Response Based on Request, Delayed Response, Modify Real Response, Request Mocking, Simulate Network Failures, URL Patterns

### Community 55 - "Advanced Mocking with run-code"
Cohesion: 0.22
Nodes (8): Advanced Mocking with run-code, CLI Route Commands, Conditional Response Based on Request, Delayed Response, Modify Real Response, Request Mocking, Simulate Network Failures, URL Patterns

### Community 56 - "e2e"
Cohesion: 0.28
Nodes (6): @ai-sdk/anthropic@^4.0.82, e2e@^0.21.2, @e2e-dev/web@^0.15.2, @ai-sdk/anthropic, e2e, @e2e-dev/web

### Community 57 - "ct-probe2.spec.ts"
Cohesion: 0.28
Nodes (4): clean(), dialogText(), LOAD, opts()

### Community 58 - "srs-item-tracking-lock.spec.ts"
Cohesion: 0.28
Nodes (6): WAREHOUSE, failure(), newItem(), receipt(), short(), stamp()

### Community 59 - "pr-probe3.spec.ts"
Cohesion: 0.25
Nodes (4): inputs(), LOAD, main(), SECTIONS

### Community 60 - "qt-probe18.spec.ts"
Cohesion: 0.25
Nodes (3): clean(), LOAD, toasts()

### Community 61 - "qt-probe20.spec.ts"
Cohesion: 0.25
Nodes (3): clean(), LOAD, toasts()

### Community 62 - "qt-probe21.spec.ts"
Cohesion: 0.31
Nodes (5): btnList(), clean(), LOAD, main(), toasts()

### Community 63 - "qt-probe23.spec.ts"
Cohesion: 0.28
Nodes (5): clean(), field(), LOAD, main(), opts()

### Community 64 - "qt-probe27.spec.ts"
Cohesion: 0.28
Nodes (5): clean(), cs(), LOAD, main(), opts()

### Community 65 - "st-probe3.spec.ts"
Cohesion: 0.28
Nodes (5): clean(), dialog(), inputs(), LOAD, main()

### Community 66 - "st-probe5.spec.ts"
Cohesion: 0.31
Nodes (5): body(), clean(), inputs(), LOAD, main()

### Community 67 - "st-probe6.spec.ts"
Cohesion: 0.31
Nodes (5): body(), clean(), dlg(), LOAD, main()

### Community 68 - "Debugging a failing run"
Cohesion: 0.25
Nodes (7): Contents, Debugging a failing run, Error codes, Flaky tests, Is it the app?, Read the failure, Tools

### Community 69 - "Exploring without a test"
Cohesion: 0.25
Nodes (7): Contents, Exploring without a test, Flags, Reading the result, Start signed in, What a run does, When it does not fit

### Community 70 - "Running tests"
Cohesion: 0.25
Nodes (7): Commands, Contents, Continuous integration, Exit codes, Output, Running tests, The replay cache

### Community 71 - "addr-probe2.spec.ts"
Cohesion: 0.29
Nodes (3): clean(), LOAD, opts()

### Community 72 - "addr-probe4.spec.ts"
Cohesion: 0.29
Nodes (3): clean(), LOAD, opts()

### Community 74 - "ct-probe.spec.ts"
Cohesion: 0.29
Nodes (3): inputs(), LOAD, main()

### Community 75 - "pr-probe2.spec.ts"
Cohesion: 0.29
Nodes (3): inputs(), LOAD, main()

### Community 76 - "pr-probe8.spec.ts"
Cohesion: 0.29
Nodes (3): clean(), dlgs(), LOAD

### Community 77 - "qt-probe10.spec.ts"
Cohesion: 0.36
Nodes (5): btns(), clean(), LOAD, main(), vis()

### Community 78 - "qt-probe17.spec.ts"
Cohesion: 0.29
Nodes (3): clean(), LOAD, top()

### Community 79 - "qt-probe25.spec.ts"
Cohesion: 0.29
Nodes (3): clean(), LOAD, opts()

### Community 80 - "qt-probe30.spec.ts"
Cohesion: 0.32
Nodes (4): clean(), LOAD, opts(), toasts()

### Community 81 - "qt-probe3.spec.ts"
Cohesion: 0.36
Nodes (5): btns(), clean(), inputs(), LOAD, main()

### Community 82 - "qt-probe4.spec.ts"
Cohesion: 0.36
Nodes (5): btns(), clean(), inputs(), LOAD, main()

### Community 83 - "qt-probe6.spec.ts"
Cohesion: 0.32
Nodes (4): inputs(), LOAD, main(), titles()

### Community 84 - "qt-probe7.spec.ts"
Cohesion: 0.32
Nodes (5): clean(), LOAD, main(), overlay(), rowInputs()

### Community 85 - "qt-probe8.spec.ts"
Cohesion: 0.29
Nodes (3): dInputs(), dlg(), LOAD

### Community 86 - "st-probe4.spec.ts"
Cohesion: 0.36
Nodes (6): create(), base(), ins(), log(), short(), tax()

### Community 87 - "st-probe8.spec.ts"
Cohesion: 0.29
Nodes (3): clean(), dlg(), LOAD

### Community 88 - "Driving the app over MCP"
Cohesion: 0.29
Nodes (6): Contents, Driving the app over MCP, Rules, Setup, Tools, Workflow

### Community 89 - "Auth, API Testing, Mocking, Visual Checks"
Cohesion: 0.29
Nodes (6): API testing, Auth, API Testing, Mocking, Visual Checks, Network mocking, Other handy APIs, Reuse login with storageState, Visual comparisons

### Community 90 - "SHAMEL_QualityInspection_Test_Cases_EN_423d8cff.md"
Cohesion: 0.29
Nodes (6): Sheet: 1. QI List, Sheet: 2. Add QI, Sheet: 3. QI Details, Sheet: 4. QI Parameter, Sheet: 5. QI Parameter Group, Sheet: Summary

### Community 92 - "pr-probe.spec.ts"
Cohesion: 0.33
Nodes (3): inputs(), LOAD, main()

### Community 93 - "qt-probe22.spec.ts"
Cohesion: 0.38
Nodes (4): btnList(), clean(), LOAD, main()

### Community 94 - "qt-probe28.spec.ts"
Cohesion: 0.33
Nodes (3): cs(), LOAD, main()

### Community 95 - "qt-probe2.spec.ts"
Cohesion: 0.38
Nodes (4): btns(), clean(), LOAD, main()

### Community 96 - "qt-probe31.spec.ts"
Cohesion: 0.33
Nodes (3): clean(), LOAD, toasts()

### Community 97 - "qt-probe9.spec.ts"
Cohesion: 0.38
Nodes (4): LOAD, main(), press(), setup()

### Community 99 - "st-probe.spec.ts"
Cohesion: 0.33
Nodes (3): inputs(), LOAD, main()

### Community 100 - "e2e: agentic end-to-end tests"
Cohesion: 0.33
Nodes (6): e2e: agentic end-to-end tests, Feedback, Quick start, Rules, Start here: pick the reference for the job, Workflow: writing a test

### Community 101 - "Debugging Failing and Flaky Tests"
Cohesion: 0.33
Nodes (5): Common errors → likely cause, Debugging Failing and Flaky Tests, Flaky tests, Triage procedure, When it's an app bug

### Community 112 - "Attaching Screenshots and Videos to Pull Requests"
Cohesion: 0.40
Nodes (5): Attaching Screenshots and Videos to Pull Requests, From a local session, From CI, Limits, When to attach

### Community 113 - "0. How generation works"
Cohesion: 0.40
Nodes (5): 0. How generation works, Add assertions manually, Building a test file, Explore before recording, Use semantic locators

### Community 114 - "1. Planning"
Cohesion: 0.40
Nodes (5): 1.1 Prerequisite: workspace, 1.2 Prerequisite: seed test, 1.3 Explore the app, 1.4 Write the spec file, 1. Planning

### Community 116 - "Attaching Screenshots and Videos to Pull Requests"
Cohesion: 0.40
Nodes (5): Attaching Screenshots and Videos to Pull Requests, From a local session, From CI, Limits, When to attach

### Community 117 - "Page Objects and Fixtures"
Cohesion: 0.40
Nodes (4): Custom fixtures, Page object pattern, Page Objects and Fixtures, Suggested layout

### Community 118 - "eslint-plugin-playwright"
Cohesion: 0.40
Nodes (4): eslint-plugin-playwright@^2.12.0, typescript-eslint@^8.71.0, eslint-plugin-playwright, typescript-eslint

### Community 119 - "playwright"
Cohesion: 0.50
Nodes (4): npx, e2e, playwright, playwright-mcp

### Community 120 - "pr-probe6.spec.ts"
Cohesion: 0.60
Nodes (3): ins(), log(), short()

### Community 121 - "Trace Output Files"
Cohesion: 0.50
Nodes (4): `resources/`, Trace Output Files, `trace-{timestamp}.network`, `trace-{timestamp}.trace`

## Knowledge Gaps
- **2 isolated node(s):** `npx`, `playwright-mcp`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 911 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@playwright/test` connect `@playwright/test` to `mr-data.ts`, `ProductBundlePage`, `DeliveryNotePage`, `QualityInspectionPage`, `api.ts`, `si-data.ts`, `sr-data.ts`, `code`, `ps-data.ts`, `ItemFormPage`, `PackingSlipPage`, `srs-coupon-code.spec.ts`, `dn-data.ts`, `srs-quality-inspection-add.spec.ts`, `qt-api.ts`, `pr-probe5.spec.ts`, `package.json`, `devDependencies`, `srs-landed-cost-add.spec.ts`, `srs-sales-invoice-remaining.spec.ts`, `pr-probe4.spec.ts`, `qt-probe11.spec.ts`, `srs-sales-invoice-tabs.spec.ts`, `ItemsListPage`, `pr-probe7.spec.ts`, `qt-probe16.spec.ts`, `srs-sales-invoice-ui.spec.ts`, `ct-probe2.spec.ts`, `srs-item-tracking-lock.spec.ts`, `pr-probe3.spec.ts`, `qt-probe18.spec.ts`, `qt-probe20.spec.ts`, `qt-probe21.spec.ts`, `qt-probe23.spec.ts`, `qt-probe27.spec.ts`, `st-probe3.spec.ts`, `st-probe5.spec.ts`, `st-probe6.spec.ts`, `addr-probe2.spec.ts`, `addr-probe4.spec.ts`, `addr-probe.spec.ts`, `ct-probe.spec.ts`, `pr-probe2.spec.ts`, `pr-probe8.spec.ts`, `qt-probe10.spec.ts`, `qt-probe17.spec.ts`, `qt-probe25.spec.ts`, `qt-probe30.spec.ts`, `qt-probe3.spec.ts`, `qt-probe4.spec.ts`, `qt-probe6.spec.ts`, `qt-probe7.spec.ts`, `qt-probe8.spec.ts`, `st-probe4.spec.ts`, `st-probe8.spec.ts`, `qt-probe19.spec.ts`, `pr-probe.spec.ts`, `qt-probe22.spec.ts`, `qt-probe28.spec.ts`, `qt-probe2.spec.ts`, `qt-probe31.spec.ts`, `qt-probe9.spec.ts`, `st-probe7.spec.ts`, `st-probe.spec.ts`, `ct-probe3.spec.ts`, `ct-probe5.spec.ts`, `ct-probe6.spec.ts`, `pr-probe9.spec.ts`, `qt-probe26.spec.ts`, `qt-probe29.spec.ts`, `qt-probe32.spec.ts`, `qt-probe.spec.ts`, `st-probe2.spec.ts`, `st-probe9.spec.ts`, `pr-probe6.spec.ts`, `playwright.config.ts`, `ref_fs`, `addr-probe3.spec.ts`, `ct-probe4.spec.ts`, `srs-landed-cost-add-api.spec.ts`?**
  _High betweenness centrality (0.295) - this node is a cross-community bridge._
- **What connects `npx`, `playwright-mcp` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `mr-data.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07777777777777778 - nodes in this community are weakly interconnected._
- **Why does `ProductBundlePage` connect `ProductBundlePage` to `ps-data.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `ProductBundlePage` be split into smaller, more focused modules?**
  _Cohesion score 0.057692307692307696 - nodes in this community are weakly interconnected._
- **Why does `Writing tests` connect `StockReconciliationPage` to `e2e/SKILL.md`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Should `DeliveryNotePage` be split into smaller, more focused modules?**
  _Cohesion score 0.06882591093117409 - nodes in this community are weakly interconnected._