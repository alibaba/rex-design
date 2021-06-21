import React, { useState } from 'react';
import { composeHandlers, composeState } from '../../utils';
import { SelectView } from './select-view';
import { ISelectAppearanceProps, ISelectPopupProps, ISelectSearchProps, SelectItem } from './types';

export interface MultiSelectProps
  extends ISelectAppearanceProps,
    Partial<ISelectSearchProps>,
    Partial<ISelectPopupProps> {
  defaultValue?: string[];
  value?: string[];
  onChange?(nextValue: string[], detail: { event: React.MouseEvent<HTMLDivElement> }): void;

  /** 是否禁用 */
  disabled?: boolean;

  /**
   * 数据源
   *
   * @displayType Array<string | { label, value }>
   * */
  dataSource?: (string | SelectItem)[];
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>((props, ref) => {
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
    ...others
  } = props;

  const [_value, _onChange] = useState(defaultValue ?? []);
  const value = composeState(valueProp, _value);
  const onChange = composeHandlers(onChangeProp, _onChange);

  const [_visible, _onVisibleChange] = useState(defaultVisible);
  const visible = composeState(visibleProp, _visible);
  const onRequestOpen = composeHandlers(onRequestOpenProp, () => _onVisibleChange(true));
  const onRequestClose = composeHandlers(onRequestCloseProp, () => _onVisibleChange(false));

  const [_searchValue, _onSearch] = useState(defaultSearchValue ?? '');
  const searchValue = composeState(searchValueProp, _searchValue);
  const onSearch = composeHandlers(onSearchProp, _onSearch);

  const dataSource = dataSourceProp.map((item) => (typeof item === 'string' ? { value: item, label: item } : item));

  return (
    <SelectView
      ref={ref}
      {...others}
      selectMode="multiple"
      value={value}
      onChange={onChange}
      dataSource={dataSource}
      searchValue={searchValue}
      onSearch={onSearch}
      visible={visible}
      onRequestOpen={onRequestOpen}
      onRequestClose={onRequestClose}
    />
  );
});
