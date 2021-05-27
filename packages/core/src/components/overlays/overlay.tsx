import cx from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import { Keyframes } from 'styled-components';
import { DOCUMENT_BODY, OverlayBehaviorContext, OverlayBehaviorContextType } from '../../providers';
import { mergeRefs } from '../../utils';
import { domUtils } from '../virtual-list/dom-utils';
import { ANIMATE_ANIMATED, ANIMATE_PREFIX, Disposable, startAnimate } from './overlay-utils/animate-utils';
import { animations } from './overlay-utils/animations';
import { batchedUpdates } from './overlay-utils/batchUpdate';
import { OverlayManager } from './overlay-utils/OverlayManager';

export interface IOverlayCloseActions {
  /**
   * 是否支持 esc 按键关闭弹层
   * @category 浮层交互
   * */
  canCloseByEsc?: boolean;

  /**
   * 点击弹层外部区域是否关闭弹层（注意背景层也被认为是外部）
   * @category 浮层交互
   * */
  canCloseByOutSideClick?: boolean;
}

// 浮层的相关生命周期定义
export interface IOverlayLifecycles {
  /**
   * 浮层即将被打开时的回调
   * @category 浮层生命周期
   */
  beforeOpen?(state?: any): Promise<IOverlayAnimationProps>;

  /** 浮层打开时的回调
   * @category 浮层生命周期
   */
  onOpen?(): void;

  /** 浮层打开时的回调
   * @category 浮层生命周期
   */
  afterOpen?(): void;

  /**
   * 浮层即将被关闭时的回调
   * @category 浮层生命周期
   */
  beforeClose?(): IOverlayAnimationProps;

  /**
   * 浮层关闭时的回调
   * @category 浮层生命周期
   */
  onClose?(): void;

  /** 浮层关闭后的回调
   * @category 浮层生命周期
   */
  afterClose?(): void;
}

export interface IOverlayBackdropProps {
  /**
   * 是否展示背景层
   * @category 背景层
   * */
  hasBackdrop?: boolean;

  /** @category 背景层 */
  backdropStyle?: React.CSSProperties;

  /** @category 背景层 */
  backdropClassName?: string;
}

export interface IOverlayAnimationProps {
  /**
   * 动画持续时间（注意该 prop 会作为 CSS 变量的值，使用时要带上单位，例如 `'500ms'`)
   * @category 浮层动画
   * @default 200ms
   */
  animationDuration?: string;

  /**
   * 弹层的出现和消失的动画，可以用 Overlay.animations.{name} 来引用弹层组件内置的动画效果
   * @category 浮层动画
   * */
  animation?:
    | false
    | {
        in: string | Keyframes;
        out: string | Keyframes;
      };
}

export interface IOverlayPortalProps {
  /** 是否使用 portal 来渲染弹层内容
   * @category 浮层容器 */
  usePortal?: boolean;

  /** 渲染组件的容器
   * @category 浮层容器 */
  portalContainer?: HTMLElement | typeof DOCUMENT_BODY;

  /** 是否禁用容器的滚动
   * @category 浮层容器 */
  disableScroll?: boolean | 'force';
}

export interface OverlayProps
  extends IOverlayCloseActions,
    IOverlayLifecycles,
    IOverlayBackdropProps,
    IOverlayAnimationProps,
    IOverlayPortalProps {
  overlayKey?: string;

  /** 是否显示弹层 */
  visible: boolean;

  /** 弹层请求关闭时触发事件的回调函数 */
  onRequestClose?(reason: any): void;

  /** 弹层的根节点的样式类 */
  className?: string;

  /** 弹层的根节点的内联样式 */
  style?: React.CSSProperties;

  /** 弹层内容 */
  children?: React.ReactNode;

  /** 使用 render prop 的形式指定弹层内容，用于精确控制 DOM 结构 */
  renderChildren(pass: { ref: React.RefObject<Element>; children: React.ReactNode }): React.ReactNode;

  wrapperRef?: React.Ref<HTMLDivElement>;

  safeNodes?: (Node | (() => Node))[];

  /**
   * 是否关联到 portalContainer 上的 overlay manager.
   * 该属性一般保持默认即可。
   */
  attachOverlayManager?: boolean;
}

interface OverlayState {
  prevVisible: boolean;
  exiting: boolean;
}

// overlay 内容的默认渲染方法
const defaultRenderChildren: OverlayProps['renderChildren'] = ({ ref, children }) => (
  <div ref={ref as React.RefObject<HTMLDivElement>}>{children}</div>
);

/** Overlay 注释文档 */
export class Overlay extends React.Component<OverlayProps, OverlayState> {
  static isCustomPortalContainer(portalContainer?: HTMLElement | typeof DOCUMENT_BODY) {
    return portalContainer != null && portalContainer !== 'DOCUMENT_BODY' && !domUtils.isBody(portalContainer);
  }

  static readonly contextType = OverlayBehaviorContext;
  context: OverlayBehaviorContextType;

  static readonly defaultRenderChildren = defaultRenderChildren;

  static readonly animations = animations;

  static readonly DOCUMENT_BODY = DOCUMENT_BODY;

  static defaultProps = {
    usePortal: true,
    safeNodes: [] as OverlayProps['safeNodes'],
    canCloseByEsc: true,
    canCloseByOutSideClick: true,
    animation: { in: animations.fadeIn, out: animations.fadeOut },
    renderChildren: Overlay.defaultRenderChildren,
    disableScroll: false,
    attachOverlayManager: true,
    animationDuration: '200ms',
  };

  static getDerivedStateFromProps(props: Readonly<OverlayProps>, state: Readonly<OverlayState>): Partial<OverlayState> {
    let nextExiting = state.exiting;
    if (state.prevVisible && !props.visible) {
      nextExiting = true;
    } else if (!state.prevVisible && props.visible) {
      nextExiting = false;
    }

    return {
      prevVisible: props.visible,
      exiting: nextExiting,
    };
  }

  // 微应用场景下，每个 portalContainer 都需要一个 OverlayManager
  // 故这里用一个 map 来管理所有的 manager
  private static managerMap = new Map<Element, OverlayManager>();

  // 获取 portalContainer 对应的 OverlayManager 实例
  static getManager(portalContainer: HTMLElement | typeof DOCUMENT_BODY) {
    if (portalContainer === DOCUMENT_BODY) {
      portalContainer = typeof document === 'undefined' ? null : document.body;
    }
    if (portalContainer == null) {
      console.warn('[@rexd/core] Overlay.getManager(portalContainer) 调用参数 portalContainer 为 null');
      return;
    }

    if (!Overlay.managerMap.has(portalContainer)) {
      Overlay.managerMap.set(portalContainer, new OverlayManager(portalContainer));
    }
    return Overlay.managerMap.get(portalContainer);
  }

  private resolvePortalContainer() {
    let result = this.props.portalContainer ?? this.context.portalContainer;

    if (result === DOCUMENT_BODY) {
      // 这里判断 document 是为了兼容 SSR 的情况
      result = typeof document !== 'undefined' ? document.body : null;
    }

    return result;
  }

  constructor(props: OverlayProps) {
    super(props);

    this.state = {
      prevVisible: props.visible,
      exiting: false,
    };
  }

  private _wrapperRef = React.createRef<HTMLDivElement>();
  private innerRef = React.createRef<Element>();

  // overlay 元素动画的实例，用于「下一个动画开始前 取消上一个动画」
  private overlayAnimateInst: Disposable = null;

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.doOpenOverlay();
    }
  }

  private resolveEnterAnimation(instruction: IOverlayAnimationProps): null | string | Keyframes {
    const { animation: animationProp } = this.props;
    if (animationProp === false || instruction?.animation === false) {
      return null;
    }

    return instruction?.animation?.in ?? animationProp?.in ?? null;
  }

  // 处理打开浮层的动画
  private async doOpenOverlay() {
    const { beforeOpen, onOpen, afterOpen, attachOverlayManager } = this.props;

    if (attachOverlayManager) {
      Overlay.getManager(this.resolvePortalContainer()).add(this);
    }

    const inner = this.innerRef.current;
    if (inner == null) {
      return;
    }

    inner.classList.add('rex-overlay-inner');

    const overlayOpenInstruction = await beforeOpen?.();

    this.overlayAnimateInst?.dispose();
    this.overlayAnimateInst = startAnimate(inner, this.resolveEnterAnimation(overlayOpenInstruction), () => {
      afterOpen?.();
      this.overlayAnimateInst = null;
    });

    onOpen?.();
  }

  private resolveExitAnimation(instruction: IOverlayAnimationProps): null | string | Keyframes {
    const { animation: animationProp } = this.props;
    if (animationProp === false || instruction?.animation === false) {
      return null;
    }

    return instruction?.animation?.out ?? animationProp?.out ?? null;
  }

  private async doCloseOverlay(force = false) {
    const { beforeClose, onClose, afterClose, attachOverlayManager } = this.props;

    if (attachOverlayManager) {
      Overlay.getManager(this.resolvePortalContainer()).delete(this);
    }

    const inner = this.innerRef.current;
    if (inner == null) {
      return;
    }

    const overlayCloseInstruction = beforeClose?.();
    this.overlayAnimateInst?.dispose();
    if (force) {
      this.overlayAnimateInst = null;
      onClose?.();
      // 强制关闭的情况下，不再调用 afterClose()
    } else {
      this.overlayAnimateInst = startAnimate(inner, this.resolveExitAnimation(overlayCloseInstruction), () => {
        batchedUpdates(() => {
          this.setState({ exiting: false });
          this.overlayAnimateInst = null;
          afterClose?.();
        });
      });
      onClose?.();
    }
  }

  componentDidUpdate(prevProps: Readonly<OverlayProps>, prevState: Readonly<OverlayState>) {
    if (prevProps.disableScroll !== this.props.disableScroll) {
      console.warn('[@rexd/core] 浮层组件 props.disableScroll 不支持动态变化');
    }
    if (prevProps.attachOverlayManager !== this.props.attachOverlayManager) {
      console.warn('[@rexd/core] 浮层组件 props.attachOverlayManager 不支持动态变化');
    }

    if (prevProps.visible && !this.props.visible) {
      this.doCloseOverlay();
    }
    if (!prevProps.visible && this.props.visible) {
      this.doOpenOverlay();
    }
  }

  componentWillUnmount() {
    if (this.props.visible) {
      this.doCloseOverlay(true);
    }
    this.overlayAnimateInst?.dispose();
  }

  private composedWrapperRef = mergeRefs(this._wrapperRef, this.props.wrapperRef);

  // 判断鼠标点击位置是否在浮层内部
  public isInsideClick = (clickNode: Node) => {
    // 背景层总是认为是外部
    if ((clickNode as Element).classList?.contains?.('rex-overlay-backdrop')) {
      return false;
    }

    const { safeNodes } = this.props;
    const wrapper = this._wrapperRef.current;

    return (
      wrapper?.contains(clickNode) ||
      safeNodes.some((safe) => {
        if (typeof safe === 'function') {
          safe = safe();
        }
        return safe?.contains(clickNode);
      })
    );
  };

  render() {
    const {
      usePortal,
      children,
      renderChildren,
      animationDuration,
      className,
      style,
      hasBackdrop,
      visible,
      overlayKey,
      attachOverlayManager,
    } = this.props;

    const portalContainer = this.resolvePortalContainer();

    if (portalContainer == null) {
      // SSR 场景下可能会找不到 portalContainer，这里返回 null 即可
      return null;
    }

    const { exiting } = this.state;

    if (!visible && !exiting) {
      return null;
    }

    let content = (
      <div
        className={cx('rex-overlay-wrapper', { exiting, detached: !attachOverlayManager }, className)}
        style={{ '--animate-duration': animationDuration, ...style } as any}
        ref={this.composedWrapperRef}
      >
        {hasBackdrop && (
          <div
            className={cx(
              'rex-overlay-backdrop',
              this.props.backdropClassName,
              ANIMATE_ANIMATED,
              exiting
                ? `${ANIMATE_PREFIX}${animations.fadeOut.getName()}`
                : `${ANIMATE_PREFIX}${animations.fadeIn.getName()}`,
            )}
            style={{
              position: Overlay.isCustomPortalContainer(portalContainer) ? 'absolute' : undefined,
              ...this.props.backdropStyle,
            }}
          />
        )}

        {renderChildren({ ref: this.innerRef, children })}
      </div>
    );

    if (usePortal) {
      content = ReactDOM.createPortal(content, portalContainer, overlayKey);
    }

    return content;
  }
}
