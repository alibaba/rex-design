import React from 'react';
import { MultiTreeSelect, MultiTreeSelectProps } from './multi-tree-select';
import { SingleTreeSelect, SingleTreeSelectProps } from './single-tree-select';

export interface TreeSelectProps extends Omit<MultiTreeSelectProps, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?(nextValue: string | string[], detail: {}): void;

  multiple?: boolean;
}

type TreeSelectType = React.ExoticComponent<TreeSelectProps & React.RefAttributes<HTMLDivElement>> & {
  Single: typeof SingleTreeSelect;
  Multi: typeof MultiTreeSelect;
};

// @ts-ignore
export const TreeSelect: TreeSelectType = React.forwardRef<HTMLDivElement, TreeSelectProps>(
  ({ multiple, ...props }, ref) => {
    if (multiple) {
      return <MultiTreeSelect ref={ref} {...(props as MultiTreeSelectProps)} />;
    } else {
      return <SingleTreeSelect ref={ref} {...(props as SingleTreeSelectProps)} />;
    }
  },
);

TreeSelect.Single = SingleTreeSelect;
TreeSelect.Multi = MultiTreeSelect;
