import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ItemFormPage } from './pages/ItemFormPage';

// Existing master data in the test environment
const ITEM_GROUP = 'Services';
const UOM = 'Unit';

test.describe('Inventory - new item', () => {
  let form: ItemFormPage;

  test.beforeEach(async ({ page }) => {
    form = new ItemFormPage(page);
    await form.gotoNew();
  });

  test('creates an item with the required fields', async ({ page }) => {
    const item = {
      code: `PW-${faker.string.alphanumeric(8).toUpperCase()}`,
      name: `PW Item ${faker.commerce.productName()}`,
      group: ITEM_GROUP,
      uom: UOM,
    };

    await test.step('fill required fields', async () => {
      await form.fillRequired(item);
    });

    await test.step('save', async () => {
      await expect(form.save).toBeEnabled();
      await form.save.click();
    });

    await test.step('item is created and its data is kept', async () => {
      await expect(page.getByRole('alert').filter({ hasText: 'Item created successfully' })).toBeVisible();
      await expect(page).toHaveURL(/#\/inventory\/items\/(?!new)[^/]+$/);
      await expect(form.itemName).toHaveValue(item.name);
      await expect(form.itemGroup).toHaveValue(item.group);
      await expect(form.uom).toHaveValue(item.uom);
    });
  });

  test('does not create an item when required fields are missing', async ({ page }) => {
    // Save is disabled on an untouched form and becomes enabled once anything is typed
    await expect(form.save).toBeDisabled();
    await form.itemName.fill(`PW Item ${faker.commerce.productName()}`);
    await expect(form.save).toBeEnabled();

    await form.save.click();

    await expect(page.getByText('Item Code is required')).toBeVisible();
    await expect(page).toHaveURL(/#\/inventory\/items\/new$/);
    await expect(page.getByRole('alert').filter({ hasText: 'Item created successfully' })).toBeHidden();
  });
});
