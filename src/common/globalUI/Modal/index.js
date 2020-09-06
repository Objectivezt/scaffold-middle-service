/*
 * @Author: objectivezt
 * @Date: 2018-09-06 10:01:41
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-06 10:28:06
 */

import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { globalModalProps } from '@common/config';

/**
 * @description 公共的Modal组件
 * @param {*} children 内容部分
 * @param {Boolean} visible 显示隐藏开关
 * @param {String} title 标题
 * @param {Number} width 宽度
 * @param {Function} onOk 确认事件
 * @param {Function} onCancel 取消事件
 * @param {*} footer 底部自定义区间
 */
export default class GlobalModal extends Component {
  static propTypes = {
    children: PropTypes.any,
    visible: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    footer: PropTypes.any
  };

  static defaultProps = {
    children: null,
    visible: false,
    title: '',
    width: 1024,
    onCancel: () => {},
    onOk: () => {},
    footer: null
  };

  render() {
    const {
      children,
      visible = false,
      title = '',
      width = 1024,
      onOk,
      onCancel,
      footer = null
    } = this.props;
    return (
      <Modal
        {...this.props}
        {...globalModalProps}
        style={{ marginTop: 50 }}
        width={width}
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        footer={footer}>
        {children}
      </Modal>
    );
  }
}
