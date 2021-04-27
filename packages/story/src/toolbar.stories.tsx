import React from 'react';

import { Toolbar, FooterToolbar, Search, Button } from '@rexd/core';

export default { title: 'Toolbar' };

export function Basic() {
  const actions = [
    { key: 'search', render: () => <Search shape="simple" /> },
    { key: 'print', label: '打印' },
    { key: 'export', label: '导出' },
    { key: 'sort', label: '排序' },
    { key: 'reset', label: '重置' },
    { key: 'refresh', label: '刷新' },
  ];

  return <Toolbar actions={actions} />;
}

export function Footer() {
  const actions = [
    { key: 'approve', label: '同意', shape: 'solid', type: 'primary' },
    { key: 'reject', label: '拒绝', shape: 'warning', type: 'normal' },
    { key: 'other1', label: '动作1', shape: 'solid', type: 'normal' },
    { key: 'other2', label: '动作2', shape: 'solid', type: 'normal' },
  ];
  return <FooterToolbar actions={actions} />;
}
