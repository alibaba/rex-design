import React from 'react';
import { ActionList, ActionListProps } from '@rexd/core';

export default { title: 'ActionList', component: ActionList };

const actions = [
  {
    label: '编辑',
    key: 'edit',
  },
  {
    label: '删除',
    key: 'remove',
    confirm: true,
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

export const CustomConfirm = () => {
  return (
    <ActionList
      actions={[
        {
          label: '编辑',
          key: 'edit',
        },
        {
          label: '删除',
          key: 'remove',
          confirm: '确认删除吗？',
        },
      ]}
      onSelect={console.log}
    />
  );
};

export const HideSeparator = () => {
  return <ActionList hasSeparator={false} actions={actions} onSelect={console.log} />;
};

export const Icons = () => {
  const actions = [
    { key: 'add', icon: 'add' },
    { key: 'print', icon: 'print' },
    { key: 'import', icon: 'import' },
  ] as ActionListProps['actions'];

  return <ActionList actions={actions} onSelect={console.log} />;
};

export const Custom = () => {
  const actions2 = [
    {
      key: 'custom1',
      render: ({ onClick }: any) => <button onClick={onClick}>自定义按钮</button>,
    },
    {
      key: 'custom2',
      render: ({ onClick }: any) => <button onClick={onClick}>自定义按钮</button>,
    },
  ];

  return <ActionList actions={actions2} onSelect={console.log} />;
};
