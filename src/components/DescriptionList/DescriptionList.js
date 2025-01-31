/*
 * @Author: objectivezt
 * @Date: 2020-10-18 20:56:39
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 20:57:02
 */
import React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';
import styles from './index.module.less';

const DescriptionList = ({
  className,
  title,
  col = 3,
  layout = 'horizontal',
  gutter = 32,
  children,
  size,
  ...restProps
}) => {
  const clsString = classNames(styles.descriptionList, styles[layout], className, {
    [styles.small]: size === 'small',
    [styles.large]: size === 'large'
  });
  const column = col > 4 ? 4 : col;
  return (
    <div className={clsString} {...restProps}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <Row gutter={gutter}>
        {React.Children.map(children, child =>
          child ? React.cloneElement(child, { column }) : child
        )}
      </Row>
    </div>
  );
};

export default DescriptionList;
