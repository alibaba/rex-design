import _ from 'lodash';
import memoizeOne from 'memoize-one';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { OverlayBehaviorContext, OverlayBehaviorContextType } from '../../system';
import { mergeRefs, noop, pick } from '../../utils';
import { IOverlayAnimationProps, IOverlayPortalProps, Overlay, OverlayProps } from './overlay';
import { makeDetachedRenderContainer, RenderContainer } from './overlay-utils/render-containers';
import { Position, PositionOffset, PositionPlacement } from './position';
import { Toast, ToastConfig, ToastConfigCommon } from './toast';

let nextToastId = 1;

function getUniqueToastKey() {
  return `toast-${nextToastId++}`;
}

const ToastListDiv = styled.div.withConfig({
  componentId: 'rex-toast-list',
})`
  z-index: 1000;
  position: absolute;
  transition: top 200ms, left 200ms;
  pointer-events: none;

  // 300px 为默认宽度，实际宽度可以被 style.width 覆盖
  width: 300px;
  max-width: 80%;
`;

interface ToastListProps extends IOverlayPortalProps, IOverlayAnimationProps {
  placement: PositionPlacement;
  offset?: PositionOffset;
  style?: React.CSSProperties;
  className?: string;
  duration?: number;

  toaster: Toaster;
  items: Array<Required<ToastConfig>>;
}

class ToastList extends React.Component<ToastListProps> {
  static readonly contextType = OverlayBehaviorContext;
  readonly context: OverlayBehaviorContextType;

  static defaultProps = {
    placement: 'top-right',
  };

  static getDefaultOffsetByPlacement(placement: PositionPlacement): PositionOffset {
    return [
      placement.includes('left') ? 24 : placement.includes('right') ? -24 : 0,
      placement.includes('top') ? 24 : placement.includes('bottom') ? -24 : 0,
    ];
  }

  private mergeRefs = memoizeOne(mergeRefs);

  static getDefaultAnimationByPlacement(placement: PositionPlacement): OverlayProps['animation'] {
    if (placement === 'center') {
      return {
        in: Overlay.animations.zoomIn,
        out: Overlay.animations.zoomOut,
      };
    } else if (placement === 'top') {
      return {
        in: Overlay.animations.bounceInDown,
        out: Overlay.animations.bounceOutUp,
      };
    } else if (placement === 'bottom') {
      return {
        in: Overlay.animations.bounceInUp,
        out: Overlay.animations.bounceOutDown,
      };
    } else if (placement.includes('left')) {
      return {
        in: Overlay.animations.bounceInLeft,
        out: Overlay.animations.bounceOutLeft,
      };
    } else {
      return {
        in: Overlay.animations.bounceInRight,
        out: Overlay.animations.bounceOutRight,
      };
    }
  }

  render() {
    const {
      portalContainer: portalContainerProp,
      usePortal,
      disableScroll,
      placement,
      offset = ToastList.getDefaultOffsetByPlacement(placement),
      className,
      style,
      animation = ToastList.getDefaultAnimationByPlacement(placement),
      animationDuration = '500ms',
      items,
      toaster,
    } = this.props;

    const portalContainer = portalContainerProp ?? this.context.portalContainer;
    const containerVisible = items.length > 0;

    return (
      <Overlay
        visible={containerVisible}
        portalContainer={portalContainer}
        usePortal={usePortal}
        disableScroll={disableScroll}
        animation={false}
        attachOverlayManager={false}
        renderChildren={({ ref: overlayContentRef }) => (
          <Position container={portalContainer} placement={placement} offset={offset}>
            {(positionTargetRef) => (
              <ToastListDiv
                ref={this.mergeRefs(overlayContentRef, positionTargetRef)}
                style={style}
                className={className}
              >
                {items.map((item) => (
                  <Toast
                    animation={animation}
                    animationDuration={animationDuration}
                    toaster={toaster}
                    key={item.key}
                    item={item}
                  />
                ))}
              </ToastListDiv>
            )}
          </Position>
        )}
      />
    );
  }
}

const DEFAULT_TOAST_COMMON: ToastConfigCommon = {
  placement: 'top-right',
  duration: 5000,
  canCloseByIcon: true,
  canCloseByClick: true,
  hasProgressBar: true,
};

const INHERITABLE_TOAST_KEYS = Object.keys(DEFAULT_TOAST_COMMON);

function useToaster(toasterProps: ToasterProps = {}) {
  const ref = useRef<Toaster>();

  const contextHolder = <Toaster ref={ref} {...toasterProps} />;

  return [
    {
      show(item: Partial<ToastConfig>) {
        // todo ref.current 为空的时候， fallback 为默认 Toast.show
        return ref.current.show(item);
      },
      close(key: string) {
        ref.current.close(key);
      },
      closeAll() {
        ref.current.closeAll();
      },
      // TODO 暂时先不开放 clear api
      // clear(key: string) { ref.current.clear(key); },
      // clearAll() { ref.current.clearAll(); },
    },
    contextHolder,
  ] as const;
}

function makeStaticToasterQuickTools() {
  let container: RenderContainer;
  const ref = React.createRef<Toaster>();
  const currentConfig: ToastConfigCommon = { ...DEFAULT_TOAST_COMMON };

  const ensureMounted = () => {
    if (ref.current != null) {
      return;
    }
    container = makeDetachedRenderContainer();
    container.render(<Toaster ref={ref} {...currentConfig} />);
  };

  return {
    getConfig() {
      return Object.assign({}, currentConfig);
    },
    config(nextConfig: Partial<ToastConfigCommon>) {
      Object.assign(currentConfig, nextConfig);
      ensureMounted();
      container.render(<Toaster ref={ref} {...currentConfig} />);
    },
    show(item: Partial<ToastConfig>) {
      ensureMounted();
      return ref.current.show(item);
    },
    close(key: string) {
      ensureMounted();
      ref.current.close(key);
    },
    closeAll() {
      ensureMounted();
      ref.current.closeAll();
    },
    // TODO 暂时先不开放 clear api
    // clear(key: string) { ref.current.clear(key); },
    // clearAll() { ref.current.clearAll(); },
  };
}

const staticToasterQuickTools = makeStaticToasterQuickTools();

export interface ToasterProps extends ToastConfigCommon, IOverlayPortalProps {}

export class Toaster extends React.Component<ToasterProps, { items: Required<ToastConfig>[] }> {
  static show = staticToasterQuickTools.show;
  static close = staticToasterQuickTools.close;
  static closeAll = staticToasterQuickTools.closeAll;
  static config = staticToasterQuickTools.config;
  static getConfig = staticToasterQuickTools.getConfig;

  static useToaster = useToaster;

  state = {
    items: [] as Required<ToastConfig>[],
  };

  show(config: Partial<ToastConfig>) {
    const key = config.key ?? getUniqueToastKey();

    const inflatedConfig = {
      ...DEFAULT_TOAST_COMMON,
      ...pick(this.props, (INHERITABLE_TOAST_KEYS as unknown) as any),
      onClick: noop,
      ...config,
      key,
      visible: true,
    } as Required<ToastConfig>;

    const nextItems = this.state.items.concat([inflatedConfig]);
    this.setState({ items: nextItems });

    return key;
  }

  close(key: string) {
    const prevItems = this.state.items;
    const index = prevItems.findIndex((item) => item.key === key);
    if (index === -1) {
      return;
    }
    const item = prevItems[index];
    if (!item.visible) {
      return;
    }
    const nextItems = [...prevItems.slice(0, index), { ...item, visible: false }, ...prevItems.slice(index + 1)];
    this.setState({ items: nextItems });
  }

  closeAll() {
    const prevItems = this.state.items;
    const nextItems = prevItems.map((item) => ({ ...item, visible: false }));
    this.setState({ items: nextItems });
  }

  clear(key: string) {
    const prevItems = this.state.items;
    const nextItems = prevItems.filter((item) => item.key !== key);
    this.setState({ items: nextItems });
  }

  clearAll() {
    this.setState({ items: [] });
  }

  render() {
    const { items } = this.state;
    const { portalContainer, usePortal, disableScroll } = this.props;

    const groups = _.groupBy(items, (item) => item.placement);

    return Object.keys(groups).map((placement) => (
      <ToastList
        key={placement}
        placement={placement as PositionPlacement}
        items={groups[placement]}
        toaster={this}
        portalContainer={portalContainer}
        usePortal={usePortal}
        disableScroll={disableScroll}
      />
    ));
  }
}
