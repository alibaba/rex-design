import React from 'react';
import { Search, DemoGroup } from '@rexd/core';

export default { title: 'Search' };

export function Basic() {
  return <Search onChange={(val) => console.log('change:', val)} onSubmit={(val) => console.log('submit:', val)} />;
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
    <DemoGroup>
      <Search hasClear defaultValue="hello world" onChange={console.log} onSubmit={console.log} />
      <Search shape="simple" hasClear defaultValue="hello world" onChange={console.log} onSubmit={console.log} />
    </DemoGroup>
  );
}
