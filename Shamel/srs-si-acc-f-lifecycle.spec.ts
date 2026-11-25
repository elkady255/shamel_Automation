import { test, type Page } from '@playwright/test';
import { openNew, openDoc, tab, combo, options, box, value, save, messages, closeModal, addItem, main, press, wait, recorder, summary, num, setText, toggle, pickDate, isNew, docName, snapshot, diffSnap } from './helpers/si-ui';

test.describe.configure({ timeout: 600_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('f-lifecycle');
const btnTexts = (p: Page) => main(p).locator('button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => (e.innerText || e.title || e.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()).filter((s) => s && !/إشعار|تحديد|^الكل$|مقروء/.test(s)));
const statusChip = async (p: Page) => (await main(p).locator('.status-chip, [class*=status]').first().innerText().catch(() => '')).replace(/\s+/g, ' ').trim();

async function makeRich(page: Page) {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', '2', null); await wait(page, 4000);
  const r1 = main(page).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1); await r1.fill('1000'); await r1.press('Tab'); await wait(page, 1200);
  await combo(page, 'قالب الضرائب والرسوم', 'a - E'); await wait(page, 2000);
  await combo(page, 'مركز التكلفة', ''); await combo(page, 'المشروع', '');
  await toggle(page, 'تجاهل قاعدة التسعير');
  await tab(page, 'المعلومات العامة');
  await combo(page, 'قالب شروط الدفع', 'test'); await wait(page, 1500);
  const t = await options(page, 'الشروط'); if (t.length) await combo(page, 'الشروط', t[0].split(' ')[0]);
  await wait(page, 1500);
  await tab(page, 'معلومات إضافية');
  await combo(page, 'رأس الصفحة', ''); await toggle(page, 'الطباعة بدون المبالغ'); await toggle(page, 'تجميع الأصناف المتشابهة');
  await setText(page, 'أمر شراء العميل', 'PO-QA-01'); await pickDate(page, 'تاريخ أمر شراء العميل', '10');
  await tab(page, 'التفاصيل');
}
const allTabs = async (p: Page) => { const o: Record<string, string> = {}; for (const t of ['التفاصيل', 'المعلومات العامة', 'معلومات إضافية'] as const) { await tab(p, t); const s = await snapshot(p); for (const [k, v] of Object.entries(s)) o[t[0] + ':' + k] = v; } return o; };

test('F01 save a full invoice and reopen it: every value is kept', async ({ page }) => {
  await makeRich(page);
  const before = await allTabs(page);
  rec.note('F01-0', 'fields captured before save', String(Object.keys(before).length));
  await tab(page, 'التفاصيل');
  const s = await save(page, 10000); rec.note('F01-1', 'save', JSON.stringify(s.msgs) + ' ' + s.url);
  rec.check('F01-2', 'the invoice is created and the URL changes to its ID', !isNew(s.url), s.url);
  if (isNew(s.url)) return;
  const name = docName(s.url); rec.note('F01-3', 'document id', name);
  rec.check('F01-4', 'ID follows the series ACC-SINV-YYYY-#####', /^ACC-SINV-\d{4}-\d{5}$/.test(name), name);
  await openDoc(page, name);
  const after = await allTabs(page);
  const d = diffSnap(before, after);
  rec.note('F01-5', 'fields that changed after reload', JSON.stringify(d));
  rec.check('F01-6', 'all entered values are kept after save and reload', d.length === 0, JSON.stringify(d), '');
  await tab(page, 'معلومات إضافية');
  rec.note('F01-7', 'statuses of a draft', JSON.stringify(Object.entries(await snapshot(page)).filter(([k]) => /حالة|مبلغ|الحساب المدين|قيد افتتاحي|الدائن/.test(k))));
  const st = await snapshot(page);
  rec.check('F01-8', 'Invoice Status shows Draft', /مسودة/.test(st['حالة الفاتورة'] || ''), st['حالة الفاتورة']);
  rec.check('F01-9', 'Credit Status and Refund Status show Not Applicable on a draft', /غير منطبق|لا ينطبق/.test(st['حالة الائتمان'] || '') && /غير منطبق|لا ينطبق/.test(st['حالة الاسترداد'] || ''), (st['حالة الائتمان'] || '') + ' / ' + (st['حالة الاسترداد'] || ''));
  const b = await btnTexts(page); rec.note('F01-10', 'draft buttons', JSON.stringify(b));
  rec.check('F01-11', 'a draft shows the Submit button', b.some((x) => /^اعتماد$/.test(x)), JSON.stringify(b));
  rec.check('F01-12', 'Hold / Resume / Close / Re-open are hidden (the SRS marks them Hidden)', !b.some((x) => /^(تعليق|استئناف|إغلاق|إعادة فتح)$/.test(x)), JSON.stringify(b));
  rec.check('F01-13', 'the Create menu is not shown on a draft', !b.some((x) => /^إنشاء$/.test(x)), JSON.stringify(b));
  rec.note('F01-14', 'doc id for next tests', name);
});

test('F02 submit, read-only after submit, statuses', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', '1', null); await wait(page, 4000);
  const r1 = main(page).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1); await r1.fill('2000'); await r1.press('Tab'); await wait(page, 1200);
  const s = await save(page, 10000); if (isNew(s.url)) { rec.check('F02-0', 'invoice saved before submit', false, JSON.stringify(s.msgs)); return; }
  const name = docName(s.url); rec.note('F02-1', 'draft saved', name); await wait(page, 2500);
  await press(main(page).getByRole('button', { name: 'اعتماد', exact: true })); await wait(page, 5000);
  const m = await messages(page); rec.note('F02-2', 'messages after Submit', JSON.stringify(m));
  const confirm = page.locator('.modal.show .btn-modal-primary, .base-modal:visible button').filter({ hasText: /إرسال|نعم|تأكيد/ }).first();
  if (await confirm.count()) { rec.note('F02-3', 'a confirmation dialog appeared', 'yes'); await press(confirm); await wait(page, 7000); }
  await openDoc(page, name);
  const b = await btnTexts(page); rec.note('F02-4', 'buttons after submit', JSON.stringify(b));
  const st = await (async () => { await tab(page, 'معلومات إضافية'); return snapshot(page); })();
  rec.note('F02-5', 'status block', JSON.stringify(Object.entries(st).filter(([k]) => /حالة|مبلغ|الحساب المدين|قيد افتتاحي|الدائن|مقابل/.test(k))));
  rec.check('F02-6', 'Invoice Status = Unpaid after submit', /غير مدفوعة|غير مسددة|Unpaid/.test(st['حالة الفاتورة'] || ''), st['حالة الفاتورة']);
  rec.check('F02-7', 'Credit Status = No Credit', /لا يوجد ائتمان|بدون ائتمان|بدون رصيد|No Credit/.test(st['حالة الائتمان'] || ''), st['حالة الائتمان']);
  rec.check('F02-8', 'Refund Status = No Refund', /لا يوجد استرداد|بدون استرداد|No Refund/.test(st['حالة الاسترداد'] || ''), st['حالة الاسترداد']);
  rec.check('F02-9', 'Debit To shows the receivable account', !!st['الحساب المدين'] && st['الحساب المدين'] !== '—', st['الحساب المدين']);
  rec.check('F02-10', 'Against Income Account is filled', !!st['مقابل حساب الإيرادات'] && !/إنشاؤه/.test(st['مقابل حساب الإيرادات']), st['مقابل حساب الإيرادات']);
  await tab(page, 'التفاصيل');
  rec.check('F02-11', 'after submit the fields are read-only (no editable inputs)', (await main(page).locator('input:not([type=hidden]):not([type=checkbox]):not([disabled]):not([readonly])').count()) <= 1, String(await main(page).locator('input:not([type=hidden]):not([type=checkbox]):not([disabled]):not([readonly])').count()));
  rec.check('F02-12', 'Save button is gone after submit', !b.some((x) => /^حفظ$/.test(x)), JSON.stringify(b));
  rec.check('F02-13', 'Cancel / Create / Print are available', b.some((x) => /إلغاء المستند|^إلغاء$/.test(x)) && b.some((x) => /^إنشاء$/.test(x)), JSON.stringify(b));
  rec.check('F02-14', 'Delete is not offered on a submitted invoice', !b.includes('حذف'), JSON.stringify(b.slice(0, 12)), 'SI-03');
  rec.note('F02-15', 'submitted doc', name);
});

async function submittedInvoice(page: Page, rate = '3000') {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', '1', null); await wait(page, 4000);
  const r1 = main(page).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1); await r1.fill(rate); await r1.press('Tab'); await wait(page, 1200);
  const s = await save(page, 10000); if (isNew(s.url)) throw new Error('save failed ' + JSON.stringify(s.msgs));
  const name = docName(s.url); await wait(page, 2500);
  await press(main(page).getByRole('button', { name: 'اعتماد', exact: true })); await wait(page, 4000);
  const ok = page.locator('.modal.show .btn-modal-primary, .base-modal:visible button').filter({ hasText: /إرسال|نعم|تأكيد/ }).first();
  if (await ok.count()) { await press(ok); await wait(page, 7000); }
  await openDoc(page, name); return name;
}

test('F03 Create menu of a submitted invoice', async ({ page }) => {
  const name = 'ACC-SINV-2026-02830';
  await openDoc(page, name);
  await press(main(page).getByRole('button', { name: 'إنشاء', exact: true }).first()); await wait(page, 1200);
  const items = (await page.locator('.cd-action-menu.open').first().innerText().catch(() => '')).split('\n').map((s) => s.trim()).filter(Boolean);
  rec.note('F03-1', 'Create menu items', JSON.stringify(items));
  rec.check('F03-2', 'Create has Return / Credit Note', items.some((x) => /مرتجع|إشعار دائن/.test(x)), JSON.stringify(items));
  rec.check('F03-3', 'Create has Delivery Note', items.some((x) => /إشعار التسليم|إذن التسليم/.test(x)), JSON.stringify(items));
  rec.check('F03-4', 'Create has Payment', items.some((x) => /دفعة|سند دفع|الدفع/.test(x)), JSON.stringify(items));
  rec.check('F03-5', 'Maintenance Schedule is hidden (the SRS marks it Hidden)', !items.some((x) => /الصيانة/.test(x)), JSON.stringify(items), 'SI-38');
  const pay = page.locator('.cd-action-menu *').filter({ hasText: /^\s*(دفعة|سند دفع|الدفع|دفع)\s*$/ }).first();
  if (await pay.count()) { await press(pay); await wait(page, 5000); rec.note('F03-6', 'after Payment click: url', page.url()); rec.note('F03-7', 'page title', (await main(page).innerText()).replace(/\s+/g, ' ').slice(0, 160)); rec.note('F03-8', 'popup/messages', JSON.stringify(await messages(page))); }
});

test('F04 cancel, amend and delete rules', async ({ page }) => {
  const name = await submittedInvoice(page); rec.note('F04-0', 'submitted for cancel test', name);
  await press(main(page).getByRole('button', { name: 'إلغاء المستند', exact: true }).first()); await wait(page, 3000);
  rec.note('F04-1', 'messages/dialog after Cancel Document', JSON.stringify(await messages(page)));
  const ok = page.locator('.modal.show .btn-modal-primary, .base-modal:visible button').filter({ hasText: /نعم|تأكيد|إلغاء المستند|إرسال/ }).first();
  if (await ok.count()) { rec.note('F04-2', 'confirmation button', (await ok.innerText()).trim()); await press(ok); await wait(page, 6000); }
  await openDoc(page, name);
  const b = await btnTexts(page); rec.note('F04-3', 'buttons after cancel', JSON.stringify(b.slice(0, 16)));
  rec.note('F04-4', 'chip', await statusChip(page));
  await tab(page, 'معلومات إضافية'); const st = await snapshot(page);
  rec.check('F04-5', 'Invoice Status = Cancelled', /ملغ/.test(st['حالة الفاتورة'] || ''), st['حالة الفاتورة']);
  rec.check('F04-6', 'Amend button replaces Cancel', b.some((x) => /^تعديل$/.test(x)), JSON.stringify(b.slice(0, 16)));
  rec.check('F04-7', 'Delete is offered on a cancelled invoice', b.includes('حذف'), '');
  rec.check('F04-8', 'Create menu is gone after cancel', !b.includes('إنشاء'), '');
  const am = main(page).getByRole('button', { name: 'تعديل', exact: true }).first();
  if (await am.count()) {
    await press(am); await wait(page, 7000); rec.note('F04-9', 'after Amend url', page.url());
    const nn = docName(page.url()); rec.check('F04-10', 'Amend creates a new draft named <id>-1', nn === name + '-1', nn);
    await tab(page, 'التفاصيل'); const s2 = await snapshot(page);
    rec.check('F04-11', 'Amended From shows the original invoice', Object.values(s2).some((v) => v.includes(name)) || Object.keys(s2).some((k) => /معدل من/.test(k)), JSON.stringify(Object.entries(s2).filter(([k]) => /معدل/.test(k))));
    const b2 = await btnTexts(page); rec.check('F04-12', 'the amended document is a Draft with Submit', b2.some((x) => /^اعتماد$/.test(x)), JSON.stringify(b2.slice(0, 12)));
  }
});

test('F05 delete dialog on a draft (cancelled, nothing deleted)', async ({ page }) => {
  await openDoc(page, 'ACC-SINV-2026-02829');
  const del = main(page).locator('button[data-action="delete"]').first();
  rec.check('F05-1', 'Delete is offered on a draft', (await del.count()) > 0, '');
  if (await del.count()) {
    await press(del); await page.locator('.shamel-confirm-overlay.is-visible').first().waitFor({ timeout: 10_000 }).catch(() => {}); await wait(page, 800);
    const txt = (await page.evaluate(() => [...document.querySelectorAll('.shamel-confirm-content')].map((e: any) => e.innerText || '').join(' '))).replace(/\s+/g, ' ');
    rec.note('F05-2', 'delete confirmation text', txt);
    rec.check('F05-3', 'a confirmation message asks whether to delete', /هل|متأكد|تأكيد/.test(txt), txt);
    const no = page.locator('.shamel-confirm-actions button').filter({ hasText: /^\s*إلغاء\s*$/ }).first();
    if (await no.count()) await press(no); else await closeModal(page);
    await wait(page, 1000); rec.note('F05-4', 'still on the document', page.url());
  }
});
