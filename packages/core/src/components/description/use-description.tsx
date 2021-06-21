import { useMemo } from 'react';
import { useConfig } from '../../providers';
import { DescriptionItemType } from './types';

export interface UseDescriptionProps {
  /**
   * 数据列表
   */
  items?: DescriptionItemType[];
  /**
   * 列数
   */
  columns?: number;
  /**
   * 标签的宽度
   */
  labelWidth?: string;
}

export function useDescription(props: UseDescriptionProps) {
  const { items = [], columns, ...rest } = useConfig<UseDescriptionProps>('Description', props);
  const rows = useMemo(() => {
    const rows: DescriptionItemType[][] = [];
    let cols: DescriptionItemType[];
    let leftSpans: number;

    items.forEach((item, index) => {
      if (!cols) {
        leftSpans = columns;
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
  }, [items, columns]);

  return {
    ...rest,
    rows,
    cellWidth: 100 / (columns || 1),
  };
}
