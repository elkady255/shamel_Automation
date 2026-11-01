import { type Page, type Locator } from '@playwright/test';

const LOAD = { timeout: 120_000 };

/** Inventory › Quality Inspection (list, Add, Details), Inspection Parameters and Parameter Groups. */
export class QualityInspectionPage {
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
  async gotoList() { await this.open('quality-inspection'); await this.table.waitFor(LOAD); await this.page.waitForTimeout(1500); }
  async gotoNew() { await this.open('quality-inspection/new'); await this.main.getByText('Basic Information').first().waitFor(LOAD); await this.page.waitForTimeout(1500); }
  async gotoDetails(name: string) { await this.open(`quality-inspection/${encodeURIComponent(name)}`); await this.main.getByText('Quality Inspection Details').first().waitFor(LOAD); await this.page.waitForTimeout(2500); }
  async gotoParams() { await this.open('inspection-parameters'); await this.main.getByText('Add Inspection Parameter').first().waitFor(LOAD); await this.page.waitForTimeout(2000); }
  async gotoGroups() { await this.open('parameter-groups'); await this.main.getByText('Add Quality Inspection Parameter Group').first().waitFor(LOAD); await this.page.waitForTimeout(2000); }

  dataRows(): Locator { return this.table.locator('tbody').getByRole('row'); }
  actionBar(name: string): Locator { return this.main.getByRole('button', { name, exact: true }); }
  confirmDialog(): Locator { return this.page.locator('.shamel-confirm-dialog'); }
  editDialog(): Locator { return this.page.locator('.edit-modal-content'); }
  /** The Field combobox of the Edit popup, and the Value input below it. */
  editField(): Locator { return this.editDialog().getByPlaceholder('Select a field'); }
  editValue(): Locator { return this.editDialog().locator('.edit-field').nth(1).locator('input:visible, textarea:visible').first(); }
  async editFieldOptions(): Promise<string[]> {
    await this.editField().click(); await this.page.waitForTimeout(900);
    return (await this.page.getByRole('option').locator('visible=true').allInnerTexts()).map((t) => t.replace(/\s+/g, ' ').trim()).filter(Boolean);
  }
  /** Choose a field in the Edit popup and set its value (typed into a text input, or picked from a list). */
  async editSet(field: string, value: string) {
    await this.editField().click(); await this.page.waitForTimeout(600);
    await this.page.getByRole('option', { name: field, exact: true }).locator('visible=true').first().click(); await this.page.waitForTimeout(700);
    const v = this.editValue();
    await v.click(); await this.page.waitForTimeout(500);
    const opt = this.page.getByRole('option', { name: value, exact: true }).locator('visible=true').first();
    if (await opt.count()) await opt.click(); else await v.fill(value);
  }
  /** What kind of control the Value box turns into for the chosen field. */
  async editValueKind(): Promise<string> {
    const v = this.editValue();
    return v.evaluate((e: HTMLElement) => `${e.tagName.toLowerCase()}[type=${(e as HTMLInputElement).type}] placeholder="${(e as HTMLInputElement).placeholder}" role=${e.getAttribute('role') ?? ''}`);
  }
  /** A section header on the Add / Details form that has to be opened before its fields are visible. */
  async openSection(name: string) {
    const head = this.main.getByRole('button', { name, exact: true });
    if (await head.count()) await head.first().click(); else await this.main.getByText(name, { exact: true }).first().click();
    await this.page.waitForTimeout(800);
  }

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
  async rowText(id: string): Promise<string> {
    await this.search(id);
    return (await this.dataRows().filter({ hasText: id }).first().innerText()).replace(/\s+/g, ' ').trim();
  }
  async total(): Promise<number> {
    const m = (await this.main.innerText()).replace(/\s+/g, ' ').match(/From (\d+)/);
    return m ? Number(m[1]) : -1;
  }
  async bodyText(): Promise<string> { return (await this.page.locator('body').innerText()).replace(/\s+/g, ' '); }
}
