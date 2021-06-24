// 请勿使用该组件，等内部的 hippo-xform 和 hippo3 成熟后，xform 将会重新回归开源
import React, { useContext, useState } from 'react';
import { composeState } from './common-utils';
import { FormItemGroup, FormItemView, FormLayout, FormLayoutParams } from './form-ui';
import { FormModel, IModel } from './models';

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

export interface FormProps<T> extends FormEnvContextType {
  /** 受控用法。 xform 模型对象，一般由上层通过 new FormModel(...) 创建而成 */
  model?: FormModel<T>;

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
  const model = composeState(modelProp, _model as any);

  return (
    <ModelProvider value={model}>
      <FormLayout style={style} className={className} {...layout}>
        {children}
      </FormLayout>
    </ModelProvider>
  );
}

Form.ModelProvider = ModelProvider;
Form.Layout = FormLayout;
Form.ItemGroup = FormItemGroup;
Form.ItemView = FormItemView;
