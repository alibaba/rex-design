import invariant from 'invariant';
import { action, computed, makeObservable, observable } from 'mobx';
import React, { useLayoutEffect } from 'react';
import { keyToValueShape, observableGetIn, observableSetIn, splitToPath } from './utils';

export type ValueShape = 'array' | 'object';

export interface FieldConfig {
  name: string;
  label?: React.ReactNode;
  validate?: (value: any) => any;
  required?: boolean;
  defaultValue?: any;
  isEmpty(value: any): boolean;

  // TODO 还有什么其他字段可以加的吗？
  //  requiredMessage?
}

export interface IModel<D = unknown> {
  // model navigation
  readonly root: RootModel;
  readonly path: string[];
  readonly parent: IModel;
  readonly valueShape: ValueShape;

  /** model 级别的状态 */
  state: any;

  // value manipulation
  values: D;

  getValue<V>(name: string, defaultValue?: V): V;

  setValue<V>(name: string, value: V): void;

  getSubModel(name: string): Model;

  getSubArray(name: string): Model<unknown[]>;

  getField(name: string): Field;

  // internals
  readonly _proxy: SubModelProxy;

  _asField(): Field;
}

export class SubModelProxy {
  readonly model: IModel;
  readonly valueShape: ValueShape;

  readonly fieldMap = new Map<string, Field>();
  readonly subModels: { [key: string]: Model };

  constructor(model: IModel, valueShape: ValueShape) {
    this.model = model;
    this.valueShape = valueShape;
    this.subModels = valueShape === 'array' ? ([] as any) : {};
  }

  /** 递归前序遍历该 proxy 下（不包含 proxy 本身）所有存在的 model 对象 */
  iterateModels(iteratee: (mod: Model) => void) {
    const dfs = (proxy: SubModelProxy) => {
      Object.values(proxy.subModels).forEach((mod) => {
        iteratee(mod);
        dfs(mod._proxy);
      });
    };

    dfs(this);
  }

  /** 递归遍历该 proxy 下（包括 proxy 本身）所有存在的 field 对象 */
  iterateFields(iteratee: (fd: Field) => void) {
    this.fieldMap.forEach(iteratee);
    this.iterateModels((mod) => {
      mod._proxy.fieldMap.forEach(iteratee);
    });
  }

  getSubModel(longName: string | string[], valueShape: ValueShape = 'object'): Model {
    const path = Array.isArray(longName) ? longName : splitToPath(longName);
    let result = this.model;
    for (let i = 0; i < path.length - 1; i++) {
      result = result._proxy._getSubModel(path[i], keyToValueShape(path[i + 1]));
    }
    return result._proxy._getSubModel(path[path.length - 1], valueShape);
  }

  _getSubModel(name: string, valueShape: ValueShape = 'object'): Model {
    invariant(!name.includes('.'), 'name 中不能包含 .');

    let subModel = this.subModels[name];

    if (subModel == null) {
      subModel = new Model(this.model, name, valueShape);
      this.subModels[name] = subModel;
    }

    return subModel;
  }

  getField(longName: string | string[]): Field {
    const path = Array.isArray(longName) ? longName : splitToPath(longName);

    if (path.length > 1) {
      const subModel = this.getSubModel(path[0], keyToValueShape(path[1]));
      return subModel.getField(path.slice(1));
    }

    const name = path[0];

    let field = this.fieldMap.get(name);
    if (field == null) {
      field = new Field(this.model, name);
      this.fieldMap.set(name, field);
    }

    return field;
  }
}

const EMPTY_PATH = [] as string[];

export class RootModel<D = unknown> implements IModel<D> {
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
  public readonly parent = this;
  public readonly path = EMPTY_PATH;
  public readonly valueShape: ValueShape = 'object';

  readonly _proxy: SubModelProxy = new SubModelProxy(this, 'object');

  constructor(values: D = {} as any) {
    this.values = values;

    makeObservable(this, {
      values: observable,
      state: observable,
      setValue: action,
    });
  }

  getValue(name: string, defaultValue?: any) {
    return observableGetIn(this.values, name, defaultValue);
  }

  setValue(name: string, value: any) {
    observableSetIn(this.values, name, value);
  }

  getSubModel(name: string | string[]): Model {
    return this._proxy.getSubModel(name, 'object');
  }

  getSubArray(name: string | string[]): Model<unknown[]> {
    return this._proxy.getSubModel(name, 'array') as Model<unknown[]>;
  }

  getField(name: string): Field {
    return this._proxy.getField(name);
  }

  _asField(): never {
    throw new Error('RootModel 下不支持使用 name=& 的 Field');
  }
}

export class Model<D = unknown> implements IModel<D> {
  readonly root: RootModel;
  readonly parent: IModel;
  public state = {};

  readonly id: string;
  public name: string;
  readonly valueShape: ValueShape;
  readonly _proxy: SubModelProxy;

  constructor(parent: IModel, name: string, valueShape: ValueShape) {
    invariant(!name.includes('.'), 'name 中不能包含 .');

    this.root = parent.root;
    this.parent = parent;
    this.name = name;
    this.valueShape = valueShape;
    this._proxy = new SubModelProxy(this, valueShape);
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

  getSubModel(name: string | string[]): Model {
    return this._proxy.getSubModel(name, 'object');
  }

  getSubArray(name: string): Model<unknown[]> {
    return this._proxy.getSubModel(name, 'array') as Model<unknown[]>;
  }

  get values() {
    return this.parent.getValue(this.name) as D;
  }

  set values(nextValues: D) {
    this.parent.setValue(this.name, nextValues);
  }

  getField(name: string | string[]): Field {
    return this._proxy.getField(name);
  }

  getValue(name: string, defaultValue?: any): any {
    return observableGetIn(this.values, name, defaultValue);
  }

  setValue<V>(name: string, value: V): void {
    if (this.values == null) {
      this.values = (this.valueShape === 'array' ? [] : {}) as D;
    }
    observableSetIn(this.values, name, value);
  }

  _asField() {
    return this.parent.getField(this.name);
  }
}

// TODO type parameter V & STATE
export class Field {
  /** 字段配置的最新缓存（注意不要修改该值）*/
  config?: FieldConfig = null;

  /** 字段在视图中的渲染数量（注意不要修改该值） */
  mountCount = 0;

  readonly parent: IModel;
  readonly name: string;
  readonly id: string;

  state: any = {};

  get value() {
    return this.parent.getValue(this.name);
  }

  set value(v: any) {
    this.parent.setValue(this.name, v);
  }

  get path() {
    return this.parent.path.concat([this.name]);
  }

  constructor(parent: IModel, name: string) {
    this.parent = parent;
    this.name = name;
    this.id = this.parent.root.getNextFieldId();

    makeObservable(
      this,
      {
        state: observable,
        name: observable.ref,
        value: computed,
        path: computed,
        config: false,
        mountCount: false,
      },
      { name: `${this.id}(${this.name})` },
    );
  }

  _useTrack(config: FieldConfig) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      this.config = config;
      this.mountCount += 1;

      return () => {
        this.config = null;
        this.mountCount -= 1;
      };
    }, [config]);
  }
}
