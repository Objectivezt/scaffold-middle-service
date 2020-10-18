/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:35:13
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 12:06:58
 */
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { login, queryPublicKey, queryCaptchaImage } from '@/services/systems/loginSSOService';

export default {
  namespace: 'loginSSOModel',
  state: {
    status: false,
    validCode: '',
    requestId: '',
    loginKey: '',
    forgetUrl: '',
    changeUrl: '',
    helpUrl: '',
    forgetAccountUrl: ''
  },
  effects: {
    /**
     * @description 退出登录
     * @param {*} _
     * @param {*} { put }
     */
    *logout(_, { put }) {
      // TODO 调用退出
      // 调用当前 effects 中的goToLoginPage 方法
      yield put({ type: 'goToLoginPage' });
    },
    /**
     * @description 前往登录页
     * @param {*} _
     * @param {*} { put }
     */
    *goToLoginPage(_, { put }) {
      yield put(routerRedux.push('/user/login'));
    },
    /**
     * @description 获取公钥
     * @param {*} _
     * @param {*} { call, put }
     */
    *getPublicKey(_, { call, put }) {
      const res = yield call(queryPublicKey);
      if (res) {
        const { code, data, msg } = res;
        if (code === '0000') {
          yield put({
            type: 'saveKey',
            payloadKey: {
              loginKey: data.publicKey,
              forgetUrl: data.forgetUrl,
              changeUrl: data.changeUrl,
              helpUrl: data.helpUrl,
              forgetAccountUrl: data.forgetAccountUrl
            }
          });
        } else {
          message.error(msg);
        }
      }
    },
    /**
     * @description 登录
     * @param {*} { payloadLogin }
     * @param {*} { call, put}
     */
    *login({ payloadLogin }, { call, put }) {
      const res = yield call(login, payloadLogin);
      if (res) {
        const { code, data, msg } = res;
        if (code === '0000') {
          yield put({
            type: 'saveLogin',
            payloadLogin: {
              status: true
            }
          });
          yield put(routerRedux.push('/auth/app'));
        } else {
          yield put({
            type: 'saveLogin',
            payloadLogin: {
              validCode: data.validCode,
              requestId: data.requestId
            }
          });
          message.error(msg);
        }
      }
    },
    /**
     * @description 切换验证码
     * @param {*} _
     * @param {*} { call, put }
     */
    *changeCaptchaImage(_, { call, put }) {
      const res = yield call(queryCaptchaImage);
      if (res) {
        const { code, data, msg } = res;
        if (code === '0000') {
          yield put({
            type: 'saveImage',
            payloadImage: {
              validCode: data.validCode,
              requestId: data.requestId
            }
          });
        } else {
          message.error(msg);
        }
      }
    }
  },
  reducers: {
    saveKey(state, { payloadKey }) {
      return {
        ...state,
        ...payloadKey
      };
    },
    saveLogin(state, { payloadLogin }) {
      return {
        ...state,
        ...payloadLogin
      };
    },
    changeCaptchaImage(state, { payloadImage }) {
      return {
        ...state,
        ...payloadImage
      };
    }
  }
};
