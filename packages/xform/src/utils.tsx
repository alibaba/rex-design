import { action, observable, toJS } from 'mobx';
import React from 'react';
import { Field, IModel } from './core';
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
    let error;

    if (required && isEmpty(value)) {
      error = requiredMessage;
    } else {
      // TODO 异步校验
      const val = composeState(value, defaultValue);
      if (error == null && (trigger === '*' || trigger === 'change')) {
        error = changeValidator?.(val);
      }
      if (error == null && (trigger === '*' || trigger === 'blur')) {
        error = blurValidator?.(val);
      }
      if (error == null) {
        error = validator?.(val);
      }
    }
    field.state.error = error;

    return error;
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
    const errors: any = observable(model.valueShape === 'array' ? [] : {});

    let hasError = false;

    model._proxy.iterateFields((field) => {
      if (field.mountCount === 0) {
        return;
      }
      // TODO 异步校验
      const error = fieldUtils.validate(field, trigger);
      if (error) {
        hasError = true;
        observableSetIn(errors, field.path, error);
      }
    });

    return { hasError, errors: toJS(errors) };
  }),
};
