import React from 'react';
import { Flex, FlexItem, Link } from '@rexd/core';

export interface FileListProps {
  items: any[];
}

export function FileList(props: FileListProps) {
  const { items } = props;

  return (
    <Flex spacing="s" direction="column">
      {items.map(({ id, name, url }) => (
        <FlexItem key={id} bg="fill.layer1" px="m">
          <Link href={url}>{name}</Link>
        </FlexItem>
      ))}
    </Flex>
  );
}
