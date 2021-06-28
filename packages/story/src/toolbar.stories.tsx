import { ActionListItem, LegacyFooterToolbar, Search, Toolbar } from '@rexd/core';
import React from 'react';

export default { title: 'Toolbar' };

export function Basic() {
  return (
    <Toolbar
      leftActions={[
        { key: 'search', render: () => <Search shape="simple" /> },
        { key: 'print', label: '打印' },
        { key: 'export', label: '导出' },
        { key: 'sort', label: '排序' },
        { key: 'reset', label: '重置' },
        { key: 'refresh', label: '刷新' },
      ]}
      onActionClick={(...args) => {
        console.log('onActionClick', ...args);
      }}
    />
  );
}

export function Complex() {
  const mainActions: ActionListItem[] = [
    { key: 'import', type: 'primary' },
    {
      key: 'other',
      label: '其他操作',
      children: [
        { key: 'menu01', label: '操作项 1' },
        { key: 'menu02', label: '操作项 2' },
      ],
    },
  ];

  const secondActions: ActionListItem[] = [
    { key: 'print' },
    {
      key: 'export',
      props: { shape: 'text' },
      children: [
        {
          key: 'group',
          label: '导出 xlsx',
          children: [
            { key: 'xlsx_all', label: '导出全部自动' },
            { key: 'xlsx_item', label: '导出商品字段' },
          ],
        },
      ],
    },
    { key: 'refresh' },
  ];

  return (
    <Toolbar
      leftActions={mainActions}
      rightActions={secondActions}
      onActionClick={(key) => console.log('clicked:', key)}
    />
  );
}

export function Legacy__Footer() {
  return (
    <LegacyFooterToolbar
      actions={[
        { key: 'approve', label: '同意', shape: 'solid', type: 'primary' },
        { key: 'reject', label: '拒绝', shape: 'warning', type: 'normal' },
        { key: 'other1', label: '动作1', shape: 'solid', type: 'normal' },
        { key: 'other2', label: '动作2', shape: 'solid', type: 'normal' },
      ]}
    />
  );
}
