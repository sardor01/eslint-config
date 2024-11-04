import type { Linter } from 'eslint';

import { pluginComments } from '../plugins';

export const comments: Linter.Config[] = [
  {
    name: 'sarast/comments',
    plugins: {
      'eslint-comments': pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    },
  },
];
