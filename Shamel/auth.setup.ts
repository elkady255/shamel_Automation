import fs from 'fs';
import { test as setup, expect, request } from '@playwright/test';

export const authFile = 'playwright/.auth/user.json';

/** True when the saved session cookies are still accepted by the server (so no new login is needed). */
async function savedSessionIsValid(): Promise<boolean> {
  if (!fs.existsSync(authFile)) return false;
  const ctx = await request.newContext({ baseURL: process.env.BASE_URL, storageState: authFile });
  try {
    const res = await ctx.get('/api/method/frappe.auth.get_logged_user', { timeout: 60_000 });
    return res.ok() && (await res.json()).message === process.env.APP_USERNAME;
  } catch {
    return false;
  } finally {
    await ctx.dispose();
  }
}

setup('authenticate', async ({ page }) => {
  // Stay signed in: reuse the saved session and only log in again when it has expired
  if (await savedSessionIsValid()) return;

  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email or Mobile or Username' }).fill(process.env.APP_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.APP_PASSWORD!);
  await page.getByRole('button', { name: 'Continue' }).click();

  // After login the server redirects to /desk/... or /app/... (it changed during testing), and the
  // landing page loads slowly, so wait for the redirect away from /login rather than a specific page
  await expect(page).toHaveURL(/\/(desk|app)\//, { timeout: 60_000 });
  await page.context().storageState({ path: authFile });
});
