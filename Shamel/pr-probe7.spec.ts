import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe7.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/pricing-rules';
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}
const dlgs = async (p: Page) => {
  const d = p.locator('[role=dialog], .base-modal');
  const out: string[] = [];
  for (let i = 0; i < (await d.count()); i++) out.push(clean(await d.nth(i).innerText()).slice(0, 900));
  return out;
};
const SECTIONS = ['الخصم على صنف آخر', 'معلومات الطرف', 'الكمية والمبلغ', 'مخطط خصم السعر', 'إعدادات الفترة', 'الهامش'];
async function openAll(page: Page) {
  for (const s of SECTIONS) {
    const b = main(page).getByRole('button', { name: s, exact: true }).first();
    if (await b.count()) { await b.evaluate((e: any) => e.click()).catch(() => {}); await page.waitForTimeout(400); }
  }
}

test('items table', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: /إضافة صنف/ }).first());
  await page.waitForTimeout(1000);
  const wr = main(page).locator('.id-uom-table-wrapper');
  log('WRAPPERS ' + (await wr.count()));
  log('TABLE TEXT ' + clean(await wr.first().innerText()).slice(0, 400));
  log('HEADERS ' + JSON.stringify(await wr.first().locator('.id-uom-th .id-uom-td').allInnerTexts()));
  log('ROW INPUTS ' + JSON.stringify(await wr.first().locator('input').evaluateAll((els) => els.map((e: any) => `${e.type}|${e.placeholder}|val=${e.value}`))));
  // item list
  const item = wr.first().locator('input[type=text]').first();
  await item.click();
  await page.waitForTimeout(1500);
  const opts = (await page.locator('.cs-option').allInnerTexts()).map(clean);
  log('ITEM OPTIONS ' + opts.length + ' ' + JSON.stringify(opts.slice(0, 4)));
  await page.locator('.cs-option').first().click();
  await page.waitForTimeout(1500);
  log('AFTER ITEM PICK ' + JSON.stringify(await wr.first().locator('input').evaluateAll((els) => els.map((e: any) => `${e.placeholder}|val=${e.value}`))));
  const uom = wr.first().locator('input[type=text]').nth(1);
  await uom.click();
  await page.waitForTimeout(1200);
  log('UOM OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean).slice(0, 10)));
  await page.keyboard.press('Escape');
  // settings popup
  await press(wr.first().locator('.id-uom-settings'));
  await page.waitForTimeout(1200);
  log('SETTING ' + JSON.stringify(await dlgs(page)));
  const addrem = page.getByRole('button', { name: /إضافة\/إزالة/ }).first();
  if (await addrem.count()) { await press(addrem); await page.waitForTimeout(1200); log('ADD/REMOVE ' + JSON.stringify(await dlgs(page))); }
  await page.keyboard.press('Escape'); await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  // edit row
  await press(wr.first().locator('.id-uom-edit').first());
  await page.waitForTimeout(1200);
  log('EDIT ROW ' + JSON.stringify(await dlgs(page)));
  await page.keyboard.press('Escape');
  // row select -> delete
  await press(wr.first().locator('.id-uom-td-row .id-uom-checkbox').first());
  await page.waitForTimeout(800);
  log('ROW SELECT PAGE BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
});

test('save messages', async ({ page }) => {
  await open(page, '/new');
  await openAll(page);
  const title = main(page).getByPlaceholder('أدخل عنوان قاعدة التسعير', { exact: true });
  await title.fill('a');
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true }));
  await page.waitForTimeout(2500);
  const t = clean(await main(page).innerText());
  log('SAVE title=a: ' + t.replace(/^.*?إضافة قاعدة تسعير\s*/, '').slice(0, 1500));
  // numeric field behaviours
  const nums = main(page).getByPlaceholder('أدخل رقمًا', { exact: true });
  const n = await nums.count();
  log('NUMERIC FIELDS ' + n);
  for (let i = 0; i < n; i++) {
    const f = nums.nth(i);
    if (!(await f.evaluate((e: any) => e.offsetParent !== null))) continue;
    await f.fill('abc');
    const v1 = await f.inputValue();
    await f.fill('-5');
    const v2 = await f.inputValue();
    await f.fill('1.5');
    const v3 = await f.inputValue();
    await f.fill('9'.repeat(120));
    const v4 = (await f.inputValue()).length;
    await f.fill('');
    log(`NUM #${i}: abc->"${v1}" -5->"${v2}" 1.5->"${v3}" 120 digits->${v4}`);
  }
});

test('details + delete confirm', async ({ page }) => {
  await open(page, '/PRLE-0001');
  log('DET TEXT ' + clean(await main(page).innerText()).slice(0, 1800));
  log('DET TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title).filter(Boolean))));
  log('DET BTNS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  await press(main(page).locator('[title="حذف"]').first());
  await page.waitForTimeout(1500);
  log('DELETE CONFIRM ' + clean(await page.locator('.shamel-confirm-overlay').first().innerText().catch(() => 'no confirm')));
  await press(page.locator('.shamel-confirm-actions button').first()).catch(() => {});
  await page.waitForTimeout(600);
  log('AFTER CANCEL URL ' + page.url());
});
