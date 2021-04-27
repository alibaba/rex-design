import { FunctionArguments, AnyFunction } from '../types';
import _ from 'lodash';
import { isFunction } from './assertion';

export function runIfFn<T, U>(valueOrFn: T | ((...args: U[]) => T), ...args: U[]): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

export function callAllHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(arg: FunctionArguments<T>[0]) {
    fns.forEach((fn) => {
      fn?.(arg);
    });
  };
}

export function noop(...args: any[]) {}

// export function once(fn?: Function | null) {
//   let result: any;

//   return function func(this: any, ...args: any[]) {
//     if (fn) {
//       result = fn.apply(this, args);
//       fn = null;
//     }

//     return result;
//   };
// }

interface MessageOptions {
  condition: boolean;
  message: string;
}

export const warn = (options: MessageOptions) => {
  const { condition, message } = options;
  if (condition) {
    console.warn(message);
  }
};

export const error = (options: MessageOptions) => {
  const { condition, message } = options;
  if (condition) {
    console.error(message);
  }
};

// typesafe _.pick
export function pick<T extends object, U extends keyof T>(object: T, props: U[]): Pick<T, U> {
  return _.pick(object, props);
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 *
 * 这个函数是从 facebook 某个官方库中复制过来的
 */
export function shallowEqual<T>(objA: T, objB: T): boolean {
  const hasOwnProperty = Object.prototype.hasOwnProperty;

  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
