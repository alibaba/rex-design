import React from 'react';
import { useDevice } from '../../providers';
import { Button } from '../button';
import { Box } from '../layout';
import { DateCard, DateCardProps } from './date-card';

export interface DatePanelProps extends DateCardProps, DatePanelFooterProps {}

export function DatePanel(props: DatePanelProps) {
  const { onOk, ...rest } = props;
  return (
    <Box className="rex-date-picker" boxShadow="lowDown" bg="emphasis.0" borderRadius="s">
      <DateCard {...rest} />
      <DatePanelFooter onOk={onOk} />
    </Box>
  );
}

interface DatePanelFooterProps {
  // leftElement?: React.ReactNode;
  onOk?: React.MouseEventHandler<HTMLButtonElement>;
}

function DatePanelFooter(props: DatePanelFooterProps) {
  const { onOk } = props;
  const { device } = useDevice();
  return (
    <Box px="m" pb="m" textAlign="right">
      <Button isFullWidth={device.alias === 's'} size="small" type="primary" onClick={onOk}>
        确认
      </Button>
    </Box>
  );
}
