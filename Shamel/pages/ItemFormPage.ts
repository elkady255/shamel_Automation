import { type Page, type Locator } from '@playwright/test';

/** Full "Add Item" / "Item details" form (SRS UC2-UC8). */
export class ItemFormPage {
  readonly main: Locator;
  readonly itemCode: Locator;
  readonly itemName: Locator;
  readonly itemGroup: Locator;
  readonly uom: Locator;
  readonly description: Locator;
  readonly imageInput: Locator;
  readonly save: Locator;

  constructor(private readonly page: Page) {
    this.main = page.getByRole('main');
    this.itemCode = page.getByRole('textbox', { name: 'Enter Item Code' });
    this.itemName = page.getByRole('textbox', { name: 'Enter Item Name' });
    this.itemGroup = page.getByRole('combobox', { name: 'Select Item Group' });
    // The saved item also lists UOMs in the "Units of Measure" table; the first one is the default UOM field.
    this.uom = page.getByRole('combobox', { name: 'Select UOM' }).first();
    this.description = page.getByRole('textbox', { name: 'Enter description' });
    this.imageInput = page.locator('input[type=file]');
    // Two Save buttons exist: one at the end of the form (hidden behind the sticky bar, always enabled)
    // and the sticky bottom bar one that users see and click (disabled until the form is valid). Use the last.
    this.save = page.getByRole('button', { name: 'Save', exact: true }).last();
  }

  async gotoNew() {
    await this.open('/desk/shamel#/inventory/items/new');
  }

  async gotoItem(name: string) {
    await this.open(`/desk/shamel#/inventory/items/${name}`);
  }

  /** The app ignores hash-only URL changes (BUG-02), so always load the page from scratch. */
  private async open(path: string) {
    await this.page.goto('about:blank');
    await this.page.goto(path);
    await this.itemName.waitFor();
  }

  /** "Item Settings" option cards: Disabled, Fixed Asset, Has Variants, Maintain Stock. */
  setting(name: string): Locator {
    return this.main.getByText(name, { exact: true });
  }

  tab(name: string): Locator {
    return this.main.getByRole('button', { name, exact: true });
  }

  /** Comboboxes search on the server, so wait for the matching option before clicking it. */
  async selectOption(combobox: Locator, value: string) {
    await combobox.click();
    await combobox.fill(value);
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }

  async fillRequired(item: { code: string; name: string; group: string; uom: string }) {
    await this.itemCode.fill(item.code);
    await this.itemName.fill(item.name);
    await this.selectOption(this.itemGroup, item.group);
    await this.selectOption(this.uom, item.uom);
  }
}
