import cx from 'classnames';
import { useControllableState } from '../../hooks';
import { FormValidateStatusType } from '../../types';

export interface UseTextareaProps {
  rows?: number;
  readOnly?: boolean;
  disabled?: boolean;
  status?: FormValidateStatusType;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function useTextarea(props: UseTextareaProps) {
  const { value: valueProp, defaultValue = '', onChange, disabled, status, className, ...htmlProps } = props;
  const [value, updateValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange,
  });

  const clazz = cx(
    {
      'rex-textarea': true,
      'rex-disabled': disabled,
      [`rex-${status}`]: status,
    },
    className,
  );

  const getInputProps = (props, ref) => {
    return {
      placeholder: '请输入',
      ...htmlProps,
      ...props,
      className: clazz,
      ref,
      value,
      disabled,
      onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        updateValue(e?.target.value);
      },
    };
  };

  return {
    getInputProps,
  };
}
