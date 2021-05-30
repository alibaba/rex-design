import { reaction, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AsyncValue, isAsyncValue } from './async-value';
import { composeState } from './common-utils';
import { FormItemGroup, FormItemView, FormLayout, FormLayoutParams, FormReset, FormSubmit } from './form-ui';
import { Field, FormModel, IModel, SubModel } from './models';

export const ModelContext = React.createContext<IModel<any>>(null);
ModelContext.displayName = 'ModelContext';
const ModelProvider = ModelContext.Provider;

export function useModel<T = any>() {
  return useContext(ModelContext) as IModel<T>;
}

// 导出该类型，允许上层通过 interface merge 拓展该类型
export interface FormEnvContextType {
  /** 提交表单时的回调函数，需配合 <Form.Submit /> 使用 */
  onSubmit?(submitValues: any, model: IModel<any>): void;

  /** 提交表单时的出错回调函数，需配合 <Form.Submit /> 使用 */
  onError?(errors: any, model: IModel<any>): void;

  /** 清空表单时的回调函数，需配合 <Form.Reset /> 使用 */
  onReset?(model: IModel<any>): void;

  /**
   * 是否为预览态
   * @default false
   * */
  isPreview?: boolean;

  /**
   * 组件加载时是否触发校验
   * @default false
   * */
  validateOnMount?: boolean;

  /**
   * 值修改时是否触发校验
   * @default true
   * */
  validateOnChange?: boolean;

  /**
   * 组件失去焦点时是否触发校验
   * @default true
   * */
  validateOnBlur?: boolean;
}

const FormEnvContext = React.createContext<FormEnvContextType>({
  isPreview: false,
  validateOnMount: false,
  validateOnBlur: true,
  validateOnChange: true,
});
FormEnvContext.displayName = 'FormEnvContext';
export const useFormEnv = () => useContext(FormEnvContext);
export const FormEnvProvider = ({ children, ...override }: FormEnvContextType & { children: React.ReactNode }) => {
  const parent = useFormEnv();
  return <FormEnvContext.Provider value={{ ...parent, ...override }}>{children}</FormEnvContext.Provider>;
};

export interface FormProps<T> extends FormEnvContextType {
  /** 受控用法。 xform 模型对象，一般由上层通过 new FormModel(...) 创建而成 */
  model?: IModel<T>;

  /** 非受控用法。 表单的默认值 */
  defaultValue?: T;

  /** @category 布局 */
  style?: React.CSSProperties;

  /** @category 布局 */
  className?: string;

  /**
   * 表单布局参数
   * @category 布局
   * */
  layout?: FormLayoutParams;

  children?: React.ReactNode;
}

export function Form<T>({
  model: modelProp,
  defaultValue,
  children,
  className,
  style,
  layout,
  ...envProps
}: FormProps<T>) {
  const [_model] = useState(() => new FormModel(defaultValue));
  const model = composeState(modelProp, _model);

  return (
    <FormEnvProvider {...envProps}>
      <ModelProvider value={model}>
        <FormLayout style={style} className={className} {...layout}>
          {children}
        </FormLayout>
      </ModelProvider>
    </FormEnvProvider>
  );
}

export interface FormEffectProps<T = any> {
  watch: (() => T) | string | Field<T> | AsyncValue<T> | Array<string | Field | AsyncValue<any>>;
  effect(value: T, detail: { prev: T; next: T; model: IModel<any> }): void;
  fireImmediately?: boolean;
}

const FormEffect = observer(function FormEffect<T = any>({ watch, effect, fireImmediately }: FormEffectProps<T>) {
  const model = useModel();

  const boundEffect = useCallback(
    (next: T, prev: T) => {
      return effect(next, { model, prev, next });
    },
    [model, effect],
  );

  useEffect(() => {
    if (typeof watch === 'string') {
      return reaction(() => toJS(model.getValue(watch)) as T, boundEffect, { fireImmediately });
    } else if (typeof watch === 'function') {
      return reaction(watch, boundEffect);
    } else if (watch instanceof Field) {
      return reaction(() => watch.value, boundEffect, { fireImmediately });
    } else if (isAsyncValue(watch)) {
      return reaction(() => watch.current, boundEffect, { fireImmediately });
    } else if (Array.isArray(watch)) {
      return reaction(
        () => {
          return watch.map((t) => {
            if (typeof t === 'string') {
              return toJS(model.getValue(t));
            } else if (isAsyncValue(t)) {
              return t.current;
            } else {
              return t.value;
            }
          }) as any;
        },
        boundEffect,
        { fireImmediately },
      );
    }
  }, [model, watch, boundEffect, fireImmediately]);

  return null as React.ReactElement;
});

const FormModelConsumer = observer(({ children }: React.ConsumerProps<IModel<any>>) => {
  const model = useModel();
  return children(model) as React.ReactElement;
});

export interface FormArrayLayoutInput {
  arrayModel: SubModel<unknown[]>;
  itemCount: number;
  itemContent: React.ReactNode;
  itemFactory(arrayModel: SubModel<unknown[]>): any;
}

export interface FormArrayProps {
  name: string;
  layout(input: FormArrayLayoutInput): React.ReactElement;
  children: React.ReactNode;
  itemFactory?(arrayModel: SubModel<unknown[]>): any;
}

/** 对象数组表单 */
const FormArray = observer(({ name, children, layout, itemFactory }: FormArrayProps) => {
  const parent = useModel();
  if (name === '&') {
    throw new Error(`XFormArray 不支持 name=&. path=(${parent.path.join('.') || 'root'})`);
  }
  const arrayModel = parent.getSubModel(name) as SubModel<unknown[]>;
  const itemCount = arrayModel.values?.length ?? 0;

  return (
    <ModelProvider value={arrayModel as IModel}>
      {layout({ arrayModel, itemCount, itemContent: children, itemFactory })}
    </ModelProvider>
  );
});

/** 为该组件下的 XFormField 添加一个数据字段前缀 */
const FormObject = observer(({ name, children }: { children: React.ReactNode; name: string }) => {
  const parent = useModel();
  if (name === '&') {
    return <>{children}</>;
  }
  return <ModelProvider value={parent.getSubModel(name)} children={children} />;
});

Form.Submit = FormSubmit;
Form.Reset = FormReset;
Form.Effect = FormEffect;
Form.Array = FormArray;
Form.Object = FormObject;
Form.ModelProvider = ModelProvider;
Form.ModelConsumer = FormModelConsumer;
Form.Layout = FormLayout;
Form.ItemGroup = FormItemGroup;
Form.ItemView = FormItemView;
