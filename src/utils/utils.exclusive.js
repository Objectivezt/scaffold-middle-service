/*
 * @Author: objectivezt
 * @Date: 2018-08-15 10:25:34
 * @Last Modified by: objectivezt
 * @Last Modified time: 2020-08-04 17:34:16
 */

/**
 * @description 加密
 */
export const supportSM2Encrypt = () => {
  const agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf('compatible') > -1 || agent.indexOf('msie') > -1) {
    const IEVersion = RegExp.$1;
    return parseFloat(IEVersion) > 8.0;
  }

  if (
    agent.indexOf('opera') > -1 ||
    agent.indexOf('firefox') > -1 ||
    agent.indexOf('chrome') > -1 ||
    agent.indexOf('trident') > -1
  ) {
    return true;
  }

  if (agent.indexOf('safari') > -1) {
    return false;
  }
  return false;
};


/** 
 * @description 链接跳转
 */
export const onHref = () => {
  // TODO
};

/** 
 * @description 系统菜单转化
 */
export const formateItem = () => {
  // TODO
}
