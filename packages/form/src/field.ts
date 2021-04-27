import { cloneElement, isValidElement, useMemo, useState } from 'react';
import NextField from '@alifd/field';
import { noop } from '@rexd/core';

function cloneAndAddKey(element: any) {
  if (element && isValidElement(element)) {
    const key = element.key || 'error';
    return cloneElement(element, { key });
  }
  return element;
}

type FieldNamesType = string | string[];

type FieldValidateCallbackType = (errors: any[], values: any[]) => void;

export class Field extends NextField {
  static useField(options?: any) {
    return this.getUseField({ useMemo, useState })({
      ...options,
    });
  }

  constructor(comp: any, options: any) {
    super(comp, {
      processErrorMessage: cloneAndAddKey,
      afterValidateRerender: noop,
      ...options,
    });
    this.validate = this.validate.bind(this);
  }

  validate(ns?: FieldNamesType | FieldValidateCallbackType, cb?: FieldValidateCallbackType) {
    this.validateCallback(ns as any, cb as any);
  }

  /**
   * alifd/field 将值重设为 undefined，这对于 react 的受控逻辑是存在问题的（controlled to uncontrolled 问题)，因此这里统一的 reset 为默认值
   * @param ns 重置的 name 列表
   */
  reset(ns?: FieldNamesType) {
    this.resetToDefault(ns);
  }
}
