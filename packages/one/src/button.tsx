import React from 'react';

export interface ButtonProps extends React.ComponentProps<'button'> {
  /**
   * 按住时的样式，仅小程序环境生效
   */
  hoverClassName?: string;
  // type?: 'submit' | 'reset';
  /**
   * 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件
   */
  onTap?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { hoverClassName, onTap, ...rest } = props;
  return <button onClick={onTap} ref={ref} {...rest} />;
});
