/*
 * @Author: objectivezt
 * @Date: 2019-09-05 17:30:55
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-05 20:56:28
 */
const path = require('path');
const theme = require('./src/common/theme');

const proxyObj = {
  proxyObjectiveztNetBook: {
    target: 'http://objectivezt.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/': ''
    }
  },
  proxySpringCloud: {
    target: 'http://api.objectivezt.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/': ''
    }
  }
};

// 代理 URL
const proxyUrl = proxyObj.proxyObjectiveztNetBook;

// 当前位置转化
const aliasFactoryFn = (aliasObj, relPath = path, dirname = __dirname) => {
  const keyArr = Object.keys(aliasObj);
  const tempAliasConfig = { ...aliasObj };
  for (let i = 0; i < keyArr.length; i += 1) {
    const item = keyArr[i];
    tempAliasConfig[item] = relPath.resolve(dirname, aliasObj[item]);
  }
  return tempAliasConfig;
};

// 默认配置
const aliasConfigData = {
  '@': 'src',
  '@assets': 'src/assets/',
  '@common': 'src/common/',
  '@components': 'src/components/',
  '@containers': 'src/containers/',
  '@layouts': 'src/layouts/',
  '@models': 'src/models/',
  '@services': 'src/services/',
  '@styles': 'src/styles/',
  '@utils': 'src/utils/',
  '@setting': 'src/setting/'
};

module.exports = {
  theme,
  proxy: {
    '/api': proxyUrl,
    '/zuul/api': proxyUrl,
    '/auth': proxyUrl
  },
  resolve: {
    alias: aliasFactoryFn(aliasConfigData, path, __dirname),
    extensions: ['.js', 'json', '.jsx', 'ts', 'tsx'],
    modules: ['node_modules', 'src']
  },
  aliasFactory: aliasFactoryFn,
  aliasConfig: aliasConfigData,
  mode: true
};
