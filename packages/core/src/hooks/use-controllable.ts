import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useCallbackRef } from './use-callback-ref';

export function useControllableProp<T>(prop: T | undefined, state: T) {
  const controlled = typeof prop !== 'undefined';
  const value = controlled ? prop : state;
  return useMemo<[boolean, T]>(() => [controlled, value], [controlled, value]);
}

export interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
  shouldUpdate?: (prev: T, next: T) => boolean;
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value: valueProp, defaultValue, onChange, shouldUpdate = (prev, next) => prev !== next } = props;

  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue as T);
  const controlled = valueProp !== undefined;
  const value = controlled ? valueProp : uncontrolledState;

  const setValue = useCallbackRef(
    (next: SetStateAction<T>) => {
      const setter = next as (prevState?: T) => T;
      const nextValue = typeof next === 'function' ? setter(value) : next;

      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }

      if (!controlled) {
        setUncontrolledState(nextValue);
      }

      onChangeProp(nextValue);
    },
    [controlled, onChangeProp, value, shouldUpdateProp],
  );

  return [value, setValue] as [T, Dispatch<SetStateAction<T>>];
}
