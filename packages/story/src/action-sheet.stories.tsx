import React from 'react';
import { ActionSheet, Button } from '@rexd/core';

export default { title: 'ActionSheet' };

const dataSource = [
  { label: '同意', key: 'accept' },
  { label: '拒绝', key: 'reject' },
  { label: '转发', key: 'forward' },
  { label: '删除', key: 'delete' },
] as any;

export function Basic() {
  return (
    <ActionSheet
      target={<Button>选择操作</Button>}
      title="选择你的操作"
      dataSource={dataSource}
      onItemClick={console.log}
    />
  );
}
