import { test, type Page } from '@playwright/test';
import { openNew, combo, box, value, main, press, wait, recorder, summary, num, addItem, save, docName, isNew } from './helpers/si-ui';
test.describe.configure({ timeout: 400_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('c2-probe');
for (const [idx, name] of [[0, 'Grand Total'], [1, 'Net Total']] as const) {
  test('C2 additional discount on ' + name, async ({ page }) => {
    await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
    await addItem(page, 'IND182210', '1', null); await wait(page, 4000);
    const r = main(page).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1);
    await r.fill('1000'); await r.press('Tab'); await wait(page, 2000);
    await combo(page, 'قالب الضرائب والرسوم', 'a - E'); await wait(page, 2500);
    const grand = async () => num(await summary(page, 'الإجمالي الكلي (العملة)'));
    const g0 = await grand();
    await combo(page, 'تطبيق الخصم الإضافي على', '', idx);
    const pct = box(page, 'نسبة الخصم الإضافي').locator('input').first();
    await pct.click(); await pct.type('10', { delay: 50 }); await pct.press('Tab'); await wait(page, 3500);
    const amtCur = await box(page, 'مبلغ الخصم الإضافي (العملة)').locator('input').first().inputValue().catch(() => '?');
    rec.note('C2-' + name + '-a', `${name}: before ${g0}, after 10% on screen grand=${await grand()} amtCur=${amtCur} companyAmt=${await summary(page, 'مبلغ الخصم الإضافي (بعملة الشركة الأساسية)')}`);
    const s = await save(page, 9000);
    rec.note('C2-' + name + '-b', 'save', JSON.stringify(s.msgs) + ' ' + s.url);
    if (!isNew(s.url)) {
      await wait(page, 3000);
      rec.note('C2-' + name + '-c', `${name}: saved ${docName(s.url)} grand=${await grand()} pct=${await box(page, 'نسبة الخصم الإضافي').locator('input').first().inputValue().catch(() => '?')} amtCur=${await box(page, 'مبلغ الخصم الإضافي (العملة)').locator('input').first().inputValue().catch(() => '?')}`);
    }
  });
}
