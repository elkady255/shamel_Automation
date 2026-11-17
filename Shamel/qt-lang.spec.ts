import { test } from '@playwright/test';
import { api } from './helpers/api';
test('lang', async () => {
  const u = await api.get('User', 'Administrator');
  console.log('LANG=' + u.language + ' modified=' + u.modified);
});
