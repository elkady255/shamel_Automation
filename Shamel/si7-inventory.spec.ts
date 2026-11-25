import { test, type Page } from '@playwright/test';
import * as fs from 'fs';
test.describe.configure({ timeout: 300_000 });
test.use({ viewport: { width: 1500, height: 2600 }, actionTimeout: 15_000 });
const main = (p: Page) => p.getByRole('main');
const press = (l: any) => l.evaluate((e: any) => e.click());
const OUT = 'C:/Playwright_Automation/Shamel/si7-inventory.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

// One line per visible label: label | kind | detail
const inventory = (page: Page) => page.evaluate(() => {
  const root = document.querySelector('main') as HTMLElement;
  const out: string[] = [];
  const vis = (e: Element) => (e as HTMLElement).offsetParent !== null;
  for (const lab of [...root.querySelectorAll('label, .toggle-row-label, .cd-label')].filter(vis)) {
    const txt = ((lab as HTMLElement).innerText || '').replace(/\s+/g, ' ').trim();
    if (!txt) continue;
    let box: HTMLElement | null = lab as HTMLElement;
    for (let i = 0; i < 4 && box; i++) { if (box.querySelector('input,textarea,.cd-readonly,.status-chip,.selected-value,.is-switch') && box !== lab) break; box = box.parentElement; }
    if (!box) continue;
    const inp = box.querySelector('input:not([type=hidden]),textarea') as HTMLInputElement | null;
    let kind = 'other', det = '';
    if (box.querySelector('.is-switch') || inp?.type === 'checkbox') { const c = box.querySelector('input[type=checkbox]') as HTMLInputElement; kind = 'switch'; det = c ? (c.checked ? 'on' : 'off') + (c.disabled ? ' disabled' : '') : ''; }
    else if (box.querySelector('.cd-readonly')) { kind = 'readonly'; det = (box.querySelector('.cd-readonly') as HTMLElement).innerText.replace(/\s+/g, ' ').trim(); }
    else if (box.querySelector('.status-chip')) { kind = 'chip'; det = (box.querySelector('.status-chip') as HTMLElement).innerText.trim(); }
    else if (inp) { kind = inp.tagName === 'TEXTAREA' ? 'textarea' : 'input:' + inp.type + (inp.readOnly ? ' readonly' : '') + (inp.disabled ? ' disabled' : ''); det = (inp.value || inp.placeholder || '').slice(0, 40); }
    else if (box.querySelector('.selected-value')) { kind = 'select'; det = (box.querySelector('.selected-value') as HTMLElement).innerText.trim(); }
    out.push(txt.slice(0, 55) + ' | ' + kind + ' | ' + det);
  }
  return out;
});
const buttons = (page: Page) => main(page).locator('button').evaluateAll((els: any[]) => els.filter((e) => e.offsetParent).map((e) => ((e.innerText || e.title || e.getAttribute('aria-label') || '') + '').replace(/\s+/g, ' ').trim()).filter(Boolean));

test('si inventory', async ({ page }) => {
  fs.writeFileSync(OUT, '');
  await page.goto('about:blank'); await page.goto('/desk/shamel#/accounting/sales-invoices/new', { timeout: 100_000 }); await page.waitForTimeout(9000);
  log('URL ' + page.url());
  log('BUTTONS(top) ' + JSON.stringify(await buttons(page)));
  for (const tab of ['التفاصيل', 'المعلومات العامة', 'معلومات إضافية']) {
    await press(main(page).getByRole('button', { name: tab, exact: true })); await page.waitForTimeout(2500);
    for (let i = 0; i < 30; i++) {
      const idx = await main(page).locator('button[aria-expanded=false]').evaluateAll((els: any[]) => els.findIndex((e) => e.offsetParent && !/إشعار|رجوع|عرض|جلب|إنشاء|حفظ|إلغاء|الكل|مقروء/.test(e.innerText || e.title || '') && (e.innerText || '').trim().length > 2));
      if (idx < 0) break;
      try { await press(main(page).locator('button[aria-expanded=false]').nth(idx)); await page.waitForTimeout(500); } catch { break; }
    }
    log('=== TAB ' + tab);
    for (const l of await inventory(page)) log('F ' + l);
    await page.screenshot({ path: `Shamel/si7-tab-${tab === 'التفاصيل' ? 1 : tab === 'المعلومات العامة' ? 2 : 3}.png`, fullPage: true });
  }
});
