import React from 'react';
import { Switch, DemoGroup } from '@rexd/core';

export default { title: 'Switch' };

export function Basic() {
  return (
    <DemoGroup>
      <Switch defaultChecked onChange={console.log} />

      <Switch defaultChecked={false} onChange={console.log} />

      <Switch disabled />

      <Switch checked disabled />
    </DemoGroup>
  );
}

export function HasLabel() {
  return (
    <DemoGroup>
      <Switch hasLabel onChange={console.log} />
      <Switch hasLabel defaultChecked onChange={console.log} />
    </DemoGroup>
  );
}

export function Size() {
  return (
    <DemoGroup>
      <Switch size="small" onChange={console.log} />
      <Switch size="small" defaultChecked onChange={console.log} />

      <Switch size="medium" onChange={console.log} />
      <Switch size="medium" defaultChecked onChange={console.log} />
    </DemoGroup>
  );
}
