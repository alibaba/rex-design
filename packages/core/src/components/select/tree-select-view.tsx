import { collectNodes, makeRecursiveMapper } from 'ali-react-table';
import cx from 'classnames';
import React, { useMemo, useRef } from 'react';
import { useDevice } from '../../providers';
import { pick } from '../../utils';
import { Input } from '../input';
import { AdaptivePopup, Popup } from '../overlays';
import { searchTreeByKeyword, Tree, TreeItem, TreeProps } from '../tree';
import { TreeCheckedStrategy } from '../tree/helpers/TreeDataHelper';
import { VirtualList, VirtualListAlign } from '../virtual-list';
import { SelectTrigger } from './select-trigger';
import { SelectPanelDiv } from './select-view';
import {
  ISelectAppearanceProps,
  ISelectPopupProps,
  ISelectSearchProps,
  selectAppearancePropKeys,
  TreeSelectItem,
} from './types';

export interface TreeSelectViewProps extends ISelectPopupProps, ISelectAppearanceProps, ISelectSearchProps {
  value: string[];
  onChange(nextValue: string[], detail: {}): void;

  disabled?: boolean;
  // todo readOnly?: boolean;
  dataSource?: TreeSelectItem[];

  expandedKeys?: TreeProps['expandedKeys'];
  onExpand?: TreeProps['onExpand'];

  selectMode: 'single' | 'multiple';

  checkStrictly?: boolean;
  checkedStrategy?: TreeCheckedStrategy;
}

// todo 支持键盘导航

export const TreeSelectView = React.forwardRef<HTMLDivElement, TreeSelectViewProps>((props, ref) => {
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

  const virtualListRef = useRef<VirtualList<unknown>>();

  const treeDataSource = useMemo(
    () =>
      (makeRecursiveMapper<TreeSelectItem>((item) => ({
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

  // 处理不同端下的表现
  const { device } = useDevice();
  let height: number = undefined;
  let restricted = false;
  if (device.name === 'phone' && showSearch) {
    height = 350;
    restricted = true;
  }

  return (
    <AdaptivePopup
      {...popupProps}
      visible={visible}
      onRequestOpen={onRequestOpen}
      onRequestClose={onRequestClose}
      offset={[0, appearance.minimum ? -2 : 2]}
      autoWidth={autoWidth}
      autoHeight={autoHeight}
      triggerType="click"
      fullscreenProps={{
        style: { width: '90vw', height },
      }}
      onOpen={() => {
        if (autoScrollToFirstItemWhenOpen) {
          const valueSet = new Set(value);
          const list = virtualListRef.current as VirtualList<TreeSelectItem>;
          const index = list.props.rows.findIndex((row) => valueSet.has(row.value));
          if (index !== -1) {
            list.scrollToRow(index, VirtualListAlign.center);
          }
        }
      }}
      renderTrigger={(params: any) => (
        <SelectTrigger
          ref={ref}
          visible={visible}
          value={value}
          dataSource={dataSource}
          onChange={onChange}
          selectMode={selectMode}
          popupTriggerRenderParams={params}
          getLabelByValue={getLabelByValue}
          {...appearance}
        />
      )}
      renderChildren={({ ref }: any) => (
        <SelectPanelDiv ref={ref as React.RefObject<HTMLDivElement>} className={cx({ restricted })}>
          {showSearch && (
            <Input
              // todo htmlType=search
              className="rex-select-search"
              placeholder="搜索"
              hasClear
              value={searchValue}
              onChange={(nextSearchValue) => {
                onSearch(nextSearchValue, { event: null });
                if (!visible) {
                  onRequestOpen('search');
                }
              }}
            />
          )}
          {isNotFound && notFoundContent}

          <Tree
            virtualListRef={virtualListRef as React.Ref<VirtualList<any>>}
            dataSource={filteredTreeDataSource}
            expandedKeys={expandedKeys}
            onExpand={onExpand}
            // 多选交互
            checkable={selectMode === 'multiple'}
            checkStrictly={checkStrictly}
            checkedStrategy={checkedStrategy}
            checkedKeys={value}
            onCheck={(nextCheckedKeys, detail) => {
              onChange(nextCheckedKeys, detail);
              if (autoCloseAfterSelect) {
                onRequestClose();
              }
            }}
            // 单选交互
            selectable={selectMode === 'single'}
            selectedKeys={value}
            onSelect={(nextSelectedKeys, detail) => {
              onChange(nextSelectedKeys, detail);
              if (autoCloseAfterSelect) {
                onRequestClose();
              }
            }}
          />
        </SelectPanelDiv>
      )}
    />
  );
});
