import React from 'react';
import { css } from 'styled-components';
import { SelectItem } from './types';

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
