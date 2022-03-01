import React, { ForwardedRef, forwardRef } from 'react';
import { Select } from './select';
import { AsyncSelectProps, useSelectAsync } from './hooks/useAsync';

type AsyncSelectType = <ValueType = unknown, IsMulti extends boolean = false>(
  props: AsyncSelectProps<ValueType, IsMulti> & {
    ref?: ForwardedRef<HTMLDivElement>;
  },
) => React.ReactElement;

export const AsyncSelect: AsyncSelectType = forwardRef(
  <ValueType, IsMulti extends boolean>(
    props: AsyncSelectProps<ValueType, IsMulti>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const selectProps = useSelectAsync(props);

    return <Select ref={ref} {...selectProps} />;
  },
);

export { AsyncSelectProps, useSelectAsync };
