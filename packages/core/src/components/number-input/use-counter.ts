import { useCallback, useState, useMemo } from 'react';
import { useControllableProp } from '../../hooks';
import { StringOrNumber } from '../../types';
import { toNumber, toPrecision, isNull } from '../../utils';
import { NumberStore } from '../../stores';

export interface UseCounterProps {
  onChange?: (val: number) => void;
  defaultValue?: StringOrNumber;
  value?: StringOrNumber;
  precision?: number;
  step?: number;
  min?: number;
  max?: number;
  /**
   * 格式化选项，参考 Intl.NumberFormat
   */
  formatOptions?: Intl.NumberFormatOptions;
}

export function useCounter(props: UseCounterProps) {
  const {
    onChange,
    defaultValue,
    value: valueProp,
    precision,
    step: stepProp = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    formatOptions,
  } = props;

  const [valueState, setValue] = useState<number>(() => {
    if (isNull(defaultValue)) {
      return 0;
    }
    return toNumber(defaultValue);
  });

  const [isControlled, value] = useControllableProp(valueProp, valueState);

  const numberStore = useMemo(() => {
    return new NumberStore('zh-CN', formatOptions);
  }, [formatOptions]);

  const correct = useCallback(
    (value: number) => {
      const nextValue = correctValue(value, min, max);
      return formatValue(nextValue, precision);
    },
    [min, max, precision],
  );

  const update = useCallback(
    (next) => {
      if (!isControlled) {
        setValue(next);
      }
      onChange?.(next);
    },
    [onChange, isControlled],
  );

  const increment = useCallback(
    (step = stepProp) => {
      let next = toNumber(value) + step;
      next = correct(next);
      update(next);
      return next;
    },
    [update, value, stepProp, correct],
  );

  const decrement = useCallback(
    (step = stepProp) => {
      let next = toNumber(value) - step;
      next = correct(next);
      update(next);
      return next;
    },
    [update, value, stepProp, correct],
  );

  return {
    isAtMax: value === max,
    isAtMin: value === min,
    value,
    update,
    increment,
    decrement,
    correct,
    numberStore,
  };
}

/**
 * 根据精度信息格式化数值
 * @param value
 * @param precision
 */
function formatValue(value: StringOrNumber, precision: number) {
  return toPrecision(toNumber(value), precision);
}

/**
 * 根据最大最小值纠正数值
 * @param value
 * @param min
 * @param max
 */
function correctValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
