/*
 * @Author: objectivezt
 * @Date: 2019-09-05 17:33:17
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:33:17
 */
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
  plugins: [
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
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 0,
    'eslint-comments/no-unlimited-disable': 1,
    'function-paren-newline': 0,
    'generator-star-spacing': 0,
    'global-require': 0,
    'implicit-arrow-linebreak': 0,
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-default-export': [0, 'camel-case'],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '^@/',
          '^@assets/*',
          '^@common/*',
          '^@components/*',
          '^@containers/*',
          '^@layouts/*',
          '^@models/*',
          '^@services/*',
          '^@styles/*',
          '^@utils/*',
          '^@setting/*'
        ]
      }
    ],
    'import/order': 1,
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'linebreak-style': 0,
    'no-param-reassign': 1,
    'no-prototype-builtins': 0,
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'react-hooks/exhaustive-deps': 0,
    'react-hooks/rules-of-hooks': 2,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/sort-comp': 1,
    'react/static-property-placement': 0,
    'space-before-function-paren': 0,
    'unicorn/prevent-abbreviations': 0,

    // ===================== before default config ====================================
    'array-callback-return': 1,
    'import/no-dynamic-require': 1,
    'no-else-return': 1,
    'no-plusplus': 1,
    'no-underscore-dangle': 1,
    'no-useless-escape': 1,
    'react/jsx-fragments': 1,
    'react/no-array-index-key': 1,

    // ========================@scaffold/cli-service==============================
    'no-extra-boolean-cast': 0,
    'prettier/prettier': 2,
    'react/display-name': 0,
    'react/no-deprecated': 0
  }
};
