// Probe on my draft: preview, outstanding invoices, tables, submit, ledger button, details after submit.
import { test, type Page } from '@playwright/test';
import * as u from './helpers/pe-ui';

test.use({ viewport: { width: 1400, height: 1800 } });
const buttons = async (p: Page) => JSON.stringify((await u.main(p).locator('button:visible').evaluateAll((els: any[]) => els.map((e) => (e.innerText.trim() || e.title || '').replace(/\s+/g, ' ') + (e.disabled ? '[disabled]' : '')))).filter(Boolean));
const pops = async (p: Page) => (await p.locator('.base-modal:visible, .modal.show').allInnerTexts()).map((s) => s.replace(/\n+/g, ' | ').slice(0, 1500)).join(' || ');

test('draft walk', async ({ page }) => {
  test.setTimeout(280_000);
  page.on('response', async (r) => {
    const q = r.request();
    if (!/payment_entry\.(?!recalculate|get_exchange|get_company|get_account_det|get_form|get_party|get_mode|get_bank)/.test(r.url())) return;
    console.log('API', r.status(), q.method(), decodeURIComponent(r.url().split('/api/method/')[1]).slice(0, 200), decodeURIComponent((q.postData() ?? '').replace(/\+/g, ' ')).slice(0, 500), '=>', (await r.text().catch(() => '')).slice(0, 900));
  });
  await u.open(page, u.LIST + '/ACC-PAY-2026-03079');
  console.log('B0', await buttons(page));
  await u.press(u.btn(page, 'معاينة')); await u.wait(page, 2500); console.log('PREVIEWMENU', await buttons(page));
  await u.press(u.btn(page, 'دفتر الأستاذ المحاسبي')); await u.wait(page, 6000);
  console.log('PREVIEW', await pops(page)); await page.screenshot({ path: 'Shamel/pe-results/p4-preview.png', fullPage: true });
  await u.closeModals(page);
  await u.open(page, u.LIST + '/ACC-PAY-2026-03079');
  await u.press(u.btn(page, 'جلب الفواتير المستحقة')); await u.wait(page, 7000);
  console.log('GETINV popup', await pops(page)); await page.screenshot({ path: 'Shamel/pe-results/p4-getinv.png', fullPage: true });
  console.log('GETINV tables', JSON.stringify(await u.tablesInfo(page)));
  const ok = page.locator('.base-modal:visible button').filter({ hasText: /^\s*(جلب|تأكيد|موافق|إضافة|جلب الفواتير)\s*$/ });
  if (await ok.count()) { await u.press(ok.last()); await u.wait(page, 6000); console.log('after popup tables', JSON.stringify(await u.tablesInfo(page))); }
  console.log('TOTALS', JSON.stringify(Object.fromEntries(Object.entries(await u.fields(page)).filter(([k]) => /المخصص|الفرق/.test(k)))));
  console.log('REFROW', (await u.main(page).locator('table:visible tbody tr').first().evaluate((e) => e.outerHTML).catch(() => '')).replace(/ data-v-\w+(="")?/g, '').replace(/<svg.*?<\/svg>/g, '').slice(0, 2000));
  await page.screenshot({ path: 'Shamel/pe-results/p4-refs.png', fullPage: true });
  console.log('B1', await buttons(page));
  const s = await u.save(page); console.log('SAVE', s.status, s.url, s.msg, JSON.stringify(s.errors), s.body.slice(0, 600));
  await u.closeModals(page); await u.wait(page, 3000);
  console.log('B2', await buttons(page), JSON.stringify(await u.tablesInfo(page)));
  await u.press(u.btn(page, 'اعتماد')); await u.wait(page, 4000); console.log('SUBMIT popup', await pops(page));
  const yes = page.locator('.base-modal:visible button, .modal.show button, .shamel-confirm-content button').filter({ hasText: /نعم|تأكيد|اعتماد|إرسال|موافق/ });
  if (await yes.count()) { await u.press(yes.last()); await u.wait(page, 9000); }
  console.log('after submit', await pops(page), JSON.stringify(await u.messages(page)));
  await u.closeModals(page); await u.open(page, u.LIST + '/ACC-PAY-2026-03079');
  console.log('B3', await buttons(page)); console.log('FIELDS3', JSON.stringify(await u.fields(page))); console.log('TABLES3', JSON.stringify(await u.tablesInfo(page)));
  console.log('HEADER', (await u.main(page).innerText()).split('\n').slice(0, 12).join(' | '));
  await page.screenshot({ path: 'Shamel/pe-results/p4-submitted.png', fullPage: true });
});
