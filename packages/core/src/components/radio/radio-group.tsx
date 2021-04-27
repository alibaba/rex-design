import React, { forwardRef } from 'react';
import { useRadioGroup, UseRadioGroupProps } from './use-radio-group';
import { RadioGroupProvider } from './context';
import { Flex } from '../layout';
import { ListNode } from '../../types';
import { Radio } from './radio';

export interface RadioGroupProps extends UseRadioGroupProps {
  dataSource?: ListNode<string>[];
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const { dataSource = [], ...rest } = props;
  const { context, getRootProps } = useRadioGroup(rest);

  return (
    <RadioGroupProvider value={context}>
      <Flex {...getRootProps({}, ref)}>
        {dataSource.map(({ label, value, ...rest }) => (
          <Radio key={value} value={value} {...rest}>
            {label}
          </Radio>
        ))}
      </Flex>
    </RadioGroupProvider>
  );
});
