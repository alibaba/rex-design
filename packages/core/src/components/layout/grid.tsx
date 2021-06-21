import React, { forwardRef } from 'react';
import { Box, BoxProps } from './Box';
import { useDevice } from '../../providers';
import { StringOrNumber, ResponsiveType } from '../../types';
import { getResponsive, isNumber, space } from '../../utils';

export interface GridProps extends BoxProps {
  /**
   * 列数
   */
  columns?: ResponsiveType;
  /**
   * 间距
   */
  spacing?: StringOrNumber;
  /**
   * 水平方向间距
   */
  spacingX?: StringOrNumber;
  /**
   * 垂直方向间距
   */
  spacingY?: StringOrNumber;
  /**
   * 子元素最小宽度
   */
  minChildWidth?: StringOrNumber;
  /**
   * 定义每一列的宽度
   */
  templateColumns?: BoxProps['gridTemplateColumns'];
  /**
   * 定义每一行的高度
   */
  templateRows?: BoxProps['gridTemplateRows'];
  templateArea?: BoxProps['gridTemplateAreas'];
  area?: BoxProps['gridArea'];
}

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    columns: columnsProp,
    spacingX,
    spacingY,
    spacing,
    minChildWidth,
    templateColumns: templateColumnsProp,
    templateRows,
    area,
    templateArea,
    ...rest
  } = props;

  const device = useDevice();
  const columns = getResponsive(columnsProp, device.alias);

  const templateColumns = minChildWidth ? widthToColumns(minChildWidth) : countToColumns(columns);

  return (
    <Box
      display="grid"
      gridGap={space(spacing)}
      gridColumnGap={space(spacingX)}
      gridRowGap={space(spacingY)}
      gridTemplateColumns={templateColumnsProp || templateColumns}
      gridTemplateRows={templateRows}
      gridArea={area}
      gridTemplateAreas={templateArea}
      ref={ref}
      {...rest}
    />
  );
});

export interface GridItemProps extends BoxProps {
  colSpan?: StringOrNumber;
  colStart?: BoxProps['gridColumnStart'];
  colEnd?: BoxProps['gridColumnEnd'];
  rowSpan?: StringOrNumber;
  rowStart?: BoxProps['gridRowEnd'];
  rowEnd?: BoxProps['gridRowEnd'];
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>((props, ref) => {
  const { colSpan = 'auto', colStart, colEnd, rowEnd, rowSpan = 'auto', rowStart, ...rest } = props;
  return (
    <Box
      ref={ref}
      gridColumn={toSpan(colSpan)}
      gridColumnStart={colStart}
      gridColumnEnd={colEnd}
      gridRow={toSpan(rowSpan)}
      gridRowStart={rowStart}
      gridRowEnd={rowEnd}
      {...rest}
    />
  );
});

function toSpan(span: StringOrNumber) {
  return span === 'auto' ? 'auto' : `span ${span}/span ${span}`;
}

function toPx(n: StringOrNumber) {
  return isNumber(n) ? `${n}px` : n;
}

function widthToColumns(width: StringOrNumber) {
  return `repeat(auto-fit, minmax(${toPx(width)}, 1fr))`;
}

function countToColumns(count: Number) {
  return `repeat(${count}, 1fr)`;
}
