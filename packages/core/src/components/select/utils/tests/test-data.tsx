import { TreeItem } from '../../tree-view';
import { TreeSelectItem } from '../../types';

export const bigSelectDataSource: TreeSelectItem[] = [
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

export const bigTreeDataSource: TreeItem[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2', disabled: true },
  { key: '4', label: '动物园' },
  {
    key: 'zoo',
    label: '阿里动物园',
    children: [
      { key: '盒马', label: '盒马' },
      { key: '淘宝', label: '淘宝' },
      { key: '天猫', label: '天猫' },
      {
        key: 'foo-4',
        label: '其他小朋友',
        children: [
          { key: '小红红', label: '小红红' },
          { key: '小蓝蓝', label: '小蓝蓝' },
          { key: '小灰灰', label: '小灰灰' },
        ],
      },
    ],
  },
  {
    key: '2号动物园',
    label: '2号动物园',
    children: [
      { key: '小脑虎', label: '小脑虎' },
      { key: '小狮子', label: '小狮子' },
      { key: '小企鹅', label: '小企鹅' },
      {
        key: 'bar-4',
        label: '小朋友',
        children: [
          { key: 'bar-4-小红红', label: '小红红' },
          { key: 'bar-4-小蓝蓝', label: '小蓝蓝' },
          { key: 'bar-4-小灰灰', label: '小灰灰' },
        ],
      },
    ],
  },
];
