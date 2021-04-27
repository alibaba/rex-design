import React from 'react';
import { FormControl, FormControlProps, Button, ButtonProps, Group } from '@rexd/core';
import { FormValidateStatusType } from '@rexd/core/src/types';
import { getComponent } from './components';
import { FormItemProvider, useForm } from './context';
import { getFieldRules, getInitialValueByComponentName } from './utils';
import { FormItemComponentType } from './types';

export interface FormItemProps extends FormControlProps {
  name?: string;
  defaultValue?: any;
  dataSource?: any[];
  component?: FormItemComponentType;
  componentProps?: any;
  isPreview?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

export function FormItem(props: FormItemProps) {
  const {
    name,
    defaultValue,
    dataSource,
    isPreview: isPreviewProp,
    isInline = false,
    required,
    readOnly,
    disabled,
    component,
    componentProps,
    children,
    ...rest
  } = props;

  const form = useForm();

  const sharedProps = {
    isPreview: isPreviewProp ?? form?.isPreview,
    required,
    ...componentProps,
  };

  if (dataSource) {
    sharedProps.dataSource = dataSource;
  }

  let passedProps;

  const isInternalComponent = typeof component === 'string';
  if (name && form.field) {
    const initialValue = isInternalComponent ? getInitialValueByComponentName(component) : '';

    passedProps = form.field.init(
      name,
      {
        initValue: defaultValue ?? initialValue,
        rules: getFieldRules(props),
      },
      sharedProps,
    );
  } else {
    passedProps = {
      defaultValue,
      ...sharedProps,
    };
  }

  const Control = isInternalComponent ? getComponent(component) : component;
  const error = form ? form.field.getError(name) : '';
  const status = error ? 'error' : undefined;
  const context = {
    status: status as FormValidateStatusType,
    readOnly,
    disabled,
  };

  return (
    <FormItemProvider value={context}>
      <FormControl error={error} required={required} isInline={isInline} {...context} {...rest}>
        {Control && <Control {...passedProps} />}
        {children}
      </FormControl>
    </FormItemProvider>
  );
}

export function FormButtonGroup(props: FormItemProps) {
  const { children, ...rest } = props;
  return (
    <FormControl {...rest}>
      <Group>{children}</Group>
    </FormControl>
  );
}

export function Submit(props: ButtonProps) {
  const { onClick, children = '提交', ...rest } = props;

  const form = useForm();

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (form && form.field) {
      form.field.validate((errors: any, values: any) => {
        if (errors && typeof form.onError === 'function') {
          form.onError(errors);
        }
        if (typeof form.onSubmit === 'function') {
          form.onSubmit(values);
        }
      });
    }
    onClick && onClick(e);
  };

  return (
    <Button type="primary" onClick={submit} {...rest}>
      {children}
    </Button>
  );
}

export function Reset(props: ButtonProps) {
  const { onClick, children = '重置', ...rest } = props;
  const form = useForm();
  const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (form && form.field) {
      form.field.reset();
      if (typeof form.onReset === 'function') {
        form.onReset();
      }
    }
    onClick && onClick(e);
  };

  return (
    <Button onClick={reset} {...rest}>
      {children}
    </Button>
  );
}
