import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { useDevice } from '../../providers';
import { noop } from '../../utils';
import { Dialog, DialogProps } from './dialog';
import { Drawer, DrawerProps } from './drawer';

export interface FullscreenDialogProps
  extends Omit<DrawerProps, 'placement' | 'minimal' | 'footer'>,
    Pick<DialogProps, 'onOk' | 'onCancel' | 'footer'> {}

const StyledDrawer = styled(Drawer)`
  // todo change to design token
  font-size: 14px;

  &[data-placement] {
    height: auto;
  }

  .rex-fullscreen-dialog-body {
    padding: 6px 8px 8px;
  }

  .rex-fullscreen-dialog-footer {
    display: flex;
    padding: 8px 16px 12px;
    justify-content: flex-end;

    > * {
      margin-left: 8px;
    }
  }
`;

/**
 * 全屏对话框组件；表现与 PC Drawer 类似，用法参考 PC Dialog.
 *
 * `<FullscreenDialog />` 包含以下限制：
 * - 无法指定 placement，总是从底部出现
 * */
export function FullscreenDialog(props: FullscreenDialogProps) {
  const {
    visible,
    onRequestClose,
    canCloseByOutSideClick = true,
    canCloseByEsc = true,
    footer,
    onCancel = noop,
    onOk = noop,
    children,
    ...others
  } = props;

  return (
    <StyledDrawer
      className={cx('rex-fullscreen-dialog', props.className)}
      style={props.style}
      visible={visible}
      onRequestClose={onRequestClose}
      canCloseByOutSideClick={canCloseByOutSideClick}
      canCloseByEsc={canCloseByEsc}
      canCloseByIcon={false}
      {...others}
      // 强制指定的 props
      placement="bottom"
      minimal
    >
      <div className="rex-fullscreen-dialog-body">{children}</div>
      {Dialog.renderDialogFooter({ footer, onOk, onCancel, onRequestClose }, 'rex-fullscreen-dialog-footer')}
    </StyledDrawer>
  );
}

export function AdaptiveDialog(props: DialogProps) {
  const { device } = useDevice();
  const DialogComponent = device.name === 'phone' ? FullscreenDialog : Dialog;
  return <DialogComponent {...props} />;
}
