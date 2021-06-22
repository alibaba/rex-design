import React from 'react';
import { useFilePicker } from './use-file-picker';
import { MediaList } from './media-list';
import { FilePickerProps, FileSelector } from './file-picker';
import { MediaFileTrigger } from './trigger';

export type MediaPickerProps = FilePickerProps;

export function MediaPicker(props: FilePickerProps) {
  const { getRootProps, getInputProps, getSelectorProps, getTriggerProps, getListProps } = useFilePicker(props);
  return (
    <div {...getRootProps()}>
      <MediaList {...getListProps()}>
        <FileSelector {...getSelectorProps()}>
          <input {...getInputProps()} />
          <MediaFileTrigger {...getTriggerProps()} />
        </FileSelector>
      </MediaList>
    </div>
  );
}
