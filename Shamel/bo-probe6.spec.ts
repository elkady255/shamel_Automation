import { test, type Page } from '@playwright/test';
import { get } from './helpers/qt-api';
import * as fs from 'fs';

test.describe.configure({ timeout: 290_000 });
test.use({ viewport: { width: 1500, height: 1500 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/bo-probe6.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const NAME = 'MFG-BLR-2026-00005';
const toasts = async (p: Page) => (await p.locator('[class*=toast],[class*=Toast],[role=alert],[class*=snack]').allInnerTexts()).map(clean).filter(Boolean);
const btns = async (p: Page) => (await main(p).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);
const open = async (page: Page, name = NAME) => { await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/blanket-orders/' + name, LOAD); await page.waitForTimeout(8000); };

test('create menu + linked', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page);
  await press(main(page).getByRole('button', { name: 'إنشاء', exact: true }));
  await page.waitForTimeout(1000);
  log('CREATE MENU ' + JSON.stringify((await page.locator('[role=menu] *, [class*=dropdown] *, [class*=menu-item], [class*=popover] *').allInnerTexts()).map(clean).filter(Boolean)));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-create-menu.png' });
  await page.keyboard.press('Escape');
  await open(page);
  await press(main(page).getByRole('button', { name: /السجلات المرتبطة/ }));
  await page.waitForTimeout(1500);
  log('LINKED ' + clean(await main(page).innerText()).replace(/^.*?السجلات المرتبطة/, '').slice(0, 300));
});

test('click create sales order', async ({ page }) => {
  await open(page);
  await press(main(page).getByRole('button', { name: 'إنشاء', exact: true }));
  await page.waitForTimeout(800);
  const item = page.locator('text=/أمر بيع|أوامر البيع|Sales Order/').last();
  log('SO item present ' + (await item.count()));
  if (await item.count()) { await press(item); await page.waitForTimeout(6000); log('AFTER CLICK url ' + page.url() + ' toasts ' + JSON.stringify(await toasts(page)).slice(0, 300) + ' text ' + clean(await main(page).innerText()).slice(0, 200)); }
});

test('cancel + amend', async ({ page }) => {
  await open(page);
  await press(main(page).getByRole('button', { name: 'إلغاء المستند', exact: true }));
  await page.waitForTimeout(4000);
  log('CANCEL toasts ' + JSON.stringify(await toasts(page)).slice(0, 300) + ' dialog? ' + clean(await page.evaluate(() => (document.querySelector('.shamel-confirm-overlay') as any)?.innerText || '')));
  const d = await get('Blanket Order', NAME); log('API after cancel docstatus=' + d.docstatus);
  await open(page);
  log('CANCELLED BTNS ' + JSON.stringify(await btns(page)));
  await press(main(page).getByRole('button', { name: 'تعديل', exact: true }).or(main(page).getByRole('button', { name: /تعديل الأمر|تعديل المستند/ })).first());
  await page.waitForTimeout(6000);
  log('AMEND url ' + page.url() + ' toasts ' + JSON.stringify(await toasts(page)).slice(0, 300));
  log('AMEND screen ' + clean(await main(page).innerText()).replace(/^.*?(MFG-BLR[-\d]+)/, '$1').slice(0, 120) + ' | BTNS ' + JSON.stringify(await btns(page)));
  await page.screenshot({ path: 'C:/Playwright_Automation/Shamel/bo-amend.png' });
  const nm = page.url().split('/').pop()!;
  if (/^MFG/.test(nm)) { const a = await get('Blanket Order', nm); log('AMENDED DOC ' + nm + ' amended_from=' + a.amended_from + ' docstatus=' + a.docstatus); }
});
