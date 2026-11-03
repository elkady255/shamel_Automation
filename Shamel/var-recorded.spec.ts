import { test, expect } from '@playwright/test';

test.use({
  storageState: 'playwright/.auth/user.json'
});

test('test', async ({ page }) => {
  await page.goto('https://test.hr.azzrk.com/desk/shamel#/inventory/items/STO-ITEM-2026-00306');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Multiple Variants' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('dialog', { name: 'Create Multiple Variants' }).click();
  await page.getByText('Total variants to create:').click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.locator('span').filter({ hasText: 'Small×' }).getByRole('button').click();
  await page.locator('.multi-attr-group > .creatable-select > .cs-control').click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('button', { name: 'Show popup' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Multiple Variants' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.locator('.creatable-select.is-attr-readonly > .cs-control').click();
  await page.getByRole('button', { name: 'Show popup' }).nth(3).click();
  await page.getByRole('option', { name: 'المقاس' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Multiple Variants' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('combobox', { name: 'Select UOM' }).first().click();
  await page.getByRole('textbox', { name: 'Enter description' }).click();
  await page.getByRole('textbox', { name: 'Enter description' }).click();
  await page.getByText('Variants Based OnItem').click();
  await page.getByRole('combobox', { name: 'Select Attribute' }).click();
  await page.getByRole('option', { name: 'PW-Size' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Multiple Variants' }).click();
  await page.getByRole('dialog', { name: 'Create Multiple Variants' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('button', { name: 'Show popup' }).click();
  await page.getByRole('combobox', { name: 'Select PW-Size' }).click();
  await page.getByRole('dialog', { name: 'Create Multiple Variants' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
});