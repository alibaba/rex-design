import React from 'react';
import cx from 'classnames';
import { Flex } from '../layout';
import { FlexboxProps, ListNode } from '../../types';
import { Checkbox } from './checkbox';
import { CheckboxGroupProvider } from './context';
import { useCheckboxGroup, UseCheckboxGroupProps } from './use-checkbox-group';

export interface CheckboxGroupProps extends UseCheckboxGroupProps {
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
  const { dataSource = [], direction, className, ...rest } = props;
  const { getRootProps, getContextValue } = useCheckboxGroup(rest);
  const rootProps = getRootProps({
    direction,
    className: cx('rex-checkbox-group', className),
    role: 'checkbox-group',
  } as FlexboxProps);

  return (
    <CheckboxGroupProvider value={getContextValue()}>
      <Flex {...rootProps}>
        {dataSource.map((item) => (
          <Checkbox key={item.value} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </Flex>
    </CheckboxGroupProvider>
  );
}
