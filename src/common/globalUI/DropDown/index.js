/*
 * @Author: objectivezt
 * @Date: 2018-09-05 21:00:58
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-05 21:07:35
 */

import React, { PureComponent } from 'react';
import { Dropdown } from 'antd';
import PropTypes from 'prop-types';

/**
 * @description 全局下拉菜单
 * @param {*} children
 * @extends {PureComponent}
 * @class GlobalDropDown
 */
class GlobalDropDown extends PureComponent {
  static propTypes = {
    children: PropTypes.any
  };

  static defaultProps = {
    children: ''
  };

  render() {
    return (
      <Dropdown {...this.props} placement="bottomLeft">
        {this.props.children}
      </Dropdown>
    );
  }
}

export default GlobalDropDown;
