/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:35:38
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-09-13 19:25:16
 */
import * as React from 'react';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import { Layout, Spin, Breadcrumb } from 'antd';
import { connect } from 'dva';
import { queryLayout, baseRouterUrl, projectName } from '@common/config';
import { Route, Switch, Redirect, Link } from 'dva/router';
import {
  AuthRouterPass,
  formatterMenu,
  getBashRedirect,
  getRoutes,
  isUrl,
  showLogoutConfirm,
  isInArray
} from '@utils/utils';
import NotFound from '../../containers/Exception/404';
import logo from '../../assets/favicon.ico';
import TabLayout from './TabLayout';
import GlobalHeader from './GlobalHeader';
import SliderMenu from './SliderMenu';
import styles from './index.module.less';

const { Content } = Layout;
const redirectData = [];

@connect(({ globalModel, userModel, loginSSOModel }) => ({
  collapsed: globalModel.collapsed,
  globalModel,
  userModel,
  loginSSOModel
}))
class AuthLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstRender: false,
      tempMenuArr: baseRouterUrl
    };
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch({ type: 'userModel/getCurrentUser' })
      .then(() => {
        const { userId } = this.props.userModel;
        if (userId) {
          this.getMenuData();
        } else {
          history.push({ pathname: 'user/login' });
          showLogoutConfirm();
        }
      })
      .catch(error => {
        history.push({ pathname: 'user/login' });
        window.console.warn(error);
        showLogoutConfirm();
      });
  }

  componentWillReceiveProps() {
    if (this.state.firstRender) {
      AuthRouterPass(this);
    }
  }

  getRedirect = item => {
    if (item && item.children) {
      if (item.children[0] && item.children[0].path) {
        redirectData.push({
          from: `${item.path}`,
          to: `${item.children[0].path}`
        });
        item.children.forEach(children => {
          this.getRedirect(children);
        });
      }
    }
  };

  getMenuData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userModel/getMenuData'
    }).then(() => {
      const { menuData, loadingLayoutMenu } = this.props.userModel;
      if (!this.state.firstRender && !loadingLayoutMenu) {
        this.getRouterWhiteList(menuData);
      }
      dispatch({ type: 'userModel/getButtonData' }).then(() => {
        const { buttonData } = this.props.userModel;
        dispatch({
          type: 'globalModel/pushButtonData',
          payloadButtonData: buttonData
        });
      });
    });
  };

  getRouterWhiteList = (data, parentPath = '') =>
    data.map(item => {
      let { path } = item;
      if (!isUrl(path)) {
        path = parentPath + item.path;
      }
      if (item.children) {
        this.getRouterWhiteList(item.children, `${parentPath}${item.path}/`);
      }
      const tempStateMenuArr = this.state.tempMenuArr;
      const menuArr = [...tempStateMenuArr];
      menuArr.push(`/${path}`);
      this.setState(
        {
          tempMenuArr: menuArr
        },
        () => {
          const { dispatch, location } = this.props;
          const { tempMenuArr } = this.state;
          dispatch({
            type: 'globalModel/pushRouterUrl',
            payloadRouterUrl: tempMenuArr
          });
          if (isInArray(tempMenuArr, location.pathname)) {
            this.setState({ firstRender: true });
          }
        }
      );
      return true;
    });

  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: 'globalModel/changeLayoutCollapsed',
      payloadCollapsed: collapsed
    });
  };

  handleMultiPage = isMultiPage => {
    this.props.dispatch({
      type: 'globalModel/changeMultiPage',
      payloadMultiPage: isMultiPage
    });
  };

  clearLoginStatus = () => {
    this.props.dispatch({
      type: 'loginSSOModel/logout',
      payloadLogout: {}
    });
  };

  handleMenuClick = ({ key }) => {
    const { history } = this.props;
    if (key === 'setting') {
      this.handleDrawer(true);
    } else if (key === 'news') {
      history.push({ pathname: '/tourist/' });
    } else if (key === 'logout') {
      this.clearLoginStatus();
      history.push({ pathname: '/user/login' });
    }
  };

  render() {
    const {
      HeaderComponents,
      dispatch,
      globalModel,
      history,
      location,
      match,
      routerData,
      sliderWidth = false,
      useBreadcrumb = false,
      userModel
    } = this.props;
    const { tempMenuArr } = this.state;
    const { isMultiPage, collapsed } = globalModel;
    const { username, loadingLayoutMenu = true, menuData = [] } = userModel;
    const bashRedirect = getBashRedirect('/auth/app');
    const tasParams = {
      ...routerData[location.pathname],
      routerData,
      keys: location.pathname,
      location,
      dispatch,
      match,
      history,
      whiteRouter: tempMenuArr,
      multiPage: isMultiPage
    };
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <React.Fragment key={url}>
          {routerData[url] && routerData[url].hasOwnProperty('name') ? (
            <Breadcrumb.Item key={url}>
              <Link to={url}>{routerData[url].name}</Link>
            </Breadcrumb.Item>
          ) : null}
        </React.Fragment>
      );
    });
    const breadcrumbItems = [].concat(extraBreadcrumbItems);
    const layout = (
      <Layout>
        <GlobalHeader
          collapsed={collapsed}
          currentUser={{ name: username || projectName }}
          onCollapse={this.handleMenuCollapse}
          onMenuClick={this.handleMenuClick}
          item={HeaderComponents ? <HeaderComponents that={this} /> : null}
        />
        <Layout style={collapsed ? { marginLeft: 48 } : { marginLeft: sliderWidth }}>
          <Content className={styles.context}>
            <SliderMenu
              collapsed={collapsed}
              location={location}
              logo={logo}
              menuData={formatterMenu(menuData)}
              onCollapse={this.handleMenuCollapse}
            />
            {isMultiPage ? (
              <TabLayout {...tasParams} />
            ) : (
              <>
                {useBreadcrumb ? (
                  <Breadcrumb className={styles.breadcrumb}>{breadcrumbItems}</Breadcrumb>
                ) : null}
                <Switch>
                  {redirectData.map(item => (
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  ))}
                  {getRoutes(match.path, routerData).map(item => (
                    <Route
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      redirectPath="/auth/exception/403"
                    />
                  ))}
                  <Redirect exact from="/" to={bashRedirect} />
                  <Route render={() => <NotFound />} />
                </Switch>
              </>
            )}
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={projectName}>
        <ContainerQuery query={queryLayout}>
          {params => (
            <div className={classNames(params)}>
              {loadingLayoutMenu ? (
                <div className={styles.loadingSpin}>
                  <Spin size="large" />
                </div>
              ) : (
                layout
              )}
            </div>
          )}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default AuthLayout;
