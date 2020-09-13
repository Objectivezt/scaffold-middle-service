/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:35:48
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-13 18:02:43
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, message, Menu, Dropdown } from 'antd';
import { isInArray } from '@utils/utils';
import { routerRedux } from 'dva/router';
import { createMenuItem } from '@utils/utils.stateless';
import styles from './index.module.less';

const { TabPane } = Tabs;

/**
 * @description 公共页签组件
 * @param {Object} history router history
 * @param {String} name
 * @param {String} keys
 * @param {*} component
 * @param {Object} location
 * @param {Array} whiteRouter
 * @param {Function} dispatch
 * @param {Object} match
 * @class TabLayout
 * @extend {Component}
 */
export default class TabLayout extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    name: PropTypes.string,
    keys: PropTypes.string,
    component: PropTypes.any,
    location: PropTypes.object,
    whiteRouter: PropTypes.array,
    dispatch: PropTypes.func,
    match: PropTypes.object
  };

  static defaultProps = {
    history: {},
    name: '',
    keys: '',
    component: <div>loading</div>,
    location: {},
    whiteRouter: [],
    dispatch: () => {},
    match: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
      panes: [],
      tabMenuData: [
        {
          name: '关闭当前',
          iconType: 'close',
          key: 'close'
        },
        {
          name: '关闭其他',
          iconType: 'close-circle',
          key: 'closeOther'
        }
      ]
    };
  }

  componentWillMount() {
    const { name, keys, component } = this.props;
    if (keys === '/' || !name) {
      return;
    }
    const { panes } = this.state;
    const activeKey = keys;
    panes.push({ name, key: activeKey, component });
    this.setState({ panes, activeKey });
  }

  componentWillReceiveProps(nextProps) {
    const { location, whiteRouter, name, keys, component, routerData, multiPage } = nextProps;
    if (!isInArray(whiteRouter, location.pathname) && !multiPage) {
      const { keys: key = '/auth/exception/403', component: noAuthComponent } = routerData[
        '/auth/exception/403'
      ];
      const { panes: tempPanes } = this.state;
      if (tempPanes.length > 0) {
        tempPanes[tempPanes.length - 1].component = noAuthComponent;
        tempPanes[tempPanes.length - 1].name = name;
        tempPanes[tempPanes.length - 1].key = key;
      }
      this.setState({ panes: tempPanes, activeKey: key });
      return;
    }
    if (keys === '/' || !name) {
      return;
    }
    const { panes } = this.state;
    const activeKey = keys;
    let isExist = false;
    for (let i = 0; i < panes.length; i += 1) {
      if (panes[i].key === activeKey) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      this.setState({
        activeKey
      });
    } else {
      panes.push({ name, key: activeKey, component });
      this.setState({ panes, activeKey });
    }
  }

  onChange = activeKey => {
    this.props.dispatch(
      routerRedux.push({
        pathname: activeKey
      })
    );
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  // 关闭当前窗口
  remove = targetKey => {
    let { activeKey } = this.state;
    const { panes } = this.state;
    if (panes.length === 1) {
      message.warning('窗口不能全部关闭');
      return;
    }
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const tempPanes = panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = tempPanes[lastIndex].key;
    }
    this.setState({ panes: tempPanes, activeKey });
  };

  // 关闭其他窗口
  removeOther = targetKey => {
    const { panes } = this.state;
    if (panes.length === 1) {
      message.warning('窗口不能全部关闭');
      return;
    }
    const tempPanes = panes.filter(pane => pane.key === targetKey);
    this.setState({ panes: tempPanes });
  };

  onMenuClick = ({ key }, pathname) => {
    if (key === 'close') {
      this.remove(pathname);
    } else if (key === 'closeOther') {
      this.removeOther(pathname);
    }
  };

  render() {
    const { location, match, history } = this.props;
    const { panes, activeKey, tabMenuData } = this.state;
    const TabMenu = pathname => (
      <Menu className={styles.menu} onClick={item => this.onMenuClick(item, pathname)}>
        {tabMenuData.map(({ name, iconType, key }) => createMenuItem(name, key, iconType))}
      </Menu>
    );

    const TabMenuDropDown = (name, pathname) => (
      <Dropdown overlay={TabMenu(pathname)}>
        <div
          className="ant-dropdown-link"
          style={{ width: '100%', height: '26px', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {name}
        </div>
      </Dropdown>
    );

    return (
      <Tabs
        activeKey={activeKey}
        hideAdd
        style={{ marginTop: 20 }}
        onChange={this.onChange}
        onEdit={this.onEdit}
        type="editable-card">
        {panes.map(({ name, key, component: Pane }) => (
          <TabPane tab={TabMenuDropDown(name, key)} key={key} closable>
            <Pane
              history={history}
              location={location}
              match={match}
              onCloseCurrentTab={(pathname, action) => this.onEdit(pathname, action)}
            />
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
