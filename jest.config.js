/*
 * @Author: objectivezt
 * @Date: 2019-09-05 17:32:48
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:32:48
 */
module.exports = {
  transform: {
    '^.+\\.(jsx|js)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|jsx|tsx)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
