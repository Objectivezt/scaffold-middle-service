/*
 * @Author: objectivezt
 * @Date: 2020-09-05 21:00:58
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-05 21:07:35
 */

import React, { PureComponent } from 'react';
import { Dropdown } from 'antd';

class GlobalDropDown extends PureComponent {
  render() {
    return (
      <Dropdown {...this.props} placement="bottomLeft">
        {this.props.children}
      </Dropdown>
    );
  }
}

export default GlobalDropDown;
