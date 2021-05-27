import * as Popper from '@popperjs/core';
import cx from 'classnames';
import React, { useContext } from 'react';
import { OverlayBehaviorContext, OverlayBehaviorContextType } from '../../providers';
import { composeHandlers, pick } from '../../utils';
import {
  IOverlayAnimationProps,
  IOverlayBackdropProps,
  IOverlayCloseActions,
  IOverlayLifecycles,
  IOverlayPortalProps,
  Overlay,
  OverlayProps,
} from './overlay';
import { animations } from './overlay-utils/animations';
import { batchedUpdates } from './overlay-utils/batchUpdate';
import { PopupInteractionManager } from './overlay-utils/PopupInteractionManager';

export type PopupPlacement = Popper.Placement;

const ARROW_PADDING = 10;
const ARROW_OFFSET = 12;

const defaultRenderTarget: PopupProps['renderTarget'] = (htmlProps, { target, targetStyle, targetTagName }) => {
  return React.createElement(
    targetTagName,
    {
      ...htmlProps,
      style: targetStyle,
      // rex-popup-target will set display=inline-block
      className: 'rex-popup-target',
    },
    target,
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

export interface PopupChildrenRenderArg {
  ref: React.RefObject<Element>;
  children: React.ReactNode;
  arrow?: React.ReactNode;
}

export type PopupTargetRenderArgs = [
  {
    ref: React.RefObject<any>;
    onClick(e: React.MouseEvent): void;
    onMouseEnter(e: React.MouseEvent): void;
    onMouseLeave(e: React.MouseEvent): void;
    onFocus(e: React.FocusEvent): void;
    onBlur(e: React.FocusEvent): void;
  },
  Pick<PopupProps, 'target' | 'targetStyle' | 'targetTagName'>,
];

export type PopupInteractionKind = 'hover' | 'click' | 'hover-target';

export interface PopupProps
  extends IOverlayCloseActions,
    IOverlayLifecycles,
    IOverlayBackdropProps,
    IOverlayAnimationProps,
    IOverlayPortalProps {
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

  /** 弹层目标元素中的内容 */
  target?: React.ReactNode;

  /** 弹层目标元素的标签名称。默认为 span，适用于内联文本。设置为 div 用于块级元素。 */
  targetTagName?: 'div' | 'span';

  /** 弹层目标元素的样式 */
  targetStyle?: React.CSSProperties;

  /**
   * 目标元素获取焦点时，是否自动打开弹层
   * @category 浮层交互
   * */
  canOpenByFocus?: boolean;

  /**
   * 目标元素失去焦点时，是否自动关闭弹层
   * @category 浮层交互
   * */
  canCloseByBlur?: boolean;

  attachOverlayManager?: boolean;

  /**
   * 渲染目标元素的自定义方法。 该属性将覆盖 target/targetTagName/targetStyle
   * @displayType (htmlProps, partialPopupProps) => React.ReactNode
   * */
  renderTarget?(...params: PopupTargetRenderArgs): React.ReactNode;

  /**
   * 触发弹层显示或隐藏的操作类型，可以是 click', 'hover', 'hover-target'
   * @category 浮层交互
   */
  interactionKind?: PopupInteractionKind;

  /** 鼠标悬停触发弹层显示或隐藏的超时时间 */
  hoverDelay?: number;

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
  renderChildren?(arg: PopupChildrenRenderArg): React.ReactNode;

  /** 弹层翻转 是否允许弹层翻转 */
  flip?: boolean;

  /** 弹层相对于 target 位置的偏移量 */
  offset?: [skidding: number, distance: number];

  /** 将弹层的最小宽度设置为 target 的宽度 */
  autoWidth?: boolean;

  /** 将弹层的最小高度设置为 target 的高度 */
  autoHeight?: boolean;

  /**
   * 为不同的方向设置不同的弹层打开动画
   * @category 浮层动画
   * @displayType Partial<{ [placement in PopupPlacement]: OverlayProps['animation'] }>
   * */
  animationDict?: Partial<{ [placement in PopupPlacement]: OverlayProps['animation'] }>;

  /**
   * 弹层的打开方向（如果 animationDict 中缺少当前方向的打开方向的话，则会使用该 prop 指定的动画）
   * @category 浮层动画
   * */
  animation?: OverlayProps['animation'];
}

interface PopupState {
  visible: boolean;
}

/**
 * 弹层组件，根据 placement/strategy/flip/offset 等配置，将 content 放置在 target 的旁边。
 *
 * ```
 *  <Popup target={target} placement="bottom" offset={[0, 16]}>{content}</Popup>：
 *
 *      ┌─────────────────────┐
 *      │                     │ <┄┄┄ target
 *      └─────────────────────┘
 *  ╔═════════════════════════════╗
 *  ║                             ║
 *  ║                             ║ <┄┄┄ content/children
 *  ║                             ║
 *  ╚═════════════════════════════╝
 * ```
 */
export class Popup extends React.Component<PopupProps, PopupState> {
  static readonly contextType = OverlayBehaviorContext;
  context: OverlayBehaviorContextType;

  // 通过 context 将 popup 实例传递给子节点，允许子节点通过该 context 直接关闭 popup
  static readonly NearestPopupContext = React.createContext<Popup>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  static useNearestPopup = () => useContext(Popup.NearestPopupContext);

  static defaultRenderTarget = defaultRenderTarget;

  static defaultRenderChildren = defaultRenderChildren;

  static getDefaultAnimation(placement: PopupPlacement) {
    if (placement.includes('top')) {
      return { in: animations.expandInUp, out: animations.expandOutDown };
    } else {
      return { in: animations.expandInDown, out: animations.expandOutUp };
    }
  }

  static defaultProps = {
    placement: 'bottom-start',
    strategy: 'absolute',
    flip: true,
    autoWidth: false,
    autoHeight: false,
    usePortal: true,
    canCloseByEsc: true,
    canCloseByOutSideClick: true,
    canOpenByFocus: false,
    canCloseByBlur: false,
    offset: [0, 0],
    interactionKind: 'click',
    hoverDelay: 120,
    renderTarget: Popup.defaultRenderTarget,
    renderChildren: Popup.defaultRenderChildren,
    targetTagName: 'span',
    // 为了区分用户是否真的传递了 animation 与 animationDict，这里不设置默认值
    // animation: Popup.defaultAnimation,
    // animationDict: Popup.defaultAnimationDict,
  };

  private popper: Popper.Instance | null = null;

  private contentRef = React.createRef<HTMLElement>();
  private targetRef = React.createRef<Element>();
  private overlayRef = React.createRef<Overlay>();

  /** 上次使用的定位参考元素，用于判断参照元素是否发生了变化，发生变化时需要重新创建 popper 实例 */
  private lastTarget: Element = null;

  constructor(props: PopupProps) {
    super(props);

    this.state = {
      visible: props.visible ?? props.defaultVisible,
    };

    this.interactionManager.action$.subscribe((action) => {
      if (action.type === 'open') {
        this.onRequestOpen(action.reason);
      } else {
        this.onRequestClose(action.reason);
      }
    });
  }

  static getDerivedStateFromProps(props: PopupProps, state: PopupState) {
    if (props.visible != null) {
      return { visible: props.visible };
    }
    return null;
  }

  private onRequestClose = (reason: any) => {
    batchedUpdates(() => {
      this.setState({ visible: false });
      this.props.onRequestClose?.(reason);
    });
  };

  private onRequestOpen = (reason: any) => {
    batchedUpdates(() => {
      this.setState({ visible: true });
      this.props.onRequestOpen?.(reason);
    });
  };

  /** 关闭当前弹层以及该弹层之后的所有弹层（这里的「之后」指的是在 OverlayManager.stack 中的先后顺序 */
  dismissAfterwards() {
    const portalContainer = this.props.portalContainer ?? this.context.portalContainer;
    const manager = Overlay.getManager(portalContainer);
    const selfIndex = manager.stack.indexOf(this.overlayRef.current);
    if (selfIndex !== -1) {
      for (const overlay of manager.stack.slice(selfIndex)) {
        overlay.props.onRequestClose?.('dismiss');
      }
    }
  }

  componentDidUpdate(prevProps: Readonly<PopupProps>, prevState: Readonly<PopupState>) {
    if (
      prevProps.placement !== this.props.placement ||
      prevProps.autoWidth !== this.props.autoWidth ||
      prevProps.autoHeight !== this.props.autoHeight ||
      prevProps.flip !== this.props.flip ||
      (this.lastTarget != null && this.lastTarget != this.targetRef.current)
    ) {
      if (this.state.visible) {
        this.reopenPopper();
      }
    }
  }

  private reopenPopper() {
    const { placement, flip, offset, autoWidth, autoHeight } = this.props;

    this.closePopper();

    const target = this.targetRef.current as HTMLElement;
    this.lastTarget = target;

    if (target == null) {
      return;
    }
    target.dataset.rexPopupOpen = 'true';

    this.popper = Popper.createPopper(target, this.contentRef.current, {
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

  private clearTargetDataset = () => {
    const target = this.targetRef.current as HTMLElement;
    delete target?.dataset.rexPopupOpen;
  };

  private closePopper = () => {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  };

  componentWillUnmount() {
    this.clearTargetDataset();
    this.closePopper();
    this.interactionManager.complete();
  }

  private interactionManager = new PopupInteractionManager(
    {
      hoverDelay: this.props.hoverDelay,
      interactionKind: this.props.interactionKind,
      canOpenByFocus: this.props.canOpenByFocus,
      canCloseByBlur: this.props.canCloseByBlur,
    },
    () => this.state.visible,
  );

  private beforeOverlayOpen = () => {
    const { beforeOpen, animationDict, animation } = this.props;

    return this.reopenPopper().then((state) => {
      beforeOpen?.();
      const animationFromProps = animationDict?.[state.placement] ?? animation;
      return {
        animation: animationFromProps ?? Popup.getDefaultAnimation(state.placement),
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

    const animationFromProps = animationDict?.[placement] ?? animation;
    return {
      animation: animationFromProps ?? Popup.getDefaultAnimation(placement),
    };
  };

  render() {
    const {
      usePortal,
      portalContainer,
      renderTarget,
      target,
      targetStyle,
      targetTagName,
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
      animationDuration,
      hasArrow,
      canCloseByEsc,
      attachOverlayManager,
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

    const renderedTarget = renderTarget(
      {
        ref: this.targetRef,
        onClick: this.interactionManager.onTargetClick,
        onMouseEnter: this.interactionManager.onTargetMouseEnter,
        onMouseLeave: this.interactionManager.onTargetMouseLeave,
        onFocus: this.interactionManager.onTargetFocus,
        onBlur: this.interactionManager.onTargetBlur,
      },
      { target, targetStyle, targetTagName },
    );

    const arrow = hasArrow && <div className="rex-popup-arrow" data-popper-arrow="true" />;

    return (
      <>
        {renderedTarget}

        <Overlay
          ref={this.overlayRef}
          className={wrapperClassName}
          style={wrapperStyle}
          usePortal={usePortal}
          portalContainer={portalContainer}
          visible={visible}
          safeNodes={[() => this.targetRef.current]}
          hasBackdrop={hasBackdrop}
          backdropStyle={backdropStyle}
          backdropClassName={backdropClassName}
          onRequestClose={this.onRequestClose}
          canCloseByOutSideClick={canCloseByOutSideClick}
          canCloseByEsc={canCloseByEsc}
          attachOverlayManager={attachOverlayManager}
          disableScroll={disableScroll}
          animation={animation}
          animationDuration={animationDuration}
          beforeOpen={this.beforeOverlayOpen}
          onOpen={overlayLifecycles.onOpen}
          afterOpen={overlayLifecycles.afterOpen}
          beforeClose={this.beforeOverlayClose}
          onClose={composeHandlers(this.clearTargetDataset, overlayLifecycles.onClose)}
          afterClose={composeHandlers(this.closePopper, overlayLifecycles.afterClose)}
          renderChildren={({ ref }) => (
            <div
              // todo autoFocus 浮层打开时 自动获取焦点
              // todo enforceFocus 浮层打开状态下，焦点始终在浮层内
              className={cx('rex-popup-content', className)}
              style={style}
              ref={this.contentRef as React.RefObject<HTMLDivElement>}
              // 注意这里注册的是 React 管理的回调，mouseEnter/mouseLeave 事件在冒泡时会按照 react portal 来进行
              onMouseEnter={this.interactionManager.onContentMouseEnter}
              onMouseLeave={this.interactionManager.onContentMouseLeave}
            >
              <Popup.NearestPopupContext.Provider value={this}>
                {renderChildren({ ref, children, arrow })}
              </Popup.NearestPopupContext.Provider>
            </div>
          )}
        />
      </>
    );
  }
}
