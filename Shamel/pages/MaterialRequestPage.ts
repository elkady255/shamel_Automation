import { type Page, type Locator, expect } from '@playwright/test';

const LOAD = { timeout: 120_000 };

/** Inventory › Material Request list, form and details (SRS "Inventory Transactions" UC1-UC4). */
export class MaterialRequestPage {
  readonly main: Locator;
  readonly table: Locator;
  readonly items: Locator;
  readonly saveButton: Locator;

  constructor(private readonly page: Page) {
    this.main = page.getByRole('main');
    this.table = this.main.getByRole('table');
    this.items = this.main.locator('xpath=//h3[normalize-space(.)="Items Record"]/../..');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true }).last();
  }

  /** The app ignores hash-only URL changes, so always load from scratch. */
  private async open(hash: string) {
    await this.page.goto('about:blank');
    await this.page.goto(`/desk/shamel#/inventory/${hash}`, LOAD);
  }

  async gotoList() {
    await this.open('material-request');
    await this.table.waitFor(LOAD);
  }

  async gotoNew() {
    await this.open('material-request/new');
    await this.combo('Select Purpose').waitFor(LOAD);
  }

  async gotoDetails(name: string) {
    await this.open(`material-request/${encodeURIComponent(name)}`);
    await this.main.getByRole('heading', { name: 'Material Request Details' }).waitFor(LOAD);
    await this.combo('Select Purpose').waitFor(LOAD);
  }

  tab(name: 'Details' | 'Additional Information' | 'Connections'): Locator {
    return this.main.getByRole('button', { name, exact: true });
  }

  combo(name: string): Locator {
    return this.page.getByRole('combobox', { name }).first();
  }

  /**
   * Choose an existing value from a dropdown WITHOUT typing: typing counts as entering a new value and leaves
   * the field invalid (Save stays disabled). Open the list, scroll until the option is found, click it.
   * With nth, picks the nth matching option (several warehouses share the label "Stores").
   */
  async choose(box: Locator, option: string | RegExp, nth = 0) {
    await box.click();
    const listbox = this.page.getByRole('listbox').last();
    await this.page.getByRole('option').first().waitFor({ timeout: 60_000 });
    const target = this.page.getByRole('option', { name: option, exact: typeof option === 'string' });
    for (let i = 0; i < 40 && (await target.count()) <= nth; i++) {
      const before = await this.page.getByRole('option').count();
      await this.page.getByRole('option').last().scrollIntoViewIfNeeded();
      await listbox.evaluate((el) => el.scrollBy(0, el.scrollHeight)).catch(() => {});
      await this.page.waitForTimeout(500);
      if ((await target.count()) > nth) break;
      if ((await this.page.getByRole('option').count()) === before && i > 2) break; // nothing more loads
    }
    await target.nth(nth).click({ timeout: 30_000 });
  }

  /**
   * Search by the record's real name (e.g. "Stores - E") so only that record is listed, then click the listed option.
   * Needed because many records share a label (57 warehouses are labelled "Stores") and lists only show 20 entries.
   * Still chooses from the list: the typed text is only a search, never the value.
   */
  async search(box: Locator, query: string, option?: string | RegExp) {
    await box.click();
    await box.fill(query);
    await this.page.waitForTimeout(1500); // the list is filtered on the server
    const opts = this.page.getByRole('option');
    const target = option ? this.page.getByRole('option', { name: option, exact: typeof option === 'string' }) : opts;
    await target.first().click({ timeout: 60_000 });
  }

  /** All option labels a dropdown offers (scrolling to load more), without choosing one. */
  async options(box: Locator): Promise<string[]> {
    await box.click();
    await this.page.getByRole('option').first().waitFor({ timeout: 60_000 }).catch(() => {});
    const listbox = this.page.getByRole('listbox').last();
    for (let i = 0; i < 40; i++) {
      const before = await this.page.getByRole('option').count();
      await this.page.getByRole('option').last().scrollIntoViewIfNeeded().catch(() => {});
      await listbox.evaluate((el) => el.scrollBy(0, el.scrollHeight)).catch(() => {});
      await this.page.waitForTimeout(500);
      if ((await this.page.getByRole('option').count()) === before) break;
    }
    const texts = await this.page.getByRole('option').allInnerTexts();
    await this.page.keyboard.press('Escape');
    return texts.map((t) => t.trim());
  }

  dateInputs(): Locator {
    return this.main.locator('input.flatpickr-input:not([type=hidden])');
  }

  /** Pick a date in a flatpickr calendar by clicking the day, like a user. */
  async pickDate(input: Locator, iso: string) {
    await input.click();
    const cal = this.page.locator('.flatpickr-calendar.open');
    await cal.waitFor();
    await input.evaluate((el, d) => {
      const host = el.closest('.date-picker') ?? el.parentElement;
      const fp = (el as unknown as { _flatpickr?: { jumpToDate(d: string): void } })._flatpickr
        ?? (host?.querySelector('.flatpickr-input') as unknown as { _flatpickr?: { jumpToDate(d: string): void } })?._flatpickr;
      fp?.jumpToDate(d);
    }, iso);
    const label = new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const day = cal.locator(`.flatpickr-day[aria-label="${label}"]`).first();
    if (await day.evaluate((d) => d.classList.contains('flatpickr-disabled'))) return 'disabled';
    await day.click();
    return 'picked';
  }

  setWarehouseLabel(): Promise<string[]> {
    return this.main.innerText().then((t) => t.match(/Set (Source |Target |From )?Warehouse/g) ?? []);
  }

  row(n = 0) {
    return {
      itemCode: this.items.getByPlaceholder('Item Code', { exact: true }).nth(n),
      date: this.items.locator('input.flatpickr-input:not([type=hidden])').nth(n),
      qty: this.items.locator('input[type=number]').nth(n),
      warehouse: this.items.getByPlaceholder('Warehouse', { exact: true }).nth(n),
      uom: this.items.getByPlaceholder('Unit', { exact: true }).nth(n),
    };
  }

  async addItemRow() {
    await this.items.getByText('Add Item', { exact: true }).click();
  }

  /** Header fields needed for a Purchase request. */
  async fillHeader(opts: { purpose: string; requestDate: string; requiredBy: string; priceList?: string }) {
    await this.choose(this.combo('Select Series'), 'MAT-MR-.YYYY.-');
    await this.pickDate(this.dateInputs().nth(0), opts.requestDate);
    await this.choose(this.combo('Select Purpose'), opts.purpose);
    if (opts.priceList) await this.choose(this.combo('Select Price List'), opts.priceList);
    await this.pickDate(this.dateInputs().nth(1), opts.requiredBy);
  }

  /** Item/warehouse/UOM are chosen from their lists; quantity and dates are the only typed/picked values. */
  async fillRow(n: number, opts: { item: string; qty: string; requiredBy?: string; warehouse?: string; uom?: string }) {
    const r = this.row(n);
    await this.search(r.itemCode, opts.item);
    if (opts.requiredBy && !(await r.date.inputValue())) await this.pickDate(r.date, opts.requiredBy);
    await r.qty.click();
    await r.qty.fill('');
    await r.qty.pressSequentially(opts.qty, { delay: 40 });
    if (opts.warehouse) await this.search(r.warehouse, opts.warehouse);
    if (opts.uom) await this.search(r.uom, opts.uom, opts.uom);
  }

  /** Status and % Ordered are read-only text boxes (not inputs) on the "Additional Information" tab. */
  async expectStatus(status: string, perOrdered?: string) {
    await this.tab('Additional Information').click();
    const pattern = perOrdered === undefined ? `Status\\s*${status}\\s*% Ordered` : `Status\\s*${status}\\s*% Ordered\\s*${perOrdered}(?!\\d)`;
    await expect(this.main).toContainText(new RegExp(pattern), LOAD);
  }
}
