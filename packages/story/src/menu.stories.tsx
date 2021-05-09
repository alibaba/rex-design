import { Button, Menu, MenuItem, Popup } from '@rexd/core';
import React, { useState } from 'react';

export default { title: 'Menu' };

export function Basic() {
  return (
    <Menu
      style={{ width: 200 }}
      dataSource={[
        { key: '1', label: '选项 1' },
        { key: '2', label: '选项 2', disabled: true },
        { key: '3', label: 'Option 2' },
      ]}
      onItemClick={(key, detail) => {
        console.log('YOUR click', key, detail);
      }}
    />
  );
}

const groupAndSubMenuDataSource: MenuItem[] = [
  { key: '1', label: '选项 1', selected: true, helper: 'Ctrl+P' },
  { key: '2', label: 'Option 2', disabled: true },
  { key: '3', type: 'divider' },
  { key: '4', label: '动物园' },
  {
    key: 'zoo',
    type: 'submenu',
    label: '阿里动物园',
    children: [
      { key: '盒马', label: '盒马' },
      { key: '淘宝', label: '淘宝', selected: true },
      { key: '天猫', label: '天猫' },
      {
        key: 'foo-4',
        type: 'submenu',
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
    type: 'group',
    helper: '1.12 盛大开业',
    label: '2号动物园',
    children: [
      { key: '小脑虎', label: '小脑虎' },
      { key: '小狮子', label: '小狮子', selected: true },
      { key: '小企鹅', label: '小企鹅' },
      {
        key: 'bar-4',
        type: 'submenu',
        label: '小朋友',
        children: [
          { key: '小红红', label: '小红红' },
          { key: '小蓝蓝', label: '小蓝蓝' },
          { key: '小灰灰', label: '小灰灰' },
        ],
      },
    ],
  },
];

export function GroupAndSubMenu() {
  return (
    <Menu
      style={{ width: 200 }}
      dataSource={groupAndSubMenuDataSource}
      onItemClick={(key, detail) => {
        console.log('YOUR click', key, detail);
      }}
    />
  );
}

export function MultiSelect() {
  const [selectedKeys, onSelect] = useState(['1', '3']);

  return (
    <div>
      <p>selectedKeys: {selectedKeys.join(',')}</p>
      <Menu
        style={{ width: 200 }}
        dataSource={[
          { key: '1', label: '选项 1 ', helper: 'Ctrl+P' },
          { key: '2', label: '选项 2' },
          { key: '3', label: 'Option 3' },
        ]}
        selectMode="multiple"
        selectedKeys={selectedKeys}
        onSelect={onSelect}
      />
    </div>
  );
}

export function UncontrolledSingleSelect() {
  return (
    <Menu
      style={{ width: 200 }}
      dataSource={[
        { key: '1', label: '选项 1 ', helper: 'Ctrl+P' },
        { key: '2', label: '选项 2' },
        { key: '3', label: 'Option 3' },
      ]}
      selectMode="single"
      defaultSelectedKeys={['1']}
      onSelect={(nextKeys, detail) => {
        console.log('onSelect', { nextKeys, detail });
      }}
    />
  );
}

export function DropdownMenu() {
  // TODO 允许 menu 能够在组件内部直接关闭 popup
  const [visible, setVisible] = useState(false);

  return (
    <Popup
      target={<Button>更多操作</Button>}
      interactionKind="hover"
      hasArrow
      visible={visible}
      onRequestOpen={() => setVisible(true)}
      onRequestClose={() => setVisible(false)}
    >
      <Menu
        dataSource={groupAndSubMenuDataSource}
        onItemClick={(key) => {
          console.log('onItemClick', key);
          setVisible(false);
        }}
      />
    </Popup>
  );
}
