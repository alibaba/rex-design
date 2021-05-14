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
  font-size: var(--rex-fontSizes-body);
  border-radius: 4px 4px 2px 2px;
  max-height: 70%;
  flex-flow: column;
  display: flex;

  &[data-placement] {
    height: auto;
  }

  .rex-fullscreen-dialog-title {
    flex: 0 0 auto;
    font-size: var(--rex-fontSizes-title);
    padding: 24px 24px 16px;
    border-bottom: 1px solid var(--rex-colors-emphasis-30);
    color: var(--rex-colors-text-title);
  }

  .rex-fullscreen-dialog-body {
    font-size: var(--rex-fontSizes-body);
    margin: 16px 24px 32px;
    color: var(--rex-colors-text-body);
    flex: auto;
    overflow: auto;
  }

  .rex-fullscreen-dialog-footer {
    flex: 0 0 auto;
    display: flex;
    margin: 0 24px 24px 24px;
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
    title,
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
      <div className="rex-fullscreen-dialog-title">{title}</div>
      <div className="rex-fullscreen-dialog-body">{children}</div>
      {Dialog.renderDialogFooter({ footer, onOk, onCancel, onRequestClose }, 'rex-fullscreen-dialog-footer')}
    </StyledDrawer>
  );
}

export function AdaptiveDialog(props: DialogProps) {
  const device = useDevice();
  const DialogComponent = device.name === 'phone' ? FullscreenDialog : Dialog;
  return <DialogComponent {...props} />;
}
