/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:35:19
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:35:19
 */
import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

class BlankLayout extends React.Component {
  componentDidMount() {
    this.props.history.push({
      pathname: '/auth'
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

BlankLayout.defaultProps = {
  history: {}
};

BlankLayout.propTypes = {
  history: PropTypes.object
};

export default BlankLayout;
