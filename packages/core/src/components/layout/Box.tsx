import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { shouldForwardProp, allStyledProps } from '../../system';
import {
  SpaceProps,
  ColorProps,
  LayoutProps,
  TypographyProps,
  FlexboxProps,
  GridProps,
  BorderProps,
  PositionProps,
  ShadowProps,
} from '../../types';

export interface BoxProps
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    TypographyProps,
    FlexboxProps,
    GridProps,
    BorderProps,
    PositionProps,
    ShadowProps,
    Omit<HTMLAttributes<HTMLElement>, 'color'> {
  // as?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const StyledBox = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => {
    return shouldForwardProp(prop) && defaultValidatorFn(prop);
  },
})<any>`
  ${allStyledProps}
`;

export const Box = React.forwardRef<HTMLElement, BoxProps>((props, ref) => {
  return <StyledBox ref={ref} {...props} />;
});
