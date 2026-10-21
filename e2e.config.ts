import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';
import { anthropic } from '@ai-sdk/anthropic';

// e2e loads no .env file itself, so load the project's one (ANTHROPIC_API_KEY, BASE_URL, APP_USERNAME, APP_PASSWORD)
try {
  process.loadEnvFile('.env');
} catch {
  // no .env: rely on variables already exported in the shell
}

export default {
  agents: {
    default: {
      model: anthropic('claude-sonnet-5-5'),
      system: 'You are a thorough QA agent testing an ERPNext/Frappe-based inventory app (Shamel). Verify every outcome.',
    },
  },
  credentials: {
    admin: {
      username: process.env.APP_USERNAME ?? '',
      password: process.env.APP_PASSWORD ?? '',
    },
  },
  targets: [{
    engine: web(),
    app: { url: process.env.BASE_URL ?? 'https://test.hr.azzrk.com' },
  }],
} satisfies E2EConfig;
