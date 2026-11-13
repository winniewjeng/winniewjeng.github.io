import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', '.velite/**', 'public/static/**', 'next-env.d.ts']),
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      // Enforce the content gateway: only feature query modules may read Velite output.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '#velite',
              message: 'Import content through src/features/*/queries.ts instead.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/queries.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
]);
