/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:39:28
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-06 16:53:34
 */

// 默认组件属性
export { default as globalCardProps } from './globalUIProps/Card.config';

export { default as globalPaginationProps } from './globalUIProps/Pagination.config';

export { default as globalColProps } from './globalUIProps/Col.config';

export { default as globalSelectProps } from './globalUIProps/Select.config';

export { default as globalTableProps } from './globalUIProps/Table.config';

export { default as globalInputNumberProps } from './globalUIProps/InputNumber.config';

export { default as globalModalProps } from './globalUIProps/Modal.config';

export { default as globalRangePickerProps } from './globalUIProps/RangePicker.config';

// 日期
export const globalDateFormat = 'YYYY-MM-DD';

// 通用基础布局
export const globalFormItemLayout = {
  labelCol: {
    sm: { span: 10 },
    md: { span: 10 },
    lg: { span: 8 },
    xl: { span: 10 },
    xxl: { span: 10 }
  },
  wrapperCol: {
    sm: { span: 14 },
    md: { span: 14 },
    lg: { span: 16 },
    xl: { span: 14 },
    xxl: { span: 14 }
  }
};

// 布局配置
export const queryLayout = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200
  }
};

// 基础分页请求
export const globalDefineListSize = {
  pageNum: 1,
  pageSize: 10
};

// 配置最大分页请求
export const globalCustomListSize = {
  pageNum: 1,
  pageSize: 200
};

// FormItem 表单基础配置
export const globalFormItemBox = {
  style: { width: '85%' },
  placeholder: '请输入'
};

// Model 表单布局
export const globalModalItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
};

// FormItem 校验标示
export const globalRequire = {
  colon: true,
  required: true
};

// FormItem 检验配置
export const globalFormRule = [
  {
    required: true,
    message: '请输入'
  }
];

// 无需context的url
export const noContextUrl = [];

// 开启本地菜单
export const localDevData = process.env.NODE_ENV !== 'production';

// 基础请求
export const baseUrl = '/';

// 项目名称
export const projectName = '中间服务基础包';

// 路由白名单
export { default as baseRouterUrl } from './baseRouterUrl';

// 本地菜单
export { default as localMenu } from '@common/localMenu';

// 本地按钮
export { default as localButton } from '@common/localMenu'; // 使用别名将导入引用项目的文件
