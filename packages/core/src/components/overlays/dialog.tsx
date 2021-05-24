import cx from 'classnames';
import React, { useMemo } from 'react';
import { useOverlayBehavior } from '../../providers';
import { noop, useMemoizedMergeRefs } from '../../utils';
import { ButtonProps } from '../button';
import { Panel, PanelProps } from '../layout';
import { DialogFooter, DialogInner } from './dialog-inner';
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
import { makeDetachedRenderContainer, useRenderContainerFactory } from './overlay-utils/render-containers';
import { Position, PositionOffset, PositionPlacement } from './position';

const DialogPanel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ children, bg = 'var(--rex-overlay-depth-l)', ...props }, ref) => (
    <Panel ref={ref} bg={bg} {...props}>
      {children}
    </Panel>
  ),
);

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

  /** 使用 render prop 的形式指定弹层内容，用于精确控制 DOM 结构 */
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
}

export function Dialog(props: DialogProps) {
  const {
    visible,
    children,
    content = children,
    renderChildren,
    title,
    footer,
    onRequestClose,
    hasBackdrop,
    onCancel,
    onOk,
    canCloseByEsc,
    canCloseByOutSideClick,
    disableScroll,
    canCloseByIcon,
    className,
    style,
    portalContainer: portalContainerProp,
    placement,
    offset,
    ...overlayProps
  } = props;

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
            if (renderChildren != null) {
              return renderChildren({ ref });
            }

            return (
              <Dialog.Panel ref={ref} style={props.style} className={cx('rex-dialog', props.className)}>
                <Dialog.Inner
                  title={title}
                  content={content}
                  footer={footer}
                  onOk={onOk}
                  onCancel={onCancel}
                  canCloseByIcon={canCloseByIcon}
                  onRequestClose={onRequestClose}
                />
              </Dialog.Panel>
            );
          }}
        </Position>
      )}
    />
  );
}

Dialog.defaultProps = {
  hasBackdrop: true,
  onCancel: noop,
  onOk: noop,
  canCloseByEsc: false,
  canCloseByOutSideClick: false,
  disableScroll: true,
  canCloseByIcon: false,
  placement: 'center',
};
Dialog.defaultAnimation = { in: animations.zoomIn, out: animations.zoomOut };

Dialog.Panel = DialogPanel;
Dialog.Inner = DialogInner;
Dialog.Footer = DialogFooter;

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
