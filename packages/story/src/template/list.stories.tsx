import React, { useState, useRef } from 'react';
import { PageHeader, Panel, Box, BaseTable, ActionList, Toolbar, Search } from '@rexd/core';
import { SearchForm, FormItem } from '@rexd/form';
import { listData } from './dataset';

export default {
  title: 'Template/List',
  parameters: {
    layout: 'fullscreen',
  },
};

export function SearchList() {
  const [loading, setLoading] = useState(false);
  const timeout = useRef();
  const columns = [
    { code: 'warehouseName', name: '仓名称', width: 100 },
    { code: 'deptName', name: '部门', width: 100 },
    { code: 'skuCode', name: '商品编码', width: 90 },
    { code: 'skuName', name: '商品名称', width: 140 },
    { code: 'inventoryType', name: '库存类型', width: 80 },
    {
      name: '业务发生前',
      children: [
        { code: 'initTotalQuantity', name: '总量', width: 80 },
        { code: 'initAvailableQuantity', name: '可用量', width: 80 },
        { code: 'initFrozenQuantity', name: '占用量', width: 80 },
      ],
    },
    { code: 'inventoryUnit', name: '库存单位', width: 90 },
    { code: 'mainOrderId', name: '业务单据号1', width: 120 },
    { code: 'detailOrderId', name: '业务单据号2', width: 120 },
    { code: 'subDetailOrderId', name: '业务单据号3', width: 120 },
    {
      name: '操作',
      width: 128,
      render: () => (
        <ActionList
          actions={[
            { key: 'view', label: '查看' },
            { key: 'remove', label: '删除', hasConfirm: true },
            {
              key: 'more',
              label: '更多',
              children: [
                { key: 'copy', label: '复制' },
                { key: 'edit', label: '编辑' },
              ],
            },
          ]}
        />
      ),
      lock: true,
    },
  ];

  const onSearch = () => {
    setLoading(true);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const actions = [
    { key: 'search', render: () => <Search shape="simple" /> },
    { key: 'print', label: '打印' },
    { key: 'export', label: '导出' },
    { key: 'sort', label: '排序' },
    { key: 'reset', label: '重置' },
    { key: 'refresh', label: '刷新' },
  ];

  return (
    <Box>
      <PageHeader title="B2C库存信息检索" />
      <Box p="xl">
        <Panel p={0}>
          <SearchForm onSubmit={onSearch} isCollapsible>
            <FormItem label="仓名称" name="warehouseName" component="input" />
            <FormItem label="部门" name="deptName" component="input" />
            <FormItem label="商品编码" name="skuCode" component="input" />
            <FormItem label="商品名称" name="skuName" component="input" />
            <FormItem
              label="库存类型"
              name="inventoryType"
              component="select"
              dataSource={[
                { label: '在库', value: 'in' },
                { label: '不在库', value: 'unin' },
              ]}
            />
            <FormItem label="日期" name="date" component="datePicker" />
          </SearchForm>
        </Panel>
        <Panel mt="l">
          <Toolbar actions={actions} mb="m" />
          <BaseTable isLoading={loading} defaultColumnWidth={80} dataSource={listData} columns={columns} />
        </Panel>
      </Box>
    </Box>
  );
}
