import { isFunction } from '../../utils';
import { useControllableState } from '../../hooks';
import { InputProps } from '../input';
import { ButtonProps } from '../button';

export interface UseSearchProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  hasClear?: boolean;
  inputWidth?: string;
}

export function useSearch(props: UseSearchProps) {
  const {
    value: valueProp,
    defaultValue = '',
    onChange,
    onSubmit,
    placeholder = '输入关键词',
    hasClear = false,
    inputWidth,
    ...htmlProps
  } = props;

  const [value, updateValue] = useControllableState<string>({
    value: valueProp,
    defaultValue,
    onChange,
  });

  const getInputProps = () => {
    return {
      width: inputWidth,
      hasClear,
      placeholder,
      value,
      onChange(nextValue: string) {
        if (nextValue !== value) {
          updateValue(nextValue);
        }
      },
    } as InputProps;
  };

  const getSubmitProps = () => {
    return {
      onClick: () => {
        if (isFunction(onSubmit)) {
          onSubmit(value);
        }
      },
    };
  };

  return {
    htmlProps,
    getInputProps,
    getSubmitProps,
  };
}
