import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 200_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/ct-probe6.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const dialog = async (p: Page) => clean(await p.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog'));

test('popups', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/selling/contacts/new', { timeout: 100_000 });
  await page.waitForTimeout(6000);
  await press(main(page).getByRole('button', { name: /إضافة بريد/ }));
  await press(main(page).getByRole('button', { name: /إضافة رقم/ }));
  await press(main(page).getByRole('button', { name: /إضافة رابط/ }));
  await page.waitForTimeout(1000);
  const wr = main(page).locator('.id-uom-table-wrapper');
  log('WRAPPERS ' + (await wr.count()));
  for (let i = 0; i < (await wr.count()); i++) {
    const btns = await wr.nth(i).locator('button, [role=button]').evaluateAll((els) => els.map((e: any) => `${e.tagName}|title=${e.title}|aria=${e.getAttribute('aria-label')}|cls=${(e.className || '').toString().slice(0, 40)}|txt=${(e.innerText || '').trim().slice(0, 15)}`));
    log(`WRAPPER ${i} BUTTONS ` + JSON.stringify(btns));
    log(`WRAPPER ${i} HEAD ` + clean((await wr.nth(i).innerText()).slice(0, 200)));
    log(`WRAPPER ${i} ROW ICONS ` + JSON.stringify(await wr.nth(i).locator('tbody tr, [class*=row]').first().locator('svg, i, span[class*=icon], [class*=edit], [class*=delete], [class*=trash]').evaluateAll((els) => els.map((e: any) => (e.tagName + '.' + (e.className?.baseVal ?? e.className)).toString().slice(0, 50))).catch(() => 'err')));
    await press(wr.nth(i).locator('.id-uom-settings'));
    await page.waitForTimeout(1200);
    log(`WRAPPER ${i} SETTING POPUP ` + await dialog(page));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
    await press(wr.nth(i).locator('.id-uom-edit').first());
    await page.waitForTimeout(1200);
    log(`WRAPPER ${i} EDIT ROW POPUP ` + await dialog(page));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
  }
});

