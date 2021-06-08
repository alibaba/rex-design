import { useCallback } from 'react';
import { FormControlOnChangeHandler } from '../types';
import { useControllableState } from './use-controllable';

export interface UseSelectableListProps<T> {
  /**
   * 组件名（仅用于警告信息展示）
   */
  component: string;
  /**
   * 选择模式，单选，多选
   */
  selectMode?: 'single' | 'multiple';
  value?: T;
  defaultValue?: T;
  onChange?: FormControlOnChangeHandler<T>;
}

export function useSelectableList<T>(props: UseSelectableListProps<T>) {
  const { component, selectMode = 'single', value: valueProp, defaultValue, onChange } = props;

  const [value, updateValue] = useControllableState<T>({
    name: component,
    value: valueProp,
    defaultValue,
    onChange,
  });

  const onSelect = useCallback(
    (itemValue: string, checked: boolean) => {
      const getNextValueOfSingleMode = (itemValue: string, checked: boolean) => {
        return checked ? itemValue : undefined;
      };

      const getNextValueOfMultipleMode = (itemValue: string, checked: boolean) => {
        const valueState = (value || []) as string[];
        const nextValue = checked ? [...valueState, itemValue] : valueState.filter((val) => val !== itemValue);
        return nextValue;
      };

      const nextValue =
        selectMode === 'multiple'
          ? getNextValueOfMultipleMode(itemValue, checked)
          : getNextValueOfSingleMode(itemValue, checked);

      updateValue(nextValue as any);
    },
    [selectMode, value, updateValue],
  );

  return {
    value,
    onSelect,
  };
}
