import { test } from '@playwright/test';
import { api } from './helpers/api';
test('recent lcv', async () => { console.log('LCVS:', JSON.stringify(await api.list('Landed Cost Voucher', [], ['name', 'docstatus', 'total_taxes_and_charges', 'creation'], 10))); });
