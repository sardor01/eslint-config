module.exports = {
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', '@sarast/eslint-config-ts'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/react-in-jsx-scope': 'off',
  },
};
