/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:40:15
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:40:15
 */
import * as React from 'react';
import { Card } from 'antd';

interface Props {
  title?: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  height?: number;
  loading?: boolean;
  style?: object;
  bordered: boolean;
  hoverable: boolean;
}

export default class GlobalCard extends React.PureComponent<Props> {
  render() {
    const { title, children, extra, height, loading = false } = this.props;
    const styles = {
      marginBottom: '20px',
      minHeight: '200px'
    };
    if (height) {
      styles.minHeight = `${height}px`;
    }
    return (
      <Card
        type="inner"
        hoverable
        bordered
        title={title}
        extra={extra}
        style={styles}
        loading={loading}
        {...this.props}>
        {children}
      </Card>
    );
  }
}
