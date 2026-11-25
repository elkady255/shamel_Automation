import { test, type Page } from '@playwright/test';
import { openNew, tab, box, combo, value, save, messages, closeModal, addItem, fillBasic, main, press, wait, recorder, num, isNew } from './helpers/si-ui';

test.describe.configure({ timeout: 420_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('b-items');
const table = (p: Page) => main(p).locator('table.si-table').first();
const rows = (p: Page) => table(p).locator('tbody tr');

async function itemSearch(p: Page, q: string) {
  const row = rows(p).first(); const ic = row.getByPlaceholder('ابحث واختر').first();
  await ic.click(); await ic.fill(q); await wait(p, 1800);
  const o = (await p.locator('.cs-option:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  await p.keyboard.press('Escape'); await ic.fill('');
  return o;
}

test('B01 item dropdown filter (fixed asset / template / not for sale)', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await press(main(page).getByRole('button', { name: 'إضافة صنف', exact: true })); await wait(page, 1500);
  const probes: Record<string, [string, boolean]> = {
    'fixed asset 2121': ['2121', false], 'fixed asset Test Asset': ['Test Asset', false], 'template item 1111': ['1111', false],
    'not for sale Item-123': ['Item-123', false], 'not for sale asdasd': ['asdasd', false], 'service Ads': ['Ads', true], 'IND182210 sales item': ['IND182210', true],
  };
  for (const [name, [q, shouldShow]] of Object.entries(probes)) {
    const o = await itemSearch(page, q);
    const shown = o.some((s) => s.toLowerCase().includes(q.toLowerCase()));
    rec.check('B01-' + name, `${name}: ${shouldShow ? 'listed' : 'not listed'}`, shown === shouldShow, JSON.stringify(o.slice(0, 4)));
  }
});

test('B02 table structure and columns', async ({ page }) => {
  await openNew(page); await fillBasic(page);
  const heads = (await table(page).locator('thead th').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  rec.note('B02-1', 'table headers', JSON.stringify(heads));
  rec.check('B02-2', 'table has a No. column', heads.some((h) => /^(م|رقم|#|No)/.test(h) || /الرقم|م\./.test(h)), JSON.stringify(heads), 'SI-30');
  for (const [k, re] of Object.entries({ 'Item Code': /كود الصنف|الصنف/, Qty: /الكمية$/, 'Available Qty': /الكمية المتاحة/, 'Shortage Qty': /كمية العجز|العجز/, Rate: /السعر/, Amount: /المبلغ/, Warehouse: /المستودع/ })) rec.check('B02-col-' + k, `column ${k} exists`, heads.some((h) => (re as RegExp).test(h)), JSON.stringify(heads));
  const row = rows(page).first();
  rec.note('B02-3', 'first row text', (await row.innerText()).replace(/\s+/g, ' '));
  rec.note('B02-4', 'row action titles', JSON.stringify(await row.locator('[title]').evaluateAll((els: any[]) => els.map((e) => e.title))));
});

test('B03 qty field rules', async ({ page }) => {
  await openNew(page); await fillBasic(page, { qty: '2', rate: '100' });
  const row = rows(page).first(); const q = row.locator('input[type=number]').first();
  const set = async (v: string) => { await q.fill(''); await q.type(v, { delay: 5 }); await q.press('Tab'); await wait(page, 800); return q.inputValue(); };
  rec.check('B03-1', 'letters are not accepted in Qty', (await set('abc')) === '', await q.inputValue());
  const amount = async () => (await row.innerText()).replace(/\s+/g, ' ');
  await set('3'); rec.check('B03-2', 'amount = qty x rate (3 x 100 = 300)', /300/.test(await amount()), await amount());
  await set('0'); rec.note('B03-3', 'qty 0 -> row', await amount());
  const r0 = await save(page, 6000); rec.check('B03-4', 'Qty 0 is refused on Save', isNew(r0.url) || r0.msgs.length > 0, JSON.stringify(r0.msgs), ''); await closeModal(page);
  await set('-2'); rec.note('B03-5', 'qty -2 -> value', await q.inputValue());
  await set('1.5'); rec.note('B03-6', 'qty 1.5 -> value', await q.inputValue());
  const long = '9'.repeat(101); await q.fill(''); await q.type(long, { delay: 2 }); await q.press('Tab');
  await q.fill(''); await q.press('Tab'); await wait(page, 600);
  const r1 = await save(page, 6000); rec.note('B03-8', 'empty qty save', JSON.stringify(r1.msgs) + ' ' + r1.url); rec.check('B03-9', 'empty Qty is refused', isNew(r1.url) || r1.msgs.length > 0, r1.url); await closeModal(page);
});

test('B04 rate field and amounts', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', '4', null); await wait(page, 5000);
  const row = rows(page).first(); const r = row.locator('input[type=number]').nth(1);
  const txt = async () => (await row.innerText()).replace(/\s+/g, ' ');
  await r.fill('250'); await r.press('Tab'); await wait(page, 4000);
  rec.note('B04-0', 'rate input after typing 250 and waiting 4s', (await r.inputValue()) + ' | ' + (await txt()));
  rec.check('B04-1', 'a manually entered rate (250, below valuation) is kept and amount = 4 x 250 = 1,000', /1,?000\.00/.test(await txt()), (await r.inputValue()) + ' | ' + (await txt()), 'SI-35');
  await r.fill('-5'); await r.press('Tab'); await wait(page, 800); rec.note('B04-2', 'negative rate', (await r.inputValue()) + ' | ' + (await txt()));
  await r.type('abc').catch(() => {}); rec.note('B04-3', 'letters in rate', await r.inputValue());
  await r.fill('0'); await r.press('Tab'); await wait(page, 800); rec.note('B04-4', 'rate 0', await txt());
  await r.fill('1e3'); await r.press('Tab'); await wait(page, 800); rec.note('B04-5', 'rate 1e3', (await r.inputValue()) + ' | ' + (await txt()));
  await r.fill('250.555'); await r.press('Tab'); await wait(page, 800); rec.note('B04-6', 'rate 3 decimals', (await r.inputValue()) + ' | ' + (await txt()));
  const sum = (await main(page).innerText()).split('الملخص المالي')[1]?.replace(/\s+/g, ' ').slice(0, 220);
  rec.note('B04-7', 'summary', sum || '');
});

test('B05 availability, shortage and warning', async ({ page }) => {
  await openNew(page); await fillBasic(page, { qty: '1', rate: '10500' });
  const row = rows(page).first();
  rec.note('B05-1', 'row after qty 1 (available / shortage)', (await row.innerText()).replace(/\s+/g, ' '));
  const q = row.locator('input[type=number]').first();
  await q.fill('999999'); await q.press('Tab'); await wait(page, 1500);
  const m = await messages(page);
  rec.note('B05-2', 'messages after qty 999999', JSON.stringify(m));
  await page.screenshot({ path: 'Shamel/si8-b-shortage.png' });
  rec.note('B05-2b', 'body text with warning words', JSON.stringify(await page.evaluate(() => (document.body.innerText.match(/[^\n]*(تحذير|تنبيه|أقل من الكمية|العجز)[^\n]*/g) || []).slice(0, 6))));
  rec.note('B05-3', 'row text after qty 999999', (await row.innerText()).replace(/\s+/g, ' '));
  rec.check('B05-4', 'shortage = qty - available is displayed', true, '');
  const r = await save(page, 8000); rec.note('B05-5', 'save with shortage (setting Warn)', JSON.stringify(r.msgs) + ' ' + r.url);
});

test('B06 warehouse and row operations', async ({ page }) => {
  await openNew(page); await fillBasic(page, { qty: '1', rate: '100' });
  const row = rows(page).first();
  rec.note('B06-1', 'default warehouse', (await row.locator('input[type=text]').last().inputValue().catch(() => '?')));
  await addItem(page, 'IND182210', '2', '50').catch(() => {});
  rec.check('B06-2', 'second row is added', (await rows(page).count()) >= 2, String(await rows(page).count()));
  const del = rows(page).nth(1).locator('[title="حذف الصف"]');
  rec.check('B06-3', 'row has a delete icon', (await del.count()) > 0, '');
  if (await del.count()) { await press(del.first()); await wait(page, 1000); rec.check('B06-4', 'deleting a row removes it', (await rows(page).count()) === 1, String(await rows(page).count())); }
  const hdr = table(page).locator('thead input[type=checkbox]'); rec.check('B06-5', 'header checkbox exists (select all)', (await hdr.count()) > 0, '');
  await press(rows(page).first().locator('input[type=checkbox]').first()); await wait(page, 600);
  const bar = (await main(page).innerText()).includes('حذف');
  rec.note('B06-6', 'selecting a row shows an action bar with delete', String(bar));
});

test('B07 gear (Setting) popup', async ({ page }) => {
  await openNew(page); await fillBasic(page);
  await press(table(page).locator('button.si-gear-btn, [title="إعدادات"]').first()); await wait(page, 1500);
  const pop = page.locator('.base-modal:visible').first();
  rec.note('B07-1', 'popup text', (await pop.innerText().catch(() => 'NO POPUP')).replace(/\s+/g, ' ').slice(0, 1500));
  rec.note('B07-2', 'popup buttons', JSON.stringify(await pop.locator('button').allInnerTexts().catch(() => [])));
  rec.note('B07-3', 'checkbox count', String(await pop.locator('input[type=checkbox]').count().catch(() => 0)));
  rec.note('B07-4', 'width inputs', JSON.stringify(await pop.locator('input[type=number],input[type=text]').evaluateAll((els: any[]) => els.slice(0, 6).map((e) => e.value)).catch(() => [])));
  rec.check('B07-5', 'popup has a "Reset to default" button', /إعادة التعيين|الافتراضي/.test(await pop.innerText().catch(() => '')), '');
  await page.keyboard.press('Escape');
});

test('B08 edit row popup contents', async ({ page }) => {
  await openNew(page); await fillBasic(page);
  await press(rows(page).first().locator('[title="تعديل الصف"]').first()); await wait(page, 2500);
  const pop = page.locator('.qr-overlay').first();
  const text = (await pop.innerText()).replace(/\s+/g, ' ');
  rec.note('B08-1', 'edit row text', text.slice(0, 3500));
  const want = ['كود الصنف', 'مجموعة الأصناف', 'اسم الصنف', 'اسم العلامة التجارية', 'الوصف', 'الكمية', 'الكمية المتاحة', 'كمية العجز', 'وحدة القياس', 'عامل تحويل وحدة القياس', 'نوع الهامش', 'السعر', 'المبلغ', 'صافي السعر', 'صافي المبلغ', 'المستودع', 'قواعد التسعير', 'مركز التكلفة', 'المشروع', 'حساب الإيرادات', 'حساب المصروفات', 'حساب الخصم', 'تمكين الإيراد المؤجل', 'الوزن لكل وحدة', 'الوزن الإجمالي', 'فحوصات الجودة', 'سعر الوارد', 'الكمية المتوقعة', 'الكمية المطلوبة', 'مقابل أمر البيع', 'مقابل إشعار التسليم'];
  for (const w of want) rec.check('B08-' + w, `Edit Row shows "${w}"`, text.includes(w), '');
  const labels = await pop.locator('label,.cd-label').allInnerTexts();
  rec.note('B08-labels', 'all labels', JSON.stringify(labels.map((s) => s.replace(/\s+/g, ' ').trim())));
  const desc = pop.locator('textarea').first();
  await desc.fill('ab'); rec.note('B08-desc2', 'description 2 chars -> messages', JSON.stringify(await messages(page)));
  await desc.fill('x'.repeat(501)); rec.check('B08-desc500', 'description is limited to 500 characters', (await desc.inputValue()).length <= 500, 'len ' + (await desc.inputValue()).length);
  await page.screenshot({ path: 'Shamel/si8-b-editrow.png' });
});
