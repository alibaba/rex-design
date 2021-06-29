import cx from 'classnames';
import React from 'react';
import { useSelectableList, UseSelectableListProps } from '../../hooks';
import { ListNode } from '../../types';
import { Flex } from '../layout';
import { Checkbox } from './checkbox';
import { CheckboxGroupProvider } from './context';

export interface CheckboxGroupProps extends Omit<UseSelectableListProps<string[]>, 'selectMode' | 'component'> {
  /**
   * 分组名，用于当页面存在多个 Group 时进行区分
   */
  name?: string;
  /**
   * 数据源
   */
  dataSource?: ListNode<string>[];
  /**
   * 元素排列方向，水平/垂直
   */
  direction?: 'row' | 'column';
  /**
   * 自定义样式名
   */
  className?: string;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { value: valueProp, defaultValue = [], onChange, dataSource = [], name, direction, className, ...rest } = props;
  const { value, onSelect } = useSelectableList({
    component: 'CheckboxGroup',
    selectMode: 'multiple',
    value: valueProp,
    defaultValue,
    onChange,
  });

  const group = {
    name,
    value,
    onSelect,
  };

  const clazz = cx('rex-checkbox-group', className);

  return (
    <CheckboxGroupProvider value={group}>
      <Flex role="checkbox-group" className={clazz} direction={direction} spacing={4} {...rest}>
        {dataSource.map((item) => (
          <Checkbox key={item.value} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </Flex>
    </CheckboxGroupProvider>
  );
}
