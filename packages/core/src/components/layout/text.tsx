import React from 'react';
import styled, { css } from 'styled-components';
import { textStyledProps, shouldForwardProp } from '../../system';
import { TypographyProps, ColorProps } from '../../types';

const truncatedStyle = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const textClampStyle = css<any>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.$lineClamp};
`;

const SystemText = styled('span').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => {
    return shouldForwardProp(prop) && defaultValidatorFn(prop);
  },
})<any>`
  ${textStyledProps}

  ${(props) => props.$lineClamp > 0 && textClampStyle};
  ${(props) => props.$truncated && truncatedStyle};
`;

export interface TextProps extends TypographyProps, ColorProps {
  as?: any;
  align?: TypographyProps['textAlign'];
  /**
   * 是否在容器内自动截断（单行展示）
   */
  truncated?: boolean;
  /**
   * 最多展示的行数（超出截断）
   */
  lineClamp?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { color = 'text.body', align, truncated, lineClamp, ...rest } = props;

  return (
    <SystemText ref={ref} textAligin={align} color={color} $truncated={truncated} $lineClamp={lineClamp} {...rest} />
  );
});
