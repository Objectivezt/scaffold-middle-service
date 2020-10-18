/*
 * @Author: objectivezt
 * @Date: 2020-10-18 20:33:52
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 20:34:26
 */

import React from 'react';
import styles from './index.module.less';

const Field = ({ label, value, ...rest }) => (
  <div className={styles.field} {...rest}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default Field;
