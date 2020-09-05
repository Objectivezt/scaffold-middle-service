/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:36:52
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:36:52
 */
import React from 'react';
import { Alert } from 'antd';
import Button from 'antd/es/button';
import { sum } from '@utils/utils';
import { greeter } from '@utils/utils.ts';
import styles from './index.less';

const user = { firstName: 'jack', lastName: 'kong' };

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 123
    };
  }

  render() {
    const { temp } = this.state;
    return (
      <div className={styles.main}>
        {sum(temp, 2) + 123 + greeter(user)}
        <Alert />
        <Button>button</Button>
      </div>
    );
  }
}
