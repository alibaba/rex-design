import CSS from 'csstype';
import { Length, StringOrNumber } from './common';

export type SystemScaleType =
  | 'colors'
  | 'fontSizes'
  | 'lineHeights'
  | 'borders'
  | 'radii'
  | 'shadows'
  | 'space'
  | 'sizes'
  | 'zIndices'
  | 'components';

export interface SpaceProps {
  m?: StringOrNumber;
  margin?: StringOrNumber;
  mt?: StringOrNumber;
  marginTop?: StringOrNumber;
  mr?: StringOrNumber;
  marginRight?: StringOrNumber;
  mb?: StringOrNumber;
  marginBottom?: StringOrNumber;
  ml?: StringOrNumber;
  marginLeft?: StringOrNumber;
  mx?: StringOrNumber;
  marginX?: StringOrNumber;
  my?: StringOrNumber;
  marginY?: StringOrNumber;
  p?: StringOrNumber;
  padding?: StringOrNumber;
  pt?: StringOrNumber;
  paddingTop?: StringOrNumber;
  pr?: StringOrNumber;
  paddingRight?: StringOrNumber;
  pb?: StringOrNumber;
  paddingBottom?: StringOrNumber;
  pl?: StringOrNumber;
  paddingLeft?: StringOrNumber;
  px?: StringOrNumber;
  paddingX?: StringOrNumber;
  py?: StringOrNumber;
  paddingY?: StringOrNumber;
}

export interface ColorProps {
  color?: CSS.Property.Color;
  bg?: CSS.Property.Color;
  backgroundColor?: CSS.Property.Color;
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
  fontFamily?: CSS.Property.FontFamily;
  fontStyle?: CSS.Property.FontStyle;
  letterSpacing?: CSS.Property.LetterSpacing;
  textAlign?: CSS.Property.TextAlign;
  fontSize?: string;
  fontWeight?: CSS.Property.FontWeight;
  lineHeight?: StringOrNumber;
}

export interface FlexboxProps {
  alignItems?: CSS.Property.AlignItems;
  alignContent?: CSS.Property.AlignContent;
  justifyItems?: CSS.Property.JustifyItems;
  justifyContent?: CSS.Property.JustifyContent;
  flexWrap?: CSS.Property.FlexWrap;
  flexDirection?: CSS.Property.FlexDirection;
  // item
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
  borderWidth?: StringOrNumber;
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
