import { Icon } from '@rexd/icon';
import { isLeafNode, makeRecursiveMapper } from 'ali-react-table';
import cx from 'classnames';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { composeHandlers, composeState } from '../../utils';
import { TickIcon } from './icons';
import { getLast, toggleValue } from './select-utils';
import { TreeItem } from './tree-view';

export interface CascaderItem {
  label?: React.ReactNode;
  value: string;
  children?: CascaderItem[];
  disabled?: boolean;
}

export interface CascaderProps {
  style?: React.CSSProperties;
  className?: string;
  dataSource: CascaderItem[];

  /** 选中的值，受控用法 */
  selectedKeys?: string[];

  /** 默认选中的值，非受控用法 */
  defaultSelectedKeys?: string[];

  /** 选中值改变的回调 */
  onSelect?(
    nextSelectedKeys: string[],
    detail: any /*{
      item: CascaderItem;
      action: 'select' | 'unselect';
      event: React.MouseEvent<HTMLElement>;
    }*/,
  ): void;

  /** 默认展开的节点 */
  defaultExpandedKeys?: string[];

  /** 展开节点 */
  expandedKeys?: string[];

  /** 节点展开的回调函数 */
  onExpand?: React.Dispatch<React.SetStateAction<string[]>>;

  // todo expandInteractionKind=hover
}

const CascaderItemDiv = styled.div`
  font-size: var(--rex-fontSizes-body);
  height: var(--rex-components-Select-rowHeight);
  padding: 0 8px 0 20px;
  border-radius: var(--rex-radii-s);
  display: flex;
  align-items: center;
  transition: background-color 200ms;
  position: relative;
  cursor: pointer;

  &.expanded {
    background: var(--rex-colors-emphasis-10);
  }

  &:not(.disabled):hover {
    background: var(--rex-colors-emphasis-20);
  }

  &.disabled {
    color: var(--rex-colors-text-disabled);
    cursor: default;
  }

  &.selected {
    font-weight: 500;
  }

  .rex-cascader-icon-left {
    position: absolute;
    left: 4px;
  }

  .rex-cascader-item-label {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rex-cascader-icon-right {
    margin-left: auto;
  }
`;

const CascaderDiv = styled.div`
  display: inline-flex;

  .rex-cascader-column {
    width: 140px;
    height: 200px;
    overflow: auto;
    padding: 8px 4px;

    &.border-left {
      border-left: 1px solid var(--rex-colors-emphasis-20);
    }
  }
`;

function asStringArray(v: string | string[]): string[] {
  return v === undefined ? undefined : Array.isArray(v) ? v : v == null ? [] : [v];
}

export const Cascader = React.forwardRef<HTMLDivElement, CascaderProps>((props: CascaderProps, ref) => {
  const {
    dataSource: dataSourceProp,
    style,
    className,
    defaultExpandedKeys,
    expandedKeys: expandedKeysProp,
    onExpand: onExpandProp,
    selectedKeys: selectedKeysProp,
    onSelect: onSelectProp,
    defaultSelectedKeys,
  } = props;

  const { dataSource, itemMap, parentMap } = useMemo(() => {
    const parentMap = new Map<string, string>();
    const itemMap = new Map<string, TreeItem>();

    // 经过这一步处理之后，item.key 和 item.value 两者必定相同，后续我们统一使用 key 进行操作
    const dataSource = makeRecursiveMapper((input: any, { path }) => {
      const keyOrValue = input.key ?? input.value;
      // path: [...ancestors, parent, self]
      const parent = path[path.length - 2];
      const item = {
        ...input,
        key: keyOrValue,
        value: keyOrValue,
      };
      itemMap.set(keyOrValue, item);
      parentMap.set(keyOrValue, parent?.value);
      return item;
    })(dataSourceProp) as TreeItem[];

    return { parentMap, itemMap, dataSource };
  }, [dataSourceProp]);

  const [_selectedKeys, _onSelect] = useState<string[]>(defaultSelectedKeys ?? []);
  const value = composeState(selectedKeysProp, _selectedKeys);
  const onSelect = composeHandlers(onSelectProp, _onSelect);

  const findDefaultExpandedKeys = (): string[] => {
    if (value.length === 0) {
      return [];
    }
    let key = value[0];
    const result: string[] = [];
    while (true) {
      const parentKey = parentMap.get(key);
      if (parentKey == null) {
        return result;
      }
      result.unshift(parentKey);
      key = parentKey;
    }
  };

  const [_expandedKeys, _onExpand] = useState<string[]>(defaultExpandedKeys ?? findDefaultExpandedKeys());
  const expandedKeys = composeState(expandedKeysProp, _expandedKeys);
  const onExpand = composeHandlers(onExpandProp, _onExpand);

  const columns = [{ key: 'root', depth: 0, rows: dataSource }];
  for (const key of expandedKeys) {
    const lastColumn = columns[columns.length - 1];
    const openCol = lastColumn.rows.find((row) => row.key === key);
    if (openCol == null) {
      break;
    }
    columns.push({ depth: columns.length, rows: openCol.children, key });
  }

  return (
    <CascaderDiv ref={ref} className={cx('rex-cascader', className)} style={style}>
      {columns.map(({ rows, depth, key }) => (
        <div key={`${depth}__${key}`} className={cx('rex-cascader-column', { 'border-left': depth > 0 })}>
          {rows.map((row) => {
            const selected = value.includes(row.key);
            const expanded = expandedKeys.includes(row.key);
            const disabled = row.disabled;

            const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
              if (isLeafNode(row)) {
                onSelect(toggleValue(value, row.key), { event, action: 'select', item: row });
                onExpand((keys) => keys.slice(0, depth));
              } else {
                onExpand((keys) => keys.slice(0, depth).concat(expanded ? [] : [row.key]));
              }
            };
            return (
              <CascaderItemDiv
                key={row.key}
                className={cx('rex-cascader-item', { selected, expanded, disabled })}
                onClick={disabled ? null : onClick}
              >
                {selected && <TickIcon stroke="currentColor" className="rex-cascader-icon-left" />}
                <div className="rex-cascader-item-label" title={String(row.label)}>
                  {row.label}
                </div>
                {!isLeafNode(row) && <Icon type="arrow-right-filling" className="rex-cascader-icon-right" />}
              </CascaderItemDiv>
            );
          })}
        </div>
      ))}
    </CascaderDiv>
  );
});
