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
          <h2 style={{ color: 'black' }}>??????</h2>
          <p>HUMAN - FACTOR</p>
          <p className={styles.featuresDesc}>
            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
          <span className={styles.more}>????????????</span>
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
          <h2>??????</h2>
          <p>DEVICE - FACTOR</p>
          <p className={styles.featuresDesc}>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
          <span className={styles.more}>????????????</span>
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
          <h2>??????</h2>
          <p>ENVIRONMENT - FACTOR</p>
          <p className={styles.featuresDesc}>
            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
          <span style={{ color: '#5885f8' }} className={styles.more}>
            ????????????
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
          <h2>??????</h2>
          <p>TASK - FACTOR</p>
          <p className={styles.featuresDesc}>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
          <span className={styles.more}>????????????</span>
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
    <AppProvider root>
      <div className={styles.homePage}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <div className={styles.left}>
              <FooterLogo className={styles.logo} />
            </div>
            <div className={styles.right}>
              <Link className={styles.linkItem} to={useBaseUrl('docs')}>
                ??????
              </Link>
              <Link className={styles.linkItem} to={useBaseUrl('design')}>
                ??????
              </Link>
              <Link className={styles.linkItem} to={useBaseUrl('templates')}>
                ?????????
              </Link>
            </div>
          </div>
        </div>

        <section className={styles.primarySection}>
          <PrimaryLogo className={styles.logo} />
          <div className={styles.description}>
            <p align="center">
              ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </p>
          </div>
          <div className={styles.beginning}>
            <Link href={useBaseUrl('/docs')} className={styles.beginningLink}>
              ????????????
            </Link>
          </div>
        </section>

        <FeaturesSection />

        <section className={styles.resourcesSection}>
          <h2>???????????????</h2>
          <div className={styles.resourcesGroup}>
            <Link
              className={styles.resource}
              href="https://gw.alipayobjects.com/os/bmw-prod/88515173-0787-4269-a1ad-359fee23bdbe.zip"
            >
              <SketchIcon className={styles.resourceLogo} />
              <span className={styles.name}>Sketch?????????</span>
              <button className={styles.download}>????????????</button>
            </Link>
            <Link
              className={styles.resource}
              href="https://gw.alipayobjects.com/os/bmw-prod/2c62b221-44f0-450b-b8a7-7e21663a2a48.zip"
            >
              <AxureIcon className={styles.resourceLogo} />
              <span className={styles.name}>Axure?????????</span>
              <button className={styles.download}>????????????</button>
            </Link>
            <Link className={styles.resource} to={useBaseUrl('/design/kitchen')}>
              <KitchenIcon className={styles.resourceLogo} />
              <span className={styles.name}>Kitchen</span>
              <button className={styles.download}>????????????</button>
            </Link>
            <Link className={styles.resource} href={useBaseUrl('/docs/icon')}>
              <IconFontIcon className={styles.resourceLogo} />
              <span className={styles.name}>?????????</span>
              <button className={styles.download}>????????????</button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </AppProvider>
  );
}
