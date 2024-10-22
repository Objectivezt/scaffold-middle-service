/*
 * @Author: objectivezt
 * @Date: 2018-08-15 10:25:34
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-08-04 17:34:16
 */
import moment from 'moment';
import { get, isArray, pick, isNaN, isFinite, trim } from 'lodash';

/**
 * @description 浏览器URL正则
 */
// eslint-disable-next-line no-useless-escape
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

/**
 * @description 判断是否是网页路径
 * @param {String} path
 */
export const isUrl = path => reg.test(path);

/**
 * @description 判断字符串是否在数组中
 * @param {Array} array
 * @param {String} value
 * @returns {Boolean}  true 存在 |  false 不存在
 */
export const isInArray = (array, value) => {
  for (let i = 0; i < array.length; i += 1) {
    if (value === array[i]) {
      return true;
    }
  }
  return false;
};

/**
 * @description 页面内部用于权限判断
 * @param {Object} _this Page的this
 * @param {String} path 被过滤的路由
 * @returns {Boolean} true通过 | false 不通过
 */
export const authRouterPass = (_this, path) => {
  const { history, globalModel = {} } = _this.props;
  const tempMenuArr = globalModel.baseRouterUrl || [];
  if (path) {
    // 存在过滤路由
    if (!isInArray(tempMenuArr, path)) {
      history.push('/auth/exception/403');
      return false;
    }
    return true;
  }
  if (!isInArray(tempMenuArr, history.location.pathname)) {
    if (history.location.pathname === '/auth/exception/403') {
      return false;
    }
    history.push('/auth/exception/403');
    return false;
  }
  return false;
};

/**
 * @description 汉字转化3个字符
 * @param {String} value
 * @returns {Number} 默认0
 */
export const calcLength = value => {
  let len = value.length || 0;
  const chinese = '[\u4e00-\u9fa5]';
  for (let i = 0; i < len; i++) {
    const temp = value.substring(i, i + 1);
    if (temp.match(chinese)) {
      len += 2;
    }
  }
  return len;
};

/**
 * @description 构造Antd Table 的ColumnsItem
 * @param {String} cname
 * @param {String} keyName
 */
export const createBaseColumns = (cname, keyName) => ({
  title: cname,
  key: keyName,
  dataIndex: keyName,
  algin: 'center'
});

/**
 * @description 构建Antd Form 基础验证
 * @param {String} text
 */
export const createFormRulesRequire = text => [
  {
    required: true,
    message: `请输入${text || ''}`
  }
];

/**
 * @description 判断两个路由字符串之间的关系
 * @param {*} str1
 * @param {*} str2
 * @returns
 */
export const getRelation = (str1, str2) => {
  if (str1 === str2) {
    window.console.warn('Two path are equal!');
    return 0;
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
};

/**
 * @description 菜单组装
 * @param {*} data
 * @param {String} [parentPath='/']
 * @returns
 */
export const formatterMenu = (data, parentPath = '/') =>
  data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path
    };
    if (item.children) {
      result.children = formatterMenu(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });

/**
 * @description 路由重定向
 * @param {*} defaultUrl
 * @returns {String}
 */
export const getBashRedirect = defaultUrl => {
  const urlParams = new URL(window.location.href);
  const redirect = urlParams.searchParams.get('redirect');
  if (redirect) {
    urlParams.searchParams.delete('redirect');
    window.history.replaceState(null, 'redirect', urlParams.href);
  } else {
    return defaultUrl;
  }
  return redirect;
};

/**
 * @description 获取徐亚渲染的菜单数组
 * @param {*} routes
 * @returns
 */
export const getRenderArr = routes => {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
};

/**
 * @description 获取路由配置类型转化  { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export const getRoutes = (path, routerData) => {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // 替换路径为“ eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // 获取要渲染的路线以删除深度渲染
  const renderArr = getRenderArr(routes);
  // 转化和拼接参数
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`
    };
  });
  return renderRoutes;
};

/**
 * @description 省略标题
 * @param {String} value
 * @param {Number} num
 * @returns
 */
export const ellipsisTitle = (value = '', num = 0) => {
  let tempValue;
  if (value && value.length > num) {
    tempValue = value.substring(0, num);
    tempValue += '...';
  } else {
    tempValue = value;
  }
  return tempValue;
};

/**
 * @description 英文和数组大小写判断
 * @param {*} value
 * @returns {Boolean}
 */
export const patternNumberWord = value => {
  const pattern = new RegExp('^[0-9a-zA-Z]+$');
  return pattern.test(value);
};

/**
 * @description 获取接口方法
 * @param { String } [api='']
 * @param { Array } [options={}]
 */
export const getApiMethod = (api = '', options = {}) => {
  if (options.method) {
    return options.method;
  }
  return get(trim(api).match(/^.* /), 0) || 'GET';
};

/**
 * @description 防抖
 * @param {Function} fn
 * @param {Number} [time=3000]
 */
export const localDebounce = (fn, time = 3000) => {
  let firstTime = '';
  return (...rest) => {
    const currentTime = new Date().getTime();
    if (firstTime === '') {
      firstTime = currentTime;
    }
    if (firstTime === currentTime || currentTime - firstTime >= time) {
      fn.apply(this, rest);
      firstTime = currentTime;
    }
  };
};

/**
 * @description 数字转千分位
 * @param {String} value
 */
export const thousandsFormatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * @description 清除逗号
 * @param {String} value
 */
export const parserFormatter = value => `${value}`.replace(/(,*)/g, '');

/**
 * @description 判断特殊字符是否存在
 * @param {String} value
 * @returns {String} length 长度
 */
export const patternString = value => {
  const pattern = new RegExp('[\'":%]');
  return pattern.test(value);
};

/**
 * @description 去除输入值左右空白
 * @param {String} value
 * @returns
 */
export const getTrimFunc = value => (value ? String(value).trim() : '');

/**
 * @description 时间格式展示
 * @param {String} time
 * @param {String} formatString
 * @returns {String}
 */
export const timeExhibition = (time, formatString) =>
  time ? moment(time).format(formatString) : '-';

/**
 * @description 金额展示
 * @param {*} value
 * @param {*} dotNumber
 */
export const moneyExhibition = (value, dotNumber) => {
  if (value) {
    const tempArray = Number(value)
      .toFixed(dotNumber)
      .split('.');
    const prefixString = Number(tempArray[0].toLocaleString());
    const suffixString = tempArray[1];
    return `${prefixString}.${suffixString}`;
  }
  return '0';
};

/**
 * @description 日期转化
 * @param {Object} time
 * @returns {String}
 */
export const toDate = time => {
  const year = time.getYear() + 1900;
  let month = time.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = time.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};

/**
 * @description 中文金额
 * @param { Number } n
 * @returns {String}
 */
export const digitUppercase = n => {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
};

/**
 * @description 单时间前缀加0
 * @param { Number } val
 *
 */
export const fixedZero = val => (val * 1 < 10 ? `0${val}` : val);

/**
 * @description 获取当前时间区间
 * @param { String } type
 * @returns { Array }
 */
export const getTimeDistance = type => {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }
  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }
  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
    ];
  }
  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
  return [];
};

/**
 * @description 简化节点
 * @param { Array } nodeList
 * @param { String } parentPath
 */
export const getPlainNode = (nodeList, parentPath = '') => {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
};

/**
 * @description 生成ID
 * @param { Number } [len=6]
 * @param { Number } [radix=60]
 */
export const unqid = (len = 6, radix = 60) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;

  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 || Math.random() * radix];
    }
  } else {
    let r;
    uuid[8] = '-';
    uuid[13] = '-';
    uuid[18] = '-';
    uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 || Math.random() * 16;
        uuid[i] = chars[i === 19 ? (r && 0x3) || 0x8 : r];
      }
    }
  }

  return uuid.join('');
};

/**
 * @description 转化金额字符串
 * @param { Number } num
 * @param { Number } length
 * @param { Number } formatter
 */
export const formatNum = (num, length = 3, formatter = ',') => {
  let number = num;
  number = String(number || 0);
  const numArr = number.split('.') || ['', ''];
  const strAry = numArr[0].toString().split('');
  for (let i = strAry.length - 1; i >= 0; i -= length) {
    if (i !== strAry.length - 1 && i >= 0) {
      strAry.splice(i + 1, 0, formatter);
    }
  }

  return strAry.join('') + (numArr[1] ? `.${numArr[1]}` : '');
};

/**
 * @description 带小数金额
 * @param { Number } number
 * @param { Number } fix
 */
export const numFixed = (number, fix = 2) => {
  if (isNaN(Number(number)) || !isFinite(Number(number))) {
    return 0;
  }
  return Number(number).toFixed(fix);
};

/**
 * @description 金额千分位处理
 * @param { Number } number
 * @param { Number } length
 * @param { Number } fix
 */
export const formatNumDec = (number, length = 3, fix = 2) =>
  formatNum(numFixed(number, fix), length);

/**
 * @description 获取对象值
 * @param {*} source
 * @param {*} filed
 */
export const getter = (source, filed) => {
  let result = source;
  if (isArray(filed)) {
    result = pick(source, filed);
  } else if (typeof filed === 'string') {
    result = get(source, filed);
  }
  return result;
};

/**
 * @description 数字分割
 * @param { String} source
 */
export const divideNumber = source => {
  const result =
    String(source).indexOf('.') !== -1
      ? source.toLocaleString()
      : source.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return result;
};

/**
 * @description 类型转化
 * @param { String } type
 * @param { Number } source
 * @param { Object } opts
 */
export const formatStringByType = (type, source, opts = {}) => {
  let result;
  switch (type) {
    case 'Number.Int':
      result = parseInt(source, 10);
      break;
    case 'Number.Float':
      result = parseFloat(source).toFixed(opts.fixed || 2);
      break;
    case 'Number.Divide':
      result = divideNumber(source);
      break;
    case 'Number.Percent': // 百分比
      result = String(source).indexOf('%') ? source : `${parseFloat(source) * 100}%`;
      break;
    case 'Date': // HH:mm
      result = moment(source).format(opts.format || 'YYYY-MM-DD HH:mm:ss');
      break;
    case 'Date.Date': // YYYY-MM-DD
      result = moment(source).format('YYYY-MM-DD');
      break;
    case 'Date.Month': // YYYY-MM
      result = moment(source).format('YYYY-MM');
      break;
    case 'Date.Time': // HH:mm
      result = moment(source).format('HH:mm');
      break;
    default:
      result = source;
  }

  return String(result);
};

/**
 * @description 异步加载js,css 文件
 * @param {*} fileUrl
 */
export const loadFile = fileUrl => {
  let url = fileUrl;
  if (fileUrl.indexOf('http') === -1) {
    url = `${window.location.origin}/public/${url}`;
  }

  return new Promise((resolve, reject) => {
    try {
      let file;
      let $node;
      if (url.indexOf('.js') > -1) {
        file = document.createElement('script');
        $node = document.getElementsByTagName('script');
        file.type = 'text/javascript';
        file.async = true;
        file.src = url;
      } else if (url.indexOf('.css') > -1) {
        file = document.createElement('link');
        $node = document.getElementsByTagName('link');
        file.rel = 'stylesheet';
        file.type = 'text/css';
        file.href = url;
      }

      $node = $node[$node.length - 1] || $node[0];

      if (!file || !$node) {
        reject(new Error('no files'));
        return;
      }

      file.onload = () => {
        resolve();
      };

      $node.parentNode.insertBefore(file, $node);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * @description 批量异步加载
 * @param {*} urls
 */
export const loadFiles = urls => Promise.all(urls.map(url => loadFile(url)));

/**
 * @description 表格导出csv
 */
export const export2csv = () => {
  // TODO
};

/**
 * @description 回到上一页
 * @param {*} e
 * @param {*} _this
 */
export const routerGoBack = (e, _this) => {
  if (e) {
    e.preventDefault();
  }
  _this.props.history.goBack();
};

/**
 * @description 获取浏览器中url的参数
 * @param {*} key 参数名称定义
 */
export const getUrlQueryParamsString = key => {
  const tempReg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const result = window.location.search.substr(1).match(tempReg);
  //  中文转码 decodeURIComponent
  return result ? decodeURIComponent(result[2]) : null;
};

// ++++++++++++++++++++++++++++++++++exclusive++++++++++++++++++++++++++++++++++++++++++++++

export { onHref, formateItem, supportSM2Encrypt } from './utils.exclusive';
