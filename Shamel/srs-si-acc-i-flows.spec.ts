import { test, type Page } from '@playwright/test';
import { openNew, openDoc, tab, combo, options, main, press, wait, recorder, snapshot, toggle, toggleState, addItem, messages, isNew, docName, value } from './helpers/si-ui';
import { put, get, post } from './helpers/qt-api';

test.describe.configure({ timeout: 600_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('i-flows');
const btnTexts = (p: Page) => main(p).locator('button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => (e.innerText || e.title || '').replace(/\s+/g, ' ').trim()).filter((s) => s && !/إشعار|تحديد|^الكل$|مقروء|Show popup/.test(s)));
const SUBMITTED = 'ACC-SINV-2026-02830';

test('I01 Create > Return / Credit Note', async ({ page }) => {
  await openDoc(page, SUBMITTED);
  await press(main(page).getByRole('button', { name: 'إنشاء', exact: true }).first()); await wait(page, 1000);
  await press(page.locator('.cd-action-menu.open *').filter({ hasText: /^\s*مرتجع \/ إشعار دائن\s*$/ }).first()); await wait(page, 8000);
  const url = page.url(); rec.note('I01-1', 'url after Create > Return', url);
  rec.check('I01-2', 'Return opens an unsaved Add Sales Invoice screen (not a saved document)', /\/new/.test(url), url, 'SI-13');
  rec.note('I01-3', 'messages', JSON.stringify(await messages(page)));
  const s = await snapshot(page);
  rec.note('I01-4', 'return doc header', JSON.stringify(Object.entries(s).filter(([k]) => /مرتجع|مصدر|مقابل|تحديث|معدل|فاتورة/.test(k)).slice(0, 14)));
  rec.check('I01-5', 'Is Return (Credit Note) is checked', s['مرتجع (إشعار دائن)'] === 'on', s['مرتجع (إشعار دائن)']);
  const row = (await main(page).locator('table.si-table tbody tr').first().innerText().catch(() => '')).replace(/\s+/g, ' ');
  rec.note('I01-6', 'first item row', row);
  const inputs = await main(page).locator('table.si-table tbody tr').first().locator('input').evaluateAll((els: any[]) => els.map((e) => e.type + ':' + e.value));
  rec.note('I01-7', 'row inputs', JSON.stringify(inputs));
  rec.check('I01-8', 'quantity is negative in the return', inputs.some((x: string) => /^number:-\d/.test(x)), JSON.stringify(inputs));
  rec.check('I01-9', 'the return item row does not use the group warehouse "All Warehouses" (old SI-14)', !/All Warehouses/.test(inputs.join(' ') + row), row, 'SI-14');
  const labels = (await main(page).locator('label,.toggle-row-label').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim());
  rec.check('I01-10', 'Update Billed Amount in Sales Order / Delivery Note are shown on a return', labels.filter((l) => /المبلغ المفوتر|الفوترة في أمر|إشعار التسليم/.test(l)).length >= 2, JSON.stringify(labels.filter((l) => /فوتر|أمر البيع|التسليم/.test(l))));
  rec.check('I01-11', 'Update Outstanding for Self is shown on a return', labels.some((l) => /الرصيد المستحق|المستحق/.test(l) && !/^المبلغ المستحق$/.test(l)), JSON.stringify(labels.filter((l) => /مستحق/.test(l))));
  rec.check('I01-12', 'Restore Redeemed Loyalty Points is hidden when the original did not redeem points', !labels.some((l) => /استعادة|استرجاع نقاط/.test(l)), '');
  rec.note('I01-13', 'buttons', JSON.stringify((await btnTexts(page)).slice(0, 14)));
});

test('I02 Debit Note (Is Rate Adjustment Entry)', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await toggle(page, 'قيد تعديل السعر (إشعار مدين)'); await wait(page, 1500);
  const src = await options(page, 'فاتورة المصدر');
  rec.note('I02-1', 'Source Invoice options', JSON.stringify(src.slice(0, 8)));
  rec.check('I02-2', 'Source Invoice lists the customer submitted invoices', src.length > 0, JSON.stringify(src));
  const labels = (await main(page).locator('label,.toggle-row-label').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim());
  rec.note('I02-3', 'labels with فاتورة', JSON.stringify(labels.filter((l) => /فاتورة/.test(l))));
  rec.check('I02-4', 'Is Return stays disabled when Debit Note is checked', (await toggleState(page, 'مرتجع (إشعار دائن)')).includes('disabled'), await toggleState(page, 'مرتجع (إشعار دائن)'));
});

test.skip('I03 Update Stock appears only when the setting is on (setting restored) - blocked by SI-43: Selling Settings cannot be saved through the API', async ({ page }) => {
  const key = 'custom_allow_update_stock_in_sales_invoice';
  const before = (await get('Selling Settings', 'Selling Settings')) as any; const orig = before?.[key] ?? before?.data?.[key] ?? 0;
  rec.note('I03-0', 'original value', String(orig));
  try {
    const r = await put('Selling Settings', 'Selling Settings', { [key]: 1 }); rec.note('I03-1', 'set to 1', r.ok + ' ' + r.msg);
    await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
    const labels = async () => (await main(page).locator('label,.toggle-row-label').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim());
    let l = await labels(); rec.note('I03-2', 'before adding an item', JSON.stringify(l.filter((x) => /مخزون|مستودع/.test(x))));
    rec.check('I03-3', 'Update Stock switch is shown when the setting is on', l.some((x) => /تحديث المخزون/.test(x)), JSON.stringify(l.filter((x) => /مخزون/.test(x))));
    await addItem(page, 'IND182210', '1', null); await wait(page, 3500);
    l = await labels(); const st = await toggleState(page, 'تحديث المخزون');
    rec.note('I03-4', 'Update Stock state with a stock item', st);
    rec.check('I03-5', 'Source Warehouse is shown while Update Stock is checked', st.startsWith('on') ? l.some((x) => /مستودع المصدر/.test(x)) : true, JSON.stringify(l.filter((x) => /مستودع/.test(x))));
    if (st.startsWith('on') && !st.includes('disabled')) { await toggle(page, 'تحديث المخزون'); l = await labels(); rec.check('I03-6', 'Source Warehouse is hidden after unchecking Update Stock', !l.some((x) => /مستودع المصدر/.test(x)), JSON.stringify(l.filter((x) => /مستودع/.test(x)))); }
    await page.screenshot({ path: 'Shamel/si8-i-updatestock.png' });
  } finally {
    const r2 = await put('Selling Settings', 'Selling Settings', { [key]: orig }); rec.note('I03-9', 'restored to ' + orig, r2.ok + ' ' + r2.msg);
  }
});
