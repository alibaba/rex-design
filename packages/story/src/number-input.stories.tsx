import React from 'react';
import { DemoGroup, DemoTitle, Flex, NumberInput } from '@rexd/core';

export default { title: 'NumberInput' };

export function Basic() {
  return (
    <DemoGroup>
      <DemoTitle title="普通" />
      <NumberInput defaultValue={20} onChange={console.log} />
      <DemoTitle title="输入框只读" />
      <NumberInput defaultValue={20} onChange={console.log} readOnly />
      <DemoTitle title="禁用" />
      <NumberInput defaultValue={20} onChange={console.log} disabled />
    </DemoGroup>
  );
}

export function MinMaxStep() {
  return <NumberInput defaultValue={20} min={10} max={30} step={5} onChange={console.log} />;
}

export function Precision() {
  return <NumberInput defaultValue={11.11} precision={2} step={0.01} onChange={console.log} />;
}

export function Format() {
  return (
    <DemoGroup>
      <NumberInput defaultValue={999999} onChange={console.log} />
      <NumberInput defaultValue={0.05} step={0.01} onChange={console.log} formatOptions={{ style: 'percent' }} />
    </DemoGroup>
  );
}
