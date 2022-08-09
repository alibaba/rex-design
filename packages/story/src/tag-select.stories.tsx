import React from 'react';
import { TagSelect, Group } from '@rexd/core';
import { range, random } from 'lodash';

export default { title: 'TagSelect' };

const list = [
  { value: 'front-end', label: '前端开发' },
  { value: 'visual-design', label: '视觉设计' },
  { value: 'more-than-6', label: '超过6个字需要有省略号' },
];

export const Basic = () => {
  return <TagSelect dataSource={list} defaultValue={['front-end']} onChange={console.log} />;
};

export const Multiple = () => {
  return <TagSelect dataSource={list} selectMode="multiple" defaultValue={['front-end']} onChange={console.log} />;
};

export const Warp = () => {
  return (
    <div style={{ width: 360, border: '2px dashed #F4F4F4' }}>
      <TagSelect
        dataSource={range(20).map((x) => ({
          value: String(x),
          label: (Math.random() + 1).toString(36).substring(random(2, 8)),
        }))}
      />
    </div>
  );
};

export const Size = () => (
  <Group>
    <TagSelect
      size="small"
      selectMode="multiple"
      dataSource={list}
      defaultValue={['front-end']}
      onChange={console.log}
    />
    <br />
    <TagSelect
      size="medium"
      selectMode="multiple"
      dataSource={list}
      defaultValue={['front-end']}
      onChange={console.log}
    />
    <br />
    <TagSelect
      size="large"
      selectMode="multiple"
      dataSource={list}
      defaultValue={['front-end']}
      onChange={console.log}
    />
  </Group>
);

export const Columns = () => (
  <TagSelect columns={3} selectMode="multiple" dataSource={list} defaultValue={['front-end']} onChange={console.log} />
);
