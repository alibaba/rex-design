import { collectNodes, isLeafNode, makeRecursiveMapper } from 'ali-react-table';
import React, { useState } from 'react';
import { composeHandlers, composeState } from '../../utils';
import { CascaderSelectView } from './cascader-select-view';
import { getLast } from './select-utils';
import { TreeProps } from './tree';
import { TreeItem } from './tree-view';
import { CascaderSelectItem, ISelectAppearanceProps, ISelectPopupProps, ISelectSearchProps } from './types';

export interface SingleCascaderSelectProps
  extends Partial<ISelectPopupProps>,
    ISelectAppearanceProps,
    Partial<ISelectSearchProps> {
  defaultValue?: string;
  value?: string;
  onChange?(nextValue: string, detail: {}): void;

  disabled?: boolean;
  // TODO readOnly?: boolean;
  dataSource?: CascaderSelectItem[];

  expandedKeys?: TreeProps['expandedKeys'];
  onExpand?: TreeProps['onExpand'];
  defaultExpandAll?: TreeProps['defaultExpandAll'];
  defaultExpandedKeys?: TreeProps['defaultExpandedKeys'];

  defaultVisible?: boolean;
  defaultSearchValue?: string;
}

// todo 需要优化代码

export const SingleCascaderSelect = React.forwardRef<HTMLDivElement, SingleCascaderSelectProps>((props, ref) => {
  const {
    visible: visibleProp,
    defaultVisible,
    onRequestClose: onRequestCloseProp,
    onRequestOpen: onRequestOpenProp,
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,

    expandedKeys: expandedKeysProp,
    onExpand: onExpandProp,
    defaultExpandAll,
    defaultExpandedKeys,

    searchValue: searchValueProp,
    onSearch: onSearchProp,
    dataSource,

    ...others
  } = props;

  const [_value, _onChange] = useState(defaultValue);
  const value = composeState(valueProp, _value);
  const onChange = composeHandlers(onChangeProp, _onChange);

  const treeDataSource = (makeRecursiveMapper<CascaderSelectItem>((item) => ({
    ...item,
    key: item.value,
  }))(dataSource) as unknown) as TreeItem[];

  const [_visible, _onVisibleChange] = useState(defaultVisible);
  const visible = composeState(visibleProp, _visible);
  const onRequestOpen = composeHandlers(onRequestOpenProp, () => _onVisibleChange(true));
  const onRequestClose = composeHandlers(onRequestCloseProp, () => _onVisibleChange(false));

  const [_searchValue, _onSearch] = useState('');
  const searchValue = composeState(searchValueProp, _searchValue);
  const onSearch = composeHandlers(onSearchProp, _onSearch);

  const [_expandedKeys, _onExpand] = useState<string[]>(
    defaultExpandAll
      ? collectNodes(treeDataSource)
          .filter((item) => !isLeafNode(item))
          .map((item) => item.key)
      : defaultExpandedKeys ?? [],
  );
  const expandedKeys = composeState(expandedKeysProp, _expandedKeys);
  const onExpand = composeHandlers(onExpandProp, _onExpand);

  return (
    <CascaderSelectView
      ref={ref}
      {...others}
      dataSource={dataSource}
      value={[value].filter(Boolean)}
      onChange={(nextValue, detail) => {
        onChange(getLast(nextValue), detail);
      }}
      selectMode="single"
      searchValue={searchValue}
      onSearch={onSearch}
      visible={visible}
      onRequestClose={onRequestClose}
      onRequestOpen={onRequestOpen}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
    />
  );
});
