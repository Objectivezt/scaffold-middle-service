/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:37:31
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:37:31
 */
import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.module.less';

const FormItem = Form.Item;

export default ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </FormItem>
  );
};
