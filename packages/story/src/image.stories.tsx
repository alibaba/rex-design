import React from 'react';
import { DemoGroup, Image } from '@rexd/core';

export default { title: 'Image' };

export function Basic() {
  return (
    <DemoGroup>
      <Image src="https://img.alicdn.com/tfs/TB1gjPyp9slXu8jSZFuXXXg7FXa-750-272.png" width="400px" />
    </DemoGroup>
  );
}

export function Size() {
  const sourceUrl = 'https://img.alicdn.com/tfs/TB1atWRDgHqK1RjSZFkXXX.WFXa-460-462.png';
  return (
    <DemoGroup>
      <Image width="100px" height="100px" src={sourceUrl} />
      <Image width="150px" height="150px" src={sourceUrl} />
    </DemoGroup>
  );
}

export function Fallback() {
  return <Image src="notfound.png" fallbackSrc="https://via.placeholder.com/150" />;
}
