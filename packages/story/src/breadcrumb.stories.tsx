import { Breadcrumb, BreadcrumbItem } from '@rexd/core';
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
  <Breadcrumb separator={<Icon type="arrow-right-bold" />}>
    <BreadcrumbItem>首页</BreadcrumbItem>
    <BreadcrumbItem>文档</BreadcrumbItem>
    <BreadcrumbItem>Breadcurmb</BreadcrumbItem>
  </Breadcrumb>
);
