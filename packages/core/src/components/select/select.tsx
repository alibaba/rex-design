import React, { ForwardedRef, ReactElement, useState } from 'react';
import { composeHandlers, composeState } from '../../utils';
import { SelectView } from './select-view';
import type {
  ISelectAppearanceProps,
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
    Partial<ISelectSearchProps<ValueType>>,
    Partial<ISelectPopupProps> {
  multiple?: IsMulti;
  defaultValue?: PropsValue<ValueType>;
  value?: PropsValue<ValueType>;
  disabled?: boolean;
  dataSource?: SelectItem<ValueType>[];
  onChange?(nextValue: OnChangeValue<ValueType, IsMulti>, detail: { event: React.MouseEvent }): void;
}

type SelectType = <ValueType = unknown, IsMulti extends boolean = false>(
  props: SelectProps<ValueType, IsMulti> & {
    ref?: ForwardedRef<HTMLDivElement>;
  },
) => ReactElement;

export const Select: SelectType = React.forwardRef(
  <ValueType, IsMulti extends boolean>(props: SelectProps<ValueType, IsMulti>, ref: ForwardedRef<HTMLDivElement>) => {
    const {
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
      filterOption,
      multiple,
      dataSource,
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
        filterOption={filterOption}
        visible={visible}
        onRequestOpen={onRequestOpen}
        onRequestClose={onRequestClose}
      />
    );
  },
);
