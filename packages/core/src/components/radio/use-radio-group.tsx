import React, { useMemo } from 'react';
import { useId, useControllableState } from '../../hooks';
import { FormControlOnChangeHandler } from '../../types';
import { FlexProps } from '../layout';

export interface UseRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: FormControlOnChangeHandler<string>;
  name?: string;
  direction?: FlexProps['direction'];
  style?: React.CSSProperties;
  className?: string;
}

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;

export function useRadioGroup(props: UseRadioGroupProps) {
  const {
    onChange: onChangeProp,
    value: valueProp,
    defaultValue,
    name: nameProp,
    direction,
    className,
    ...htmlProps
  } = props;

  const fallbackName = useId('radio');
  const name = nameProp || fallbackName;

  const [value, updateValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const getRootProps = (props?: any, ref?: React.Ref<HTMLDivElement>) => {
    return {
      ...props,
      ...htmlProps,
      direction,
      display: 'inline-flex',
      wrap: 'wrap',
      ref,
      role: 'radiogroup',
    };
  };

  const context = useMemo(() => {
    return {
      name,
      value,
      onChange(nextValue: string) {
        updateValue(nextValue);
      },
    };
  }, [name, value, updateValue]);

  return {
    context,
    getRootProps,
  };
}
