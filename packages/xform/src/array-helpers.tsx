import invariant from 'invariant';
import { action } from 'mobx';
import React from 'react';
import { Form } from './form';
import { IModel, SubModel, SubModelProxy } from './models';

function updateSubModelsNames(proxy: SubModelProxy) {
  ((proxy.subModels as unknown) as SubModel[]).forEach((mod, index) => {
    mod.name = String(index);
  });
}

function reorderInPlace<T>(list: T[], fromIndex: number, toIndex: number) {
  if (list == null) {
    return;
  }
  const [movingItem] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, movingItem);
}

function swapInPlace<T>(values: T[], a: number, b: number) {
  if (values == null) {
    return;
  }
  const temp = values[a];
  values[a] = values[b];
  values[b] = temp;
}

export const arrayHelpers = {
  append: action((arrayModel: SubModel<unknown[]>, itemFactory?: (arrayModel: SubModel<unknown[]>) => any) => {
    if (arrayModel.values == null) {
      arrayModel.values = [];
    }
    arrayModel.values.push(itemFactory?.(arrayModel) ?? {});
  }),

  delete: action((arrayModel: SubModel<unknown[]>, itemIndex: number) => {
    invariant(Array.isArray(arrayModel._proxy.subModels), 'arrayModel.subModels should be Array or observable.array');
    arrayModel.values.splice(itemIndex, 1);
    arrayModel._proxy.subModels.splice(itemIndex, 1);
    updateSubModelsNames(arrayModel._proxy);
  }),

  moveUp: action((arrayModel: SubModel<unknown[]>, itemIndex: number) => {
    if (itemIndex === 0) {
      return;
    }

    invariant(Array.isArray(arrayModel._proxy.subModels), 'arrayModel.subModels should be Array or observable.array');
    swapInPlace(arrayModel.values, itemIndex, itemIndex - 1);
    swapInPlace(arrayModel._proxy.subModels, itemIndex, itemIndex - 1);
    updateSubModelsNames(arrayModel._proxy);
  }),

  moveDown: action((arrayModel: SubModel<unknown[]>, itemIndex: number) => {
    if (itemIndex === arrayModel.values.length - 1) {
      return;
    }

    invariant(Array.isArray(arrayModel._proxy.subModels), 'arrayModel.subModels should be Array or observable.array');
    swapInPlace(arrayModel.values, itemIndex, itemIndex + 1);
    swapInPlace(arrayModel._proxy.subModels, itemIndex, itemIndex + 1);
    updateSubModelsNames(arrayModel._proxy);
  }),

  clear: action((arrayModel: SubModel<unknown[]>) => {
    if (arrayModel.values == null || arrayModel.values.length === 0) {
      return;
    }
    invariant(Array.isArray(arrayModel._proxy.subModels), 'arrayModel.subModels should be Array or observable.array');
    arrayModel.values = [];
    arrayModel._proxy.subModels.length = 0;
  }),

  dragAndDrop: action((arrayModel: SubModel<unknown[]>, fromIndex: number, toIndex: number) => {
    invariant(Array.isArray(arrayModel._proxy.subModels), 'arrayModel.subModels should be Array or observable.array');
    reorderInPlace(arrayModel.values, fromIndex, toIndex);
    reorderInPlace(arrayModel._proxy.subModels, fromIndex, toIndex);
    updateSubModelsNames(arrayModel._proxy);
  }),

  renderArrayItem(arrayModel: IModel<unknown[]>, itemIndex: number, itemContent: React.ReactNode) {
    return <Form.Object name={String(itemIndex)}>{itemContent}</Form.Object>;
  },

  getKey<T>(arrayModel: IModel<T[]>, itemIndex: number) {
    return arrayModel.getSubModel(itemIndex).id;
  },
};
