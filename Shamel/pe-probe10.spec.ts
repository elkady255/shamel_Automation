// Probe: class names of the table Edit Row pop-up (nothing saved).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as d from './helpers/pe-data';
test('popup classes', async ({ page }) => {
  await u.open(page, u.LIST + '/' + d.data().B01);
  await u.main(page).locator('button[title="تعديل الصف"]').first().click(); await page.waitForTimeout(3000);
  console.log(await page.getByText('تعديل الصف', { exact: true }).last().evaluate((e: any) => { const c: string[] = []; for (let x = e; x && x !== document.body; x = x.parentElement) c.push(`${x.tagName}.${x.className}[${x.getAttribute('role') ?? ''}]`); return c.join(' < '); }));
});
