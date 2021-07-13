import React from 'react';
import { FormControlOnChangeHandler, StringOrNumber } from '../../types';

export type FileStatusType = 'success' | 'error' | 'process' | string | undefined;

/**
 * 自定义的文件类型
 */
export interface RexFile {
  /**
   * 文件的唯一 id
   */
  id: StringOrNumber;
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件大小
   */
  size?: number;
  /**
   * 文件类型
   */
  type?: string;
  /**
   * 错误消息
   */
  error?: any;
  /**
   * 原始文件对象
   */
  file?: any;
  /**
   * 上传后的文件地址
   */
  url?: string;
  /**
   * 下载地址（可选）
   */
  downloadUrl?: string;
  /**
   * 预览图片地址（可选）
   */
  previewUrl?: string;
  /**
   * 文件上传状态
   */
  status?: FileStatusType;
  /**
   * 上传进度
   */
  percent?: number;
}

export interface FileListProps {
  items: any[];
  onRemove: FormControlOnChangeHandler<StringOrNumber>;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface FileListItemProps {
  file?: RexFile;
  onRemove?: FormControlOnChangeHandler<StringOrNumber>;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface FilePickTriggerProps {
  label?: React.ReactNode;
  help?: React.ReactNode;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}
