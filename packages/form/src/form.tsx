import React from 'react';
import { FormLayout, noop } from '@rexd/core';
import { FormProvider } from './context';
import { Field } from './field';
import { FieldOption } from '@alifd/field';

export interface FormProps {
  field?: Field;
  fieldOptions?: FieldOption;
  onReset?: any;
  onSubmit?: any;
  onError?: any;
  /**
   * 是否预览态
   */
  isPreview?: boolean;
  children?: React.ReactNode;
}

export function Form(props: FormProps) {
  const { field, fieldOptions, isPreview, onReset = noop, onSubmit = noop, onError = noop, children, ...rest } = props;
  const defaultField = Field.useField(fieldOptions);

  const form = {
    field: field ?? defaultField,
    onReset,
    onSubmit,
    onError,
    isPreview,
  };

  return (
    <FormProvider value={form}>
      <FormLayout {...rest}>{children}</FormLayout>
    </FormProvider>
  );
}
