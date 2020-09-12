/*
 * @Author: objectivezt
 * @Date: 2020-09-06 16:09:35
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-06 16:35:01
 */

import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { globalSelectProps } from '@common/config';
import SelectOption from '../SelectOption';

/**
 * @description 全局GlobalSelect
 * @param { Function } onChange 默认变更触发方法
 * @param { String } showName select list 的值名
 * @param { String } valueName select list 的键名
 * @param { String } placeholder 默认提示
 * @param { String } width 长度
 * @param { Array } list 可选项
 * @param { Function } onFunction 默认函数
 */
export default class GlobalSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    showName: PropTypes.string,
    valueName: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.string,
    list: PropTypes.array,
    onFunction: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {},
    showName: '',
    valueName: '',
    placeholder: '',
    width: '',
    list: [],
    onFunction: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      value: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.value) {
      this.setState({ value: undefined });
    } else {
      this.setState({ value: nextProps.value });
    }
  }

  /**
   * @description 默认监听事件
   * @param {*} value
   */
  onChange = value => {
    this.triggerChange(value);
    this.setState({ value });
  };

  /**
   * @description 触发器
   * @param {*} changeValue
   */
  triggerChange = changeValue => {
    const { onChange, onFunction } = this.props;
    onChange(changeValue);
    onFunction();
  };

  render() {
    const { value } = this.state;
    const {
      disabled = false,
      placeholder = '请输入或选择',
      width = globalSelectProps.style.width,
      list = [],
      showName,
      valueName
    } = this.props;
    return (
      <Select
        {...globalSelectProps}
        onChange={this.onChange}
        onSearch={this.onSearch}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        style={{ width }}>
        <SelectOption list={list} keyName={valueName} valueName={showName} />
      </Select>
    );
  }
}
