import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React, { useMemo } from 'react';
import { useOverlayBehavior } from '../../providers';
import { noop, useMemoizedMergeRefs } from '../../utils';
import { Button, ButtonProps } from '../button';
import { makeDialogQuickTools } from './dialog-quick-tools';
import {
  IOverlayAnimationProps,
  IOverlayBackdropProps,
  IOverlayCloseActions,
  IOverlayLifecycles,
  IOverlayPortalProps,
  Overlay,
} from './overlay';
import { animations } from './overlay-utils/animations';
import { batchedUpdates } from './overlay-utils/batchUpdate';
import { makeDetachedRenderContainer, useRenderContainerFactory } from './overlay-utils/render-containers';
import { Position, PositionOffset, PositionPlacement } from './position';

export interface DialogProps
  extends IOverlayCloseActions,
    IOverlayLifecycles,
    IOverlayBackdropProps,
    IOverlayAnimationProps,
    IOverlayPortalProps {
  style?: React.CSSProperties;
  className?: string;
  visible?: boolean;
  onRequestClose?(reason: any): void;
  content?: React.ReactNode;
  children?: React.ReactNode;

  /** 使用 render prop 的形式指定弹层内容，用于精确控制 DOM 结构，只能在 minimal 模式下使用 */
  renderChildren?(pass: { ref: React.Ref<Element> }): React.ReactNode;
  title?: React.ReactNode;

  /** @displayType null | React.ReactElement | Action[] */
  footer?:
    | null
    | React.ReactElement
    // TODO 和 action-list 收敛到一起
    | Array<{
        component: 'button';
        type?: ButtonProps['type'];
        label: React.ReactNode;
        onClick(event: React.MouseEvent): void;
        autoCloseDialog?: boolean;
      }>;

  onOk?(): void;
  onCancel?(): void;
  placement?: PositionPlacement;
  offset?: PositionOffset;

  /** 是否显示对话框关闭图标 */
  canCloseByIcon?: boolean;

  /** 是否使用极简样式，极简样式下不会生成对话框的内部结构，会直接渲染 children */
  minimal?: boolean;
}

function renderDialogFooter(
  footerWithConfig: Pick<DialogProps, 'footer' | 'onOk' | 'onCancel' | 'onRequestClose'>,
  className = 'rex-dialog-footer',
) {
  const { footer, onRequestClose, onCancel, onOk } = footerWithConfig;

  if (footer === null) {
    return null;
  }

  if (Array.isArray(footer)) {
    return (
      <div className={className}>
        {footer.map((item, index) => {
          if (item.component === 'button') {
            return (
              <Button
                key={index}
                type={item.type}
                onClick={(event) => {
                  batchedUpdates(() => {
                    item.onClick(event);
                    if (item.autoCloseDialog) {
                      onRequestClose('auto-close');
                    }
                  });
                }}
              >
                {item.label}
              </Button>
            );
          }
        })}
      </div>
    );
  }

  if (footer === undefined) {
    return (
      <div className={className}>
        <Button
          type="normal"
          onClick={() => {
            onCancel();
            onRequestClose('ok');
          }}
        >
          取消
        </Button>
        <Button
          type="primary"
          onClick={() => {
            onOk();
            onRequestClose('cancel');
          }}
        >
          确认
        </Button>
      </div>
    );
  }

  return <div className={className}>{footer}</div>;
}

export function Dialog({
  visible,
  children,
  content = children,
  renderChildren,
  title,
  footer,
  onRequestClose,
  hasBackdrop = true,
  onCancel = noop,
  onOk = noop,
  canCloseByEsc = false,
  canCloseByOutSideClick = false,
  disableScroll = true,
  canCloseByIcon = false,
  className,
  style,
  portalContainer: portalContainerProp,
  placement = 'center',
  offset,
  minimal,
  ...overlayProps
}: DialogProps) {
  const overlayBehavior = useOverlayBehavior();
  const portalContainer = portalContainerProp ?? overlayBehavior.portalContainer;
  const mergeRefs = useMemoizedMergeRefs();

  return (
    <Overlay
      {...overlayProps}
      visible={visible}
      onRequestClose={onRequestClose}
      hasBackdrop={hasBackdrop}
      disableScroll={disableScroll}
      canCloseByEsc={canCloseByEsc}
      canCloseByOutSideClick={canCloseByOutSideClick}
      animation={overlayProps.animation ?? Dialog.defaultAnimation}
      portalContainer={portalContainer}
      renderChildren={({ ref: overlayContentRef }) => (
        <Position placement={placement} offset={offset} container={portalContainer}>
          {(positionTargetRef) => {
            const ref = mergeRefs(overlayContentRef, positionTargetRef);
            return (minimal ? renderMinimalDialogContent : renderNormalDialogContent)(ref);
          }}
        </Position>
      )}
    />
  );

  // TODO  需要改为 Dialog.Inner 和 Dialog， minimal 模式下使用 Inner 直接渲染即可
  function renderMinimalDialogContent(ref: React.RefCallback<Element>) {
    if (typeof renderChildren === 'function') {
      return <div className="rex-popup-content">{renderChildren({ ref })}</div>;
    }

    throw new Error('minimal 模式下只支持使用 renderChildren');
  }

  function renderCloseIcon() {
    return (
      canCloseByIcon && (
        <div className="rex-dialog-close" onClick={onRequestClose}>
          <Icon type="close" className="rex-dialog-close-icon" />
        </div>
      )
    );
  }

  function renderNormalDialogContent(ref: React.RefCallback<Element>) {
    return (
      <div ref={ref} className={cx('rex-dialog', className)} style={style}>
        {renderDialogHeader()}
        {renderDialogBody()}
        {renderDialogFooter({ footer, onOk, onCancel, onRequestClose })}
        {renderCloseIcon()}
      </div>
    );

    function renderDialogHeader() {
      return title && <div className="rex-dialog-header">{title}</div>;
    }

    function renderDialogBody() {
      return <div className="rex-dialog-body">{content}</div>;
    }
  }
}

Dialog.defaultAnimation = { in: animations.zoomIn, out: animations.zoomOut };
Dialog.renderDialogFooter = renderDialogFooter;

const staticQuickTools = makeDialogQuickTools(makeDetachedRenderContainer);
Dialog.show = staticQuickTools.show;
Dialog.confirm = staticQuickTools.confirm;
Dialog.alert = staticQuickTools.alert;
Dialog.close = staticQuickTools.close;
Dialog.closeAll = staticQuickTools.closeAll;

Dialog.useDialog = () => {
  const [containerFactory, contextHolder] = useRenderContainerFactory();
  const dialog = useMemo(() => makeDialogQuickTools(containerFactory), [containerFactory]);

  return [dialog, contextHolder] as const;
};
