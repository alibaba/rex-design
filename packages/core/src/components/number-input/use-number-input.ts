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

  const [display, updateDisplay] = useState<string>(() => {
    return counter.value ? numberStore.format(counter.value) : '';
  });

  const getInputProps = () => {
    return {
      type: 'text',
      status,
      readOnly,
      disabled,
      value: display,
      onChange: (input: string) => {
        updateDisplay(input);
        update(numberStore.parse(input));
      },
      onBlur: () => {
        const val = correct(counter.value as number);
        if (val !== counter.value) {
          update(val);
        }
        updateDisplay(numberStore.format(val));
      },
    };
  };

  const getIncrementButtonProps = () => {
    return {
      disabled: disabled || counter.isAtMax,
      onClick: () => {
        const next = increment();
        updateDisplay(numberStore.format(next));
      },
    };
  };

  const getDecrementButtonProps = () => {
    return {
      disabled: disabled || counter.isAtMin,
      onClick: () => {
        const next = decrement();
        updateDisplay(numberStore.format(next));
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
