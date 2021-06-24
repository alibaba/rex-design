import { Range } from '@rexd/core/src/components/range';
import React from 'react';

export default { title: 'Range' };

export function Basic() {
  return <Range defaultValue={20} onChange={console.log} />;
}

export function HasLabels() {
  return <Range defaultValue={20} hasLabels onChange={console.log} />;
}
