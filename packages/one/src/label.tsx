import React from 'react';
import { filterProps } from './utils';

export interface LabelProps {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  return <label {...filterProps(props)} ref={ref} />;
});
