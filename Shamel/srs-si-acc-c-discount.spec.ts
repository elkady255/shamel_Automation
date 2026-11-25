import { test } from '@playwright/test';
import { openNew, combo, box, main, wait, recorder, summary, num, addItem, save, closeModal, isNew, docName, messages } from './helpers/si-ui';
test.describe.configure({ timeout: 400_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const rec = recorder('c-discount');
for (const mode of ['pct', 'amount'] as const) {
  test('C3 discount ' + mode, async ({ page }) => {
    await openNew(page); await combo(page, 'شركة', 'Ahmed'); await combo(page, 'العميل', 'PW Test');
    await addItem(page, 'IND182210', '1', null); await wait(page, 4000);
    const r = main(page).locator('table.si-table tbody tr').first().locator('input[type=number]').nth(1);
    await r.fill('1000'); await r.press('Tab'); await wait(page, 2000);
    await combo(page, 'تطبيق الخصم الإضافي على', '', 1);
    const f = box(page, mode === 'pct' ? 'نسبة الخصم الإضافي' : 'مبلغ الخصم الإضافي (العملة)').locator('input').first();
    await f.click(); await f.type(mode === 'pct' ? '10' : '250', { delay: 50 }); await f.press('Tab'); await wait(page, 3000);
    const typed = await messages(page); rec.check('C3-' + mode + '-calc', 'typing the additional discount (' + mode + ') does not raise a server error and updates the totals', !typed.some((x) => /TypeError|خطأ في الخادم/.test(x)), JSON.stringify(typed), 'SI-33'); await closeModal(page);
    const labels = (await main(page).locator('label,.cd-label').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
    rec.note('C3-' + mode + '-labels', 'labels containing خصم', JSON.stringify(labels.filter((l) => /خصم/.test(l))));
    const s = await save(page, 9000);
    rec.note('C3-' + mode + '-save', 'save', JSON.stringify(s.msgs) + ' ' + s.url);
    await page.screenshot({ path: `Shamel/si8-c3-${mode}.png` });
    await closeModal(page);
    rec.note('C3-' + mode + '-errs', 'inline errors after closing', JSON.stringify((await page.evaluate(() => [...document.querySelectorAll('[class*=error]')].filter((e: any) => e.offsetParent && typeof e.innerText === 'string' && e.innerText.trim()).map((e: any) => e.innerText.trim().slice(0, 80))))));
    if (!isNew(s.url)) rec.note('C3-' + mode + '-doc', 'created', docName(s.url));
  });
}
