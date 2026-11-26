// Payment Entry - list, draft edit, More Info, submit, cancel, amend, delete, bulk actions (SRS p.325-327, 365-371).
// CHANGES DATA: only documents created by this file are edited, cancelled or deleted.
import { test, type Page, type Locator } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';
import { api, type Doc } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('pe-e-lifecycle');
test.use({ viewport: { width: 1500, height: 1500 }, actionTimeout: 20_000 });
test.describe.configure({ mode: 'default' });
test.setTimeout(560_000);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const click = async (l: Locator) => { await l.evaluate((e: any) => e.click(), undefined, { timeout: 10_000 }); }; // eslint-disable-line @typescript-eslint/no-explicit-any
const dialog = (p: Page) => p.locator('.base-modal:visible, .qr-dialog:visible, .modal.show, [role=dialog]:visible, [role=alertdialog]:visible, .shamel-confirm-dialog:visible');
const dialogText = async (p: Page) => (await dialog(p).allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim()).join(' || ');
const pe = (n: string) => api.get('Payment Entry', n);
const exists = async (n: string) => (await api.list('Payment Entry', [['name', '=', n]])).length === 1;
const gl = async (n: string, cancelled = 0) => api.list('GL Entry', [['voucher_no', '=', n], ['is_cancelled', '=', cancelled]], ['account', 'debit', 'credit'], 40);
const buttons = async (p: Page) => (await u.main(p).locator('button:visible, a.btn:visible').evaluateAll((bs: any[]) => bs.map((b) => b.innerText.trim() || b.title || b.getAttribute('aria-label') || ''))).filter(Boolean) as string[]; // eslint-disable-line @typescript-eslint/no-explicit-any
const has = (list: string[], name: string) => list.some((b) => b === name);
const openDoc = (p: Page, n: string) => u.open(p, `${u.LIST}/${n}`);
const tab = async (p: Page, name: string) => { await u.main(p).locator('button, a, [role=tab], li').filter({ hasText: new RegExp('^\\s*' + name + '\\s*\\d*\\s*$') }).last().click(); await wait(3000); };
/** Collects every message that flashes on screen from now on. */
async function watch(p: Page) {
  await p.evaluate(() => {
    const w = window as any; w.__qa = [] as string[]; w.__qaObs?.disconnect(); // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs = new MutationObserver((muts) => { for (const m of muts) for (const n of [...m.addedNodes, m.target] as any[]) { const t = (n.innerText ?? n.textContent ?? '').replace(/\s+/g, ' ').trim(); if (t && t.length < 300 && /بنجاح|خطأ|لا يمكن|تعذر|فشل/.test(t) && !w.__qa.includes(t)) w.__qa.push(t); } }); // eslint-disable-line @typescript-eslint/no-explicit-any
    w.__qaObs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true });
  });
}
const flashed = async (p: Page) => ((await p.evaluate(() => (window as any).__qa ?? []).catch(() => [])) as string[]).join(' | '); // eslint-disable-line @typescript-eslint/no-explicit-any
async function confirmYes(p: Page) {
  const yes = p.locator('.shamel-btn-confirm:visible').or(dialog(p).locator('button:visible').filter({ hasText: /^\s*(نعم|تأكيد|حذف|موافق|متابعة|إلغاء المستند|اعتماد)\s*(،.*)?$/ }));
  if (await yes.count()) { await yes.last().click(); await wait(8000); return true; }
  return false;
}
async function closeAll(p: Page) {
  for (let i = 0; i < 4 && (await dialog(p).count()); i++) { await dialog(p).last().locator('.shamel-btn-cancel, .btn-modal-close, .close-btn, button[aria-label="إغلاق"], button:has-text("إلغاء"), button:has-text("إغلاق"), button:has-text("لا")').first().click({ timeout: 5000 }).catch(() => {}); await wait(1200); }
}
/** Waits until the stored document reaches the status (server actions can take a while). */
async function settled(n: string, status: number) { for (let i = 0; i < 15 && (await pe(n)).docstatus !== status; i++) await wait(3000); }
/** A new draft created through the Add screen. */
async function draft(page: Page, paid = '10') {
  await f.fill(page, { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid });
  const s = await u.save(page);
  if (!/ACC-PAY/.test(s.name)) throw new Error(`draft not saved: ${s.msg} ${s.errors} ${s.body.slice(0, 300)}`);
  await u.closeModals(page); return s.name;
}
const submitted = async (page: Page, paid = '10') => { const n = await draft(page, paid); await openDoc(page, n); await f.submit(page); await u.closeModals(page); if ((await pe(n)).docstatus !== 1) throw new Error('not submitted ' + n); return n; };

test('E01 list screen', async ({ page }) => {
  const name = await draft(page, '11');
  await u.open(page, u.LIST);
  const head = (await u.main(page).locator('thead th:visible').allInnerTexts()).map((s) => s.trim()).filter(Boolean);
  rec.check('E01-1', 'List shows ID, Status, Payment Type, Posting Date and Paid Amount', ['رقم المعرف', 'الحالة', 'نوع الدفع', 'تاريخ الترحيل', 'المبلغ المدفوع'].every((h) => head.includes(h)), head.join(' | '));
  rec.note('E01-2', 'columns beyond the SRS', head.filter((h) => !['رقم المعرف', 'الحالة', 'نوع الدفع', 'تاريخ الترحيل', 'المبلغ المدفوع'].includes(h)).join(' | '));
  const row = u.main(page).locator('tbody tr').filter({ hasText: name });
  const text = (await row.first().innerText().catch(() => '')).replace(/\s+/g, ' ');
  rec.check('E01-3', 'A new draft is listed with status Draft, its type, date and amount', /مسودة/.test(text) && /استلام/.test(text) && /11\.00/.test(text), text);
  await row.first().getByText(name).click(); await wait(6000);
  rec.check('E01-4', 'Clicking the ID opens the details screen', page.url().includes(name), page.url());
  await u.open(page, u.LIST); await u.btn(page, 'إضافة قيد دفع').click(); await wait(5000);
  rec.check('E01-5', 'Add Payment Entry opens the add screen', /payment-entries\/new/.test(page.url()), page.url());
  await u.open(page, u.LIST); await u.main(page).locator('input[placeholder="البحث باستخدام الID"]').fill(name); await page.keyboard.press('Enter'); await wait(5000);
  const found = await u.main(page).locator('tbody tr').allInnerTexts();
  rec.check('E01-6', 'Search by ID returns that entry only', found.length === 1 && found[0].includes(name), `${found.length} rows`);
  d.remember('E01', name);
});

test('E02 edit a draft, preview and More Info', async ({ page }) => {
  const name = await draft(page, '120');
  await openDoc(page, name);
  let b = await buttons(page);
  rec.check('E02-1', 'Draft shows Preview, Submit and Delete, and no Ledger, Cancel or Amend', has(b, 'معاينة') && has(b, 'اعتماد') && has(b, 'حذف') && !has(b, 'دفتر الأستاذ') && !has(b, 'إلغاء') && !has(b, 'تعديل المستند'), b.join(' | '));
  rec.check('E02-2', 'Draft offers Assign, Tags, Attachment, Share and Print', ['تعيين إلى', 'الوسوم', 'المرفقات', 'مشاركة', 'طباعة'].every((x) => has(b, x)), b.join(' | '));
  await u.type(page, 'المبلغ المدفوع', '150'); await wait(3000); let s = await u.save(page); await u.closeModals(page);
  let doc = await pe(name);
  rec.check('E02-3', 'Editing the amount of a draft and saving updates the stored document', doc.paid_amount === 150 && doc.received_amount === 150 && doc.unallocated_amount === 150, `${doc.paid_amount} ${doc.received_amount} ${doc.unallocated_amount} ${s.msg} ${s.errors}`);
  await openDoc(page, name);
  rec.check('E02-4', 'The edited value is shown after reopening', (await u.fields(page))['المبلغ المدفوع'] === '150.00', (await u.fields(page))['المبلغ المدفوع']);
  await u.type(page, 'المبلغ المدفوع', ''); await wait(2000); s = await u.save(page);
  rec.check('E02-5', 'Clearing a mandatory field on a draft is refused with a field error', (await pe(name)).paid_amount === 150 && (s.errors.length > 0 || s.msg !== ''), `${s.errors} ${s.msg.slice(0, 200)}`);
  await u.closeModals(page); await openDoc(page, name);
  await u.btn(page, 'معاينة').click(); await wait(1500);
  await page.getByText('دفتر الأستاذ المحاسبي', { exact: true }).first().click(); await wait(7000);
  const m = await dialogText(page); await page.screenshot({ path: 'Shamel/pe-results/e02-preview.png' });
  const cols = ['تاريخ الترحيل', 'الحساب', 'مدين', 'دائن', 'مقابل', 'نوع الطرف', 'الطرف', 'مركز التكلفة'];
  rec.check('E02-6', 'Accounting Ledger Preview shows the SRS columns', cols.every((c) => m.includes(c)), `missing=${cols.filter((c) => !m.includes(c))} popup=${m.slice(0, 900)}`);
  rec.check('E02-7', 'Preview rows show the amount 150 on both sides and create no ledger entry', (m.match(/150/g) ?? []).length >= 2 && (await gl(name)).length === 0, m.slice(0, 600));
  await closeAll(page); await openDoc(page, name);
  await tab(page, 'المعلومات الاضافية'); let x = await u.fields(page); let labels = await u.labels(page); const body = (await u.main(page).innerText()).replace(/\s+/g, ' ');
  rec.check('E02-8', 'More Info shows Status, Custom Remarks, Remarks, both In Words, Bank and Bank Account No', ['الحالة', 'ملاحظات مخصصة', 'ملاحظات', 'المبلغ كتابةً (عملة الشركة)', 'المبلغ كتابةً', 'البنك', 'رقم الحساب البنكي'].every((k) => k in x), Object.keys(x).join(' | '));
  rec.check('E02-9', 'Hidden (red) Letter Head, Payment Order and Auto Repeat are not shown', !/ترويسة|أمر الدفع|التكرار التلقائي/.test(body), body.slice(0, 500));
  rec.check('E02-10', 'Is Opening is hidden when advances are not booked in a separate account', !labels.some((l) => /افتتاحي/.test(l)), labels.join(','));
  const area = () => u.main(page).locator('textarea:visible').first();
  const editable = async () => (await area().count()) > 0 && (await area().isEditable());
  rec.check('E02-11', 'Remarks is read only while Custom Remarks is off', !(await editable()));
  await u.main(page).locator('.toggle-row, label').filter({ hasText: 'ملاحظات مخصصة' }).locator('.is-switch-slider, input[type=checkbox]').first().click({ force: true }); await wait(2000);
  const on = await editable();
  rec.check('E02-12', 'Turning Custom Remarks on enables Remarks', on);
  if (on) {
    await area().fill('ab'); await area().press('Tab'); s = await u.save(page); doc = await pe(name);
    rec.check('E02-13', 'Remarks shorter than 3 characters are refused with an error', doc.remarks !== 'ab' && (s.errors.length > 0 || s.msg !== ''), `stored=${doc.remarks} errors=${s.errors} msg=${s.msg.slice(0, 200)}`);
    await u.closeModals(page); await openDoc(page, name); await tab(page, 'المعلومات الاضافية');
    if (!(await editable())) { await u.main(page).locator('.toggle-row, label').filter({ hasText: 'ملاحظات مخصصة' }).locator('.is-switch-slider, input[type=checkbox]').first().click({ force: true }); await wait(2000); }
    await area().fill(''); await area().pressSequentially('x'.repeat(505)); const len = (await area().inputValue()).length;
    rec.check('E02-14', 'Remarks stops at 500 characters', len === 500, `length=${len}`);
    const text = 'ملاحظة اختبار QA 123 !@#';
    await area().fill(text); await area().press('Tab'); s = await u.save(page); doc = await pe(name);
    rec.check('E02-15', 'Custom remarks (letters, numbers, symbols) are saved', doc.custom_remarks === 1 && doc.remarks === text, `${doc.custom_remarks} ${doc.remarks} ${s.errors} ${s.msg.slice(0, 200)}`);
  }
  d.remember('E02', name);
});

test('E03 submit, cancel, amend and delete rules', async ({ page }) => {
  const name = await submitted(page, '25');
  await openDoc(page, name); let b = await buttons(page);
  rec.check('E03-1', 'Submitted shows Cancel and Ledger only: no Submit, Preview, Delete or Amend', has(b, 'إلغاء') && has(b, 'دفتر الأستاذ') && !has(b, 'اعتماد') && !has(b, 'معاينة') && !has(b, 'حذف') && !has(b, 'تعديل المستند'), b.join(' | '));
  const rw = await u.main(page).locator('input:visible:not([disabled]):not([readonly]):not([type=search]):not([type=checkbox]), textarea:visible:not([disabled]):not([readonly])').count();
  rec.check('E03-2', 'Submitted fields are read only', rw === 0, `${rw} editable inputs`);
  rec.check('E03-3', 'Clearance Date is shown after submit', (await u.labels(page)).includes('تاريخ التسوية'));
  await tab(page, 'السجلات المرتبطة'); const conn = (await u.main(page).innerText()).replace(/\s+/g, ' '); await page.screenshot({ path: 'Shamel/pe-results/e03-conn.png', fullPage: true });
  rec.check('E03-4', 'Connections offers Bank Transaction', /المعاملة المصرفية|معاملة بنكية|معاملات بنكية|حركة بنكية|المعاملات المصرفية|Bank Transaction/.test(conn), conn.slice(0, 600));
  await openDoc(page, name); const tabbed = page.context().waitForEvent('page', { timeout: 20_000 }).catch(() => null); await u.btn(page, 'دفتر الأستاذ').click(); const gp = (await tabbed) ?? page; await wait(20_000);
  const report = (await gp.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' '); await gp.screenshot({ path: 'Shamel/pe-results/e03-ledger.png' });
  rec.check('E03-5', 'Ledger opens the General Ledger report filtered on this entry', /General(%20| )Ledger/i.test(gp.url()) && gp.url().includes(name) && report.includes(name), `${gp.url()} ${report.slice(0, 200)}`);
  rec.note('E03-5b', 'where Ledger opens', `${gp === page ? 'same tab' : 'new tab'} ${gp.url()}`); if (gp !== page) await gp.close();
  await openDoc(page, name); await watch(page);
  await u.btn(page, 'إلغاء').click(); await wait(3000); const q = await dialogText(page); await confirmYes(page); await settled(name, 2);
  let doc = await pe(name);
  rec.check('E03-6', 'Cancel cancels the entry', doc.docstatus === 2, `docstatus=${doc.docstatus} confirm="${q}" msg=${await flashed(page)} ${await dialogText(page)}`);
  rec.note('E03-7', 'cancel confirmation and message', `confirm="${q}" msg=${await flashed(page)}`);
  rec.check('E03-8', 'The ledger entries are reversed', (await gl(name)).length === 0, String((await gl(name)).length));
  await closeAll(page); await openDoc(page, name); b = await buttons(page); const status = (await u.main(page).innerText()).includes('ملغ');
  const amend = b.find((x) => /^(تعديل|تعديل المستند|تصحيح|إنشاء نسخة معدلة|إنشاء نسخة للتعديل|Amend)$/.test(x));
  rec.check('E03-9', 'Cancelled shows status Cancelled, Amend and Delete (no Cancel / Submit)', status && !!amend && has(b, 'حذف') && !has(b, 'إلغاء') && !has(b, 'اعتماد'), b.join(' | '));
  rec.check('E03-10', 'Preview and Ledger are not offered on a cancelled entry', !has(b, 'معاينة') && !has(b, 'دفتر الأستاذ'), b.join(' | '));
  const rw2 = await u.main(page).locator('input:visible:not([disabled]):not([readonly]):not([type=search]):not([type=checkbox]), textarea:visible:not([disabled]):not([readonly])').count();
  rec.check('E03-11', 'Cancelled fields are read only', rw2 === 0, `${rw2} editable inputs`);
  if (!amend) return;
  await watch(page); await u.btn(page, amend).click(); await wait(4000); await confirmYes(page); await wait(5000);
  await page.screenshot({ path: 'Shamel/pe-results/e03-amend.png', fullPage: true });
  let copy = u.docName(page.url()).replace('new', '');
  if (!copy || copy === name) { const s = await u.save(page); copy = s.name; rec.note('E03-12', 'amend save', `${s.msg} ${s.errors} ${s.body.slice(0, 300)}`); await u.closeModals(page); }
  const list = await api.list('Payment Entry', [['amended_from', '=', name]], ['name', 'docstatus', 'paid_amount', 'party']);
  rec.check('E03-13', 'Amend creates a new draft linked through Amended From with the same data', list.length === 1 && list[0].docstatus === 0 && list[0].paid_amount === 25 && list[0].party === d.CUST, `${JSON.stringify(list)} url=${page.url()} ${await flashed(page)}`);
  if (!list.length) return;
  copy = list[0].name; d.remember('E03', { original: name, amended: copy });
  await openDoc(page, copy); await tab(page, 'المعلومات الاضافية');
  const info = (await u.main(page).innerText()).replace(/\s+/g, ' ');
  rec.check('E03-14', 'More Info of the new entry shows Amended From', info.includes(name), info.slice(0, 600));
  const link = u.main(page).getByText(name, { exact: true });
  if (await link.count()) { await link.last().click(); await wait(6000); }
  rec.check('E03-15', 'Amended From is clickable and opens the original entry', page.url().endsWith(name), page.url());
  // delete the original while an amendment points to it
  await openDoc(page, name); await watch(page); await u.btn(page, 'حذف').click(); await wait(2500);
  const q1 = await dialogText(page);
  rec.check('E03-16', 'Delete asks for confirmation', q1.length > 0, q1);
  await confirmYes(page); await wait(3000); const m = `${await dialogText(page)} ${await flashed(page)}`; await page.screenshot({ path: 'Shamel/pe-results/e03-delete-linked.png' });
  rec.check('E03-17', 'An entry that has an amendment cannot be deleted', await exists(name), m);
  rec.check('E03-18', 'The refusal names the linked document as a link', m.includes(copy) && (await dialog(page).locator('a').filter({ hasText: copy }).count()) > 0, m);
  await closeAll(page);
});

test('E04 delete an own draft and an own cancelled entry', async ({ page }) => {
  const name = await draft(page, '13');
  await openDoc(page, name); await u.btn(page, 'حذف').click(); await wait(2500);
  const q = await dialogText(page); await page.screenshot({ path: 'Shamel/pe-results/e04-confirm.png' });
  rec.check('E04-1', 'Delete on a draft shows a confirmation naming the action', /حذف/.test(q), q);
  await closeAll(page);
  rec.check('E04-2', 'Answering No keeps the entry', await exists(name));
  await openDoc(page, name); await watch(page); await u.btn(page, 'حذف').click(); await wait(2500); await confirmYes(page);
  rec.check('E04-3', 'Answering Yes deletes the draft', !(await exists(name)), `${await dialogText(page)} ${await flashed(page)}`);
  rec.check('E04-4', 'After deleting the user is returned to the list', /payment-entries\/?$/.test(page.url().split('?')[0]), page.url());
  const sub = await submitted(page, '14'); await openDoc(page, sub); await u.btn(page, 'إلغاء').click(); await wait(3000); await confirmYes(page); await settled(sub, 2);
  if ((await pe(sub)).docstatus !== 2) throw new Error('cancel failed ' + sub);
  await openDoc(page, sub); await watch(page); await u.btn(page, 'حذف').click(); await wait(2500); await confirmYes(page);
  rec.check('E04-5', 'A cancelled entry without links can be deleted', !(await exists(sub)), `${await dialogText(page)} ${await flashed(page)}`);
});

test('E05 bulk actions on the list', async ({ page }) => {
  const name = await draft(page, '16');
  const pick = async (n: string) => {
    await u.open(page, u.LIST); await u.main(page).locator('input[placeholder="البحث باستخدام الID"]').fill(n); await page.keyboard.press('Enter'); await wait(5000);
    await u.main(page).locator(`input.check_item[data-id="${n}"]`).click(); await wait(2000);
    if ((await u.main(page).locator('input.check_item:checked').count()) !== 1) throw new Error('selection is not exactly the QA entry');
    return buttons(page);
  };
  const act = async (label: string) => { await page.locator('button:visible').filter({ hasText: new RegExp('^\\s*' + label + '\\s*$') }).last().click(); await wait(3000); };
  const bulkEdit = async (field: string, value: string) => {
    await act('تعديل'); const m = page.locator('.base-modal:visible').last();
    await m.locator('input:visible').first().click(); await wait(1500); await page.locator('.cs-option:visible').filter({ hasText: new RegExp('^\\s*' + field + '\\s*$') }).first().click(); await wait(2000);
    const v = m.locator('textarea:visible, input:visible').last(); await v.fill(value); await v.press('Tab'); await wait(800);
    await watch(page); await m.locator('button').filter({ hasText: /^\s*تحديث\s*$/ }).click(); await wait(8000);
    const text = `${await dialogText(page)} ${await flashed(page)}`; await closeAll(page); return text;
  };
  let b = await pick(name);
  rec.check('E05-1', 'Selecting a draft shows Edit, Export, Assign, Clear Assignment, Tags, Print, Submit and Delete', ['تعديل', 'تصدير', 'اسناد', 'إلغاء الإسناد', 'إضافة وسوم', 'طباعة', 'اعتماد', 'حذف'].every((x) => has(b, x)), b.join(' | '));
  rec.check('E05-2', 'Cancel is not offered for a draft', !b.some((x) => /^إلغاء$|إلغاء الاعتماد|إلغاء المستند/.test(x)), b.join(' | '));
  await act('تعديل'); const m = page.locator('.base-modal:visible').last(); const t = (await m.innerText()).replace(/\s+/g, ' ');
  await m.locator('input:visible').first().click(); await wait(1500);
  const offered = (await page.locator('.cs-option:visible').allInnerTexts()).map((s) => s.trim()); await page.keyboard.press('Escape'); await wait(500);
  rec.check('E05-3', 'Bulk Edit pop-up has Field (mandatory), Value and Update', /الحقل\s*\*/.test(t) && /تحديث/.test(t), t);
  rec.check('E05-4', 'Bulk Edit does not offer the hidden (red) Letter Head', !offered.some((o) => /ترويسة/.test(o)), offered.join(' | '));
  await closeAll(page);
  await pick(name); const msg = await bulkEdit('ملاحظات', 'QA bulk remark').catch((e) => `ERR ${e.message.slice(0, 200)}`);
  rec.note('E05-5', 'bulk edit of a draft', `${msg} stored=${(await pe(name)).remarks}`);
  await pick(name); await watch(page); await act('اعتماد'); await confirmYes(page); await settled(name, 1);
  rec.check('E05-6', 'Bulk Submit submits the selected draft', (await pe(name)).docstatus === 1, `${await dialogText(page)} ${await flashed(page)}`);
  await closeAll(page);
  b = await pick(name);
  rec.check('E05-7', 'A submitted entry offers Cancel and neither Submit nor Delete', b.some((x) => /^إلغاء$|إلغاء الاعتماد|إلغاء المستند/.test(x)) && !has(b, 'اعتماد') && !has(b, 'حذف'), b.join(' | '));
  const before = (await pe(name)).remarks; const refused = await bulkEdit('ملاحظات', 'QA should not change').catch((e) => `ERR ${e.message.slice(0, 200)}`);
  rec.check('E05-8', 'Bulk Edit of a submitted entry shows a "cannot be modified" error and changes nothing', (await pe(name)).remarks === before && /لا يمكن|خطأ|معتمد|تعذر|فشل/.test(refused), `message="${refused}" stored=${(await pe(name)).remarks}`);
  b = await pick(name); const cancel = b.find((x) => /^إلغاء$|إلغاء الاعتماد|إلغاء المستند/.test(x));
  if (cancel) { await watch(page); await act(cancel); await confirmYes(page); await settled(name, 2); rec.check('E05-9', 'Bulk Cancel cancels the selected entry', (await pe(name)).docstatus === 2, `${await dialogText(page)} ${await flashed(page)}`); await closeAll(page); }
  if ((await pe(name)).docstatus === 2) {
    b = await pick(name);
    rec.check('E05-10', 'A cancelled entry offers Delete and neither Submit nor Cancel', has(b, 'حذف') && !has(b, 'اعتماد') && !b.some((x) => /إلغاء الاعتماد|إلغاء المستند|^إلغاء$/.test(x)), b.join(' | '));
    await watch(page); await act('حذف'); const q = await dialogText(page); await confirmYes(page);
    rec.check('E05-11', 'Bulk Delete asks for confirmation then deletes', q.length > 0 && !(await exists(name)), `confirm="${q}" ${await flashed(page)}`);
  }
});
