import cx from 'classnames';
import React from 'react';
import { useSelectableList, UseSelectableListProps } from '../../hooks';
import { ListNode } from '../../types';
import { createContext } from '../../utils';
import { Group, GroupProps } from '../layout';
import { CheckableTag, CheckableTagProps } from './tag';

interface TagFilterContext {
  value?: string | string[];
  onSelect?: (value: string, checked: boolean) => void;
}

const [TagFilterProvider, useTagFilter] = createContext<TagFilterContext>({
  name: 'ToggleButtonGroupContext',
  strict: false,
});

export interface TagFilterProps extends Omit<UseSelectableListProps<string | string[]>, 'component'> {
  /**
   * 数据源
   */
  dataSource?: ListNode<string>[];
  /**
   * 尺寸
   */
  size?: CheckableTagProps['size'];
  /**
   * 布局属性
   */
  layoutProps?: GroupProps;
  className?: string;
}

export function TagFilter(props: TagFilterProps) {
  const {
    size = 'medium',
    dataSource = [],
    selectMode = 'single',
    value: valueProp,
    defaultValue,
    onChange,
    layoutProps,
    className,
    ...rest
  } = props;

  const { value, onSelect } = useSelectableList({
    component: 'TagFilter',
    selectMode,
    value: valueProp,
    defaultValue,
    onChange,
  });

  const clazz = cx('rex-tag-filter', className);
  const group = {
    value,
    onSelect,
  };

  return (
    <TagFilterProvider value={group}>
      <Group className={clazz} {...layoutProps} {...rest}>
        {dataSource.map(({ label, value, ...others }) => (
          <TagFilterItem size={size} key={value} value={value} {...others}>
            {label}
          </TagFilterItem>
        ))}
      </Group>
    </TagFilterProvider>
  );
}

interface TagFilterItemProps extends CheckableTagProps {
  value?: string;
}

function TagFilterItem(props: TagFilterItemProps) {
  const { value, selected: selectedProp, children, ...rest } = props;
  const group = useTagFilter();

  let selected = selectedProp;
  if (group?.value !== undefined && value) {
    selected = (group.value || []).includes(value);
  }

  let onSelect;

  if (group.onSelect && value) {
    onSelect = () => {
      group.onSelect(value, !selected);
    };
  }

  return (
    <CheckableTag selected={selected} onClick={onSelect} {...rest}>
      {children}
    </CheckableTag>
  );
}
