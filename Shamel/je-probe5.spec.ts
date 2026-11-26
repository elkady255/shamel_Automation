// Probe: tabs, tax withholding, column settings, bulk edit and details actions (nothing saved).
import { test } from '@playwright/test';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';

test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 15_000 });

test('screens', async ({ page }) => {
  test.setTimeout(400_000);
  const w = (ms: number) => page.waitForTimeout(ms);
  const dump = async (tag: string) => {
    console.log(tag, 'FIELDS', JSON.stringify(await u.fields(page)));
    console.log(tag, 'TOGGLES', JSON.stringify(await u.main(page).locator('.toggle-row:visible').allInnerTexts()));
    console.log(tag, 'SECTIONS', JSON.stringify(await u.sections(page)));
    console.log(tag, 'BUTTONS', JSON.stringify((await u.main(page).locator('button:visible').evaluateAll((bs: any[]) => bs.map((b) => b.innerText.trim() || b.title))).filter(Boolean))); // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  const tab = async (n: string) => { await u.main(page).locator('button, [role=tab], li, a').filter({ hasText: new RegExp('^\\s*' + n + '\\s*\\d*\\s*$') }).last().click().catch((e) => console.log('tab', n, e.message.slice(0, 80))); await w(2500); };
  const modal = () => page.locator('.qr-dialog:visible, .base-modal:visible, [role=dialog]:visible').last();
  const text = async () => (await modal().innerText({ timeout: 5000 }).catch(() => 'NONE')).replace(/\s+/g, ' ');
  const close = async () => { await modal().locator('button').filter({ hasText: /^\s*(إلغاء|إغلاق)\s*$/ }).last().click({ timeout: 5000 }).catch(async () => { await modal().locator('.qr-close, .close-btn').first().click({ timeout: 4000 }).catch(() => {}); }); await w(1200); };
  await u.open(page, '/desk/shamel#/accounting/journal-entries/new');
  await tab('المعلومات الاضافية'); await dump('MORE-JE'); await page.screenshot({ path: 'Shamel/je-results/p5-more.png', fullPage: true }); await tab('التفاصيل');
  for (const type of ['إشعار دائن', 'قيد شطب', 'قيد يومية بين الشركات', 'قيد بنكي']) {
    await f.option(page, 'نوع القيد', type).catch((e) => console.log('type', type, e.message.slice(0, 80))); await w(1500);
    await dump(type);
    if (type === 'إشعار دائن') {
      await u.main(page).locator('.toggle-row').filter({ hasText: /ضر/ }).locator('.is-switch-slider').click({ force: true }).catch((e) => console.log('tds', e.message.slice(0, 80))); await w(2500);
      await dump('TDS'); const tabs = await u.main(page).locator('[role=tab]:visible, .tabs button:visible').allInnerTexts(); console.log('TDS TABS', JSON.stringify(tabs));
      await tab('حجز الضرائب'); await dump('TDSTAB'); console.log('TDSTAB TABLES', JSON.stringify(await u.tablesInfo(page))); await page.screenshot({ path: 'Shamel/je-results/p5-tds.png', fullPage: true }); await tab('التفاصيل');
    } else { await tab('المعلومات الاضافية'); await dump('MORE-' + type); await tab('التفاصيل'); }
  }
  await u.main(page).getByRole('button', { name: 'إضافة صف' }).click(); await w(2000);
  await u.main(page).locator('button[title="إعدادات الجدول"]').first().click(); await w(2000); console.log('SETTINGS', await text());
  await modal().getByText('إضافة/إزالة حقول').click().catch((e) => console.log('cols', e.message.slice(0, 80))); await w(2000); console.log('COLUMNS', await text()); await close(); await close();
  await u.main(page).locator('table:visible tbody input[type=checkbox]').first().click({ force: true }).catch(() => {}); await w(1200);
  console.log('SELECTED', JSON.stringify((await u.main(page).locator('button:visible').allInnerTexts()).filter(Boolean)));
  await u.open(page, '/desk/shamel#/accounting/journal-entries');
  console.log('LIST HEAD', JSON.stringify(await u.main(page).locator('thead th:visible').allInnerTexts()));
  console.log('LIST ROW', (await u.main(page).locator('tbody tr').first().innerText()).replace(/\s+/g, ' '));
  const name = d.data()['JE-J02'];
  await u.main(page).locator('input[placeholder="البحث باستخدام الID"]').fill(name); await page.keyboard.press('Enter'); await w(4000);
  await u.main(page).locator(`input.check_item[data-id="${name}"]`).click(); await w(1500);
  console.log('BULK', JSON.stringify((await page.locator('button:visible').allInnerTexts()).filter((s) => s.trim())));
  await page.locator('button:visible').filter({ hasText: /^\s*تعديل\s*$/ }).first().click(); await w(2000);
  await modal().locator('input:visible').first().click(); await w(1500); console.log('BULKFIELDS', JSON.stringify(await page.locator('.cs-option:visible').allInnerTexts()));
  await u.open(page, '/desk/shamel#/accounting/journal-entries/' + name); await dump('SUBMITTED'); await page.screenshot({ path: 'Shamel/je-results/p5-sub.png', fullPage: true });
  await u.main(page).getByRole('button', { name: /الإجراءات|إجراءات/ }).first().click().catch((e) => console.log('actions', e.message.slice(0, 80))); await w(1500);
  console.log('ACTIONS', JSON.stringify(await page.locator('[role=menu]:visible, [role=menuitem]:visible, .dropdown-menu:visible').allInnerTexts()));
  await tab('المعلومات الاضافية'); await dump('SUB-MORE'); await tab('السجلات المرتبطة'); console.log('CONN', (await u.main(page).innerText()).replace(/\s+/g, ' ').slice(-500));
});
