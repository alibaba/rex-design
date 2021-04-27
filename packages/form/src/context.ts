import { createContext } from '@rexd/core';
import { FormValidateStatusType } from '@rexd/core/src/types';
import { Field } from './field';

interface FormContext {
  field?: Field;
  isPreview?: boolean;
  onError?: (errors: any) => void;
  onReset?: () => void;
  onSubmit?: (values: any) => void;
}

const [FormProvider, useForm] = createContext<FormContext>({
  name: 'FormContext',
  strict: true,
});

interface FormItemContext {
  disabled?: boolean;
  readOnly?: boolean;
  status?: FormValidateStatusType;
}

const [FormItemProvider, useFormItemContext] = createContext<FormItemContext>({
  name: 'FormItemContext',
  strict: true,
});

interface UseFormItemProps {
  disabled?: boolean;
  readOnly?: boolean;
  status?: FormValidateStatusType;
}

export function useFormItem(props: UseFormItemProps) {
  const ctx = useFormItemContext();

  return {
    ...props,
    disabled: props?.disabled ?? ctx?.disabled,
    readOnly: props?.readOnly ?? ctx?.readOnly,
    status: props?.status ?? ctx?.status,
  };
}

export { FormProvider, useForm, FormItemProvider };
