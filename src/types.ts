import type { Linter } from 'eslint';

import type { Rules } from './typegen';

export type Config = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  plugins?: Record<string, any>;
};
