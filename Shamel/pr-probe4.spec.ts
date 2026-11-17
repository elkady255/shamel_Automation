import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe4.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/pricing-rules';
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}
const SECTIONS = ['الخصم على صنف آخر', 'معلومات الطرف', 'الكمية والمبلغ', 'مخطط خصم السعر', 'إعدادات الفترة', 'الهامش'];
async function openAll(page: Page) {
  for (const s of SECTIONS) {
    await main(page).getByRole('button', { name: s, exact: true }).first().evaluate((e: any) => e.click()).catch(() => {});
    await page.waitForTimeout(500);
  }
}
const txt = async (p: Page) => clean(await main(p).innerText()).replace(/^.*?إضافة قاعدة تسعير\s*/, '').slice(0, 1600);
async function pick(page: Page, placeholder: string, option: string) {
  await main(page).getByPlaceholder(placeholder, { exact: true }).first().click();
  await page.waitForTimeout(700);
  const o = page.locator('.cs-option', { hasText: option }).first();
  if (await o.count()) { await o.click(); } else { log(`   !! option "${option}" not found: ` + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean))); await page.keyboard.press('Escape'); }
  await page.waitForTimeout(900);
}
async function options(page: Page, placeholder: string) {
  await main(page).getByPlaceholder(placeholder, { exact: true }).first().click();
  await page.waitForTimeout(900);
  const r = (await page.locator('.cs-option').allInnerTexts()).map(clean);
  await page.keyboard.press('Escape');
  return r;
}

test('apply on variants', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  await openAll(page);
  for (const v of ['مجموعة الأصناف', 'العلامة التجارية', 'المعاملة']) {
    await pick(page, 'اختر ما تنطبق عليه القاعدة', v);
    log(`APPLY ON ${v}: ` + await txt(page));
  }
});

test('product kind', async ({ page }) => {
  await open(page, '/new');
  await openAll(page);
  await pick(page, 'اختر نوع الميزة', 'المنتج');
  log('KIND=PRODUCT: ' + await txt(page));
  const vis = await main(page).locator('input,textarea').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => `${e.type}|${e.placeholder}|max=${e.maxLength}|val=${e.value}`));
  vis.forEach((v) => log('   INPUT ' + v));
});

test('party + rate or discount + margin', async ({ page }) => {
  await open(page, '/new');
  await openAll(page);
  const cbs = main(page).locator('input[type=checkbox]');
  log('CHECKBOX COUNT ' + (await cbs.count()));
  // find selling/buying checkboxes by their label
  const sell = main(page).getByText('البيع', { exact: true }).first();
  const buy = main(page).getByText('الشراء', { exact: true }).first();
  const tryAF = async (label: string) => {
    const ph = 'اختر مجال التطبيق';
    const cands = await main(page).locator('input[type=text]').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => e.placeholder));
    log(`   [${label}] text placeholders: ` + JSON.stringify(cands));
  };
  await tryAF('none');
  await press(sell);
  await page.waitForTimeout(900);
  await tryAF('selling');
  const afPh = (await main(page).locator('input[type=text]').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => e.placeholder))).find((p) => /مطبق|ينطبق|تطبيق على|تنطبق/.test(p) && !/القاعدة/.test(p)) || '';
  log('APPLICABLE FOR placeholder ' + afPh);
  if (afPh) log('   SELLING OPTIONS ' + JSON.stringify(await options(page, afPh)));
  await press(buy);
  await page.waitForTimeout(900);
  if (afPh) log('   SELLING+BUYING OPTIONS ' + JSON.stringify(await options(page, afPh)));
  await press(sell);
  await page.waitForTimeout(900);
  if (afPh) log('   BUYING OPTIONS ' + JSON.stringify(await options(page, afPh)));
  await press(buy);
  await page.waitForTimeout(900);
  log('NONE CHECKED TEXT: ' + await txt(page));
  // rate or discount
  log('RATE OR DISCOUNT OPTIONS ' + JSON.stringify(await options(page, 'اختر السعر أو الخصم')));
  for (const v of ['السعر', 'مبلغ الخصم']) {
    await pick(page, 'اختر السعر أو الخصم', v);
    log(`RATE/DISC = ${v}: ` + await txt(page));
  }
  // margin
  log('MARGIN OPTIONS ' + JSON.stringify(await options(page, 'اختر نوع الهامش')));
  await pick(page, 'اختر نوع الهامش', 'نسبة');
  log('MARGIN = percentage: ' + await txt(page));
});
