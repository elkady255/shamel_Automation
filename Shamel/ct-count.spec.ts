import { test } from '@playwright/test';
import { api } from './helpers/api';
test('count', async () => {
  const a = await api.list('Contact', [['first_name', 'like', 'PW CT %']], ['name'], 500);
  const b = await api.list('Contact', [['first_name', 'in', ['q', 'F'.repeat(101), '']]], ['name'], 20);
  const c = await api.list('Contact', [['name', '=', '-1']], ['name'], 5);
  console.log('COUNT PWCT', a.length, 'extra', b.length, c.length);
});
