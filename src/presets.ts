import type { Linter } from 'eslint';
import { FlatConfigComposer, type Arrayable, type Awaitable } from 'eslint-flat-config-utils';

import {
  command,
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  prettier,
  regexp,
  sortImports,
  sortPackageJson,
  sortTsconfig,
  specialCases,
  typescript,
  unicorn,
  vue,
  yml,
} from './configs';
import { hasVue } from './env';
import type { ConfigNames } from './typegen';
import type { Config } from './types';

/** Ignore common files and include javascript support */
export const presetJavaScript = (): Config[] => [
  ...ignores(),
  ...javascript(),
  ...comments(),
  ...imports(),
  ...unicorn(),
  ...node(),
  ...jsdoc(),
  ...regexp(),
];
/** Includes basic json(c) file support and sorting json keys */
export const presetJsonc = (): Config[] => [...jsonc(), ...sortPackageJson(), ...sortTsconfig()];
/** Includes markdown, yaml + `presetJsonc` support */
export const presetLangsExtensions = (): Config[] => [...markdown(), ...yml(), ...presetJsonc()];
/** Includes `presetJavaScript` and typescript support */
export const presetBasic = (): Config[] => [...presetJavaScript(), ...typescript(), ...sortImports()];
/**
 * Includes
 * - `presetBasic` (JS+TS) support
 * - `presetLangsExtensions` (markdown, yaml, jsonc) support
 * - Vue support
 * - Prettier support
 */
export const presetAll = (): Config[] => [...presetBasic(), ...presetLangsExtensions(), ...vue(), ...prettier()];

export interface Options {
  command?: boolean;
  /** markdown support. Default: true */
  markdown?: boolean;
  /** Prettier support. Default: true */
  prettier?: boolean;
  sortKeys?: boolean;
  /** Vue support. Auto-enable. */
  vue?: boolean;
}

/** `sarast`'s preset. */
export const sarast = (
  options: Options = {},
  ...userConfigs: Awaitable<Arrayable<Config> | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<Config, ConfigNames> => {
  const {
    command: enableCommand = true,
    markdown: enableMarkdown = true,
    prettier: enablePrettier = true,
    vue: enableVue = hasVue(),
  } = options;

  const configs: Awaitable<Config[]>[] = [presetBasic(), yml(), presetJsonc()];
  if (enableVue) {
    configs.push(vue());
  }
  if (enableMarkdown) {
    configs.push(markdown());
  }
  if (enablePrettier) {
    configs.push(prettier());
  }
  if (enableCommand) {
    configs.push(command());
  }
  configs.push(specialCases());

  return new FlatConfigComposer<Config, ConfigNames>(...configs, ...(userConfigs as any));
};
