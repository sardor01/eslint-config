import type { Linter } from 'eslint';

import { configPrettier, pluginPrettier, pluginPrettierRecommended } from '../plugins';

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
      ...pluginPrettierRecommended.rules,
      'prettier/prettier': 'warn',
    },
  },
];
