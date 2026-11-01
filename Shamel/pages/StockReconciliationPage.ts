import { type Page, type Locator } from '@playwright/test';

const LOAD = { timeout: 120_000 };
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

/** Inventory › Stock Reconciliation: list, Add screen and Details. The dropdowns are plain lists (li) with an optional search box. */
export class StockReconciliationPage {
  readonly main: Locator;
  constructor(readonly page: Page) { this.main = page.getByRole('main'); }

  /** The app ignores hash-only URL changes, so always load from scratch. */
  private async open(hash: string) { await this.page.goto('about:blank'); await this.page.goto(`/desk/shamel#/inventory/${hash}`, LOAD); }
  async gotoList() { await this.open('stock-reconciliation'); await this.main.getByRole('table').waitFor(LOAD); await this.page.waitForTimeout(1500); }
  async gotoNew() { await this.open('stock-reconciliation/new'); await this.main.getByText('Basic Information').first().waitFor(LOAD); await this.page.waitForTimeout(2000); }
  async gotoDetails(name: string) { await this.open(`stock-reconciliation/${encodeURIComponent(name)}`); await this.main.getByText('Stock Reconciliation Details').first().waitFor(LOAD); await this.page.waitForTimeout(2500); }

  async text(): Promise<string> { return clean(await this.main.innerText()); }
  async bodyText(): Promise<string> { return clean(await this.page.locator('body').innerText()); }
  trigger(label: string): Locator { return this.main.getByText(label).locator('visible=true').first(); }
  items(): Locator { return this.main.locator('tbody tr'); }
  save(): Locator { return this.main.getByRole('button', { name: 'Save', exact: true }); }

  /** Open a dropdown and return the entries it offers. */
  async options(trigger: Locator, type?: string): Promise<string[]> {
    await trigger.click(); await this.page.waitForTimeout(800);
    if (type) { await this.page.keyboard.type(type, { delay: 40 }); await this.page.waitForTimeout(1500); }
    return (await this.page.locator('li:visible').allInnerTexts()).map(clean);
  }
  /** Choose an entry of a dropdown (search text optional). Warehouse lists need the text click, the others the li click. */
  async pick(trigger: Locator, match: RegExp, type?: string, viaText = false) {
    await this.options(trigger, type);
    if (viaText) await this.page.getByText(match).locator('visible=true').last().click({ timeout: 8000 });
    else await this.page.locator('li:visible').filter({ hasText: match }).first().click({ timeout: 8000, force: true });
    await this.page.waitForTimeout(700);
  }
  async close() { await this.page.keyboard.press('Escape'); await this.page.waitForTimeout(500); }

  /** Fill the header with valid data (the test company, purpose, default warehouse, accounts). */
  async fillHeader(opts: { purpose?: RegExp; warehouse?: string } = {}) {
    await this.pick(this.trigger('Select Series'), /MAT-RECO/);
    await this.pick(this.trigger('Select Company'), /Ahmed Ebrahim/);
    await this.pick(this.trigger('Select Purpose'), opts.purpose ?? /^Stock Reconciliation$/);
    if (opts.warehouse !== null) await this.pick(this.trigger('Select Warehouse'), new RegExp(opts.warehouse ?? 'Stores - E'), opts.warehouse ?? 'Stores - E', true);
  }
  async fillAccounts() {
    await this.pick(this.trigger('Select Expense Account'), /5317.*- E$/, '5317');
    await this.pick(this.trigger('Select Cost Center'), /101 - Main X - E/, '101 - Main');
  }
  /** Add one item row and choose the item by search text; the grid cell shows the item column dropdown. */
  async addRow(item?: string) {
    await this.main.getByRole('button', { name: 'Add Item', exact: true }).click(); await this.page.waitForTimeout(1200);
    if (item) await this.pick(this.main.getByText('Item Code').locator('visible=true').last(), new RegExp(item), item.replace(/\|.*$/, ''));
  }
  qtyInput(row = 0): Locator { return this.items().nth(row).getByPlaceholder('0', { exact: true }).first(); }
  rateInput(row = 0): Locator { return this.items().nth(row).getByPlaceholder('0', { exact: true }).last(); }
  async openEditRow(row = 0) { await this.items().nth(row).locator('[title="Edit"], button[title*="Edit"]').first().click(); await this.page.waitForTimeout(1500); }
}
