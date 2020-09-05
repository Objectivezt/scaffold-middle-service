/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:36:56
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:36:56
 */
import * as React from 'react';
import { Button } from 'antd';

const { PureComponent, Fragment } = React;

interface Props {
  name: string;
  firstName?: string;
  lastName?: string;
}
interface State {
  count: number;
}

export default class Hi extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  sum = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
    return true;
  };

  render() {
    return (
      <Fragment>
        <p>你点击了 {this.state.count} 1111次</p>
        <Button onClick={this.sum}> {`Hi ${this.props.name}`}</Button>
      </Fragment>
    );
  }
}
