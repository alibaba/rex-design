import * as React from 'react';
import styled from 'styled-components';
import { View } from '@rexd/one';
import { useRadio, UseRadioProps } from './use-radio';
import { useRadioGroupContext } from './context';
import { getToken } from '../../utils';

const RexRadio = styled(View)`
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  position: relative;
  line-height: var(--rex-sizes-formHeights-m);

  .rex-radio-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .rex-radio-checkmark {
    position: relative;
    height: ${getToken('Radio.radioSize')};
    width: ${getToken('Radio.radioSize')};
    border: 1px solid var(--rex-colors-line-border);
    border-radius: 50%;

    &:after {
      content: '';
      position: absolute;
      display: none;
      top: ${getToken('Radio.radioMarkOffset')};
      left: ${getToken('Radio.radioMarkOffset')};
      width: ${getToken('Radio.radioMarkSize')};
      height: ${getToken('Radio.radioMarkSize')};
      border-radius: 50%;
      background: #fff;
    }
  }

  .rex-radio-input:checked ~ .rex-radio-checkmark {
    border-color: var(--rex-colors-brand-normal);
    background-color: var(--rex-colors-brand-normal);

    &:after {
      display: block;
    }
  }

  .rex-radio-label {
    color: var(--rex-colors-text-body);
    font-size: var(--rex-fontSizes-body);
    margin-left: var(--rex-space-m);
    margin-right: var(--rex-space-m);
  }
`;

export interface RadioProps extends UseRadioProps {
  children?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { value: valueProp, onChange: onChangeProp, children, ...others } = props;

  const group = useRadioGroupContext();

  let checked = props.checked || false;
  if (group?.value && valueProp) {
    checked = group.value === valueProp;
  }

  let onChange = onChangeProp;
  if (group?.onChange && valueProp) {
    onChange = (e) => {
      if (e.target.value !== group.value) {
        group.onChange(e.target.value, { event: e });
      }
      onChangeProp && onChangeProp(e);
    };
  }

  const name = props?.name ?? group?.name;

  const { getInputProps } = useRadio({
    ...others,
    value: valueProp,
    name,
    checked,
    onChange,
  });
  const inputProps = getInputProps({}, ref);

  return (
    <RexRadio as="label">
      <input className="rex-radio-input" {...inputProps} />
      <div className="rex-radio-checkmark" />
      {children && <div className="rex-radio-label">{children}</div>}
    </RexRadio>
  );
});
