import pluginQuery from '@tanstack/eslint-plugin-query';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  perfectionist.configs['recommended-alphabetical'],
  eslintPluginUnicorn.configs.recommended,
  sonarjs.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  {
    ignores: ['node_modules', 'dist', 'storybook-static', '.next', 'public'],
    rules: {
      '@tanstack/query/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      curly: ['error', 'all'],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          internalPattern: ['^@/'],
          newlinesBetween: 1,
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-exports': ['error', { type: 'natural' }],
      'perfectionist/sort-named-imports': ['error', { type: 'natural' }],

      'perfectionist/sort-objects': ['warn', { type: 'natural' }],
      'react/destructuring-assignment': [
        'error',
        'always',
        {
          destructureInSignature: 'always',
          ignoreClassFields: true,
        },
      ],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function'],
          unnamedComponents: ['arrow-function'],
        },
      ],
      'react/prop-types': 'off',

      'react/react-in-jsx-scope': 'off',
      'sonarjs/no-commented-code': 'off',

      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/todo-tag': 'warn',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-abusive-eslint-disable': 'warn',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-useless-promise-resolve-reject': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  // Prettier integration - запускает Prettier как правило ESLint
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  // Отключает конфликтующие правила ESLint - должен быть последним!
  prettierConfig,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
