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
import type { Config } from './types';

/** Ignore common files and include javascript support */
export const presetJavaScript: Config[] = [
  ...ignores,
  ...javascript,
  ...comments,
  ...imports,
  ...unicorn,
  ...node,
  ...jsdoc,
  ...regexp,
];
/** Includes basic json(c) file support and sorting json keys */
export const presetJsonc: Config[] = [...jsonc, ...sortPackageJson, ...sortTsconfig];
/** Includes markdown, yaml + `presetJsonc` support */
export const presetLangsExtensions: Config[] = [...markdown, ...yml, ...presetJsonc];
/** Includes `presetJavaScript` and typescript support */
export const presetBasic: Config[] = [...presetJavaScript, ...typescript, ...sortImports];
/**
 * Includes
 * - `presetBasic` (JS+TS) support
 * - `presetLangsExtensions` (markdown, yaml, jsonc) support
 * - Vue support
 * - Prettier support
 */
export const presetAll: Config[] = [...presetBasic, ...presetLangsExtensions, ...vue, ...prettier];
export { presetAll as all, presetBasic as basic };

/** `sarast`'s preset. */
export const sarast = (
  config: Config | Config[] = [],
  {
    command: enableCommand = true,
    markdown: enableMarkdown = true,
    prettier: enablePrettier = true,
    vue: enableVue = hasVue,
  }: Partial<{
    command: boolean;
    /** markdown support. Default: true */
    markdown: boolean;
    /** Prettier support. Default: true */
    prettier: boolean;
    sortKeys: boolean;
    /** Vue support. Auto-enable. */
    vue: boolean;
  }> = {},
): Config[] => {
  const configs: Config[] = [...presetBasic, ...yml, ...presetJsonc];
  if (enableVue) {
    configs.push(...vue);
  }
  if (enableMarkdown) {
    configs.push(...markdown);
  }
  if (enablePrettier) {
    configs.push(...prettier);
  }
  if (enableCommand) {
    configs.push(...command);
  }
  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]));
  }
  configs.push(...specialCases);
  return configs;
};
