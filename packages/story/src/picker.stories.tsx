import React from 'react';
import { PickerView } from '@rexd/core';

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

export function PickerViewBasic() {
  return (
    <div style={{ marginTop: 200 }}>
      <PickerView
        // onClose={() => setVisible(false)}
        // onCancel={() => setVisible(false)}
        // onOk={() => setVisible(false)}
        value={['Tues', 'am']}
        columns={basicColumns}
        onChange={(...args) => console.log('change:', ...args)}
      />
    </div>
  );
}
