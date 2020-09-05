/*
 * @Author: objectivezt
 * @Date: 2019-09-05 17:33:17
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-05 20:54:56
 */

const config = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 2,
    'react/prop-types': 0,
    'react/display-name': 0,
    'no-extra-boolean-cast': 0,
    'react/no-deprecated': 0
  }
};

const configAntTeam = require('./src/utils/innerEslintConfig');

const { LINT_CONFIG } = process.env;

module.exports = LINT_CONFIG === '@scaffold/cli-service' ? config : configAntTeam;
