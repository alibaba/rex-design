import { mergeWith } from 'lodash';

const defaultConfig = {
  Description: {
    column: 3,
  },
  Form: {
    labelPosition: 'left',
  },
  SearchForm: {
    columns: 3,
    displayCount: 6,
  },
  DatePicker: {},
  Timeline: {
    align: 'double',
  },
};

export default defaultConfig;

/**
 * 扩展配置
 * @param overrides
 * @param baseConfig
 * @returns
 */
export function extendConfig(overrides: any, baseConfig = defaultConfig) {
  return mergeWith({}, baseConfig, overrides);
}
