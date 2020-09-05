/*
 * @Author: objectivezt
 * @Date: 2019-09-05 17:33:17
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:33:17
 */
module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint'
  ].map(key => require.resolve(`eslint-config-${key}`)),
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'jest',
    'unicorn',
    'react-hooks',
    'react',
    'jsx-a11y',
    'import',
    'prettier'
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign']
  },
  rules: {
    // ===================== use same as fabric config ====================================
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/sort-comp': 1,
    'react/jsx-one-expression-per-line': 0,
    'generator-star-spacing': 0,
    'function-paren-newline': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^@/',
          '^globalUI/',
          '^mock/',
          '^@assets/',
          '^@common/',
          '^@components/',
          '^@containers/',
          '^@layouts/',
          '^@models/',
          '^@services/',
          '^@styles/',
          '^@utils/',
          '^@setting/'
        ]
      }
    ],
    'import/order': 'warn',
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: true,
        devDependencies: [
          '**/tests/**.{ts,js,jsx,tsx}',
          '**/_test_/**.{ts,js,jsx,tsx}',
          '/mock/**/**.{ts,js,jsx,tsx}',
          '**/**.test.{ts,js,jsx,tsx}',
          '**/_mock.{ts,js,jsx,tsx}',
          '**/example/**.{ts,js,jsx,tsx}',
          '**/examples/**.{ts,js,jsx,tsx}'
        ]
      }
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,

    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': [0, 'camel-case'],

    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',

    // Use function hoisting to improve code readability
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      { allowTypedFunctionExpressions: true }
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true }
    ],
    '@typescript-eslint/no-var-requires': 0,

    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/no-cycle': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks

    // issue https://github.com/facebook/react/issues/15204
    'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies

    // Conflict with prettier
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 1,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'eslint-comments/no-unlimited-disable': 1,
    'no-param-reassign': 1,
    'space-before-function-paren': 0,
    'import/extensions': 0,

    // ===================== before default config ====================================
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/no-throw-literal': 0,
    'array-callback-return': 0,
    'arrow-parens': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'no-else-return': 0,
    'no-extra-boolean-cast': 0,
    'no-useless-escape': 0,
    'no-plusplus': 0,
    'prettier/prettier': 2,
    'react/display-name': 0,
    'react/display-name': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-fragments': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-deprecated': 0,
    'react/sort-comp': 0,
    'react/static-property-placement': 0
  }
};
