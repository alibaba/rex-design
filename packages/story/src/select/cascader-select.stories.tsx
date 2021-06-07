import { SingleCascaderSelect } from '@rexd/core';
import React from 'react';
import { bigTreeDataSource } from './tree-select.stories';

export default {
  title: 'Select / CascaderSelect',
  excludeStories: ['bigTreeDataSource'],
};

export function Basic() {
  return <SingleCascaderSelect style={{ width: 300 }} dataSource={bigTreeDataSource} />;
}
