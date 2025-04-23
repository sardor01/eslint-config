import type { ESLint, Linter } from 'eslint';

import { GLOB_VUE } from '../globs';
import { parserVue, pluginVue, tseslint } from '../plugins';
import { typescriptCore } from './typescript';

const vueCustomRules: Linter.RulesRecord = {
  'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/eqeqeq': ['error', 'smart'],
  'vue/html-self-closing': [
    'error',
    {
      html: {
        component: 'always',
        normal: 'always',
        void: 'any',
      },
      math: 'always',
      svg: 'always',
    },
  ],
  'vue/max-attributes-per-line': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/no-constant-condition': 'warn',
  'vue/no-empty-pattern': 'error',
  'vue/no-loss-of-precision': 'error',
  'vue/no-unused-refs': 'error',
  'vue/no-useless-v-bind': 'error',
  'vue/no-v-html': 'off',
  'vue/object-shorthand': [
    'error',
    'always',
    {
      avoidQuotes: true,
      ignoreConstructors: false,
    },
  ],
  'vue/one-component-per-file': 'off',
  'vue/padding-line-between-blocks': ['error', 'always'],
  'vue/prefer-template': 'error',
  'vue/require-default-prop': 'off',
  'vue/require-prop-types': 'off',
  'vue/v-on-handler-style': ['error', 'inline-function'],
};

const vueRules: Linter.RulesRecord = {
  ...pluginVue.configs.base.rules,
  ...(pluginVue.configs['flat/essential'].map((c) => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}) as any),
  ...(pluginVue.configs['flat/strongly-recommended']
    .map((c) => c.rules)
    .reduce((acc, c) => ({ ...acc, ...c }), {}) as any),
  ...(pluginVue.configs['flat/recommended'].map((c) => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}) as any),
};

const vueTs: Linter.Config[] = typescriptCore
  .filter((config) => config.name !== 'typescript-eslint/base')
  .map((config) => {
    return {
      ...config,
      files: [GLOB_VUE],
      name: `sarast/vue/${config.name?.replace('sarast/', '') || 'anonymous'}`,
    };
  });

export const vue: Linter.Config[] = [
  ...vueTs,
  {
    files: [GLOB_VUE],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
    name: 'sarast/vue',
    plugins: {
      '@typescript-eslint': tseslint.plugin as ESLint.Plugin,
      vue: pluginVue,
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...vueRules,
      ...vueCustomRules,
    },
  },
];
