import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Box, BoxProps } from './Box';
import { space, toPercent, toNumber, getResponsive } from '../../utils';
import { StringOrNumber, ResponsiveType } from '../../types';
import { useDevice } from '../../providers';

export interface FlexProps extends BoxProps {
  /**
   * 间距
   */
  spacing?: StringOrNumber;
  /**
   * 子元素排列方向
   */
  direction?: BoxProps['flexDirection'];
  /**
   * y 轴对齐方式
   */
  align?: BoxProps['alignItems'];
  /**
   * x 轴对齐方式
   */
  justify?: BoxProps['justifyContent'];
  wrap?: BoxProps['flexWrap'];
  basis?: BoxProps['flexBasis'];
  grow?: BoxProps['flexGrow'];
  shrink?: BoxProps['flexShrink'];
}

const StyledFlex = styled(Box)<FlexProps>`
  & > *:not(style) ~ *:not(style) {
    margin-top: ${(props) => props.flexDirection === 'column' && space(props.spacing)};
    margin-left: ${(props) => props.flexDirection === 'row' && space(props.spacing)};
    margin-bottom: ${(props) => props.flexDirection === 'column-reverse' && space(props.spacing)};
    margin-right: ${(props) => props.flexDirection === 'row-reverse' && space(props.spacing)};
  }
`;

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { direction = 'row', align, justify, wrap, flex, basis, grow, shrink, ...rest } = props;

  return (
    // @ts-ignore
    <StyledFlex
      ref={ref}
      display="flex"
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
      flexBasis={basis}
      flexGrow={grow}
      flexShrink={shrink}
      {...rest}
    />
  );
});

export interface FlexItemProps extends BoxProps {
  span?: ResponsiveType | 'auto';
}

// TODO: 待定
const COLS_TOTAL = 12;

const getWidth = (span: StringOrNumber) => {
  if (span === 'auto') {
    return span;
  }

  return toPercent(toNumber(span) / COLS_TOTAL);
};

export const FlexItem = React.forwardRef<HTMLDivElement, FlexItemProps>((props, ref) => {
  const { span: spanProp, flex: flexProp, className, ...rest } = props;
  const clazz = cx('rex-flex-item', className);
  const device = useDevice();
  const span = getResponsive(spanProp, device.alias);
  const width = span ? getWidth(span) : undefined;
  const flex = width ? '0 0 auto' : '1 0 0%';
  return <Box ref={ref} className={clazz} width={width} flex={flexProp || flex} {...rest} />;
});
