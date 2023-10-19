module.exports = {
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:vitest/recommended',
    'turbo',
  ],

  plugins: ['import', 'simple-import-sort'],

  env: {
    node: true,
    browser: true,
  },

  parserOptions: {
    ecmaVersion: 15,
    sourceType: 'module',
  },

  rules: {
    'no-restricted-imports': [
      'error',
      {
        name: 'moment',
        message: 'Moment.js is no longer maintained.',
      },
      {
        name: 'lodash',
        message: 'Do not use lodash :)',
      },
    ],
    'import/export': 'error',
    'import/no-absolute-path': 'error',
    'import/no-empty-named-blocks': 'warn',
    'import/no-mutable-exports': 'warn',
    'import/no-amd': 'error',
    'import/no-commonjs': 'warn',
    'import/no-dynamic-require': 'warn',
    'import/no-useless-path-segments': 'warn',
    'import/no-webpack-loader-syntax': 'error',
    'import/first': 'error',
    'import/no-cycle': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-default-export': 'error',
    'import/no-anonymous-default-export': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'],
          ['^node:'],
          ['^react', '^@?\\w'],
          ['^(@|~)?'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$'],
          ['^(@|~)?\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
  },

  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    {
      files: ['.eslintrc.cjs'],
      rules: {
        'import/no-commonjs': 'off',
      },
    },
    {
      files: ['vite.config.ts', 'tailwind.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],

  settings: {
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.d.ts'],
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.ts'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
      },
    },
  },
}
