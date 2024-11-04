import type { Linter } from 'eslint';

import { GLOB_EXCLUDE } from '../globs';
import { pluginIgnore } from '../plugins';

export const ignores: Linter.Config[] = [
  {
    ignores: GLOB_EXCLUDE,
    name: 'sarast/global-ignores',
  },
  {
    ...pluginIgnore({ strict: false }),
    name: 'sarast/gitignore',
  },
];
