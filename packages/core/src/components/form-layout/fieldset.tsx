import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps, Grid } from '../layout';
import { useFormLayout } from './form-layout';
import { ResponsiveType } from '../../types';

const Title = styled.div`
  font-size: var(--rex-fontSizes-subtitle);
  font-weight: bold;
  margin: var(--rex-space-m) 0;
`;

export interface FieldSetProps extends Omit<BoxProps, 'title'> {
  title?: React.ReactNode;
  columns?: ResponsiveType;
}

export function FieldSet(props: FieldSetProps) {
  const { title, columns: columnsProps, children, ...rest } = props;
  const { columns } = useFormLayout({ columns: columnsProps });

  let ret = children;
  if (columns) {
    ret = (
      <Grid columns={columns} spacing="m">
        {children}
      </Grid>
    );
  }

  return (
    <Box as="fieldset" p="m" m={0} border="0" {...rest}>
      {title && <Title>{title}</Title>}
      {ret}
    </Box>
  );
}
