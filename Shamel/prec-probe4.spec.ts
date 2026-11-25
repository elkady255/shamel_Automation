// Probe: walk the screen for the main QA customer up to Allocate (no Reconcile).
import { test, type Page } from '@playwright/test';

async function dump(p: Page, tag: string) {
  const main = p.locator('main');
  console.log(`== ${tag} ==`);
  console.log('TEXT', (await main.innerText()).replace(/\n+/g, ' | ').slice(0, 2500));
  console.log('LABELS', JSON.stringify((await main.locator('label:visible').allInnerTexts()).map((s) => s.trim())));
  console.log('INPUTS', JSON.stringify(await main.locator('input:visible,textarea:visible').evaluateAll((els: any[]) => els.map((e) => `${e.type}|${e.placeholder}|${e.value}|${e.disabled || e.readOnly ? 'ro' : ''}`))));
  console.log('BUTTONS', JSON.stringify(await main.locator('button:visible').evaluateAll((els: any[]) => els.map((e) => (e.innerText.trim() || e.title || e.getAttribute('aria-label') || '?' + e.className.slice(0, 30)) + (e.disabled ? '[disabled]' : '')))));
  await p.screenshot({ path: `Shamel/prec-results/${tag}.png`, fullPage: true });
}

test('walk', async ({ page }) => {
  test.setTimeout(240_000);
  const main = page.locator('main');
  const opts = async () => (await page.locator('.cs-option:visible').allInnerTexts()).map((s) => s.replace(/\s+/g, ' ').trim());
  const field = (label: string) => main.locator('label').filter({ hasText: new RegExp('^\\s*' + label + '\\s*\\*?\\s*$') }).first().locator('xpath=ancestor::div[.//input][1]').locator('input').first();
  const pick = async (label: string, q: string) => {
    const f = field(label); await f.click(); if (q) await f.fill(q); await page.waitForTimeout(2500);
    const o = await opts(); console.log('OPTIONS', label, q, JSON.stringify(o));
    if (o.length) await page.locator('.cs-option:visible').first().evaluate((e: any) => e.click());
    await page.waitForTimeout(2000);
  };
  page.on('response', async (r) => {
    const u = r.url(); if (!/shamel\.api|reconcil/i.test(u) || /notification|get_options/.test(u)) return;
    let body = ''; try { body = (await r.text()).slice(0, 1200); } catch { /* ignore */ }
    console.log('API', r.status(), r.request().method(), decodeURIComponent(u.replace(/^https?:\/\/[^/]+/, '')).slice(0, 300), r.request().postData()?.slice(0, 600) ?? '', '=>', body);
  });
  await page.goto('/desk/shamel#/accounting/payment-reconciliation', { timeout: 100_000 });
  await main.getByRole('button', { name: 'جلب القيود غير المسواة' }).waitFor({ timeout: 60_000 });
  await page.waitForTimeout(3000);
  await pick('الشركة', 'Ahmed');
  await pick('نوع الطرف', '');
  const t = field('نوع الطرف'); await t.fill('Customer'); await page.waitForTimeout(2000); console.log('PT search', JSON.stringify(await opts()));
  if ((await opts()).length) await page.locator('.cs-option:visible').first().evaluate((e: any) => e.click()); else { await t.fill('عميل'); await page.waitForTimeout(2000); console.log('PT ar', JSON.stringify(await opts())); await page.locator('.cs-option:visible').first().evaluate((e: any) => e.click()); }
  await page.waitForTimeout(2000);
  await dump(page, 'p4-a-type');
  await pick('الطرف', 'QA-PR Cust Main');
  await page.waitForTimeout(3000);
  await dump(page, 'p4-b-party');
  await main.getByRole('button', { name: 'جلب القيود غير المسواة' }).evaluate((e: any) => e.click());
  await page.waitForTimeout(12000);
  await dump(page, 'p4-c-entries');
  console.log('TABLES', JSON.stringify(await main.locator('table:visible').evaluateAll((ts: any[]) => ts.map((x) => ({ cls: x.className, head: [...x.querySelectorAll('thead th')].map((e: any) => e.innerText.trim()), rows: [...x.querySelectorAll('tbody tr')].map((r: any) => r.innerText.replace(/\s+/g, ' ').trim()) })))));
  const tables = main.locator('table:visible');
  await tables.nth(0).locator('tbody tr').first().locator('input[type=checkbox]').evaluate((e: any) => e.click());
  await tables.nth(1).locator('tbody tr').first().locator('input[type=checkbox]').evaluate((e: any) => e.click());
  await page.waitForTimeout(1500);
  await dump(page, 'p4-d-selected');
  const alloc = main.getByRole('button', { name: /تخصيص/ }).first();
  console.log('ALLOC btn', await alloc.count());
  if (await alloc.count()) { await alloc.evaluate((e: any) => e.click()); await page.waitForTimeout(10000); }
  await dump(page, 'p4-e-alloc');
  console.log('TABLES', JSON.stringify(await main.locator('table:visible').evaluateAll((ts: any[]) => ts.map((x) => ({ head: [...x.querySelectorAll('thead th')].map((e: any) => e.innerText.trim()), rows: [...x.querySelectorAll('tbody tr')].map((r: any) => r.innerText.replace(/\s+/g, ' ').trim() + ' {' + [...r.querySelectorAll('input:not([type=checkbox])')].map((i: any) => i.value).join(',') + '}') })))));
  console.log('MODALS', JSON.stringify(await page.locator('.modal.show,.base-modal:visible,[role=dialog]:visible').allInnerTexts()));
});
