import { set, get, cloneDeep } from 'lodash';

export default class TokenStore {
  namespace: string;
  model: any;

  constructor(namespace: string, model: any) {
    const exist = window.localStorage.getItem(namespace);

    this.namespace = namespace;
    this.model = exist ? JSON.parse(exist) : cloneDeep(model);
  }

  clear() {
    window.localStorage.removeItem(this.namespace);
  }

  sync() {
    window.localStorage.setItem(this.namespace, JSON.stringify(this.model));
  }

  set(path: string, value: string) {
    set(this.model, path, value);
  }

  get(path: string) {
    get(this.model, path);
  }

  getModel() {
    return this.model;
  }

  toString() {
    return JSON.stringify(this.model);
  }
}
