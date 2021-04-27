import React, { forwardRef } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { View } from '@rexd/one';
import {
  Switch,
  Input,
  Textarea,
  DatePicker,
  DateRangePicker,
  TimePicker,
  DateRangePickerProps,
  CheckboxGroup,
  CheckboxGroupProps,
  FilePicker,
  FilePickerProps,
  MediaPicker,
  NumberInput,
  RadioGroup,
  ListStore,
  RadioGroupProps,
  NumberStore,
  NumberInputProps,
  Select,
} from '@rexd/core';
import { MediaList, FileList } from './preview';
import { useFormItem } from './context';

const ControlWrapper = styled(View)`
  &.rex-preview {
    display: inline-block;
    font-size: var(--rex-fontSizes-body);
    line-height: 32px;
    color: var(--rex-colors-text-body);
  }
`;

interface RegisterOption {
  name: string;
  renderPreview?: (props: any) => React.ReactNode;
  // TODO: isEmpty 判空方法，用于检测是否 required 的判断
  // TODO: defaultResetValue 默认的重置值
}

type StringOrNumber = string | number;

const Cache = {};

export const connect = (options: RegisterOption) => (Component: any) => {
  const { renderPreview } = options;
  const ConnectedComponent = forwardRef<any, any>((props, ref) => {
    const { isPreview, isInline, ...rest } = props;
    const mergedProps = useFormItem(rest);
    const clazz = cx({ 'rex-preview': isPreview });
    const children = isPreview ? renderPreview(rest) : <Component {...mergedProps} />;
    return (
      <ControlWrapper className={clazz} ref={ref}>
        {children}
      </ControlWrapper>
    );
  });
  return ConnectedComponent;
};

export const register = (component: any, options: RegisterOption) => {
  Cache[options.name] = connect(options)(component);
};

export const getComponent = (name: string) => {
  return Cache[name];
};

function defaultPreviewRender(props: any) {
  return props.value ?? props.defaultValue;
}

register(Switch, {
  name: 'switch',
  renderPreview(props) {
    const value = props.value ?? props.defaultValue;
    return value ? '是' : '否';
  },
});

register(CheckboxGroup, {
  name: 'checkboxGroup',
  renderPreview(props: CheckboxGroupProps) {
    const value = props.value ?? props.defaultValue;
    const list = new ListStore<StringOrNumber>(props.dataSource);
    const labels = value.map((val) => {
      const item = list.getItem(val);
      return item ? item.label : val;
    });
    return labels.join('、');
  },
});

register(RadioGroup, {
  name: 'radioGroup',
  renderPreview(props: RadioGroupProps) {
    const value = props.value ?? props.defaultValue;
    const list = new ListStore<StringOrNumber>(props.dataSource);
    const item = list.getItem(value);
    return item ? item.label : value;
  },
});

register(DatePicker, {
  name: 'datePicker',
  renderPreview: defaultPreviewRender,
});

register(DateRangePicker, {
  name: 'rangePicker',
  renderPreview(props: DateRangePickerProps) {
    const value = (props.value ?? props.defaultValue) || [];
    return `${value[0] || '-'} ~ ${value[1] || '-'}`;
  },
});

register(TimePicker, {
  name: 'timePicker',
  renderPreview: defaultPreviewRender,
});

register(FilePicker, {
  name: 'filePicker',
  renderPreview(props: FilePickerProps) {
    const value = (props.value ?? props.defaultValue) || [];
    return <FileList items={value} />;
  },
});

register(MediaPicker, {
  name: 'mediaPicker',
  renderPreview(props) {
    const value = (props.value ?? props.defaultValue) || [];
    return <MediaList items={value} />;
  },
});

register(Input, {
  name: 'input',
  renderPreview: defaultPreviewRender,
});

register(Textarea, {
  name: 'textarea',
  renderPreview: defaultPreviewRender,
});

register(NumberInput, {
  name: 'numberInput',
  renderPreview(props: NumberInputProps) {
    const value = (props.value ?? props.defaultValue) || 0;
    const store = new NumberStore('zh-CN', props.formatOptions);
    return store.format(value);
  },
});

// register(Range, {
//   name: 'range',
//   renderPreview: defaultPreviewRender,
// });

register(Select, {
  name: 'select',
  renderPreview: defaultPreviewRender,
});
