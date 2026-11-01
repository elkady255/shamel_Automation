import { test } from '@playwright/test';

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

/** Read-only probe: opens the Landed Cost Voucher list and Add screens, touches the Vendor Invoice dropdown and logs the error dialog and every landed_cost API call. Saves nothing. */
test('LCV open: capture the get_supplier_options error', async ({ page }) => {
  test.setTimeout(150_000);
  page.on('response', async (r) => {
    if (/landed_cost|get_supplier_options/i.test(r.url()) && /\/api\//.test(r.url())) {
      let b = '';
      try { b = clean(await r.text()).slice(0, 600); } catch { /* ignore */ }
      console.log('LCV-API', r.request().method(), r.status(), r.url().replace(/^https?:\/\/[^/]+/, '').slice(0, 160), '=>', b);
    }
  });
  const dialog = async (label: string) => {
    const t = await page.getByText(/Failed to get method|has no attribute/).first().innerText({ timeout: 2000 }).catch(() => 'no error dialog');
    console.log(label, clean(t));
  };
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/inventory/landed-cost-voucher', { timeout: 100_000 });
  await page.waitForTimeout(5000);
  await dialog('ERROR DIALOG ON LIST:');
  await page.goto('about:blank');
  await page.goto('/desk/shamel#/inventory/landed-cost-voucher/new', { timeout: 100_000 });
  await page.waitForTimeout(6000);
  await dialog('ERROR DIALOG ON ADD:');
  const main = page.getByRole('main');
  const addRows = main.getByRole('button', { name: 'Add Row' });
  console.log('ADD ROW BUTTONS:', await addRows.count());
  console.log('PLACEHOLDERS BEFORE:', JSON.stringify(await main.locator('input:visible, textarea:visible').evaluateAll((els) => els.map((e: any) => e.placeholder).filter(Boolean))));
  // the second Add Row is expected to belong to the Vendor Invoices table (no data is saved)
  if ((await addRows.count()) > 1) { await addRows.nth(1).click().catch(() => undefined); await page.waitForTimeout(2000); }
  await dialog('ERROR DIALOG AFTER ADD ROW:');
  const placeholders = await main.locator('input:visible, textarea:visible').evaluateAll((els) => els.map((e: any) => e.placeholder).filter(Boolean));
  console.log('PLACEHOLDERS AFTER:', JSON.stringify(placeholders));
  const vendor = main.getByPlaceholder(/vendor|supplier|invoice/i).first();
  if (await vendor.count()) { await vendor.click().catch(() => undefined); await page.waitForTimeout(3000); }
  await dialog('ERROR DIALOG AFTER OPENING VENDOR INVOICE:');
  await page.screenshot({ path: 'test-results/lcv-open-probe.png' });
});
