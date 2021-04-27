import React from 'react';
import { useFilePicker } from './use-file-picker';
import { MediaList } from './media-list';
import { FilePickerProps, FileSelector } from './file-picker';
import { MediaPickTrigger } from './trigger';

export type MediaPickerProps = FilePickerProps;

export function MediaPicker(props: FilePickerProps) {
  const { getRootProps, getInputProps, getTriggerProps, getListProps } = useFilePicker(props);
  return (
    <div {...getRootProps()}>
      <MediaList {...getListProps()}>
        <FileSelector>
          <input {...getInputProps()} />
          <MediaPickTrigger {...getTriggerProps()} />
        </FileSelector>
      </MediaList>
    </div>
  );
}
