import { flatMap } from 'lodash-es';
import React from 'react';
import * as ReactIs from 'react-is';
import { Column } from './base-table';
import { ProTable } from './pro-table';

function getDisplayName(Component: any) {
  return Component.displayName || Component.name || 'Component';
}

/**
 * 从 JSX 中解析出 columns 数组。
 * 该方法主要是方便从老代码迁移，一般情况下推荐用户使用标准的 columns 数组写法来生成表格列。
 *
 * parseColumns 注意点：
 * - 使用 React.Fragment 来包括所有的 `<Column>`;
 * - column.dataIndex 是 column.code 的别名，在 ProTable 中推荐用 code 来代替 dataIndex;
 * - 解析过程中 div, h1 等 html 标签将被忽略
 * - 无效的组件将生成一个红色的警告列
 * */
export function parseColumns(jsx: any): Column[] {
  function processChildren(children: any): any {
    return flatMap(React.Children.toArray(children), dfs).filter(Boolean);
  }

  return dfs(jsx);

  function dfs(element: any) {
    if (typeof element === 'string' || typeof element === 'number') {
      return null;
    } else if (ReactIs.isFragment(element) || typeof element.type === 'string') {
      return processChildren(element.props.children);
    } else {
      const { type, props } = element;

      if (type === ProTable.Column) {
        return props;
      } else if (type === ProTable.ColumnGroup) {
        return {
          ...props,
          children: processChildren(props.children),
        };
      } else {
        // 对于其他无法识别 type 的 element，用一个列分组标题进行提示
        return {
          width: 160,
          ...props,
          title: (
            <span
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: 'red',
                fontWeight: 500,
              }}
              title={getDisplayName(type)}
            >
              Unknown jsx tag: <br /> {getDisplayName(type)}
            </span>
          ),
          children: processChildren(props.children),
        };
      }
    }
  }
}
