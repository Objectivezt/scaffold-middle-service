/*
 * @Author: objectivezt
 * @Date: 2020-09-06 11:02:00
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 21:22:33
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { globalPaginationProps, globalTableProps } from '@common/config';
import classnames from 'classnames';

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
 * @param { Boolean } pagination 是否需要分页
 * @param { String } checkBoxDisableName 复选框不可点击的定义名称
 * @param { String | Boolean | Number } checkBoxDisableValue 复选框不可点击的定义字段值
 * @param { Function } checkBoxPropsStatusFunc 复选框自定义函数
 * @param { Number } defaultPageSize 默认分页大小
 * @param { Function } onRowFn 行点击函数
 * @param { Boolean } rowSelectionFixed 行的checkBox是否铆钉
 * @param { Boolean } bordered 展示外边框
 * @class GlobalTable
 * @extends { Component }
 */
export default class GlobalTable extends Component {
  static propTypes = {
    basePageRequest: PropTypes.func,
    bordered: PropTypes.bool,
    changeRowClassNameFunc: PropTypes.func,
    checkBoxDisableName: PropTypes.string,
    checkBoxDisableValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    checkBoxPropsStatusFunc: PropTypes.func,
    columns: PropTypes.array,
    defaultPageSize: PropTypes.array,
    expandedRowRender: PropTypes.oneOfType(PropTypes.func, PropTypes.any),
    filterObj: PropTypes.object,
    footer: PropTypes.oneOfType(PropTypes.func, PropTypes.any),
    isResetPage: PropTypes.bool,
    loading: PropTypes.bool,
    onRowFn: PropTypes.func,
    onTableRef: PropTypes.func,
    pagination: PropTypes.bool,
    resList: PropTypes.array,
    resTotal: PropTypes.number,
    rowKey: PropTypes.string,
    rowSelectionFixed: PropTypes.bool,
    scrollX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    that: PropTypes.object,
    useRefMethod: PropTypes.func
  };

  static defaultProps = {
    basePageRequest: () => {},
    bordered: false,
    changeRowClassNameFunc: () => '',
    checkBoxDisableValue: '',
    checkBoxDisableValue: '',
    checkBoxPropsStatusFunc: () => {},
    columns: [],
    expandedRowRender: null,
    filterObj: {},
    footer: () => {},
    isResetPage: false,
    loading: false,
    onRowFn: () => {},
    onTableRef: () => {},
    pagination: true,
    resList: [],
    resTotal: 0,
    rowKey: '',
    rowSelectionFixed: true,
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
      // 保持之前的checkbox item
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
    const { checkBoxDisableName, checkBoxDisableValue, checkBoxPropsStatusFunc } = this.props;
    if (checkBoxDisableName && checkBoxDisableValue) {
      return {
        disabled: record[checkBoxDisableName] === checkBoxDisableValue
      };
    }
    if (checkBoxPropsStatusFunc) {
      return checkBoxPropsStatusFunc(record);
    }
    return {};
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
      expandedRowRender,
      pagination,
      defaultPageSize,
      onRowFn,
      rowSelectionFixed = true,
      changeRowClassNameFunc,
      bordered
    } = this.props;
    const { pageNum, pageSize, localSelectRowKeys, localSelectedRows } = this.state;
    const tempRowSelection = {
      type: rowSelection === 'checkbox' ? 'checkbox' : 'radio',
      selectedRowKeys: localSelectRowKeys,
      selectedRows: localSelectedRows,
      fixed: rowSelectionFixed,
      onChange: (selectedRowKeys, selectedRows) =>
        this.updateSelectedItem(selectedRowKeys, selectedRows),
      getCheckboxProps: record => this.updateCheckBoxProps(record)
    };
    const tempPagination = {
      ...globalPaginationProps,
      current: pageNum,
      total: resTotal,
      defaultPageSize: defaultPageSize || 10,
      pageSize,
      showTotal: total => `总${total}项`,
      onChange: (innerPageNum, innerPageSize) => this.changePage(innerPageNum, innerPageSize),
      onShowSizeChange: (innerPageNum, innerPageSize) =>
        this.changePage(innerPageNum, innerPageSize)
    };
    return (
      <Table
        {...globalTableProps}
        bordered={bordered}
        columns={columns}
        dataSource={resList}
        loading={loading}
        rowKey={rowKey}
        scroll={{ x: scrollX || 'max-content' }}
        rowSelection={rowSelection === false ? null : tempRowSelection}
        rowClassName={(record, index) => {
          let tempRowClassNameStr = '';
          tempRowClassNameStr = changeRowClassNameFunc(record);
          let className = classnames(tempRowClassNameStr, 'table-light-row');
          if (index % 2 !== 1) {
            className = classnames(tempRowClassNameStr, 'table-normal-row');
          }
          return className;
        }}
        pagination={pagination ? tempPagination : false}
        footer={footer}
        expandedRowRender={expandedRowRender}
      />
    );
  }
}
