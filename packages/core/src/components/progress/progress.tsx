import React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { ProgressProps, RenderLabelPayload } from './types';
import { valueToPercent } from './utils';

const Bar = styled(Box)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  height: var(--height);
  background-color: var(--rex-colors-fill-layer2);
  border-radius: 9999px;

  &:before {
    content: '';
    display: inline-block;
    height: inherit;
    width: calc(1% * var(--value));
    background-color: var(--rex-colors-brand-normal);
    border-radius: 9999px;
    transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
    animation: progress 0.4s;
  }

  @keyframes progress {
    from {
      width: 0;
    }

    to {
      width: calc(100% * var(--value) / 100);
    }
  }
`;

const defaultRenderLabel = (payload: RenderLabelPayload) => `${Math.floor(payload.value)}%`;

export function Progress(props: ProgressProps) {
  const {
    value = 0,
    min = 0,
    max = 100,
    lineColor,
    lineWidth = '8px',
    renderLabel = defaultRenderLabel,
    ...rest
  } = props;

  const percent = valueToPercent(value, min, max);

  const barStyle = {
    ['--value' as any]: percent,
    ['--color' as any]: lineColor,
    ['--height' as any]: lineWidth,
  };

  return (
    <Box display="flex" alignItems="center" {...rest}>
      <Bar style={barStyle} />
      <Box fontSize="body" color="text.note" ml="m">
        {renderLabel({ value })}
      </Box>
    </Box>
  );
}
