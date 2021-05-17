import React, { useState } from 'react';
import { Radio, RadioGroup, DemoGroup, DemoTitle } from '@rexd/core';

export default { title: 'Radio' };

const dataSource = [
  { label: '盒马鲜生', value: 'hmxs' },
  { label: '盒马 Mini', value: 'mini' },
  { label: '盒马X会员店', value: 'hmx' },
  { label: '盒马菜场', value: 'hmcc', disabled: true },
];

export function Basic() {
  return (
    <DemoGroup>
      <Radio>盒马先生</Radio>
      <Radio checked>盒马先生</Radio>
      <Radio disabled>盒马迷你</Radio>
      <Radio checked disabled>
        盒马会员店
      </Radio>
    </DemoGroup>
  );
}

export function Group() {
  return (
    <DemoGroup>
      <DemoTitle>无默认值</DemoTitle>
      <RadioGroup dataSource={dataSource} onChange={console.log} />
      <DemoTitle>有默认值</DemoTitle>
      <RadioGroup defaultValue="mini" dataSource={dataSource} onChange={console.log} />
    </DemoGroup>
  );
}

export function Direction() {
  return <RadioGroup direction="column" dataSource={dataSource} onChange={console.log} />;
}

export function Controlled() {
  const [value, setValue] = useState<string>('mini');
  return <RadioGroup value={value} dataSource={dataSource} onChange={setValue} />;
}
