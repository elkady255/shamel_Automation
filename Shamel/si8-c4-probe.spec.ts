import { test } from '@playwright/test';
import { openNew, combo, options, box, main, wait, recorder, summary, num, addItem, save, closeModal, isNew, docName, messages } from './helpers/si-ui';
test.describe.configure({ timeout: 400_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('c4-probe');
test('C4 discount with account and reason', async ({ page }) => {
  await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
  await addItem(page, 'IND182210', '1', null); await wait(page, 4000);
  const r = main(page).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1);
  await r.fill('1000'); await r.press('Tab'); await wait(page, 2000);
  await combo(page, 'تطبيق الخصم الإضافي على', '', 1);
  const f = box(page, 'نسبة الخصم الإضافي').locator('input').first();
  await f.click(); await f.type('10', { delay: 50 }); await f.press('Tab'); await wait(page, 3000);
  rec.note('C4-1', 'messages right after typing the percentage (before Save)', JSON.stringify(await messages(page)));
  await closeModal(page);
  rec.note('C4-2', 'discount account options', JSON.stringify((await options(page, 'حساب الخصم')).slice(0, 5)));
  rec.note('C4-3', 'discount reason options', JSON.stringify((await options(page, 'سبب الخصم')).slice(0, 8)));
  const a = await combo(page, 'حساب الخصم', '').catch(() => null); rec.note('C4-4', 'picked account', JSON.stringify(a));
  const b = await combo(page, 'سبب الخصم', '').catch(() => null); rec.note('C4-5', 'picked reason', JSON.stringify(b));
  await wait(page, 2500);
  rec.note('C4-6', 'totals after account+reason', `grand=${await summary(page, 'الإجمالي الكلي (العملة)')} amt=${await box(page, 'مبلغ الخصم الإضافي (العملة)').locator('input').first().inputValue().catch(() => '?')}`);
  const s = await save(page, 9000); rec.note('C4-7', 'save', JSON.stringify(s.msgs) + ' ' + s.url);
  if (!isNew(s.url)) { await wait(page, 3000); rec.note('C4-8', 'saved ' + docName(s.url), `grand=${await summary(page, 'الإجمالي الكلي (العملة)')}`); }
});
