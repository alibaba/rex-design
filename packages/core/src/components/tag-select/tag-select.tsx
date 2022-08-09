import cx from 'classnames';
import React from 'react';
import { useSelectableList, UseSelectableListProps } from '../../hooks';
import { ListNode } from '../../types';
import { Box, FlexProps, Grid, GridProps, Group } from '../layout';
import { TagSelectProvider, useTagSelectContext } from './context';
import { CheckableTag, CheckableTagProps } from './tag';

export interface TagSelectProps extends Omit<UseSelectableListProps<string | string[]>, 'component'> {
  /**
   * 数据源
   */
  dataSource?: ListNode<string>[];
  /**
   * 尺寸
   */
  size?: CheckableTagProps['size'];
  /**
   * 列数
   */
  columns?: number;
  /**
   * 布局属性
   */
  layoutProps?: Omit<GridProps, 'columns'> | FlexProps;
  className?: string;
}

export function TagSelect(props: TagSelectProps) {
  const {
    size = 'medium',
    dataSource = [],
    selectMode = 'single',
    value: valueProp,
    defaultValue,
    onChange,
    layoutProps = {
      spacingX: 'm',
      spacingY: 'm',
    },
    className,
    columns,
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

  const items = dataSource.map(({ label, value, ...others }) => (
    <TagFilterItem size={size} key={value} value={value} {...others}>
      {label}
    </TagFilterItem>
  ));

  return (
    <TagSelectProvider value={group}>
      <Box className="rex-tag-select">
        {columns ? (
          <Grid className={clazz} columns={columns} {...layoutProps}>
            {items}
          </Grid>
        ) : (
          <Group className={clazz} flexWrap="wrap" {...layoutProps}>
            {items}
          </Group>
        )}
      </Box>
    </TagSelectProvider>
  );
}

interface TagFilterItemProps extends CheckableTagProps {
  value?: string;
}

function TagFilterItem(props: TagFilterItemProps) {
  const { value, selected: selectedProp, children, ...rest } = props;
  const group = useTagSelectContext();

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
