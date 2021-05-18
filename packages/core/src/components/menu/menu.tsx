import { makeRecursiveMapper } from 'ali-react-table';
import cx from 'classnames';
import React, { useState } from 'react';
import { composeHandlers, composeState, noop } from '../../utils';
import { MenuItem, MenuPanel, MenuViewInner, MenuViewProps } from './menu-view';

function processMenuDataSource(
  input: MenuItem[],
  {
    selectedKeys,
    onItemClick,
    onSelect,
    autoCloseSubmenus,
    onOpen,
  }: Pick<MenuProps, 'selectedKeys' | 'onItemClick' | 'onSelect' | 'autoCloseSubmenus' | 'onOpen'>,
) {
  const selectedKeySet = new Set(selectedKeys);

  const mapper = makeRecursiveMapper<MenuItem>((item) => {
    const result = Object.assign({}, item);
    if (selectedKeySet.has(item.key)) {
      result.selected = true;
    }
    result.onClick = composeHandlers(
      result.onClick,
      (event) => {
        const isEnabledMenuItem = !item.disabled && item.type !== 'submenu';
        if (autoCloseSubmenus && isEnabledMenuItem) {
          onOpen([]);
        }
        if (onItemClick != null && isEnabledMenuItem) {
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
  /** 菜单项列表 */
  dataSource: MenuItem[];

  /**
   * 当前打开的子菜单
   * @category 子菜单
   * */
  openKeys?: string[];
  /**
   * 子菜单打开或关闭的回调函数
   * @category 子菜单
   * */
  onOpen?(nextOpenKeys: string[]): void;
  /** 默认打开的子菜单 */
  defaultOpenKeys?: string[];

  /**
   * 点击菜单项时，是否自动关闭当前所有已打开的子菜单
   * @default true
   * @category 子菜单
   * */
  autoCloseSubmenus?: boolean;

  /** 菜单项点击回调 */
  onItemClick?(
    key: string,
    detail: {
      item: MenuItem;
      event: React.MouseEvent<HTMLDivElement>;
    },
  ): void;

  /**
   * 菜单项选择模式
   * @category 选择
   * @default 'none'
   * */
  selectMode?: 'none' | 'single' | 'multiple';
  /**
   * 选中的菜单项
   * @category 选择
   */
  selectedKeys?: string[];
  /**
   * 选择菜单项的回调
   * @category 选择
   * */
  onSelect?(
    nextKeys: string[],
    detail: {
      item: MenuItem;
      event: React.MouseEvent<HTMLDivElement>;
    },
  ): void;
  /**
   * 默认选中的菜单项
   * @category 选择
   * */
  defaultSelectedKeys?: string[];
}

export const MenuInner = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
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
    autoCloseSubmenus = true,
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
    autoCloseSubmenus,
    onOpen,
  });

  return <MenuViewInner ref={ref} dataSource={dataSource} {...others} openKeys={openKeys} onOpen={onOpen} />;
});

type MenuType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<MenuProps> & React.RefAttributes<HTMLDivElement>
> & { Inner?: typeof MenuInner; Panel?: typeof MenuPanel };

export const Menu: MenuType = React.forwardRef<HTMLDivElement, MenuProps>(({ className, style, ...props }, ref) => {
  return (
    <Menu.Panel className={cx('rex-menu', className)} style={style} ref={ref}>
      <Menu.Inner {...props} />
    </Menu.Panel>
  );
});

Menu.Inner = MenuInner;
Menu.Panel = MenuPanel;
