import { test, expect, type Locator, type Page } from '@playwright/test';
import { invoice } from './helpers/si-data';

/**
 * Sales Invoice tabs and screens (TC-SIH Details tab, TC-SIG General Info tab, TC-SIM More Info tab, TC-SIF items table,
 * TC-SIL list actions, TC-SID details actions). The tab sections are collapsed accordions, so they are expanded first.
 * UI labels are English: the Administrator language must be English.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
test.describe.configure({ timeout: 170_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

const LOAD = { timeout: 100_000 };
const main = (page: Page) => page.getByRole('main');
/** The action buttons keep moving, so a normal click never settles: click them through the DOM. */
const press = (button: Locator) => button.evaluate((e) => (e as HTMLElement).click());

async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/sales-invoices${hash}`, LOAD);
  await page.waitForTimeout(6000);
}
const tab = async (page: Page, name: string) => { await press(main(page).getByRole('button', { name, exact: true })); await page.waitForTimeout(1500); };
/** Opens every collapsed section of the current tab. */
async function expandAll(page: Page) {
  const closed = main(page).locator('button.dn-accordion-toggle[aria-expanded="false"]');
  for (let i = (await closed.count()) - 1; i >= 0; i--) await press(closed.nth(i)).catch(() => undefined);
  await page.waitForTimeout(1500);
}
/** Names that are missing from the page text. */
const missing = async (page: Page, names: string[]) => { const text = clean(await main(page).innerText()); return names.filter((n) => !text.includes(n)); };

test('TC-SIH-001 the Details tab shows the sections of the SRS', srs('Add Sales Invoice - Details tab'), async ({ page }) => {
  await open(page, '/new');
  const gone = await missing(page, ['Basic Information', 'Accounting Dimensions', 'Currency and Price List', 'Item Details', 'Taxes and Charges', 'Totals', 'Additional Discount', 'Bundle Items']);
  observe('sections not found: ' + (gone.join(', ') || 'none'));
  expect(gone).toEqual([]);
});

test('TC-SIH-050 the Details tab shows the SRS fields of the invoice header', srs('Add Sales Invoice - header fields'), async ({ page }) => {
  await open(page, '/new');
  await expandAll(page);
  const gone = await missing(page, ['Company', 'Series', 'Customer', 'Posting Date', 'Posting Time', 'Edit Posting Date And Time', 'Payment Due Date', 'Is Return (Credit Note)', 'Is Rate Adjustment Entry (Debit Note)', 'Consider for Tax Withholding', 'Cost Center', 'Project', 'Currency', 'Exchange Rate', 'Price List', 'Ignore Pricing Rule']);
  observe('fields not found: ' + (gone.join(', ') || 'none'));
  expect.soft(gone, 'not found: ' + gone.join(', ')).toEqual([]);
});

test('TC-SIG-001 the General Information tab shows payments, advances, write off, loyalty, addresses and payment terms', srs('Add Sales Invoice - General Info tab'), async ({ page }) => {
  await open(page, '/new');
  await tab(page, 'General Information');
  await expandAll(page);
  observe('General Information tab: ' + clean(await main(page).innerText()).slice(0, 900));
  const gone = await missing(page, ['Payments', 'Advance', 'Write Off', 'Loyalty', 'Billing Address', 'Shipping Address', 'Company Address', 'Payment Terms', 'Terms']);
  observe('names not found: ' + (gone.join(', ') || 'none'));
  expect.soft(gone, 'not found: ' + gone.join(', ')).toEqual([]);
});

test('TC-SIM-001 the More Information tab shows status, accounting details, print settings and additional info', srs('Add Sales Invoice - More Info tab'), async ({ page }) => {
  await open(page, '/new');
  await tab(page, 'More Information');
  await expandAll(page);
  observe('More Information tab: ' + clean(await main(page).innerText()).slice(0, 900));
  const gone = await missing(page, ['Invoice Status', 'Credit Status', 'Refund Status', 'Debit To', 'Is Opening Entry', 'Against Income Account', 'Paid Amount', 'Credit Amount', 'Refund Amount', 'Print Settings', 'Letter Head', 'Territory', 'Customer Purchase Order', 'Customer Group']);
  observe('fields not found: ' + (gone.join(', ') || 'none'));
  expect.soft(gone, 'not found: ' + gone.join(', ')).toEqual([]);
});

test('TC-SIM-019 Print Settings has the Print without Amount and Group same items checkboxes', srs('More Info - Print Settings'), async ({ page }) => {
  // Known issue found on this server: the Print Settings section has no "Print without Amount" and no "Group same items" checkbox.
  test.fail(true, 'Known issue: Print without Amount and Group same items are missing from the More Information tab');
  await open(page, '/new');
  await tab(page, 'More Information');
  await expandAll(page);
  expect(await missing(page, ['Print without Amount', 'Group same items'])).toEqual([]);
});

test('TC-SIM-002 the More Information tab of a submitted invoice shows Unpaid, No Credit and No Refund', srs('More Info - Status fields'), async ({ page }) => {
  const si = await invoice('Submitted');
  await open(page, `/${encodeURIComponent(si.name)}`);
  await tab(page, 'More Information');
  await expandAll(page);
  const text = clean(await main(page).innerText());
  expect(text).toContain('Unpaid');
  expect(text).toContain('No Credit');
  expect(text).toContain('No Refund');
});

test('TC-SIM-005 Debit To and Against Income Account show the accounts of the submitted invoice', srs('More Info - Accounting Details'), async ({ page }) => {
  const si = await invoice('Submitted');
  await open(page, `/${encodeURIComponent(si.name)}`);
  await tab(page, 'More Information');
  await expandAll(page);
  const text = clean(await main(page).innerText());
  expect(text).toContain(si.debit_to);
  expect(text).toContain(si.items[0].income_account);
  expect(text).toMatch(/Paid Amount 0\.00 SAR/);
});

test('TC-SIF-001 the Get Items From menu button is on the Add screen', srs('Get Items From'), async ({ page }) => {
  await open(page, '/new');
  await expect(main(page).getByRole('button', { name: /^Get Items From/ })).toBeVisible();
});

test('TC-SIF-002 Add Item shows the items table with the SRS columns', srs('Items table - Add Item'), async ({ page }) => {
  await open(page, '/new');
  await press(main(page).getByRole('button', { name: 'Add Item', exact: true }));
  await page.waitForTimeout(2500);
  const text = clean(await main(page).innerText());
  for (const column of ['Item', 'Quantity', 'Available Qty', 'Shortage Qty', 'Rate', 'Amount', 'Warehouse']) expect(text, column).toContain(column);
});

test('TC-SIL-023 selecting an invoice in the list shows the bulk actions', srs('List action bar'), async ({ page }) => {
  const si = await invoice('Submitted');
  await open(page, '');
  await main(page).getByPlaceholder('Search By ID').fill(si.name);
  const row = main(page).locator('tbody tr').filter({ hasText: si.name }).first();
  await expect(row).toBeVisible({ timeout: 30_000 });
  await row.getByRole('checkbox').check();
  await expect(main(page).getByText('Selected', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  const bar = (await page.getByRole('button').locator('visible=true').allInnerTexts()).map(clean);
  observe('action bar: ' + bar.slice(-9).join(' | '));
  for (const action of ['Edit', 'Assign', 'Add Tags', 'Export', 'Clear Assignment', 'Cancel', 'Print']) expect(bar, action).toContain(action);
  expect(bar, 'Submit is only for Draft invoices').not.toContain('Submit');
});

test('TC-SIL-026 the Delete action is not offered for a submitted invoice', srs('Delete is available for Draft and Cancelled only'), async ({ page }) => {
  // Known issue found on this server: the bulk action bar shows Delete for a Submitted invoice (the SRS allows it for Draft / Cancelled only).
  test.fail(true, 'Known issue: Delete is shown for a submitted invoice');
  const si = await invoice('Submitted');
  await open(page, '');
  await main(page).getByPlaceholder('Search By ID').fill(si.name);
  const row = main(page).locator('tbody tr').filter({ hasText: si.name }).first();
  await expect(row).toBeVisible({ timeout: 30_000 });
  await row.getByRole('checkbox').check();
  await expect(main(page).getByText('Selected', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  expect((await page.getByRole('button').locator('visible=true').allInnerTexts()).map(clean)).not.toContain('Delete');
});

test('TC-SID-017 View Accounting Ledger opens the General Ledger for the invoice', srs('View Accounting Ledger'), async ({ page, context }) => {
  const si = await invoice('Submitted');
  await open(page, `/${encodeURIComponent(si.name)}`);
  const opened = context.waitForEvent('page', { timeout: 15_000 });
  await press(main(page).getByRole('button', { name: 'View Accounting Ledger', exact: true }));
  const ledger = await opened;
  observe('opened: ' + ledger.url());
  expect(ledger.url()).toContain('General%20Ledger');
  expect(ledger.url()).toContain(`voucher_no=${si.name}`);
  await ledger.close();
});

test('TC-SID-072 the Linked Records section lists the Delivery Note and the Sales Order of the invoice', srs('Connections tab'), async ({ page }) => {
  const si = await invoice('Submitted');
  await open(page, `/${encodeURIComponent(si.name)}`);
  // the count is loaded after the page, so wait until it is more than 0
  await expect(main(page).getByRole('button', { name: /Linked Records\s*[1-9]/ })).toBeVisible({ timeout: 60_000 });
  await press(main(page).getByRole('button', { name: /Linked Records/ }));
  await page.waitForTimeout(2500);
  const text = clean(await main(page).innerText());
  expect(text).toContain(si.items[0].delivery_note);
  expect(text).toContain(si.items[0].sales_order);
  for (const doc of ['Delivery Note', 'Sales Order', 'Quotation', 'POS Invoice', 'Payment Entry', 'Payment Request', 'Journal Entry', 'Invoice Discounting', 'Dunning']) expect(text, doc).toContain(doc);
});
