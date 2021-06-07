import { useControllableState } from '../../hooks';
import { FormControlOnChangeHandler } from '../../types';

export interface UseCheckboxGroupProps {
  /**
   * 组件名（仅用于警告信息展示）
   */
  component?: string;
  /**
   * 分组名，用于当页面存在多个 Group 时进行区分
   */
  name?: string;
  /**
   * 受控值
   */
  value?: string[];
  /**
   * 非受控默认值
   */
  defaultValue?: string[];
  /**
   * 值改变时的回调
   */
  onChange?: FormControlOnChangeHandler<string[]>;
}

export function useCheckboxGroup(props: UseCheckboxGroupProps) {
  const { value: valueProp, defaultValue = [], onChange, component = 'CheckboxGroup', name, ...htmlProps } = props;

  const [value, updateValue] = useControllableState({
    name: component,
    value: valueProp,
    defaultValue,
    onChange,
  });

  const getRootProps = (props?: any) => {
    return {
      ...htmlProps,
      ...props,
    };
  };

  const getContextValue = () => {
    return {
      name,
      value,
      onSelect(itemValue: string, checked: boolean) {
        const valueState = value || [];
        const nextValue = checked ? [...valueState, itemValue] : valueState.filter((val) => val !== itemValue);
        updateValue(nextValue);
      },
    };
  };

  return {
    getContextValue,
    getRootProps,
  };
}
