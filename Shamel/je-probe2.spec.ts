// Probe: accounting rows, voucher types and Quick Entry of the Journal Entry screen (nothing saved).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';

test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 20_000 });

test('rows', async ({ page }) => {
  test.setTimeout(200_000);
  const w = (ms: number) => page.waitForTimeout(ms);
  await u.open(page, '/desk/shamel#/accounting/journal-entries/new');
  await u.input(page, 'نوع القيد').click(); await w(2000);
  console.log('TYPES', JSON.stringify(await page.locator('.cs-option:visible').allInnerTexts()));
  await page.keyboard.press('Escape'); await u.main(page).locator('h1,h2,h3').first().click({ force: true }); await w(800);
  await u.main(page).getByRole('button', { name: 'إضافة صف' }).click(); await w(3000);
  console.log('TABLES', JSON.stringify(await u.tablesInfo(page)));
  const cells = u.main(page).locator('table:visible tbody tr').first().locator('input:visible');
  console.log('CELLS', JSON.stringify(await cells.evaluateAll((is: any[]) => is.map((i) => `${i.type}|${i.placeholder}|${i.className}|${i.disabled || i.readOnly}`)))); // eslint-disable-line @typescript-eslint/no-explicit-any
  await page.screenshot({ path: 'Shamel/je-results/p2-row.png', fullPage: true });
  await u.main(page).locator('button[title="تعديل الصف"]').first().click().catch((e) => console.log('edit', e.message.slice(0, 100))); await w(2500);
  console.log('EDIT', (await page.locator('.qr-dialog:visible, .base-modal:visible').last().innerText({ timeout: 5000 }).catch(() => 'NONE')).replace(/\s+/g, ' '));
  await page.locator('.qr-dialog:visible button, .base-modal:visible button').filter({ hasText: /^\s*إلغاء\s*$/ }).last().click().catch(() => {}); await w(1500);
  await u.main(page).getByRole('button', { name: 'إدخال سريع' }).click(); await w(3000);
  console.log('QUICK', (await page.locator('.qr-dialog:visible, .base-modal:visible, [role=dialog]:visible').last().innerText({ timeout: 5000 }).catch(() => 'NONE')).replace(/\s+/g, ' '));
  await page.screenshot({ path: 'Shamel/je-results/p2-quick.png' });
});
