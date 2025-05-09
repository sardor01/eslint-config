import { configCommand } from '../plugins';
import type { Config } from '../types';

export const command = (): Config[] => [
  {
    ...configCommand(),
    name: 'sarast/command',
  },
];
