import React from 'react';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  password?: boolean;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onConfirm?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      password,
      type,
      onInput,
      onChange, // ignore
      onKeyPress,
      onConfirm,
      ...rest
    } = props;

    const inputType = password ? 'password' : type;

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && typeof onConfirm === 'function') {
        onConfirm(e);
      }

      if (typeof onKeyPress === 'function') {
        onKeyPress(e);
      }
    };

    return (
      <input
        type={inputType}
        onKeyPress={handleKeyPress}
        onChange={onInput}
        ref={ref}
        {...rest}
      />
    );
  }
);
