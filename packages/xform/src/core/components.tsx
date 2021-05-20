import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, FieldConfig, IModel, SubModel, FormModel } from './models';
import { composeState } from './utils';

const ModelContext = React.createContext<IModel>(null);
export const ModelProvider = ModelContext.Provider;

// 导出该类型，允许上层通过 interface merge 拓展该类型
export interface FormEnvContextType {
  isPreview?: boolean;
  onSubmit?(submitValues: any, model: IModel): void;
  onError?(errors: any, model: IModel): void;
  onReset?(model: IModel): void;
}
const FormEnvContext = React.createContext<FormEnvContextType>({});

export const FormEnvProvider = ({ children, ...override }: FormEnvContextType & { children: React.ReactNode }) => {
  const parent = useFormEnv();

  return <FormEnvContext.Provider value={{ ...parent, ...override }}>{children}</FormEnvContext.Provider>;
};
export function useFormEnv() {
  return useContext(FormEnvContext);
}

export function useModel<T = unknown>() {
  return useContext(ModelContext) as IModel<T>;
}

export interface XFormArrayLayoutInput {
  arrayModel: SubModel<unknown[]>;
  itemCount: number;
  itemContent: React.ReactNode;
  itemFactory(arrayModel: SubModel<unknown[]>): any;
}

export interface XFormArrayProps {
  name: string;
  layout(input: XFormArrayLayoutInput): React.ReactElement;
  children: React.ReactNode;
  itemFactory?(arrayModel: SubModel<unknown[]>): any;
}

/** 对象数组表单 */
export const XFormArray = observer(({ name, children, layout, itemFactory }: XFormArrayProps) => {
  const parent = useModel();
  if (name === '&') {
    throw new Error(`XFormArray 不支持 name=&. path=(${parent.path.join('.') || 'root'})`);
  }
  const arrayModel = parent.getSubArray(name);
  const itemCount = arrayModel.values?.length ?? 0;

  return (
    <ModelProvider value={arrayModel}>
      {layout({ arrayModel, itemCount, itemContent: children, itemFactory })}
    </ModelProvider>
  );
});

/** 为该组件下的 XFormField 添加一个数据字段前缀 */
export const XFormObject = observer(({ name, children }: { children: React.ReactNode; name: string }) => {
  const parent = useModel();
  if (name === '&') {
    return <>{children}</>;
  }
  return <ModelProvider value={parent.getSubModel(name)} children={children} />;
});

export interface FieldProvides {
  field: Field;
  model: IModel;
  name: string;
  value: any;
  required: boolean;
  defaultValue: any;
}

export interface FieldProps extends FieldConfig {
  children: (props: FieldProvides) => React.ReactElement;
}

/**
 * 表单字段（field）
 *
 * 在 xform 中，一个「字段」包含一个「视图控件实例」（例如 Input，Select 实例）和一份状态（例如 Input 包含一个字符串状态）；
 * XFormField 是一个高阶组件 / 基础组件，每个具体的组件类型（例如 Input，Select ）都应该继承该组件并封装相应的 FieldItem；
 *
 *  */
export const XFormField = observer(
  (props: FieldProps): React.ReactElement => {
    const { name, required, children, defaultValue } = props;
    const model = useModel();

    const field = computed(() => {
      if (name === '&') {
        return model._asField();
      } else {
        return model.getField(name);
      }
    }).get();
    field._useTrack(props);

    const value = composeState(field.value, defaultValue);

    return children({ model, name, field, value, required, defaultValue });
  },
);
