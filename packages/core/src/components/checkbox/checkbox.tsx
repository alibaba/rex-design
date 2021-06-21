import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { Icon } from '@rexd/icon';
import { Dict } from '../../types';
import { useCheckboxGroupContext } from './context';
import { useCheckbox, UseCheckboxProps } from './use-checkbox';
import { getToken } from '../../utils';

const RexCheckbox = styled.label<Dict<any>>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  vertical-align: top;
  height: var(--rex-sizes-formHeights-m);

  /* 指示器基础样式 */
  > .rex-checkbox-indicator {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s linear;
    color: #fff;

    font-size: ${getToken('Checkbox.iconSize')};
    width: ${getToken('Checkbox.size')};
    height: ${getToken('Checkbox.size')};
    border-radius: var(--rex-radii-s);
    border: var(--rex-borders-solid) var(--rex-colors-line-border);
  }

  /* label 基础样式 */
  > .rex-checkbox-label {
    font-size: var(--rex-fontSizes-body);
    margin-left: var(--rex-space-s);
    margin-right: var(--rex-space-l);
    color: var(--rex-colors-text-body);
  }

  /* 隐藏原生 input */
  > .rex-checkbox-input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  /* !checked 状态下 hover 样式 */
  &:not(.rex-disabled):hover {
    > .rex-checkbox-indicator {
      border-color: var(--rex-colors-brand-hover);
    }
  }

  /* checked 和 indeterminate 状态下的指示器样式 */
  > .rex-checkbox-input:checked ~ .rex-checkbox-indicator,
  &.rex-indeterminate .rex-checkbox-indicator {
    background-color: var(--rex-colors-brand-normal);
    border-color: var(--rex-colors-brand-normal);
  }

  &.rex-disabled {
    cursor: not-allowed;
    pointer-events: none;

    > .rex-checkbox-indicator {
      border-color: var(--rex-colors-line-disabled);
      background-color: var(--rex-colors-fill-disabled);
    }

    > .rex-checkbox-label {
      font-size: var(--rex-fontSizes-body);
      color: var(--rex-colors-text-disabled);
    }
  }
`;

export interface CheckboxProps extends UseCheckboxProps {
  /**
   * 是否只读
   */
  readOnly?: boolean;
  children?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLSpanElement, CheckboxProps>((props, ref) => {
  const {
    value: valueProp,
    checked: checkedProp,
    indeterminate,
    onChange: onChangeProp,
    name: nameProp,
    disabled = false,
    className,
    children,
    ...rest
  } = props;

  const group = useCheckboxGroupContext();

  let checked = checkedProp;
  if (group?.value !== undefined && valueProp) {
    checked = (group.value || []).includes(valueProp);
  }

  let onChange = onChangeProp;

  // 被 CheckboxGroup 包裹
  if (group?.onSelect && valueProp) {
    onChange = (checked, { event }) => {
      group?.onSelect(valueProp, checked);
      onChangeProp?.(checked, { event });
    };
  }

  const name = nameProp ?? group?.name;

  const { state, getInputProps, htmlProps } = useCheckbox({
    name,
    value: valueProp,
    disabled,
    checked,
    indeterminate,
    onChange,
    ...rest,
  });

  const inputProps = getInputProps({});

  const clazz = cx(
    'rex-checkbox',
    {
      'rex-disabled': disabled,
      'rex-indeterminate': state.indeterminate,
      'rex-checked': state.checked,
    },
    className,
  );

  return (
    <RexCheckbox className={clazz} {...htmlProps}>
      <input className="rex-checkbox-input" {...inputProps} onClick={(e) => e.stopPropagation()} />
      <span className="rex-checkbox-indicator">
        {state.indeterminate && <Icon type="minus-bold" />}
        {state.checked && <Icon type="select-bold" />}
      </span>
      <span className="rex-checkbox-label">{children}</span>
    </RexCheckbox>
  );
});
