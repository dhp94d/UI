// packages/config/eslint-preset.js

/** @type {import("eslint").Linter.Config} */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: path.resolve(__dirname, '../../'), // 필요에 따라 경로 조정
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:import/errors',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'comma-dangle': 'off',
    'react/display-name': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'storybook/prefer-pascal-case': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  ignorePatterns: ['**/dist/**/*', '.eslintrc.js'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

export default config;
