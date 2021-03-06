import { AbstractTreeNode, isLeafNode } from 'ali-react-table';
import React from 'react';
import { SelectItem } from '../types';

// todo 先暂时移除
// export const rexLightScrollbarStyleMixin = css`
//   ::-webkit-scrollbar {
//     width: 10px;
//     height: 10px;
//   }
//
//   ::-webkit-scrollbar-thumb {
//     background: #ccc;
//     border: 1px solid #eaeaea;
//
//     &:hover {
//       background: #6e6e6e;
//     }
//   }
//
//   ::-webkit-scrollbar-track {
//     background: #eaeaea;
//   }
// `;

export function toggleValue(value: string[], targetValue: string) {
  return value.includes(targetValue) ? value.filter((v) => v !== targetValue) : [...value, targetValue];
}

export function filterDataSourceBySearchValue(trimmedSearchValue: string, dataSource: SelectItem[]) {
  const lowerCaseTrimmed = trimmedSearchValue.toLowerCase();
  if (!lowerCaseTrimmed) {
    return dataSource;
  }

  return dataSource.filter(
    (row) =>
      row.value.toLowerCase().includes(lowerCaseTrimmed) ||
      (typeof row.label === 'string' && row.label.toLowerCase().includes(lowerCaseTrimmed)),
  );
}

export const DefaultNotFoundContent = React.memo(() => (
  <div style={{ color: '#999', lineHeight: '32px', padding: 8 }}>无选项</div>
));

export function getLast(value: string[]) {
  return value.length === 0 ? null : value[value.length - 1];
}

export const arrayUtils = {
  diff(arr1: string[], arr2: Iterable<string>) {
    const set = new Set(arr2);
    return arr1.filter((x) => !set.has(x));
  },
  merge(arr1: string[], arr2: string[]) {
    const set = new Set(arr1);
    return arr1.concat(arr2.filter((x) => !set.has(x)));
  },
} as const;

/** 对树进行过滤，只保留深度小于等于 maxDepth 的部分 */
export function filterTreeByMaxDepth<N extends AbstractTreeNode>(input: N[], maxDepth: number) {
  return dfs(input, 0);

  function dfs(nodes: N[], depth: number): N[] {
    const result: N[] = [];
    for (const node of nodes) {
      result.push({
        ...node,
        children: isLeafNode(node) || depth === maxDepth ? null : dfs(node.children as N[], depth + 1),
      });
    }

    return result;
  }
}
