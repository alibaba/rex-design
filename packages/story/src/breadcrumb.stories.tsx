import { Box, Breadcrumb, BreadcrumbItem, DemoGroup } from '@rexd/core';
import { Icon } from '@rexd/icon';
import React from 'react';

export default { title: 'Breadcrumb' };

export const Basic = () => (
  <Breadcrumb onItemClick={console.log}>
    <BreadcrumbItem key="home">首页</BreadcrumbItem>
    <BreadcrumbItem key="doc">文档</BreadcrumbItem>
    <BreadcrumbItem key="breadcrumb">Breadcurmb</BreadcrumbItem>
  </Breadcrumb>
);

export const CustomSeparator = () => (
  <DemoGroup>
    <Breadcrumb separator={<Box color="red">-</Box>}>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>文档</BreadcrumbItem>
      <BreadcrumbItem>Breadcurmb</BreadcrumbItem>
    </Breadcrumb>

    <Breadcrumb separator={<Icon type="arrow-right" />}>
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>文档</BreadcrumbItem>
      <BreadcrumbItem>Breadcurmb</BreadcrumbItem>
    </Breadcrumb>
  </DemoGroup>
);
