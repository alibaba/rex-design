import React, { HTMLAttributes, useMemo } from 'react';
import styled from 'styled-components';
import { View } from '@rexd/one';
import { colors, space, sizes, radii, borders, shadows, fontSizes } from '../../utils';
import {
  Dict,
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
  as?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const StyledBox = styled(View)<Dict<any>>`
  /* Space */
  margin: ${(props) => space(props.$m)};
  margin-top: ${(props) => space(props.$mt || props.$my)};
  margin-right: ${(props) => space(props.$mr || props.$mx)};
  margin-bottom: ${(props) => space(props.$mb || props.$my)};
  margin-left: ${(props) => space(props.$ml || props.$mx)};
  padding: ${(props) => space(props.$p)};
  padding-top: ${(props) => space(props.$pt || props.$py)};
  padding-right: ${(props) => space(props.$pr || props.$px)};
  padding-bottom: ${(props) => space(props.$pb || props.$py)};
  padding-left: ${(props) => space(props.$pl || props.$px)};

  /* Color */
  color: ${(props) => colors(props.$color)};
  background: ${(props) => colors(props.$bg)};
  background-color: ${(props) => colors(props.$bgColor)};
  opacity: ${(props) => colors(props.$opacity)};

  /* Layout */
  display: ${(props) => props.$display};
  vertical-align: ${(props) => props.$verticalAlign};
  width: ${(props) => sizes(props.$width || props.$size)};
  min-width: ${(props) => sizes(props.$minWidth)};
  max-width: ${(props) => sizes(props.$maxWidth)};
  height: ${(props) => sizes(props.$height || props.$size)};
  min-height: ${(props) => sizes(props.$minHeight)};
  max-height: ${(props) => sizes(props.$maxHeight)};
  overflow: ${(props) => props.$overflow};
  overflow-x: ${(props) => props.$overflowX};
  overflow-y: ${(props) => props.$overflowY};

  /* Typography */
  text-align: ${(props) => props.$textAlign || props.$align};
  font-size: ${(props) => fontSizes(props.$fontSize)};
  font-weight: ${(props) => props.$fontWeight};
  line-height: ${(props) => props.$lineHeight};

  /* Flexbox */
  align-items: ${(props) => props.$alignItems};
  align-content: ${(props) => props.$alignContent};
  justify-items: ${(props) => props.$justifyItems};
  justify-content: ${(props) => props.$justifyContent};
  flex-wrap: ${(props) => props.$flexWrap};
  flex-direction: ${(props) => props.$flexDirection};
  flex: ${(props) => props.$flex};
  flex-grow: ${(props) => props.$flexGrow};
  flex-shrink: ${(props) => props.$flexShrink};
  flex-basis: ${(props) => props.$flexBasis};
  justify-self: ${(props) => props.$justifySelf};
  align-self: ${(props) => props.$alignSelf};
  order: ${(props) => props.$order};

  /* Grid */
  grid-gap: ${(props) => props.$gridGap};
  grid-row-gap: ${(props) => props.$gridRowGap};
  grid-column-gap: ${(props) => props.$gridColumnGap};
  grid-column: ${(props) => props.$gridColumn};
  grid-column-start: ${(props) => props.$gridColumnStart};
  grid-column-end: ${(props) => props.$gridColumnEnd};
  grid-row: ${(props) => props.$gridRow};
  grid-row-start: ${(props) => props.$gridRowStart};
  grid-row-end: ${(props) => props.$gridRowEnd};
  grid-area: ${(props) => props.$gridArea};
  grid-template-rows: ${(props) => props.$gridTemplateRows};
  grid-template-columns: ${(props) => props.$gridTemplateColumns};
  grid-template-areas: ${(props) => props.$gridTemplateAreas};

  /* Border */
  border: ${(props) => borders(props.$border, props.$borderColor)};
  border-top: ${(props) => borders(props.$borderTop, props.$borderTopColor)};
  border-right: ${(props) => borders(props.$borderRight, props.$borderRightColor)};
  border-bottom: ${(props) => borders(props.$borderBottom, props.$borderBottomColor)};
  border-left: ${(props) => borders(props.$borderLeft, props.$borderLeftColor)};
  border-color: ${(props) => colors(props.$borderColor)};
  border-radius: ${(props) => radii(props.$borderRadius)};

  /* Position */
  position: ${(props) => props.$position};
  z-index: ${(props) => props.$zIndex};
  top: ${(props) => props.$top};
  right: ${(props) => props.$right};
  bottom: ${(props) => props.$bottom};
  left: ${(props) => props.$left};

  /* Shadows */
  box-shadow: ${(props) => shadows(props.$boxShadow)};
`;

const WHITE_LIST = ['style', 'className', 'children', 'tabIndex', 'title'];

function transformProps<T>(props: T) {
  const o = {};

  Object.keys(props).forEach((prop) => {
    if (WHITE_LIST.includes(prop) || /^on/.test(prop) || /^data-/.test(prop)) {
      o[prop] = props[prop];
    } else {
      o[`$${prop}`] = props[prop];
    }
  });

  return o;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const _props = useMemo(() => transformProps<BoxProps>(props), [props]);
  return <StyledBox ref={ref} {..._props} />;
});
