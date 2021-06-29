import { CascaderSelect } from '@rexd/core';
import React from 'react';
import { bigTreeDataSource } from './tree-select.stories';

export default {
  title: 'Select / CascaderSelect',
  excludeStories: ['bigTreeDataSource'],
};

export function Basic() {
  return <CascaderSelect.Single dataSource={bigTreeDataSource} />;
}

export function Fill() {
  return <CascaderSelect.Single fill autoWidth={false} dataSource={bigTreeDataSource} />;
}

export function Multiple() {
  return <CascaderSelect.Multi dataSource={bigTreeDataSource} />;
}

export function Search() {
  return <CascaderSelect.Multi showSearch dataSource={bigTreeDataSource} />;
}

export function Status() {
  return <CascaderSelect.Multi status="error" dataSource={bigTreeDataSource} />;
}

export function Disabled() {
  return <CascaderSelect.Multi disabled dataSource={bigTreeDataSource} value={['1', '淘宝']} />;
}
