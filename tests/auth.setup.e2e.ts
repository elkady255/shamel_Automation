import { test } from '@e2e-dev/web';
import { expect, credentials } from 'e2e';

test.setup('authenticate as admin', { sessions: ['admin'] }, async ({ app, screen, session, browser }) => {
  const admin = credentials.user('admin');

  await app.open('/login');
  await screen.getByRole('textbox', 'Email or Mobile or Username').fill(admin.username);
  await screen.getByRole('textbox', 'Password').fill(admin.password);
  await screen.getByRole('button', 'Continue').tap();

  // The landing page is slow and redirects to /desk/... or /app/...
  await expect(browser).toHaveURL(/\/(desk|app)\//, { timeout: 60_000 });

  await session.save('admin');
});
