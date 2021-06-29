import cx from 'classnames';
import React, { useRef } from 'react';
import { uniqueId } from 'lodash-es';
import { useControllableState } from '../../hooks';
import { FormControlOnChangeHandler, StringOrNumber } from '../../types';
import { RexFile } from './types';

async function defaultEmptyRequest() {
  return Promise.reject(Error('请传入自定义 request 方法'));
}

function normalizeFile(file: File) {
  return {
    id: uniqueId('file_'),
    name: file.name,
    size: file.size,
    type: file.type,
    file: file,
  };
}

/**
 * 合并两个集合，相同 key 的使用后者覆盖前者
 * @param list1 列表1
 * @param list2 列表2
 * @param key 探测的 key
 * @returns 返回合并后的列表
 */
function mergeCollections<T>(list1: T[], list2: T[], key: string) {
  const map = new Map();
  (list1 || []).forEach((item) => {
    map.set(item[key], item);
  });

  (list2 || []).forEach((item) => {
    map.set(item[key], {
      ...map.get(item[key]),
      ...item,
    });
  });

  return Array.from(map.values());
}

/**
 * 构造请求方法
 * @param request
 * @returns
 */
function getUpload(request: RequestType) {
  return async function (data: any) {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    let ret;
    try {
      ret = await request({
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      ret = {
        error: err,
        status: 'error',
      };
    }

    if (!ret) {
      return data;
    }

    return {
      ...data,
      ...ret,
    };
  };
}

interface RequestReturn {
  url: string;
  message: string;
  [key: string]: string;
}

interface RequestOptions {
  data?: FormData;
  headers?: any;
}

type RequestType = (options: RequestOptions) => Promise<RequestReturn>;

export interface UseFilePickerProps {
  /**
   * 受控值
   */
  value?: RexFile[];
  /**
   * 非受控默认值
   */
  defaultValue?: RexFile[];
  /**
   * 文件上传成功后的回调
   */
  onChange?: FormControlOnChangeHandler<RexFile[]>;
  /**
   * 自定义请求方法
   */
  request?: RequestType;
  /**
   * 是否可以选择多个文件
   */
  multiple?: boolean;
  /**
   * 可以选择的文件类型，例如 `image/*`, `video/*`
   */
  accept?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 自定义样式名
   */
  className?: string;
}

export function useFilePicker(props: UseFilePickerProps) {
  const {
    value: valueProp,
    defaultValue = [],
    onChange,
    request = defaultEmptyRequest,
    multiple,
    accept,
    disabled,
    className,
    ...htmlProps
  } = props;

  const inputRef = useRef<HTMLInputElement>();
  const [value, updateValue] = useControllableState<RexFile[]>({
    name: 'FilePicker',
    value: valueProp,
    defaultValue,
    onChange,
  });

  // 仅文件展示列表
  const isControlled = valueProp === undefined;
  const [displayValue, updateDisplayValue] = useControllableState<RexFile[]>({
    name: 'FilePickerList',
    value: isControlled ? undefined : value,
    defaultValue: isControlled ? value : undefined,
  });

  const upload = getUpload(request as RequestType);

  const getInputProps = (props?: React.ComponentPropsWithRef<'input'>) => {
    return {
      ...props,
      ref: inputRef,
      type: 'file',
      multiple,
      accept,
      disabled,
      onChange: async (e: React.FormEvent<HTMLInputElement>) => {
        const rawFiles = (e.target as HTMLInputElement).files;
        const files = Array.from(rawFiles).map(normalizeFile);
        const list = mergeCollections<RexFile>(files, value, 'id');

        updateDisplayValue(list); // 只更新展示态

        const rets = await Promise.all(
          files.map(async (file: RexFile) => {
            // TIP: 不需要 beforeUpload，可以直接借助自定义 request 来实现
            return upload(file);
          }),
        );

        const updatedList = mergeCollections<RexFile>(list, rets, 'id');
        updateDisplayValue(updatedList);
        updateValue(updatedList);
      },
    };
  };

  const getListProps = (props?: React.ComponentPropsWithoutRef<'ul'>) => {
    return {
      ...props,
      disabled,
      items: displayValue || [],
      onRemove: (id: StringOrNumber) => {
        const filtered = value.filter((item) => item.id !== id);
        updateDisplayValue(filtered);
        updateValue(filtered);
      },
    };
  };

  const getRootProps = (props?: React.ComponentPropsWithoutRef<'div'>) => {
    return {
      ...props,
      ...htmlProps,
      className: cx(
        {
          'rex-file-picker': true,
          'rex-disabled': disabled,
        },
        className,
      ),
    };
  };

  const getSelectorProps = (props?: React.ComponentPropsWithoutRef<'div'>) => {
    return {
      ...props,
      onClick() {
        inputRef.current.click();
      },
    };
  };

  const getTriggerProps = () => {
    return {
      inputRef,
      disabled,
    };
  };

  return {
    getRootProps,
    getSelectorProps,
    getTriggerProps,
    getInputProps,
    getListProps,
  };
}
