import { Checkbox, CheckboxGroup, Group } from '@rexd/core';
import React, { useState } from 'react';

export default { title: 'Checkbox' };

export const Basic = () => (
  <Group>
    <Checkbox onChange={console.log}>订阅</Checkbox>
    <Checkbox defaultChecked onChange={console.log}>
      订阅
    </Checkbox>
    <Checkbox defaultIndeterminate onChange={console.log}>
      订阅
    </Checkbox>
    <Checkbox checked>订阅（受控）</Checkbox>
    <Checkbox indeterminate>订阅（受控）</Checkbox>
    <Checkbox disabled>订阅（禁用）</Checkbox>
  </Group>
);

export const Controlled = () => {
  const [checked, setChecked] = useState();

  return (
    <Group>
      <Checkbox defaultChecked>订阅（非受控）</Checkbox>
      <Checkbox checked={checked} onChange={(val) => setChecked(checked)}>
        订阅（受控）
      </Checkbox>
    </Group>
  );
};

const dataSource = [
  { label: '客服', value: '01' },
  { label: '店长', value: '02' },
  { label: '师傅', value: '03' },
];

export const GroupDemo = () => {
  return (
    <Group>
      <h3>水平</h3>
      <CheckboxGroup dataSource={dataSource} defaultValue={['01']} onChange={console.log} />
      <br />
      <h3>垂直</h3>
      <CheckboxGroup direction="column" dataSource={dataSource} defaultValue={['01']} onChange={console.log} />
    </Group>
  );
};

export const ControlledGroup = () => {
  const [val, setVal] = useState(null);
  return <CheckboxGroup dataSource={dataSource} value={val} onChange={(val) => setVal(val)} />;
};
