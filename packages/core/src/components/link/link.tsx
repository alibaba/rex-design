import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: none;
  outline: none;
  transition: all 0.15s ease-out;
  cursor: pointer;
  color: var(--rex-colors-link-normal);

  &:hover {
    text-decoration: underline;
    color: var(--rex-colors-link-hover);
  }

  //&:focus {
  //  box-shadow: outline;
  //}
`;

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  /**
   * 是否打开新页面
   */
  external?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { external, ...rest } = props;
  return (
    <StyledLink
      ref={ref}
      target={external ? '_blank' : undefined}
      {...rest}
      rel={external ? 'noopener noreferer' : undefined}
    />
  );
});
