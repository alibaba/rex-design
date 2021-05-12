import { Icon } from '@rexd/icon';
import React from 'react';
import styled, { css } from 'styled-components';
import { useOverlayBehavior } from '../../providers';
import {
  IOverlayAnimationProps,
  IOverlayBackdropProps,
  IOverlayCloseActions,
  IOverlayLifecycles,
  IOverlayPortalProps,
  Overlay,
} from './overlay';
import { animations } from './overlay-utils/animations';

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
  onRequestClose?(reason: any): void;

  /** 抽屉出现的位置 */
  placement?: 'left' | 'right' | 'top' | 'bottom';

  /** 抽屉标题 */
  title?: React.ReactNode;

  /** 抽屉内容 */
  children?: React.ReactNode;

  /** 弹窗页脚 */
  footer?: React.ReactNode;

  wrapperRef?: React.Ref<HTMLDivElement>;

  /** 是否显示对话框关闭图标 */
  canCloseByIcon?: boolean;

  // TODO canCloseBySlide??

  /** 是否使用极简样式，极简样式下不会生成抽屉的内部结构，会直接渲染 children */
  minimal?: boolean;
}

const drawerCloseMixin = css`
  .rex-drawer-close {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .rex-drawer-close-icon {
    display: block;
    color: var(--rex-colors-emphasis-60);
    cursor: pointer;

    &:hover {
      color: var(--rex-colors-emphasis-80);
    }
  }
`;

const drawerPlacementsMixin = css`
  &[data-placement='right'] {
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    width: 400px;
    max-width: 80%;
    box-shadow: var(--rex-shadows-lowleft);
  }

  &[data-placement='left'] {
    width: 400px;
    max-width: 80%;
    top: 0;
    right: auto;
    bottom: 0;
    left: 0;
    box-shadow: var(--rex-shadows-lowRight);
  }

  &[data-placement='top'] {
    height: 400px;
    max-height: 80%;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    box-shadow: var(--rex-shadows-lowDown);
  }

  &[data-placement='bottom'] {
    height: 400px;
    max-height: 80%;
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: var(--rex-shadows-lowUp);
  }
`;

const MinimalDrawerDiv = styled.div.withConfig({ componentId: 'rex-drawer rex-drawer-minimal' })`
  position: fixed;
  background: var(--rex-overlay-depth-l);

  ${drawerPlacementsMixin};

  .rex-drawer-close {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .rex-drawer-close-icon {
    display: block;
    color: var(--rex-colors-emphasis-60);
    cursor: pointer;

    &:hover {
      color: var(--rex-colors-emphasis-80);
    }
  }
`;

const DrawerDiv = styled.div.withConfig({ componentId: 'rex-drawer' })`
  position: fixed;
  background: var(--rex-overlay-depth-l);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${drawerPlacementsMixin};
  ${drawerCloseMixin};

  .rex-drawer-header {
    flex: 0 0 auto;
    font-size: var(--rex-fontSizes-title);
    font-weight: bold;
    padding: 12px 16px;
    border-bottom: 1px solid var(--rex-colors-line-border);
  }

  .rex-drawer-body {
    flex: auto;
    font-size: var(--rex-fontSizes-body);
    padding: 16px;
    overflow: auto;
  }

  .rex-drawer-footer {
    flex: 0 0 auto;
    border-top: 1px solid var(--rex-colors-line-border);
    display: flex;
    justify-content: center;
    padding: 12px;
  }
`;

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
      animation = {
        in: animations.slideInBottom,
        out: animations.slideOutBottom,
      };
    }
  }

  return animation;
}

export function Drawer({
  style,
  className,
  visible,
  children,
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
  minimal,
  ...lifeCycles
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
      {...lifeCycles}
      renderChildren={({ ref }) => {
        return minimal ? (
          <MinimalDrawerDiv
            ref={ref as React.RefObject<HTMLDivElement>}
            data-placement={placement}
            className={className}
            style={{ position, ...style }}
          >
            {children}
            {renderCloseIcon()}
          </MinimalDrawerDiv>
        ) : (
          <DrawerDiv
            ref={ref as React.RefObject<HTMLDivElement>}
            data-placement={placement}
            className={className}
            style={{ position, ...style }}
          >
            {title && <div className="rex-drawer-header">{title}</div>}
            <div className="rex-drawer-body">{children}</div>
            {footer && <div className="rex-drawer-footer">{footer}</div>}
            {renderCloseIcon()}
          </DrawerDiv>
        );
      }}
    />
  );

  function renderCloseIcon() {
    return (
      canCloseByIcon && (
        <div className="rex-drawer-close" onClick={onRequestClose}>
          <Icon type="close" className="rex-drawer-close-icon" />
        </div>
      )
    );
  }
}
