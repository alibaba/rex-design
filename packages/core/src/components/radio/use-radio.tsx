import { ChangeEvent, HTMLAttributes, useCallback } from 'react';
import cx from 'classnames';

export interface UseRadioProps {
  /**
   * 所属分组名
   */
  name?: string;
  /**
   * 分组值
   */
  value?: string;
  /**
   * 受控选中态
   */
  checked?: boolean;
  /**
   * 非受控选中初值
   */
  defaultChecked?: boolean;
  /**
   * 禁用
   */
  disabled?: boolean;
  /**
   * 只读
   */
  readOnly?: boolean;
  /**
   * 选中状态变化时的回调
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function useRadio(props: UseRadioProps) {
  const { checked, readOnly, disabled, onChange, value, name, className, ...htmlProps } = props;

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
        onChange: handleChange,
        onClick: (e: React.MouseEvent<HTMLInputElement>) => {
          e.stopPropagation();
        },
        ref,
      };
    },
    [name, value, handleChange, checked],
  );

  const clazz = cx(
    {
      'rex-radio': true,
      'rex-disabled': disabled,
    },
    className,
  );

  const getRootProps = () => {
    return {
      ...htmlProps,
      disabled,
      className: clazz,
    } as HTMLAttributes<HTMLLabelElement>;
  };

  return {
    getInputProps,
    getRootProps,
  };
}
