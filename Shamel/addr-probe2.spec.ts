import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 300_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/addr-probe2.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/addresses${hash}`, LOAD);
  await page.waitForTimeout(6000);
}
const opts = async (p: Page) => (await p.locator('.cs-option, [role=option]').locator('visible=true').allInnerTexts()).map(clean);

test('chain', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  await main(page).getByPlaceholder('اختر نوع العنوان').click({ force: true });
  await page.waitForTimeout(1000);
  log('TYPE OPTS ' + JSON.stringify(await opts(page)));
  log('TYPE POP ' + clean(await page.locator('body').innerText()).slice(0, 0));
  await page.keyboard.press('Escape');
  await main(page).getByPlaceholder('ابحث واختر الدولة').click({ force: true });
  await page.waitForTimeout(800);
  await main(page).getByPlaceholder('ابحث واختر الدولة').fill('Saudi');
  await page.waitForTimeout(1500);
  log('COUNTRY SEARCH ' + JSON.stringify(await opts(page)));
  await press(page.locator('.cs-option').locator('visible=true').first());
  await page.waitForTimeout(1200);
  // governorate
  const gov = main(page).getByPlaceholder('ابحث واختر المحافظة');
  log('GOV placeholder count ' + (await gov.count()));
  await gov.click({ force: true });
  await page.waitForTimeout(1500);
  const g = await opts(page);
  log('GOV OPTS count ' + g.length + ' ' + JSON.stringify(g.slice(0, 20)));
  if (g.length) {
    await press(page.locator('.cs-option').locator('visible=true').first());
    await page.waitForTimeout(1200);
    const city = main(page).locator('input').nth(7);
    await city.click({ force: true });
    await page.waitForTimeout(1500);
    const c = await opts(page);
    log('CITY OPTS count ' + c.length + ' ' + JSON.stringify(c.slice(0, 20)));
    await page.keyboard.press('Escape');
  }
  // change country again -> are governorate/city cleared?
  log('INPUT VALUES after chain ' + JSON.stringify(await main(page).locator('input[type=text]').evaluateAll((els) => els.map((e: any) => e.value))));
  // checkbox state before any link
  log('CHECKS ' + JSON.stringify(await main(page).locator('input[type=checkbox]').evaluateAll((els) => els.map((e: any) => e.checked))));
  // tax category
  await main(page).getByPlaceholder('ابحث واختر الفئة الضريبية').click({ force: true });
  await page.waitForTimeout(1200);
  log('TAXCAT ' + JSON.stringify(await opts(page)));
  await page.keyboard.press('Escape');
});

test('links', async ({ page }) => {
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: /إضافة رابط/ }));
  await page.waitForTimeout(1000);
  await main(page).getByPlaceholder('نوع المستند').locator('visible=true').first().click({ force: true });
  await page.waitForTimeout(1200);
  log('LINK DOCTYPES ' + JSON.stringify(await opts(page)));
  await press(page.locator('.cs-option').locator('visible=true').first());
  await page.waitForTimeout(1000);
  const nm = main(page).locator('input[placeholder="المستند"], input[placeholder*="اسم"]').last();
  log('LINK NAME ph ' + (await main(page).locator('input').evaluateAll((els) => els.slice(-2).map((e: any) => e.placeholder))));
  // table header + row action buttons
  log('TABLE HEAD ' + clean(await main(page).locator('table').last().innerText()));
  log('ROW TITLES ' + JSON.stringify(await main(page).locator('table [title]').evaluateAll((els) => els.map((e: any) => e.title))));
  // edit row popup
  const edit = main(page).locator('[title="تعديل الصف"]').first();
  if (await edit.count()) {
    await press(edit);
    await page.waitForTimeout(1200);
    log('EDIT ROW POPUP ' + clean(await page.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog')));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }
  const set = main(page).locator('[title="إعدادات الجدول"]').first();
  if (await set.count()) {
    await press(set);
    await page.waitForTimeout(1200);
    log('SETTING POPUP ' + clean(await page.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog')));
  }
});

test('company-flag', async ({ page }) => {
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: /إضافة رابط/ }));
  await page.waitForTimeout(800);
  const rowsBefore = await main(page).locator('table tbody tr').count();
  const boxes = main(page).locator('input[type=checkbox]');
  log('CHECKBOX COUNT ' + (await boxes.count()));
  await press(boxes.nth(3));
  await page.waitForTimeout(1200);
  log('AFTER COMPANY CHECK rows before ' + rowsBefore + ' after ' + (await main(page).locator('table tbody tr').count()) + ' text ' + clean(await main(page).innerText()).slice(-500));
  log('INPUTS ' + JSON.stringify(await main(page).locator('input[type=text]').evaluateAll((els) => els.slice(-3).map((e: any) => e.placeholder + '=' + e.value + ' dis=' + e.disabled))));
});

test('list-actions', async ({ page }) => {
  await open(page, '');
  await main(page).locator('tbody tr').first().getByRole('checkbox').evaluate((e: any) => e.click());
  await page.waitForTimeout(800);
  await press(main(page).getByRole('button', { name: 'تعديل', exact: true }));
  await page.waitForTimeout(1500);
  log('EDIT POPUP ' + clean(await page.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'none')));
  await page.getByRole('dialog').locator('input').first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(1200);
  log('EDIT FIELD OPTS ' + JSON.stringify((await opts(page)).slice(0, 40)));
  await page.keyboard.press('Escape');
  // status values in list
  const rows = await main(page).locator('tbody tr').allInnerTexts();
  log('STATUS VALUES ' + JSON.stringify([...new Set(rows.map((r) => clean(r)).map((r) => (r.match(/مفعل|غير مفعل|Enabled|Disabled/) || [''])[0]))]));
});

