import type { Linter } from 'eslint';
import { configs } from 'eslint-plugin-regexp';

export const regexp: Linter.Config[] = [
  {
    ...(configs['flat/recommended'] as Linter.Config),
    name: 'sarast/regexp',
  },
];
