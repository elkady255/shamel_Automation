import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 280_000 });
test.use({ viewport: { width: 1500, height: 1700 } });
const LOAD = { timeout: 100_000 };
const main = (p: Page) => p.getByRole('main');
const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/so3-probe.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');
const inputs = (p: Page) => main(p).locator('input,textarea,select').evaluateAll((els) => els.filter((e: any) => e.offsetParent !== null).map((e: any, i) => `${i}:${e.type}:${(e.placeholder || '').slice(0, 30)}:${String(e.value).slice(0, 25)}${e.disabled || e.readOnly ? ':RO' : ''}`));
test('so list+new', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders', LOAD); await page.waitForTimeout(9000);
  log('LIST TEXT ' + clean(await main(page).innerText()).slice(0, 1800));
  log('LIST BUTTONS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean)));
  log('LIST HEADERS ' + JSON.stringify((await main(page).locator('thead th').allInnerTexts()).map(clean)));
  log('LIST INPUTS ' + JSON.stringify(await inputs(page)));
  await page.screenshot({ path: 'so3-list.png' });
  const cb = main(page).locator('tbody tr').first().locator('input[type=checkbox]').first();
  if (await cb.count()) { await press(cb); await page.waitForTimeout(1500); log('LIST BAR ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean))); await page.screenshot({ path: 'so3-list-sel.png' }); }
  await page.goto('about:blank'); await page.goto('/desk/shamel#/selling/sales-orders/new', LOAD); await page.waitForTimeout(9000);
  log('NEW TEXT ' + clean(await main(page).innerText()).slice(0, 3500));
  log('NEW BUTTONS ' + JSON.stringify((await main(page).getByRole('button').allInnerTexts()).map(clean)));
  log('NEW INPUTS ' + JSON.stringify(await inputs(page)));
  await page.screenshot({ path: 'so3-new.png', fullPage: true });
  for (const t of ['المعلومات العامة', 'معلومات إضافية']) {
    const b = main(page).getByRole('button', { name: t, exact: true });
    if (await b.count()) { await press(b); await page.waitForTimeout(2500); log(`TAB ${t} TEXT ` + clean(await main(page).innerText()).slice(0, 3500)); log(`TAB ${t} INPUTS ` + JSON.stringify(await inputs(page))); await page.screenshot({ path: `so3-new-${t.length}.png`, fullPage: true }); }
  }
  log('ACC ' + JSON.stringify(await main(page).locator('button[aria-expanded]').evaluateAll((e: any) => e.map((x: any) => x.innerText.trim().slice(0, 40) + '=' + x.getAttribute('aria-expanded')))));
});
