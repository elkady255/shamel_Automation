// Probe: the Add Journal Entry screen (nothing saved).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';

test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 20_000 });

test('add screen', async ({ page }) => {
  test.setTimeout(200_000);
  const errors: string[] = [];
  page.on('response', async (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url().slice(0, 160)} ${(await r.text().catch(() => '')).slice(0, 300)}`); else if (/journal/i.test(r.url())) errors.push(`ok ${r.url().slice(0, 160)}`); });
  await u.open(page, '/desk/shamel#/accounting/payment-entries');
  await page.getByText('قيود اليومية', { exact: true }).first().click(); await page.waitForTimeout(6000);
  console.log('LIST', page.url(), (await u.main(page).locator('button:visible').allInnerTexts()).join(' | '));
  await u.main(page).locator('button:visible').filter({ hasText: /إضافة/ }).first().click(); await page.waitForTimeout(8000);
  console.log('ADD', page.url());
  console.log('FIELDS', JSON.stringify(await u.fields(page)));
  console.log('LABELS', JSON.stringify(await u.main(page).locator('label:visible').allInnerTexts()));
  console.log('BUTTONS', JSON.stringify(await u.main(page).locator('button:visible').allInnerTexts()));
  console.log('TABLES', JSON.stringify(await u.tablesInfo(page)));
  console.log('MODAL', await u.modalText(page));
  await page.screenshot({ path: 'Shamel/je-results/p1-add.png', fullPage: true });
  console.log('NET', errors.join('\n'));
});
