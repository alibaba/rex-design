import { MenuButton } from '@rexd/core';
import React from 'react';

export default { title: 'MenuButton' };

const items = [
  { key: '1', label: '编辑' },
  { key: '2', label: '保存', disabled: true },
  { key: '3', label: '打开' },
];

export function Basic() {
  return (
    <MenuButton
      dataSource={items}
      onItemClick={(key, detail) => {
        console.log('clicked:', key, detail);
      }}
    >
      文件
    </MenuButton>
  );
}
