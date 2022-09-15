import { PickerValue, PickerValueDetail, PickerViewProps } from './picker-view';
import { withCache } from './with-cache';
import { useMemo } from 'react';

export function generateColumnsDetail(rawColumns: PickerViewProps['columns'], value: PickerValue[]) {
  const getColumn = withCache(() => {
    return rawColumns.map((column) =>
      column.map((item) =>
        typeof item === 'string'
          ? {
              label: item,
              value: item,
            }
          : item,
      ),
    );
  });

  const getItems = withCache(() => {
    return value.map((curr, index) => {
      const column = getColumn()[index];
      if (!column) return null;
      return column.find((item) => item.value === curr) ?? null;
    });
  });

  const extend: PickerValueDetail = {
    get columns() {
      return getColumn();
    },
    get items() {
      return getItems();
    },
  };

  return extend;
}

export function useColumnsDetail(rawColumns: PickerViewProps['columns'], value: PickerValue[]) {
  return useMemo(() => generateColumnsDetail(rawColumns, value), [rawColumns, value]);
}
