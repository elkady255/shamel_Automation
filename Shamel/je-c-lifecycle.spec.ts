// Journal Entry - list, draft edit, submit, ledger, reverse, cancel, amend, delete, bulk actions (SRS p.372-375, 404-407).
// CHANGES DATA: only documents created by this file are edited, cancelled or deleted.
import { test } from '@playwright/test';
import * as j from './helpers/je-ui';
import { recorder } from './helpers/si-ui';

const { u, d, api } = j;
const rec = recorder('je-c-lifecycle');
test.use({ viewport: { width: 1500, height: 1500 }, actionTimeout: 20_000 });
test.describe.configure({ mode: 'default' });
test.setTimeout(480_000);

const editable = (p: import('@playwright/test').Page) => u.main(p).locator('input:visible:not([disabled]):not([readonly]):not([type=search]):not([type=checkbox]), textarea:visible:not([disabled]):not([readonly])').count();
const search = async (p: import('@playwright/test').Page, n: string) => { await u.open(p, j.LIST); await u.main(p).locator('input[placeholder="البحث باستخدام الID"]').fill(n); await p.keyboard.press('Enter'); await j.wait(5000); };

test('C01 list screen', async ({ page }) => {
  const name = await j.draft(page, [{ account: '1210', partyType: 'عميل', party: d.CUST, debit: '3' }, { account: j.CASH, credit: '3' }]);
  await u.open(page, j.LIST);
  const head = (await u.main(page).locator('thead th:visible').allInnerTexts()).map((s) => s.trim()).filter(Boolean);
  rec.check('C01-1', 'List shows ID, Title, Status, Company and Posting Date', ['رقم المعرف', 'العنوان', 'الحالة', 'الشركة', 'تاريخ الترحيل'].every((h) => head.includes(h)), head.join(' | '));
  rec.note('C01-2', 'columns beyond the SRS', head.filter((h) => !['رقم المعرف', 'العنوان', 'الحالة', 'الشركة', 'تاريخ الترحيل'].includes(h)).join(' | '));
  const row = u.main(page).locator('tbody tr').filter({ hasText: name }).first(); const text = (await row.innerText().catch(() => '')).replace(/\s+/g, ' ');
  rec.check('C01-3', 'A new draft is listed as Draft and its Title is the party of the first row', /مسودة/.test(text) && text.includes(d.CUST), text);
  await row.getByText(name).click(); await j.wait(6000);
  rec.check('C01-4', 'Clicking the ID opens the details', page.url().includes(name), page.url());
  await u.open(page, j.LIST); await u.main(page).getByRole('button', { name: 'إضافة قيد يومية' }).click(); await j.wait(5000);
  rec.check('C01-5', 'Add Journal Entry opens the add screen', /journal-entries\/new/.test(page.url()), page.url());
  const other = await j.draft(page); await search(page, other);
  const t2 = (await u.main(page).locator('tbody tr').allInnerTexts()).map((s) => s.replace(/\s+/g, ' '));
  rec.check('C01-6', 'Without a party the Title is the account of the first row', t2.length === 1 && /RIYAD BANK/.test(t2[0]), t2.join(' // '));
  d.remember('JE-C01', name);
});

test('C02 edit a draft', async ({ page }) => {
  const name = await j.draft(page, j.pair('20'));
  await j.openDoc(page, name); let b = await j.buttons(page);
  rec.check('C02-1', 'Draft offers Submit and Delete, and no Ledger, Cancel or Amend', j.has(b, 'اعتماد') && j.has(b, 'حذف') && !j.has(b, 'دفتر الأستاذ العام') && !j.has(b, 'إلغاء') && !j.has(b, 'إنشاء نسخة للتعديل'), b.join(' | '));
  rec.check('C02-2', 'Draft fields are editable', (await editable(page)) > 3);
  rec.check('C02-3', 'Quick Entry is not offered after Save', !j.has(b, 'إدخال سريع'), b.join(' | '));
  await j.typeCell(page, 0, 3, '25'); await j.typeCell(page, 1, 4, '25'); const s = await j.send(page, 'حفظ'); let doc = await j.je(name);
  rec.check('C02-4', 'Edited amounts are saved on the draft', doc.total_debit === 25 && doc.total_credit === 25, `${doc.total_debit} ${s.msg} ${s.errors} ${s.body.slice(0, 300)}`);
  await j.closeAll(page); await j.openDoc(page, name);
  rec.check('C02-5', 'The new amounts show after reopening', /25\.00/.test((await u.fields(page))['إجمالي المدين'] ?? ''), (await u.fields(page))['إجمالي المدين']);
  await j.addRow(page); await j.pickCell(page, 2, 0, '122301'); await j.typeCell(page, 2, 3, '5'); await j.typeCell(page, 1, 4, '30'); await j.send(page, 'حفظ'); doc = await j.je(name);
  rec.check('C02-6', 'A row can be added to a draft', doc.accounts.length === 3 && doc.total_debit === 30, `${doc.accounts.length} ${doc.total_debit}`);
  await j.closeAll(page); await j.openDoc(page, name);
  await j.table(page).locator('tbody tr').nth(2).locator('button[title="حذف"]').click(); await j.wait(1500); await j.confirmYes(page); await j.typeCell(page, 1, 4, '25'); await j.send(page, 'حفظ'); doc = await j.je(name);
  rec.check('C02-7', 'A row can be deleted from a draft', doc.accounts.length === 2 && doc.total_credit === 25, `${doc.accounts.length} ${doc.total_credit}`);
});

test('C03 submitted entry, ledger and reverse', async ({ page }) => {
  const name = await j.submitted(page, j.pair('21'));
  await j.openDoc(page, name); const b = await j.buttons(page);
  rec.check('C03-1', 'Submitted offers View Ledger, Actions and Cancel; no Submit, Delete or Quick Entry', j.has(b, 'دفتر الأستاذ العام') && j.has(b, 'الإجراءات') && j.has(b, 'إلغاء') && !j.has(b, 'اعتماد') && !j.has(b, 'حذف') && !j.has(b, 'إدخال سريع'), b.join(' | '));
  rec.check('C03-2', 'Submitted fields are read only', (await editable(page)) === 0, String(await editable(page)));
  rec.check('C03-3', 'Clearance Date is shown after submit', (await u.labels(page)).includes('تاريخ التسوية'));
  await j.tab(page, 'السجلات المرتبطة'); const conn = await j.bodyText(page);
  rec.check('C03-4', 'Connections offers Bank Transaction', /معاملة بنكية/.test(conn), conn.slice(-300));
  await j.openDoc(page, name);
  const tabbed = page.context().waitForEvent('page', { timeout: 20_000 }).catch(() => null); await j.click(page, 'دفتر الأستاذ العام'); const gp = (await tabbed) ?? page; await j.wait(20_000);
  const report = (await gp.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' '); await gp.screenshot({ path: 'Shamel/je-results/c03-ledger.png' });
  rec.check('C03-5', 'View Ledger opens the General Ledger report filtered on this entry', /general(%20| |-)ledger|general-ledger/i.test(gp.url()) && report.includes(name), `${gp === page ? 'same tab' : 'new tab'} ${gp.url()} ${report.slice(0, 200)}`);
  if (gp !== page) await gp.close();
  await j.openDoc(page, name); await j.click(page, 'الإجراءات');
  const rev = page.locator('button:visible, [role=menuitem]:visible, li:visible, a:visible').filter({ hasText: /عكس|Reverse/ });
  const menu = (await rev.allInnerTexts()).join(' | '); await page.screenshot({ path: 'Shamel/je-results/c03-actions.png' });
  rec.check('C03-6', 'Actions offers Reverse Journal Entry', (await rev.count()) > 0, menu);
  if (!(await rev.count())) return;
  await rev.last().click(); await j.wait(9000); await page.screenshot({ path: 'Shamel/je-results/c03-reverse.png', fullPage: true });
  const url = page.url(); const x = await u.fields(page);
  const d0 = await j.cell(page, 0, 3).inputValue().catch(() => ''), c0 = await j.cell(page, 0, 4).inputValue().catch(() => ''), d1 = await j.cell(page, 1, 3).inputValue().catch(() => ''), c1 = await j.cell(page, 1, 4).inputValue().catch(() => '');
  rec.check('C03-7', 'Reverse opens a new entry with debit and credit swapped', Number(c0) === 21 && Number(d1) === 21 && !Number(d0) && !Number(c1), `url=${url} row1 ${d0}/${c0} row2 ${d1}/${c1} totals=${x['إجمالي المدين']}`);
  let copy = j.nameOf(page);
  if (!copy || copy === name) { const s = await j.send(page, 'حفظ'); copy = j.nameOf(page); rec.note('C03-8', 'saving the reverse entry', `${s.msg} ${s.errors} ${s.body.slice(0, 300)}`); }
  const list = await api.list('Journal Entry', [['reversal_of', '=', name]], ['name', 'docstatus', 'total_debit']);
  rec.check('C03-9', 'The reverse entry is saved and linked through Reversal Of', list.length === 1 && list[0].total_debit === 21, `${JSON.stringify(list)} copy=${copy}`);
  if (list.length) { d.remember('JE-C03rev', list[0].name); await j.openDoc(page, list[0].name); await j.tab(page, j.MORE); const info = await j.bodyText(page); rec.check('C03-10', 'More Info of the reverse entry shows Reversal Of', info.includes(name), info.slice(0, 500)); }
});

test('C04 cancel, amend and delete rules', async ({ page }) => {
  const name = await j.submitted(page, j.pair('22'));
  await j.openDoc(page, name); await j.watch(page); await j.click(page, 'إلغاء'); const q = await j.dialogText(page); await j.confirmYes(page); await j.settled(name, 2);
  rec.check('C04-1', 'Cancel cancels the entry', (await j.je(name)).docstatus === 2, `confirm="${q}" ${await j.flashed(page)} ${await j.dialogText(page)}`);
  rec.check('C04-2', 'The ledger entries are reversed', (await j.gl(name)).length === 0);
  await j.closeAll(page); await j.openDoc(page, name); const b = await j.buttons(page); const amend = b.find((x) => /نسخة|تعديل المستند|Amend|^تعديل$/.test(x));
  rec.check('C04-3', 'Cancelled offers Amend and Delete, not Cancel or Submit', !!amend && j.has(b, 'حذف') && !j.has(b, 'إلغاء') && !j.has(b, 'اعتماد'), b.join(' | '));
  rec.check('C04-4', 'Cancelled fields are read only', (await editable(page)) === 0);
  rec.check('C04-5', 'View Ledger is not offered on a cancelled entry (SRS: only after submit)', !j.has(b, 'دفتر الأستاذ العام'), b.join(' | '));
  if (!amend) return;
  await j.watch(page); await j.click(page, amend); await j.confirmYes(page); await j.wait(5000);
  if (!j.nameOf(page) || j.nameOf(page) === name) { const s = await j.send(page, 'حفظ'); rec.note('C04-6', 'saving the amendment', `${s.msg} ${s.errors} ${s.body.slice(0, 300)}`); }
  const list = await api.list('Journal Entry', [['amended_from', '=', name]], ['name', 'docstatus', 'total_debit']);
  rec.check('C04-7', 'Amend creates a draft linked through Amended From with the same data', list.length === 1 && list[0].docstatus === 0 && list[0].total_debit === 22, JSON.stringify(list));
  if (!list.length) return;
  const copy = list[0].name; d.remember('JE-C04', copy); await j.openDoc(page, copy); const body = await j.bodyText(page);
  rec.check('C04-8', 'The new entry shows Amended From on the details', body.includes(name), body.slice(0, 500));
  const link = u.main(page).getByText(name, { exact: true }); if (await link.count()) { await link.last().click(); await j.wait(6000); }
  rec.check('C04-9', 'Amended From is clickable and opens the original', page.url().endsWith(name), page.url());
  await j.openDoc(page, name); await j.watch(page); await j.remove(page); const q1 = await j.dialogText(page);
  rec.check('C04-10', 'Delete asks for confirmation', q1.length > 0, q1);
  await j.confirmYes(page); await j.wait(3000); const m = `${await j.dialogText(page)} ${await j.flashed(page)}`; await page.screenshot({ path: 'Shamel/je-results/c04-linked.png' });
  rec.check('C04-11', 'An entry that has an amendment cannot be deleted', await j.exists(name), m);
  rec.check('C04-12', 'The refusal names the linked entry as a link', m.includes(copy) && (await j.dialog(page).locator('a').filter({ hasText: copy }).count()) > 0, m);
  await j.closeAll(page);
});

test('C05 delete own draft and own cancelled entry', async ({ page }) => {
  const name = await j.draft(page, j.pair('23'));
  await j.openDoc(page, name); await j.remove(page); const q = await j.dialogText(page);
  rec.check('C05-1', 'Delete on a draft asks for confirmation', /حذف/.test(q), q);
  await j.closeAll(page); rec.check('C05-2', 'Answering No keeps the entry', await j.exists(name));
  await j.openDoc(page, name); await j.watch(page); await j.remove(page); await j.confirmYes(page);
  rec.check('C05-3', 'Answering Yes deletes the draft', !(await j.exists(name)), `${await j.dialogText(page)} ${await j.flashed(page)}`);
  rec.check('C05-4', 'The user returns to the list', /journal-entries\/?$/.test(page.url().split('?')[0]), page.url());
  const sub = await j.submitted(page, j.pair('24')); await j.openDoc(page, sub); await j.click(page, 'إلغاء'); await j.confirmYes(page); await j.settled(sub, 2);
  await j.closeAll(page); await j.openDoc(page, sub); await j.watch(page); await j.remove(page); await j.confirmYes(page);
  rec.check('C05-5', 'A cancelled entry without links can be deleted', !(await j.exists(sub)), `${await j.dialogText(page)} ${await j.flashed(page)}`);
});

test('C06 bulk actions on the list', async ({ page }) => {
  const name = await j.draft(page, j.pair('26'));
  const pick = async (n: string) => {
    await search(page, n); await u.main(page).locator(`input.check_item[data-id="${n}"]`).click(); await j.wait(2000);
    if ((await u.main(page).locator('input.check_item:checked').count()) !== 1) throw new Error('selection is not exactly the QA entry');
    return (await page.locator('button:visible').allInnerTexts()).map((s) => s.trim());
  };
  const bulkEdit = async (field: string, value: string) => {
    await j.click(page, 'تعديل'); const m = j.modal(page);
    await m.locator('input:visible').first().click(); await j.wait(1500); await page.locator('.cs-option:visible').filter({ hasText: new RegExp('^\\s*' + field + '\\s*$') }).first().click(); await j.wait(2000);
    const v = m.locator('textarea:visible, input:visible').last(); await v.fill(value); await v.press('Tab'); await j.wait(800);
    await j.watch(page); await m.locator('button').filter({ hasText: /^\s*تحديث\s*$/ }).click(); await j.wait(8000);
    const text = `${await j.dialogText(page)} ${await j.flashed(page)}`; await j.closeAll(page); return text;
  };
  let b = await pick(name);
  rec.check('C06-1', 'A selected draft offers Edit, Export, Assign, Clear Assignment, Tags, Print, Submit and Delete', ['تعديل', 'تصدير', 'اسناد', 'إلغاء الإسناد', 'إضافة وسوم', 'طباعة', 'اعتماد', 'حذف'].every((x) => j.has(b, x)) && !j.has(b, 'إلغاء'), b.slice(-10).join(' | '));
  await j.click(page, 'تعديل'); await j.modal(page).locator('input:visible').first().click(); await j.wait(1500);
  const offered = (await page.locator('.cs-option:visible').allInnerTexts()).map((s) => s.trim()); await page.screenshot({ path: 'Shamel/je-results/c06-bulk.png' }); await page.keyboard.press('Escape'); await j.wait(500);
  rec.check('C06-2', 'Bulk Edit does not offer the hidden (red) Letter Head', !offered.some((o) => /ترويسة/.test(o)), offered.join(' | '));
  await j.closeAll(page);
  await pick(name); const msg = await bulkEdit('رقم الفاتورة', 'QA-BULK-1').catch((e) => `ERR ${e.message.slice(0, 200)}`);
  rec.check('C06-3', 'Bulk Edit updates a draft', (await j.je(name)).bill_no === 'QA-BULK-1', `${msg} stored=${(await j.je(name)).bill_no}`);
  await pick(name); await j.watch(page); await j.click(page, 'اعتماد'); await j.confirmYes(page); await j.settled(name, 1);
  rec.check('C06-4', 'Bulk Submit submits the selected draft', (await j.je(name)).docstatus === 1, `${await j.dialogText(page)} ${await j.flashed(page)}`);
  await j.closeAll(page); b = await pick(name);
  rec.check('C06-5', 'A submitted entry offers Cancel and neither Submit nor Delete', j.has(b, 'إلغاء') && !j.has(b, 'اعتماد') && !j.has(b, 'حذف'), b.slice(-10).join(' | '));
  const refused = await bulkEdit('رقم الفاتورة', 'QA-NO').catch((e) => `ERR ${e.message.slice(0, 200)}`);
  rec.check('C06-6', 'Bulk Edit of a submitted entry shows a "cannot be modified" error and changes nothing', (await j.je(name)).bill_no !== 'QA-NO' && /لا يمكن|خطأ|معتمد|تعذر|فشل/.test(refused), `message="${refused}" stored=${(await j.je(name)).bill_no}`);
  await pick(name); await j.watch(page); await j.click(page, 'إلغاء'); await j.confirmYes(page); await j.settled(name, 2);
  rec.check('C06-7', 'Bulk Cancel cancels the selected entry', (await j.je(name)).docstatus === 2, `${await j.dialogText(page)} ${await j.flashed(page)}`);
  if ((await j.je(name)).docstatus !== 2) return;
  await j.closeAll(page); b = await pick(name);
  rec.check('C06-8', 'A cancelled entry offers Delete and neither Submit nor Cancel', j.has(b, 'حذف') && !j.has(b, 'اعتماد') && !j.has(b, 'إلغاء'), b.slice(-10).join(' | '));
  await j.watch(page); await j.click(page, 'حذف'); const q = await j.dialogText(page); await j.confirmYes(page);
  rec.check('C06-9', 'Bulk Delete asks for confirmation then deletes', q.length > 0 && !(await j.exists(name)), `confirm="${q}" ${await j.flashed(page)}`);
});
