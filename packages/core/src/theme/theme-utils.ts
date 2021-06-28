import { mergeWith } from 'lodash-es';
import { getTokenValue } from '../utils';

/** 扩展主题 */
export function extendTheme(baseTheme: any, overrides: any) {
  return mergeWith({}, baseTheme, overrides);
}

/** 获取 token 的具体值 */
export function getThemeValue(tokenPath: string, theme: any) {
  return getTokenValue(tokenPath, theme);
}
