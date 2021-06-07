import { collectNodes, makeRecursiveMapper } from 'ali-react-table';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { pick } from '../../utils';
import { Input } from '../input';
import { AdaptivePopup } from '../overlays';
import { Cascader } from './cascader';
import { SelectTrigger } from './select-trigger';
import { SelectPanelDiv } from './select-view';
import { TreeProps } from './tree';
import { TreeItem } from './tree-view';
import {
  CascaderSelectItem,
  ISelectAppearanceProps,
  ISelectPopupProps,
  ISelectSearchProps,
  selectAppearancePropKeys,
} from './types';
import { searchTreeByKeyword } from './utils/searchTreeByKeyword';
import { TreeCheckedStrategy } from './utils/TreeDataHelper';

const StyledCascader = styled(Cascader)`
  border: none;
  border-radius: 0;
`;

// todo 需要优化代码

export interface CascaderSelectViewProps extends ISelectPopupProps, ISelectAppearanceProps, ISelectSearchProps {
  value: string[];
  onChange(nextValue: string[], detail: {}): void;

  disabled?: boolean;
  // todo readOnly?: boolean;
  dataSource?: CascaderSelectItem[];

  expandedKeys?: TreeProps['expandedKeys'];
  onExpand?: TreeProps['onExpand'];

  selectMode: 'single' | 'multiple';

  checkStrictly?: boolean;
  checkedStrategy?: TreeCheckedStrategy;
}

export const CascaderSelectView = React.forwardRef<HTMLDivElement, CascaderSelectViewProps>((props, ref) => {
  const {
    value,
    onChange,
    dataSource,
    autoWidth = true,
    autoHeight = true,
    selectMode,
    disabled, // TODO

    // expansion
    expandedKeys,
    onExpand,

    // popup visibility
    visible,
    onRequestOpen,
    onRequestClose,

    // search props
    searchValue,
    onSearch,
    showSearch,
    notFoundContent,

    // others
    autoScrollToFirstItemWhenOpen = true,
    autoCloseAfterSelect = selectMode === 'single',
    checkStrictly,
    checkedStrategy,
    popupProps,
  } = props;

  const appearance = pick(props, selectAppearancePropKeys);

  const treeDataSource = useMemo(
    () =>
      (makeRecursiveMapper<CascaderSelectItem>((item) => ({
        ...item,
        key: item.value,
      }))(dataSource) as unknown) as TreeItem[],
    [dataSource],
  );

  const getLabelByValue = useMemo(() => {
    const map = new Map(collectNodes(dataSource).map((item) => [item.value, item]));

    return (v: string) => map.get(v)?.label ?? v;
  }, [dataSource]);

  const filteredTreeDataSource = useMemo(() => {
    let _filteredTreeDataSource = treeDataSource;
    if (showSearch && searchValue.trim()) {
      _filteredTreeDataSource = searchTreeByKeyword(searchValue, treeDataSource).filteredDataSource;
    }
    return _filteredTreeDataSource;
  }, [searchValue, showSearch, treeDataSource]);

  const isNotFound = dataSource.length > 0 && filteredTreeDataSource.length === 0;

  return (
    <AdaptivePopup
      {...popupProps}
      visible={visible}
      onRequestOpen={onRequestOpen}
      onRequestClose={onRequestClose}
      offset={[0, 4]}
      autoWidth={autoWidth}
      autoHeight={autoHeight}
      interactionKind="click"
      onOpen={() => {
        if (autoScrollToFirstItemWhenOpen) {
          // const valueSet = new Set(value);
          // const list = virtualListRef.current as VirtualList<CascaderSelectItem>;
          // const index = list.props.rows.findIndex((row) => valueSet.has(row.value));
          // if (index !== -1) {
          //   list.scrollToRow(index, VirtualListAlign.center);
          // }
        }
      }}
      renderTarget={(arg: any) => (
        <SelectTrigger
          ref={ref}
          visible={visible}
          value={value}
          dataSource={dataSource}
          onChange={onChange}
          selectMode={selectMode}
          popupTargetRenderArg={arg}
          getLabelByValue={getLabelByValue}
          {...appearance}
        />
      )}
      renderChildren={({ ref }: any) => (
        <SelectPanelDiv className="rex-select-panel" ref={ref as React.RefObject<HTMLDivElement>}>
          {showSearch && (
            <Input
              className="rex-select-search"
              placeholder="搜索"
              hasClear
              value={searchValue}
              ref={(node) => {
                node?.querySelector('input').focus();
              }}
              onChange={(nextSearchValue) => {
                onSearch(nextSearchValue, { event: null });
                if (!visible) {
                  onRequestOpen('search');
                }
              }}
            />
          )}
          {isNotFound && notFoundContent}

          <StyledCascader
            dataSource={filteredTreeDataSource}
            onChange={() => onRequestClose('close')}
            // todo 完善逻辑
            // expandedKeys={expandedKeys}
            // onExpand={onExpand}
            // // 多选交互
            // checkable={selectMode === 'multiple'}
            // checkStrictly={checkStrictly}
            // checkedStrategy={checkedStrategy}
            // checkedKeys={value}
            // onCheck={(nextCheckedKeys, detail) => {
            //   onChange(nextCheckedKeys, detail);
            //   if (autoCloseAfterSelect) {
            //     onRequestClose();
            //   }
            // }}
            // // 单选交互
            // selectable={selectMode === 'single'}
            // selectedKeys={value}
            // onSelect={(nextSelectedKeys, detail) => {
            //   onChange(nextSelectedKeys, detail);
            //   if (autoCloseAfterSelect) {
            //     onRequestClose();
            //   }
            // }}
          />
        </SelectPanelDiv>
      )}
    />
  );
});
