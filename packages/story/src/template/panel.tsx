import { Box, BoxProps, PanelProps } from '@rexd/core';
import React from 'react';

export function Panel(props: PanelProps) {
  const { title, children, ...rest } = props;

  return (
    <Box boxShadow="lowDown" borderRadius="l" bg="emphasis.0" {...rest}>
      {title && <PanelHeader>{title}</PanelHeader>}
      <Box p="l">{children}</Box>
    </Box>
  );
}

function PanelHeader(props: BoxProps) {
  const { children } = props;
  return (
    <Box px="l" pt="m" fontSize="title1" color="title">
      {children}
    </Box>
  );
}
