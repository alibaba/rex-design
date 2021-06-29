import { isLeafNode } from 'ali-react-table';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../checkbox';
import { CaretDownIcon } from './icons';
import { VirtualList } from '../virtual-list';

export interface TreeItem {
  key: string;
  label?: React.ReactNode;

  disabled?: boolean;

  checkable?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  onCheck?(nextChecked: boolean, detail: { event: React.ChangeEvent<HTMLElement> }): void;

  // todo onClick 目前没有用起来
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;

  // todo editable, draggable

  hasChild?: boolean;
  children?: TreeItem[];
}

export interface FlattenTreeItem extends TreeItem {
  expanded: boolean;
  depth?: number;
}

const TreeDiv = styled.div.withConfig({ componentId: 'rex-tree' })`
  font-size: var(--rex-fontSizes-body);
  cursor: default;
`;

const TreeItemDiv = styled.div.withConfig({ componentId: 'rex-tree-item' })`
  height: var(--rex-components-Tree-rowHeight);
  padding: 0 8px;
  display: flex;
  align-items: center;
  border-radius: 2px;

  &:hover {
    background: var(--rex-colors-emphasis-10);
  }

  .rex-tree-item-checkbox {
    height: auto;
    margin-left: 4px;
    // TODO 需要优化一下 checkbox 的样式
    margin-right: -16px;
  }

  .rex-tree-item-label {
    line-height: var(--rex-components-Tree-labelHeight);
    border-radius: 2px;
    margin: var(--rex-components-Tree-labelMargin);
    padding: var(--rex-components-Tree-labelPadding);

    &.selectable {
      cursor: pointer;
      &:hover {
        background: var(--rex-colors-emphasis-30);
      }
      &.selected {
        background: var(--rex-colors-primary-50);
        color: white;
      }
    }
  }

  .rex-tree-item-expand-icon {
    flex: 0 0 22px;
    display: flex;
    justify-content: center;
    align-self: stretch;
    align-items: center;
    cursor: pointer;

    > svg {
      transform: rotate(-90deg);
      transition: transform var(--animate-duration, 200ms) cubic-bezier(0.4, 1, 0.75, 0.9);
    }

    &.expanded > svg {
      transform: rotate(0deg);
    }

    &.none {
      cursor: default;
    }
  }
`;

export interface TreeViewProps {
  style: React.CSSProperties;
  className: string;
  dataSource: TreeItem[];
  selectable: boolean;
  // checkable: boolean;

  expandedKeys: string[];
  onExpand(
    nextExpandedKeys: string[],
    detail: {
      action: 'expand' | 'collapse';
      key: string;
      event: React.MouseEvent<HTMLElement>;
    },
  ): void;

  selectedKeys: string[];
  onSelect(
    nextSelectedKeys: string[],
    detail: {
      item: TreeItem;
      action: 'select' | 'unselect';
      event: React.MouseEvent<HTMLElement>;
    },
  ): void;

  virtualListRef?: React.Ref<VirtualList<FlattenTreeItem>>;
}

const INDENT_SIZE = 16;

function flattenDataSource(items: TreeItem[], { expandedKeys }: { expandedKeys: string[] }): FlattenTreeItem[] {
  const expandedKeySet = new Set(expandedKeys);

  const result: FlattenTreeItem[] = [];
  dfs(items, 0);
  return result;

  function dfs(items: TreeItem[], depth: number) {
    if (items == null) {
      return;
    }

    for (const item of items) {
      const expanded = expandedKeySet.has(item.key);

      result.push({ ...item, depth, expanded });

      if (expanded) {
        dfs(item.children, depth + 1);
      }
    }
  }
}

// todo 支持键盘导航

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>((props, ref) => {
  const {
    dataSource,
    style,
    className,
    expandedKeys,
    onExpand,
    onSelect,
    selectedKeys,
    selectable,
    virtualListRef,
  } = props;

  const selectedKeySet = new Set(selectedKeys);

  function renderTreeItem(item: FlattenTreeItem, flattenItemIndex: number, listRowDataset: any) {
    const depth = item.depth ?? 0;
    let indentNode: React.ReactElement = null;
    if (depth > 0) {
      indentNode = <span className="rex-tree-item-indention" style={{ minWidth: INDENT_SIZE * depth }} />;
    }

    let caret = <span className="rex-tree-item-expand-icon none" />;
    const needCaret = item.hasChild ?? !isLeafNode(item);
    if (needCaret) {
      if (item.expanded) {
        caret = (
          <span
            className="rex-tree-item-expand-icon expanded"
            onClick={(event) => {
              onExpand(
                expandedKeys.filter((k) => k !== item.key),
                {
                  key: item.key,
                  action: 'collapse',
                  event,
                },
              );
            }}
          >
            <CaretDownIcon />
          </span>
        );
      } else {
        caret = (
          <span
            className="rex-tree-item-expand-icon collapsed"
            onClick={(event) => {
              onExpand([...expandedKeys, item.key], {
                key: item.key,
                action: 'expand',
                event,
              });
            }}
          >
            <CaretDownIcon />
          </span>
        );
      }
    }

    let checkbox: React.ReactElement = null;
    if (item.checkable) {
      checkbox = (
        <Checkbox
          className="rex-tree-item-checkbox"
          // style={{ height: 'auto' }}
          checked={item.checked}
          indeterminate={item.indeterminate}
          onChange={(nextChecked, detail) => {
            // todo detail 有的时候会变为空
            item.onCheck?.(nextChecked, { event: detail?.event });
          }}
        />
      );
    }

    let label = <span className={'rex-tree-item-label'}>{item.label}</span>;
    if (selectable) {
      const selected = selectedKeySet.has(item.key);
      label = (
        <span
          className={cx('rex-tree-item-label', 'selectable', { selected })}
          onClick={(event) => {
            const action = selected ? 'unselect' : 'select';
            const nextSelectedKeys =
              action === 'unselect' ? selectedKeys.filter((k) => k !== item.key) : selectedKeys.concat([item.key]);
            onSelect(nextSelectedKeys, { event, item, action });
          }}
        >
          {item.label}
        </span>
      );
    }

    return (
      <TreeItemDiv key={item.key} {...listRowDataset}>
        {indentNode}
        {caret}
        {checkbox}
        {label}
      </TreeItemDiv>
    );
  }

  const flattened = flattenDataSource(dataSource, { expandedKeys });

  return (
    <TreeDiv ref={ref} className={cx('rex-tree', className)} style={style}>
      <VirtualList ref={virtualListRef} estimatedRowHeight={32} renderRow={renderTreeItem} rows={flattened} />
    </TreeDiv>
  );
});
