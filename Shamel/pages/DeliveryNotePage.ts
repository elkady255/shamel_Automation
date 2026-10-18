import { type Page, type Locator } from '@playwright/test';

const LOAD = { timeout: 120_000 };

/** Inventory › Delivery Note list, Add screen and Details. */
export class DeliveryNotePage {
  readonly main: Locator;
  readonly table: Locator;

  constructor(readonly page: Page) {
    this.main = page.getByRole('main');
    this.table = this.main.getByRole('table');
  }

  /** The app ignores hash-only URL changes, so always load from scratch. */
  private async open(hash: string) {
    await this.page.goto('about:blank');
    await this.page.goto(`/desk/shamel#/inventory/${hash}`, LOAD);
  }
  async gotoList() { await this.open('delivery-note'); await this.table.waitFor(LOAD); await this.page.waitForTimeout(1500); }
  async gotoNew() { await this.open('delivery-note/new'); await this.field('Select Customer').waitFor(LOAD); }
  async gotoDetails(name: string) { await this.open(`delivery-note/${encodeURIComponent(name)}`); await this.main.getByText('Delivery Note Details').first().waitFor(LOAD); await this.page.waitForTimeout(2500); }

  field(placeholder: string): Locator { return this.page.getByPlaceholder(placeholder, { exact: true }).first(); }
  /** List controls exist twice (desktop and a hidden mobile sheet): take the visible one. */
  control(label: string): Locator { return this.main.getByText(label, { exact: true }).locator('visible=true').first(); }
  dataRows(): Locator { return this.table.locator('tbody').getByRole('row'); }
  headerCheckbox(): Locator { return this.table.locator('thead').getByRole('checkbox'); }
  actionBar(name: string): Locator { return this.main.getByRole('button', { name, exact: true }); }
  tab(name: 'Details' | 'General Info' | 'More Info'): Locator { return this.main.getByRole('button', { name, exact: true }); }

  async search(id: string) {
    await this.main.getByPlaceholder('Search By ID').fill(id);
    await this.page.waitForTimeout(2500);
  }
  /** Search the list for an ID and tick its row. */
  async select(id: string) {
    await this.search(id);
    const row = this.dataRows().filter({ hasText: id }).first();
    await row.getByRole('checkbox').check();
    return row;
  }
  async total(): Promise<number> {
    const m = (await this.main.innerText()).replace(/\s+/g, ' ').match(/From (\d+)/);
    return m ? Number(m[1]) : -1;
  }
  async statusOf(id: string): Promise<string> {
    await this.search(id);
    return (await this.dataRows().filter({ hasText: id }).first().innerText()).replace(/\s+/g, ' ').trim();
  }
  confirmDialog(): Locator { return this.page.locator('.shamel-confirm-dialog'); }
}
