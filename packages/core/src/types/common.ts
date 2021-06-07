import React, { ChangeEvent } from 'react';

/** @deprecated */
export type HippoKey = string | number;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type AnyFunction<T = any> = (...args: T[]) => any;

export type FunctionArguments<T extends Function> = T extends (...args: infer R) => any ? R : never;

export type Dict<T = any> = Record<string, T>;

export type StringOrNumber = string | number;

export type EventOrValue = ChangeEvent<HTMLInputElement> | StringOrNumber;

export type Length = string | 0 | number;

export type FormValidateStatusType = 'error' | 'success';

export interface FormEventDetail {
  event?: any;
  data?: any;
  reason?: string;
  [key: string]: any;
}

export type FormControlOnChangeHandler<T> = (nextValue: T, detail?: FormEventDetail) => void;

export interface ListNode<T> {
  key?: React.Key; // 节点的唯一标识符, key, value 同时存在时，值必须相同
  value?: T; // 代表节点项的值
  label?: React.ReactNode; // 节点的描述标签
  children?: Iterable<ListNode<T>>; // 节点的嵌套值
  props?: any; // 节点的嵌套属性
}
