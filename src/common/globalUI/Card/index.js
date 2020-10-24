/*
 * @Author: objectivezt
 * @Date: 2018-09-05 20:39:42
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-05 20:54:26
 */

import React, { PureComponent } from 'react';
import { globalCardProps } from '@common/config';
import PropTypes from 'prop-types';
import { Card } from 'antd';

/**
 * @description 全局使用卡片组件
 * @class GlobalCard
 * @param { String } title 标题
 * @param { * } children 卡片子项
 * @param { * } extra 左上角自定义项
 * @extends {PureComponent}
 */
class GlobalCard extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    extra: PropTypes.any
  };

  static defaultProps = {
    title: '',
    children: '',
    extra: ''
  };

  render() {
    const { title, children, extra } = this.props;
    return (
      <Card
        style={{ marginBottom: '12px', minHeight: '200px' }}
        {...globalCardProps}
        {...this.props}
        title={title}
        extra={extra}>
        {children}
      </Card>
    );
  }
}

export default GlobalCard;
