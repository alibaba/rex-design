import { useCallback, useEffect, useRef, useState } from 'react';
import { runIfFn, warn } from '../utils';

export function useControllableProp<T>(prop: T | undefined, state: T) {
  const { current: isControlled } = useRef(prop !== undefined);
  const value = isControlled && typeof prop !== 'undefined' ? prop : state;
  return [isControlled, value] as const;
}

const defaultPropsMap = {
  value: 'value',
  defaultValue: 'defaultValue',
  onChange: 'onChange',
};

export interface UseControllableProps<T> {
  value: T;
  defaultValue: T;
  onChange?: (nextValue: T) => void;
  name?: string;
  propsMap?: {
    value: string;
    defaultValue: string;
    onChange: string;
  };
}

export function useControllableState<T>(props: UseControllableProps<T>) {
  const { value: valueProp, defaultValue, onChange, name = 'Component', propsMap = defaultPropsMap } = props;

  const [valueState, setValue] = useState(defaultValue as T);
  const { current: isControlled } = useRef(valueProp !== undefined);

  useEffect(() => {
    const nextIsControlled = valueProp !== undefined;

    const nextMode = nextIsControlled ? 'a controlled' : 'an uncontrolled';
    const mode = isControlled ? 'a controlled' : 'an uncontrolled';

    warn({
      condition: isControlled !== nextIsControlled,
      message:
        `Warning: ${name} is changing from ${mode} to ${nextMode} component. ` +
        `Components should not switch from controlled to uncontrolled (or vice versa). ` +
        `Use the '${propsMap.value}' with an '${propsMap.onChange}' handler. ` +
        `If you want an uncontrolled component, remove the ${propsMap.value} prop and use '${propsMap.defaultValue}' instead. "` +
        `More info: https://fb.me/react-controlled-components`,
    });
  }, [valueProp, isControlled, name]);

  const { current: initialDefaultValue } = useRef(defaultValue);

  useEffect(() => {
    warn({
      condition: initialDefaultValue !== defaultValue,
      message:
        `Warning: A component is changing the default value of an uncontrolled ${name} after being initialized. ` +
        `To suppress this warning opt to use a controlled ${name}.`,
    });
  }, [JSON.stringify(defaultValue)]);

  const value = isControlled ? (valueProp as T) : valueState;

  const updateValue = useCallback(
    (next) => {
      const nextValue = runIfFn(next, value);
      if (!isControlled) {
        setValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange, value],
  );

  return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
