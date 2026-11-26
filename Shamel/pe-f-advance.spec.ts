// Payment Entry - company option "book advance payments in separate party account" (SRS p.332, 367).
// CHANGES a company setting for the duration of the test and restores the original values afterwards.
import { test, type Page } from '@playwright/test';
import fs from 'fs';
import * as u from './helpers/pe-ui';
import * as f from './helpers/pe-flow';
import * as d from './helpers/pe-data';
import { api, type Doc } from './helpers/api';
import { recorder } from './helpers/si-ui';

const rec = recorder('pe-f-advance');
test.use({ viewport: { width: 1500, height: 1700 }, actionTimeout: 20_000 });
test.setTimeout(400_000);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const KEYS = ['book_advance_payments_in_separate_party_account', 'reconcile_on_advance_payment_date', 'default_advance_received_account', 'default_advance_paid_account'];
const BACKUP = 'Shamel/pe-results/company-backup.json';
const setCompany = (values: Doc) => api.call('frappe.client.set_value', { doctype: 'Company', name: d.CO, fieldname: values });
const readCompany = async () => { const c = await api.get('Company', d.CO); return Object.fromEntries(KEYS.map((k) => [k, c[k] ?? ''])) as Doc; };

test.afterAll(async () => {
  if (!fs.existsSync(BACKUP)) return;
  const original = JSON.parse(fs.readFileSync(BACKUP, 'utf8')) as Doc;
  await setCompany(original);
  const now = await readCompany();
  console.log('RESTORED', JSON.stringify(now), 'ORIGINAL', JSON.stringify(original));
  if (KEYS.every((k) => String(now[k]) === String(original[k]))) fs.renameSync(BACKUP, BACKUP.replace('.json', '-restored.json'));
  else throw new Error('company settings were NOT restored');
});

const toggleState = (p: Page, text: string) => u.main(p).locator('.toggle-row').filter({ hasText: text }).first().locator('input[type=checkbox]').evaluate((c: any) => ({ on: c.checked, ro: c.disabled })); // eslint-disable-line @typescript-eslint/no-explicit-any

test('F01 advance payments booked in a separate party account', async ({ page }) => {
  const parent = (await api.get('Account', '1210 - العملاء - E')).parent_account;
  const adv = (await api.ensure('Account', [['name', '=', 'QA-PE Adv Received - E']], { account_name: 'QA-PE Adv Received', company: d.CO, parent_account: parent, account_type: 'Receivable', account_currency: 'SAR' })).name;
  if (!fs.existsSync(BACKUP)) fs.writeFileSync(BACKUP, JSON.stringify(await readCompany()));
  console.log('ORIGINAL', fs.readFileSync(BACKUP, 'utf8'));
  await setCompany({ book_advance_payments_in_separate_party_account: 1, reconcile_on_advance_payment_date: 1, default_advance_received_account: adv });
  await f.fill(page, { type: 'receive', mop: 'Cash', party: d.CUST, paidTo: '122102', paid: '35' });
  for (const [id, text] of [['F01-1', 'حجز الدفعات المقدمة في حساب منفصل للطرف'], ['F01-2', 'التسوية بتاريخ الدفعة المقدمة']]) {
    const s = await toggleState(page, text);
    rec.check(id, `"${text}" is checked from the company and is read only`, s.on && s.ro, JSON.stringify(s));
  }
  const s = await u.save(page); await u.closeModals(page);
  rec.check('F01-3', 'The draft saves while the option is on', /ACC-PAY/.test(s.name), `${s.msg} ${s.errors} ${s.body.slice(0, 300)}`);
  if (!/ACC-PAY/.test(s.name)) return;
  d.remember('F01', s.name);
  let doc = await api.get('Payment Entry', s.name);
  rec.check('F01-4', 'The party account is the separate advance account of the company', doc.paid_from === adv && doc.book_advance_payments_in_separate_party_account === 1, `${doc.paid_from} ${doc.book_advance_payments_in_separate_party_account} ${doc.reconcile_on_advance_payment_date}`);
  await u.open(page, `${u.LIST}/${s.name}`);
  await u.main(page).locator('button, a, [role=tab], li').filter({ hasText: /^\s*المعلومات الاضافية\s*$/ }).last().click(); await wait(3000);
  const labels = await u.labels(page);
  const opening = labels.find((l) => /افتتاحي/.test(l));
  rec.check('F01-5', 'More Info shows Is Opening', !!opening, labels.join(' | '));
  if (opening) { const o = await f.offered(page, opening); rec.check('F01-6', 'Is Opening offers exactly Yes and No', o.length === 2, o.join(' | ')); }
  await u.open(page, `${u.LIST}/${s.name}`); await f.submit(page); await u.closeModals(page);
  doc = await api.get('Payment Entry', s.name);
  const gl = await api.list('GL Entry', [['voucher_no', '=', s.name], ['is_cancelled', '=', 0]], ['account', 'debit', 'credit'], 10);
  rec.check('F01-7', 'Submit posts the advance to the separate advance account', doc.docstatus === 1 && gl.some((g) => g.account === adv && g.credit === 35), `${doc.docstatus} ${JSON.stringify(gl)}`);
});
