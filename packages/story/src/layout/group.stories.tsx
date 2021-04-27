import React from 'react';
import { Group, Button, Input } from '@rexd/core';

export default { title: 'Layout/Group' };

export const Basic = () => (
  <Group>
    <Button>left</Button>
    <Button>right</Button>
    <Button>center</Button>
  </Group>
);

export const Attached = () => (
  <Group isAttached>
    <Button>left</Button>
    <Button>right</Button>
    <Button>center</Button>
  </Group>
);

export const More = () => (
  <Group isAttached>
    <Input />
    <Button>search</Button>
  </Group>
);
