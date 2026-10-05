import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ItemFormPage } from './pages/ItemFormPage';

const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
const DATA = 'Shamel/data/';

test.describe('SRS UC2 - Add Item, Details tab', () => {
  let form: ItemFormPage;

  test.beforeEach(async ({ page }) => {
    form = new ItemFormPage(page);
    await form.gotoNew();
  });

  test.describe('field lengths', () => {
    test('Item Code stops at 100 characters', srs('UC2 > Item code: maximum length 100'), async ({ page }) => {
      await form.itemCode.click();
      await page.keyboard.type('C'.repeat(105));
      await expect(form.itemCode).toHaveValue('C'.repeat(100));
    });

    test('Item Name stops at 100 characters', srs('UC2 > Item name: maximum length 100'), async ({ page }) => {
      await form.itemName.click();
      await page.keyboard.type('N'.repeat(105));
      await expect(form.itemName).toHaveValue('N'.repeat(100));
    });

    test('Description stops at 500 characters', srs('UC2 > Description: maximum length 500'), async ({ page }) => {
      await form.description.click();
      await page.keyboard.insertText('D'.repeat(505));
      await expect(form.description).toHaveValue('D'.repeat(500));
      await expect(page.getByText('500 / 500')).toBeVisible();
    });

    test('too-short values show an error for each field', srs('UC2 > Minimum lengths: code 2, name 2, description 3'), async ({ page }) => {
      await form.fillRequired({ code: 'A', name: 'B', group: 'Services', uom: 'Unit' });
      await form.description.fill('ab');
      await form.save.click();

      await expect(page.getByText('Item Code must be at least 2 characters')).toBeVisible();
      await expect(page.getByText('Item Name must be at least 2 characters')).toBeVisible();
      await expect(page.getByText('Description must be at least 3 characters')).toBeVisible();
      await expect(page).toHaveURL(/#\/inventory\/items\/new$/);
    });
  });

  test('empty required fields each show an error', srs('UC2 > Save: a validation error message is displayed for each invalid field'), async ({ page }) => {
    await form.itemCode.fill(`PW-${faker.string.alphanumeric(6)}`);
    await form.save.click();

    await expect.soft(page.getByText(/Item Group.*required/i)).toBeVisible();
    await expect.soft(page.getByText(/Unit of Measure.*required/i)).toBeVisible();
    await expect(page.getByText(/Validation Error in details/), 'no raw server error').toBeHidden();
  });

  test.describe('saving', () => {
    test('saved item keeps the typed Item Code', srs('UC2 > Item code: user-entered, unique'), async ({ page }) => {
      const code = `PW-${faker.string.alphanumeric(8).toUpperCase()}`;
      await form.fillRequired({ code, name: `PW Item ${faker.commerce.productName()}`, group: 'Services', uom: 'Unit' });
      await form.save.click();

      await expect(page.getByRole('alert').filter({ hasText: 'Item created successfully' })).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`#/inventory/items/${code}$`));
      await expect(form.itemCode).toHaveValue(code);
    });

    test('empty Item Name takes the Item Code; Description defaults to Item Code', srs('UC2 > Item name: if left empty, same as Item Code; Description: Item Code fetched by default'), async ({ page }) => {
      const code = `PW-NONAME-${faker.string.alphanumeric(6).toUpperCase()}`;
      await form.itemCode.fill(code);
      await form.selectOption(form.itemGroup, 'Services');
      await form.selectOption(form.uom, 'Unit');
      await form.save.click();
      await expect(page.getByRole('alert').filter({ hasText: 'Item created successfully' })).toBeVisible();

      const res = await page.request.get(`/api/resource/Item?filters=[["item_name","=","${code}"]]&fields=["item_name","description"]`);
      const [saved] = (await res.json()).data;
      expect(saved?.item_name).toBe(code);
      expect(saved?.description).toBe(code);
    });
  });

  test.describe('item image', () => {
    test('rejects a non-image file', srs('UC2 > Item image: error for non-image file'), async ({ page }) => {
      await form.imageInput.setInputFiles(`${DATA}not-an-image.txt`);
      await expect(page.getByRole('alert').filter({ hasText: 'Only PNG and JPG images are allowed' })).toBeVisible();
    });

    test('rejects an image over 5 MB', srs('UC2 > Item image: error if larger than 5 MB'), async ({ page }) => {
      await form.imageInput.setInputFiles(`${DATA}too-large-6mb.png`);
      await expect(page.getByRole('alert').filter({ hasText: 'Image must be less than 5 MB' })).toBeVisible();
    });

    test('uploads a valid PNG', srs('UC2 > Item image: accepts JPEG and PNG up to 5 MB'), async ({ page }) => {
      const upload = page.waitForResponse((r) => r.url().includes('/api/method/upload_file'), { timeout: 30_000 });
      await form.imageInput.setInputFiles(`${DATA}valid-image.png`);
      expect((await upload).status()).toBe(200);
    });
  });

  test.describe('conditional fields', () => {
    test('Fixed Asset shows asset fields', srs('UC2 > Is Fixed Asset: shows Auto Create Assets on Purchase and Asset Category'), async () => {
      await form.setting('Fixed Asset').click();
      await expect(form.setting('Auto Create Assets on Purchase')).toBeVisible();
      await expect(form.main.getByText('Asset Category *')).toBeVisible();
    });

    test('Fixed Asset hides Maintain Stock and Has Variants', srs('UC2 > Maintain stock / Has Variants: appear only when Is Fixed Asset = 0'), async () => {
      await form.setting('Fixed Asset').click();
      await expect(form.setting('Auto Create Assets on Purchase')).toBeVisible();
      await expect.soft(form.setting('Maintain Stock')).toBeHidden();
      await expect.soft(form.setting('Has Variants')).toBeHidden();
    });

    test('Maintain Stock shows Opening Stock, Standard Selling Rate and the Inventory tab', srs('UC2 > Maintain stock: shows Opening Stock and Inventory tab; Standard Selling Rate on first creation'), async () => {
      await expect(form.tab('Inventory')).toBeHidden();
      await form.setting('Maintain Stock').click();
      await expect(form.main.getByText('Opening Stock', { exact: true })).toBeVisible();
      await expect(form.main.getByText('Standard Selling Rate', { exact: true })).toBeVisible();
      await expect(form.tab('Inventory')).toBeVisible();
    });

    test('Maintain Stock hides Fixed Asset', srs('UC2 > Is Fixed Asset: appears only when Maintain stock = 0'), async () => {
      await form.setting('Maintain Stock').click();
      await expect(form.main.getByText('Opening Stock', { exact: true })).toBeVisible();
      await expect(form.setting('Fixed Asset')).toBeHidden();
    });

    test('Has Variants shows the Variants section', srs('UC2 > Has Variants: shows the Variants section'), async () => {
      await form.setting('Has Variants').click();
      await expect(form.main.getByText('Variants Based On')).toBeVisible();
    });
  });

  test('Connections and All Activities tabs are not shown on a new item', srs('UC7/UC8 > tabs displayed only on the item details page'), async () => {
    await expect(form.tab('Details')).toBeVisible();
    await expect.soft(form.tab('All Activities')).toBeHidden();
    await expect.soft(form.tab('Connections')).toBeHidden();
  });
});
