import { type Page, type Locator } from '@playwright/test';

/** Inventory › Items list and its "Add Item" quick-entry popup (SRS UC1). */
export class ItemsListPage {
  readonly table: Locator;
  readonly addItem: Locator;
  readonly dialog: Locator;
  readonly dialogItemCode: Locator;
  readonly dialogItemName: Locator;
  readonly dialogSave: Locator;
  readonly dialogEditFullForm: Locator;

  constructor(private readonly page: Page) {
    this.table = page.getByRole('main').getByRole('table');
    // Unlabelled "+" button next to the "Inventory Items" heading
    this.addItem = page.getByRole('heading', { name: 'Inventory Items' }).locator('xpath=following-sibling::button[1]');
    this.dialog = page.getByRole('dialog');
    this.dialogItemCode = this.dialog.getByRole('textbox', { name: 'e.g. ITM-0007' });
    this.dialogItemName = this.dialog.getByRole('textbox', { name: 'e.g. Wireless Mouse' });
    this.dialogSave = this.dialog.getByRole('button', { name: 'Save' });
    this.dialogEditFullForm = this.dialog.getByRole('button', { name: 'Edit Full Form' });
  }

  async goto() {
    await this.page.goto('about:blank');
    await this.page.goto('/desk/shamel#/inventory/items');
    await this.table.waitFor();
  }

  async openAddItem() {
    await this.addItem.click();
    await this.dialogItemCode.waitFor();
  }

  dialogSetting(name: string): Locator {
    return this.dialog.getByRole('heading', { name, exact: true });
  }

  /** The popup's dropdowns are custom lists rendered outside the dialog and hidden from accessibility tools. */
  async openDialogSelect(placeholder: 'Select Item Group' | 'Select UOM') {
    await this.dialog.getByText(placeholder, { exact: true }).click();
    return this.page.locator('li:visible');
  }

  async dialogSelect(placeholder: 'Select Item Group' | 'Select UOM', value: string) {
    const options = await this.openDialogSelect(placeholder);
    await options.filter({ hasText: new RegExp(`^${value}$`) }).click();
  }
}
