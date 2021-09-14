import React from 'react';
import { Rating } from '@rexd/core';

export default { title: 'Rating' };

export function Basic() {
  return (
    <Rating
      defaultValue={2}
      onChange={(nextValue) => {
        console.log('range onChange:', nextValue);
      }}
    />
  );
}
