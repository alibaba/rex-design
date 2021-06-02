import { useState } from 'react';
import { pickStyleAndDataProps } from '../../utils';
import { useCounter, UseCounterProps } from './use-counter';

export interface UseNumberInputProps extends UseCounterProps {
  readOnly?: boolean;
  disabled?: boolean;
  status?: 'error' | 'success';
}

export function useNumberInput(props: UseNumberInputProps) {
  const { readOnly, disabled, status, ...rest } = props;

  const counter = useCounter(props);
  const { update, increment, decrement, correct, numberStore } = counter;

  const getInputProps = () => {
    return {
      type: 'text',
      status,
      readOnly,
      disabled,
      value: numberStore.format(counter.value),
      onChange: (input: string) => {
        update(numberStore.parse(input));
      },
      onBlur: () => {
        const val = correct(counter.value as number);
        if (val !== counter.value) {
          update(val);
        }
      },
    };
  };

  const getIncrementButtonProps = () => {
    return {
      disabled: disabled || counter.isAtMax,
      onClick: () => {
        increment();
      },
    };
  };

  const getDecrementButtonProps = () => {
    return {
      disabled: disabled || counter.isAtMin,
      onClick: () => {
        decrement();
      },
    };
  };

  return {
    htmlProps: pickStyleAndDataProps(rest),
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  };
}
