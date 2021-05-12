import React from 'react';
import { Box, BoxProps } from '../layout';
import { getToken } from '../../utils';

export interface InputElementProps extends BoxProps {}

export const InputElement = React.forwardRef<HTMLInputElement, InputElementProps>((props, ref) => {
  const { children, ...others } = props;

  return (
    <Box
      ref={ref}
      display="flex"
      alignItems="center"
      color="text.note"
      fontSize={getToken('Input.elementFontSize')}
      {...others}
    >
      {children}
    </Box>
  );
});
