import { test, expect, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ItemFormPage } from './pages/ItemFormPage';

const srs = (description: string) => ({ annotation: { type: 'SRS', description } });

async function anyExistingItem(page: Page): Promise<string> {
  const res = await page.request.get('/api/resource/Item?fields=["name"]&limit_page_length=1&order_by=creation desc');
  return (await res.json()).data[0].name;
}

test.describe('SRS UC7/UC8 - Item details', () => {
  test('Open menu lists the stock reports', srs('UC7 > Fixed Page Actions > Open'), async ({ page }) => {
    const form = new ItemFormPage(page);
    await form.gotoItem(await anyExistingItem(page));
    await page.getByRole('button', { name: 'Open' }).click();
    for (const report of ['Stock balance', 'Stock ledger', 'Stock projected Qty']) {
      await expect(page.getByRole('button', { name: report, exact: true })).toBeVisible();
    }
  });

  test('Create menu lists the SRS documents', srs('UC7 > Fixed Page Actions > Create'), async ({ page }) => {
    const form = new ItemFormPage(page);
    await form.gotoItem(await anyExistingItem(page));
    await page.getByRole('button', { name: 'Create' }).click();
    for (const doc of [
      'Material Request', 'Request for Quotation', 'Supplier Quotation', 'Purchase Order', 'Purchase Invoice',
      'Purchase Receipt', 'Quotation', 'Sales Order', 'Sales Invoice', 'Delivery Note', 'Stock Entry', 'Stock Reconciliation',
    ]) {
      // Scope to the page content: the sidebar has buttons with the same names
      await expect.soft(page.getByRole('main').getByRole('button', { name: doc, exact: true })).toBeVisible();
    }
  });

  test('item details shows the Disabled option', srs('UC7 > Disabled checkbox'), async ({ page }) => {
    const form = new ItemFormPage(page);
    await form.gotoItem(await anyExistingItem(page));
    await expect(form.setting('Disabled')).toBeVisible();
  });

  test('a new item has its creation logged in All Activities', srs('UC8 > Item Creation activity is automatically logged'), async ({ page }) => {
    test.fail(true, 'Known bug BUG-11: item creation not logged');
    const form = new ItemFormPage(page);
    await form.gotoNew();
    await form.fillRequired({
      code: `PW-${faker.string.alphanumeric(8).toUpperCase()}`,
      name: `PW Activity ${faker.commerce.productName()}`,
      group: 'Services',
      uom: 'Unit',
    });
    await form.save.click();
    await expect(page.getByRole('alert').filter({ hasText: 'Item created successfully' })).toBeVisible();

    await form.tab('All Activities').click();
    await expect(page.getByRole('button', { name: 'Log Activity' })).toBeVisible();
    // Wait for the list to finish loading (either state), then require the creation entry
    await expect(page.getByText('No Logs Available For This Item.').or(form.main.getByText(/created/i)).first()).toBeVisible();
    await expect(form.main.getByText(/created/i).first(), 'item creation is logged').toBeVisible();
  });
});
