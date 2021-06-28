import { Checkbox, Column, Menu, Popup, ProTable } from '@rexd/core';
import { proto } from 'ali-react-table';
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

const operationCol: Column = {
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

// prettier-ignore
const dataSource3 = [
  { name: '阿里巴巴网络技术有限公司1', entity: '蚂蚁金服（中国）', dept: '招商银行丨杭州分行', applier: 'Don Moreno' },
  { name: '阿里巴巴网络技术有限公司2', entity: '蚂蚁金服（中国）', dept: '建设银行丨未来科技城', applier: 'Douglas Richards' },
  { name: '阿里巴巴网络技术有限公司3', entity: '蚂蚁金服（中国）', dept: '交通银行丨浙大路支行', applier: 'Douglas Lee' },
  { name: '阿里巴巴网络技术有限公司4', entity: '蚂蚁金服（中国）', dept: '招商银行丨庆春路支行', applier: 'Eric Castillo' },
  { name: '阿里巴巴网络技术有限公司5', entity: '蚂蚁金服（中国）', dept: '招商银行丨文一路分行', applier: 'Herbert Patton' },
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

// prettier-ignore
const dataSource4 = [
  { id: '1', title: '一级标题', dept: '消费者事业部-淘宝-UED', dest: 'South Maddison', guide: 'Don Moreno', children: makeChildren('1') },
  { id: '2', title: '一级标题', dept: '航旅事业部-酒店业务', dest: 'Emilhaven', guide: 'Douglas Richards', children: makeChildren('2') },
  { id: '3', title: '一级标题', dept: '消费者事业部-淘宝-UED', dest: '云南大理', guide: 'Douglas Lee', children: makeChildren('3') },
  { id: '4', title: '一级标题', dept: '信息平台部-用户体验部', dest: '杭州千岛湖', guide: 'Eric Castillo', children: makeChildren('4') },
  { id: '5', title: '一级标题', dept: '消费者事业部-淘宝-UED', dest: 'East Karl', guide: 'Herbert Patton' },
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

const col = proto.array<Column & { code?: string }>({
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

// prettier-ignore
const dataSource7 = [
  { merchant_name: '盒马商家', subsidiary_name: '东北子公司', city_code: 'all_subsidiary_from_store_024',  shop_name: '整体-东北子公司',  sku_code: '160782029', sku_name: '鲜鸡蛋 10枚', merge_cate_level1_id: '126196004', merge_cate_level1_name: '肉类禽蛋', merge_cate_level2_id: '126198028', merge_cate_level2_name: '蛋类', merge_cate_level3_id: '31300103', merge_cate_level3_name: '鲜鸡蛋', kind_code: '白羽鸡蛋', app_trd_amt_1d: 15.43, app_trd_amt_pct: 1, app_trd_pbt: 0.14, imp_uv_dau_pct: 0.3456, all_imp_uv: 580, search_imp_uv: 8, classis_imp_uv: 10, detail_imp_uv: 11, cart_imp_uv: 268, my_page_imp_uv: 12, pq_act_imp_uv: 50, other_imp_uv: 420, all_clk_uv: 16, search_clk_uv: 1, classis_clk_uv: 0, detail_clk_uv: 0, cart_clk_uv: 3, my_page_clk_uv: 0, pq_act_clk_uv: 0, other_clk_uv: 9, all_ipv_uv: 5, search_ipv_uv: 0, classis_ipv_uv: 0, detail_ipv_uv: 0, cart_ipv_uv: 1, my_page_ipv_uv: 0, pq_act_ipv_uv: 0, other_ipv_uv: 4, all_cart_uv: 6, search_cart_uv: 1, classis_cart_uv: 0, detail_cart_uv: 0, cart_cart_uv: 3, my_page_cart_uv: 0, pq_act_cart_uv: 0, other_cart_uv: 2, all_pay_uv: 2, search_pay_uv: 1, classis_pay_uv: 0, detail_pay_uv: 0, cart_pay_uv: 1, my_page_pay_uv: 0, pq_act_pay_uv: 0, other_pay_uv: 0, all_imp2pay_rate: 0.0034, search_imp2pay_rate: 0.125, classis_imp2pay_rate: 0, detail_imp2pay_rate: 0, cart_imp2pay_rate: 0.0037, my_page_imp2pay_rate: 0, pq_act_imp2pay_rate: 0, other_imp2pay_rate: 0, app_qty_pbt: '0.14元/盒', all_app_trd_amt_1d: 15.43, app_trd_usr_cnt_1d: 110 },
  { merchant_name: '盒马商家', subsidiary_name: '海南子公司', city_code: 'all_subsidiary_from_store_0898',  shop_name: '整体-海南子公司',  sku_code: '140560002', sku_name: '光明新鲜牧场高品质牛乳950ml', merge_cate_level1_id: '126196008', merge_cate_level1_name: '冷藏', merge_cate_level2_id: '127530076', merge_cate_level2_name: '鲜奶', merge_cate_level3_id: '127530168', merge_cate_level3_name: '国产鲜牛奶', app_trd_amt_1d: 536.18, app_trd_amt_pct: 0.6112, app_trd_pbt: 22.66, imp_uv_dau_pct: 0.2976, all_imp_uv: 1417, search_imp_uv: 214, classis_imp_uv: 351, detail_imp_uv: 25, cart_imp_uv: 163, my_page_imp_uv: 90, pq_act_imp_uv: 553, other_imp_uv: 508, all_clk_uv: 61, search_clk_uv: 20, classis_clk_uv: 15, detail_clk_uv: 0, cart_clk_uv: 2, my_page_clk_uv: 2, pq_act_clk_uv: 10, other_clk_uv: 16, all_ipv_uv: 30, search_ipv_uv: 7, classis_ipv_uv: 4, detail_ipv_uv: 1, cart_ipv_uv: 1, my_page_ipv_uv: 1, pq_act_ipv_uv: 5, other_ipv_uv: 13, all_cart_uv: 46, search_cart_uv: 16, classis_cart_uv: 13, detail_cart_uv: 1, cart_cart_uv: 1, my_page_cart_uv: 1, pq_act_cart_uv: 7, other_cart_uv: 10, all_pay_uv: 19, search_pay_uv: 7, classis_pay_uv: 5, detail_pay_uv: 0, cart_pay_uv: 1, my_page_pay_uv: 1, pq_act_pay_uv: 2, other_pay_uv: 4, all_imp2pay_rate: 0.0134, search_imp2pay_rate: 0.0327, classis_imp2pay_rate: 0.0142, detail_imp2pay_rate: 0.0133, cart_imp2pay_rate: 0.0041, my_page_imp2pay_rate: 0.0074, pq_act_imp2pay_rate: 0.003, other_imp2pay_rate: 0.0072, app_qty_pbt: '11.83元/盒', all_app_trd_amt_1d: 1608.53, app_trd_usr_cnt_1d: 24 },
  { merchant_name: '盒马商家', subsidiary_name: '武汉子公司', city_code: 'all_subsidiary_from_store_027',  shop_name: '整体-武汉子公司',  sku_code: '133616021', sku_name: '山东羊角蜜2粒装700g', merge_cate_level1_id: '126196002', merge_cate_level1_name: '水果', merge_cate_level2_id: '126198012', merge_cate_level2_name: '瓜类', merge_cate_level3_id: '127532105', merge_cate_level3_name: '蜜瓜', kind_code: '羊角蜜瓜', app_trd_amt_1d: 344.04, app_trd_amt_pct: 0.749, app_trd_pbt: 21.33, imp_uv_dau_pct: 0.2937, all_imp_uv: 1976, search_imp_uv: 90, classis_imp_uv: 1097, detail_imp_uv: 60, cart_imp_uv: 69, my_page_imp_uv: 32, pq_act_imp_uv: 808, other_imp_uv: 134, all_clk_uv: 42, search_clk_uv: 4, classis_clk_uv: 27, detail_clk_uv: 0, cart_clk_uv: 1, my_page_clk_uv: 0, pq_act_clk_uv: 5, other_clk_uv: 4, all_ipv_uv: 20, search_ipv_uv: 2, classis_ipv_uv: 12, detail_ipv_uv: 0, cart_ipv_uv: 0, my_page_ipv_uv: 0, pq_act_ipv_uv: 3, other_ipv_uv: 3, all_cart_uv: 26, search_cart_uv: 3, classis_cart_uv: 18, detail_cart_uv: 0, cart_cart_uv: 0, my_page_cart_uv: 0, pq_act_cart_uv: 2, other_cart_uv: 2, all_pay_uv: 14, search_pay_uv: 2, classis_pay_uv: 10, detail_pay_uv: 0, cart_pay_uv: 0, my_page_pay_uv: 0, pq_act_pay_uv: 1, other_pay_uv: 1, all_imp2pay_rate: 0.0069, search_imp2pay_rate: 0.0185, classis_imp2pay_rate: 0.0091, detail_imp2pay_rate: 0.0007, cart_imp2pay_rate: 0.0013, my_page_imp2pay_rate: 0.0027, pq_act_imp2pay_rate: 0.0006, other_imp2pay_rate: 0.0084, app_qty_pbt: '19.68元/份', all_app_trd_amt_1d: 7912.84, app_trd_usr_cnt_1d: 16 },
  { merchant_name: '盒马商家', subsidiary_name: '东北子公司', city_code: 'all_subsidiary_from_store_024',  shop_name: '整体-东北子公司',  sku_code: '133784123', sku_name: '大连美早樱桃240g/盒', merge_cate_level1_id: '126196002', merge_cate_level1_name: '水果', merge_cate_level2_id: '31330200', merge_cate_level2_name: '车厘子/樱桃类', merge_cate_level3_id: '31330201', merge_cate_level3_name: '国产樱桃', kind_code: '国产红樱桃', app_trd_amt_1d: 438.37, app_trd_amt_pct: 0.6741, app_trd_pbt: 32.71, imp_uv_dau_pct: 0.2913, all_imp_uv: 1276, search_imp_uv: 74, classis_imp_uv: 649, detail_imp_uv: 26, cart_imp_uv: 23, my_page_imp_uv: 4, pq_act_imp_uv: 651, other_imp_uv: 93, all_clk_uv: 42, search_clk_uv: 4, classis_clk_uv: 28, detail_clk_uv: 0, cart_clk_uv: 0, my_page_clk_uv: 0, pq_act_clk_uv: 7, other_clk_uv: 3, all_ipv_uv: 28, search_ipv_uv: 3, classis_ipv_uv: 17, detail_ipv_uv: 0, cart_ipv_uv: 0, my_page_ipv_uv: 0, pq_act_ipv_uv: 5, other_ipv_uv: 3, all_cart_uv: 22, search_cart_uv: 2, classis_cart_uv: 15, detail_cart_uv: 0, cart_cart_uv: 0, my_page_cart_uv: 0, pq_act_cart_uv: 3, other_cart_uv: 1, all_pay_uv: 12, search_pay_uv: 1, classis_pay_uv: 9, detail_pay_uv: 0, cart_pay_uv: 0, my_page_pay_uv: 0, pq_act_pay_uv: 1, other_pay_uv: 1, all_imp2pay_rate: 0.0091, search_imp2pay_rate: 0.019, classis_imp2pay_rate: 0.0136, detail_imp2pay_rate: 0, cart_imp2pay_rate: 0, my_page_imp2pay_rate: 0, pq_act_imp2pay_rate: 0.0012, other_imp2pay_rate: 0.0064, app_qty_pbt: '29.62元/盒', all_app_trd_amt_1d: 2191.87, app_trd_usr_cnt_1d: 13 },
  { merchant_name: '盒马商家', subsidiary_name: '昆明子公司', city_code: 'all_subsidiary_from_store_0871',  shop_name: '整体-昆明子公司',  sku_code: '135816014', sku_name: '小龙虾神鲜桶（麻辣）', merge_cate_level1_id: '34020000', merge_cate_level1_name: '盒马鲜厨', merge_cate_level2_id: '34020400', merge_cate_level2_name: '盒马鲜厨_鲜厨水产', merge_cate_level3_id: '34020401', merge_cate_level3_name: '鲜厨水产_小龙虾', app_trd_amt_1d: 1157.52, app_trd_amt_pct: 0.4667, app_trd_pbt: 108.52, imp_uv_dau_pct: 0.29, all_imp_uv: 1835, search_imp_uv: 137, classis_imp_uv: 661, detail_imp_uv: 38, cart_imp_uv: 189, my_page_imp_uv: 51, pq_act_imp_uv: 681, other_imp_uv: 520, all_clk_uv: 105, search_clk_uv: 24, classis_clk_uv: 45, detail_clk_uv: 0, cart_clk_uv: 3, my_page_clk_uv: 1, pq_act_clk_uv: 27, other_clk_uv: 11, all_ipv_uv: 87, search_ipv_uv: 21, classis_ipv_uv: 37, detail_ipv_uv: 0, cart_ipv_uv: 2, my_page_ipv_uv: 1, pq_act_ipv_uv: 19, other_ipv_uv: 11, all_cart_uv: 35, search_cart_uv: 9, classis_cart_uv: 17, detail_cart_uv: 0, cart_cart_uv: 1, my_page_cart_uv: 0, pq_act_cart_uv: 5, other_cart_uv: 4, all_pay_uv: 10, search_pay_uv: 2, classis_pay_uv: 5, detail_pay_uv: 0, cart_pay_uv: 0, my_page_pay_uv: 0, pq_act_pay_uv: 1, other_pay_uv: 0, all_imp2pay_rate: 0.0053, search_imp2pay_rate: 0.0158, classis_imp2pay_rate: 0.0071, detail_imp2pay_rate: 0, cart_imp2pay_rate: 0.0009, my_page_imp2pay_rate: 0, pq_act_imp2pay_rate: 0.0012, other_imp2pay_rate: 0.0006, app_qty_pbt: '99.22元/份', all_app_trd_amt_1d: 6945.14, app_trd_usr_cnt_1d: 11 },
];

// ==================================================================
// ======================= 以下为表格示例 ==============================
// ==================================================================

/**
 * 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。
 * 注意 column.code 要与 dataSource 中的数据字段相对应。
 */
export function Basic() {
  const dataSource1 = [
    {
      id: '1',
      name: '阿里巴巴网络技术有限公司',
      amount: '600,000.00(CNY)',
      dept: '招商银行丨杭州分行',
      applier: 'James Collier',
    },
    {
      id: '2',
      name: '阿里巴巴网络技术有限公司',
      amount: '600,000.00(CNY)',
      dept: '建设银行丨未来科技城',
      applier: 'Philip Burke',
    },
    {
      id: '3',
      name: '阿里巴巴网络技术有限公司',
      amount: '600,000.00(CNY)',
      dept: '交通银行丨浙大路支行',
      applier: 'Wesley Cruz',
    },
    {
      id: '4',
      name: '阿里巴巴网络技术有限公司',
      amount: '600,000.00(CNY)',
      dept: '招商银行丨庆春路支行',
      applier: 'Billy Horton',
    },
    {
      id: '5',
      name: '阿里巴巴网络技术有限公司',
      amount: '600,000.00(CNY)',
      dept: '招商银行丨文一路分行',
      applier: 'Paul Tran',
    },
    {
      id: '6',
      name: '阿里巴巴网络技术有限公司',
      amount: '600,000.00(CNY)',
      dept: '农业银行丨杭州分行',
      applier: 'Anna Poole',
    },
  ];

  const columns1: Column[] = [
    { code: 'name', width: 220, name: '公司名称' },
    { code: 'amount', width: 160, align: 'right', name: '金额' },
    { code: 'dept', width: 160, name: '金融机构' },
    { code: 'applier', width: 120, name: '申请人' },
  ];

  return <ProTable dataSource={dataSource1} columns={columns1} />;
}
Basic.storyName = '基本表格';

/** ProTable 提供了 compact、zebra、bordered 三种可选样式，可以通过 className 来使用这些样式 */
export function TableStyles() {
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
        {`<ProTable` +
          `\n  dataSource={dataSource}` +
          `\n  columns={columns}` +
          `\n  className="${cx({ compact, zebra, bordered })}" ` +
          `\n  hasHeader={${hasHeader}} ` +
          `\n  isLoading={${isLoading}} ` +
          `\n/>`}
      </pre>
      <ProTable
        className={cx({ compact, zebra, bordered })}
        isLoading={isLoading}
        hasHeader={hasHeader}
        dataSource={dataSource1}
        columns={columns1}
      />
    </div>
  );
}
TableStyles.storyName = '表格样式';

/**
 * @title 数据为空
 * dataSource 的长度为 0 时，表格将展现空状态。
 */
export function Empty() {
  return <ProTable dataSource={[]} columns={columns2} />;
}
Empty.storyName = '数据为空';

/**
 * @title 表格数据加载
 * 设置 isLoading=true 即可展示加载动画。
 * */
export function Loading() {
  return <ProTable isLoading dataSource={dataSource2} columns={columns2} />;
}
Loading.storyName = '表格数据加载';

/** 设置 `footerDataSource` 后可以展示表格页脚， footerDataSource 中的字段一般与 dataSource 相同 */
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
      getRowProps={(row) => {
        if (row.footerRow) {
          return { style: { '--bgcolor': 'var(--hover-bgcolor)' } as any };
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
          render(v, row, rowIndex) {
            if (row.footerRow) {
              return '批量操作';
            }
            return operationCol.render(v, row, rowIndex);
          },
        },
      ]}
    />
  );
}
TableFooter.storyName = '表格页脚';

/** 提供排序功能，便于查看数据。 */
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
Sort.storyName = '表格排序';

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
SingleSelect.storyName = '表格行单选';

/**
 * @title 表格行多选
 * 点击复选框时，按住 shift 键可以进行批量选择/反选。
 */
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
MultipleSelect.storyName = '表格行多选';

/**
 * @title 树形表格
 *
 * 让表格支持树形数据的展示，当数据中有 children 字段时会自动展示为树形表格。
 */
export function TreeTable() {
  return (
    <ProTable
      primaryKey="id"
      dataSource={dataSource4}
      columns={columns4}
      treeMode={{
        // 受控用法 openKeys, onChangeOpenKeys
        defaultOpenKeys: ['4', '4-2'],
        checkedStrategy: 'parent',
        checkStrictly: false,
        highlightRowWhenSelected: true,
        rootKey: 'root',
      }}
    />
  );
}
TreeTable.storyName = '树形表格';

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
TreeSelectTable.storyName = '树形可选择表格';

export function ColumnGroupAndLock() {
  const repeats: Column[] = [
    { code: 'amount', width: 160, align: 'right', name: '金额' },
    { code: 'dept', width: 160, name: '金融机构' },
    { code: 'applier', width: 120, name: '申请人' },
  ];
  return (
    <ProTable
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
ColumnGroupAndLock.storyName = '表头分组与左右锁列';

/**
 * @title 限定表格容器大小
 *
 * 通过 `style.width / style.maxWidth` 来限定表格的宽度；通过 `style.height / style.maxHeight` 来限定高度。
 * 限定宽度或高度时，要同时设置 `style.overflow=auto`。
 * */
export function LimitedSize() {
  const nameCol = { lock: true, code: 'name', width: 200, name: '公司名称' };
  const repeats: Column[] = [
    { code: 'amount', width: 160, align: 'right', name: '金额' },
    { code: 'dept', width: 160, name: '金融机构' },
    { code: 'applier', width: 120, name: '申请人' },
  ];
  return (
    <ProTable
      style={{ width: 800, height: 385, overflow: 'auto' }}
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
LimitedSize.storyName = '限定表格容器大小';

export function RowGrouping() {
  const dataSource5 = [
    {
      id: '1',
      title: '阿里巴巴网络技术有限公司',
      children: [
        {
          id: `1-1`,
          title: '二级标题',
          dept: '消费者事业部-淘宝-UED',
          dest: '云南大理',
          guide: 'Douglas Lee',
        },
        {
          id: `1-2`,
          title: '二级标题',
          dept: '消费者事业部-淘宝-UED',
          dest: '云南大理',
          guide: 'Douglas Lee',
        },
      ],
    },
    {
      id: '2',
      title: '蚂蚁金服有限公司',
      children: [
        {
          id: `2-1`,
          title: '二级标题',
          dept: '消费者事业部-淘宝-UED',
          dest: '云南大理',
          guide: 'Douglas Lee',
        },
        {
          id: `2-2`,
          title: '二级标题',
          dept: '消费者事业部-淘宝-UED',
          dest: '云南大理',
          guide: 'Douglas Lee',
        },
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
RowGrouping.storyName = '行分组';

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
ColumnGroupingAndHighlight.storyName = '表头分组与列高亮';

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
RowDetail.storyName = '行详情';

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
NestedTable.storyName = '表格嵌套';

/** 在嵌套的表格内继续嵌套，可以实现套娃效果 */
export function MatryoshkaDollTable({ depth = 0 }) {
  return (
    <ProTable
      dataSource={dataSource1.slice(0, 3)}
      columns={columns1.slice(0, 4)}
      primaryKey="id"
      className={cx('compact', { bordered: depth % 2 === 1 })}
      isStickyHeader={false}
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
MatryoshkaDollTable.storyName = '表格套娃';

/** toolbar 非空时，将在表格上方渲染一个工具栏。 toolbar 将作为 `<Toolbar />` 组件的 props。 */
export function WithToolbar() {
  return (
    <ProTable
      className="bordered"
      dataSource={dataSource1}
      columns={columns1}
      toolbar={{
        // 可以使用 toolbar.totalCount 快速设置数据量显示
        totalCount: dataSource1.length,
        // tipNode: `共 ${dataSource1.length} 条数据`,
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
        onActionClick(action) {
          console.log('Toolbar click', action);
        },
      }}
    />
  );
}
WithToolbar.storyName = '集成表格工具栏';

/**
 * @title 集成翻页器
 *
 * pagination 非空时，将在表格下方渲染一个翻页器。 表格会根据翻页器的状态对数据进行筛选，pagination 将作为 `<Pagination />` 组件的 props。
 */
export function WithPagination() {
  const dataSource = repeat(dataSource1, 10).map((row, i) => ({
    ...row,
    order: i + 1,
  }));

  const columns: Column[] = [
    { lock: true, name: '序号', width: 70, align: 'right', code: 'order' },
    { lock: true, code: 'name', width: 200, name: '公司名称' },
    { code: 'amount', width: 160, align: 'right', name: '金额' },
    { code: 'dept', width: 160, name: '金融机构' },
    { code: 'applier', width: 120, name: '申请人' },
  ];

  return (
    <ProTable
      primaryKey="order"
      dataSource={dataSource}
      columns={columns}
      footer={{
        onActionClick(key) {
          console.log('YOU click', key);
        },
        leftActions: [
          { key: 'remove', label: '批量删除' },
          {
            key: 'more',
            label: '更多',
            children: [
              { key: 'new', label: '新建' },
              { key: 'move-to', label: '移动到...' },
              { key: 'copy', label: '复制到...' },
            ],
          },
        ],
      }}
      pagination={{
        showJump: false,
      }}
    />
  );
}
WithPagination.storyName = '集成翻页器';

export function ColumnResize() {
  const nameCol: Column = { lock: true, code: 'name', width: 200, name: '公司名称' };
  const repeats: Column[] = [
    { code: 'amount', width: 160, align: 'right', name: '金额' },
    { code: 'dept', width: 160, name: '金融机构' },
    { code: 'applier', width: 120, name: '申请人' },
  ];

  return (
    <ProTable
      className="bordered"
      style={{ width: 800, height: 385, overflow: 'auto' }}
      useOuterBorder
      dataSource={[...dataSource1, ...dataSource1]}
      columnResize={{
        handleBackground: '#ddd',
        handleHoverBackground: '#aaa',
        handleActiveBackground: '#89bff7',
      }}
      columns={[nameCol, ...repeats, ...repeats, ...repeats]}
    />
  );
}
ColumnResize.storyName = '拖拽调整列宽';

/**
 * @title 列的收拢展开交互
 *
 * 设置 columnCollapse 后，可以开启列分组的收拢展开；
 *
 * 只有打上 column.features.collapsible=true 标记的分组才支持展开，
 * 为子节点设置 columns.features.primaryColumn=true 的话，其所在分组收拢后将默认展示该子节点。
 *
 * columnCollapse 支持受控用法（expandedGroups/onExpand），expandedGroups 是一个字符串数组，表示当前展开分组的 code 列表。
 * columnCollapse 也支持受控用法（defaultExpandedGroups），不传该属性时默认为空数组。
 *
 * columnCollapse 依赖 column.code 进行工作，你需要给每一个需要展开/收拢的分组设置一个唯一 code。
 */
export function ColumnCollapse() {
  const columns: Column[] = [
    {
      lock: true,
      name: '商品信息',
      children: [
        { code: 'sku_code', name: 'SKU code' },
        { code: 'sku_name', name: 'SKU名称', width: 200 },
      ],
    },
    {
      name: '机构信息',
      code: 'institute',
      features: { collapsible: false },
      children: [
        { code: 'subsidiary_name', name: '子公司' },
        { code: 'shop_name', name: '门店' },
      ],
    },
    {
      name: '类目信息',
      code: 'category',
      features: { collapsible: true },
      children: [
        { code: 'merge_cate_level1_name', name: '一级类目' },
        { code: 'merge_cate_level2_name', name: '二级类目' },
        {
          code: 'merge_cate_level3_name',
          name: '三级类目',
          // 标记 primaryColumn=true 后，分组收拢时默认展示该列
          features: { primaryColumn: true },
        },
      ],
    },
    {
      name: 'APP指标',
      code: 'app_indicators',
      features: { collapsible: true },
      children: [
        {
          code: 'imp_uv_dau_pct',
          name: '曝光UV占DAU比例',
          width: 160,
          align: 'right',
        },
        {
          code: 'app_trd_amt_1d',
          name: '日店均APP成交金额',
          width: 160,
          align: 'right',
        },
        { code: 'app_qty_pbt', name: 'APP件单价', width: 160, align: 'right' },
        {
          code: 'all_app_trd_amt_1d',
          name: '店均APP成交金额汇总',
          width: 160,
          align: 'right',
        },
        {
          code: 'app_trd_usr_cnt_1d',
          name: 'APP成交用户数',
          width: 160,
          align: 'right',
        },
        {
          code: 'app_trd_amt_pct',
          name: 'APP成交金额占比',
          width: 160,
          align: 'right',
        },
        { code: 'app_trd_pbt', name: 'APP客单价', width: 160, align: 'right' },
      ],
    },
    {
      name: '转换率',
      code: 'convert_rate',
      features: { collapsible: true },
      children: [
        {
          code: 'all_imp2pay_rate',
          name: '整体曝光至成交转化率',
          width: 170,
          align: 'right',
        },
        {
          code: 'search_imp2pay_rate',
          name: '搜索曝光至成交转化率',
          width: 170,
          align: 'right',
        },
        {
          code: 'classis_imp2pay_rate',
          name: '分类曝光至成交转化率',
          width: 170,
          align: 'right',
        },
        {
          code: 'cart_imp2pay_rate',
          name: '购物车曝光至成交转化率',
          width: 170,
          align: 'right',
        },
        {
          code: 'my_page_imp2pay_rate',
          name: '我的曝光至成交转化率',
          width: 170,
          align: 'right',
        },
        {
          code: 'pq_act_imp2pay_rate',
          name: '活动页曝光至成交转化率',
          width: 170,
          align: 'right',
        },
        {
          code: 'other_imp2pay_rate',
          name: '其他曝光至成交转化率',
          width: 170,
          align: 'right',
        },
      ],
    },
    {
      name: '曝光UV',
      code: 'imp',
      features: { collapsible: true },
      children: [
        { code: 'all_imp_uv', name: '整体UV' },
        { code: 'search_imp_uv', name: '搜索UV' },
        { code: 'classis_imp_uv', name: '分类UV' },
        { code: 'detail_imp_uv', name: '详情UV' },
        { code: 'cart_imp_uv', name: '购物车UV' },
        { code: 'my_page_imp_uv', name: '我的页面UV' },
        { code: 'pq_act_imp_uv', name: '佩琦活动UV' },
        { code: 'other_imp_uv', name: '其他页面UV' },
      ],
    },
    {
      name: '点击UV',
      code: 'clk',
      features: { collapsible: true },
      children: [
        { code: 'all_clk_uv', name: '整体UV' },
        { code: 'search_clk_uv', name: '搜索UV' },
        { code: 'classis_clk_uv', name: '分类UV' },
        { code: 'detail_clk_uv', name: '详情UV' },
        { code: 'cart_clk_uv', name: '购物车UV' },
        { code: 'my_page_clk_uv', name: '我的页面UV' },
        { code: 'pq_act_clk_uv', name: '佩琦活动UV' },
        { code: 'other_clk_uv', name: '其他页面UV' },
      ],
    },
    {
      name: 'ipvUV',
      code: 'ipv',
      features: { collapsible: true },
      children: [
        { code: 'all_ipv_uv', name: '整体UV' },
        { code: 'search_ipv_uv', name: '搜索UV' },
        { code: 'classis_ipv_uv', name: '分类UV' },
        { code: 'detail_ipv_uv', name: '详情UV' },
        { code: 'cart_ipv_uv', name: '购物车UV' },
        { code: 'my_page_ipv_uv', name: '我的页面UV' },
        { code: 'pq_act_ipv_uv', name: '佩琦活动UV' },
        { code: 'other_ipv_uv', name: '其他页面UV' },
      ],
    },
    {
      name: '加购UV',
      code: 'cart',
      features: { collapsible: true },
      children: [
        { code: 'all_cart_uv', name: '整体UV' },
        { code: 'search_cart_uv', name: '搜索UV' },
        { code: 'classis_cart_uv', name: '分类UV' },
        { code: 'detail_cart_uv', name: '详情UV' },
        { code: 'cart_cart_uv', name: '购物车UV' },
        { code: 'my_page_cart_uv', name: '我的页面UV' },
        { code: 'pq_act_cart_uv', name: '佩琦活动UV' },
        { code: 'other_cart_uv', name: '其他页面UV' },
      ],
    },
    {
      name: '成交UV',
      code: 'pay',
      features: { collapsible: true },
      children: [
        { code: 'all_pay_uv', name: '整体UV' },
        { code: 'search_pay_uv', name: '搜索UV' },
        { code: 'classis_pay_uv', name: '分类UV' },
        { code: 'detail_pay_uv', name: '详情UV' },
        { code: 'cart_pay_uv', name: '购物车UV' },
        { code: 'my_page_pay_uv', name: '我的页面UV' },
        { code: 'pq_act_pay_uv', name: '佩琦活动UV' },
        { code: 'other_pay_uv', name: '其他页面UV' },
      ],
    },
  ];

  return (
    <ProTable
      className="bordered compact"
      defaultColumnWidth={140}
      dataSource={dataSource7}
      columns={columns}
      columnCollapse={{
        // 非受控用法，默认展开 imp 和 pay 分组
        defaultExpandedGroups: ['imp', 'pay'],
        // 受控用法：  expandedGroups / onExpand
      }}
    />
  );
}
ColumnCollapse.storyName = '列的收拢展开';

/**
 * @title 自定义列
 *
 * 设置 columnFilter 后，可以开启自定义显示列的功能；
 * columnFilter 支持受控（visibleCodes/onChange） 或非受控（所有列默认均可见）用法。
 *
 * columnFilter 抽屉的触发按钮在 toolbar 之内，注意设置 toolbar.rightNode 后将导致触发按钮无法展示；
 * 故在使用 columnFilter 时，如需调整 toolbar 右侧的内容，请使用 toolbar.rightActions 进行配置。
 *
 * columnFilter 支持以下功能：
 * - 设置 column.features.enforceVisible=true 让某一列总是保持可见；
 * - 设置 column.features.defaultVisible=false 让某一列默认隐藏；
 * - columnFilter.showCheckAll 是否展示「全选」按钮
 * - columnFilter.showUncheckAll 是否展示「清空」按钮
 * - columnFilter.drawerWidth 抽屉宽度
 * - columnFilter.drawerTitle 抽屉标题
 *
 * columnFilter 依赖 column.code 进行工作，你需要给每一列都设置一个「唯一的 code」。
 * 如果设置 code 影响了表格数据展示，可以通过 column.getValue 进行调整。
 *
 * 当一个分组下所有的叶子节点都隐藏时，该分组将自动隐藏；
 * columnFilter.visibleCodes 只需传入「叶子节点」的 code 列表，尽量避免传入分组节点的 code.
 */
export function ColumnFilter() {
  const columns = [
    {
      lock: true,
      code: 'sku_code',
      name: 'SKU code',
      features: { enforceVisible: true },
    },
    {
      code: 'sku_name',
      name: 'SKU名称',
      width: 200,
      features: { enforceVisible: true },
    },
    {
      code: 'subsidiary_name',
      name: '子公司',
      features: { defaultVisible: false },
    },
    { code: 'shop_name', name: '门店' },
    {
      name: '类目信息',
      code: 'category',
      children: [
        { code: 'merge_cate_level1_name', name: '一级类目' },
        { code: 'merge_cate_level2_name', name: '二级类目' },
        { code: 'merge_cate_level3_name', name: '三级类目' },
      ],
    },
    {
      name: '曝光UV',
      code: 'imp',
      children: [
        { code: 'all_imp_uv', name: '整体UV' },
        { code: 'search_imp_uv', name: '搜索UV' },
        { code: 'classis_imp_uv', name: '分类UV' },
        { code: 'detail_imp_uv', name: '详情UV' },
        { code: 'cart_imp_uv', name: '购物车UV' },
        { code: 'my_page_imp_uv', name: '我的页面UV' },
        { code: 'pq_act_imp_uv', name: '佩琦活动UV' },
        { code: 'other_imp_uv', name: '其他页面UV' },
      ],
    },
    {
      name: '点击UV',
      code: 'clk',
      children: [
        { code: 'all_clk_uv', name: '整体UV' },
        { code: 'search_clk_uv', name: '搜索UV' },
        { code: 'classis_clk_uv', name: '分类UV' },
        { code: 'detail_clk_uv', name: '详情UV' },
        { code: 'cart_clk_uv', name: '购物车UV' },
        { code: 'my_page_clk_uv', name: '我的页面UV' },
        { code: 'pq_act_clk_uv', name: '佩琦活动UV' },
        { code: 'other_clk_uv', name: '其他页面UV' },
      ],
    },
  ];

  return (
    <ProTable
      className="bordered compact"
      defaultColumnWidth={140}
      dataSource={dataSource7}
      columns={columns}
      columnRangeHover
      toolbar={{ totalCount: 888 }}
      columnFilter={{
        drawerTitle: '自定义的抽屉名称',
        // visibleCodes: ['other_clk_uv'],
        // onChange(nextVisibleCodes) {},
        // showCheckAll: true,
        // showUncheckAll: true,
        // drawerWidth: 600,
      }}
    />
  );
}
ColumnFilter.storyName = '自定义列';

/**
 * @title 从 JSX 中解析 columns
 *
 * ProTable.parseColumns 可用于从 JSX 中解析出 columns 数组。
 * 该方法主要是方便从老代码迁移，一般情况下推荐你使用标准的 columns 数组写法来生成表格列。
 *
 * ProTable.parseColumns 的一些规则详见下方代码示例中的注释。
 */
export function ParseColumnsFromJSX() {
  const { Column, ColumnGroup } = ProTable;

  const dataSource = [
    {
      name: '冷冻酸奶',
      category: '冷饮',
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,
      country: '中国',
      status: '新品',
    },
    {
      name: '冰激凌三明治',
      category: '冷饮',
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4.3,
      country: '日本',
      status: '新品',
    },
    {
      name: '条形泡芙',
      category: '烘焙',
      calories: 262,
      fat: 16,
      carbs: 24,
      protein: 6,
      country: '中国',
      status: '促销中',
    },
    {
      name: '杯型蛋糕',
      category: '烘焙',
      calories: 375,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      country: '日本',
      status: '售罄',
    },
    {
      name: '姜饼',
      category: '烘焙',
      calories: 356,
      fat: 16,
      carbs: 49,
      protein: 3.9,
      country: '中国',
      status: '售罄',
    },
  ];

  return (
    <ProTable
      primaryKey="name"
      className="compact bordered"
      dataSource={dataSource}
      defaultColumnWidth={120}
      columns={ProTable.parseColumns(
        // 使用 React.Fragment 来包括所有的 <Column>
        <>
          <Column lock name="名称" code="name" />
          <Column name="卡路里" code="calories" />
          <Column name="脂肪" code="fat" />

          {/* code 是 code 的别名，在 ProTable 中推荐用 code 来代替 code */}
          <Column name="碳水化合物" code="carbs" />

          <ColumnGroup name="蛋白质">
            <Column name="Protein1" code="protein" />
            <Column name="Protein2" code="protein" />
            <Column name="Protein3" code="protein" />
          </ColumnGroup>

          {/* div, h1 等标签将被忽略 */}
          <div>
            <Column name="column under div" code="protein" />
            <h1>冰激凌三明治</h1>
          </div>

          {/* 其他类型的标签将生成一个红色的警告 */}
          <Checkbox />
        </>,
      )}
    />
  );
}
ParseColumnsFromJSX.storyName = '从 JSX 中解析 columns';
