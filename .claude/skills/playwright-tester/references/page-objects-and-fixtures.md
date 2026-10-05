# Page Objects and Fixtures

Use a page object when a page or component is used by more than one test. It gives selectors one home, so a UI change means one edit instead of twenty. Don't wrap everything in page objects though — a one-off check in a single test is clearer inline.

## Suggested layout

```
<testDir>/            # e.g. Shamel/
  pages/              # page objects (one class per page or major component)
  fixtures/           # custom test fixtures (extends base test)
  data/               # static test data (JSON) if needed
  *.spec.ts           # specs grouped by feature, or in feature subfolders
```

Keep the project's existing layout if it already has one.

## Page object pattern

Expose **locators as readonly properties** and **user-level actions as methods**. Keep assertions in the spec (so the test reads as the scenario), except for small "is loaded" helpers.

```ts
// pages/LoginPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly error: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: 'Sign in' });
    this.error = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }

  async expectLoaded() {
    await expect(this.submit).toBeVisible();
  }
}
```

Methods should be named after what a user does (`login`, `addToCart`, `searchFor`), not after DOM operations (`clickButton3`).

## Custom fixtures

Fixtures inject page objects (and setup/teardown) into tests so specs don't repeat `new LoginPage(page)` everywhere.

```ts
// fixtures/index.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from '@playwright/test';
```

```ts
// login.spec.ts
import { test, expect } from './fixtures';

test('logs in', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
  await expect(page).toHaveURL(/dashboard/);
});
```

Fixtures with setup + teardown (code after `await use(...)` runs as cleanup) are the right place for creating and deleting test data:

```ts
export const test = base.extend<{ tempUser: { email: string } }>({
  tempUser: async ({ request }, use) => {
    const email = `user-${Date.now()}@example.com`;
    await request.post('/api/users', { data: { email } });
    await use({ email });
    await request.delete(`/api/users/${encodeURIComponent(email)}`);
  },
});
```

Worker-scoped fixtures (`{ scope: 'worker' }`) run once per worker — use for expensive shared setup that tests don't mutate.
