import React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { ProgressProps, RenderLabelPayload } from './interfaces';

const Bar = styled(Box)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  height: var(--rex-sizes-s2);
  background-color: var(--rex-colors-fill-layer2);
  border-radius: 9999px;

  &:before {
    content: '';
    display: inline-block;
    height: inherit;
    width: calc(100% * var(--value) / 100);
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
  const { value = 0, renderLabel = defaultRenderLabel, ...rest } = props;

  return (
    <Box display="flex" alignItems="center" {...rest}>
      <Bar style={{ ['--value' as any]: value }} />
      <Box fontSize="body" color="text.note" ml="m">
        {renderLabel({ value })}
      </Box>
    </Box>
  );
}
