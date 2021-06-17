import React from 'react';
import styled from 'styled-components';
import { Icon } from '@rexd/icon';
import { Box, BoxProps } from '../layout';

const StyledTag = styled(Box)`
  user-select: none;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;

  svg {
    margin-right: var(--rex-space-m);
  }
`;

const sizeMap: Record<string, BoxProps> = {
  small: {
    height: 'sizes.formHeights.s',
    fontSize: 'body',
  },
  medium: {
    height: 'sizes.formHeights.m',
    fontSize: 'body',
  },
  large: {
    height: 'sizes.formHeights.l',
    fontSize: 'subtitle',
  },
};

export interface CheckableTagProps extends BoxProps {
  isSelected?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const CheckableTag = (props: CheckableTagProps) => {
  const { isSelected = false, size = 'medium', children, ...others } = props;

  const colorStyles: BoxProps = isSelected
    ? {
        borderColor: 'brand.normal',
        color: 'brand.normal',
      }
    : {
        borderColor: 'line.border',
        color: 'text.body',
      };

  const sizeStyles = sizeMap[size];
  const icon = isSelected ? <Icon type="select-bold" /> : null;

  return (
    <StyledTag border="solid" px="xl" borderRadius="s" {...colorStyles} {...sizeStyles} {...others}>
      {icon}
      {children}
    </StyledTag>
  );
};
