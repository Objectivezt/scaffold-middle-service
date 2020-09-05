/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:33:54
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:33:54
 */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './root';

window.console.log('current env:', process.env.NODE_ENV);

ReactDOM.render(<App />, document.getElementById('root'));
