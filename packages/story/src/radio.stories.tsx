import React, { useState } from 'react';
import { Radio, RadioGroup, Group } from '@rexd/core';

export default { title: 'Radio' };

const dataSource = [
  { label: '盒马鲜生', value: 'hmxs' },
  { label: '盒马 Mini', value: 'mini' },
  { label: '盒马X会员店', value: 'hmx' },
  { label: '盒马菜场', value: 'hmcc', disabled: true },
];

export function Basic() {
  return (
    <Group>
      <Radio>盒马先生</Radio>
      <Radio checked>盒马先生</Radio>
      <Radio disabled>盒马迷你</Radio>
      <Radio checked disabled>
        盒马会员店
      </Radio>
    </Group>
  );
}

export function GroupDemo() {
  return (
    <Group spacingY={8}>
      <h3>无默认值</h3>
      <RadioGroup dataSource={dataSource} onChange={console.log} />

      <h3>有默认值</h3>
      <RadioGroup defaultValue="mini" dataSource={dataSource} onChange={console.log} />
    </Group>
  );
}

export function Direction() {
  return <RadioGroup direction="column" dataSource={dataSource} onChange={console.log} />;
}

export function Controlled() {
  const [value, setValue] = useState<string>('mini');
  return <RadioGroup value={value} dataSource={dataSource} onChange={setValue} />;
}
