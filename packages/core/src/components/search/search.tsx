import React from 'react';
import styled from 'styled-components';
import { Icon } from '@rexd/icon';
import { Button } from '../button';
import { Input } from '../input';
import { Group, Box } from '../layout';
import { useSearch, UseSearchProps } from './use-search';

const SimpleSearchButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
  border-radius: var(--rex-radii-s);

  &:hover {
    background-color: var(--rex-colors-fill-layer1);
  }
`;

export interface SearchProps extends UseSearchProps {
  /**
   * 形态
   */
  shape?: 'normal' | 'simple';
  /**
   * 搜索按钮文案
   */
  buttonText?: React.ReactNode;
}

export function Search(props: SearchProps) {
  const { shape, ...rest } = props;
  if (shape === 'simple') {
    return <SimpleSearch {...rest} />;
  }
  return <NormalSearch {...rest} />;
}

function NormalSearch(props: SearchProps) {
  const { buttonText = '搜索', ...rest } = props;
  const { htmlProps, getInputProps, getSubmitProps } = useSearch(rest);

  const inputProps = getInputProps();
  const submitProps = getSubmitProps();

  return (
    <Group isAttached {...htmlProps}>
      <Input {...inputProps} />
      <Button type="primary" {...submitProps}>
        {buttonText}
      </Button>
    </Group>
  );
}

function SimpleSearch(props: SearchProps) {
  const { htmlProps, getInputProps, getSubmitProps } = useSearch(props);

  const inputProps = getInputProps();
  const submitProps = getSubmitProps();

  return (
    <Input
      {...htmlProps}
      {...inputProps}
      renderRightElement={() => (
        <SimpleSearchButton {...submitProps}>
          <Icon type="search" />
        </SimpleSearchButton>
      )}
    />
  );
}
