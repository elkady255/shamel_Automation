import { test } from '@playwright/test';
import { api } from './helpers/api';
test('count', async () => {
  const a = await api.list('Address', [['address_title', 'like', 'PW AD %']], ['name'], 300);
  const q = await api.list('Address', [['address_title', 'in', ['q', 'T'.repeat(101)]]], ['name'], 10);
  console.log('COUNT PW AD', a.length, 'extra', q.length);
});
