import React from 'react';
import { PopupProps } from '../overlays';

// ===================== Types ===================== //

export type SingleValue<ValueType> = ValueType | null;
export type MultiValue<ValueType> = readonly ValueType[];

export type PropsValue<ValueType> = MultiValue<ValueType> | SingleValue<ValueType>;

export type OnChangeValue<ValueType, IsMulti extends boolean> = IsMulti extends true
  ? MultiValue<ValueType>
  : SingleValue<ValueType>;

// ===================== Interfaces ===================== //

export interface BaseSelectRef {
  focus: () => void;
  blur: () => void;
  scrollTo: any;
}

export interface TreeSelectItem {
  value: string;
  label?: React.ReactNode;

  // 是否禁用交互
  disabled?: boolean;

  // 是否脱离与父节点的联系
  detached?: boolean;
  children?: TreeSelectItem[];

  // todo 是否需要 hasChild?: boolean;
}

export type CascaderSelectItem = TreeSelectItem;

export interface SelectItem<ValueType> {
  value: ValueType;
  label?: React.ReactNode;

  /** 是否禁用交互 */
  disabled?: boolean;
}

export interface ISelectAppearanceProps {
  /** @category 外观 */
  className?: string;

  /** @category 外观 */
  style?: React.CSSProperties;

  /** @category 外观 */
  containerProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * 选择器尺寸
   * @category 外观
   * */
  size?: string;

  /**
   * 选择器宽度是否占满容器
   * @category 外观
   * */
  fill?: boolean;

  /**
   * 选择器状态
   * @category 外观
   * */
  status?: 'normal' | 'error' | 'warning' | 'success';

  /**
   * 选择器值为空时，trigger 上的占位文本
   * @category 外观
   * */
  placeholder?: string;

  /**
   * 选择器形状
   * @category 外观
   * */
  shape?: 'simple' | 'solid';

  /**
   * 是否有下拉箭头
   * @category 外观
   * */
  hasArrow?: boolean;

  /**
   * 是否有清除按钮
   * @category 外观
   * */
  hasClear?: boolean;

  /**
   * 是否处于加载态
   * @category 外观
   */
  loading?: boolean;
}

export const selectAppearancePropKeys: (keyof ISelectAppearanceProps)[] = [
  'className',
  'style',
  'containerProps',
  'size',
  'fill',
  'status',
  'placeholder',
  'shape',
  'hasArrow',
  'hasClear',
  'loading',
];

export interface ISelectSearchProps {
  /**
   * 是否支持搜索功能
   * @category 搜索
   * */
  showSearch?: boolean;

  /**
   * 搜索关键字
   * @category 搜索
   * */
  searchValue: string;

  /**
   * 非受控用法，默认的搜索关键字
   * @category 搜索
   * */
  defaultSearchValue?: string;

  /**
   * 关键字修改回调
   * @category 搜索
   * */
  onSearch(nextSearchValue: string, detail: { event: any /* todo */ }): void;

  // TODO searchMode local | remote ? filterLocal

  /**
   * 搜索结果为空时的展示内容
   * @category 搜索
   * */
  notFoundContent?: React.ReactNode;
}

export interface ISelectAsyncProps {
  loadDataSource: (searchValue: string) => Promise<any[]>;
}

export interface ISelectPopupProps {
  /**
   * 弹层是否默认打开
   * @category 弹层 */
  defaultVisible?: boolean;

  /**
   * 弹层是否打开
   * @category 弹层 */
  visible: boolean;

  /** @category 弹层 */
  onRequestClose(reason?: any): void;

  /** @category 弹层 */
  onRequestOpen(reason?: any): void;

  /** @category 弹层
   * @default true
   */
  autoWidth?: boolean;

  /** @category 弹层
   * @default true
   */
  autoHeight?: boolean;

  /**
   * 选择器弹层被打开时，是否自动滚动到第一个选中的元素
   * @category 弹层
   * @default true
   * */
  autoScrollToFirstItemWhenOpen?: boolean;

  /** 选择元素时，是否自动关闭弹层。
   * 单选模式下默认为 true，多选模式下默认为 false
   * @category 弹层
   * */
  autoCloseAfterSelect?: boolean;

  /**
   * 透传给 Popup 组件的 props
   * @category 弹层
   * @displayType PopupProps */
  popupProps?: Omit<PopupProps, 'children'>;
}
