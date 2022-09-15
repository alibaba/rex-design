import type { DependencyList } from 'react';
import { useCallback, useEffect, useRef } from 'react';

/**
 * @see https://github.com/theKashey/use-callback-ref
 */
export function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined, deps: DependencyList = []) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(((...args) => callbackRef.current?.(...args)) as T, deps);
}
