import React, { useState } from 'react';
import cx from 'classnames';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { AppProvider } from '@rexd/core';
import Footer from '@theme/Footer';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import PrimaryLogo from '../../static/img/primary-logo.svg';
import SketchIcon from '../../static/img/sketch-icon.svg';
import AxureIcon from '../../static/img/axure-icon.svg';
import KitchenIcon from '../../static/img/kitchen-icon.svg';
import IconFontIcon from '../../static/img/icon-font-icon.svg';
import FooterLogo from '../../static/img/footer-logo.svg';

import styles from './styles.module.scss';

const T = 700;

class Timing {
  handle = null;

  // idle / active / exiting
  stage = 'idle';

  startTime = 0;
  startY = 0;
  currentY = 0;

  constructor() {
    makeAutoObservable(this);
  }

  enter = () => {
    if (this.stage === 'idle' || this.stage === 'exiting') {
      const now = performance.now();

      if (this.stage === 'exiting') {
        if (this.startY > 0) {
          this.stage = 'active';
          this.startTime = now - this.currentY * T;
          this.startY = this.currentY;
        } else {
          this.stage = 'active';
          this.startTime = now - (2 - this.currentY) * T;
          this.startY = this.currentY;
        }
      } else {
        // idle
        this.stage = 'active';
        this.startTime = now;
        this.startY = this.currentY = 0;
      }

      cancelAnimationFrame(this.handle);
      this.handle = requestAnimationFrame(this.activeTick);
    }
  };

  leave = () => {
    this.stage = 'exiting';
    this.startTime = performance.now();
    this.startY = this.currentY;

    cancelAnimationFrame(this.handle);
    this.handle = requestAnimationFrame(this.activeTick);
  };

  activeTick = () => {
    const now = performance.now();
    const timeDelta = now - this.startTime;

    if (this.stage === 'active') {
      let nextY;
      const remainder = timeDelta % (4 * T);
      if (remainder < T) {
        nextY = remainder / T;
      } else if (T <= remainder && remainder < 3 * T) {
        nextY = 1 - (remainder - T) / T;
      } else {
        nextY = -1 + (remainder - 3 * T) / T;
      }

      this.currentY = nextY;
      this.handle = requestAnimationFrame(this.activeTick);
    } else if (this.stage === 'exiting') {
      if (this.startY > 0) {
        this.currentY = this.startY - timeDelta / T;
        if (this.currentY < 0) {
          this.stage = 'idle';
          this.currentY = 0;
        } else {
          this.handle = requestAnimationFrame(this.activeTick);
        }
      } else {
        this.currentY = this.startY + timeDelta / T;
        if (this.currentY > 0) {
          this.stage = 'idle';
          this.currentY = 0;
        } else {
          this.handle = requestAnimationFrame(this.activeTick);
        }
      }
    }
  };
}

const FeaturesSection = observer(() => {
  const [humanTiming] = useState(() => new Timing());
  const [deviceTiming] = useState(() => new Timing());
  const [envTiming] = useState(() => new Timing());
  const [taskTiming] = useState(() => new Timing());

  return (
    <section className={styles.featuresSection}>
      <Link href={useBaseUrl('/design/mfdt')}>
        <div
          className={cx(styles.feature, styles.featureHumanFactor)}
          style={{ color: '#666' }}
          onMouseEnter={humanTiming.enter}
          onMouseLeave={humanTiming.leave}
        >
          <h2 style={{ color: 'black' }}>人因</h2>
          <p>HUMAN - FACTOR</p>
          <p className={styles.featuresDesc}>
            最基本的交互距离，操作模态，以及对于用户视弱，色盲，重听等障碍因素，都会影响到界面的表达。
          </p>
          <span className={styles.more}>了解更多</span>
          <div
            className={styles.movingItem}
            style={{
              backgroundImage: `url(https://img.alicdn.com/imgextra/i2/O1CN01ISK9g41D0ZfhNAtXd_!!6000000000154-2-tps-720-1440.png)`,
              transform: `translate(0, ${-humanTiming.currentY * 3}%)`,
            }}
          />
        </div>
      </Link>
      <Link to={useBaseUrl('/design/mfdt')}>
        <div
          className={cx(styles.feature, styles.featureDeviceFactor)}
          onMouseEnter={deviceTiming.enter}
          onMouseLeave={deviceTiming.leave}
        >
          <h2>机因</h2>
          <p>DEVICE - FACTOR</p>
          <p className={styles.featuresDesc}>
            设备是设计系统考量的最关键因素，从设备的分辨率，输入形式和输出信道到设备形态，都涉及到相应的响应和适配规则。
          </p>
          <span className={styles.more}>了解更多</span>
          <div
            className={styles.movingItem}
            style={{
              backgroundImage: `url(https://img.alicdn.com/imgextra/i4/O1CN01npTqD61Zkl9wiJJuY_!!6000000003233-2-tps-720-1440.png)`,
              transform: `translate(0, ${-deviceTiming.currentY * 3}%)`,
            }}
          />
        </div>
      </Link>
      <Link to={useBaseUrl('/design/mfdt')}>
        <div
          className={cx(styles.feature, styles.featureEnvironmentFactor)}
          onMouseEnter={envTiming.enter}
          onMouseLeave={envTiming.leave}
        >
          <h2>环因</h2>
          <p>ENVIRONMENT - FACTOR</p>
          <p className={styles.featuresDesc}>
            环境对界面的影响是渐进式的，如环境光线的强弱变化，环境噪音和温湿度的高低，都会被纳入到对界面设计的考量中。
          </p>
          <span style={{ color: '#5885f8' }} className={styles.more}>
            了解更多
          </span>
          <div
            className={styles.movingItem}
            style={{
              backgroundImage: `url(https://img.alicdn.com/imgextra/i3/O1CN019ey9961VvVzrWs3VS_!!6000000002715-2-tps-720-1454.png)`,
              transform: `translate(0, ${-envTiming.currentY * 3}%)`,
            }}
          />
        </div>
      </Link>
      <Link to={useBaseUrl('/design/mfdt')}>
        <div
          className={cx(styles.feature, styles.featureTaskFactor)}
          onMouseEnter={taskTiming.enter}
          onMouseLeave={taskTiming.leave}
        >
          <h2>法因</h2>
          <p>TASK - FACTOR</p>
          <p className={styles.featuresDesc}>
            我们会区分出信息的高低密度，操作的移动和静止，容错性和难易度的高低，从而匹配不同的设计策略。
          </p>
          <span className={styles.more}>了解更多</span>
          <div
            className={styles.movingItem}
            style={{
              backgroundImage: `url(https://img.alicdn.com/imgextra/i1/O1CN01LrO5Vg1FpWyA4P0Jm_!!6000000000536-2-tps-720-1440.png)`,
              transform: `translate(0, ${-taskTiming.currentY * 3}%)`,
            }}
          />
        </div>
      </Link>
    </section>
  );
});

export default function Home() {
  return (
    <AppProvider>
      <div className={styles.homePage}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <div className={styles.left}>
              <FooterLogo className={styles.logo} />
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

        <section className={styles.primarySection}>
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

        <FeaturesSection />

        <section className={styles.resourcesSection}>
          <h2>工具和资源</h2>
          <div className={styles.resourcesGroup}>
            <Link
              className={styles.resource}
              href="https://gw.alipayobjects.com/os/bmw-prod/88515173-0787-4269-a1ad-359fee23bdbe.zip"
            >
              <SketchIcon className={styles.resourceLogo} />
              <span className={styles.name}>Sketch资源包</span>
              <button className={styles.download}>立即下载</button>
            </Link>
            <Link
              className={styles.resource}
              href="https://gw.alipayobjects.com/os/bmw-prod/2c62b221-44f0-450b-b8a7-7e21663a2a48.zip"
            >
              <AxureIcon className={styles.resourceLogo} />
              <span className={styles.name}>Axure资源包</span>
              <button className={styles.download}>立即下载</button>
            </Link>
            <Link className={styles.resource} to={useBaseUrl('/design/kitchen')}>
              <KitchenIcon className={styles.resourceLogo} />
              <span className={styles.name}>Kitchen</span>
              <button className={styles.download}>立即查看</button>
            </Link>
            <Link className={styles.resource} href={useBaseUrl('/docs/icon')}>
              <IconFontIcon className={styles.resourceLogo} />
              <span className={styles.name}>图标库</span>
              <button className={styles.download}>立即查看</button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </AppProvider>
  );
}
