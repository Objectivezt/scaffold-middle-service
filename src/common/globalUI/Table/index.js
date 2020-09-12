/*
 * @Author: objectivezt
 * @Date: 2020-09-06 11:02:00
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-06 15:41:18
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { globalPaginationProps, globalTableProps } from '@common/config';

/**
 * @description 公共的表格组件
 * @description 如果要处理checkbox 传入的参数中state需要带上 selectedRowKeys， selectedRows
 * @param { Object } that 上游的this
 * @param { Array } columns 表格列定义项
 * @param { Object } filterObj
 * @param { Array } resList 返回值列表
 * @param { String } rowKey 行的唯一编码标示
 * @param { Boolean } loading 加载状态
 * @param { * } scrollX 水平滚动部分
 * @param { Number } resTotal 返回列表的总数
 * @param { Function } useRefMethod 使用上游导入的方法
 * @param { Function } onTableRef 组件給外部的引用
 * @param { Object } filterObj 查询条件
 * @param { Boolean } isResetPage 是否重置分页
 * @param { Function } footer 表格尾部
 * @param { Function } expendedRowRender 行展开部分
 * @class GlobalTable
 * @extends { Component }
 */
export default class GlobalTable extends Component {
  static propTypes = {
    basePageRequest: PropTypes.func,
    columns: PropTypes.array,
    expandedRowRender: PropTypes.oneOfType(PropTypes.func, PropTypes.any),
    filterObj: PropTypes.object,
    footer: PropTypes.oneOfType(PropTypes.func, PropTypes.any),
    isResetPage: PropTypes.bool,
    loading: PropTypes.bool,
    onTableRef: PropTypes.func,
    pagination: PropTypes.bool,
    resList: PropTypes.array,
    resTotal: PropTypes.number,
    rowKey: PropTypes.string,
    scrollX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    that: PropTypes.object,
    useRefMethod: PropTypes.func
  };

  static defaultProps = {
    basePageRequest: () => {},
    columns: [],
    expandedRowRender: null,
    filterObj: {},
    footer: () => {},
    isResetPage: false,
    loading: false,
    onTableRef: () => {},
    pagination: true,
    resList: [],
    resTotal: 0,
    rowKey: '',
    scrollX: 'max-content',
    that: null,
    useRefMethod: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      localSelectRowKeys: [],
      localSelectedRows: []
    };
  }

  componentWillMount() {
    this.props.onTableRef(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isResetPage) {
      this.setState({
        pageNum: 1,
        pageSize: 10,
        localSelectRowKeys: [],
        localSelectedRows: []
      });
    }
  }

  /**
   * @description 分页请求
   * @param { Number } pageNum
   * @param { Number } pageSize
   */
  changePage = (pageNum, pageSize) => {
    this.setState({
      pageNum,
      pageSize,
      localSelectRowKeys: []
    });
    const tempPayload = {
      ...this.props.filterObj,
      pageNum,
      pageSize
    };

    this.props.basePageRequest(tempPayload);
  };

  /**
   * @description 对上游组件暴露分页信息
   */
  exportCurrentPageParams = () => {
    const { pageNum, pageSize } = this.state;
    return {
      pageNum,
      pageSize
    };
  };

  /**
   * @description 对上游组件改变当前分页数据
   * @param { Number } tempPageNum
   * @param { Number } tempPageSize
   */
  outerChangeNumAndSize = (tempPageNum, tempPageSize) => {
    const { pageNum, pageSize } = this.state;
    this.setState({
      pageNum: tempPageNum || pageNum,
      pageSize: tempPageSize || pageSize
    });
  };

  /**
   * @description 更新选中项目的属性
   * @param { Object } record
   */
  updateCheckBoxProps = record => {
    const { checkBoxDisableName, checkBoxDisableValue } = this.props;
    if (checkBoxDisableName && checkBoxDisableValue) {
      return {
        disabled: record[checkBoxDisableName] === checkBoxDisableValue
      };
    }
  };

  /**
   * @description 更新选中项
   * @param {Array} selectedRowKeys
   * @param {Array} selectedRows
   */
  updateSelectedItem = (selectedRowKeys, selectedRows) => {
    const { that, useRefMethod } = this.props;
    useRefMethod(selectedRowKeys, selectedRows);
    this.setState({
      localSelectRowKeys: selectedRowKeys,
      localSelectedRows: selectedRows
    });
    that.setState({
      selectedRowKeys,
      selectedRows
    });
  };

  render() {
    const {
      columns,
      loading,
      resList,
      resTotal,
      rowKey,
      scrollX,
      rowSelection,
      footer,
      expandedRowRender
    } = this.props;
    const { pageNum, pageSize, localSelectRowKeys, localSelectedRows } = this.state;
    const tempRowSelection = {
      type: rowSelection === 'checkbox' ? 'checkbox' : 'radio',
      selectedRowKeys: localSelectRowKeys,
      selectedRows: localSelectedRows,
      onChange: (selectedRowKeys, selectedRows) =>
        this.updateSelectedItem(selectedRowKeys, selectedRows),
      getCheckboxProps: record => this.updateCheckBoxProps(record)
    };
    return (
      <Table
        {...globalTableProps}
        columns={columns}
        dataSource={resList}
        loading={loading}
        rowKey={rowKey}
        scroll={{ x: scrollX || 'max-content' }}
        rowSelection={rowSelection === false ? null : tempRowSelection}
        rowClassName={(_, index) => {
          let className = 'table-light-row';
          if (index % 2 !== 1) {
            className = 'table-normal-row';
          }
          return className;
        }}
        pagination={{
          ...globalPaginationProps,
          current: pageNum,
          total: resTotal,
          pageSize,
          showTotal: total => `总${total}项`,
          onChange: (innerPageNum, innerPageSize) => this.changePage(innerPageNum, innerPageSize),
          onShowSizeChange: (innerPageNum, innerPageSize) =>
            this.changePage(innerPageNum, innerPageSize)
        }}
        footer={footer}
        expandedRowRender={expandedRowRender}
      />
    );
  }
}
