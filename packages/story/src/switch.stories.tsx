import React from 'react';
import { Switch, Group } from '@rexd/core';

export default { title: 'Switch' };

export function Basic() {
  return (
    <Group>
      <Switch defaultChecked onChange={console.log} />

      <Switch defaultChecked={false} onChange={console.log} />

      <Switch disabled />

      <Switch checked disabled />
    </Group>
  );
}

export function HasLabel() {
  return (
    <Group>
      <Switch hasLabel onChange={console.log} />
      <Switch hasLabel defaultChecked onChange={console.log} />
    </Group>
  );
}

export function Size() {
  return (
    <Group>
      <Switch size="small" onChange={console.log} />
      <Switch size="small" defaultChecked onChange={console.log} />

      <Switch size="medium" onChange={console.log} />
      <Switch size="medium" defaultChecked onChange={console.log} />
    </Group>
  );
}
