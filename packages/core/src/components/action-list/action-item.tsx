import React from 'react';
import { Icon, IconType } from '@rexd/icon';
import { Button, ButtonProps } from '../button';
import { Confirm } from '../confirm';

export interface ActionItemProps extends ButtonProps {
  label?: string;
  icon?: IconType;
  /**
   * 是否需要确认，或直接提供确认的内容
   */
  confirm?: React.ReactNode;
  onSelect?: () => void;
  onCancel?: () => void;
}

export function ActionItem(props: ActionItemProps) {
  const { label, icon, confirm, onSelect, onCancel, ...rest } = props;
  const leftElement = icon ? <Icon type={icon as any} /> : null;

  const shared = {
    shape: 'link',
    type: 'primary',
    leftElement,
    ...rest,
  } as ButtonProps;

  let ret;
  if (confirm) {
    ret = (
      <Confirm onOk={onSelect} onCancel={onCancel}>
        <Button {...shared}>{label}</Button>
      </Confirm>
    );
  } else {
    ret = (
      <Button {...shared} onClick={onSelect}>
        {label}
      </Button>
    );
  }

  return ret;
}
