// Run before a retest: new QA parties and unpaid invoices (the tests consume invoice balances).
import { test } from '@playwright/test';
import fs from 'fs';
import { FILE } from './helpers/pe-data';

test('start a new data set', () => {
  const old = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const run = new Date().toISOString().slice(5, 16).replace(/\D/g, '');
  fs.writeFileSync(FILE.replace('.json', `-before-${run}.json`), JSON.stringify(old, null, 1));
  const keep = ['shareholder', 'employee', 'whtAccount', 'twc'];
  fs.writeFileSync(FILE, JSON.stringify({ run, ...Object.fromEntries(keep.map((k) => [k, old[k]])) }, null, 1));
  console.log('NEW RUN', run);
});
