/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:36:46
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:36:46
 */
import React from 'react';
import { Link } from 'dva/router';
import Exception from '@components/Exception';

export default () => (
  <Exception type="500" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
