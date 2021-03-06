import cx from 'classnames';
import { useCallback } from 'react';
import { useControllableState } from '../../hooks';
import { StringOrNumber } from '../../types';
import { noop } from '../../utils';

export interface UseInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClear?: () => void;
  hasClear?: boolean;
  shape?: 'solid' | 'simple';
  status?: 'error' | 'success' | 'warning';
  fill?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  type?: string;
  min?: number;
  max?: number;
  width?: StringOrNumber;
  style?: React.CSSProperties;
  className?: string;
}

export function useInput(props: UseInputProps) {
  const {
    hasClear: hasClearProp,
    value: valueProp,
    defaultValue = '',
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onClear = noop,
    placeholder = '请输入',
    disabled,
    readOnly,
    status,
    fill,
    type = 'text',
    min,
    max,
    shape = 'solid',
    autoComplete,
    autoFocus = false,
    className,
    ...rest
  } = props;

  const [value, updateValue] = useControllableState<string>({
    name: 'input',
    value: valueProp,
    defaultValue,
    onChange,
  });

  const getInputProps = useCallback(() => {
    return {
      placeholder,
      disabled,
      readOnly,
      autoComplete,
      autoFocus,
      type,
      min,
      max,
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        updateValue(nextValue);
      },
      onBlur,
      onFocus,
      onKeyDown,
    };
  }, [
    placeholder,
    disabled,
    readOnly,
    autoComplete,
    autoFocus,
    type,
    min,
    max,
    value,
    updateValue,
    onBlur,
    onFocus,
    onKeyDown,
  ]);

  const getClearButtonProps = useCallback(() => {
    return {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        updateValue('');
        onClear();
      },
    };
  }, [updateValue, onClear]);

  const clazz = cx(
    {
      'rex-input': true,
      'rex-disabled': disabled,
      [`rex-${shape}`]: shape,
      [`rex-${status}`]: status,
      'rex-fill': fill,
    },
    className,
  );

  const getRootProps = useCallback(() => {
    return {
      ...rest,
      className: clazz,
    };
  }, [rest, clazz]);

  return {
    hasClear: Boolean(hasClearProp && value),
    getRootProps,
    getInputProps,
    getClearButtonProps,
  };
}
