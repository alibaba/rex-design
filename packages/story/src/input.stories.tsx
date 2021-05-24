import { Flex, Group, Input, InputAddon, useDevice } from '@rexd/core';
import { Icon } from '@rexd/icon';
import React, { useState } from 'react';

export default { title: 'Input' };

export function Basic() {
  return (
    <Flex spacing="l" direction="column">
      <Input onChange={console.log} />
      <Input defaultValue="默认值" onChange={console.log} />
      <Input defaultValue="只读输入框" onChange={console.log} readOnly />
      <Input defaultValue="只读输入框" onChange={console.log} disabled />
    </Flex>
  );
}

export function Status() {
  return (
    <Flex spacing="l" direction="column">
      <Input defaultValue="hippo" status="error" />
      <Input defaultValue="hippo" status="success" />
      <Input defaultValue="hippo" status="warning" />
    </Flex>
  );
}

export function HasClear() {
  return <Input hasClear defaultValue="点击右侧图标清空当前文本" onChange={console.log} />;
}

export function NoBorder() {
  return <Input shape="simple" placeholder="简单输入框" />;
}

export function Elements() {
  return (
    <Flex spacing="l" direction="column">
      <Input
        hasClear
        leftElement={<Icon type="search" />}
        rightElement={<Icon type="calendar" />}
        defaultValue="default value"
      />
    </Flex>
  );
}

export function Controlled() {
  const [input, setInput] = useState('rex');
  return <Input placeholder="Basic usage" onChange={(val) => setInput(val)} value={input} />;
}

export function Password() {
  const [hide, setHide] = useState(true);
  return (
    <Input
      type={hide ? 'password' : 'text'}
      defaultValue="1234"
      rightElement={<Icon type={hide ? 'eye-close' : 'browse'} onClick={() => setHide(!hide)} />}
    />
  );
}

export function AutoCompleteOff() {
  return (
    <Group>
      <h3>禁用表单自动填充</h3>
      <Input autoComplete="off" />
      <h3>阻止密码字段的自动填充</h3>
      <Input autoComplete="new-password" />
    </Group>
  );
}

export function Addons() {
  return (
    <Flex spacing="l" direction="column">
      <Group isAttached>
        <InputAddon>https://</InputAddon>
        <Input placeholder="portal.hemaos" />
        <InputAddon>.com</InputAddon>
      </Group>

      <Group isAttached>
        <InputAddon>+86</InputAddon>
        <Input placeholder="11 位手机号码" />
      </Group>
    </Flex>
  );
}
