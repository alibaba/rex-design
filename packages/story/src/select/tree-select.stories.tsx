import { TreeItem, TreeSelect, TreeSelectItem } from '@rexd/core';
import { makeRecursiveMapper } from 'ali-react-table';
import React, { useState } from 'react';
import { useCateTree } from '../test-tree-data';

export default {
  title: 'Select / TreeSelect',
  excludeStories: ['bigTreeDataSource'],
};

export const bigTreeDataSource: TreeSelectItem[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2', disabled: true },
  { value: '4', label: '动物园' },
  {
    value: 'zoo',
    label: '阿里动物园',
    children: [
      { value: '盒马', label: '盒马' },
      { value: '淘宝', label: '淘宝' },
      { value: '天猫', label: '天猫' },
      {
        value: 'foo-4',
        label: '其他小朋友',
        children: [
          { value: '小红红', label: '小红红' },
          { value: '小蓝蓝', label: '小蓝蓝' },
          { value: '小灰灰', label: '小灰灰' },
        ],
      },
    ],
  },
  {
    value: '2号动物园',
    label: '2号动物园',
    children: [
      { value: '小脑虎', label: '小脑虎' },
      { value: '小狮子', label: '小狮子' },
      { value: '小企鹅', label: '小企鹅' },
      {
        value: 'bar-4',
        label: '小朋友',
        children: [
          { value: 'bar-4-小红红', label: '小红红' },
          { value: 'bar-4-小蓝蓝', label: '小蓝蓝' },
          { value: 'bar-4-小灰灰', label: '小灰灰' },
        ],
      },
    ],
  },
];

export function Basic() {
  const [value, onChange] = useState('');
  return (
    <TreeSelect.Single
      style={{ width: 300 }}
      defaultExpandAll
      onChange={onChange}
      value={value}
      dataSource={bigTreeDataSource}
    />
  );
}

export function ShowSearch() {
  const [value, onChange] = useState('');
  return (
    <TreeSelect.Single
      style={{ width: 300 }}
      defaultExpandAll
      showSearch
      onChange={onChange}
      value={value}
      dataSource={bigTreeDataSource}
    />
  );
}

export function HippoCategoryTree() {
  const cateTree = useCateTree();

  const dataSource = (makeRecursiveMapper<TreeItem>((item) => ({ ...item, value: item.key }))(
    cateTree,
  ) as unknown) as TreeSelectItem[];

  if (dataSource.length === 0) {
    return 'loading...';
  }

  return (
    <TreeSelect.Single
      style={{ width: 200 }}
      popupProps={{ style: { width: 350 } }}
      dataSource={dataSource}
      defaultExpandAll
      showSearch
      placeholder="请选择一个项目"
    />
  );
}

export function MultiHippoCategoryTree() {
  const cateTree = useCateTree();

  const dataSource = (makeRecursiveMapper<TreeItem>((item) => ({ ...item, value: item.key }))(
    cateTree,
  ) as unknown) as TreeSelectItem[];

  const [value, onChange] = useState<string[]>([]);

  if (dataSource.length === 0) {
    return 'loading...';
  }

  return (
    <TreeSelect.Multi
      style={{ width: 300 }}
      value={value}
      onChange={onChange}
      dataSource={dataSource}
      showSearch
      placeholder="请选择类目"
      defaultExpandAll
    />
  );
}
