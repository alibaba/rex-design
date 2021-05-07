import React, { useState } from 'react';
import { Box, Button, Group, DemoGroup, IconButton } from '@rexd/core';
import { Icon } from '@rexd/icon';

export default { title: 'Button' };

export function Basic() {
  return (
    <Box>
      <Group>
        <Button type="normal">普通按钮</Button>
        <Button type="primary">焦点按钮</Button>
        <Button type="secondary">次级按钮</Button>
        <Button disabled>禁用按钮</Button>
      </Group>
      <Group mt="l">
        <Button shape="warning" type="normal">
          普通警告按钮
        </Button>
        <Button shape="warning" type="primary">
          焦点警告按钮
        </Button>
      </Group>
      <Group mt="l">
        <Button shape="text" type="normal">
          普通文本按钮
        </Button>
        <Button shape="text" type="primary">
          焦点链接按钮
        </Button>
        <Button shape="text" type="primary" disabled>
          焦点链接按钮
        </Button>
      </Group>
    </Box>
  );
}

/**
 * 与文本按钮相比，链接型按钮没有内间距
 */
export function LinkButton() {
  return (
    <Group>
      <Button shape="link" type="normal">
        普通链接按钮
      </Button>
      <Button shape="link" type="primary">
        焦点链接按钮
      </Button>
    </Group>
  );
}

export function Size() {
  return (
    <Group>
      <Button size="small">小尺寸按钮</Button>
      <Button size="medium">中尺寸按钮</Button>
      <Button size="large">大尺寸按钮</Button>
    </Group>
  );
}

export const FullWidth = () => (
  <Button type="primary" isFullWidth>
    整行按钮
  </Button>
);

export const AddIcon = () => (
  <Group>
    <Button leftElement={<Icon type="email" />} type="primary">
      邮箱
    </Button>
    <Button rightElement={<Icon type="arrow-right" />}>点击了解更多</Button>

    <Button shape="text" leftElement={<Icon type="add" />}>
      新建
    </Button>
  </Group>
);

/**
 * 仅图标的按钮
 */
export const OnlyIcon = () => (
  <DemoGroup>
    <IconButton icon="close" />
  </DemoGroup>
);

export const Loading = () => (
  <DemoGroup>
    <Button loading />
    <Button loading>提交中</Button>
  </DemoGroup>
);

export const ButtonGroup = () => (
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
