import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import FooterLogo from '../../../static/img/footer-logo.svg';
import Qrcode from '../../../static/img/qrcode.png';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.scss';

export default function Footer() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <section className={styles.footerSection}>
      <div className={styles.footer}>
        <div className={styles.footerLinkColumn} style={{ flex: '1 1 auto' }}>
          <FooterLogo />
        </div>

        <div className={styles.footerLinkColumnGroup} style={{ flex: '4 4 auto' }}>
          <div className={styles.footerLinkColumn} style={{ flex: '2 2 0' }}>
            <span className={styles.groupTitle}>文档</span>
            <Link to={useBaseUrl('docs')}>组件</Link>
            <Link to={useBaseUrl('design')}>设计</Link>
          </div>
          <div className={styles.footerLinkColumn} style={{ flex: '2 2 0' }}>
            <span className={styles.groupTitle}>更多</span>
            <Link href={siteConfig.url}>GitHub</Link>
            <Link href="https://docusaurus.io/">Docusaurus</Link>
          </div>
          <div className={styles.footerLinkColumn} style={{ flex: '0 0 auto' }}>
            <span className={styles.groupTitle}>联系我们</span>
            <img
              alt="qrcode"
              src={Qrcode}
              width="120"
              height="120"
              style={{ marginTop: 20, userSelect: 'none' }}
              draggable={false}
            />
          </div>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        Copyright © 2021 Alibaba Inc.
        <br className={styles.mobileBreak} />
        Built with ❤️ by hema-FE.
      </div>
    </section>
  );
}
