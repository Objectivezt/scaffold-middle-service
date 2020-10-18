/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:34:49
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:34:49
 */
import request from '@utils/request';

export function login(params) {
  return request('login/goLogin', {
    method: 'POST',
    body: params
  });
}

export function queryPublicKey() {
  return request('login/getPublicKey');
}

export function queryCaptchaImage() {
  return request('login/changeImage');
}
