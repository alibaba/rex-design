import { isFunction } from '../../utils';
import { useControllableState } from '../../hooks';
import { InputProps } from '../input';

export interface UseSearchProps {
  /**
   * 输入框受控制
   */
  value?: string;
  /**
   * 输入框非受控值
   */
  defaultValue?: string;
  /**
   * 输入框值变化时的回调
   */
  onChange?: (value: string) => void;
  /**
   * 点击提交时的回调
   */
  onSubmit?: (value: string) => void;
  /**
   * 输入框占位符
   */
  placeholder?: string;
  /**
   * 是否有清空
   */
  hasClear?: boolean;
  /**
   * 输入框宽度
   */
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
