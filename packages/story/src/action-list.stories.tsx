import React from 'react';
import { DemoGroup, ActionList } from '@rexd/core';

export default { title: 'ActionList' };

const actions = [
  {
    label: '编辑',
    key: 'edit',
  },
  {
    label: '删除',
    key: 'remove',
    hasConfirm: true,
  },
  {
    label: '更多',
    key: 'more',
    children: [
      { label: '同意', key: 'approve' },
      { label: '拒绝', key: 'reject' },
      { label: '转发', key: 'forward' },
    ],
  },
];

export const Basic = () => <ActionList actions={actions} onSelect={console.log} />;

export const Shape = () => <ActionList actions={actions} shape="solid" onSelect={console.log} />;

export const Icons = () => {
  const actions = [
    { key: 'add', icon: 'add' },
    { key: 'print', icon: 'print' },
    { key: 'import', icon: 'import' },
  ];

  return (
    <DemoGroup>
      <ActionList actions={actions} onSelect={console.log} />
    </DemoGroup>
  );
};

export const Custom = () => {
  const actions = [
    {
      key: 'custom1',
      render: () => <button>自定义按钮</button>,
    },
    {
      key: 'custom2',
      render: () => <button>自定义按钮</button>,
    },
  ];

  return (
    <DemoGroup>
      <ActionList actions={actions} onSelect={console.log} />
    </DemoGroup>
  );
};
