/*
 * @Author: objectivezt
 * @Date: 2020-10-18 20:55:58
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 20:56:23
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col } from 'antd';
import styles from './index.module.less';
import responsive from './responsive';

const Description = ({ term, column, className, children, ...restProps }) => {
  const clsString = classNames(styles.description, className);
  return (
    <Col className={clsString} {...responsive[column]} {...restProps}>
      {term && <div className={styles.term}>{term}</div>}
      {children && <div className={styles.detail}>{children}</div>}
    </Col>
  );
};

Description.defaultProps = {
  term: '',
  column: [],
  className: '',
  children: ''
};

Description.propTypes = {
  term: PropTypes.node,
  column: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.element
};

export default Description;
