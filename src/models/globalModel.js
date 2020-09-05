/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:35:03
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:35:03
 */
import { baseRouterUrl, globalModalProps } from '@common/config';

export default {
  namespace: 'globalModel',
  state: {
    collapsed: false,
    isMultiPage: true,
    baseRouterUrl,
    globalButtonData: [],
    globalModalProps // 全局组件属性配置
  },
  effects: {},
  reducers: {
    // 侧边菜单收起展开
    changeLayoutCollapsed(state, { payloadCollapsed }) {
      return {
        ...state,
        collapsed: payloadCollapsed
      };
    },
    // 多页签切换
    changeMultiPage(state, { payloadMultiPage }) {
      return {
        ...state,
        isMultiPage: payloadMultiPage
      };
    },
    // 路由列表
    pushRouterUrl(state, { payloadRouterUrl }) {
      return {
        ...state,
        baseRouterUrl: payloadRouterUrl
      };
    },
    // 按钮数据
    pushButtonData(state, { payloadButtonData }) {
      return {
        ...state,
        globalButtonData: payloadButtonData
      };
    },
    // 高级搜索展开
    handleFormCardExpend(state, { payloadExpend }) {
      return {
        ...state,
        formCardExpend: payloadExpend
      };
    }
  }
};
