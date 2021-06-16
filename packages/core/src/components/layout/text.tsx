import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { textStyledPorps, shouldForwardProp } from '../../system';
import { TypographyProps } from '../../types';

const SystemText = styled('span').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => {
    return shouldForwardProp(prop) && defaultValidatorFn(prop);
  },
})<any>`
  ${textStyledPorps}

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
