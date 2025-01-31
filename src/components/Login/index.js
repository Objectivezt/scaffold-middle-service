/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:38:43
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-10-18 12:01:29
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tabs } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';
import styles from './index.module.less';

@Form.create()
class Login extends Component {
  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onTabChange: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static childContextTypes = {
    tabUtil: PropTypes.object,
    form: PropTypes.object,
    updateActive: PropTypes.func
  };

  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.defaultActiveKey,
      tabs: [],
      active: {}
    };
  }

  getChildContext() {
    const { tabs } = this.state;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id]
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id)
          });
        }
      },
      form: this.props.form,
      updateActive: activeItem => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active
        });
      }
    };
  }

  onSwitch = type => {
    this.setState({
      type
    });
    this.props.onTabChange(type);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { active, type } = this.state;
    const activeFields = active[type];
    this.props.form.validateFields(activeFields, { force: true }, (err, values) => {
      this.props.onSubmit(err, values);
    });
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const otherChildren = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      if (item.type.LOGIN_TAB) {
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });
    return (
      <div className={classNames(className, styles.login)}>
        <Form onSubmit={this.handleSubmit}>
          {tabs.length ? (
            <div>
              <Tabs
                animated={false}
                className={styles.tabs}
                activeKey={type}
                onChange={this.onSwitch}>
                {TabChildren}
              </Tabs>
              {otherChildren}
            </div>
          ) : (
            [...children]
          )}
        </Form>
      </div>
    );
  }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});

export default Login;
