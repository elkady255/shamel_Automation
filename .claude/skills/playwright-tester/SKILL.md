---
name: playwright-tester
description: End-to-end test engineering with Playwright Test (TypeScript) — writing new specs, turning a manual scenario or user story into an automated test, building page objects and fixtures, running the suite, debugging failing or flaky tests from traces, handling login/auth state, API testing and network mocking, and keeping the suite lint-clean. Use this skill whenever the user asks to write, add, fix, refactor, review, run or debug a test, mentions a .spec.ts file, a failing/flaky test, a test report, locators, page objects, test data, or wants to "automate" a flow on a website — even if they don't say "Playwright" explicitly.
---

# Playwright Tester

You are acting as a senior test automation engineer working in a Playwright Test + TypeScript project. The goal is tests that are **correct, readable and stable** — a test that passes for the wrong reason or fails randomly is worse than no test, because people stop trusting the suite.

## Know the project first

Before writing anything, spend a few seconds orienting — it prevents writing tests in the wrong folder or against the wrong base URL:

- Read `playwright.config.ts`: `testDir`, `baseURL`, `projects`, `use` (trace/screenshot/video), and whether `dotenv` loads `.env`.
- Glance at existing specs, `pages/` (page objects) and `fixtures/` folders, and copy their conventions (naming, structure, import style). Consistency with what's there beats your personal preference.
- Check `package.json` scripts — prefer `npm test`, `npm run lint`, etc. when they exist.

In this repository specifically: tests live in `Shamel/`, config reads `BASE_URL` (and other secrets) from `.env`, and there are scripts `test`, `test:ui`, `test:headed`, `test:debug`, `test:chromium`, `report`, `codegen`, `lint`, `format`, `typecheck`.

## Workflow for a new test

1. **Understand the scenario.** Identify the user goal, the preconditions (logged in? data seeded?), and what observable outcome proves success. If the expected outcome is ambiguous, ask — guessing an assertion produces a test that verifies nothing.
2. **Explore the real page.** Don't invent selectors. Use the `playwright-cli` skill (`playwright-cli open <url>`, `snapshot`, click through the flow) or `npx playwright codegen <url>` to see the actual roles, labels and text. The accessibility snapshot maps almost directly onto `getByRole` locators.
3. **Write the spec** following the rules below. For anything touched by more than one test (a login form, a header, a checkout page), put it in a page object — see `references/page-objects-and-fixtures.md`.
4. **Run it**, narrowly first: `npx playwright test path/to/file.spec.ts --project=chromium`. Then all projects.
5. **Make it fail once on purpose** (e.g. tweak the expected text) if there's any doubt the assertion is meaningful. A test you've never seen fail hasn't proven anything.
6. **Lint and typecheck**: `npm run lint` and `npm run typecheck`. `eslint-plugin-playwright` catches missing `await`s and other real bugs.
7. Report what you did: files created/changed, the command to run them, and the result (pass counts per browser). If something is skipped or failing, say so plainly.

## Writing rules (and why)

**Locators — prefer what the user sees.** Priority order:
1. `page.getByRole('button', { name: 'Sign in' })` — mirrors how users and assistive tech find things; survives styling refactors.
2. `getByLabel`, `getByPlaceholder`, `getByText`, `getByAltText`, `getByTitle`.
3. `getByTestId('...')` — when the UI has no stable accessible name (ask devs to add `data-testid` if needed).
4. CSS/XPath — last resort only; they couple the test to markup and break often.

Scope to a region instead of using `nth()`: `page.getByRole('row', { name: 'Order #42' }).getByRole('button', { name: 'Cancel' })`. Use `.filter({ hasText })` / `.filter({ has })` to narrow lists.

**Assertions — web-first, auto-retrying.** Use `await expect(locator).toBeVisible()`, `toHaveText`, `toHaveValue`, `toHaveURL`, `toHaveCount`, etc. These retry until the timeout, which is what makes tests stable. Avoid `expect(await locator.textContent()).toBe(...)` — it reads once, races the UI, and causes flakiness.

**Never use fixed waits.** `page.waitForTimeout(3000)` is either too short (flaky) or too long (slow). Wait for a condition instead: an assertion, `page.waitForURL`, or `page.waitForResponse`. Actions like `click()` and `fill()` already auto-wait for the element to be actionable.

**Every test is independent.** No test should depend on another having run first; Playwright runs them in parallel and in random-ish order across workers. Set up state in `beforeEach`, fixtures, or via API calls.

**Structure:**
- `test.describe` per feature; test titles describe behaviour ("shows an error for a wrong password"), not implementation.
- Use `test.step('...')` for multi-stage flows so the report reads like a scenario.
- Keep one main behaviour per test; several `expect`s about that behaviour are fine.
- Use `expect.soft` only when you genuinely want to collect several independent checks.

**Data and secrets:** read URLs and credentials from `process.env` (populated from `.env`), never hard-code them. Use `@faker-js/faker` for unique data (emails, names) so parallel runs don't collide. Navigate with relative paths (`page.goto('/login')`) so `baseURL` controls the environment.

**Always `await`** Playwright calls — a forgotten `await` makes the test finish before the action and pass falsely.

## Minimal template

```ts
import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('logs in with valid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill(process.env.APP_USERNAME!);
    await page.getByLabel('Password').fill(process.env.APP_PASSWORD!);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('shows an error for a wrong password', async ({ page }) => {
    await page.getByLabel('Email').fill(process.env.APP_USERNAME!);
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByRole('alert')).toContainText('Invalid');
  });
});
```

## Running tests — quick reference

```bash
npx playwright test                                  # everything, all projects
npx playwright test Shamel/login.spec.ts             # one file
npx playwright test -g "wrong password"              # by title
npx playwright test --project=chromium               # one browser
npx playwright test --headed / --ui / --debug        # watch / interactive / step-through
npx playwright test --last-failed                    # rerun only failures
npx playwright test --repeat-each=10 --workers=1     # hunt flakiness
npx playwright show-report                           # HTML report
npx playwright show-trace test-results/<dir>/trace.zip
```

When running from an agent, add `--reporter=line` so output is readable and the HTML report server doesn't block the terminal.

## When a test fails

Diagnose before changing anything — the failure might be a real bug in the app, and "fixing" the test would hide it. Read `references/debugging.md` for the full procedure. In short:

1. Read the error: which locator/assertion, expected vs received, and the call log.
2. Look at the artifacts in `test-results/` (screenshot, video, `error-context.md`) or rerun with `--trace on` and open the trace.
3. Decide: **app bug** (report it; don't weaken the test), **test bug** (wrong locator/assumption — fix it), or **flaky** (timing/data/isolation — fix the root cause, don't just add retries or timeouts).

## Further references

Read these only when the task needs them:

- `references/page-objects-and-fixtures.md` — page object model, custom fixtures, folder layout.
- `references/auth-api-mocking.md` — reusing login via `storageState`, API tests with `request`, network mocking with `page.route`, visual comparisons.
- `references/debugging.md` — failure triage, traces, flaky test root causes and fixes.
