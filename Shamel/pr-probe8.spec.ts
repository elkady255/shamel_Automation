import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe8.out.txt';
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
  for (let i = 0; i < (await d.count()); i++) out.push(clean(await d.nth(i).innerText()).slice(0, 1000));
  return out;
};

test('items table on new', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: /إضافة صنف/ }).first());
  await page.waitForTimeout(1200);
  log('NEW TABLE TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.map((e: any) => e.title).filter(Boolean))));
  const html = await main(page).locator('[title="إعدادات الجدول"]').first().evaluate((e: any) => e.closest('div')?.parentElement?.parentElement?.outerHTML.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/\s+/g, ' ').slice(0, 1500) || '');
  log('TABLE HTML ' + html);
  log('ROW INPUTS ' + JSON.stringify(await main(page).locator('input').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null && /صنف|وحدة/.test(e.placeholder)).map((e: any) => `${e.placeholder}|val=${e.value}`))));
  const itemIn = main(page).getByPlaceholder(/ابحث.*صنف/).first();
  log('ITEM INPUT COUNT ' + (await itemIn.count()));
  if (await itemIn.count()) {
    await itemIn.click();
    await page.waitForTimeout(1500);
    const opts = (await page.locator('.cs-option').allInnerTexts()).map(clean);
    log('ITEM OPTIONS ' + opts.length + ' ' + JSON.stringify(opts.slice(0, 3)));
    await page.locator('.cs-option').first().click();
    await page.waitForTimeout(1500);
    log('AFTER ITEM PICK ' + JSON.stringify(await main(page).locator('input').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null && /صنف|وحدة/.test(e.placeholder)).map((e: any) => `${e.placeholder}|val=${e.value}`))));
    const uom = main(page).getByPlaceholder(/وحدة/).first();
    await uom.click();
    await page.waitForTimeout(1200);
    log('UOM OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean).slice(0, 8)));
    await page.keyboard.press('Escape');
  }
  await press(main(page).locator('[title="إعدادات الجدول"]').first());
  await page.waitForTimeout(1200);
  log('SETTING ' + JSON.stringify(await dlgs(page)));
  log('SETTING BTNS ' + JSON.stringify((await page.locator('[role=dialog] button, .base-modal button').allInnerTexts()).map(clean)));
  const addrem = page.getByRole('button', { name: /إضافة\/إزالة/ }).first();
  if (await addrem.count()) { await press(addrem); await page.waitForTimeout(1200); log('ADD/REMOVE ' + JSON.stringify(await dlgs(page))); }
  await page.keyboard.press('Escape'); await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  await press(main(page).locator('[title="تعديل الصف"]').first());
  await page.waitForTimeout(1200);
  log('EDIT ROW ' + JSON.stringify(await dlgs(page)));
  await page.keyboard.press('Escape');
});
