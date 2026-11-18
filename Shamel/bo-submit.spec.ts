import { test } from '@playwright/test';
import { get, method } from './helpers/qt-api';
test('submit 33', async () => { const r = await method('frappe.client.submit', { doc: await get('Blanket Order', 'MFG-BLR-2026-00033') }); console.log('SUBMIT ' + r.ok + ' ' + r.msg.slice(0,100)); });
