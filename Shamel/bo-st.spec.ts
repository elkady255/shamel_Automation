import { test } from '@playwright/test';
import { api } from './helpers/api';
test('st', async () => { const r = await api.list('Blanket Order', [['name','in',['MFG-BLR-2026-00032','MFG-BLR-2026-00033','MFG-BLR-2026-00005','MFG-BLR-2026-00005-1']]], ['name','docstatus','modified'], 10); console.log('STATE ' + JSON.stringify(r)); });
