// Probe: all Reference Type options, and what Get Outstanding Invoices sends / receives (nothing saved).
import { test } from '@playwright/test';
import * as j from './helpers/je-ui';
const { u } = j;
test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 15_000 });
test('reference types and write off', async ({ page }) => {
  test.setTimeout(300_000);
  page.on('response', async (r) => { if (/journal_entry\.(?!get_options|get_form)/.test(r.url()) || /outstanding/i.test(r.url())) console.log('NET', r.status(), r.request().method(), decodeURIComponent(r.url().split('/api/method/')[1] ?? r.url()).slice(0, 200), decodeURIComponent(r.request().postData() ?? '').slice(0, 400), '=>', (await r.text().catch(() => '')).slice(0, 700)); });
  await j.open(page); await j.rows(page, [{ account: j.CASH, debit: '5' }]);
  await u.main(page).locator('button[title="تعديل الصف"]').first().click(); await j.wait(2500);
  const box = j.modal(page).locator('.qr-field').filter({ hasText: 'نوع المرجع' }).first();
  await box.locator('.select-head, input:visible').first().click(); await j.wait(2000);
  console.log('HTML', (await page.getByText('فاتورة مبيعات', { exact: true }).last().evaluate((e: any) => { let x = e; for (let i = 0; i < 3 && x.parentElement && x.parentElement.children.length < 5; i++) x = x.parentElement; return `${x.className} | ${x.parentElement.className} | ` + [...x.parentElement.children].map((c: any) => c.innerText.trim()).join(' ; '); })));
  for (const amount of ['', '100000']) {
    await j.open(page, 'قيد شطب'); await j.tab(page, j.MORE);
    if (amount) await u.type(page, 'مبلغ الشطب', amount);
    console.log('CLICK amount=', amount || '(empty)'); await j.watch(page); await j.click(page, 'جلب الفواتير المستحقة'); await j.wait(15_000);
    console.log('MSG', await j.flashed(page), await j.dialogText(page));
    await j.closeAll(page); await j.tab(page, j.DETAILS); console.log('ROWS', JSON.stringify((await u.tablesInfo(page))[0]?.rows.slice(0, 6) ?? []));
  }
});
