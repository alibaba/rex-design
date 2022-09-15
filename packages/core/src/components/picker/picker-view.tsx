import React, { memo, useCallback } from 'react';
import { mergeProps } from '../../utils/prop-utils';
import { useControllableState } from '../../hooks';
import { useColumnsDetail } from './columns-extend';
import { ScrollWheel } from './scroll-wheel';
import { classPrefix, PickerViewContainer, PickerViewMask } from './styled';
import { Box } from '../layout/index';

export type PickerValue = string | null;

export type PickerColumnItem = {
  label: React.ReactNode;
  value: string;
  key?: string | number;
};

export type PickerValueDetail = {
  columns: PickerColumnItem[][];
  items: (PickerColumnItem | null)[];
};

export type PickerColumn = (string | PickerColumnItem)[];

export interface PickerViewProps {
  value?: PickerValue[];
  onChange?: (value: PickerValue[], detail: any) => void;
  defaultValue?: PickerValue[];
  columns?: PickerColumn[];
  renderLabel?: (item: PickerColumnItem) => React.ReactNode;
  mouseWheel?: boolean;
}

const defaultProps: PickerViewProps = {
  defaultValue: [],
  renderLabel: (item) => item.label,
  mouseWheel: false,
};

export const PickerView = memo<PickerViewProps>((_props) => {
  const props = mergeProps(defaultProps, _props);
  const [value, setValue] = useControllableState({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange as any,
  });

  const result = useColumnsDetail(props.columns, value);

  const handleSelect = useCallback((val: PickerValue, index: number) => {
    setValue((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  }, []);

  return (
    <PickerViewContainer>
      {result.columns.map((column, index) => (
        <ScrollWheel
          key={index}
          index={index}
          column={column}
          value={value[index]}
          onSelect={handleSelect}
          renderLabel={props.renderLabel}
          mouseWheel={props.mouseWheel}
        />
      ))}
      <PickerViewMask>
        <Box className={`${classPrefix}-mask-top`} />
        <Box className={`${classPrefix}-mask-middle`} />
        <Box className={`${classPrefix}-mask-bottom`} />
      </PickerViewMask>
    </PickerViewContainer>
  );
});
