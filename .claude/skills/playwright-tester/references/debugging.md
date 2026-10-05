# Debugging Failing and Flaky Tests

The first question is always: **is the app wrong, or is the test wrong?** Changing a test to make it pass without answering this can hide a real bug.

## Triage procedure

1. **Reproduce narrowly**
   `npx playwright test path/file.spec.ts -g "test title" --project=chromium --reporter=line`
2. **Read the error carefully.** Playwright prints the failing locator, expected vs received, and a call log showing what it waited for (e.g. "waiting for getByRole('button', { name: 'Save' })", "element is not visible", "resolved to 2 elements").
3. **Look at artifacts** in `test-results/<test-dir>/`: `test-failed-1.png`, `video.webm`, `error-context.md` (an accessibility snapshot of the page at failure — very useful for fixing locators).
4. **Trace it** when the cause isn't obvious:
   `npx playwright test ... --trace on` then `npx playwright show-trace test-results/<dir>/trace.zip`
   The trace shows each action with before/after DOM snapshots, console logs and network requests.
5. **Watch it live**: `--headed`, `--debug` (Inspector, step through), or `--ui`.
6. **Inspect the live page** with the `playwright-cli` skill (`open`, `snapshot`) to see the current roles/names when a locator no longer matches.

## Common errors → likely cause

| Symptom | Likely cause | Fix |
|---|---|---|
| `strict mode violation: resolved to N elements` | Locator too broad | Scope to a parent region, add `name`/`exact: true`, or `.filter()` |
| Timeout waiting for locator | Wrong name/role, element in iframe, not yet rendered, or app bug | Check `error-context.md` / snapshot; use `frameLocator` for iframes |
| `element is not visible / not enabled` | Overlay, animation, disabled until form valid | Wait for the overlay to disappear or fill required fields first; don't `force: true` blindly |
| Assertion got old value | Read once instead of web-first assertion | Use `await expect(locator).toHaveText(...)` |
| Passes alone, fails in suite | Shared state/data between tests | Make tests independent; unique data via faker; isolate via fixtures |
| Passes locally, fails in CI | Slower machine, different viewport/timezone/locale, missing env vars | Wait on conditions not time; set `locale`/`timezoneId`; check CI secrets |
| Fails only in WebKit/Firefox | Real browser difference or browser-specific timing | Check if it's an app bug first; use `test.skip(browserName === 'webkit', 'reason')` only with a documented reason |
| Test passed but shouldn't have | Missing `await`, assertion on wrong thing | Run `npm run lint`; make the test fail on purpose to verify |

## Flaky tests

Confirm flakiness: `npx playwright test <file> --repeat-each=20 --workers=4 --project=chromium`.

Root causes, in rough order of frequency:
1. **Timing** — fixed waits, reading values without retrying assertions, clicking before the app hydrated. Fix: web-first assertions, `waitForResponse`, wait for a "ready" indicator.
2. **Test data collisions** — parallel tests editing the same record. Fix: unique data per test, create/clean up in fixtures.
3. **Order dependence** — a test relies on state left by another. Fix: independent setup.
4. **External dependencies** — third-party widgets, ads, analytics. Fix: `page.route` to stub or block them.
5. **Animations** — fix with `expect(...).toBeVisible()` before acting, or reduced motion: `test.use({ contextOptions: { reducedMotion: 'reduce' } })`.

Avoid "fixes" that only mask the problem: raising timeouts everywhere, adding `waitForTimeout`, `force: true`, or wrapping in retries. Retries in CI (`retries: 2`) are a safety net that also surfaces flaky tests in the report — not a cure.

## When it's an app bug

Leave the test asserting the correct behaviour, and either report it to the user with evidence (screenshot/trace path, expected vs actual), or mark it so the suite stays green while it's tracked:

```ts
test.fixme('applies discount code', async ({ page }) => { /* ... */ }); // BUG-123: discount not applied
test.fail('known broken in WebKit', async ({ page }) => { /* ... */ });  // expected to fail until fixed
```

Always tell the user which tests were marked and why.
