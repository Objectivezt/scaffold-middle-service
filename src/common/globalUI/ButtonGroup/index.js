/*
 * @Author: objectivezt
 * @Date: 2020-09-06 16:39:24
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-06 16:46:52
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

/**
 * @description 全局使用的按钮组
 * @extends {PureComponent}
 * @param { Array } buttonList {type:string, clickFn: function, key: string}
 */
export default class GlobalButtonGroup extends PureComponent {
  static propTypes = {
    buttonList: PropTypes.array
  };

  static defaultProps = {
    buttonList: []
  };

  render() {
    const { buttonList } = this.props;
    return (
      <ButtonGroup>
        {buttonList.map(({ name, type, clickFn }) => (
          <Button type={type} onClick={clickFn} key={name}>
            {name}
          </Button>
        ))}
      </ButtonGroup>
    );
  }
}
