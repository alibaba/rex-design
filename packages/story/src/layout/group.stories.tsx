import React from 'react';
import { Group, Button, Input } from '@rexd/core';

export default { title: 'Layout/Group' };

export const Basic = () => (
  <Group>
    <Button>left</Button>
    <Button>center</Button>
    <Button>right</Button>
  </Group>
);

export const Attached = () => (
  <Group attached>
    <Button>left</Button>
    <Button>center</Button>
    <Button>right</Button>
  </Group>
);

export const More = () => (
  <Group attached>
    <Input />
    <Button>search</Button>
  </Group>
);
