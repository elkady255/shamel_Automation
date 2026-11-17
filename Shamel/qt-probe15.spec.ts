import { test } from '@playwright/test';
import { api } from './helpers/api';
import * as fs from 'fs';

test.describe.configure({ timeout: 100_000 });
const OUT = 'C:/Playwright_Automation/Shamel/qt-probe15.out.txt';
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

test('item price side effects', async () => {
  fs.writeFileSync(OUT, '');
  for (const code of ['111', '2121', 'IND182210']) {
    const r = await api.list('Item Price', [['item_code', '=', code]], ['name', 'price_list', 'price_list_rate', 'creation', 'valid_from', 'uom'], 10);
    log(code + ' ' + JSON.stringify(r));
  }
  const recent = await api.list('Item Price', [['creation', '>', '2026-11-17 00:00:00']], ['name', 'item_code', 'price_list', 'price_list_rate', 'creation'], 20);
  log('ITEM PRICES CREATED TODAY ' + JSON.stringify(recent));
  const qts = await api.list('Quotation', [['title', 'like', 'PW QT%']], ['name', 'title', 'docstatus', 'creation'], 100);
  log('PW QT COUNT ' + qts.length + ' ' + JSON.stringify(qts.map((q) => q.name + ':' + q.title)));
});
