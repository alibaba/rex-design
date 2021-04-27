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
