import React from 'react';
import styled from 'styled-components';
import { FileList } from './file-list';
import { UseFilePickerProps, useFilePicker } from './use-file-picker';
import { BasicFileTrigger, MediaFileTrigger, DragFileTrigger } from './trigger';
import { FilePickTriggerProps } from './types';

export const FileSelector = styled.div`
  display: inline-block;

  input {
    display: none;
  }
`;

export interface FilePickerProps extends UseFilePickerProps {
  /**
   * 渲染触发器
   */
  renderTrigger?: (props: FilePickTriggerProps) => React.ReactNode;
}

const defaultRenderTrigger = (props: FilePickTriggerProps) => <BasicFileTrigger {...props} />;

export function FilePicker(props: FilePickerProps) {
  const { renderTrigger = defaultRenderTrigger, ...rest } = props;
  const { getRootProps, getSelectorProps, getTriggerProps, getInputProps, getListProps } = useFilePicker(rest);

  return (
    <div {...getRootProps()}>
      <FileSelector {...getSelectorProps()}>
        <input {...getInputProps()} />
        {renderTrigger(getTriggerProps())}
      </FileSelector>
      <FileList {...getListProps()} />
    </div>
  );
}

FilePicker.BasicFileTrigger = BasicFileTrigger;
FilePicker.MediaFileTrigger = MediaFileTrigger;
FilePicker.DragFileTrigger = DragFileTrigger;
