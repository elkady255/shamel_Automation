import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 600_000 });
test.use({ viewport: { width: 1500, height: 2400 }, actionTimeout: 15_000 });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so5-fill.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const anyMsg = (p: Page) => p.evaluate(() => [...document.querySelectorAll('body *')].filter((e: any) => e.children.length === 0 && e.offsetParent && /تعذّر|يرجى|الرجاء|مطلوب|خطأ|Error|required|تم/i.test(e.innerText || '')).map((e: any) => e.innerText.trim().slice(0, 160)));

test('so fill whole form', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const box = (label: string) => main(page).locator('label').filter({ hasText: new RegExp('^\\s*' + esc(label) + '\\s*\\*?\\s*$') }).first().locator('xpath=ancestor::div[.//input or .//textarea][1]');
  const step = async (name: string, fn: () => Promise<any>) => { try { const r = await fn(); log('OK   ' + name + (r !== undefined ? ' -> ' + JSON.stringify(r) : '')); } catch (e: any) { log('FAIL ' + name + ' :: ' + String(e.message).split('\n')[0].slice(0, 150)); } };
  const combo = async (label: string, q: string, nth = 0) => {
    const f = box(label).locator('input').first(); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(1800);
    const opts = await page.locator('.cs-option:visible').allInnerTexts();
    if (!opts.length) throw new Error('no options');
    await press(page.locator('.cs-option:visible').nth(nth)); await page.waitForTimeout(1500);
    return { picked: opts[nth].replace(/\s+/g, ' ').slice(0, 60), n: opts.length, val: await f.inputValue() };
  };
  const date = async (label: string, day: string) => {
    const f = box(label).locator('input:visible').first(); await f.click({ force: true }); await page.waitForTimeout(800);
    await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: new RegExp('^' + day + '$') }).first().click(); await page.waitForTimeout(1000);
    return await f.inputValue();
  };
  const tog = async (label: string) => { const r = main(page).locator('.toggle-row').filter({ hasText: label }).first(); await r.locator('.is-switch-slider').click(); await page.waitForTimeout(800); return await r.locator('input[type=checkbox]').isChecked(); };
  const text = async (label: string, v: string) => { const f = box(label).locator('input,textarea').first(); await f.fill(v); await f.press('Tab'); return await f.inputValue(); };
  const tab = async (n: string) => { await press(main(page).getByRole('button', { name: n, exact: true })); await page.waitForTimeout(2000); };

  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', LOAD); await page.waitForTimeout(9000);

  // ===== Tab 1: Details
  await step('customer', () => combo('العميل', 'PW Test'));
  await step('series (default)', async () => await box('التسلسل').locator('input').first().inputValue());
  await step('date', () => date('التاريخ', '18'));
  await step('delivery date', () => date('تاريخ التسليم', '28'));
  await step('skip DN toggle', () => tog('تخطي إشعار التسليم'));
  await step('cost center', () => combo('مركز التكلفة', ''));
  await step('project', () => combo('المشروع', ''));
  await step('currency', () => combo('العملة', 'SAR'));
  await step('exchange rate', () => text('سعر الصرف', '1'));
  await step('price list', () => combo('قائمة الأسعار', 'Standard Selling'));
  await step('ignore pricing rule', () => tog('تجاهل قاعدة التسعير'));
  await step('source warehouse', () => combo('مستودع المصدر', ''));
  await step('reserve stock', () => tog('حجز المخزون'));
  await step('barcode field', () => text('الباركود', '0000000000'));
  await page.screenshot({ path: 'Shamel/so5-1.png', fullPage: true });

  // items
  await step('add item row', async () => { await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await page.waitForTimeout(2000); return await main(page).locator('table tbody tr').count(); });
  const row = main(page).locator('table tbody tr').first();
  await step('item code', async () => { const ic = row.getByPlaceholder('ابحث واختر').first(); await ic.click(); await ic.fill('IND182210'); await page.waitForTimeout(2000); await press(page.locator('.cs-option:visible').first()); await page.waitForTimeout(2500); return await ic.inputValue(); });
  await step('qty', async () => { const q = row.locator('input[type=number]').first(); await q.fill('3'); await q.press('Tab'); await page.waitForTimeout(1200); return await q.inputValue(); });
  await step('rate', async () => { const r = row.locator('input[type=number]').nth(1); await r.fill('10500'); await r.press('Tab'); await page.waitForTimeout(1500); return await r.inputValue(); });
  await step('row inputs', async () => await row.locator('input').evaluateAll((els: any[]) => els.map((e) => e.type + ':' + e.value)));
  await step('row edit popup open', async () => { await press(row.locator('[title="تعديل الصف"]').first()); await page.waitForTimeout(2500); return (await page.locator('.qr-overlay').first().innerText()).replace(/\n+/g, ' | ').slice(0, 1500); });
  await step('row edit popup controls', async () => await page.locator('.qr-overlay').first().locator('input,textarea,select').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e, i) => [i, e.type, e.placeholder || '', (e.value || '').slice(0, 20), (e.closest('label')?.innerText || e.parentElement?.parentElement?.querySelector('label')?.innerText || '').slice(0, 30)].join('~'))));
  await page.screenshot({ path: 'Shamel/so5-rowedit.png' });
  const pop = () => page.locator('.qr-overlay').first();
  const pin = (i: number) => pop().locator('input:visible,textarea:visible').nth(i);
  await step('popup description', async () => { await pin(4).fill('وصف تفصيلي للصنف - اختبار'); return await pin(4).inputValue(); });
  await step('popup margin type', async () => { const f = pin(7); await f.click(); await page.waitForTimeout(1500); const o = await page.locator('.cs-option:visible, [role=option]:visible').allInnerTexts(); if (!o.length) throw new Error('no options'); await press(page.locator('.cs-option:visible, [role=option]:visible').first()); await page.waitForTimeout(1000); return { o, v: await f.inputValue() }; });
  await step('popup page break toggle', async () => { await press(pin(15)); return await pin(15).isChecked(); });
  await step('popup supplier delivers toggle', async () => { await press(pin(9)); return await pin(9).isChecked(); });
  await step('popup project', async () => { const f = pin(14); await f.click(); await page.waitForTimeout(1500); const o = await page.locator('.cs-option:visible').allInnerTexts(); if (!o.length) throw new Error('no options'); await press(page.locator('.cs-option:visible').first()); await page.waitForTimeout(800); return { n: o.length, v: await f.inputValue() }; });
  await step('popup state', async () => await pop().locator('input:visible,textarea:visible').evaluateAll((els: any[]) => els.map((e: any, i) => i + ':' + e.type + ':' + (e.type === 'checkbox' ? e.checked : (e.value || '').slice(0, 25)))));
  await page.screenshot({ path: 'Shamel/so5-rowedit2.png' });
  await step('row edit popup close', async () => { const b = page.locator('.qr-overlay').first().getByRole('button').filter({ hasText: /تطبيق|حفظ|إغلاق|إلغاء|موافق|اعتماد/ }); log('  popup buttons ' + JSON.stringify(await b.allInnerTexts())); await press(b.first()); await page.waitForTimeout(1500); });

  // taxes + discount
  await step('shipping rule', () => combo('قاعدة الشحن', ''));
  await step('tax template', () => combo('قالب الضرائب والرسوم', ''));
  await step('tax rows after template', async () => await main(page).locator('table').last().locator('tbody tr').count());
  await step('apply discount on', () => combo('تطبيق الخصم الإضافي على', ''));
  await step('discount %', () => text('نسبة الخصم الإضافي', '5'));
  await step('discount amount', async () => await box('قيمة الخصم الإضافي (العملة)').locator('input').first().inputValue());
  // coupon skipped this run: the first listed code (Inf Discount) is expired and the server rejects it on save (tested in run 3)
  await step('totals text', async () => (await main(page).innerText()).split('ملخص البنود')[1]?.replace(/\n+/g, ' | ').slice(0, 700));
  await page.screenshot({ path: 'Shamel/so5-2.png', fullPage: true });

  // ===== Tab 2: General info
  await tab('المعلومات العامة');
  await step('billing address', () => combo('العنوان', ''));
  await step('billing contact', () => combo('جهة الاتصال', ''));
  await step('shipping address', () => combo('عنوان الشحن', '', 0));
  await step('company address', () => combo('عنوان الشركة', ''));
  await step('payment terms template', () => combo('قالب شروط الدفع', ''));
  await step('payment rows (from template)', async () => await main(page).locator('table:visible tbody tr').evaluateAll((trs: any[]) => trs.map((t) => [...t.querySelectorAll('input')].map((e: any) => e.type + ':' + e.placeholder + ':' + e.value).join(' ; '))));
  await step('payment due dates', async () => {
    const ds = main(page).locator('table:visible input.flatpickr-input:visible, table:visible input[placeholder="اختر التاريخ"]:visible'); const n = await ds.count(); const out: string[] = [];
    for (let i = 0; i < n; i++) { const f = ds.nth(i); if (await f.inputValue()) continue; await f.click({ force: true }); await page.waitForTimeout(700); await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: /^28$/ }).first().click(); await page.waitForTimeout(700); out.push(await f.inputValue()); }
    return { n, filled: out };
  });
  await step('payment rows after', async () => await main(page).locator('table:visible tbody tr').evaluateAll((trs: any[]) => trs.map((t) => [...t.querySelectorAll('input')].map((e: any) => e.value).join(' ; '))));
  await step('terms template', () => combo('الشروط', ''));
  await step('terms text', async () => { const t = main(page).locator('textarea').first(); await t.fill('شروط اختبار: الدفع خلال 30 يوم'); return await t.inputValue(); });
  await page.screenshot({ path: 'Shamel/so5-3.png', fullPage: true });

  // ===== Tab 3: Additional info
  await tab('معلومات إضافية');
  await step('territory', async () => {
    const f = main(page).locator('.so-field').filter({ has: page.locator('label.cd-label', { hasText: /^المنطقة$/ }) }).first();
    await press(f.locator('.msc').first()); await page.waitForTimeout(2500);
    log('  territory html after click: ' + (await f.innerHTML()).replace(/data-v-\w+=""/g, '').slice(0, 900));
    await page.screenshot({ path: 'Shamel/so5-terr.png' });
    const cand = page.locator('.cs-option:visible, [role=option]:visible, .msc-option:visible, .msc li:visible');
    const opts = await cand.allInnerTexts(); if (!opts.length) throw new Error('no options after clicking the field');
    await press(cand.first()); await page.waitForTimeout(1200); return { picked: opts[0], n: opts.length, now: (await f.innerText()).replace(/\s+/g, ' ') };
  });
  await step('customer PO', () => text('أمر شراء العميل', 'PO-TEST-001'));
  await step('customer PO date', () => date('تاريخ أمر شراء العميل', '10'));
  await step('letter head', () => combo('رأس الصفحة', ''));
  await step('print without amount', () => tog('الطباعة بدون المبالغ'));
  await step('group same items', () => tog('تجميع الأصناف المتشابهة'));
  await page.screenshot({ path: 'Shamel/so5-4.png', fullPage: true });

  // ===== Save
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await page.waitForTimeout(800);
  log('SAVE @0.8s ' + JSON.stringify(await anyMsg(page))); await page.waitForTimeout(6000);
  log('SAVE @7s ' + JSON.stringify(await anyMsg(page)) + ' url ' + page.url());
  log('MODAL ' + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.modal.show,.base-modal')].filter((e: any) => e.offsetWidth > 0).map((e: any) => e.innerText.replace(/\s+/g, ' ').slice(0, 800)))));
  await page.screenshot({ path: 'Shamel/so5-save.png', fullPage: true });
});
