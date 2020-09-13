/*
 * @Author: objectivezt
 * @Date: 2020-09-13 19:36:12
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-13 19:37:44
 */

import React from 'react';
import { Avatar, Dropdown, Icon, Layout, Menu, Spin, Tooltip } from 'antd';
import { Route, Switch, routerRedux } from 'dva/router';
import NotFound from '@containers/Exception/404';
import bgImages from '@assets/background.png';
import { getRoutes } from '@utils/utils';
import styles from './index.module.less';

const { Header, Content } = Layout;
const { Item: MenuItem, Divider: MenuDivider } = Menu;

export default class TouristLayout extends React.Component {
  handleMenuClick = ({ key }) => {
    if (key === '1') {
      routerRedux.push('/exception/trigger');
    } else if (key === 'auth') {
      this.props.history.push({
        pathname: '/auth/app'
      });
    }
  };

  render() {
    const { currentUser = { name: '滔' }, match, routerData } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <MenuItem key="auth">
          <Icon type="sliders" />
          管理中心
        </MenuItem>
        <MenuItem key="changelog">
          <Icon type="file-text" />
          更新日志
        </MenuItem>
        <MenuDivider />
        <MenuItem key="logout">
          <Icon type="logout" />
          退出登录
        </MenuItem>
      </Menu>
    );

    return (
      <>
        <Header style={{ backgroundColor: '#B81C24' }}>
          <div className={styles.logo} />
          <div className={styles.right}>
            <Menu mode="horizontal" className={styles.nav} onClick={this.handleMenuClick}>
              <MenuItem key="1">申请</MenuItem>
            </Menu>
            <Tooltip title="使用文档">
              <a className={styles.action}>
                <Icon type="question-circle-o" />
              </a>
            </Tooltip>
            {currentUser.name ? (
              <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar size="small" className={styles.avatar}>
                    {currentUser.name.charAt(currentUser.name.length - 1)}
                  </Avatar>
                </span>
              </Dropdown>
            ) : (
              <Spin size="small" style={{ marginLeft: 8 }} />
            )}
          </div>
        </Header>
        <Content>
          <img src={bgImages} alt="bg" style={{ width: '100%' }} />
          <div style={{ width: '80%', margin: '0 auto' }}>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  redirectPath="/auth/exception/403"
                />
              ))}
              <Route render={NotFound} />
            </Switch>
          </div>
        </Content>
      </>
    );
  }
}
