import { type Page, type Locator } from '@playwright/test';

const LOAD = { timeout: 120_000 };

/** Inventory › Product Bundle list and Add screen (SRS UC1 List, UC2 Add). */
export class ProductBundlePage {
  readonly main: Locator;
  readonly table: Locator;
  readonly save: Locator;

  constructor(readonly page: Page) {
    this.main = page.getByRole('main');
    this.table = this.main.getByRole('table');
    this.save = page.getByRole('button', { name: 'Save', exact: true }).last();
  }

  /** The app ignores hash-only URL changes, so always load from scratch. */
  private async open(hash: string) {
    await this.page.goto('about:blank');
    await this.page.goto(`/desk/shamel#/inventory/${hash}`, LOAD);
  }

  async gotoList() {
    await this.open('product-bundle');
    await this.table.waitFor(LOAD);
    await this.page.waitForTimeout(1500);
  }

  async gotoNew() {
    await this.open('product-bundle/new');
    await this.parent.waitFor(LOAD);
  }

  get parent(): Locator { return this.page.getByPlaceholder('Search and select item').first(); }
  get description(): Locator { return this.page.getByPlaceholder('Enter description'); }

  /** List controls exist twice (desktop and a hidden mobile sheet), so always take the visible one. */
  control(label: string): Locator {
    return this.main.getByText(label, { exact: true }).locator('visible=true').first();
  }

  rows(): Locator { return this.table.getByRole('row').filter({ has: this.page.getByRole('checkbox') }).filter({ hasNot: this.page.locator('th') }); }
  dataRows(): Locator { return this.table.locator('tbody').getByRole('row'); }
  headerCheckbox(): Locator { return this.table.locator('thead').getByRole('checkbox'); }
  actionBar(name: string): Locator { return this.main.getByRole('button', { name, exact: true }); }

  async search(id: string) {
    await this.main.getByPlaceholder('Search By ID').fill(id);
    await this.page.waitForTimeout(2500);
  }

  async ids(): Promise<string[]> {
    const t = await this.dataRows().locator('td').nth(0).allInnerTexts().catch(() => []);
    void t;
    const texts = await this.dataRows().allInnerTexts();
    return texts.map((r) => r.trim().split(/\s+/)[0]);
  }

  /** Pick an existing option: type only to search, then click the listed option. */
  async pick(box: Locator, query: string, option: string | RegExp = query) {
    await box.click();
    await box.fill(query);
    await this.page.waitForTimeout(1500);
    await this.page.getByRole('option', { name: option, exact: typeof option === 'string' }).first().click({ timeout: 60_000 });
  }

  /** Option labels offered right after opening a dropdown (first page), without choosing one. */
  async options(box: Locator, query = ''): Promise<string[]> {
    await box.click();
    if (query) await box.fill(query);
    await this.page.getByRole('option').first().waitFor({ timeout: 30_000 }).catch(() => {});
    await this.page.waitForTimeout(1500);
    const texts = await this.page.getByRole('option').allInnerTexts();
    await this.page.keyboard.press('Escape');
    return texts.map((t) => t.trim()).filter(Boolean);
  }

  async addItem() {
    await this.main.getByText('Add Item', { exact: true }).locator('visible=true').first().click();
  }

  row(n: number) {
    const r = this.main.locator('tbody tr').nth(n);
    return {
      row: r,
      item: r.getByPlaceholder('Select Item'),
      qty: r.getByPlaceholder('0', { exact: true }),
      description: r.getByPlaceholder('Description', { exact: true }),
      select: r.locator('.pb-checkbox').first(),
    };
  }

  async typeInto(box: Locator, value: string) {
    await box.click();
    await box.fill('');
    await box.pressSequentially(value, { delay: 25 });
  }

  /** Parent item, one bundle line and Save. */
  async fill(opts: { parent: string; item?: string; itemLabel?: string; qty?: string; description?: string }) {
    await this.pick(this.parent, opts.parent);
    if (opts.description) await this.typeInto(this.description, opts.description);
    if (opts.item) {
      await this.addItem();
      await this.pick(this.row(0).item, opts.item, opts.itemLabel ?? opts.item);
      if (opts.qty) await this.typeInto(this.row(0).qty, opts.qty);
    }
  }
}
