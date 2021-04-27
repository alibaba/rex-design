import React from 'react';
import { Box } from '../layout';
import { BoxProps } from './Box';

export interface PanelProps extends Omit<BoxProps, 'title'> {
  title?: React.ReactNode;
}

// TODO: Panel 只提供容器 ??
// TODO: 折叠 panel
// TODO: 组合 panel，类似于 accordion
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
