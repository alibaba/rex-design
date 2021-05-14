import { Button, ButtonProps, FormLayout } from '@rexd/core';
import { action, observable, reaction, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { FormEnvProvider, IModel, FormModel, useFormEnv, useModel } from './core';
import { ModelProvider, XFormArray, XFormField, XFormObject } from './core/components';
import { composeState, observableSetIn } from './core/utils';
import { modelUtils } from './utils';

export interface FormProps {
  /** 受控用法。 xform 模型对象，一般由上层通过 new FormModel(...) 创建而成 */
  model?: IModel;

  /** 非受控用法。 表单的默认值 */
  defaultValue?: any;

  /** 提交表单时的回调函数，需配合 <Form.Submit /> 使用 */
  onSubmit?(submitValues: any, model: FormModel): void;

  /** 提交表单时的出错回调函数，需配合 <Form.Submit /> 使用 */
  onError?(errors: any, model: FormModel): void;

  /** 清空表单时的回调函数，需配合 <Form.Reset /> 使用 */
  onReset?(model: FormModel): void;

  /**
   * 是否为预览态
   * @default false
   * */
  isPreview?: boolean;

  /**
   * 是否内联布局
   * @category 布局
   * @default false
   */
  isInline?: boolean;

  /**
   * 标签位置
   * @category 布局
   * @default 'top'
   */
  labelPosition?: 'top' | 'left';

  /** @category 布局 */
  style?: React.CSSProperties;

  /** @category 布局 */
  className?: string;

  children?: React.ReactNode;
}

export function Form({
  model: modelProp,
  defaultValue,
  isPreview,
  isInline,
  labelPosition,
  onSubmit,
  onError,
  onReset,
  children,
  className,
  style,
}: FormProps) {
  const [_model] = useState(() => new FormModel(defaultValue));
  const model = composeState(modelProp, _model);

  return (
    <FormEnvProvider isPreview={isPreview} onError={onError} onReset={onReset} onSubmit={onSubmit}>
      <ModelProvider value={model}>
        <FormLayout labelPosition={labelPosition} isInline={isInline} style={style} className={className}>
          {children}
        </FormLayout>
      </ModelProvider>
    </FormEnvProvider>
  );
}

function FormSubmit({ type = 'primary', children = '提交', ...props }: ButtonProps) {
  const root = useModel().root;
  const { onSubmit, onError } = useFormEnv();
  return (
    <Button
      onClick={() => {
        const { hasError, errors } = modelUtils.validateAll(root);
        if (hasError) {
          onError?.(errors, root);
        } else if (typeof onSubmit === 'function') {
          const submitValues: any = observable(root.valueShape === 'array' ? [] : {});

          root._proxy.iterateFields((field) => {
            if (field.mountCount === 0) {
              return;
            }

            const { path, value } = field;
            observableSetIn(submitValues, path, value);
          });

          onSubmit(toJS(submitValues), root);
        }
      }}
      type={type}
      children={children}
      {...props}
    />
  );
}

function FormReset({ children = '重置', ...props }: ButtonProps) {
  const root = useModel().root;
  const { onReset } = useFormEnv();
  return (
    <Button
      onClick={action(() => {
        root.values = {};
        modelUtils.clearError(root);
        onReset?.(root);
      })}
      children={children}
      {...props}
    />
  );
}

const FormEffect = observer(
  ({ watch, effect }: { watch: string; effect(value: any, detail: { prev: any; next: any; model: IModel }): void }) => {
    const model = useModel();
    const field = model.getField(watch);

    useEffect(() => {
      return reaction(
        () => toJS(field.value),
        (next, prev) => effect(next, { model, prev, next }),
      );
    }, [model, watch, field, effect]);

    return null as React.ReactElement;
  },
);

const FormModelConsumer = observer(({ children }: React.ConsumerProps<IModel>) => {
  const model = useModel();
  return children(model) as React.ReactElement;
});

Form.Submit = FormSubmit;
Form.Reset = FormReset;
Form.Effect = FormEffect;
Form.Array = XFormArray;
Form.Object = XFormObject;
Form.Field = XFormField;
Form.ModelProvider = ModelProvider;
Form.ModelConsumer = FormModelConsumer;
