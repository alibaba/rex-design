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
import { composeState } from './core/utils';
import { fieldUtils } from './utils';

function renderBooleanPreview(props: any) {
  return props.value ? '是' : '否';
}

function defaultRenderPreview(props: any) {
  return props.value;
}

function isFalsy(value: any) {
  return !value;
}

function isNullOrUndefined(value: any) {
  return value == null;
}

function isNullOrEmptyArray(value: any) {
  return value == null || (Array.isArray(value) && value.length === 0);
}

const componentDict: any = {};

interface RegisterOption {
  /** 组件类型的名称 */
  name: string;

  /** 预览态下组件的渲染方法 */
  renderPreview(props: any): React.ReactNode;

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

          const onChange = (nextValue: any) => fieldUtils.handleChange(field, nextValue);
          const onBlur = () => fieldUtils.handleBlur(field);

          const componentProps = {
            // dataSource, readOnly, disabled 允许直接透传
            ...pick(props, ['dataSource', 'readOnly', 'disabled']),
            ...componentPropsProp,
            // status 优先用 prop 中的值，然后再根据 field.state.error 自动判断
            status: composeState(componentPropsProp?.status, composeState(props.status, error ? 'error' : undefined)),
            value: valueProp !== undefined ? valueProp : value,
            onChange: onChangeProp !== undefined ? onChangeProp : onChange,
            onBlur: onBlurProp !== undefined ? onBlurProp : onBlur,
          };

          return (
            <FormControl
              label={props.label}
              help={props.help}
              labelWidth={props.labelWidth}
              required={required}
              error={error}
            >
              {isPreview ? (
                (props.renderPreview ?? options.renderPreview)(componentProps)
              ) : (
                <Component {...componentProps} />
              )}
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
  renderPreview: renderBooleanPreview,
  fallbackValue: false,
  isEmpty: isFalsy,
});

interface CheckboxFormItemProps extends FieldConfig {
  component: 'checkbox';
  componentProps?: CheckboxProps;
  defaultValue?: boolean;
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
  defaultValue?: string[];
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
  isEmpty: isNullOrEmptyArray,
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
  isEmpty: isNullOrEmptyArray,
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
  isEmpty: isNullOrEmptyArray,
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
  isEmpty: isNullOrEmptyArray,
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
  isEmpty: isNullOrEmptyArray,
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
  isEmpty: isNullOrEmptyArray,
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

export type FormItemProps =
  | SwitchFormItemProps
  | CheckboxFormItemProps
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
        <div
          style={{
            border: '1px dashed var(--rex-colors-error-hover)',
            fontSize: 14,
            padding: 4,
            color: 'var(--rex-colors-error-normal)',
          }}
        >
          <code>&lt;FormItem component='{component}' /&gt;</code> 没有找到对应组件，请检查组件名称是否拼写正确
        </div>
      </FormControl>
    );
  }
  return React.createElement(Comp, props);
}
