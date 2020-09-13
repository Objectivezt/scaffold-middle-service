/*
 * @Author: objectivezt
 * @Date: 2020-09-13 19:32:44
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-09-13 19:32:44
 */
import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '@components/PageHeader';
import styles from './index.module.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-16px -24px 0' }} className={wrapperClassName}>
    {top}

    <PageHeader key="pageHeader" {...restProps} linkElement={Link} />

    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);
