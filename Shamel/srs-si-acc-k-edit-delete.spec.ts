import { test, type Page } from '@playwright/test';
import { openNew, openDoc, tab, combo, options, box, value, save, messages, closeModal, addItem, main, press, wait, recorder, summary, num, setText, toggle, isNew, docName, snapshot, diffSnap, submittedInvoice, cancelInvoice } from './helpers/si-ui';
import { ctx } from './helpers/qt-api';

test.describe.configure({ timeout: 900_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('k-edit-delete');
const rows = (p: Page) => main(p).locator('table.si-table tbody tr');
const status = async (name: string) => { const c = await ctx(); const r = await c.get(`/api/resource/Sales Invoice/${encodeURIComponent(name)}`); return r.status(); };
const apiDoc = async (name: string) => { const c = await ctx(); const r = await c.get(`/api/resource/Sales Invoice/${encodeURIComponent(name)}`); return r.ok() ? ((await r.json()).data as any) : null; };

async function draft(page: Page, rate = '1000', qty = '2') {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', qty, null); await wait(page, 4000);
  const r = rows(page).first().locator('input[type=number]').nth(1); await r.fill(rate); await r.press('Tab'); await wait(page, 1500);
  const s = await save(page, 10000); if (isNew(s.url)) throw new Error('save failed ' + JSON.stringify(s.msgs));
  await wait(page, 2500); return docName(s.url);
}
/** Presses Delete and returns the dialog text; confirm=true presses the red Delete button. */
async function deleteDoc(page: Page, confirm: boolean) {
  await press(main(page).locator('button[data-action="delete"]').first());
  await page.locator('.shamel-confirm-overlay.is-visible').first().waitFor({ timeout: 10_000 }).catch(() => {});
  const dialog = (await page.evaluate(() => [...document.querySelectorAll('.shamel-confirm-content')].map((e: any) => e.innerText || '').join(' '))).replace(/\s+/g, ' ');
  if (confirm) { await press(page.locator('.shamel-confirm-actions .shamel-btn-destructive').first()); await wait(page, 6000); }
  else { await press(page.locator('.shamel-confirm-actions button').filter({ hasText: /^\s*إلغاء\s*$/ }).first()); await wait(page, 800); }
  return { dialog, url: page.url(), msgs: await messages(page) };
}

test('K01 edit a draft in every tab and save', async ({ page }) => {
  const name = await draft(page, '1000', '2'); rec.note('K01-0', 'draft created', name);
  await openDoc(page, name);
  const r = rows(page).first(); const q = r.locator('input[type=number]').first(); const rt = r.locator('input[type=number]').nth(1);
  await q.fill('3'); await q.press('Tab'); await wait(page, 1500); await rt.fill('1200'); await rt.press('Tab'); await wait(page, 2000);
  rec.check('K01-1', 'editing qty and rate recalculates the row and the totals (3 x 1,200 = 3,600)', /3,?600\.00/.test(await summary(page, 'إجمالي المبلغ بالعملة')), await summary(page, 'إجمالي المبلغ بالعملة'));
  await combo(page, 'قالب الضرائب والرسوم', 'a - E'); await wait(page, 2500);
  await combo(page, 'مركز التكلفة', '');
  await tab(page, 'المعلومات العامة');
  await combo(page, 'قالب شروط الدفع', 'test'); await wait(page, 1500);
  const t = await options(page, 'الشروط'); if (t.length) await combo(page, 'الشروط', t[0].split(' ')[0]);
  await tab(page, 'معلومات إضافية'); await setText(page, 'أمر شراء العميل', 'PO-ED-2'); await toggle(page, 'تجميع الأصناف المتشابهة');
  await tab(page, 'التفاصيل');
  const before: Record<string, string> = {}; for (const tb of ['التفاصيل', 'المعلومات العامة', 'معلومات إضافية'] as const) { await tab(page, tb); for (const [k, v] of Object.entries(await snapshot(page))) before[tb[0] + tb.length + ':' + k] = v; }
  await tab(page, 'التفاصيل');
  const s = await save(page, 10000); rec.note('K01-2', 'save after edit', JSON.stringify(s.msgs) + ' ' + s.url);
  rec.check('K01-3', 'saving an edited draft succeeds and stays on the same document', docName(s.url) === name && !s.msgs.some((m) => /تعذّر/.test(m)), s.url + ' ' + JSON.stringify(s.msgs));
  await openDoc(page, name);
  const after: Record<string, string> = {}; for (const tb of ['التفاصيل', 'المعلومات العامة', 'معلومات إضافية'] as const) { await tab(page, tb); for (const [k, v] of Object.entries(await snapshot(page))) after[tb[0] + tb.length + ':' + k] = v; }
  const d = diffSnap(before, after); rec.check('K01-4', 'every edited value is kept after reload', d.length === 0, JSON.stringify(d), 'SI-44');
  const doc = await apiDoc(name); rec.check('K01-5', 'the database has the new qty, rate, PO and total', !!doc && doc.items[0].qty === 3 && doc.items[0].rate === 1200 && doc.po_no === 'PO-ED-2' && doc.grand_total > 3600, JSON.stringify({ qty: doc?.items?.[0]?.qty, rate: doc?.items?.[0]?.rate, po: doc?.po_no, gt: doc?.grand_total }));
  rec.note('K01-6', 'doc id', name);
});

test('K02 edit validations on a draft', async ({ page }) => {
  const name = await draft(page, '500', '1'); await openDoc(page, name);
  const q = rows(page).first().locator('input[type=number]').first();
  await q.fill('0'); await q.press('Tab'); await wait(page, 1000);
  const s = await save(page, 7000); rec.check('K02-1', 'editing the quantity to 0 is refused on Save', s.msgs.some((m) => /أكبر من صفر|تعذّر/.test(m)), JSON.stringify(s.msgs)); await closeModal(page);
  await q.fill('2'); await q.press('Tab'); await wait(page, 1000);
  await press(main(page).getByRole('button', { name: 'إلغاء', exact: true }).first()); await wait(page, 3000);
  rec.note('K02-2', 'after pressing the form Cancel button (unsaved changes)', page.url() + ' ' + JSON.stringify(await messages(page)));
  const doc = await apiDoc(name); rec.check('K02-3', 'the form Cancel button does not save the unsaved edit', doc?.items?.[0]?.qty === 1, String(doc?.items?.[0]?.qty));
});

test('K03 delete a draft (Yes)', async ({ page }) => {
  const name = await draft(page, '700', '1'); rec.note('K03-0', 'draft for delete', name);
  const r = await deleteDoc(page, true);
  rec.check('K03-1', 'the delete confirmation asks "هل أنت متأكد؟"', /هل أنت متأكد/.test(r.dialog), r.dialog);
  rec.note('K03-2', 'after Yes: url and messages', r.url + ' ' + JSON.stringify(r.msgs));
  rec.check('K03-3', 'the draft is deleted (API returns 404)', (await status(name)) === 404, String(await status(name)));
  rec.check('K03-4', 'the screen leaves the deleted document', !r.url.includes(name), r.url);
});

test('K04 delete rules: cancelled invoice that has an amended draft', async ({ page }) => {
  const orig = await submittedInvoice(page, '800'); await cancelInvoice(page, orig); rec.note('K04-0', 'cancelled original', orig);
  await openDoc(page, orig);
  await press(main(page).getByRole('button', { name: 'تعديل', exact: true }).first()); await wait(page, 7000);
  const amended = docName(page.url()); rec.check('K04-1', 'Amend created <id>-1', amended === orig + '-1', amended);
  await openDoc(page, orig);
  const r = await deleteDoc(page, true);
  rec.note('K04-2', 'delete original that has an amended draft: dialog / messages', r.dialog + ' | ' + JSON.stringify(r.msgs));
  const still = await status(orig);
  rec.check('K04-3', 'the original is NOT deleted while an amended document exists', still === 200, String(still));
  rec.check('K04-4', 'a warning names the related document as a link', r.msgs.some((m) => new RegExp(amended).test(m)) || /مرتبط|لا يمكن حذف/.test(r.msgs.join(' ')), JSON.stringify(r.msgs));
  await closeModal(page);
  await openDoc(page, amended); const r2 = await deleteDoc(page, true);
  rec.check('K04-5', 'the amended draft can be deleted', (await status(amended)) === 404, String(await status(amended)));
  await openDoc(page, orig); const r3 = await deleteDoc(page, true);
  rec.check('K04-6', 'after the amended draft is gone the cancelled original can be deleted', (await status(orig)) === 404, String(await status(orig)) + ' ' + JSON.stringify(r3.msgs), 'SI-45');
});

test('K05 a submitted invoice cannot be deleted (server rule)', async () => {
  const c = await ctx();
  const r = await c.delete('/api/resource/Sales Invoice/ACC-SINV-2026-02832');
  rec.check('K05-1', 'REST delete of a submitted invoice is refused', !r.ok(), r.status() + ' ' + (await r.text()).slice(0, 160));
  rec.check('K05-2', 'the submitted invoice still exists', (await status('ACC-SINV-2026-02832')) === 200, '');
});
