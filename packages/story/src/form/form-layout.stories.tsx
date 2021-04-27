import React from 'react';
import { Input, FormLayout, FieldSet, FormControl, DatePicker, SingleSelect, SearchFormLayout } from '@rexd/core';

export default { title: 'Form/Form Layout' };

export function Basic() {
  return (
    <FormControl
      labelPosition="left"
      label="邮箱地址"
      help="我们不会公开您的邮箱地址。"
      error="这是一条错误消息"
      required
    >
      <Input type="email" onChange={console.log} />
    </FormControl>
  );
}

export function Column() {
  return (
    <FormControl
      labelPosition="top"
      label="邮箱地址"
      help="我们不会公开您的邮箱地址。"
      error="这是一条错误消息"
      required
    >
      <Input type="email" onChange={console.log} />
    </FormControl>
  );
}

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
    <FormLayout isInline>
      <FormControl label="邮箱地址" required>
        <Input width="200px" type="email" onChange={console.log} />
      </FormControl>
      <FormControl label="邮箱地址" required>
        <Input width="200px" type="email" onChange={console.log} />
      </FormControl>
    </FormLayout>
  );
}

const selectDataSource = [
  { value: '1', label: 'Option 11' },
  { value: '2', label: 'Option 22' },
  { value: '3', label: 'Option 33' },
];

export function BasicFormLayout() {
  return (
    <FormLayout>
      <FormControl label="店名" required help="辅助文本">
        <Input placeholder="文一西路超市" />
      </FormControl>

      <FormControl label="地址">
        <Input placeholder="城市" style={{ width: 180, marginRight: 12 }} />
        <Input placeholder="邮政编码" style={{ width: 180 }} />
      </FormControl>

      <FormControl label="日期">
        <DatePicker style={{ width: 180, marginRight: 12 }} />
        <DatePicker style={{ width: 180 }} />
      </FormControl>

      <FormControl label="国家" required error="必填字段">
        <SingleSelect dataSource={selectDataSource} placeholder="请选择" />
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

export function BasicSearchFormLayout() {
  return (
    <SearchFormLayout>
      <FormControl label="电子邮箱" required help="辅助文本">
        <Input placeholder="请输入" />
      </FormControl>
      <FormControl label="电话" required error="必填字段">
        <Input placeholder="请选择" />
      </FormControl>
    </SearchFormLayout>
  );
}
