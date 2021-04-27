import { TreeItem } from '@rexd/core';
import { makeRecursiveMapper } from 'ali-react-table';
import { useEffect, useState } from 'react';
import { defer } from 'rxjs';
import * as op from 'rxjs/operators';

export interface CateTreeItem {
  children: CateTreeItem[];
  code: string;
  freezeCat: boolean;
  id: number;
  isAutoSpu: string;
  key: string;
  leaf: boolean;
  level: number;
  name: string;
  sellerUnusedCategory: boolean;
  service: boolean;
}

// TODO 需要将链接背后的数据 脱敏后上传一份到 basement 上
const cateTree$ = defer(() =>
  fetch('/{you-api-host}/QueryMerchantCategoryTree.json', {
    credentials: 'include',
  }),
).pipe(
  op.switchMap((res) => res.json()),
  op.map((result) => result.result[0].children as CateTreeItem[]),
  op.map((cateTree) => {
    const mapper = makeRecursiveMapper<any>((cateItem: CateTreeItem) => {
      const treeItem: TreeItem = {
        key: cateItem.key,
        label: cateItem.name,
        children: cateItem.children,
      };
      return treeItem;
    });
    const result: TreeItem[] = mapper(cateTree);
    return result;
  }),
  op.shareReplay(1),
);

export function useCateTree() {
  const [dataSource, setDataSource] = useState<TreeItem[]>([]);

  useEffect(() => {
    cateTree$.subscribe(setDataSource);
  }, []);

  return dataSource;
}
