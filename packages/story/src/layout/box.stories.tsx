import React from 'react';
import { Box } from '@rexd/core';

export default { title: 'Layout/Box' };

export const Simple = () => (
  <Box bg="brand.normal" p="m" color="body" borderRadius="m">
    This is a simple box.
  </Box>
);

export const As = () => (
  <Box as="button" borderRadius="m" bg="brand.normal" color="white">
    hello
  </Box>
);
