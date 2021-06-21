import { CascaderSelect } from '@rexd/core';
import React from 'react';
import { bigTreeDataSource } from './tree-select.stories';

export default {
  title: 'Select / CascaderSelect',
  excludeStories: ['bigTreeDataSource'],
};

export function Basic() {
  return <CascaderSelect.Single style={{ width: 300 }} dataSource={bigTreeDataSource} />;
}

export function Multiple() {
  return <CascaderSelect.Multi style={{ width: 300 }} dataSource={bigTreeDataSource} />;
}

export function Search() {
  return <CascaderSelect.Multi style={{ width: 300 }} showSearch dataSource={bigTreeDataSource} />;
}

export function Status() {
  return <CascaderSelect.Multi style={{ width: 300 }} status="error" dataSource={bigTreeDataSource} />;
}

export function Disabled() {
  return <CascaderSelect.Multi style={{ width: 300 }} disabled dataSource={bigTreeDataSource} value={['1', '淘宝']} />;
}
