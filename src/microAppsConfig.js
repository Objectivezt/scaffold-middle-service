/*
 * @Author: objectivezt
 * @Date: 2020-09-13 17:01:12
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-13 17:07:25
 */

const microAppsConfig = [
  {
    path: '/kong',
    name: 'kong',
    value: 'KONG',
    manifestUrl: {
      dev: '//develop.objectivezt.com',
      stg: '//stg.objectivezt.com',
      prd: '//objectivezt.com'
    }
  }
];

const envConfig = {
  dev: /develop.objectivezt.com/,
  stg: /stg.objectivezt.com/,
  prd: /objectivezt.com/
};

export const getEnv = () => {
  const { hostname } = window.location;
  return Object.keys(envConfig).find(key => envConfig[key].test(hostname));
};

export default microAppsConfig;
