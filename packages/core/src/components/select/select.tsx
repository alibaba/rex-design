import React from 'react';
import { MultiSelect, MultiSelectProps } from './multi-select';
import { SingleSelect, SingleSelectProps } from './single-select';

export interface SelectProps extends Omit<MultiSelectProps, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?(nextValue: string | string[], detail: {}): void;

  /** 是否多选 */
  multiple?: boolean;
}

type SelectType = React.ExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>> & {
  Single: typeof SingleSelect;
  Multi: typeof MultiSelect;
};

// @ts-ignore
export const Select: SelectType = React.forwardRef<HTMLDivElement, SelectProps>(({ multiple, ...props }, ref) => {
  if (multiple) {
    return <MultiSelect ref={ref} {...(props as MultiSelectProps)} />;
  } else {
    return <SingleSelect ref={ref} {...(props as SingleSelectProps)} />;
  }
});

Select.Single = SingleSelect;
Select.Multi = MultiSelect;
