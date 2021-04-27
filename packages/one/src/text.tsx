import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  onTap?: React.MouseEventHandler<HTMLSpanElement>;
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (props, ref) => {
    const { onTap, onClick, ...rest } = props;

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      typeof onClick === 'function' && onClick(e);
      typeof onTap === 'function' && onTap(e);
    };

    return <span onClick={handleClick} {...rest} ref={ref} />;
  }
);
