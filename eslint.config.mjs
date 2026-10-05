import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  { ignores: ['node_modules/', 'playwright-report/', 'test-results/', '.venv/'] },
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.spec.ts', '**/*.test.ts'],
  },
);
