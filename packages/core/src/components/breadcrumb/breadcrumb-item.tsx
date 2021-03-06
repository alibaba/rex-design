import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { getToken } from '../../utils';
import { Box } from '../layout';

const ItemWrapper = styled(Box)`
  display: inline-flex;
  align-items: center;
  user-select: none;
  color: ${getToken('Breadcrumb.textColor')};

  &.rex-last {
    font-weight: bold;
    color: ${getToken('Breadcrumb.textColorActive')};
  }

  &:hover {
    color: ${getToken('Breadcrumb.textColorHover')};
  }
`;

export interface BreadcrumbItemProps {
  isLast?: boolean;
  separator?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const BreadcrumbItem = React.forwardRef<HTMLDivElement, BreadcrumbItemProps>((props, ref) => {
  const { separator, className, children, isLast, ...others } = props;

  const clazz = cx(
    'rex-breadcrumb-item',
    {
      'rex-last': isLast,
    },
    className,
  );

  return (
    <ItemWrapper {...others} className={clazz} ref={ref}>
      <Box as="span" role="link" tabIndex={0} mx="m">
        {children}
      </Box>
      {separator}
    </ItemWrapper>
  );
});
