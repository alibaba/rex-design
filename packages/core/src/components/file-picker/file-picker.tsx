import React from 'react';
import styled from 'styled-components';
import { FileList } from './file-list';
import { UseFilePickerProps, useFilePicker } from './use-file-picker';
import { FilePickTriggerProps } from './types';
import { DargFileTrigger, FilePickTrigger } from './trigger';

export const FileSelector = styled.label`
  input {
    display: none;
  }
`;

export interface FilePickerProps extends UseFilePickerProps {
  triggerType?: 'normal' | 'drag';
  triggerProps?: FilePickTriggerProps;
}

export function FilePicker(props: FilePickerProps) {
  const { triggerType = 'normal', triggerProps, ...rest } = props;
  const { getRootProps, getInputProps, getTriggerProps, getListProps } = useFilePicker(rest);

  const Trigger = triggerType === 'drag' ? DargFileTrigger : FilePickTrigger;

  return (
    <div {...getRootProps()}>
      <FileSelector>
        <input {...getInputProps()} />
        <Trigger {...getTriggerProps(triggerProps)} />
      </FileSelector>
      <FileList {...getListProps()} />
    </div>
  );
}
