# @sarast/eslint-config [![npm](https://img.shields.io/npm/v/@sarast/eslint-config.svg)](https://npmjs.com/package/@sarast/eslint-config)

A opinionated ESLint config preset for JavaScript, TypeScript, Vue 2 or Vue 3,
and Prettier.

## Features

- Format with Prettier.
- Designed to work with TypeScript, Vue 2 and 3 out-of-box.
- Support JSON(5), YAML, Markdown...
- Sort imports, `package.json`, `tsconfig.json`...
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Ignores common files like `dist`, `node_modules`, `coverage`, and files in `.gitignore`.
- Reasonable defaults, best practices, only one-line of config
- Reasonable strict, but with better code quality.

## Install

```bash
npm i -D @sarast/eslint-config
```

Require Node.js >= 18.18, and ESLint >= 9.5.0.

## Usage

```js
import { sarast } from '@sarast/eslint-config';
export default sarast(
  [
    /* your custom config */
  ],
  // Features: it'll detect installed dependency and enable necessary features automatically
  {
    prettier: true,
    markdown: true,
    vue: true, // auto detection
    unocss: false, // auto detection
  },
);
```

### Presets

```js
// eslint.config.js
import {
  presetJavaScript, // Ignore common files and include javascript support
  presetJsonc, // Includes basic json(c) file support and sorting json keys
  presetLangsExtensions, // Includes markdown, yaml + `presetJsonc` support
  presetBasic, // Includes `presetJavaScript` and typescript support

  // Includes
  // - `presetBasic` (JS+TS) support
  // - `presetLangsExtensions` (markdown, yaml, jsonc) support
  // - Vue support
  // - Prettier support
  // - UnoCSS support (`uno.config.ts` is required)
  presetAll,
} from '@sarast/eslint-config';

export default presetAll;
```

See [preset.ts](./src/presets.ts) for more details.

## Comparing to [`@antfu/eslint-config`](https://github.com/antfu/eslint-config)

Most of the rules are the same, but there are some differences:

- Use [Prettier](https://prettier.io/) instead of [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic).
- Support both Vue 2 and Vue 3.
- More stricter rules.

## Credit

This eslint config is inspired by:

- [`@sxzz/eslint-config`](https://github.com/sxzz/eslint-config), created by [Kevin Deng 三咲智子](https://github.com/sxzz)
- [`@antfu/eslint-config`](https://github.com/antfu/eslint-config), created by [Anthony Fu](https://github.com/antfu)
- [Vite](https://github.com/vitejs/vite), created by [Evan You](https://github.com/yyx990803) and Vite community

## License

[MIT](./LICENSE) License © 2024-PRESENT [Sardor Astanov](https://github.com/sardor01)
