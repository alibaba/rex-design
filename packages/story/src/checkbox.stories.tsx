import React, { useState } from 'react';
import { Group, CheckboxGroup, Checkbox } from '@rexd/core';

export default { title: 'Checkbox' };

export const Basic = () => (
  <Group>
    <Checkbox onChange={console.log}>订阅</Checkbox>
    <Checkbox defaultChecked onChange={console.log}>
      订阅
    </Checkbox>
    <Checkbox defaultIndeterminate onChange={console.log}>
      订阅
    </Checkbox>
    <Checkbox checked>订阅（受控）</Checkbox>
    <Checkbox indeterminate>订阅（受控）</Checkbox>
    <Checkbox disabled>订阅（禁用）</Checkbox>
  </Group>
);

export const Value = () => {
  const [checked, setChecked] = useState();

  return (
    <Group>
      <Checkbox defaultChecked>订阅（非受控）</Checkbox>
      <Checkbox checked={checked} onChange={(val) => setChecked(checked)}>
        订阅（受控）
      </Checkbox>
    </Group>
  );
};

export const Indeterminate = () => <Checkbox indeterminate>半选</Checkbox>;

const dataSource = [
  { label: '客服', value: '01' },
  { label: '店长', value: '02' },
  { label: '师傅', value: '03' },
];

export const GroupDemo = () => {
  const [val, setVal] = useState([]);

  return (
    <Group>
      <h3>非受控</h3>
      <CheckboxGroup dataSource={dataSource} defaultValue={['01']} onChange={console.log} />

      <h3>受控</h3>
      <CheckboxGroup dataSource={dataSource} value={val} onChange={(val) => setVal(val)} />
    </Group>
  );
};

export const Examples = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);

  return (
    <Group>
      <Checkbox>默认</Checkbox>
      <Checkbox disabled>禁用状态</Checkbox>
      <Checkbox defaultChecked>默认选中</Checkbox>
      <div onClick={() => console.log('点击了我')}>
        <Checkbox onChange={console.log}>onChange回调</Checkbox>
      </div>

      <p>尺寸</p>
      <Checkbox size="small">太小了</Checkbox>
      <Checkbox size="medium">加大</Checkbox>
      <Checkbox size="large">再加大</Checkbox>

      <p>受控</p>
      <Checkbox checked={checked}>受控选中态</Checkbox>
      <Checkbox indeterminate={indeterminate}>受控中间态</Checkbox>

      <button onClick={() => setChecked(!checked)}>切换选中状态</button>
      <button onClick={() => setIndeterminate(!indeterminate)}>切换中间态</button>

      <p>样式</p>
      <Checkbox style={{ background: '#999' }}>自定义 style</Checkbox>
      <Checkbox className="this-is-my-classname">自定义 className</Checkbox>
    </Group>
  );
};
