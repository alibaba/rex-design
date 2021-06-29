import { collectNodes, makeRecursiveMapper } from 'ali-react-table';
import React, { useState } from 'react';
import { composeHandlers, composeState } from '../../utils';
import StrictTreeDataHelper from './utils/StrictTreeDataHelper';
import TreeDataHelper, { TreeCheckedStrategy } from './utils/TreeDataHelper';
import { TreeItem, TreeView, TreeViewProps } from './tree-view';

export interface TreeProps extends Partial<TreeViewProps> {
  /** 数据源，每个元素的结构为 { key, label, children } */
  dataSource: TreeItem[];

  /** 非受控用法，是否默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 非受控用法，默认展开的节点的 key 数组 */
  defaultExpandedKeys?: string[];

  /** 非受控用法，默认选中的节点的 key 数组 */
  defaultSelectedKeys?: string[];

  /** 是否开启复选 */
  checkable?: boolean;

  /** 非受控用法，默认选中的节点 */
  defaultCheckedKeys?: string[];

  /** 下拉框中的树勾选节点复选框是否完全受控（父子节点选中状态不再关联） */
  checkStrictly?: boolean;

  /**
   * 定义选中时回填的方式
   * - 'all'(返回所有选中的节点)
   * - 'parent'(父子节点都选中时只返回父节点)
   * - 'child'(父子节点都选中时只返回子节点)
   */
  checkedStrategy?: TreeCheckedStrategy;

  /** 受控用法，当前选中的节点 */
  checkedKeys?: string[];

  /** 节点勾选时的回调 */
  onCheck?(
    nextCheckedKeys: string[],
    detail: {
      item: TreeItem;
      action: 'check' | 'uncheck';
      event: React.ChangeEvent<HTMLElement>;
    },
  ): void;

  // todo autoExpandParent
  // todo 可编辑的树节点 editable / onEditFinish
  // todo filterTreeNode 按需筛选高亮节点
  // todo onRightClick 右键点击节点时触发的回调函数
}

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>((props, ref) => {
  const {
    dataSource,
    className,
    style,

    // expand
    expandedKeys: expandedKeysProp,
    onExpand: onExpandProp,
    defaultExpandAll,
    defaultExpandedKeys,

    // check
    checkable,
    checkedStrategy = 'parent',
    checkStrictly,
    checkedKeys: checkedKeysProp,
    onCheck: onCheckProp,
    defaultCheckedKeys,

    // select
    selectable,
    selectedKeys: selectedKeysProp,
    onSelect: onSelectProp,
    defaultSelectedKeys,
    virtualListRef,
  } = props;

  const [_expandedKey, _onExpand] = useState<string[]>(
    defaultExpandAll ? collectNodes(dataSource).map((item) => item.key) : defaultExpandedKeys ?? [],
  );
  const expandedKeys = composeState(expandedKeysProp, _expandedKey);
  const onExpand = composeHandlers(onExpandProp, _onExpand);

  const [_selectedKeys, _onSelect] = useState<string[]>(defaultSelectedKeys ?? []);
  const selectedKeys = composeState(selectedKeysProp, _selectedKeys);
  const onSelect = composeHandlers(onSelectProp, _onSelect);

  const [_checkedKeys, _onCheck] = useState<string[]>(defaultCheckedKeys ?? []);
  const checkedKeys = composeState(checkedKeysProp, _checkedKeys);
  const onCheck = composeHandlers(onCheckProp, _onCheck);

  const treeDataHelper = getTreeDataHelper();

  const processedDataSource = makeRecursiveMapper<TreeItem>((item) => ({
    ...item,
    checkable,
    checked: treeDataHelper.isChecked(item.key),
    indeterminate: treeDataHelper.isIndeterminate(item.key),
    onCheck(nextChecked, { event }) {
      const action = nextChecked ? 'check' : 'uncheck';
      const nextCheckedKeys =
        action === 'check'
          ? treeDataHelper.getValueAfterCheck(item.key)
          : treeDataHelper.getValueAfterUncheck(item.key);
      onCheck(nextCheckedKeys, { item, action, event });
    },
  }))(dataSource);

  return (
    <TreeView
      ref={ref}
      virtualListRef={virtualListRef}
      className={className}
      style={style}
      dataSource={processedDataSource}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      selectable={Boolean(selectable)}
    />
  );

  function getTreeDataHelper() {
    return checkStrictly
      ? new StrictTreeDataHelper<TreeItem>({
          value: checkedKeys,
          getNodeValue: (item) => item.key,
          tree: dataSource,
        })
      : new TreeDataHelper<TreeItem>({
          value: checkedKeys,
          getNodeValue: (item) => item.key,
          tree: dataSource,
          isDetached: () => false, // todo
          checkedStrategy,
        });
  }
});
