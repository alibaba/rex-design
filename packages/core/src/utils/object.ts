import cx from 'classnames';
import { Dict } from '../types';
import { callAll } from './function';

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

export function mergeProps<T extends Dict[]>(...args: T) {
  const result: Dict = {};

  for (const props of args) {
    for (const key in result) {
      if (/^on[A-Z]/.test(key) && typeof result[key] === 'function' && typeof props[key] === 'function') {
        result[key] = callAll(result[key], props[key]);
      } else if (key === 'className' && typeof result.className === 'string' && typeof props.className === 'string') {
        result[key] = cx(result.className, props.className);
      } else {
        result[key] = props[key] !== undefined ? props[key] : result[key];
      }
    }

    // Add props from b that are not in a
    for (const key in props) {
      if (result[key] === undefined) {
        result[key] = props[key];
      }
    }
  }

  return result;
}
