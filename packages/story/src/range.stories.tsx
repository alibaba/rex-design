import { Range } from '@rexd/core';
import React from 'react';

export default { title: 'Range' };

export function Basic() {
  return (
    <Range
      style={{ margin: 40 }}
      defaultValue={20}
      onChange={(nextValue) => {
        console.log('range onChange:', nextValue);
      }}
    />
  );
}

export function Disabled() {
  return <Range style={{ margin: 40 }} value={30} disabled />;
}
