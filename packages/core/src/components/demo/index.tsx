// TODO 可以移除这个文件了

import React from 'react';
import styled from 'styled-components';
import { space } from '../../utils';
import { Text, Box, BoxProps } from '../layout';

const DemoBox = styled(Box)`
  > * {
    margin-right: ${space('m')};
    margin-bottom: ${space('m')};
  }
`;

export function DemoGroup(props: Omit<BoxProps, 'as'>) {
  return <DemoBox {...props} />;
}

export interface DemoItemProps extends BoxProps {
  title?: string;
}

export function DemoItem(props: DemoItemProps) {
  const { title, children, ...rest } = props;
  return (
    <Box {...rest}>
      {title && <Text as="p">{title}</Text>}
      {children}
    </Box>
  );
}

export interface DemoTitleProps {
  title?: string;
  children?: React.ReactNode;
}

export function DemoTitle(props: DemoItemProps) {
  const { title, children, ...rest } = props;
  return (
    <Text as="p" {...rest}>
      {title || children}
    </Text>
  );
}

const Divider = styled.div`
  height: 12px;
`;

export function DemoDivider(props: {}) {
  return <Divider {...props} />;
}
