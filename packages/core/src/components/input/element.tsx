import React from 'react';
import { Box, BoxProps } from '../layout';

export interface InputElementProps extends BoxProps {}

export const InputElement = React.forwardRef<HTMLInputElement, InputElementProps>((props, ref) => {
  const { children, ...others } = props;

  return (
    <Box ref={ref} display="flex" alignItems="center" fontSize="body" {...others}>
      {children}
    </Box>
  );
});
