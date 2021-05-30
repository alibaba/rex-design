import { action, observable, runInAction, toJS } from 'mobx';
import React from 'react';
import { FormEnvContextType } from './form';
import { FieldValidateTrigger, IModel } from './models';
import { observableSetIn } from './common-utils';

type SubmitOptions = Pick<FormEnvContextType, 'onSubmit' | 'onError'> & { valueFilter?: 'mounted' | 'all' };

export const modelUtils = {
  clearError: action(function <T>(model: IModel<T>) {
    model._proxy.iterateFields((field) => {
      field.state.error = null;
    });
  }),

  validateAll: action(function <T>(model: IModel<T>, trigger: FieldValidateTrigger = '*') {
    let hasError = false;
    const errors: any = observable(model._proxy.valueShape === 'array' ? [] : {});

    const promises: Promise<unknown>[] = [];

    model._proxy.iterateFields((field) => {
      if (!field.isMounted) {
        return;
      }
      promises.push(
        field.validate(trigger).then(
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

  submit: action(async function <T>(model: IModel<T>, options: SubmitOptions = {}) {
    const { onError, onSubmit, valueFilter = 'mounted' } = options;

    const { hasError, errors } = await modelUtils.validateAll(model);

    if (hasError) {
      onError?.(errors, model);
    } else if (typeof onSubmit === 'function') {
      if (valueFilter === 'all') {
        onSubmit(toJS(model.values), model);
      } else {
        runInAction(() => {
          const mountedValues: any = observable(model._proxy.valueShape === 'array' ? [] : {});

          model._proxy.iterateFields((field) => {
            if (!field.isMounted) {
              return;
            }

            if (field.value !== undefined) {
              observableSetIn(mountedValues, field.path, field.value);
            }
          });

          onSubmit(toJS(mountedValues), model);
        });
      }
    }
  }),

  reset: action(function <T>(model: IModel<T>, { onReset }: Pick<FormEnvContextType, 'onReset'> = {}) {
    model.values = {} as T;
    modelUtils.clearError(model);
    onReset?.(model);
  }),
};
