import React, { useState } from 'react';
import { Icon, IconType } from '@rexd/icon';
import { Button, ButtonProps } from '../button';
import { Tooltip } from '../overlays';
import { Box, Group } from '../layout';

export interface ActionItemProps extends ButtonProps {
  label?: string;
  icon?: IconType;
  hasConfirm?: boolean;
  onSelect?: () => void;
  onCancel?: () => void;
}

export function ActionItem(props: ActionItemProps) {
  const [visible, setVisible] = useState(false);
  const { label, icon, hasConfirm, onSelect, onCancel, ...rest } = props;
  const leftElement = icon ? <Icon type={icon as any} /> : null;

  const shared = {
    shape: 'link',
    type: 'primary',
    leftElement,
    ...rest,
  } as ButtonProps;

  let ret;
  if (hasConfirm) {
    const handleCancel = () => {
      setVisible(false);
      if (typeof onCancel === 'function') {
        onCancel();
      }
    };

    const handleOk = () => {
      setVisible(false);
      if (typeof onSelect === 'function') {
        onSelect();
      }
    };

    ret = (
      <Tooltip
        visible={visible}
        onRequestOpen={() => setVisible(true)}
        onRequestClose={() => setVisible(false)}
        renderTarget={(pass) => (
          <Button {...pass} {...shared}>
            {label}
          </Button>
        )}
        interactionKind="click"
        title={
          <Box minWidth="140px">
            <Box mb="m">你确定吗?</Box>
            <Group display="flex" justifyContent="flex-end">
              <Button size="small" onClick={handleCancel}>
                取消
              </Button>
              <Button size="small" type="primary" onClick={handleOk}>
                确认
              </Button>
            </Group>
          </Box>
        }
      />
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
