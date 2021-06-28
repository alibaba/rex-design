import { Button, Description, Grid, Pagination } from '@rexd/core';
import React, { useState } from 'react';

export default { title: 'Pagination', component: Pagination };

export function Basic() {
  return <Pagination total={100} onChange={console.log} />;
}

export function Size() {
  const [current, onChange] = useState(1);

  return (
    <Grid columns={1} spacingY="l">
      <Pagination size="small" current={current} onChange={onChange} />
      <Pagination size="medium" current={current} onChange={onChange} />
      <Pagination size="large" current={current} onChange={onChange} />
    </Grid>
  );
}

export function PageSizeList() {
  const [pageSize, setPageSize] = useState(10);
  const total = 200;

  return (
    <div>
      <Description
        items={[
          { label: '总条目', content: total },
          { label: '每页条目数', content: pageSize },
        ]}
      />
      <Pagination
        hasPageSizeList
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        total={total}
        onChange={console.log}
      />
    </div>
  );
}

export function Simple() {
  return <Pagination shape="simple" />;
}

export function Controlled() {
  const [current, onChange] = useState(2);

  return (
    <div>
      <Description
        items={[
          { label: '总条目', content: 100 },
          { label: '当前页码', content: current },
        ]}
      />
      <Button onClick={() => onChange(1)}>回到第1页</Button>
      <Button onClick={() => onChange(10)} style={{ marginLeft: 32 }}>
        跳转到最后一页
      </Button>

      <Pagination style={{ marginTop: 8 }} fill current={current} total={100} onChange={onChange} />
    </div>
  );
}
