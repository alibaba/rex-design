import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';
import { animationFrameScheduler, defer, fromEvent, of, Subscription } from 'rxjs';
import * as op from 'rxjs/operators';
import { action, makeAutoObservable, runInAction } from 'mobx';
import { observer } from 'mobx-react';

function Image({ src, alt, ...others }) {
  return <img src={src} alt={alt} {...others} style={{ userSelect: 'none', ...others.style }} draggable={false} />;
}

function GoIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 26 26"
      {...props}
      style={{ verticalAlign: -2, ...props.style }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        transform="translate(1.4 1.5)"
      >
        <rect width="22.9" height="22.9" rx="1.9" />
        <path d="M8.3 5l6.3 6.5-6.3 6.3" />
      </g>
    </svg>
  );
}

const danmakuConfig = [
  { keywords: '单手操作，管理角色，和缓，执行角色，色弱，听觉障碍'.split('，'), speed: 30 / 1000, x: 0 },
  {
    keywords: '亲密视距，信息密度高，串行低并发，静态操作，移动操作，实时高并发'.split('，'),
    speed: 40 / 1000,
    x: 220,
  },
  { keywords: '简单重复，复杂灵活，高容错，高频，高分辨率，大屏幕尺寸'.split('，'), speed: 50 / 1000, x: 440 },
  { keywords: '键鼠交互，触控交互，语音交互，震动设备，近场台式，穿戴设备'.split('，'), speed: 20 / 1000, x: 0 },
  { keywords: '户外高干扰，明亮环境，高噪音，暗黑环境，低温作业，室内低干扰'.split('，'), speed: 20 / 1000, x: 660 },
];

// item.keywords 中包含 6 条弹幕
const DANMAKU_PER_ITEM = 6;

// 每条弹幕的宽度为 500px(pc端) 或 (500/3)px(phone端)
const DANMAKU_WIDTH = 500;

// 考虑屏幕的最大宽度为 4000px（phone 最宽为 1000px，所以只需要考虑 pc 端特别宽就可以了）
const MAX_SCREEN_WIDTH = 4000;

// 至少覆盖两倍的宽度 才能无限滚动
const MULTIPLIER = 2;

// REPEAT 表示 弹幕整体需要重复的次数
const REPEAT = Math.ceil((MAX_SCREEN_WIDTH * MULTIPLIER) / DANMAKU_WIDTH / DANMAKU_PER_ITEM);
const TURNAROUND = DANMAKU_WIDTH * DANMAKU_PER_ITEM;

class DanmakuModel {
  _rootSubscription = new Subscription();
  lastScroll = 0;
  lastDirection = true;

  constructor(config) {
    this.config = config;
    makeAutoObservable(this);
  }

  dispose() {
    this._rootSubscription.unsubscribe();
  }

  setup() {
    runInAction(() => {
      this.lastScroll = window.scrollY;
    });

    const animationFrame$ = defer(() => of(performance.now())).pipe(op.observeOn(animationFrameScheduler), op.repeat());

    const scroll$ = fromEvent(document, 'scroll', { passive: true });

    this._rootSubscription.add(
      scroll$.subscribe(
        action(() => {
          const nextScroll = window.scrollY;
          const nextDirection = this.lastScroll > nextScroll;

          for (const item of this.config) {
            const delta = item.speed * (nextScroll - this.lastScroll);
            item.x += delta * 4;
          }

          this.lastScroll = nextScroll;
          this.lastDirection = nextDirection;
        }),
      ),
    );

    this._rootSubscription.add(
      animationFrame$
        .pipe(
          op.pairwise(),
          op.map(([prev, next]) => next - prev),
        )
        .subscribe(
          action((delta) => {
            for (const item of this.config) {
              const dir = this.lastDirection ? -1 : 1;
              item.x += dir * item.speed * delta;
            }
          }),
        ),
    );
  }
}

// 求余数；该函数总是返回一个 大于等于 0 的数字
function remainder(x, t) {
  if (t < 0) {
    return remainder(x, -t);
  }
  x = x % t;
  if (x < 0) {
    x += t;
  }
  return x;
}

const DanmakuSection = observer(() => {
  const [model] = React.useState(() => new DanmakuModel(danmakuConfig));

  useEffect(() => {
    model.setup();

    return () => {
      model.dispose();
    };
  }, [model]);

  return (
    <section className={styles.danmakuSection}>
      <div className={styles.danmakuContainer}>
        {model.config.map((item, itemIndex) => {
          return (
            <div
              key={itemIndex}
              className={styles.danmakuRow}
              style={{ transform: `translateX(${-remainder(item.x, TURNAROUND)}px)` }}
            >
              {_.range(REPEAT).map((i) => (
                <React.Fragment key={i}>
                  {item.keywords.map((keyword, keywordIndex) => (
                    <div key={keyword} className={cx(styles.danmakuItem, { [styles.stroke]: keywordIndex % 2 === 1 })}>
                      {keyword}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
});

function useWindowScroll() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    setScroll(window.scrollY);

    const handler = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener('scroll', handler, { passive: true });

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return scroll;
}

function Home() {
  const scroll = useWindowScroll();

  const getBgrate = d3.scaleLinear().domain([0, 300]).range([20, 0]).clamp(true);

  return (
    <Layout title="rex-design" description="rex-design: TODO">
      <section className={styles.primarySection}>
        <div className={styles.left}>
          <h1>
            Multi-Factor Design
            <br />
            重塑中后台跨端体验
          </h1>
          <p style={{}}>
            解决设计系统的跨端问题，我们从最基本的元素因子开始，MFDT
            理论，将影响界面设计的所有要素拆解成人因、机因、法因、环因。
            <br />
            一切变化，皆有因果。
          </p>
          <div className={styles.docsLinkGroup}>
            <Link href={useBaseUrl('design/colors')} className={styles.docsLink}>
              设计文档
            </Link>
            <Link href={useBaseUrl('design/principles')} className={cx(styles.docsLink, styles.designDocsLink)}>
              设计原则
            </Link>
          </div>
        </div>

        <div className={styles.right}>
          <Image
            src="https://img.alicdn.com/imgextra/i1/O1CN011ognx024UVB6zye7M_!!6000000007394-54-tps-800-600.apng"
            alt="rex-design-principles"
          />
        </div>
      </section>

      <section
        className={styles.videoSectionWrapper}
        style={{
          '--bgrate': `${getBgrate(scroll)}%`,
        }}
      >
        <div className={styles.videoSection}>
          <div className={styles.videoWrapper}>
            <video
              // eslint-disable-next-line no-undef
              autoPlay={process.env.NODE_ENV === 'production'}
              controls
            >
              <source
                type="video/mp4"
                src="https://gw.alipayobjects.com/mdn/rms_6b2e87/afts/file/A*urU0RZ5_PJIAAAAAAAAAAAAAARQnAQ"
              />
            </video>
          </div>
        </div>
      </section>

      <section className={styles.universeSection}>
        <div className={styles.left}>
          <h2>一套代码 多端适配</h2>
          <p>
            新零售业态下，诞生出了大量创新终端，在保证高效跨端体验的同时，如何最大化提升产研效能？
            <br />
            实现真正的一码多端
          </p>
          <a
            href="#"
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            代码开源 敬请期待 <GoIcon style={{ marginLeft: 4 }} />
          </a>
        </div>

        <div className={styles.right}>
          <Image
            src="https://img.alicdn.com/imgextra/i1/O1CN01DXuUa71Y5i24Dsmun_!!6000000003008-54-tps-800-600.apng"
            alt="universe"
          />
        </div>
      </section>

      <DanmakuSection />

      <section className={styles.assetsSection}>
        <div className={styles.left}>
          <h2>设计资源</h2>
          <p>
            这里提供 ReX Design OS
            相关设计资源的下载，包含从底层色板、圆角、阴影的定义到海量场景样板间，以及更多生动的新零售情感化素材。
          </p>
          <Link href={useBaseUrl('design/elevation')}>
            了解更多 <GoIcon style={{ marginLeft: 4 }} />
          </Link>
        </div>

        <div className={styles.right}>
          <Image
            src="https://img.alicdn.com/imgextra/i1/O1CN012ieXJj1VNAHK6WK0M_!!6000000002640-54-tps-796-557.apng"
            alt="universe"
          />
        </div>
      </section>
    </Layout>
  );
}

export default Home;
