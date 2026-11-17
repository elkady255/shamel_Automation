import { test, type Page } from '@playwright/test';
import * as fs from 'fs';

test.describe.configure({ timeout: 250_000 });
test.use({ viewport: { width: 1400, height: 1000 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/st-probe8.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const R = '/desk/shamel#/selling/sales-tax-templates';
async function open(page: Page, hash: string, base = R) {
  await page.goto('about:blank');
  await page.goto(base + hash, LOAD);
  await page.waitForTimeout(6000);
}
const dlg = async (p: Page) => clean(await p.locator('[role=dialog], .base-modal').first().innerText().catch(() => 'no dialog'));

test('draft badge elsewhere', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await open(page, '/new', '/desk/shamel#/selling/territories');
  await open(page, '', '/desk/shamel#/selling/territories');
  const first = main(page).locator('tbody tr').first();
  const name = clean(await first.locator('td').nth(1).innerText());
  log('TERRITORY FIRST ' + name);
  await open(page, '/' + encodeURIComponent(name), '/desk/shamel#/selling/territories');
  log('TERRITORY DETAIL ' + clean(await main(page).innerText()).slice(0, 300));
});

test('row behaviours', async ({ page }) => {
  await open(page, '/new');
  const wr = main(page).locator('.id-uom-table-wrapper');
  await press(main(page).getByRole('button', { name: /إضافة ضريبة/ }).first());
  await page.waitForTimeout(800);
  await press(main(page).getByRole('button', { name: /إضافة ضريبة/ }).first());
  await page.waitForTimeout(800);
  log('ROW COUNT ' + (await wr.locator('tbody tr').count()));
  log('ROW 1 CELL0 ' + JSON.stringify(await wr.locator('tbody tr').first().locator('td').evaluateAll((tds) => tds.map((t: any) => (t.innerText || '').trim().slice(0, 20) + '|' + (t.querySelector('input')?.type || '')))));
  log('THEAD ' + JSON.stringify(await wr.locator('thead th').evaluateAll((ths) => ths.map((t: any) => (t.innerText || '').trim().slice(0, 25) + '|' + (t.querySelector('input')?.type || '')))));
  // set 2nd row mode = on previous row amount
  const modes = main(page).getByPlaceholder('فارغ', { exact: true });
  log('MODE INPUTS ' + (await modes.count()));
  await modes.nth(1).click();
  await page.waitForTimeout(800);
  await page.locator('.cs-option', { hasText: 'على مبلغ الصف السابق' }).first().click();
  await page.waitForTimeout(800);
  await press(wr.locator('.id-uom-edit').nth(1));
  await page.waitForTimeout(1200);
  log('ROW2 EDIT POPUP ' + (await dlg(page)));
  log('ROW2 INPUTS ' + JSON.stringify(await page.locator('[role=dialog] input, [role=dialog] textarea, .base-modal input, .base-modal textarea').evaluateAll((els) => els.map((e: any) => `${e.type}|${e.placeholder}|max=${e.maxLength}|dis=${e.disabled}|val=${e.value}`))));
  // description validation inside popup
  const desc = page.locator('[role=dialog] textarea, .base-modal textarea').first();
  await desc.fill('ab');
  await press(page.getByRole('button', { name: 'تعديل', exact: true }).last());
  await page.waitForTimeout(1200);
  log('DESC "ab" -> ' + (await dlg(page)).slice(0, 400));
  await desc.fill('x'.repeat(520));
  log('DESC LEN AFTER 520 ' + (await desc.inputValue()).length);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  // select a row -> action bar
  await press(wr.locator('tbody tr').first().getByRole('checkbox'));
  await page.waitForTimeout(800);
  log('ROW SELECT ACTIONS ' + JSON.stringify((await wr.locator('button, [title]').evaluateAll((els) => els.map((e: any) => (e.title || e.innerText || '').trim().slice(0, 25)))).filter(Boolean)));
});

test('bulk edit popup', async ({ page }) => {
  await open(page, '');
  await press(main(page).locator('tbody tr').first().getByRole('checkbox'));
  await page.waitForTimeout(800);
  await press(main(page).getByRole('button', { name: 'تعديل', exact: true }));
  await page.waitForTimeout(1500);
  log('BULK EDIT POPUP ' + (await dlg(page)));
  const field = page.locator('[role=dialog] input, .base-modal input').first();
  await field.click();
  await page.waitForTimeout(1200);
  log('BULK EDIT FIELD OPTIONS ' + JSON.stringify((await page.locator('.cs-option').allInnerTexts()).map(clean)));
  await page.keyboard.press('Escape');
});
