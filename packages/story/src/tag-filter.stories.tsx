import React from 'react';
import { TagFilter, Group } from '@rexd/core';

export default { title: 'TagFilter' };

const list = [
  { value: 'front-end', label: '前端开发' },
  { value: 'visual-design', label: '视觉设计' },
  { value: 'ux', label: '交互设计' },
  { value: 'pm', label: '产品经理' },
  { value: 'back-end', label: '后端开发' },
  { value: 'data', label: '数据分析' },
  { value: 'po', label: '产品运营' },
  { value: 'marketing', label: '市场营销' },
];

export const Basic = () => {
  return <TagFilter dataSource={list} defaultValue={['front-end']} onChange={console.log} />;
};

export const Multiple = () => {
  return <TagFilter dataSource={list} selectMode="multiple" defaultValue={['front-end']} onChange={console.log} />;
};

export const Size = () => (
  <Group>
    <TagFilter
      size="small"
      selectMode="multiple"
      dataSource={list}
      defaultValue={['front-end']}
      onChange={console.log}
      layoutProps={{ spacingY: 'm' }}
    />
    <br />
    <TagFilter
      size="medium"
      selectMode="multiple"
      dataSource={list}
      defaultValue={['front-end']}
      onChange={console.log}
      layoutProps={{ spacingY: 'm' }}
    />
    <br />
    <TagFilter
      size="large"
      selectMode="multiple"
      dataSource={list}
      defaultValue={['front-end']}
      onChange={console.log}
      layoutProps={{ spacingY: 'm' }}
    />
  </Group>
);
