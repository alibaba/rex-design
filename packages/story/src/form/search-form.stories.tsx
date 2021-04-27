import React from 'react';
import { SearchForm, FormItem } from '@rexd/form';
import { Box } from '@rexd/core';

export default {
  title: 'Form/SearchForm',
  parameters: {
    layout: 'fullscreen',
  },
};

export function Basic() {
  return (
    <Box bg="fill.layer1" p="xxl">
      <SearchForm onSubmit={console.log}>
        <FormItem label="供应商名称" name="supplier" required component="input" />
        <FormItem label="银行卡账号" name="bankCardNo" component="input" />
        <FormItem label="其他" name="memo" component="input" />
      </SearchForm>
    </Box>
  );
}

export function HideSearchFields() {
  return (
    <Box bg="fill.layer1" p="xxl">
      <SearchForm>
        <FormItem label="供应商名称" name="supplier" required component="input" />
        <FormItem label="银行卡账号" name="bankCardNo" component="input" />
        <FormItem label="选择日期" name="date" component="datePicker" />
        <FormItem label="选择日期范围" name="dateRange" component="rangePicker" />
        <FormItem label="输入框" name="input1" component="timePicker" />
        <FormItem label="输入框" name="input2" component="input" />
        <FormItem label="输入框" name="input3" component="input" />
        <FormItem label="输入框" name="input4" component="input" />
        <FormItem label="输入框" name="input5" component="input" />
      </SearchForm>
    </Box>
  );
}

/**
 * 可折叠
 */
export function Collapse() {
  return (
    <Box bg="fill.layer1" p="xxl">
      <SearchForm isCollapsible>
        <FormItem label="供应商名称" name="supplier" required component="input" />
        <FormItem label="银行卡账号" name="bankCardNo" component="input" />
        <FormItem label="选择日期" name="date" component="datePicker" />
      </SearchForm>
    </Box>
  );
}
