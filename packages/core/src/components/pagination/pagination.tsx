import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '../button';
import { Box } from '../layout';
import { usePagination, UsePaginationProps } from './use-pagination';

const Wrapper = styled(Box)`
  display: inline-flex;
  align-items: center;
  user-select: none;

  > *:not(:last-child) {
    margin-right: var(--rex-space-m);
  }
`;

export interface PaginationProps extends UsePaginationProps {
  // TODO 分页器 支持原来的单页条目数量切换
  onPageSizeChange?(nextPageSize: number): void;
}

export function Pagination(props: PaginationProps) {
  const { items } = usePagination(props);
  return (
    <Wrapper>
      {items.map((item, index) => (
        <PaginationItem key={index} {...item} />
      ))}
    </Wrapper>
  );
}

interface PaginationItemProps extends ButtonProps {
  /**
   * 类型变化
   */
  variant: 'ellipsis' | 'page' | 'controller';
  /**
   * 文案
   */
  label: any;
}

function PaginationItem(props: PaginationItemProps) {
  const { variant, label, ...rest } = props;

  if (variant === 'ellipsis') {
    return (
      <Box as="span" fontSize="body">
        {label}
      </Box>
    );
  }

  return (
    <Button {...rest}>
      {variant === 'page' && label}
      {variant === 'controller' && label}
    </Button>
  );
}
