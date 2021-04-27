import React from 'react';
import styled, { css } from 'styled-components';
import { Box, BoxProps } from './Box';

const attachedStyle = css`
  display: inline-flex;

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

const normalStyle = css`
  > *:not(:last-child) {
    margin-right: var(--rex-space-m);
  }
`;

const GroupBox = styled(Box)<any>`
  ${(props) => (props.$isAttached ? attachedStyle : normalStyle)};
`;

export interface GroupProps extends Omit<BoxProps, 'as'> {
  isAttached?: boolean;
}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const { isAttached, children, ...rest } = props;
  return (
    <GroupBox role="group" ref={ref} $isAttached={isAttached} {...rest}>
      {children}
    </GroupBox>
  );
});
