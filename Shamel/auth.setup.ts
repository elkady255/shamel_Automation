import { test as setup, expect } from '@playwright/test';

export const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email or Mobile or Username' }).fill(process.env.APP_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.APP_PASSWORD!);
  await page.getByRole('button', { name: 'Continue' }).click();

  // The desk loads slowly after login, so allow more than the default 5s
  await expect(page).toHaveURL(/\/desk\//, { timeout: 30_000 });
  await page.context().storageState({ path: authFile });
});
