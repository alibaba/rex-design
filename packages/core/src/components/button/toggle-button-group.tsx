import React from 'react';
import cx from 'classnames';
import { Group, GroupProps } from '../layout';
import { Button, ButtonProps } from './button';
import { ListNode } from '../../types';
import { useCheckboxGroup, UseCheckboxGroupProps } from '../checkbox/use-checkbox-group';
import { CheckboxGroupProvider, useCheckboxGroupContext } from '../checkbox/context';

export interface ToggleButtonGroupProps extends UseCheckboxGroupProps {
  /**
   * 数据源
   */
  dataSource?: ListNode<string>[];
  /**
   * 透传给按钮的属性
   */
  buttonProps?: ButtonProps;
  /**
   * 按钮是否贴合在一起
   */
  isAttached?: GroupProps['isAttached'];
  className?: string;
}

// TODO: 还是不够通用，需要支持自定义组件的传入
export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  const { dataSource = [], isAttached = false, buttonProps, className, ...rest } = props;
  const { getRootProps, getContextValue } = useCheckboxGroup({
    component: 'ToggleButtonGroup',
    ...rest,
  });
  const rootProps = getRootProps({
    isAttached,
    className: cx('rex-toggleButton-group', className),
  } as GroupProps);

  return (
    <CheckboxGroupProvider value={getContextValue()}>
      <Group {...rootProps}>
        {dataSource.map((item) => (
          <ToggleButtonItem {...buttonProps} key={item.value} value={item.value}>
            {item.label}
          </ToggleButtonItem>
        ))}
      </Group>
    </CheckboxGroupProvider>
  );
}

export function ToggleButtonItem(props: ButtonProps & { value?: string }) {
  const { value, isSelected: isSelectedProp, children, ...rest } = props;
  const group = useCheckboxGroupContext();

  let isSelected = isSelectedProp;
  if (group?.value !== undefined && value) {
    isSelected = (group.value || []).includes(value);
  }

  let onSelect;

  if (group.onSelect && value) {
    onSelect = () => {
      group.onSelect(value, !isSelected);
    };
  }

  return (
    <Button isSelected={isSelected} onClick={onSelect} {...rest}>
      {children}
    </Button>
  );
}
