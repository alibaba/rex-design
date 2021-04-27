import React from 'react';
import { DemoGroup, Progress, CircleProgress, Text } from '@rexd/core';

export default { title: 'Progress' };

export function Basic() {
  return <Progress value={20} />;
}

export function RenderLabel() {
  return <Progress value={20} renderLabel={({ value }) => `${value}/100 人已提交`} />;
}

export function Circle() {
  return (
    <DemoGroup>
      <CircleProgress value={50} />
      <CircleProgress value={50} color="error.normal" />
      <CircleProgress value={50} color="success.normal" />
    </DemoGroup>
  );
}

export function CircleSize() {
  return (
    <DemoGroup>
      <CircleProgress value={50} diameter="50px" renderLabel={() => null} />
      <CircleProgress value={50} diameter="100px" renderLabel={({ value }) => <Text fontSize="24px">{value}%</Text>} />
      <CircleProgress value={50} diameter="200px" renderLabel={({ value }) => <Text fontSize="48px">{value}%</Text>} />
    </DemoGroup>
  );
}
