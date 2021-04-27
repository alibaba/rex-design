import CSS from 'csstype';
import { Length, StringOrNumber } from './common';

export interface SpaceProps {
  m?: StringOrNumber;
  mt?: StringOrNumber;
  mr?: StringOrNumber;
  mb?: StringOrNumber;
  ml?: StringOrNumber;
  mx?: StringOrNumber;
  my?: StringOrNumber;
  p?: StringOrNumber;
  pt?: StringOrNumber;
  pr?: StringOrNumber;
  pb?: StringOrNumber;
  pl?: StringOrNumber;
  px?: StringOrNumber;
  py?: StringOrNumber;
}

export interface ColorProps {
  color?: CSS.Property.Color;
  bg?: CSS.Property.Color;
  bgColor?: CSS.Property.Color;
  opacity?: CSS.Property.Opacity;
}

export interface LayoutProps {
  width?: StringOrNumber;
  minWidth?: StringOrNumber;
  maxWidth?: StringOrNumber;
  height?: StringOrNumber;
  minHeight?: StringOrNumber;
  maxHeight?: StringOrNumber;
  size?: StringOrNumber;
  display?: CSS.Property.Display;
  verticalAlign?: CSS.Property.VerticalAlign;
  overflow?: CSS.Property.Overflow;
  overflowX?: CSS.Property.OverflowX;
  overflowY?: CSS.Property.OverflowY;
}

export interface TypographyProps {
  fontSize?: string;
  fontWeight?: StringOrNumber;
  lineHeight?: StringOrNumber;
  textAlign?: CSS.Property.TextAlign;
}

export interface FlexboxProps {
  alignItems?: CSS.Property.AlignItems;
  alignContent?: CSS.Property.AlignContent;
  justifyItems?: CSS.Property.JustifyItems;
  justifyContent?: CSS.Property.JustifyContent;
  flexWrap?: CSS.Property.FlexWrap;
  flexDirection?: CSS.Property.FlexDirection;
  flex?: CSS.Property.Flex<Length>;
  flexGrow?: CSS.Property.FlexGrow;
  flexShrink?: CSS.Property.FlexShrink;
  flexBasis?: CSS.Property.FlexBasis<Length>;
  justifySelf?: CSS.Property.JustifySelf;
  alignSelf?: CSS.Property.AlignSelf;
  order?: CSS.Property.Order;
}

export interface GridProps {
  gridGap?: CSS.Property.GridGap<Length>;
  gridRowGap?: CSS.Property.GridRowGap<Length>;
  gridColumnGap?: CSS.Property.GridColumnGap<Length>;
  gridColumn?: CSS.Property.GridColumn;
  gridColumnStart?: CSS.Property.GridColumnStart;
  gridColumnEnd?: CSS.Property.GridColumnEnd;
  gridRow?: CSS.Property.GridRow;
  gridRowStart?: CSS.Property.GridRowStart;
  gridRowEnd?: CSS.Property.GridRowEnd;
  gridArea?: CSS.Property.GridArea;
  gridTemplateRows?: CSS.Property.GridTemplateRows;
  gridTemplateColumns?: CSS.Property.GridTemplateColumns;
  gridTemplateAreas?: CSS.Property.GridTemplateAreas;
}

export interface BorderProps {
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderWidth?: string;
  borderColor?: CSS.Property.Color;
  borderTopColor?: CSS.Property.Color;
  borderRightColor?: CSS.Property.Color;
  borderBottomColor?: CSS.Property.Color;
  borderLeftColor?: CSS.Property.Color;
  borderRadius?: string;
}

export interface PositionProps {
  position?: CSS.Property.Position;
  zIndex?: CSS.Property.ZIndex;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export interface ShadowProps {
  boxShadow?: CSS.Property.BoxShadow;
  textShadow?: CSS.Property.TextShadow;
}
