import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { View } from '@rexd/one';
import { useCheckbox, UseCheckboxProps } from '../checkbox/use-checkbox';
import { getToken } from '../../utils';

const SwitchBox = styled(View)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: ${getToken('Switch.width')};
  height: ${getToken('Switch.height')};

  > input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  &.rex-checked > .rex-switch-slider {
    background-color: var(--rex-colors-success-normal);
  }

  &.rex-checked > .rex-switch-slider::before {
    transform: ${getToken('Switch.sliderCheckedTransform')};
    border-color: var(--rex-colors-success-normal);
  }

  &.rex-disabled > .rex-switch-slider::before {
    border-color: var(--rex-colors-line-disabled);
  }

  &.rex-checked.rex-disabled > .rex-switch-slider {
    background-color: var(--rex-colors-fill-disabled2);
  }
`;

const SwitchSlider = styled(View)`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--rex-colors-emphasis-20);
  transition: 0.4s;
  border-radius: var(--rex-radii-m);

  &::before {
    position: absolute;
    content: '';
    height: ${getToken('Switch.sliderSize')};
    width: ${getToken('Switch.sliderSize')};
    border-radius: var(--rex-radii-m);
    border: 2px solid var(--rex-colors-emphasis-50);
    background-color: var(--rex-colors-emphasis-10);
    left: 0;
    bottom: 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

export interface SwitchProps extends Omit<UseCheckboxProps, 'indeterminate' | 'value'> {
  defaultValue?: boolean;
  value?: boolean;
}

export function Switch(props: SwitchProps) {
  const { defaultValue, value, checked, defaultChecked, className, ...rest } = props;

  const { getInputProps, state } = useCheckbox({
    defaultChecked: defaultValue ?? defaultChecked,
    checked: value ?? checked,
    ...rest,
  });
  const clazz = cx(
    {
      'rex-checkbox': true,
      'rex-checked': state.checked,
      'rex-disabled': rest.disabled,
    },
    className,
  );

  return (
    <SwitchBox as="label" className={clazz}>
      <input {...getInputProps(props)} />
      <SwitchSlider as="span" className="rex-switch-slider" />
    </SwitchBox>
  );
}
