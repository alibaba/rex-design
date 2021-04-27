import React from 'react';
import { MultiTreeSelect, MultiTreeSelectProps } from './multi-tree-select';
import { SingleTreeSelect, SingleTreeSelectProps } from './single-tree-select';

export interface TreeSelectProps extends Omit<MultiTreeSelectProps, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?(nextValue: string | string[], detail: {}): void;

  multiple?: boolean;
}

export const TreeSelect = React.forwardRef<HTMLDivElement, TreeSelectProps>(({ multiple, ...props }, ref) => {
  if (multiple) {
    return <MultiTreeSelect {...(props as MultiTreeSelectProps)} />;
  } else {
    return <SingleTreeSelect {...(props as SingleTreeSelectProps)} />;
  }
});
