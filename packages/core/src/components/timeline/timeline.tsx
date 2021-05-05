import React from 'react';
import { useConfig } from '../../providers';
import { Box } from '../layout';
import { HozTimelineItem } from './timeline-item';

export interface TimelineProps extends React.ComponentPropsWithoutRef<'ul'> {
  direction?: 'row' | 'column';
  align?: 'double' | 'right';
}

export function Timeline(props: TimelineProps) {
  const { direction, align, children, ...rest } = useConfig('Timeline', props);
  const display = direction === 'row' ? 'flex' : 'table';
  const total = React.Children.count(children);

  return (
    <Box as="ul" display={display} p={0} {...rest}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        const showDotLine = !(index + 1 === total);
        if (direction === 'row') {
          return <HozTimelineItem showDotLine={showDotLine} {...child.props} />;
        }
        return React.cloneElement(child, {
          align,
          showDotLine,
        });
      })}
    </Box>
  );
}