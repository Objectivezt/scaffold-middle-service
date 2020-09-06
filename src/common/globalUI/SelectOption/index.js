/*
 * @Author: objectivezt
 * @Date: 2020-09-06 15:46:07
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-06 16:08:05
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

/**
 * @description 全局使用的SelectOption
 * @param { Array } list 需要渲染为Option数组
 * @param { String } keyName 键名称
 * @param { String } valueName 值名称
 */
export default class SelectOption extends Component {
  static propTypes = {
    list: PropTypes.array,
    keyName: PropTypes.string,
    valueName: PropTypes.string
  };

  static defaultProps = {
    list: [],
    valueName: '',
    keyName: ''
  };

  render() {
    const { list, keyName, valueName } = this.props;
    return (
      <>
        {list.map(item => (
          <Option key={item[keyName]} title={item[valueName]} value={item[keyName]}>
            {item[valueName]}
          </Option>
        ))}
      </>
    );
  }
}
