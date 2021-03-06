import React, { useRef } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Icon } from '@rexd/icon';
import { useBoolean } from '../../hooks';
import { Box, Flex } from '../layout';
import { Button } from '../button';
import { FilePickTriggerProps } from './types';

const DarggerBox = styled.div`
  display: inline-block;
  min-width: 240px;
  padding: 32px 30px;
  border: 1px solid var(--rex-colors-line-border);
  border-radius: var(--rex-radii-s);
  background-color: var(--rex-colors-fill-layer1);
  text-align: center;

  &.rex-draging {
    border: 1px dashed var(--rex-colors-primary-50);
    background-color: var(--rex-colors-primary-10);
  }

  &.rex-disabled {
    pointer-events: none;
    color: var(--rex-colors-text-disabled);
    border: 1px solid var(--rex-colors-line-disabled);
    background-color: var(--rex-colors-fill-disabled);
  }
`;

const MediaTriggerBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px dashed var(--rex-colors-line-border);
  border-radius: var(--rex-radii-s);
  font-size: 24px;
  color: var(--rex-colors-text-note);
  cursor: pointer;

  &.rex-disabled {
    background-color: var(--rex-colors-fill-disabled);
    color: var(--rex-colors-text-disabled);
    border-color: var(--rex-colors-line-disabled);
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export function BasicFileTrigger(props: FilePickTriggerProps) {
  const { label = '请选择文件', ...rest } = props;
  return (
    <Button leftElement={<Icon type="upload" />} {...rest}>
      {label}
    </Button>
  );
}

export function DragFileTrigger(props: FilePickTriggerProps) {
  const counter = useRef(0);
  const [isDrag, { on, off }] = useBoolean(false);
  const { label = '上传文件', help = '可以拖拽文件到此处进行文件上传操作', disabled, inputRef, ...rest } = props;

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    counter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length) {
      on();
    }
  };

  const handleDargLeave = () => {
    counter.current--;
    if (counter.current === 0) {
      off();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    inputRef.current.files = e.dataTransfer.files;
    const changeEvent = new Event('change', { bubbles: true });
    inputRef.current.dispatchEvent(changeEvent);

    // reset file counter
    counter.current = 0;
    off();
  };

  const clazz = cx({
    'rex-draging': isDrag,
    'rex-disabled': disabled,
  });

  return (
    <DarggerBox
      className={clazz}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDargLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      {...rest}
    >
      <Flex align="center" justify="center" fontSize="title1">
        <Icon type="upload" />
        <Box ml="m">{label}</Box>
      </Flex>
      <Box mt="l" fontSize="body">
        {help}
      </Box>
    </DarggerBox>
  );
}

export function MediaFileTrigger({ disabled }: FilePickTriggerProps) {
  return (
    <MediaTriggerBox className={disabled ? 'rex-disabled' : undefined}>
      <Icon type="add-bold" />
    </MediaTriggerBox>
  );
}
