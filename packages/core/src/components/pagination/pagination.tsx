import React from 'react';
import styled from 'styled-components';
import { isFunction } from '../../utils';
import { Button } from '../button';
import { Box } from '../layout';
import { Select, SingleSelectProps } from '../select';
import { usePagination, UsePaginationProps } from './use-pagination';

const Wrapper = styled(Box)`
  display: inline-flex;
  align-items: center;
  user-select: none;

  > *:not(:last-child) {
    margin-right: var(--rex-space-m);
  }
`;

export interface PaginationProps extends UsePaginationProps {}

export function Pagination(props: PaginationProps) {
  const { items } = usePagination(props);
  return (
    <Wrapper>
      {items.map(({ variant, label, ...rest }, index) => {
        if (variant === 'pageSizeSelect') {
          return <PageSizeSelect key={index} label={label} {...rest} />;
        }

        if (variant === 'ellipsis') {
          return (
            <Box as="span" fontSize="body">
              {label}
            </Box>
          );
        }

        return (
          <Button key={index} {...(rest as any) /* todo */}>
            {label}
          </Button>
        );
      })}
    </Wrapper>
  );
}

interface PageSizeSelectProps {
  label: React.ReactNode;
  value?: number;
  dataSource?: SingleSelectProps['dataSource'];
  onChange?: (pageSize: number) => void;
  disabled?: boolean;
  size?: SingleSelectProps['size'];
}

const selectStyle = {
  width: 80,
};

function PageSizeSelect(props: PageSizeSelectProps) {
  const { label, dataSource = [], value, onChange, disabled, size } = props;

  const handleChange = (value: string) => {
    isFunction(onChange) && onChange(Number(value));
  };

  return (
    <Box display="inline-flex" alignItems="center" ml="xl">
      <Box display="inline-block" mr="m" fontSize="body">
        {label}
      </Box>
      <Select.Single
        dataSource={dataSource}
        value={String(value)}
        onChange={handleChange}
        size={size}
        disabled={disabled}
        style={selectStyle}
      />
    </Box>
  );
}
