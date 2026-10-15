import { type Page, type Locator, expect } from '@playwright/test';

const LOAD = { timeout: 120_000 };

/** Inventory › Packing Slip list, Add form and Details (SRS UC1 List, UC2 Add, UC5 Details). */
export class PackingSlipPage {
  readonly main: Locator;
  readonly table: Locator;
  readonly items: Locator;
  readonly save: Locator;

  constructor(private readonly page: Page) {
    this.main = page.getByRole('main');
    this.table = this.main.getByRole('table');
    this.items = this.main.locator('xpath=//h3[normalize-space(.)="Items"]/../..');
    this.save = page.getByRole('button', { name: 'Save', exact: true }).last();
  }

  /** The app ignores hash-only URL changes, so always load from scratch. */
  private async open(hash: string) {
    await this.page.goto('about:blank');
    await this.page.goto(`/desk/shamel#/inventory/${hash}`, LOAD);
  }

  async gotoList() {
    await this.open('packing-slip');
    await this.table.waitFor(LOAD);
  }

  async gotoNew() {
    await this.open('packing-slip/new');
    await this.field('Select Delivery Note').waitFor(LOAD);
  }

  async gotoDetails(name: string) {
    await this.open(`packing-slip/${encodeURIComponent(name)}`);
    await this.main.getByRole('heading', { name: 'Packing Slip Details' }).waitFor(LOAD);
    await this.field('Select Delivery Note').waitFor(LOAD);
  }

  /** Form inputs are found by placeholder (they have no accessible names). */
  field(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder, { exact: true }).first();
  }

  row(rows: Locator = this.main.locator('tbody tr')) {
    return {
      row: (n: number) => rows.nth(n),
      itemCode: (n: number) => rows.nth(n).getByPlaceholder('Item Code', { exact: true }),
      qty: (n: number) => rows.nth(n).locator('input[placeholder="0"]').nth(0),
      netWeight: (n: number) => rows.nth(n).locator('input[placeholder="0"]').nth(1),
      select: (n: number) => rows.nth(n).getByRole('checkbox'),
    };
  }

  /** Pick an existing option from a dropdown: type only to search, then click the listed option. */
  async search(box: Locator, query: string, option: string | RegExp = query) {
    await box.click();
    await box.fill(query);
    await this.page.waitForTimeout(1500); // the list is filtered on the server
    await this.page
      .getByRole('option', { name: option, exact: typeof option === 'string' })
      .first()
      .click({ timeout: 60_000 });
  }

  /** All option labels a dropdown offers right after opening it (first page only), without choosing one. */
  async options(box: Locator): Promise<string[]> {
    await box.click();
    await this.page.getByRole('option').first().waitFor({ timeout: 60_000 }).catch(() => {});
    await this.page.waitForTimeout(1500);
    const texts = await this.page.getByRole('option').allInnerTexts();
    await this.page.keyboard.press('Escape');
    return texts.map((t) => t.trim());
  }

  async chooseDeliveryNote(name: string) {
    await this.search(this.field('Select Delivery Note'), name);
  }

  async chooseSeries() {
    await this.field('Select Series').click();
    await this.page.getByRole('option').first().click({ timeout: 30_000 });
  }

  async addRow() {
    await this.main.getByRole('button', { name: 'Add Row' }).click();
  }

  async typeNumber(box: Locator, value: string) {
    await box.click();
    await box.fill('');
    await box.pressSequentially(value, { delay: 30 });
  }

  /** Header fields for a Draft Delivery Note, one packed row and a gross weight. */
  async fillForm(opts: { dn: string; item?: string; itemLabel?: string; qty?: string; gross?: string; uom?: string; number?: string }) {
    await this.chooseDeliveryNote(opts.dn);
    await this.chooseSeries();
    if (opts.number) await this.field('Enter Packing Slip Number').fill(opts.number);
    if (opts.item) {
      await this.addRow();
      await this.search(this.row().itemCode(0), opts.item, opts.itemLabel ?? opts.item);
      if (opts.qty) await this.typeNumber(this.row().qty(0), opts.qty);
    }
    if (opts.gross) await this.typeNumber(this.field('Enter Gross Weight'), opts.gross);
    if (opts.uom) await this.search(this.field('Select Gross Weight UOM'), opts.uom);
  }

  /** Tick a row's checkbox in the list table. */
  async selectListRow(n: number) {
    await this.table.getByRole('row').nth(n + 1).getByRole('checkbox').check();
  }

  /** Find a Packing Slip in the list by its ID and tick its checkbox. */
  async selectById(id: string) {
    const box = this.main.getByPlaceholder('Search By ID');
    await box.fill(id);
    await this.page.waitForTimeout(2500);
    const row = this.table.getByRole('row').filter({ hasText: id });
    await row.getByRole('checkbox').check();
    return row;
  }

  actionBar(name: string): Locator {
    return this.main.getByRole('button', { name, exact: true });
  }

  async listIds(): Promise<string[]> {
    const cells = await this.table.getByRole('row').getByText(/^MAT-PAC-/).allInnerTexts();
    return cells.map((t) => t.trim());
  }

  async expectToast(text: string | RegExp) {
    await expect(this.page.getByText(text).first()).toBeVisible({ timeout: 30_000 });
  }
}
