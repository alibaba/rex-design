import { isArray, isObject } from './assertion';
import { Dict, ResponsiveType } from '../types';

export function mapResponsive(prop: any, mapper: (val: any) => any) {
  if (isArray(prop)) {
    return prop.map((item) => {
      if (item === null) {
        return null;
      }
      return mapper(item);
    });
  }

  if (isObject(prop)) {
    return Object.keys(prop).reduce((result: Dict, key) => {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }

  if (prop !== null) {
    return mapper(prop);
  }

  return null;
}

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
