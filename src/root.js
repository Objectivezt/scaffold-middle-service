/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:33:42
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:33:42
 */
import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { createHashHistory as createHistory } from 'history';
import 'antd/dist/antd.less';
import 'moment/locale/zh-cn';
import '@styles/index.module.less'; // @change => @scaffold/middle-service/src/styles/index.module.less
import '@styles/index.css'; // @change => @scaffold/middle-service/src/styles/index.css

const App = ({ history }) => {
  const app = dva({
    history: history || createHistory()
  });

  app.use(createLoading());

  // eslint-disable-next-line global-require
  app.model(require('./models/globalModel').default);

  // eslint-disable-next-line global-require
  app.router(require('./routerConfig').default);

  const DvaApp = app.start();

  return (
    <>
      <DvaApp />
    </>
  );
};

export default App;
