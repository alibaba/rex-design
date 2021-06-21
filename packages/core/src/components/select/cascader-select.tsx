import React, { useState } from 'react';
import { composeHandlers, composeState } from '../../utils';
import { ICascaderExpansionProps } from './cascader';
import { CascaderSelectView } from './cascader-select-view';
import { CascaderSelectItem, ISelectAppearanceProps, ISelectPopupProps, ISelectSearchProps } from './types';
import { getLast } from './utils/select-utils';

export interface SingleCascaderSelectProps
  extends Partial<ISelectPopupProps>,
    ISelectAppearanceProps,
    Partial<ISelectSearchProps>,
    ICascaderExpansionProps {
  defaultValue?: string;
  value?: string;
  onChange?(nextValue: string, detail: {}): void;

  disabled?: boolean;
  // TODO readOnly?: boolean;
  dataSource?: CascaderSelectItem[];
  maxDepth?: number;
}

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
    defaultExpandedKeys,

    defaultSearchValue,
    searchValue: searchValueProp,
    onSearch: onSearchProp,
    dataSource,

    ...others
  } = props;

  const [_value, _onChange] = useState(composeState(defaultValue, null));
  const value = composeState(valueProp, _value);
  const onChange = composeHandlers(onChangeProp, _onChange);

  const [_visible, _onVisibleChange] = useState(defaultVisible);
  const visible = composeState(visibleProp, _visible);
  const onRequestOpen = composeHandlers(onRequestOpenProp, () => _onVisibleChange(true));
  const onRequestClose = composeHandlers(onRequestCloseProp, () => _onVisibleChange(false));

  const [_searchValue, _onSearch] = useState(composeState(defaultSearchValue, ''));
  const searchValue = composeState(searchValueProp, _searchValue);
  const onSearch = composeHandlers(onSearchProp, _onSearch);

  const [_expandedKeys, _onExpand] = useState<string[]>(composeState(defaultExpandedKeys, []));
  const expandedKeys = composeState(expandedKeysProp, _expandedKeys);
  const onExpand = composeHandlers(onExpandProp, _onExpand);

  return (
    <CascaderSelectView
      ref={ref}
      {...others}
      selectMode="single"
      dataSource={dataSource}
      value={[value]}
      onChange={(nextValue, detail) => onChange(getLast(nextValue), detail)}
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

export interface MultiCascaderSelectProps
  extends Partial<ISelectPopupProps>,
    ISelectAppearanceProps,
    Partial<ISelectSearchProps>,
    ICascaderExpansionProps {
  defaultValue?: string[];
  value?: string[];
  onChange?(nextValue: string[], detail: {}): void;

  disabled?: boolean;
  // TODO readOnly?: boolean;
  dataSource?: CascaderSelectItem[];
  maxDepth?: number;
}

export const MultiCascaderSelect = React.forwardRef<HTMLDivElement, MultiCascaderSelectProps>((props, ref) => {
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
    defaultExpandedKeys,

    defaultSearchValue,
    searchValue: searchValueProp,
    onSearch: onSearchProp,
    dataSource,

    ...others
  } = props;

  const [_value, _onChange] = useState(composeState(defaultValue, []));
  const value = composeState(valueProp, _value);
  const onChange = composeHandlers(onChangeProp, _onChange);

  const [_visible, _onVisibleChange] = useState(defaultVisible);
  const visible = composeState(visibleProp, _visible);
  const onRequestOpen = composeHandlers(onRequestOpenProp, () => _onVisibleChange(true));
  const onRequestClose = composeHandlers(onRequestCloseProp, () => _onVisibleChange(false));

  const [_searchValue, _onSearch] = useState(composeState(defaultSearchValue, ''));
  const searchValue = composeState(searchValueProp, _searchValue);
  const onSearch = composeHandlers(onSearchProp, _onSearch);

  const [_expandedKeys, _onExpand] = useState<string[]>(composeState(defaultExpandedKeys, []));
  const expandedKeys = composeState(expandedKeysProp, _expandedKeys);
  const onExpand = composeHandlers(onExpandProp, _onExpand);

  return (
    <CascaderSelectView
      ref={ref}
      {...others}
      dataSource={dataSource}
      value={value}
      onChange={onChange}
      selectMode="multiple"
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

export interface CascaderSelectProps extends Omit<SingleCascaderSelectProps, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?(nextValue: string | string[], detail: {}): void;

  /** 是否多选 */
  multiple?: boolean;
}

type CascaderSelectType = React.ExoticComponent<CascaderSelectProps & React.RefAttributes<HTMLDivElement>> & {
  Single: typeof SingleCascaderSelect;
  Multi: typeof MultiCascaderSelect;
};

// @ts-ignore
export const CascaderSelect: CascaderSelectType = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ multiple, ...props }, ref) => {
    if (multiple) {
      return <MultiCascaderSelect ref={ref} {...(props as MultiCascaderSelectProps)} />;
    } else {
      return <SingleCascaderSelect ref={ref} {...(props as SingleCascaderSelectProps)} />;
    }
  },
);

CascaderSelect.Single = SingleCascaderSelect;
CascaderSelect.Multi = MultiCascaderSelect;
