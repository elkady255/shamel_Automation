import { test, type Page } from '@playwright/test';
import { openNew, combo, save, messages, closeModal, addItem, main, press, wait, recorder, summary, isNew, docName } from './helpers/si-ui';

test.describe.configure({ timeout: 420_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('b2-probe');
const rows = (p: Page) => main(p).locator('table.si-table tbody tr');

test('B2-1 rate change: row amount vs summary vs persisted', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', '4', null); await wait(page, 5000);
  const row = rows(page).first(); const r = row.locator('input[type=number]').nth(1);
  const cell = async () => (await row.innerText()).replace(/\s+/g, ' ');
  await r.fill('12000'); await r.press('Tab'); await wait(page, 3000);
  const a = { rate: await r.inputValue(), row: await cell(), total: await summary(page, 'إجمالي المبلغ بالعملة'), net: await summary(page, 'صافي الإجمالي بالعملة') };
  rec.note('B2-1a', 'rate 12000 qty 4 (expect 48,000)', JSON.stringify(a));
  rec.check('B2-1b', 'row Amount follows the edited Rate', /48,?000/.test(a.row), JSON.stringify(a), 'SI-35');
  rec.check('B2-1c', 'summary total follows the edited Rate', /48,?000/.test(a.total), JSON.stringify(a));
  await press(row.locator('[title="تعديل الصف"]').first()); await wait(page, 2000);
  const pop = page.locator('.qr-overlay').first();
  rec.note('B2-1d', 'edit row popup amounts', (await pop.innerText()).replace(/\s+/g, ' ').match(/السعر المبلغ[^ا]{0,60}/)?.[0] || '');
  await page.keyboard.press('Escape'); await press(pop.getByRole('button', { name: 'إلغاء' })).catch(() => {});
  const r1 = await save(page, 9000); rec.note('B2-1e', 'save with rate 12000', JSON.stringify(r1.msgs) + ' ' + r1.url);
  if (!isNew(r1.url)) {
    await wait(page, 3000);
    const r2 = main(page).locator('table.si-table tbody tr').first();
    rec.note('B2-1f', 'saved row', (await r2.innerText()).replace(/\s+/g, ' '));
    rec.note('B2-1g', 'saved doc', docName(r1.url));
  }
});

test('B2-2 rate below valuation / negative / zero on Save', async ({ page }) => {
  for (const [label, v] of [['below valuation 250', '250'], ['negative -5', '-5'], ['zero 0', '0']] as const) {
    await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
    await addItem(page, 'IND182210', '1', null); await wait(page, 5000);
    const r = rows(page).first().locator('input[type=number]').nth(1);
    await r.fill(v); await r.press('Tab'); await wait(page, 2000);
    const s = await save(page, 8000);
    rec.note('B2-2-' + label, `save with rate ${label}`, JSON.stringify(s.msgs) + ' ' + s.url);
    await closeModal(page);
  }
});

test('B2-3 Edit Row description min length message', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', '1', null); await wait(page, 3000);
  await press(rows(page).first().locator('[title="تعديل الصف"]').first()); await wait(page, 2000);
  const pop = page.locator('.qr-overlay').first();
  const ta = pop.locator('textarea').first();
  rec.note('B2-3a', 'first textarea current value', (await ta.inputValue()).slice(0, 40));
  await ta.fill('ab'); await ta.press('Tab'); await wait(page, 1200);
  rec.note('B2-3b', 'messages after 2 chars', JSON.stringify(await messages(page)));
  await page.screenshot({ path: 'Shamel/si8-b2-desc.png' });
  await closeModal(page);
  rec.note('B2-3c', 'popup still open', String(await pop.count()));
  const labels = (await pop.locator('label,.cd-label').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  rec.check('B2-3d', 'Barcode is hidden in Edit Row', !labels.includes('الباركود'), 'shown', 'SI-37');
  rec.check('B2-3e', 'Grant Commission is hidden in Edit Row', !labels.includes('منح العمولة'), 'shown', 'SI-37');
  rec.check('B2-3f', 'Asset field exists in Edit Row', labels.some((l) => /^الأصل$/.test(l)), JSON.stringify(labels.filter((l) => /أصل/.test(l))), 'SI-37');
  rec.check('B2-3g', 'Serial and Batch Bundle field exists in Edit Row', labels.some((l) => /حزمة|Bundle/.test(l)), '', 'SI-37');
});
