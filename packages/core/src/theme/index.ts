import { mergeWith } from 'lodash';
import { getTokenValue } from '../utils';
import common from './common';
import components from './components';

const defaultTheme = {
  ...common,
  components,
};

export default defaultTheme;

/**
 * 扩展主题
 * @param overrides
 * @param baseTheme
 */
export function extendTheme(overrides: any, baseTheme = defaultTheme) {
  return mergeWith({}, baseTheme, overrides);
}

/**
 * 获取 token 的具体值
 */
export function getThemeValue(tokenPath: string, theme = defaultTheme) {
  return getTokenValue(tokenPath, theme);
}
