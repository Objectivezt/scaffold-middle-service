/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:40:26
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-05 20:59:44
 */
import React, { Component } from 'react';
import { globalCardProps } from '@common/config';
import { Card, Icon, Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.module.less';

/**
 * @description 用于查询的带高级查询CRUD页面
 * @param {String} title 标题
 * @param {ReactNode} children 卡片下的节点
 * @param {String} mode 模式 search | any
 * @param {Boolean} noAdvanced 是否需要高级搜索
 * @param {Boolean} isFilterCollapse 高级搜索状态
 * @param {ReactNode} extra 右上角节点
 * @class FormSearchCard
 * @extends {Component}
 */
@connect(({ globalModel }) => ({ globalModel }))
export default class FormSearchCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    mode: PropTypes.string,
    noAdvanced: PropTypes.any,
    isFilterCollapse: PropTypes.bool,
    extra: PropTypes.any
  };

  static defaultProps = {
    title: '查询',
    children: '',
    mode: 'noSearch',
    noAdvanced: false,
    isFilterCollapse: false,
    extra: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isFilterCollapse: props.isFilterCollapse || false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isFilterCollapse } = this.state;
    if (nextProps.isFilterCollapse !== isFilterCollapse) {
      this.setState({ isFilterCollapse: nextProps.isFilterCollapse });
    }
  }

  /**
   * @description 高级搜索切换
   */
  filterCollapse = () => {
    const { isFilterCollapse } = this.state;
    this.setState({
      isFilterCollapse: !isFilterCollapse
    });
    this.props.dispatch({
      type: 'globalModel/handleFormCardExpend',
      payloadExpend: !isFilterCollapse
    });
  };

  /**
   * @description 构建高级搜索
   */
  createAdvanced = () => {
    const { isFilterCollapse } = this.state;
    return (
      <>
        <Button type="link" onClick={() => this.filterCollapse()}>
          {isFilterCollapse ? '收起' : '高级搜索'}
          <Icon type={isFilterCollapse ? 'up' : 'down'} />
        </Button>
      </>
    );
  };

  /**
   * @description 构造左上脚自定义内容
   */
  createExtra = () => {
    const { extra, mode, noAdvanced } = this.props;
    if (noAdvanced) {
      return <></>;
    }
    if (mode && mode === 'search') {
      return <>{this.createExtra()}</>;
    }
    return <div className={styles.list}>{extra}</div>;
  };

  render() {
    const { title, children, mode, noAdvanced } = this.props;
    return (
      <Card
        {...globalCardProps}
        title={
          <>
            {noAdvanced ? null : (
              <Icon
                type={mode === 'search' ? 'windows' : 'area-chart'}
                style={{ marginRight: '8px', fontWeight: 700 }}
              />
            )}
            {title}
          </>
        }
        extra={this.createExtra()}
        style={{
          marginBottom: '20px',
          minHeight: '140px'
        }}>
        {children}
      </Card>
    );
  }
}
