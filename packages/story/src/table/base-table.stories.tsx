import { BaseTable, Checkbox, Column } from '@rexd/core';
import cx from 'classnames';
import React, { useState } from 'react';
import styled from 'styled-components';
import { DropdownMenu } from './DropdownMenu';

export default { title: 'Table / BaseTable' };

// 重复数组内的元素，返回一个新的数组
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

      <DropdownMenu
        target={
          <div className="item">
            更多
            <CaretDown style={{ color: '#A6A6A6' }} />
          </div>
        }
        menuDataSource={'1,2,3,4'.split(',').map((n) => ({
          key: `Option ${n}`,
          label: `Option ${n}`,
        }))}
      />
    </OperationsDiv>
  );
}

const operationCol = { lock: true, name: '操作', render: renderOptions, width: 200 };

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
  operationCol,
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

export function Basic() {
  return <BaseTable dataSource={dataSource1} columns={columns1} />;
}

export function BasicMobile() {
  return (
    <BaseTable
      dataSource={dataSource1}
      columns={[
        { code: 'name', width: 120, name: '公司名称' },
        { code: 'amount', width: 120, align: 'right', name: '金额' },
        { code: 'dept', width: 80, name: '金融机构' },
        { code: 'applier', width: 80, name: '申请人' },
        { ...operationCol, width: 170, lock: false },
      ]}
    />
  );
}

export function 表格样式() {
  const [compact, setCompact] = useState(true);
  const [zebra, setZebra] = useState(false);
  const [bordered, setBordered] = useState(false);
  const [hasHeader, setHasHeader] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Checkbox checked={compact} onChange={() => setCompact(!compact)}>
          紧凑型
        </Checkbox>
        <Checkbox style={{ marginLeft: 16 }} checked={zebra} onChange={() => setZebra(!zebra)}>
          斑马线
        </Checkbox>
        <Checkbox style={{ marginLeft: 16 }} checked={bordered} onChange={() => setBordered(!bordered)}>
          边框
        </Checkbox>
        <Checkbox style={{ marginLeft: 40 }} checked={hasHeader} onChange={() => setHasHeader(!hasHeader)}>
          展示表头
        </Checkbox>
        <Checkbox style={{ marginLeft: 16 }} checked={isLoading} onChange={() => setIsLoading(!isLoading)}>
          加载状态
        </Checkbox>
      </div>
      <pre>
        {`<Table` +
          `\n  dataSource={dataSource}` +
          `\n  columns={columns}` +
          `\n  className="${cx({ compact, zebra, bordered })}" ` +
          `\n  hasHeader={${hasHeader}} ` +
          `\n  isLoading={${isLoading}} ` +
          `\n/>`}
      </pre>
      <BaseTable
        className={cx({ compact, zebra, bordered })}
        isLoading={isLoading}
        hasHeader={hasHeader}
        dataSource={dataSource1}
        columns={columns1}
      />
    </div>
  );
}

export function 数据为空() {
  return <BaseTable dataSource={[]} columns={columns2} />;
}

export function 表格数据加载() {
  return <BaseTable isLoading dataSource={dataSource2} columns={columns2} />;
}

export function 空数据加载() {
  return <BaseTable isLoading dataSource={[]} columns={columns2} />;
}

export function 表头分组与左右锁列() {
  const repeats: Column[] = [
    { code: 'amount', width: 160, align: 'right', name: '金额' },
    { code: 'dept', width: 160, name: '金融机构' },
    { code: 'applier', width: 120, name: '申请人' },
  ];

  return (
    <BaseTable
      style={{ '--header-row-height': '40px' }}
      dataSource={dataSource1}
      columns={[
        { lock: true, code: 'name', width: 200, name: '公司名称' },
        { name: '分组1', children: repeats },
        { name: '分组2', children: repeats },
        { name: '分组3', children: repeats },
        { name: '分组4', children: repeats },
        { name: '分组5', children: repeats },
        { name: '分组6', children: repeats },
        operationCol,
      ]}
    />
  );
}

export function 限定表格容器大小() {
  const nameCol = { lock: true, code: 'name', width: 200, name: '公司名称' };
  const repeats: Column[] = [
    { code: 'amount', width: 160, align: 'right', name: '金额' },
    { code: 'dept', width: 160, name: '金融机构' },
    { code: 'applier', width: 120, name: '申请人' },
  ];

  return (
    <BaseTable
      style={{ width: 800, height: 385, overflow: 'auto' }}
      dataSource={repeat(dataSource1, 10)}
      columns={[
        {
          name: '序号',
          width: 70,
          align: 'right',
          lock: true,
          getValue(_: any, rowIndex: number) {
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
