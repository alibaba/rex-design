import React from 'react';
import { Search, Group } from '@rexd/core';

export default { title: 'Search' };

export function Basic() {
  return (
    <Group>
      <Search onChange={(val) => console.log('change:', val)} onSubmit={(val) => console.log('submit:', val)} />
      <Search
        searchText="搜索订单"
        onChange={(val) => console.log('change:', val)}
        onSubmit={(val) => console.log('submit:', val)}
      />
    </Group>
  );
}

export function Simple() {
  return (
    <Search
      shape="simple"
      onChange={(val) => console.log('change:', val)}
      onSubmit={(val) => console.log('submit:', val)}
    />
  );
}

export function HasClear() {
  return (
    <Group>
      <Search hasClear defaultValue="hello world" onChange={console.log} onSubmit={console.log} />
      <Search shape="simple" hasClear defaultValue="hello world" onChange={console.log} onSubmit={console.log} />
    </Group>
  );
}
