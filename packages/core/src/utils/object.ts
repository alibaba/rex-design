import { Dict } from '../types';

/**
 * Get value from a deeply nested object using a string path
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */
export function get(obj: any, path: string | number, fallback?: any, index?: number) {
  //@ts-ignore
  path = (path?.split?.('.') ?? [path]) as string;
  for (index = 0; index < path.length; index++) {
    obj = obj ? obj[path[index]] : undefined;
  }
  return obj === undefined ? fallback : obj;
}

export function filterUndefined(object: Dict) {
  const result = { ...object };
  for (const key in result) {
    if (result[key] == null) {
      delete result[key];
    }
  }
  return result;
}

export const getPickProps = (...pickers: any[]) => (object: Dict) => {
  const picked = {};
  const omited = {};

  Object.keys(object).forEach((key) => {
    const pass = pickers.some((picker) => picker(key));
    if (pass) {
      picked[key] = object[key];
    } else {
      omited[key] = object[key];
    }
  });

  return [picked, omited];
};

const testStyleProps = (key: string) => ['style', 'className'].includes(key);
const testEventProps = (key: string) => /^on[A-Z][A-Za-z]+$/.test(key);
const testDataProps = (key: string) => /^data-\w+$/.test(key);

export const pickEventProps = getPickProps(testEventProps);
export const pickStyleProps = getPickProps(testStyleProps);
export const pickStyleAndDataProps = getPickProps(testStyleProps, testDataProps);
export const pickStyleAndDataAndEventProps = getPickProps(testStyleProps, testDataProps, testEventProps);

/**
 * 挑选出符合条件的属性，并修改为 data-name 的格式
 * @param object 目标对象
 * @param keys 目标属性集白名单，如没有则会转换所有的 keys
 */
export function toDataProps(object: Dict, keys: string[] = []) {
  const obj = {};

  if (keys.length) {
    // 有白名单的情况
    keys.forEach((key) => {
      if (key in object) {
        obj[`data-${key}`] = object[key];
      }
    });
  } else {
    // 无白名单转换所有的值
    Object.keys(object).forEach((key) => {
      obj[`data-${key}`] = object[key];
    });
  }

  return obj;
}
