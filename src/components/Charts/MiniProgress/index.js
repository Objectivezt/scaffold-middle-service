/*
 * @Author: objectivezt
 * @Date: 2020-10-18 20:35:21
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-10-18 20:35:21
 */
import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.module.less';

const MiniProgress = ({ target, color = 'rgb(19, 194, 194)', strokeWidth, percent }) => (
  <div className={styles.miniProgress}>
    <Tooltip title={`目标值: ${target}%`}>
      <div className={styles.target} style={{ left: target ? `${target}%` : null }}>
        <span style={{ backgroundColor: color || null }} />
        <span style={{ backgroundColor: color || null }} />
      </div>
    </Tooltip>
    <div className={styles.progressWrap}>
      <div
        className={styles.progress}
        style={{
          backgroundColor: color || null,
          width: percent ? `${percent}%` : null,
          height: strokeWidth || null
        }}
      />
    </div>
  </div>
);

export default MiniProgress;
