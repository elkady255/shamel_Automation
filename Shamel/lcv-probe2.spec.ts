import { test, type Page } from '@playwright/test';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

test('LCV: add the item row by hand', async ({ page }) => {
  test.setTimeout(150_000);
  page.on('response', async (r) => {
    const w = r.request().method() !== 'GET' && /\/api\//.test(r.url()) && !/session_default|getpage|get_doc_fields|filters|get_list|get_options|get_naming/.test(r.url());
    if (w || (/\/api\//.test(r.url()) && r.status() >= 400)) {
      let b = ''; try { b = clean(await r.text()).slice(0, 500); } catch { /* ignore */ }
      console.log('API', r.request().method(), r.status(), r.url().replace('https://test.hr.azzrk.com', '').slice(0, 110), '| body:', clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 700), '=>', b);
    }
  });
  const main = page.getByRole('main');
  const choose = async (trigger: ReturnType<Page['locator']>, text: RegExp | string) => {
    await trigger.click(); await page.waitForTimeout(900);
    const opt = page.getByRole('option', { name: text }).locator('visible=true').first();
    if (await opt.count()) await opt.click({ timeout: 8000 }); else await page.getByText(text).locator('visible=true').last().click({ timeout: 8000, force: true });
    await page.waitForTimeout(600);
  };
  await page.goto('about:blank'); await page.goto('/desk/shamel#/inventory/landed-cost-voucher/new', { timeout: 120_000 }); await page.waitForTimeout(5000);
  await choose(main.getByPlaceholder('Select Series'), /MAT-LCV/);
  await choose(main.getByPlaceholder('Select Company'), /Ahmed Ebrahim/);
  // the Items table has its own Add Row (the second one on the page)
  await main.getByRole('button', { name: 'Add Row' }).nth(1).click(); await page.waitForTimeout(1500);
  console.log('ITEM ROW INPUTS:', JSON.stringify(await main.locator('input:visible,textarea:visible').evaluateAll((els) => els.map((e: any) => e.placeholder || e.name || e.type)).then((a) => a.slice(4))));
  console.log('ITEM ROW COLUMNS:', JSON.stringify((await main.getByRole('columnheader').allInnerTexts()).map(clean).filter(Boolean)));
  await page.screenshot({ path: 'test-results/lcv-item-row.png', fullPage: true });
});
