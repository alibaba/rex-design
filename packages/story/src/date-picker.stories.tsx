import React from 'react';
import { DemoGroup, DatePicker, DateRangePicker, dayjs } from '@rexd/core';

export default { title: 'DatePicker' };

export function Basic() {
  return (
    <DemoGroup>
      <DatePicker onChange={console.log} defaultValue="2021-03-15" />
      <DateRangePicker defaultValue={['2021-03-12', '2021-04-02']} onChange={console.log} />
    </DemoGroup>
  );
}

export function HasTime() {
  return (
    <DemoGroup>
      <DatePicker hasTime />

      <DatePicker hasTime timeProps={{ mode: 'normal' }} />

      <DateRangePicker hasTime />
    </DemoGroup>
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
