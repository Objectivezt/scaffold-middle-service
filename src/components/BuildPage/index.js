/*
 * @Author: objectivezt
 * @Date: 2020-09-13 15:49:11
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-09-13 15:49:11
 */
import React, { PureComponent } from 'react';
import construction from '../../assets/construction.png';

export default class BuildPage extends PureComponent {
  render() {
    return (
      <>
        <img
          style={{
            width: '457px',
            height: '480px',
            display: 'block',
            margin: 'auto'
          }}
          src={construction}
          alt="建设中"
        />
        <h2 style={{ textAlign: 'center', fontSize: '20px' }}>建设中</h2>;
      </>
    );
  }
}
