import React from 'react';
import styled from 'styled-components';
import { View, Input } from '@rexd/one';
import { useRange, UseRangeProps } from './use-range';

const RangeWrapper = styled(View)`
  display: flex;
  align-items: center;
  position: relative;
`;

const LeftText = styled(View)`
  color: var(--rex-colors-text-body);
  font-size: var(--rex-fontSizes-note);
  margin-right: var(--rex-space-m);
`;

const RightText = styled(View)`
  color: var(--rex-colors-text-body);
  font-size: var(--rex-fontSizes-note);
  margin-left: var(--rex-space-m);
`;

const RangeBox = styled(View)`
  flex: 1;
  position: relative;
  height: 32px;
`;

const RangeTrack = styled(View)`
  position: absolute;
  top: 50%;
  z-index: 1;
  transform: translateY(-50%);
  width: 100%;
  background-color: var(--rex-colors-fill-layer1);
  height: 6px;
  border-radius: var(--rex-radii-m);
  overflow: hidden;
`;

const RangeTrackFilled = styled(View)`
  height: 100%;
  background-color: var(--rex-colors-brand-normal);
`;

const RangeTooltip = styled(View)`
  position: absolute;
  z-index: 2;
  background-color: #000;
  color: #fff;
  border-radius: var(--rex-radii-s);
  padding: 0 var(--rex-space-m);
  font-size: var(--rex-fontSizes-body);
  width: 32px;
  text-align: center;
`;

const RangeSlider = styled(Input)`
  position: absolute;
  width: 100%;
  appearance: none;
  outline: none;
  padding: 8px 0;
  background-color: transparent;

  &::-webkit-slider-thumb {
    position: relative;
    z-index: 2;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #fff;
    box-shadow: var(--rex-shadows-s);
    border: 2px solid var(--rex-colors-line-border);
    border-radius: 50%;
  }
`;

export interface RangeProps extends UseRangeProps {
  hasValue?: boolean; // TODO: 是否显示当前值的提示气泡
  hasLabels?: boolean; // 是否显示头尾标签
  hasTicks?: boolean; // TODO: 是否显示刻度
}

export function Range(props: RangeProps) {
  const { min, max, hasLabels } = props;
  const { state, getInputProps, getFilledTrackProps, getTooltipProps } = useRange(props);
  const inputProps = getInputProps();
  const filledTrackProps = getFilledTrackProps();
  const tooltipProps = getTooltipProps();

  return (
    <RangeWrapper>
      {hasLabels && <LeftText>{min}</LeftText>}
      <RangeBox>
        <RangeTrack>
          <RangeTrackFilled {...filledTrackProps} />
        </RangeTrack>
        <RangeSlider {...inputProps} />
      </RangeBox>
      {/* <RangeTooltip {...tooltipProps}>{state.value}</RangeTooltip> */}
      {hasLabels && <RightText>{max}</RightText>}
    </RangeWrapper>
  );
}

Range.defaultProps = {
  min: 0,
  max: 100,
};
