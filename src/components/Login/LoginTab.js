/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:37:27
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:37:27
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export default class LoginTab extends Component {
  static contextTypes = {
    tabUtil: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    if (this.context.tabUtil) {
      this.context.tabUtil.addTab(this.uniqueId);
    }
  }

  render() {
    return <TabPane {...this.props} />;
  }
}
