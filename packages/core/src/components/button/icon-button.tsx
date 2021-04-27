import { Icon, IconType } from '@rexd/icon';
import { Button as OneButton } from '@rexd/one';
import React from 'react';
import styled from 'styled-components';
import { getToken } from '../../utils';

const Wrapper = styled(OneButton)`
  border: 0;
  background-color: transparent;
  color: ${getToken('IconButton.textColor')};
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;

  &:hover,
  &:focus {
    background-color: ${getToken('IconButton.bgHover')};
  }

  &[disabled] {
    color: var(--rex-colors-text-disabled);
  }

  svg {
    vertical-align: middle;
  }
`;

export interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon?: IconType;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { icon, ...others } = props;

  return (
    <Wrapper {...others} ref={ref}>
      <Icon type={icon as any} />
    </Wrapper>
  );
});
