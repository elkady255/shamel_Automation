import { test, expect } from '@playwright/test';
import { AccountingTab } from './pages/AccountingTab';
import { createItem, deleteItem, getItem, UI_DEFAULTS, type ItemSeed } from './helpers/api';

const srs = (description: string) => ({ annotation: { type: 'SRS', description } });

/** Each test gets its own throwaway item, deleted afterwards. */
function withItem(seed: ItemSeed) {
  let name = '';

  test.beforeEach(async () => {
    name = await createItem({ item_name: `PW UC4 ${Date.now()}`, ...seed });
  });

  test.afterEach(async () => {
    if (name) await deleteItem(name);
  });

  return () => name;
}

const ITEM_DEFAULTS_COLUMNS = [
  'Company', 'Default Warehouse', 'Default Price List', 'Default Discount Account', 'Default Inventory Account',
  'Inventory Account Currency', 'Default Buying Cost Center', 'Default Supplier', 'Default Expense Account',
  'Default Provisional Account (Service)', 'Default Selling Cost Center', 'Default Income Account',
  'Default COGS Account', 'Deferred Expense Account', 'Deferred Revenue Account',
];
const TAX_COLUMNS = ['Item Tax Template', 'Tax Category', 'Valid From', 'Minimum Net Rate', 'Maximum Net Rate'];

test.describe('SRS UC4 - Accounting & Taxes (item as created by the UI)', () => {
  const item = withItem(UI_DEFAULTS);
  let tab: AccountingTab;

  test.beforeEach(async ({ page }) => {
    tab = new AccountingTab(page);
    await tab.open(item());
  });

  test('Deferred Expense shows a required Number of Months (Expense)', srs('UC4 > Enable Deferred Expense: shows Number of Months (Expense)'), async () => {
    await expect(tab.main.getByText('Number of Months (Expense)')).toBeHidden();
    await tab.switch('Enable Deferred Expense').click();
    await expect(tab.main.getByText('Number of Months (Expense) *')).toBeVisible();
  });

  test('Deferred Revenue shows a required Number of Months (Revenue)', srs('UC4 > Enable Deferred Revenue: shows Number of Months (Revenue)'), async () => {
    await expect(tab.main.getByText('Number of Months (Revenue)')).toBeHidden();
    await tab.switch('Enable Deferred Revenue').click();
    await expect(tab.main.getByText('Number of Months (Revenue) *')).toBeVisible();
  });

  test('Number of Months accepts digits only, up to 100 characters', srs('UC4 > Number of Months: numbers only, max length 100'), async () => {
    await tab.switch('Enable Deferred Revenue').click();
    const months = tab.months('Revenue');
    await tab.typeInto(months, '1a2b-3!');
    await expect(months).toHaveValue('123');
    await expect(months).toHaveAttribute('maxlength', '100');
  });

  test('Number of Months starts empty, not prefilled with 0', srs('UC4 > Number of Months: mandatory, error if left empty'), async () => {
    await tab.switch('Enable Deferred Revenue').click();
    await expect(tab.months('Revenue')).toHaveValue('');
  });

  test('empty Number of Months (Expense) shows an error', srs('UC4 > Number of Months (Expense): error if left empty'), async ({ page }) => {
    await tab.switch('Enable Deferred Expense').click();
    await tab.switch('Enable Deferred Revenue').click(); // also enables Save (see next test)
    await tab.typeInto(tab.months('Revenue'), '12');
    // The field is prefilled with "0", which counts as filled (covered by the "starts empty" test); clear it
    await tab.months('Expense').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await tab.save();
    await expect(page.getByText('Number of Months (Expense) is required')).toBeVisible();
  });

  test('toggling Deferred Expense enables Save', srs('UC4 > Save: changes on the tab can be saved'), async () => {
    await expect(tab.saveButton).toBeDisabled();
    await tab.switch('Enable Deferred Expense').click();
    await expect(tab.saveButton).toBeEnabled();
  });

  test('the default tax row (0 rates) does not block saving', srs('UC4 > Save: valid data is saved; numeric rates 0..n allowed'), async ({ page }) => {
    await tab.switch('Enable Deferred Revenue').click();
    await tab.typeInto(tab.months('Revenue'), '12');
    await tab.save();
    await expect(page.getByRole('alert').filter({ hasText: 'Item updated successfully' })).toBeVisible();
  });

  test('a failed save keeps both net rate inputs', srs('UC4 > Taxes: Minimum and Maximum Net Rate columns'), async ({ page }) => {
    await expect(tab.netRates).toHaveCount(2);
    await tab.switch('Enable Deferred Revenue').click();
    await tab.typeInto(tab.months('Revenue'), '12');
    await tab.save();
    await expect(page.getByText('Must be at least 2 characters').first()).toBeVisible(); // the failure under test
    await expect(tab.netRates).toHaveCount(2);
  });

  test('Deferred Accounting is hidden for a Fixed Asset', srs('UC4 > Deferred Accounting appears only when Is Fixed Asset = 0'), async () => {
    await tab.main.getByRole('button', { name: 'Details', exact: true }).click();
    await tab.form.setting('Fixed Asset').click();
    await tab.main.getByRole('button', { name: 'Accounting & Taxes', exact: true }).click();
    await expect(tab.itemDefaults.getByText('Company', { exact: true })).toBeVisible();
    await expect(tab.main.getByText('Enable Deferred Expense', { exact: true })).toBeHidden();
    await expect(tab.main.getByText('Enable Deferred Revenue', { exact: true })).toBeHidden();
  });

  test('Item Defaults Edit row lists the 15 SRS fields', srs('UC4 > Item Defaults > Edit Row fields'), async () => {
    await tab.rowEdit(tab.itemDefaults, 0).click();
    const dialog = tab.dialog();
    for (const field of ITEM_DEFAULTS_COLUMNS) {
      await expect.soft(dialog.getByText(field, { exact: false }).first(), field).toBeVisible();
    }
  });

  test('Item Defaults column settings: width defaults to 3 and takes up to 3 digits', srs('UC4 > Item Defaults > Setting > Column width: numbers only, 1-3 chars, default 3'), async ({ page }) => {
    await tab.settings(tab.itemDefaults).click();
    const width = tab.dialog().locator('input[type=text]').first();
    await expect.soft(width).toHaveValue('3');
    await width.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('ab12345');
    await expect(width).toHaveValue('123');
  });

  test('Item Defaults column settings have Update and Reset to default', srs('UC4 > Item Defaults > Setting: "Update" and "Reset to default" buttons'), async () => {
    await tab.settings(tab.itemDefaults).click();
    await expect.soft(tab.dialog().getByRole('button', { name: 'Update' })).toBeVisible();
    await expect(tab.dialog().getByRole('button', { name: 'Reset to default' })).toBeVisible();
  });

  test('Item Defaults Add/Remove columns offers all 15 columns', srs('UC4 > Item Defaults > Setting > Add / Remove columns: 15 columns'), async () => {
    await tab.settings(tab.itemDefaults).click();
    await tab.dialog().getByText('Add/Remove Fields').click();
    const picker = tab.dialog();
    for (const column of ITEM_DEFAULTS_COLUMNS) {
      await expect.soft(picker.getByText(column, { exact: true }), column).toBeVisible();
    }
  });

  test('Taxes Edit row and Add/Remove columns list the 5 SRS columns', srs('UC4 > Taxes > Edit Row and Add / Remove columns'), async () => {
    await tab.rowEdit(tab.taxes, 0).click();
    for (const column of TAX_COLUMNS) await expect.soft(tab.dialog().getByText(column).first(), `edit row: ${column}`).toBeVisible();
    await tab.dialog().getByRole('button', { name: 'Cancel' }).click();
    await tab.settings(tab.taxes).click();
    await tab.dialog().getByText('Add/Remove Fields').click();
    for (const column of TAX_COLUMNS) await expect.soft(tab.dialog().getByText(column, { exact: true }), `columns: ${column}`).toBeVisible();
  });
});

test.describe('SRS UC4 - Accounting & Taxes (clean item, no tax row)', () => {
  const item = withItem({ item_defaults: UI_DEFAULTS.item_defaults, taxes: [] });
  let tab: AccountingTab;

  test.beforeEach(async ({ page }) => {
    tab = new AccountingTab(page);
    await tab.open(item());
  });

  test('deferred expense and revenue months are saved', srs('UC4 > Deferred Accounting saved'), async ({ page }) => {
    await tab.switch('Enable Deferred Expense').click();
    await tab.typeInto(tab.months('Expense'), '12');
    await tab.switch('Enable Deferred Revenue').click();
    await tab.typeInto(tab.months('Revenue'), '24');
    await tab.save();
    await expect(page.getByRole('alert').filter({ hasText: 'Item updated successfully' })).toBeVisible();

    const saved = await getItem(item());
    expect(saved).toMatchObject({ enable_deferred_expense: 1, no_of_months_exp: 12, enable_deferred_revenue: 1, no_of_months: 24 });
  });

  test('new Item Defaults row defaults the warehouse to Stores', srs('UC4 > Item Defaults > Default Warehouse: default value is Stores warehouse'), async () => {
    await tab.itemDefaults.getByText('Add Setting').click();
    await tab.selectOption(tab.companies.last(), 'Warrqa', /Warrqa/);
    await expect(tab.warehouses.last()).toHaveValue(/^Stores - /);
  });

  test('empty Company in Item Defaults shows a field error', srs('UC4 > Item Defaults > Company: mandatory, error if left empty'), async ({ page }) => {
    await tab.itemDefaults.getByText('Add Setting').click();
    await tab.save();
    await expect(page.getByText(/Company.*required/i).first()).toBeVisible();
    await expect(tab.serverError.filter({ hasText: 'Validation Error' }), 'no raw server error').toBeHidden();
  });

  test('empty Default Warehouse in Item Defaults shows a field error', srs('UC4 > Item Defaults > Default Warehouse: mandatory, error if left empty'), async ({ page }) => {
    await tab.itemDefaults.getByText('Add Setting').click();
    await tab.selectOption(tab.companies.last(), 'Warrqa', /Warrqa/);
    await tab.warehouses.last().fill('');
    await tab.save();
    await expect(page.getByText(/Warehouse.*required/i).first()).toBeVisible();
    await expect(tab.serverError.filter({ hasText: 'Validation Error' }), 'no raw server error').toBeHidden();
  });

  test('a saved Item Defaults row can be deleted', srs('UC4 > Item Defaults > Delete row'), async ({ page }) => {
    await tab.itemDefaults.getByText('Add Setting').click();
    await tab.selectOption(tab.companies.last(), 'Warrqa', /Warrqa/);
    await tab.selectOption(tab.warehouses.last(), 'Stores', 'Stores - Warrqa');
    await tab.save();
    await expect(page.getByRole('alert').filter({ hasText: 'Item updated successfully' })).toBeVisible();
    expect((await getItem(item())).item_defaults).toHaveLength(2);

    await tab.rowDelete(tab.itemDefaults, 1).click();
    await expect(tab.companies).toHaveCount(1);
    await tab.save();
    await expect(page.getByRole('alert').filter({ hasText: 'Item updated successfully' }).last()).toBeVisible();
    await expect.poll(async () => (await getItem(item())).item_defaults.map((d) => d.company)).toEqual(['Ahmed Ebrahim CO.']);
  });

  test('net rates accept decimals and reject letters', srs('UC4 > Taxes > Minimum/Maximum Net Rate: integers and decimals only'), async () => {
    await tab.taxes.getByText('Add Tax').click();
    const min = tab.netRates.first();
    await tab.typeInto(min, '12.5x-!');
    await expect(min).toHaveValue('12.5');
  });

  test('empty Item Tax Template shows a field error', srs('UC4 > Taxes > Item Tax Template: mandatory, error if left empty'), async ({ page }) => {
    await tab.taxes.getByText('Add Tax').click();
    await tab.typeInto(tab.netRates.first(), '10');
    await tab.typeInto(tab.netRates.last(), '99');
    await tab.save();
    await expect(page.getByText(/Tax Template.*required/i).first()).toBeVisible();
    await expect(tab.serverError.filter({ hasText: 'does not exist' }), 'no raw server error').toBeHidden();
  });
});
