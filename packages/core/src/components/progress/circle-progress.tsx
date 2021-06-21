import React from 'react';
import styled from 'styled-components';
import { colors } from '../../utils';
import { Box } from '../layout';
import { ProgressProps, RenderLabelPayload } from './types';
import { valueToPercent } from './utils';

const Wrapper = styled(Box)`
  position: relative;
  display: inline-block;
  position: relative;
  vertical-align: middle;
`;

const Label = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: var(--rex-fontSizes-title1);
  color: var(--rex-colors-text-note);
`;

const Circle = (props: any) => <circle cx={50} cy={50} r={42} fill="transparent" {...props} />;

const defaultRenderLabel = (p: RenderLabelPayload) => `${Math.floor(p.value)}%`;

export function CircleProgress(props: ProgressProps) {
  const {
    value = 0,
    min = 0,
    max = 100,
    size = '116px',
    lineWidth = '8px',
    lineColor = 'brand.normal',
    renderLabel = defaultRenderLabel,
    ...rest
  } = props;

  const percent = valueToPercent(value, min, max);
  const determinant = (percent ?? 0) * 2.64;
  const strokeDasharray = `${determinant} ${264 - determinant}`;

  const indicatorProps = {
    strokeDashoffset: 66,
    strokeDasharray,
    transition: `stroke-dasharray 0.6s ease 0s, stroke 0.6s ease`,
  };

  return (
    <Wrapper {...rest}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <Circle stroke="var(--rex-colors-fill-layer2)" strokeWidth={lineWidth} />
        <Circle stroke={colors(lineColor)} strokeWidth={lineWidth} strokeLinecap="round" {...indicatorProps} />
      </svg>
      <Label>{renderLabel({ value: percent })}</Label>
    </Wrapper>
  );
}
