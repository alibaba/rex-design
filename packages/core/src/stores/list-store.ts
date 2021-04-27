import { ListNode } from '../types';

/**
 * 列表数据管理
 */
export class ListStore<T> {
  private keyMap: Map<T, ListNode<T>> = new Map();
  private iterable: Iterable<ListNode<T>>;

  constructor(nodes: Iterable<ListNode<T>>) {
    this.iterable = nodes;

    const visit = (node: ListNode<T>) => {
      this.keyMap.set(node.value, node);

      if (node.children) {
        for (const child of node.children) {
          visit(child);
        }
      }
    };

    for (const node of nodes) {
      visit(node);
    }
  }

  *[Symbol.iterator]() {
    yield* this.iterable;
  }

  get size() {
    return this.keyMap.size;
  }

  getKeys() {
    return this.keyMap.keys();
  }

  getItem(value: T) {
    return this.keyMap.get(value);
  }
}
