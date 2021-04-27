import {
  Button,
  FlattenTreeItem,
  Flex,
  Input,
  searchTreeByKeyword,
  Tag,
  Tree,
  TreeItem,
  VirtualList,
  VirtualListAlign,
} from '@rexd/core';
import { collectNodes } from 'ali-react-table';
import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCateTree } from './test-tree-data';

export default { title: 'Tree' };

const StyledTree = styled(Tree)`
  width: 200px;
  border: 1px dashed var(--rex-colors-emphasis-40);
`;

const bigTreeDataSource: TreeItem[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2', disabled: true },
  { key: '4', label: '动物园' },
  {
    key: 'zoo',
    label: '阿里动物园',
    children: [
      { key: '盒马', label: '盒马' },
      { key: '淘宝', label: '淘宝' },
      { key: '天猫', label: '天猫' },
      {
        key: 'foo-4',
        label: '其他小朋友',
        children: [
          { key: '小红红', label: '小红红' },
          { key: '小蓝蓝', label: '小蓝蓝' },
          { key: '小灰灰', label: '小灰灰' },
        ],
      },
    ],
  },
  {
    key: '2号动物园',
    label: '2号动物园',
    children: [
      { key: '小脑虎', label: '小脑虎' },
      { key: '小狮子', label: '小狮子' },
      { key: '小企鹅', label: '小企鹅' },
      {
        key: 'bar-4',
        label: '小朋友',
        children: [
          { key: 'bar-4-小红红', label: '小红红' },
          { key: 'bar-4-小蓝蓝', label: '小蓝蓝' },
          { key: 'bar-4-小灰灰', label: '小灰灰' },
        ],
      },
    ],
  },
];

export function Basic() {
  return <StyledTree defaultExpandedKeys={['zoo']} dataSource={bigTreeDataSource} />;
}

export function Checkable() {
  return <StyledTree checkable dataSource={bigTreeDataSource} onCheck={(...args) => console.log('onCheck', ...args)} />;
}

function makeBigTreeItems() {
  function makeNestedChildren(prefix: string, level: number, count: number): TreeItem[] {
    const result: TreeItem[] = [];
    for (let i = 0; i < count; i++) {
      const key = `${prefix}-${i}`;
      result.push({
        key,
        label: (
          <span>
            第{level}层节点{' '}
            <span style={{ fontFamily: 'monospace' }}>
              ({prefix}-{i})
            </span>
          </span>
        ),
        children: count > 0 ? makeNestedChildren(key, level + 1, count - 6) : null,
      });
    }
    return result;
  }

  const big: TreeItem[] = [];
  for (let i = 0; i < 5; i++) {
    big.push({
      key: `key_${i}`,
      label: `顶层节点${i}`,
      children: makeNestedChildren(String(i), 1, 15),
    });
  }
  return big;
}

export function Virtualization() {
  const bigDataSource = useMemo(makeBigTreeItems, []);

  const virtualListRef = useRef<VirtualList<FlattenTreeItem>>();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button
          onClick={() => {
            virtualListRef.current.scrollToRow(100 /* 默认为 VirtualListAlign.center */);
          }}
        >
          滚动到第100条数据（默认情况下为 0-2-6）
        </Button>
        <Button
          onClick={() => {
            virtualListRef.current.scrollToRow(0, VirtualListAlign.start);
          }}
        >
          滚动到第一条
        </Button>
        <Button
          onClick={() => {
            virtualListRef.current.scrollToRow(Infinity);
          }}
        >
          滚动到最后一条
        </Button>
      </div>
      <StyledTree
        style={{ width: 400, height: 400, overflow: 'auto', marginTop: 16 }}
        virtualListRef={virtualListRef}
        dataSource={bigDataSource}
        checkable
        defaultExpandAll
      />
    </div>
  );
}

const shopTree = [
  {
    key: '021',
    label: '上海子公司',
    children: [
      {
        key: '021-fresh-shop',
        label: '盒马鲜生门店',
        children: [
          { key: '8043', label: '上海189购物中心店' },
          { key: '8056', label: '上海白玉兰广场店' },
          { key: '8005', label: '上海宝地店' },
          { key: '8055', label: '上海宝山新业坊店' },
          { key: '8079', label: '上海北洋泾菜场店' },
          { key: '8007', label: '上海曹家渡店' },
        ],
      },
      {
        key: '021-F2',
        label: '盒马F2门店',
        children: [
          { key: '8020', label: '上海F2白金湾店' },
          { key: '8068', label: '上海长宁来福士店' },
          { key: '8011', label: '上海长泰店' },
          { key: '8049', label: '上海大场老街店' },
        ],
      },
    ],
  },
  {
    key: '0571',
    label: '浙江子公司',
    children: [
      {
        key: '0571-fresh-shop',
        label: '盒马鲜生门店',
        children: [
          { key: '13004', label: '盒马杭州解百店' },
          { key: '8050', label: '杭州临平中都店' },
          { key: '8028', label: '杭州亲橙里店' },
          { key: '8057', label: '杭州庆春店' },
          { key: '8029', label: '杭州萧山万象汇店' },
        ],
      },
      {
        key: '0571-qzc',
        label: '盒马小站',
        children: [
          { key: 'QZCHZ002', label: '杭州盒马小站闲林山水站' },
          { key: 'QZCHZ001', label: '杭州盒马小站西城广场站' },
          { key: 'QZCHZ008', label: '杭州盒马小站西溪谷站' },
          { key: 'QZCHZ015', label: '杭州盒马小站涌江站' },
          { key: 'QZCHZ0010', label: '杭州盒马小站资福站' },
        ],
      },
      { key: '0571-f2', label: '盒马F2' },
      { key: '0571-xmcc', label: '鲜美菜场' },
    ],
  },
];

export function 父子节点选中不关联() {
  return (
    <StyledTree
      checkable
      checkStrictly
      style={{ width: 400, maxHeight: 400, overflow: 'auto' }}
      dataSource={shopTree}
    />
  );
}

export function 可点击的树节点() {
  return (
    <StyledTree
      style={{ width: 400, maxHeight: 400, overflow: 'auto' }}
      selectable
      checkable
      defaultExpandAll
      defaultSelectedKeys={[
        '8043',
        '8056',
        '8005',
        '8055',
        '8079',
        '8007',
        'QZCHZ002',
        'QZCHZ001',
        'QZCHZ008',
        'QZCHZ015',
      ]}
      dataSource={shopTree}
    />
  );
}

export function 业务示例_类目搜索与多选() {
  const [checkedKeys, onCheck] = useState<string[]>([]);
  const dataSource = useCateTree();
  const [keyword, _setKeyword] = useState('');

  const [expandedKeys, onExpand] = useState<string[]>([]);

  const setKeyword = (word: string) => {
    _setKeyword(word);
    const searchResult = searchTreeByKeyword(word, dataSource);
    if (!searchResult.skipped) {
      onExpand(searchResult.preferredExpandedKeys);
    }
  };

  const nameMap = new Map(collectNodes(dataSource).map((item) => [item.key, item.label]));

  const recommendations = ['肉', '鱼', '中餐', '火锅', '红', '菜'];

  const filteredDataSource = searchTreeByKeyword(keyword, dataSource).filteredDataSource;

  return (
    <div>
      <Flex style={{ gap: 16, alignItems: 'center' }}>
        <Button
          onClick={() => {
            onExpand(collectNodes(dataSource).map((item) => item.key));
          }}
        >
          展开全部
        </Button>
        <Button onClick={() => onExpand([])}>收拢全部</Button>
      </Flex>
      <Flex style={{ margin: '8px 0', gap: 8, alignItems: 'center' }}>
        <Input value={keyword} onChange={setKeyword} placeholder="类目搜索" style={{ width: 300 }} hasClear />
        <span>推荐搜索：</span>
        {recommendations.map((word) => (
          <Tag
            key={word}
            interactive
            onClick={() => setKeyword(word)}
            style={{ cursor: 'pointer', borderRadius: 4, border: '1px solid #ccc', fontSize: 12, padding: '0 4px' }}
          >
            {word}
          </Tag>
        ))}
      </Flex>

      <Flex style={{ gap: 8 }}>
        <StyledTree
          style={{ width: 300, minWidth: 300, height: 400, overflow: 'auto' }}
          checkable
          // 注意在目前的搜索场景下，checkedStrategy 选择 child 还是 parent 的影响是很大的
          checkedStrategy="child"
          checkedKeys={checkedKeys}
          onCheck={onCheck}
          dataSource={filteredDataSource}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
        />

        <div style={{ wordBreak: 'break-all', fontSize: 12, lineHeight: 1.5 }}>
          已选类目：
          {checkedKeys
            .map((key) => nameMap.get(key))
            .slice(0, 30)
            .join(',')}
          {checkedKeys.length > 30 && (
            <span style={{ fontSize: '150%', marginLeft: 4, color: 'indianred' }}>等 {checkedKeys.length} 项</span>
          )}
        </div>
      </Flex>
    </div>
  );
}
