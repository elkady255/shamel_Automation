import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ItemsListPage } from './pages/ItemsListPage';

const srs = (description: string) => ({ annotation: { type: 'SRS', description } });

test.describe('SRS UC1 - Items List', () => {
  let list: ItemsListPage;

  test.beforeEach(async ({ page }) => {
    list = new ItemsListPage(page);
    await list.goto();
  });

  test('table shows the SRS columns', srs('UC1 > Item List table columns'), async () => {
    const headers = list.table.getByRole('columnheader');
    for (const column of ['Item Code', 'Item Name', 'Item Group', 'Status', 'Unit of Measure', 'Available Quantity']) {
      await expect.soft(headers.filter({ hasText: new RegExp(column, 'i') }), `column "${column}"`).not.toHaveCount(0);
    }
  });

  test('Add Item popup contains the SRS fields', srs('UC1 > Add Item pop-up fields'), async () => {
    await list.openAddItem();
    const d = list.dialog;
    await expect(d.getByRole('button', { name: 'Upload item image' })).toBeVisible();
    await expect(d.getByText('Item Code *')).toBeVisible();
    await expect(d.getByText('Item Name *')).toBeVisible();
    await expect(d.getByText('Item Group *')).toBeVisible();
    await expect(d.getByText('Default Unit of Measure *')).toBeVisible();
    await expect(list.dialogSetting('Maintain Stock')).toBeVisible();
    await expect(list.dialogSetting('Is Fixed Asset')).toBeVisible();
    await expect(list.dialogSave).toBeVisible();
    await expect(list.dialogEditFullForm).toBeVisible();
  });

  test('Item Group offers only child groups (is_group = 0)', srs('UC1 > Item group: displays only child item groups'), async ({ page }) => {
    const res = await page.request.get('/api/resource/Item Group?fields=["name","is_group"]&limit_page_length=500');
    const groups: { name: string; is_group: number }[] = (await res.json()).data;
    const children = groups.filter((g) => !g.is_group).map((g) => g.name).sort();

    await list.openAddItem();
    const options = await list.openDialogSelect('Select Item Group');
    await expect(options.first()).toBeVisible();
    expect((await options.allInnerTexts()).map((s) => s.trim()).sort()).toEqual(children);
  });

  test('Default Unit of Measure offers every UOM', srs('UC1 > Default unit of measure: Link "UOM" doctype'), async ({ page }) => {
    const res = await page.request.get('/api/method/frappe.client.get_count?doctype=UOM');
    const total: number = (await res.json()).message;

    await list.openAddItem();
    const options = await list.openDialogSelect('Select UOM');
    await expect(options.first()).toBeVisible();
    await options.last().scrollIntoViewIfNeeded();
    await expect(options.filter({ hasText: /^Nos$/ }), 'common unit "Nos" is selectable').toHaveCount(1);
    await expect(options, `options shown vs ${total} UOMs in the system`).toHaveCount(total);
  });

  test('Is Fixed Asset hides Maintain Stock', srs('UC1 > Maintain stock: appears only when Is Fixed Asset = 0'), async () => {
    await list.openAddItem();
    await list.dialogSetting('Is Fixed Asset').click();
    await expect(list.dialogSetting('Maintain Stock')).toBeHidden();
  });

  test('Maintain Stock hides Is Fixed Asset', srs('UC1 > Is Fixed Asset: appears only when Maintain stock = 0'), async () => {
    await list.openAddItem();
    await list.dialogSetting('Maintain Stock').click();
    await expect(list.dialogSetting('Is Fixed Asset')).toBeHidden();
  });

  test('popup buttons are not covered at 1280x720', srs('UC1 > Add Item pop-up: Save and Edit full form buttons usable'), async () => {
    await list.openAddItem();
    await expect(list.dialogSave).toBeVisible();
    // trial: true runs the actionability checks (visible, stable, not covered) without clicking
    await list.dialogEditFullForm.click({ trial: true, timeout: 5_000 });
    await list.dialogSave.click({ trial: true, timeout: 5_000 });
  });
});

test.describe('SRS UC1 - Add Item popup flows (taller window)', () => {
  // At 1280x720 the popup's buttons are covered by the option cards (see test above),
  // so run these flows in a taller window to check their own requirements.
  test.use({ viewport: { width: 1280, height: 1000 } });
  let list: ItemsListPage;

  test.beforeEach(async ({ page }) => {
    list = new ItemsListPage(page);
    await list.goto();
  });

  test('saving from the popup keeps the typed Item Code', srs('UC1 > Item code: mandatory, unique, user-entered'), async ({ page }) => {
    const code = `QE-${faker.string.alphanumeric(8).toUpperCase()}`;
    const name = `PW Quick ${faker.commerce.productName()}`;

    await list.openAddItem();
    await list.dialogItemCode.fill(code);
    await list.dialogItemName.fill(name);
    await list.dialogSelect('Select Item Group', 'Services');
    await list.dialogSelect('Select UOM', 'Box'); // "Unit"/"Nos" are not reachable in this list (see UOM test)
    await list.dialogSave.click();
    await expect(page.getByRole('alert').filter({ hasText: /saved successfully|created successfully/ })).toBeVisible();

    const res = await page.request.get(`/api/resource/Item?filters=[["item_name","=","${name}"]]&fields=["item_code"]`);
    const [saved] = (await res.json()).data;
    expect(saved?.item_code).toBe(code);
  });

  test('Edit Full Form opens the Add Item screen', srs('UC1 > Edit full form: redirects to the "Add Item screen"'), async ({ page }) => {
    await list.openAddItem();
    await list.dialogEditFullForm.click();
    await expect(page).toHaveURL(/#\/inventory\/items\/new/);
    await expect(page.getByRole('textbox', { name: 'Enter Item Name' })).toBeVisible();
  });
});
