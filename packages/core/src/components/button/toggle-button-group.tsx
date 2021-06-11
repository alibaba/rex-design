import React from 'react';
import cx from 'classnames';
import { Group, GroupProps } from '../layout';
import { Button, ButtonProps } from './button';
import { ListNode } from '../../types';
import { useSelectableList, UseSelectableListProps } from '../../hooks';
import { createContext } from '../../utils';

interface ToggleButtonGroupContext {
  value?: string | string[];
  onSelect?: (value: string, checked: boolean) => void;
}

const [ToggleButtonGroupProvider, useToggleButtonGroup] = createContext<ToggleButtonGroupContext>({
  name: 'ToggleButtonGroupContext',
  strict: false,
});

export interface ToggleButtonGroupProps extends Omit<UseSelectableListProps<string | string[]>, 'component'> {
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
  const {
    dataSource = [],
    isAttached = false,
    selectMode = 'single',
    value: valueProp,
    defaultValue,
    onChange,
    buttonProps,
    className,
    ...rest
  } = props;

  const { value, onSelect } = useSelectableList({
    component: 'ToggleButtonGroup',
    selectMode,
    value: valueProp,
    defaultValue,
    onChange,
  });

  const clazz = cx('rex-toggleButton-group', className);

  const group = {
    value,
    onSelect,
  };

  return (
    <ToggleButtonGroupProvider value={group}>
      <Group isAttached={isAttached} className={clazz} {...rest}>
        {dataSource.map(({ label, value, ...others }) => (
          <ToggleButtonItem {...buttonProps} key={value} value={value} {...others}>
            {label}
          </ToggleButtonItem>
        ))}
      </Group>
    </ToggleButtonGroupProvider>
  );
}

export function ToggleButtonItem(props: ButtonProps & { value?: string }) {
  const { value, isSelected: isSelectedProp, children, ...rest } = props;
  const group = useToggleButtonGroup();

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
