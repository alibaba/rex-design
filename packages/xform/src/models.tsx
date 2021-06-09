import invariant from 'invariant';
import { action, computed, makeObservable, observable } from 'mobx';
import React, { useLayoutEffect } from 'react';
import { composeState, keyToValueShape, observableGetIn, observableSetIn, splitToPath } from './common-utils';

type valueOf<T> = T[keyof T];

export type DottedObjectKeyPath<D> = D extends any[]
  ? never
  : D extends object
  ? valueOf<{ [K in keyof D & string]: `${K}` | `${K}.${DottedObjectKeyPath<D[K]>}` }>
  : never;

type XName<D> = D extends any[] ? number : DottedObjectKeyPath<D>;

type ResolveXName<D, Path extends string | number> =
  // 只有 Path 为 any 的情况下这个判断才会成立
  // 这里这么做是为了将 any 传染出去，不然会变成「any 进来，unknown 出去」
  0 extends Path & 1
    ? any
    : string extends Path
    ? unknown
    : Path extends number
    ? D extends Array<infer U>
      ? U
      : unknown
    : Path extends keyof D
    ? D[Path]
    : Path extends `${infer K}.${infer R}`
    ? K extends keyof D
      ? ResolveXName<D[K], R>
      : unknown
    : unknown;

export type ValueShape = 'array' | 'object';

export type FieldValidateTrigger = '*' | 'blur' | 'change' | 'mount';

export interface FieldConfig<D = unknown> {
  label: React.ReactNode;
  help?: React.ReactNode;
  tip?: React.ReactNode;
  asterisk?: boolean;

  fallbackValue?: any;
  isEmpty?(value: any): boolean;
  required?: boolean;
  requiredMessage?: string;

  validate?(value: any, field: Field<D>, trigger: FieldValidateTrigger): string | Promise<any>;
  validateOnMount?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;

  disabled?: boolean;
  readOnly?: boolean;
  status?: string;

  // 其他更多字段由上层自定义（TS 层面可以使用 interface merge）
}

export interface IModel<D = unknown> {
  // model navigation
  readonly root: FormModel;
  readonly path: string[];
  readonly parent: IModel;

  /** model 级别的状态 */
  state: any;

  // value manipulation
  values: D;

  getValue<N extends XName<D>>(name: N, defaultValue?: ResolveXName<D, N>): ResolveXName<D, N>;

  setValue<N extends XName<D>>(name: N, value: ResolveXName<D, N>): void;

  getSubModel<N extends XName<D>>(name: N): SubModel<ResolveXName<D, N>>;

  getField<N extends XName<D>>(name: N): Field<ResolveXName<D, N>>;

  getTupleField<NS extends (keyof D & string)[]>(
    ...tupleParts: NS
  ): Field<{ [Index in keyof NS]: NS[Index] extends keyof D ? D[NS[Index]] : never }>;

  // internals
  readonly _proxy: SubModelProxy;

  _asField(): Field<D>;
}

export class SubModelProxy<D = unknown> {
  readonly model: IModel<D>;
  readonly fieldMap = new Map<string, Field>();

  valueShape: 'auto' | ValueShape;
  subModels: { [key: string]: SubModel };

  constructor(model: IModel<D>) {
    this.model = model;
    this.valueShape = 'auto';
  }

  _updateValueShape(valueShape: 'array' | 'object') {
    if (this.valueShape === 'auto') {
      this.valueShape = valueShape;
      this.subModels = valueShape === 'object' ? {} : ([] as any);
    } else {
      invariant(
        this.valueShape === valueShape,
        '[xform] Model 的结构需要在使用过程中保持一致，一个数据索引对应的结构不能从数组变为对象，也不能从对象变为数组',
      );
    }
  }

  /** 递归前序遍历该 proxy 下（不包含 proxy 本身）所有存在的 model 对象 */
  iterateModels(iteratee: (mod: SubModel) => void) {
    const dfs = (proxy: SubModelProxy) => {
      if (proxy.subModels != null) {
        for (const mod of Object.values(proxy.subModels)) {
          iteratee(mod);
          dfs(mod._proxy);
        }
      }
    };

    dfs(this);
  }

  /** 递归遍历该 proxy 下（包括 proxy 本身）所有存在的 field 对象（包括 fork field） */
  iterateFields(iteratee: (fd: Field) => void) {
    this.fieldMap.forEach((fd) => {
      fd._forkMap.forEach(iteratee);
    });
    this.iterateModels((mod) => {
      mod._proxy.fieldMap.forEach((fd) => {
        fd._forkMap.forEach(iteratee);
      });
    });
  }

  getSubModel(longName: string | string[]): SubModel<any> {
    const path = Array.isArray(longName) ? longName : splitToPath(longName);
    let mod: IModel = this.model;
    for (let i = 0; i < path.length - 1; i++) {
      mod = mod._proxy._getSubModel(path[i]);
    }
    return mod._proxy._getSubModel(path[path.length - 1]);
  }

  _getSubModel(name: string): SubModel<any> {
    this._updateValueShape(keyToValueShape(name));

    let subModel = this.subModels[name];

    if (subModel == null) {
      subModel = new SubModel(this.model, name);
      this.subModels[name] = subModel;
    }

    return subModel;
  }

  getField(longName: string | string[]): Field<any> {
    const path = Array.isArray(longName) ? longName : splitToPath(longName);

    if (path.length > 1) {
      const lastName = path[path.length - 1];
      const subModel = this.getSubModel(path.slice(0, -1));
      return subModel._proxy.getField([lastName]);
    }

    const name = path[0];
    this._updateValueShape(keyToValueShape(name));

    return this.ensureField(name);
  }

  ensureField(name: string, forkName?: string, tupleParts?: string[]): Field<any> {
    let field = this.fieldMap.get(name);
    if (field == null) {
      field = new Field(this.model, name, forkName, tupleParts);
      this.fieldMap.set(name, field);
    }

    return field;
  }

  getTupleField(...tupleParts: any[]): Field<any> {
    this._updateValueShape('object');
    const name = tupleParts.join('...');
    return this.ensureField(name, Field.ORIGINAL, tupleParts);
  }
}

const EMPTY_PATH = [] as string[];

export class FormModel<D extends { [key: string]: any } = unknown> implements IModel<D> {
  private _nextModelId = 1;
  getNextModelId() {
    return `Model_${this._nextModelId++}`;
  }

  private _nextFieldId = 1;
  getNextFieldId() {
    return `Field_${this._nextFieldId++}`;
  }

  public values: D;
  public state: any = {};
  public readonly root = this;
  public readonly parent = this as IModel<any>;
  public readonly path = EMPTY_PATH;

  readonly _proxy: SubModelProxy<D> = new SubModelProxy(this);

  constructor(values: D = {} as any) {
    this.values = values;

    makeObservable(this, {
      values: observable,
      state: observable,
      setValue: action,
    });
  }

  getValue<N extends XName<D>>(name: N, defaultValue?: ResolveXName<D, N>): ResolveXName<D, N> {
    return observableGetIn(this.values, String(name), defaultValue);
  }

  setValue<N extends XName<D>>(name: N, value: ResolveXName<D, N>) {
    observableSetIn(this.values, name, value);
  }

  getSubModel<N extends XName<D>>(name: N): SubModel<ResolveXName<D, N>> {
    return this._proxy.getSubModel(String(name));
  }

  getField<N extends XName<D>>(name: N): Field<ResolveXName<D, N>> {
    return this._proxy.getField(name);
  }

  getTupleField<NS extends (keyof D & string)[]>(
    ...tupleParts: NS
  ): Field<{ [Index in keyof NS]: NS[Index] extends keyof D ? D[NS[Index]] : never }> {
    return this._proxy.getTupleField(...tupleParts);
  }

  _asField(): never {
    throw new Error('FormModel 下不支持使用 name=& 的 Field');
  }
}

export class SubModel<D = unknown> implements IModel<D> {
  readonly root: FormModel<any>;
  readonly parent: IModel<any>;
  public state = {};

  readonly id: string;
  public name: string;
  readonly _proxy: SubModelProxy<D>;

  constructor(parent: IModel, name: string) {
    invariant(!name.includes('.'), 'name 中不能包含 .');

    this.root = parent.root;
    this.parent = parent;
    this.name = name;
    this._proxy = new SubModelProxy<D>(this);
    this.id = this.root.getNextModelId();

    makeObservable(
      this,
      {
        values: computed,
        state: observable,
        setValue: action,
        // 注意 name 是可以变化的；在数组元素调换位置的情况下 name 会进行变更
        name: observable,
      },
      { name: `${this.id}(${this.name})` },
    );
  }

  get path(): string[] {
    return [...this.parent.path, this.name];
  }

  getSubModel<N extends XName<D>>(name: N): SubModel<ResolveXName<D, N>> {
    return this._proxy.getSubModel(String(name));
  }

  getField<N extends XName<D>>(name: N): Field<ResolveXName<D, N>> {
    return this._proxy.getField(String(name));
  }

  getTupleField<NS extends (keyof D & string)[]>(
    ...tupleParts: NS
  ): Field<{ [Index in keyof NS]: NS[Index] extends keyof D ? D[NS[Index]] : never }> {
    return this._proxy.getTupleField(...tupleParts);
  }

  get values() {
    return this.parent.getValue(this.name) as D;
  }

  set values(nextValues: D) {
    this.parent.setValue(this.name, nextValues);
  }

  getValue<N extends XName<D>>(name: N, defaultValue?: ResolveXName<D, N>): ResolveXName<D, N> {
    return observableGetIn(this.values, String(name), defaultValue);
  }

  setValue<N extends XName<D>>(name: N, value: ResolveXName<D, N>): void {
    if (this.values == null) {
      this._proxy._updateValueShape(keyToValueShape(splitToPath(String(name))[0]));
      this.values = (this._proxy.valueShape === 'array' ? [] : {}) as D;
    }
    observableSetIn(this.values, String(name), value);
  }

  _asField() {
    return this.parent.getField(this.name) as Field<D>;
  }
}

export interface FieldState {
  error?: any;
  validating?: boolean;
  cancelValidation?(): void;

  [key: string]: any;
}

export class Field<V = unknown> {
  static ORIGINAL = 'original';

  /** 字段配置的最新缓存（注意不要修改该值）*/
  config?: FieldConfig<V> = null;

  /** 字段是否在视图中被渲染 */
  isMounted = false;

  readonly parent: IModel<any>;
  readonly name: string;
  readonly forkName: string;
  readonly tupleParts: string[];
  readonly id: string;
  readonly _forkMap: Map<string, Field>;

  state: FieldState = {};

  get value(): V {
    if (this.tupleParts) {
      return this.tupleParts.map((part) => this.parent.getValue(part)) as any;
    }
    return this.parent.getValue(this.name) as any;
  }

  set value(value: V) {
    if (this.tupleParts) {
      this.tupleParts.forEach((part, index) => {
        this.parent.setValue(part, value[index]);
      });
      return;
    }

    this.parent.setValue(this.name, value);
  }

  get path() {
    return this.parent.path.concat([this.name]);
  }

  constructor(parent: IModel, name: string, forkName = Field.ORIGINAL, tupleParts?: string[]) {
    this.parent = parent;
    this.name = name;
    this.forkName = forkName;
    this.tupleParts = tupleParts;
    this.id = this.parent.root.getNextFieldId();

    makeObservable(
      this,
      {
        state: observable,
        value: computed,
        path: computed,
        validate: action,
        handleBlur: action,
        handleChange: action,
      },
      { name: `${this.id}(${name}${forkName === Field.ORIGINAL ? '' : '#' + forkName})` },
    );

    if (forkName === Field.ORIGINAL) {
      this._forkMap = new Map();
    } else {
      const original = this.parent.getField(name);
      this._forkMap = original._forkMap;
    }
    this._forkMap.set(forkName, this);
  }

  _useTrack(config: FieldConfig<V>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (this.isMounted) {
        console.warn(`[xform] field \`${this.path.join('.')}\` 已在视图中被加载，你需要 fork 该字段来进行多次加载.`);
        return;
      }

      this.config = config;
      this.isMounted = true;

      return () => {
        this.config = null;
        this.isMounted = false;
      };
    }, [config]);
  }

  getFork(forkName: string): Field<V> {
    if (this._forkMap.has(forkName)) {
      return this._forkMap.get(forkName) as Field<V>;
    } else {
      return new Field<V>(this.parent, this.name, forkName, this.tupleParts);
    }
  }

  async validate(trigger: FieldValidateTrigger = '*') {
    if (!this.isMounted) {
      return;
    }

    const {
      validate,
      fallbackValue,
      isEmpty,
      required,
      requiredMessage = '该字段为必填项',
      validateOnMount,
      validateOnBlur,
      validateOnChange,
    } = this.config;

    const value = composeState(this.value, fallbackValue);

    const needValidate =
      trigger === '*' ||
      (validateOnBlur && trigger === 'blur') ||
      (validateOnMount && trigger === 'mount') ||
      (validateOnChange && trigger === 'change');

    if (!needValidate) {
      return;
    }

    const actualValidate = async () => {
      if (required && isEmpty(value)) {
        return requiredMessage;
      }
      if (validate) {
        return validate(value, this, trigger);
      }
      return null;
    };

    let cancelled = false;
    this.state.cancelValidation?.();
    this.state.validating = true;
    this.state.cancelValidation = action(() => {
      cancelled = true;
      this.state.cancelValidation = null;
      this.state.validating = false;
    });

    return actualValidate().then(
      action((error) => {
        if (cancelled) {
          return;
        }
        this.state.cancelValidation = null;
        this.state.validating = false;
        this.state.error = error;
        return error;
      }),
    );
  }

  handleBlur = () => {
    return this.validate('blur');
  };

  handleChange = (nextValue: any) => {
    this.value = composeState(nextValue, this.config?.fallbackValue);
    return this.validate('change');
  };
}
