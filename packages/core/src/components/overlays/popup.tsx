import * as Popper from '@popperjs/core';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { composeHandlers, pick } from '../../utils';
import {
  IOverlayCloseActions,
  IOverlayLifecycles,
  IOverlayBackdropProps,
  Overlay,
  OverlayProps,
  IOverlayAnimationProps,
} from './overlay';
import { animations } from './overlay-utils/animations';
import { batchedUpdates } from './overlay-utils/batchUpdate';
import { HoverManager } from './overlay-utils/HoverManager';

export type PopupPlacement = Popper.Placement;

const ARROW_SIZE = 10;
const ARROW_PADDING = 10;
const ARROW_OFFSET = 12;

// popup 触发元素的默认渲染方法（inline-block div）
const defaultRenderTrigger: PopupProps['renderTrigger'] = ({ trigger, triggerType, ...props }) => {
  return (
    <div {...props} style={{ display: 'inline-block' }}>
      {trigger}
    </div>
  );
};

const defaultRenderChildren: PopupProps['renderChildren'] = ({ children, ref, arrow }) => (
  <div ref={ref as React.RefObject<HTMLDivElement>}>
    {arrow}
    {children}
  </div>
);

const popperAutoSizeModifier = ({
  autoWidth,
  autoHeight,
}: {
  autoWidth: boolean;
  autoHeight: boolean;
}): Popper.Modifier<'popperAutoSizeModifier', {}> => ({
  name: 'popperAutoSizeModifier',
  enabled: true,
  phase: 'beforeWrite' as Popper.ModifierPhases,
  requires: ['computeStyles'],
  fn: ({ state }: Popper.ModifierArguments<{}>) => {
    if (autoWidth) {
      state.styles.popper.minWidth = `${state.rects.reference.width}px`;
    }
    if (autoHeight) {
      state.styles.popper.minHeight = `${state.rects.reference.height}px`;
    }
  },
});

const arrowModifier: Partial<Popper.Modifier<'arrow', { padding: number }>> = {
  name: 'arrow',
  // arrow modifier 总是开启的，但最终是否渲染箭头由「是否存在 DOM 中的对应节点」决定
  enabled: true,
  options: { padding: ARROW_PADDING },
};

const adjustArrowStyleModifier: Popper.Modifier<'adjustArrowStyle', {}> = {
  name: 'adjustArrowStyle',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['arrow'],
  fn({ state }) {
    const { arrow } = state.elements;
    if (!arrow) {
      return;
    }

    if (state.attributes.arrow == null) {
      state.attributes.arrow = {};
    }
    state.attributes.arrow['data-popper-placement'] = state.placement;
    if (state.placement.startsWith('top')) {
      state.styles.arrow.bottom = '0';
      state.elements.popper.style.setProperty('--rex-popup-arrow-position', `${state.modifiersData.arrow.x}px bottom`);
    }
    if (state.placement.startsWith('right')) {
      state.styles.arrow.left = '0';
      state.elements.popper.style.setProperty('--rex-popup-arrow-position', `left ${state.modifiersData.arrow.y}px`);
    }
    if (state.placement.startsWith('bottom')) {
      state.styles.arrow.top = '0';
      state.elements.popper.style.setProperty('--rex-popup-arrow-position', `${state.modifiersData.arrow.x}px top`);
    }
    if (state.placement.startsWith('left')) {
      state.styles.arrow.right = '0';
      state.elements.popper.style.setProperty('--rex-popup-arrow-position', `right ${state.modifiersData.arrow.y}px`);
    }
  },
};

const StyledOverlay = styled(Overlay)`
  > .rex-popup-content {
    position: absolute;
    z-index: 1000;

    > * {
      background-color: var(--rex-popup-bgcolor, var(--rex-overlay-depth-m));
    }
  }

  .rex-popup-arrow {
    user-select: none;

    &::before {
      content: '';
      position: absolute;
      width: ${ARROW_SIZE}px;
      height: ${ARROW_SIZE}px;
      transform-origin: center center;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: var(--rex-popup-bgcolor, var(--rex-overlay-depth-m));
    }

    &[data-popper-placement^='top']::before {
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.06);
    }
    &[data-popper-placement^='right']::before {
      box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.06);
    }
    &[data-popper-placement^='bottom']::before {
      box-shadow: -2px -2px 3px 0 rgba(0, 0, 0, 0.06);
    }
    &[data-popper-placement^='left']::before {
      box-shadow: 2px -2px 3px 0 rgba(0, 0, 0, 0.06);
    }
  }
`;

export interface PopupChildrenRenderArgs {
  ref: React.RefObject<Element>;
  children: React.ReactNode;
  arrow?: React.ReactNode;
}

export interface PopupTriggerRenderParams {
  ref: React.RefObject<any>;
  onClick(e: React.MouseEvent): void;
  onMouseEnter(e: React.MouseEvent): void;
  onMouseLeave(e: React.MouseEvent): void;

  trigger?: React.ReactNode;
  triggerType?: PopupProps['triggerType'];
  // todo triggerStyle, triggerElement, triggerProps
}

// TODO 需要添加 clickTargetOnly / hoverTargetOnly 类型
export type PopupTriggerType = 'hover' | 'click' | Array<'hover' | 'click'>;

export interface PopupProps
  extends IOverlayCloseActions,
    IOverlayLifecycles,
    IOverlayBackdropProps,
    IOverlayAnimationProps {
  /** 是否显示弹层 */
  visible?: boolean;

  /** 弹层是否默认显示 */
  defaultVisible?: boolean;

  /** 弹层请求关闭时触发事件的回调函数 */
  onRequestClose?(reason: any): void;

  /** 弹层请求打开时触发事件的回调函数 */
  onRequestOpen?(reason: any): void;

  /** 弹层方向 */
  placement?: PopupPlacement;

  renderTrigger?(params: PopupTriggerRenderParams): React.ReactNode;

  /** 触发弹层显示或者隐藏的元素 */
  trigger?: React.ReactNode;

  /** 触发弹层显示或隐藏的操作类型，可以是 'click'，'hover'，或者它们组成的数组，如 ['hover', 'click'] */
  triggerType?: PopupTriggerType;

  /** 鼠标悬停触发弹层显示或隐藏的超时时间 */
  hoverDelay?: number;

  /** 是否使用 portal 来渲染弹层内容 */
  usePortal?: boolean;

  /** 渲染组件的容器 */
  portalContainer?: HTMLElement;

  /** 弹层的根节点的样式类 */
  wrapperClassName?: string;

  /** 弹层的根节点的内联样式 */
  wrapperStyle?: React.CSSProperties;

  style?: React.CSSProperties;
  className?: string;

  hasArrow?: boolean;

  /** 弹层内容 */
  children?: React.ReactNode;

  /** 使用 render prop 的形式指定弹层内容，用于精确控制 DOM 结构 */
  renderChildren?(pass: PopupChildrenRenderArgs): React.ReactNode;

  /** 弹层翻转 是否允许弹层翻转 */
  flip?: boolean;

  /** 弹层相对于 trigger 位置的偏移量 */
  offset?: [skidding: number, distance: number];

  /** 将弹层的最小宽度设置为 trigger 的宽度 */
  autoWidth?: boolean;

  /** 将弹层的最小高度设置为 trigger 的高度 */
  autoHeight?: boolean;

  /** 为不同的方向设置不同的弹层打开动画 */
  animationDict?: Partial<{ [placement in PopupPlacement]: OverlayProps['animation'] }>;

  /** 弹层的打开方向（如果 animationDict 中缺少当前方向的打开方向的话，则会使用该 prop 指定的动画） */
  animation?: OverlayProps['animation'];

  disableScroll?: boolean | 'force';
}

interface PopupState {
  visible: boolean;
}

/**
 * 弹层组件，根据 placement/strategy/flip/offset 等配置，将 content 放置在 trigger 的旁边。
 *
 * ```
 *  <Popup trigger={trigger} placement="bottom" offset={[0, 16]}>{content}</Popup>：
 *
 *      ┌─────────────────────┐
 *      │                     │ <┄┄┄ trigger
 *      └─────────────────────┘
 *  ╔═════════════════════════════╗
 *  ║                             ║
 *  ║                             ║ <┄┄┄ content/children
 *  ║                             ║
 *  ╚═════════════════════════════╝
 * ```
 */
export class Popup extends React.Component<PopupProps, PopupState> {
  static defaultRenderTrigger = defaultRenderTrigger;

  static defaultRenderChildren = defaultRenderChildren;

  static defaultAnimation: PopupProps['animation'] = {
    in: animations.expandInDown,
    out: animations.expandOutUp,
  };

  static defaultAnimationDict: PopupProps['animationDict'] = {
    top: {
      in: animations.expandInUp,
      out: animations.expandOutDown,
    },
    'top-start': {
      in: animations.expandInUp,
      out: animations.expandOutDown,
    },
    'top-end': {
      in: animations.expandInUp,
      out: animations.expandOutDown,
    },
  };

  static defaultProps = {
    placement: 'bottom-start',
    strategy: 'absolute',
    flip: true,
    autoWidth: false,
    autoHeight: false,
    usePortal: true,
    canCloseByEsc: true,
    canCloseByOutSideClick: true,
    offset: [0, 0],
    triggerType: 'click',
    hoverDelay: 120,
    renderTrigger: Popup.defaultRenderTrigger,
    renderChildren: Popup.defaultRenderChildren,
    animation: Popup.defaultAnimation,
    animationDict: Popup.defaultAnimationDict,
  };

  private popper: Popper.Instance | null = null;

  private contentRef = React.createRef<HTMLElement>();

  private referenceRef = React.createRef<Element>();

  /** 上次使用的定位参考元素，用于判断参照元素是否发生了变化，发生变化时需要重新创建 popper 实例 */
  private lastReference: Element = null;

  constructor(props: PopupProps) {
    super(props);

    this.state = {
      visible: props.visible ?? props.defaultVisible,
    };

    this.setupHoverInteraction();
  }

  static getDerivedStateFromProps(props: PopupProps, state: PopupState) {
    if (props.visible != null) {
      return { visible: props.visible };
    }
    return null;
  }

  // 是否支持 非受控的鼠标悬停交互
  private supportsHover() {
    const { triggerType } = this.props;
    return typeof triggerType === 'string' ? triggerType === 'hover' : triggerType.includes('hover');
  }

  // 是否支持 非受控的鼠标点击交互
  private supportsClick() {
    const { triggerType } = this.props;
    return typeof triggerType === 'string' ? triggerType === 'click' : triggerType.includes('click');
  }

  private setupHoverInteraction() {
    this.hoverManager.enterToShow$.subscribe(() => {
      if (this.supportsHover() && !this.state.visible) {
        this.onRequestOpen('enter-to-show');
      }
    });

    this.hoverManager.leaveToHide$.subscribe(() => {
      if (this.supportsHover() && this.state.visible) {
        this.onRequestClose('leave-to-hide');
      }
    });
  }

  // todo 给 reason 添加更加详细的信息
  private onRequestClose = (reason: any) => {
    batchedUpdates(() => {
      this.setState({ visible: false });
      this.props.onRequestClose?.(reason);
    });
  };

  // todo 给 reason 添加更加详细的信息
  private onRequestOpen = (reason: any) => {
    batchedUpdates(() => {
      this.setState({ visible: true });
      this.props.onRequestOpen?.(reason);
    });
  };

  componentDidUpdate(prevProps: Readonly<PopupProps>, prevState: Readonly<PopupState>) {
    if (
      prevProps.placement !== this.props.placement ||
      prevProps.autoWidth !== this.props.autoWidth ||
      prevProps.autoHeight !== this.props.autoHeight ||
      prevProps.flip !== this.props.flip ||
      (this.lastReference != null && this.lastReference != this.referenceRef.current)
    ) {
      if (this.state.visible) {
        this.reopenPopper();
      }
    }
  }

  private reopenPopper() {
    const { placement, flip, offset, autoWidth, autoHeight } = this.props;

    this.closePopper();

    const reference = this.referenceRef.current as HTMLElement;
    this.lastReference = reference;

    if (reference == null) {
      return;
    }
    reference.dataset.rexPopupOpen = 'true';

    this.popper = Popper.createPopper(reference, this.contentRef.current, {
      placement,
      modifiers: [
        { name: 'flip', enabled: flip },
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: () => {
              const [skidding, distance] = offset;
              const { hasArrow } = this.props;
              return [skidding, distance + (hasArrow ? ARROW_OFFSET : 0)];
            },
          },
        },
        popperAutoSizeModifier({ autoWidth, autoHeight }),
        arrowModifier,
        adjustArrowStyleModifier,
      ],
    });
    return this.popper.update();
  }

  private clearTriggerDataset = () => {
    const reference = this.referenceRef.current as HTMLElement;
    delete reference?.dataset.rexPopupOpen;
  };

  private closePopper = () => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  };

  componentWillUnmount() {
    this.clearTriggerDataset();
    this.closePopper();
    this.hoverManager.complete();
  }

  private onTriggerClick = () => {
    const { visible } = this.state;
    if (this.supportsClick()) {
      if (visible) {
        this.onRequestClose('click');
      } else {
        this.onRequestOpen('click');
      }
    }
  };

  private hoverManager = new HoverManager(this.props.hoverDelay);

  private beforeOverlayOpen = () => {
    const { beforeOpen, animationDict, animation } = this.props;

    return this.reopenPopper().then((state) => {
      beforeOpen?.();
      return {
        // FIXME 用户传的 animation 会被 animationDict 覆盖
        animation: animationDict[state.placement] ?? animation,
      };
    });
  };

  private beforeOverlayClose = () => {
    const { beforeClose, animationDict, animation } = this.props;

    beforeClose?.();
    if (this.popper == null) {
      return;
    }
    const placement = this.popper.state.placement;
    return {
      animation: animationDict[placement] ?? animation,
    };
  };

  render() {
    const {
      usePortal,
      portalContainer,
      renderTrigger,
      trigger,
      wrapperClassName,
      wrapperStyle,
      hasBackdrop,
      style,
      className,
      backdropClassName,
      backdropStyle,
      children,
      renderChildren,
      animation,
      animationDict,
      animationDuration,
      hasArrow,
      canCloseByEsc,
      canCloseByOutSideClick,
      disableScroll,
    } = this.props;

    const overlayLifecycles = pick(this.props, [
      'beforeOpen',
      'onOpen',
      'afterOpen',
      'beforeClose',
      'onClose',
      'afterClose',
    ]);

    const { visible } = this.state;

    const renderedTrigger = renderTrigger({
      ref: this.referenceRef,
      onClick: this.onTriggerClick,
      onMouseEnter: this.hoverManager.onTriggerMouseEnter,
      onMouseLeave: this.hoverManager.onTriggerMouseLeave,
      trigger,
    });

    const arrow = hasArrow && <div className="rex-popup-arrow" data-popper-arrow="true" />;

    return (
      <>
        {renderedTrigger}

        <StyledOverlay
          className={wrapperClassName}
          style={wrapperStyle}
          usePortal={usePortal}
          portalContainer={portalContainer}
          visible={visible}
          // todo popup 是否需要支持让上层传递 safeNodes?
          safeNodes={[() => this.referenceRef.current]}
          hasBackdrop={hasBackdrop}
          backdropStyle={backdropStyle}
          backdropClassName={backdropClassName}
          onRequestClose={this.onRequestClose}
          canCloseByOutSideClick={canCloseByOutSideClick}
          canCloseByEsc={canCloseByEsc}
          disableScroll={disableScroll}
          animation={animation}
          animationDuration={animationDuration}
          beforeOpen={this.beforeOverlayOpen}
          onOpen={overlayLifecycles.onOpen}
          afterOpen={overlayLifecycles.afterOpen}
          beforeClose={this.beforeOverlayClose}
          onClose={composeHandlers(this.clearTriggerDataset, overlayLifecycles.onClose)}
          afterClose={composeHandlers(this.closePopper, overlayLifecycles.afterClose)}
          renderChildren={({ ref }) => (
            <div
              className={cx('rex-popup-content', className)}
              style={style}
              ref={this.contentRef as React.RefObject<HTMLDivElement>}
              // 注意这里注册的是 React 管理的回调，mouseEnter/mouseLeave 事件在冒泡时会按照 react portal 来进行
              onMouseEnter={this.hoverManager.onContentMouseEnter}
              onMouseLeave={this.hoverManager.onContentMouseLeave}
            >
              {renderChildren({ ref, children, arrow })}
            </div>
          )}
        />
      </>
    );
  }
}
