import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/bo-probe4.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const opts = async (p: Page) => (await p.locator('.cs-option').allInnerTexts()).map(clean);
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack]').allInnerTexts()).map(clean).filter(Boolean);
const modal = async (p: Page) => { const t = clean(await p.evaluate(() => { const els=[...document.querySelectorAll('body *')].filter((e: any)=>e.offsetParent!==null && /fixed/.test(getComputedStyle(e).position) && e.innerText && e.innerText.length<400 && e.getBoundingClientRect().width>200 && e.getBoundingClientRect().width<800); return els.map((e:any)=>e.innerText).slice(-1)[0]||''; })); await p.keyboard.press('Escape'); await p.waitForTimeout(600); const x = p.locator('button:has(svg)').filter({hasText:/^$/}).first(); return t; };
const errs = (p: Page) => p.evaluate(() => [...document.querySelectorAll('.cd-error')].map((e: any) => e.innerText.trim()).filter(Boolean));
const cs = (p: Page, i: number) => main(p).locator('input.cs-input').nth(i);
const pickDay = async (page: Page, idx: number, day: string) => {
  const d = main(page).locator('input.flatpickr-input:visible').nth(idx);
  await d.click({ force: true }); await page.waitForTimeout(800);
  await page.locator('.flatpickr-calendar.open .flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)').filter({ hasText: new RegExp('^' + day + '$') }).first().click();
  await page.waitForTimeout(600);
};
async function head(page: Page) {
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/blanket-orders/new', LOAD);
  await page.waitForTimeout(8000);
  await cs(page, 0).click(); await page.waitForTimeout(800); await page.locator('.cs-option').first().click(); await page.waitForTimeout(500);
  await cs(page, 1).click(); await page.waitForTimeout(800); await page.locator('.cs-option').first().click(); await page.waitForTimeout(1500);
  const c = cs(page, 2); await c.click(); await c.fill('PW Test'); await page.waitForTimeout(2000); await page.locator('.cs-option').first().click(); await page.waitForTimeout(1500);
  await pickDay(page, 0, '12'); await pickDay(page, 1, '20');
  const comp = cs(page, 3); await comp.click(); await comp.fill('Ahmed'); await page.waitForTimeout(2000);
  log('COMPANY OPTIONS ' + JSON.stringify((await opts(page)).slice(0, 3)));
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(1000);
}

test('item row + save', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await head(page);
  await press(main(page).getByRole('button', { name: 'إضافة صنف' }).first());
  await page.waitForTimeout(1500);
  log('TABLE HEADERS ' + JSON.stringify((await main(page).locator('table th').allInnerTexts()).map(clean)));
  log('ROW INPUTS ' + JSON.stringify(await main(page).locator('table tbody tr').first().locator('input').evaluateAll((els) => els.map((e: any) => `${e.className.slice(0, 9)}|${e.type}|ph=${e.placeholder}|max=${e.maxLength}|val=${e.value}`))));
  log('ROW TITLES ' + JSON.stringify(await main(page).locator('table').first().locator('[title]').evaluateAll((els) => els.map((e: any) => e.title))));
  // save with empty row
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await page.waitForTimeout(3000);
  log('SAVE EMPTY ROW modal ' + (await modal(page)) + ' errs ' + JSON.stringify(await errs(page)));
  // item
  const row = main(page).locator('table tbody tr').first();
  const itemIn = row.locator('input.cs-input').first();
  await itemIn.click(); await page.waitForTimeout(2000);
  log('ITEM OPEN options count=' + (await opts(page)).length + ' ' + JSON.stringify((await opts(page)).slice(0, 4)));
  await itemIn.fill('IND182210'); await page.waitForTimeout(2200);
  await page.locator('.cs-option').first().click(); await page.waitForTimeout(2500);
  log('ROW AFTER ITEM ' + JSON.stringify(await row.locator('input').evaluateAll((els) => els.map((e: any) => `${e.type}|val=${e.value}`))) + ' text ' + clean(await row.innerText()));
  // save without rate
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await page.waitForTimeout(3000);
  log('SAVE NO RATE modal ' + (await modal(page)) + ' errs ' + JSON.stringify(await errs(page)));
  const nums = row.locator('input[type=number], input.cd-input');
  log('NUM INPUT COUNT ' + (await nums.count()));
  await nums.nth(0).fill('10'); await nums.nth(1).fill('150');
  await press(main(page).getByRole('button', { name: 'حفظ', exact: true })); await page.waitForTimeout(5000);
  log('SAVE VALID modal/toasts ' + (await modal(page)) + JSON.stringify(await toasts(page)).slice(0, 300) + ' errs ' + JSON.stringify(await errs(page)) + ' url ' + page.url());
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-saved.png' });
});

