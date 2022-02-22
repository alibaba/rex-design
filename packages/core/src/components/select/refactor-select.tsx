import React, { ForwardedRef, ReactElement, useState } from 'react';
import { composeHandlers, composeState } from '../../utils';
import { SelectView } from './select-view';
import {
  ISelectAppearanceProps,
  ISelectAsyncProps,
  ISelectPopupProps,
  ISelectSearchProps,
  MultiValue,
  OnChangeValue,
  PropsValue,
  SelectItem,
} from './types';
import { getLast } from './utils/select-utils';

export interface SelectProps<ValueType, IsMulti extends boolean>
  extends ISelectAppearanceProps,
    Partial<ISelectSearchProps>,
    Partial<ISelectPopupProps>,
    Partial<ISelectAsyncProps> {
  multiple?: IsMulti;
  defaultValue?: PropsValue<ValueType>;
  value?: PropsValue<ValueType>;
  disabled?: boolean;
  dataSource?: SelectItem<ValueType>[];

  onChange?(nextValue: OnChangeValue<ValueType, IsMulti>, detail: { event: React.MouseEvent }): void;
}

type RefactoredSelect = <ValueType = unknown, IsMulti extends boolean = false>(
  props: SelectProps<ValueType, IsMulti> & {
    ref?: ForwardedRef<HTMLDivElement>;
  },
) => ReactElement;

export const RefactoredSelect = React.forwardRef(
  <ValueType, IsMulti extends boolean>(props: SelectProps<ValueType, IsMulti>, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      dataSource: dataSourceProp,
      value: valueProp,
      onChange: onChangeProp,
      defaultValue,
      visible: visibleProp,
      defaultVisible,
      onRequestOpen: onRequestOpenProp,
      onRequestClose: onRequestCloseProp,
      defaultSearchValue,
      searchValue: searchValueProp,
      onSearch: onSearchProp,
      multiple,
      ...others
    } = props;

    const [_value, _onChange] = useState(defaultValue);
    const composedValue = composeState(valueProp, _value);
    const value = (multiple ? composedValue ?? [] : [composedValue].filter(Boolean)) as MultiValue<ValueType>;

    const onChange = composeHandlers(onChangeProp, _onChange);

    const [_visible, _onVisibleChange] = useState(defaultVisible);
    const visible = composeState(visibleProp, _visible);
    const onRequestOpen = composeHandlers(onRequestOpenProp, () => _onVisibleChange(true));
    const onRequestClose = composeHandlers(onRequestCloseProp, () => _onVisibleChange(false));

    const [_searchValue, _onSearch] = useState(defaultSearchValue ?? '');
    const searchValue = composeState(searchValueProp, _searchValue);
    const onSearch = composeHandlers(onSearchProp, _onSearch);

    // RFC: 是否需要支持快捷写法?
    const dataSource = dataSourceProp.map((item) => (typeof item === 'string' ? { value: item, label: item } : item));

    return (
      <SelectView
        ref={ref}
        {...others}
        multiple={multiple}
        value={value}
        onChange={(nextValue, detail) => {
          if (multiple) {
            onChange(nextValue as any, detail);
          } else {
            onChange(getLast(nextValue) as any, detail);
          }
        }}
        dataSource={dataSource}
        searchValue={searchValue}
        onSearch={onSearch}
        visible={visible}
        onRequestOpen={onRequestOpen}
        onRequestClose={onRequestClose}
      />
    );
  },
) as RefactoredSelect;
