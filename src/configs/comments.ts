import type { Linter } from 'eslint';

import { configComments } from '../plugins';

export const comments: Linter.Config[] = [
  {
    ...configComments.recommended,
    name: 'sarast/comments',
    rules: {
      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    },
  },
];
