import { SelectItem } from '../types';
import { devWarning } from '../../../utils/log';

/**
 * inspired by react-select
 */

export interface FilterOptionOption<Option> {
  readonly label: string;
  readonly value: string;
  readonly data: Option;
}

/**
 * build-in option filter, has:
 *
 * 1. trim searchValue and option.label
 * 2. ignore case
 * 3. match if:
 *    - option.label includes `searchValue`
 *    - option.value includes `searchValue`
 */
export function buildInFilter<ValueType>(searchValue: string, option: SelectItem<ValueType>) {
  const lowerCaseTrimmed = searchValue.trim().toLowerCase();

  if (lowerCaseTrimmed == null) {
    return true;
  }

  if (typeof option.value === 'string') {
    return (
      option.value.toLowerCase().includes(lowerCaseTrimmed) ||
      (typeof option.label === 'string' && option.label.toLowerCase().includes(lowerCaseTrimmed))
    );
  }

  devWarning('如果选项 value 的类型不是 string, 请传入自定义搜索函数');
}
