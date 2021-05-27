import { Checkbox, Column, Menu, Popup, ProTable } from '@rexd/core';
import { ArtColumn, proto } from 'ali-react-table';
import cx from 'classnames';
import React, { useState } from 'react';
import styled from 'styled-components';

export default { title: 'Table / ProTable' };

function repeat<T>(arr: T[], n: number) {
  let result: T[] = [];
  for (let i = 0; i < n; i++) {
    result = result.concat(arr);
  }
  return result;
}

function CaretDown(props: any) {
  return (
    <svg
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      width="16"
      height="16"
      viewBox="0 0 32 32"
      {...props}
    >
      <path d="M24 12L16 22 8 12z" />
    </svg>
  );
}

const OperationsDiv = styled.div`
  display: flex;
  height: 20px;
  align-items: center;

  .item {
    height: 20px;
    cursor: pointer;
    color: #3858cf;
    display: flex;
    align-items: center;

    &.danger {
      color: #eb4141;
    }
  }

  .sep {
    height: 10px;
    width: 1px;
    margin-left: 12px;
    margin-right: 12px;
    background: #eeeeee;
  }
`;

function renderOptions() {
  return (
    <OperationsDiv>
      <div className="item">编辑</div>
      <div className="sep" />
      <div className="item danger">删除</div>
      <div className="sep" />

      <Popup
        target={
          <div className="item">
            更多
            <CaretDown style={{ color: '#A6A6A6' }} />
          </div>
        }
      >
        <Menu
          autoDismissPopup
          style={{ minWidth: 100 }}
          dataSource={'1,2,3,4'.split(',').map((n) => ({
            key: `Option ${n}`,
            label: `Option ${n}`,
          }))}
        />
      </Popup>
    </OperationsDiv>
  );
}

const operationCol = {
  lock: true,
  name: '操作',
  render: renderOptions,
  width: 200,
};

// prettier-ignore
const dataSource1 = [
  { id: '1', name: '阿里巴巴网络技术有限公司', amount: '600,000.00(CNY)', dept: '招商银行丨杭州分行', applier: 'James Collier' },
  { id: '2', name: '阿里巴巴网络技术有限公司', amount: '600,000.00(CNY)', dept: '建设银行丨未来科技城', applier: 'Philip Burke' },
  { id: '3', name: '阿里巴巴网络技术有限公司', amount: '600,000.00(CNY)', dept: '交通银行丨浙大路支行', applier: 'Wesley Cruz' },
  { id: '4', name: '阿里巴巴网络技术有限公司', amount: '600,000.00(CNY)', dept: '招商银行丨庆春路支行', applier: 'Billy Horton' },
  { id: '5', name: '阿里巴巴网络技术有限公司', amount: '600,000.00(CNY)', dept: '招商银行丨文一路分行', applier: 'Paul Tran' },
  { id: '6', name: '阿里巴巴网络技术有限公司', amount: '600,000.00(CNY)', dept: '农业银行丨杭州分行', applier: 'Anna Poole' },
];

const columns1: Column[] = [
  { code: 'name', width: 220, name: '公司名称' },
  { code: 'amount', width: 160, align: 'right', name: '金额' },
  { code: 'dept', width: 160, name: '金融机构' },
  { code: 'applier', width: 120, name: '申请人' },
];

// prettier-ignore
const dataSource2 = [
  { name: '蚂蚁金服', dept: '消费者事业部-淘宝-UED', dest: 'South Maddison', guide: 'Don Moreno' },
  { name: '阿里巴巴(中国)有限公司', dept: '航旅事业部-酒店业务', dest: 'Emilhaven', guide: 'Douglas Richards' },
  { name: '菜鸟网络', dept: '消费者事业部-淘宝-UED', dest: '云南大理', guide: 'Douglas Lee' },
  { name: '蚂蚁金服', dept: '信息平台部-用户体验部', dest: '杭州千岛湖', guide: 'Eric Castillo' },
  { name: '阿里巴巴(中国)有限公司', dept: '消费者事业部-淘宝-UED', dest: 'East Karl', guide: 'Herbert Patton' },
];

const columns2 = [
  { code: 'name', name: '公司名称', width: 200 },
  { code: 'dept', name: '部门名称', width: 180 },
  { code: 'dest', name: '团建目的地', width: 160 },
  { code: 'guide', name: '当地导游', width: 160 },
];

const dataSource3 = [
  {
    name: '阿里巴巴网络技术有限公司1',
    entity: '蚂蚁金服（中国）',
    dept: '招商银行丨杭州分行',
    applier: 'Don Moreno',
  },
  {
    name: '阿里巴巴网络技术有限公司2',
    entity: '蚂蚁金服（中国）',
    dept: '建设银行丨未来科技城',
    applier: 'Douglas Richards',
  },
  {
    name: '阿里巴巴网络技术有限公司3',
    entity: '蚂蚁金服（中国）',
    dept: '交通银行丨浙大路支行',
    applier: 'Douglas Lee',
  },
  {
    name: '阿里巴巴网络技术有限公司4',
    entity: '蚂蚁金服（中国）',
    dept: '招商银行丨庆春路支行',
    applier: 'Eric Castillo',
  },
  {
    name: '阿里巴巴网络技术有限公司5',
    entity: '蚂蚁金服（中国）',
    dept: '招商银行丨文一路分行',
    applier: 'Herbert Patton',
  },
];

const columns3 = [
  {
    code: 'name',
    name: '公司名称',
    width: 200,
    features: { sortable: true },
  },
  { code: 'entity', name: '支付实体', width: 160 },
  {
    code: 'dept',
    name: '金融机构',
    width: 160,
    features: { sortable: true },
  },
  {
    code: 'applier',
    name: '申请人',
    width: 160,
    features: { sortable: true },
  },
  operationCol,
];

function makeChildren(prefix: string) {
  return [
    {
      id: `${prefix}-1`,
      title: '二级标题',
      dept: '消费者事业部-淘宝-UED',
      dest: '云南大理',
      guide: 'Douglas Lee',
      children: [
        {
          id: `${prefix}-1-1`,
          title: '三级标题',
          dept: '盒马产品技术部-UED',
          dest: '云南大理',
          guide: 'Douglas Lee',
        },
        {
          id: `${prefix}-1-2`,
          title: '三级标题',
          dept: '盒马产品技术部-前端',
          dest: '云南大理',
          guide: 'Douglas Lee',
        },
      ],
    },
    {
      id: `${prefix}-2`,
      title: '二级标题',
      dept: '消费者事业部-淘宝-UED',
      dest: '云南大理',
      guide: 'Douglas Lee',
      children: [
        {
          id: `${prefix}-2-1`,
          title: '三级标题',
          dept: '盒马产品技术部-UED',
          dest: '云南大理',
          guide: 'Douglas Lee',
        },
        {
          id: `${prefix}-2-2`,
          title: '三级标题',
          dept: '盒马产品技术部-前端',
          dest: '云南大理',
          guide: 'Douglas Lee',
        },
      ],
    },
    {
      id: `${prefix}-3`,
      title: '二级标题',
      dept: '消费者事业部-淘宝-UED',
      dest: '云南大理',
      guide: 'Douglas Lee',
    },
  ];
}

const dataSource4 = [
  {
    id: '1',
    title: '一级标题',
    dept: '消费者事业部-淘宝-UED',
    dest: 'South Maddison',
    guide: 'Don Moreno',
    children: makeChildren('1'),
  },
  {
    id: '2',
    title: '一级标题',
    dept: '航旅事业部-酒店业务',
    dest: 'Emilhaven',
    guide: 'Douglas Richards',
    children: makeChildren('2'),
  },
  {
    id: '3',
    title: '一级标题',
    dept: '消费者事业部-淘宝-UED',
    dest: '云南大理',
    guide: 'Douglas Lee',
    children: makeChildren('3'),
  },
  {
    id: '4',
    title: '一级标题',
    dept: '信息平台部-用户体验部',
    dest: '杭州千岛湖',
    guide: 'Eric Castillo',
    children: makeChildren('4'),
  },
  {
    id: '5',
    title: '一级标题',
    dept: '消费者事业部-淘宝-UED',
    dest: 'East Karl',
    guide: 'Herbert Patton',
  },
];

const columns4 = [
  { code: 'title', name: '标题', width: 200 },
  { code: 'dept', name: '部门名称', width: 180 },
  { code: 'dest', name: '团建目的地', width: 160 },
  { code: 'guide', name: '当地导游', width: 160 },
  operationCol,
];

const occupations = ['UED', '客服', '产品', '运营', '前端', '数据'];

const dataSource6 = occupations.map((occupation) => ({
  occupation,
  hc_2014: 104,
  hc_2015: 168,
  hc_lfl: 50,
  age_2014: 30,
  age_2015: 32,
  age_lfl: 15,
  rate_2014: 0.3,
  rate_2015: 0.45,
  rate2_2014: 0.33,
  rate2_2015: 0.48,
}));

const col = proto.array<ArtColumn & { code?: string }>({
  align: 'center',
  width: 80,
  headerCellProps: { style: { textAlign: 'center', padding: 0 } },
});

const columns6 = col([
  { lock: true, code: 'occupation', name: '职务', width: 120 },
  {
    name: '人数',
    children: col([
      { code: 'hc_2014', name: '2014年' },
      { code: 'hc_2015', name: '2015年' },
      { code: 'hc_lfl', name: '同比增长' },
    ]),
  },
  {
    name: '年龄',
    children: col([
      { code: 'age_2014', name: '2014年' },
      { code: 'age_2015', name: '2015年' },
      { code: 'age_lfl', name: '同比增长' },
    ]),
  },
  {
    name: '占比',
    children: col([
      { code: 'rate_2014', name: '2014年' },
      { code: 'rate_2015', name: '2015年' },
    ]),
  },
  {
    name: '占比2',
    children: col([
      { code: 'rate_2014', name: '2014年' },
      { code: 'rate_2015', name: '2015年' },
    ]),
  },
]);

export function Basic() {
  return <ProTable dataSource={dataSource1} columns={columns1} />;
}

export function TableStyles() {
  const [compact, setCompact] = useState(true);
  const [zebra, setZebra] = useState(false);
  const [bordered, setBordered] = useState(false);
  const [hasHeader, setHasHeader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Checkbox checked={compact} onChange={() => setCompact(!compact)}>
          紧凑型
        </Checkbox>
        <Checkbox
          style={{
            marginLeft: 16,
          }}
          checked={zebra}
          onChange={() => setZebra(!zebra)}
        >
          斑马线
        </Checkbox>
        <Checkbox
          style={{
            marginLeft: 16,
          }}
          checked={bordered}
          onChange={() => setBordered(!bordered)}
        >
          边框
        </Checkbox>
        <Checkbox
          style={{
            marginLeft: 40,
          }}
          checked={hasHeader}
          onChange={() => setHasHeader(!hasHeader)}
        >
          展示表头
        </Checkbox>
        <Checkbox
          style={{
            marginLeft: 16,
          }}
          checked={isLoading}
          onChange={() => setIsLoading(!isLoading)}
        >
          加载状态
        </Checkbox>
      </div>
      <pre>
        {`<ProTable` +
          `\n  dataSource={dataSource}` +
          `\n  columns={columns}` +
          `\n  className="${cx({
            compact,
            zebra,
            bordered,
          })}" ` +
          `\n  hasHeader={${hasHeader}} ` +
          `\n  isLoading={${isLoading}} ` +
          `\n/>`}
      </pre>
      <ProTable
        className={cx({
          compact,
          zebra,
          bordered,
        })}
        isLoading={isLoading}
        hasHeader={hasHeader}
        dataSource={dataSource1}
        columns={columns1}
      />
    </div>
  );
}

export function Empty() {
  return <ProTable dataSource={[]} columns={columns2} />;
}

export function Loading() {
  return <ProTable isLoading dataSource={dataSource2} columns={columns2} />;
}

export function TableFooter() {
  return (
    <ProTable
      style={{ height: 385, overflow: 'auto' }}
      dataSource={repeat(dataSource1, 10)}
      footerDataSource={[
        {
          footerRow: true,
          id: 'all',
          name: '阿里巴巴网络技术有限公司',
          amount: '600,000.00(CNY)',
          dept: '招商银行丨杭州分行',
          applier: 'James Collier',
        },
      ]}
      getRowProps={(row): any => {
        if (row.footerRow) {
          return { style: { '--bgcolor': 'var(--hover-bgcolor)' } };
        }
      }}
      columns={[
        {
          name: '序号',
          width: 70,
          align: 'right',
          lock: true,
          getValue(row, rowIndex) {
            if (row.footerRow) {
              return '合计';
            }
            return String(rowIndex + 1);
          },
        },
        { lock: true, code: 'name', width: 200, name: '公司名称' },
        ...repeat<Column>(
          [
            { code: 'amount', width: 160, align: 'right', name: '金额' },
            { code: 'dept', width: 160, name: '金融机构' },
            { code: 'applier', width: 120, name: '申请人' },
          ],
          5,
        ),
        {
          ...operationCol,
          render(v, row) {
            if (row.footerRow) {
              return '批量操作';
            }
            return operationCol.render();
          },
        },
      ]}
    />
  );
}

export function LimitedSize() {
  const nameCol = { lock: true, code: 'name', width: 200, name: '公司名称' };
  const repeats: Column[] = [
    { code: 'amount', width: 160, align: 'right', name: '金额' },
    { code: 'dept', width: 160, name: '金融机构' },
    { code: 'applier', width: 120, name: '申请人' },
  ];
  return (
    <ProTable
      style={{ width: 800, maxWidth: '100%', height: 385, overflow: 'auto' }}
      dataSource={repeat(dataSource1, 10)}
      columns={[
        {
          name: '序号',
          width: 70,
          align: 'right',
          lock: true,

          getValue(_, rowIndex) {
            return String(rowIndex + 1);
          },
        },
        nameCol,
        ...repeat(repeats, 5),
        operationCol,
      ]}
    />
  );
}

export function Sort() {
  return (
    <ProTable
      dataSource={dataSource3}
      columns={columns3}
      sort={{
        highlightColumnWhenActive: true,
        mode: 'single',
        defaultSorts: [{ code: 'name', order: 'desc' }],
      }}
    />
  );
}

export function SingleSelect() {
  const [value, onChange] = useState('1');

  return (
    <ProTable
      primaryKey="id"
      dataSource={dataSource1}
      columns={columns1}
      singleSelect={{
        // 非受控用法 defaultValue
        value,
        onChange,
        isDisabled(row) {
          return Number(row.id) % 3 === 0;
        },
        clickArea: 'cell',
      }}
    />
  );
}

export function MultipleSelect() {
  const [value, onChange] = useState(['1', '3']);
  return (
    <ProTable
      primaryKey="id"
      dataSource={dataSource1}
      columns={columns1}
      multiSelect={{
        // 非受控用法 defaultValue
        value,
        onChange,
        isDisabled(row) {
          return row.id === '4';
        },
        highlightRowWhenSelected: true,
        clickArea: 'row',
      }}
    />
  );
}

export function TreeTable() {
  return (
    <ProTable
      primaryKey="id"
      dataSource={dataSource4}
      columns={columns4}
      treeMode={{
        // 受控用法 openKeys, onChangeOpenKeys
        defaultOpenKeys: ['4', '4-2'],
      }}
    />
  );
}

export function TreeSelectTable() {
  return (
    <ProTable
      dataSource={dataSource4}
      columns={columns4}
      primaryKey="id"
      treeMode={{ defaultOpenKeys: ['4', '4-2'] }}
      treeSelect={{
        tree: dataSource4,
        defaultValue: ['1', '3'],
        // 受控用法 value, onChange
        rootKey: 'root',
        checkboxColumn: { lock: true },
      }}
    />
  );
}

export function RowGrouping() {
  const dataSource5 = [
    {
      id: '1',
      title: '阿里巴巴网络技术有限公司',
      children: [
        { id: `1-1`, title: '二级标题', dept: '消费者事业部-淘宝-UED', dest: '云南大理', guide: 'Douglas Lee' },
        { id: `1-2`, title: '二级标题', dept: '消费者事业部-淘宝-UED', dest: '云南大理', guide: 'Douglas Lee' },
      ],
    },
    {
      id: '2',
      title: '蚂蚁金服有限公司',
      children: [
        { id: `2-1`, title: '二级标题', dept: '消费者事业部-淘宝-UED', dest: '云南大理', guide: 'Douglas Lee' },
        { id: `2-2`, title: '二级标题', dept: '消费者事业部-淘宝-UED', dest: '云南大理', guide: 'Douglas Lee' },
      ],
    },
    { id: '3', title: '其他' },
  ];
  const columns5 = [
    { code: 'title', name: '标题', width: 200 },
    { code: 'dept', name: '部门名称', width: 180 },
    { code: 'dest', name: '团建目的地', width: 160 },
    { code: 'guide', name: '当地导游', width: 160 },
  ];
  return (
    <ProTable
      primaryKey="id"
      dataSource={dataSource5}
      columns={columns5}
      rowGrouping={{ defaultOpenKeys: ['1', '2'] }}
    />
  );
}

export function ColumnGroupingAndHighlight() {
  return (
    <ProTable
      style={{ '--header-row-height': '40px' }}
      className="bordered"
      dataSource={dataSource6}
      columns={columns6}
      columnRangeHover
    />
  );
}

export function RowDetail() {
  return (
    <ProTable
      primaryKey="id"
      dataSource={dataSource1}
      columns={columns1.slice(0, 4)}
      rowDetail={{
        defaultOpenKeys: ['1', '3'],
        renderDetail: (row) => {
          return (
            <div
              style={{
                padding: 16,
                display: 'flex',
                minWidth: 800,
              }}
            >
              <div style={{ lineHeight: '20px' }}>
                <div>最近工作：高级经理｜{row.dept}｜2009-07-01 至今</div>
                <div>工作职责：巴拉巴拉小魔仙</div>
                <div>联系方式：67676767｜1212121@163.con</div>
              </div>
              <div style={{ marginLeft: 48, lineHeight: '20px' }}>
                <div>教育经理：北京大学｜工商管理｜2007-09-01 至 2006-06-01</div>
                <div>中央财经大学｜2004-09-01 至 2007-06-01</div>
              </div>
            </div>
          );
        },
      }}
    />
  );
}

export function NestedTable() {
  return (
    <ProTable
      dataSource={dataSource1}
      columns={columns1.slice(0, 4)}
      primaryKey="id"
      rowDetail={{
        defaultOpenKeys: ['2'],
        renderDetail() {
          return (
            <ProTable
              style={{
                margin: 16,
                '--bgcolor': '#fbfbfb',
                '--header-bgcolor': 'var(--bgcolor)',
                '--hover-bgcolor': 'var(--bgcolor)',
              }}
              dataSource={dataSource1.slice(0, 3)}
              columns={columns1.slice(0, 4)}
            />
          );
        },
      }}
    />
  );
}

export function MatryoshkaDollTable({ depth = 0 }) {
  return (
    <ProTable
      dataSource={dataSource1.slice(0, 3)}
      columns={columns1.slice(0, 4)}
      primaryKey="id"
      className={cx('compact', { bordered: depth % 2 === 1 })}
      isStickyHead={false}
      rowDetail={{
        renderDetail() {
          let msg;
          if (depth < 2) {
            msg = '';
          } else if (depth <= 4) {
            msg = '加油，马上就到底了';
          } else if (depth <= 6) {
            msg = '还剩最后几层了';
          } else if (depth <= 8) {
            msg = '加油，还差一点点';
          } else {
            return <div>到底了~</div>;
          }
          return (
            <div style={{ margin: 8 }}>
              {msg}
              <MatryoshkaDollTable depth={depth + 1} />
            </div>
          );
        },
      }}
    />
  );
}

export function WithToolbar() {
  return (
    <ProTable
      className="bordered"
      dataSource={dataSource1}
      columns={columns1}
      toolbar={{
        // @ts-ignore todo
        leftActions: [
          {
            key: 'add',
            component: 'button',
            label: '新建商品',
            icon: 'add',
            props: { type: 'primary' },
          },
          { key: 'import-good', component: 'button', label: '导入商品' },
        ],
        rightActions: [{ key: 'print' }, { key: 'export' }, { key: 'refresh' }],
        onActionClick(action: string) {
          console.log('Toolbar click', action);
        },
      }}
    />
  );
}

export function WithPagination() {
  return (
    <ProTable
      style={{ maxHeight: 350, overflow: 'auto' }}
      dataSource={repeat(dataSource1, 2).map((row, i) => ({
        ...row,
        order: i + 1,
      }))}
      columns={[
        { name: '序号', width: 70, align: 'right', lock: true, code: 'order' },
        { lock: true, code: 'name', width: 200, name: '公司名称' },
        { code: 'amount', width: 160, align: 'right', name: '金额' },
        { code: 'dept', width: 160, name: '金融机构' },
        { code: 'applier', width: 120, name: '申请人' },
      ]}
      // todo pagination
    />
  );
}
