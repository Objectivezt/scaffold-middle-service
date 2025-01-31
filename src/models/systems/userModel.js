/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:35:08
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:35:08
 */
import { queryMenus, queryCurrentUser } from '@services/systems/userServices';
import { localDevData, localMenu } from '@common/config';
import { message } from 'antd';

export default {
  namespace: 'userModel',
  state: {
    menuData: [],
    loadingLayoutMenu: true,
    username: '',
    userId: ''
  },
  effects: {
    *getMenuData(_, { call, put }) {
      if (localDevData) {
        yield put({
          type: 'saveMenuData',
          payloadMenuData: {
            menuData: localMenu,
            loadingLayoutMenu: false
          }
        });
      } else {
        const res = yield call(queryMenus);
        if (res) {
          const { data, code, msg } = res;
          let tempLoadingLayoutMenu = true;
          if (data) {
            tempLoadingLayoutMenu = false;
          }
          if (code === '0000') {
            yield put({
              type: 'saveMenuData',
              payloadMenuData: {
                menuData: data || [],
                loadingLayoutMenu: tempLoadingLayoutMenu
              }
            });
          } else {
            message.info(msg);
          }
        }
      }
    },

    *getCurrentUser(_, { call, put }) {
      if (localDevData) {
        yield put({
          type: 'saveCurrentUser',
          payloadCurrentUser: {
            username: '转帖',
            userId: 'objectivezt'
          }
        });
      } else {
        const res = yield call(queryCurrentUser);
        if (res) {
          const { data, code, msg } = res;
          if (code === '0000') {
            yield put({
              type: 'saveCurrentUser',
              payloadCurrentUser: {
                username: data.username,
                userId: data.userId
              }
            });
          } else {
            message.info(msg);
          }
        }
      }
    }
  },
  reducers: {
    saveMenuData(state, { payloadMenuData }) {
      return {
        ...state,
        menuData: payloadMenuData.menuData,
        loadingLayoutMenu: payloadMenuData.loadingLayoutMenu
      };
    },
    saveCurrentUser(state, { payloadCurrentUser }) {
      return {
        ...state,
        username: payloadCurrentUser.username,
        userId: payloadCurrentUser.userId
      };
    }
  }
};
