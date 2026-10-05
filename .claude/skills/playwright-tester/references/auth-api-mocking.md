# Auth, API Testing, Mocking, Visual Checks

## Reuse login with storageState

Logging in through the UI in every test is slow and adds flakiness. Log in once in a setup project, save the browser state, and reuse it.

```ts
// Shamel/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json'; // already git-ignored

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.APP_USERNAME!);
  await page.getByLabel('Password').fill(process.env.APP_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.context().storageState({ path: authFile });
});
```

```ts
// playwright.config.ts (projects)
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
    dependencies: ['setup'],
  },
  // repeat storageState + dependencies for other browsers
],
```

For tests that must start logged out: `test.use({ storageState: { cookies: [], origins: [] } });`

Multiple roles (admin/user): one setup test and one auth file per role; choose per file with `test.use({ storageState: 'playwright/.auth/admin.json' })`.

## API testing

The built-in `request` fixture shares `baseURL` and is ideal for pure API tests and for fast data setup inside UI tests.

```ts
import { test, expect } from '@playwright/test';

test('creates an item via API', async ({ request }) => {
  const res = await request.post('/api/items', { data: { name: 'Book' } });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toMatchObject({ name: 'Book' });
});
```

Set common headers (auth tokens) in config: `use: { extraHTTPHeaders: { Authorization: `Bearer ${process.env.API_TOKEN}` } }`.

## Network mocking

Use `page.route` to make tests deterministic (stub flaky third-party services, force error states, test empty lists).

```ts
test('shows empty state', async ({ page }) => {
  await page.route('**/api/items', (route) => route.fulfill({ json: [] }));
  await page.goto('/items');
  await expect(page.getByText('No items yet')).toBeVisible();
});

test('shows error banner on server failure', async ({ page }) => {
  await page.route('**/api/items', (route) => route.fulfill({ status: 500 }));
  await page.goto('/items');
  await expect(page.getByRole('alert')).toBeVisible();
});

// modify a real response
await page.route('**/api/profile', async (route) => {
  const response = await route.fetch();
  const json = await response.json();
  await route.fulfill({ response, json: { ...json, plan: 'premium' } });
});
```

Wait for a specific network call instead of sleeping:

```ts
const saved = page.waitForResponse((r) => r.url().includes('/api/save') && r.ok());
await page.getByRole('button', { name: 'Save' }).click();
await saved;
```

Don't mock what the test is supposed to verify — mocking the backend in an end-to-end test of that backend proves nothing.

## Visual comparisons

```ts
await expect(page).toHaveScreenshot('home.png', { maxDiffPixelRatio: 0.01 });
await expect(page.getByRole('navigation')).toHaveScreenshot();
```

First run creates baselines; update intentionally with `npx playwright test --update-snapshots`. Baselines are OS/browser specific — generate them in the same environment that runs CI. Mask dynamic content: `{ mask: [page.getByTestId('clock')] }`.

## Other handy APIs

- File upload: `await page.getByLabel('Upload').setInputFiles('data/file.pdf')`
- Download: `const dl = page.waitForEvent('download'); await click; const file = await dl; await file.saveAs(...)`
- New tab/popup: `const popup = page.waitForEvent('popup'); await click; const p = await popup;`
- Dialogs: `page.once('dialog', (d) => d.accept());` before the action that triggers it
- iframes: `page.frameLocator('#payment').getByLabel('Card number')`
- Mobile/locale/geo: `test.use({ ...devices['iPhone 13'], locale: 'ar-EG', timezoneId: 'Africa/Cairo' })`
