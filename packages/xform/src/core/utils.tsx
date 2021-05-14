import invariant from 'invariant';
import { action } from 'mobx';
import * as mobx from 'mobx';
import React from 'react';
import { XFormObject } from './components';
import type { IModel, SubModel } from './models';
import { SubModelProxy } from './models';

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

function isNumericKey(key: string) {
  return String(Number.parseInt(key)) === key;
}

export function keyToValueShape(key: string) {
  return isNumericKey(key) ? 'array' : 'object';
}

/** lodash.get(...) for mobx observables */
export function observableGetIn(obj: any, key: string | string[], defaultValue?: any) {
  const path = Array.isArray(key) ? key : splitToPath(key);

  let target = obj;

  for (let i = 0; i < path.length; i += 1) {
    if (!mobx.isObservable(target)) {
      return defaultValue;
    }
    target = mobx.get(target, path[i]);
  }
  if (target === undefined) {
    return defaultValue;
  }
  return target;
}

/** lodash.set(...) for mobx observables */
export function observableSetIn(obj: unknown, key: string | string[], value: unknown) {
  const path = Array.isArray(key) ? key : splitToPath(key);
  const lastPartIndex = path.length - 1;

  let target = obj;

  for (let i = 0; i < lastPartIndex; i += 1) {
    const part = path[i];
    if (mobx.get(target, part) == null) {
      if (isNumericKey(path[i + 1])) {
        mobx.set(target, part, []);
      } else {
        mobx.set(target, part, {});
      }
    }
    target = mobx.get(target, part);
    if (!mobx.isObservable(target)) {
      return;
    }
  }
  if (mobx.isObservable(target)) {
    mobx.set(target, path[lastPartIndex], value);
  }
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
    return <XFormObject name={String(itemIndex)}>{itemContent}</XFormObject>;
  },

  getKey(arrayModel: IModel<unknown[]>, itemIndex: number) {
    return arrayModel.getSubModel(String(itemIndex)).id;
  },
};

/** 合并受控状态和 非受控状态 */
export function composeState<S>(controlledState: S, uncontrolledState: S) {
  if (controlledState !== undefined) {
    return controlledState;
  }
  return uncontrolledState;
}

export function splitToPath(name: string) {
  // 可以考虑一下 foo.bar[0].buzz 中 [0] 的情况
  return name.split('.');
}
