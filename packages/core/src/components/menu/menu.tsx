import { makeRecursiveMapper } from 'ali-react-table';
import React, { useState } from 'react';
import { composeHandlers, composeState, noop } from '../../utils';
import { MenuItem, MenuView, MenuViewProps } from './menu-view';

function processMenuDataSource(
  input: MenuItem[],
  { selectedKeys, onItemClick, onSelect }: Pick<MenuProps, 'selectedKeys' | 'onItemClick' | 'onSelect'>,
) {
  const selectedKeySet = new Set(selectedKeys);

  // todo 先偷偷用一下 ali-react-table 中已有的函数，因为都是自己写的
  //  后面需要看看是否在 @rexd/core 再/定义一份
  const mapper = makeRecursiveMapper<MenuItem>((item) => {
    const result = Object.assign({}, item);
    if (selectedKeySet.has(item.key)) {
      result.selected = true;
    }
    result.onClick = composeHandlers(
      result.onClick,
      (event) => {
        if (onItemClick != null && !item.disabled && item.type !== 'submenu') {
          onItemClick(item.key, { item, event });
        }
      },
      (event) => {
        const nextKeys = selectedKeySet.has(item.key)
          ? selectedKeys.filter((k) => k !== item.key)
          : selectedKeys.concat([item.key]);
        onSelect(nextKeys, { item, event });
      },
    );
    return result;
  });

  return mapper(input);
}

export interface MenuProps extends Omit<MenuViewProps, 'openKeys' | 'onOpen'> {
  openKeys?: string[];
  onOpen?(nextOpenKeys: string[], detail: {}): void;
  defaultOpenKeys?: string[];

  onItemClick?(
    key: string,
    detail: {
      item: MenuItem;
      event: React.MouseEvent<HTMLDivElement>;
    },
  ): void;

  selectMode?: 'none' | 'single' | 'multiple'; // TODO radio? checkbox?
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelect?(
    nextKeys: string[],
    detail: {
      item: MenuItem;
      event: React.MouseEvent<HTMLDivElement>;
    },
  ): void;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    defaultOpenKeys,
    openKeys: openKeysProp,
    onOpen: onOpenProp,
    dataSource: dataSourceProp,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    onSelect: onSelectProp,
    onItemClick,
    selectMode = 'none',
    ...others
  } = props;

  const [_openKeys, _onOpen] = useState<string[]>(defaultOpenKeys ?? []);
  const openKeys = composeState(openKeysProp, _openKeys);
  const onOpen = composeHandlers(onOpenProp, _onOpen);

  const [_selectedKeys, _onSelect] = useState<string[]>(defaultSelectedKeys ?? []);
  const selectedKeys = composeState(selectedKeysProp, _selectedKeys);

  let onSelect: MenuProps['onSelect'] = noop;
  if (selectMode === 'single') {
    onSelect = (nextKeys, detail) => {
      const nextKeysInSingleMode = nextKeys.slice(nextKeys.length - 1);
      onSelectProp(nextKeysInSingleMode, detail);
      _onSelect(nextKeysInSingleMode);
    };
  } else if (selectMode === 'multiple') {
    onSelect = composeHandlers(onSelectProp, _onSelect);
  }

  const dataSource = processMenuDataSource(dataSourceProp, {
    selectedKeys,
    onItemClick,
    onSelect,
  });

  return <MenuView ref={ref} dataSource={dataSource} {...others} openKeys={openKeys} onOpen={onOpen} />;
});
