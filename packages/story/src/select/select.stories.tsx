import React, { useState } from 'react';
import _ from 'lodash-es';
import { Button, Flex, RefactoredSelect as Select } from '@rexd/core';

export default { title: 'Select / Select' };

const standardDataSource = [
  { label: '盒马', value: 'hema' },
  { label: '飞猪', value: 'feizhu' },
  { label: '天猫', value: 'tianmao' },
  { label: '淘宝', value: 'taobao', disabled: true },
];

export function Basic() {
  const [value, onChange] = useState('');

  return <Select value={value} onChange={onChange} hasClear hasArrow dataSource={standardDataSource} />;
}

export function Fill() {
  return <Select fill dataSource={standardDataSource} />;
}

export function Minimum() {
  return <Select shape="simple" dataSource={standardDataSource} />;
}

export function Search() {
  return (
    <Select
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
  return (
    <Select
      dataSource={_.range(0, 20000).map((i) => ({
        label: `选项-${i + 1}`,
        value: i + 1,
      }))}
    />
  );
}

export function Status() {
  return (
    <Flex style={{ gap: 12 }}>
      <Select status="normal" dataSource={standardDataSource} />
      <Select status="error" dataSource={standardDataSource} />
      <Select status="warning" dataSource={standardDataSource} />
      <Select status="success" dataSource={standardDataSource} />
    </Flex>
  );
}

export function Multiple() {
  return <Select multiple style={{ width: 300 }} hasClear hasArrow dataSource={standardDataSource} />;
}

export function Disabled() {
  return <Select hasClear hasArrow disabled value="淘宝2" dataSource={standardDataSource} />;
}

export function PlaceWithButtons() {
  return (
    <Flex spacing={8}>
      <Button>left</Button>
      <Select hasArrow dataSource={standardDataSource} />
      <Button>right</Button>
    </Flex>
  );
}
