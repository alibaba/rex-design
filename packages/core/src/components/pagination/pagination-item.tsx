import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '../button';

export interface PaginationItemProps extends ButtonProps {}

const SystemPaginationItem = styled(Button)`
  height: var(--rex-sizes-s8);
  border-radius: var(--rex-radii-s);
`;

/**
 * @deprecated
 */
export const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>((props, ref) => {
  return <SystemPaginationItem size="small" {...props} ref={ref} />;
});
