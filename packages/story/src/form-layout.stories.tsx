import React from 'react';
import { Group, Input, FormLayout, FieldSet, FormControl, DatePicker, SearchFormLayout } from '@rexd/core';

export default { title: 'FormLayout' };

/**
 * 基本用法
 */
export function Basic() {
  return (
    <FormControl
      labelPosition="left"
      label="邮箱地址"
      labelTips="这里填入有效的邮箱地址，不支持 qq 邮箱"
      help="我们不会公开您的邮箱地址。"
      error="这是一条错误消息"
      required
    >
      <Input type="email" onChange={console.log} />
    </FormControl>
  );
}

/**
 * 标签位于上方
 */
export function LabelTop() {
  return (
    <FormControl
      labelPosition="top"
      label="邮箱地址"
      labelTips="这里填入有效的邮箱地址，不支持 qq 邮箱"
      help="我们不会公开您的邮箱地址。"
      error="这是一条错误消息"
      required
    >
      <Input type="email" onChange={console.log} />
    </FormControl>
  );
}

/**
 * 没有标签
 */
export function NoLabelControl() {
  return (
    <FormControl help="我们不会公开您的邮箱地址。" error="这是一条错误消息" required>
      <Input type="email" onChange={console.log} />
    </FormControl>
  );
}

/**
 * 自定义标签区域宽度
 */
export function LongLabels() {
  return (
    <FormLayout labelWidth="200px">
      <FormControl label="物料供应商全称">
        <Input placeholder="文一西路超市" />
      </FormControl>
      <FormControl label="联系人所在城市街道和门牌号">
        <Input placeholder="街道" style={{ width: 180, marginRight: 12 }} />
        <Input placeholder="邮政编码" style={{ width: 180 }} />
      </FormControl>
    </FormLayout>
  );
}

export function Inline() {
  return (
    <FormLayout inline>
      <FormControl label="邮箱地址" required help="我们不会公开您的邮箱地址。" error="这是一条错误消息">
        <Input width="200px" type="email" onChange={console.log} />
      </FormControl>
      <FormControl label="邮箱地址" required help="我们不会公开您的邮箱地址。" error="这是一条错误消息">
        <Input width="200px" type="email" onChange={console.log} />
      </FormControl>
    </FormLayout>
  );
}

export function NestFormControls() {
  return (
    <FormLayout>
      <FormControl label="姓名">
        <Input placeholder="姓名" />
      </FormControl>
      <FormControl label="地址">
        <Group>
          <FormControl inline>
            <Input placeholder="城市" />
          </FormControl>
          <FormControl inline>
            <Input placeholder="邮政编码" />
          </FormControl>
        </Group>
      </FormControl>
    </FormLayout>
  );
}

export function SimpleFormLayout() {
  return (
    <FormLayout>
      <FormControl label="店名" required help="辅助文本">
        <Input placeholder="文一西路超市" />
      </FormControl>

      <FormControl label="地址">
        <Group>
          <Input placeholder="城市" />
          <Input placeholder="邮政编码" />
        </Group>
      </FormControl>

      <FormControl label="日期">
        <Group>
          <DatePicker placeholder="开始日期" />
          <DatePicker placeholder="结束日期" />
        </Group>
      </FormControl>
    </FormLayout>
  );
}

export function FormFieldSets() {
  return (
    <FormLayout>
      <FieldSet title="办公室信息">
        <FormControl label="地址名称" required help="辅助文本">
          <Input placeholder="请输入" />
        </FormControl>
        <FormControl label="街道地址" required error="必填字段">
          <Input placeholder="请选择" />
        </FormControl>
      </FieldSet>
      <FieldSet title="联系信息">
        <FormControl label="电子邮箱" required help="辅助文本">
          <Input placeholder="请输入" />
        </FormControl>
        <FormControl label="电话" required error="必填字段">
          <Input placeholder="请选择" />
        </FormControl>
      </FieldSet>
    </FormLayout>
  );
}

export function MultiColumnFormFieldSet() {
  return (
    <FieldSet title="办公室信息" columns={2}>
      <FormControl label="城市" required help="辅助文本">
        <Input placeholder="请输入" />
      </FormControl>
      <FormControl label="地址名称" required help="辅助文本">
        <Input placeholder="请输入" />
      </FormControl>
      <FormControl label="街道地址" required error="必填字段">
        <Input placeholder="请选择" />
      </FormControl>
    </FieldSet>
  );
}

export function BasicSearchFormLayout() {
  return (
    <SearchFormLayout>
      <FormControl label="订单号" required labelTips="请输入 16 位订单编码">
        <Input placeholder="请输入" />
      </FormControl>
      <FormControl label="仓库" required>
        <Input placeholder="请输入" />
      </FormControl>
      <FormControl label="商家" required>
        <Input placeholder="请输入" />
      </FormControl>
      <FormControl label="门店" required>
        <Input placeholder="请输入" />
      </FormControl>
      <FormControl label="创建人" required>
        <Input placeholder="请输入" />
      </FormControl>
      <FormControl label="更新人" required>
        <Input placeholder="请选择" />
      </FormControl>
    </SearchFormLayout>
  );
}
