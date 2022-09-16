import React, { useState } from 'react';
import { Button, Picker, PickerView } from '@rexd/core';

export default { title: 'PickerView', component: PickerView };

const basicColumns = [
  [
    { label: '周一', value: 'Mon' },
    { label: '周二', value: 'Tues' },
    { label: '周三', value: 'Wed' },
    { label: '周四', value: 'Thur' },
    { label: '周五', value: 'Fri' },
  ],
  [
    { label: '上午', value: 'am' },
    { label: '下午', value: 'pm' },
  ],
];

export function Basic() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        选择
      </Button>
      <Picker
        columns={basicColumns}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(value, detail) => {
          setValue(value);
          console.log('onChange', value, detail);
        }}
      />
    </>
  );
}

export function PickerViewBasic() {
  return (
    <div style={{ marginTop: 200 }}>
      <PickerView
        value={['Tues', 'am']}
        columns={basicColumns}
        onChange={(...args) => console.log('change:', ...args)}
      />
    </div>
  );
}
