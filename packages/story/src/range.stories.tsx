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

export function WithMarks() {
  return (
    <div>
      <Range
        style={{ margin: 40 }}
        defaultValue={50}
        marks={{
          0: '0°C',
          26: '26',
          37: '37°C',
          100: '100%',
        }}
        onChange={(nextValue) => {
          console.log('range onChange:', nextValue);
        }}
      />

      <Range
        style={{ margin: 40 }}
        defaultValue={37}
        marks={[0, 26, 37, 100]}
        onChange={(nextValue) => {
          console.log('range onChange:', nextValue);
        }}
      />

      <Range
        style={{ margin: 40 }}
        defaultValue={20}
        marks={20}
        onChange={(nextValue) => {
          console.log('range onChange:', nextValue);
        }}
      />

      <Range
        style={{ margin: 40 }}
        defaultValue={20}
        marks={20}
        marksPosition="below"
        onChange={(nextValue) => {
          console.log('range onChange:', nextValue);
        }}
      />
    </div>
  );
}

export function Disabled() {
  return <Range style={{ margin: 40 }} value={30} disabled />;
}
