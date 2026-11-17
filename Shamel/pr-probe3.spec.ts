import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/pr-probe3.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/pricing-rules';
const inputs = async (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => `${e.type}|${e.placeholder}|max=${e.maxLength}|val=${e.value}|chk=${e.checked}`));
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(R + hash, LOAD);
  await page.waitForTimeout(6000);
}
const SECTIONS = ['الخصم على صنف آخر', 'معلومات الطرف', 'الكمية والمبلغ', 'مخطط خصم السعر', 'إعدادات الفترة', 'الهامش'];

test('sections', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new');
  for (const s of SECTIONS) {
    await press(main(page).getByRole('button', { name: s, exact: true }).first());
    await page.waitForTimeout(900);
  }
  log('ALL OPEN TEXT ' + clean(await main(page).innerText()).slice(0, 3500));
  (await inputs(page)).forEach((x) => log('INPUT ' + x));
});

test('dynamic + advanced tabs', async ({ page }) => {
  await open(page, '/new');
  for (const t of ['الشروط الديناميكية', 'الإعدادات المتقدمة']) {
    await press(main(page).getByRole('button', { name: t, exact: true }).first());
    await page.waitForTimeout(1500);
    log(`TAB ${t} TEXT ` + clean(await main(page).innerText()).slice(0, 1500));
    (await inputs(page)).forEach((x) => log(`TAB ${t} INPUT ` + x));
    log(`TAB ${t} BTNS ` + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  }
});

test('apply on switch', async ({ page }) => {
  await open(page, '/new');
  const applyOn = main(page).getByPlaceholder('اختر ما تنطبق عليه القاعدة', { exact: true });
  await applyOn.click();
  await page.waitForTimeout(1000);
  log('APPLY ON OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean)));
  const kind = main(page).getByPlaceholder('اختر نوع الميزة', { exact: true });
  await page.keyboard.press('Escape');
  await kind.click();
  await page.waitForTimeout(1000);
  log('KIND OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean)));
  await page.keyboard.press('Escape');
  const series = main(page).getByPlaceholder('اختر تسلسل التسمية', { exact: true });
  await series.click();
  await page.waitForTimeout(1000);
  log('SERIES OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean)));
  await page.keyboard.press('Escape');
  for (const v of ['مجموعة الصنف', 'العلامة التجارية', 'المعاملة']) {
    await applyOn.click();
    await page.waitForTimeout(700);
    await page.locator('.cs-option', { hasText: v }).first().click().catch(() => log('NO OPTION ' + v));
    await page.waitForTimeout(1200);
    log(`APPLY ON = ${v} TEXT ` + clean(await main(page).innerText()).slice(0, 900));
    log(`APPLY ON = ${v} BTNS ` + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean)));
  }
});
