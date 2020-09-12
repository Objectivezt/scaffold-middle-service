/*
 * @Author: objectivezt
 * @Date: 2020-09-06 10:29:48
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-06 10:53:07
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { globalPaginationProps } from '@common/config';

/**
 * @description 全局分页组件
 * @param {Number} total 总数
 * @param {Number} pageSize 分页大小
 * @param {Number} pageNum 当前页码
 * @param {Function} changeTablePage 分页改变
 * @extends {PureComponent}
 * @class GlobalPagination
 */
export default class GlobalPagination extends PureComponent {
  static propTypes = {
    total: PropTypes.number,
    pageSize: PropTypes.number,
    pageNum: PropTypes.number,
    changeTablePage: PropTypes.func
  };

  static defaultProps = {
    total: 0,
    pageSize: 0,
    pageNum: 0,
    changeTablePage: () => {}
  };

  render() {
    const { total, pageSize, pageNum, changeTablePage } = this.props;
    return (
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        {total ? (
          <Pagination
            {...globalPaginationProps}
            size="small"
            total={total}
            showTotal={value => `总 ${value} 项`}
            pageSize={pageSize}
            current={pageNum}
            onChange={(num, size) => changeTablePage(num, size)}
            onShowSizeChange={(num, size) => changeTablePage(num, size)}
          />
        ) : null}
      </div>
    );
  }
}
