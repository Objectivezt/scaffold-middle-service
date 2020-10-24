/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:34:43
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 21:19:24
 */
import request from '@utils/request';

/**
 * @description 获取菜单
 * @method GET user/queryCurrentMenus
 */
export function queryMenus() {
  return request('user/queryCurrentMenus');
}

/**
 * @description 获取按钮
 * @method GET user/queryCurrentButtons
 */
export function queryButtons() {
  return request('user/queryCurrentButtons');
}

/**
 * @description 查询当前用户
 * @method GET api/um/queryCurrentUser
 */
export function queryCurrentUser() {
  return request('api/um/queryCurrentUser');
}
