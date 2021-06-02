import React from 'react';
import { Group, Progress, CircleProgress, Text } from '@rexd/core';

export default { title: 'Progress' };

export function Basic() {
  return <Progress value={20} />;
}

export function RenderLabel() {
  return <Progress value={20} renderLabel={({ value }) => `${value}/100 人已提交`} />;
}

export function Circle() {
  return (
    <Group>
      <CircleProgress value={50} />
      <CircleProgress value={50} color="error.normal" />
      <CircleProgress value={50} color="success.normal" />
    </Group>
  );
}

export function CircleSize() {
  return (
    <Group>
      <CircleProgress value={50} size="50px" renderLabel={() => null} />
      <CircleProgress value={50} size="100px" renderLabel={({ value }) => <Text fontSize="24px">{value}%</Text>} />
      <CircleProgress value={50} size="200px" renderLabel={({ value }) => <Text fontSize="48px">{value}%</Text>} />
    </Group>
  );
}
