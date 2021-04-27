import React from 'react';

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  onTap?: React.MouseEventHandler<HTMLDivElement>;
}

export const View = React.forwardRef<HTMLDivElement, ViewProps>(
  (props, ref) => {
    const { onTap, onClick, ...rest } = props;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      typeof onClick === 'function' && onClick(e);
      typeof onTap === 'function' && onTap(e);
    };

    return <div onClick={handleClick} {...rest} ref={ref} />;
  }
);
