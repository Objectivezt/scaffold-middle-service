/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:35:54
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:35:54
 */
import React, { PureComponent } from 'react';
import pathToRegexp from 'path-to-regexp';
import { Icon, Layout, Menu } from 'antd';
import { Link } from 'dva/router';
import styles from './index.module.less';

const { Sider } = Layout;
const { SubMenu } = Menu;
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMenuMatchKeys = (flatMenuKeys, path) =>
  flatMenuKeys.filter(item => pathToRegexp(item).test(path));

export default class SliderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.flatMenuKeys = this.getFlatMenuKeys(props.menuData);
    this.state = {
      menus: props.menuData,
      openKeys: this.getDefaultCollapsedSubMenus(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      menus: nextProps.menuData
    });
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps)
      });
    }
  }

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname }
    } = props || this.props;
    return urlToList(pathname)
      .map(item => getMenuMatchKeys(this.flatMenuKeys, item)[0])
      .filter(item => item);
  }

  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach(item => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SliderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const { target, name, children, level, icon } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {!children && level === 1 ? getIcon(icon) : null}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link to={itemPath} target={target} replace={itemPath === this.props.location.pathname}>
        {!children && level === 1 ? getIcon(icon) : null}
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = ({ children, icon, name, path, level }) => {
    if (children && children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              icon ? (
                <span>
                  {level === 1 ? getIcon(icon) : null}
                  <span>{name}</span>
                </span>
              ) : (
                name
              )
            }
            key={path}>
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    }
    return (
      <Menu.Item key={path}>
        {this.getMenuItemPath({ children, icon, name, path, level })}
      </Menu.Item>
    );
  };

  /**
   * 获得菜单子节点
   * @memberof SliderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: { pathname }
    } = this.props;
    return urlToList(pathname).map(itemPath => getMenuMatchKeys(this.flatMenuKeys, itemPath).pop());
  };

  // conversion Path
  // 转化路径
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  isMainMenu = key => this.state.menus.some(item => key && (item.key === key || item.path === key));

  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
    });
  };

  render() {
    const { collapsed, onCollapse, width } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : { openKeys };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={width || 176}
        collapsedWidth="48"
        className={styles.sider}>
        <Menu
          key="Menu"
          mode="inline"
          theme="light"
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          className={styles.menu}
          {...menuProps}>
          {this.getNavMenuItems(this.state.menus)}
        </Menu>
      </Sider>
    );
  }
}
