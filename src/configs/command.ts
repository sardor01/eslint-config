import type { Linter } from 'eslint';

import { configCommand } from '../plugins';

export const command: Linter.Config[] = [
  {
    ...configCommand(),
    name: 'sarast/command',
  },
];
