/*
 * @Author: objectivezt
 * @Date: 2020-10-18 20:52:15
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 20:53:47
 */

// 全局 G2 设置

import { track, setTheme } from 'bizcharts';

track(false);

const config = {
  defaultColor: '#1089ff',
  shape: {
    interval: {
      fillOpacity: 1
    }
  }
};

setTheme(config);
