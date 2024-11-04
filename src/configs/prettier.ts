import type { Linter } from 'eslint';

import { configPrettier, pluginPrettier } from '../plugins';

const prettierConflictRules = { ...configPrettier.rules };
delete prettierConflictRules['vue/html-self-closing'];

export const prettier: Linter.Config[] = [
  {
    name: 'sarast/prettier',
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...prettierConflictRules,
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'warn',
    },
  },
];
