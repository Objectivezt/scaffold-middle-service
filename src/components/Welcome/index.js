/*
 * @Author: objectivezt
 * @Date: 2020-09-13 16:07:33
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-13 16:19:56
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from 'antd';
import styles from './index.module.less';
import logo from '../../assets/logo.svg';

const { Title, Text, Paragraph } = Typography;

/**
 * @description 首页
 * @param {String} sysName 系统英文名称
 * @param {String} cname 中文名称
 * @param {String} desc 系统描述
 * @param {String} minHeight 背景高度
 * @extends {PureComponent}
 * @class Welcome
 */
export default class Welcome extends PureComponent {
  static propTypes = {
    sysName: PropTypes.string,
    cname: PropTypes.string,
    desc: PropTypes.string,
    minHeight: PropTypes.string
  };

  static defaultProps = {
    sysName: '',
    cname: '',
    desc: '',
    minHeight: ''
  };

  render() {
    const { sysName, cname, desc, minHeight } = this.props;

    return (
      <div className={styles.main} style={{ minHeight: minHeight || '' }}>
        <span>
          <Title level={2} className={styles.divider}>
            {sysName}&nbsp;&nbsp;
            <Divider type="vertical" className={styles.divider} />
            &nbsp;&nbsp;{cname}
          </Title>
          <Paragraph>
            <Text className={styles.desc}>{desc}</Text>
          </Paragraph>
        </span>
        <img src={logo} alt="123" className={styles.dynamicImage} />
      </div>
    );
  }
}
