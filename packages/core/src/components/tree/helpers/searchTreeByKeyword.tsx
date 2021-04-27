import { isLeafNode } from 'ali-react-table';
import React from 'react';
import { TreeItem } from '../tree-view';

interface MatchResult {
  matched: boolean;
  startIndex: number;
  endIndex: number;
  input: string;
}

function match(item: TreeItem, keyword: string): MatchResult {
  if (typeof item.label === 'string') {
    const str = item.label.toLowerCase();
    const needle = keyword.toLocaleLowerCase();
    const index = str.indexOf(needle);

    return {
      matched: index > -1,
      startIndex: index,
      endIndex: index + needle.length,
      input: item.label,
    };
  }
  return { matched: false, startIndex: 0, endIndex: 0, input: (item.label as unknown) as string };
}

function decorate(matchResult: MatchResult) {
  const { input, startIndex, endIndex, matched } = matchResult;

  if (!matched) {
    return input;
  }

  return (
    <span>
      {input.slice(0, startIndex)}
      <span style={{ margin: 1, fontWeight: 'bold', color: '#333', background: '#fff8bd' }}>
        {input.slice(startIndex, endIndex)}
      </span>
      {input.slice(endIndex)}
    </span>
  );
}

const dfsResultOfLeafNode: DfsResult = {
  anyItemMatched: false,
  anyDescendentMatched: false,
  list: [],
};

interface DfsResult {
  list: TreeItem[];
  anyItemMatched: boolean;
  anyDescendentMatched: boolean;
}

/**
 * 根据关键字 `keyword` 在树中进行搜索，返回结果为一个对象，表示本次搜索的结果。
 *
 * * `skipped` 搜索是否被跳过了（keyword 为空时搜索将被跳过）
 * * `filteredDataSource` 过滤之后的数据源
 * * `preferredExpandedKeys` 根据关键字计算得到的理想的 expandedKeys
 *
 * */
export function searchTreeByKeyword(
  untrimmedKeyword: string,
  dataSource: TreeItem[],
): {
  skipped: boolean;
  filteredDataSource: TreeItem[];
  preferredExpandedKeys: string[];
} {
  const keyword = untrimmedKeyword.trim();
  if (keyword === '') {
    return {
      filteredDataSource: dataSource,
      preferredExpandedKeys: [],
      skipped: true,
    };
  }

  const ctx = {
    expandedKeys: new Set<string>(),
  };
  const dfsResult = dfs(ctx, dataSource, false);

  return {
    skipped: false,
    filteredDataSource: dfsResult.list,
    preferredExpandedKeys: Array.from(ctx.expandedKeys),
  };

  function dfs(ctx: { expandedKeys: Set<string> }, items: TreeItem[], anyAncestorMatched: boolean): DfsResult {
    let anyDescendentMatched = false;
    let anyItemMatched = false;
    const result: TreeItem[] = [];

    for (const item of items) {
      const selfMatchResult = match(item, keyword);

      const subDfsResult: DfsResult = isLeafNode(item)
        ? dfsResultOfLeafNode
        : dfs(ctx, item.children, selfMatchResult.matched || anyAncestorMatched);

      const needIncludeInResult = anyAncestorMatched || selfMatchResult.matched || subDfsResult.anyDescendentMatched;

      if (needIncludeInResult) {
        result.push({
          ...item,
          label: decorate(selfMatchResult),
          children: subDfsResult.list,
        });
      }

      if (subDfsResult.anyDescendentMatched) {
        ctx.expandedKeys.add(item.key);
      }

      anyItemMatched ||= selfMatchResult.matched;
      anyDescendentMatched ||= selfMatchResult.matched || subDfsResult.anyDescendentMatched;
    }

    return { list: result, anyItemMatched, anyDescendentMatched };
  }
}
