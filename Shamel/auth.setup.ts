import { test as setup, expect } from '@playwright/test';

export const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email or Mobile or Username' }).fill(process.env.APP_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.APP_PASSWORD!);
  await page.getByRole('button', { name: 'Continue' }).click();

  // After login the server redirects to /desk/... or /app/... (it changed during testing), and the
  // landing page loads slowly, so wait for the redirect away from /login rather than a specific page
  await expect(page).toHaveURL(/\/(desk|app)\//, { timeout: 60_000 });
  await page.context().storageState({ path: authFile });
});
