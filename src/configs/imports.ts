import type { Linter } from 'eslint';

import { pluginAntfu, pluginImport } from '../plugins';

export const imports: Linter.Config[] = [
  {
    name: 'sarast/imports',
    plugins: {
      antfu: pluginAntfu,
      import: pluginImport as any,
    },
    rules: {
      'antfu/import-dedupe': 'error',
      'import/first': 'error',
      'import/no-default-export': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'no-restricted-imports': ['error', { patterns: ['..*'] }],
    },
  },
];
