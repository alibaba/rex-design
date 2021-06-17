import cx from 'classnames';
import React from 'react';
import { Box, BoxProps } from './Box';

export interface PanelProps extends BoxProps {}

/** 用于表达海拔的组件；亮色下使用阴影进行表达，暗色下使用背景色进行表达。 */
export const Panel = React.forwardRef<HTMLElement, PanelProps>((props, ref) => {
  const { className, children, borderRadius = 's', boxShadow = 'lowDown', ...rest } = props;

  return (
    <Box
      ref={ref}
      className={cx('rex-panel', className)}
      boxShadow={boxShadow}
      borderRadius={borderRadius}
      bg="var(--rex-overlay-depth-m)"
      {...rest}
    >
      {children}
    </Box>
  );
});
