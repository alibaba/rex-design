import { collectNodes, makeRecursiveMapper } from 'ali-react-table';
import React, { useState } from 'react';
import { composeHandlers, composeState } from '../../utils';
import StrictTreeDataHelper from './utils/StrictTreeDataHelper';
import TreeDataHelper, { TreeCheckedStrategy } from './utils/TreeDataHelper';
import { TreeItem, TreeView, TreeViewProps } from './tree-view';

export interface TreeProps extends Partial<TreeViewProps> {
  dataSource: TreeItem[];

  defaultExpandAll?: boolean;
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];

  checkable?: boolean;
  defaultCheckedKeys?: string[];
  checkStrictly?: boolean;
  checkedStrategy?: TreeCheckedStrategy;
  checkedKeys?: string[];
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
