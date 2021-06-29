import * as React from 'react';
import { useRef } from 'react';
import { isFunction } from './assertion';
import { shallowEqual } from './function';

export interface CreateContextOptions {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean;
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string;
  /**
   * The display name of the context
   */
  name?: string;
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
export function createContext<ContextType>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
    name,
  } = options;

  const Context = React.createContext<ContextType>(undefined);

  Context.displayName = name;

  function useContext() {
    const context = React.useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<ContextType>;
}

type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>;

/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */
export function assignRef<T = any>(ref: ReactRef<T>, value: T) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
    return;
  }

  try {
    (ref as React.MutableRefObject<T>).current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
export function mergeRefs<T>(...refs: ReactRef<T>[]): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => assignRef(ref, value));
  };
}

/**
 * 返回一个带缓存的 mergeRefs 函数
 * */
export function useMemoizedMergeRefs() {
  const lastInvocationRef = useRef({
    args: [] as ReactRef<unknown>[],
    result: null as React.RefCallback<unknown>,
  });

  return function memoizedMergeRefs<T>(...refs: ReactRef<T>[]): React.RefCallback<T> {
    const lastInvocation = lastInvocationRef.current;
    if (shallowEqual(lastInvocation.args, refs)) {
      return lastInvocation.result;
    }

    const result = mergeRefs(...refs);
    lastInvocationRef.current = { args: refs, result };

    return result;
  };
}

/**
 * 合并多个事件的回调函数
 * 该函数会忽略参数中的空值
 */
export function composeHandlers<ARGS extends any[]>(...fns: ((...args: ARGS) => void)[]) {
  return (...arg: ARGS) => {
    for (const fn of fns) {
      fn?.(...arg);
    }
  };
}

/** 合并受控状态和 非受控状态 */
export function composeState<S>(controlledState: S, uncontrolledState: S) {
  if (controlledState !== undefined) {
    return controlledState;
  }
  return uncontrolledState;
}
