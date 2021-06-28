// 请勿使用该组件，等内部的 hippo-xform 和 hippo3 成熟后，xform 将会重新回归开源
import { Input } from '@rexd/core';
import cx from 'classnames';
import { pick } from 'lodash-es';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { composeState } from './common-utils';
import { useModel } from './form';
import { FormItemView } from './form-ui';
import { Field, FieldConfig, IModel } from './models';

function resolveField(fieldProp: Field, model: IModel, name: string) {
  let field: Field;

  if (fieldProp != null) {
    field = fieldProp;
  } else if (name === '&') {
    field = model._asField();
  } else if (name != null) {
    field = (model as IModel<any>).getField(name);
  } else {
    throw new Error('<FormItem /> 必须通过 name 或 field 来指定对应的数据索引');
  }

  return field;
}

export interface FormItemComponentProps {
  value?: any;
  onChange?(...args: any[]): void;
  onBlur?(...args: any[]): void;
  readOnly?: any;
  disabled?: any;

  [prop: string]: any;
}

export interface FormItemCreationOptions {
  /** 名称 */
  name: string;

  /** 控件对应的 React 组件，例如 `<FormItem component="select" />` 对应 `Select` 组件. */
  component?: React.ComponentType<FormItemComponentProps>;

  /** 控件渲染方法，与 component 参数二选一，优先级高于 component */
  render?(arg: FormItemComponentProps): React.ReactElement;

  /** 组件值的属性名称，默认为 `'value'` */
  valuePropName?: string;

  /** 组件状态值的属性名称，默认为 `'status'` */
  statusPropName?: string;

  /** 预览态下组件的渲染方法。如果不设置该方法，预览态下将使用 render/component 作为后备方案. */
  renderPreview?(props: FormItemComponentProps): React.ReactNode;

  /** 当模型中的字段值为空（undefined）时，渲染控件所使用的值 */
  fallbackValue: any;

  /** 组件类型默认的空值判断方法 */
  isEmpty(value: any): boolean;
}

export function createFormItem(options: FormItemCreationOptions) {
  const statusPropName = options.statusPropName ?? 'status';
  const valuePropName = options.valuePropName ?? 'value';

  function FormItemComponent({
    fallbackValue = options.fallbackValue,
    isEmpty = options.isEmpty,
    renderPreview = options.renderPreview,
    componentProps: componentPropsProp,
    name,
    field: fieldProp,
    ...props
  }: Omit<FormItemProps, 'component'>) {
    const model = useModel();

    const field = resolveField(fieldProp, model, name);
    const fieldConfig: FieldConfig<unknown> = {
      fallbackValue,
      isEmpty,
      ...props,
    };
    field._useTrack(fieldConfig);

    useEffect(() => {
      if (fieldConfig.validateOnMount) {
        field.validate('mount');
        const cancel = field.state.cancelValidation;
        return () => {
          cancel?.();
        };
      }
    }, []);

    const error = field.state.error;
    const value = toJS(composeState(field.value, fallbackValue));

    const componentProps = {
      // dataSource, readOnly, disabled 允许直接透传
      ...pick(props, ['dataSource', 'readOnly', 'disabled']),
      ...componentPropsProp,
      // status 优先用 prop 中的值，然后再根据 field.state.error 自动判断
      [statusPropName]: composeState(
        componentPropsProp?.[statusPropName],
        composeState(props[statusPropName], error ? 'error' : undefined),
      ),
      [valuePropName]: composeState(props[valuePropName], value),
      onChange: composeState(props.onChange, field.handleChange),
      onBlur: composeState(props.onBlur, field.handleBlur),
    };

    let children: any;

    if (options.render) {
      children = options.render(componentProps);
    } else {
      children = <options.component {...componentProps} />;
    }

    return (
      <FormItemView
        label={props.label}
        help={props.help}
        asterisk={props.asterisk ?? props.required}
        error={error}
        tip={props.tip}
        style={props.style}
        className={cx(props.className)}
      >
        {children}
      </FormItemView>
    );
  }

  FormItemComponent.displayName = `FormItem__${options.name}`;

  return observer(FormItemComponent);
}

const COMPONENT_DICT: { [name: string]: React.FunctionComponent<any> } = {
  input: createFormItem({
    name: 'input',
    component: Input,
    fallbackValue: '',
    isEmpty: function (value: any) {
      return !value;
    },
  }),
};

const NotFound = createFormItem({
  name: 'notFound',
  fallbackValue: null,
  isEmpty: () => false,
  render({ component }: FormItemComponentProps) {
    return (
      <div style={{ border: '1px dashed red', fontSize: 14, padding: 4, color: 'red' }}>
        <code>&lt;FormItem component='{component}' /&gt;</code> 没有找到对应组件，请检查组件名称是否拼写正确
      </div>
    );
  },
});

export interface FormItemProps extends FieldConfig<any> {
  component: string;
  componentProps?: any;
  dataSource?: any;
  style?: React.CSSProperties;
  className?: string;

  name?: string;
  field?: Field;

  value?: any;
  onChange?(nextValue: any): void;
  onBlur?(): void;
  renderPreview?(props: FormItemProps): React.ReactNode;
}

export function FormItem({ component, ...props }: FormItemProps) {
  const Comp = COMPONENT_DICT[component];
  if (Comp == null) {
    return <NotFound {...props} componentProps={{ component }} />;
  }

  return React.createElement(Comp, props);
}

FormItem.register = (options: FormItemCreationOptions) => {
  COMPONENT_DICT[options.name] = createFormItem(options);
};

FormItem.COMPONENT_DICT = COMPONENT_DICT;
