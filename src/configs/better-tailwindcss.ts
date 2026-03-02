import { pluginBetterTailwindcss } from '../plugins';
import type { Config } from '../types';

export const betterTailwindcss = (): Config[] => [
  {
    ...pluginBetterTailwindcss.configs['recommended-error'],
    name: 'sarast/better-tailwindcss',
    rules: {
      ...pluginBetterTailwindcss.configs['recommended-error'].rules,
      // Conflicts with Prettier's line wrapping, causing circular fixes
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      // Conflicts with Prettier's whitespace handling
      'better-tailwindcss/no-unnecessary-whitespace': 'off',
    },
  },
];
