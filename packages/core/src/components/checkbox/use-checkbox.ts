import { isUndefined } from 'lodash';
import { ChangeEvent, useCallback } from 'react';
import { useControllableState } from '../../hooks';
import { FormControlOnChangeHandler } from '../../types';
import { isFunction } from '../../utils';

export interface UseCheckboxProps {
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultIndeterminate?: boolean;
  size?: 'small' | 'medium' | 'large';
  name?: string;
  style?: React.CSSProperties;
  className?: string;
  onChange?: FormControlOnChangeHandler<boolean>;
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;

type CheckboxActionType = 'unchecked' | 'checked';

interface CheckboxState {
  checked: boolean;
  indeterminate: boolean;
}

function normalizeCheckedState(state: CheckboxState) {
  if (isUndefined(state.checked) && isUndefined(state.indeterminate)) {
    return;
  }

  return state;
}

function getCheckboxState(action: CheckboxActionType) {
  if (action === 'checked') {
    return { checked: true, indeterminate: false };
  }
  if (action === 'unchecked') {
    return { checked: false, indeterminate: false };
  }
}

export function useCheckbox(props: UseCheckboxProps) {
  const {
    value,
    checked: checkedProp,
    defaultChecked = false,
    indeterminate: indeterminateProp,
    defaultIndeterminate = false,
    disabled = false,
    name,
    onChange,
    ...htmlProps
  } = props;

  const checkedState = normalizeCheckedState({
    checked: checkedProp,
    indeterminate: indeterminateProp,
  });

  const defaultCheckedState = normalizeCheckedState({
    checked: defaultChecked,
    indeterminate: defaultIndeterminate,
  });

  const [checkedStateValue, updateCheckedStateValue] = useControllableState({
    value: checkedState,
    defaultValue: defaultCheckedState,
    onChange(nextValue) {
      isFunction(onChange) && onChange(nextValue.checked, nextValue);
    },
    name: 'Checkbox',
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      const action: CheckboxActionType = checkedStateValue.checked ? 'unchecked' : 'checked';
      const nextState = getCheckboxState(action);
      updateCheckedStateValue(nextState);
    },
    [checkedStateValue.checked, updateCheckedStateValue, disabled],
  );

  const getInputProps = useCallback(
    (props) => {
      return {
        type: 'checkbox',
        name,
        value,
        onChange: handleChange,
        checked: checkedStateValue.checked,
        // ref: forwardedRef,
        ...props,
      };
    },
    [name, value, handleChange, checkedStateValue.checked],
  );

  return {
    state: {
      ...checkedStateValue,
    },
    getInputProps,
    htmlProps,
  };
}
