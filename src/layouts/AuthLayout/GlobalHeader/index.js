/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:36:19
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-13 17:34:06
 */
import React, { PureComponent } from 'react';
import { Dropdown, Icon, Layout, Menu, Spin, Drawer, Divider, Button } from 'antd';
import PropTypes from 'prop-types';
import { projectName } from '@common/config';
import logo from '@assets/logo.jpg';
import { createMenuItem } from '@utils/utils.stateless';
import appsConfig from '@/microAppsConfig';
import { onHref } from '../../../utils/utils.js';
import styles from './index.module.less';

const { Item: MenuItem } = Menu;
const { Header } = Layout;

/**
 * @description 公共的头部
 * @param { Boolean } collapsed 展开收缩状态
 * @param { Function } onCollapse  展开搜索方法
 * @param { ReactNode } headerLeftItem 头部自定义项
 * @param { Boolean } isPortal 是否门户页
 * @param { Object } currentUser 用户信息
 * @param { ReactNode } item 默认头部
 * @class GlobalHeader
 * @extends {PureComponent}
 */
export default class GlobalHeader extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    headerLeftItem: PropTypes.any,
    isPortal: PropTypes.bool,
    currentUser: PropTypes.object,
    item: PropTypes.any
  };

  static defaultProps = {
    collapsed: false,
    onCollapse: () => {},
    headerLeftItem: null,
    isPortal: false,
    currentUser: { name: '' },
    item: null
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleDrawer: false,
      tabMenuData: []
    };
  }

  /**
   * @description 切换侧边栏状态
   */
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
  };

  /**
   * @description 展示切换系统
   */
  onShowChangeSystem = () => this.setState({ visibleDrawer: true });

  /**
   * @description 隐藏切换系统
   */
  onHideChangeSystem = () => this.setState({ visibleDrawer: false });

  render() {
    const {
      onMenuClick,
      currentUser,
      collapsed,
      item,
      isPortal = false,
      headerLeftItem = null
    } = this.props;
    const { tabMenuData, visibleDrawer } = this.state;
    const MenuItems = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {tabMenuData.map(({ name, key, iconType }) => createMenuItem(name, key, iconType))}
        <MenuItem key="logout">
          <Icon type="logout" />
          退出登录
        </MenuItem>
      </Menu>
    );
    const ChangeSystem = (
      <Drawer
        title={null}
        placement="right"
        closable={false}
        onClose={this.onHideChangeSystem}
        style={{ top: '48px', height: '100vh' }}
        width="200px"
        className={styles.sliderSysDrawer}
        visible={visibleDrawer}>
        {appsConfig.map(({ imgBg, value, name, imgActive, manifestUrl, path }) => (
          <div
            onClick={() => onHref(manifestUrl, value, path)}
            key={value}
            style={{ margin: '12px auto', width: '150px', position: 'relative' }}>
            <div style={{ color: '#fff', position: 'absolute', top: '10px', left: '12px' }}>
              <img src={imgBg} alt={value} />
            </div>
            <div
              style={{
                color: '#fff',
                position: 'absolute',
                top: '10px',
                left: '12px'
              }}>
              <img src={imgActive} alt={value} />
            </div>
            <div
              style={{
                color: '#fff',
                position: 'absolute',
                bottom: '10px',
                left: '12px',
                height: '18px',
                overflow: 'hidden'
              }}>
              {name}
            </div>
          </div>
        ))}
      </Drawer>
    );
    return (
      <Header className={styles.header} style={{ width: '100%' }}>
        <img alt="kong" src={logo} style={{ margin: '-2px 8px 0 20px' }} />
        {isPortal ? (
          <>
            <Divider type="vertical" style={{ opacity: 0.4, margin: '0 24px', height: '18px' }} />
            {headerLeftItem || null}
          </>
        ) : (
          <>
            <span style={{ fontSize: '16px', color: '#fff' }}>{projectName}</span>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-fold' : 'menu-unfold'}
              onClick={this.toggle}
            />
          </>
        )}
        <div className={`${styles.right}`} styles={{ display: isPortal ? 'none' : 'block' }}>
          <Button
            onClick={this.onShowChangeSystem}
            style={{ width: '98px', height: '24px', borderRadius: '2px' }}
            type="primary">
            切换系统
          </Button>
        </div>
        <div className={`${styles.right} ${styles.avatarBox}`}>
          <Divider type="vertical" style={{ opacity: 0.4, margin: '0 24px', height: '18px' }} />
          {currentUser.name ? (
            <Dropdown overlay={MenuItems}>
              <span className={`${styles.action} ${styles.account}`}>
                Hi ~ {currentUser.name}
                <Icon type="caret-down" style={{ color: '#fff', marginLeft: '4px' }} />
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
        <div className={`${styles.right}`}>{item}</div>
        {ChangeSystem}
      </Header>
    );
  }
}
