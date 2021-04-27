import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { noop } from '../../utils';
import { Text } from '../layout';
import { FileListItemProps, FileListProps } from './types';

const MediaListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;

  > li {
    margin-right: var(--rex-space-l);
  }
`;

const MediaWrapper = styled.li`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: var(--rex-radii-s);
  background-color: var(--rex-colors-emphasis-20);

  img {
    width: 100%;
    height: 100%;
  }

  &.rex-error {
    border: 2px solid var(--rex-colors-error-normal);
  }
`;

const MediaCloseBtn = styled.button<any>`
  position: absolute;
  z-index: 1;
  top: -8px;
  right: -8px;
  border: 0;
  padding: 0;
  background-color: transparent;
  color: var(--rex-colors-emphasis-80);
  font-size: 16px;
  outline: none;
`;

export function MediaList(props: FileListProps) {
  const { items = [], onRemove = noop, disabled, children } = props;

  return (
    <MediaListWrapper>
      {items.map((item) => (
        <MediaFileItem key={item.id} file={item} onRemove={onRemove} disabled={disabled} />
      ))}
      {children && <MediaFileItem>{children}</MediaFileItem>}
    </MediaListWrapper>
  );
}

function MediaFileItem(props: FileListItemProps) {
  const { file, onRemove, disabled, children } = props;

  // TODO: support image preview
  // TODO: support video/audio

  const status = file ? file.status : undefined;
  const clazz = cx({
    [`rex-${status}`]: status,
  });

  return (
    <MediaWrapper className={clazz}>
      {children || (
        <div>
          <img src={file.url} />
          {file.error && (
            <Text as="div" textAlign="center" color="error.normal" fontSize="note">
              {file.error.name}
            </Text>
          )}
          {!disabled && (
            <MediaCloseBtn onClick={() => onRemove(file.id, { data: file })}>
              <Icon type="delete-filling" />
            </MediaCloseBtn>
          )}
        </div>
      )}
    </MediaWrapper>
  );
}
