import React, { useState } from 'react';
import { Badge, Button, Group, DemoDivider, DemoGroup, IconButton, NumberInput } from '@rexd/core';
import { Icon } from '@rexd/icon';

export default { title: 'Button' };

export const basic = () => <Button>hello world</Button>;

export const fullWidth = () => (
  <Button type="primary" isFullWidth>
    整行按钮
  </Button>
);

export const size = () => (
  <DemoGroup>
    <Button size="small">small</Button>
    <Button size="medium">medium</Button>
    <Button size="large">large</Button>
  </DemoGroup>
);

export const addIcon = () => (
  <DemoGroup>
    <Button leftElement={<Icon type="email" />} type="primary">
      邮箱
    </Button>
    <Button leftElement={<Icon type="arrow-right" />}>点击了解更多</Button>
  </DemoGroup>
);

export const AddBadge = () => {
  const [count, setCount] = useState(9);
  return (
    <DemoGroup>
      <Button
        rightElement={
          <Badge status="error" isPill>
            {count}
          </Badge>
        }
      >
        带徽标的按钮
      </Button>
      <NumberInput defaultValue={count} onChange={(val) => setCount(val)} />
    </DemoGroup>
  );
};

export const OnlyIcon = () => (
  <DemoGroup>
    <IconButton icon="close" />
  </DemoGroup>
);

export const loading = () => (
  <DemoGroup>
    <Button loading />
    <Button loading>提交中</Button>
  </DemoGroup>
);

export const shape = () => (
  <DemoGroup>
    <Button shape="solid" type="primary">
      主要按钮
    </Button>
    <Button shape="solid" type="secondary">
      次要按钮
    </Button>
    <Button shape="solid" type="normal">
      普通按钮
    </Button>
    <Button shape="solid" disabled>
      禁用按钮
    </Button>
    <DemoDivider />
    <Button shape="text" type="primary">
      主要文本按钮
    </Button>
    <Button shape="text">普通文本按钮</Button>
    <Button shape="text" disabled>
      禁用文本按钮
    </Button>
    <DemoDivider />
    <Button shape="link" type="primary">
      主要链接按钮
    </Button>
    <Button shape="link">普通链接按钮</Button>
    <Button shape="link" disabled>
      禁用链接按钮
    </Button>
    <DemoDivider />
    <Button shape="warning" type="primary">
      主要警告按钮
    </Button>
    <Button shape="warning">普通警告按钮</Button>
    <Button shape="warning" disabled>
      禁用警告按钮
    </Button>
  </DemoGroup>
);

export const group = () => (
  <DemoGroup>
    <Group isAttached>
      <Button>Left Button</Button>
      <Button>Center Button</Button>
      <Button>Right Button</Button>
    </Group>
    <Group>
      <Button>Left Button</Button>
      <Button>Center Button</Button>
      <Button>Right Button</Button>
    </Group>
  </DemoGroup>
);

export const Toggle = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Button isSelected={isSelected} onClick={() => setIsSelected(!isSelected)}>
      {isSelected ? '已订阅' : '订阅'}
    </Button>
  );
};

export const Toggled = () => {
  return (
    <DemoGroup>
      <Button isSelected>已订阅</Button>
      <Button isSelected type="primary">
        已订阅
      </Button>
      <Button isSelected type="secondary">
        已订阅
      </Button>
      <Button isSelected type="primary" shape="warning">
        已订阅
      </Button>
      <Button isSelected type="primary" shape="text">
        已订阅
      </Button>
    </DemoGroup>
  );
};

export const ToggleGroup = () => {
  const [active, setActive] = useState('pc');
  return (
    <DemoGroup>
      <Group isAttached>
        <Button isSelected={active === 'pc'} onClick={() => setActive('pc')}>
          <Icon type="electronics" />
        </Button>
        <Button isSelected={active === 'pad'} onClick={() => setActive('pad')}>
          <Icon type="pad" />
        </Button>
        <Button isSelected={active === 'phone'} onClick={() => setActive('phone')}>
          <Icon type="mobile-phone" />
        </Button>
      </Group>
    </DemoGroup>
  );
};
