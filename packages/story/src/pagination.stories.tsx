import React, { useState } from 'react';
import { Grid, Pagination } from '@rexd/core';

export default { title: 'Pagination', component: Pagination };

export function Basic() {
  return <Pagination pageCount={10} onChange={console.log} />;
}

export function Size() {
  return (
    <Grid columns={1} spacingY="l">
      <Pagination size="small" pageCount={10} onChange={console.log} />
      <Pagination size="medium" pageCount={10} onChange={console.log} />
      <Pagination size="large" pageCount={10} onChange={console.log} />
    </Grid>
  );
}

export function PageSizeList() {
  return <Pagination hasPageSizeList pageCount={10} onChange={console.log} />;
}

export function Light() {
  return <Pagination shape="simple" pageCount={10} onChange={console.log} />;
}

export function Controlled() {
  const [page, setPage] = useState(2);

  return <Pagination activePage={page} pageCount={10} onChange={(val) => setPage(val)} />;
}
