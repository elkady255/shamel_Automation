import { test, type Page } from '@playwright/test';
import { get } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/bo-probe5.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const NAME = 'MFG-BLR-2026-00005';
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack]').allInnerTexts()).map(clean).filter(Boolean);
const btns = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);
const open = async (page: Page, name = NAME) => { await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/blanket-orders/' + name, LOAD); await page.waitForTimeout(8000); };

test('draft detail', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page);
  log('DRAFT TEXT ' + clean(await main(page).innerText()).replace(/^.*?(تفاصيل|الأمر)/, '$1').slice(0, 900));
  log('DRAFT BTNS ' + JSON.stringify(await btns(page)));
  log('DRAFT TITLES ' + JSON.stringify(await main(page).locator('[title]').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any) => e.title))));
  log('DRAFT TABS ' + JSON.stringify((await main(page).getByRole('tab').allInnerTexts()).map(clean)));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-draft.png' });
  // Setting popup
  await press(main(page).locator('table button').first());
  await page.waitForTimeout(1500);
  log('SETTING popup ' + clean(await page.evaluate(() => { const t = document.body.innerText.replace(/\s+/g, ' '); const i = t.indexOf('تعديل الأعمدة'); return i >= 0 ? t.slice(i, i + 300) : 'NOT FOUND'; })));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-setting.png' });
});

test('edit row popup', async ({ page }) => {
  await open(page);
  await press(main(page).locator('[title="تعديل الصف"]').first());
  await page.waitForTimeout(2000);
  log('EDIT ROW ' + clean(await page.evaluate(() => { const t = document.body.innerText.replace(/\s+/g, ' '); const i = t.indexOf('تعديل الصف'); return i >= 0 ? t.slice(i, i + 700) : 'NOT FOUND'; })));
  log('EDIT ROW INPUTS ' + JSON.stringify(await page.locator('input:visible,textarea:visible').evaluateAll((els) => els.slice(-9).map((e: any) => `${e.className.slice(0, 9)}|${e.type}|max=${e.maxLength}|ro=${e.readOnly}|val=${String(e.value).slice(0, 30)}`))));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-editrow.png' });
});

test('submit + cancel + amend', async ({ page }) => {
  await open(page);
  await press(main(page).getByRole('button', { name: 'اعتماد', exact: true }).or(main(page).getByRole('button', { name: 'تقديم', exact: true })).first());
  await page.waitForTimeout(5000);
  log('SUBMIT toasts ' + JSON.stringify(await toasts(page)).slice(0, 300));
  let d = await get('Blanket Order', NAME); log('API after submit docstatus=' + d.docstatus);
  await open(page);
  log('SUBMITTED BTNS ' + JSON.stringify(await btns(page)));
  log('SUBMITTED header ' + clean(await main(page).innerText()).slice(0, 120));
  log('SUBMITTED editable inputs ' + (await main(page).locator('input:visible:not([disabled]):not([readonly])').count()));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-submitted.png' });
});
