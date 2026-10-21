import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('signed-in user opens the Delivery Note list', { session: 'admin' }, async ({ app, browser }) => {
  await app.open('/app/delivery-note');
  await expect(browser).toHaveURL(/delivery-note/);
});

test('the agent reads the list', { session: 'admin' }, async ({ app, agent }) => {
  await app.open('/app/delivery-note');
  await agent.assert('the Delivery Note list page is shown');
});
