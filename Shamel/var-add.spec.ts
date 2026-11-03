import { test } from '@playwright/test';
import { api } from './helpers/api';
import { ItemFormPage } from './pages/ItemFormPage';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

/** One headed attempt to add a template item (Has Variants) through the UI, then look at the saved record. Nothing is deleted. */
test('Item with variants: add template', async ({ page }) => {
  test.setTimeout(170_000);
  const code = `PW-VAR-${Date.now().toString().slice(-6)}`;
  page.on('response', async (r) => {
    if (/\/api\//.test(r.url()) && (r.request().method() !== 'GET' || r.status() >= 400) && !/session_default|getpage|get_doc_fields|filters|get_list|get_options|get_naming|kaspersky|get_count/.test(r.url())) {
      let b = ''; try { b = clean(await r.text()).slice(0, 500); } catch { /* ignore */ }
      console.log('API', r.request().method(), r.status(), r.url().replace('https://test.hr.azzrk.com', '').slice(0, 110), '| body:', clean(decodeURIComponent((r.request().postData() ?? '').replace(/\+/g, ' '))).slice(0, 700), '=>', b);
    }
  });
  const step = async (label: string, fn: () => Promise<unknown>) => {
    try { await fn(); console.log('OK  ', label); } catch (e) { console.log('FAIL', label, '-', clean(String(e)).slice(0, 220)); await page.screenshot({ path: `test-results/var-fail-${label.replace(/\W+/g, '-')}.png` }); throw e; }
  };
  const form = new ItemFormPage(page);
  await form.gotoNew();
  await step('code+name', async () => { await form.itemCode.fill(code); await form.itemName.fill(`PW Variant Template ${code}`); });
  await step('group', () => form.selectOption(form.itemGroup, 'Services'));
  await step('uom', () => form.selectOption(form.uom, 'Unit'));
  await step('description', () => form.description.fill('Template item with variants created by Playwright'));
  await step('has variants', async () => { await form.setting('Has Variants').click(); await page.waitForTimeout(1000); });
  await step('variants based on', async () => {
    await form.main.getByText('Select An Option').click(); await page.waitForTimeout(600);
    await page.locator('li:visible,[role=option]:visible').filter({ hasText: 'Item Attribute' }).first().click(); await page.waitForTimeout(1000);
  });
  await step('add attribute row', async () => {
    console.log('ATTR ROWS ON OPEN:', await form.main.getByPlaceholder('Select Attribute').count());
    const sel = form.main.getByPlaceholder('Select Attribute').first();
    await sel.click(); await page.waitForTimeout(700);
    await sel.fill('PW-Size'); await page.waitForTimeout(1500);
    const opt = page.getByRole('option', { name: 'PW-Size', exact: true });
    if (await opt.count()) await opt.first().click(); else await page.getByText('PW-Size', { exact: true }).locator('visible=true').last().click({ force: true });
    await page.waitForTimeout(1000);
  });
  console.log('FORM INPUTS BEFORE SAVE:', JSON.stringify(await form.main.locator('input:visible,textarea:visible').evaluateAll((els) => els.map((e: any) => (e.placeholder || e.name || e.type) + '=' + e.value))));
  await page.screenshot({ path: 'test-results/var-before-save.png', fullPage: true });
  await step('save', async () => { await form.save.click(); await page.waitForTimeout(6000); });
  console.log('URL AFTER SAVE:', page.url());
  console.log('ALERTS:', JSON.stringify((await page.getByRole('alert').allInnerTexts()).map(clean)));
  console.log('VISIBLE ERRORS:', clean(await form.main.innerText()).match(/[^.]*(required|invalid|error)[^.]*/gi)?.slice(0, 5));
  await page.screenshot({ path: 'test-results/var-after-save.png', fullPage: true });
  const [found] = await api.list('Item', [['item_name', 'like', `%${code}%`]], ['name', 'item_name', 'has_variants', 'variant_based_on', 'item_group', 'stock_uom', 'is_stock_item']);
  console.log('SAVED ITEM:', JSON.stringify(found ?? 'NOT FOUND'));
  if (found) { const d = await api.get('Item', found.name); console.log('ATTRIBUTES:', JSON.stringify(d.attributes)); }
});

