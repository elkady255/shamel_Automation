import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe5c.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/pricing-rules';
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}
const SECTIONS = ['الخصم على صنف آخر', 'معلومات الطرف', 'الكمية والمبلغ', 'مخطط خصم السعر', 'مخطط خصم المنتج', 'إعدادات الفترة', 'الهامش'];
async function openAll(page: Page) {
  for (const s of SECTIONS) {
    const b = main(page).getByRole('button', { name: s, exact: true }).first();
    if (await b.count()) { await b.evaluate((e: any) => e.click()).catch(() => {}); await page.waitForTimeout(500); }
  }
}
// snapshot: visible text inputs (placeholder|value) + checkbox count/state
const snap = async (p: Page) => main(p).locator('input,textarea').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null && e.type !== 'search').map((e: any, i) => e.type === 'checkbox' ? `[cb${e.checked ? 'X' : ''}]` : `${e.placeholder}=${e.value}`));
const diff = (a: string[], b: string[]) => ({ added: b.filter((x) => !a.includes(x)), removed: a.filter((x) => !b.includes(x)), cb: `${a.filter((x) => x.startsWith('[cb')).length}->${b.filter((x) => x.startsWith('[cb')).length}` });
async function pick(page: Page, placeholder: string, option: string) {
  await main(page).getByPlaceholder(placeholder, { exact: true }).first().click();
  await page.waitForTimeout(700);
  const o = page.locator('.cs-option', { hasText: option }).first();
  if (await o.count()) await o.click(); else { log(`   !! option "${option}" not found: ` + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean))); await page.keyboard.press('Escape'); }
  await page.waitForTimeout(900);
}
async function options(page: Page, placeholder: string) {
  await main(page).getByPlaceholder(placeholder, { exact: true }).first().click();
  await page.waitForTimeout(900);
  const r = (await page.locator('.cs-option').allInnerTexts()).map(clean);
  await page.keyboard.press('Escape');
  return r;
}
async function tickIdx(page: Page, idx: number, what: string) {
  const before = await snap(page);
  const cbs = main(page).locator('input[type=checkbox]');
  const vis: any[] = [];
  for (let i = 0; i < (await cbs.count()); i++) if (await cbs.nth(i).evaluate((e: any) => e.offsetParent !== null)) vis.push(cbs.nth(i));
  if (!vis[idx]) { log(`   !! no visible checkbox #${idx} for ${what} (have ${vis.length})`); return; }
  await press(vis[idx]);
  await page.waitForTimeout(1000);
  log(`TICK ${what}: ` + JSON.stringify(diff(before, await snap(page))));
}

test('party', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  await openAll(page);
  await tickIdx(page, 3, 'Selling');
  const afterSell = await snap(page);
  const afPh = afterSell.map((x) => x.split('=')[0]).filter((p) => /اختر/.test(p) && !['اختر تسلسل التسمية', 'اختر ما تنطبق عليه القاعدة', 'اختر نوع الميزة', 'اختر الصنف الذي يحصل على الخصم', 'اختر السعر أو الخصم', 'اختر التاريخ', 'اختر نوع الهامش'].includes(p));
  log('AF CANDIDATES ' + JSON.stringify(afPh));
  const ph = 'اختر الطرف الذي تنطبق عليه القاعدة';
  if (ph) {
    log('SELLING OPTIONS ' + JSON.stringify(await options(page, ph)));
    await tickIdx(page, 4, 'Buying');
    log('SELLING+BUYING OPTIONS ' + JSON.stringify(await options(page, ph)));
    await tickIdx(page, 3, 'Selling off');
    log('BUYING OPTIONS ' + JSON.stringify(await options(page, ph)));
    for (const v of ['المورد', 'مجموعة الموردين']) {
      const b = await snap(page);
      await pick(page, ph, v);
      log(`AF=${v}: ` + JSON.stringify(diff(b, await snap(page))));
    }
    await tickIdx(page, 3, 'Selling on again');
    for (const v of ['العميل', 'الإقليم', 'مجموعة العملاء', 'شريك المبيعات', 'الحملة']) {
      const b = await snap(page);
      await pick(page, ph, v);
      log(`AF=${v}: ` + JSON.stringify(diff(b, await snap(page))));
    }
    await tickIdx(page, 4, 'Buying off');
    await tickIdx(page, 3, 'Selling off 2');
    log('NONE CHECKED: AF still present = ' + (await snap(page)).some((x) => x.startsWith(ph)));
  }
});

test.skip('flags item code', async ({ page }) => {
  await open(page, '/new');
  await openAll(page);
  await tickIdx(page, 0, 'Mixed conditions');
  await tickIdx(page, 0, 'Mixed off');
  await tickIdx(page, 1, 'Cumulative');
  await tickIdx(page, 2, 'Coupon code');
});

test('product scheme', async ({ page }) => {
  await open(page, '/new');
  await pick(page, 'اختر نوع الميزة', 'المنتج');
  await openAll(page);
  log('PRODUCT BASE ' + JSON.stringify(await snap(page)));
  await tickIdx(page, 5, 'Same item');
  await tickIdx(page, 5, 'Same item off');
  await tickIdx(page, 7, 'Is recursive');
  log('AFTER RECURSIVE ' + JSON.stringify((await snap(page)).slice(15)));
});

test.skip('advanced', async ({ page }) => {
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: 'الإعدادات المتقدمة', exact: true }).first());
  await page.waitForTimeout(1200);
  log('ADV BASE ' + JSON.stringify(await snap(page)));
  await tickIdx(page, 0, 'Apply multiple');
  await tickIdx(page, 1 + 1, 'Validate applied rule (after apply multiple added a cb)');
  await tickIdx(page, 3, 'Has priority');
  const pr = (await snap(page)).map((x) => x.split('=')[0]).filter((p) => /اختر/.test(p));
  log('ADV placeholders ' + JSON.stringify(pr));
  if (pr[0]) log('PRIORITY OPTIONS ' + JSON.stringify(await options(page, pr[0])));
});
