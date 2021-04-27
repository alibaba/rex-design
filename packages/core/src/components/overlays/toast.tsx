import { Icon } from '@rexd/icon';
import cx from 'classnames';
import memoizeOne from 'memoize-one';
import React from 'react';
import { defer, fromEvent, merge, Observable, of, Subject, Subscription } from 'rxjs';
import * as op from 'rxjs/operators';
import styled from 'styled-components';
import { mergeRefs } from '../../utils';
import { IOverlayAnimationProps, Overlay } from './overlay';
import { animationFrame$, startAnimate } from './overlay-utils/animate-utils';
import { PositionPlacement } from './position';
import { Toaster } from './toaster';

// TODO 这个文件中的 Partial 和 Required 的用法需要优化

function isFiniteDuration(duration: number) {
  return duration > 0 && Number.isFinite(duration);
}

const ToastDiv = styled.div.withConfig({
  componentId: 'rex-toast',
})`
  position: relative;
  overflow: hidden;
  padding: 16px 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  box-shadow: var(--rex-shadows-lowDown);
  background: var(--rex-overlay-depth-l);
  pointer-events: all;

  &.rex-toast-clickable {
    cursor: pointer;
  }

  .rex-toast-close {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .rex-toast-close-icon {
    display: block;
    color: #999;
    cursor: pointer;

    &:hover {
      color: #333;
    }
  }
`;

const ShrinkingToastDiv = styled.div.withConfig({
  componentId: 'rex-toast-shrinking',
})`
  --animate-duration: 300ms;
  pointer-events: none;
  overflow: hidden;
`;

/** toast 可以从 toaster 中继承过来的属性 */
export interface ToastConfigCommon {
  placement?: PositionPlacement;
  duration?: number;
  canCloseByIcon?: boolean;
  canCloseByClick?: boolean;
  hasProgressBar?: boolean;
}

export interface ToastConfig extends ToastConfigCommon {
  key: string;
  visible: boolean;
  content: React.ReactNode;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export interface ToastProps extends IOverlayAnimationProps {
  toaster: Toaster;
  item: ToastConfig;
}

interface ToastState {
  shrinking: boolean;
}

class ToastHoverHelper {
  static windowFocus$ = defer(() =>
    merge(fromEvent(window, 'focus').pipe(op.mapTo(true)), fromEvent(window, 'blur').pipe(op.mapTo(false))).pipe(
      op.startWith(true),
      op.shareReplay(1),
    ),
  );

  private readonly subject = new Subject<string>();
  handleMouseEnter = () => this.subject.next('enter');
  handleMouseLeave = () => this.subject.next('leave');

  readonly remainingTime$: Observable<number>;

  constructor(readonly duration: number) {
    const hover$ = merge(this.subject.pipe(op.map((s) => s === 'enter'))).pipe(op.startWith(false));

    const timeDelta$ = animationFrame$.pipe(
      op.pairwise(),
      op.map(([prev, next]) => next - prev),
    );

    this.remainingTime$ = isFiniteDuration(duration)
      ? timeDelta$.pipe(
          op.withLatestFrom(ToastHoverHelper.windowFocus$, hover$),
          op.scan((acc, [delta, windowFocus, hover]) => {
            return acc - (windowFocus && !hover ? delta : 0);
          }, duration),
          op.distinctUntilChanged(),
          op.takeWhile((remaining) => remaining > 0, true),
        )
      : of(Infinity);
  }
}

export class Toast extends React.Component<ToastProps, ToastState> {
  private subscription = new Subscription();
  private mergeRefs = memoizeOne(mergeRefs);
  private ref = React.createRef<HTMLDivElement>();
  private shrinkingRef = React.createRef<HTMLDivElement>();
  private remaining: number;

  private hoverHelper: ToastHoverHelper;

  constructor(props: Readonly<ToastProps>) {
    super(props);

    this.state = {
      shrinking: false,
    };

    this.remaining = isFiniteDuration(props.item.duration) ? props.item.duration : Infinity;
    this.hoverHelper = new ToastHoverHelper(props.item.duration);
  }

  // 这里随便写个初始值即可，在实际使用之前会更新为正确的值
  private shrinkingStyle = {
    height: 48,
    marginTop: 12,
    marginBottom: 12,
  };

  private close = () => {
    const { toaster, item } = this.props;
    toaster.close(item.key);
  };

  private clear = () => {
    const { toaster, item } = this.props;
    toaster.clear(item.key);
  };

  private recordShrinkingSize = () => {
    const element = this.ref.current;
    const computedStyle = window.getComputedStyle(element);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    const marginTop = parseFloat(computedStyle.marginBottom);
    const { height } = element.getBoundingClientRect();

    this.shrinkingStyle = {
      height,
      marginTop,
      marginBottom,
    };

    return {};
  };

  private startShrinking = () => {
    this.setState({ shrinking: true });
  };

  componentDidMount() {
    const remainSubscription = this.hoverHelper.remainingTime$.subscribe((remainingTime) => {
      if (remainingTime === Infinity || this.remaining === remainingTime) {
        return;
      }
      if (this.remaining > 0 && remainingTime <= 0) {
        this.close();
        remainSubscription.unsubscribe();
        this.remaining = 0;
        return;
      }
      this.remaining = remainingTime;
    });

    this.subscription.add(remainSubscription);
  }

  componentDidUpdate(prevProps: unknown, prevState: Readonly<ToastState>) {
    const { shrinking } = this.state;
    if (!prevState.shrinking && shrinking) {
      const disposable = startAnimate(this.shrinkingRef.current, Overlay.animations.zeroHeight, () => {
        this.clear();
      });
      this.subscription.add(() => disposable.dispose());
    }
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  private handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { item } = this.props;
    item.onClick(event);
    if (item.canCloseByClick) {
      this.close();
    }
  };

  private renderCloseIcon() {
    const { item } = this.props;
    return (
      item.canCloseByIcon && (
        <div className="rex-toast-close" onClick={this.close}>
          <Icon type="close" className="rex-toast-close-icon" />
        </div>
      )
    );
  }

  render() {
    const { item, animation, animationDuration } = this.props;
    const { shrinking } = this.state;

    if (shrinking) {
      return <ShrinkingToastDiv ref={this.shrinkingRef} style={this.shrinkingStyle} />;
    }

    return (
      <Overlay
        key={item.key}
        overlayKey={item.key}
        visible={item.visible}
        onRequestClose={this.close}
        usePortal={false}
        beforeClose={this.recordShrinkingSize}
        afterClose={this.startShrinking}
        attachOverlayManager={false}
        animation={animation}
        animationDuration={animationDuration}
        renderChildren={({ ref }) => (
          <ToastDiv
            className={cx({ 'rex-toast-clickable': item.canCloseByClick })}
            ref={this.mergeRefs(ref as React.RefObject<HTMLDivElement>, this.ref)}
            onClick={this.handleClick}
            onMouseEnter={this.hoverHelper.handleMouseEnter}
            onMouseLeave={this.hoverHelper.handleMouseLeave}
          >
            {item.content}
            {this.renderCloseIcon()}
          </ToastDiv>
        )}
      />
    );
  }
}
