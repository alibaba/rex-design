import { DemoGroup, DemoTitle, Flex, Group, Input, InputAddon } from '@rexd/core';
import { Icon } from '@rexd/icon';
import React, { useState } from 'react';

export default { title: 'Input' };

export function Basic() {
  return (
    <DemoGroup>
      <Input onChange={console.log} />
      <Input defaultValue="默认值" onChange={console.log} />
      <Input defaultValue="只读输入框" onChange={console.log} readOnly />
    </DemoGroup>
  );
}

export function Controlled() {
  const [input, setInput] = useState('rex');
  return <Input placeholder="Basic usage" onChange={(val) => setInput(val)} value={input} />;
}

export function Password() {
  return <Input type="password" defaultValue="1234" />;
}

export function AutoCompleteOff() {
  return (
    <DemoGroup>
      <DemoTitle>禁用表单自动填充</DemoTitle>
      <Input autoComplete="off" />
      <DemoTitle>阻止密码字段的自动填充</DemoTitle>
      <Input autoComplete="new-password" />
    </DemoGroup>
  );
}

export function Status() {
  return (
    <Flex spacing="l" direction="column">
      <Input defaultValue="hippo" status="error" />
      <Input defaultValue="hippo" status="success" />
      <Input defaultValue="hippo" />
    </Flex>
  );
}

export function Simple() {
  return <Input shape="simple" placeholder="简单输入框" />;
}

export function HasClear() {
  return <Input hasClear defaultValue="点击右侧图标清空当前文本" onChange={console.log} />;
}

export function Elements() {
  return (
    <Flex spacing="l" direction="column">
      <Input
        leftElement={<Icon type="search" style={{ marginLeft: '8px' }} />}
        rightElement={<Icon type="arrow-down" style={{ marginRight: '8px' }} />}
        hasClear
        defaultValue="default value"
      />
    </Flex>
  );
}

export function Disabled() {
  return (
    <DemoGroup>
      <Input
        leftElement={<Icon type="search" />}
        rightElement={<Icon type="arrow-down" />}
        hasClear
        value="hello world"
        disabled
      />
      <Input
        shape="simple"
        leftElement={<Icon type="search" />}
        rightElement={<Icon type="arrow-down" />}
        hasClear
        value="hello world"
        disabled
      />
    </DemoGroup>
  );
}

export function Addons() {
  return (
    <Flex spacing="l" direction="column">
      <Group isAttached>
        <InputAddon>https://</InputAddon>
        <Input placeholder="https://alibaba.github.io/rex-design/" />
        <InputAddon>.com</InputAddon>
      </Group>

      <Group isAttached>
        <InputAddon>+86</InputAddon>
        <Input placeholder="11 位手机号码" />
      </Group>
    </Flex>
  );
}
