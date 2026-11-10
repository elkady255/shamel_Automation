import { test, expect, type Locator, type Page } from '@playwright/test';
import { api } from './helpers/api';
import { invoice, reload } from './helpers/si-data';

/**
 * Sales Invoice, the parts not covered by the other specs: Hold / Close / Re-open (TC-SID), Delete on the Details screen,
 * field limits (TC-SIM, TC-SIT, TC-SIG), Get Items From menu (TC-SIF). UI labels are English.
 */
const srs = (description: string) => ({ annotation: { type: 'SRS', description } });
const observe = (text: string) => test.info().annotations.push({ type: 'observed', description: text });
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();
test.describe.configure({ timeout: 170_000 });
test.use({ viewport: { width: 1400, height: 1000 } });

const LOAD = { timeout: 100_000 };
const main = (page: Page) => page.getByRole('main');
const press = (button: Locator) => button.evaluate((e) => (e as HTMLElement).click());

async function open(page: Page, hash: string) {
  await page.goto('about:blank');
  await page.goto(`/desk/shamel#/selling/sales-invoices${hash}`, LOAD);
  await page.waitForTimeout(6000);
}
const tab = async (page: Page, name: string) => { await press(main(page).getByRole('button', { name, exact: true })); await page.waitForTimeout(1500); };
async function expandAll(page: Page) {
  const closed = main(page).locator('button.dn-accordion-toggle[aria-expanded="false"]');
  for (let i = (await closed.count()) - 1; i >= 0; i--) await press(closed.nth(i)).catch(() => undefined);
  await page.waitForTimeout(1500);
}
/** The input (of the given selector) whose label text starts with the given text. */
async function field(page: Page, selector: string, label: string): Promise<Locator> {
  const all = main(page).locator(selector);
  const labels = await all.evaluateAll((els) => els.map((e) => ((e.closest('label,div') as HTMLElement | null)?.innerText ?? '').replace(/\s+/g, ' ').trim()));
  const i = labels.findIndex((l) => l.startsWith(label));
  expect(i, `${label} found among: ${labels.join(' | ')}`).toBeGreaterThanOrEqual(0);
  return all.nth(i);
}
const buttons = async (page: Page) => (await main(page).getByRole('button').allInnerTexts()).map(clean).filter(Boolean);

test('TC-SID-040 a submitted invoice has Hold and Close actions', srs('Details: Hold / Resume / Close / Re-open'), async ({ page }) => {
  // Known issue found on this server: none of the Hold / Resume / Close / Re-open buttons exists on the Details screen.
  test.fail(true, 'Known issue: Hold and Close buttons are missing from the Details screen');
  const si = await invoice('Submitted');
  await open(page, `/${encodeURIComponent(si.name)}`);
  const b = await buttons(page);
  observe('buttons: ' + b.join(' | '));
  expect(b.some((t) => /^Hold/.test(t)), 'Hold').toBe(true);
  expect(b.some((t) => /^Close/.test(t)), 'Close').toBe(true);
});

test('TC-SIM-012 Customer Purchase Order stops at 100 characters', srs('More Info - Customer Purchase Order max 100'), async ({ page }) => {
  await open(page, '/new');
  await tab(page, 'More Information');
  await expandAll(page);
  const po = await field(page, 'input[type=text]', 'Customer Purchase Order');
  await po.fill('P'.repeat(105));
  expect((await po.inputValue()).length).toBe(100);
});

test('TC-SIM-013 Customer Purchase Order of 1 character shows a minimum length message', srs('More Info - Customer Purchase Order min 2'), async ({ page }) => {
  await open(page, '/new');
  await tab(page, 'More Information');
  await expandAll(page);
  const po = await field(page, 'input[type=text]', 'Customer Purchase Order');
  await po.fill('P');
  await po.blur();
  await press(main(page).getByRole('button', { name: 'Save', exact: true }));
  await page.waitForTimeout(1500);
  const text = clean(await main(page).innerText());
  const message = text.match(/\b(minimum|at least)\b[^.|]{0,60}|\b2 characters/i)?.[0];
  observe('message near the field after typing 1 character: ' + (message ?? 'none shown'));
  expect.soft(message, 'a minimum length message').toBeTruthy();
});

const failure = (p: Promise<unknown>) => p.then(() => '', (e) => String(e).replace(/\s+/g, ' '));

test('TC-SIT-034 Additional Discount Percentage above 100 is refused', srs('Additional Discount Percentage'), async () => {
  const draft = await invoice('Draft');
  const err = await failure(api.call('frappe.client.set_value', { doctype: 'Sales Invoice', name: draft.name, fieldname: 'additional_discount_percentage', value: 150 }));
  const saved = await reload(draft.name);
  observe(err ? 'discount 150 rejected: ' + err.slice(0, 200) : `discount 150 accepted: discount amount ${saved.discount_amount}, grand total ${saved.grand_total}`);
  expect(err, 'discount above 100 must be rejected').not.toBe('');
});

test('TC-SIG-036 a negative Write Off Amount is refused', srs('Write Off Amount'), async () => {
  test.fail(true, 'Known issue: the server accepts a negative write off amount');
  const draft = await invoice('Draft');
  const err = await failure(api.call('frappe.client.set_value', { doctype: 'Sales Invoice', name: draft.name, fieldname: 'write_off_amount', value: -5 }));
  const saved = await reload(draft.name);
  observe(err ? 'write off -5 rejected: ' + err.slice(0, 200) : `write off -5 accepted: outstanding ${saved.outstanding_amount}, grand total ${saved.grand_total}`);
  expect(err, 'a negative write off must be rejected').not.toBe('');
});

test('TC-SIF-003 the Get Items From menu shows Sales Order, Quotation and Delivery Note', srs('Get Items From'), async ({ page }) => {
  // Known issue found on this server: clicking Get Items From renders the three options but the menu stays hidden (display: none).
  test.fail(true, 'Known issue: the Get Items From menu never becomes visible');
  await open(page, '/new');
  await page.getByRole('main').getByRole('button', { name: /^Get Items From/ }).click();
  await page.waitForTimeout(1500);
  const shown = await page.locator('button.cd-action-item').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().width > 0).map((e) => (e as HTMLElement).innerText.trim()));
  observe('visible options after the click: ' + (shown.join(', ') || 'none'));
  expect(shown).toEqual(expect.arrayContaining(['Sales Order', 'Quotation', 'Delivery Note']));
});