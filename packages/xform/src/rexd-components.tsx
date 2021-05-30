import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxProps,
  colors,
  DatePicker,
  DatePickerProps,
  DateRangePicker,
  DateRangePickerProps,
  FilePicker,
  FilePickerProps,
  Flex,
  FlexItem,
  Input,
  InputProps,
  Link,
  ListStore,
  MediaPicker,
  MediaPickerProps,
  MultiSelect,
  MultiSelectProps,
  MultiTreeSelect,
  NumberInput,
  NumberInputProps,
  RadioGroup,
  RadioGroupProps,
  Range,
  RangeProps,
  Select,
  SelectProps,
  SingleSelect,
  SingleSelectProps,
  SingleTreeSelect,
  SingleTreeSelectProps,
  Switch,
  SwitchProps,
  Textarea,
  TextareaProps,
  TimePicker,
  TimePickerProps,
  TreeSelect,
  TreeSelectProps,
} from '@rexd/core';
import React from 'react';
import { FormItemCreationOptions } from './form-item';
import { FieldConfig } from './models';

function renderBooleanPreview(props: any) {
  return props.value ? '是' : '否';
}

function isFalsy(value: any) {
  return !value;
}

function isNullOrUndefined(value: any) {
  return value == null;
}

function isNullOrArrayOfNulls(value: any) {
  return value == null || (Array.isArray(value) && value.every(isNullOrUndefined));
}

function defaultRenderPreview(props: any) {
  return props.value;
}

export const ALL_COMPONENTS: Array<FormItemCreationOptions & { aliases?: string[] }> = [];

function register(component: any, options: FormItemCreationOptions) {
  ALL_COMPONENTS.push({
    component,
    ...options,
  });
}

interface SwitchFormItemProps extends FieldConfig {
  component: 'switch';
  componentProps?: SwitchProps;
  fallbackValue?: boolean;
}
register(Switch, {
  name: 'switch',
  renderPreview: renderBooleanPreview,
  fallbackValue: false,
  isEmpty: isFalsy,
});

interface CheckboxFormItemProps extends FieldConfig {
  component: 'checkbox';
  componentProps?: CheckboxProps;
  fallbackValue?: boolean;
}
register(Checkbox, {
  name: 'checkbox',
  renderPreview: renderBooleanPreview,
  fallbackValue: false,
  isEmpty: isFalsy,
});

interface CheckboxGroupFormItemProps extends FieldConfig {
  component: 'checkboxGroup';
  componentProps?: CheckboxGroupProps;
  fallbackValue?: string[];
  dataSource?: CheckboxGroupProps['dataSource'];
}
register(CheckboxGroup, {
  name: 'checkboxGroup',
  fallbackValue: [],
  renderPreview(props: CheckboxGroupProps) {
    const value = props.value ?? props.defaultValue;
    const list = new ListStore<string | number>(props.dataSource);
    const labels = value.map((val) => {
      const item = list.getItem(val);
      return item ? item.label : val;
    });
    return labels.join('、');
  },
  isEmpty(value: any): boolean {
    return value == null || value.length === 0;
  },
});

interface RadioGroupFormItemProps extends FieldConfig {
  component: 'radioGroup';
  componentProps?: RadioGroupProps;
  defaultValue?: string;
  dataSource?: RadioGroupProps['dataSource'];
}
register(RadioGroup, {
  name: 'radioGroup',
  fallbackValue: null,
  renderPreview(props: RadioGroupProps) {
    const value = props.value ?? props.defaultValue;
    const list = new ListStore<string | number>(props.dataSource);
    const item = list.getItem(value);
    return item ? item.label : value;
  },
  isEmpty: isFalsy,
});

interface DatePickerFormItemProps extends FieldConfig {
  component: 'datePicker';
  componentProps?: DatePickerProps;
  defaultValue?: string;
}
register(DatePicker, {
  name: 'datePicker',
  renderPreview: defaultRenderPreview,
  fallbackValue: null,
  isEmpty: isFalsy,
});

interface DateRangePickerFormItemProps extends FieldConfig {
  component: 'dateRangePicker';
  componentProps?: DateRangePickerProps;
  defaultValue?: [string, string];
}
register(DateRangePicker, {
  name: 'dateRangePicker',
  renderPreview(props: DateRangePickerProps) {
    const value = (props.value ?? props.defaultValue) || [];
    return `${value[0] || '-'} ~ ${value[1] || '-'}`;
  },
  fallbackValue: [],
  isEmpty: isNullOrArrayOfNulls,
});

interface TimePickerFormItemProps extends FieldConfig {
  component: 'timePicker';
  componentProps?: TimePickerProps;
  defaultValue?: string;
}
register(TimePicker, {
  name: 'timePicker',
  renderPreview: defaultRenderPreview,
  fallbackValue: '',
  isEmpty: isFalsy,
});

interface FilePickerFormItemProps extends FieldConfig {
  component: 'filePicker';
  componentProps?: FilePickerProps;
  defaultValue?: FilePickerProps['defaultValue'];
}
register(FilePicker, {
  name: 'filePicker',
  renderPreview(props: FilePickerProps) {
    const items = (props.value ?? props.defaultValue) || [];
    return (
      <Flex spacing="s" direction="column">
        {items.map(({ id, name, url }) => (
          <FlexItem key={id} bg="fill.layer1" px="m">
            <Link href={url}>{name}</Link>
          </FlexItem>
        ))}
      </Flex>
    );
  },
  fallbackValue: [],
  isEmpty: isNullOrArrayOfNulls,
});

interface MediaPickerFormItemProps extends FieldConfig {
  component: 'mediaPicker';
  componentProps?: MediaPickerProps;
  defaultValue?: MediaPickerProps['defaultValue'];
}
register(MediaPicker, {
  name: 'mediaPicker',
  renderPreview(props) {
    const items: any[] = (props.value ?? props.defaultValue) || [];
    return (
      <Flex spacing="m">
        {items.map(({ id, name, url }) => {
          const background = `${colors('fill.layer1')} url(${url}) center center / 100% no-repeat`;
          return <Box key={id} size="100px" title={name} display="inline-block" style={{ background }} />;
        })}
      </Flex>
    );
  },
  fallbackValue: [],
  isEmpty: isNullOrArrayOfNulls,
});

interface InputFormItemProps extends FieldConfig {
  component: 'input';
  componentProps?: InputProps;
  defaultValue?: string;
}
register(Input, {
  name: 'input',
  renderPreview: defaultRenderPreview,
  fallbackValue: '',
  isEmpty: isFalsy,
});

interface TextareaFormItemProps extends FieldConfig {
  component: 'textarea';
  componentProps?: TextareaProps;
  defaultValue?: string;
}
register(Textarea, {
  name: 'textarea',
  renderPreview: defaultRenderPreview,
  fallbackValue: '',
  isEmpty: isFalsy,
});

interface NumberInputFormItemProps extends FieldConfig {
  component: 'numberInput';
  componentProps?: NumberInputProps;
  defaultValue?: number;
}
register(NumberInput, {
  name: 'numberInput',
  renderPreview: defaultRenderPreview,
  fallbackValue: null,
  isEmpty: isNullOrUndefined,
});

interface RangeFormItemProps extends FieldConfig {
  component: 'range';
  componentProps?: RangeProps;
  defaultValue?: number;
}

register(Range, {
  name: 'range',
  renderPreview: defaultRenderPreview,
  fallbackValue: 0,
  isEmpty: isNullOrUndefined,
});

interface SelectFormItemProps extends FieldConfig {
  component: 'select';
  componentProps?: SelectProps;
  defaultValue?: string | string[];
  dataSource?: SelectProps['dataSource'];
}
register(Select, {
  name: 'select',
  renderPreview: defaultRenderPreview,
  fallbackValue: null,
  isEmpty: isNullOrUndefined,
});

interface SingleSelectFormItemProps extends FieldConfig {
  component: 'singleSelect';
  componentProps?: SingleSelectProps;
  defaultValue?: string;
}
register(SingleSelect, {
  name: 'singleSelect',
  renderPreview: defaultRenderPreview,
  fallbackValue: null,
  isEmpty: isFalsy,
});

interface MultiSelectFormItemProps extends FieldConfig {
  component: 'multiSelect';
  componentProps?: MultiSelectProps;
  defaultValue?: string[];
  dataSource?: MultiSelectProps['dataSource'];
}
register(MultiSelect, {
  name: 'multiSelect',
  renderPreview: defaultRenderPreview,
  fallbackValue: [],
  isEmpty: isNullOrArrayOfNulls,
});

interface TreeSelectFormItemProps extends FieldConfig {
  component: 'treeSelect';
  componentProps?: TreeSelectProps;
  defaultValue?: string | string[];
  dataSource?: TreeSelectProps['dataSource'];
}
register(TreeSelect, {
  name: 'treeSelect',
  renderPreview: defaultRenderPreview,
  fallbackValue: null,
  isEmpty: isNullOrArrayOfNulls,
});

interface SingleTreeSelectFormItemProps extends FieldConfig {
  component: 'singleTreeSelect';
  componentProps?: SingleTreeSelectProps;
  defaultValue?: string;
  dataSource?: SingleTreeSelectProps['dataSource'];
}
register(SingleTreeSelect, {
  name: 'singleTreeSelect',
  renderPreview: defaultRenderPreview,
  fallbackValue: null,
  isEmpty: isFalsy,
});

interface MultiTreeSelectFormItemProps extends FieldConfig {
  component: 'multiTreeSelect';
  componentProps?: MultiSelectProps;
  defaultValue?: string[];
  dataSource?: MultiSelectProps['dataSource'];
}
register(MultiTreeSelect, {
  name: 'multiTreeSelect',
  renderPreview: defaultRenderPreview,
  fallbackValue: [],
  isEmpty: isNullOrArrayOfNulls,
});

//#region 用于测试的组件类型
function TestButtonGroup({
  items,
  value,
  onChange,
  ...others
}: {
  items: string[];
  value: string;
  onChange: (nextValue: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 8 }} {...others}>
      {items.map((item) => (
        <Button key={item} type={item === value ? 'primary' : 'normal'} onClick={() => onChange(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
}
interface TestButtonGroupFieldProps extends FieldConfig {
  component: 'testButtonGroup';
  componentProps?: React.HTMLProps<HTMLDivElement> & { items: string[] };
}
register(TestButtonGroup, {
  name: 'testButtonGroup',
  fallbackValue: '',
  renderPreview: defaultRenderPreview,
  isEmpty: isFalsy,
});
//#endregion

// export type FormItemProps = (
//   | SwitchFormItemProps
//   | CheckboxFormItemProps
//   | CheckboxGroupFormItemProps
//   | RadioGroupFormItemProps
//   | DatePickerFormItemProps
//   | DateRangePickerFormItemProps
//   | TimePickerFormItemProps
//   | FilePickerFormItemProps
//   | MediaPickerFormItemProps
//   | InputFormItemProps
//   | TextareaFormItemProps
//   | NumberInputFormItemProps
//   | RangeFormItemProps
//   | SelectFormItemProps
//   | SingleSelectFormItemProps
//   | MultiSelectFormItemProps
//   | TreeSelectFormItemProps
//   | SingleTreeSelectFormItemProps
//   | MultiTreeSelectFormItemProps
//   | TestButtonGroupFieldProps
// ) & {
//   style?: React.CSSProperties;
//   className?: string;
//
//   name?: string;
//   field?: Field;
//
//   value?: any;
//   onChange?(nextValue: any): void;
//   onBlur?(): void;
//   renderPreview?(props: FormItemProps): React.ReactNode;
// };
