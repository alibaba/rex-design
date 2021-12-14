import { Range } from '@rexd/core';
import React, { useState } from 'react';

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
        disabled
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

export function MaxMin() {
  return <Range style={{ margin: 40 }} max={1e5} min={1e-5} defaultValue={30} />;
}

export function CustomTip() {
  const [per, setPer] = useState(0);

  return (
    <Range
      value={per}
      onChange={setPer}
      style={{ margin: 40 }}
      tipRender={(percent) => <div style={{ width: 80 }}>人数上限: {percent} 人</div>}
      max={1e5}
      min={0}
      defaultValue={30}
    />
  );
}

export function Disabled() {
  return <Range style={{ margin: 40 }} value={30} disabled />;
}
