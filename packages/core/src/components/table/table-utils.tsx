import { features, makeRecursiveMapper, SortItem as StandardSortItem, SortOrder } from 'ali-react-table';
import React from 'react';
import { Column } from './base-table';

function warnFactory(fn: Function) {
  let warned = false;

  return function () {
    if (warned) {
      return;
    }
    warned = true;
    fn();
  };
}

const warnColumnDataIndexIsDeprecated = warnFactory(() => {
  console.warn('[@rexd/core] 用 `dataIndex` 来指定列的数据字段已经过时，请使用 `code` 进行代替');
});

export const compatWithDataIndex = makeRecursiveMapper<Column & { dataIndex?: string }>((col) => {
  if (col.code == null && col.dataIndex != null) {
    warnColumnDataIndexIsDeprecated();
    return { ...col, code: col.dataIndex };
  }
  return col;
});

const warnColumnCellIsDeprecated = warnFactory(() => {
  console.warn(
    '[@rexd/core] 用 `cell` 来自定义列的渲染方法已经过时，请使用 `render` 进行代替。注意两者的参数顺序有所不同，详见相关文档',
  );
});

export const compatWithColumnCell = makeRecursiveMapper<Column & { cell?: any }>((col) => {
  if (col.render == null && col.cell != null) {
    warnColumnCellIsDeprecated();
    const cell = col.cell;
    col = {
      ...col,
      render(value, row, index) {
        return cell(value, index, row);
      },
    };
  }
  return col;
});

type CompatibleSortItem = {
  code?: string;
  dataIndex?: string;
  order: SortOrder;
};

export type SortCompatibleWithDataIndexFeatureOptions = Omit<features.SortFeatureOptions, 'sorts' | 'defaultSorts'> & {
  sorts?: CompatibleSortItem[];
  defaultSorts?: CompatibleSortItem[];
  onChangeSorts?(nextSorts: CompatibleSortItem[]): void;
};

const warnSortDataIndexIsDeprecated = warnFactory(() => {
  console.warn('[@rexd/core] 用 `dataIndex` 来指定表格排序字段已经过时，请使用 `code` 进行代替');
});

export function sortCompatibleWithDataIndex(opts: SortCompatibleWithDataIndexFeatureOptions = {}) {
  // 兼容 code/dataIndex
  let defaultSorts = opts.defaultSorts;
  if (defaultSorts) {
    defaultSorts = defaultSorts.map((item) => {
      if (item.code == null && item.dataIndex != null) {
        warnSortDataIndexIsDeprecated();
        return { code: item.dataIndex, ...item };
      }

      return item;
    });
  }

  let sorts = opts.sorts;
  if (sorts) {
    sorts = sorts.map((item) => ({ code: item.code ?? item.dataIndex, ...item }));
  }

  let onChangeSorts = opts.onChangeSorts;
  if (onChangeSorts) {
    onChangeSorts = (nextSorts: StandardSortItem[]) => {
      opts.onChangeSorts(nextSorts.map((item) => ({ dataIndex: item.code, ...item })));
    };
  }

  return features.sort({
    ...opts,
    defaultSorts: defaultSorts as StandardSortItem[],
    sorts: sorts as StandardSortItem[],
    onChangeSorts,
  });
}
