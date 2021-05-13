import { AdaptivePopup, Menu, MenuProps } from '@rexd/core';
import React, { useState } from 'react';

export interface DropdownMenuProps {
  target: React.ReactNode;
  menuDataSource: MenuProps['dataSource'];
}

export function DropdownMenu({ target, menuDataSource }: DropdownMenuProps) {
  const [visible, setVisible] = useState(false);
  const onRequestClose = () => setVisible(false);
  const onRequestOpen = () => setVisible(true);

  return (
    <AdaptivePopup
      visible={visible}
      onRequestOpen={onRequestOpen}
      onRequestClose={onRequestClose}
      target={target}
      interactionKind="click"
      renderChildren={(arg: any) => (
        <Menu
          {...arg}
          style={{
            boxShadow: '0 0 0 1px rgba(16,22,26,.1), 0 2px 4px rgba(16,22,26,.2), 0 8px 24px rgba(16,22,26,.2)',
          }}
          dataSource={menuDataSource}
          onItemClick={() => {
            onRequestClose();
          }}
        />
      )}
    />
  );
}
