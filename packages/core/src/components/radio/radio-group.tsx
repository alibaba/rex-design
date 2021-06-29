import React, { forwardRef } from 'react';
import { useId, useSelectableList, UseSelectableListProps } from '../../hooks';
import { ListNode } from '../../types';
import { Flex, FlexProps } from '../layout';
import { RadioGroupProvider } from './context';
import { Radio } from './radio';

export interface RadioGroupProps extends Omit<UseSelectableListProps<string>, 'selectMode' | 'component'> {
  /**
   * 分组名，用于当页面存在多个 Group 时进行区分
   */
  name?: string;
  /**
   * 列表
   */
  dataSource?: ListNode<string>[];
  /**
   * 排列方向
   */
  direction?: FlexProps['direction'];
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    name: nameProp,
    value: valueProp,
    defaultValue,
    onChange,
    dataSource = [],
    direction = 'row',
    ...rest
  } = props;
  const { value, onSelect } = useSelectableList({
    component: 'RadioGroup',
    selectMode: 'single',
    value: valueProp,
    defaultValue,
    onChange,
  });

  const fallbackName = useId('radioGroup');

  const group = {
    name: nameProp || fallbackName,
    value,
    onSelect,
  };

  return (
    <RadioGroupProvider value={group}>
      <Flex role="radiogroup" display="inline-flex" wrap="wrap" spacing={4} direction={direction} {...rest}>
        {dataSource.map(({ label, value, ...rest }) => (
          <Radio key={value} value={value} checked={false} {...rest}>
            {label}
          </Radio>
        ))}
      </Flex>
    </RadioGroupProvider>
  );
});
