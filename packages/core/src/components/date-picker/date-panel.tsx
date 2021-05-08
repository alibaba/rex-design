import React from 'react';
import { useDevice } from '../../providers';
import { Button } from '../button';
import { Box } from '../layout';
import { DateCard, DateCardProps } from './date-card';

export interface DatePanelProps extends DateCardProps {}

export function DatePanel(props: DatePanelProps) {
  const { ...rest } = props;
  return (
    <Box className="rex-date-picker" boxShadow="lowDown" bg="emphasis.0" borderRadius="m">
      <DateCard {...rest} />
    </Box>
  );
}
