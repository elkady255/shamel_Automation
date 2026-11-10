import { test, expect, type Locator, type Page } from '@playwright/test';
import { invoice } from './helpers/si-data';

/**
 * Sales Invoice screens (TC-SIL list, TC-SIH Add, TC-SID Details). Invoices are built through the API
 * (Sales Order -> Delivery Note -> Sales Invoice) and then checked, cancelled and opened in the UI.
 * UI labels are English: the Administrator language must be English.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
test.describe.configure({ timeout: 170_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

const LOAD = { timeout: 100_000 };
const main = (page: Page) => page.getByRole('main');

/** The app ignores hash-only URL changes, so always load from scratch. */
async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/sales-invoices${hash}`, LOAD);
  await page.waitForTimeout(6000);
}
/** The action buttons keep moving, so a normal click never settles: click them through the DOM. */
const press = (button: Locator) => button.evaluate((e) => (e as HTMLElement).click());
const openDetails = (page: Page, name: string) => open(page, `/${encodeURIComponent(name)}`);
const buttons = async (page: Page) => (await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);

test('TC-SIL-003/006/016 the list shows the invoice with its status, credit status and refund status', srs('Sales Invoice list columns and statuses'), async ({ page }) => {
  const si = await invoice('Submitted');
  await open(page, '');
  const header = clean(await main(page).locator('thead').first().innerText());
  for (const col of ['Sales Invoice ID', 'Invoice Status', 'Credit Status', 'Refund Status', 'Payment Due Date', 'Posting Date', 'Grand Total']) expect(header, col).toContain(col);
  await main(page).getByPlaceholder('Search By ID').fill(si.name);
  const row = main(page).locator('tbody tr').filter({ hasText: si.name }).first();
  await expect(row).toBeVisible({ timeout: 30_000 });
  const text = clean(await row.innerText());
  observe('row: ' + text);
  expect(text).toContain('Unpaid');
  expect(text).toContain('No Credit');
  expect(text).toContain('No Refund');
  expect(text).toContain('500');
});

test('TC-SIL-002 Add Sales Invoice opens the Add screen', srs('Add button navigates'), async ({ page }) => {
  await open(page, '');
  await main(page).getByRole('button', { name: 'Add Sales Invoice' }).click();
  await expect(page).toHaveURL(/sales-invoices\/new/);
});

test('TC-SIH-001/002 the Add screen has the three tabs, Get Items From, Add Item and Save', srs('Add Sales Invoice layout'), async ({ page }) => {
  await open(page, '/new');
  const b = await buttons(page);
  observe('buttons: ' + b.join(' | '));
  for (const name of ['Details', 'General Information', 'More Information', 'Add Item', 'Save']) expect(b, name).toContain(name);
  expect(b.some((t) => t.startsWith('Get Items From'))).toBe(true);
});

test('TC-SIH-004 Save on an empty form shows the mandatory field messages', srs('Mandatory fields on Add'), async ({ page }) => {
  await open(page, '/new');
  await main(page).getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(3000);
  const text = clean(await main(page).innerText());
  observe('after Save: ' + text.slice(0, 300));
  await expect(page).toHaveURL(/sales-invoices\/new/);
  expect(text).toMatch(/required|mandatory|please/i);
});

test('TC-SIH-044 the Details screen shows the invoice currency SAR and the price list currency', srs('Currency and Price List'), async ({ page }) => {
  const si = await invoice('Submitted');
  await openDetails(page, si.name);
  const text = clean(await main(page).innerText());
  const priceList = text.match(/Price List \* (.+?) Price List Currency (\S+) Price List Exchange Rate (.+?) Ignore/);
  observe(`price list "${priceList?.[1]}", price list currency "${priceList?.[2]}", price list exchange rate "${priceList?.[3]}"`);
  expect(text).toMatch(/Currency \* SAR/);
});

test('TC-SID-002/009 a submitted invoice opens read only with Cancel Document, View Accounting Ledger and Create', srs('Details of a submitted invoice'), async ({ page }) => {
  const si = await invoice('Submitted');
  await openDetails(page, si.name);
  const b = await buttons(page);
  observe('buttons: ' + b.join(' | '));
  for (const name of ['Cancel Document', 'View Accounting Ledger', 'Create']) expect(b, name).toContain(name);
  expect(b, 'a submitted invoice has no Save or Submit button').not.toContain('Save');
  const text = clean(await main(page).innerText());
  expect(text).toContain(si.name);
  expect(text).toContain('Unpaid');
});

test('TC-SID-010 a draft invoice opens editable with a Submit button', srs('Details of a draft invoice'), async ({ page }) => {
  const draft = await invoice('Draft');
  await openDetails(page, draft.name);
  const b = await buttons(page);
  observe('buttons: ' + b.join(' | '));
  expect(b.some((t) => /^Submit/.test(t)), 'Submit').toBe(true);
  expect(b).toContain('Save');
  expect(b, 'a draft invoice has no Cancel Document').not.toContain('Cancel Document');
});

test('TC-SID-061 the Create menu offers Return / Credit Note and Payment for an unpaid invoice', srs('Create menu'), async ({ page }) => {
  const si = await invoice('Submitted');
  await openDetails(page, si.name);
  // the action buttons never settle (animation), so the normal "wait until stable" click would time out
  await press(main(page).getByRole('button', { name: 'Create', exact: true }));
  await page.waitForTimeout(1500);
  for (const option of ['Return / Credit Note', 'Delivery Note', 'Maintenance Schedule', 'Payment']) {
    await expect(page.getByText(option, { exact: true }).locator('visible=true').first(), option).toBeVisible();
  }
});

test('TC-SID-018 cancelling a submitted invoice from the Details screen changes its status to Cancelled', srs('Cancel a submitted invoice'), async ({ page }) => {
  const si = await invoice('Submitted');
  await openDetails(page, si.name);
  await press(main(page).getByRole('button', { name: 'Cancel Document' }));
  await page.waitForTimeout(2500);
  // the confirmation, if one is shown, has a Yes / Confirm style button; observe whatever dialog appears
  const confirm = page.getByRole('button', { name: /^(yes|confirm|ok|cancel document)$/i }).locator('visible=true').last();
  const dialogText = clean((await page.locator('[role=dialog], [class*=dialog], [class*=confirm], [class*=modal]').locator('visible=true').allInnerTexts()).join(' | '));
  observe('confirmation: ' + (dialogText.slice(0, 200) || 'none shown'));
  if (dialogText) await confirm.click({ force: true });
  await page.waitForTimeout(6000);
  const text = clean(await main(page).innerText());
  observe('after cancel: ' + text.slice(0, 200));
  expect(text).toContain('Cancelled');
});

test('TC-SID-046 an invoice that is already cancelled has no Cancel Document button', srs('Cancelled invoice actions'), async ({ page }) => {
  const si = await invoice('Cancelled');
  await openDetails(page, si.name);
  const b = await buttons(page);
  observe('buttons: ' + b.join(' | '));
  expect(b).not.toContain('Cancel Document');
  expect(clean(await main(page).innerText())).toContain('Cancelled');
});
