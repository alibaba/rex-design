import React from 'react';
import { Group, DatePicker, DateRangePicker, dayjs } from '@rexd/core';

export default { title: 'DatePicker' };

export function Basic() {
  return (
    <Group>
      <DatePicker onChange={console.log} defaultValue="2021-03-15" />
      <DateRangePicker defaultValue={['2021-03-12', '2021-04-02']} onChange={console.log} />
    </Group>
  );
}

export function HasTime() {
  return (
    <Group>
      <DatePicker hasTime onChange={console.log} />

      <DatePicker hasTime timeProps={{ mode: 'normal' }} onChange={console.log} />

      <DateRangePicker hasTime onChange={console.log} />
    </Group>
  );
}

export function GetVisibleMonth() {
  return <DatePicker getDefaultVisibleMonth={() => dayjs('2020-12', 'YYYY-MM')} />;
}

export function DisabledDate() {
  const today = dayjs();

  return (
    <DatePicker
      getDisabledDate={(date) => {
        // 禁用今天之前的所有日期
        if (date.isBefore(today)) {
          return true;
        }
        return false;
      }}
    />
  );
}
