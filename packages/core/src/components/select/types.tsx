import React from 'react';
import { PopupProps } from '../overlays';

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

export interface SelectItem {
  value: string;
  label?: React.ReactNode;

  // 是否禁用交互
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
   * 选择器状态
   * - status=normal 常规状态
   * - status=error 出错状态
   *
   * @category 外观
   * */
  status?: 'normal' | 'error';

  /**
   * 选择器值为空时，trigger 上的占位文本
   * @category 外观
   * */
  placeholder?: React.ReactNode;

  /**
   * 是否为轻量选择模式
   * @category 外观
   * */
  minimum?: boolean;

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
}

export const selectAppearancePropKeys: (keyof ISelectAppearanceProps)[] = [
  'className',
  'style',
  'containerProps',
  'size',
  'status',
  'placeholder',
  'minimum',
  'hasArrow',
  'hasClear',
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

export interface ISelectPopupProps {
  /**
   * 弹层是否打开
   * @category 弹层 */
  visible: boolean;

  /** @category 弹层 */
  onRequestClose(reason?: any): void;

  /** @category 弹层 */
  onRequestOpen(reason?: any): void;

  /** @category 弹层 */
  autoWidth?: boolean;
  /** @category 弹层 */
  autoHeight?: boolean;

  /**
   * 选择器弹层被打开时，是否自动滚动到第一个选中的元素
   * @category 弹层
   * */
  autoScrollToFirstItemWhenOpen?: boolean;

  /** 选择元素时，是否自动关闭弹层。
   * 单选模式下默认为 true，多选模式下默认为 false
   * @category 弹层
   * */
  autoCloseAfterSelect?: boolean;

  /** @category 弹层 */
  popupProps?: PopupProps;
}
