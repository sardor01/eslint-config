import type { Linter } from 'eslint';
import { FlatConfigComposer, type Arrayable, type Awaitable } from 'eslint-flat-config-utils';

import {
  betterTailwindcss,
  command,
  comments,
  deMorgan,
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
import { hasTailwindCss, hasVue } from './env';
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
  ...deMorgan(),
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
export const presetAll = (): Config[] => [
  ...presetBasic(),
  ...presetLangsExtensions(),
  ...vue(),
  ...betterTailwindcss(),
  ...prettier(),
  ...command(),
  ...specialCases(),
];

/// keep-sorted
export interface Options {
  /** Tailwind CSS support. Auto-enable if detected. */
  betterTailwindcss?: boolean;
  /** @default true */
  command?: boolean;
  /** markdown support. @default true */
  markdown?: boolean;
  /** Prettier support. @default true */
  prettier?: boolean;
  /** Vue support. Auto-enable if detected. */
  vue?: boolean;
}

/** `sarast`'s preset. */
export const sarast = (
  options: Options = {},
  ...userConfigs: Awaitable<Arrayable<Config> | FlatConfigComposer<Config, ConfigNames> | Linter.Config[]>[]
): FlatConfigComposer<Config, ConfigNames> => {
  const {
    betterTailwindcss: enableBetterTailwindcss = hasTailwindCss(),
    command: enableCommand = true,
    markdown: enableMarkdown = true,
    prettier: enablePrettier = true,
    vue: enableVue = hasVue(),
  } = options;

  const configs: Awaitable<Config[]>[] = [presetBasic(), yml(), presetJsonc()];
  if (enableVue) {
    configs.push(vue());
  }
  if (enableBetterTailwindcss) {
    configs.push(betterTailwindcss());
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

  const composer = new FlatConfigComposer<Config, ConfigNames>(...configs, ...(userConfigs as any));
  return composer;
};
