import React from 'react';
import { Group, Image } from '@rexd/core';

export default { title: 'Image' };

export function Basic() {
  return (
    <Group>
      <Image src="https://img.alicdn.com/tfs/TB1gjPyp9slXu8jSZFuXXXg7FXa-750-272.png" width="400px" />
    </Group>
  );
}

export function Size() {
  const sourceUrl = 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png';
  return (
    <Group>
      <Image width="100px" height="100px" src={sourceUrl} />
      <Image width="150px" height="150px" src={sourceUrl} />
    </Group>
  );
}

export function Fallback() {
  return <Image src="notfound.png" fallbackSrc="https://via.placeholder.com/150" />;
}
