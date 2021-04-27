import { ChangeEvent, useCallback } from 'react';
import { callAllHandlers } from '../../utils';

export interface UseRadioProps {
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function useRadio(props: UseRadioProps) {
  const { checked, readOnly, disabled, onChange, value, name, ...htmlProps } = props;

  const handleChange = useCallback(
    (event) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }
      onChange?.(event);
    },
    [disabled, readOnly, onChange],
  );

  const getInputProps = useCallback(
    (props, ref = null) => {
      return {
        type: 'radio',
        name,
        value,
        checked,
        onChange: callAllHandlers(props?.onChange, handleChange),
        onClick: (e: React.MouseEvent<HTMLInputElement>) => {
          e.stopPropagation();
        },
        ref,
      };
    },
    [name, value, handleChange, checked],
  );

  return {
    getInputProps,
    htmlProps,
  };
}
