/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:35:19
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-13 19:34:43
 */
import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

class BlankLayout extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };

  static defaultProps = {
    history: {}
  };

  componentDidMount() {
    this.props.history.push({
      pathname: '/auth/app'
    });
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center'
        }}>
        <Spin size="large" />
      </div>
    );
  }
}

export default BlankLayout;
