/*
 * @Author: objectivezt
 * @Date: 2019-09-05 17:33:17
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:33:17
 */
export default {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint'
  ].map(key => require.resolve(`eslint-config-${key}`)),
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
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
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign']
  },
  rules: {
    // ===================== use same as @umi/fabric config ====================================
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      { allowTypedFunctionExpressions: true }
    ],
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true }
    ],
    '@typescript-eslint/no-var-requires': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 1,
    'eslint-comments/no-unlimited-disable': 1,
    'function-paren-newline': 0,
    'generator-star-spacing': 0,
    'implicit-arrow-linebreak': 0,
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-default-export': [0, 'camel-case'],
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
    'import/order': 'warn',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'linebreak-style': 0,
    'no-param-reassign': 1,
    'no-prototype-builtins': 'off',
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/sort-comp': 1,
    'space-before-function-paren': 0,
    'unicorn/prevent-abbreviations': 'off',

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
    'react/static-property-placement': 0,

    //========================@scaffold/cli-service==============================
    'no-extra-boolean-cast': 0,
    'prettier/prettier': 2,
    'react/display-name': 0,
    'react/no-deprecated': 0,
    'react/prop-types': 0
  }
};
