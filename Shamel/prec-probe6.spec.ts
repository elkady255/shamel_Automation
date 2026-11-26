// Probe: selection, Allocate, allocation edit, edit row, settings popup (no Reconcile).
import { test, type Page } from '@playwright/test';
import * as u from './helpers/prec-ui';

test.use({ viewport: { width: 1400, height: 1400 } });

const overlay = (p: Page) => p.evaluate(() => {
  const els = [...document.querySelectorAll('body *')].filter((e: any) => { const s = getComputedStyle(e); return s.position === 'fixed' && e.offsetParent === null && e.getBoundingClientRect().height > 100 && s.visibility !== 'hidden' && s.display !== 'none' && (e.innerText || '').trim(); });
  return els.map((e: any) => e.className + ' :: ' + e.innerText.replace(/\n+/g, ' | ').slice(0, 1800));
});

test('allocate walk', async ({ page }) => {
  test.setTimeout(280_000);
  const m = u.main(page);
  page.on('response', async (r) => {
    if (!/payment_reconcil/i.test(r.url()) || /\.(js|css)|get_unreconciled|options|party_acc/.test(r.url())) return;
    console.log('API', r.status(), decodeURIComponent(r.url().split('/api/method/')[1] ?? '').slice(0, 200), decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' ')).slice(0, 2000), '=>', (await r.text().catch(() => '')).slice(0, 2000));
  });
  const shot = (n: string) => page.screenshot({ path: `Shamel/prec-results/${n}.png`, fullPage: true });
  await u.open(page);
  await u.setParty(page, 'QA-PR Cust Main');
  await u.getEntries(page);
  await shot('p6-a-entries');
  // allocate with nothing selected
  await u.press(m.getByRole('button', { name: u.BTN_ALLOC })); await u.wait(page, 3000);
  console.log('NOSEL', JSON.stringify(await u.messages(page)), JSON.stringify(await overlay(page)), 'tables', await u.tables(page).count());
  await u.press(page.locator('.modal.show .btn-modal-close').first()); await u.wait(page, 1500);
  const t = u.tables(page);
  await u.press(t.nth(0).locator('tbody .sr-checkbox').nth(0)); await u.press(t.nth(1).locator('tbody .sr-checkbox').nth(0)); await u.wait(page, 1500);
  console.log('SELBAR', (await m.locator('.table-controls:visible').allInnerTexts()).join(' // '));
  await u.press(m.getByRole('button', { name: u.BTN_ALLOC })); await u.wait(page, 8000);
  console.log('ALLOC', JSON.stringify(await u.readTables(page)));
  console.log('BTNS', JSON.stringify((await m.locator('button:visible').allInnerTexts()).map((s) => s.trim()).filter(Boolean)));
  console.log('ALLOCROW', (await u.tables(page).nth(2).locator('tbody tr').first().evaluate((e) => e.outerHTML).catch((e) => e.message)).replace(/ data-v-\w+(="")?/g, '').replace(/<svg.*?<\/svg>/g, '').slice(0, 2000));
  await shot('p6-b-alloc');
  // edit row popup of the allocation
  await u.press(u.tables(page).nth(2).locator('button[title="تعديل الصف"]').first()); await u.wait(page, 2500);
  console.log('EDITALLOC', JSON.stringify(await overlay(page)));
  await shot('p6-c-edit-alloc');
  await page.keyboard.press('Escape'); await u.wait(page, 1000);
  console.log('after esc', JSON.stringify(await overlay(page)).slice(0, 200));
  await u.open(page); await u.setParty(page, 'QA-PR Cust Main'); await u.getEntries(page);
  for (const [i, n] of [[0, 'inv'], [1, 'pay']] as const) {
    await u.press(u.tables(page).nth(i).locator('button[title="تعديل الصف"]').first()); await u.wait(page, 2500);
    console.log('EDIT', n, JSON.stringify(await overlay(page))); await shot(`p6-d-edit-${n}`);
    await u.open(page); await u.setParty(page, 'QA-PR Cust Main'); await u.getEntries(page);
  }
  await u.press(u.tables(page).nth(0).locator('button[title="إعدادات الجدول"]')); await u.wait(page, 2500);
  console.log('SETTINGS', JSON.stringify(await overlay(page))); await shot('p6-e-settings');
});
