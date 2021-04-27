import React from 'react';
import { Flex, Box, colors } from '@rexd/core';

export interface MediaListProps {
  items: any[];
}

export function MediaList(props: MediaListProps) {
  const { items } = props;

  // TODO: popup the ImagePreview
  return (
    <Flex spacing="m">
      {items.map(({ id, name, url }) => (
        <MediaItem key={id} size="100px" src={url} title={name} />
      ))}
    </Flex>
  );
}

export interface MediaItemProps {
  size?: string;
  src: string;
  title?: string;
}

export function MediaItem(props: MediaItemProps) {
  const { size, src, ...rest } = props;
  const style = {
    background: `${colors('fill.layer1')} url(${src}) center center / 100% no-repeat`,
  };
  return <Box display="inline-block" size={size} style={style} {...rest} />;
}
