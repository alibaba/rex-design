import cx from 'classnames';
import React from 'react';
import { BehaviorSubject, combineLatest, merge, of, Subscription } from 'rxjs';
import * as op from 'rxjs/operators';
import { noop, shallowEqual } from '../../utils';
import { domUtils } from '../virtual-list/dom-utils';

interface AffixInternalState {
  mode: 'none' | 'top' | 'bottom';
  scrollThreshold: number;
}

export interface AffixProps {
  /** 指定吸附至滚动容器顶部的偏移量 */
  offsetTop?: number;

  /** 指定吸附至滚动容器底部的偏移量 */
  offsetBottom?: number;

  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;

  /** 吸附状态发生变化时的回调 */
  onAffix?(affixed: boolean): void;
}

function getBoundingClientRect(target: HTMLElement | Window) {
  if (domUtils.isWindow(target)) {
    return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  } else {
    return target.getBoundingClientRect();
  }
}

function getScrollTop(target: HTMLElement | Window) {
  if (domUtils.isWindow(target)) {
    return target.scrollY;
  } else {
    return target.scrollTop;
  }
}

export class Affix extends React.Component<AffixProps> {
  private props$ = new BehaviorSubject<AffixProps>(this.props);
  private subscription: Subscription;
  private targetRef = React.createRef<HTMLElement>();

  static defaultProps = {
    onAffix: noop,
  };

  componentDidMount() {
    const instruction$ = this.props$.pipe(
      op.map(() => {
        const target = this.targetRef.current;
        const container = domUtils.listScrollParents(target)[0] as HTMLElement | Window;
        return { container, target };
      }),
      op.distinctUntilChanged(shallowEqual),
      op.switchMap(({ target, container }) => {
        const events$ = merge(
          of('init'),
          ...(domUtils.listScrollParents(target) as Array<HTMLElement | Window>)
            // domUtils.listScrollParents 得到的最后一个元素总是为 visualViewport，这里我们不需要该元素
            .slice(0, -1)
            .map(domUtils.fromScrollEvent),
        );

        const config$ = this.props$.pipe(
          op.map((props) => ({ offsetTop: props.offsetTop, offsetBottom: props.offsetBottom })),
          op.distinctUntilChanged(shallowEqual),
        );

        const state: AffixInternalState = { mode: 'none', scrollThreshold: 0 };

        return combineLatest([events$, config$]).pipe(
          op.tap(([_event, { offsetTop, offsetBottom }]) => {
            const targetRect = getBoundingClientRect(target);
            const containerRect = getBoundingClientRect(container);
            const actualOffsetTop = targetRect.top - containerRect.top;
            const actualOffsetBottom = containerRect.top + containerRect.height - (targetRect.top + targetRect.height);
            const containerScroll = getScrollTop(container);

            if (offsetTop != null) {
              // top --> none
              if (state.mode === 'top' && containerScroll < state.scrollThreshold) {
                target.style.position = '';
                target.style.top = '';
                target.style.width = '';
                state.mode = 'none';
                this.props.onAffix(false);
                return;
              }

              // re-affix if parent container scrolls
              if (state.mode === 'top' && actualOffsetTop !== offsetTop) {
                target.style.top = `${containerRect.top + offsetTop}px`;
                return;
              }

              // none --> top
              if (state.mode === 'none' && actualOffsetTop < offsetTop) {
                target.style.position = 'fixed';
                target.style.top = `${containerRect.top + offsetTop}px`;
                target.style.width = `${targetRect.width}px`;

                state.mode = 'top';
                state.scrollThreshold = getScrollTop(container) - (offsetTop - actualOffsetTop);
                this.props.onAffix(true);
                return;
              }
            } else if (offsetBottom != null) {
              // bottom --> none
              if (state.mode === 'bottom' && containerScroll > state.scrollThreshold) {
                target.style.position = '';
                target.style.top = '';
                target.style.width = '';
                state.mode = 'none';
                this.props.onAffix(false);
                return;
              }

              // re-affix if parent container scrolls
              if (state.mode === 'bottom' && actualOffsetBottom !== offsetBottom) {
                target.style.top = `${containerRect.top + containerRect.height - offsetBottom - targetRect.height}px`;
                return;
              }

              // none --> bottom
              if (state.mode === 'none' && actualOffsetBottom < offsetBottom) {
                target.style.position = 'fixed';
                target.style.top = `${containerRect.top + containerRect.height - offsetBottom - targetRect.height}px`;
                target.style.width = `${targetRect.width}px`;

                state.mode = 'bottom';
                state.scrollThreshold = getScrollTop(container) + (offsetBottom - actualOffsetBottom);
                this.props.onAffix(true);
                return;
              }
            }
          }),
        );
      }),
    );

    this.subscription = instruction$.subscribe();
  }

  componentDidUpdate() {
    this.props$.next(this.props);
  }

  componentWillUnmount() {
    this.props$.complete();
    this.subscription.unsubscribe();
  }

  render() {
    const { children, style, className } = this.props;
    return (
      <div ref={this.targetRef as React.RefObject<HTMLDivElement>} className={cx('rex-affix', className)} style={style}>
        {children}
      </div>
    );
  }
}
