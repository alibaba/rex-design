import React from 'react';
import { ActionListItem } from '../action-list';

const defaultConfigs: { [key: string]: ActionListItem } = {
  new: { icon: 'add', label: '新增' },
  refresh: { icon: 'refresh', label: '刷新' },
  print: { icon: 'print', label: '打印' },
  import: { icon: 'import', label: '导入' },
  export: { icon: 'download', label: '导出' },
};

export function mergeConfig(userConfig: ActionListItem) {
  const defaultConfig = defaultConfigs[userConfig.key] || {};
  return {
    ...defaultConfig,
    ...userConfig,
    props: {
      ...defaultConfig.props,
      ...userConfig.props,
    },
  };
}
