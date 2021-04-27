import {
  Box,
  Button,
  CheckboxGroup,
  CheckboxGroupProps,
  colors,
  DatePicker,
  DatePickerProps,
  DateRangePicker,
  DateRangePickerProps,
  FilePicker,
  FilePickerProps,
  Flex,
  FlexItem,
  FormControl,
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
  pick,
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
import { FieldConfig, useFormEnv } from './core';
import { XFormField } from './core/components';
import { fieldUtils } from './utils';

function ErrorMessage({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        border: '1px dashed var(--rex-colors-error-hover)',
        fontSize: 14,
        padding: 4,
        color: 'var(--rex-colors-error-normal)',
      }}
    >
      {children}
    </div>
  );
}

function defaultPreviewRender(props: any) {
  return props.value ?? props.defaultValue;
}

function defaultIsEmpty(value: any) {
  return !value;
}

const componentDict: any = {};

interface RegisterOption {
  /** 组件类型的名称 */
  name: string;

  /** 预览态下组件的渲染方法 */
  previewRender: (props: any) => React.ReactNode;

  /** 当数据为空 undefined 时，渲染控件所使用的值 */
  fallbackValue: any;

  /** 组件类型默认的空值判断方法 */
  isEmpty(value: any): boolean;
}

function register(Component: React.ComponentType<any>, options: RegisterOption) {
  function ConcreteFieldComponent({
    defaultValue = options.fallbackValue,
    componentProps: componentPropsProp,
    value: valueProp,
    onChange: onChangeProp,
    onBlur: onBlurProp,
    ...props
  }: any) {
    const { isPreview } = useFormEnv();

    return (
      <XFormField defaultValue={defaultValue} isEmpty={options.isEmpty} {...props}>
        {({ model, name, field, value, required }) => {
          const error = field.state.error;

          const onChange = (nextValue: any) => fieldUtils.handleChange(field, nextValue /*model, name*/);
          const onBlur = () => fieldUtils.handleBlur(field);

          const componentProps = {
            ...pick(props, ['dataSource', 'items' /* TODO 移除为 TestButtonGroup 准备的 items */]),
            ...componentPropsProp,
            value: valueProp !== undefined ? valueProp : value,
            onChange: onChangeProp !== undefined ? onChangeProp : onChange,
            onBlur: onBlurProp !== undefined ? onBlurProp : onBlur,
            status: error ? 'error' : undefined,
            // todo disabled, readOnly
          };

          // TODO pass help, labelWidth to FormControl
          return (
            <FormControl label={props.label} required={required} error={error}>
              {isPreview ? options.previewRender(componentProps) : <Component {...componentProps} />}
            </FormControl>
          );
        }}
      </XFormField>
    );
  }

  ConcreteFieldComponent.displayName = `FormItem(${options.name})`;

  componentDict[options.name] = ConcreteFieldComponent;
}

interface SwitchFormItemProps extends FieldConfig {
  component: 'switch';
  componentProps?: SwitchProps;
  defaultValue?: boolean;
}
register(Switch, {
  name: 'switch',
  previewRender(props) {
    const value = props.value ?? props.defaultValue;
    // TODO: 自定义文案
    return value ? '是' : '否';
  },
  fallbackValue: false,
  isEmpty: defaultIsEmpty,
});

interface CheckboxGroupFormItemProps extends FieldConfig {
  component: 'checkboxGroup';
  componentProps?: CheckboxGroupProps;
  defaultValue?: string[];
  dataSource?: CheckboxGroupProps['dataSource'];
}
register(CheckboxGroup, {
  name: 'checkboxGroup',
  fallbackValue: [],
  previewRender(props: CheckboxGroupProps) {
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
  previewRender(props: RadioGroupProps) {
    const value = props.value ?? props.defaultValue;
    const list = new ListStore<string | number>(props.dataSource);
    const item = list.getItem(value);
    return item ? item.label : value;
  },
  isEmpty: defaultIsEmpty,
});

interface DatePickerFormItemProps extends FieldConfig {
  component: 'datePicker';
  componentProps?: DatePickerProps;
  defaultValue?: string;
}
register(DatePicker, {
  name: 'datePicker',
  previewRender: defaultPreviewRender,
  fallbackValue: null,
  isEmpty: defaultIsEmpty,
});

interface DateRangePickerFormItemProps extends FieldConfig {
  component: 'dateRangePicker';
  componentProps?: DateRangePickerProps;
  defaultValue?: [string, string];
}
register(DateRangePicker, {
  name: 'dateRangePicker',
  previewRender(props: DateRangePickerProps) {
    const value = (props.value ?? props.defaultValue) || [];
    return `${value[0] || '-'} ~ ${value[1] || '-'}`;
  },
  fallbackValue: ['', ''],
  // TODO 优化 isEmpty
  isEmpty: defaultIsEmpty,
});

interface TimePickerFormItemProps extends FieldConfig {
  component: 'timePicker';
  componentProps?: TimePickerProps;
  defaultValue?: string;
}
register(TimePicker, {
  name: 'timePicker',
  previewRender: defaultPreviewRender,
  fallbackValue: '',
  isEmpty: defaultIsEmpty,
});

interface FilePickerFormItemProps extends FieldConfig {
  component: 'filePicker';
  componentProps?: FilePickerProps;
  defaultValue?: FilePickerProps['defaultValue'];
}
register(FilePicker, {
  name: 'filePicker',
  previewRender(props: FilePickerProps) {
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
  // TODO 优化 isEmpty
  isEmpty: defaultIsEmpty,
});

interface MediaPickerFormItemProps extends FieldConfig {
  component: 'mediaPicker';
  componentProps?: MediaPickerProps;
  defaultValue?: MediaPickerProps['defaultValue'];
}
register(MediaPicker, {
  name: 'mediaPicker',
  previewRender(props) {
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
  // TODO 优化 isEmpty
  isEmpty: defaultIsEmpty,
});

interface InputFormItemProps extends FieldConfig {
  component: 'input';
  componentProps?: InputProps;
  defaultValue?: string;
}
register(Input, {
  name: 'input',
  previewRender: defaultPreviewRender,
  fallbackValue: '',
  isEmpty: defaultIsEmpty,
});

interface TextareaFormItemProps extends FieldConfig {
  component: 'textarea';
  componentProps?: TextareaProps;
  defaultValue?: string;
}
register(Textarea, {
  name: 'textarea',
  previewRender: defaultPreviewRender,
  fallbackValue: '',
  isEmpty: defaultIsEmpty,
});

interface NumberInputFormItemProps extends FieldConfig {
  component: 'numberInput';
  componentProps?: NumberInputProps;
  defaultValue?: number;
}
register(NumberInput, {
  name: 'numberInput',
  // TODO: preview with format
  previewRender: defaultPreviewRender,
  fallbackValue: null,
  // TODO 优化 isEmpty
  isEmpty: defaultIsEmpty,
});

interface RangeFormItemProps extends FieldConfig {
  component: 'range';
  componentProps?: RangeProps;
  defaultValue?: number;
}

register(Range, {
  name: 'range',
  previewRender: defaultPreviewRender,
  fallbackValue: 0,
  // TODO 优化 isEmpty
  isEmpty: defaultIsEmpty,
});

interface SelectFormItemProps extends FieldConfig {
  component: 'select';
  componentProps?: SelectProps;
  defaultValue?: string | string[];
  dataSource?: SelectProps['dataSource'];
}
register(Select, {
  name: 'select',
  previewRender: defaultPreviewRender,
  // TODO 优化 isEmpty
  isEmpty: defaultIsEmpty,
  fallbackValue: null,
});

interface SingleSelectFormItemProps extends FieldConfig {
  component: 'singleSelect';
  componentProps?: SingleSelectProps;
  defaultValue?: string;
}
register(SingleSelect, {
  name: 'singleSelect',
  previewRender: defaultPreviewRender,
  fallbackValue: null,
  // TODO 优化 isEmpty
  isEmpty: defaultIsEmpty,
});

interface MultiSelectFormItemProps extends FieldConfig {
  component: 'multiSelect';
  componentProps?: MultiSelectProps;
  defaultValue?: string[];
  dataSource?: MultiSelectProps['dataSource'];
}
register(MultiSelect, {
  name: 'multiSelect',
  previewRender: defaultPreviewRender,
  fallbackValue: [],
  isEmpty(value: string[]): boolean {
    return value == null || value.length === 0;
  },
});

interface TreeSelectFormItemProps extends FieldConfig {
  component: 'treeSelect';
  componentProps?: TreeSelectProps;
  defaultValue?: string | string[];
  dataSource?: TreeSelectProps['dataSource'];
}
register(TreeSelect, {
  name: 'treeSelect',
  previewRender: defaultPreviewRender,
  fallbackValue: null,
  // TODO 优化 isEmpty
  isEmpty: defaultIsEmpty,
});

interface SingleTreeSelectFormItemProps extends FieldConfig {
  component: 'singleTreeSelect';
  componentProps?: SingleTreeSelectProps;
  defaultValue?: string;
  dataSource?: SingleTreeSelectProps['dataSource'];
}
register(SingleTreeSelect, {
  name: 'singleTreeSelect',
  previewRender: defaultPreviewRender,
  fallbackValue: null,
  isEmpty: defaultIsEmpty,
});

interface MultiTreeSelectFormItemProps extends FieldConfig {
  component: 'multiTreeSelect';
  componentProps?: MultiSelectProps;
  defaultValue?: string[];
  dataSource?: MultiSelectProps['dataSource'];
}
register(MultiTreeSelect, {
  name: 'multiTreeSelect',
  previewRender: defaultPreviewRender,
  fallbackValue: [],
  isEmpty(value: string[]): boolean {
    return value == null || value.length === 0;
  },
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
  items: string[];
  componentProps?: React.HTMLProps<HTMLDivElement>;
}
register(TestButtonGroup, {
  name: 'testButtonGroup',
  fallbackValue: '',
  previewRender: defaultPreviewRender,
  isEmpty: defaultIsEmpty,
});
//#endregion

export type FormItemProps =
  | SwitchFormItemProps
  | CheckboxGroupFormItemProps
  | RadioGroupFormItemProps
  | DatePickerFormItemProps
  | DateRangePickerFormItemProps
  | TimePickerFormItemProps
  | FilePickerFormItemProps
  | MediaPickerFormItemProps
  | InputFormItemProps
  | TextareaFormItemProps
  | NumberInputFormItemProps
  | RangeFormItemProps
  | SelectFormItemProps
  | SingleSelectFormItemProps
  | MultiSelectFormItemProps
  | TreeSelectFormItemProps
  | SingleTreeSelectFormItemProps
  | MultiTreeSelectFormItemProps
  | TestButtonGroupFieldProps;

export function FormItem({ component, ...props }: FormItemProps) {
  const Comp = componentDict[component];
  if (Comp == null) {
    return (
      <FormControl>
        <ErrorMessage>
          <code>&lt;FormItem component='{component}' /&gt;</code> 没有找到对应组件，请检查组件名称是否拼写正确
        </ErrorMessage>
      </FormControl>
    );
  }
  return React.createElement(Comp, props);
}
