import React from 'react';
import { TimePicker, Group } from '@rexd/core';

export default { title: 'TimePicker' };

export const Basic = () => (
  <Group>
    <TimePicker onChange={console.log} />
    <TimePicker defaultValue="12:30:00" onChange={console.log} />
  </Group>
);

export const Simple = () => (
  <Group>
    <TimePicker mode="simple" onChange={console.log} />
  </Group>
);

export const CustomTimeItems = () => {
  const items = [];

  let i = 9;
  while (i < 22) {
    const key = i < 10 ? `0${i}` : i;
    items.push({ label: `${key}:00`, value: `${key}:00` });
    i++;
  }

  return (
    <Group>
      <TimePicker
        getHourItems={() => [8, 9, 10, 11, 12].map((item) => ({ label: item, value: item }))}
        getMinuteItems={() => [0, 15, 30, 45].map((item) => ({ label: item, value: item }))}
        getSecondItems={() => [0, 59].map((item) => ({ label: item, value: item }))}
      />
      <TimePicker mode="simple" getQuickItems={() => items} />
    </Group>
  );
};

export const CustomTimePanels = () => (
  <Group>
    <TimePicker hasSeconds={false} format="HH:mm" />
  </Group>
);
