import { action, observable, toJS } from 'mobx';
import React from 'react';
import { Field, IModel } from './core';
import { composeState, observableSetIn } from './core/utils';

export const fieldUtils = {
  validate: action((field: Field) => {
    if (field.config == null) {
      return;
    }
    const { validate, required, defaultValue, isEmpty } = field.config;
    const value = field.value;
    let error;

    if (required && isEmpty(value)) {
      error = '该字段是必填字段';
    } else {
      error = validate?.(composeState(value, defaultValue));
    }
    field.state.error = error;

    return error;
  }),

  handleBlur(field: Field) {
    fieldUtils.validate(field);
  },

  handleChange: action((field: Field, nextValue: any) => {
    field.value = nextValue;
    fieldUtils.validate(field);
  }),
};

export const modelUtils = {
  clearError: action((model: IModel) => {
    model._proxy.iterateFields((field) => {
      field.state.error = null;
    });
  }),

  validateAll: action((model: IModel) => {
    const errors: any = observable(model.valueShape === 'array' ? [] : {});

    let hasError = false;

    model._proxy.iterateFields((field) => {
      if (field.mountCount === 0) {
        return;
      }
      const error = fieldUtils.validate(field);
      if (error) {
        hasError = true;
        observableSetIn(errors, field.path, error);
      }
    });

    return { hasError, errors: toJS(errors) };
  }),
};
