import { ChangeEvent, useCallback, useState } from 'react';
import { useControllableProp } from '../../hooks';
import { StringOrNumber } from '../../types';
import { callAllHandlers } from '../../utils';

export interface UseCheckboxProps {
  value?: StringOrNumber;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'small' | 'medium' | 'large';
  name?: string;
  style?: React.CSSProperties;
  className?: string;
  onChange?: (nextValue: boolean, detail?: { event: React.ChangeEvent<HTMLInputElement> }) => void;
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;

export function useCheckbox(props: UseCheckboxProps) {
  const {
    value,
    checked: checkedProp,
    defaultChecked = false,
    disabled = false,
    indeterminate,
    name,
    onChange,
    ...htmlProps
  } = props;

  const [checkedState, setChecked] = useState<boolean>(defaultChecked);
  const [isControlled, checked] = useControllableProp(checkedProp, checkedState);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      if (!isControlled) {
        setChecked(e.target.checked);
      }

      onChange?.(e.target.checked, { event: e });
    },
    [isControlled, disabled, onChange],
  );

  const getInputProps = useCallback(
    (props, forwardedRef = null) => {
      return {
        type: 'checkbox',
        name,
        value,
        onChange: callAllHandlers(props?.onChange, handleChange),
        checked,
        ref: forwardedRef,
      };
    },
    [name, value, handleChange, checked],
  );

  return {
    state: {
      checked,
      indeterminate: !checked ? indeterminate : undefined,
    },
    getInputProps,
    htmlProps,
  };
}
