import { test, type Page } from '@playwright/test';
import { main, press, wait, recorder, messages, submittedInvoice, cancelInvoice } from './helpers/si-ui';

test.describe.configure({ timeout: 400_000 });
test.use({ viewport: { width: 1500, height: 2200 }, actionTimeout: 15_000 });
const rec = recorder('h-list');
const bar = (p: Page) => main(p).locator('button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => (e.innerText || e.title || '').replace(/\s+/g, ' ').trim()).filter(Boolean));
async function openList(page: Page) { await page.goto('about:blank'); await page.goto('/desk/shamel#/accounting/sales-invoices', { timeout: 100_000 }); await main(page).locator('table tbody tr').first().waitFor({ timeout: 60_000 }); await wait(page, 2500); }
/** Select the row of one invoice (it is on the first page because it was just created or changed). */
async function selectById(page: Page, id: string) {
  await openList(page);
  const row = main(page).locator('table tbody tr').filter({ hasText: new RegExp(id + '(?!-)') }).first();
  if (!(await row.count())) return false;
  await press(row.locator('input[type=checkbox]').first()); await wait(page, 1000); return true;
}
let SUBMITTED = '';

test('H01 list columns and statuses', async ({ page }) => {
  await openList(page);
  const heads = (await main(page).locator('table thead th').allInnerTexts()).map((s) => s.trim());
  rec.note('H01-1', 'headers', JSON.stringify(heads));
  for (const h of ['رقم المعرف', 'حالة الفاتورة', 'حالة الائتمان', 'حالة الاسترداد', 'اسم العميل', 'تاريخ الترحيل', 'تاريخ الاستحقاق', 'الإجمالي']) rec.check('H01-col-' + h, `column "${h}" exists`, heads.includes(h), JSON.stringify(heads));
  rec.check('H01-2', 'Add Sales Invoice button exists', (await bar(page)).includes('إضافة فاتورة مبيعات'), '');
  const rows = await main(page).locator('table tbody tr').evaluateAll((trs: any[]) => trs.map((r) => r.innerText.replace(/\s+/g, ' ')));
  rec.check('H01-3', 'Grand Total is shown with a currency', rows.every((r: string) => /\d,?\d*\.\d\d/.test(r)), rows[0]);
  const st = new Set(await main(page).locator('table tbody tr .status-chip, table tbody tr [class*=status]').allInnerTexts());
  rec.note('H01-4', 'statuses seen', JSON.stringify([...st]));
  const allowed = ['مسودة', 'غير مدفوعة', 'مدفوعة جزئيا', 'مدفوعة جزئياً', 'مدفوعة بالكامل', 'متأخرة', 'مرتجع', 'مرتجعة بالكامل', 'معلقة', 'مغلقة', 'ملغي', 'ملغاة', 'غير منطبق', 'بدون رصيد', 'بدون استرداد', 'رصيد جزئي', 'رصيد كامل', 'مسترد جزئيا', 'مسترد بالكامل', 'مدفوعة', 'إشعار دائن'];
  rec.check('H01-5', 'every status text is one of the SRS statuses', [...st].every((s) => allowed.includes(s)), JSON.stringify([...st].filter((s) => !allowed.includes(s))));
});

test('H02 action bar depends on the invoice status', async ({ page }) => {
  SUBMITTED = await submittedInvoice(page); const toCancel = await submittedInvoice(page); await cancelInvoice(page, toCancel);
  const cases: [string, string, { has: string[]; not: string[] }][] = [
    ['draft', '', { has: ['اعتماد', 'حذف', 'تعديل', 'تصدير', 'طباعة', 'اسناد', 'إضافة وسوم'], not: ['إلغاء'] }],
    ['submitted', SUBMITTED, { has: ['إلغاء', 'تعديل', 'تصدير', 'طباعة'], not: ['اعتماد', 'حذف'] }],
    ['cancelled', toCancel, { has: ['حذف', 'تعديل', 'تصدير', 'طباعة'], not: ['اعتماد', 'إلغاء'] }],
  ];
  for (const [name, status, want] of cases) {
    let found = false; if (name === 'draft') { await openList(page); const row = main(page).locator('table tbody tr').filter({ has: page.locator('.status-chip', { hasText: /^s*مسودةs*$/ }) }).first(); if (await row.count()) { await press(row.locator('input[type=checkbox]').first()); await wait(page, 1000); found = true; } } else found = await selectById(page, status);
    rec.check('H02-' + name + '-row', `a ${name} invoice exists in the list`, found, status);
    if (!found) continue;
    const b = await bar(page); rec.note('H02-' + name, `bulk bar for ${name}`, JSON.stringify(b.slice(10)));
    for (const w of want.has) rec.check(`H02-${name}-has-${w}`, `${name}: "${w}" is offered`, b.includes(w), JSON.stringify(b.slice(10)));
    for (const w of want.not) rec.check(`H02-${name}-not-${w}`, `${name}: "${w}" is not offered`, !b.includes(w), JSON.stringify(b.slice(10)), name === 'submitted' && w === 'حذف' ? 'SI-03' : '');
  }
});

test('H03 bulk Edit refuses a submitted invoice', async ({ page }) => {
  if (!SUBMITTED) SUBMITTED = await submittedInvoice(page);
  const found = await selectById(page, SUBMITTED);
  rec.check('H03-0', 'a submitted invoice exists in the list', found, '');
  if (!found) return;
  await press(main(page).getByRole('button', { name: 'تعديل', exact: true }).first()); await wait(page, 3000);
  const msgs = await messages(page); rec.note('H03-1', 'result of Edit on a submitted invoice', JSON.stringify(msgs));
  rec.check('H03-2', 'Edit on a submitted invoice is refused with "لا يمكن تعديل فاتورة مبيعات معتمدة أو ملغاة"', msgs.some((x) => /لا يمكن تعديل فاتورة مبيعات معتمدة أو ملغاة/.test(x)), JSON.stringify(msgs));
});
