import React from 'react';
import { Box } from '../layout';
import { DateCard, DateCardProps } from './date-card';

export interface DatePanelProps extends DateCardProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

export function DatePanel(props: DatePanelProps) {
  const { forwardedRef, ...rest } = props;
  return (
    <Box ref={forwardedRef} className="rex-date-picker" boxShadow="lowDown" borderRadius="m">
      <DateCard {...rest} />
    </Box>
  );
}
