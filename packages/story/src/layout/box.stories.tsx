import React from 'react';
import { Box } from '@rexd/core';

export default { title: 'Layout/Box' };

export const Basic = () => (
  <Box display="inline-block" bg="emphasis.100" color="emphasis.0" p="l" borderRadius="m">
    Hello World
  </Box>
);

export const BorderBox = () => (
  <Box>
    <Box border="solid" borderColor="line.border" borderWidth={2}>
      border box
    </Box>

    <Box mt="l" border="4px solid #FF0000">
      border box
    </Box>
  </Box>
);

export const Simple = () => (
  <Box bg="brand.normal" p="m" color="emphasis.0" border="solid" borderColor="line.border" borderRadius="m">
    This is a simple box.
  </Box>
);

export const As = () => (
  <Box as="button" borderRadius="m" bg="brand.normal" color="white">
    hello
  </Box>
);
