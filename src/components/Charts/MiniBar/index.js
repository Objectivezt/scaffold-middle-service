/*
 * @Author: objectivezt
 * @Date: 2020-10-18 20:41:03
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 20:42:20
 */
import React from 'react';
import { Chart, Tooltip, Geom } from 'bizcharts';
import autoHeight from '../autoHeight';
import styles from '../index.module.less';

@autoHeight()
export default class MiniBar extends React.Component {
  render() {
    const { height, forceFit = true, color = '#1890FF', data = [] } = this.props;

    const scale = {
      x: {
        type: 'cat'
      },
      y: {
        min: 0
      }
    };

    const padding = [36, 5, 30, 5];

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y
      })
    ];

    // for tooltip not to be hide
    const chartHeight = height + 54;

    return (
      <div className={styles.miniChart} style={{ height }}>
        <div className={styles.chartContent}>
          <Chart
            scale={scale}
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            padding={padding}>
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type="interval" position="x*y" color={color} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    );
  }
}
