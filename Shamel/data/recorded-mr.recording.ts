import { test, expect } from '@playwright/test';

test.use({
  serviceWorkers: 'block',
  storageState: 'playwright/.auth/user.json',
  viewport: {
    height: 900,
    width: 1400
  }
});

test('test', async ({ page }) => {
  await page.routeFromHAR('C:\\Playwright_Automation\\test-results\\recorded-mr.har', {
    url: '**/api/**'
  });
  await page.goto('https://test.hr.azzrk.com/desk/shamel#/inventory/material-request/new');
  await page.locator('.cs-control').first().click();
  await page.getByRole('combobox', { name: 'Select Series' }).click();
  await page.locator('.cs-control').first().dblclick();
  await page.locator('.cs-control').first().click();
  await page.getByRole('combobox', { name: 'Select Series' }).click();
  await page.getByRole('combobox', { name: 'Select Series' }).dblclick();
  await page.getByText('Basic InformationSeries *').click();
  await page.getByRole('heading', { name: 'Items', exact: true }).click();
  await page.getByRole('option', { name: 'MAT-MR-.YYYY.-' }).click();
  await page.getByRole('textbox', { name: 'Select date' }).first().click();
  await page.getByLabel('October 7,').first().click();
  await page.getByPlaceholder('Select date').first().fill('2026-10-07');
  await page.getByRole('textbox', { name: 'Select date' }).first().click();
  await page.getByLabel('October 10,').first().click();
  await page.getByPlaceholder('Select date').first().fill('2026-10-10');
  await page.getByRole('combobox', { name: 'Select Purpose' }).click();
  await page.getByRole('option', { name: 'Purchase' }).click();
  await page.getByText('Price List * Required Before *').click();
  await page.getByRole('combobox', { name: 'Select Price List' }).click();
  await page.getByRole('option', { name: 'Standard Buying', exact: true }).click();
  await page.getByRole('textbox', { name: 'Select date' }).nth(1).click();
  await page.getByLabel('October 22,').nth(1).click();
  await page.getByPlaceholder('Select date').nth(2).fill('2026-10-22');
  await page.getByRole('combobox', { name: 'Select Warehouse' }).click();
  await page.getByRole('option', { name: 'مخزن القاضى' }).click();
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByRole('combobox', { name: 'Item Code' }).click();
  await page.getByRole('option', { name: '-3-BLU' }).click();
  await page.getByRole('textbox', { name: 'Date', exact: true }).click();
  await page.getByLabel('October 29,').nth(2).click();
  await page.getByPlaceholder('Date').nth(4).fill('2026-10-29');
  await page.getByRole('spinbutton', { name: '0' }).click();
  await page.getByRole('spinbutton', { name: '0' }).fill('50');
  await page.locator('div:nth-child(5) > .creatable-select > .cs-control').click();
  await page.getByRole('button', { name: 'Show popup' }).nth(5).click();
  await page.getByRole('option', { name: 'مخزن القاضى' }).click();
  await page.getByRole('combobox', { name: 'Unit' }).click();
  await page.getByRole('option', { name: 'Abampere' }).click();
  await page.getByRole('button', { name: 'Additional Information' }).click();
  await page.getByRole('combobox', { name: 'Select Terms' }).click();
  await page.getByRole('option', { name: 'شرط جديد' }).click();
  await page.getByRole('textbox', { name: 'Enter terms and conditions' }).click();
  await page.getByRole('textbox', { name: 'Enter terms and conditions' }).fill('شرط جديد تيست ');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Warehouse None is not').click();
  await page.locator('.btn.btn-ghost.btn-modal-close').click();
  await page.getByRole('dialog').click();
  await page.getByRole('dialog').click();
  await page.locator('.btn.btn-ghost.btn-modal-close').click();
  await page.getByRole('dialog').click();
  await page.getByRole('dialog').click();
  await page.getByRole('dialog').click();
  await page.getByRole('dialog').click();
  await page.getByRole('button', { name: 'Details' }).click();
  await page.getByRole('combobox', { name: 'Select Warehouse' }).click();
  await page.locator('div:nth-child(2) > .creatable-select > .cs-control').first().click();
  await page.getByRole('combobox', { name: 'Select Warehouse' }).click({
    clickCount: 3
  });
  await page.getByRole('combobox', { name: 'Select Warehouse' }).click();
  await page.getByRole('combobox', { name: 'Select Warehouse' }).dblclick();
  await page.getByRole('combobox', { name: 'Select Warehouse' }).click({
    clickCount: 3
  });
  await page.getByRole('combobox', { name: 'Select Warehouse' }).fill('');
  await page.getByRole('option', { name: 'مخزن جديد 1' }).click();
  await page.getByRole('combobox', { name: 'Warehouse', exact: true }).click();
  await page.locator('div:nth-child(5) > .creatable-select > .cs-control').click();
  await page.getByRole('combobox', { name: 'Warehouse', exact: true }).fill('');
  await page.getByRole('option', { name: 'مخزن جديد 1' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
});