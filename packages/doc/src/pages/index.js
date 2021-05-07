import React from 'react';
import { AppProvider } from '@rexd/core';
import Footer from '@theme/Footer';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import PrimaryLogo from '../../static/img/primary-logo.svg';
import PrimaryBackground from '../../static/img/primary-background.png';
import HumanFactorBackground from '../../static/img/human-factor-background.png';
import DeviceFactorBackground from '../../static/img/device-factor-background.png';
import TaskFactorBackground from '../../static/img/task-factor-background.png';
import EnvironmentFactorBackground from '../../static/img/environment-factor-background.png';
import SketchIcon from '../../static/img/sketch-icon.svg';
import AxureIcon from '../../static/img/axure-icon.svg';
import KitchenIcon from '../../static/img/kitchen-icon.svg';
import IconFontIcon from '../../static/img/icon-font-icon.svg';
import FooterLogo from '../../static/img/footer-logo.svg';

import styles from './styles.module.scss';

export default function Home() {
  return (
    <AppProvider>
      <div className={styles.homePage}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <div className={styles.left}>
              <FooterLogo />
            </div>
            <div className={styles.right}>
              <Link className={styles.linkItem} to={useBaseUrl('docs')}>
                组件
              </Link>
              <Link className={styles.linkItem} to={useBaseUrl('design')}>
                设计
              </Link>
            </div>
          </div>
        </div>

        <section className={styles.primarySection} style={{ backgroundImage: `url(${PrimaryBackground})` }}>
          <PrimaryLogo className={styles.logo} />
          <div className={styles.description}>
            <p align="center">
              解决设计系统的跨端问题，将影响界面设计的所有要素拆解成人因、机因、法因、环因。一切变化，皆有因果。
            </p>
          </div>
          <div className={styles.beginning}>
            <Link href={useBaseUrl('/docs')} className={styles.beginningLink}>
              开始使用
            </Link>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className={styles.feature} style={{ backgroundImage: `url(${HumanFactorBackground})`, color: '#666' }}>
            <h2 style={{ color: 'black' }}>人因</h2>
            <p>HUMAN - FACTOR</p>
            <br />
            <p>
              新零售业态下，诞生出了大量创新终端，在保证高效跨端体验的同时，如何最大化提升产研效能？
              <br />
              实现真正的一码多端
            </p>
            <Link>了解更多</Link>
          </div>
          <div className={styles.feature} style={{ backgroundImage: `url(${DeviceFactorBackground})` }}>
            <h2>机因</h2>
            <p>DEVICE - FACTOR</p>
            <br />
            <p>
              新零售业态下，诞生出了大量创新终端，在保证高效跨端体验的同时，如何最大化提升产研效能？
              <br />
              实现真正的一码多端
            </p>
            <Link>了解更多</Link>
          </div>
          <div className={styles.feature} style={{ backgroundImage: `url(${TaskFactorBackground})` }}>
            <h2>环因</h2>
            <p>TASK - FACTOR</p>
            <br />
            <p>
              新零售业态下，诞生出了大量创新终端，在保证高效跨端体验的同时，如何最大化提升产研效能？
              <br />
              实现真正的一码多端
            </p>
            <Link>了解更多</Link>
          </div>
          <div className={styles.feature} style={{ backgroundImage: `url(${EnvironmentFactorBackground})` }}>
            <h2>法因</h2>
            <p>ENVIRONMENT - FACTOR</p>
            <br />
            <p>
              新零售业态下，诞生出了大量创新终端，在保证高效跨端体验的同时，如何最大化提升产研效能？
              <br />
              实现真正的一码多端
            </p>
            <Link>了解更多</Link>
          </div>
        </section>

        <section className={styles.resourcesSection}>
          <h1>工具和资源</h1>
          <div className={styles.resourcesGroup}>
            <div className={styles.resource}>
              <SketchIcon />
              <span className={styles.name}>Sketch资源包</span>
              <button className={styles.download}>立即下载</button>
            </div>
            <div className={styles.resource}>
              <AxureIcon />
              <span className={styles.name}>Axure资源包</span>
              <button className={styles.download}>立即下载</button>
            </div>
            <div className={styles.resource}>
              <KitchenIcon />
              <span className={styles.name}>Kitchen</span>
              <button className={styles.download}>立即下载</button>
            </div>
            <div className={styles.resource}>
              <IconFontIcon />
              <span className={styles.name}>Iconfont</span>
              <button className={styles.download}>立即下载</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </AppProvider>
  );
}
