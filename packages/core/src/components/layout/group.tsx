import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from './Box';
import { StringOrNumber } from '../../types';
import { space } from '../../utils';

const attachedStyle = css`
  display: inline-flex;
  vertical-align: middle;

  > *:first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > *:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  > *:not(:first-child):not(:last-child) {
    border-radius: 0;
  }

  > *:not(:last-child) {
    margin-right: -1px;
  }
`;

const normalStyle = css<any>`
  > *:not(:last-child) {
    margin-right: ${(props) => props.$spacingX};
    margin-bottom: ${(props) => props.$spacingY};
  }
`;

const GroupBox = styled(Box)<any>`
  ${(props) => (props.$isAttached ? attachedStyle : normalStyle)};
`;

export interface GroupProps extends Omit<BoxProps, 'as'> {
  /**
   * 是否吸附在一起
   */
  isAttached?: boolean;
  /**
   * 水平间距
   */
  spacingX?: StringOrNumber;
  /**
   * 垂直间距
   */
  spacingY?: StringOrNumber;
}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const { isAttached, spacingX = 'm', spacingY = 0, children, ...rest } = props;
  return (
    <GroupBox
      role="group"
      ref={ref}
      $isAttached={isAttached}
      $spacingX={space(spacingX)}
      $spacingY={space(spacingY)}
      {...rest}
    >
      {children}
    </GroupBox>
  );
});
