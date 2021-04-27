import { useMemo } from 'react';
import { useConfig } from '../../providers';
import { DescriptionItemType } from './types';

export interface UseDescriptionProps {
  items?: DescriptionItemType[];
  column?: number;
  labelWidth?: string;
}

export function useDescription(props: UseDescriptionProps) {
  const { items = [], column, ...rest } = useConfig<UseDescriptionProps>('Description', props);
  const rows = useMemo(() => {
    const rows: DescriptionItemType[][] = [];
    let cols: DescriptionItemType[];
    let leftSpans: number;

    items.forEach((item, index) => {
      if (!cols) {
        leftSpans = column;
        cols = [];
        rows.push(cols);
      }

      const isLast = index === items.length - 1;
      if (isLast) {
        item.span = leftSpans;
      }

      cols.push(item);
      leftSpans -= item.span || 1;

      if (leftSpans <= 0) {
        cols = null;
      }
    });

    return rows;
  }, [items, column]);

  return {
    ...rest,
    rows,
    cellWidth: 100 / (column || 1),
  };
}
