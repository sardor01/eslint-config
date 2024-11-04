import type { Linter } from 'eslint';

import { pluginUnocss } from '../plugins';

export const unocss: Linter.Config[] = [
  {
    ...(pluginUnocss.configs.flat as any as Linter.Config),
    name: 'sarast/unocss',
  },
];
