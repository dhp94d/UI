// eslint.config.js
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import presetConfig from './packages/config/eslint-preset.js'; // 확장자 명시

// CommonJS 변수 흉내내기 -- CommonJS를 사용 중이라면 필요 없음
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('standard-with-typescript'),
  ...tseslint.configs.recommended,
  ...presetConfig,
];
