import React from 'react';
import { Box } from '../layout';
import { BoxProps } from './Box';

export interface PageHeaderProps extends Omit<BoxProps, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function PageHeader(props: PageHeaderProps) {
  const { title, description, children } = props;

  return (
    <Box py="l" px="xl" boxShadow="medianDown" bg="emphasis.0">
      <Box fontSize="title1" fontWeight="bold" color="text.title">
        {title}
      </Box>
      {description && (
        <Box mt="l" fontSize="body" color="text.subtitle">
          {description}
        </Box>
      )}
      {children}
    </Box>
  );
}
