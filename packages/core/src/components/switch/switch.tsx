import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Icon } from '@rexd/icon';
import { useCheckbox, UseCheckboxProps } from '../checkbox/use-checkbox';
import { getToken } from '../../utils';

const SwitchBox = styled.span`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: var(--rex-switch-width);
  height: var(--rex-switch-height);

  > input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  &.rex-checked > .rex-switch-track {
    background-color: var(--rex-colors-success-normal);
  }

  &.rex-checked > .rex-switch-slider {
    transform: var(--rex-switch-sliderCheckedTransform);
  }

  &.rex-disabled > .rex-switch-track {
    opacity: 0.48;
  }
`;

const SwitchTrack = styled.span<any>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justify};
  position: absolute;
  top: var(--rex-switch-sliderOffsetTop);
  left: 0;
  right: 0;
  color: var(--rex-colors-emphasis-0);
  background-color: var(--rex-colors-emphasis-40);
  height: var(--rex-switch-trackHeight);
  border-radius: var(--rex-switch-trackHeight);
  font-size: var(--rex-fontSizes-body);
  padding-left: var(--rex-space-m);
  padding-right: var(--rex-space-m);
`;

const SwitchSlider = styled.span`
  position: absolute;
  content: '';
  height: var(--rex-switch-height);
  width: var(--rex-switch-height);
  border-radius: 100%;
  box-shadow: var(--rex-shadows-lowDown);
  background-color: var(--rex-colors-emphasis-10);
  left: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
`;

export interface SwitchProps extends Omit<UseCheckboxProps, 'indeterminate' | 'value'> {
  /**
   * 非受控初值
   */
  defaultValue?: boolean;
  /**
   * 受控值
   */
  value?: boolean;
  /**
   * 是否显示标签图标
   */
  hasLabel?: boolean;
}

export function Switch(props: SwitchProps) {
  const { defaultValue, value, checked, defaultChecked, size = 'medium', hasLabel, style, className, ...rest } = props;

  const { getInputProps, state } = useCheckbox({
    defaultChecked: defaultValue ?? defaultChecked,
    checked: value ?? checked,
    ...rest,
  });

  const clazz = cx(
    {
      'rex-checkbox': true,
      [`rex-${size}`]: size,
      'rex-checked': state.checked,
      'rex-disabled': rest.disabled,
    },
    className,
  );

  const switchStyle = {
    '--rex-switch-width': getToken(`Switch.${size}.width`),
    '--rex-switch-height': getToken(`Switch.${size}.height`),
    '--rex-switch-trackHeight': getToken(`Switch.${size}.trackHeight`),
    '--rex-switch-sliderOffsetTop': getToken(`Switch.${size}.sliderOffsetTop`),
    '--rex-switch-sliderCheckedTransform': getToken(`Switch.${size}.sliderCheckedTransform`),
    ...style,
  };

  let trackContent;

  if (hasLabel) {
    trackContent = state.checked ? <Icon type="select-bold" /> : <Icon type="close-bold" />;
  }
  return (
    <SwitchBox as="label" style={switchStyle} className={clazz}>
      <input {...getInputProps({})} />
      <SwitchTrack className="rex-switch-track" $justify={state.checked ? 'flex-start' : 'flex-end'}>
        {trackContent}
      </SwitchTrack>
      <SwitchSlider className="rex-switch-slider" />
    </SwitchBox>
  );
}
