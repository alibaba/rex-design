import React from 'react';
import { Group, NumberInput } from '@rexd/core';

export default { title: 'NumberInput' };

export function Basic() {
  return (
    <Group>
      <h3>普通</h3>
      <NumberInput defaultValue={20} onChange={console.log} />
      <h3>输入框只读</h3>
      <NumberInput defaultValue={20} onChange={console.log} readOnly />
      <h3>禁用</h3>
      <NumberInput defaultValue={20} onChange={console.log} disabled />
    </Group>
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
    <Group>
      <NumberInput defaultValue={999999} onChange={console.log} />
      <NumberInput defaultValue={0.05} step={0.01} onChange={console.log} formatOptions={{ style: 'percent' }} />
    </Group>
  );
}
