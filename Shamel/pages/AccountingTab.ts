import { type Page, type Locator } from '@playwright/test';
import { ItemFormPage } from './ItemFormPage';

/** Item › "Accounting & Taxes" tab (SRS UC4). */
export class AccountingTab {
  readonly form: ItemFormPage;
  readonly main: Locator;
  readonly itemDefaults: Locator;
  readonly taxes: Locator;
  readonly companies: Locator;
  readonly warehouses: Locator;
  readonly templates: Locator;
  readonly netRates: Locator;
  readonly saveButton: Locator;
  /** After a failed save the Save button turns into an unlabelled "retry" icon next to "Failed to save". */
  readonly retryButton: Locator;
  /** Server-side validation errors are shown in a dialog as raw text. */
  readonly serverError: Locator;

  constructor(private readonly page: Page) {
    this.form = new ItemFormPage(page);
    this.main = page.getByRole('main');
    this.itemDefaults = this.section('Item Defaults');
    this.taxes = this.section('Taxes');
    this.companies = this.itemDefaults.getByRole('combobox', { name: 'Company' });
    this.warehouses = this.itemDefaults.getByRole('combobox', { name: 'Warehouse' });
    this.templates = this.taxes.getByRole('combobox', { name: 'Template' });
    this.netRates = this.taxes.locator('input[placeholder="0.00"]');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true }).last();
    this.retryButton = page.getByText('Failed to save', { exact: true }).locator('xpath=preceding-sibling::button[1]');
    this.serverError = page.locator('.msgprint');
  }

  async open(itemName: string) {
    await this.form.gotoItem(itemName);
    await this.main.getByRole('button', { name: 'Accounting & Taxes', exact: true }).click();
    await this.itemDefaults.getByText('Company', { exact: true }).waitFor();
  }

  private section(title: string): Locator {
    return this.main.locator(`xpath=//h3[normalize-space(.)="${title}"]/../..`);
  }

  /** The toggle's checkbox has no linked label, so locate the switch through its field container. */
  switch(label: 'Enable Deferred Expense' | 'Enable Deferred Revenue'): Locator {
    return this.main.locator('.is-switch-field', { hasText: label }).locator('.customer-switch');
  }

  months(kind: 'Expense' | 'Revenue'): Locator {
    return this.main.locator('.cd-field', { hasText: `Number of Months (${kind})` }).locator('input').first();
  }

  /** Change detection reacts to real key presses, not to fill(), so type like a user. */
  async typeInto(input: Locator, text: string) {
    await input.click();
    await this.page.keyboard.press('Control+A');
    await input.pressSequentially(text, { delay: 40 });
  }

  async selectOption(combobox: Locator, search: string, option: string | RegExp) {
    await combobox.click();
    await combobox.fill(search);
    await this.page.getByRole('option', { name: option }).first().click();
  }

  rowEdit(section: Locator, index: number): Locator {
    return section.locator('.id-uom-edit').nth(index);
  }

  rowDelete(section: Locator, index: number): Locator {
    return section.locator('.id-uom-trash').nth(index);
  }

  settings(section: Locator): Locator {
    return section.locator('.id-uom-settings').first();
  }

  dialog(): Locator {
    return this.page.getByRole('dialog').last();
  }

  async save() {
    if (await this.retryButton.count()) await this.retryButton.click();
    else await this.saveButton.click();
  }
}
