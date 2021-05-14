import { action, observable, toJS } from 'mobx';
import React from 'react';
import { Field, FormEnvContextType, FormModel, IModel } from './core';
import { composeState, observableSetIn } from './core/utils';

export const fieldUtils = {
  validate: action((field: Field, trigger: '*' | 'blur' | 'change' = '*') => {
    if (field.config == null) {
      return;
    }

    const {
      validator,
      required,
      defaultValue,
      isEmpty,
      requiredMessage = '该字段为必填项',
      blurValidator,
      changeValidator,
    } = field.config;
    const value = field.value;

    if (required && isEmpty(value)) {
      field.state.error = requiredMessage;
      field.state.cancelValidation?.();
      field.state.cancelValidation = null;
      return Promise.resolve(requiredMessage);
    }

    const val = composeState(value, defaultValue);
    const checks = [
      (trigger === '*' || trigger === 'change') && changeValidator?.(val, field),
      (trigger === '*' || trigger === 'blur') && blurValidator?.(val, field),
      validator?.(val, field),
    ].filter(Boolean);

    let cancelled = false;
    field.state.cancelValidation?.();
    field.state.validating = true;
    field.state.cancelValidation = () => {
      field.state.validating = false;
      cancelled = true;
    };

    return Promise.all(checks).then(
      action((errors) => {
        if (cancelled) {
          return;
        }
        field.state.cancelValidation = null;
        field.state.validating = false;
        // 只考虑第一个错误信息
        const error = errors.filter(Boolean)[0];
        field.state.error = error;
        return error;
      }),
    );
  }),

  handleBlur(field: Field) {
    fieldUtils.validate(field, 'blur');
  },

  handleChange: action((field: Field, nextValue: any) => {
    field.value = nextValue;
    fieldUtils.validate(field, 'change');
  }),
};

export const modelUtils = {
  clearError: action((model: IModel) => {
    model._proxy.iterateFields((field) => {
      field.state.error = null;
    });
  }),

  validateAll: action((model: IModel, trigger: '*' | 'blur' | 'change' = '*') => {
    let hasError = false;
    const errors: any = observable(model.valueShape === 'array' ? [] : {});

    const promises: Promise<unknown>[] = [];

    model._proxy.iterateFields((field) => {
      if (field.mountCount === 0) {
        return;
      }
      promises.push(
        fieldUtils.validate(field, trigger).then(
          action((error) => {
            if (error) {
              hasError = true;
              observableSetIn(errors, field.path, error);
            }
          }),
        ),
      );
    });

    return Promise.all(promises).then(() => ({ hasError, errors: toJS(errors) }));
  }),

  submit: action(
    (
      root: FormModel,
      valueFilter: 'mounted' | 'all',
      { onError, onSubmit }: Pick<FormEnvContextType, 'onSubmit' | 'onError'>,
    ) => {
      modelUtils.validateAll(root).then(
        action(({ hasError, errors }) => {
          if (hasError) {
            onError?.(errors, root);
          } else if (typeof onSubmit === 'function') {
            if (valueFilter === 'all') {
              onSubmit(toJS(root.values), root);
            } else {
              const mountedValues: any = observable(root.valueShape === 'array' ? [] : {});

              root._proxy.iterateFields((field) => {
                if (field.mountCount === 0) {
                  return;
                }

                const { path, value } = field;
                observableSetIn(mountedValues, path, value);
              });

              onSubmit(toJS(mountedValues), root);
            }
          }
        }),
      );
    },
  ),

  reset: action((root: FormModel, { onReset }: Pick<FormEnvContextType, 'onReset'>) => {
    root.values = {};
    modelUtils.clearError(root);
    onReset?.(root);
  }),
};
