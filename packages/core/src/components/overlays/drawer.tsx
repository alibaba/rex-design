import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React from 'react';
import { useOverlayBehavior } from '../../providers';
import { Button } from '../button';
import { Panel, PanelProps } from '../layout';
import {
  IOverlayAnimationProps,
  IOverlayBackdropProps,
  IOverlayCloseActions,
  IOverlayLifecycles,
  IOverlayPortalProps,
  Overlay,
} from './overlay';
import { animations } from './overlay-utils/animations';

const DrawerPanel = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => (
  <Panel ref={ref} borderRadius="none" {...props} className={cx('rex-drawer', props.className)} />
));

type DrawerInnerProps = Pick<DrawerProps, 'title' | 'content' | 'footer' | 'canCloseByIcon' | 'onRequestClose'>;

const DrawerInner = ({ title, footer, content, onRequestClose, canCloseByIcon }: DrawerInnerProps) => (
  <React.Fragment>
    {title && <div className="rex-drawer-header">{title}</div>}
    <div className="rex-drawer-body">{content}</div>
    {footer && <div className="rex-drawer-footer">{footer}</div>}

    {canCloseByIcon && (
      <Button className="rex-drawer-close" shape="text" size="small" iconOnly onClick={onRequestClose}>
        <Icon type="close" />
      </Button>
    )}
  </React.Fragment>
);

export interface DrawerProps
  extends IOverlayCloseActions,
    IOverlayBackdropProps,
    IOverlayLifecycles,
    IOverlayAnimationProps,
    IOverlayPortalProps {
  style?: React.CSSProperties;
  className?: string;

  /** 抽屉是否显示 */
  visible?: boolean;

  /** 抽屉被关闭时的回调 */
  onRequestClose?(reason?: any): void;

  /** 抽屉出现的位置 */
  placement?: 'left' | 'right' | 'top' | 'bottom';

  /** 抽屉标题 */
  title?: React.ReactNode;

  children?: React.ReactNode;
  content?: React.ReactNode;
  /** 使用 render prop 的形式指定弹层内容，用于精确控制 DOM 结构 */
  renderChildren?(pass: {
    ref: React.Ref<HTMLDivElement>;
    'data-placement': DrawerProps['placement'];
  }): React.ReactNode;

  /** 弹窗页脚 */
  footer?: React.ReactNode;

  wrapperRef?: React.Ref<HTMLDivElement>;

  /** 是否显示对话框关闭图标 */
  canCloseByIcon?: boolean;
}

function resolveDrawerAnimation(
  animationProp: IOverlayAnimationProps['animation'],
  placement: DrawerProps['placement'],
) {
  let animation = animationProp;
  if (animation == null) {
    if (placement === 'right') {
      animation = { in: animations.slideInRight, out: animations.slideOutRight };
    } else if (placement === 'left') {
      animation = { in: animations.slideInLeft, out: animations.slideOutLeft };
    } else if (placement === 'top') {
      animation = { in: animations.slideInTop, out: animations.slideOutTop };
    } else {
      animation = { in: animations.slideInBottom, out: animations.slideOutBottom };
    }
  }

  return animation;
}

export function Drawer({
  style,
  className,
  visible,
  children: _children,
  content = _children,
  renderChildren,
  title,
  footer,
  placement = 'right',
  onRequestClose,
  hasBackdrop = true,
  backdropClassName,
  backdropStyle,
  canCloseByEsc = true,
  canCloseByOutSideClick = true,
  canCloseByIcon = false,
  usePortal,
  portalContainer: portalContainerProp,
  disableScroll = true,
  wrapperRef,
  animation,
  ...lifecycles
}: DrawerProps) {
  const overlayBehavior = useOverlayBehavior();
  const portalContainer = portalContainerProp ?? overlayBehavior.portalContainer;
  const position = Overlay.isCustomPortalContainer(portalContainer) ? 'absolute' : undefined;

  return (
    <Overlay
      visible={visible}
      onRequestClose={onRequestClose}
      hasBackdrop={hasBackdrop}
      backdropClassName={backdropClassName}
      backdropStyle={backdropStyle}
      canCloseByEsc={canCloseByEsc}
      canCloseByOutSideClick={canCloseByOutSideClick}
      animation={resolveDrawerAnimation(animation, placement)}
      usePortal={usePortal}
      portalContainer={portalContainer}
      disableScroll={disableScroll}
      wrapperRef={wrapperRef}
      {...lifecycles}
      renderChildren={({ ref }) => {
        if (renderChildren != null) {
          return renderChildren({ ref: ref as React.Ref<HTMLDivElement>, 'data-placement': placement });
        }

        return (
          <DrawerPanel
            ref={ref as React.Ref<HTMLDivElement>}
            style={{ position, ...style }}
            className={className}
            data-placement={placement}
          >
            <DrawerInner
              title={title}
              content={content}
              footer={footer}
              canCloseByIcon={canCloseByIcon}
              onRequestClose={onRequestClose}
            />
          </DrawerPanel>
        );
      }}
    />
  );
}

Drawer.Panel = DrawerPanel;
Drawer.Inner = DrawerInner;
