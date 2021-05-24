import React from 'react';
import { AdaptivePopup } from '../overlays';
import { DateCard, DateCardProps } from './date-card';

export interface DatePanelProps extends DateCardProps {
  forwardedRef?: React.RefObject<HTMLDivElement>;
}

export function DatePanel(props: DatePanelProps) {
  const { forwardedRef, ...rest } = props;
  return (
    <AdaptivePopup.Panel ref={forwardedRef} className="rex-date-picker" borderRadius="m">
      <DateCard {...rest} />
    </AdaptivePopup.Panel>
  );
}
