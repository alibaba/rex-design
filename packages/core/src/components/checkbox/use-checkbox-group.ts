import cx from 'classnames';
import { useControllableState } from '../../hooks';
import { FormControlOnChangeHandler, StringOrNumber } from '../../types';
import { FlexProps } from '../layout';

export interface UseCheckboxGroupProps {
  /**
   * 元素排列方向，水平/垂直
   */
  direction?: 'row' | 'column';
  /**
   * 分组名，用于当页面存在多个 Group 时进行区分
   */
  name?: string;
  /**
   * 受控值
   */
  value?: StringOrNumber[];
  /**
   * 非受控默认值
   */
  defaultValue?: StringOrNumber[];
  /**
   * 值改变时的回调
   */
  onChange?: FormControlOnChangeHandler<StringOrNumber[]>;
  /**
   * 自定义样式名
   */
  className?: string;
}

export function useCheckboxGroup(props: UseCheckboxGroupProps) {
  const { value: valueProp, defaultValue = [], onChange, name, direction = 'row', className, ...htmlProps } = props;

  const [value, updateValue] = useControllableState({
    name: 'CheckboxGroup',
    value: valueProp,
    defaultValue,
    onChange,
  });

  const getGroupProps = (props?: any) => {
    return {
      ...htmlProps,
      ...props,
      direction,
      className: cx('rex-checkbox-group', className),
      role: 'checkbox-group',
    } as FlexProps;
  };

  const getContextValue = () => {
    return {
      name,
      value,
      onSelect(itemValue: StringOrNumber, checked: boolean) {
        const valueState = value || [];
        const nextValue = checked ? [...valueState, itemValue] : valueState.filter((val) => val !== itemValue);
        updateValue(nextValue);
      },
    };
  };

  return {
    getContextValue,
    getGroupProps,
  };
}
