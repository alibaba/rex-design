import { collectNodes, makeRecursiveMapper } from 'ali-react-table';
import React, { useMemo, useRef } from 'react';
import { pick } from '../../utils';
import { Input } from '../input';
import { AdaptivePopup } from '../overlays';
import { Cascader, ICascaderExpansionProps } from './cascader';
import { SelectTrigger } from './select-trigger';
import { SelectPanelDiv } from './select-view';
import { TreeItem } from './tree-view';
import {
  CascaderSelectItem,
  ISelectAppearanceProps,
  ISelectPopupProps,
  ISelectSearchProps,
  selectAppearancePropKeys,
} from './types';
import { searchTreeByKeyword } from './utils/searchTreeByKeyword';

// 注意这里继承的一些 interface 包含了 非受控部分的 props
// 但 CascaderSelectView 只会使用受控部分的 props
export interface CascaderSelectViewProps
  extends Partial<ISelectPopupProps>,
    ISelectAppearanceProps,
    Partial<ISelectSearchProps>,
    ICascaderExpansionProps {
  selectMode: 'single' | 'multiple';
  value?: string[];
  onChange?(nextValue: string[], detail: {}): void;

  disabled?: boolean;
  dataSource?: CascaderSelectItem[];
  maxDepth?: number;
}

/** 级联选择视图组件，完全受控，状态均由上层提供 */
export const CascaderSelectView = React.forwardRef<HTMLDivElement, CascaderSelectViewProps>((props, ref) => {
  const {
    value,
    onChange,
    dataSource,
    autoWidth = true,
    autoHeight = true,
    selectMode,
    disabled,

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
    maxDepth,

    // others
    autoScrollToFirstItemWhenOpen = true,
    autoCloseAfterSelect = selectMode === 'single',
    popupProps,
  } = props;

  const appearance = pick(props, selectAppearancePropKeys);
  const searchInputWrapperRef = useRef<HTMLDivElement>(null);

  const treeDataSource = useMemo(() => {
    // todo CascaderSelectItem -> TreeItem 的转换需要完整地看下
    return (makeRecursiveMapper<CascaderSelectItem>((item) => ({
      ...item,
      key: item.value,
    }))(dataSource) as unknown) as TreeItem[];
  }, [dataSource]);

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
          // todo 触发 cascader 各个 column 内滚动
        }
        const input = searchInputWrapperRef.current?.querySelector('input');
        input?.focus();
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
          disabled={disabled}
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
              ref={searchInputWrapperRef}
              onChange={(nextSearchValue) => {
                onSearch(nextSearchValue, { event: null });
                if (!visible) {
                  onRequestOpen('search');
                }
              }}
            />
          )}
          {isNotFound && notFoundContent}

          <Cascader
            dataSource={filteredTreeDataSource as any /* todo 规范树型 dataSource */}
            selectedKeys={value}
            onSelect={(...args) => {
              onChange(...args);
              if (autoCloseAfterSelect) {
                onRequestClose('reason');
              }
            }}
            maxDepth={maxDepth}
            expandedKeys={expandedKeys}
            onExpand={onExpand}
          />
        </SelectPanelDiv>
      )}
    />
  );
});
