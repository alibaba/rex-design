import React from 'react';

export interface DescriptionItemType {
  /**
   * 标签
   */
  label?: React.ReactNode;
  /**
   * 内容
   */
  content?: React.ReactNode;
  /**
   * 自定义内容渲染
   */
  renderContent?: (props: DescriptionItemType) => React.ReactNode;
  /**
   * 占据列数
   */
  span?: number;
}
