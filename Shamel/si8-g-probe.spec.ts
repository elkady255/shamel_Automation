import { test, type Page } from '@playwright/test';
import { openNew, openDoc, combo, main, press, wait, recorder, messages, closeModal } from './helpers/si-ui';
test.describe.configure({ timeout: 500_000 });
test.use({ viewport: { width: 1500, height: 2200 }, actionTimeout: 15_000 });
const rec = recorder('g-probe');
const overlays = (p: Page) => p.evaluate(() => [...document.querySelectorAll('[class*=overlay],.modal.show,.base-modal,[role=dialog]')].filter((e: any) => e.offsetParent || getComputedStyle(e).position === 'fixed').map((e: any) => ({ cls: e.className, text: (e.innerText || '').replace(/\s+/g, ' ').slice(0, 700) })));

test('G1 Get Items From menu and popups', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await press(main(page).getByRole('button', { name: 'جلب الأصناف من', exact: true }).first()); await wait(page, 1500);
  const menu = await page.evaluate(() => [...document.querySelectorAll('.cd-action-menu')].filter((e: any) => e.offsetParent && getComputedStyle(e).display !== 'none').map((e: any) => (e.innerText || '').replace(/\n+/g, ' | ')));
  rec.note('G1-1', 'Get Items From menu items', JSON.stringify(menu));
  for (const label of ['أمر البيع', 'عرض السعر', 'إذن التسليم']) {
    const item = page.locator('.cd-action-menu.open *').filter({ hasText: new RegExp('^\s*' + label + '\s*$') }).first();
    if (!(await item.count())) { rec.note('G1-' + label, 'menu item missing', ''); await press(main(page).getByRole('button', { name: 'جلب الأصناف من', exact: true }).first()).catch(() => {}); continue; }
    await press(item); await wait(page, 3500);
    const ov = await overlays(page); rec.note('G1-' + label, 'popup for ' + label, JSON.stringify(ov.map((o) => o.cls + ' :: ' + o.text)));
    const rowsN = await page.locator('[class*=overlay] table tbody tr, .base-modal table tbody tr').count();
    rec.note('G1-' + label + '-rows', 'rows in popup', String(rowsN));
    rec.note('G1-' + label + '-headers', 'headers', JSON.stringify(await page.locator('[class*=overlay] table thead th, .base-modal table thead th').allInnerTexts()));
    await page.screenshot({ path: `Shamel/si8-g-${label}.png` });
    await page.keyboard.press('Escape'); await closeModal(page);
    const x = page.locator('[class*=overlay] button[title*="إغلاق"], [class*=overlay] .close, [class*=overlay] button').filter({ hasText: /إغلاق|إلغاء|×/ }).first();
    if (await x.count()) await press(x).catch(() => {});
    await wait(page, 800);
    await press(main(page).getByRole('button', { name: 'جلب الأصناف من', exact: true }).first()); await wait(page, 1000);
  }
});

test('G2 Quality inspection button and View menu', async ({ page }) => {
  await openNew(page);
  const qi = main(page).getByRole('button', { name: 'إنشاء فحص جودة', exact: true }).first();
  rec.note('G2-1', 'create quality inspection disabled?', String(await qi.isDisabled().catch(() => 'n/a')) + ' | ' + (await qi.getAttribute('class')));
  await openDoc(page, 'ACC-SINV-2026-02830');
  await press(main(page).getByRole('button', { name: 'عرض', exact: true }).first()); await wait(page, 1000);
  rec.note('G2-2', 'View menu on a no-stock invoice', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.cd-action-menu.open')].map((e: any) => (e.innerText || '').replace(/\n+/g, ' | ')))));
});

test('G3 list screen', async ({ page }) => {
  await page.goto('about:blank'); await page.goto('/desk/shamel#/accounting/sales-invoices', { timeout: 100_000 }); await wait(page, 9000);
  rec.note('H1-1', 'list headers', JSON.stringify(await main(page).locator('table thead th').allInnerTexts()));
  rec.note('H1-2', 'row count', String(await main(page).locator('table tbody tr').count()));
  rec.note('H1-3', 'first rows', JSON.stringify((await main(page).locator('table tbody tr').evaluateAll((trs: any[]) => trs.slice(0, 5).map((r) => r.innerText.replace(/\s+/g, ' ').slice(0, 220))))));
  rec.note('H1-4', 'top buttons', JSON.stringify(await main(page).locator('button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => (e.innerText || e.title || '').replace(/\s+/g, ' ').trim()).filter((s) => s && !/إشعار|تحديد|^الكل$|مقروء/.test(s)).slice(0, 24))));
  rec.note('H1-5', 'statuses on page', JSON.stringify([...new Set(await main(page).locator('table tbody tr .status-chip, table tbody tr [class*=status]').allInnerTexts())]));
  await press(main(page).locator('table tbody tr input[type=checkbox]').first()); await wait(page, 1200);
  rec.note('H1-6', 'bulk bar after selecting a row', JSON.stringify(await main(page).locator('button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => (e.innerText || e.title || '').replace(/\s+/g, ' ').trim()).filter((s) => s && !/إشعار|تحديد الإشعار|^الكل$|مقروء/.test(s)).slice(0, 30))));
  await page.screenshot({ path: 'Shamel/si8-h-list.png' });
});
