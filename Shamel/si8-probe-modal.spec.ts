import { test } from '@playwright/test';
import { openNew, save, main, press, wait } from './helpers/si-ui';
import * as fs from 'fs';
test.use({ viewport: { width: 1500, height: 2000 }, actionTimeout: 15_000 });
test('modal buttons', async ({ page }) => {
  await openNew(page); await save(page, 5000);
  const info = await page.evaluate(() => [...document.querySelectorAll('.modal.show')].map((m: any) => ({ html: m.innerHTML.replace(/\s+/g, ' ').slice(0, 1500), buttons: [...m.querySelectorAll('button')].map((b: any) => (b.innerText || b.title || b.getAttribute('aria-label') || '') + '|' + b.className) })));
  fs.writeFileSync('Shamel/si8-probe-modal.out.txt', JSON.stringify(info, null, 1));
});
