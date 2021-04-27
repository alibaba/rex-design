import React from 'react';
import { ListNode, StringOrNumber } from '../../types';
import { Checkbox } from './checkbox';
import { CheckboxGroupProvider } from './context';
import { useCheckboxGroup, UseCheckboxGroupProps } from './use-checkbox-group';

export interface CheckboxGroupProps extends UseCheckboxGroupProps {
  dataSource?: ListNode<StringOrNumber>[];
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { dataSource = [], ...rest } = props;
  const { getGroupProps, getContextValue } = useCheckboxGroup(rest);

  return (
    <CheckboxGroupProvider value={getContextValue()}>
      <div {...getGroupProps()}>
        {dataSource.map((item) => (
          <Checkbox key={item.value} value={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </div>
    </CheckboxGroupProvider>
  );
}
