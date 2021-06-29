import { ResponsiveType } from '../types';
import { isArray, isObject } from './assertion';

const responsiveMap = {
  s: 0,
  m: 1,
  l: 2,
};

/**
 * 从响应式对象中获取匹配的值
 * @param value
 * @param key
 */
export function getResponsive(value: ResponsiveType, key: string) {
  // { s, m, l }
  if (isObject(value)) {
    return value[key];
  }

  // [s, m, l]
  if (isArray(value)) {
    const pos = responsiveMap[key];
    return value[pos];
  }

  return value;
}
