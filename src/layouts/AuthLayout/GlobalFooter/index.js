/*
 * @Author: objectivezt
 * @Date: 2018-09-05 17:36:09
 * @Last Modified by:   objectivezt
 * @Last Modified time: 2020-08-04 17:36:09
 */
import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <div className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </div>
  );
};

export default GlobalFooter;
