import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe9.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('pos offers', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/pricing-rules/new', LOAD);
  await page.waitForTimeout(6000);
  for (const s of ['معلومات الطرف', 'الخصم على صنف آخر']) {
    await main(page).getByRole('button', { name: s, exact: true }).first().evaluate((e: any) => e.click()).catch(() => {});
    await page.waitForTimeout(500);
  }
  await press(main(page).getByRole('button', { name: /إضافة صنف/ }).first());
  await page.waitForTimeout(1000);
  const itemIn = main(page).getByPlaceholder(/ابحث.*صنف/).first();
  await itemIn.click();
  await page.waitForTimeout(1500);
  await page.locator('.cs-option').first().click();
  await page.waitForTimeout(1000);
  const cbs = main(page).locator('input[type=checkbox]');
  const vis: any[] = [];
  for (let i = 0; i < (await cbs.count()); i++) if (await cbs.nth(i).evaluate((e: any) => e.offsetParent !== null)) vis.push(cbs.nth(i));
  log('VISIBLE CHECKBOXES (one row, Item Code) ' + vis.length);
  const t0 = clean(await main(page).innerText());
  log('HAS POS WORD ' + /نقطة البيع|POS|عروض/.test(t0.replace(/^.*?إضافة قاعدة تسعير/, '')));
  await press(vis[3]); // selling
  await page.waitForTimeout(1000);
  const t1 = clean(await main(page).innerText()).replace(/^.*?إضافة قاعدة تسعير/, '');
  log('AFTER SELLING + ONE ROW: pos/offers word present = ' + /نقطة البيع|POS|عروض/.test(t1));
  log('LABELS ' + t1.slice(0, 900));
});
