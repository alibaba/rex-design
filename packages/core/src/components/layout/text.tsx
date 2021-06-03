import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Text as BaseText } from '@rexd/one';
import { Dict, TypographyProps } from '../../types';
import { colors, fontSizes } from '../../utils';

const SystemText = styled(BaseText)<Dict<any>>`
  /* Color */
  color: ${(props) => colors(props.$color)};

  /* Typography */
  text-align: ${(props) => props.$textAlign || props.$align};
  font-size: ${(props) => fontSizes(props.$fontSize)};
  font-weight: ${(props) => props.$fontWeight};
  line-height: ${(props) => props.$lineHeight};

  &.rex-truncated {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.rex-text-lineClamp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${(props) => props.$noOfLines};
  }
`;

export interface TextProps extends TypographyProps {
  as?: any;
  color?: string;
  fontSize?: TypographyProps['fontSize'];
  fontWeight?: TypographyProps['fontWeight'];
  align?: TypographyProps['textAlign'];
  textAlign?: TypographyProps['textAlign'];
  isTruncated?: boolean;
  noOfLines?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const {
    color = 'text.body',
    fontSize,
    fontWeight,
    align,
    lineHeight,
    isTruncated,
    noOfLines,
    className,
    style,
    ...rest
  } = props;

  const clazz = cx(
    {
      'rex-truncated': isTruncated,
      'rex-text-lineClamp': noOfLines,
    },
    className,
  );

  return (
    <SystemText
      ref={ref}
      className={clazz}
      style={style}
      $color={color}
      $textAlign={align}
      $lineHeight={lineHeight}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $noOfLines={noOfLines}
      {...rest}
    />
  );
});
