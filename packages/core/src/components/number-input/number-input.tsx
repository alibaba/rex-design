import { Icon } from '@rexd/icon';
import React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Group } from '../layout';
import { useNumberInput, UseNumberInputProps } from './use-number-input';

export interface NumberInputProps extends UseNumberInputProps {}

export function NumberInput(props: NumberInputProps) {
  const { getInputProps, getDecrementButtonProps, getIncrementButtonProps, htmlProps } = useNumberInput(props);
  const inputProps = getInputProps();
  const incBtnProps = getIncrementButtonProps();
  const decBtnProps = getDecrementButtonProps();

  return (
    <Group isAttached {...htmlProps}>
      <Button {...decBtnProps}>
        <Icon type="minus-bold" />
      </Button>
      <Input width="100px" {...inputProps} />
      <Button {...incBtnProps}>
        <Icon type="add-bold" />
      </Button>
    </Group>
  );
}
