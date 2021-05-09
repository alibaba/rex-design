import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { composeHandlers } from '../../utils';
import { Overlay, Popup, PopupInteractionKind } from '../overlays';
import { TickIcon } from '../select/icons';

const MENU_VERTICAL_PADDING = 8;

export interface MenuItem {
  key: string;
  label?: React.ReactNode;
  helper?: React.ReactNode;
  type?: 'item' | 'submenu' | 'group' | 'divider';

  disabled?: boolean;
  active?: boolean;
  selected?: boolean;

  onClick?(event: React.MouseEvent<HTMLDivElement>): void;

  // todo props?: React.HTMLAttributes<HTMLDivElement>;
  //  先暂时不允许 props 透传，等后面有需求的时候再加上就好

  children?: MenuItem[];
}

const MenuDiv = styled.div.withConfig({ componentId: 'rex-menu' })`
  list-style: none;
  padding: ${MENU_VERTICAL_PADDING}px 4px;
  margin: 0;
  min-width: 180px;

  :not(.minimal) {
    border-radius: var(--rex-radii-m);
    box-shadow: var(--rex-shadows-lowDown);
    background: var(--rex-overlay-depth-m);
  }

  .rex-menu-divider {
    margin: 8px 12px;
    border-bottom: 1px solid var(--rex-colors-emphasis-30);
  }

  .rex-menu-group-label {
    height: 32px;
    line-height: 32px;
    color: #999;
    padding: 0 12px;
    font-size: 12px;
  }
`;

const MenuItemDiv = styled.div.withConfig({ componentId: 'rex-menu-item' })`
  // TODO 样式需要进行优化
  cursor: pointer;
  height: 32px;
  font-size: 12px;
  line-height: 32px;
  overflow: hidden;
  padding: 0 20px;
  border-radius: 2px;

  &:hover:not(.disabled),
  &[data-rex-popup-open='true'] {
    background: var(--rex-colors-emphasis-10);
  }

  &.active {
    font-weight: 500;
  }

  &.disabled {
    cursor: not-allowed;
    color: var(--rex-colors-text-disabled);
  }

  .rex-menu-item-inner {
    display: flex;
    align-items: center;
    position: relative;
  }

  .rex-menu-item-helper {
    margin-left: auto;
    color: var(--rex-colors-text-info);
  }

  .rex-menu-icon-left {
    position: absolute;
    left: -16px;
  }

  .rex-menu-icon-right {
    color: #666;
    position: absolute;
    right: -16px;
  }
`;

export interface MenuViewProps {
  className?: string;
  style?: React.CSSProperties;

  dataSource: MenuItem[];

  /**
   * 打开子菜单的交互方式
   * @default 'hover'
   * @category 子菜单
   * */
  interactionKind?: PopupInteractionKind;

  openKeys: string[];
  onOpen(nextOpenKeys: string[]): void;
}

function renderItemInner(item: MenuItem, { hasArrow, hasSelect }: { hasArrow?: boolean; hasSelect?: boolean }) {
  return (
    <div key={item.key} className="rex-menu-item-inner">
      {hasSelect && <TickIcon stroke="currentColor" className="rex-menu-icon-left" />}

      <span className={'rex-menu-item-text'}>{item.label}</span>
      {item.helper && <span className="rex-menu-item-helper">{item.helper}</span>}

      {hasArrow && <Icon type="arrow-right-filling" className="rex-menu-icon-right" />}
    </div>
  );
}

function flattenDataSource(items: MenuItem[]) {
  const result: MenuItem[] = [];
  dfs(items);
  return result;

  function dfs(items: MenuItem[]) {
    if (items == null) {
      return;
    }

    for (const item of items) {
      result.push(item);

      if (item.type === 'group') {
        dfs(item.children);
      }
    }
  }
}

// 菜单视图组件（提供菜单视图，完全受控组件）
export const MenuView = React.forwardRef<HTMLDivElement, MenuViewProps>(
  ({ dataSource = [], interactionKind = 'hover', openKeys, onOpen, ...others }, ref) => {
    const openPopup = (key: string) => {
      const nextOpenKeys = [...openKeys, key];
      onOpen(nextOpenKeys);
    };
    const closePopup = (key: string) => {
      const nextOpenKeys = openKeys.filter((k) => k !== key);
      onOpen(nextOpenKeys);
    };

    function renderItem(item: MenuItem): React.ReactElement {
      const itemProps = {
        className: cx({ disabled: item.disabled, active: item.active }),
        onClick: item.onClick,
      };

      if (item.type === 'divider') {
        return <div key={item.key} className="rex-menu-divider" />;
      }

      if (item.type === 'group') {
        return (
          <div key={item.key} className="rex-menu-group-label">
            {item.label}
          </div>
        );
      }

      if (item.type === 'submenu') {
        return (
          <Popup
            key={item.key}
            interactionKind={interactionKind}
            placement="right-start"
            offset={[-MENU_VERTICAL_PADDING, 0]}
            visible={openKeys.includes(item.key)}
            onRequestOpen={(reason) => {
              openPopup(item.key);
            }}
            onRequestClose={(reason) => {
              closePopup(item.key);
            }}
            animation={{ in: Overlay.animations.fadeIn, out: Overlay.animations.fadeOut }}
            renderTarget={(arg) => (
              <MenuItemDiv
                ref={arg.ref}
                onMouseEnter={arg.onMouseEnter}
                onMouseLeave={arg.onMouseLeave}
                {...itemProps}
                onClick={composeHandlers(arg.onClick, itemProps.onClick)}
              >
                {renderItemInner(item, { hasArrow: true })}
              </MenuItemDiv>
            )}
            renderChildren={(arg) => (
              <MenuView
                ref={arg.ref as React.RefObject<HTMLDivElement>}
                dataSource={item.children}
                interactionKind={interactionKind}
                openKeys={openKeys}
                onOpen={onOpen}
              />
            )}
          />
        );
      }

      return (
        <MenuItemDiv key={item.key} {...itemProps}>
          {renderItemInner(item, { hasSelect: item.selected })}
        </MenuItemDiv>
      );
    }

    return (
      <MenuDiv ref={ref} {...others}>
        {flattenDataSource(dataSource).map(renderItem)}
      </MenuDiv>
    );
  },
);
