import { Button, Flex, Select } from '@rexd/core';
import _ from 'lodash-es';
import React, { useState } from 'react';

export default { title: 'Select / Select' };

const basicSelectDataSource = ['盒马', '淘宝', '天猫', { value: '飞猪', label: '飞猪', disabled: true }];

export function Basic() {
  const [value, onChange] = useState('');

  return <Select.Single value={value} onChange={onChange} hasClear hasArrow dataSource={basicSelectDataSource} />;
}

export function Fill() {
  return <Select.Single fill dataSource={basicSelectDataSource} />;
}

export function Minimum() {
  return <Select.Single shape="simple" dataSource={basicSelectDataSource} />;
}

export function Search() {
  return (
    <Select.Single
      showSearch
      dataSource={[
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: true },
        { value: '4', label: '阿里动物园' },
        { value: '盒马', label: '盒马' },
        { value: '淘宝', label: '淘宝' },
        { value: '天猫', label: '天猫' },
        { value: 'foo-4', label: '其他小朋友' },
        { value: '2号动物园', label: '2号动物园' },
        { value: '小脑虎', label: '小脑虎' },
        { value: '小狮子', label: '小狮子' },
        { value: '小企鹅', label: '小企鹅' },
        { value: 'bar-4', label: '小朋友' },
        { value: 'bar-4-小红红', label: '小红红' },
        { value: 'bar-4-小蓝蓝', label: '小蓝蓝' },
        { value: 'bar-4-小灰灰', label: '小灰灰' },
      ]}
    />
  );
}

export function BigData() {
  return <Select.Single dataSource={_.range(0, 20000).map((i) => `选项-${i + 1}`)} />;
}

export function Status() {
  return (
    <Flex style={{ gap: 12 }}>
      <Select status="normal" dataSource={basicSelectDataSource} />
      <Select status="error" dataSource={basicSelectDataSource} />
      <Select status="warning" dataSource={basicSelectDataSource} />
      <Select status="success" dataSource={basicSelectDataSource} />
    </Flex>
  );
}

export function Multiple() {
  return (
    <Select.Multi
      style={{ width: 300 }}
      hasClear
      hasArrow
      dataSource={[
        '盒马1',
        '淘宝1',
        '天猫1',
        { value: '飞猪1', label: '飞猪1', disabled: true },
        '盒马2',
        '淘宝2',
        '天猫2',
        { value: '飞猪2', label: '飞猪2', disabled: true },
      ]}
    />
  );
}

export function Disabled() {
  return (
    <Select
      hasClear
      hasArrow
      disabled
      value="淘宝2"
      dataSource={[
        '盒马1',
        '淘宝1',
        '天猫1',
        { value: '飞猪1', label: '飞猪1', disabled: true },
        '盒马2',
        '淘宝2',
        '天猫2',
        { value: '飞猪2', label: '飞猪2', disabled: true },
      ]}
    />
  );
}

export function PlaceWithButtons() {
  return (
    <Flex spacing={8}>
      <Button>left</Button>
      <Select
        hasArrow
        dataSource={[
          '盒马1',
          '淘宝1',
          '天猫1',
          { value: '飞猪1', label: '飞猪1', disabled: true },
          '盒马2',
          '淘宝2',
          '天猫2',
          { value: '飞猪2', label: '飞猪2', disabled: true },
        ]}
      />
      <Button>right</Button>
    </Flex>
  );
}
